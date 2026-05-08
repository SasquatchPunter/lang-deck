/** @typedef {import('./types.js').TranslationClient} TranslationClient */

/**
 * @param {string} text
 * @param {TranslationClient} client
 */
function fromClient(text, client) {
  return client.translate(text);
}

module.exports = { fromClient };
