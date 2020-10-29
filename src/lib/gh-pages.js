'use strict';
import shell from 'shelljs';
import config from './config';
import Log from './log';
import fs from 'fs';
import {cd, cp, exec, mkdir, rm, subprocess} from './subprocess';

const log = new Log();

const fetchPages = () => {

    subprocess(rm, '-rf', '.ghpages-tmp').runAndAssert();
    subprocess(mkdir, '-p', '.ghpages-tmp').runAndAssert();
    var startDir = shell.pwd();
    subprocess(cd, '.ghpages-tmp').runAndAssert();

    log.log(`\nCloning 'gh-pages' branch into '${shell.pwd().stdout}'`);

    subprocess(exec, `git clone --depth=1 --branch=gh-pages ${config.repoOrigin} .`).runAndAssert();

    if (fs.existsSync(config.branchPathBase)) {
        subprocess(cp, '-Rn', config.branchPathBase, config.root).runAndAssert();
    }
    if (fs.existsSync(config.docsRoot)) {
        subprocess(cp, '-Rn', config.docsRoot, config.root).runAndAssert();
        subprocess(cp, '-Rn', 'openapi.*', config.root);
    }

    subprocess(cd, startDir).runAndAssert();
    subprocess(rm, '-rf', '.ghpages-tmp').runAndAssert();
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
