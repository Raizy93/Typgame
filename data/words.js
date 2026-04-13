'use strict';

/**
 * data/words.js
 * Woordenlijsten voor TypGame, gegroepeerd op moeilijkheidsgraad.
 * getWordsForLevel(level) geeft de pool terug die bij een level hoort.
 */
const WordList = (() => {
  const easy = [
    // Nederlands
    'kat', 'hond', 'zon', 'maan', 'boom', 'dag', 'zee', 'vuur', 'wind', 'land',
    'luis', 'bal', 'kar', 'net', 'dak', 'rij', 'pit', 'kop', 'tas', 'lat',
    // Engels (kort)
    'aim', 'dot', 'fly', 'gun', 'hit', 'jet', 'map', 'orb', 'pod', 'ray',
    'arc', 'bug', 'cog', 'dex', 'fog', 'hex', 'ion', 'lag', 'mod', 'nab',
    'fire', 'ship', 'star', 'blue', 'dark', 'fast', 'hero', 'jump', 'nova', 'shot',
    'zap', 'bolt', 'beam', 'core', 'dive', 'edge', 'flux', 'grid', 'hull', 'icon'
  ];

  const medium = [
    // Nederlands
    'planeet', 'raket', 'komeet', 'nebula', 'meteoor', 'schild', 'vijand',
    'kogel', 'kanon', 'sector', 'baan', 'ruimte', 'energie', 'turbo',
    // Engels
    'galaxy', 'rocket', 'cosmos', 'planet', 'shield', 'laser', 'orbit',
    'boost', 'pilot', 'enemy', 'score', 'speed', 'dodge', 'blast', 'spawn',
    'target', 'attack', 'defend', 'arcade', 'pixel', 'cursor', 'sniper',
    'comet', 'debris', 'engine', 'impact', 'jammer', 'keypad', 'module',
    'nexus', 'outrun', 'plasma', 'quasar', 'reboot', 'sector', 'thrust',
    'uplink', 'vector', 'weapon', 'xenon', 'zapper'
  ];

  const hard = [
    // Nederlands
    'asteroide', 'universum', 'snelheid', 'oneindig', 'verkenner',
    'ruimteschip', 'melkwegstelsel', 'commandant',
    // Engels
    'asteroid', 'explorer', 'universe', 'velocity', 'momentum',
    'infinity', 'trajectory', 'spaceship', 'commander', 'destroyer',
    'interceptor', 'vaporize', 'eliminate', 'calculate', 'precision',
    'overdrive', 'hyperdrive', 'blackhole', 'wormhole', 'satellite',
    'combatzone', 'warpspeed', 'cyberstrike', 'killswitch', 'laserbeam',
    'mainframe', 'nanobot', 'overcharge', 'photon', 'quantumdrive'
  ];

  /**
   * Geeft een gemixte woordpool terug passend bij het huidige level.
   * @param {number} level
   * @returns {string[]}
   */
  function getWordsForLevel(level) {
    if (level <= 2) return [...easy, ...medium.slice(0, 10)];
    if (level <= 4) return [...medium, ...easy.slice(0, 10), ...hard.slice(0, 10)];
    return [...medium, ...hard];
  }

  return { easy, medium, hard, getWordsForLevel };
})();
