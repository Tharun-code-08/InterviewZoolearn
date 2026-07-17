# ZooLearn Clone

A pixel- and content-faithful clone of [zoolearn.in](https://zoolearn.in), a visual zoology e-learning platform, built as a React single-page application for an interview assignment. Live demo: https://interviewzoolearn.netlify.app/

All imagery is either sourced from freely-licensed Wikipedia/Wikimedia Commons reference photos or generated locally as deterministic SVG illustrations — the site does not reuse zoolearn.in's own image assets, with the sole exception of the About page's photos of real, named individuals (directors/CEO), which are kept as-is since they depict specific real people.

## Tech Stack

- [React 18](https://react.dev/) + [React Router 6](https://reactrouter.com/) (client-side routed SPA)
- [Vite 5](https://vitejs.dev/) for dev server and bundling
- [lucide-react](https://lucide.dev/) for iconography
- Plain CSS (no framework) — a single consolidated stylesheet at `src/styles/global.css`

## Getting Started

```bash
npm install
npm run dev       # start the dev server (http://localhost:5173)
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

## Project Structure

```
src/
  pages/            One component per route (Home, About, ZooHub, species pages,
                     blog posts, career/scope explorers, taxonomy tree, etc.)
  components/       Shared UI (Layout, Logo, CountUp, ...)
  data/             JSON content: species index, scientists, learning path,
                     deep-dive organisms, and *WikiImages.json maps of real
                     reference photo URLs sourced from Wikipedia/Wikimedia
  utils/
    generatedArt.js Deterministic seeded SVG "marble avatar" generator, used
                     as a fallback wherever no real reference photo is available
  styles/
    global.css      Consolidated site-wide styles (recolored to an
                     indigo/violet palette) plus a UI polish layer
  imageFallback.js  Global <img> error listener that swaps in generated art
                     if a real photo URL ever fails to load
```

## Routes

The app covers ~26 routes, including:

- `/` — Home (hero carousel, legendary scientists, conceptual learning path, deep dive)
- `/about` — About the team
- `/taxonomy-tree`, `/living-world`, `/basic-features-of-classification`, `/kingdom-animalia`
- `/horse-evolution`, `/anatomy`
- `/career-path`, `/career-path/:categoryId`
- `/scopes`, `/scopes/:categoryId`
- `/blog`, `/blog/giraffe`, `/blog/meerkat`
- `/frog`, `/honeybee`, `/rabbit`, `/cockroach`, `/leech`
- `/zoohub`, `/zoohub/:phylum`, `/zoohub/:phylum/:slug` — ~300 species across 11 phyla

## Notes

- Species, scientist, and content data live in `src/data/*.json` and are rendered generically by page components — adding new entries to the data files is enough to extend the site.
- Images resolve via a `wikiImages[key] || generatedArt(seed, label)` pattern throughout, so any missing or broken reference photo gracefully falls back to a generated illustration rather than a broken image icon.
