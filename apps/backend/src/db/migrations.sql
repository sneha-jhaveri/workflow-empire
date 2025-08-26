-- Workflows table
CREATE TABLE workflows (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    name TEXT NOT NULL,
    description TEXT,
    definition JSONB NOT NULL, -- full workflow graph
    owner_id UUID NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Workflow runs table
CREATE TABLE workflow_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    workflow_id UUID REFERENCES workflows (id) ON DELETE CASCADE,
    status TEXT NOT NULL CHECK (
        status IN (
            'pending',
            'running',
            'success',
            'failed'
        )
    ),
    input JSONB,
    output JSONB,
    error TEXT,
    started_at TIMESTAMPTZ DEFAULT now(),
    finished_at TIMESTAMPTZ
);

-- Workflow versions table
CREATE TABLE workflow_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    workflow_id UUID NOT NULL REFERENCES workflows (id) ON DELETE CASCADE,
    version INT NOT NULL,
    graph_json JSONB NOT NULL,
    created_by UUID,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE (workflow_id, version)
);

-- Run steps table
CREATE TABLE run_steps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    run_id UUID NOT NULL REFERENCES workflow_runs (id) ON DELETE CASCADE,
    node_id TEXT NOT NULL,
    status TEXT NOT NULL,
    started_at TIMESTAMPTZ DEFAULT now(),
    finished_at TIMESTAMPTZ,
    output_json JSONB,
    logs JSONB,
    retry_count INT DEFAULT 0
);

-- Connections table
CREATE TABLE connections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    workspace_id UUID NOT NULL,
    provider TEXT NOT NULL,
    metadata JSONB,
    secrets_encrypted BYTEA NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE (workspace_id, provider)
);

-- Idempotency keys table
CREATE TABLE idempotency_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    workspace_id UUID NOT NULL,
    key TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE (workspace_id, key)
);

-- Indexes for performance
CREATE INDEX idx_workflows_owner ON workflows (owner_id);

CREATE INDEX idx_runs_workflow ON workflow_runs (workflow_id);

CREATE INDEX idx_runs_status ON workflow_runs (status);