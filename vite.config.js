import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: "/Daizy-portfolio/", // <-- IMPORTANT: repo name with leading & trailing slash
});
