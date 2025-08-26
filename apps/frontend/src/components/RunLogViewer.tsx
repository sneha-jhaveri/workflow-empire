import React, { useEffect, useState } from "react";

interface RunLog {
  id: string;
  status: string;
  startedAt: string;
  finishedAt: string;
  logs: string;
}

export const RunLogViewer: React.FC = () => {
  const [logs, setLogs] = useState<RunLog[]>([]);

  useEffect(() => {
    // Fetch logs from the backend
    const fetchLogs = async () => {
      const response = await fetch("http://localhost:4000/api/runs");
      const data = await response.json();
      setLogs(data);
    };

    fetchLogs();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Run Logs</h2>
      <div className="space-y-4">
        {logs.map((log) => (
          <div key={log.id} className="p-4 border rounded-lg bg-gray-50">
            <p>
              <strong>Status:</strong> {log.status}
            </p>
            <p>
              <strong>Started At:</strong>{" "}
              {new Date(log.startedAt).toLocaleString()}
            </p>
            <p>
              <strong>Finished At:</strong>{" "}
              {new Date(log.finishedAt).toLocaleString()}
            </p>
            <pre className="bg-gray-100 p-2 rounded mt-2">{log.logs}</pre>
          </div>
        ))}
      </div>
    </div>
  );
};
