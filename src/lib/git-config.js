'use strict';
import config from './config';
import subprocess from './subprocess';

class GitConfig {

    static configure() {
        subprocess.exec(`git config user.name ${config.ghPagesUserName}`);
        subprocess.exec(`git config user.email ${config.ghPagesUserEmail}`);
        subprocess.exec(`git config credential.helper "store --file=.git/credentials"`);
        subprocess.exec(`echo "https://${config.ghPagesUserToken}:x-oauth-basic@github.com" > .git/credentials`);
    }
}

export default GitConfig;