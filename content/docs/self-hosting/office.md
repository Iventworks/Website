---
title: "Office-Dokumente"
description: "Word, Excel und PowerPoint im Browser: Nextcloud Office neben Iventworks einrichten, mit eigenem Hostnamen und Reverse Proxy."
navigation:
  title: Office-Dokumente
---

# Office-Dokumente

Mit einem Office-Server öffnen sich Word-, Excel- und PowerPoint-Dateien direkt in Iventworks, mehrere
Personen können gleichzeitig darin arbeiten, und **Neu → Textdokument / Tabelle / Präsentation**
legt neue Dateien an. Der Office-Server ist optional: Ohne ihn werden Office-Dateien wie bisher
heruntergeladen.

Iventworks nutzt dafür **Nextcloud Office**, die für den Produktivbetrieb gedachte Ausgabe von
[Euro-Office](https://euro-office.github.io/), einer Open-Source-Office-Suite aus Europa. Nextcloud
selbst braucht ihr dafür nicht. Die „Community Builds“ von Euro-Office sind zum Testen gedacht.

## Was ihr braucht

- **Mindestens 4 GB Arbeitsspeicher** zusätzlich für den Office-Server
- **Einen eigenen Hostnamen** für den Office-Server mit HTTPS über euren
  [Reverse Proxy](/docs/self-hosting/reverse-proxy)

Wir empfehlen `office.ivb.eure-organisation.de`. `ivb` steht für „Iventworks-Backends“: Dienste, die
nur Iventworks selbst nutzt, liegen darunter, und `office.` bleibt für eure Domain frei. Eingeben muss
die Adresse außer euch niemand: Der Editor öffnet sich in Iventworks, die Adressleiste zeigt weiter
Iventworks.

::callout{icon="i-lucide-shield-alert" color="warning"}
Nehmt einen **eigenen Hostnamen**, keinen Pfad und keinen anderen Port unter der Adresse von
Iventworks. Sonst liefe der Code des Office-Servers unter derselben Adresse wie Iventworks und käme
an die Anmeldung heran.
::

Ein Wildcard-Zertifikat für `*.eure-organisation.de` deckt `office.ivb.eure-organisation.de` nicht ab,
es gilt nur eine Ebene tief. Lasst euren Proxy ein Zertifikat für den Hostnamen holen (Caddy und
Certbot tun das von selbst) oder nehmt eines für `*.ivb.eure-organisation.de`.

## 1. Office-Server starten

Ergänzt eure `docker-compose.yml` um den Dienst `office`, unter `services:` neben `iventworks`.
Er startet nur mit dem Profil `office`:

```yaml [docker-compose.yml]
services:
  iventworks:
    # … wie bisher …

  office:
    profiles: [office]
    image: ghcr.io/nextcloud-releases/office-documentserver:latest
    container_name: iventworks-office
    restart: unless-stopped
    ports:
      - "127.0.0.1:31317:80"
    environment:
      WOPI_ENABLED: "true"
      JWT_ENABLED: "true"
      ALLOW_PRIVATE_IP_ADDRESS: "false"
      EXAMPLE_ENABLED: "false"
    volumes:
      - /opt/iventworks/office/data:/var/lib/nextcloud-office/documentserver
      - /opt/iventworks/office/private:/var/www/nextcloud-office/Data
      - /opt/iventworks/office/logs:/var/log/nextcloud-office/documentserver
```

```bash [Terminal]
cd /opt/iventworks/compose
docker compose --profile office up -d
```

Der erste Start kann ein paar Minuten dauern. `latest` ist immer die neueste stabile Version von
Nextcloud Office, Updates holt `docker compose --profile office pull`. Was sich geändert hat, steht unter den
[Releases von Nextcloud Office](https://github.com/nextcloud-releases/Office-DocumentServer/releases).

Ohne `--profile office` lassen `docker compose pull` und `docker compose up -d` den Office-Server
aus. Gebt bei [Updates](/docs/self-hosting/installation#updates) deshalb `--profile office` mit, oder
tragt `COMPOSE_PROFILES=office` in die `.env` neben der Compose-Datei ein.

## 2. Reverse Proxy einrichten

Der Office-Server lauscht auf `127.0.0.1:31317`. Richtet für seinen Hostnamen HTTPS ein und leitet
alles dorthin weiter, auch **WebSockets**: Darüber arbeiten mehrere Personen gleichzeitig in einem
Dokument. Mit Caddy:

```text [/etc/caddy/Caddyfile]
office.ivb.eure-organisation.de {
	reverse_proxy 127.0.0.1:31317
}
```

Bei anderen Proxys gilt dasselbe wie für Iventworks: WebSockets durchlassen, den Hostnamen behalten
und große Anfragen erlauben, siehe [Reverse Proxy & HTTPS](/docs/self-hosting/reverse-proxy).

## 3. Iventworks verbinden

Tragt beim Dienst `iventworks` unter `environment:` ein:

```yaml [docker-compose.yml]
services:
  iventworks:
    environment:
      # … wie bisher …
      IVENTWORKS_OFFICE_URL: https://office.ivb.eure-organisation.de
      IVENTWORKS_OFFICE_INTERNAL_URL: http://office
```

Nur in die `.env` eintragen reicht nicht: Docker Compose setzt daraus nur Platzhalter wie `${…}` in der
Compose-Datei ein.

- `IVENTWORKS_OFFICE_URL` ist die öffentliche Adresse: Von dort laden die Browser den Editor.
- `IVENTWORKS_OFFICE_INTERNAL_URL` ist die Adresse, unter der Iventworks den Office-Server im selben
  Docker-Netz erreicht. Ohne sie nutzt Iventworks die öffentliche.

Danach Iventworks neu starten:

```bash [Terminal]
docker compose up -d
```

Öffnet eine Word-Datei in Iventworks: Sie öffnet sich im Office-Editor, und unter **Neu** gibt es
**Textdokument**, **Tabelle** und **Präsentation**.

## So arbeiten die beiden zusammen

- Iventworks gibt dem Browser beim Öffnen ein **Zugangstoken für genau diese Datei** mit. Es gehört
  zur Anmeldung der Person: Abmelden beendet es.
- Der Office-Server lädt und speichert die Datei bei Iventworks, über die **öffentliche Adresse eurer
  Organisation**. Iventworks prüft jede dieser Anfragen: die **Signatur des Office-Servers**, das
  Token und die aktuellen Rechte der Person. Ohne gültige Signatur lehnt Iventworks die Anfrage ab,
  ein Token allein reicht nicht. Wer den Zugriff verliert, kann auch im offenen Editor nicht mehr
  speichern.
- Die Schlüssel für die Signatur veröffentlicht der Office-Server selbst (mit `WOPI_ENABLED`).
  Bekommt er neue, zum Beispiel nach einem Update, holt Iventworks sie von selbst.
- Der Office-Server holt nichts aus eurem internen Netz (`ALLOW_PRIVATE_IP_ADDRESS: "false"`). Lasst
  das so. Er muss eure öffentliche Adresse aber erreichen, auch vom Server selbst aus.
- Jedes Dokument hat beim Office-Server eine eigene Kennung, die zu eurer Installation gehört. Ihr
  könnt einen Office-Server also auch für mehrere Iventworks-Installationen nutzen, etwa für eine
  Test- und eine Produktivumgebung.
- Solange jemand ein Dokument in Office **bearbeitet**, kann niemand eine neue Fassung hochladen,
  eine Version wiederherstellen oder es löschen, auch nicht den Ordner, in dem es liegt. Gespeicherte
  Änderungen landen in den Versionen.

## Backups

Die Dokumente selbst liegen in Iventworks und sind in dessen [Backups](/docs/self-hosting/backups).
Der Office-Server speichert keine Dokumente dauerhaft. Je nach Version legt er seine Schlüssel in
`/opt/iventworks/office/private` ab: Behaltet das Verzeichnis bei Updates. Ändern sich die Schlüssel
trotzdem, etwa weil der Container neu erstellt wurde, holt Iventworks die neuen von selbst.

## Wenn es nicht klappt

| Problem | Ursache |
| --- | --- |
| Office-Dateien öffnen sich nicht im Editor, sondern nur zum Herunterladen | `IVENTWORKS_OFFICE_URL` ist nicht beim Dienst `iventworks` gesetzt, oder Iventworks wurde danach nicht neu gestartet. Oder die Datei ist kein Office-Format: Der Editor öffnet Word-, Excel- und PowerPoint-Dateien sowie `.odt`, `.ods`, `.odp` und `.rtf`. |
| „Der Office-Editor konnte nicht geöffnet werden“, im Log `Office discovery … failed` | Iventworks erreicht den Office-Server nicht unter `IVENTWORKS_OFFICE_INTERNAL_URL`, oder er läuft ohne `WOPI_ENABLED: "true"`. |
| Der Editor bleibt leer oder lädt nicht | Der Hostname des Office-Servers ist nicht über HTTPS erreichbar, oder der Proxy lässt keine WebSockets durch. |
| Der Editor öffnet sich, kann die Datei aber nicht laden („Sorry, editor could not be loaded“) | Steht im Log von Iventworks `WOPI call refused: …`, nennt die Zeile den Grund. Steht dort nichts, kam der Office-Server gar nicht bei Iventworks an: `docker logs iventworks-office` zeigt, warum. Meist erreicht er die öffentliche Adresse eurer Organisation nicht, zum Beispiel weil der Server sich selbst nicht über seine öffentliche Adresse erreicht. Oder die Adresse zeigt aus dem Container auf eine interne IP (eigener DNS, `/etc/hosts`): Die blockiert `ALLOW_PRIVATE_IP_ADDRESS: "false"`. |
| Im Editor „Beim Öffnen dieser Datei ist ein Fehler aufgetreten“ | Der Office-Server hat die Datei bekommen, konnte sie aber nicht umwandeln. Die Ursache steht in seinem Log: `grep -i error /opt/iventworks/office/logs/converter/out.log`. Waren Dateien schon einmal fehlerhaft geöffnet, etwa während der Office-Server die Adresse nicht erreichte, merkt er sich das. `docker compose --profile office up -d --force-recreate office` setzt das zurück. |
| Im Log `Office discovery has no proof key: WOPI calls are refused.` | Der Office-Server veröffentlicht keine Schlüssel für seine Signatur. Startet ihn mit `WOPI_ENABLED: "true"`. |
