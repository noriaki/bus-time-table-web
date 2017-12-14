const meow = require('meow');
const { execSync } = require('child_process');

const cli = meow({
  description: false,
  help: `Usage:
  $ node scripts/deploy.js [--local(-l) | --no-fetch] <branch>`,
}, {
  alias: { l: 'local' },
  default: { fetch: true },
});

const isStg = process.env.NODE_ENV === 'staging';
const processName = `com.deux-tours-bus${isStg ? '.stg' : ''}`;
const targetBranch = cli.input[0];

if (targetBranch == null) {
  console.error('Error <branch>: Need target branch name');
  cli.showHelp();
}

const originBranch = `origin/${targetBranch}`;
const localBranch = `${isStg ? 'stg/' : ''}${targetBranch}`;

if (!cli.flags.local) {
  if (cli.flags.fetch) {
    execSync('git fetch -q');
  }
  // execSync(`git merge -X theirs "${targetBranch}" --no-edit`);
  execSync('git checkout -qf -- .');
  execSync(`git checkout -qf "${originBranch}" -B "${localBranch}"`);
}
const commands = [
  'yarn',
  'yarn build',
  `./node_modules/.bin/pm2 delete "${processName}"`,
  `./node_modules/.bin/pm2 start npm --name="${processName}" -- run start:staging`,
];
execSync(commands.join(' && '));
