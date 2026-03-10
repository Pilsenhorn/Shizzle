# Shizzle – Official Web

Minimalistický statický web pro českého rapového umělce **Shizzle**.

Cílem projektu je vytvořit rychlý, jednoduchý a snadno udržovatelný web bez backendu.

---

## Live site

## Technologie

Projekt používá pouze statické technologie:

- HTML5
- CSS (custom layout tokens + responsive grid)
- JavaScript
- Instagram Embed API
- GitHub Pages hosting

Žádný backend ani framework není potřeba.

---

## Architektura projektu

Shizzle
│
├ css/
│ styles.css
│
├ js/
│ reels.js
│
├ data/
│ reels.json
│
└ index.html

---

## Instagram feed

Instagram Reels se načítají dynamicky pomocí JSON datového souboru.

### data/reels.json

[
{ "url": "https://www.instagram.com/reel/XXXX/
" }
]

### Princip

1. `reels.js` načte JSON pomocí `fetch`
2. vytvoří HTML embed
3. spustí `window.instgrm.Embeds.process()`

Výsledkem je automatický feed bez potřeby backendu.

---

## Aktualizace Reels

Stačí přidat nový záznam do: data/reels.json

Web automaticky zobrazí posledních 6 videí.

---

## Hosting

Web je hostován pomocí **GitHub Pages**.

Deploy probíhá automaticky po každém pushi do větve: main

---

## Autor

Michal Mikulenka  
Web developer
