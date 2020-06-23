// #!/usr/bin/env node
'use strict';
import shell from 'shelljs';
import path from 'path';
import config from './config';
import redocOptions from './redocOptions';
import Log from './log';

const log = new Log();
var OPENAPI_YAML_PATH = path.join(config.branchPath, 'openapi.yaml');

const setupUI = () => {
    var uiPath = path.join(config.branchPath, config.docsRoot);
    shell.mkdir('-p', uiPath);
    var indexPath = path.join(uiPath, 'index.html');
    log.log(`Generating OpenAPI docs index at '${indexPath}'`);
    var redocOpts = redocOptions.getRedocCliOptions();
    shell.exec(
        `redoc-cli bundle ${redocOpts} --output ${indexPath} ${OPENAPI_YAML_PATH}`
    );
    //--options.theme.colors.primary.main=${defaults.redoc.options.theme.colors.primary.main}
    log.preview({
        'title': 'OpenAPI docs folder contents',
        'text': shell.ls(uiPath).stdout
    });
};

export { setupUI };