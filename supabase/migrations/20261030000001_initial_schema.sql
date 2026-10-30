-- ====================================================================
-- NERD RIOT — Database Schema Migration
-- Tables: projects, releases, release_assets, download_events, feedback
-- Includes: Indexes, RLS Policies, Constraints, Triggers
-- ====================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT,
    website_url TEXT,
    repository_url TEXT,
    is_published BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. RELEASES TABLE
CREATE TABLE IF NOT EXISTS public.releases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    version TEXT NOT NULL,
    channel TEXT NOT NULL DEFAULT 'stable' CHECK (channel IN ('stable', 'beta', 'alpha')),
    release_notes TEXT,
    is_published BOOLEAN NOT NULL DEFAULT false,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_project_version_channel UNIQUE (project_id, version, channel)
);

-- 3. RELEASE ASSETS TABLE
CREATE TABLE IF NOT EXISTS public.release_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    release_id UUID NOT NULL REFERENCES public.releases(id) ON DELETE CASCADE,
    platform TEXT NOT NULL CHECK (platform IN ('macos', 'windows', 'linux')),
    architecture TEXT NOT NULL CHECK (architecture IN ('arm64', 'x64', 'universal')),
    asset_type TEXT NOT NULL CHECK (asset_type IN ('dmg', 'updater_bundle', 'installer', 'archive')),
    storage_key TEXT NOT NULL,
    download_url TEXT,
    file_size BIGINT,
    sha256 TEXT,
    signature TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_release_platform_arch_type UNIQUE (release_id, platform, architecture, asset_type)
);

-- 4. DOWNLOAD EVENTS TABLE (Analytics / Telemetry)
CREATE TABLE IF NOT EXISTS public.download_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
    release_id UUID REFERENCES public.releases(id) ON DELETE SET NULL,
    asset_id UUID REFERENCES public.release_assets(id) ON DELETE SET NULL,
    event_type TEXT NOT NULL CHECK (
        event_type IN ('download_requested', 'update_check', 'update_available', 'update_download_started', 'update_installed')
    ),
    source TEXT NOT NULL DEFAULT 'website' CHECK (source IN ('website', 'updater', 'direct')),
    platform TEXT,
    architecture TEXT,
    user_agent TEXT,
    referer TEXT,
    country_code VARCHAR(10),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. FEEDBACK TABLE
CREATE TABLE IF NOT EXISTS public.feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id TEXT NOT NULL,
    release_id UUID REFERENCES public.releases(id) ON DELETE SET NULL,
    category TEXT NOT NULL DEFAULT 'general' CHECK (category IN ('bug', 'suggestion', 'general', 'other')),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    email TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'resolved', 'closed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ====================================================================
-- INDEXES FOR PERFORMANCE & ANALYTICS
-- ====================================================================

CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_is_published ON public.projects(is_published);

CREATE INDEX IF NOT EXISTS idx_releases_project_id ON public.releases(project_id);
CREATE INDEX IF NOT EXISTS idx_releases_published ON public.releases(is_published, published_at DESC);

CREATE INDEX IF NOT EXISTS idx_release_assets_release_id ON public.release_assets(release_id);
CREATE INDEX IF NOT EXISTS idx_release_assets_platform ON public.release_assets(platform, architecture);

CREATE INDEX IF NOT EXISTS idx_download_events_project ON public.download_events(project_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_download_events_asset ON public.download_events(asset_id);
CREATE INDEX IF NOT EXISTS idx_download_events_type_created ON public.download_events(event_type, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_feedback_project ON public.feedback(project_id, status);
CREATE INDEX IF NOT EXISTS idx_feedback_created ON public.feedback(created_at DESC);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.releases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.release_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.download_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Public can read published projects
CREATE POLICY "Public users can view published projects"
    ON public.projects FOR SELECT
    USING (is_published = true);

-- Public can read published releases
CREATE POLICY "Public users can view published releases"
    ON public.releases FOR SELECT
    USING (is_published = true);

-- Public can read assets of published releases
CREATE POLICY "Public users can view assets of published releases"
    ON public.release_assets FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.releases r
            WHERE r.id = release_assets.release_id AND r.is_published = true
        )
    );

-- Insert into download_events allowed from server (service_role) or anon tracking
CREATE POLICY "Allow recording download events"
    ON public.download_events FOR INSERT
    WITH CHECK (true);

-- Insert into feedback allowed
CREATE POLICY "Allow public feedback submission"
    ON public.feedback FOR INSERT
    WITH CHECK (true);

-- ====================================================================
-- INITIAL SEED DATA FOR DBNERD
-- ====================================================================

INSERT INTO public.projects (id, slug, name, description, website_url, repository_url, is_published)
VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'dbnerd',
    'DBNerd',
    'The ultra-fast, lightweight native database studio built with Tauri v2 + Rust Core.',
    'https://nerd-riot.dev/download/dbnerd',
    'https://github.com/nerd-riot/db-nerd',
    true
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.releases (id, project_id, version, channel, release_notes, is_published, published_at)
VALUES (
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    '0.1.0',
    'beta',
    'Initial public preview release of DBNerd. Features 120 FPS data grid, Safe Mode for production, and multi-database connectivity.',
    true,
    timezone('utc'::text, now())
)
ON CONFLICT (project_id, version, channel) DO NOTHING;
