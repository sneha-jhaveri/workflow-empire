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

-- Additional tables
CREATE TABLE workspaces (
    id uuid primary key default gen_random_uuid (),
    name text not null,
    created_at timestamptz not null default now()
);

CREATE TABLE users (
    id uuid primary key default gen_random_uuid (),
    workspace_id uuid not null references workspaces (id) on delete cascade,
    email text unique not null,
    role text not null default 'owner',
    created_at timestamptz not null default now()
);

CREATE TABLE run_steps (
    id uuid primary key default gen_random_uuid (),
    run_id uuid not null references workflow_runs (id) on delete cascade,
    node_id text not null,
    status text not null,
    started_at timestamptz not null default now(),
    finished_at timestamptz,
    output_json jsonb,
    logs jsonb,
    retry_count int not null default 0
);

CREATE TABLE connections (
    id uuid primary key default gen_random_uuid (),
    workspace_id uuid not null references workspaces (id) on delete cascade,
    provider text not null,
    metadata jsonb,
    secrets_encrypted bytea not null,
    created_at timestamptz not null default now(),
    unique (workspace_id, provider)
);

CREATE TABLE idempotency_keys (
    id uuid primary key default gen_random_uuid (),
    workspace_id uuid not null references workspaces (id) on delete cascade,
    key text not null,
    created_at timestamptz not null default now(),
    unique (workspace_id, key)
);

-- Indexes for performance
CREATE INDEX idx_workflows_owner ON workflows (owner_id);

CREATE INDEX idx_runs_workflow ON workflow_runs (workflow_id);

CREATE INDEX idx_runs_status ON workflow_runs (status);