module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    "ecmaFeatures": {
      "legacyDecorators": true
    }
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
    'eslint:recommended'
  ],
  plugins: [
    'prettier', 'vue'
  ],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-empty': 'error',
    'semi': 'off',
    'import/imports-first': ['error', 'absolute-first'],
    'import/newline-after-import': 'error',
    'prettier/prettier': [
      'error',
      {
        'singleQuote': true,
        'trailingComma': 'none',
        'bracketSpacing': true
      }
    ],
    // @fixable 必须使用 === 或 !==，禁止使用 == 或 !=，与 null 比较时除外
    'eqeqeq': [
      'error',
      'always',
      {
          null: 'ignore'
      }
  ],
  // 类和接口的命名必须遵守帕斯卡命名法，比如 PersianCat
  // 'typescript/class-name-casing': 'error'
  }
}
