/** @typedef {() => Promise<any>} Task */
/** @typedef {Task[]} TaskQueue */
/** @typedef {{ resolved: TaskQueue; rejected: TaskQueue; }} ProcessedTaskQueueResult */

/**
 * Chunks tasks from a queue.
 * @param {TaskQueue} queue
 * @param {number} length
 */
function chunkTasks(queue, length) {
  const chunk = [];
  while (length-- > 0 && queue.length > 0) {
    const task = queue.pop();
    if (task !== undefined) chunk.push(task);
  }
  return chunk;
}

/**
 * Batches and concurrently processes a queue of tasks.
 *
 * Each task is an async "runner" function returning a Promise.
 *
 * Processed tasks are removed from the queue.
 * Tasks whose promises reject are returned after the queue has been fully processed.
 * @param {TaskQueue} queue Queue of tasks to batch and process.
 * @param {number} concurrent Number of tasks to run during every timeout window.
 * @param {number} timeoutMS Length of timeout period in milliseconds.
 * @returns {Promise<ProcessedTaskQueueResult>} An array of rejected tasks.
 */

async function processTaskQueue(queue, concurrent, timeoutMS) {
  /** @type {ProcessedTaskQueueResult} */
  const result = {
    resolved: [],
    rejected: [],
  };

  const loopDelayMS = 100;
  let pending = 0;
  let lastTimeout = 0;

  while (true) {
    if (queue.length == 0 && pending === 0) break;

    const now = Date.now();

    if (now - lastTimeout > timeoutMS) {
      lastTimeout = now;

      const chunk = chunkTasks(queue, concurrent).map((task) =>
        task()
          .then(() => {
            result.resolved.push(task);
          })
          .catch(() => {
            result.rejected.push(task);
          }),
      );

      pending++;

      Promise.allSettled(chunk).finally(() => {
        pending--;
      });
    }

    await delay(loopDelayMS);
  }

  return result;
}

/**
 * Promise that resolves after a delay. Can be used for throttling in async functions.
 * @param {number} delayMS Timeout in milliseconds.
 */
async function delay(delayMS = 0) {
  return await new Promise((resolve) => setTimeout(resolve, delayMS));
}

module.exports = {
  chunkTasks,
  processTaskQueue,
  delay,
};
