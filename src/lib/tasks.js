import Logger from './log';
import Config from './config';
import { fetchPages, pushToPages } from './gh-pages';
import bundleSpec from './bundle';
import { setupUI } from './redoc-ui';
import decide from './run-decider';

const runTasks = (opts, di) => {

  const tasks = () => {
    fetchPages();
    bundleSpec();
    setupUI();
    pushToPages();
  }

  let container = {};

  try {
    Object.assign(container, di);
    container.config = container.config || Config;

    container.log = container.log || new Logger();
    const { log } = container;

    log.info(`Preparing docs for API spec at '${container.config.apiSpecPath}' (${container.config.branch})`);
    decide(tasks);
    log.log(`Done (in ${Math.floor(process.uptime())}s.)`);

    return { };
  } catch (err) {
    const { log } = container;
    log ? log.error(err.message || err) : console.error(err); // eslint-disable-line no-console
    throw err;
  }
};

export default runTasks;
