const { simpleGit } = require('simple-git');

/**
 * @param {string} baseRevision
 * @param {string} targetRevision
 */
async function gitDiff(baseRevision, targetRevision) {
    try {
        const git = simpleGit();
        const results = await git.diff(
            [
                '--name-status',
                baseRevision,
                targetRevision
            ]
        );
        const lines = results.split('\n').map(line => line.split(/\t+/));
        const trackedFiles = lines.flatMap(([status, ...files]) => {
            switch (status.slice(0, 1)) {
                case 'A':
                case 'M':
                    return files.slice(0, 1);

                case 'D':
                    return [];

                case 'R':
                    return files.slice(-1);

                default:
                    return [];
            }
        })
            .filter(file => !file.endsWith('.gitignore'))
            .filter(file => !file.startsWith('.git'));
        return trackedFiles;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    gitDiff
};

// gitDiff(...process.argv.slice(2));