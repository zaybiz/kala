var menubar = require('menubar');

var mb = menubar({
  dir: __dirname,
  width: 370
});

mb.on('ready', function ready() {
  console.log('app is ready');
});
