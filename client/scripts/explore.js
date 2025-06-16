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
  const step = 4 / keys.length; // map range 1-5 onto realm indices

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
    const values = Array.from(form.querySelectorAll('select')).map(sel =>
      parseInt(sel.value, 10),
    );
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const index = Math.min(keys.length - 1, Math.floor((avg - 1) / step));
    const key = keys[index];
    const name = escapeHTML(realms[key].realmName);
    result.innerHTML = `You feel the pull of <strong>${name}</strong>.`;
    result.classList.remove('hidden');
    form.classList.add('hidden');
  });
});
