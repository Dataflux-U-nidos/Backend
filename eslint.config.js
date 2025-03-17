module.exports = [
  {
    // Indica a qué archivos se aplicará esta configuración
    files: ['**/*.{ts,tsx,js}'],

    languageOptions: {
      // Especifica el parser de TypeScript
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        project: './tsconfig.json', // Asegúrate de que esta ruta sea correcta
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      // Define algunas variables globales propias de Node.js
      globals: {
        __dirname: 'readonly',
        process: 'readonly',
        module: 'writable',
        require: 'readonly',
      },
    },

    // Configura los plugins a usar
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      prettier: require('eslint-plugin-prettier'),
    },

    // Define las reglas. Aquí incluí algunas reglas recomendadas manualmente.
    rules: {
      // Reglas de @typescript-eslint (puedes agregar o ajustar según tus necesidades)
      '@typescript-eslint/adjacent-overload-signatures': 'error',
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-inferrable-types': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // Integración con Prettier para que los errores de formateo se muestren como errores de ESLint
      'prettier/prettier': 'error',
    },

    // Lista de patrones de archivos o carpetas a ignorar
    ignores: ['node_modules/', 'dist/', 'build/'],
  },
];
