/**import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    base: "/DaizyAsmani-Portfolio/",   // <- must match the repo name exactly
})
**/

// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const isProd = process.env.NODE_ENV === "production";

// Works locally AND on GitHub Pages
export default defineConfig({
    base: isProd ? "/DaizyAsmani-Portfolio/" : "/",
    plugins: [react()],
    server: {
        host: true,   // so phones on the same Wi-Fi can open it
        port: 5173,
    },
});

