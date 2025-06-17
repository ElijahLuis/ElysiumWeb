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
    const chosen = form.querySelector('input[name="realm"]:checked');
    if (!chosen) return;
    const key = chosen.value;
    const name = escapeHTML(realms[key]?.realmName || key);
    result.innerHTML = `You feel the pull of <strong>${name}</strong>.`;
    result.classList.remove('hidden');
    form.classList.add('hidden');
  });
});
