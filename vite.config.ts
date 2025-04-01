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
      'date-fns',
      'axios',
      'zod',
      '@supabase/supabase-js',
      'lucide-react',
      'framer-motion',
      '@radix-ui/react-dialog',
      '@radix-ui/react-label',
      '@radix-ui/react-select',
      '@radix-ui/react-tabs',
      'react-router-dom'
    ],
    exclude: []
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    outDir: "dist",
    sourcemap: false,
    reportCompressedSize: false,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-label',
            '@radix-ui/react-select',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-avatar',
            '@radix-ui/react-slot'
          ],
          'vendor-utils': ['date-fns', 'axios', 'zod'],
          'vendor-icons': ['lucide-react'],
          'vendor-motion': ['framer-motion'],
          'vendor-supabase': ['@supabase/supabase-js'],
          'admin': [
            './src/components/admin/dashboard',
            './src/components/admin/header',
            './src/components/admin/sidebar',
            './src/components/admin/tax-credits',
            './src/components/admin/tax-reports',
            './src/components/admin/operational'
          ],
          'auth': ['./src/components/auth'],
          'ui': ['./src/components/ui']
        },
        chunkFileNames: (chunkInfo) => {
          const name = chunkInfo.name;
          if (name?.includes('node_modules')) {
            return 'assets/vendor-[name]-[hash].js';
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
