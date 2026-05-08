/**
 * Abstract interface for a translation client wrapper.
 * @typedef {object} TranslationClient
 * @property {(text: string, ...rest: any[]) => Promise<TranslationResponse>} translate
 */

/**
 * Translation response from the client.
 * @typedef {object} TranslationResponse
 * @property {[string, string]} translation
 */
