'use strict';
import config from './config';

class RunDecider {

    constructor() {
        this.branch = config.branch;
        this.enabledBranchPatterns = config.enabledBranchPatterns;
        this.prBuild = config.prBuild === "false" ? false : true;
        this.reason = "";
    }

    decide() {
        var toRun = false;
        if (this.prBuild) {
            this.reason = "This is a PR build";
        } else {
            this.enabledBranchPatterns.forEach(pattern => {
                if (this.branch.match(pattern)) {
                    toRun = true;
                }
            })
            if (!toRun) {
                this.reason = `Branch '${this.branch}' did not match any enabledBranchPatterns`;
            }
        }
        return toRun;
    }
}

const decide = func => {
    var d = new RunDecider()
    var toRun = d.decide()
    toRun ? func() : console.log(`Not building docs: ${d.reason}`);
    return toRun;
}

export default decide;
