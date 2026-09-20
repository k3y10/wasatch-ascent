import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  STARTER_MODULES,
  type IntegrationRequestPayload,
  type IntegrationScope,
  type WorkspaceData,
} from '@/lib/workspace';

const options = [
  ['Map', 'Place your observations on a geographic map.'],
  ['Radio Log', 'Review original reports received from connected sources.'],
  ['Observations', 'Capture and review field notes and interpretations.'],
  ['Workflows', 'Review recorded action proposals and approval status.'],
  ['Satchy', 'Ask about your recent workspace records.'],
];

export function WorkspaceModules({ modules, busy, onSave }: {
  modules: string[];
  busy: boolean;
  onSave: (modules: string[]) => void;
}) {
  return <details className="rounded-lg border p-4">
    <summary className="cursor-pointer font-display text-xl">Customize your workspace</summary>
    <p className="mt-3 text-sm text-muted-foreground">
      Choose your views. Changes are saved to your account in this workspace. Hiding a view preserves all records and connections.
    </p>
    <div className="my-4 grid gap-3 sm:grid-cols-2">
      {options.map(([name, description]) => <label key={name} className="flex gap-3 rounded border p-3">
        <input
          type="checkbox"
          className="mt-1"
          checked={modules.includes(name)}
          disabled={busy}
          onChange={event => onSave(event.target.checked ? [...modules, name] : modules.filter(m => m !== name))}
        />
        <span>
          <strong>{name}</strong>
          <span className="block text-sm text-muted-foreground">{description}</span>
        </span>
      </label>)}
    </div>
    <Button variant="outline" disabled={busy} onClick={() => onSave([...STARTER_MODULES])}>
      Use field starter template
    </Button>
  </details>;
}

function scopeLabel(scope: IntegrationScope, teamId: string | null, data: WorkspaceData) {
  if (scope === 'user') return 'Personal';
  if (scope === 'organization') return 'Organization';
  return (data.teams ?? []).find(team => team.id === teamId)?.name || 'Team';
}

export function WorkspaceIntegrations({
  data,
  busy,
  canWrite,
  onRequest,
  onRevoke,
}: {
  data: WorkspaceData;
  busy: boolean;
  canWrite: boolean;
  onRequest: (payload: IntegrationRequestPayload) => Promise<void>;
  onRevoke: (connectionId: string) => Promise<void>;
}) {
  const sources = [...new Set(data.records.map(record => record.source))];
  const catalog = data.integrations.catalog ?? [];
  const connections = data.integrations.connections ?? [];
  const teams = data.teams ?? [];
  const requestable = useMemo(
    () => catalog.filter(provider => provider.setup_status !== 'managed'),
    [catalog],
  );
  const isAdmin = ['owner', 'admin'].includes(data.role);
  const initialProvider = requestable[0]?.key || '';
  const [providerKey, setProviderKey] = useState(initialProvider);
  const [scope, setScope] = useState<IntegrationScope>('user');
  const [teamId, setTeamId] = useState('');
  const [displayName, setDisplayName] = useState('');

  const provider = requestable.find(item => item.key === providerKey) || requestable[0];
  const allowedScopes = provider
    ? provider.scopes.filter(candidate => candidate === 'user' || isAdmin)
    : [];

  const effectiveScope = allowedScopes.includes(scope)
    ? scope
    : allowedScopes[0] || 'user';

  function chooseProvider(nextProviderKey: string) {
    setProviderKey(nextProviderKey);
    const next = requestable.find(item => item.key === nextProviderKey);
    const nextScopes = next?.scopes.filter(candidate => candidate === 'user' || isAdmin) || [];
    setScope(nextScopes[0] || 'user');
    setTeamId('');
  }

  async function submitRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!provider || !allowedScopes.length) return;
    await onRequest({
      provider: provider.key,
      scope: effectiveScope,
      team_id: effectiveScope === 'team' ? teamId || null : null,
      display_name: displayName.trim() || undefined,
      configuration: {},
    });
    setDisplayName('');
  }

  return <section className="space-y-5" aria-label="Connected integrations">
    <p>
      Integrations can be scoped to one person, an operating team, or the organization. Personal connections stay attached
      to the member who created them; team and organization connections require an administrator.
    </p>

    <article className="rounded-lg border p-4 space-y-3">
      <h2 className="font-display text-xl">TerraSatch Edge</h2>
      {data.integrations.devices.length === 0 ? <p>No Edge devices are registered to this workspace yet.</p> : data.integrations.devices.map(device => <div key={device.id} className="border-t pt-3">
        <strong>{device.name}</strong>
        <p>{device.enabled ? 'Enabled' : 'Disabled'} · Agent {device.agent_version || 'version not reported'}</p>
        <p>Last heartbeat: {device.last_seen_at ? new Date(device.last_seen_at).toLocaleString() : 'Not received'}</p>
      </div>)}
      <Link className="text-primary underline" to="/edge">Edge setup and connection information</Link>
      <p className="text-sm text-muted-foreground">
        Edge is TerraSatch-managed. Pairing and device permissions remain separate from external provider connections.
      </p>
    </article>

    <article className="rounded-lg border p-4 space-y-4">
      <div>
        <h2 className="font-display text-xl">Provider connections</h2>
        <p className="text-sm text-muted-foreground">
          Request the provider and scope here. TerraSatch never asks you to paste provider passwords, API keys, private keys,
          or OAuth tokens into this form. Provider authorization is completed server-side when that connector is enabled.
        </p>
      </div>

      {requestable.length > 0 && <form className="grid gap-3 md:grid-cols-2" onSubmit={submitRequest}>
        <label className="space-y-1">
          <span className="text-sm">Provider</span>
          <select
            className="w-full rounded border bg-card p-2"
            value={provider?.key || ''}
            disabled={busy || !canWrite}
            onChange={event => chooseProvider(event.target.value)}
          >
            {requestable.map(item => <option key={item.key} value={item.key}>
              {item.name}{item.setup_status === 'planned' ? ' · planned' : ''}
            </option>)}
          </select>
        </label>

        <label className="space-y-1">
          <span className="text-sm">Scope</span>
          <select
            className="w-full rounded border bg-card p-2"
            value={effectiveScope}
            disabled={busy || !canWrite || allowedScopes.length === 0}
            onChange={event => {
              setScope(event.target.value as IntegrationScope);
              if (event.target.value !== 'team') setTeamId('');
            }}
          >
            {allowedScopes.map(item => <option key={item} value={item}>
              {item === 'user' ? 'Personal' : item === 'team' ? 'Team' : 'Organization'}
            </option>)}
          </select>
        </label>

        {effectiveScope === 'team' && <label className="space-y-1">
          <span className="text-sm">Team</span>
          <select
            className="w-full rounded border bg-card p-2"
            value={teamId}
            required
            disabled={busy || !canWrite || teams.length === 0}
            onChange={event => setTeamId(event.target.value)}
          >
            <option value="">Choose a team</option>
            {teams.map(team => <option key={team.id} value={team.id}>{team.name}</option>)}
          </select>
        </label>}

        <label className="space-y-1">
          <span className="text-sm">Connection name (optional)</span>
          <input
            className="w-full rounded border bg-card p-2"
            value={displayName}
            maxLength={255}
            disabled={busy || !canWrite}
            placeholder={provider?.name || 'Provider connection'}
            onChange={event => setDisplayName(event.target.value)}
          />
        </label>

        <div className="md:col-span-2 flex flex-wrap items-center gap-3">
          <Button
            type="submit"
            disabled={
              busy ||
              !canWrite ||
              !provider ||
              allowedScopes.length === 0 ||
              (effectiveScope === 'team' && !teamId)
            }
          >
            {provider?.setup_status === 'planned' ? 'Request connection' : 'Connect provider'}
          </Button>
          {provider && <span className="text-sm text-muted-foreground">
            {provider.description}
          </span>}
        </div>
      </form>}

      {!canWrite && <p className="text-sm text-muted-foreground">
        Your workspace role can view integration status but cannot create or change connections.
      </p>}

      <div className="space-y-3">
        {connections.length === 0 ? <p>No external provider connections have been requested yet.</p> : connections.map(connection => {
          const canRevoke = isAdmin || connection.scope === 'user';
          return <div key={connection.id} className="rounded border p-3">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <strong>{connection.display_name}</strong>
                <p className="text-sm">
                  {connection.provider_name} · {scopeLabel(connection.scope, connection.team_id, data)} · {connection.status.replace(/_/g, ' ')}
                </p>
                {connection.provider_account_label && <p className="text-sm text-muted-foreground">
                  Provider account: {connection.provider_account_label}
                </p>}
                {connection.last_synced_at && <p className="text-sm text-muted-foreground">
                  Last sync: {new Date(connection.last_synced_at).toLocaleString()}
                </p>}
                {connection.last_error && <p className="text-sm text-destructive">{connection.last_error}</p>}
              </div>
              {connection.status !== 'revoked' && canRevoke && canWrite && <Button
                type="button"
                variant="outline"
                disabled={busy}
                onClick={() => onRevoke(connection.id)}
              >
                Revoke
              </Button>}
            </div>
          </div>;
        })}
      </div>
    </article>

    <article className="rounded-lg border p-4 space-y-2">
      <h2 className="font-display text-xl">Sources in your recent records</h2>
      <p>{sources.length ? sources.join(', ') : 'No source records received yet.'}</p>
      <p className="text-sm text-muted-foreground">Only sources present in the latest records are listed.</p>
    </article>

    <article className="rounded-lg border p-4 space-y-2">
      <h2 className="font-display text-xl">Satchy engine configuration</h2>
      <p>{data.integrations.engine.provider} · {data.integrations.engine.model}</p>
      <p className="text-sm text-muted-foreground">
        Configuration is not a health check. Chat reports an error if the model cannot answer; original records remain available.
      </p>
    </article>

    <article className="rounded-lg border p-4 space-y-2">
      <h2 className="font-display text-xl">Industry demonstrations</h2>
      <p>Explore UAC and other use cases separately from your private workspace records.</p>
      <Link className="text-primary underline" to="/demos">Open existing demonstrations</Link>
    </article>
  </section>;
}
