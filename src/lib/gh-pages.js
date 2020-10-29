'use strict';
import path from 'path';
import config from './config';
import Log from './log';
import fs from 'fs';
import subprocess from './subprocess';
import GitConfig from './git-config';

const log = new Log();

class LocalGithubPagesBranch {

    constructor() {
        this.branchName = "gh-pages"
        this.tempDir = path.join(config.wd, ".ghpages-tmp");
        this.docFiles = [
            config.docsRoot,
            config.branchPathBase,
            "openapi.json",
            "openapi.yaml",
        ];
    }

    createEnterTempDir() {
        subprocess.removeDirs(this.tempDir);
        subprocess.makeDirs(this.tempDir);
        subprocess.changeDir(this.tempDir);
        log.log(`\nCloning '${this.branchName}' branch into '${this.tempDir}'`);
        subprocess.exec(`git clone --depth=1 --branch=${this.branchName} ${config.repoOrigin} .`);
    }

    leaveRemoveTempDir() {
        subprocess.changeDir(config.wd);
        subprocess.removeDirs(this.tempDir);
    }

    copyDocFiles(srcDir, destDir, overwrite) {
        var copyFunction = overwrite ? subprocess.copyDirs : subprocess.copyDirsN;
        this.docFiles.forEach(docFile => {
            var src = path.join(srcDir, docFile);
            if (fs.existsSync(src)) {
                copyFunction(src, destDir);
            }
        })
    }

    copyDocsFromWorkingDirToTmpDir() {
        this.copyDocFiles(config.wd, this.tempDir, true);
    }

    copyDocsFromTmpDirToWorkingDir() {
        this.copyDocFiles(this.tempDir, config.wd, false);
    }

    generateCommitMessage() {
        var timestamp = new Date().toISOString();
        return `${timestamp}; branch: ${config.branch}; gh-openapi-docs autopush`;
    }

    addCommitPush() {
        subprocess.exec(`git add .`);
        subprocess.exec(`git commit -m "${this.generateCommitMessage()}"`);
        subprocess.exec(`git push`);
    }
}

const fetchPages = () => {
    var localGhPagesBranch = new LocalGithubPagesBranch();
    localGhPagesBranch.createEnterTempDir();
    localGhPagesBranch.copyDocsFromTmpDirToWorkingDir();
    localGhPagesBranch.leaveRemoveTempDir();
};

const pushToPages = () => {
    var localGhPagesBranch = new LocalGithubPagesBranch();
    localGhPagesBranch.createEnterTempDir();
    localGhPagesBranch.copyDocsFromWorkingDirToTmpDir();
    GitConfig.configure();
    localGhPagesBranch.addCommitPush();
    localGhPagesBranch.leaveRemoveTempDir();
}

export { fetchPages, pushToPages };
