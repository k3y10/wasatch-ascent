export type FieldRecord = {
  id: string;
  source: string;
  speaker: string | null;
  timestamp: string;
  original: string | null;
  location?: { latitude: number; longitude: number } | null;
  interpretations: {
    id: string;
    summary: string;
    type: string;
    latitude: number | null;
    longitude: number | null;
    location: string | null;
    confidence: number;
    spatial_status: string | null;
  }[];
};

export type MemberSession = {
  user: { id: string; name: string; email: string } | null;
  organizations: { id: string; name: string; role: string }[];
  csrf_token: string;
};

export type IntegrationScope = 'user' | 'team' | 'organization';

export type IntegrationProvider = {
  key: string;
  name: string;
  category: string;
  auth: string;
  setup_status: 'managed' | 'planned' | 'available';
  scopes: IntegrationScope[];
  capabilities: string[];
  description: string;
};

export type IntegrationConnection = {
  id: string;
  provider: string;
  provider_name: string;
  scope: IntegrationScope;
  team_id: string | null;
  owner_user_id: string | null;
  display_name: string;
  status: 'requested' | 'awaiting_authorization' | 'connected' | 'error' | 'disabled' | 'revoked';
  configuration: Record<string, unknown>;
  provider_account_label: string | null;
  provider_account_id: string | null;
  last_synced_at: string | null;
  last_error: string | null;
  enabled: boolean;
  created_at: string;
};

export type IntegrationAuthorization = {
  connection: IntegrationConnection;
  url: string;
  expires_at: string;
};

export type IntegrationDelivery = {
  id: string;
  connection_id: string;
  request_id: string;
  operation: 'slack_message' | 'drive_export' | 'document.create' | 'notification.send';
  status: 'pending' | 'delivered' | 'failed';
  external_id: string | null;
  response_metadata: Record<string, unknown>;
  last_error: string | null;
  created_at: string;
  updated_at: string;
};

export type IntegrationRequestPayload = {
  provider: string;
  scope: IntegrationScope;
  team_id?: string | null;
  display_name?: string;
  configuration?: Record<string, unknown>;
};

export type WorkspaceData = {
  modules: string[];
  integrations: {
    devices: {
      id: string;
      name: string;
      enabled: boolean;
      last_seen_at: string | null;
      agent_version: string | null;
    }[];
    engine: { provider: string; model: string };
    catalog?: IntegrationProvider[];
    connections?: IntegrationConnection[];
  };
  role: string;
  sites: { id: string; name: string }[];
  teams?: { id: string; name: string; site_id: string | null }[];
  subscription: {
    status: string;
    plan_code: string | null;
    service_access: string;
    trial_ends_at: string | null;
    current_period_end: string | null;
  };
  records: FieldRecord[];
  actions: {
    id: string;
    source_id: string;
    type: string;
    reason: string;
    message: string | null;
    status: string;
  }[];
  messages: { id: string; role: string; content: string }[];
};

export async function workspaceRequest<T>(path: string, csrf?: string, payload?: unknown): Promise<T> {
  const response = await fetch(`/api/workspace/${path}`, {
    method: payload === undefined ? 'GET' : 'POST',
    credentials: 'same-origin',
    cache: 'no-store',
    signal: AbortSignal.timeout(50000),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(csrf ? { 'X-CSRF-Token': csrf } : {}),
    },
    body: payload === undefined ? undefined : JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({ detail: 'The workspace service is unavailable.' }));
  if (!response.ok) {
    throw new Error(
      typeof data.detail === 'string'
        ? data.detail
        : data.error?.message || 'The request could not be completed.',
    );
  }
  return data as T;
}

export const STARTER_MODULES = ['Map', 'Radio Log', 'Observations', 'Satchy'];
