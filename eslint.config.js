import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended'
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2023,
      globals: {
        ...globals.browser,
        React: 'readonly',
        JSX: 'readonly'
      },
      sourceType: 'module'
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react': require.resolve('eslint-plugin-react'),
      '@typescript-eslint': tseslint
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' }
      ],
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-var-requires': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
      'react/no-unescaped-entities': 'off',
      'react/no-unused-prop-types': 'error',
      'react/no-unused-state': 'error',
      'react/no-find-dom-node': 'error',
      'react/no-string-refs': 'error',
      'react/no-did-update-set-state': 'error',
      'react/no-direct-mutation-state': 'error',
      'react/no-array-index-key': 'error',
      'react/no-multi-comp': 'error',
      'react/no-will-update-set-state': 'error',
      'react/prefer-stateless-function': 'error',
      'react/require-render-return': 'error',
      'react/self-closing-comp': 'error',
      'react/style-prop-object': 'error',
      'react/void-dom-elements-no-children': 'error',
      'react/jsx-no-comment-textnodes': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-literals': 'off',
      'react/jsx-no-target-blank': 'error',
      'react/jsx-no-undef': 'error',
      'react/jsx-pascal-case': 'error',
      'react/jsx-uses-vars': 'error',
      'react/jsx-wrap-multilines': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
);
