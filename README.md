# Elysium Web

This repository contains the static assets for the Elysium Web project. The `client/` directory holds the HTML, CSS and JavaScript that make up the site.

## Running locally

A small Node server is included to serve the contents of `client/` for development. Run the following commands:

```bash
npm start
```

This will start a server on [http://localhost:3000](http://localhost:3000). No additional dependencies are required.

## Formatting the stars

Beautiful code keeps the universe in harmony. Run the command below before committing changes:

```bash
npm run format
```

This uses Prettier with our project's settings in `.prettierrc` to polish files in `client/`, `server/index.js`, and `test/`.

## Exploring the Universe demo

After logging in you can navigate to the planetary view by clicking **Begin Your Journey**. The page `pages/universe.html` lets you create short posts tied to an emotion. As people react with different emotions, each post will migrate to the planet that best represents the community response.

## License

Elysium Web is shared under the [MIT License](LICENSE).

