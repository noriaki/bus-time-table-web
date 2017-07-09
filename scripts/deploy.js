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
const processName = `com.deux-tours-bux${isStg ? '.stg' : ''}`;
const targetBranch = cli.input[0];

if(targetBranch == null) {
  console.error('Error <branch>: Need target branch name');
  cli.showHelp();
}

const originBranch = `origin/${targetBranch}`;
const localBranch = `${isStg ? 'stg/' : ''}${targetBranch}`;

if (!cli.flags.local) {
  if (cli.flags.fetch) {
    execSync('git fetch --quiet');
  }
  // execSync(`git merge -X theirs "${targetBranch}" --no-edit`);
  execSync('git checkout --quiet -- .');
  execSync(`git checkout --quiet "origin/${targetBranch}" -B ${localBranch}`);
}
execSync(`yarn && yarn build && yarn pm2 restart ${processName}`);
