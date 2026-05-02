
-- Remove from realtime publication if present
DO $$ BEGIN
  EXECUTE 'ALTER PUBLICATION supabase_realtime DROP TABLE public.jobs';
EXCEPTION WHEN OTHERS THEN NULL; END $$;
DO $$ BEGIN
  EXECUTE 'ALTER PUBLICATION supabase_realtime DROP TABLE public.applications';
EXCEPTION WHEN OTHERS THEN NULL; END $$;
DO $$ BEGIN
  EXECUTE 'ALTER PUBLICATION supabase_realtime DROP TABLE public.saved_opportunities';
EXCEPTION WHEN OTHERS THEN NULL; END $$;

DROP TABLE IF EXISTS public.applications CASCADE;
DROP TABLE IF EXISTS public.saved_opportunities CASCADE;
DROP TABLE IF EXISTS public.jobs CASCADE;

DELETE FROM public.analytics_events
WHERE event_type IN ('opportunity_saved', 'opportunity_applied');
