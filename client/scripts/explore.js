// Selects a realm based on the visitor's responses
// Uses names from src/data/realmMetadata.ts

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('explore-form');
  const result = document.getElementById('explore-result');
  if (!form || !result) return;

  // realm names from src/data/realmMetadata.ts
  const realms = {
    abyss: { realmName: 'Abyss' },
    cavern: { realmName: 'Cavern' },
    dross: { realmName: 'Dross' },
    ember: { realmName: 'Ember' },
    glare: { realmName: 'Glare' },
    languish: { realmName: 'Languish' },
    mist: { realmName: 'Mist' },
    oasis: { realmName: 'Oasis' },
    trace: { realmName: 'Trace' },
    zenith: { realmName: 'Zenith' },
  };

  const keys = Object.keys(realms);

  function escapeHTML(str) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return str.replace(/[&<>"']/g, m => map[m]);
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const scores = {};
    keys.forEach(k => (scores[k] = 0));
    const numeric = [];

    form.querySelectorAll('select').forEach(sel => {
      const val = sel.value;
      if (!isNaN(parseInt(val))) {
        numeric.push(parseInt(val, 10));
      } else if (scores[val] !== undefined) {
        scores[val] += 1;
      }
    });

    if (numeric.length) {
      const avg = numeric.reduce((a, b) => a + b, 0) / numeric.length;
      const step = 4 / keys.length;
      const index = Math.min(keys.length - 1, Math.floor((avg - 1) / step));
      scores[keys[index]] += 1;
    }

    const top = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
    const key = top ? top[0] : keys[0];
    const name = escapeHTML(realms[key].realmName);
    result.innerHTML = `You feel the pull of <strong>${name}</strong>.`;
    result.classList.remove('hidden');
    form.classList.add('hidden');
  });
});
