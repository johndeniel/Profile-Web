const nextConfig = require('eslint-config-next');

module.exports = [
  ...nextConfig,
  {
    ignores: ['node_modules', '.next', 'out', 'public'],
  },
];
