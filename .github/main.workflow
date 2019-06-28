workflow "Deploy on Now (Staging)" {
  on = "pull_request"
  resolves = ["alias"]
}

action "Filters [opened, synchronize] for GitHub Actions" {
  uses = "actions/bin/filter@3c0b4f0e63ea54ea5df2914b4fabf383368cd0da"
  args = "action 'opened|synchronize'"
}

action "Deploy2Staging" {
  uses = "actions/zeit-now@5c51b26db987d15a0133e4c760924896b4f1512f"
  needs = ["Filters [opened, synchronize] for GitHub Actions"]
  secrets = ["ZEIT_TOKEN"]
  args = "deploy --local-config=./now.json --env NODE_ENV=staging --public --no-clipboard > $HOME/$GITHUB_ACTION.txt"
}

workflow "Deploy on Now" {
  on = "push"
  resolves = ["deploy"]
}

action "Filters branch [master] " {
  uses = "actions/bin/filter@3c0b4f0e63ea54ea5df2914b4fabf383368cd0da"
  args = "branch master"
}

action "deploy" {
  uses = "actions/zeit-now@5c51b26db987d15a0133e4c760924896b4f1512f"
  needs = ["Filters branch [master] "]
  args = "deploy --local-config=./now.json --env NODE_ENV=production --target=production --public --no-clipboard"
  secrets = ["ZEIT_TOKEN"]
}

action "alias" {
  uses = "actions/zeit-now@5c51b26db987d15a0133e4c760924896b4f1512f"
  needs = ["Deploy2Staging"]
  args = "alias `cat ${HOME}/Deploy2Staging.txt` bus-time-table-web-pr-`cat $GITHUB_EVENT_PATH | jq -r \".number\"`.now.sh"
  secrets = ["ZEIT_TOKEN"]
}
