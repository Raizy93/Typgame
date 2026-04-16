'use strict';

/**
 * data/words.js – SpellingSecurity
 * Haalt woorden op uit de geselecteerde categorieën (data/categories.js).
 * Categorie-selectie wordt opgeslagen in localStorage ('typgame_cats').
 */

const WordList = (() => {

  /** Laad geselecteerde categorie-namen uit localStorage. */
  function _getSelected() {
    try {
      const raw = localStorage.getItem('typgame_cats');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (_) {}
    return null;   // null = gebruik alles
  }

  /** Verzamel alle woorden uit de geselecteerde categorieën. */
  function _buildPool() {
    const selected = _getSelected();
    const names    = selected || Object.keys(Categories);
    const words    = new Set();
    names.forEach(name => {
      const list = Categories[name];
      if (Array.isArray(list)) list.forEach(w => words.add(w.toLowerCase()));
    });
    // Fallback: als de pool leeg is, pak alles
    if (words.size === 0) {
      Object.values(Categories).forEach(list =>
        list.forEach(w => words.add(w.toLowerCase()))
      );
    }
    return [...words];
  }

  return {
    /**
     * Geeft een woordpool terug passend bij het level.
     * Level 1-2 → korte woorden (≤ 6 letters)
     * Level 3-4 → middellange woorden (≤ 9 letters)
     * Level 5+  → alle woorden
     * @param {number} level
     * @returns {string[]}
     */
    getWordsForLevel(level) {
      const all = _buildPool();
      let pool;
      if (level <= 2) {
        pool = all.filter(w => w.length <= 6);
      } else if (level <= 4) {
        pool = all.filter(w => w.length <= 9);
      } else {
        pool = all;
      }
      // Zorg dat de pool nooit leeg is
      return pool.length >= 5 ? pool : all;
    },

    /** Geeft alle categorie-namen terug. */
    getCategoryNames() {
      return Object.keys(Categories);
    }
  };

})();
