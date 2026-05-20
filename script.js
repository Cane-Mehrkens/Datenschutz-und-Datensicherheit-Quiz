/* LF4 Quiz + Lernmodus – reine Offline-Webseite, Speicherung mit Cookies direkt im Browser */
const APP_VERSION = "lf4-quiz-v4-mehr-fragen-abschluss";
const STORAGE_KEY = "lf4_quiz_lernmodus_save_v2";

const chapters = [
  { id:"begriffe", icon:"🛡️", title:"Datenschutz & Datensicherheit", short:"Begriffe sauber erklären und unterscheiden.", color:"#4f46e5" },
  { id:"tom", icon:"🏢", title:"Gefahren & TOM", short:"Situationen erkennen und passende technische/organisatorische Maßnahmen nennen.", color:"#0f766e" },
  { id:"struktur", icon:"🧩", title:"Strukturanalyse", short:"Geschäftsprozesse, Anwendungen, IT-Systeme, Netzplan, Räume erfassen.", color:"#b45309" },
  { id:"schutzbedarf", icon:"📊", title:"Schutzbedarfsfeststellung", short:"Schutzziele, Kategorien, Schadensszenarien und Vererbung anwenden.", color:"#be123c" },
  { id:"raid", icon:"💽", title:"RAID-Level", short:"RAID 0, 1, 5, 6, 01, 10, Hot-Spare und nutzbaren Speicher erklären.", color:"#7c3aed" },
  { id:"backup", icon:"🗄️", title:"Datensicherung", short:"Voll-, differentielles und inkrementelles Backup, Generationenprinzip und 3-2-1-1-0.", color:"#2563eb" },
  { id:"krypto", icon:"🔐", title:"Verschlüsselung & Hashing", short:"Symmetrisch, asymmetrisch, AES, RSA, Hash und Salt als Zusatzkapitel.", color:"#c2410c" }
,
{"id": "recht", "icon": "⚖️", "title": "DSGVO & BDSG Grundlagen", "short": "Artikel, Grundsätze, Rechtsgrundlagen, Betroffenenrechte und Datenschutzverletzungen anwenden.", "color": "#0e7490"},
{"id": "isms", "icon": "🧭", "title": "Sicherheitsmanagement / ISMS", "short": "Sicherheitsprozess, PDCA, Leitlinie, ISB, Rollen und Dokumentation verstehen.", "color": "#15803d"},
{"id": "risiko", "icon": "⚠️", "title": "Risikoanalyse", "short": "Gefährdungen, Häufigkeit, Schadenshöhe, Risikoentscheidung und Restrisiken bewerten.", "color": "#a16207"},
{"id": "umsetzung", "icon": "🛠️", "title": "Umsetzungsplanung", "short": "Maßnahmen priorisieren, Aufwand schätzen, Verantwortliche und Realisierungsplan festlegen.", "color": "#9333ea"},
{"id": "verbesserung", "icon": "🔁", "title": "Aufrechterhaltung & Verbesserung", "short": "Kontrolle, Kennzahlen, Reifegrad, IS-Revision, Cyber-Sicherheits-Check und Zertifizierung.", "color": "#0369a1"},
{"id": "abschluss", "icon": "🎓", "title": "Abschlusskapitelprüfung", "short": "Schwere gemischte Prüfung über alle Kapitel. Wird nach Abschluss aller anderen Kapitel freigeschaltet.", "color": "#111827"}];

const terms = [
  {chapter:"begriffe", term:"Datenschutz", text:"Datenschutz schützt personenbezogene Daten und damit die Rechte der betroffenen Personen. Es geht darum, ob Daten überhaupt erhoben, gespeichert, genutzt oder weitergegeben werden dürfen.", example:"Kanzlei-Beispiel: Mandantendaten dürfen nicht einfach an unberechtigte Personen weitergegeben werden.", memory:"Merksatz: Datenschutz = Schutz der Person hinter den Daten."},
  {chapter:"begriffe", term:"Datensicherheit", text:"Datensicherheit schützt Daten allgemein vor Verlust, Manipulation und unbefugtem Zugriff. Sie betrifft auch Daten ohne Personenbezug, zum Beispiel Vertragsvorlagen oder interne Kalkulationen.", example:"Kanzlei-Beispiel: Server, Backups, Passwörter und Firewalls sorgen für Datensicherheit.", memory:"Merksatz: Datensicherheit = Schutz der Daten selbst."},
  {chapter:"begriffe", term:"Personenbezogene Daten", text:"Alle Informationen, die sich auf eine identifizierte oder identifizierbare Person beziehen.", example:"Name, Adresse, Telefonnummer, E-Mail, Aktenzeichen mit Mandantenbezug, IP-Adresse.", memory:"Wenn man dadurch eine Person erkennen kann, ist es personenbezogen."},
  {chapter:"begriffe", term:"Vertraulichkeit", text:"Informationen dürfen nur von berechtigten Personen gelesen oder genutzt werden.", example:"Nur der zuständige Anwalt und die zuständige Assistenz dürfen eine Mandantenakte öffnen.", memory:"Vertraulichkeit fragt: Wer darf es sehen?"},
  {chapter:"begriffe", term:"Integrität", text:"Daten müssen korrekt, vollständig und unverändert sein. Manipulation oder versehentliche Änderung soll verhindert oder erkannt werden.", example:"Eine Frist im Kalender darf nicht unbemerkt verändert werden.", memory:"Integrität fragt: Ist es richtig und unverändert?"},
  {chapter:"begriffe", term:"Verfügbarkeit", text:"Berechtigte Personen müssen rechtzeitig auf Systeme und Daten zugreifen können.", example:"Die Kanzlei muss auf Akten, E-Mails und Fristen zugreifen können, wenn ein Gerichtstermin ansteht.", memory:"Verfügbarkeit fragt: Komme ich rechtzeitig dran?"},

  {chapter:"tom", term:"TOM", text:"Technisch-organisatorische Maßnahmen sind Schutzmaßnahmen, mit denen Datenschutz und Datensicherheit umgesetzt und nachgewiesen werden.", example:"Technisch: Passwort, Firewall, Backup. Organisatorisch: Berechtigungskonzept, Dienstanweisung, Backup-Plan.", memory:"TOM = Technik + Organisation."},
  {chapter:"tom", term:"Technische Maßnahme", text:"Eine Maßnahme, die mit Technik, Geräten, Software oder baulicher/physischer Absicherung umgesetzt wird.", example:"Benutzerkonten, Passwortpflicht, verschlossene Servergehäuse, deaktivierte USB-Ports, Alarmanlage.", memory:"Technisch = etwas wird technisch/physisch erzwungen."},
  {chapter:"tom", term:"Organisatorische Maßnahme", text:"Eine Maßnahme durch Regeln, Zuständigkeiten, Schulungen, Verträge oder dokumentierte Abläufe.", example:"Berechtigungskonzept, Reinigungspersonal vertraglich verpflichten, Backup-Dokumentation, Wiederherstellungstest planen.", memory:"Organisatorisch = Menschen und Abläufe werden geregelt."},
  {chapter:"tom", term:"Zugangskontrolle", text:"Unbefugte sollen keinen Zugang zu Verarbeitungsanlagen erhalten.", example:"Serverraum abschließen, Gerätegehäuse verriegeln, USB-Ports deaktivieren.", memory:"Zugang = physisch oder technisch an die Anlage herankommen."},
  {chapter:"tom", term:"Benutzerkontrolle", text:"Unbefugte sollen automatisierte Verarbeitungssysteme nicht nutzen können.", example:"Login mit Benutzername/Passwort, Rollen- und Rechtekonzept, gesperrte Konten ehemaliger Mitarbeitender.", memory:"Benutzerkontrolle = Wer darf sich anmelden und was nutzen?"},
  {chapter:"tom", term:"Übertragungskontrolle", text:"Es muss nachvollziehbar sein, an wen personenbezogene Daten übertragen oder bereitgestellt wurden.", example:"Protokollierung von Dateiabrufen, verschlüsselte E-Mail, Prüfung von Übertragungen.", memory:"Übertragung = Wohin gingen Daten?"},
  {chapter:"tom", term:"Wiederherstellbarkeit", text:"Systeme und Daten müssen nach einem Störfall wiederhergestellt werden können.", example:"Backup-Systeme, RAID, zweiter Server, Wiederherstellung testen und dokumentieren.", memory:"Backup ohne Test ist nur Hoffnung."},
  {chapter:"tom", term:"Verfügbarkeitskontrolle", text:"Personenbezogene Daten sollen gegen Zerstörung oder Verlust geschützt werden.", example:"Serverraum gegen Feuer/Wasser absichern, Zutrittsbeschränkung, USV, Backup-Konzept.", memory:"Verfügbarkeit braucht Schutz vor Ausfall und Verlust."},

  {chapter:"struktur", term:"Strukturanalyse", text:"Die Strukturanalyse sammelt die wichtigen Informationen über den Informationsverbund, damit später passende Schutzmaßnahmen festgelegt werden können.", example:"In einer Kanzlei: Welche Prozesse gibt es? Welche Anwendungen und IT-Systeme werden genutzt? Wo stehen Server und Clients?", memory:"Erst verstehen, was es gibt – dann schützen."},
  {chapter:"struktur", term:"Informationsverbund", text:"Der abgegrenzte Bereich, der betrachtet und geschützt werden soll: Prozesse, Informationen, Anwendungen, Systeme, Räume und Verbindungen.", example:"Die gesamte Kanzlei oder nur der Standort mit Serverraum, Empfang, Büros und IT.", memory:"Informationsverbund = alles, was zusammen betrachtet wird."},
  {chapter:"struktur", term:"Geschäftsprozess", text:"Ein wichtiger Ablauf oder eine Aufgabe der Institution. Dabei werden Informationen benötigt, verarbeitet oder gespeichert.", example:"Mandatsannahme, Fristenverwaltung, Aktenführung, Rechnungsstellung.", memory:"Prozess = Was macht die Organisation?"},
  {chapter:"struktur", term:"Anwendung", text:"Eine IT-Lösung, die Geschäftsprozesse unterstützt und Schutz benötigt.", example:"MS Office, E-Mail-System, Kanzleisoftware, Dateiablage, Active Directory.", memory:"Anwendung = womit gearbeitet wird."},
  {chapter:"struktur", term:"IT-System", text:"Technische Systeme wie Clients, Server, Router, Switches, Drucker, mobile Geräte oder Produktions-/Steuerungssysteme.", example:"Desktop der Assistenz, Kanzlei-Server, Firewall, zentraler Switch, Notebook eines Anwalts.", memory:"IT-System = worauf oder worüber die Anwendung läuft."},
  {chapter:"struktur", term:"Netzplan", text:"Grafische Übersicht über IT-Systeme, ihre Verbindungen und Außenverbindungen.", example:"Internet → Router → Firewall → Switch → Server und Clients.", memory:"Netzplan = Karte des Netzwerks."},
  {chapter:"struktur", term:"Gruppierung", text:"Ähnliche Objekte können zusammengefasst werden, wenn sie gleichartig sind, ähnlich konfiguriert sind, gleiche Anwendungen nutzen und gleichen Schutzbedarf haben.", example:"Alle gleich eingerichteten Desktop-PCs im Sekretariat als eine Client-Gruppe.", memory:"Nur gruppieren, wenn gleiche Schutzmaßnahmen sinnvoll sind."},
  {chapter:"struktur", term:"Angemessene Granularität", text:"Nicht zu grob und nicht zu fein erfassen. Sonst fehlen wichtige Unterschiede oder es entsteht unnötiger Aufwand.", example:"Office nicht unbedingt in Word, Excel und PowerPoint trennen, wenn alles gleich geschützt wird.", memory:"So detailliert wie nötig, so einfach wie möglich."},

  {chapter:"schutzbedarf", term:"Schutzbedarfsfeststellung", text:"Es wird eingeschätzt, welcher Schaden entsteht, wenn Vertraulichkeit, Integrität oder Verfügbarkeit verletzt werden.", example:"Was passiert, wenn Mandantenakten öffentlich werden, Fristen falsch sind oder das E-Mail-System ausfällt?", memory:"Frage immer: Was wäre, wenn...?"},
  {chapter:"schutzbedarf", term:"Schutzbedarf normal", text:"Die Schadensauswirkungen sind begrenzt und überschaubar.", example:"Kurzzeitiger Ausfall einer wenig kritischen Anwendung ist verkraftbar.", memory:"Normal = ärgerlich, aber beherrschbar."},
  {chapter:"schutzbedarf", term:"Schutzbedarf hoch", text:"Die Schadensauswirkungen können beträchtlich sein.", example:"Verlust wichtiger Mandantendaten oder längerer Ausfall zentraler Systeme.", memory:"Hoch = ernstes Problem."},
  {chapter:"schutzbedarf", term:"Schutzbedarf sehr hoch", text:"Die Schadensauswirkungen können existenziell bedrohlich oder katastrophal sein.", example:"Massiver Datenabfluss sensibler Mandantendaten oder Ausfall bei nicht tolerierbarer Fristensache.", memory:"Sehr hoch = kann die Existenz gefährden."},
  {chapter:"schutzbedarf", term:"Schadensszenarien", text:"Typische Blickwinkel für mögliche Schäden: Gesetze/Verträge, informationelle Selbstbestimmung, persönliche Unversehrtheit, Aufgabenerfüllung, Innen-/Außenwirkung, finanzielle Auswirkungen.", example:"Bei einer Kanzlei sind Gesetze, Vertraulichkeit, Image und Fristen besonders wichtig.", memory:"Schaden nicht nur in Euro denken."},
  {chapter:"schutzbedarf", term:"Maximumprinzip", text:"Der höchste Schutzbedarf der zugeordneten Anwendungen oder Informationen wird auf das Zielobjekt übernommen.", example:"Wenn auf einem Server eine Anwendung mit hoher Vertraulichkeit läuft, bekommt der Server mindestens hohe Vertraulichkeit.", memory:"Das stärkste Risiko zieht hoch."},
  {chapter:"schutzbedarf", term:"Kumulationseffekt", text:"Mehrere eigentlich weniger kritische Objekte können zusammen einen höheren Schutzbedarf erzeugen.", example:"Viele normale Anwendungen auf einem Server: Fällt alles gleichzeitig aus, kann der Gesamtschaden hoch sein.", memory:"Viele kleine Ausfälle können groß werden."},
  {chapter:"schutzbedarf", term:"Verteilungseffekt", text:"Der Schutzbedarf kann niedriger bewertet werden, wenn eine wichtige Anwendung auf mehrere Systeme verteilt ist und ein einzelnes System nur weniger kritische Teile trägt.", example:"Redundante Server können die Verfügbarkeit verbessern.", memory:"Verteilung kann entlasten."},

  {chapter:"raid", term:"RAID", text:"RAID verbindet mehrere Festplatten zu einem logischen Speicher, um Geschwindigkeit, Verfügbarkeit oder Redundanz zu verbessern. RAID ersetzt kein Backup.", example:"Ein Server nutzt mehrere 4-TB-Festplatten als RAID-Verbund.", memory:"RAID schützt eher vor Plattenausfall, Backup schützt vor Datenverlust."},
  {chapter:"raid", term:"RAID 0 – Striping", text:"Daten werden auf mehrere Platten verteilt. Sehr schnell und voller Speicher, aber keine Redundanz.", example:"4 × 4 TB ergeben 16 TB nutzbar. Fällt eine Platte aus, sind alle Daten gefährdet.", memory:"0 Redundanz."},
  {chapter:"raid", term:"RAID 1 – Mirroring", text:"Daten werden gespiegelt. Gute Redundanz, aber wenig nutzbarer Speicher.", example:"Bei vier gleich großen Platten als vollständige Spiegelung bleiben 4 TB nutzbar.", memory:"1 Spiegel."},
  {chapter:"raid", term:"RAID 5", text:"Striping mit verteilter Parität. Mindestens 3 Platten. Eine Platte darf ausfallen.", example:"4 × 4 TB ergeben 12 TB nutzbar.", memory:"Eine Platte ist rechnerisch für Parität weg."},
  {chapter:"raid", term:"RAID 6", text:"Wie RAID 5, aber mit doppelter Parität. Mindestens 4 Platten. Zwei Platten dürfen ausfallen.", example:"4 × 4 TB ergeben 8 TB nutzbar.", memory:"Zwei Platten für Sicherheit."},
  {chapter:"raid", term:"RAID 01", text:"Erst Striping, dann Spiegelung. Benötigt mindestens 4 Platten. Nutzbar ist ungefähr die Hälfte.", example:"4 × 4 TB ergeben 8 TB nutzbar.", memory:"01 = Stripe-Sets werden gespiegelt."},
  {chapter:"raid", term:"RAID 10", text:"Erst Spiegelpaare, dann Striping. Benötigt mindestens 4 Platten. Oft robuster als RAID 01.", example:"4 × 4 TB ergeben 8 TB nutzbar.", memory:"10 = Spiegel werden gestreift."},
  {chapter:"raid", term:"Hot-Spare", text:"Eine Ersatzfestplatte ist eingebaut und wartet ungenutzt. Fällt eine Platte aus, kann sie automatisch einspringen.", example:"Server startet den Rebuild automatisch auf die Hot-Spare-Platte.", memory:"Hot-Spare = Ersatzrad im Server."},
  {chapter:"raid", term:"Hardware-RAID", text:"Ein eigener RAID-Controller verwaltet den RAID-Verbund. Das entlastet das Betriebssystem und bietet oft Zusatzfunktionen.", example:"RAID-Controller im Server mit Cache und Management-Oberfläche.", memory:"Hardware-RAID = Controller macht die Arbeit."},
  {chapter:"raid", term:"Software-RAID", text:"Das Betriebssystem verwaltet den RAID-Verbund. Es ist günstiger und flexibler, kann aber CPU/OS-Abhängigkeiten haben.", example:"RAID über Windows Server oder Linux mdadm/ZFS-ähnliche Lösungen.", memory:"Software-RAID = Betriebssystem macht die Arbeit."},

  {chapter:"backup", term:"Voll-Backup", text:"Alle ausgewählten Daten werden komplett gesichert. Wiederherstellung ist einfach, braucht aber viel Speicher und Zeit.", example:"Jeden Sonntag kompletter Backup-Stand aller Kanzleidaten.", memory:"Voll = alles."},
  {chapter:"backup", term:"Differentielles Backup", text:"Es sichert alle Änderungen seit dem letzten Voll-Backup. Es wächst bis zum nächsten Voll-Backup.", example:"Sonntag Vollbackup, Mittwoch differentiell enthält alle Änderungen seit Sonntag.", memory:"Differentiell = seit dem letzten Vollbackup."},
  {chapter:"backup", term:"Inkrementelles Backup", text:"Es sichert nur Änderungen seit der letzten Sicherung, egal ob Voll- oder inkrementell. Spart Speicher, Wiederherstellung braucht aber die Kette.", example:"Sonntag Vollbackup, Montag Änderung, Dienstag nur Änderung seit Montag.", memory:"Inkrementell = seit dem letzten Backup."},
  {chapter:"backup", term:"Generationenprinzip", text:"Backups werden in Generationen aufbewahrt, häufig nach Großvater-Vater-Sohn: monatlich, wöchentlich, täglich.", example:"Tagesbackups, Wochenbackups und Monatsbackups werden unterschiedlich lange behalten.", memory:"Mehrere Generationen verhindern, dass ein Fehler sofort alle Sicherungen ersetzt."},
  {chapter:"backup", term:"3-2-1-1-0-Regel", text:"3 Datenkopien, 2 unterschiedliche Speichermedien, 1 Kopie außer Haus, 1 Kopie offline/immutable, 0 Fehler durch Prüfung und Restore-Tests.", example:"Serverdaten + NAS + verschlüsseltes Offsite-Backup + offline/immutable Sicherung + Test ohne Fehler.", memory:"3-2-1-1-0 = Kopien, Medien, Offsite, Offline, Null Fehler."},
  {chapter:"backup", term:"Restore-Test", text:"Ein Backup ist erst wirklich sicher, wenn die Wiederherstellung getestet wurde.", example:"Die Kanzlei stellt testweise eine Akte oder VM aus dem Backup wieder her.", memory:"Nicht getestetes Backup = unsicher."},
  {chapter:"backup", term:"RPO", text:"Recovery Point Objective: Wie viel Datenverlust maximal akzeptiert wird.", example:"RPO 4 Stunden bedeutet: höchstens 4 Stunden Daten dürfen verloren gehen.", memory:"RPO = bis zu welchem Datenstand zurück?"},
  {chapter:"backup", term:"RTO", text:"Recovery Time Objective: Wie lange die Wiederherstellung maximal dauern darf.", example:"RTO 2 Stunden bedeutet: System muss spätestens nach 2 Stunden wieder laufen.", memory:"RTO = wie schnell wieder online?"},

  {chapter:"krypto", term:"Symmetrische Verschlüsselung", text:"Ein geheimer Schlüssel verschlüsselt und entschlüsselt. Schnell, aber der Schlüssel muss sicher ausgetauscht werden.", example:"AES für Festplattenverschlüsselung, VPN, WLAN oder große Datenmengen.", memory:"Symmetrisch = ein gemeinsamer Schlüssel."},
  {chapter:"krypto", term:"Asymmetrische Verschlüsselung", text:"Es gibt einen öffentlichen und einen privaten Schlüssel. Der öffentliche Schlüssel kann geteilt werden, der private bleibt geheim.", example:"RSA/ECC für Schlüsselaustausch, digitale Signaturen, Zertifikate und E-Mail-Verschlüsselung.", memory:"Asymmetrisch = Public Key + Private Key."},
  {chapter:"krypto", term:"AES", text:"Advanced Encryption Standard. Symmetrisches Verfahren, schnell und verbreitet für große Datenmengen.", example:"BitLocker, VeraCrypt, Cloud-Speicherung, WPA2/WPA3, VPN.", memory:"AES = schnell für Datenmengen."},
  {chapter:"krypto", term:"RSA", text:"Asymmetrisches Verfahren, verbreitet für Schlüsselaustausch, digitale Signaturen und Zertifikate.", example:"TLS/SSL, PGP, digitale Zertifikate.", memory:"RSA = Schlüsselpaare."},
  {chapter:"krypto", term:"Hashfunktion", text:"Erzeugt aus Daten einen Hashwert fester Länge. Hashing ist nicht umkehrbar und dient Integrität oder Passwortspeicherung.", example:"Dateidownload prüfen oder Passwort nicht im Klartext speichern.", memory:"Hash = Fingerabdruck, keine Verschlüsselung."},
  {chapter:"krypto", term:"Salted Hash", text:"Vor dem Hashen wird ein zufälliger Salt ergänzt. Dadurch bekommen gleiche Passwörter unterschiedliche Hashwerte und Rainbow Tables werden erschwert.", example:"Passwort + Salt → Hashwert.", memory:"Salt = Zufallswürze gegen vorberechnete Angriffe."}
,
{"chapter": "recht", "term": "DSGVO", "text": "Die Datenschutz-Grundverordnung ist die zentrale EU-Regelung zum Schutz personenbezogener Daten. Sie legt Begriffe, Grundsätze, Rechte betroffener Personen und Pflichten für Verantwortliche fest.", "example": "Eine Kanzlei muss Mandantendaten rechtmäßig, zweckgebunden und sicher verarbeiten.", "memory": "DSGVO = Regeln für personenbezogene Daten in der EU."},
{"chapter": "recht", "term": "BDSG", "text": "Das Bundesdatenschutzgesetz ergänzt die DSGVO in Deutschland, zum Beispiel für spezielle nationale Regelungen und bestimmte öffentliche/berufliche Situationen.", "example": "In Deutschland können DSGVO und BDSG zusammen relevant sein, wenn eine Kanzlei Beschäftigten- oder Mandantendaten verarbeitet.", "memory": "BDSG = deutsche Ergänzung zur DSGVO."},
{"chapter": "recht", "term": "Verarbeitung", "text": "Verarbeitung bedeutet fast alles, was mit personenbezogenen Daten passiert: erheben, speichern, ordnen, auslesen, ändern, übermitteln, löschen oder vernichten.", "example": "Mandantendaten in die Kanzleisoftware eintragen und später löschen ist Verarbeitung.", "memory": "Sobald du mit personenbezogenen Daten etwas machst, ist es meist Verarbeitung."},
{"chapter": "recht", "term": "Verantwortlicher", "text": "Der Verantwortliche entscheidet über Zweck und Mittel der Verarbeitung personenbezogener Daten.", "example": "Die Kanzlei entscheidet, warum und wie Mandantendaten verarbeitet werden.", "memory": "Verantwortlicher = entscheidet Zweck und Mittel."},
{"chapter": "recht", "term": "Auftragsverarbeiter", "text": "Ein Auftragsverarbeiter verarbeitet personenbezogene Daten im Auftrag des Verantwortlichen und nicht für eigene Zwecke.", "example": "Ein Cloud-Backup-Anbieter speichert Kanzleidaten nach Weisung der Kanzlei.", "memory": "Auftragsverarbeiter = arbeitet nach Auftrag/Weisung."},
{"chapter": "recht", "term": "Rechtsgrundlage", "text": "Personenbezogene Daten dürfen nur verarbeitet werden, wenn es dafür eine Rechtsgrundlage gibt, zum Beispiel Einwilligung, Vertrag, rechtliche Pflicht oder berechtigtes Interesse.", "example": "Eine Kanzlei verarbeitet Mandantendaten, weil dies für das Mandat/den Vertrag erforderlich ist.", "memory": "Ohne Rechtsgrundlage keine Verarbeitung."},
{"chapter": "recht", "term": "Einwilligung", "text": "Eine Einwilligung muss freiwillig, informiert, eindeutig und für einen bestimmten Zweck erfolgen. Sie ist nur eine von mehreren möglichen Rechtsgrundlagen.", "example": "Newsletter an Mandanten nur mit sauberer Einwilligung, wenn keine andere Grundlage passt.", "memory": "Einwilligung = freiwillig + informiert + eindeutig."},
{"chapter": "recht", "term": "Zweckbindung", "text": "Daten dürfen nur für festgelegte, eindeutige und legitime Zwecke erhoben und nicht einfach für andere Zwecke weiterverwendet werden.", "example": "Daten für ein Mandat dürfen nicht ohne Grundlage für Werbung genutzt werden.", "memory": "Zweckbindung = nicht zwecklos sammeln und später beliebig nutzen."},
{"chapter": "recht", "term": "Datenminimierung", "text": "Es dürfen nur solche personenbezogenen Daten verarbeitet werden, die für den Zweck wirklich erforderlich sind.", "example": "Für eine einfache Rückrufbitte braucht man nicht Geburtsdatum und Ausweiskopie.", "memory": "So wenig wie möglich, so viel wie nötig."},
{"chapter": "recht", "term": "Speicherbegrenzung", "text": "Personenbezogene Daten dürfen nicht länger gespeichert werden, als es für den Zweck oder gesetzliche Aufbewahrungspflichten nötig ist.", "example": "Akten dürfen nicht unbegrenzt im System bleiben, wenn keine Aufbewahrungspflicht mehr besteht.", "memory": "Nicht ewig speichern."},
{"chapter": "recht", "term": "Rechenschaftspflicht", "text": "Der Verantwortliche muss die Datenschutzgrundsätze nicht nur einhalten, sondern die Einhaltung auch nachweisen können.", "example": "Die Kanzlei dokumentiert Berechtigungen, Löschfristen, TOM und Verarbeitungstätigkeiten.", "memory": "Nicht nur richtig handeln – auch beweisen können."},
{"chapter": "recht", "term": "Datenschutzverletzung", "text": "Eine Datenschutzverletzung liegt vor, wenn personenbezogene Daten vernichtet, verloren, verändert, unbefugt offengelegt oder unbefugt zugänglich werden.", "example": "Ein USB-Stick mit Mandantendaten geht verloren oder eine E-Mail geht an den falschen Empfänger.", "memory": "Datenpanne = Verlust, Veränderung oder unbefugter Zugriff."},
{"chapter": "recht", "term": "Betroffenenrechte", "text": "Betroffene Personen haben unter anderem Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch.", "example": "Ein Mandant kann Auskunft verlangen, welche Daten die Kanzlei über ihn verarbeitet.", "memory": "Betroffene haben Rechte an ihren Daten."},
{"chapter": "recht", "term": "Privacy by Design / Default", "text": "Datenschutz durch Technikgestaltung und datenschutzfreundliche Voreinstellungen bedeutet: Datenschutz wird schon bei Planung und Standard-Einstellungen eingebaut.", "example": "Eine Kanzleisoftware zeigt standardmäßig nur Akten an, für die der Mitarbeiter berechtigt ist.", "memory": "Datenschutz von Anfang an und standardmäßig."},
{"chapter": "recht", "term": "Pseudonymisierung", "text": "Personenbezogene Daten werden so verarbeitet, dass sie ohne Zusatzinformationen nicht mehr einer konkreten Person zugeordnet werden können. Die Zusatzinformationen müssen getrennt geschützt werden.", "example": "Mandanten werden in einer Auswertung nur über Nummern statt Namen geführt.", "memory": "Pseudonymisiert ist nicht anonym, weil eine Zuordnung noch möglich sein kann."},
{"chapter": "isms", "term": "ISMS", "text": "Ein Informationssicherheitsmanagementsystem ist der Rahmen, der Informationssicherheit plant, steuert, kontrolliert und verbessert. Es umfasst Managementprinzipien, Ressourcen/Mitarbeitende und den Sicherheitsprozess.", "example": "Nicht nur Firewall installieren, sondern Zuständigkeiten, Ziele, Kontrollen und Dokumentation festlegen.", "memory": "ISMS = Informationssicherheit als System, nicht als Einzelmaßnahme."},
{"chapter": "isms", "term": "Sicherheitsprozess", "text": "Informationssicherheit ist kein einmaliges Projekt, sondern ein dauerhafter Prozess, der regelmäßig angepasst werden muss.", "example": "Neue Kanzleisoftware, neue Gesetze oder neue Angriffe können neue Maßnahmen nötig machen.", "memory": "Sicherheit bleibt nie fertig."},
{"chapter": "isms", "term": "PDCA-Zyklus", "text": "PDCA steht für Plan, Do, Check, Act: planen, umsetzen, prüfen und verbessern.", "example": "Backup-Konzept planen, einführen, Restore-Test durchführen, Fehler korrigieren.", "memory": "PDCA = Planen, Machen, Prüfen, Verbessern."},
{"chapter": "isms", "term": "Sicherheitsleitlinie", "text": "Die Sicherheitsleitlinie beschreibt Ziele, Grundsätze und Rahmenbedingungen der Informationssicherheit und wird von der Leitung getragen.", "example": "Die Kanzlei legt fest, dass Mandantendaten vertraulich und nur rollenbezogen zugänglich sind.", "memory": "Leitlinie = Grundgesetz der Informationssicherheit im Betrieb."},
{"chapter": "isms", "term": "Informationssicherheitsbeauftragter (ISB)", "text": "Der ISB koordiniert den Sicherheitsprozess, unterstützt die Leitung, berichtet über den Status, initiiert Schulungen und überprüft Maßnahmen.", "example": "Der ISB prüft, ob Backup-Tests durchgeführt und dokumentiert wurden.", "memory": "ISB = koordiniert und kontrolliert Informationssicherheit."},
{"chapter": "isms", "term": "IS-Management-Team", "text": "In größeren Organisationen unterstützt ein Team den ISB. Es koordiniert, berät und kontrolliert übergreifende Sicherheitsfragen.", "example": "ISB, IT, Datenschutz, Fachabteilungen und Leitung stimmen Maßnahmen ab.", "memory": "Mehr Größe = mehr Rollen und Teamarbeit."},
{"chapter": "isms", "term": "Leitungsebene", "text": "Die oberste Leitung trägt die Gesamtverantwortung für ein angemessenes ISMS, stellt Ressourcen bereit und entscheidet über Risiken.", "example": "Die Kanzleileitung muss Budget für sichere Backups und Schulungen freigeben.", "memory": "Sicherheit braucht Rückhalt von oben."},
{"chapter": "isms", "term": "Informationsklassifizierung", "text": "Informationen werden nach Schutzbedarf oder Vertraulichkeit eingestuft, damit Mitarbeitende wissen, wie sie damit umgehen müssen.", "example": "Mandantenakte: vertraulich. Öffentliche Broschüre: öffentlich.", "memory": "Klassifizierung sagt: Wie empfindlich ist die Information?"},
{"chapter": "isms", "term": "Dokumentation im Sicherheitsprozess", "text": "Dokumentation macht Entscheidungen, Zuständigkeiten und Maßnahmen nachvollziehbar. Sie ist wichtig für Kontrolle, Audits und spätere Verbesserungen.", "example": "Berechtigungskonzept, Netzplan, Backup-Plan und Risikoentscheidungen werden schriftlich festgehalten.", "memory": "Was nicht dokumentiert ist, ist schwer nachweisbar."},
{"chapter": "risiko", "term": "Risikoanalyse", "text": "Eine Risikoanalyse untersucht Gefährdungen, schätzt Häufigkeit und Auswirkungen ein und legt fest, wie mit dem Risiko umgegangen wird.", "example": "Für den Kanzlei-Server wird bewertet, was bei Ausfall, Ransomware oder unbefugtem Zugriff passiert.", "memory": "Risiko = Gefährdung × Auswirkung."},
{"chapter": "risiko", "term": "Wann Risikoanalyse?", "text": "Zusätzliche Risikoanalyse ist besonders nötig, wenn ein Zielobjekt hohen/sehr hohen Schutzbedarf hat, kein passender IT-Grundschutz-Baustein existiert oder die Einsatzumgebung untypisch ist.", "example": "Ein System mit sehr hoher Verfügbarkeit oder Sondertechnik wird zusätzlich untersucht.", "memory": "Hoch, kein Baustein oder untypisch = genauer analysieren."},
{"chapter": "risiko", "term": "Elementare Gefährdung", "text": "Elementare Gefährdungen sind allgemeine Gefahren wie Feuer, Abhören, Fehlplanung, Schadprogramme, Datenverlust oder unbefugtes Eindringen.", "example": "G 0.39 Schadprogramme kann Vertraulichkeit, Integrität und Verfügbarkeit betreffen.", "memory": "Elementare Gefährdungen = Bausteine der Risikoanalyse."},
{"chapter": "risiko", "term": "Gefährdungsübersicht", "text": "In der Gefährdungsübersicht werden die für ein Zielobjekt relevanten Gefährdungen gesammelt.", "example": "Für den Server: Ausfall, Datenverlust, Schadsoftware, unbefugtes Eindringen, Fehladministration.", "memory": "Erst Gefahrenliste, dann bewerten."},
{"chapter": "risiko", "term": "Eintrittshäufigkeit", "text": "Eintrittshäufigkeit beschreibt, wie oft ein Ereignis erwartet wird, zum Beispiel selten, mittel, häufig oder sehr häufig.", "example": "Ein Stromausfall kann selten sein, fehlerhafte Bedienung vielleicht häufiger.", "memory": "Wie oft kann es passieren?"},
{"chapter": "risiko", "term": "Schadenshöhe", "text": "Schadenshöhe beschreibt, wie stark die Auswirkungen wären, zum Beispiel vernachlässigbar, begrenzt, beträchtlich oder existenzbedrohend.", "example": "Verlust einer Mandantenakte kann beträchtliche rechtliche und Reputationsfolgen haben.", "memory": "Wie schlimm wäre es?"},
{"chapter": "risiko", "term": "Risikoreduktion", "text": "Risikoreduktion bedeutet, zusätzliche Maßnahmen umzusetzen, damit Häufigkeit oder Schaden kleiner werden.", "example": "Redundanter Server, MFA, Backup, Verschlüsselung oder Schulung.", "memory": "Risiko kleiner machen."},
{"chapter": "risiko", "term": "Risikoakzeptanz", "text": "Risikoakzeptanz bedeutet, dass die Organisation ein verbleibendes Restrisiko bewusst trägt. Das muss begründet und dokumentiert werden.", "example": "Ein kleines Restrisiko wird akzeptiert, weil zusätzliche Maßnahmen unverhältnismäßig teuer wären.", "memory": "Akzeptieren nur bewusst und dokumentiert."},
{"chapter": "risiko", "term": "Risikotransfer", "text": "Risikotransfer bedeutet, Folgen teilweise auf andere zu übertragen, zum Beispiel durch Versicherung oder Dienstleistervertrag. Die Verantwortung verschwindet dadurch nicht vollständig.", "example": "Cyberversicherung kann finanzielle Folgen mindern, ersetzt aber keine Sicherheitsmaßnahmen.", "memory": "Transfer = Risiko teilweise weitergeben."},
{"chapter": "risiko", "term": "Restrisiko", "text": "Restrisiko ist das Risiko, das nach allen getroffenen Maßnahmen noch übrig bleibt.", "example": "Trotz Backup bleibt ein kleines Risiko, dass die Wiederherstellung länger dauert als geplant.", "memory": "Null Risiko gibt es selten."},
{"chapter": "umsetzung", "term": "Umsetzungsplanung", "text": "Umsetzungsplanung legt fest, welche Sicherheitslücken mit welchen Maßnahmen, in welcher Reihenfolge, mit welchem Aufwand und durch wen geschlossen werden.", "example": "Serverraum abschließen bis Juli, Budget 500 €, verantwortlich: IT-Administration.", "memory": "Plan: was, wann, wer, Kosten."},
{"chapter": "umsetzung", "term": "Maßnahmen konsolidieren", "text": "Maßnahmen werden geprüft, gestrichen, zusammengeführt oder konkretisiert, damit sie geeignet, angemessen und nicht doppelt sind.", "example": "Wenn MFA eingeführt wird, können manche Passwortmaßnahmen anders bewertet werden.", "memory": "Nicht jede Maßnahme blind umsetzen – passend machen."},
{"chapter": "umsetzung", "term": "Ersatzmaßnahme", "text": "Eine Ersatzmaßnahme wird gewählt, wenn die ideale Maßnahme nicht wirtschaftlich oder praktisch umsetzbar ist, aber ein angemessener Schutz erreicht werden soll.", "example": "Wasserführende Leitung kann nicht verlegt werden, daher Wassermelder und Ableitblech.", "memory": "Nicht perfekt, aber sinnvoller Schutz."},
{"chapter": "umsetzung", "term": "Aufwandschätzung", "text": "Vor der Umsetzung werden einmalige und laufende Kosten sowie personeller Aufwand geschätzt.", "example": "Backup-System: Anschaffungskosten, Betriebskosten, Wartung, Schulung.", "memory": "Sicherheit braucht Budget und Zeit."},
{"chapter": "umsetzung", "term": "R1, R2, R3", "text": "R1, R2 und R3 können Hinweise geben, in welcher Reihenfolge Bausteine/Anforderungen bearbeitet werden sollten. R1 ist vorrangig.", "example": "ISMS- und Organisationsanforderungen oft vor späteren Spezialmaßnahmen.", "memory": "R1 zuerst, R3 später."},
{"chapter": "umsetzung", "term": "Basis-, Standard- und höhere Anforderungen", "text": "Basis-Anforderungen sichern das Mindestniveau, Standard-Anforderungen das normale Sicherheitsniveau, Anforderungen für erhöhten Schutzbedarf gehen darüber hinaus.", "example": "Erst Basis erfüllen, dann Standard, dann Zusatzmaßnahmen für sehr hohen Schutzbedarf.", "memory": "Erst Fundament, dann Ausbau."},
{"chapter": "umsetzung", "term": "Breitenwirkung", "text": "Maßnahmen mit Breitenwirkung verbessern viele Bereiche gleichzeitig und werden deshalb oft priorisiert.", "example": "Zentrales Patchmanagement schützt viele Clients und Server gleichzeitig.", "memory": "Große Wirkung = oft zuerst."},
{"chapter": "umsetzung", "term": "Realisierungsplan", "text": "Ein Realisierungsplan dokumentiert Maßnahme, Zielobjekt/Anforderung, Termin, Budget und Verantwortliche.", "example": "SYS.1.1.A8 Datensicherung: externes Backup bis Q1, Budget 15.000 €, Einkauf verantwortlich.", "memory": "Realisierungsplan = Umsetzungsfahrplan."},
{"chapter": "umsetzung", "term": "Begleitende Maßnahmen", "text": "Begleitende Maßnahmen wie Schulungen, Sensibilisierung und Regeln sorgen dafür, dass technische Maßnahmen richtig angewendet werden.", "example": "Neue Verschlüsselungssoftware braucht Schulung und Regeln zum Schlüsselschutz.", "memory": "Technik ohne Schulung wird oft falsch benutzt."},
{"chapter": "verbesserung", "term": "Aufrechterhaltung und Verbesserung", "text": "Informationssicherheit muss regelmäßig überprüft, angepasst und verbessert werden, weil Technik, Prozesse, Gesetze und Gefährdungen sich ändern.", "example": "Nach einem Sicherheitsvorfall wird das Sicherheitskonzept überprüft und verbessert.", "memory": "Sicherheit ist ein Kreislauf."},
{"chapter": "verbesserung", "term": "Wirksamkeitsprüfung", "text": "Es wird geprüft, ob Maßnahmen nicht nur umgesetzt sind, sondern tatsächlich den gewünschten Schutz liefern.", "example": "Ein Backup ist vorhanden; der Restore-Test zeigt, ob es wirklich funktioniert.", "memory": "Umgesetzt heißt nicht automatisch wirksam."},
{"chapter": "verbesserung", "term": "IS-Revision", "text": "Eine Informationssicherheitsrevision prüft nach festgelegtem Verfahren, ob das Sicherheitskonzept umgesetzt ist und aktuellen Anforderungen genügt.", "example": "Revisoren prüfen Dokumente, Interviews und technische Nachweise.", "memory": "IS-Revision = systematische Sicherheitsprüfung."},
{"chapter": "verbesserung", "term": "Cyber-Sicherheits-Check", "text": "Ein Cyber-Sicherheits-Check hilft besonders Organisationen mit weniger Erfahrung, das Sicherheitsniveau und die Anfälligkeit gegenüber Cyberangriffen einzuschätzen.", "example": "Checkliste, Interviews und Bericht zeigen Schwachstellen auf.", "memory": "Cyber-Check = Orientierung gegen Cyberangriffe."},
{"chapter": "verbesserung", "term": "Kennzahl", "text": "Eine Kennzahl misst einen Sicherheitsaspekt und hilft bei Kommunikation, Steuerung und Kontrolle.", "example": "Anzahl erfolgreicher Restore-Tests / Gesamtzahl der Restore-Tests.", "memory": "Kennzahl = messbarer Sicherheitsindikator."},
{"chapter": "verbesserung", "term": "Reifegradmodell", "text": "Ein Reifegradmodell bewertet, wie strukturiert und systematisch ein Prozess umgesetzt und verbessert wird.", "example": "Reifegrad 2: teilweise umgesetzt, aber kaum dokumentiert. Reifegrad 5: kontinuierliche Verbesserung.", "memory": "Reifegrad = Wie erwachsen ist der Prozess?"},
{"chapter": "verbesserung", "term": "Reifegrad 0 bis 5", "text": "0 kein Prozess, 1 Planung, 2 teilweise umgesetzt, 3 vollständig umgesetzt und dokumentiert, 4 regelmäßig geprüft, 5 kontinuierlich verbessert.", "example": "Backup-Prozess mit Tests, Auswertung und Verbesserungen wäre eher hoch gereift.", "memory": "0 nichts, 5 kontinuierlich verbessern."},
{"chapter": "verbesserung", "term": "ISO 27001 auf Basis von IT-Grundschutz", "text": "Ein Zertifikat kann nachweisen, dass ein ISMS eingerichtet ist und IT-Grundschutz-Anforderungen wirksam erfüllt werden. Dafür ist ein unabhängiges Audit nötig.", "example": "Ein IT-Dienstleister kann Kunden sein Sicherheitsniveau nachweisen.", "memory": "Zertifikat schafft Vertrauen, ersetzt aber nicht die Arbeit."},
{"chapter": "verbesserung", "term": "Managementbericht", "text": "Ergebnisse von Überprüfungen, Umsetzungsstand, Probleme, Risiken und Verbesserungsvorschläge müssen der Leitung berichtet werden.", "example": "Der ISB berichtet über offene Maßnahmen, Restore-Tests und Sicherheitsvorfälle.", "memory": "Leitung braucht klare Sicherheitsinfos."},
{"chapter": "verbesserung", "term": "Sicherheitsvorfall als Anlass", "text": "Nach einem Sicherheitsvorfall sollte das Sicherheitskonzept hinterfragt werden, um begünstigende Schwachstellen zu finden und zu beseitigen.", "example": "Nach Phishing-Erfolg: Schulung, MFA und Mailfilter überprüfen.", "memory": "Vorfall = lernen und verbessern."},
{"chapter": "krypto", "term": "Rainbow Table", "text": "Rainbow Tables sind vorberechnete Tabellen mit Passwort-Hashwerten. Angreifer vergleichen gestohlene Hashes mit der Tabelle, um Passwörter schneller zu finden.", "example": "Ohne Salt kann der Hash von 'Passwort123' in einer Tabelle bereits vorhanden sein.", "memory": "Rainbow Table = vorberechnete Hash-Liste."},
{"chapter": "krypto", "term": "Warum Salt gegen Rainbow Tables hilft", "text": "Ein zufälliger Salt verändert den Hash. Dadurch braucht ein Angreifer für jeden Salt neue Tabellen, was Rainbow Tables unpraktisch macht.", "example": "Gleiches Passwort + unterschiedlicher Salt = anderer Hash.", "memory": "Salt macht gleiche Passwörter unterschiedlich."},
{"chapter": "krypto", "term": "Brute-Force-Angriff", "text": "Beim Brute Force werden sehr viele mögliche Passwörter systematisch ausprobiert.", "example": "Angreifer testet aaaa, aaab, aaac usw. oder viele Kombinationen automatisiert.", "memory": "Brute Force = stumpfes Durchprobieren."},
{"chapter": "krypto", "term": "Wörterbuchangriff", "text": "Beim Wörterbuchangriff werden typische Wörter, Namen und Passwortlisten ausprobiert, oft mit Varianten wie Zahlen oder Sonderzeichen.", "example": "Sommer2026!, Kanzlei123 oder Passwort! werden zuerst getestet.", "memory": "Wörterbuch = häufige Passwörter zuerst."},
{"chapter": "backup", "term": "Immutable Backup", "text": "Ein immutable Backup kann für eine festgelegte Zeit nicht verändert oder gelöscht werden. Das hilft gegen Ransomware und versehentliches Löschen.", "example": "Backup-Speicher mit Sperrfrist, sodass Schadsoftware alte Sicherungen nicht überschreibt.", "memory": "Immutable = unveränderbar."},
{"chapter": "backup", "term": "Offline-Backup", "text": "Ein Offline-Backup ist nicht dauerhaft mit dem Netzwerk verbunden und dadurch besser gegen Ransomware oder Netzangriffe geschützt.", "example": "Backup-Datenträger wird nach der Sicherung getrennt und sicher verwahrt.", "memory": "Offline = nicht angreifbar über das Netz."},
{"chapter": "backup", "term": "Air Gap", "text": "Air Gap bedeutet eine physische oder logische Trennung vom Produktivnetz. Dadurch kann Schadsoftware nicht direkt auf die Sicherung zugreifen.", "example": "Backup-System ist nur kurz für Sicherungen verbunden oder vollständig getrennt.", "memory": "Air Gap = Luftspalt zwischen Produktivsystem und Sicherung."},
{"chapter": "raid", "term": "Parität", "text": "Parität ist zusätzliche Prüfinformation, mit der Daten bei Ausfall einer Festplatte rechnerisch wiederhergestellt werden können.", "example": "RAID 5 nutzt eine Parität, RAID 6 doppelte Parität.", "memory": "Parität = Rechenhilfe für Wiederherstellung."},
{"chapter": "raid", "term": "Rebuild", "text": "Rebuild ist der Wiederaufbau der Daten auf eine Ersatzplatte nach einem Festplattenausfall.", "example": "Nach Austausch der defekten Platte rekonstruiert RAID 5 die Daten aus Datenblöcken und Parität.", "memory": "Rebuild = RAID baut sich wieder auf."},
{"chapter": "raid", "term": "Degraded Mode", "text": "Degraded Mode bedeutet, dass ein RAID nach einem Plattenausfall noch läuft, aber weniger oder keine weitere Ausfallreserve hat.", "example": "RAID 5 läuft nach einem Ausfall weiter, aber ein zweiter Ausfall wäre kritisch.", "memory": "Degraded = läuft noch, aber geschwächt."}];

const questions = [
  // Datenschutz & Datensicherheit
  {id:"b01", chapter:"begriffe", type:"single", text:"Was beschreibt Datenschutz am besten?", options:["Schutz personenbezogener Daten und der Rechte betroffener Personen","Schutz aller Computer vor Staub und Hitze","Ausschließlich Virenschutz auf Servern","Nur das Erstellen von Backups"], answer:[0], hint:"Denke an Personenbezug und rechtliche Erlaubnis.", explanation:"Datenschutz fragt vor allem: Darf ich personenbezogene Daten erheben, speichern, nutzen oder weitergeben?"},
  {id:"b02", chapter:"begriffe", type:"single", text:"Was beschreibt Datensicherheit am besten?", options:["Schutz von Daten vor unbefugtem Zugriff, Manipulation, Verlust und Ausfall","Nur Einwilligungen von Mandanten einholen","Nur Papierakten vernichten","Nur personenbezogene Daten löschen"], answer:[0], hint:"Denke an Vertraulichkeit, Integrität und Verfügbarkeit.", explanation:"Datensicherheit betrifft den technischen und organisatorischen Schutz von Daten allgemein – auch ohne Personenbezug."},
  {id:"b03", chapter:"begriffe", type:"single", text:"Welche Aussage zeigt den Unterschied richtig?", options:["Datenschutz schützt die Person, Datensicherheit schützt Daten/Systeme","Datenschutz ist nur Hardware, Datensicherheit nur Recht","Datenschutz gilt nur für Firmengeheimnisse","Datensicherheit gilt nur für Papierakten"], answer:[0], hint:"Person hinter den Daten vs. Daten selbst.", explanation:"Beides hängt zusammen, ist aber nicht gleich: Datenschutz ist rechtlich/personenbezogen, Datensicherheit ist Schutz aller Daten."},
  {id:"b04", chapter:"begriffe", type:"multi", text:"Welche Beispiele sind personenbezogene Daten?", options:["Name und Adresse eines Mandanten","Telefonnummer eines Mitarbeiters","Anonyme Anzahl der Drucker im Flur","E-Mail-Adresse einer Mandantin"], answer:[0,1,3], hint:"Kann man damit eine natürliche Person direkt oder indirekt erkennen?", explanation:"Name, Telefonnummer und E-Mail können Personen identifizieren. Eine anonyme Druckeranzahl nicht."},
  {id:"b05", chapter:"begriffe", type:"single", text:"Ein unbefugter Mitarbeiter liest eine Mandantenakte. Welches Schutzziel ist direkt verletzt?", options:["Vertraulichkeit","Integrität","Verfügbarkeit","Redundanz"], answer:[0], hint:"Es geht darum, wer Informationen sehen darf.", explanation:"Unbefugtes Lesen verletzt die Vertraulichkeit."},
  {id:"b06", chapter:"begriffe", type:"single", text:"Eine Frist in der Kanzleisoftware wird unbemerkt falsch geändert. Welches Schutzziel ist betroffen?", options:["Integrität","Verfügbarkeit","Zugangskontrolle","RAID 0"], answer:[0], hint:"Es geht um Richtigkeit und Unverfälschtheit.", explanation:"Wenn Daten falsch oder manipuliert sind, ist die Integrität verletzt."},
  {id:"b07", chapter:"begriffe", type:"single", text:"Der Server ist ausgefallen und berechtigte Mitarbeitende kommen nicht an Akten. Welches Schutzziel ist betroffen?", options:["Verfügbarkeit","Vertraulichkeit","Salted Hash","Datenschutz-Folgenabschätzung"], answer:[0], hint:"Es geht um Zugriff zur richtigen Zeit.", explanation:"Wenn berechtigte Personen nicht zugreifen können, ist die Verfügbarkeit verletzt."},
  {id:"b08", chapter:"begriffe", type:"multi", text:"Welche Aussagen stimmen?", options:["Datenschutz und Datensicherheit überschneiden sich","Backups können eine Maßnahme der Datensicherheit sein","Datenschutz betrifft nur Datenbanken, nicht E-Mails","Datensicherheit kann auch nicht-personenbezogene Daten schützen"], answer:[0,1,3], hint:"Denke an Kanzlei-Alltag: E-Mails können auch Mandantendaten enthalten.", explanation:"Datenschutz und Datensicherheit hängen zusammen. Backups dienen der Sicherheit. Datenschutz betrifft auch E-Mails, wenn personenbezogene Daten enthalten sind."},

  // TOM
  {id:"t01", chapter:"tom", type:"single", text:"Was bedeutet TOM?", options:["Technisch-organisatorische Maßnahmen","Tägliche Online-Migration","Technische Offline-Methode","Teilweise organisatorische Meldung"], answer:[0], hint:"Es besteht aus zwei Arten von Maßnahmen.", explanation:"TOM sind technische und organisatorische Maßnahmen zum Schutz von Daten und zur Nachweisbarkeit."},
  {id:"t02", chapter:"tom", type:"single", text:"Welche Maßnahme ist eher technisch?", options:["USB-Ports deaktivieren","Dienstanweisung zum Umgang mit Akten schreiben","Mitarbeitende schulen","Backup-Verantwortliche benennen"], answer:[0], hint:"Wird es durch Technik/Hardware/Software erzwungen?", explanation:"Deaktivierte USB-Ports sind eine technische Maßnahme. Die anderen Beispiele sind organisatorisch."},
  {id:"t03", chapter:"tom", type:"single", text:"Welche Maßnahme ist eher organisatorisch?", options:["Berechtigungskonzept mit Rollen erstellen","Firewall einschalten","Serverraum mit Alarmanlage sichern","Festplatten verschlüsseln"], answer:[0], hint:"Geht es um Regeln/Zuständigkeiten/Abläufe?", explanation:"Ein Berechtigungskonzept ist organisatorisch, auch wenn es später technisch umgesetzt wird."},
  {id:"t04", chapter:"tom", type:"single", text:"Situation: Eine fremde Person kann unbeaufsichtigt in den Serverraum. Welche Gefahr passt am besten?", options:["Unbefugter Zugang zu Verarbeitungsanlagen","Zu wenig Speicherplatz bei RAID 5","Falscher Hashwert wegen Salt","Zu hohe Backup-Kompression"], answer:[0], hint:"Denke an den Raum und die Geräte.", explanation:"Ein offener Serverraum gefährdet den Zugang zu Verarbeitungsanlagen und damit Datenschutz/Datensicherheit."},
  {id:"t05", chapter:"tom", type:"multi", text:"Welche Gegenmaßnahmen passen zum offenen Serverraum?", options:["Serverraum abschließen und Zutritt beschränken","Zutrittsberechtigungen dokumentieren","Allen Gästen Administratorrechte geben","Alarm-/Brandschutz für den Serverraum prüfen"], answer:[0,1,3], hint:"Maßnahmen sollen Unbefugte fernhalten und Schäden verhindern.", explanation:"Abschließen, Berechtigungen und Alarm-/Brandschutz passen. Adminrechte für Gäste verschlechtern die Lage."},
  {id:"t06", chapter:"tom", type:"single", text:"Situation: Mehrere Mitarbeitende nutzen dasselbe Passwortkonto. Welche Gefahr entsteht vor allem?", options:["Handlungen sind schlecht nachvollziehbar und Unbefugte können leichter zugreifen","RAID 10 wird automatisch zu RAID 0","Backups werden immer differentiell","Der Netzplan wird automatisch gelöscht"], answer:[0], hint:"Denke an Benutzerkontrolle und Verantwortlichkeit.", explanation:"Gemeinsame Konten verhindern klare Zuordnung und erhöhen das Risiko unbefugter Nutzung."},
  {id:"t07", chapter:"tom", type:"multi", text:"Welche Maßnahmen passen zur Benutzerkontrolle?", options:["Eigene Benutzerkonten mit Passwort","Rollen- und Rechtekonzept","Konten ausgeschiedener Mitarbeitender deaktivieren","Serverraumfenster abdunkeln"], answer:[0,1,2], hint:"Es geht um Anmeldung und Berechtigungen in Systemen.", explanation:"Eigene Konten, Rollen/Rechte und Deaktivierung alter Konten sind Benutzerkontrolle. Abdunkeln passt eher baulich/physisch."},
  {id:"t08", chapter:"tom", type:"single", text:"Situation: Mandantendaten werden per unverschlüsselter E-Mail an falsche Empfänger geschickt. Welche TOM-Anforderung ist besonders betroffen?", options:["Übertragungskontrolle","RAID-Parität","Granularität","Hot-Spare"], answer:[0], hint:"Daten werden übertragen/versendet.", explanation:"Übertragungskontrolle betrifft, an welche Stellen personenbezogene Daten übermittelt werden oder werden können."},
  {id:"t09", chapter:"tom", type:"multi", text:"Welche Maßnahmen unterstützen Wiederherstellbarkeit?", options:["Backups planen und dokumentieren","Restore-Test durchführen","RAID oder zweites Speichersystem einsetzen","Alle Backups ungeprüft überschreiben"], answer:[0,1,2], hint:"Es muss nach einem Störfall wirklich wieder laufen.", explanation:"Planung, Dokumentation, technische Redundanz und Restore-Tests helfen. Ungeprüft überschreiben ist gefährlich."},
  {id:"t10", chapter:"tom", type:"single", text:"Situation: Eine Mandantenakte liegt offen im Druckerraum. Welche Gefahr ist am wahrscheinlichsten?", options:["Unbefugte Kenntnisnahme vertraulicher/personenbezogener Daten","Bessere Verfügbarkeit durch Papierkopie","Automatisches Vollbackup","Korrekte Zugangskontrolle"], answer:[0], hint:"Wer könnte die Akte sehen?", explanation:"Offen herumliegende Akten gefährden Datenschutz und Vertraulichkeit."},

  // Strukturanalyse
  {id:"s01", chapter:"struktur", type:"single", text:"Was ist das Hauptziel der Strukturanalyse?", options:["Relevante Schutzobjekte und Zusammenhänge erfassen, damit passende Maßnahmen festgelegt werden können","Alle Mitarbeitenden bewerten","Nur Passwörter ändern","Direkt RAID-Level berechnen"], answer:[0], hint:"Es geht um Überblick vor der Schutzbedarfsfeststellung.", explanation:"Die Strukturanalyse sammelt die nötigen Informationen über Prozesse, Anwendungen, Systeme, Räume und Verbindungen."},
  {id:"s02", chapter:"struktur", type:"multi", text:"Welche Bereiche gehören typischerweise in eine Strukturanalyse?", options:["Geschäftsprozesse und Informationen","Anwendungen","IT-Systeme und Netzplan","Räume/Liegenschaften"], answer:[0,1,2,3], hint:"Es geht nicht nur um Hardware.", explanation:"Alle genannten Bereiche sind wichtig, weil sie später Zielobjekte des Sicherheitskonzepts sein können."},
  {id:"s03", chapter:"struktur", type:"single", text:"Warum werden Objekte in der Strukturanalyse gruppiert?", options:["Damit gleiche oder ähnliche Objekte gemeinsam betrachtet und geschützt werden können","Damit möglichst viele Details verloren gehen","Damit kein Schutzbedarf mehr nötig ist","Damit Backups automatisch gelöscht werden"], answer:[0], hint:"Gruppierung spart Aufwand, darf aber nicht riskant sein.", explanation:"Ähnliche Objekte können als Gruppe behandelt werden, wenn sie gleiche Eigenschaften und gleichen Schutzbedarf haben."},
  {id:"s04", chapter:"struktur", type:"multi", text:"Wann ist eine Gruppierung von IT-Systemen sinnvoll?", options:["Gleicher Typ oder ähnliche Konfiguration","Gleiche oder ähnliche Netzanbindung","Gleiche Anwendungen und gleicher Schutzbedarf","Nur weil sie denselben Kaufpreis hatten"], answer:[0,1,2], hint:"Preis ist für Schutzmaßnahmen nicht das entscheidende Kriterium.", explanation:"Gruppieren sollte man nach ähnlicher Technik, Nutzung, Umgebung und Schutzbedarf, nicht nach Kaufpreis."},
  {id:"s05", chapter:"struktur", type:"multi", text:"Was sollte ein Netzplan mindestens zeigen?", options:["IT-Systeme im Netz","Verbindungen zwischen IT-Systemen","Außenverbindungen, zum Beispiel Internet","Urlaubstage aller Mitarbeitenden"], answer:[0,1,2], hint:"Netzplan = technische Übersicht.", explanation:"Ein Netzplan zeigt Systeme, Verbindungen und Außenverbindungen. Urlaubstage gehören nicht dazu."},
  {id:"s06", chapter:"struktur", type:"single", text:"Welche Liste passt zur Aufgabe 'IT-Systeme erheben'?", options:["Server, Clients, Router, Switches, Drucker, mobile Geräte erfassen","Nur Datenschutzgesetze abschreiben","Nur Mandanten befragen","Nur Passwörter sammeln"], answer:[0], hint:"IT-Systeme sind technische Objekte.", explanation:"Zur IT-System-Erhebung gehören vorhandene und geplante Systeme sowie Angaben zu Standort, Plattform, Status, Benutzern und Admins."},
  {id:"s07", chapter:"struktur", type:"multi", text:"Welche Angaben sind für ein IT-System in der Strukturanalyse sinnvoll?", options:["Eindeutige Bezeichnung","Plattform/Betriebssystem","Standort und Status","Lieblingsfarbe des Administrators"], answer:[0,1,2], hint:"Welche Angaben helfen später bei Schutzmaßnahmen?", explanation:"Bezeichnung, Plattform, Standort, Status, Benutzer und Administratoren sind relevant. Lieblingsfarbe nicht."},
  {id:"s08", chapter:"struktur", type:"single", text:"Eine Kanzlei hat einen Serverraum mit Server, Router, Firewall und zentralem Switch. Wo gehört diese Information zuerst hinein?", options:["In die Strukturanalyse bzw. den Netzplan/IT-System-Liste","Nur in die Abschlussnote","In eine Passwortliste","In den Papierkorb"], answer:[0], hint:"Vor dem Schutzbedarf muss die Struktur bekannt sein.", explanation:"Diese Systeme sind Teil der IT-Infrastruktur und werden im Netzplan und in der IT-System-Liste dokumentiert."},
  {id:"s09", chapter:"struktur", type:"single", text:"Was bedeutet 'angemessene Granularität' bei Anwendungen?", options:["Nicht zu fein und nicht zu grob erfassen","Jede Schaltfläche als eigene Anwendung erfassen","Alle Anwendungen ignorieren","Nur Programme mit blauem Symbol erfassen"], answer:[0], hint:"Denke an Aufwand und notwendige Unterschiede.", explanation:"Zu fein erzeugt unnötigen Aufwand, zu grob verhindert wichtige Differenzierungen."},
  {id:"s10", chapter:"struktur", type:"multi", text:"Welche Angaben gehören bei Geschäftsprozessen in eine übersichtliche Tabelle?", options:["Kennung und Name","Kurze Beschreibung des Ziels/Ablaufs/verarbeiteter Informationen","Verantwortliche","Wichtige Anwendungen"], answer:[0,1,2,3], hint:"Prozess = Was, wozu, wer, womit?", explanation:"Diese Angaben helfen, Prozesse nachvollziehbar mit Informationen und Anwendungen zu verbinden."},

  // Schutzbedarf
  {id:"sb01", chapter:"schutzbedarf", type:"single", text:"Worauf basiert die Schutzbedarfsfeststellung?", options:["Auf dem möglichen Schaden bei Verletzung von Vertraulichkeit, Integrität oder Verfügbarkeit","Auf dem Anschaffungspreis der Monitore","Auf der Farbe des Netzwerkkabels","Nur auf der Anzahl der Drucker"], answer:[0], hint:"Denke an die drei klassischen Schutzziele.", explanation:"Der Schutzbedarf wird danach eingeschätzt, wie groß der Schaden bei Verletzung der Grundwerte wäre."},
  {id:"sb02", chapter:"schutzbedarf", type:"multi", text:"Welche klassischen Schutzziele werden betrachtet?", options:["Vertraulichkeit","Integrität","Verfügbarkeit","Dekoration"], answer:[0,1,2], hint:"CIA auf Deutsch: V-I-V.", explanation:"Die drei Grundwerte sind Vertraulichkeit, Integrität und Verfügbarkeit."},
  {id:"sb03", chapter:"schutzbedarf", type:"single", text:"Was bedeutet Schutzbedarf 'normal'?", options:["Schadensauswirkungen sind begrenzt und überschaubar","Katastrophaler Schaden ist sicher","Das System braucht keinen Schutz","Nur Chefs dürfen es nutzen"], answer:[0], hint:"Normal heißt nicht ungeschützt.", explanation:"Normaler Schutzbedarf bedeutet begrenzte, überschaubare Schadensauswirkungen."},
  {id:"sb04", chapter:"schutzbedarf", type:"single", text:"Was bedeutet Schutzbedarf 'sehr hoch'?", options:["Schadensauswirkungen können existenziell bedrohlich oder katastrophal sein","Es gibt keine Auswirkungen","Das System ist besonders günstig","Es ist automatisch verschlüsselt"], answer:[0], hint:"Denke an maximale Schadenshöhe.", explanation:"Sehr hoher Schutzbedarf liegt vor, wenn Schäden katastrophal oder existenzbedrohend sein können."},
  {id:"sb05", chapter:"schutzbedarf", type:"multi", text:"Welche Schadensszenarien können betrachtet werden?", options:["Verstöße gegen Gesetze, Vorschriften oder Verträge","Beeinträchtigung der Aufgabenerfüllung","Negative Innen- oder Außenwirkung","Finanzielle Auswirkungen"], answer:[0,1,2,3], hint:"Schaden kann rechtlich, organisatorisch, finanziell und reputativ sein.", explanation:"Alle genannten Szenarien sind typische Blickwinkel der Schutzbedarfsfeststellung."},
  {id:"sb06", chapter:"schutzbedarf", type:"single", text:"In welcher Reihenfolge ist es meist sinnvoll, Schutzbedarf abzuleiten?", options:["Geschäftsprozesse/Informationen → Anwendungen → IT-Systeme → Räume/Verbindungen","Räume → Lieblingsfarben → Druckerpreise → Prozesse","Backups → RAID → Datenschutz löschen","Nur Systeme, Prozesse sind egal"], answer:[0], hint:"Was erzeugt die Bedeutung der Systeme?", explanation:"Geschäftsprozesse und Informationen bestimmen die Bedeutung der Anwendungen, diese vererben den Schutzbedarf auf Systeme und weitere Zielobjekte."},
  {id:"sb07", chapter:"schutzbedarf", type:"single", text:"Was beschreibt das Maximumprinzip?", options:["Der höchste Schutzbedarf einer zugeordneten Anwendung/Information wird übernommen","Der niedrigste Schutzbedarf wird immer übernommen","Alle Systeme bekommen automatisch normal","Nur Verfügbarkeit wird betrachtet"], answer:[0], hint:"Maximum = der höchste Wert zählt.", explanation:"Ein Zielobjekt übernimmt häufig den höchsten Schutzbedarf der abhängigen Anwendungen oder Informationen."},
  {id:"sb08", chapter:"schutzbedarf", type:"single", text:"Mehrere Anwendungen mit normalem Schutzbedarf laufen auf einem Server. Gemeinsam würde ihr Ausfall großen Schaden verursachen. Welcher Effekt ist das?", options:["Kumulationseffekt","Verteilungseffekt","Salt-Effekt","Formatierungseffekt"], answer:[0], hint:"Viele kleine Dinge summieren sich.", explanation:"Beim Kumulationseffekt entsteht durch die Kombination mehrerer Objekte ein höherer Schutzbedarf."},
  {id:"sb09", chapter:"schutzbedarf", type:"single", text:"Eine wichtige Anwendung ist redundant auf mehrere Server verteilt, sodass ein einzelner Serverausfall weniger kritisch ist. Welcher Effekt kann vorliegen?", options:["Verteilungseffekt","Kumulationseffekt","Rainbow-Table-Effekt","RAID-0-Effekt"], answer:[0], hint:"Die Last/Bedeutung ist verteilt.", explanation:"Beim Verteilungseffekt kann der Schutzbedarf eines einzelnen Zielobjekts niedriger bewertet werden."},
  {id:"sb10", chapter:"schutzbedarf", type:"single", text:"Situation: Wenn E-Mails der Kanzlei länger als 2 Stunden ausfallen, können Fristen und Mandantenkommunikation stark leiden. Welche Bewertung passt am ehesten?", options:["Hoher oder sehr hoher Schutzbedarf bei Verfügbarkeit, je nach Schadensausmaß","Kein Schutzbedarf, weil E-Mail nur Komfort ist","Nur Vertraulichkeit normal, sonst egal","RAID 0 genügt als Begründung"], answer:[0], hint:"Frage: Wie kritisch ist der Ausfall für die Aufgabenerfüllung?", explanation:"Wenn ein kurzer Ausfall bereits große Schäden auslösen kann, ist der Schutzbedarf der Verfügbarkeit hoch oder sehr hoch zu begründen."},

  // RAID
  {id:"r01", chapter:"raid", type:"single", text:"Was ist RAID?", options:["Verbund mehrerer Festplatten zu einem logischen Speicher","Ein Verschlüsselungsverfahren für E-Mails","Eine Art Datenschutz-Einwilligung","Ein Backup-Plan nach Generationen"], answer:[0], hint:"Denke an mehrere Festplatten im Server.", explanation:"RAID kombiniert mehrere Platten, meist für Geschwindigkeit, Redundanz oder Verfügbarkeit."},
  {id:"r02", chapter:"raid", type:"single", text:"Welche Aussage zu RAID ist wichtig?", options:["RAID ersetzt kein Backup","RAID schützt immer vor versehentlichem Löschen","RAID ist nur ein Passwortverfahren","RAID verhindert jede Malware"], answer:[0], hint:"Was passiert bei Löschung oder Verschlüsselungstrojaner?", explanation:"RAID hilft bei bestimmten Hardwareausfällen, aber nicht zuverlässig gegen Löschung, Ransomware oder Brand. Dafür braucht man Backups."},
  {id:"r03", chapter:"raid", type:"single", text:"RAID 0 mit vier 4-TB-Festplatten: Wie viel nutzbarer Speicher entsteht ungefähr?", options:["16 TB","12 TB","8 TB","4 TB"], answer:[0], hint:"RAID 0 nutzt alle Platten, hat aber keine Redundanz.", explanation:"4 × 4 TB = 16 TB nutzbar. Fällt eine Platte aus, ist der Verbund gefährdet."},
  {id:"r04", chapter:"raid", type:"single", text:"RAID 5 mit vier 4-TB-Festplatten: Wie viel nutzbarer Speicher entsteht ungefähr?", options:["12 TB","16 TB","8 TB","4 TB"], answer:[0], hint:"Bei RAID 5 geht rechnerisch eine Platte für Parität weg.", explanation:"(4−1) × 4 TB = 12 TB nutzbar."},
  {id:"r05", chapter:"raid", type:"single", text:"RAID 6 mit vier 4-TB-Festplatten: Wie viel nutzbarer Speicher entsteht ungefähr?", options:["8 TB","16 TB","12 TB","4 TB"], answer:[0], hint:"Bei RAID 6 gehen rechnerisch zwei Platten für doppelte Parität weg.", explanation:"(4−2) × 4 TB = 8 TB nutzbar."},
  {id:"r06", chapter:"raid", type:"single", text:"RAID 10 mit vier 4-TB-Festplatten: Wie viel nutzbarer Speicher entsteht ungefähr?", options:["8 TB","16 TB","12 TB","4 TB"], answer:[0], hint:"RAID 10 nutzt Spiegelpaare; ungefähr die Hälfte bleibt nutzbar.", explanation:"Vier 4-TB-Platten in RAID 10 ergeben ungefähr 8 TB nutzbaren Speicher."},
  {id:"r07", chapter:"raid", type:"single", text:"Welches RAID-Level bietet keine Redundanz?", options:["RAID 0","RAID 1","RAID 5","RAID 6"], answer:[0], hint:"Die Null ist ein guter Hinweis.", explanation:"RAID 0 verteilt Daten nur für Leistung/Kapazität. Es schützt nicht vor Plattenausfall."},
  {id:"r08", chapter:"raid", type:"single", text:"Was bedeutet Hot-Spare?", options:["Eine eingebaute Ersatzfestplatte, die bei Ausfall automatisch einspringen kann","Ein besonders heißer Serverraum","Ein manuelles Vollbackup","Ein öffentlicher Schlüssel"], answer:[0], hint:"Spare = Ersatz.", explanation:"Eine Hot-Spare-Platte wartet im System und kann beim Ausfall einer anderen Platte automatisch für den Wiederaufbau genutzt werden."},
  {id:"r09", chapter:"raid", type:"single", text:"Was ist ein Hardware-RAID?", options:["Ein RAID-Verbund wird durch einen eigenen Controller verwaltet","Das Betriebssystem verwaltet den RAID-Verbund allein","Ein Backup liegt auf Papier vor","Eine Verschlüsselung mit Public Key"], answer:[0], hint:"Hardware heißt: eigene Komponente übernimmt es.", explanation:"Beim Hardware-RAID übernimmt ein RAID-Controller die Verwaltung."},
  {id:"r10", chapter:"raid", type:"single", text:"Was ist ein Software-RAID?", options:["Das Betriebssystem verwaltet den RAID-Verbund","Ein externer Controller verwaltet den RAID-Verbund","Eine Akte wird ausgedruckt","Ein Hash wird gesalzen"], answer:[0], hint:"Software heißt: keine separate RAID-Karte nötig.", explanation:"Beim Software-RAID übernimmt das Betriebssystem oder eine Software die RAID-Funktion."},

  // Backup
  {id:"bk01", chapter:"backup", type:"single", text:"Was ist ein Voll-Backup?", options:["Eine komplette Sicherung aller ausgewählten Daten","Nur Änderungen seit gestern","Nur Änderungen seit dem letzten Vollbackup","Eine Ersatzfestplatte im RAID"], answer:[0], hint:"Voll bedeutet komplett.", explanation:"Beim Voll-Backup werden alle ausgewählten Daten vollständig gesichert."},
  {id:"bk02", chapter:"backup", type:"single", text:"Was ist ein differentielles Backup?", options:["Sicherung aller Änderungen seit dem letzten Voll-Backup","Sicherung nur der Änderungen seit der letzten Sicherung","Eine vollständige Sicherung aller Daten","Ein RAID-Level mit doppelter Parität"], answer:[0], hint:"Differentiell schaut zurück zum letzten Vollbackup.", explanation:"Differentiell enthält alle Änderungen seit dem letzten Voll-Backup und wird bis zum nächsten Voll-Backup größer."},
  {id:"bk03", chapter:"backup", type:"single", text:"Was ist ein inkrementelles Backup?", options:["Sicherung nur der Änderungen seit der letzten Sicherung","Immer eine komplette Sicherung","Sicherung aller Änderungen seit dem ersten Serverstart","Spiegelung von Festplatten"], answer:[0], hint:"Inkrementell = kleine Schritte.", explanation:"Inkrementell speichert nur die Änderungen seit der vorherigen Sicherung."},
  {id:"bk04", chapter:"backup", type:"single", text:"Welche Wiederherstellung ist meistens am einfachsten?", options:["Voll-Backup","Inkrementelles Backup mit langer Kette","Defekte Festplatte ohne Backup","Ungetesteter USB-Stick"], answer:[0], hint:"Je weniger Teile nötig sind, desto einfacher.", explanation:"Ein Voll-Backup ist einfach wiederherzustellen, braucht aber mehr Speicher und Zeit."},
  {id:"bk05", chapter:"backup", type:"single", text:"Sonntag Vollbackup, Montag inkrementell, Dienstag inkrementell. Was braucht man für Restore auf Dienstag?", options:["Vollbackup von Sonntag + Montag-Inkrement + Dienstag-Inkrement","Nur Dienstag-Inkrement","Nur Montag-Inkrement","Nur ein RAID 0"], answer:[0], hint:"Die inkrementelle Kette muss vollständig sein.", explanation:"Für die Wiederherstellung braucht man das letzte Vollbackup und alle folgenden inkrementellen Sicherungen bis zum gewünschten Zeitpunkt."},
  {id:"bk06", chapter:"backup", type:"single", text:"Sonntag Vollbackup, Mittwoch differentiell. Was braucht man für Restore auf Mittwoch?", options:["Vollbackup von Sonntag + differentielles Backup von Mittwoch","Alle täglichen differentiellen Backups der Woche","Nur Mittwoch ohne Vollbackup","Nur eine Hot-Spare-Platte"], answer:[0], hint:"Differentiell enthält alles seit dem letzten Vollbackup.", explanation:"Beim differentiellen Backup braucht man das letzte Vollbackup und das letzte differentielle Backup."},
  {id:"bk07", chapter:"backup", type:"single", text:"Was meint das Generationenprinzip?", options:["Backups werden in mehreren Generationen wie täglich, wöchentlich, monatlich aufbewahrt","Jede Generation Mitarbeitender bekommt ein Passwort","RAID 1 wird nach Alter sortiert","Nur das neueste Backup bleibt erhalten"], answer:[0], hint:"Denke an Großvater-Vater-Sohn.", explanation:"Das Generationenprinzip bewahrt mehrere Stände auf, damit Fehler oder Löschungen nicht sofort alle Backups überschreiben."},
  {id:"bk08", chapter:"backup", type:"multi", text:"Was gehört zur 3-2-1-1-0-Regel?", options:["3 Kopien der Daten","2 unterschiedliche Speichermedien","1 Kopie außer Haus","0 ungeprüfte Fehler durch Tests"], answer:[0,1,2,3], hint:"Die Zahlen stehen für Kopien, Medien, Ort, Offline/Immutable und Fehlerfreiheit.", explanation:"3 Kopien, 2 Medien, 1 Offsite, 1 Offline/Immutable und 0 Fehler durch Prüfung/Restore-Test gehören zur Regel."},
  {id:"bk09", chapter:"backup", type:"single", text:"Warum ist ein Restore-Test wichtig?", options:["Damit man sicher weiß, dass Daten wirklich wiederhergestellt werden können","Damit Backups automatisch kleiner werden","Damit RAID 0 redundant wird","Damit Datenschutz nicht mehr gilt"], answer:[0], hint:"Ein Backup ist nur wertvoll, wenn es zurückgespielt werden kann.", explanation:"Restore-Tests prüfen, ob Sicherungen vollständig und nutzbar sind."},
  {id:"bk10", chapter:"backup", type:"single", text:"Welche Aussage passt zu RPO?", options:["Maximal akzeptierter Datenverlust in Zeit","Maximal erlaubte Farbe des Serverraums","Anzahl der Festplatten im RAID","Name des Backup-Programms"], answer:[0], hint:"Point = Datenstand/Zeitpunkt.", explanation:"RPO beschreibt, auf welchen Datenstand man im Notfall maximal zurückfallen darf."},

  // Krypto
  {id:"k01", chapter:"krypto", type:"single", text:"Wie funktioniert symmetrische Verschlüsselung grundsätzlich?", options:["Ein gemeinsamer geheimer Schlüssel verschlüsselt und entschlüsselt","Ein öffentlicher und ein privater Schlüssel werden immer getrennt genutzt","Daten werden unumkehrbar gehasht","Es wird gar kein Schlüssel verwendet"], answer:[0], hint:"Symmetrisch = beide Seiten verwenden denselben geheimen Schlüssel.", explanation:"Bei symmetrischer Verschlüsselung teilen die Kommunikationspartner denselben geheimen Schlüssel."},
  {id:"k02", chapter:"krypto", type:"single", text:"Wie funktioniert asymmetrische Verschlüsselung grundsätzlich?", options:["Es gibt einen öffentlichen und einen privaten Schlüssel","Es gibt nur einen gemeinsamen Schlüssel","Es gibt keine Schlüssel","Alle Daten werden automatisch gelöscht"], answer:[0], hint:"Public Key und Private Key.", explanation:"Asymmetrische Verfahren verwenden ein Schlüsselpaar: öffentlich zum Verschlüsseln/Prüfen, privat zum Entschlüsseln/Signieren."},
  {id:"k03", chapter:"krypto", type:"single", text:"Welches Verfahren ist ein symmetrisches Beispiel?", options:["AES","RSA","DSA","ECC"], answer:[0], hint:"Es wird oft für große Datenmengen genutzt.", explanation:"AES ist ein verbreitetes symmetrisches Verschlüsselungsverfahren."},
  {id:"k04", chapter:"krypto", type:"single", text:"Welches Verfahren ist ein asymmetrisches Beispiel?", options:["RSA","AES","Voll-Backup","RAID 6"], answer:[0], hint:"Es arbeitet mit Public und Private Key.", explanation:"RSA ist ein asymmetrisches Verfahren."},
  {id:"k05", chapter:"krypto", type:"single", text:"Was ist der wichtigste Unterschied zwischen Verschlüsselung und Hashing?", options:["Verschlüsselung ist mit Schlüssel rückgängig machbar, Hashing ist grundsätzlich nicht zurückrechenbar","Hashing ist immer schneller und deshalb gleich Verschlüsselung","Verschlüsselung braucht nie Schlüssel","Hashing dient nur zum Drucken"], answer:[0], hint:"Kann man den Originaltext wiederherstellen?", explanation:"Verschlüsselung ist reversibel mit passendem Schlüssel. Hashing erzeugt einen Einweg-Fingerabdruck."},
  {id:"k06", chapter:"krypto", type:"multi", text:"Wofür werden Hashfunktionen häufig genutzt?", options:["Integrität von Downloads prüfen","Passwörter nicht im Klartext speichern","Digitale Signaturen unterstützen","RAID-Speicherplatz vergrößern"], answer:[0,1,2], hint:"Hash = Fingerabdruck von Daten.", explanation:"Hashfunktionen helfen bei Integritätsprüfung, Passwortspeicherung und digitalen Signaturen, aber vergrößern keinen RAID-Speicher."},
  {id:"k07", chapter:"krypto", type:"single", text:"Was ist ein Salted Hash?", options:["Ein Hash, bei dem vor dem Hashen ein zufälliger Salt ergänzt wurde","Ein verschlüsseltes Vollbackup ohne Passwort","Ein RAID-Level mit Salz","Eine E-Mail ohne Signatur"], answer:[0], hint:"Salt = zufällige Zusatzzeichen.", explanation:"Ein Salt sorgt dafür, dass gleiche Passwörter unterschiedliche Hashwerte erhalten."},
  {id:"k08", chapter:"krypto", type:"single", text:"Wogegen hilft ein Salt besonders?", options:["Vorberechnete Rainbow-Table-Angriffe","Stromausfall im Serverraum","Fehlende RAID-Parität","Zu kleine Monitore"], answer:[0], hint:"Angreifer sollen vorberechnete Passwort-Hash-Listen nicht direkt nutzen können.", explanation:"Ein individueller Salt erschwert vorberechnete Hash-Tabellen, weil gleiche Passwörter nicht mehr gleiche Hashes erzeugen."}
,
{"id": "dsg01", "chapter": "recht", "type": "single", "text": "Welche Aussage passt am besten zu personenbezogenen Daten nach DSGVO?", "options": ["Informationen, mit denen eine natürliche Person direkt oder indirekt identifiziert werden kann", "Nur Daten, die in Papierakten stehen", "Nur geheime Unternehmenszahlen ohne Personenbezug", "Nur Daten, die bereits gelöscht wurden"], "answer": [0], "hint": "Denke an Name, Kennnummer, Standortdaten oder Online-Kennung.", "explanation": "Personenbezogene Daten beziehen sich auf eine identifizierte oder identifizierbare natürliche Person."},
{"id": "dsg02", "chapter": "recht", "type": "multi", "text": "Welche Vorgänge zählen zur Verarbeitung personenbezogener Daten?", "options": ["Speichern von Mandantendaten", "Auslesen einer Akte", "Löschen einer alten Adresse", "Übermitteln an einen Dienstleister"], "answer": [0, 1, 2, 3], "hint": "Verarbeitung ist sehr weit gefasst.", "explanation": "Erheben, Speichern, Auslesen, Übermitteln und Löschen sind alles Verarbeitungsvorgänge."},
{"id": "dsg03", "chapter": "recht", "type": "single", "text": "Was ist der Verantwortliche im Sinne der DSGVO?", "options": ["Die Stelle, die über Zweck und Mittel der Verarbeitung entscheidet", "Jeder Empfänger einer E-Mail", "Nur der externe IT-Dienstleister", "Nur die betroffene Person"], "answer": [0], "hint": "Wer entscheidet warum und wie verarbeitet wird?", "explanation": "Verantwortlich ist, wer Zwecke und Mittel der Verarbeitung festlegt."},
{"id": "dsg04", "chapter": "recht", "type": "single", "text": "Ein Cloud-Anbieter speichert Kanzlei-Backups nach Weisung der Kanzlei. Welche Rolle passt am ehesten?", "options": ["Auftragsverarbeiter", "Betroffene Person", "Aufsichtsbehörde", "Dritter ohne Auftrag"], "answer": [0], "hint": "Der Anbieter arbeitet für die Kanzlei und nicht für eigene Zwecke.", "explanation": "Ein Auftragsverarbeiter verarbeitet personenbezogene Daten im Auftrag des Verantwortlichen."},
{"id": "dsg05", "chapter": "recht", "type": "multi", "text": "Welche Grundsätze gehören zu Art. 5 DSGVO?", "options": ["Rechtmäßigkeit, Transparenz und Treu und Glauben", "Zweckbindung", "Datenminimierung", "Speicherbegrenzung"], "answer": [0, 1, 2, 3], "hint": "Denke an die Grundregeln der Datenverarbeitung.", "explanation": "Art. 5 enthält u. a. Rechtmäßigkeit/Transparenz, Zweckbindung, Datenminimierung, Richtigkeit, Speicherbegrenzung, Integrität/Vertraulichkeit und Rechenschaftspflicht."},
{"id": "dsg06", "chapter": "recht", "type": "single", "text": "Welche Aussage zur Rechtsgrundlage ist richtig?", "options": ["Mindestens eine Rechtsgrundlage muss vorliegen, damit Verarbeitung rechtmäßig ist", "Eine Rechtsgrundlage braucht man nur bei Papierakten", "Eine Einwilligung ist immer zwingend und die einzige Möglichkeit", "Eine Rechtsgrundlage ersetzt alle TOM"], "answer": [0], "hint": "Die DSGVO nennt mehrere mögliche Bedingungen.", "explanation": "Verarbeitung ist nur rechtmäßig, wenn mindestens eine passende Rechtsgrundlage erfüllt ist."},
{"id": "dsg07", "chapter": "recht", "type": "single", "text": "Was bedeutet Datenminimierung in einer Kanzlei?", "options": ["Nur Daten erfassen, die für den konkreten Zweck nötig sind", "Alle Daten sammeln, falls man sie später braucht", "Daten möglichst lange behalten", "Daten nur auf Papier speichern"], "answer": [0], "hint": "So wenig wie möglich, so viel wie nötig.", "explanation": "Datenminimierung verlangt Beschränkung auf das notwendige Maß."},
{"id": "dsg08", "chapter": "recht", "type": "single", "text": "Eine Kanzlei nutzt alte Mandantendaten ohne neue Grundlage für Werbung. Welcher Grundsatz ist besonders problematisch?", "options": ["Zweckbindung", "RAID-Parität", "Verfügbarkeit", "Hot-Spare"], "answer": [0], "hint": "Die Daten wurden ursprünglich für einen anderen Zweck erhoben.", "explanation": "Zweckbindung bedeutet, dass Daten nicht einfach für unvereinbare neue Zwecke genutzt werden dürfen."},
{"id": "dsg09", "chapter": "recht", "type": "multi", "text": "Welche Beispiele können eine Datenschutzverletzung sein?", "options": ["E-Mail mit Mandantendaten geht an falschen Empfänger", "USB-Stick mit personenbezogenen Daten geht verloren", "Ransomware verschlüsselt die Mandantenakten", "Unbefugter liest Akten im Druckerraum"], "answer": [0, 1, 2, 3], "hint": "Denke an Verlust, Veränderung, unbefugte Offenlegung oder Zugriff.", "explanation": "Alle genannten Situationen können personenbezogene Daten gefährden und eine Datenschutzverletzung darstellen."},
{"id": "dsg10", "chapter": "recht", "type": "single", "text": "Welche TOM nennt Art. 32 DSGVO ausdrücklich als mögliches Beispiel?", "options": ["Pseudonymisierung und Verschlüsselung personenbezogener Daten", "Nur Ausdruck aller Akten", "Abschaffung aller Passwörter", "Speicherung ohne Löschkonzept"], "answer": [0], "hint": "Es geht um geeignete technische und organisatorische Maßnahmen.", "explanation": "Art. 32 nennt u. a. Pseudonymisierung, Verschlüsselung, dauerhafte Sicherstellung von Vertraulichkeit/Integrität/Verfügbarkeit und regelmäßige Überprüfung."},
{"id": "dsg11", "chapter": "recht", "type": "single", "text": "Was bedeutet Rechenschaftspflicht?", "options": ["Der Verantwortliche muss Einhaltung der Datenschutzgrundsätze nachweisen können", "Der Mandant muss alle Kanzleifehler beweisen", "Backups müssen nie getestet werden", "Nur der IT-Dienstleister ist verantwortlich"], "answer": [0], "hint": "Nicht nur einhalten, sondern zeigen können.", "explanation": "Rechenschaftspflicht bedeutet, dass der Verantwortliche die Einhaltung nachweisen können muss."},
{"id": "dsg12", "chapter": "recht", "type": "multi", "text": "Welche Betroffenenrechte sind typisch?", "options": ["Auskunft", "Berichtigung", "Löschung", "Widerspruch"], "answer": [0, 1, 2, 3], "hint": "Betroffene haben mehrere Rechte bezüglich ihrer Daten.", "explanation": "Zu den Betroffenenrechten gehören u. a. Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch."},
{"id": "is01", "chapter": "isms", "type": "single", "text": "Warum reicht es nicht, einfach nur einzelne Sicherheitsprodukte einzusetzen?", "options": ["Ohne Konzept, Zuständigkeit und Kontrolle sind Einzelmaßnahmen oft nicht effektiv und effizient", "Weil Firewalls grundsätzlich verboten sind", "Weil nur Papierdokumentation zählt", "Weil Datenschutz nichts mit IT zu tun hat"], "answer": [0], "hint": "Denke an gesteuerten Sicherheitsprozess.", "explanation": "Ein ISMS sorgt dafür, dass Maßnahmen zielgerichtet geplant, umgesetzt, geprüft und verbessert werden."},
{"id": "is02", "chapter": "isms", "type": "single", "text": "Wofür steht PDCA?", "options": ["Plan, Do, Check, Act", "Private Daten, Cloud, Archiv", "Passwort, Download, Cookie, Account", "Planung, Drucker, Client, Administrator"], "answer": [0], "hint": "Vier Schritte eines Managementkreislaufs.", "explanation": "PDCA bedeutet Planen, Umsetzen, Prüfen und Verbessern."},
{"id": "is03", "chapter": "isms", "type": "single", "text": "Welche Phase passt zu 'Restore-Test auswerten und Fehler im Backup-Konzept beheben'?", "options": ["Act", "Plan", "Do", "Nur Dokumentation ohne Änderung"], "answer": [0], "hint": "Nach dem Prüfen folgt Verbesserung.", "explanation": "Act bedeutet Defizite beseitigen und Verbesserungen umsetzen."},
{"id": "is04", "chapter": "isms", "type": "multi", "text": "Welche Aufgaben gehören typischerweise zum ISB?", "options": ["Sicherheitsprozess koordinieren", "Leitung über den Status informieren", "Schulungen/Sensibilisierung initiieren", "Sicherheitsvorfälle untersuchen"], "answer": [0, 1, 2, 3], "hint": "Der ISB steuert und koordiniert Informationssicherheit.", "explanation": "Der ISB unterstützt Leitung, koordiniert Konzepte, berichtet, prüft Maßnahmen und initiiert Schulungen."},
{"id": "is05", "chapter": "isms", "type": "single", "text": "Warum sollte der ISB möglichst direkt der Leitung zugeordnet sein?", "options": ["Damit er unabhängig berichten und kontrollieren kann", "Damit er keine Berichte schreiben muss", "Damit Datenschutz automatisch entfällt", "Damit er keine IT-Kenntnisse braucht"], "answer": [0], "hint": "Denke an Unabhängigkeit und Rollenkonflikte.", "explanation": "Eine zu starke Einbindung in die IT kann zu Rollenkonflikten führen, weil der ISB Maßnahmen auch kontrollieren muss."},
{"id": "is06", "chapter": "isms", "type": "multi", "text": "Welche Pflichten hat die Leitungsebene im ISMS?", "options": ["Risiken kennen und Grundentscheidungen treffen", "Ressourcen bereitstellen", "Sicherheitsprozess initiieren und kontrollieren", "Vorbild für sicherheitsgerechtes Verhalten sein"], "answer": [0, 1, 2, 3], "hint": "Informationssicherheit muss von oben getragen werden.", "explanation": "Die Leitung trägt Gesamtverantwortung und muss Ressourcen, Entscheidungen und Vorbildfunktion übernehmen."},
{"id": "is07", "chapter": "isms", "type": "single", "text": "Was ist eine Sicherheitsleitlinie?", "options": ["Ein Grundsatzdokument mit Zielen und Rahmenbedingungen der Informationssicherheit", "Eine Liste aller privaten Passwörter", "Eine reine Preisliste für Hardware", "Ein RAID-Level"], "answer": [0], "hint": "Leitlinie = übergeordnete Sicherheitsgrundsätze.", "explanation": "Die Leitlinie hält Sicherheitsziele fest und macht sie in der Institution bekannt."},
{"id": "is08", "chapter": "isms", "type": "single", "text": "Was bewirkt Informationsklassifizierung?", "options": ["Mitarbeitende erkennen, wie vertraulich Informationen sind und wie sie damit umgehen müssen", "Alle Informationen werden automatisch öffentlich", "Alle Daten dürfen unbegrenzt gespeichert werden", "Backups werden unnötig"], "answer": [0], "hint": "Klassifizierung hilft beim Umgang mit Informationen.", "explanation": "Durch Klassifizierungsvermerke kann klar werden, welche Regeln für Informationen gelten."},
{"id": "is09", "chapter": "isms", "type": "multi", "text": "Welche Inhalte können in einem Sicherheitskonzept vorkommen?", "options": ["Physische Absicherung von Räumen", "Identitäts- und Berechtigungsmanagement", "Kryptographische Maßnahmen", "Datensicherungsverfahren"], "answer": [0, 1, 2, 3], "hint": "Ein Sicherheitskonzept umfasst Technik und Organisation.", "explanation": "Ein Konzept enthält passende technische und organisatorische Maßnahmen."},
{"id": "is10", "chapter": "isms", "type": "single", "text": "Warum ist Dokumentation im Sicherheitsprozess wichtig?", "options": ["Damit Entscheidungen und Maßnahmen nachvollziehbar und prüfbar sind", "Damit niemand mehr Verantwortung trägt", "Damit keine Schulungen nötig sind", "Damit alle Daten anonym werden"], "answer": [0], "hint": "Nachvollziehbarkeit und Nachweis.", "explanation": "Dokumentation vermeidet Missverständnisse und unterstützt Kontrolle, Nachweise und Verbesserungen."},
{"id": "ra01", "chapter": "risiko", "type": "multi", "text": "Wann besteht zusätzlicher Analysebedarf für eine Risikoanalyse?", "options": ["Zielobjekt hat hohen/sehr hohen Schutzbedarf", "Kein passender IT-Grundschutz-Baustein vorhanden", "Einsatzumgebung ist untypisch", "Das System hat einen schönen Namen"], "answer": [0, 1, 2], "hint": "Es geht um besondere Schutzbedarfe oder untypische Situationen.", "explanation": "Diese drei Fälle lösen nach IT-Grundschutz typischerweise zusätzlichen Analysebedarf aus."},
{"id": "ra02", "chapter": "risiko", "type": "single", "text": "Was ist der erste Schritt beim Anlegen einer Gefährdungsübersicht?", "options": ["Relevante Gefährdungen für das Zielobjekt identifizieren", "Direkt alle Risiken akzeptieren", "Nur die Kosten schätzen", "Das Backup löschen"], "answer": [0], "hint": "Erst Gefahr erkennen, dann bewerten.", "explanation": "Die Gefährdungsübersicht sammelt relevante Gefährdungen für ein Zielobjekt."},
{"id": "ra03", "chapter": "risiko", "type": "multi", "text": "Welche Beispiele sind elementare Gefährdungen?", "options": ["Feuer", "Abhören", "Schadprogramme", "Datenverlust"], "answer": [0, 1, 2, 3], "hint": "Sie können physisch, technisch oder menschlich sein.", "explanation": "Alle genannten Beispiele kommen als elementare Gefährdungen in Betracht."},
{"id": "ra04", "chapter": "risiko", "type": "single", "text": "Welche Grundwerte können von Schadprogrammen betroffen sein?", "options": ["Vertraulichkeit, Integrität und Verfügbarkeit", "Nur Design", "Nur Speicherplatz", "Nur Druckerfarbe"], "answer": [0], "hint": "Malware kann Daten lesen, ändern oder Systeme lahmlegen.", "explanation": "Schadprogramme können Daten ausspähen, manipulieren und Systeme ausfallen lassen."},
{"id": "ra05", "chapter": "risiko", "type": "single", "text": "Was ergibt zusammen die Risikohöhe?", "options": ["Eintrittshäufigkeit und Schadenshöhe", "Monitorgröße und Stromverbrauch", "Anzahl der Tastaturen und Papierakten", "Nur die Farbe des Serverraums"], "answer": [0], "hint": "Wie oft und wie schlimm?", "explanation": "Ein Risiko wird aus Häufigkeit/Wahrscheinlichkeit und Auswirkung/Schadenshöhe bewertet."},
{"id": "ra06", "chapter": "risiko", "type": "single", "text": "Ein Ereignis könnte höchstens alle fünf Jahre auftreten. Welche Häufigkeitskategorie passt nach dem Beispiel im Unterricht?", "options": ["selten", "sehr häufig", "täglich", "immer"], "answer": [0], "hint": "Sehr niedrige Häufigkeit.", "explanation": "Im Beispiel bedeutet selten: nach heutigem Kenntnisstand höchstens alle fünf Jahre."},
{"id": "ra07", "chapter": "risiko", "type": "single", "text": "Welche Schadenskategorie passt zu 'Schaden kann existenziell bedrohlich sein'?", "options": ["existenzbedrohend", "vernachlässigbar", "begrenzt", "normaler Komfortverlust"], "answer": [0], "hint": "Der Begriff steckt in der Beschreibung.", "explanation": "Existenzbedrohend bedeutet katastrophales oder existenzgefährdendes Ausmaß."},
{"id": "ra08", "chapter": "risiko", "type": "single", "text": "Was ist Risikoreduktion?", "options": ["Maßnahmen umsetzen, um Eintrittshäufigkeit oder Schadenshöhe zu senken", "Risiko ignorieren ohne Dokumentation", "Risiko höher bewerten als nötig", "Alle Sicherheitsmaßnahmen entfernen"], "answer": [0], "hint": "Das Risiko wird kleiner gemacht.", "explanation": "Risikoreduktion senkt Risiken durch zusätzliche Sicherheitsmaßnahmen."},
{"id": "ra09", "chapter": "risiko", "type": "single", "text": "Was ist Risikoakzeptanz?", "options": ["Ein Restrisiko wird bewusst getragen, wenn es zu den Akzeptanzkriterien passt", "Jedes Risiko wird automatisch verboten", "Risiken werden an Kunden verschwiegen", "Risiko wird durch RAID 0 gelöst"], "answer": [0], "hint": "Akzeptieren heißt nicht vergessen.", "explanation": "Risikoakzeptanz muss bewusst, begründet und dokumentiert vom Management getragen werden."},
{"id": "ra10", "chapter": "risiko", "type": "multi", "text": "Welche Punkte sind bei Risikoentscheidungen wichtig?", "options": ["Management einbinden", "Entscheidung dokumentieren", "Restrisiko bewerten", "Kosten und Nutzen möglicher Maßnahmen betrachten"], "answer": [0, 1, 2, 3], "hint": "Risikoentscheidungen müssen nachvollziehbar sein.", "explanation": "Risikoentscheidungen betreffen Verantwortung, Kosten und Restrisiken und sollten daher dokumentiert werden."},
{"id": "up01", "chapter": "umsetzung", "type": "single", "text": "Was ist das Ziel der Umsetzungsplanung?", "options": ["Sicherheitslücken wirksam und effizient schließen", "Alle Sicherheitsmaßnahmen gleichzeitig ohne Priorität kaufen", "Nur Logos austauschen", "Schutzbedarf ignorieren"], "answer": [0], "hint": "Es geht um Lücken aus Check/Risikoanalyse.", "explanation": "Umsetzungsplanung priorisiert und organisiert Maßnahmen zur Schließung von Defiziten."},
{"id": "up02", "chapter": "umsetzung", "type": "multi", "text": "Was prüft man beim Konsolidieren von Maßnahmen?", "options": ["Ob Maßnahmen überflüssig sind", "Ob Maßnahmen konkretisiert werden müssen", "Ob Maßnahmen geeignet und angemessen sind", "Ob Maßnahmen andere Schutzwirkungen beeinträchtigen"], "answer": [0, 1, 2, 3], "hint": "Maßnahmen sollen zusammenpassen und sinnvoll sein.", "explanation": "Konsolidierung verhindert Doppelungen, falsche Maßnahmen und unnötigen Aufwand."},
{"id": "up03", "chapter": "umsetzung", "type": "single", "text": "Eine ideale bauliche Maßnahme ist unverhältnismäßig teuer. Was kann sinnvoll sein?", "options": ["Eine geeignete Ersatzmaßnahme mit dokumentierter Begründung", "Gar nichts dokumentieren", "Alle Risiken leugnen", "Den Netzplan löschen"], "answer": [0], "hint": "Nicht perfekt, aber angemessen und nachvollziehbar.", "explanation": "Wenn eine Maßnahme wirtschaftlich nicht vertretbar ist, können Ersatzmaßnahmen Risiken zumindest begrenzen."},
{"id": "up04", "chapter": "umsetzung", "type": "multi", "text": "Welche Informationen gehören in eine Aufwandschätzung?", "options": ["Einmalige Kosten", "Laufende Kosten", "Personeller Aufwand", "Erforderliche Schulungen oder Betrieb"], "answer": [0, 1, 2, 3], "hint": "Denke an Geld und Arbeitszeit.", "explanation": "Managemententscheidungen benötigen Kosten, Ressourcen und Folgekosten."},
{"id": "up05", "chapter": "umsetzung", "type": "single", "text": "Welche Anforderungen sollten grundsätzlich zuerst erfüllt werden?", "options": ["Basis-Anforderungen", "Anforderungen für höheren Schutzbedarf immer vor allem anderen", "Kosmetische Designwünsche", "Maßnahmen ohne Wirkung"], "answer": [0], "hint": "Erst Mindestniveau.", "explanation": "Basis-Anforderungen bilden das Mindest-Sicherheitsniveau."},
{"id": "up06", "chapter": "umsetzung", "type": "single", "text": "Was bedeuten R1, R2 und R3 in der Umsetzungsreihenfolge?", "options": ["Hinweise zur sinnvollen Bearbeitungsreihenfolge von Bausteinen/Anforderungen", "RAID-Level für Backups", "Rechte 1 bis 3 eines Benutzers", "Zufällige Prioritäten ohne Bedeutung"], "answer": [0], "hint": "R1 ist meist vorrangig.", "explanation": "R1/R2/R3 geben Orientierung, was früher oder später bearbeitet werden sollte."},
{"id": "up07", "chapter": "umsetzung", "type": "multi", "text": "Welche Maßnahmen sollten oft priorisiert werden?", "options": ["Maßnahmen für Komponenten mit höherem Schutzbedarf", "Maßnahmen mit großer Breitenwirkung", "Maßnahmen in Bereichen mit auffallend vielen Lücken", "Maßnahmen nur wegen schöner Farbe"], "answer": [0, 1, 2], "hint": "Priorität richtet sich nach Wirkung und Risiko.", "explanation": "Hoher Schutzbedarf, breite Wirkung und viele Lücken sprechen für höhere Priorität."},
{"id": "up08", "chapter": "umsetzung", "type": "single", "text": "Warum müssen Verantwortlichkeiten und Termine festgelegt werden?", "options": ["Damit Maßnahmen fristgerecht und nachvollziehbar umgesetzt werden", "Damit niemand zuständig ist", "Damit die Maßnahme automatisch billig wird", "Damit kein Bericht nötig ist"], "answer": [0], "hint": "Wer macht was bis wann?", "explanation": "Ohne klare Verantwortliche und Termine bleiben Maßnahmen oft liegen."},
{"id": "up09", "chapter": "umsetzung", "type": "single", "text": "Warum sind Schulungen begleitende Maßnahmen?", "options": ["Weil neue Sicherheitsmaßnahmen sonst falsch oder gar nicht angewendet werden können", "Weil Schulungen Backups ersetzen", "Weil Schulungen Passwörter abschaffen", "Weil Schulungen nur Dekoration sind"], "answer": [0], "hint": "Mitarbeitende müssen Maßnahmen verstehen und akzeptieren.", "explanation": "Akzeptanz und richtige Anwendung sind entscheidend für die Wirksamkeit von Maßnahmen."},
{"id": "up10", "chapter": "umsetzung", "type": "multi", "text": "Was gehört typischerweise in einen Realisierungsplan?", "options": ["Umzusetzende Maßnahme", "Terminplanung", "Budget", "Umsetzung durch/verantwortliche Person"], "answer": [0, 1, 2, 3], "hint": "Der Plan macht Umsetzung konkret.", "explanation": "Ein Realisierungsplan dokumentiert Maßnahme, Zeit, Kosten und Verantwortlichkeit."},
{"id": "av01", "chapter": "verbesserung", "type": "multi", "text": "Warum muss ein Sicherheitskonzept regelmäßig überprüft werden?", "options": ["Gefährdungslage ändert sich", "Prozesse und Strukturen ändern sich", "Ziele und Prioritäten ändern sich", "Neue Technik kann besseren Schutz ermöglichen"], "answer": [0, 1, 2, 3], "hint": "Informationssicherheit ist kein einmaliger Zustand.", "explanation": "Regelmäßige Prüfung hält das Sicherheitskonzept aktuell und wirksam."},
{"id": "av02", "chapter": "verbesserung", "type": "single", "text": "Wie häufig sollte mindestens geprüft werden, ob das Sicherheitskonzept noch effektiv ist?", "options": ["Mindestens einmal pro Jahr", "Nur alle 20 Jahre", "Nie nach Sicherheitsvorfällen", "Nur bei Druckerwechsel"], "answer": [0], "hint": "Im Unterricht stand eine Mindesthäufigkeit.", "explanation": "Mindestens jährlich sollte geprüft werden, ob das Sicherheitskonzept den Zielen entspricht."},
{"id": "av03", "chapter": "verbesserung", "type": "single", "text": "Was sollte nach einem Sicherheitsvorfall passieren?", "options": ["Sicherheitskonzept hinterfragen, Schwachstellen identifizieren und beseitigen", "Vorfall ignorieren, damit niemand Arbeit hat", "Alle Backups löschen", "Nur das Logo ändern"], "answer": [0], "hint": "Aus Vorfällen lernen.", "explanation": "Sicherheitsvorfälle sind Anlass für zusätzliche Prüfung und Verbesserung."},
{"id": "av04", "chapter": "verbesserung", "type": "single", "text": "Was ist eine IS-Revision?", "options": ["Systematische Prüfung, ob Sicherheitskonzept umgesetzt ist und Anforderungen erfüllt", "Ein RAID-Rebuild", "Ein Passwortgenerator", "Eine Datenschutz-Einwilligung"], "answer": [0], "hint": "Revision = Prüfung.", "explanation": "IS-Revision liefert belastbare Informationen über den Stand der Informationssicherheit."},
{"id": "av05", "chapter": "verbesserung", "type": "single", "text": "Wozu dient ein Cyber-Sicherheits-Check besonders?", "options": ["Zur Einschätzung der Anfälligkeit gegen Cyberangriffe und des Sicherheitsniveaus", "Zum automatischen Löschen aller Risiken", "Nur zum Erstellen von Rechnungen", "Zum Ersetzen der Leitung"], "answer": [0], "hint": "Der Name sagt: Cyber-Sicherheit prüfen.", "explanation": "Der Cyber-Sicherheits-Check hilft, Schwachstellen und Risiken gegenüber Cyberangriffen zu erkennen."},
{"id": "av06", "chapter": "verbesserung", "type": "single", "text": "Welche Kennzahl passt gut zur Datensicherung?", "options": ["Anzahl erfolgreicher Restore-Tests / Gesamtzahl der Restore-Tests", "Anzahl der Pflanzen im Büro / Fensterfläche", "Farbe der Festplatten / Anzahl Monitore", "Größe des Logos / Anzahl Benutzer"], "answer": [0], "hint": "Kennzahlen sollen Sicherheitsaspekte messbar machen.", "explanation": "Restore-Erfolg ist ein sinnvoller Indikator für die Wirksamkeit des Backup-Prozesses."},
{"id": "av07", "chapter": "verbesserung", "type": "single", "text": "Was beschreibt ein Reifegradmodell?", "options": ["Wie strukturiert, dokumentiert, geprüft und verbessert ein Prozess ist", "Wie alt ein Server ist", "Wie groß ein Backup ist", "Wie viele Monitore angeschlossen sind"], "answer": [0], "hint": "Reife = Qualität und Steuerung des Prozesses.", "explanation": "Reifegradmodelle helfen, Defizite und Verbesserungsbedarf in ISMS-Prozessen zu erkennen."},
{"id": "av08", "chapter": "verbesserung", "type": "single", "text": "Welcher Reifegrad passt zu 'Prozess vollständig umgesetzt und dokumentiert'?", "options": ["3", "0", "1", "5"], "answer": [0], "hint": "0 nichts, 5 kontinuierliche Verbesserung.", "explanation": "Im Beispiel steht Reifegrad 3 für vollständig umgesetzt und dokumentiert."},
{"id": "av09", "chapter": "verbesserung", "type": "single", "text": "Was ist Voraussetzung für ein ISO 27001-Zertifikat auf Basis von IT-Grundschutz?", "options": ["Nachweis eines ISMS und wirksame Erfüllung der IT-Grundschutz-Anforderungen durch Audit", "Nur eine Selbsterklärung ohne Prüfung", "Nur ein gekauftes Backup", "Nur ein schöner Netzplan"], "answer": [0], "hint": "Zertifizierung braucht Audit und Nachweise.", "explanation": "Ein unabhängiges Audit prüft, ob Anforderungen erfüllt sind."},
{"id": "av10", "chapter": "verbesserung", "type": "multi", "text": "Was muss mit Prüfergebnissen geschehen?", "options": ["Dokumentieren", "Der Leitung mitteilen", "Abweichungen und Risiken darstellen", "Verbesserungsvorschläge ableiten"], "answer": [0, 1, 2, 3], "hint": "Ergebnisse müssen zu Entscheidungen führen.", "explanation": "Prüfergebnisse dienen der Steuerung und Verbesserung und müssen deshalb dokumentiert und berichtet werden."},
{"id": "t11", "chapter": "tom", "type": "single", "text": "Eine Kanzlei hat keine klaren Rollen: jeder kann jede Akte öffnen. Welche organisatorische Maßnahme passt am besten?", "options": ["Berechtigungskonzept mit Rollen und Need-to-know-Prinzip erstellen", "Alle Türen offen lassen", "RAID 0 einrichten", "Backups löschen"], "answer": [0], "hint": "Wer darf welche Daten sehen?", "explanation": "Ein Berechtigungskonzept regelt Rechte passend zu Aufgaben und reduziert unbefugten Zugriff."},
{"id": "t12", "chapter": "tom", "type": "single", "text": "Ein Notebook mit Mandantendaten wird im Zug verloren. Welche technische Maßnahme hätte besonders geholfen?", "options": ["Festplattenverschlüsselung", "Mehr Papier im Drucker", "Längerer Dateiname", "Öffentliches WLAN"], "answer": [0], "hint": "Was schützt Daten, wenn das Gerät weg ist?", "explanation": "Verschlüsselung schützt gespeicherte Daten vor unbefugtem Lesen."},
{"id": "t13", "chapter": "tom", "type": "multi", "text": "Welche Maßnahmen passen gegen Phishing in der Kanzlei?", "options": ["Mitarbeiterschulung", "MFA für wichtige Konten", "Spam-/Malwarefilter", "Klare Meldewege bei verdächtigen E-Mails"], "answer": [0, 1, 2, 3], "hint": "Phishing bekämpft man technisch und organisatorisch.", "explanation": "Schulung, MFA, Filter und Meldewege verringern Eintrittswahrscheinlichkeit und Schaden."},
{"id": "t14", "chapter": "tom", "type": "single", "text": "Ein externer Reinigungstrupp hat nachts Zugang zu Büros mit offenen Akten. Was ist besonders wichtig?", "options": ["Vertraulichkeitsvereinbarung, klare Regeln und Akten wegschließen", "Adminpasswort an Reinigung geben", "Akten im Flur lagern", "Alle PCs entsperrt lassen"], "answer": [0], "hint": "Organisatorisch und physisch sichern.", "explanation": "Verträge/Verpflichtungen und Clean-Desk-Regeln reduzieren unbefugte Kenntnisnahme."},
{"id": "t15", "chapter": "tom", "type": "single", "text": "Warum ist Protokollierung bei Dateiabrufen hilfreich?", "options": ["Man kann nachvollziehen, wer auf welche Daten zugegriffen hat", "Sie ersetzt jede Verschlüsselung", "Sie macht alle Daten anonym", "Sie verhindert jeden Stromausfall"], "answer": [0], "hint": "Nachvollziehbarkeit und Kontrolle.", "explanation": "Protokolle unterstützen Übertragungskontrolle, Nachvollziehbarkeit und Vorfallanalyse."},
{"id": "st11", "chapter": "struktur", "type": "single", "text": "Was sollte bei einer Kanzlei zuerst erfasst werden, bevor Schutzbedarf bewertet wird?", "options": ["Prozesse, Informationen, Anwendungen, IT-Systeme, Netzplan und Räume", "Nur Lieblingsprogramme der Mitarbeitenden", "Nur alle Tastaturen", "Nur Farben der Räume"], "answer": [0], "hint": "Schutzbedarf braucht eine Struktur als Grundlage.", "explanation": "Strukturanalyse liefert die Zielobjekte und Abhängigkeiten für die spätere Schutzbedarfsfeststellung."},
{"id": "st12", "chapter": "struktur", "type": "multi", "text": "Welche Angaben helfen bei der Anwendungsliste?", "options": ["Eindeutige Kennung", "Name und Beschreibung der Anwendung", "Verarbeitete Informationen", "Verantwortliche und Benutzer"], "answer": [0, 1, 2, 3], "hint": "Womit, wofür, wer?", "explanation": "Diese Angaben machen Anwendungen nachvollziehbar und verknüpfbar mit Prozessen und Systemen."},
{"id": "st13", "chapter": "struktur", "type": "single", "text": "Warum sollte man Laptops nicht immer mit normalen Desktop-PCs gruppieren?", "options": ["Mobile Nutzung bringt zusätzliche Risiken und Sicherheitsanforderungen", "Laptops haben immer gleiche Risiken wie Schreibtischstühle", "Laptops brauchen nie Schutz", "Weil sie kleiner sind"], "answer": [0], "hint": "Denke an Verlust, Diebstahl und WLAN.", "explanation": "Mobile Geräte haben andere Rahmenbedingungen und oft höheren Bedarf an Verschlüsselung, Zugriffsschutz und Regeln."},
{"id": "sb11", "chapter": "schutzbedarf", "type": "single", "text": "Welche Frage hilft bei der Schutzbedarfsfeststellung am meisten?", "options": ["Was wäre, wenn Vertraulichkeit, Integrität oder Verfügbarkeit verletzt wird?", "Welche Farbe hat der Server?", "Wie heißt der Hersteller des Monitors?", "Wie viele Pflanzen stehen im Büro?"], "answer": [0], "hint": "Schutzbedarf wird über Schaden eingeschätzt.", "explanation": "Die Schutzbedarfsfeststellung betrachtet Schäden bei Verletzung der drei Grundwerte."},
{"id": "sb12", "chapter": "schutzbedarf", "type": "single", "text": "Eine falsche Frist in einer Anwaltskanzlei kann zu Fristversäumnis und Haftungsfällen führen. Welcher Grundwert ist besonders betroffen?", "options": ["Integrität", "Verfügbarkeit", "Verschlüsselung", "RAID"], "answer": [0], "hint": "Die Daten sind falsch.", "explanation": "Falsche oder manipulierte Fristdaten verletzen die Integrität."},
{"id": "sb13", "chapter": "schutzbedarf", "type": "multi", "text": "Welche Begründungen können für hohen Schutzbedarf einer Kanzlei-Akte sprechen?", "options": ["Besonders vertrauliche Mandantendaten", "Hohe rechtliche Folgen bei Offenlegung", "Starke Reputationsschäden", "Existenz wichtiger Fristen/Termine"], "answer": [0, 1, 2, 3], "hint": "Denke an Vertraulichkeit, Recht, Image und Aufgabenerfüllung.", "explanation": "In einer Kanzlei können Mandatsdaten bei Vertraulichkeit, Integrität und Verfügbarkeit hohen Schutzbedarf erzeugen."},
{"id": "r11", "chapter": "raid", "type": "single", "text": "Was passiert bei RAID 5 nach dem Ausfall einer Festplatte?", "options": ["Der Verbund läuft im Degraded Mode weiter, sollte aber schnell ersetzt und rebuilt werden", "Alle Daten sind immer sofort weg", "Der Speicher verdoppelt sich", "Es entsteht automatisch ein Vollbackup"], "answer": [0], "hint": "RAID 5 verträgt einen Plattenausfall.", "explanation": "RAID 5 kann einen Ausfall überbrücken, ist dann aber geschwächt bis zum Rebuild."},
{"id": "r12", "chapter": "raid", "type": "single", "text": "Warum ersetzt ein RAID-Rebuild kein Backup?", "options": ["Weil Rebuild nur den RAID-Verbund wiederherstellt, aber nicht vor Löschung, Malware oder Brand schützt", "Weil Backups nie nötig sind", "Weil RAID immer offline ist", "Weil Rebuild alle Dateien absichtlich löscht"], "answer": [0], "hint": "RAID ist keine historische Sicherung.", "explanation": "RAID schützt gegen bestimmte Plattenausfälle, Backup gegen viele Formen von Datenverlust."},
{"id": "r13", "chapter": "raid", "type": "multi", "text": "Welche Aussagen zu RAID 6 sind richtig?", "options": ["Es nutzt doppelte Parität", "Mindestens vier Platten sind nötig", "Zwei Platten dürfen ausfallen", "Bei vier 4-TB-Platten sind etwa 8 TB nutzbar"], "answer": [0, 1, 2, 3], "hint": "RAID 6 = zwei Paritätsinformationen.", "explanation": "RAID 6 bietet höhere Ausfallsicherheit als RAID 5 durch doppelte Parität."},
{"id": "bk11", "chapter": "backup", "type": "single", "text": "Warum ist ein immutable Backup gegen Ransomware hilfreich?", "options": ["Weil es für eine Zeit nicht verändert oder gelöscht werden kann", "Weil es Passwörter errät", "Weil es RAID 0 ersetzt", "Weil es keine Daten enthält"], "answer": [0], "hint": "Ransomware versucht oft, Backups mitzuverschlüsseln.", "explanation": "Immutable Backups erschweren das Überschreiben oder Löschen durch Angreifer."},
{"id": "bk12", "chapter": "backup", "type": "single", "text": "Was ist der Vorteil eines Offline-Backups?", "options": ["Es ist nicht dauerhaft über das Netzwerk angreifbar", "Es ist immer schneller als RAM", "Es macht Datenschutz überflüssig", "Es braucht nie Restore-Tests"], "answer": [0], "hint": "Nicht verbunden = schwerer erreichbar.", "explanation": "Ein getrenntes Backup ist besser gegen Ransomware und Angriffe aus dem Netz geschützt."},
{"id": "bk13", "chapter": "backup", "type": "multi", "text": "Welche Kombination passt besonders gut zur 3-2-1-1-0-Regel?", "options": ["Produktivdaten plus zwei Backup-Kopien", "Unterschiedliche Speichermedien", "Eine Kopie außer Haus", "Restore-Tests ohne Fehler"], "answer": [0, 1, 2, 3], "hint": "Die Zahlen stehen für Kopien, Medien, Offsite, Offline/Immutable und Fehlerfreiheit.", "explanation": "Die Regel kombiniert mehrere Schutzideen gegen Ausfall, Diebstahl, Brand, Ransomware und fehlerhafte Sicherungen."},
{"id": "k09", "chapter": "krypto", "type": "single", "text": "Was sind Rainbow Tables?", "options": ["Vorberechnete Tabellen mit Hashwerten häufiger Passwörter", "Eine Art RAID-Parität", "Ein Backup-Zeitplan", "Ein Datenschutzformular"], "answer": [0], "hint": "Der Begriff hängt mit Hashes und Passwortangriffen zusammen.", "explanation": "Rainbow Tables helfen Angreifern, Hashwerte schneller bekannten Passwörtern zuzuordnen."},
{"id": "k10", "chapter": "krypto", "type": "single", "text": "Warum macht ein Salt Rainbow Tables deutlich weniger nützlich?", "options": ["Weil gleiche Passwörter durch unterschiedliche Salts unterschiedliche Hashwerte bekommen", "Weil Salt Daten automatisch löscht", "Weil Salt RAID 6 einschaltet", "Weil Salt den Server abschließt"], "answer": [0], "hint": "Gleiches Passwort, anderer Zusatz.", "explanation": "Durch den Salt müsste der Angreifer für viele Salts neue Tabellen berechnen."},
{"id": "k11", "chapter": "krypto", "type": "single", "text": "Was ist der Unterschied zwischen Pseudonymisierung und Anonymisierung?", "options": ["Pseudonymisierte Daten können mit Zusatzwissen wieder zugeordnet werden, anonymisierte nicht mehr sinnvoll", "Beides ist exakt dasselbe", "Anonymisierung bedeutet immer Verschlüsselung mit AES", "Pseudonymisierung ist ein RAID-Level"], "answer": [0], "hint": "Bei Pseudonymen gibt es noch einen Schlüssel/Zusatzinformation.", "explanation": "Pseudonymisierung reduziert den Personenbezug, beseitigt ihn aber nicht vollständig."},
{"id": "ex01", "chapter": "abschluss", "type": "multi", "text": "Situation: Eine Kanzlei führt eine neue Cloud-Aktenablage ein. Welche Punkte müssen vor Einführung mindestens betrachtet werden?", "options": ["Rechtsgrundlage und Zweck der Verarbeitung", "Auftragsverarbeitung/Vertrag mit Anbieter", "TOM wie Verschlüsselung, Rechtekonzept und Backup", "Schutzbedarf und Risiken für Mandantendaten"], "answer": [0, 1, 2, 3], "hint": "Kombiniere Datenschutz, TOM, Schutzbedarf und Risikoanalyse.", "explanation": "Bei Cloud-Aktenablage sind rechtliche, technische, organisatorische und risikobezogene Punkte gleichzeitig relevant."},
{"id": "ex02", "chapter": "abschluss", "type": "single", "text": "Ein Server verarbeitet normale Daten und zusätzlich besonders vertrauliche Mandantendaten. Welches Prinzip erklärt, warum der Server insgesamt höher bewertet wird?", "options": ["Maximumprinzip", "Datenminimierung", "RAID 0", "Speicherbegrenzung"], "answer": [0], "hint": "Der höchste Schutzbedarf zieht das Zielobjekt hoch.", "explanation": "Nach dem Maximumprinzip übernimmt das Zielobjekt den höchsten Schutzbedarf seiner Anwendungen/Informationen."},
{"id": "ex03", "chapter": "abschluss", "type": "multi", "text": "Situation: Ein Mitarbeiter verschickt versehentlich eine Mandantenakte an die falsche E-Mail-Adresse. Welche Reaktionen sind sinnvoll?", "options": ["Vorfall intern melden und dokumentieren", "Risiko für Betroffene bewerten", "Künftige Übertragungskontrolle verbessern", "Prüfen, ob eine Meldung/Benachrichtigung erforderlich ist"], "answer": [0, 1, 2, 3], "hint": "Datenpanne + TOM verbessern.", "explanation": "Eine solche Datenschutzverletzung muss bewertet, dokumentiert und durch bessere Maßnahmen verhindert werden."},
{"id": "ex04", "chapter": "abschluss", "type": "single", "text": "Warum ist RAID 1/5/6 allein kein ausreichendes Datensicherungskonzept für eine Kanzlei?", "options": ["RAID schützt nur begrenzt vor Hardwareausfall, aber nicht zuverlässig vor Löschung, Ransomware oder Brand", "RAID ist immer illegal", "RAID speichert keine Daten", "RAID verhindert Datenschutz"], "answer": [0], "hint": "RAID ist Redundanz, Backup ist Sicherung.", "explanation": "RAID erhöht Verfügbarkeit, ersetzt aber keine historischen und getrennten Backups."},
{"id": "ex05", "chapter": "abschluss", "type": "single", "text": "Eine Anwendung fällt aus und dadurch stehen viele eigentlich unkritische Einzelprozesse gleichzeitig still. Welcher Effekt kann den Schutzbedarf erhöhen?", "options": ["Kumulationseffekt", "Verteilungseffekt", "Zweckbindung", "Einwilligung"], "answer": [0], "hint": "Mehrere kleine Auswirkungen addieren sich.", "explanation": "Beim Kumulationseffekt ergibt sich aus der Summe mehrerer Ausfälle ein höherer Schaden."},
{"id": "ex06", "chapter": "abschluss", "type": "multi", "text": "Welche Informationen brauchst du für eine gute Strukturanalyse der Kanzlei?", "options": ["Geschäftsprozesse und verarbeitete Informationen", "Anwendungen und deren Benutzer/Verantwortliche", "IT-Systeme mit Standort und Administrator", "Netzplan und Räume wie Serverraum"], "answer": [0, 1, 2, 3], "hint": "Erst Struktur erfassen, dann Schutzbedarf ableiten.", "explanation": "Strukturanalyse umfasst Prozesse, Anwendungen, IT-Systeme, Verbindungen und räumliche Gegebenheiten."},
{"id": "ex07", "chapter": "abschluss", "type": "single", "text": "Ein Notebook mit Mandantendaten wird mobil genutzt. Welche Kombination passt am besten?", "options": ["Festplattenverschlüsselung, starke Anmeldung/MFA, Backup und klare mobile Nutzungsregeln", "RAID 0 ohne Passwort", "Nur Papierzettel im Laptopfach", "Gar keine Maßnahme, weil mobil praktisch ist"], "answer": [0], "hint": "Mobile Nutzung erhöht Verlust- und Diebstahlrisiko.", "explanation": "Mobile Geräte brauchen technische und organisatorische Zusatzmaßnahmen."},
{"id": "ex08", "chapter": "abschluss", "type": "single", "text": "Wann ist eine zusätzliche Risikoanalyse besonders angezeigt?", "options": ["Wenn ein Zielobjekt hohen oder sehr hohen Schutzbedarf hat", "Wenn das Gerät neu lackiert wurde", "Wenn die Website einen Dark Mode hat", "Wenn keine Daten verarbeitet werden"], "answer": [0], "hint": "Besonderer Schutzbedarf verlangt genauere Betrachtung.", "explanation": "Hoher/sehr hoher Schutzbedarf ist einer der zentralen Auslöser für zusätzliche Risikoanalyse."},
{"id": "ex09", "chapter": "abschluss", "type": "multi", "text": "Welche Aussagen zu Art. 32 DSGVO und TOM sind richtig?", "options": ["Maßnahmen müssen dem Risiko angemessen sein", "Verschlüsselung und Pseudonymisierung können geeignete Maßnahmen sein", "Wiederherstellbarkeit kann eine Rolle spielen", "Wirksamkeit der Maßnahmen sollte regelmäßig überprüft werden"], "answer": [0, 1, 2, 3], "hint": "Art. 32 verbindet Risiko, TOM und Überprüfung.", "explanation": "Art. 32 verlangt geeignete Maßnahmen mit angemessenem Schutzniveau und regelmäßiger Prüfung."},
{"id": "ex10", "chapter": "abschluss", "type": "single", "text": "Ein Backup wird täglich erstellt, aber nie zurückgespielt getestet. Was ist die beste Bewertung?", "options": ["Das Konzept ist unsicher, weil Wiederherstellbarkeit nicht nachgewiesen ist", "Perfekt, Tests sind unnötig", "RAID 0 macht den Test überflüssig", "Datenschutz gilt nicht"], "answer": [0], "hint": "Backup ohne Restore-Test ist nur Hoffnung.", "explanation": "Die Fähigkeit zur Wiederherstellung muss praktisch geprüft werden."},
{"id": "ex11", "chapter": "abschluss", "type": "single", "text": "Welche Reihenfolge passt am besten zur Schutzbedarfsvererbung?", "options": ["Prozesse/Informationen → Anwendungen → IT-Systeme/Räume/Verbindungen", "Farben → Monitore → Pflanzen → Drucker", "RAID → Salt → Einwilligung → Zweckbindung", "Backup → DSGVO wird unwichtig"], "answer": [0], "hint": "Die Bedeutung kommt aus den Geschäftsprozessen.", "explanation": "Schutzbedarf entsteht bei Prozessen/Informationen und vererbt sich auf unterstützende Zielobjekte."},
{"id": "ex12", "chapter": "abschluss", "type": "multi", "text": "Ein externer IT-Dienstleister wartet den Kanzleiserver. Welche Maßnahmen sind sinnvoll?", "options": ["Vertragliche Regelungen und Vertraulichkeit", "Berechtigungen begrenzen und protokollieren", "Auftragsverarbeitung prüfen, falls personenbezogene Daten verarbeitet werden", "Zugriffe nur nach Bedarf und kontrolliert erlauben"], "answer": [0, 1, 2, 3], "hint": "Dienstleisterzugriff betrifft Recht, TOM und Protokollierung.", "explanation": "Externe Zugriffe brauchen rechtliche, organisatorische und technische Absicherung."},
{"id": "ex13", "chapter": "abschluss", "type": "single", "text": "Welche Maßnahme ist vor allem organisatorisch?", "options": ["Dienstanweisung zum Umgang mit offenen Akten und Clean-Desk-Regel", "Festplattenverschlüsselung", "Firewall-Regel", "USB-Port technisch deaktivieren"], "answer": [0], "hint": "Regel/Ablauf statt technische Erzwingung.", "explanation": "Eine Dienstanweisung regelt Verhalten und Abläufe, ist also organisatorisch."},
{"id": "ex14", "chapter": "abschluss", "type": "single", "text": "Was beschreibt 'Need-to-know' am besten?", "options": ["Mitarbeitende erhalten nur Zugriff auf Daten, die sie für ihre Aufgabe brauchen", "Alle bekommen Zugriff auf alles", "Daten werden nie gelöscht", "Backups sind öffentlich"], "answer": [0], "hint": "Nur wissen dürfen, was für die Aufgabe nötig ist.", "explanation": "Need-to-know reduziert unbefugte Kenntnisnahme und unterstützt Vertraulichkeit."},
{"id": "ex15", "chapter": "abschluss", "type": "multi", "text": "Welche Punkte gehören in einen Realisierungsplan für neue Backup-Maßnahmen?", "options": ["Maßnahme und betroffene Anforderung", "Termin", "Budget", "Verantwortliche Person/Abteilung"], "answer": [0, 1, 2, 3], "hint": "Ein Plan braucht Inhalt, Zeit, Kosten und Zuständigkeit.", "explanation": "Ein Realisierungsplan macht Umsetzung steuerbar und nachweisbar."},
{"id": "ex16", "chapter": "abschluss", "type": "single", "text": "Ein Sicherheitsvorfall zeigt, dass MFA fehlt. Was passt zum PDCA-Zyklus?", "options": ["Check erkennt Problem, Act leitet Verbesserung wie MFA-Einführung ein", "Plan bedeutet alles ignorieren", "Do bedeutet nie prüfen", "Act bedeutet Backup löschen"], "answer": [0], "hint": "Prüfen und verbessern.", "explanation": "PDCA verlangt nach Erkenntnissen aus Kontrollen oder Vorfällen Verbesserungen."},
{"id": "ex17", "chapter": "abschluss", "type": "single", "text": "Ein Prozess ist teilweise umgesetzt, aber nicht systematisch dokumentiert. Welcher Reifegrad passt nach dem Beispiel?", "options": ["2", "5", "0", "3"], "answer": [0], "hint": "Teilweise umgesetzt, Dokumentation fehlt.", "explanation": "Reifegrad 2 steht im Beispiel für teilweise Umsetzung ohne systematische Dokumentation."},
{"id": "ex18", "chapter": "abschluss", "type": "multi", "text": "Welche Kombination spricht für hohen Schutzbedarf bei Verfügbarkeit eines E-Mail-Systems in der Kanzlei?", "options": ["Fristenkommunikation läuft darüber", "Mandantenkommunikation hängt davon ab", "Längerer Ausfall behindert Aufgabenerfüllung stark", "Ausweichverfahren fehlen oder sind schwach"], "answer": [0, 1, 2, 3], "hint": "Wie stark leidet die Kanzleiarbeit bei Ausfall?", "explanation": "Wenn zentrale Arbeitsabläufe stark abhängig sind, kann Verfügbarkeit hoch bewertet werden."},
{"id": "ex19", "chapter": "abschluss", "type": "single", "text": "Welche Aussage zu Salted Hashes ist richtig?", "options": ["Salted Hashes schützen Passwortspeicherung besser gegen vorberechnete Hash-Tabellen", "Salted Hashes sind reversible Verschlüsselung", "Salted Hashes ersetzen Zugriffskontrolle", "Salted Hashes erhöhen RAID-Speicher"], "answer": [0], "hint": "Salt + Hash ist Einweg und gegen Rainbow Tables nützlich.", "explanation": "Salted Hashes erschweren vorberechnete Angriffe, sind aber keine Verschlüsselung."},
{"id": "ex20", "chapter": "abschluss", "type": "single", "text": "Welche Kennzahl zeigt am besten, ob Backups praktisch funktionieren?", "options": ["Anteil erfolgreicher Wiederherstellungstests", "Anzahl schöner Icons", "Anzahl der Drucker im Flur", "Helligkeit des Serverraums"], "answer": [0], "hint": "Funktioniert Wiederherstellung wirklich?", "explanation": "Erfolgreiche Restore-Tests messen direkt die Wirksamkeit des Backup-Prozesses."},
{"id": "ex21", "chapter": "abschluss", "type": "multi", "text": "Situation: Der Serverraum liegt unter wasserführenden Leitungen. Welche Maßnahmen/Entscheidungen sind sinnvoll?", "options": ["Risiko erkennen und bewerten", "Bauliche Änderung prüfen", "Ersatzmaßnahmen wie Wassermelder/Ableitblech erwägen", "Entscheidung und Restrisiko dokumentieren"], "answer": [0, 1, 2, 3], "hint": "Umsetzungsplanung + Risikoentscheidung.", "explanation": "Wenn Idealmaßnahmen schwierig sind, müssen Ersatzmaßnahmen und Restrisiken nachvollziehbar geplant werden."},
{"id": "ex22", "chapter": "abschluss", "type": "single", "text": "Was ist der Unterschied zwischen Datenschutz und Datensicherheit in einem Satz?", "options": ["Datenschutz schützt Personenrechte bei personenbezogenen Daten, Datensicherheit schützt Daten/Systeme allgemein", "Datenschutz ist immer RAID, Datensicherheit ist immer Einwilligung", "Beides bedeutet nur Dark Mode", "Datenschutz gilt nur für Drucker"], "answer": [0], "hint": "Person hinter den Daten vs. Daten selbst.", "explanation": "Datenschutz und Datensicherheit überschneiden sich, haben aber unterschiedliche Schwerpunkte."},
{"id": "ex23", "chapter": "abschluss", "type": "single", "text": "Welche Antwort zeigt eine echte Schutzbedarfsbegründung?", "options": ["Vertraulichkeit hoch, weil Mandantenakten sensible personenbezogene und rechtlich geschützte Informationen enthalten", "Verfügbarkeit hoch, weil der Server schwarz ist", "Integrität normal, weil die Maus funktioniert", "Vertraulichkeit egal, weil Backups existieren"], "answer": [0], "hint": "Eine Begründung muss auf Schaden und Schutzziel eingehen.", "explanation": "Eine nachvollziehbare Schutzbedarfsfeststellung nennt Schutzziel, Bewertung und konkreten Schaden."},
{"id": "ex24", "chapter": "abschluss", "type": "multi", "text": "Welche Dinge verbessern die Wiederherstellbarkeit nach einem technischen Zwischenfall?", "options": ["Getestete Backups", "Dokumentierter Wiederanlaufplan", "Redundante Systeme, wenn passend", "Klare Verantwortlichkeiten im Notfall"], "answer": [0, 1, 2, 3], "hint": "Technik und Organisation zusammen.", "explanation": "Wiederherstellbarkeit braucht Sicherungen, Tests, Pläne, Rollen und ggf. Redundanz."},
{"id": "ex25", "chapter": "abschluss", "type": "single", "text": "Warum soll die Abschlussprüfung erst nach allen Kapiteln freigeschaltet werden?", "options": ["Weil sie schwere Mischfragen nutzt und Vorwissen aus allen Kapiteln voraussetzt", "Weil LocalStorage sonst nicht funktioniert", "Weil DSGVO es verbietet", "Weil Fragen nicht zufällig gemischt werden können"], "answer": [0], "hint": "Die Prüfung kombiniert alle Themen.", "explanation": "Die Abschlussprüfung fragt vernetzt ab und setzt voraus, dass alle Kapitel einmal bearbeitet wurden."}];

const defaultState = () => ({
  version: APP_VERSION,
  theme: "light",
  known: {},
  mastery: {},
  completedChapters: {},
  quiz: null
});

let state = loadState();
const app = document.getElementById("app");
const chapterById = Object.fromEntries(chapters.map(c => [c.id, c]));
const qById = Object.fromEntries(questions.map(q => [q.id, q]));

function loadState(){
  try{
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if(!saved || saved.version !== APP_VERSION) return defaultState();
    return {...defaultState(), ...saved};
  }catch(_){ return defaultState(); }
}
function persist(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function setTheme(theme){
  state.theme = theme;
  document.body.classList.toggle("dark", theme === "dark");
  document.getElementById("darkToggle").textContent = theme === "dark" ? "☀️ Light" : "🌙 Dark";
  persist();
}
function escapeHtml(str){
  return String(str).replace(/[&<>'"]/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#039;","\"":"&quot;"}[ch]));
}
function arraysEqual(a,b){
  const aa=[...a].sort((x,y)=>x-y), bb=[...b].sort((x,y)=>x-y);
  return aa.length===bb.length && aa.every((v,i)=>v===bb[i]);
}
function shuffledIndexes(length){
  const arr = Array.from({length}, (_, i) => i);
  for(let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function answerOrderForQuestion(q){
  let order = shuffledIndexes(q.options.length);
  // Damit nicht wieder auffällt: Wenn möglich steht an Position 1 keine richtige Antwort.
  // Bei Fragen, bei denen wirklich alle Antworten richtig sind, geht das natürlich nicht.
  const firstIsCorrect = q.answer.includes(order[0]);
  const wrongPos = order.findIndex(originalIndex => !q.answer.includes(originalIndex));
  if(firstIsCorrect && wrongPos > 0){
    [order[0], order[wrongPos]] = [order[wrongPos], order[0]];
  }
  return order;
}
function makeAnswerOrders(qids){
  return Object.fromEntries(qids.map(id => {
    const q = qById[id];
    return [id, q ? answerOrderForQuestion(q) : []];
  }));
}
function getAnswerOrder(q){
  if(!state.quiz.optionOrders) state.quiz.optionOrders = {};
  const saved = state.quiz.optionOrders[q.id];
  if(!Array.isArray(saved) || saved.length !== q.options.length){
    state.quiz.optionOrders[q.id] = answerOrderForQuestion(q);
    persist();
  }
  return state.quiz.optionOrders[q.id];
}
function questionsForChapter(chapterId){ return questions.filter(q => q.chapter === chapterId); }
function questionCount(chapterId){ return questionsForChapter(chapterId).length; }
function termCount(chapterId){ return terms.filter(t => t.chapter === chapterId).length; }
function masteredCount(chapterId){
  return questionsForChapter(chapterId).filter(q => state.mastery[q.id]?.correct).length;
}
function totalMastered(){ return questions.filter(q => state.mastery[q.id]?.correct).length; }
function totalAnswered(){ return Object.keys(state.mastery).length; }
function getQuizQuestions(){ return state.quiz ? state.quiz.qids.map(id => qById[id]).filter(Boolean) : []; }
function regularChapters(){ return chapters.filter(ch => ch.id !== "abschluss"); }
function canStartFinalExam(){ return regularChapters().every(ch => state.completedChapters?.[ch.id]); }
function completedRegularCount(){ return regularChapters().filter(ch => state.completedChapters?.[ch.id]).length; }
function isChapterLocked(chapterId){ return chapterId === "abschluss" && !canStartFinalExam(); }

function renderHome(){
  app.innerHTML = document.getElementById("homeTemplate").innerHTML;
  document.getElementById("openLearnBtn").addEventListener("click", () => renderLearn());
  const resumeBtn = document.getElementById("resumeBtn");
  if(state.quiz && !state.quiz.finished){
    resumeBtn.classList.remove("hidden");
    resumeBtn.textContent = `▶️ ${chapterById[state.quiz.chapterId]?.title || "Quiz"} fortsetzen`;
    resumeBtn.addEventListener("click", () => renderQuiz());
  }

  const statsGrid = document.getElementById("statsGrid");
  statsGrid.innerHTML = `
    <div class="card stat"><strong>${questions.length}</strong><span>Quizfragen gesamt</span></div>
    <div class="card stat"><strong>${terms.length}</strong><span>Lernkarten</span></div>
    <div class="card stat"><strong>${totalMastered()}</strong><span>richtig beantwortete Fragen</span></div>
    <div class="card stat"><strong>${completedRegularCount()}/${regularChapters().length}</strong><span>Kapitel abgeschlossen</span></div>`;

  const chapterGrid = document.getElementById("chapterGrid");
  chapterGrid.innerHTML = chapters.map(ch => {
    const locked = isChapterLocked(ch.id);
    const isFinal = ch.id === "abschluss";
    const progressDone = isFinal ? (canStartFinalExam() ? masteredCount(ch.id) : 0) : masteredCount(ch.id);
    const total = questionCount(ch.id);
    const finalText = locked
      ? `<p><strong>Noch gesperrt:</strong> Erst alle anderen Kapitel einmal beenden. Fertig: ${completedRegularCount()}/${regularChapters().length}</p>`
      : `<p><strong>${progressDone}/${total}</strong> Fragen zuletzt richtig${state.completedChapters?.[ch.id] ? " · Kapitel erledigt" : ""}</p>`;
    return `
    <article class="card chapter-card ${locked ? "locked-chapter" : ""}" style="--primary:${ch.color}">
      <div class="chapter-meta"><span class="chip">${ch.icon} Kapitel</span><span class="chip">${total} Fragen</span><span class="chip">${termCount(ch.id)} Karten</span>${state.completedChapters?.[ch.id] ? '<span class="chip">✓ erledigt</span>' : ''}</div>
      <h3>${escapeHtml(ch.title)}</h3>
      <p>${escapeHtml(ch.short)}</p>
      <div class="progress-wrap" aria-label="Fortschritt"><div class="progress-bar" style="width:${Math.round((progressDone/Math.max(1, total))*100)}%"></div></div>
      ${finalText}
      <div class="chapter-actions">
        <button class="primary" data-start="${ch.id}" ${locked ? "disabled" : ""}>${locked ? "🔒 Gesperrt" : (isFinal ? "Abschlussprüfung starten" : "Quiz starten")}</button>
        <button class="ghost" data-learn="${ch.id}">Lernen</button>
      </div>
    </article>`;
  }).join("");
  chapterGrid.querySelectorAll("[data-start]").forEach(btn => btn.addEventListener("click", () => startQuiz(btn.dataset.start)));
  chapterGrid.querySelectorAll("[data-learn]").forEach(btn => btn.addEventListener("click", () => renderLearn(btn.dataset.learn)));
}

function renderLearn(initialChapter="all"){
  app.innerHTML = `
    <div class="toolbar">
      <div class="toolbar-left">
        <button class="ghost" id="backHome">← Zurück</button>
        <h2 style="margin:0">📚 Lernmodus</h2>
      </div>
      <div class="toolbar-right">
        <span class="chip">Suche nach Begriffen</span>
        <span class="chip">Karten als gelernt markieren</span>
      </div>
    </div>
    <section class="card panel">
      <p>Nutze die Suche für Begriffe wie <span class="kbd">RAID 5</span>, <span class="kbd">TOM</span>, <span class="kbd">Maximumprinzip</span> oder <span class="kbd">Datenschutz</span>.</p>
      <div class="learn-controls">
        <input id="learnSearch" class="search" type="search" placeholder="Begriff suchen..." autocomplete="off" />
        <select id="learnChapter" class="select">
          <option value="all">Alle Kapitel</option>
          ${chapters.map(ch => `<option value="${ch.id}" ${ch.id===initialChapter?"selected":""}>${ch.icon} ${escapeHtml(ch.title)}</option>`).join("")}
        </select>
        <button id="onlyUnknown" class="ghost" data-active="false">Nur ungelernte</button>
      </div>
      <div id="learnGrid" class="learn-grid"></div>
    </section>`;
  document.getElementById("backHome").addEventListener("click", renderHome);
  const search = document.getElementById("learnSearch");
  const select = document.getElementById("learnChapter");
  const onlyUnknown = document.getElementById("onlyUnknown");
  const grid = document.getElementById("learnGrid");
  onlyUnknown.addEventListener("click", () => {
    const active = onlyUnknown.dataset.active !== "true";
    onlyUnknown.dataset.active = String(active);
    onlyUnknown.textContent = active ? "Alle Karten zeigen" : "Nur ungelernte";
    onlyUnknown.className = active ? "secondary" : "ghost";
    update();
  });
  search.addEventListener("input", update);
  select.addEventListener("change", update);
  function update(){
    const q = search.value.trim().toLowerCase();
    const ch = select.value;
    const only = onlyUnknown.dataset.active === "true";
    const filtered = terms.filter(t => {
      const hay = `${t.term} ${t.text} ${t.example} ${t.memory} ${chapterById[t.chapter]?.title}`.toLowerCase();
      return (ch === "all" || t.chapter === ch) && (!q || hay.includes(q)) && (!only || !state.known[cardKey(t)]);
    });
    grid.innerHTML = filtered.length ? filtered.map(t => `
      <article class="card term-card" style="--primary:${chapterById[t.chapter].color}">
        <button class="ghost known-btn ${state.known[cardKey(t)] ? "active" : ""}" data-known="${cardKey(t)}">${state.known[cardKey(t)] ? "✓ gelernt" : "merken"}</button>
        <div class="term-chapter">${chapterById[t.chapter].icon} ${escapeHtml(chapterById[t.chapter].title)}</div>
        <h3>${escapeHtml(t.term)}</h3>
        <p>${escapeHtml(t.text)}</p>
        <p class="example"><strong>Beispiel:</strong> ${escapeHtml(t.example)}</p>
        <p><strong>Merksatz:</strong> ${escapeHtml(t.memory)}</p>
      </article>`).join("") : `<div class="card empty">Keine Lernkarte gefunden. Suche etwas anderes oder ändere den Filter.</div>`;
    grid.querySelectorAll("[data-known]").forEach(btn => btn.addEventListener("click", () => {
      const key = btn.dataset.known;
      state.known[key] = !state.known[key];
      if(!state.known[key]) delete state.known[key];
      persist();
      update();
    }));
  }
  update();
}
function cardKey(t){ return `${t.chapter}:${t.term}`; }

function startQuiz(chapterId){
  if(isChapterLocked(chapterId)){
    alert(`Die Abschlusskapitelprüfung wird freigeschaltet, wenn du alle anderen Kapitel einmal beendet hast. Fertig: ${completedRegularCount()}/${regularChapters().length}`);
    return;
  }
  if(state.quiz && !state.quiz.finished){
    const ok = confirm("Es gibt noch einen gespeicherten Quizstand. Neues Quiz starten und alten Stand ersetzen?");
    if(!ok) return;
  }
  const qids = questionsForChapter(chapterId).map(q => q.id);
  state.quiz = { chapterId, qids, current:0, answers:{}, optionOrders: makeAnswerOrders(qids), finished:false, startedAt:new Date().toISOString() };
  persist();
  renderQuiz();
}

function renderQuiz(){
  if(!state.quiz){ renderHome(); return; }
  const qs = getQuizQuestions();
  if(state.quiz.finished){ renderResults(); return; }
  const idx = Math.min(state.quiz.current, qs.length-1);
  state.quiz.current = idx;
  const q = qs[idx];
  const ans = state.quiz.answers[q.id] || {selected:[], checked:false, correct:null, hint:false};
  const optionOrder = getAnswerOrder(q);
  const ch = chapterById[q.chapter];
  const progress = Math.round((idx / qs.length) * 100);
  app.innerHTML = `
    <div class="toolbar">
      <div class="toolbar-left">
        <button class="ghost" id="backHome">← Start</button>
        <span class="chip">${ch.icon} ${escapeHtml(ch.title)}</span>
      </div>
      <div class="toolbar-right"><span class="chip">Speichert automatisch</span></div>
    </div>
    <section class="card quiz-card" style="--primary:${ch.color}">
      <div class="question-top">
        <span>Frage ${idx+1} von ${qs.length}</span>
        <span>${q.type === "multi" ? "Mehrere Antworten möglich" : "Eine Antwort"}</span>
      </div>
      <div class="progress-wrap"><div class="progress-bar" style="width:${progress}%"></div></div>
      ${q.scenario ? `<div class="scenario"><strong>Situation:</strong> ${escapeHtml(q.scenario)}</div>` : ""}
      <h2 class="question-title">${escapeHtml(q.text)}</h2>
     <div class="answer-list">
  ${optionOrder.map(originalIndex=>`
    <label class="answer ${ans.selected.includes(originalIndex) ? "selected" : ""} ${ans.checked ? "locked" : ""}">
      <input 
        type="${q.type === "multi" ? "checkbox" : "radio"}" 
        name="answer" 
        value="${originalIndex}" 
        ${ans.selected.includes(originalIndex) ? "checked" : ""}
        ${ans.checked ? "disabled" : ""}
      >
      <span>${escapeHtml(q.options[originalIndex])}</span>
    </label>`).join("")}
</div>
      <div id="hintArea">${ans.hint ? `<div class="hint-box"><strong>Tipp:</strong> ${escapeHtml(q.hint)}</div>` : ""}</div>
      <div id="feedbackArea">${ans.checked ? feedbackHtml(ans.correct) : ""}</div>
      <div class="quiz-actions">
        <div class="left">
          <button class="ghost" id="prevBtn" ${idx===0?"disabled":""}>← Zurück</button>
          <button class="ghost" id="hintBtn">💡 Tipp</button>
        </div>
        <div class="right">
          <button class="primary" id="nextBtn">${ans.checked ? (idx===qs.length-1 ? "Ergebnis anzeigen" : "Weiter →") : "Antwort bestätigen"}</button>
</div>
      </div>
    </section>`;

  document.getElementById("backHome").addEventListener("click", renderHome);
  document.getElementById("prevBtn").addEventListener("click", () => { state.quiz.current--; persist(); renderQuiz(); });
  document.getElementById("hintBtn").addEventListener("click", () => {
    const a = ensureAnswer(q.id); a.hint = true; persist(); renderQuiz();
  });
  document.querySelectorAll("input[name='answer']").forEach(input => input.addEventListener("change", () => {
    const selected = Array.from(document.querySelectorAll("input[name='answer']:checked")).map(el => Number(el.value));
    const a = ensureAnswer(q.id);
    a.selected = selected;
    a.checked = false;
    a.correct = null;
    persist();
    document.querySelectorAll(".answer").forEach(label => {
      const inp = label.querySelector("input");
      label.classList.toggle("selected", inp.checked);
    });
    document.getElementById("feedbackArea").innerHTML = "";
  }));
  document.getElementById("nextBtn").addEventListener("click", () => nextQuestion(qs));
}

function ensureAnswer(qid){
  if(!state.quiz.answers[qid]) state.quiz.answers[qid] = {selected:[], checked:false, correct:null, hint:false};
  return state.quiz.answers[qid];
}
function feedbackHtml(correct){
  return `<div class="feedback-box ${correct ? "good" : "bad"}"><strong>${correct ? "Richtig!" : "Nicht ganz / falsch."}</strong> Die ausführliche Lösung mit Erklärung siehst du am Ende.</div>`;
}
function checkCurrentAnswer(q){
  const a = ensureAnswer(q.id);
  if(!a.selected.length){ alert("Bitte wähle zuerst eine Antwort aus."); return; }
  a.correct = arraysEqual(a.selected, q.answer);
  a.checked = true;
  state.mastery[q.id] = { correct:a.correct, attempts:(state.mastery[q.id]?.attempts || 0) + 1, last:new Date().toISOString() };
  persist();
  renderQuiz();
}
function nextQuestion(qs){
  const q = qs[state.quiz.current];
  const a = ensureAnswer(q.id);

  if(!a.checked){
    checkCurrentAnswer(q);
    return;
  }

  if(state.quiz.current >= qs.length-1){
    state.quiz.finished = true;
    persist();
    renderResults();
  } else {
    state.quiz.current++;
    persist();
    renderQuiz();
  }
}

function renderResults(){
  const qs = getQuizQuestions();
  if(state.quiz?.chapterId && state.quiz.chapterId !== "abschluss"){
    if(!state.completedChapters) state.completedChapters = {};
    state.completedChapters[state.quiz.chapterId] = true;
    persist();
  }
  const correct = qs.filter(q => state.quiz.answers[q.id]?.correct).length;
  const percent = Math.round((correct / qs.length) * 100);
  const ch = chapterById[state.quiz.chapterId];
  app.innerHTML = `
    <section class="card result-hero" style="--primary:${ch.color}">
      <p class="eyebrow">${ch.icon} ${escapeHtml(ch.title)}</p>
      <h2>Quiz beendet</h2>
      <div class="score">${correct}/${qs.length}</div>
      <p>${percent}% richtig. Unten findest du alle Lösungen mit kurzen Erklärungen.</p>
      <div class="chapter-actions" style="max-width:680px">
        <button class="primary" id="restartSame">Nochmal dieses Kapitel</button>
        <button class="ghost" id="learnThis">Im Lernmodus wiederholen</button>
        <button class="secondary" id="homeAfter">Zur Startseite</button>
      </div>
    </section>
    <section class="solution-list">
      ${qs.map((q,i)=>solutionHtml(q,i)).join("")}
    </section>`;
  document.getElementById("restartSame").addEventListener("click", () => startQuiz(state.quiz.chapterId));
  document.getElementById("learnThis").addEventListener("click", () => renderLearn(state.quiz.chapterId));
  document.getElementById("homeAfter").addEventListener("click", () => { state.quiz = null; persist(); renderHome(); });
}
function solutionHtml(q,i){
  const a = state.quiz.answers[q.id] || {selected:[]};
  const good = !!a.correct;
  const your = a.selected.length ? a.selected.map(n => q.options[n]).join("; ") : "keine Antwort";
  const correct = q.answer.map(n => q.options[n]).join("; ");
  return `<article class="card solution ${good ? "good" : "bad"}">
    <span class="chip">Frage ${i+1}</span> <span class="chip">${chapterById[q.chapter].icon} ${escapeHtml(chapterById[q.chapter].title)}</span>
    <h3>${escapeHtml(q.text)}</h3>
    <p class="your"><strong>Deine Antwort:</strong> ${escapeHtml(your)}</p>
    <p class="correct-answer"><strong>Richtige Lösung:</strong> ${escapeHtml(correct)}</p>
    <p><strong>Erklärung:</strong> ${escapeHtml(q.explanation)}</p>
  </article>`;
}

function resetStorage(){
  const ok = confirm("Willst du wirklich den kompletten lokalen Speicherstand löschen? Fortschritt, Lernkarten und Quizstand gehen verloren.");
  if(!ok) return;
  localStorage.removeItem(STORAGE_KEY);
  state = defaultState();
  setTheme("light");
  renderHome();
}

document.getElementById("homeBtn").addEventListener("click", renderHome);
document.getElementById("darkToggle").addEventListener("click", () => setTheme(state.theme === "dark" ? "light" : "dark"));
document.getElementById("resetStorageBtn").addEventListener("click", resetStorage);
setTheme(state.theme);
renderHome();
