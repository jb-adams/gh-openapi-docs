import { merge } from 'lodash';
import origin from 'remote-origin-url';
import getRepoInfo from 'git-repo-info';
import shell from 'shelljs';
/*eslint no-process-env:0*/

var repoInfo = getRepoInfo();
repoInfo.branch = repoInfo.branch || process.env.TRAVIS_BRANCH || "undefined";

const env = process.env.NODE_ENV;
const wd = shell.pwd().toString();
const ghPagesUserName = process.env.GH_PAGES_NAME;
const ghPagesUserEmail = process.env.GH_PAGES_EMAIL;
const ghPagesUserToken = process.env.GH_PAGES_TOKEN;
const prBuild = process.env.PR_BUILD || "false";
const repoOrigin = origin.sync();
const environment = merge(repoInfo, {
    env,
    wd,
    ghPagesUserName,
    ghPagesUserEmail,
    ghPagesUserToken,
    prBuild,
    repoOrigin,
});

export default environment;
