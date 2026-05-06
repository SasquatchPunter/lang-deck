/**
 * This is meant to be a simplified abstract interface for client wrappers.
 * @typedef {object} SpeechClient
 * @property {(text: string, ...rest: any[]) => Promise<SpeechResponse>} generate Generates speech from a textual input.
 */

/**
 * Expected response object containing speech data.
 * @typedef {object} SpeechResponse
 * @property {Array<string>} audio
 */
