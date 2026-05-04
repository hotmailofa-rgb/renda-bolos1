import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // Certifique-se de que o 'path' está importado

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Isso diz ao Vite: "Sempre que vir @, olhe dentro da pasta src"
      "@": path.resolve(__dirname, "./src"),
    },
  },
})