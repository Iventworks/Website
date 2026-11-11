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

## Live-Verbindung

Live-Updates kommen über eine WebSocket-Verbindung unter `/ws/realtime`.

- Sie meldet nur, **dass** sich etwas geändert hat. Die Daten selbst lädt die App wie immer über die
  API, mit denselben Rechteprüfungen.
- Zum Verbinden holt sich die App mit ihrer Anmeldung ein **einmaliges Ticket**, das 30 Sekunden gilt
  und nur für die eigene Organisation. Die Verbindung braucht kein Cookie, und das Anmelde-Token steht
  nie in der Adresse.
- Iventworks nimmt die Verbindung nur von der eigenen Adresse der Organisation an (`Origin`), andere
  Websites können keine Verbindung im Namen einer Person öffnen.
- **Abmelden**, das Beenden einer Sitzung oder eines API-Schlüssels und das Entziehen der Rolle
  trennen die Verbindung sofort. Zusätzlich prüft Iventworks jede Verbindung einmal pro Minute.
- Tickets, Verbindungen pro Person, Nachrichten pro Verbindung und ihre Größe sind begrenzt.

## Push-Benachrichtigungen

- Push-Benachrichtigungen sind **Ende-zu-Ende verschlüsselt** (Web Push). Der Push-Dienst des Browsers
  stellt sie zu, kann ihren Inhalt aber nicht lesen.
- Jede Person schaltet sie selbst pro Gerät ein und entscheidet, ob der Text einer Nachricht darin
  steht. Ohne Text zeigt das Gerät nur „Neue Nachricht von …“.
- Ein Gerät gehört zu einer Anmeldung: Abmelden, eine beendete oder abgelaufene Sitzung beenden auch
  die Push-Benachrichtigungen. Gesperrte und nicht freigeschaltete Konten bekommen keine.
- Iventworks schickt nur an die Push-Dienste von Google, Mozilla, Apple und Microsoft (und an
  eingetragene, siehe [Konfiguration](/docs/self-hosting/konfiguration#push-benachrichtigungen)),
  ohne Weiterleitungen. Ein Gerät kann so keine beliebige Adresse angeben, die euer Server aufruft.
- Jede Person kann ihren **Online-Status** und „zuletzt online“ verbergen. Dann speichert Iventworks
  auch nicht, wann sie zuletzt online war.

## Backups

Backups sind mit AES-256-GCM verschlüsselt, mit eigenem Salt und IV pro Backup. Sie lassen sich
prüfen, bevor sie wiederhergestellt werden. Siehe [Backups](/docs/self-hosting/backups).

## Checkliste für den Betrieb

- **Port nur lokal veröffentlichen** (`127.0.0.1:31316`) und HTTPS über den
  [Reverse Proxy](/docs/self-hosting/reverse-proxy), der auch WebSockets durchlässt.
- `IVENTWORKS_TRUST_PROXY=true` nur hinter genau einem Reverse Proxy. Wird der Port direkt
  veröffentlicht, auf `false` setzen, sonst lässt sich die Client-Adresse fälschen.
- Die interaktive API-Dokumentation mit `IVENTWORKS_API_DISABLE_DOCS=true` abschalten.
- **Backups einschalten**, eine Kopie außerhalb des Servers anlegen (S3) und die Passphrase
  außerhalb des Servers aufbewahren.
- Das Upload-Limit zum Arbeitsspeicher des Servers passend wählen, und das Limit im Proxy dazu.
- `IVENTWORKS_WEB_PUSH_SUBJECT` auf eine Adresse setzen, unter der ihr erreichbar seid, und das
  Push-Schlüsselpaar nach dem Start nicht mehr ändern.
- Regelmäßig [aktualisieren](/docs/self-hosting/installation).
- Freigabelinks bei Bedarf unter **Administration → Organisation** einschränken oder abschalten.

## Sicherheitslücke gefunden?

Bitte meldet Sicherheitsprobleme vertraulich über die [Kontaktseite](/kontakt) und nicht öffentlich.
