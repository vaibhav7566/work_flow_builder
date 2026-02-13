import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'  // ye line sahi hai

export default defineConfig({
  plugins: [
    tailwindcss(),  // pehle tailwindcss plugin
    react()         // phir react plugin
  ],
})
