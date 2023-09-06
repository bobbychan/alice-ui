module.exports = {
  '**/*.{ts,tsx,js,jsx}': ['prettier --write'],
  '**/*.{md,mdx,yml,json}': ['prettier --write'],
  '**/*.{ts,tsx,js,jsx}': ['eslint --fix'],
};
