// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  devtools: { enabled: true },
  typescript: { strict: true },
  runtimeConfig: {
    public: {
      // Change this in production to point to your deployed Express API
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3001'
    }
  },
  app: {
    head: {
      title: 'File Converter',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Convert images between PNG, JPG, WEBP, AVIF. SVG → PNG/JPG/WEBP/AVIF.' }
      ]
    }
  }
})
