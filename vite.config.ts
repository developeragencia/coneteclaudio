import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: './',
  publicDir: 'public',
  server: {
    host: true,
    port: 3000,
    open: true,
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
      devTools: mode === 'development',
      refresh: true
    }),
    tsconfigPaths(),
    mode === 'development' && componentTagger()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    cssMinify: true,
    outDir: "dist",
    assetsDir: "assets",
    emptyOutDir: true,
    sourcemap: mode === 'development',
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-toast', '@radix-ui/react-slot', 'class-variance-authority', 'clsx', 'tailwind-merge'],
          'animation-vendor': ['framer-motion'],
          'utils': ['date-fns', 'sonner']
        },
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]'
      }
    }
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      '@radix-ui/react-toast',
      '@radix-ui/react-slot',
      'class-variance-authority',
      'clsx',
      'tailwind-merge',
      'date-fns',
      'sonner'
    ],
    exclude: ['@babel/runtime']
  },
  preview: {
    port: 3000,
    host: true
  }
}));
