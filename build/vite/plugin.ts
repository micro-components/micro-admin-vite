import type { Plugin } from "vite";
import vue from "@vitejs/plugin-vue";
import VueJsx from "@vitejs/plugin-vue-jsx";
import legacy from "@vitejs/plugin-legacy";
import html from "vite-plugin-html";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import Unocss from "unocss/vite";
import { VitePWA } from "vite-plugin-pwa";
import Inspect from "vite-plugin-inspect";
import AutoImport from "unplugin-auto-import/vite";

import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
export function createVitePlugins(viteEnv, isDev: boolean) {
  const vitePlugins: Plugin | Plugin[] = [
    vue({
      reactivityTransform: true,
    }),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "safari-pinned-tab.svg"],
      manifest: {
        name: "ViteTemplate",
        short_name: "ViteTemplate",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        navigateFallback: "/",
        cleanupOutdatedCaches: false,
      },
      // client: {
      //   installPrompt: true,
      //   periodicSyncForUpdates: 20
      // },
      devOptions: {
        enabled: true,
        type: "module",
      },
    }),
    VueJsx(),
    legacy({
      targets: ["ie >= 11"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
    }),
    Inspect(),
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ["vue", "md"],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dirs: ["src/components/", "src/layout/", "src/views", "src/assets"],
      resolvers: [
        // 自动导入图标组件
        IconsResolver({
          prefix: "Icon",
        }),
        AntDesignVueResolver(),
      ],
      dts: "src/types/components.d.ts",
    }),
    AutoImport({
      // dts: path.resolve(pathSrc, 'typings', 'auto-imports.d.ts'),
      dts: "src/types/auto-imports.d.ts",
      // imports: ['vue', '@vueuse/core'],
      // Generate corresponding .eslintrc-auto-import.json file.
      // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
      imports: ["vue", "vue/macros", "vue-router", "pinia", "@vueuse/core"],
      dirs: ["src/composables", "src/utils"],
      // Auto import for all module exports under directories
      // dirs: [
      //   // './hooks',
      //   // './composables'
      //   // ...
      // ],
      eslintrc: {
        // enabled: true, // Default `false`
        enabled: false, // Default `false`
        filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      // Auto import functions from UILibrary, e.g. Message, Spin, Loading, MessageBox... (with style)
      resolvers: [
        // Auto import icon components
        AntDesignVueResolver(),
      ],
    }),
    Icons({
      compiler: "vue3",
      customCollections: {
        // custom: FileSystemIconLoader(`${vitePath.src}/assets/svg`)
      },
      scale: 1,
      defaultClass: "inline-block",
      autoInstall: true,
    }),
    Unocss(),
  ];
  return vitePlugins;
}
