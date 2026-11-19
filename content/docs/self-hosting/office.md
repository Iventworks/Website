---
title: "Office-Dokumente"
description: "Word, Excel und PowerPoint im Browser: Euro-Office neben Iventworks einrichten, mit eigenem Hostnamen und Reverse Proxy."
navigation:
  title: Office-Dokumente
---

# Office-Dokumente

Mit einem Office-Server öffnen sich Word-, Excel- und PowerPoint-Dateien direkt in Iventworks, mehrere
Personen können gleichzeitig darin arbeiten, und **Neu → Textdokument / Tabelle / Präsentation**
legt neue Dateien an. Iventworks nutzt dafür [Euro-Office](https://euro-office.github.io/), eine
Open-Source-Office-Suite aus Europa. Der Office-Server ist optional: Ohne ihn werden Office-Dateien
wie bisher heruntergeladen.

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

Die Compose-Datei von Iventworks enthält den Dienst `eurooffice` schon. Er startet nur mit dem
Profil `office`:

```yaml [docker-compose.yml]
  eurooffice:
    profiles: [office]
    image: ghcr.io/euro-office/documentserver:latest
    container_name: eurooffice
    restart: unless-stopped
    ports:
      - "127.0.0.1:31317:80"
    environment:
      WOPI_ENABLED: "true"
      JWT_ENABLED: "true"
      ALLOW_PRIVATE_IP_ADDRESS: "false"
      EXAMPLE_ENABLED: "false"
    volumes:
      - /opt/eurooffice/data:/var/lib/euro-office/documentserver
      - /opt/eurooffice/private:/var/www/euro-office/Data
      - /opt/eurooffice/logs:/var/log/euro-office/documentserver
```

```bash [Terminal]
cd /opt/iventworks/compose
docker compose --profile office up -d
```

Der erste Start kann ein paar Minuten dauern. Wenn alles läuft, könnt ihr das Image auf eine feste Version
setzen, zum Beispiel `ghcr.io/euro-office/documentserver:v9.3.1`.

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

Tragt in der Compose-Datei bzw. der `.env` von Iventworks ein:

```dotenv [.env]
IVENTWORKS_OFFICE_URL=https://office.ivb.eure-organisation.de
IVENTWORKS_OFFICE_INTERNAL_URL=http://eurooffice
```

- `IVENTWORKS_OFFICE_URL` ist die öffentliche Adresse: Von dort laden die Browser den Editor.
- `IVENTWORKS_OFFICE_INTERNAL_URL` ist die Adresse, unter der Iventworks den Office-Server im selben
  Docker-Netz erreicht. Ohne sie nutzt Iventworks die öffentliche.

Danach Iventworks neu starten:

```bash [Terminal]
docker compose up -d
```

Öffnet eine Word-Datei in Iventworks: Der Knopf **In Office öffnen** erscheint, und unter **Neu** gibt
es **Textdokument**, **Tabelle** und **Präsentation**.

## So arbeiten die beiden zusammen

- Iventworks gibt dem Browser beim Öffnen ein **Zugangstoken für genau diese Datei** mit. Es gehört
  zur Anmeldung der Person: Abmelden beendet es.
- Der Office-Server lädt und speichert die Datei bei Iventworks, über die **öffentliche Adresse eurer
  Organisation**. Iventworks prüft jede dieser Anfragen: die **Signatur des Office-Servers**, das
  Token und die aktuellen Rechte der Person. Wer den Zugriff verliert, kann auch im offenen Editor
  nicht mehr speichern.
- Der Office-Server holt nichts aus eurem internen Netz (`ALLOW_PRIVATE_IP_ADDRESS: "false"`). Lasst
  das so. Er muss eure öffentliche Adresse aber erreichen, auch vom Server selbst aus.
- Solange ein Dokument in Office offen ist, kann niemand eine neue Fassung hochladen, eine Version
  wiederherstellen oder es löschen. Gespeicherte Änderungen landen in den Versionen.

## Backups

Die Dokumente selbst liegen in Iventworks und sind in dessen [Backups](/docs/self-hosting/backups).
Der Office-Server speichert nur Zwischenstände und seine Schlüssel in `/opt/eurooffice/private`.
Behaltet dieses Verzeichnis bei Updates, sonst brechen offene Editoren ab.

## Wenn es nicht klappt

| Problem | Ursache |
| --- | --- |
| **In Office öffnen** fehlt | `IVENTWORKS_OFFICE_URL` ist nicht gesetzt, oder Iventworks wurde danach nicht neu gestartet. |
| „Der Office-Editor konnte nicht geöffnet werden“, im Log `Office discovery … failed` | Iventworks erreicht den Office-Server nicht unter `IVENTWORKS_OFFICE_INTERNAL_URL`, oder er läuft ohne `WOPI_ENABLED: "true"`. |
| Der Editor bleibt leer oder lädt nicht | Der Hostname des Office-Servers ist nicht über HTTPS erreichbar, oder der Proxy lässt keine WebSockets durch. |
| Der Editor öffnet sich, kann die Datei aber nicht laden | Der Office-Server erreicht die öffentliche Adresse eurer Organisation nicht, zum Beispiel weil der Server sich selbst nicht über seine öffentliche Adresse erreicht. |
