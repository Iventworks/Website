---
title: "Konfiguration"
description: "Alle Einstellungen von Iventworks über IVENTWORKS_*-Umgebungsvariablen."
navigation:
  title: Konfiguration
---

# Konfiguration

Iventworks wird ausschließlich über Umgebungsvariablen mit dem Präfix `IVENTWORKS_` eingestellt. Im
Docker-Image sind Port und Pfade schon gesetzt. Ihr tragt nur ein, was bei euch anders ist.

::callout{icon="i-lucide-info"}
Ja/Nein-Werte sind genau `true` oder `false` (kleingeschrieben). Alles andere, auch ein leerer Wert,
verhindert den Start mit einer Fehlermeldung. Eine nicht gesetzte Variable nimmt den Standardwert.
::

## Allgemein

| Variable | Standard | Bedeutung |
| --- | --- | --- |
| `IVENTWORKS_APP_URL` | – | Die öffentliche Adresse, z. B. `https://planung.eure-organisation.de`. Bei mehreren Organisationen die Basisadresse, siehe [Mehrere Organisationen](/docs/self-hosting/mehrere-organisationen). |
| `IVENTWORKS_MULTI_ORG` | `false` | Viele Organisationen auf einer Installation |
| `IVENTWORKS_CUSTOM_DOMAINS_SELF_SERVICE` | `false` | Eigene Domains von Organisationen gehen ohne Freigabe durch einen System-Admin live |
| `IVENTWORKS_TIMEZONE` | `Europe/Berlin` | Zeitzone, z. B. dafür, was „heute“ auf der Übersicht bedeutet |
| `IVENTWORKS_TRUST_PROXY` | `false` | Hinter genau einem Reverse Proxy: Client-Adresse für die Begrenzung von Anmeldeversuchen aus `X-Forwarded-For` lesen |
| `IVENTWORKS_API_DISABLE_DOCS` | `false` | Die interaktive API-Dokumentation unter `/api/docs/v1` abschalten |
| `IVENTWORKS_LOG_LEVEL` | `info` | Ausführlichkeit der Logs |

## Dateien

| Variable | Standard | Bedeutung |
| --- | --- | --- |
| `IVENTWORKS_UPLOAD_DIR` | `./data/uploads` | Ablage der hochgeladenen Dateien |
| `IVENTWORKS_MAX_UPLOAD_SIZE_MB` | `25` | Maximale Dateigröße beim Hochladen. Andere Anfragen sind auf 2 MB begrenzt. |

Uploads werden während der Verarbeitung im Arbeitsspeicher gehalten. Haltet das Limit deshalb im
Verhältnis zum RAM eures Servers.

## Push-Benachrichtigungen

Push-Benachrichtigungen funktionieren ohne Einstellung. Iventworks nutzt dafür den Standard Web Push:
Der Server schickt jede Benachrichtigung verschlüsselt an den Push-Dienst des jeweiligen Browsers
(Google, Mozilla, Apple, Microsoft), der sie an das Gerät zustellt. Ein Konto oder einen Schlüssel bei
diesen Diensten braucht ihr nicht.

| Variable | Standard | Bedeutung |
| --- | --- | --- |
| `IVENTWORKS_WEB_PUSH_SUBJECT` | `IVENTWORKS_APP_URL`, wenn sie mit `https` beginnt | Kontakt für die Push-Dienste, falls es Probleme mit euren Nachrichten gibt: `mailto:admin@eure-organisation.de` oder eine `https://`-Adresse |
| `IVENTWORKS_WEB_PUSH_PUBLIC_KEY` / `IVENTWORKS_WEB_PUSH_PRIVATE_KEY` | – | Eigenes Schlüsselpaar (VAPID), z. B. aus `bunx web-push generate-vapid-keys`. Ohne diese Werte erzeugt Iventworks beim ersten Start ein Paar und speichert es in der Datenbank. |
| `IVENTWORKS_WEB_PUSH_EXTRA_HOSTS` | – | Weitere Push-Dienste, kommagetrennt. Google, Mozilla, Apple und Microsoft sind eingebaut. |

::callout{icon="i-lucide-key-round" color="warning"}
Ändert das Schlüsselpaar nach dem Start nicht mehr. Sonst funktionieren die Push-Benachrichtigungen auf
keinem Gerät mehr, bis jede Person sie dort neu einschaltet. Das gespeicherte Paar ist Teil der
Datenbank und damit in jedem [Backup](/docs/self-hosting/backups) enthalten.
::

Iventworks schickt nur an die eingebauten und die eingetragenen Push-Dienste. Ein Gerät kann so keine
beliebige Adresse angeben, die euer Server dann aufruft.

## E-Mail

| Variable | Bedeutung |
| --- | --- |
| `IVENTWORKS_SMTP_HOST` | SMTP-Server. Ohne diesen Wert ist der E-Mail-Versand aus. |
| `IVENTWORKS_SMTP_PORT` | Port, z. B. `465` |
| `IVENTWORKS_SMTP_SECURE` | `true` für TLS |
| `IVENTWORKS_SMTP_USERNAME` / `IVENTWORKS_SMTP_PASSWORD` | Zugangsdaten |
| `IVENTWORKS_SMTP_FROM` | Absender, z. B. `'"Iventworks" <noreply@eure-organisation.de>'` |

## Backups

| Variable | Standard | Bedeutung |
| --- | --- | --- |
| `IVENTWORKS_BACKUP_ENABLED` | `false` | Automatische Backups einschalten |
| `IVENTWORKS_BACKUP_SCHEDULE` | `0 3 * * *` | Zeitplan als Cron-Ausdruck, in `IVENTWORKS_TIMEZONE` (Standard: täglich um 3 Uhr) |
| `IVENTWORKS_BACKUP_PASSPHRASE` | – | Passphrase für die Verschlüsselung, mindestens 16 Zeichen |
| `IVENTWORKS_BACKUP_DIR` | `./data/backups` | Lokales Backup-Verzeichnis |
| `IVENTWORKS_BACKUP_RETENTION_DAYS` | `30` | Backups, die älter sind, werden gelöscht (`0`: alle behalten) |
| `IVENTWORKS_BACKUP_RETENTION_MIN_COUNT` | `3` | So viele der neuesten Backups bleiben immer erhalten |
| `IVENTWORKS_BACKUP_S3_ENDPOINT`, `_BUCKET`, `_ACCESS_KEY_ID`, `_SECRET_ACCESS_KEY` | – | Optionaler S3-kompatibler Speicher für Kopien außerhalb des Servers (alle vier nötig) |
| `IVENTWORKS_BACKUP_S3_REGION`, `_PREFIX` | – | Region und Pfad-Präfix im Bucket |
| `IVENTWORKS_BACKUP_LOCAL_COPIES` | `1` | Mit S3: so viele neueste Backups bleiben zusätzlich lokal (`0`: keine) |

Details unter [Backups](/docs/self-hosting/backups).

## Datenbank und Pfade

| Variable | Standard | Bedeutung |
| --- | --- | --- |
| `IVENTWORKS_DB_PATH` | `./data/db.sqlite` | SQLite-Datenbank |
| `IVENTWORKS_DB_AUTO_MIGRATE` | `true` | Migrationen beim Start automatisch ausführen |
| `IVENTWORKS_LOG_DIR` | `./data/logs` | Log-Dateien |
| `IVENTWORKS_CONFIG_BASE_DIR` | `./config` | Konfigurationsdateien, z. B. der erste Admin-Link |

Im Docker-Image liegen diese Pfade unter `/opt/iventworks/`.
