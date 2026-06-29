import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import sonarjs from 'eslint-plugin-sonarjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const nextConfig = compat.extends('next/core-web-vitals', 'next/typescript');

/** @type {import('eslint').Linter.Config[]} */
const config = [
  ...nextConfig,
  {
    plugins: { sonarjs },
    rules: {
      ...sonarjs.configs.recommended.rules,
    },
  },
];

export default config;
