---
title: "Installation"
description: "Iventworks mit Docker Compose auf dem eigenen Server installieren, starten und aktualisieren."
navigation:
  title: Installation
---

# Installation

Iventworks läuft als **ein einzelner Docker-Container**: Oberfläche und API zusammen, die Daten in
einer SQLite-Datenbank und einem Ordner für hochgeladene Dateien. Eine separate Datenbank braucht ihr
nicht.

## Voraussetzungen

- ein Linux-Server mit **Docker** und dem **Compose-Plugin**
- eine Domain oder Subdomain, zum Beispiel `planung.eure-organisation.de`
- ein **Reverse Proxy** mit HTTPS auf demselben Server, zum Beispiel Caddy, nginx oder Traefik
- optional ein **SMTP-Zugang** für E-Mails (Einladungen, Passwort vergessen)

## 1. Compose-Datei anlegen

Lege ein Verzeichnis an, zum Beispiel `/opt/iventworks/compose`, und darin eine
`docker-compose.yml`:

```yaml [docker-compose.yml]
services:
  iventworks:
    image: gcr.leicraftmc.de/iventworks/app:latest
    container_name: iventworks
    restart: unless-stopped
    # Nur lokal erreichbar: der Reverse Proxy auf diesem Server leitet weiter.
    ports:
      - "127.0.0.1:31316:31316"
    environment:
      IVENTWORKS_APP_URL: https://planung.eure-organisation.de
      IVENTWORKS_MULTI_ORG: false
      IVENTWORKS_API_DISABLE_DOCS: true
      IVENTWORKS_TRUST_PROXY: true
      IVENTWORKS_TIMEZONE: Europe/Berlin
      IVENTWORKS_MAX_UPLOAD_SIZE_MB: 25

      IVENTWORKS_BACKUP_ENABLED: true
      IVENTWORKS_BACKUP_SCHEDULE: "0 3 * * *"
      IVENTWORKS_BACKUP_PASSPHRASE: ${IVENTWORKS_BACKUP_PASSPHRASE:?in .env setzen}

      IVENTWORKS_SMTP_HOST: ${IVENTWORKS_SMTP_HOST:-}
      IVENTWORKS_SMTP_PORT: 465
      IVENTWORKS_SMTP_USERNAME: ${IVENTWORKS_SMTP_USERNAME:-}
      IVENTWORKS_SMTP_PASSWORD: ${IVENTWORKS_SMTP_PASSWORD:-}
      IVENTWORKS_SMTP_FROM: '"Iventworks" <noreply@eure-organisation.de>'
      IVENTWORKS_SMTP_SECURE: true
    volumes:
      - /opt/iventworks/data:/opt/iventworks/data
      - /opt/iventworks/config:/opt/iventworks/config
      - /opt/iventworks/backups:/opt/iventworks/backups
```

Die geheimen Werte kommen in eine `.env` neben der Compose-Datei:

```dotenv [.env]
IVENTWORKS_BACKUP_PASSPHRASE=eine-lange-zufällige-passphrase
IVENTWORKS_SMTP_HOST=mail.eure-organisation.de
IVENTWORKS_SMTP_USERNAME=noreply@eure-organisation.de
IVENTWORKS_SMTP_PASSWORD=geheim
```

::callout{icon="i-lucide-key-round" color="warning"}
Bewahrt die **Backup-Passphrase** zusätzlich außerhalb des Servers auf, zum Beispiel in einem
Passwortmanager. Ohne sie lässt sich kein Backup wiederherstellen.
::

Ohne `IVENTWORKS_SMTP_HOST` ist der E-Mail-Versand aus. Einladungslinks zeigt Iventworks dann in der
Oberfläche an, ihr gebt sie selbst weiter. Alle Einstellungen stehen unter
[Konfiguration](/docs/self-hosting/konfiguration).

## 2. Reverse Proxy einrichten

Iventworks lauscht auf `127.0.0.1:31316`. Richtet euren Reverse Proxy so ein, dass er HTTPS für eure
Domain übernimmt und alle Anfragen an diese Adresse weiterleitet. Der Proxy muss dabei die
Client-Adresse im Header `X-Forwarded-For` anhängen, wie es Caddy, nginx und Traefik
standardmäßig bzw. mit der üblichen Konfiguration tun.

Weil der Port nur lokal erreichbar ist, ist `IVENTWORKS_TRUST_PROXY: true` richtig. Veröffentlicht
ihr den Port jemals direkt im Internet, setzt den Wert auf `false`.

## 3. Starten

```bash [Terminal]
cd /opt/iventworks/compose
docker compose up -d
docker compose logs -f
```

Docker legt die Verzeichnisse unter `/opt/iventworks/` an. Beim Start richtet Iventworks die
Datenbank automatisch ein.

## 4. Admin-Passwort setzen

Beim ersten Start legt Iventworks einen Benutzer `admin` an und erzeugt einen einmaligen Link zum
Setzen des Passworts. Ihr findet ihn in den Logs und in der Datei
`/opt/iventworks/config/initial_admin_password_reset_token.txt`.

1. Öffnet den Link und setzt ein sicheres Passwort.
2. Tragt im Profil des Admins eure echte E-Mail-Adresse ein.
3. Passt unter **Administration → Organisation** Name, Farbe und Logo an.
4. Ladet euer Team ein, siehe [Benutzer & Einladungen](/docs/administration/benutzer-und-einladungen).

## Updates

```bash [Terminal]
cd /opt/iventworks/compose
docker compose pull
docker compose up -d
```

Datenbank-Migrationen laufen beim Start automatisch. Erstellt vor einem Update am besten ein
Backup, siehe [Backups](/docs/self-hosting/backups).

## Daten

`/opt/iventworks/data` enthält die Datenbank **und** die hochgeladenen Dateien. Kopiert die
Datenbankdatei nicht im laufenden Betrieb, sie kann gerade beschrieben werden. Nutzt dafür die
eingebauten [Backups](/docs/self-hosting/backups).
