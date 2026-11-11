---
title: "Reverse Proxy & HTTPS"
description: "Iventworks mit Caddy, nginx, Traefik oder Apache über HTTPS bereitstellen, mit WebSockets für Live-Updates, passendem Upload-Limit und mehreren Organisationen."
navigation:
  title: Reverse Proxy & HTTPS
---

# Reverse Proxy & HTTPS

Iventworks spricht auf `127.0.0.1:31316` nur HTTP. Davor sitzt ein Reverse Proxy: Er kümmert sich um
die Zertifikate, nimmt die Anfragen aus dem Internet an und leitet sie an Iventworks weiter. Alle
Beispiele auf dieser Seite nutzen die Adresse `planung.eure-organisation.de`.

## Was der Proxy können muss

- **HTTPS bereitstellen.** Ohne HTTPS lässt sich Iventworks nicht als App installieren, und
  Push-Benachrichtigungen funktionieren nicht.
- **WebSockets durchlassen.** Neue Nachrichten, wer gerade schreibt, wer online ist und neue
  Benachrichtigungen kommen über eine WebSocket-Verbindung unter `/ws/realtime`. Die App sendet alle
  25 Sekunden ein Lebenszeichen. Der Proxy darf ruhige Verbindungen also nicht schneller trennen, 60
  Sekunden oder mehr sind gut. Ohne WebSockets funktioniert Iventworks weiter, fragt dann aber nur alle
  paar Sekunden nach, statt live zu aktualisieren.
- **Große Uploads erlauben.** Dateien dürfen bis zu `IVENTWORKS_MAX_UPLOAD_SIZE_MB` groß sein
  (Standard: 25 MB), eine Anfrage also etwas mehr. Manche Proxys erlauben standardmäßig nur 1 MB.
- **Den Hostnamen behalten.** Iventworks erkennt am Hostnamen (`Host` oder `X-Forwarded-Host`), welche
  Organisation gemeint ist, und prüft ihn auch beim Aufbau der WebSocket-Verbindung.
- **Die Client-Adresse anhängen.** Die Begrenzung der Anmeldeversuche braucht die echte Adresse. Alle
  Beispiele hängen sie an `X-Forwarded-For` an. Setzt dazu `IVENTWORKS_TRUST_PROXY: true`, siehe
  [Konfiguration](/docs/self-hosting/konfiguration).

## Konfigurationen

::tabs

:::tabs-item{label="Caddy" icon="i-lucide-shield-check"}

Caddy holt und erneuert die Zertifikate selbst und erfüllt alle Punkte oben schon von sich aus:
WebSockets, Hostname und `X-Forwarded-For` ohne weitere Einstellungen, und ein Limit für die Größe
von Anfragen gibt es nicht.

```text [/etc/caddy/Caddyfile]
planung.eure-organisation.de {
	encode zstd gzip
	reverse_proxy 127.0.0.1:31316
}
```

```bash [Terminal]
sudo systemctl reload caddy
```

Beim Neuladen der Konfiguration trennt Caddy offene WebSocket-Verbindungen. Iventworks verbindet sich
danach von selbst wieder.

:::

:::tabs-item{label="nginx" icon="i-lucide-server"}

Holt zuerst ein Zertifikat, zum Beispiel mit Certbot:

```bash [Terminal]
sudo certbot certonly --nginx -d planung.eure-organisation.de
```

```nginx [/etc/nginx/sites-available/iventworks.conf]
# Für die WebSocket-Verbindung unter /ws/realtime
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}

# HTTP auf HTTPS umleiten
server {
    listen 80;
    listen [::]:80;
    server_name planung.eure-organisation.de;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name planung.eure-organisation.de;

    ssl_certificate     /etc/letsencrypt/live/planung.eure-organisation.de/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/planung.eure-organisation.de/privkey.pem;

    # Größer als IVENTWORKS_MAX_UPLOAD_SIZE_MB (Standard 25). nginx erlaubt sonst nur 1 MB.
    client_max_body_size 30m;

    location / {
        proxy_pass http://127.0.0.1:31316;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_read_timeout 90s;
    }
}
```

Aktivieren und neu laden:

```bash [Terminal]
sudo ln -s /etc/nginx/sites-available/iventworks.conf /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

:::

:::tabs-item{label="Traefik" icon="i-lucide-route"}

Läuft Traefik in Docker, richtet ihr Iventworks über Labels am Container ein. Das Beispiel setzt einen
Entrypoint `websecure`, einen Zertifikats-Resolver `letsencrypt` und ein gemeinsames externes Netzwerk
`proxy` voraus.

```yaml [docker-compose.yml]
services:
  iventworks:
    image: gcr.leicraftmc.de/iventworks/app:latest
    container_name: iventworks
    restart: unless-stopped
    # … environment und volumes wie in der Installation, aber ohne `ports:` …
    networks: [proxy]
    labels:
      - traefik.enable=true
      - traefik.http.routers.iventworks.rule=Host(`planung.eure-organisation.de`)
      - traefik.http.routers.iventworks.entrypoints=websecure
      - traefik.http.routers.iventworks.tls.certresolver=letsencrypt
      - traefik.http.services.iventworks.loadbalancer.server.port=31316

networks:
  proxy:
    external: true
```

WebSockets, Hostname und `X-Forwarded-For` funktionieren in Traefik ohne weitere Einstellungen, ein
Limit für die Größe von Anfragen gibt es standardmäßig nicht. Ohne `ports:` erreicht nur Traefik den
Container, `IVENTWORKS_TRUST_PROXY: true` bleibt also richtig.

Traefik v3 bricht Anfragen nach 60 Sekunden ab, wenn sie bis dahin nicht vollständig angekommen sind
(`respondingTimeouts.readTimeout` am Entrypoint). Ladet ihr große Dateien über langsame Verbindungen
hoch, erhöht diesen Wert.

:::

:::tabs-item{label="Apache" icon="i-lucide-feather"}

Aktiviert zuerst die nötigen Module:

```bash [Terminal]
sudo a2enmod proxy proxy_http proxy_wstunnel ssl headers
```

```apache [/etc/apache2/sites-available/iventworks.conf]
<VirtualHost *:80>
    ServerName planung.eure-organisation.de
    Redirect permanent / https://planung.eure-organisation.de/
</VirtualHost>

<VirtualHost *:443>
    ServerName planung.eure-organisation.de

    SSLEngine on
    SSLCertificateFile    /etc/letsencrypt/live/planung.eure-organisation.de/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/planung.eure-organisation.de/privkey.pem

    # 30 MB, größer als IVENTWORKS_MAX_UPLOAD_SIZE_MB (Standard 25)
    LimitRequestBody 31457280

    ProxyPreserveHost On
    RequestHeader set X-Forwarded-Proto "https"

    # Zuerst die WebSocket-Verbindung, dann alles andere
    ProxyPass        /ws/realtime ws://127.0.0.1:31316/ws/realtime
    ProxyPass        /            http://127.0.0.1:31316/
    ProxyPassReverse /            http://127.0.0.1:31316/
</VirtualHost>
```

`X-Forwarded-For` und `X-Forwarded-Host` setzt Apache beim Weiterleiten selbst.

```bash [Terminal]
sudo a2ensite iventworks && sudo apachectl configtest && sudo systemctl reload apache2
```

:::

::

::callout{icon="i-lucide-lightbulb"}
Erhöht ihr `IVENTWORKS_MAX_UPLOAD_SIZE_MB`, erhöht auch das Limit im Proxy. Als Faustregel: **Limit im
Proxy ≥ Upload-Limit + 1 MB**.
::

## Einrichtung prüfen

Iventworks antwortet über HTTPS:

```bash [Terminal]
curl https://planung.eure-organisation.de/api/health
```

```json [Antwort]
{
  "success": true,
  "code": 200,
  "message": "Iventworks API is running",
  "data": null
}
```

Ob die Live-Verbindung durchkommt, seht ihr im Browser: Meldet euch an, öffnet die Entwicklertools
(F12) und dort **Netzwerk**. Nach einem Neuladen steht dort eine Anfrage an `/ws/realtime` mit Status
**101**. Steht dort ein Fehler, lässt der Proxy keine WebSockets durch.

## Mehrere Organisationen

Mit `IVENTWORKS_MULTI_ORG=true` bedient Iventworks die Basisadresse, die Adressen aller
Organisationen (`<kürzel>.app.eure-domain.de`) und ihre eigenen Domains, siehe
[Mehrere Organisationen](/docs/self-hosting/mehrere-organisationen). Der Proxy muss all diese Namen an
Iventworks weiterleiten und für jeden ein Zertifikat haben.

Am einfachsten geht das mit **On-Demand-TLS** in Caddy: Caddy holt ein Zertifikat, sobald eine Adresse
zum ersten Mal aufgerufen wird, und fragt vorher bei Iventworks nach, ob es diese Adresse bedient.
`GET /api/v1/instance/tls-check?domain=…` antwortet mit 200 für die Basisadresse, die Adressen der
Organisationen und freigegebene eigene Domains, sonst mit 404.

```text [/etc/caddy/Caddyfile]
{
	on_demand_tls {
		ask http://127.0.0.1:31316/api/v1/instance/tls-check
	}
}

https:// {
	tls {
		on_demand
	}
	encode zstd gzip
	reverse_proxy 127.0.0.1:31316
}
```

Eine eigene Domain einer Organisation funktioniert damit, sobald sie freigegeben ist. Mit
`IVENTWORKS_CUSTOM_DOMAINS_SELF_SERVICE=true` geschieht das ohne einen System-Admin.

::callout{icon="i-lucide-info"}
Nutzt die `ask`-Abfrage nur mit `IVENTWORKS_MULTI_ORG=true`. Mit einer einzigen Organisation antwortet
Iventworks unter jeder Adresse und damit auch bei jeder Abfrage mit 200. Dann reicht die einfache
Konfiguration oben.
::

Mit nginx, Apache oder Traefik braucht ihr für die Adressen der Organisationen ein
**Wildcard-Zertifikat** (`*.app.eure-domain.de`, über eine DNS-Challenge) und tragt eigene Domains
der Organisationen von Hand ein. Dafür ist die Freigabe durch einen System-Admin gedacht:
`IVENTWORKS_CUSTOM_DOMAINS_SELF_SERVICE` bleibt `false`, und ihr gebt eine Domain erst frei, wenn der
Proxy sie bedient.

## Ausgehende Verbindungen

Für Push-Benachrichtigungen schickt der Server Anfragen an die Push-Dienste der Browser: Google
(`fcm.googleapis.com`), Mozilla (`updates.push.services.mozilla.com`), Apple (`*.push.apple.com`) und
Microsoft (`*.notify.windows.com`). Ein Konto oder Schlüssel bei diesen Diensten braucht ihr nicht.
Sperrt eine Firewall ausgehende Verbindungen, erlaubt HTTPS (Port 443) zu diesen Adressen. Mehr dazu
unter [Konfiguration](/docs/self-hosting/konfiguration#push-benachrichtigungen).

## Weiter geht's

- [Installation](/docs/self-hosting/installation): Iventworks starten und das Admin-Passwort setzen
- [Sicherheit](/docs/self-hosting/sicherheit): die Checkliste für den Betrieb
