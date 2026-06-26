# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Environment variables

This frontend reads `import.meta.env.VITE_CODESPACE_NAME` to build the API base URL.

- If `VITE_CODESPACE_NAME` is defined, the app uses:
  `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api`
- If `VITE_CODESPACE_NAME` is not defined, the app falls back to:
  `http://localhost:8000/api`

Define `VITE_CODESPACE_NAME` in `.env.local` or in your Vite environment config when running in Codespaces.

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
