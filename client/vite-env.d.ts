/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly REACT_APP_ENVIRONMENT: string;

  // add other env vars here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
