import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/',
  publicDir: 'public',
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  plugins: [
    react({
      jsxRuntime: 'automatic',
      devTools: true,
      refresh: true
    }),
    tsconfigPaths(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    outDir: "dist",
    assetsDir: "assets",
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
      output: {
        manualChunks: {
          'vendor': [
            'react',
            'react-dom',
            'react-router-dom',
            '@chakra-ui/react',
            '@emotion/react',
            '@emotion/styled',
            'framer-motion'
          ],
        },
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]'
      }
    }
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  }
}));
