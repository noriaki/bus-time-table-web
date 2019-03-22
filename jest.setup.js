const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

// enzyme setup
configure({ adapter: new Adapter() });
require('jest-enzyme/lib');

// error handling
const logAndExit = (error) => { console.error(error); process.exit(1); };
process.on('unhandledRejection', logAndExit);
