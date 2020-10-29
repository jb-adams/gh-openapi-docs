import { merge } from 'lodash';
import origin from 'remote-origin-url';
import getRepoInfo from 'git-repo-info';
import shell from 'shelljs';
/*eslint no-process-env:0*/

var repoInfo = getRepoInfo();
repoInfo.branch = repoInfo.branch || process.env.TRAVIS_BRANCH || "undefined";

const env = process.env.NODE_ENV;
const wd = shell.pwd().toString();
const repoOrigin = origin.sync();
const environment = merge(repoInfo, {
    env,
    repoOrigin,
    wd,
});

export default environment;
