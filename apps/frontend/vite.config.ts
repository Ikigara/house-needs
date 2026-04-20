import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // automatically update the PWA
      manifest: {
        name: 'house-needs',
        short_name: 'house-needs',
        description: 'House Needs PWA App',
        theme_color: '#000000',
        background_color: '#ffffff',
        display: 'standalone', // makes it feel like a native app
        start_url: '/',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
