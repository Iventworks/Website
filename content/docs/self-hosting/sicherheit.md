---
title: "Sicherheit"
description: "Wie Iventworks Daten schützt: Trennung der Organisationen, Anmeldung, Sicherheits-Header, Backups, und was ihr beim Betrieb beachten solltet."
navigation:
  title: Sicherheit
---

# Sicherheit

Bei Freizeiten geht es um Daten von Kindern und Jugendlichen, oft auch um Gesundheitsangaben.
Iventworks ist deshalb von Grund auf auf Sicherheit ausgelegt. Diese Seite beschreibt die
technischen Maßnahmen und was ihr beim Self-Hosting beachten solltet. Eine Übersicht ohne
Technik-Details gibt es auf der Seite [Sicherheit & Datenschutz](/sicherheit).

## Trennung der Organisationen

Jede Zeile in der Datenbank gehört genau einer Organisation. Die Trennung wird in drei Ebenen
durchgesetzt:

1. **Jede Abfrage** filtert auf die Organisation der aktuellen Anfrage, und jeder neue Datensatz
   bekommt sie automatisch.
2. Eine **Schutzschicht** vor der Datenbank lehnt jede Abfrage auf Organisationsdaten ab, die nicht
   auf die aktuelle Organisation eingeschränkt ist. Ein vergessener Filter führt so zu einem Fehler
   statt zu einem Datenleck.
3. **Anmeldungen** werden nur innerhalb der Organisation der aufgerufenen Adresse gesucht.

Ein automatischer Test führt jede Funktion der API aus einer Organisation gegen eine andere aus:
Lesen, Schreiben und fremde IDs in Anfragen. Nach dem Testlauf darf kein Datensatz auf einen
Datensatz einer anderen Organisation verweisen.

## Anmeldung und Rechte

- Konten gibt es nur auf **Einladung**.
- Passwörter werden mit **Argon2** gehasht. Passwort-Links speichert Iventworks nur als Hash.
- **Anmeldeversuche sind begrenzt**. Fehlgeschlagene Anmeldungen dauern immer gleich lang, so lässt
  sich nicht herausfinden, ob ein Benutzername existiert.
- Sitzungen laufen nach sieben Tagen ab und lassen sich in den Einstellungen pro Gerät beenden.
- Alle **Rechte prüft der Server**. Gesundheitsangaben sieht nur das Team der jeweiligen Freizeit.
- Ein **Audit-Log** hält wichtige Änderungen fest, für die Organisation und pro Event.

## Sicherheits-Header

- Jede Antwort enthält `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`,
  `Permissions-Policy` und `Cross-Origin-Opener-Policy`, bei HTTPS zusätzlich **HSTS**.
- Seiten bekommen eine **Content-Security-Policy** mit den Hashes ihrer eigenen Skripte, ohne
  `unsafe-inline` oder `unsafe-eval` für Skripte. Antworten der API bekommen eine Policy, die
  nichts erlaubt.
- Icons und Schriften kommen vom eigenen Server, nicht von externen Diensten.
- Anfragen werden auf ihre Größe geprüft, bevor sie gelesen werden: Uploads bis
  `IVENTWORKS_MAX_UPLOAD_SIZE_MB`, alles andere bis 2 MB.

## Backups

Backups sind mit AES-256-GCM verschlüsselt, mit eigenem Salt und IV pro Backup. Sie lassen sich
prüfen, bevor sie wiederhergestellt werden. Siehe [Backups](/docs/self-hosting/backups).

## Checkliste für den Betrieb

- **Port nur lokal veröffentlichen** (`127.0.0.1:31316`) und HTTPS über den Reverse Proxy.
- `IVENTWORKS_TRUST_PROXY=true` nur hinter genau einem Reverse Proxy. Wird der Port direkt
  veröffentlicht, auf `false` setzen, sonst lässt sich die Client-Adresse fälschen.
- Die interaktive API-Dokumentation mit `IVENTWORKS_API_DISABLE_DOCS=true` abschalten.
- **Backups einschalten**, eine Kopie außerhalb des Servers anlegen (S3) und die Passphrase
  außerhalb des Servers aufbewahren.
- Das Upload-Limit zum Arbeitsspeicher des Servers passend wählen.
- Regelmäßig [aktualisieren](/docs/self-hosting/installation).
- Freigabelinks bei Bedarf unter **Administration → Organisation** einschränken oder abschalten.

## Sicherheitslücke gefunden?

Bitte meldet Sicherheitsprobleme vertraulich über die [Kontaktseite](/kontakt) und nicht öffentlich.
