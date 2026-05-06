const { initInputConfig, initOutputConfig } = require("../config.js");

/** @typedef {import('../config.js').InputConfig} InputConfig */
/** @typedef {Required<InputConfig>} CompleteInputConfig */
/** @typedef {import('../config.js').OutputConfig} OutputConfig */
/** @typedef {Required<OutputConfig>} CompleteOutputConfig */

describe("config", () => {
  describe("initInputConfig", () => {
    test("loads defaults", () => {
      /** @type {InputConfig} */
      const config = { file: "test.txt" };
      /** @type {CompleteInputConfig} */
      const expected = {
        file: "test.txt",
        delimiter: "\n",
      };

      expect(initInputConfig(config)).toEqual(expected);
    });

    test("throws on invalid config", () => {
      //@ts-expect-error
      expect(() => initInputConfig({})).toThrow();
    });
  });

  describe("initOutputConfig", () => {
    test("loads defaults", () => {
      /** @type {OutputConfig} */
      const config = {};
      /** @type {CompleteOutputConfig} */
      const expected = { dir: "./", prefix: "" };

      expect(initOutputConfig(config)).toEqual(expected);
    });
  });
});
