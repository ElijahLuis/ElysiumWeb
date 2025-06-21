# Proposed Enhancements

The following ideas may deepen Elysium's allure and keep the code breathing cleanly:

1. **Watch mode for development** – Add an `npm run dev` script that rebuilds the TypeScript source and restarts the server whenever files change.
2. **Linting rules** – Introduce ESLint alongside Prettier so small mistakes catch the eye before they ship.
3. **Gentle fallback logging** – The helper `loadRealmDetail` currently logs an error when a realm module is missing. Consider downgrading this to a soft warning so tests stay quiet.
4. **Respect reduced motion** – Update `background.js` to disable parallax effects when the user prefers reduced motion.
5. **Custom 404 page** – Serve a short poetic HTML page for missing routes instead of plain text.
