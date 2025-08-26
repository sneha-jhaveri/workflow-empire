import React, { useEffect, useState } from "react";

type LogEvent = {
  step: string;
  status: string;
  timestamp: string;
};

export const RunLogViewer: React.FC<{ runId: string }> = ({ runId }) => {
  const [logs, setLogs] = useState<LogEvent[]>([]);

  useEffect(() => {
    const eventSource = new EventSource(`/sse/runs/${runId}`);

    eventSource.onmessage = (event) => {
      const log: LogEvent = JSON.parse(event.data);
      setLogs((prevLogs) => [...prevLogs, log]);
    };

    eventSource.onerror = () => {
      console.error("EventSource failed.");
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [runId]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-lg font-bold mb-2">Run Logs</h2>
      <ul className="space-y-2">
        {logs.map((log, index) => (
          <li key={index} className="p-2 bg-white rounded shadow">
            <p>Step: {log.step}</p>
            <p>Status: {log.status}</p>
            <p>Timestamp: {new Date(log.timestamp).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
