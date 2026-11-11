---
title: "Mehrere Organisationen"
description: "Viele Organisationen auf einer Iventworks-Installation betreiben, jede mit eigenen Benutzern, Daten und Domains."
navigation:
  title: Mehrere Organisationen
---

# Mehrere Organisationen

Eine Iventworks-Installation kann eine einzelne Organisation bedienen oder viele. Das steuert
`IVENTWORKS_MULTI_ORG`.

## Eine Organisation (Standard)

Mit `IVENTWORKS_MULTI_ORG=false` gibt es genau eine Organisation. Sie antwortet unter jeder Adresse,
die auf den Server zeigt. Name, Farbe, Logo und Icon ändern ihre Admins unter
**Administration → Organisation**.

## Viele Organisationen

Mit `IVENTWORKS_MULTI_ORG=true` bekommt jede Organisation eigene Benutzer, eigene Daten, eigene
Farben und eigene Domains. So läuft auch die [Iventworks Cloud](/docs/cloud).

- Jede Organisation ist unter `<kürzel>.<Adresse aus IVENTWORKS_APP_URL>` erreichbar, zum Beispiel
  `jugendwerk.app.iventworks.de`. Das Kürzel ändert sich nie, Name, Farbe, Logo und Icon schon.
- Unter der Basisadresse selbst liegt die **Systemverwaltung** (`<IVENTWORKS_APP_URL>/admin`).
  System-Admins legen dort Organisationen an, benennen sie um, ändern ihre Farbe, löschen sie,
  laden ihre Admins ein und verwalten ihre Domains.
- Jede Organisation ist eine eigene installierbare App mit eigenem Namen und Icon.

Beim ersten Start ist der Benutzer `admin` der erste **System-Admin**. Legt über die
Systemverwaltung die erste Organisation an und ladet ihre Admins ein.

### DNS und Reverse Proxy

- Ein **Wildcard-DNS-Eintrag** (`*.app.eure-domain.de`) zeigt auf den Server.
- Der Reverse Proxy leitet die Wildcard-Domain **und** alle eigenen Domains der Organisationen an
  Iventworks weiter und übergibt den ursprünglichen Hostnamen (im Header `Host` oder
  `X-Forwarded-Host`).
- Für Zertifikate braucht ihr ein Wildcard-Zertifikat oder **On-Demand-TLS**. Für On-Demand-TLS,
  etwa mit der `ask`-Option von Caddy, antwortet
  `GET /api/v1/instance/tls-check?domain=…` mit 200 für jede Adresse, die Iventworks bedient.

Eine fertige Caddy-Konfiguration mit On-Demand-TLS und Hinweise für nginx, Traefik und Apache stehen
unter [Reverse Proxy & HTTPS](/docs/self-hosting/reverse-proxy#mehrere-organisationen).

### Eigene Domains

Organisationen können eigene Domains hinzufügen, wie unter
[Organisation & Domains](/docs/administration/organisation-und-domains) beschrieben. Eine Domain ist
erst erreichbar, wenn sie **verifiziert und freigegeben** ist:

- Standardmäßig (`IVENTWORKS_CUSTOM_DOMAINS_SELF_SERVICE=false`) trägt ein System-Admin die Domain in
  den Reverse Proxy ein und gibt sie danach frei. **Systemverwaltung → Domains** zeigt, was auf
  Freigabe wartet. Domains, die ein System-Admin selbst hinzufügt, sind sofort freigegeben.
- Mit `IVENTWORKS_CUSTOM_DOMAINS_SELF_SERVICE=true` werden die Domains der Organisationen nach der
  Verifizierung automatisch freigegeben. Das ist nur sinnvoll, wenn euer Reverse Proxy neue Domains
  von selbst bedient, etwa mit On-Demand-TLS.

## Trennung der Organisationen

Alle Daten gehören genau einer Organisation, und Iventworks trennt sie in mehreren Ebenen
voneinander. Details unter [Sicherheit](/docs/self-hosting/sicherheit).
