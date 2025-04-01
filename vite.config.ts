import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
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
      '@supabase/supabase-js',
      'lucide-react',
      'framer-motion',
      '@radix-ui/react-dialog',
      '@radix-ui/react-label',
      '@radix-ui/react-select',
      '@radix-ui/react-tabs',
      'react-router-dom'
    ],
    exclude: ['date-fns']
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    outDir: "dist",
    sourcemap: false,
    reportCompressedSize: false,
    rollupOptions: {
      external: ['date-fns'],
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'vendor-react';
            if (id.includes('@radix-ui')) return 'vendor-ui';
            if (id.includes('axios') || id.includes('zod')) return 'vendor-utils';
            if (id.includes('lucide-react')) return 'vendor-icons';
            if (id.includes('framer-motion')) return 'vendor-motion';
            if (id.includes('@supabase')) return 'vendor-supabase';
            return 'vendor';
          }
          
          // Admin sub-chunks
          if (id.includes('/components/admin/')) {
            if (id.includes('/dashboard')) return 'admin-dashboard';
            if (id.includes('/users')) return 'admin-users';
            if (id.includes('/clients')) return 'admin-clients';
            if (id.includes('/suppliers')) return 'admin-suppliers';
            if (id.includes('/tax-credits')) return 'admin-tax-credits';
            if (id.includes('/tax-reports')) return 'admin-tax-reports';
            if (id.includes('/operational')) return 'admin-operational';
            return 'admin-core'; // Layout e componentes compartilhados
          }
          
          // Other app chunks
          if (id.includes('/components/auth/')) return 'auth';
          if (id.includes('/components/ui/')) return 'ui';
          if (id.includes('/pages/')) return 'pages';
          return null;
        },
        paths: {
          'date-fns': 'https://cdn.jsdelivr.net/npm/date-fns@2.30.0/esm/index.js'
        },
        chunkFileNames: (chunkInfo) => {
          const name = chunkInfo.name;
          if (name?.includes('vendor')) {
            return 'assets/vendor/[name]-[hash].js';
          }
          if (name?.includes('admin-')) {
            return 'assets/admin/[name]-[hash].js';
          }
          return 'assets/[name]-[hash].js';
        },
        assetFileNames: (assetInfo) => {
          const name = assetInfo?.name || '';
          const extType = name.split('.')[1] || '';
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/css/i.test(extType)) {
            return 'assets/css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
    chunkSizeWarningLimit: 1000,
  },
}));
