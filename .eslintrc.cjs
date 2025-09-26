module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    settings: {
        react: { version: 'detect' },
    },
    plugins: [
        'react',
        'react-hooks',
        '@typescript-eslint',
        'import',
        'tailwindcss',
    ],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:tailwindcss/recommended',
        'prettier',
    ],
    rules: {
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',

        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

        'import/order': [
            'warn',
            {
                groups: [
                    ['builtin', 'external'],
                    ['internal', 'parent', 'sibling', 'index'],
                ],
                'newlines-between': 'always',
            },
        ],

        'tailwindcss/classnames-order': 'warn',
        'tailwindcss/no-custom-classname': 'off',
    },
};