/* LF4 Quiz + Lernmodus – reine Offline-Webseite, Speicherung mit Cookies direkt im Browser */
const APP_VERSION = "lf4-quiz-v3-random-answers";
const STORAGE_KEY = "lf4_quiz_lernmodus_save_v2";

const chapters = [
  { id:"begriffe", icon:"🛡️", title:"Datenschutz & Datensicherheit", short:"Begriffe sauber erklären und unterscheiden.", color:"#4f46e5" },
  { id:"tom", icon:"🏢", title:"Gefahren & TOM", short:"Situationen erkennen und passende technische/organisatorische Maßnahmen nennen.", color:"#0f766e" },
  { id:"struktur", icon:"🧩", title:"Strukturanalyse", short:"Geschäftsprozesse, Anwendungen, IT-Systeme, Netzplan, Räume erfassen.", color:"#b45309" },
  { id:"schutzbedarf", icon:"📊", title:"Schutzbedarfsfeststellung", short:"Schutzziele, Kategorien, Schadensszenarien und Vererbung anwenden.", color:"#be123c" },
  { id:"raid", icon:"💽", title:"RAID-Level", short:"RAID 0, 1, 5, 6, 01, 10, Hot-Spare und nutzbaren Speicher erklären.", color:"#7c3aed" },
  { id:"backup", icon:"🗄️", title:"Datensicherung", short:"Voll-, differentielles und inkrementelles Backup, Generationenprinzip und 3-2-1-1-0.", color:"#2563eb" },
  { id:"krypto", icon:"🔐", title:"Verschlüsselung & Hashing", short:"Symmetrisch, asymmetrisch, AES, RSA, Hash und Salt als Zusatzkapitel.", color:"#c2410c" }
];

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
];

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
];

const defaultState = () => ({
  version: APP_VERSION,
  theme: "light",
  known: {},
  mastery: {},
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
    <div class="card stat"><strong>${totalAnswered()}</strong><span>bereits geübte Fragen</span></div>`;

  const chapterGrid = document.getElementById("chapterGrid");
  chapterGrid.innerHTML = chapters.map(ch => `
    <article class="card chapter-card" style="--primary:${ch.color}">
      <div class="chapter-meta"><span class="chip">${ch.icon} Kapitel</span><span class="chip">${questionCount(ch.id)} Fragen</span><span class="chip">${termCount(ch.id)} Karten</span></div>
      <h3>${escapeHtml(ch.title)}</h3>
      <p>${escapeHtml(ch.short)}</p>
      <div class="progress-wrap" aria-label="Fortschritt"><div class="progress-bar" style="width:${Math.round((masteredCount(ch.id)/Math.max(1, questionCount(ch.id)))*100)}%"></div></div>
      <p><strong>${masteredCount(ch.id)}/${questionCount(ch.id)}</strong> Fragen zuletzt richtig</p>
      <div class="chapter-actions">
        <button class="primary" data-start="${ch.id}">Quiz starten</button>
        <button class="ghost" data-learn="${ch.id}">Lernen</button>
      </div>
    </article>`).join("");
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
