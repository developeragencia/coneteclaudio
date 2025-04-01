import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: './',
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
    react(),
    tsconfigPaths(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: [
      'date-fns',
      '@supabase/supabase-js',
      'lucide-react',
      'framer-motion',
      '@chakra-ui/react',
      '@chakra-ui/icons',
      '@emotion/react',
      '@emotion/styled',
      'react-router-dom',
      'jwt-decode',
      'axios'
    ]
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    outDir: "dist",
    sourcemap: mode === 'development',
    reportCompressedSize: false,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'vendor-react';
            if (id.includes('@chakra-ui')) return 'vendor-chakra';
            if (id.includes('@emotion')) return 'vendor-emotion';
            if (id.includes('date-fns') || id.includes('axios') || id.includes('zod')) return 'vendor-utils';
            if (id.includes('lucide-react')) return 'vendor-icons';
            if (id.includes('framer-motion')) return 'vendor-motion';
            if (id.includes('@supabase')) return 'vendor-supabase';
            return 'vendor';
          }
          
          // Feature-based chunks
          if (id.includes('/features/')) {
            if (id.includes('/auth/')) return 'feature-auth';
            if (id.includes('/clients/')) return 'feature-clients';
            if (id.includes('/suppliers/')) return 'feature-suppliers';
            if (id.includes('/payments/')) return 'feature-payments';
            if (id.includes('/dashboard/')) return 'feature-dashboard';
            return 'feature-core';
          }
          
          // Shared chunks
          if (id.includes('/components/shared/')) return 'shared';
          if (id.includes('/hooks/')) return 'hooks';
          if (id.includes('/utils/')) return 'utils';
          if (id.includes('/services/')) return 'services';
          if (id.includes('/pages/')) return 'pages';
          
          return null;
        },
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]',
        entryFileNames: 'assets/[name].[hash].js',
      },
    },
    chunkSizeWarningLimit: 1000,
  },
}));
