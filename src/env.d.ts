/// <reference types="vite/client" />
// src/types/env.d.ts
interface ImportMetaEnv {
  VITE_MODE_NAME: string,
  VITE_APP_ID: string,
  VITE_AGENT_ID: string,
  VITE_LOGIN_TEST: string,
  VITE_RES_URL: string,
  VITE_APP_TITLE: string
}


declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
