import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import VitePluginHtmlEnv from 'vite-plugin-html-env';
import renderer from 'vite-plugin-electron-renderer';
import loadVersion from 'vite-plugin-package-version';

const path = require('path');

const plugins = [
  react(),
  VitePluginHtmlEnv(),
  loadVersion(),
];

const build = {
  chunkSizeWarningLimit: 600,
  rollupOptions: {
    output: {
      // Provide global variables to use in the UMD build
      // for externalized deps
      // globals: {
      //   vue: 'Vue'
      // }
    },
  },
};

const resolve = {
  alias: [
    { find: '@', replacement: path.resolve(__dirname, './src') },
    { find: '@app', replacement: path.resolve(__dirname, './src/app') },
    { find: '@core', replacement: path.resolve(__dirname, './src/core') },
    { find: '@modulos', replacement: path.resolve(__dirname, './src/modulos') }
  ],
};

export default defineConfig(({ command, mode }) => {
  if (command == 'serve' && mode !== 'appdevelopment') {
    return {
      server: {
        open: '/',
        disableHostCheck: true,
        hot: true,
      },
      resolve,
      build,
      plugins,
    };
  } else if (command == 'serve') {
    return {
      server: {
        disableHostCheck: true,
        hot: true,
      },
      resolve,
      build,
      plugins,
    };
  }

  if (process.env.ELECTRON=='true') {
    plugins.push(renderer());
  }

  return {
    base: './',
    build,
    resolve,
    plugins,
  };
});
