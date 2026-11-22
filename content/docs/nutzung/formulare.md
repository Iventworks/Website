---
title: "Formulare"
description: "Umfragen, Anmeldungen und Feedback mit Link und QR-Code: Formulare in Iventworks anlegen, veröffentlichen, auswerten und als CSV exportieren."
navigation:
  title: Formulare
---

# Formulare

Mit Formularen fragt ihr etwas ab: Feedback nach einer Freizeit, Anmeldungen, eine schnelle Umfrage
im Gottesdienst. Wer den Link oder den QR-Code hat, kann antworten, ohne Konto in Iventworks. Die
Antworten wertet ihr direkt in Iventworks aus oder exportiert sie als Tabelle.

## Wo Formulare liegen

- **Kernteam → Formulare**: die Formulare des Kernteams und die **Vorlagen** für alle Formulare
- **Leitung → Formulare** im Menü eines Events: die Formulare dieses Events

Die Formulare eines Events sehen nur die Leitung und das Kernteam, nicht das übrige Team: Antworten
können persönliche Angaben enthalten, etwa bei einer Anmeldung.

## Formular anlegen

1. Klicke auf **Neues Formular**.
2. Wähle unter **Beginnen mit** ein leeres Formular oder eine Vorlage. Eine Vorlage bringt ihre
   Fragen, ihre Beschreibung und den Text nach dem Absenden mit.
3. Gib einen **Titel** ein und klicke auf **Formular anlegen**.

Das Formular ist jetzt ein **Entwurf**: Du kannst in Ruhe alles einrichten, niemand sonst sieht es.

## Fragen

Unter **Fragen** stehen Titel, Beschreibung und alle Fragen des Formulars. Die Beschreibung steht
über den Fragen und darf formatiert sein, etwa mit Listen oder Links. Mit **Frage hinzufügen** wählst
du die Art der Frage:

| Art | Antwort |
| --- | --- |
| **Kurze Antwort** | Eine Zeile Text |
| **Längere Antwort** | Mehrere Zeilen Text |
| **E-Mail-Adresse** | Eine Adresse, die auf ihre Form geprüft wird |
| **Zahl** | Eine Zahl, auf Wunsch mit Mindest- und Höchstwert oder nur ganze Zahlen |
| **Datum** | Ein Tag |
| **Einfachauswahl** | Eine der Optionen |
| **Mehrfachauswahl** | Beliebig viele der Optionen |
| **Auswahlliste** | Eine Option aus einer Liste zum Aufklappen |
| **Bewertung** | Sterne, normalerweise bis 5, einstellbar von 3 bis 10 |
| **Skala** | Eine Zahl von 0 oder 1 bis höchstens 10, mit Beschriftung an den Enden, z. B. „schlecht“ und „sehr gut“ |
| **Abschnitt** | Keine Antwort: eine Überschrift mit Text, die das Formular gliedert |

Jede Frage kann einen **Hinweis** haben und eine **Pflichtfrage** sein. Mit den Pfeilen verschiebst
du sie, daneben kannst du sie duplizieren oder löschen. Bei Auswahlfragen legt **Enter** im Feld einer
Option gleich die nächste an.

Änderungen speicherst du unten rechts mit **Speichern**. Wechselst du vorher zu einer anderen
Seite, fragt Iventworks nach. Wie das Formular für alle aussieht, zeigt **Vorschau** oben: Dort kannst du es
ausfüllen und prüfen lassen, gespeichert wird dabei nichts.

### Fragen nur bei bestimmter Antwort zeigen

Eine Frage oder ein ganzer Abschnitt kann von einer früheren Auswahlfrage abhängen. Schalte dazu
**Nur bei bestimmter Antwort zeigen** ein und wähle die Frage und die Antworten, bei denen sie
erscheinen soll.

Ein Beispiel aus der Vorlage *Anmeldung*: „Gibt es Allergien oder Unverträglichkeiten?“ mit *Ja* und
*Nein*, darunter „Welche?“ nur bei *Ja*. Wer *Nein* wählt, sieht die zweite Frage nicht.

- Die Bedingung eines **Abschnitts** gilt für alle Fragen bis zum nächsten Abschnitt.
- Eine ausgeblendete Frage muss nicht beantwortet werden, auch wenn sie eine Pflichtfrage ist. Was
  dort schon eingetragen war, wird nicht gespeichert.
- Löschst du eine Frage, entfernt Iventworks auch die Bedingungen, die sich auf sie bezogen.

## Veröffentlichen, Link und QR-Code

Ist alles fertig, klicke auf **Veröffentlichen**. Danach zeigt **Link & QR-Code**:

- den **Link** zum Kopieren oder Öffnen
- den **QR-Code**, zum Herunterladen als **PNG** (für jede Präsentation) oder **SVG** (scharf in jeder
  Größe, auch für den Druck)

Wer den Code mit dem Handy scannt, landet direkt im Formular. Der Link bleibt gleich, auch wenn du das
Formular schließt und wieder öffnest.

Fragen kannst du auch nach dem Veröffentlichen noch ändern. Gibt es schon Antworten, weist Iventworks
darauf hin: Änderungen gelten für neue Antworten, Antworten zu gelöschten Fragen erscheinen nicht mehr
in der Auswertung.

### Schließen und Fristen

- **Schließen** im Menü oben rechts beendet die Antworten. Wer den Link öffnet, sieht, dass das
  Formular keine Antworten mehr annimmt. **Wieder öffnen** nimmt wieder Antworten an.
- Unter **Einstellungen → Antworten annehmen bis** legst du einen Zeitpunkt fest, ab dem das Formular
  von selbst keine Antworten mehr annimmt. Öffnest du es danach wieder, entfällt die abgelaufene Frist.
- Unter **Einstellungen → Nach dem Absenden** steht der Text, den alle nach dem Absenden sehen, etwa
  ein Dank oder wie es weitergeht.

## Antworten auswerten

Unter **Antworten** gibt es zwei Ansichten:

- **Auswertung**: jede Frage für sich. Bei Auswahlfragen siehst du, wie oft jede Option gewählt
  wurde, bei Bewertungen, Skalen und Zahlen auch den Durchschnitt, den niedrigsten und den höchsten
  Wert. Bei Textfragen stehen die neuesten Antworten, mit **Alle anzeigen** alle.
- **Einzelne Antworten**: alle Antworten als Tabelle mit Nummer und Eingangszeit. Ein Klick öffnet
  eine Antwort mit allen Fragen; mit den Pfeilen blätterst du zur nächsten.

Die Filter oben gelten für beide Ansichten und für den Export:

- **Zeitraum**: nur Antworten aus diesen Tagen
- **Nach Antwort filtern**: nur, wer bei einer Auswahlfrage bestimmte Optionen gewählt hat, etwa alle
  Anmeldungen mit Allergien
- **Suche**: Text in irgendeiner Antwort

**CSV exportieren** lädt die gefilterten Antworten als Tabelle herunter, die Excel und LibreOffice
direkt öffnen. Einzelne Antworten, etwa Spam, löschst du in der Tabelle oder in der geöffneten
Antwort. **Alle Antworten löschen** im Menü daneben ist für den Neustart nach einem Testlauf: Die
Nummerierung beginnt dann wieder bei 1.

::callout{icon="i-lucide-shield-check"}
Antworten sind anonym: Iventworks speichert nur die Antworten und wann sie kamen, keine Anmeldung und
keine IP-Adresse. Fragt nur, was ihr wirklich braucht, und sagt in der Beschreibung, wofür.
::

## Vorlagen

Jede Organisation startet mit drei Vorlagen: **Feedback**, **Anmeldung** und
**Veranstaltungsbewertung**. Das Kernteam ändert und löscht sie wie eigene und legt weitere an:

- **Kernteam → Formulare**, oben **Vorlagen** wählen, dann **Neue Vorlage**
- oder bei einem fertigen Formular im Menü oben rechts **Als Vorlage speichern**

Vorlagen bearbeitest du wie Formulare, nur ohne Veröffentlichen und Antworten. Ein Formular übernimmt
die Fragen beim Anlegen; spätere Änderungen an der Vorlage ändern es nicht.

## Duplizieren, kopieren, löschen

- **Duplizieren** im Menü legt eine Kopie als neuen Entwurf an, ohne Antworten.
- Wird ein Event [kopiert](/docs/nutzung/freizeiten-und-events#events-kopieren), kommen seine Formulare
  als Entwürfe mit, ohne Antworten und mit neuem Link.
- **Löschen** entfernt das Formular mit allen Antworten. Der Link funktioniert danach nicht mehr.
