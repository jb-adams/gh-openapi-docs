import assert from 'assert';
import config from '@lib/config';
import decide from '@lib/run-decider';

// test cases for decide function
let decideTC = [
    {prBuild: "false", branch: "master", exp: true},
    {prBuild: "true", branch: "master", exp: false},
    {prBuild: "false", branch: "develop", exp: false},
]

const return100 = () => 100;

describe('run-decider', () => {
    describe('run-decider', () => {
        it(`asserts the run decider executes the passed function when expected`, () => {
            decideTC.forEach(tc => {
                config.prBuild = tc.prBuild;
                config.branch = tc.branch;
                let value = decide(return100);
                assert.strictEqual(value, tc.exp);
            })
        })
    })
})