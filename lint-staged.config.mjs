/**
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*.{js,jsx,ts,tsx,mjs,cjs,mts,cts}': ['oxfmt --write', 'oxlint --fix'],
  '*.{json,css,md,yml,yaml}': 'oxfmt --write',
};
