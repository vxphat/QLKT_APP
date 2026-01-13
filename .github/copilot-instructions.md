# Copilot / AI Agent Instructions — QLKT_APP

Purpose: give AI coding agents the minimal, actionable context needed to be productive in this React + Vite admin/dashboard repo.

1. Big picture

- Frontend-only monorepo using Vite + React (see `package.json` scripts). Entry: `src/main.jsx` and global styles in `src/index.scss`.
- UI is composed of many dashboard containers under `src/container/*` (charts, tables, pages). Charts use `apexcharts`/`react-apexcharts` and `chart.js`/`react-chartjs-2` (see `src/container/qlsl/tongQuan/dashboardSL/dashboardSLdata.jsx` for examples).
- State: lightweight use of Redux (files at `src/redux/action.jsx`, `src/redux/reducer.jsx`, `src/redux/store.jsx`) and some direct component state. Firebase auth/integration lives under `src/firebase/*.jsx`.

2. Developer workflows (how to run/build)

- Install: `npm install` (project uses Vite).
- Dev server / HMR: `npm run dev` (script `vite`).
- Build production bundle: `npm run build` (script `vite build`).
- Preview production build locally: `npm run preview`.
- Sass compile helpers: `npm run sass` (compile SCSS -> `src/assets/css`), `npm run sass-min` for compressed output.

3. Project-specific conventions & patterns

- Many UI modules are implemented as React class components (see `src/container/**`), not exclusively functional components — prefer keeping component style consistent when editing or extending a specific file.
- Charts: prefer using `react-apexcharts` for dashboard time-series and `react-chartjs-2` for doughnut charts. Example: `src/container/qlsl/tongQuan/dashboardSL/dashboardSLdata.jsx` contains mixed Apex and Chart.js usage.
- Assets: static images, fonts and compiled CSS live under `src/assets/*`. When changing SCSS, run the `sass` script or rely on Vite HMR for `.scss` edits.
- Filenames use `.jsx` widely (even for Redux files) — tools or linters should include `.jsx` in extensions.

4. Integration points & external dependencies to be aware of

- Firebase: `src/firebase/auth.jsx`, `src/firebase/firebaseapi.jsx` — changes here affect authentication flows across the app.
- Redux: `src/redux/store.jsx` wires the store; other components import actions from `src/redux/action.jsx` and `src/redux/reducer.jsx`.
- Routing: `react-router-dom` is used; app-level layouts exist in `src/pages/` (e.g., `App.jsx`, `authenticationlayout.jsx`, `landinglayout.jsx`).

5. Files to inspect for context when making changes

- `package.json` — scripts & dependencies.
- `vite.config.js` — dev server and plugin config.
- `src/main.jsx` — bootstrapping and global providers (router, redux, theme).
- `src/index.scss` and `src/assets/scss/` — global styles.
- `src/firebase/` — auth and firebase API wrappers.
- `src/redux/` — store, actions, reducers.
- Representative component: `src/container/qlsl/tongQuan/dashboardSL/dashboardSLdata.jsx` — shows chart patterns, class components, and asset imports.

6. What agents should NOT assume

- There are no automated tests in repo root; do not assume a test harness exists.
- Environment variables for production keys (e.g., Firebase) are not committed — check `src/firebase/firebaseapi.jsx` for expected variables.

7. Quick coding conventions

- Preserve component style (class vs functional) within a file.
- Keep SCSS edits in `src/assets/scss` and run `npm run sass` if the change is not picked up by Vite.
- Use existing chart wrappers (Apex/Chart.js) rather than swapping chart libraries in-place.

If any section is unclear or you want this adapted (more CI, PR rules, or examples), tell me which area to expand.
