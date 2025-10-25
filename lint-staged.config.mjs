/**
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*.{js,jsx,ts,tsx,mjs,cjs,mts,cts}': 'eslint --fix',
  '*.{json,md,yml,yaml}': 'prettier --write',
};
