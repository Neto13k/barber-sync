import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

/**
Configuração do Vite para o projeto React Router com Tailwind CSS.
*/
export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});
