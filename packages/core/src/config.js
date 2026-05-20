/**
 * Initializes and returns a complete input config.
 * @param {InputConfig} config
 * @returns {Required<InputConfig>}
 */
function initInputConfig(config) {
  if (config.file === undefined)
    throw Error("Missing required `file` configuration option!");

  return {
    file: config.file,
    delimiter: config.delimiter ?? "\n",
  };
}

/**
 * Initializes and returns a complete output config.
 * @param {OutputConfig} config
 * @returns {Required<OutputConfig>}
 */
function initOutputConfig(config) {
  return {
    dir: config.dir ?? "./",
    prefix: config.prefix ?? "",
  };
}

module.exports = {
  initInputConfig,
  initOutputConfig,
};
