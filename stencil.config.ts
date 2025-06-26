import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'dive-components',
  globalStyle: 'src/index.css',
  outputTargets: [
    {
      type: 'dist-custom-elements',
      generateTypeDeclarations: true,
      externalRuntime: false,
    },
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'docs-readme',
    },
  ],
  testing: {
    browserHeadless: true,
    collectCoverageFrom: [
      '**/src/**/*.{ts,tsx}',
      '!**/node_modules/**',
      '!**/*.d.ts',
    ],
  },
  extras: {
    experimentalImportInjection: true,
  },
}; 