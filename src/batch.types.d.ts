declare type Task = () => Promise<any>;

declare type TaskQueue = Task[];

declare type ProcessedTaskQueueResult = {
  resolved: TaskQueue;
  rejected: TaskQueue;
};
