# Kom igång med hemsidan – Brf Stationen 1 i Hässelby Strand

Det här dokumentet gör att du kan ändra föreningens hemsida genom att skriva vanliga meningar
till en AI-assistent på din egen dator. Du behöver inte kunna programmering. Installationen
tar ungefär fem minuter och görs bara en gång.

> **Viktigt:** dokumentet innehåller föreningens nycklar (två långa koder). Skicka det inte vidare
> utanför styrelsen och lägg det inte på hemsidan. Om det kommer på avvägar, säg till
> <<KONTAKTPERSON>> så byter vi nycklar.

---

## Steg 1 – Installera AI-assistenten (en gång)

Vi använder **Claude Code**. Andra terminalbaserade AI-verktyg fungerar också, se längst ned.

**Mac:** öppna programmet *Terminal* (tryck ⌘ + mellanslag, skriv `Terminal`, tryck Enter).
Klistra in raden nedan och tryck Enter. Vänta tills det står klart.

```
curl -fsSL https://claude.ai/install.sh | bash
```

**Windows:** öppna *PowerShell* (Start-menyn, skriv `PowerShell`). Klistra in raden och tryck Enter.

```
irm https://claude.ai/install.ps1 | iex
```

Stäng terminalfönstret och öppna det igen när installationen är klar.

## Steg 2 – Starta assistenten med föreningens nyckel

Klistra in raden för ditt system och tryck Enter. Svara **ja** om du får frågan om att använda
API-nyckeln.

**Mac:**
```
ANTHROPIC_API_KEY=<<ANTHROPIC_API_KEY>> claude
```

**Windows:**
```
$env:ANTHROPIC_API_KEY="<<ANTHROPIC_API_KEY>>"; claude
```

Nu är du inne i en chatt med assistenten.

## Steg 3 – Klistra in texten nedan i chatten

Markera allt mellan de två strecken, kopiera, klistra in i chatten och tryck Enter.
Assistenten ställer några frågor (ditt namn, ja/nej på några steg). Svara på svenska.

---

Du hjälper en styrelsemedlem i Brf Stationen 1 i Hässelby Strand att sätta upp hemsidans
redigeringsmiljö på den här datorn. Personen är inte tekniker. Prata svenska, förklara kort och
enkelt, och fråga om lov innan varje steg som installerar något eller skapar filer.

Uppgifter:
- Hemsidans kodförråd (repo): <<REPO_URL>>
- GitHub-token för föreningen: <<GITHUB_TOKEN>>
- Anthropic API-nyckel för föreningen: <<ANTHROPIC_API_KEY>>

Gör följande, i ordning:

1. Kontrollera att `git` finns på datorn. Om det saknas: hjälp personen installera det
   (på Mac räcker det oftast att köra `git --version` och godkänna installationen av
   kommandoradsverktygen; på Windows används Git for Windows).

2. Klona repot till mappen `~/brf-hemsida` (på Windows: `%USERPROFILE%\brf-hemsida`) med
   token i adressen, så att inga inloggningar behövs:
   `git clone https://x-access-token:<<GITHUB_TOKEN>>@<<REPO_HOST_PATH>> ~/brf-hemsida`
   Om mappen redan finns: hoppa över klonen och kör `git pull` i den istället.

3. Fråga personen om namn och e-postadress. Sätt `git config user.name` och `git config user.email`
   i repot till det, så att det syns vem som gjort varje ändring.

4. Spara API-nyckeln så att den inte behöver skrivas nästa gång. På Mac/Linux: lägg till raden
   `export ANTHROPIC_API_KEY=<<ANTHROPIC_API_KEY>>` sist i `~/.zshrc` (eller `~/.bashrc` om
   det är skalet som används). På Windows: kör `setx ANTHROPIC_API_KEY "<<ANTHROPIC_API_KEY>>"`.

5. Skapa en genväg på skrivbordet som öppnar assistenten i rätt mapp:
   - Mac: filen `~/Desktop/Hemsidan.command` med innehållet
     `#!/bin/zsh` på rad 1 och `cd ~/brf-hemsida && git pull --quiet; claude` på rad 2,
     och gör den körbar med `chmod +x`.
   - Windows: filen `%USERPROFILE%\Desktop\Hemsidan.bat` med innehållet
     `cd /d %USERPROFILE%\brf-hemsida && git pull --quiet & claude`.

6. Läs filen `AGENTS.md` i repot och följ den. Den beskriver hur sidorna är uppbyggda och hur
   ändringar publiceras.

7. Gör ett litet test utan att publicera: visa personen vilken fil startsidans nyheter ligger i,
   så att det blir konkret.

8. Avsluta med att på svenska förklara, i högst tio rader:
   - att man nästa gång dubbelklickar på "Hemsidan" på skrivbordet och skriver vad man vill ändra,
   - tre exempel på saker man kan be om (t.ex. lägga till en nyhet, byta ett telefonnummer,
     lägga upp ett nytt dokument),
   - att ändringen syns på hemsidan ungefär en minut efter att man sagt "publicera",
   - att man kan säga "ångra senaste ändringen" om något blev fel.

---

## Nästa gång

Dubbelklicka på **Hemsidan** på skrivbordet. Skriv vad du vill ändra, till exempel:

- *Lägg till en nyhet på startsidan: städdag lördag 4 oktober kl 10, samling vid garaget.*
- *Byt telefonnumret till hissen på felanmälan-sidan till 08-123 45 67.*
- *Lägg upp den nya årsredovisningen, filen ligger på skrivbordet.*
- *Ta bort nyheten om årsstämman.*

Assistenten visar vad den tänker ändra. Säg **publicera** när du är nöjd. Efter ungefär en minut
syns ändringen på hemsidan. Blev det fel: skriv **ångra senaste ändringen**.

## Om något krånglar

Kontakta <<KONTAKTPERSON>>. Vanligast är att en nyckel har gått ut. Då får du ett nytt dokument,
öppnar assistenten och klistrar in den nya nyckeln så byter den ut den gamla.

## Andra AI-verktyg än Claude

Hemsidan är byggd så att vilket terminalbaserat AI-verktyg som helst som kan köra kommandon och
ändra filer fungerar (t.ex. Codex CLI, Gemini CLI, OpenCode). Installera verktyget enligt dess
egna instruktioner, starta det med den leverantörens API-nyckel, och klistra in samma text som i
steg 3. Byt ut ordet `claude` i genvägen mot verktygets kommando. Verktyget läser `AGENTS.md`
själv.
