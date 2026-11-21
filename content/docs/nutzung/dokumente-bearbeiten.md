---
title: "Dokumente bearbeiten"
description: "Dateien in Iventworks ansehen, Word, Excel und PowerPoint im Browser bearbeiten, neue Fassungen hochladen, Versionen zurückholen und Gelöschtes aus dem Papierkorb wiederherstellen."
navigation:
  title: Dokumente bearbeiten
---

# Dokumente bearbeiten

Wo Dokumente liegen und wer was darf, steht unter [Dokumente & Freigaben](/docs/nutzung/dokumente-und-freigaben).
Diese Seite zeigt, was du mit einer Datei tun kannst.

## Dateien ansehen

Ein Klick auf eine Datei öffnet sie im ganzen Fenster, ohne Seitenleiste:

- **PDFs** im PDF-Viewer deines Browsers, mit Suche, Drucken und Seitenübersicht. Wo der Browser
  keinen hat, etwa auf Android, zeigt Iventworks sie selbst an.
- **Bilder**
- **Markdown-Dateien** formatiert, zum Lesen
- **CSV-Dateien** als Tabelle
- **Textdateien**
- **Word, Excel und PowerPoint** im Office-Editor, wenn eure Organisation einen Office-Server hat,
  siehe [Office-Dokumente](#office-dokumente)

Oben führt der Pfeil zurück in den Ordner. Daneben steht der Name der Datei, auf größeren
Bildschirmen darunter auch, wo sie liegt. Rechts findest du **Versionen**, **Vollbild** und
**Herunterladen**, und wer Zugriff und Freigaben verwaltet, auch **Zugriff** und **Teilen** (Teilen
nur, solange eure Organisation Freigabelinks erlaubt). Im Menü daneben stehen bei PDFs, Bildern und Textdateien **In neuem Tab
öffnen** und, wenn du die Datei bearbeiten darfst, **Neue Fassung hochladen**. Auf schmalen
Bildschirmen wandern Zugriff, Versionen und Vollbild ins Menü. Dateien ohne Vorschau lädst du
herunter.

::callout{icon="i-lucide-notebook-pen"}
**Notizen oder Dokument?** Für schnelle Texte, Listen und Absprachen gibt es die **Notizen**, nur
für dich oder an einem Event, einer Gruppe oder dem Kernteam. Dokumente sind Dateien in Ordnern,
mit eigenem Zugriff, Versionen und Freigabelinks.
::

## Office-Dokumente

Hat eure Organisation einen Office-Server, öffnen sich Word-, Excel- und PowerPoint-Dateien direkt
im Office-Editor, auch `.odt`, `.ods`, `.odp` und `.rtf`:

- Darfst du die Datei bearbeiten, bearbeitest du sie gleich. Mehrere Personen können gleichzeitig
  darin arbeiten. Office speichert von selbst in Iventworks, sobald alle das Dokument geschlossen
  haben. Mit **Strg+S** (Mac: **⌘+S**) speicherst du sofort.
- Sonst öffnet sie sich zum Ansehen. Oben steht, was gilt: **Bearbeiten** oder **Nur ansehen**.
  Formate, die der Office-Server nur anzeigen kann, öffnen sich ebenfalls nur zum Ansehen.
- Der Versionsverlauf im Editor öffnet die [Versionen](#versionen) von Iventworks. Sein Knopf zum
  Teilen öffnet für Kernteam bzw. Leitung die Freigabelinks.

Über **Neu** in einem Ordner legst du ein leeres **Textdokument**, eine **Tabelle** oder eine
**Präsentation** an. Sie öffnen sich gleich im Editor, auf Deutsch eingestellt: mit deutscher
Rechtschreibprüfung und im A4-Format.

Solange jemand ein Dokument in Office bearbeitet, steht das in der Dateiliste. So lange kann
niemand eine neue Fassung hochladen, eine Version wiederherstellen oder das Dokument löschen, auch
nicht den Ordner, in dem es liegt.

Den Office-Server richtet ein, wer Iventworks betreibt, siehe
[Office-Server einrichten](/docs/self-hosting/office). Ohne ihn ladet ihr Office-Dateien herunter und als
**neue Fassung** wieder hoch.

## Neue Fassung hochladen

Über **Neue Fassung hochladen** im Menü einer Datei ersetzt du ihren Inhalt durch eine Datei von
deinem Gerät. Name, Ordner, Zugriff und Freigabelinks bleiben, die bisherige Fassung landet in den
Versionen.

## Versionen

Bei jeder Änderung behält Iventworks die vorige Fassung als Version, egal ob jemand eine neue
Fassung hochlädt, in Office bearbeitet oder über einen Freigabelink etwas ändert. Ändert dieselbe
Person eine Datei mehrmals kurz hintereinander, entsteht höchstens alle zehn Minuten eine Version.

In Office arbeiten oft mehrere Personen gleichzeitig. Dort entsteht eine Version, wenn Office in
Iventworks speichert: wenn alle das Dokument geschlossen haben oder jemand **Strg+S** drückt, auch
dann höchstens alle zehn Minuten eine, egal wer gespeichert hat.

1. Wähle **Versionen** oben in der geöffneten Datei oder im Menü der Datei in der Liste.
2. Du siehst jede Fassung mit Datum und der Person, die sie gespeichert hat. Mit dem Auge siehst du sie dir in
   Iventworks an, oder du lädst sie herunter.
3. Mit **Wiederherstellen**, in der Liste oder oben über der älteren Fassung, wird sie wieder die
   aktuelle. Sie bleibt in der Liste, und die bisherige aktuelle Fassung kommt als Version dazu. Du
   kannst das also rückgängig machen.

Wiederherstellen darf, wer die Datei bearbeiten darf. Versionen bleiben 30 Tage erhalten, die zehn
neuesten einer Datei auch länger. Mehr als 50 Versionen pro Datei hebt Iventworks nicht auf.

## Papierkorb

Gelöschte Dateien und Ordner landen im **Papierkorb**, Ordner mit allem, was darin liegt. Dort
bleiben sie 30 Tage und lassen sich wiederherstellen. Danach sind sie endgültig weg.

- Direkt nach dem Löschen holt **Rückgängig** in der Meldung das Gelöschte zurück.
- Das **Papierkorb**-Symbol neben der Suche öffnet den Papierkorb des Bereichs.
- Kernteam (in der Bibliothek) und Leitung (im Event) sehen alles darin. Alle anderen sehen, was sie
  selbst gelöscht haben.
- **Wiederherstellen** legt das Element zurück in seinen Ordner.
- Liegt der Ordner selbst auch im Papierkorb, hol am besten zuerst den Ordner zurück. Einzeln
  wiederherstellen können das Element dann nur Kernteam bzw. Leitung: Es kommt auf die oberste
  Ebene, mit eigenem Zugriff **Nur Kernteam** bzw. **Nur Leitung**, bis sie den Zugriff ändern.
- **Endgültig löschen** und **Papierkorb leeren** dürfen nur Kernteam bzw. Leitung. Dabei
  verschwinden auch alle Versionen.

Belege, Anhänge in Chats und die Dokumente eines gelöschten Events kommen nicht in den Papierkorb,
sie sind beim Löschen sofort weg.
