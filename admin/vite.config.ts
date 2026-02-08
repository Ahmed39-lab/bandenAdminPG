import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true,
    allowedHosts: [
      'mercenarily-unwiped-kanisha.ngrok-free.dev'
    ],
  },
});
