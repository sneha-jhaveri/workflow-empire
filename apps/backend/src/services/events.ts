
let subscribers: Record<string, ((event: any) => void)[]> = {};

export function subscribeToRunUpdates(
  runId: string,
  callback: (event: any) => void
) {
  if (!subscribers[runId]) {
    subscribers[runId] = [];
  }
  subscribers[runId].push(callback);

  return () => {
    subscribers[runId] = subscribers[runId].filter((cb) => cb !== callback);
  };
}

export function publishRunUpdate(runId: string, event: any) {
  if (subscribers[runId]) {
    subscribers[runId].forEach((callback) => callback(event));
  }
}
