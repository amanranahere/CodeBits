import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "https://codebits-backend.vercel.app/api/v1",
    },
  },
  plugins: [react()],
});
