const core = require('@actions/core');
const github = require('@actions/github');
const { gitCheckout } = require('./gitCheckout');
const { gitDiff } = require('./gitDiff');

async function run() {
    const repoRoot = core.getInput('repo-root');
    const baseRevision = core.getInput('base-revision');
    const targetRevision = core.getInput('target-revision');

    try {
        if (typeof repoRoot === 'string' && repoRoot) {
            process.chdir(repoRoot);
        }

        core.notice(`Generating upgrade commit for revision '${targetRevision}' against revision '${baseRevision}'`);

        const filesForUpgrade = await gitDiff(baseRevision, targetRevision);
        await gitCheckout(targetRevision, filesForUpgrade);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run().catch(reason => core.setFailed(reason));