const { simpleGit } = require('simple-git');

/**
 * @param {string} targetRevision
 * @param  {string[]} files
 */
async function gitCheckout(targetRevision, files) {
    try {
        const git = simpleGit();
        await git.checkout(
            [
                targetRevision,
                '--',
                ...files
            ]
        );
    } catch (error) {
        throw error;
    }
}

module.exports = {
    gitCheckout
};

// gitCheckout(...process.argv.slice(2));