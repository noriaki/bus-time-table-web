const meow = require('meow');
const { execSync } = require('child_process');

const cli = meow({
  description: false,
  help: `Usage:
  $ node scripts/deploy.js [--local(-l) | --no-fetch] <branch>`,
  flags: {
    local: {
      type: 'boolean',
      alias: 'l',
      default: false,
    },
    fetch: {
      type: 'boolean',
      default: true,
    },
  },
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
const runCommand = `start${isStg ? ':staging' : ''}`;

if (!cli.flags.local) {
  if (cli.flags.fetch) {
    console.log('...fetching objects from repository');
    execSync('git fetch -q');
  }
  // execSync(`git merge -X theirs "${targetBranch}" --no-edit`);
  console.log('...cleaning local worktree');
  execSync('git checkout -qf -- .');
  console.log(`...checking out "${originBranch}" to "${localBranch}"`);
  execSync(`git checkout -qf "${originBranch}" -B "${localBranch}"`);
}
const commands = [
  'yarn',
  'yarn build',
  `./node_modules/.bin/pm2 delete "${processName}"`,
  `./node_modules/.bin/pm2 start npm --name="${processName}" -- run ${runCommand}`,
];
console.log('...updating packages and building');
execSync(commands.join(' && '));
console.log('> deployment complete');
