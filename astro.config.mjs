// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

// The Keystatic editor (/keystatic) needs server routes, so it's only enabled in
// `astro dev`. Production builds stay fully static (see CLAUDE.md).
const isDev = process.argv.includes('dev');

export default defineConfig({
  site: 'https://www.otoro.systems',
  build: { format: 'directory' },
  integrations: isDev ? [react(), keystatic()] : [],
});
