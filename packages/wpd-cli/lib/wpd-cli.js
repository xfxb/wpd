'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wpdCli;
function wpdCli() {
  switch (process.argv[2]) {
    case 'new':
      require('./new').default();
      break;
    default:
      console.error('Unknown command ' + process.argv[2]);
      process.exit(1);
  }
}