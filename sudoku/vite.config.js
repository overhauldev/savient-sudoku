import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.[tj]sx?$/, // Apply this loader to .js, .jsx, .ts, and .tsx files in the src directory
    exclude: [],
  },
});
