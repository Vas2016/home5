require('babel-core/register');
['.css', '.less', '.sass', '.ttf', '.woff', '.woff2'].forEach((ext) => require.extensions[ext] = () => {})

require('./server.js')
require('./home5.js')
require('./narodmon.js')