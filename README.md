# Rechtliche Dokumente für agent-bot.de

Dieses Repository enthält alle erforderlichen rechtlichen Dokumente, um die Website agent-bot.de DSGVO-konform zu gestalten und die gesetzlichen Anforderungen gemäß TMG und DSGVO zu erfüllen.

## Enthaltene Dateien

| Datei | Beschreibung |
|-------|--------------|
| `impressum.html` | Impressum gemäß § 5 TMG |
| `datenschutz.html` | Datenschutzerklärung gemäß DSGVO |
| `agb.html` | Allgemeine Geschäftsbedingungen |
| `widerrufsbelehrung.html` | Widerrufsbelehrung für Verbraucher |
| `cookie-consent.js` | Cookie-Consent-Management-System |
| `styles.css` | Stylesheet für alle rechtlichen Seiten |
| `footer-update.html` | Anleitung zur Footer-Integration |

## Schnellstart

### 1. Firmendaten ergänzen

Vor der Veröffentlichung müssen alle Platzhalter durch Ihre tatsächlichen Firmendaten ersetzt werden. Die folgenden Platzhalter finden sich in allen HTML-Dateien:

```text
[Firmenname eintragen]      → Ihr vollständiger Firmenname
[Rechtsform eintragen]      → z.B. GmbH, UG, Einzelunternehmen
[Straße und Hausnummer]     → Ihre vollständige Adresse
[Postleitzahl und Ort]      → PLZ und Stadt
[E-Mail-Adresse]            → Ihre Kontakt-E-Mail
[Telefonnummer]             → Ihre Telefonnummer
[HRB-Nummer oder vergleichbar] → Handelsregisternummer
[DE-Nummer eintragen]       → Umsatzsteuer-Identifikationsnummer
```

### 2. Dateien auf den Server hochladen

Laden Sie alle Dateien in das Hauptverzeichnis Ihrer Website hoch:

```
/
├── index.html          (Ihre bestehende Hauptseite)
├── impressum.html      (NEU)
├── datenschutz.html    (NEU)
├── agb.html            (NEU)
├── widerrufsbelehrung.html (NEU)
├── cookie-consent.js   (NEU)
├── styles.css          (NEU)
└── images/             (Ihre bestehenden Bilder)
```

### 3. Footer aktualisieren

Ersetzen Sie den Footer Ihrer Hauptseite (`index.html`) durch den folgenden Code:

```html
<footer class="footer">
    <div class="footer-content">
        <div class="footer-links">
            <a href="impressum.html">Impressum</a>
            <a href="datenschutz.html">Datenschutz</a>
            <a href="agb.html">AGB</a>
            <a href="widerrufsbelehrung.html">Widerruf</a>
        </div>
        <p class="copyright">&copy; 2024 AGENT-BOT / CRM.BUILD. Alle Rechte vorbehalten.</p>
    </div>
</footer>
```

### 4. CSS-Styles integrieren

Fügen Sie das Stylesheet zu Ihrer Hauptseite hinzu, indem Sie diesen Link im `<head>`-Bereich einfügen:

```html
<link rel="stylesheet" href="styles.css">
```

Alternativ können Sie die relevanten CSS-Regeln in Ihre bestehende CSS-Datei kopieren.

### 5. Cookie-Banner aktivieren

Fügen Sie den folgenden Code vor dem schließenden `</body>`-Tag Ihrer Hauptseite ein:

```html
<script src="cookie-consent.js"></script>
```

## Dateistruktur

```
legal-pages/
├── README.md                    (Diese Datei)
├── impressum.html               (Impressum)
├── datenschutz.html             (Datenschutzerklärung)
├── agb.html                     (AGB)
├── widerrufsbelehrung.html      (Widerrufsbelehrung)
├── cookie-consent.js            (Cookie-Management)
├── styles.css                   (Stylesheet)
└── footer-update.html           (Integrationsanleitung)
```

## Rechtliche Anforderungen

### Impressum (§ 5 TMG)

Das Impressum muss folgende Angaben enthalten:

- Firmenname mit Rechtsform
- Anschrift des Unternehmens
- Vertretungsberechtigte Personen
- Handelsregisternummer und Registergericht
- Umsatzsteuer-Identifikationsnummer
- Kontaktmöglichkeiten (E-Mail, Telefon)
- Aufsichtsbehörde (falls zutreffend)

### Datenschutzerklärung (DSGVO)

Die Datenschutzerklärung informiert über:

- Verantwortlicher für die Datenverarbeitung
- Zwecke und Rechtsgrundlagen der Verarbeitung
- Kategorien personenbezogener Daten
- Empfänger der Daten
- Datenübertragungen in Drittländer
- Speicherfristen
- Betroffenenrechte
- Beschwerderecht bei Aufsichtsbehörden

### Cookie-Consent (DSGVO/ePrivacy)

Der Cookie-Banner ermöglicht:

- Differenzierte Einwilligung nach Cookie-Kategorien
- Separate Steuerung von Analytics- und Marketing-Cookies
- Dokumentation der Einwilligungen
- Jederzeitige Widerrufsmöglichkeit

### AGB und Widerrufsrecht (BGB)

- AGB regeln die Vertragsbeziehung
- Widerrufsbelehrung informiert Verbraucher über ihr 14-tägiges Widerrufsrecht
- Muster-Widerrufsformular zum Download

## GitHub-Integration

### Repository erstellen

1. Melden Sie sich bei GitHub an
2. Klicken Sie auf "New Repository"
3. Geben Sie dem Repository einen Namen (z.B. `legal-pages-agent-bot`)
4. Wählen Sie "Public" oder "Private"
5. Klicken Sie auf "Create repository"

### Dateien hochladen

Option A: Über GitHub Web Interface

1. Öffnen Sie Ihr Repository
2. Klicken Sie auf "Add file" → "Upload files"
3. Ziehen Sie alle Dateien per Drag & Drop in das Fenster
4. Klicken Sie auf "Commit changes"

Option B: Über Git CLI

```bash
git clone https://github.com/IhrUsername/legal-pages-agent-bot.git
cd legal-pages-agent-bot
# Kopieren Sie alle Dateien in das Verzeichnis
git add .
git commit -m "Add legal documents for agent-bot.de"
git push origin main
```

### Auf der Website verlinken

Laden Sie die Dateien von GitHub herunter und integrieren Sie sie in Ihre Website, oder verweisen Sie direkt auf die GitHub Pages-URL, falls aktiviert.

## Wartung und Aktualisierung

### Regelmäßige Überprüfung

- Überprüfen Sie die rechtlichen Dokumente mindestens einmal jährlich
- Aktualisieren Sie bei Änderungen der Rechtslage
- Passen Sie bei Änderungen des Leistungsangebots an

### Versionierung

Nutzen Sie Git, um Änderungen zu dokumentieren:

```bash
git tag -a v2025.01 -m "Legal documents January 2025"
git push origin v2025.01
```

## Haftungsausschluss

Die bereitgestellten Vorlagen dienen als Ausgangspunkt und sollten von einem Juristen geprüft und angepasst werden. Wir übernehmen keine Gewähr für die Richtigkeit, Vollständigkeit oder Aktualität der bereitgestellten Inhalte.

## Support

Bei Fragen zur Integration oder zu rechtlichen Anforderungen wenden Sie sich bitte an einen Rechtsanwalt oder Datenschutzbeauftragten.

---

Stand: Januar 2025
