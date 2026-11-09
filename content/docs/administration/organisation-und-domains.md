---
title: "Organisation & Domains"
description: "Name, Farbe, Logo und Icon eurer Organisation in Iventworks anpassen und eigene Domains einrichten."
navigation:
  title: Organisation & Domains
---

# Organisation & Domains

## Erscheinungsbild

Unter **Administration → Organisation** passt ihr Iventworks an eure Organisation an:

- **Name**: So heißt eure Organisation in der App, in E-Mails und als installierte App.
- **Hauptfarbe**: für Buttons, Links und Hervorhebungen. Die Vorschau gilt sofort, gespeichert wird
  mit **Speichern**.
- **Logo und Icon**: Ohne eigene Bilder zeigt die App das Iventworks-Logo. Das Icon wird auch zum
  App-Icon, wenn jemand Iventworks [als App installiert](/docs/erste-schritte/app-installieren).

Auf derselben Seite legt ihr fest, ob **Freigabelinks** erlaubt sind und wie lange neue Links
standardmäßig gelten.

## Eigene Domains

Eigene Domains gibt es in der [Iventworks Cloud](/docs/cloud) und bei Installationen mit
[mehreren Organisationen](/docs/self-hosting/mehrere-organisationen). Jede Organisation hat dort
schon eine eigene Adresse, zum Beispiel `eure-organisation.app.iventworks.de`. Zusätzlich könnt ihr
eine eigene Domain wie `planung.eure-organisation.de` verwenden.

1. Trage die Domain unter **Organisation → Domains** ein. Iventworks zeigt dir zwei DNS-Einträge an.
2. Lege bei eurem Domain-Anbieter diese beiden Einträge an:
   - einen **TXT-Eintrag** `_iventworks-challenge.<eure-domain>` mit dem angezeigten Wert, als
     Nachweis, dass euch die Domain gehört
   - einen **CNAME-Eintrag** auf die Adresse eurer Organisation (für eine Hauptdomain ohne
     Subdomain: ALIAS oder CNAME-Flattening)
3. Iventworks prüft die Einträge alle 15 Minuten. Sobald sie stimmen, gilt die Domain als
   **verifiziert**.
4. Je nach Installation wird die Domain danach automatisch oder von einem System-Admin
   **freigegeben**. Erst dann ist eure Organisation darüber erreichbar.

Die erste aktive Domain wird zur **Hauptdomain**: Wer eine andere Adresse eurer Organisation öffnet,
wird dorthin weitergeleitet.
