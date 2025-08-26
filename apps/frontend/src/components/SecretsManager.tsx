import React, { useState } from "react";

interface Secret {
  id: string;
  name: string;
  value: string;
}

export const SecretsManager: React.FC = () => {
  const [secrets, setSecrets] = useState<Secret[]>([]);
  const [newSecret, setNewSecret] = useState({ name: "", value: "" });

  const fetchSecrets = async () => {
    const response = await fetch("http://localhost:4000/api/secrets");
    const data = await response.json();
    setSecrets(data);
  };

  const addSecret = async () => {
    await fetch("http://localhost:4000/api/secrets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSecret),
    });
    setNewSecret({ name: "", value: "" });
    fetchSecrets();
  };

  const deleteSecret = async (id: string) => {
    await fetch(`http://localhost:4000/api/secrets/${id}`, {
      method: "DELETE",
    });
    fetchSecrets();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Secrets Manager</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={newSecret.name}
          onChange={(e) => setNewSecret({ ...newSecret, name: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Value"
          value={newSecret.value}
          onChange={(e) =>
            setNewSecret({ ...newSecret, value: e.target.value })
          }
          className="border p-2 mr-2"
        />
        <button
          onClick={addSecret}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Secret
        </button>
      </div>
      <div className="space-y-4">
        {secrets.map((secret) => (
          <div key={secret.id} className="p-4 border rounded-lg bg-gray-50">
            <p>
              <strong>Name:</strong> {secret.name}
            </p>
            <p>
              <strong>Value:</strong> {secret.value}
            </p>
            <button
              onClick={() => deleteSecret(secret.id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
