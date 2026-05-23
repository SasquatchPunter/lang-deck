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
 * Batches and concurrently processes a queue of async tasks using a simple runner scheduler.
 *
 * Tasks are popped from the queue and cached. Set `batchSize` and `batchInterval` parameters for time-windowed rate limiting.
 *
 * @param {TaskQueue} queue Queue of tasks to batch and process.
 * @param {number} batchSize Number of tasks to run in every batch.
 * @param {number} batchInterval Milliseconds between batched task runs. Next batch will run regardless of how many batches are still pending.
 * @returns {Promise<ProcessedTaskQueueResult>} An object containing the tasks that resolved, and the tasks that rejected.
 */

async function processTaskQueue(queue, batchSize, batchInterval) {
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

    if (now - lastTimeout > batchInterval) {
      lastTimeout = now;

      const chunk = chunkTasks(queue, batchSize).map((task) =>
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
