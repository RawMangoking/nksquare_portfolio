// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Used for canonical URLs and social-preview tags.
  site: 'https://nksquare.in',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});
