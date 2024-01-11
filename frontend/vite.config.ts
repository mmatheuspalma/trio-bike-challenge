import { URL, fileURLToPath } from 'node:url'

import autoprefixer from 'autoprefixer'
import { defineConfig, type ConfigEnv } from 'vitest/config'
import { extname } from 'node:path'
import postcssDiscardComments from 'postcss-discard-comments'
import postcssExtend from 'postcss-extend-rule'
import postcssNesting from 'postcss-nesting'
import postcssPurgeCSS from '@fullhuman/postcss-purgecss'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv) => {
  const isProduction = mode === 'production'

  return defineConfig({
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          // NOTE: this option is not documented on Vite, but it is possible to use additionalData as function
          // This helps to check what files we need to prepend CSS before parsing it. It is very useful for Vue components only.
          // @see https://github.com/vitejs/vite/blob/177b427b1b0c72b06bddd860d14ff119cb22431f/packages/vite/src/node/plugins/css.ts#L1401-L1408
          //
          // WARNING: This may change in vite future versions. Project is using vite@3.2.0
          additionalData(source: string, filename: string) {
            let additionalData = ''
            // Include clean stylesheet to add variables, mixins, functions and helpers to Vue <style> generated CSS.
            if (extname(filename) === '.vue') {
              additionalData = `
              @use '@/assets/scss/themes/default' as theme;

              @use '@/assets/scss/abstract' as * with($colors: theme.$colors);
              /// if component is using @apply CSS helper, inject CSS utility classes
              ${source.match(/@apply\b/) ? `@use '@/assets/scss/base/helpers' as *;` : ''}
              `
            }

            return `${additionalData.trim()}\n${source}`
          }
        }
      },
      postcss: {
        plugins: [
          autoprefixer,
          postcssExtend({ name: 'apply' }),
          // TODO: check postcss nesting plugin
          postcssNesting(),
          postcssDiscardComments({ removeAll: true }),
          // TODO: check PostCSS setup to make sure to not remove some component classes, specially loading spinner component
          isProduction &&
            postcssPurgeCSS({
              content: ['./**/*.html', './src/**/*.vue'],
              defaultExtractor(content) {
                const contentWithoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, '')

                return contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || []
              },
              safelist: [/data-v-.*/]
            })
        ].filter((p) => !!p)
      }
    },
    test: {
      root: './src',
      environment: 'jsdom',
      // https://vitest.dev/guide/coverage.html
      coverage: {
        reporter: ['json', 'text'],
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80
      }
    }
  })
}
