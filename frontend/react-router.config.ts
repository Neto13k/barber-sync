import type { Config } from "@react-router/dev/config";

/**
Configuração do React Router para modo SPA.
*/
export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,
} satisfies Config;
