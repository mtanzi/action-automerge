const github = require('@actions/github')
const core = require('@actions/core');
const { Octokit } = require('@octokit/rest')

const token = core.getInput('github_token')
const octokit = new Octokit({ auth: token })
const repo = github.context.repo

async function merge(source, target) {
  core.info(`merge branch:${source} to: ${target}`)

  const response = await octokit.repos.merge({
    owner: repo.owner,
    repo: repo.repo,
    base: target,
    head: source,
    commit_message: `Merged '${source}' into '${target}'.`
  })
}

async function run() {
  const source = core.getInput('source')
  const target = core.getInput('target')
  core.info(`merge ${source} into ${target}`)

  try {
    await merge(source, target)
  } catch (error) {
    core.setFailed(`${source} merge failed: ${error.message}`)
  }

}

run()
