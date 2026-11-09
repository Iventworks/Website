---
title: "Backups"
description: "Verschlüsselte Backups von Iventworks einrichten, prüfen und wiederherstellen, lokal und in S3."
navigation:
  title: Backups
---

# Backups

Iventworks bringt eine eigene Backup-Funktion mit. Sie sichert die **Datenbank und alle
hochgeladenen Dateien** zusammen, verschlüsselt, nach Zeitplan und auf Wunsch zusätzlich außerhalb
des Servers.

## So funktionieren die Backups

- Iventworks erstellt einen konsistenten Schnappschuss der Datenbank, auch im laufenden Betrieb.
- Datenbank und Uploads werden in ein Archiv gepackt und mit **AES-256-GCM** verschlüsselt. Der
  Schlüssel wird aus eurer Passphrase abgeleitet, mit frischem Salt und IV für jedes Backup.
- Das Ergebnis ist eine Datei wie `iventworks-20270714-030000.backup` (Zeit in UTC).

## Einrichten

In der Compose-Datei bzw. der `.env`:

```dotenv [.env]
IVENTWORKS_BACKUP_ENABLED=true
IVENTWORKS_BACKUP_SCHEDULE="0 3 * * *"
IVENTWORKS_BACKUP_PASSPHRASE=eine-lange-zufällige-passphrase
IVENTWORKS_BACKUP_RETENTION_DAYS=30
IVENTWORKS_BACKUP_RETENTION_MIN_COUNT=3
```

Ist die Konfiguration unvollständig, startet Iventworks nicht, zum Beispiel ohne Passphrase oder
mit einer Passphrase unter 16 Zeichen, mit einer halben S3-Konfiguration oder einem ungültigen Zeitplan. So fällt ein
Fehler sofort auf und nicht erst, wenn ihr ein Backup braucht.

::callout{icon="i-lucide-key-round" color="warning"}
**Bewahrt die Passphrase außerhalb des Servers auf.** Ohne sie lässt sich kein Backup
wiederherstellen, auch nicht von uns.
::

## Kopien in S3

Für Kopien außerhalb des Servers tragt ihr einen S3-kompatiblen Speicher ein (alle vier Werte sind
nötig):

```dotenv [.env]
IVENTWORKS_BACKUP_S3_ENDPOINT=https://s3.example.com
IVENTWORKS_BACKUP_S3_BUCKET=iventworks-backups
IVENTWORKS_BACKUP_S3_ACCESS_KEY_ID=…
IVENTWORKS_BACKUP_S3_SECRET_ACCESS_KEY=…
IVENTWORKS_BACKUP_S3_PREFIX=iventworks/
```

Mit S3 gelten die Aufbewahrungsregeln dort. Lokal bleiben nur die neuesten
`IVENTWORKS_BACKUP_LOCAL_COPIES` Backups (Standard: 1).

## Backups von Hand

Im Container steht ein Backup-Werkzeug bereit:

```bash [Terminal]
# Backup jetzt erstellen
docker exec iventworks bun /opt/iventworks/app/.output/backup.mjs create

# Vorhandene Backups anzeigen (lokal und in S3)
docker exec iventworks bun /opt/iventworks/app/.output/backup.mjs list

# Ein Backup prüfen
docker exec iventworks bun /opt/iventworks/app/.output/backup.mjs verify iventworks-20270714-030000.backup
```

## Wiederherstellen

1. Backup in ein **leeres** Verzeichnis entpacken. `restore` nimmt eine lokale Datei, einen Namen
   im Backup-Verzeichnis oder einen Namen in S3 und prüft die Verschlüsselung, bevor es etwas
   schreibt:

   ```bash [Terminal]
   docker exec iventworks bun /opt/iventworks/app/.output/backup.mjs restore iventworks-20270714-030000.backup /opt/iventworks/backups/restore
   ```

   Das Verzeichnis enthält danach `db.sqlite`, `uploads/` und `manifest.json`.
2. Iventworks stoppen: `docker compose stop`
3. Die Datenbank in `/opt/iventworks/data` durch die wiederhergestellte ersetzen und die Dateien
   `db.sqlite-wal` und `db.sqlite-shm` löschen, falls vorhanden.
4. Den Ordner `uploads` ebenfalls ersetzen.
5. Iventworks wieder starten: `docker compose up -d`
