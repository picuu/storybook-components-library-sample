import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    dts({
      rollupTypes: true,
      tsconfigPath: "./tsconfig.app.json",
    })
  ],
  build: {
    // library entry and output settings
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'Storybook components library sample',
      fileName: 'storybook-components-library-sample'
    },

    // bundler options
    // externalize react-related imports
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime'
        }
      }
    }
  }
})
