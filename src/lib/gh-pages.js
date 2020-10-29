'use strict';
import shell from 'shelljs';
import config from './config';
import Log from './log';
import fs from 'fs';
import subprocess from './subprocess';

const log = new Log();

const fetchPages = () => {

    subprocess.removeDirs('.ghpages-tmp');
    subprocess.makeDirs('.ghpages-tmp');
    var startDir = shell.pwd();
    subprocess.changeDir('.ghpages-tmp');

    log.log(`\nCloning 'gh-pages' branch into '${shell.pwd().stdout}'`);

    subprocess.exec(`git clone --depth=1 --branch=gh-pages ${config.repoOrigin} .`);

    if (fs.existsSync(config.branchPathBase)) {
        subprocess.copyDirsN(config.branchPathBase, config.root);
    }
    if (fs.existsSync(config.docsRoot)) {
        subprocess.copyDirsN(config.docsRoot, config.root);
        subprocess.copyDirsN('openapi.*', config.root);
    }

    subprocess.changeDir(startDir);
    subprocess.removeDirs('.ghpages-tmp');
};

const pushToPages = () => {
    
    if (fs.existsSync(config.branchPathBase)) {
        subprocess(exec, `git add ${config.branchPathBase}`).runAndAssert();
    }
    if (fs.existsSync(config.docsRoot)) {
        subprocess(exec, `git add ${config.docsRoot}`).runAndAssert();
    }
    if (fs.existsSync("./openapi.json")) {
        subprocess(exec, `git add ./openapi.json`).runAndAssert();
    }
    if (fs.existsSync("./openapi.yaml")) {
        subprocess(exec, `git add ./openapi.yaml`).runAndAssert();
    }

    subprocess(exec, `git stash save`).runAndAssert();
    subprocess(exec, `git checkout gh-pages`).runAndAssert();
    subprocess(exec, `git pull`).runAndAssert();
    subprocess(exec, `git checkout stash -- .`).runAndAssert();
    // subprocess(exec, `git commit -m "testing automated push"`).runAndAssert();
    // subprocess(exec, `git push`).runAndAssert();
}

export { fetchPages, pushToPages };
