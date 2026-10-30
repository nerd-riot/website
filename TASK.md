# Task: Build Nerd Riot Website & Release Management Platform

You are a senior full-stack engineer responsible for building the Nerd Riot website and its release management platform.

Your job is to inspect the existing repository, understand its current state, propose a concise implementation plan, and implement the solution incrementally.

Do not blindly scaffold or overwrite existing code.

## 1. Product context

Nerd Riot is a developer-focused brand for software, developer tools, libraries, SDKs, and macOS applications.

The website must support:

- Brand / product landing pages.
- Project and product documentation.
- Software releases and changelogs.
- macOS application downloads.
- Tauri auto-update distribution.
- Download history and download analytics.
- Patch / update history.
- User feedback submission.

The first application is a macOS app built with Tauri v2.

Design direction:
- Developer-first, modern, minimal, distinctive.
- Dark-first visual design.
- Clean typography and strong visual hierarchy.
- Avoid generic SaaS landing page templates.
- Fast loading, responsive, accessible.
- Keep the visual identity consistent across the website.

## 2. Technology stack

Use the following stack unless the existing repository has a compelling reason to differ.

| Layer | Technology |
|---|---|
| Frontend | Next.js, React, TypeScript |
| Styling | Tailwind CSS |
| UI components | shadcn/ui |
| Package manager | Bun |
| Runtime / hosting | Node.js on Vercel |
| Database | Supabase PostgreSQL |
| Binary storage | Cloudflare R2 |
| DNS | Cloudflare |
| CI/CD | GitHub Actions |
| Documentation | MDX |
| Desktop updater | Tauri v2 updater plugin |

Important:
- Do not introduce a separate Go backend for this MVP.
- Do not introduce Redis, Kafka, message brokers, or microservices.
- Use Next.js Route Handlers / Server Actions where appropriate.
- Supabase is the source of truth for release metadata and tracking.
- Cloudflare R2 is the source of truth for downloadable binaries.
- Never store large DMG or updater artifacts in Supabase Storage.

## 3. Website structure

Build the following pages:

### Public pages

- `/` — Nerd Riot homepage.
- `/projects` — List of projects.
- `/projects/[slug]` — Project detail page.
- `/releases` — Release overview.
- `/releases/[project]/[version]` — Release detail and changelog.
- `/download/[project]` — Download page.
- `/docs` — Documentation entry point.
- `/feedback` — Feedback form.

The homepage should introduce Nerd Riot as a developer-focused software brand, not just a single application.

Project pages should be reusable so new products can be added without redesigning the application.

### Admin pages

Create a minimal protected admin area:

- `/admin`
- `/admin/projects`
- `/admin/releases`
- `/admin/downloads`
- `/admin/feedback`

Admin capabilities:
- Create and update projects.
- Create releases and manage release assets.
- Publish / unpublish releases.
- View download statistics.
- Review and update feedback status.

Do not build a complex CMS. Keep admin functionality focused on release operations.

## 4. Supabase database design

Create SQL migrations for the following tables.

### `projects`

Fields:
- `id` UUID primary key.
- `slug` unique.
- `name`.
- `description`.
- `website_url`.
- `repository_url`.
- `is_published`.
- `created_at`.
- `updated_at`.

### `releases`

Fields:
- `id` UUID primary key.
- `project_id` references projects.
- `version`.
- `channel`: stable, beta, alpha.
- `release_notes` (Markdown).
- `is_published`.
- `published_at`.
- `created_at`.
- `updated_at`.

Add a unique constraint for project + version + channel where appropriate.

### `release_assets`

Fields:
- `id` UUID primary key.
- `release_id` references releases.
- `platform`: macos, windows, linux.
- `architecture`: arm64, x64, universal.
- `asset_type`: dmg, updater_bundle, installer, archive.
- `storage_key`.
- `download_url` only if required; prefer deriving URLs from storage configuration.
- `file_size`.
- `sha256`.
- `signature` where applicable.
- `created_at`.

Prevent duplicate assets for the same release/platform/architecture/type combination.

### `download_events`

Fields:
- `id` UUID primary key.
- `project_id`.
- `release_id`.
- `asset_id`.
- `event_type`.
- `source`: website, updater, direct.
- `platform`.
- `architecture`.
- `user_agent`.
- `referer`.
- `country_code`.
- `created_at`.

Supported events:
- `download_requested`
- `update_check`
- `update_available`
- `update_download_started`
- `update_installed`

Important:
- A download request is not proof that the download completed.
- An update download is not proof that installation succeeded.
- `update_installed` is a client-reported event, not cryptographic proof.
- Do not store raw IP addresses unless there is a documented requirement.
- Add indexes for common analytics queries.

### `feedback`

Fields:
- `id` UUID primary key.
- `project_id`.
- `release_id` nullable.
- `category`: bug, suggestion, general, other.
- `rating` nullable.
- `email` nullable.
- `message`.
- `status`: new, reviewing, resolved, closed.
- `created_at`.
- `updated_at`.

Add appropriate constraints and indexes.

## 5. Security and database access

Implement security from the beginning.

- Enable Row Level Security on relevant tables.
- Public users must only read published projects and releases.
- Public users must not directly insert arbitrary records into admin-managed tables.
- Feedback submission must go through a validated server endpoint.
- Download tracking must go through a server endpoint or Cloudflare Worker.
- Admin operations must require authentication and authorization.
- Never expose the Supabase `service_role` key to the browser.
- Keep all secrets in environment variables.
- Validate all request payloads using Zod or an equivalent schema validator.
- Apply rate limiting to public feedback and tracking endpoints.
- Do not allow arbitrary R2 object keys or arbitrary redirect URLs from user input.

Create an initial admin authorization strategy that is simple and documented. Do not build a full RBAC system.

## 6. Cloudflare R2 integration

Use R2 for:
- macOS DMG files.
- Tauri updater bundles.
- Tauri updater signatures / manifests where appropriate.
- Other release assets.

Requirements:
- Use a private R2 bucket.
- Configure a custom download domain, e.g. `download.nerd-riot.dev`.
- Do not expose the R2 bucket's internal endpoint or account details in the UI.
- Use immutable, versioned object keys.

Suggested object structure:

`/{project}/{version}/{platform}/{architecture}/{filename}`

Example:

`/my-app/1.0.0/darwin/arm64/my-app_1.0.0_aarch64.dmg`

Do not proxy large binary files through Next.js.

For website downloads:
1. Client requests `/api/downloads/{assetId}`.
2. Server validates that the asset belongs to a published release.
3. Server records `download_requested`.
4. Server returns a redirect to the configured download domain.
5. Browser downloads directly from R2/CDN.

For accurate request-level tracking of updater artifact downloads, consider a Cloudflare Worker in front of R2. Do not claim that a request event means a completed download.

## 7. Tauri v2 auto-update integration

Support the official `tauri-plugin-updater` for Tauri v2.

Requirements:
- Generate updater artifacts during release builds.
- Support macOS Apple Silicon and Intel where applicable.
- Use Tauri's official update manifest format.
- Store updater artifacts in R2.
- Publish update manifests only after all referenced artifacts are uploaded successfully.
- Keep the updater endpoint stable.
- Support stable and beta channels if practical.

Security:
- Generate a signing key for Tauri updater.
- Store the private signing key only in GitHub Actions Secrets.
- Embed only the public key in the Tauri application configuration.
- Never commit the private key.
- Never upload the private key to R2.
- Preserve artifact signatures exactly as generated.

The website's release metadata and Tauri updater manifest must not drift apart.

Document:
- Tauri configuration changes.
- Required capabilities and permissions.
- Frontend updater flow.
- Signing key setup.
- Release publishing process.

Do not modify an existing Tauri application blindly. If its repository is separate, provide the required integration changes and documentation.

## 8. API design

Implement the following APIs.

### Public APIs

- `GET /api/projects`
- `GET /api/projects/[slug]`
- `GET /api/releases`
- `GET /api/releases/[project]/latest`
- `GET /api/downloads/[assetId]`
- `POST /api/feedback`
- `POST /api/updates/events`

### Admin APIs

- `POST /api/admin/projects`
- `PATCH /api/admin/projects/[id]`
- `POST /api/admin/releases`
- `PATCH /api/admin/releases/[id]`
- `POST /api/admin/releases/[id]/publish`
- `POST /api/admin/releases/[id]/unpublish`

Use consistent response structures and error handling.

Do not expose database internals in API responses.

## 9. Download and update analytics

Provide an admin dashboard with:

- Total download requests.
- Downloads by project.
- Downloads by release/version.
- Downloads by platform and architecture.
- Daily download request trend.
- Update check count.
- Update installation reports.
- Feedback count and status.

Clearly distinguish:
- Download requested.
- Update download started.
- Update installed (client-reported).

Do not label all these events as successful downloads.

Start with SQL aggregation queries. Do not add a dedicated analytics infrastructure.

## 10. Feedback experience

Build a simple feedback form.

Fields:
- Project.
- Category.
- Rating (optional).
- Email (optional).
- Message.

Requirements:
- Clear validation and error messages.
- Loading and success states.
- Spam protection / rate limiting.
- Mobile-friendly layout.
- Store submissions in Supabase.
- Admin can review and update feedback status.

Do not require users to create an account to submit feedback.

## 11. CI/CD and release workflow

Create GitHub Actions workflows for:

### Website

- Install dependencies with Bun.
- Run lint.
- Run type checks.
- Run tests.
- Build Next.js.
- Deploy through Vercel integration.

### Desktop application release

Trigger on version tags, for example `v1.0.0`.

Workflow:
1. Validate tag and version.
2. Build the Tauri application for supported macOS architectures.
3. Generate updater artifacts and signatures.
4. Generate DMG installers.
5. Calculate SHA-256 checksums.
6. Upload artifacts to R2.
7. Generate the Tauri updater manifest.
8. Publish release metadata to Supabase.
9. Publish the updater manifest only after artifact upload succeeds.
10. Run basic smoke checks.

Use immutable artifact keys. Do not overwrite an existing published release silently.

Make the workflow idempotent where practical.

If code signing and notarization credentials are unavailable, document the required secrets and leave a clear, safe setup path. Do not pretend that unsigned builds are production-ready.

## 12. Environment variables

Create `.env.example` with documented variables, including:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_R2_ACCESS_KEY_ID`
- `CLOUDFLARE_R2_SECRET_ACCESS_KEY`
- `CLOUDFLARE_R2_BUCKET`
- `CLOUDFLARE_R2_ENDPOINT`
- `DOWNLOAD_BASE_URL`
- `ADMIN_EMAILS` or the chosen admin authorization configuration.

Never put secrets in `NEXT_PUBLIC_*` variables.

## 13. Testing

At minimum, add tests for:

- Public project/release visibility.
- Unpublished release access restrictions.
- Download endpoint validation.
- Download event creation.
- Feedback validation and submission.
- Admin authorization.
- Release publishing flow.
- Updater manifest generation.

Include integration tests for critical database operations where practical.

## 14. Documentation

Create:

- `README.md` — local development and architecture overview.
- `docs/architecture.md` — system components and data flow.
- `docs/database.md` — schema and relationships.
- `docs/deployment.md` — Vercel, Supabase, Cloudflare setup.
- `docs/release-process.md` — desktop release workflow.
- `docs/tauri-updater.md` — updater integration and signing.
- `docs/security.md` — secrets, RLS, admin authorization, download security.

Documentation should be practical and executable, not generic descriptions.

## 15. Implementation principles

Follow these principles:

1. Inspect before changing.
2. Keep architecture simple.
3. Avoid premature abstractions.
4. Avoid unnecessary dependencies.
5. Use TypeScript strictly.
6. Keep database migrations version-controlled.
7. Keep server-only logic separate from client code.
8. Never expose secrets.
9. Make release publishing safe and repeatable.
10. Prefer maintainability over cleverness.

Do not implement features outside the agreed scope without explaining why they are necessary.

## 16. Execution plan

Work in phases.

**Phase 0 — Repository assessment**
- Inspect repository structure and existing implementation.
- Identify whether a Next.js project already exists.
- Identify existing Tauri application integration requirements.
- Report gaps and proposed changes.
- Do not overwrite existing work.

**Phase 1 — Foundation**
- Next.js setup and visual system.
- Supabase client/server integration.
- Database migrations.
- Environment configuration.
- Authentication and minimal admin protection.

**Phase 2 — Public website**
- Homepage.
- Projects.
- Releases and changelogs.
- Download pages.
- Feedback form.

**Phase 3 — Release and tracking**
- R2 integration.
- Download redirect and tracking.
- Release asset management.
- Tauri updater manifest generation.
- Update telemetry.

**Phase 4 — Admin and analytics**
- Release management.
- Download analytics.
- Feedback management.

**Phase 5 — CI/CD and hardening**
- GitHub Actions.
- Deployment documentation.
- Security review.
- Tests.
- Production readiness checklist.

After each phase:
- Run lint, type checks, tests, and build.
- Fix regressions before continuing.
- Summarize files changed and decisions made.
- List remaining blockers.

## 17. First response required

Before implementation, return:

1. Current repository assessment.
2. Proposed architecture.
3. Database ERD / relationships.
4. Implementation phases and dependencies.
5. Risks, assumptions, and missing credentials.
6. Any decisions that require my approval.

After that, proceed with Phase 1 without waiting for approval on routine implementation details.

**Definition of Done**

The result should be a deployable Nerd Riot website with working project/release pages, Supabase-backed release history, R2-backed downloads, download tracking, feedback submission, a minimal admin area, and a documented Tauri updater release workflow.

Do not mark a feature as complete unless it has been implemented and tested. Clearly distinguish working functionality from configuration that still requires external credentials.
