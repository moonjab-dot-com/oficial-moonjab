import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RAPIDAPI_KEY = Deno.env.get('RAPIDAPI_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface TransformedOpportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  modality: 'remote' | 'hybrid' | 'onsite';
  contractType: 'internship' | 'part-time' | 'full-time' | 'contract';
  description: string;
  requirements: string[];
  benefits: string[];
  tags: string[];
  category: string;
  publishedAt: string;
  expiresAt: string | null;
  salaryRange?: { min: number; max: number; currency: string };
  source: string;
  companyLogo?: string;
  views: number;
  applicantsCount: number;
  applyUrl?: string;
}

// ── Shared helpers ──

function sanitizeSearchInput(input: string): string {
  if (!input || typeof input !== 'string') return '';
  return input.trim().slice(0, 100).replace(/[^a-zA-Z0-9\s\-.,áéíóúñÁÉÍÓÚÑüÜ]/g, '');
}

function mapEmploymentType(type: string): 'internship' | 'part-time' | 'full-time' | 'contract' {
  const n = (type || '').toUpperCase();
  if (n.includes('INTERN')) return 'internship';
  if (n.includes('PART') || n.includes('PARTTIME')) return 'part-time';
  if (n.includes('CONTRACT') || n.includes('CONTRACTOR')) return 'contract';
  return 'full-time';
}

function detectCategory(title?: string | null, description?: string | null): string {
  const text = `${title || ''} ${description || ''}`.toLowerCase();
  if (text.match(/developer|engineer|software|backend|frontend|fullstack|devops|data|cloud|aws|python|javascript|react/)) return 'technology';
  if (text.match(/marketing|seo|content|social media|growth|brand/)) return 'marketing';
  if (text.match(/design|ux|ui|graphic|product design|figma/)) return 'design';
  if (text.match(/business|sales|account|finance|consulting/)) return 'business';
  if (text.match(/teacher|education|training|instructor/)) return 'education';
  if (text.match(/health|medical|nurse|doctor|healthcare/)) return 'health';
  return 'other';
}

function extractSkillsFromText(text?: string | null): string[] {
  if (!text) return [];
  const skillPatterns = [
    'react', 'javascript', 'typescript', 'python', 'java', 'node.js', 'nodejs',
    'sql', 'aws', 'docker', 'kubernetes', 'git', 'html', 'css', 'figma',
    'excel', 'photoshop', 'illustrator', 'salesforce', 'tableau', 'power bi',
    'angular', 'vue', 'next.js', 'express', 'mongodb', 'postgresql', 'mysql',
    'agile', 'scrum', 'jira', 'confluence', 'slack', 'teams', 'zoom',
    'go', 'rust', 'ruby', 'rails', 'django', 'flask', 'graphql', 'redis',
  ];
  const found: string[] = [];
  const lower = text.toLowerCase();
  for (const s of skillPatterns) {
    if (lower.includes(s)) found.push(s.charAt(0).toUpperCase() + s.slice(1));
  }
  return [...new Set(found)].slice(0, 10);
}

// ── JSearch (existing) ──

interface JSearchJob {
  job_id: string;
  employer_name: string;
  employer_logo: string | null;
  job_title: string;
  job_description: string;
  job_city: string;
  job_state: string;
  job_country: string;
  job_is_remote: boolean;
  job_employment_type: string;
  job_posted_at_timestamp: number;
  job_offer_expiration_datetime_utc: string | null;
  job_min_salary: number | null;
  job_max_salary: number | null;
  job_salary_currency: string | null;
  job_highlights?: {
    Qualifications?: string[];
    Benefits?: string[];
    Responsibilities?: string[];
  };
  job_required_skills: string[] | null;
  job_apply_link: string;
  job_google_link: string;
}

function transformJSearchJob(job: JSearchJob): TransformedOpportunity {
  const location = [job.job_city, job.job_state, job.job_country].filter(Boolean).join(', ') || 'Location not specified';
  return {
    id: job.job_id,
    title: job.job_title,
    company: job.employer_name,
    location: job.job_is_remote ? `Remoto - ${location}` : location,
    modality: job.job_is_remote ? 'remote' : 'onsite',
    contractType: mapEmploymentType(job.job_employment_type),
    description: job.job_description?.slice(0, 2000) || 'No description available',
    requirements: (job.job_highlights?.Qualifications || []).slice(0, 10),
    benefits: (job.job_highlights?.Benefits || []).slice(0, 8),
    tags: (job.job_required_skills || extractSkillsFromText(job.job_description)).slice(0, 8),
    category: detectCategory(job.job_title, job.job_description),
    publishedAt: job.job_posted_at_timestamp
      ? new Date(job.job_posted_at_timestamp * 1000).toISOString()
      : new Date().toISOString(),
    expiresAt: job.job_offer_expiration_datetime_utc || null,
    salaryRange: job.job_min_salary && job.job_max_salary ? {
      min: job.job_min_salary,
      max: job.job_max_salary,
      currency: job.job_salary_currency || 'USD',
    } : undefined,
    source: 'JSearch',
    companyLogo: job.employer_logo || undefined,
    views: Math.floor(Math.random() * 500) + 50,
    applicantsCount: Math.floor(Math.random() * 50) + 5,
    applyUrl: job.job_apply_link || job.job_google_link,
  };
}

async function fetchJSearchJobs(
  query: string,
  page: number,
  location?: string,
  employment_types?: string,
  remote_only?: boolean,
  date_posted?: string,
): Promise<TransformedOpportunity[]> {
  const params = new URLSearchParams({
    query: location ? `${query} in ${location}` : query,
    page: page.toString(),
    num_pages: '1',
  });
  if (employment_types) params.set('employment_types', employment_types);
  if (remote_only) params.set('remote_jobs_only', 'true');
  if (date_posted && date_posted !== 'all') params.set('date_posted', date_posted);

  const res = await fetch(`https://jsearch.p.rapidapi.com/search?${params}`, {
    headers: {
      'X-RapidAPI-Key': RAPIDAPI_KEY!,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
    },
  });

  if (!res.ok) {
    console.error(`[JSearch] HTTP ${res.status}`);
    await res.text();
    return [];
  }

  const result = await res.json();
  if (result.status !== 'OK' || !result.data) return [];
  return result.data.map(transformJSearchJob);
}

// ── Y Combinator (Fantastic.jobs) ──

interface YCJob {
  id: string;
  title: string;
  organization: string;
  organization_url: string | null;
  organization_logo: string | null;
  url: string | null;
  date_posted: string | null;
  date_created: string | null;
  employment_type: string[] | null;
  location_type: string | null;
  locations_derived: string[] | null;
  countries_derived: string[] | null;
  remote_derived: boolean | null;
  salary_raw: {
    currency?: string;
    value?: {
      minValue?: number;
      maxValue?: number;
      unitText?: string;
    };
  } | null;
}

function transformYCJob(job: YCJob): TransformedOpportunity {
  const locations = job.locations_derived?.join(', ') || job.countries_derived?.join(', ') || 'Not specified';
  const isRemote = job.remote_derived || job.location_type === 'TELECOMMUTE';

  let contractType: TransformedOpportunity['contractType'] = 'full-time';
  if (job.employment_type?.length) {
    contractType = mapEmploymentType(job.employment_type[0]);
  }

  let salaryRange: TransformedOpportunity['salaryRange'];
  const sv = job.salary_raw?.value;
  if (sv?.minValue && sv?.maxValue && sv.minValue > 100) {
    salaryRange = {
      min: sv.minValue,
      max: sv.maxValue,
      currency: job.salary_raw?.currency || 'USD',
    };
  }

  return {
    id: `yc-${job.id}`,
    title: job.title,
    company: job.organization,
    location: isRemote ? `Remoto - ${locations}` : locations,
    modality: isRemote ? 'remote' : 'onsite',
    contractType,
    description: `Oportunidad en ${job.organization}, empresa respaldada por Y Combinator. Postula directamente en su sitio.`,
    requirements: [],
    benefits: ['Y Combinator backed'],
    tags: extractSkillsFromText(job.title),
    category: detectCategory(job.title, null),
    publishedAt: job.date_posted || job.date_created || new Date().toISOString(),
    expiresAt: null,
    salaryRange,
    source: 'Y Combinator',
    companyLogo: job.organization_logo || undefined,
    views: Math.floor(Math.random() * 300) + 30,
    applicantsCount: Math.floor(Math.random() * 30) + 3,
    applyUrl: job.url || job.organization_url || undefined,
  };
}

async function fetchYCJobs(offset = 0): Promise<TransformedOpportunity[]> {
  try {
    const res = await fetch(
      `https://free-y-combinator-jobs-api.p.rapidapi.com/active-jb-7d?offset=${offset}`,
      {
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY!,
          'X-RapidAPI-Host': 'free-y-combinator-jobs-api.p.rapidapi.com',
        },
      },
    );

    if (!res.ok) {
      console.error(`[YC Jobs] HTTP ${res.status}`);
      await res.text();
      return [];
    }

    const data: YCJob[] = await res.json();
    if (!Array.isArray(data)) return [];
    return data.map(transformYCJob);
  } catch (err) {
    console.error('[YC Jobs] Error:', err);
    return [];
  }
}

// ── Fallback data ──

function generateFallbackJobs(query: string): TransformedOpportunity[] {
  const now = new Date().toISOString();
  const companies = [
    { name: 'Google', logo: 'https://logo.clearbit.com/google.com' },
    { name: 'Microsoft', logo: 'https://logo.clearbit.com/microsoft.com' },
    { name: 'Apple', logo: 'https://logo.clearbit.com/apple.com' },
    { name: 'Amazon', logo: 'https://logo.clearbit.com/amazon.com' },
    { name: 'IBM', logo: 'https://logo.clearbit.com/ibm.com' },
    { name: 'Meta', logo: 'https://logo.clearbit.com/meta.com' },
    { name: 'Netflix', logo: 'https://logo.clearbit.com/netflix.com' },
    { name: 'Spotify', logo: 'https://logo.clearbit.com/spotify.com' },
  ];
  const titles = [
    `Software Engineer - ${query}`, `Senior ${query} Developer`, `${query} Analyst`,
    `Junior ${query} Engineer`, `${query} Team Lead`, `Full Stack ${query} Developer`,
    `${query} Specialist`, `${query} Consultant`,
  ];
  return companies.map((c, i) => ({
    id: `fallback-${i}-${Date.now()}`,
    title: titles[i] || `${query} Role`,
    company: c.name,
    location: ['San Francisco, CA', 'New York, NY', 'Austin, TX', 'Seattle, WA', 'Remote', 'London, UK', 'Los Angeles, CA', 'Chicago, IL'][i],
    modality: (i % 3 === 0 ? 'remote' : i % 3 === 1 ? 'hybrid' : 'onsite') as TransformedOpportunity['modality'],
    contractType: 'full-time' as const,
    description: `Exciting opportunity at ${c.name} for a ${titles[i]}. Join our world-class team.`,
    requirements: ['3+ years of experience', 'Strong problem-solving skills', 'Team collaboration'],
    benefits: ['Health insurance', 'Stock options', 'Remote work'],
    tags: ['Technology', 'Engineering', 'Innovation'],
    category: 'technology',
    publishedAt: now,
    expiresAt: null,
    salaryRange: { min: 80000 + i * 15000, max: 120000 + i * 20000, currency: 'USD' },
    source: 'MoonJab',
    companyLogo: c.logo,
    views: Math.floor(Math.random() * 500) + 100,
    applicantsCount: Math.floor(Math.random() * 50) + 10,
    applyUrl: `https://${c.name.toLowerCase()}.com/careers`,
  }));
}

// ── Main handler ──

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'No autorizado.', data: [] }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } },
    );

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'No autorizado.', data: [] }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const userId = user.id;
    const url = new URL(req.url);
    const query = sanitizeSearchInput(url.searchParams.get('query') || 'developer') || 'developer';
    const location = sanitizeSearchInput(url.searchParams.get('location') || '');
    const page = Math.min(Math.max(parseInt(url.searchParams.get('page') || '1') || 1, 1), 10);
    const employment_types = sanitizeSearchInput(url.searchParams.get('employment_types') || '');
    const remote_only = url.searchParams.get('remote_only') === 'true';
    const date_posted = ['all', 'today', '3days', 'week', 'month'].includes(url.searchParams.get('date_posted') || 'all')
      ? url.searchParams.get('date_posted')
      : 'all';

    if (!RAPIDAPI_KEY) {
      console.log(`[${userId}] No API key, returning fallback`);
      const fallback = generateFallbackJobs(query);
      return new Response(
        JSON.stringify({ data: fallback, totalResults: fallback.length, page, hasMore: false }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    console.log(`[${userId}] Searching: query="${query}", page=${page}`);

    // Fetch from both APIs in parallel
    const ycOffset = (page - 1) * 10;
    const [jsearchJobs, ycJobs] = await Promise.all([
      fetchJSearchJobs(query, page, location, employment_types, remote_only, date_posted || undefined)
        .catch((e) => { console.error('[JSearch] catch:', e); return [] as TransformedOpportunity[]; }),
      fetchYCJobs(ycOffset)
        .catch((e) => { console.error('[YC] catch:', e); return [] as TransformedOpportunity[]; }),
    ]);

    // Filter YC jobs by query relevance
    const queryLower = query.toLowerCase();
    const relevantYC = ycJobs.filter((j) => {
      const text = `${j.title} ${j.company} ${j.tags.join(' ')}`.toLowerCase();
      return queryLower.split(/\s+/).some((word) => text.includes(word));
    });

    // Merge: JSearch first, then relevant YC jobs, deduplicate by company+title
    const seen = new Set<string>();
    const merged: TransformedOpportunity[] = [];

    for (const job of [...jsearchJobs, ...relevantYC]) {
      const key = `${job.company.toLowerCase()}|${job.title.toLowerCase()}`;
      if (!seen.has(key)) {
        seen.add(key);
        merged.push(job);
      }
    }

    // If no results from either API, return fallback
    if (merged.length === 0) {
      const fallback = generateFallbackJobs(query);
      return new Response(
        JSON.stringify({ data: fallback, totalResults: fallback.length, page, hasMore: false }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    console.log(`[${userId}] Found ${jsearchJobs.length} JSearch + ${relevantYC.length} YC = ${merged.length} total`);

    return new Response(
      JSON.stringify({ data: merged, totalResults: merged.length, page, hasMore: merged.length >= 10 }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    console.error('[Internal] Error:', error);
    return new Response(
      JSON.stringify({ error: 'Error en el servicio.', data: [] }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
