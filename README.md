# 🎮 Pokemon Battle

A Pokemon Yellow battle simulator for Android, based on [pokemon-js](https://github.com/PascalPixel/pokemon-js).

## ✨ Features

- Classic Pokemon Yellow battle system
- Pikachu vs Eevee (Red vs Blue)
- Retro pixel art style
- Touch-friendly interface

## 🎯 Current Status

**Working:**
- Basic battle (Tackle, Tail Whip)
- HP bars and damage calculation
- Win/lose conditions
- Battle animations

**Planned Mods:**
- [ ] Status effects (Poison, Burn, Paralysis, Sleep, Freeze)
- [ ] Items (Potions, status healing)
- [ ] Pokemon switching
- [ ] More moves
- [ ] Type effectiveness

## 🏗️ Tech Stack

- **Frontend:** React + jQuery
- **Wrapper:** Capacitor (WebView)
- **Platform:** Android

## 📦 Download

Download the latest APK from [GitHub Actions](https://github.com/8lackR0z3/pokemon-battle/actions):
1. Click the latest successful (green ✓) workflow run
2. Scroll to **Artifacts**
3. Download **pokemon-battle-release**
4. Extract and install the APK

## 🛠️ Building Locally

```bash
# Install dependencies
npm install

# Build web app
npm run build

# Sync to Android
npx cap sync android

# Build APK
cd android && ./gradlew assembleRelease
```

## 📁 Project Structure

```
src/
├── Game.js          # React component (battle UI)
├── pokemon.js       # Game logic (damage, turns, animations)
├── index.js         # Entry point
└── index.css        # Styles (retro Pokemon look)

public/
├── img/             # SVG sprites
└── fonts/           # Pokemon font
```

## 🎮 Controls

| Button | Action |
|--------|--------|
| FIGHT | Select attack |
| PKMN | Switch Pokemon (not implemented) |
| ITEM | Use item (Potion) |
| RUN | Cannot run from trainer battles |

## 📜 Credits

- Original: [PascalPixel/pokemon-js](https://github.com/PascalPixel/pokemon-js)
- Pokemon © Nintendo/Game Freak

---

Made with ❤️ for Pokemon fans
