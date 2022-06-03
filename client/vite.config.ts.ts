// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import NodeGlobalsPolyfillPlugin from "@esbuild-plugins/node-globals-polyfill";
var vite_config_default = defineConfig({
  envDir: "./env",
  envPrefix: "DAPP_",
  plugins: [react(), tsconfigPaths()],
  define: {
    global: "window"
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true
        })
      ]
    }
  }
});
export {
  vite_config_default as default
};
