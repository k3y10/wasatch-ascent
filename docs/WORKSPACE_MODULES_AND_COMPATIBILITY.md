# Workspace modules and compatibility

The field starter enables Map, Radio Log, Observations and Satchy. Workflows is optional. Account and Integrations remain reachable even if every optional module is hidden. Choices are saved in PostgreSQL by user and organization; they do not disable ingestion, change subscription entitlements or delete data.

## Shared data path

Edge/radio ingestion writes the API's Transmission and Transcript records. Engine interpretations live in OperationalEvent and action proposals in SatchyAction. The workspace reads these same tenant-scoped records; it does not create a second copy. Human notes preserve their original text and explicitly supplied coordinates. Chat exchanges persist privately per member and organization. Refresh records retrieves current database state; this iteration does not introduce a live push subscription.

The Integrations view reads actual registered Edge device names, enabled flags, versions and last heartbeats, plus source types present in recent records. Engine provider/model are configuration information, not a health assertion. Edge pairing and permissions remain in the existing administrator/device control plane. There is no invented third-party connector or one-click vendor installation. Optional industry integrations can be added to this structure after their actual adapters, permissions and entitlements exist.

## Demo preservation

Existing demo routes, access control and gallery are unchanged. The workspace links to the existing protected gallery; UAC and other industry demos remain distinct from private account records. UAC archive and UAC demo HTTP reads returned 200. API production health also returned 200. No production deployment, production database migration, or existing device retargeting was performed by this update.

## Verified

- API: 244 tests passed, including Edge, radio, engine, UAC, billing and workspace checks.
- Website: 24 tests, TypeScript and build passed. Existing React-refresh warnings remain.
- Isolated PostgreSQL staging: migration 0014 applied after a database backup; module preference persistence, hiding without deleting records, tenant isolation, secure login/logout and concurrent observation deduplication passed.
- Real staging Satchy request with qwen3:0.6b returned HTTP 200 in 13.54 seconds and saved private chat history. This verifies connectivity and persistence, not answer accuracy or operational fitness. The small model's response was imprecise and omitted a requested source citation; it needs quality evaluation before consequential use.
- Staging model CPU cap is now consistently recorded as 0.5 in Compose. It replaces the temporary runtime-only comparison setting. Production model configuration is unchanged.

## Still required

Physical Edge/radio acceptance with an authorized device; authenticated browser layout checks; a stronger Satchy quality benchmark and source citations; real connector installation/removal flows; transactional email account/domain configuration; password reset/resend; and authorized sandbox billing acceptance. Layout visibility must never be treated as an authorization boundary. UAC/public archive data must not be silently imported into a user's private account.
