workflow "Deploy on Now (Staging)" {
  on = "pull_request"
  resolves = ["Release"]
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

action "Release" {
  uses = "actions/zeit-now@5c51b26db987d15a0133e4c760924896b4f1512f"
  args = "alias `cat ${HOME}/Deploy2Staging.txt` bus-time-table-web-stg"
  secrets = ["ZEIT_TOKEN"]
  needs = ["Deploy2Staging"]
}

workflow "Deploy on Now" {
  on = "push"
  resolves = ["release"]
}

action "Filters branch [master] " {
  uses = "actions/bin/filter@3c0b4f0e63ea54ea5df2914b4fabf383368cd0da"
  args = "branch master"
}

action "deploy" {
  uses = "actions/zeit-now@5c51b26db987d15a0133e4c760924896b4f1512f"
  needs = ["Filters branch [master] "]
  args = "deploy --local-config=./now.json --env NODE_ENV=production --public --no-clipboard"
  secrets = ["ZEIT_TOKEN"]
}

action "release" {
  uses = "actions/zeit-now@5c51b26db987d15a0133e4c760924896b4f1512f"
  needs = ["deploy"]
  args = "alias --local-config=./now.json"
  secrets = ["ZEIT_TOKEN"]
}
