/* eslint-env node */
module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-recommended', 'plugin:vue-pug/vue3-recommended', 'eslint:recommended', '@vue/standard'],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    // 關掉一行只能放一行屬性的歸個
    'vue/max-attributes-per-line': 'off'
  }
}
