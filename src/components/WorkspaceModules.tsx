import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { STARTER_MODULES, type WorkspaceData } from '@/lib/workspace';

const options = [
  ['Map', 'Place your observations on a geographic map.'],
  ['Radio Log', 'Review original reports received from connected sources.'],
  ['Observations', 'Capture and review field notes and interpretations.'],
  ['Workflows', 'Review recorded action proposals and approval status.'],
  ['Satchy', 'Ask about your recent workspace records.'],
];

export function WorkspaceModules({ modules, busy, onSave }: {
  modules: string[]; busy: boolean; onSave: (modules: string[]) => void;
}) {
  return <details className="rounded-lg border p-4">
    <summary className="cursor-pointer font-display text-xl">Customize your workspace</summary>
    <p className="mt-3 text-sm text-muted-foreground">Choose your views. Changes are saved to your account in this workspace. Hiding a view preserves all records and connections.</p>
    <div className="my-4 grid gap-3 sm:grid-cols-2">
      {options.map(([name, description]) => <label key={name} className="flex gap-3 rounded border p-3">
        <input type="checkbox" className="mt-1" checked={modules.includes(name)} disabled={busy}
          onChange={event => onSave(event.target.checked ? [...modules, name] : modules.filter(m => m !== name))} />
        <span><strong>{name}</strong><span className="block text-sm text-muted-foreground">{description}</span></span>
      </label>)}
    </div>
    <Button variant="outline" disabled={busy} onClick={() => onSave([...STARTER_MODULES])}>Use field starter template</Button>
  </details>;
}

export function WorkspaceIntegrations({ data }: { data: WorkspaceData }) {
  const sources = [...new Set(data.records.map(record => record.source))];
  return <section className="space-y-5" aria-label="Connected integrations">
    <p>Connected sources feed the same account records used by the map, observations, workflows, and Satchy.</p>
    <article className="rounded-lg border p-4 space-y-3"><h2 className="font-display text-xl">TerraSatch Edge</h2>
      {data.integrations.devices.length === 0 ? <p>No Edge devices are registered to this workspace yet.</p> : data.integrations.devices.map(device => <div key={device.id} className="border-t pt-3">
        <strong>{device.name}</strong><p>{device.enabled ? 'Enabled' : 'Disabled'} · Agent {device.agent_version || 'version not reported'}</p>
        <p>Last heartbeat: {device.last_seen_at ? new Date(device.last_seen_at).toLocaleString() : 'Not received'}</p>
      </div>)}
      <Link className="text-primary underline" to="/edge">Edge setup and connection information</Link>
      <p className="text-sm text-muted-foreground">Pairing and device permissions are managed separately by an administrator. A past heartbeat does not guarantee the device is currently online.</p>
    </article>
    <article className="rounded-lg border p-4 space-y-2"><h2 className="font-display text-xl">Sources in your recent records</h2>
      <p>{sources.length ? sources.join(', ') : 'No source records received yet.'}</p>
      <p className="text-sm text-muted-foreground">Only sources present in the latest records are listed.</p>
    </article>
    <article className="rounded-lg border p-4 space-y-2"><h2 className="font-display text-xl">Satchy engine configuration</h2>
      <p>{data.integrations.engine.provider} · {data.integrations.engine.model}</p>
      <p className="text-sm text-muted-foreground">Configuration is not a health check. Chat reports an error if the model cannot answer; original records remain available.</p>
    </article>
    <article className="rounded-lg border p-4 space-y-2"><h2 className="font-display text-xl">Industry demonstrations</h2>
      <p>Explore UAC and other use cases separately from your private workspace records.</p>
      <Link className="text-primary underline" to="/demos">Open existing demonstrations</Link>
    </article>
  </section>;
}
