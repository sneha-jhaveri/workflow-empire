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

-- Indexes for performance
CREATE INDEX idx_workflows_owner ON workflows (owner_id);

CREATE INDEX idx_runs_workflow ON workflow_runs (workflow_id);

CREATE INDEX idx_runs_status ON workflow_runs (status);