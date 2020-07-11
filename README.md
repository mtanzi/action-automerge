# action-automerge

GitHub action to automatically merge the source branch into a target branch every time a change is made. A webhook can be configured to send both a successful or failure notification to Slack.

## Inputs

### `source`

**Required** Source branch for the merge

### `target`

**Required** Target branch for the merge

### `webhook_url`

**Optional** The Slack webhook URL to post to.


## Example usage

```
name: Update cms/master

on:
  push:
    branches:
      - master

jobs:
  update-cms-master:
    name: Merge master into cms/master after a PR is merged
    runs-on: ubuntu-latest
    steps:
      - name: checkout
        uses: actions/checkout@v2
      - name: merge
        uses: mtanzi/action-automerge@v1
        id: merge
        with:
          github_token: ${{ github.token }}
          source: 'master'
          target: 'release'
          webhook_url: #if present add the Slack webhook
```

## Build

```bash
npm run-script build
```
