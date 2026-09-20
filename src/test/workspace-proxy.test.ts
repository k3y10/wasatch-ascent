// @vitest-environment node
import { afterEach, expect, it, vi } from 'vitest';
import handler from '../../api/workspace/[...path]';
function response() { return { code: 200, headers: {} as Record<string,string|string[]>, body: undefined as unknown, setHeader(k:string,v:string|string[]){this.headers[k]=v;}, status(code:number){this.code=code;return this;}, json(v:unknown){this.body=v;}, end(v?:string){this.body=v;} }; }
afterEach(() => { delete process.env.TERRASATCH_WORKSPACE_API_URL; vi.unstubAllGlobals(); });
it('fails closed without an explicitly configured workspace API', async () => { const fetcher=vi.fn();vi.stubGlobal('fetch',fetcher); const res=response();await handler({method:'GET',url:'/api/workspace/session',headers:{}},res);expect(res.code).toBe(503);expect(fetcher).not.toHaveBeenCalled(); });
it('rejects cross-origin writes before forwarding a session', async () => { process.env.TERRASATCH_WORKSPACE_API_URL='https://staging.example.com'; const fetcher=vi.fn();vi.stubGlobal('fetch',fetcher);const res=response(); await handler({method:'POST',url:'/api/workspace/login',headers:{origin:'https://evil.example.com',host:'preview.example.com'},body:{}},res);expect(res.code).toBe(403);expect(fetcher).not.toHaveBeenCalled(); });
it('does not proxy arbitrary API or admin paths', async () => { process.env.TERRASATCH_WORKSPACE_API_URL='https://staging.example.com';const fetcher=vi.fn();vi.stubGlobal('fetch',fetcher);const res=response();await handler({method:'GET',url:'/api/workspace/admin',headers:{}},res);expect(res.code).toBe(404);expect(fetcher).not.toHaveBeenCalled(); });
it('forwards only member cookie and CSRF to the configured origin and never caches', async () => { process.env.TERRASATCH_WORKSPACE_API_URL='https://staging.example.com';const fetcher=vi.fn().mockResolvedValue({status:200,headers:{getSetCookie:()=>['session=signed; HttpOnly; Secure; SameSite=Lax']},text:async()=>'{"user":null}'});vi.stubGlobal('fetch',fetcher);const res=response();await handler({method:'GET',url:'/api/workspace/session',headers:{cookie:'session=old',authorization:'Bearer do-not-forward'}},res);expect(String(fetcher.mock.calls[0][0])).toBe('https://staging.example.com/api/v1/workspace/session');expect(fetcher.mock.calls[0][1].headers.Authorization).toBeUndefined();expect(res.headers['Cache-Control']).toBe('no-store');expect(res.headers['Set-Cookie']).toEqual(['session=signed; HttpOnly; Secure; SameSite=Lax']); });

it('allows the scoped integration request authorize test and revoke routes while still using same-origin protection', async () => {
  process.env.TERRASATCH_WORKSPACE_API_URL='https://staging.example.com';
  const fetcher=vi.fn().mockResolvedValue({status:201,headers:{getSetCookie:()=>[]},text:async()=>'{"status":"requested"}'});
  vi.stubGlobal('fetch',fetcher);
  const res=response();
  const organization='11111111-1111-4111-8111-111111111111';
  await handler({
    method:'POST',
    url:`/api/workspace/organizations/${organization}/integrations`,
    headers:{origin:'https://preview.example.com',host:'preview.example.com','x-csrf-token':'csrf'},
    body:{provider:'google_drive',scope:'user'}
  },res);
  expect(res.code).toBe(201);
  expect(String(fetcher.mock.calls[0][0])).toBe(`https://staging.example.com/api/v1/workspace/organizations/${organization}/integrations`);


  fetcher.mockClear();
  fetcher.mockResolvedValue({status:200,headers:{getSetCookie:()=>[]},text:async()=>'{"url":"https://accounts.google.com/o/oauth2/v2/auth"}'});
  const authorize=response();
  const connection='22222222-2222-4222-8222-222222222222';
  await handler({
    method:'POST',
    url:`/api/workspace/organizations/${organization}/integrations/${connection}/authorize`,
    headers:{origin:'https://preview.example.com',host:'preview.example.com','x-csrf-token':'csrf'},
    body:{}
  },authorize);
  expect(authorize.code).toBe(200);
  expect(String(fetcher.mock.calls[0][0])).toBe(`https://staging.example.com/api/v1/workspace/organizations/${organization}/integrations/${connection}/authorize`);

  fetcher.mockClear();
  fetcher.mockResolvedValue({status:200,headers:{getSetCookie:()=>[]},text:async()=>'{"status":"connected"}'});
  const check=response();
  await handler({
    method:'POST',
    url:`/api/workspace/organizations/${organization}/integrations/${connection}/test`,
    headers:{origin:'https://preview.example.com',host:'preview.example.com','x-csrf-token':'csrf'},
    body:{}
  },check);
  expect(check.code).toBe(200);
  expect(String(fetcher.mock.calls[0][0])).toBe(`https://staging.example.com/api/v1/workspace/organizations/${organization}/integrations/${connection}/test`);

  fetcher.mockClear();
  fetcher.mockResolvedValue({status:201,headers:{getSetCookie:()=>[]},text:async()=>'{"status":"delivered"}'});
  const slack=response();
  await handler({
    method:'POST',
    url:`/api/workspace/organizations/${organization}/integrations/${connection}/slack/messages`,
    headers:{origin:'https://preview.example.com',host:'preview.example.com','x-csrf-token':'csrf'},
    body:{request_id:'33333333-3333-4333-8333-333333333333',text:'Integration test'}
  },slack);
  expect(slack.code).toBe(201);
  expect(String(fetcher.mock.calls[0][0])).toBe(`https://staging.example.com/api/v1/workspace/organizations/${organization}/integrations/${connection}/slack/messages`);

  fetcher.mockClear();
  fetcher.mockResolvedValue({status:201,headers:{getSetCookie:()=>[]},text:async()=>'{"status":"delivered"}'});
  const drive=response();
  await handler({
    method:'POST',
    url:`/api/workspace/organizations/${organization}/integrations/${connection}/drive/files`,
    headers:{origin:'https://preview.example.com',host:'preview.example.com','x-csrf-token':'csrf'},
    body:{request_id:'44444444-4444-4444-8444-444444444444',name:'test.txt',content:'test',mime_type:'text/plain'}
  },drive);
  expect(drive.code).toBe(201);
  expect(String(fetcher.mock.calls[0][0])).toBe(`https://staging.example.com/api/v1/workspace/organizations/${organization}/integrations/${connection}/drive/files`);

  fetcher.mockClear();
  fetcher.mockResolvedValue({status:201,headers:{getSetCookie:()=>[]},text:async()=>'{"status":"delivered","operation":"document.create"}'});
  const execute=response();
  await handler({
    method:'POST',
    url:`/api/workspace/organizations/${organization}/integrations/execute`,
    headers:{origin:'https://preview.example.com',host:'preview.example.com','x-csrf-token':'csrf'},
    body:{request_id:'55555555-5555-4555-8555-555555555555',capability:'document.create',payload:{name:'test.txt',content:'test',mime_type:'text/plain'}}
  },execute);
  expect(execute.code).toBe(201);
  expect(String(fetcher.mock.calls[0][0])).toBe(`https://staging.example.com/api/v1/workspace/organizations/${organization}/integrations/execute`);

  fetcher.mockClear();
  fetcher.mockResolvedValue({status:200,headers:{getSetCookie:()=>[]},text:async()=>'{"status":"revoked"}'});
  const revoke=response();
  await handler({
    method:'POST',
    url:`/api/workspace/organizations/${organization}/integrations/${connection}/revoke`,
    headers:{origin:'https://preview.example.com',host:'preview.example.com','x-csrf-token':'csrf'},
    body:{}
  },revoke);
  expect(revoke.code).toBe(200);
  expect(String(fetcher.mock.calls[0][0])).toBe(`https://staging.example.com/api/v1/workspace/organizations/${organization}/integrations/${connection}/revoke`);
});
