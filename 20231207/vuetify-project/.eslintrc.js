module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'eslint:recommended',
    '@vue/standard'
  ],
  rules: {
    // 關掉一行只能放一行屬性的歸個
    'vue/max-attributes-per-line': 'off'
  }
}
