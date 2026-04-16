'use strict';

/**
 * script.js – SpellingSecurity
 *
 * Modules (in volgorde van definitie):
 *   Utils          – kleine hulpfuncties
 *   Particle       – enkelvoudig deeltje voor explosie-effecten
 *   ParticleSystem – beheert alle deeltjes
 *   NetworkGrid    – scrollend netwerk-grid met data-pakketten
 *   Projectile     – kogel van speler naar vijand
 *   Enemy          – één vijand met zijn woord
 *   EnemySystem    – spawn, lock-on, input routing
 *   InputHandler   – toetsenbord (fysiek)
 *   MobileKeyboard – aanraaktoetsenbord
 *   HUD            – score / levens / level HTML-overlay
 *   ScreenManager  – start- en game-over schermen
 *   Game           – game loop, coördinatie van alles
 */

/* ============================================================
   Utils
   ============================================================ */

function isMobileDevice() {
  return (
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    navigator.maxTouchPoints > 1
  );
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function safeLocalStorage(key, value) {
  try {
    if (value === undefined) return localStorage.getItem(key);
    localStorage.setItem(key, value);
  } catch (_) {
    // Private browsing – stilletjes mislukken
  }
  return null;
}

/** Teken een afgeronde rechthoek (polyfill voor oudere browsers) */
function roundRect(ctx, x, y, w, h, r) {
  if (ctx.roundRect) {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
  } else {
    const rx = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rx, y);
    ctx.lineTo(x + w - rx, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + rx);
    ctx.lineTo(x + w, y + h - rx);
    ctx.quadraticCurveTo(x + w, y + h, x + w - rx, y + h);
    ctx.lineTo(x + rx, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - rx);
    ctx.lineTo(x, y + rx);
    ctx.quadraticCurveTo(x, y, x + rx, y);
    ctx.closePath();
  }
}

/* ============================================================
   Particle
   ============================================================ */

class Particle {
  /**
   * @param {number} x
   * @param {number} y
   * @param {string} color  CSS-kleur
   */
  constructor(x, y, color) {
    this.x     = x;
    this.y     = y;
    this.vx    = (Math.random() - 0.5) * 5;
    this.vy    = (Math.random() - 0.5) * 5 - 1.5;
    this.r     = Math.random() * 3 + 1;
    this.color = color;
    this.life  = 1;
    this.decay = Math.random() * 0.025 + 0.018;
  }

  update() {
    this.x    += this.vx;
    this.y    += this.vy;
    this.vy   += 0.06;     // zwaartekracht
    this.life -= this.decay;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.life);
    ctx.fillStyle   = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  get dead() { return this.life <= 0; }
}

/* ============================================================
   ParticleSystem
   ============================================================ */

class ParticleSystem {
  constructor() { this.list = []; }

  /** Laat een explosie los op (x, y) met de opgegeven kleur. */
  explode(x, y, color, count = 16) {
    const max = 300;
    const add = Math.min(count, max - this.list.length);
    for (let i = 0; i < add; i++) this.list.push(new Particle(x, y, color));
  }

  update() {
    for (let i = this.list.length - 1; i >= 0; i--) {
      this.list[i].update();
      if (this.list[i].dead) this.list.splice(i, 1);
    }
  }

  draw(ctx) { this.list.forEach(p => p.draw(ctx)); }

  clear() { this.list = []; }
}

/* ============================================================
   NetworkGrid  – scrollend netwerk-grid met data-pakketten
   ============================================================ */

class NetworkGrid {
  /**
   * @param {number} w  Canvas breedte
   * @param {number} h  Canvas hoogte
   */
  constructor(w, h) {
    this.w        = w;
    this.h        = h;
    this.cellSize = 55;
    this.offset   = 0;
    this.packets  = Array.from({ length: 20 }, () => this._make(true));
  }

  _make(randomY = false) {
    const cols = Math.ceil(this.w / this.cellSize);
    return {
      x:     Math.floor(Math.random() * (cols + 1)) * this.cellSize,
      y:     randomY ? Math.random() * this.h : -4,
      speed: Math.random() * 30 + 12,
      alpha: Math.random() * 0.45 + 0.1,
      r:     Math.random() * 1.5 + 0.5
    };
  }

  update(dt) {
    this.offset = (this.offset + 18 * dt) % this.cellSize;
    this.packets.forEach(p => {
      p.y += p.speed * dt;
      if (p.y > this.h + 4) Object.assign(p, this._make());
    });
  }

  draw(ctx) {
    const { w, h, cellSize, offset } = this;
    ctx.save();
    ctx.lineWidth = 1;

    // Horizontale grid-lijnen (scrollen mee)
    ctx.strokeStyle = 'rgba(0,255,65,0.05)';
    for (let y = -cellSize + offset; y < h + cellSize; y += cellSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Verticale grid-lijnen (statisch)
    for (let x = 0; x <= w; x += cellSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }

    // Data-pakketten stromen naar beneden langs de gridlijnen
    this.packets.forEach(p => {
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle   = '#00ff41';
      ctx.shadowBlur  = 5;
      ctx.shadowColor = '#00ff41';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.restore();
  }
}

/* ============================================================
   Projectile  (kogel-animatie van speler naar vijand)
   ============================================================ */

class Projectile {
  /**
   * @param {number} sx      Start x
   * @param {number} sy      Start y
   * @param {number} tx      Doel x
   * @param {number} ty      Doel y
   * @param {Enemy|null} target  Optioneel: vijand om te volgen (homing)
   */
  constructor(sx, sy, tx, ty, target = null) {
    this.x      = sx;
    this.y      = sy;
    this.tx     = tx;
    this.ty     = ty;
    this.target = target;
    const dx    = tx - sx;
    const dy    = ty - sy;
    const len   = Math.hypot(dx, dy) || 1;
    const spd   = 650;
    this.vx     = (dx / len) * spd;
    this.vy     = (dy / len) * spd;
    this.done   = false;
  }

  update(dt) {
    // Homing: herbereken richting naar de bewegende vijand
    if (this.target) {
      const dx  = this.target.x - this.x;
      const dy  = this.target.y - this.y;
      const len = Math.hypot(dx, dy) || 1;
      if (len < 10) { this.done = true; return; }
      this.vx = (dx / len) * 650;
      this.vy = (dy / len) * 650;
    }
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    // Fallback voor kogels zonder target
    if (!this.target &&
        this.vx * (this.tx - this.x) + this.vy * (this.ty - this.y) <= 0) {
      this.done = true;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.strokeStyle = '#00ff41';
    ctx.lineWidth   = 2.5;
    ctx.shadowBlur  = 10;
    ctx.shadowColor = '#00ff41';
    // Staart: kleine terugwaartse lijn
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.vx * 0.032, this.y - this.vy * 0.032);
    ctx.stroke();
    ctx.restore();
  }
}

/* ============================================================
   Enemy
   ============================================================ */

class Enemy {
  /**
   * @param {string} word      Het te typen woord
   * @param {number} x         Horizontale startpositie
   * @param {number} speed     Pixels per seconde
   */
  constructor(word, x, speed) {
    this.word    = word;
    this.x       = x;
    this.y       = 30;        // begint net buiten zichtbare ruimte
    this.speed   = speed;
    this.typed   = '';        // al getypte letters
    this.locked  = false;     // speler is op deze vijand gelocked
    this.dying   = false;     // kogel is onderweg, nog niet vernietigd
    this.pulse   = 0;         // fase voor lock-puls animatie

    // Afmetingen op basis van woordlengte
    this.w = word.length * 14 + 44;
    this.h = 44;
  }

  get remaining() { return this.word.slice(this.typed.length); }
  get complete()  { return this.typed.length === this.word.length; }

  /**
   * Probeer de volgende letter. Geeft true terug als het klopt.
   * @param {string} char
   */
  tryLetter(char) {
    const next = this.remaining[0];
    if (next && next.toLowerCase() === char.toLowerCase()) {
      this.typed += next;
      return true;
    }
    return false;
  }

  update(dt) {
    this.y      += this.speed * dt;
    this.pulse  += dt;
  }

  /**
   * @param {number} bottomY  Grens waaronder het als 'off-screen' geldt
   */
  isOffScreen(bottomY) { return this.y + this.h / 2 > bottomY; }

  draw(ctx, virusImg) {
    const { x, y, w, h } = this;

    ctx.save();
    if (this.dying) ctx.globalAlpha = 0.45;

    // Gloed / omlijning
    if (this.locked) {
      const p      = Math.sin(this.pulse * 9) * 0.35 + 0.65;
      ctx.shadowBlur  = 18;
      ctx.shadowColor = `rgba(255,200,0,${p})`;
      ctx.strokeStyle = `rgba(255,200,0,${p})`;
      ctx.lineWidth   = 2;
    } else {
      ctx.shadowBlur  = 10;
      ctx.shadowColor = 'rgba(255,60,60,0.55)';
      ctx.strokeStyle = 'rgba(220,50,50,0.8)';
      ctx.lineWidth   = 1.5;
    }

    // Achtergrond balk
    ctx.fillStyle = this.locked
      ? 'rgba(35,25,0,0.88)'
      : 'rgba(25,0,0,0.88)';
    roundRect(ctx, x - w / 2, y - h / 2, w, h, 5);
    ctx.fill();
    ctx.stroke();

    // Virus icoon (PNG)
    const sx       = x - w / 2 + 16;
    const iconSize = 30;
    const col      = this.locked ? '#ffcc00' : '#ff2244';
    ctx.shadowBlur  = 10;
    ctx.shadowColor = col;
    if (virusImg && virusImg.complete && virusImg.naturalWidth > 0) {
      ctx.drawImage(virusImg, sx - iconSize / 2, y - iconSize / 2, iconSize, iconSize);
    } else {
      // Fallback hexagon zolang afbeelding laadt
      const vr = 8;
      ctx.fillStyle = col;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3 - Math.PI / 6;
        i === 0
          ? ctx.moveTo(sx + Math.cos(a) * vr, y + Math.sin(a) * vr)
          : ctx.lineTo(sx + Math.cos(a) * vr, y + Math.sin(a) * vr);
      }
      ctx.closePath();
      ctx.fill();
    }

    // Woord tekst
    ctx.shadowBlur = 0;
    ctx.font       = 'bold 17px "Courier New", Courier, monospace';
    ctx.textAlign  = 'left';
    ctx.textBaseline = 'middle';

    const textX = x - w / 2 + 33;

    // Al getypte letters (groen)
    ctx.fillStyle = '#44ee88';
    ctx.fillText(this.typed, textX, y);

    // Resterende letters
    const typedW = ctx.measureText(this.typed).width;
    ctx.fillStyle = this.locked ? '#ffdd44' : '#e8e8e8';
    ctx.fillText(this.remaining, textX + typedW, y);

    ctx.restore();
  }
}

/* ============================================================
   EnemySystem
   ============================================================ */

class EnemySystem {
  /** @param {object} wordList  Verwijzing naar WordList uit data/words.js */
  constructor(wordList) {
    this.wordList   = wordList;
    this.enemies    = [];
    this.locked     = null;   // huidig gelockte vijand
    this.spawnTimer = 0;
  }

  reset() {
    this.enemies    = [];
    this.locked     = null;
    this.spawnTimer = 0;
  }

  /** Spawn één nieuwe vijand. */
  spawnOne(canvasW, level, speedFn) {
    const pool  = this.wordList.getWordsForLevel(level);
    const used  = new Set(this.enemies.map(e => e.word));
    const avail = pool.filter(w => !used.has(w));
    const word  = randomFrom(avail.length ? avail : pool);

    const margin = 70;
    const x      = randomInt(margin, canvasW - margin);
    const speed  = speedFn
      ? speedFn(level)
      : 28 + level * 6 + Math.random() * 12;

    this.enemies.push(new Enemy(word, x, speed));
  }

  /**
   * Verwerk één getypt karakter.
   * @returns {{ type: 'kill'|'hit'|'miss'|'lock'|'none', enemy?: Enemy }}
   */
  handleInput(char) {
    // Locked enemy: doorgaan met typen
    if (this.locked) {
      const ok = this.locked.tryLetter(char);
      if (!ok)                  return { type: 'miss' };
      if (this.locked.complete) return { type: 'kill', enemy: this.locked };
      return { type: 'hit' };
    }

    // Probeer een nieuwe vijand te locken op eerste letter
    for (const e of this.enemies) {
      if (e.remaining[0]?.toLowerCase() === char.toLowerCase()) {
        this.locked     = e;
        e.locked        = true;
        e.tryLetter(char);
        if (e.complete) return { type: 'kill', enemy: e };
        return { type: 'lock', enemy: e };
      }
    }

    return { type: 'none' };
  }

  /** Verwijder de vernietegde vijand en reset de lock. */
  remove(enemy) {
    if (this.locked === enemy) this.locked = null;
    this.enemies = this.enemies.filter(e => e !== enemy);
  }

  /** Markeer vijand als geraakt: geef lock vrij zodat speler verder kan typen. */
  markDying(enemy) {
    if (this.locked === enemy) this.locked = null;
    enemy.dying = true;
  }

  /**
   * Update alle vijanden; spawn nieuwe; return aantal dat de bodem bereikte.
   * @param {number} dt
   * @param {number} canvasW
   * @param {number} bottomY      Grens waaronder vijanden als verloren gelden
   * @param {number} level
   * @param {number} spawnInterval  Seconden tussen spawns
   * @returns {number}  Aantal vijanden dat de bodem bereikte (= levens verlies)
   */
  update(dt, canvasW, bottomY, level, spawnInterval, speedFn) {
    this.enemies.forEach(e => e.update(dt));

    // Spawn
    this.spawnTimer += dt;
    if (this.spawnTimer >= spawnInterval) {
      this.spawnTimer = 0;
      this.spawnOne(canvasW, level, speedFn);
    }

    // Vijanden die de bodem bereikten
    let lost = 0;
    this.enemies = this.enemies.filter(e => {
      if (e.isOffScreen(bottomY)) {
        if (this.locked === e) this.locked = null;
        if (!e.dying) lost++;   // al geraakte vijanden kosten geen leven
        return false;
      }
      return true;
    });

    return lost;
  }

  draw(ctx, virusImg) { this.enemies.forEach(e => e.draw(ctx, virusImg)); }
}

/* ============================================================
   Leaderboard  –  Firebase Realtime Database koppeling
   ============================================================ */

class Leaderboard {
  constructor() {
    this._ref = null;
    this._ok  = false;
    try {
      if (typeof firebase !== 'undefined' &&
          typeof FIREBASE_CONFIG !== 'undefined' &&
          !FIREBASE_CONFIG.apiKey.startsWith('JOUW_')) {
        if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
        this._ref = firebase.database().ref('leaderboard');
        this._ok  = true;
      }
    } catch (e) {
      console.warn('Leaderboard niet beschikbaar:', e.message);
    }
  }

  get available() { return this._ok; }

  /** Sla een score op en geef de gegenereerde key terug. */
  async save(name, score, difficulty) {
    if (!this._ok) return null;
    const entry = {
      name:       _escHtml(name.trim().slice(0, 16)) || 'Anoniem',
      score,
      difficulty: difficulty || 'normaal',
      ts:         Date.now()
    };
    const ref = await this._ref.push(entry);
    return ref.key;
  }

  /** Haal de top-n scores op (hoogste eerst). */
  async getTop(n = 10) {
    if (!this._ok) return [];
    const snap = await this._ref
      .orderByChild('score')
      .limitToLast(n)
      .once('value');
    const rows = [];
    snap.forEach(child => rows.push({ key: child.key, ...child.val() }));
    return rows.reverse();
  }
}

/** Kleine HTML-escape helper (voorkomt XSS via namen). */
function _escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ============================================================
   InputHandler  (fysiek toetsenbord)
   ============================================================ */

class InputHandler {
  /** @param {function(string): void} onChar */
  constructor(onChar) {
    this._onChar = onChar;
    this._handler = (e) => {
      if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
        e.preventDefault();
        this._onChar(e.key.toLowerCase());
      }
    };
    document.addEventListener('keydown', this._handler);
  }

  destroy() { document.removeEventListener('keydown', this._handler); }
}

/* ============================================================
   MobileKeyboard  (aanraaktoetsenbord)
   ============================================================ */

class MobileKeyboard {
  /**
   * @param {HTMLElement}            container
   * @param {function(string): void} onChar
   */
  constructor(container, onChar) {
    this.container = container;
    this.onChar    = onChar;
    this.rows      = [
      ['q','w','e','r','t','y','u','i','o','p'],
      ['a','s','d','f','g','h','j','k','l'],
      ['z','x','c','v','b','n','m']
    ];
    this._build();
  }

  _build() {
    this.container.innerHTML = '';
    this.rows.forEach(letters => {
      const row = document.createElement('div');
      row.className = 'kb-row';

      letters.forEach(key => {
        const btn = document.createElement('button');
        btn.className   = 'kb-key';
        btn.textContent = key.toUpperCase();
        btn.type        = 'button';
        btn.dataset.key = key;

        const fire = (e) => {
          e.preventDefault();
          btn.classList.add('pressed');
          this.onChar(key);
          setTimeout(() => btn.classList.remove('pressed'), 120);
        };

        btn.addEventListener('touchstart', fire, { passive: false });
        btn.addEventListener('mousedown',  fire);
        row.appendChild(btn);
      });

      this.container.appendChild(row);
    });
  }

  show() { this.container.classList.remove('hidden'); }
  hide() { this.container.classList.add('hidden'); }
}

/* ============================================================
   HUD
   ============================================================ */

class HUD {
  constructor() {
    this.el      = document.getElementById('hud');
    this.scoreEl = document.getElementById('score');
    this.levelEl = document.getElementById('level');
    this.hearts  = Array.from(
      document.querySelectorAll('#lives-display .life')
    );
  }

  show() { this.el.classList.remove('hidden'); }
  hide() { this.el.classList.add('hidden'); }

  /**
   * @param {number} score
   * @param {number} lives
   * @param {number} level
   */
  update(score, lives, level) {
    this.scoreEl.textContent = score;
    this.levelEl.textContent = level;
    this.hearts.forEach((h, i) =>
      h.classList.toggle('lost', i >= lives)
    );
  }
}

/* ============================================================
   ScreenManager
   ============================================================ */

class ScreenManager {
  constructor() {
    this.startEl      = document.getElementById('start-screen');
    this.gameoverEl   = document.getElementById('gameover-screen');
    this.finalScoreEl = document.getElementById('final-score');
    this.highScoreEl  = document.getElementById('high-score-display');
  }

  showStart()   {
    this.startEl.classList.remove('hidden');
    this.gameoverEl.classList.add('hidden');
  }

  showGameOver(score, highScore) {
    this.finalScoreEl.textContent = score;
    this.highScoreEl.textContent  = highScore;
    this.gameoverEl.classList.remove('hidden');
    this.startEl.classList.add('hidden');
  }

  hideAll() {
    this.startEl.classList.add('hidden');
    this.gameoverEl.classList.add('hidden');
  }
}

/* ============================================================
   Game  –  centrale coördinatie
   ============================================================ */

const State = Object.freeze({
  IDLE:     'idle',
  PLAYING:  'playing',
  PAUSED:   'paused',
  GAMEOVER: 'gameover'
});

/** Drempelwaarden voor level-up (score) */
const LEVEL_THRESHOLDS = [0, 150, 400, 900, 1800, 3500, 6000];

/**
 * Moeilijkheidsgraad-instellingen.
 * spawnBase      – starttijd tussen spawns (seconden)
 * spawnMin       – minimale spawn-interval bij hoge levels
 * spawnDecay     – verlaging per level
 * speedBase      – basissnelheid vijanden (px/s)
 * speedPerLevel  – extra snelheid per level
 * speedRand      – willekeurige extra snelheid
 */
const DIFFICULTY_CONFIG = {
  makkelijk: { spawnBase: 4.2, spawnMin: 1.6, spawnDecay: 0.22, speedBase: 16, speedPerLevel: 3, speedRand: 7  },
  normaal:   { spawnBase: 3.0, spawnMin: 1.0, spawnDecay: 0.20, speedBase: 22, speedPerLevel: 5, speedRand: 10 },
  moeilijk:  { spawnBase: 2.4, spawnMin: 0.75,spawnDecay: 0.20, speedBase: 28, speedPerLevel: 6, speedRand: 12 }
};

class Game {
  constructor() {
    this.canvas   = document.getElementById('game-canvas');
    this.ctx      = this.canvas.getContext('2d');

    this.state    = State.IDLE;
    this.score    = 0;
    this.lives    = 3;
    this.level    = 1;
    this.highScore = parseInt(safeLocalStorage('typgame_hs') || '0', 10);

    // Assets vooraf laden
    this._playerImg        = new Image();
    this._playerImg.src    = 'assets/player.png';
    this._playerImgSize    = 80;

    this._virusImg         = new Image();
    this._virusImg.src     = 'assets/virus.png';

    // Leaderboard
    this.leaderboard   = new Leaderboard();
    this._lastSavedKey = null;   // Firebase key van de meest recent opgeslagen score

    // Sub-systemen
    this.particles   = new ParticleSystem();
    this.enemySys    = new EnemySystem(WordList);
    this.networkGrid = null;
    this.hud         = new HUD();
    this.screens     = new ScreenManager();
    this.inputHandler = null;
    this.mobileKb    = null;
    this.projectiles = [];

    // Toetsenbord-voorkeur (persistent via localStorage)
    const savedKb      = safeLocalStorage('typgame_kb');
    this._kbVisible    = savedKb !== null ? savedKb === 'true' : false;

    // Moeilijkheid (persistent via localStorage)
    const savedDiff    = safeLocalStorage('typgame_diff');
    this._difficulty   = (savedDiff && DIFFICULTY_CONFIG[savedDiff]) ? savedDiff : 'normaal';
    this.spawnInterval = DIFFICULTY_CONFIG[this._difficulty].spawnBase;

    // Visuele effecten
    this._flashAlpha  = 0;    // rood flash bij leven verlies
    this._levelUpTime = 0;    // timer voor "LEVEL X!" bericht

    // Tijdsbeheer
    this._lastTime   = 0;
    this._surviveSec = 0;     // passieve score teller

    this._init();
  }

  // ── Initialisatie ──────────────────────────────────────

  _init() {
    this._resize();
    window.addEventListener('resize', () => this._resize());

    // Mobiel toetsenbord altijd bouwen; zichtbaarheid via CSS
    const kbEl    = document.getElementById('mobile-keyboard');
    this.mobileKb = new MobileKeyboard(kbEl, c => this._onInput(c));

    // Schermknoppen
    document.getElementById('start-btn')
      .addEventListener('click', () => this._startGame());
    document.getElementById('restart-btn')
      .addEventListener('click', () => this._startGame());

    // Game-over: naam opslaan / overslaan
    document.getElementById('save-score-btn')
      .addEventListener('click', () => this._onSaveScore());
    document.getElementById('skip-score-btn')
      .addEventListener('click', () => this._openLeaderboard(null));
    document.getElementById('player-name-input')
      .addEventListener('keydown', e => { if (e.key === 'Enter') this._onSaveScore(); });
    document.getElementById('menu-from-go-btn')
      .addEventListener('click', () => this._goToStart());

    // Ranglijst-modal vanuit startscherm
    document.getElementById('open-lb-btn')
      .addEventListener('click', () => this._openLeaderboardModal());
    document.getElementById('lb-modal-close')
      .addEventListener('click', () => {
        document.getElementById('lb-modal').classList.add('hidden');
      });

    document.getElementById('kb-toggle-btn')
      .addEventListener('click', () => {
        this._kbVisible = !this._kbVisible;
        safeLocalStorage('typgame_kb', this._kbVisible);
        this._applyKbVisibility();
        this._updateKbToggle();
      });

    document.getElementById('pause-btn')
      .addEventListener('click', () => this._togglePause());

    document.getElementById('resume-btn')
      .addEventListener('click', () => this._togglePause());

    document.getElementById('quit-btn')
      .addEventListener('click', () => this._goToStart());

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' &&
          (this.state === State.PLAYING || this.state === State.PAUSED)) {
        this._togglePause();
      }
    });

    this._updateKbToggle();
    this._initDifficultySelector();
    this._initCategorySelector();

    this.screens.showStart();

    // Idle animatie (sterrenhemel + schip)
    this._drawIdle();
  }

  _resize() {
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.networkGrid   = new NetworkGrid(this.canvas.width, this.canvas.height);
  }

  // ── Spel starten / resetten ────────────────────────────

  _startGame() {
    const cfg          = DIFFICULTY_CONFIG[this._difficulty];
    this.score         = 0;
    this.lives         = 3;
    this.level         = 1;
    this.spawnInterval = cfg.spawnBase;
    this.projectiles   = [];
    this._flashAlpha   = 0;
    this._levelUpTime  = 0;
    this._surviveSec   = 0;
    this.state         = State.PLAYING;

    this.particles.clear();
    this.enemySys.reset();

    this.screens.hideAll();
    this.hud.show();
    this.hud.update(this.score, this.lives, this.level);
    this._updateDiffDisplay();

    this._applyKbVisibility();
    document.getElementById('pause-btn').textContent = '⏸';
    document.getElementById('pause-btn').classList.remove('paused');

    if (this.inputHandler) this.inputHandler.destroy();
    this.inputHandler = new InputHandler(c => this._onInput(c));

    // Meteen een eerste vijand spawnen
    const startCfg   = DIFFICULTY_CONFIG[this._difficulty];
    const startSpeed = (lvl) =>
      startCfg.speedBase + lvl * startCfg.speedPerLevel + Math.random() * startCfg.speedRand;
    this.enemySys.spawnOne(this.canvas.width, this.level, startSpeed);

    this._lastTime = performance.now();
    requestAnimationFrame(t => this._loop(t));
  }

  // ── Pauze ──────────────────────────────────────────────

  _togglePause() {
    const pauseEl = document.getElementById('pause-screen');
    if (this.state === State.PLAYING) {
      this.state = State.PAUSED;
      document.getElementById('pause-btn').textContent = '▶';
      document.getElementById('pause-btn').classList.add('paused');
      pauseEl.classList.remove('hidden');
    } else if (this.state === State.PAUSED) {
      this.state = State.PLAYING;
      document.getElementById('pause-btn').textContent = '⏸';
      document.getElementById('pause-btn').classList.remove('paused');
      pauseEl.classList.add('hidden');
      this._lastTime = performance.now();
      requestAnimationFrame(t => this._loop(t));
    }
  }

  /** Sluit het spel en gaat terug naar het startscherm. */
  _goToStart() {
    this.state = State.IDLE;

    // Sluit pauze-overlay
    document.getElementById('pause-screen').classList.add('hidden');
    document.getElementById('pause-btn').textContent = '⏸';
    document.getElementById('pause-btn').classList.remove('paused');

    // Verwijder input
    if (this.inputHandler) {
      this.inputHandler.destroy();
      this.inputHandler = null;
    }

    // Verberg HUD en toetsenbord
    this.hud.hide();
    this.mobileKb.hide();

    // Reset spelobjecten
    this.projectiles = [];
    this.particles.clear();
    this.enemySys.reset();

    // Toon startscherm
    this.screens.showStart();
    this._drawIdle();
  }

  // ── Moeilijkheidsgraad-selector ───────────────────────

  _initDifficultySelector() {
    const btns = document.querySelectorAll('.diff-btn');
    if (!btns.length) return;

    // Zet de opgeslagen keuze actief
    btns.forEach(btn => {
      btn.classList.toggle('diff-selected', btn.dataset.diff === this._difficulty);
      btn.addEventListener('click', () => {
        this._difficulty = btn.dataset.diff;
        safeLocalStorage('typgame_diff', this._difficulty);
        btns.forEach(b => b.classList.toggle('diff-selected', b === btn));
      });
    });
  }

  /** Ververs de moeilijkheidsgraad-badge in de HUD. */
  _updateDiffDisplay() {
    const el = document.getElementById('diff-display');
    if (!el) return;
    const labels = { makkelijk: 'MAKKELIJK', normaal: 'NORMAAL', moeilijk: 'MOEILIJK' };
    el.textContent = labels[this._difficulty] || this._difficulty.toUpperCase();
    el.className   = `diff-${this._difficulty}`;
  }

  // ── Categorie-selector ────────────────────────────────

  _initCategorySelector() {
    const grid = document.getElementById('category-grid');
    if (!grid) return;

    const saved    = this._loadCatSelection();
    const allNames = WordList.getCategoryNames();

    allNames.forEach(name => {
      const btn = document.createElement('button');
      btn.type      = 'button';
      btn.className = 'cat-btn' + (saved.includes(name) ? ' cat-selected' : '');
      btn.textContent = name;
      btn.addEventListener('click', () => {
        btn.classList.toggle('cat-selected');
        this._saveCatSelection();
      });
      grid.appendChild(btn);
    });

    // Alles aan / alles uit knoppen
    document.getElementById('cat-all-btn').addEventListener('click', () => {
      grid.querySelectorAll('.cat-btn').forEach(b => b.classList.add('cat-selected'));
      this._saveCatSelection();
    });
    document.getElementById('cat-none-btn').addEventListener('click', () => {
      grid.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('cat-selected'));
      this._saveCatSelection();
    });
  }

  _loadCatSelection() {
    try {
      const raw = localStorage.getItem('typgame_cats');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (_) {}
    // Standaard: alles geselecteerd
    return WordList.getCategoryNames();
  }

  _saveCatSelection() {
    const selected = [...document.querySelectorAll('#category-grid .cat-btn.cat-selected')]
      .map(b => b.textContent);
    try {
      localStorage.setItem('typgame_cats', JSON.stringify(selected));
    } catch (_) {}
  }

  // ── Toetsenbord zichtbaarheid ──────────────────────────

  _applyKbVisibility() {
    if (this.state !== State.PLAYING) return;
    this._kbVisible ? this.mobileKb.show() : this.mobileKb.hide();
  }

  _updateKbToggle() {
    const btn = document.getElementById('kb-toggle-btn');
    if (btn) btn.classList.toggle('kb-active', this._kbVisible);
  }

  // ── Input ──────────────────────────────────────────────

  _onInput(char) {
    if (this.state !== State.PLAYING) return;

    const result = this.enemySys.handleInput(char);

    if (result.type === 'kill') {
      this._fireAtEnemy(result.enemy);
    }
    // 'miss', 'hit', 'lock', 'none' – geen extra actie nodig
  }

  /** Stap 1: vuur kogel af en markeer vijand als geraakt. */
  _fireAtEnemy(enemy) {
    const { x: px, y: py } = this._playerPos();
    this.projectiles.push(new Projectile(px, py, enemy.x, enemy.y, enemy));
    this.enemySys.markDying(enemy);
  }

  /** Stap 2: kogel heeft vijand geraakt — explosie, score, verwijdering. */
  _killEnemy(enemy) {
    const ex = enemy.x;
    const ey = enemy.y;

    this.particles.explode(ex, ey, '#00ff41', 18);
    this.particles.explode(ex, ey, '#ffcc00', 10);
    this.particles.explode(ex, ey, '#ff2244', 8);

    // Score: woordlengte × 10 × level
    const points = Math.round(enemy.word.length * 10 * this.level);
    this.score  += points;

    this.enemySys.remove(enemy);
    this.hud.update(this.score, this.lives, this.level);
    this._checkLevelUp();
  }

  // ── Level progressie ───────────────────────────────────

  _checkLevelUp() {
    let newLevel = 1;
    for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
      if (this.score >= LEVEL_THRESHOLDS[i]) { newLevel = i + 1; break; }
    }

    if (newLevel !== this.level) {
      this.level = newLevel;
      const cfg  = DIFFICULTY_CONFIG[this._difficulty];
      this.spawnInterval = Math.max(
        cfg.spawnMin,
        cfg.spawnBase - this.level * cfg.spawnDecay
      );
      this.hud.update(this.score, this.lives, this.level);
      this._levelUpTime = 2.2; // seconden zichtbaar
    }
  }

  // ── Levens beheer ──────────────────────────────────────

  _loseLife() {
    this.lives--;
    this.hud.update(this.score, this.lives, this.level);
    this._flashAlpha = 0.55;

    // Impact-effect op het speler-karakter
    const { x: px, y: py } = this._playerPos();
    this.particles.explode(px, py, '#ff2244', 22);
    this.particles.explode(px, py, '#ff8800', 12);

    if (this.lives <= 0) this._gameOver();
  }

  _gameOver() {
    this.state = State.GAMEOVER;

    if (this.score > this.highScore) {
      this.highScore = this.score;
      safeLocalStorage('typgame_hs', this.highScore);
    }

    this.hud.hide();
    this.mobileKb.hide();

    if (this.inputHandler) {
      this.inputHandler.destroy();
      this.inputHandler = null;
    }

    // Vul score in en toon fase 1 (naam invoer)
    document.getElementById('final-score').textContent        = this.score;
    document.getElementById('high-score-display').textContent = this.highScore;
    document.getElementById('go-phase-score').classList.remove('hidden');
    document.getElementById('go-phase-lb').classList.add('hidden');
    document.getElementById('player-name-input').value = '';

    // Naam-invoer verbergen als Firebase niet beschikbaar is
    const nameEntry = document.querySelector('.name-entry');
    if (nameEntry) nameEntry.style.display = this.leaderboard.available ? '' : 'none';

    this.screens.showGameOver(this.score, this.highScore);

    // Autofocus op het naamveld (klein moment wachten op CSS-transitie)
    if (this.leaderboard.available) {
      setTimeout(() => document.getElementById('player-name-input').focus(), 120);
    } else {
      // Geen Firebase: direct ranglijst overslaan
      setTimeout(() => this._openLeaderboard(null), 100);
    }
  }

  /** Verwerkt klik op "Opslaan": valideer naam en open ranglijst. */
  _onSaveScore() {
    const input = document.getElementById('player-name-input');
    const name  = input.value.trim();
    if (!name) { input.focus(); input.classList.add('input-error'); return; }
    input.classList.remove('input-error');
    this._openLeaderboard(name);
  }

  /** Sla score op (optioneel) en toon de ranglijst-fase. */
  async _openLeaderboard(name) {
    // Schakel naar fase 2
    document.getElementById('go-phase-score').classList.add('hidden');
    document.getElementById('go-phase-lb').classList.remove('hidden');

    const statusEl = document.getElementById('lb-status');
    const listEl   = document.getElementById('lb-list');
    listEl.innerHTML = '';
    this._lastSavedKey = null;

    if (!this.leaderboard.available) {
      statusEl.textContent = 'Ranglijst niet beschikbaar (Firebase niet geconfigureerd).';
      return;
    }

    statusEl.textContent = name ? 'Score opslaan…' : 'Ranglijst laden…';

    try {
      if (name) {
        this._lastSavedKey = await this.leaderboard.save(name, this.score, this._difficulty);
      }
      statusEl.textContent = 'Laden…';
      const entries = await this.leaderboard.getTop(10);
      statusEl.textContent = '';
      this._renderLbEntries(listEl, entries, this._lastSavedKey);
    } catch (e) {
      statusEl.textContent = 'Kon de ranglijst niet laden.';
      console.warn(e);
    }
  }

  /** Open de ranglijst-modal vanuit het startscherm. */
  async _openLeaderboardModal() {
    const modal    = document.getElementById('lb-modal');
    const statusEl = document.getElementById('lb-modal-status');
    const listEl   = document.getElementById('lb-modal-list');

    modal.classList.remove('hidden');
    listEl.innerHTML = '';

    if (!this.leaderboard.available) {
      statusEl.textContent = 'Ranglijst niet beschikbaar (Firebase niet geconfigureerd).';
      return;
    }

    statusEl.textContent = 'Laden…';
    try {
      const entries = await this.leaderboard.getTop(10);
      statusEl.textContent = '';
      this._renderLbEntries(listEl, entries, null);
    } catch (e) {
      statusEl.textContent = 'Kon de ranglijst niet laden.';
    }
  }

  /** Zet een array van leaderboard-entries om naar <li>-elementen. */
  _renderLbEntries(listEl, entries, highlightKey) {
    const diffLabel = { makkelijk: 'EASY', normaal: 'MID', moeilijk: 'HARD' };
    if (!entries.length) {
      const li = document.createElement('li');
      li.className   = 'lb-entry';
      li.textContent = 'Nog geen scores — speel als eerste!';
      li.style.gridColumn = '1/-1';
      li.style.textAlign  = 'center';
      li.style.color      = 'rgba(0,255,65,0.3)';
      listEl.appendChild(li);
      return;
    }
    entries.forEach((e, i) => {
      const li = document.createElement('li');
      li.className = 'lb-entry' + (e.key === highlightKey ? ' lb-me' : '');
      li.innerHTML = `
        <span class="lb-rank">${i + 1}</span>
        <span class="lb-name">${_escHtml(e.name)}</span>
        <span class="lb-score">${e.score}</span>
        <span class="lb-diff">${diffLabel[e.difficulty] || ''}</span>
      `;
      listEl.appendChild(li);
    });
  }

  // ── Game loop ──────────────────────────────────────────

  _loop(timestamp) {
    if (this.state !== State.PLAYING) return;

    const dt      = Math.min((timestamp - this._lastTime) / 1000, 0.1);
    this._lastTime = timestamp;

    this._update(dt);
    this._draw();

    requestAnimationFrame(t => this._loop(t));
  }

  _update(dt) {
    this.networkGrid.update(dt);

    // Ondergrens = positie van het speler-karakter
    const { y: bottomY } = this._playerPos();

    const cfg      = DIFFICULTY_CONFIG[this._difficulty];
    const speedFn  = (lvl) =>
      cfg.speedBase + lvl * cfg.speedPerLevel + Math.random() * cfg.speedRand;

    const livesLost = this.enemySys.update(
      dt, this.canvas.width, bottomY, this.level, this.spawnInterval, speedFn
    );
    for (let i = 0; i < livesLost; i++) {
      this._loseLife();
      if (this.state !== State.PLAYING) return;
    }

    this.particles.update();

    this.projectiles = this.projectiles.filter(p => {
      p.update(dt);
      if (p.done) {
        if (p.target) this._killEnemy(p.target);
        return false;
      }
      return true;
    });

    if (this._flashAlpha > 0)  this._flashAlpha  = Math.max(0, this._flashAlpha  - dt * 2.5);
    if (this._levelUpTime > 0) this._levelUpTime = Math.max(0, this._levelUpTime - dt);

    // Passieve overlevingsscore (1 pt/sec × level)
    this._surviveSec += dt;
    if (this._surviveSec >= 1) {
      this._surviveSec -= 1;
      this.score += this.level;
      this.hud.update(this.score, this.lives, this.level);
      this._checkLevelUp();
    }
  }

  // ── Tekenen ────────────────────────────────────────────

  _draw() {
    const ctx             = this.ctx;
    const W               = this.canvas.width;
    const H               = this.canvas.height;
    const { x: plX, y: plY } = this._playerPos();

    // Achtergrond
    ctx.fillStyle = '#000d00';
    ctx.fillRect(0, 0, W, H);

    this.networkGrid.draw(ctx);

    // Doelaanduiding: stippellijn naar gelockte vijand
    const locked = this.enemySys.locked;
    if (locked) {
      ctx.save();
      ctx.setLineDash([5, 7]);
      ctx.strokeStyle = 'rgba(0,255,65,0.25)';
      ctx.lineWidth   = 1;
      ctx.beginPath();
      ctx.moveTo(plX, plY);
      ctx.lineTo(locked.x, locked.y);
      ctx.stroke();
      ctx.restore();
    }

    this.enemySys.draw(ctx, this._virusImg);
    this.projectiles.forEach(p => p.draw(ctx));
    this.particles.draw(ctx);

    // Speler
    this._drawPlayer(plX, plY);

    // Rode flash bij leven verlies
    if (this._flashAlpha > 0) {
      ctx.save();
      ctx.globalAlpha = this._flashAlpha * 0.42;
      ctx.fillStyle   = '#ff0000';
      ctx.fillRect(0, 0, W, H);
      ctx.restore();
    }

    // "LEVEL X!" bericht
    if (this._levelUpTime > 0) {
      const alpha = Math.min(1, this._levelUpTime * 1.5);
      ctx.save();
      ctx.globalAlpha  = alpha;
      ctx.fillStyle    = '#ffdd00';
      ctx.font         = `bold ${Math.round(W / 18)}px "Courier New", Courier, monospace`;
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowBlur   = 25;
      ctx.shadowColor  = '#ffdd00';
      ctx.fillText(`THREAT LEVEL ${this.level}!`, W / 2, H / 2);
      ctx.restore();
    }
  }

  /** Geeft de positie van de speler terug (keyboard-aware). */
  _playerPos() {
    const kbH = this._kbVisible ? 168 : 0;
    return {
      x: this.canvas.width  / 2,
      y: this.canvas.height - kbH - 40
    };
  }

  /**
   * Teken het speler-karakter op (x, y).
   * @param {number} x
   * @param {number} y
   */
  _drawPlayer(x, y) {
    const ctx  = this.ctx;
    const size = this._playerImgSize;
    ctx.save();

    if (this._playerImg.complete && this._playerImg.naturalWidth > 0) {
      // Groene glow rondom het karakter
      ctx.shadowBlur  = 18;
      ctx.shadowColor = '#00ff41';
      ctx.drawImage(
        this._playerImg,
        x - size / 2,
        y - size / 2,
        size,
        size
      );
    } else {
      // Fallback zolang de afbeelding nog laadt
      ctx.fillStyle   = '#00ff41';
      ctx.shadowBlur  = 16;
      ctx.shadowColor = '#00ff41';
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  /** Teken netwerk-grid + schild in het idle/startscherm. */
  _drawIdle() {
    if (!this.networkGrid) return;
    const ctx = this.ctx;
    const W   = this.canvas.width;
    const H   = this.canvas.height;
    ctx.fillStyle = '#000d00';
    ctx.fillRect(0, 0, W, H);
    this.networkGrid.draw(ctx);
    const { x: idleX, y: idleY } = this._playerPos();
    this._drawPlayer(idleX, idleY);
  }
}

/* ============================================================
   Bootstrap
   ============================================================ */

window.addEventListener('DOMContentLoaded', () => {
  window.game = new Game();
});
