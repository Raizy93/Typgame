'use strict';

/**
 * script.js – TypGame
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
   * @param {number} sx  Start x
   * @param {number} sy  Start y
   * @param {number} tx  Doel x
   * @param {number} ty  Doel y
   */
  constructor(sx, sy, tx, ty) {
    this.x    = sx;
    this.y    = sy;
    this.tx   = tx;
    this.ty   = ty;
    const dx  = tx - sx;
    const dy  = ty - sy;
    const len = Math.hypot(dx, dy) || 1;
    const spd = 650;
    this.vx   = (dx / len) * spd;
    this.vy   = (dy / len) * spd;
    this.done = false;
  }

  update(dt) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    // Bereikt het doel als de dot-product negatief wordt
    if (this.vx * (this.tx - this.x) + this.vy * (this.ty - this.y) <= 0) {
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
    this.pulse   = 0;         // fase voor lock-puls animatie

    // Afmetingen op basis van woordlengte
    this.w = word.length * 12 + 36;
    this.h = 38;
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
  isOffScreen(bottomY) { return this.y - this.h / 2 > bottomY; }

  draw(ctx) {
    const { x, y, w, h } = this;

    ctx.save();

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

    // Virus icoon (hexagon + spikes)
    const sx  = x - w / 2 + 16;
    const vr  = 8;
    const col = this.locked ? '#ffcc00' : '#ff2244';
    ctx.shadowBlur  = 8;
    ctx.fillStyle   = col;
    ctx.shadowColor = col;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (i * Math.PI) / 3 - Math.PI / 6;
      i === 0
        ? ctx.moveTo(sx + Math.cos(a) * vr, y + Math.sin(a) * vr)
        : ctx.lineTo(sx + Math.cos(a) * vr, y + Math.sin(a) * vr);
    }
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = col;
    ctx.lineWidth   = 1.5;
    [0, Math.PI / 2, Math.PI, -Math.PI / 2].forEach(a => {
      ctx.beginPath();
      ctx.moveTo(sx + Math.cos(a) * vr,       y + Math.sin(a) * vr);
      ctx.lineTo(sx + Math.cos(a) * (vr + 5), y + Math.sin(a) * (vr + 5));
      ctx.stroke();
    });

    // Woord tekst
    ctx.shadowBlur = 0;
    ctx.font       = 'bold 14px "Courier New", Courier, monospace';
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
  spawnOne(canvasW, level) {
    const pool     = this.wordList.getWordsForLevel(level);
    const used     = new Set(this.enemies.map(e => e.word));
    const avail    = pool.filter(w => !used.has(w));
    const word     = randomFrom(avail.length ? avail : pool);

    const margin   = 70;
    const x        = randomInt(margin, canvasW - margin);
    const speed    = 28 + level * 6 + Math.random() * 12;

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

  /**
   * Update alle vijanden; spawn nieuwe; return aantal dat de bodem bereikte.
   * @param {number} dt
   * @param {number} canvasW
   * @param {number} bottomY      Grens waaronder vijanden als verloren gelden
   * @param {number} level
   * @param {number} spawnInterval  Seconden tussen spawns
   * @returns {number}  Aantal vijanden dat de bodem bereikte (= levens verlies)
   */
  update(dt, canvasW, bottomY, level, spawnInterval) {
    this.enemies.forEach(e => e.update(dt));

    // Spawn
    this.spawnTimer += dt;
    if (this.spawnTimer >= spawnInterval) {
      this.spawnTimer = 0;
      this.spawnOne(canvasW, level);
    }

    // Vijanden die de bodem bereikten
    let lost = 0;
    this.enemies = this.enemies.filter(e => {
      if (e.isOffScreen(bottomY)) {
        if (this.locked === e) this.locked = null;
        lost++;
        return false;
      }
      return true;
    });

    return lost;
  }

  draw(ctx) { this.enemies.forEach(e => e.draw(ctx)); }
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
  GAMEOVER: 'gameover'
});

/** Drempelwaarden voor level-up (score) */
const LEVEL_THRESHOLDS = [0, 150, 400, 900, 1800, 3500, 6000];

class Game {
  constructor() {
    this.canvas   = document.getElementById('game-canvas');
    this.ctx      = this.canvas.getContext('2d');

    this.state    = State.IDLE;
    this.score    = 0;
    this.lives    = 3;
    this.level    = 1;
    this.highScore = parseInt(safeLocalStorage('typgame_hs') || '0', 10);

    // Sub-systemen
    this.particles   = new ParticleSystem();
    this.enemySys    = new EnemySystem(WordList);
    this.networkGrid = null;
    this.hud         = new HUD();
    this.screens     = new ScreenManager();
    this.inputHandler = null;
    this.mobileKb    = null;
    this.projectiles = [];

    // Moeilijkheid
    this.spawnInterval = 2.4;  // seconden

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
    this.score         = 0;
    this.lives         = 3;
    this.level         = 1;
    this.spawnInterval = 2.4;
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

    if (isMobileDevice()) {
      this.mobileKb.show();
    } else {
      this.mobileKb.hide();
    }

    if (this.inputHandler) this.inputHandler.destroy();
    this.inputHandler = new InputHandler(c => this._onInput(c));

    // Meteen een eerste vijand spawnen
    this.enemySys.spawnOne(this.canvas.width, this.level);

    this._lastTime = performance.now();
    requestAnimationFrame(t => this._loop(t));
  }

  // ── Input ──────────────────────────────────────────────

  _onInput(char) {
    if (this.state !== State.PLAYING) return;

    const result = this.enemySys.handleInput(char);

    if (result.type === 'kill') {
      this._destroyEnemy(result.enemy);
    }
    // 'miss', 'hit', 'lock', 'none' – geen extra actie nodig
  }

  _destroyEnemy(enemy) {
    const ex = enemy.x;
    const ey = enemy.y;

    // Kogel van speler naar vijand
    const px = this.canvas.width / 2;
    const py = this.canvas.height - 30;
    this.projectiles.push(new Projectile(px, py, ex, ey));

    // Explosie deeltjes
    this.particles.explode(ex, ey, '#00ff41', 18);
    this.particles.explode(ex, ey, '#ffcc00', 10);
    this.particles.explode(ex, ey, '#ff2244', 8);

    // Score: woordlengte × 10 × level, met bonus voor snelle vijanden
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
      this.level         = newLevel;
      this.spawnInterval = Math.max(0.75, 2.4 - this.level * 0.2);
      this.hud.update(this.score, this.lives, this.level);
      this._levelUpTime = 2.2; // seconden zichtbaar
    }
  }

  // ── Levens beheer ──────────────────────────────────────

  _loseLife() {
    this.lives--;
    this.hud.update(this.score, this.lives, this.level);
    this._flashAlpha = 0.55;

    if (this.lives <= 0) this._gameOver();
  }

  _gameOver() {
    this.state = State.GAMEOVER;

    if (this.score > this.highScore) {
      this.highScore = this.score;
      safeLocalStorage('typgame_hs', this.highScore);
    }

    this.hud.hide();
    this.screens.showGameOver(this.score, this.highScore);

    if (this.inputHandler) {
      this.inputHandler.destroy();
      this.inputHandler = null;
    }
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

    // Bepaal ondergrens voor vijanden (rekening houdend met mobiel toetsenbord)
    const kbH    = isMobileDevice() ? 168 : 0;
    const bottomY = this.canvas.height - kbH - 10;

    const livesLost = this.enemySys.update(
      dt, this.canvas.width, bottomY, this.level, this.spawnInterval
    );
    for (let i = 0; i < livesLost; i++) {
      this._loseLife();
      if (this.state !== State.PLAYING) return;
    }

    this.particles.update();

    this.projectiles = this.projectiles.filter(p => { p.update(dt); return !p.done; });

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
    const ctx = this.ctx;
    const W   = this.canvas.width;
    const H   = this.canvas.height;

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
      ctx.moveTo(W / 2, H - 30);
      ctx.lineTo(locked.x, locked.y);
      ctx.stroke();
      ctx.restore();
    }

    this.enemySys.draw(ctx);
    this.projectiles.forEach(p => p.draw(ctx));
    this.particles.draw(ctx);

    // Spelerschip
    this._drawPlayer(W / 2, H - 30);

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

  /**
   * Teken het firewall-schild van de speler.
   * @param {number} x
   * @param {number} y
   */
  _drawPlayer(x, y) {
    const ctx = this.ctx;
    ctx.save();

    // Schild buitenkant
    ctx.fillStyle   = '#00ff41';
    ctx.shadowBlur  = 18;
    ctx.shadowColor = '#00ff41';
    ctx.beginPath();
    ctx.moveTo(x - 14, y - 12);
    ctx.lineTo(x + 14, y - 12);
    ctx.lineTo(x + 14, y + 3);
    ctx.quadraticCurveTo(x + 14, y + 14, x, y + 19);
    ctx.quadraticCurveTo(x - 14, y + 14, x - 14, y + 3);
    ctx.closePath();
    ctx.fill();

    // Schild binnenkant (donkere kern)
    ctx.shadowBlur = 0;
    ctx.fillStyle  = '#000d00';
    ctx.beginPath();
    ctx.moveTo(x - 9,  y - 7);
    ctx.lineTo(x + 9,  y - 7);
    ctx.lineTo(x + 9,  y + 2);
    ctx.quadraticCurveTo(x + 9, y + 9, x, y + 13);
    ctx.quadraticCurveTo(x - 9, y + 9, x - 9, y + 2);
    ctx.closePath();
    ctx.fill();

    // "FW" label in de kern
    ctx.fillStyle    = '#00ff41';
    ctx.shadowBlur   = 4;
    ctx.shadowColor  = '#00ff41';
    ctx.font         = 'bold 7px "Courier New", Courier, monospace';
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('FW', x, y + 2);

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
    this._drawPlayer(W / 2, H - 30);
  }
}

/* ============================================================
   Bootstrap
   ============================================================ */

window.addEventListener('DOMContentLoaded', () => {
  window.game = new Game();
});
