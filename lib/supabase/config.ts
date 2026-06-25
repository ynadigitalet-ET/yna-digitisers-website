/**
 * Supabase environment helpers.
 * Supports new sb_publishable_ / sb_secret_ keys and legacy JWT keys.
 */

function trim(value: string | undefined): string {
  return value?.trim() ?? "";
}

/**
 * Returns the Supabase project URL (NOT the REST endpoint).
 * Correct:   https://your-project-ref.supabase.co
 * Incorrect: https://your-project-ref.supabase.co/rest/v1/
 */
export function getSupabaseUrl(): string {
  const raw = trim(process.env.NEXT_PUBLIC_SUPABASE_URL);

  if (!raw) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL is not set. Use https://YOUR_PROJECT_REF.supabase.co (without /rest/v1)."
    );
  }

  const normalized = raw
    .replace(/\/rest\/v1\/?$/i, "")
    .replace(/\/+$/, "");

  if (!/^https:\/\/.+/i.test(normalized)) {
    throw new Error(
      `Invalid NEXT_PUBLIC_SUPABASE_URL: "${raw}". Use your project URL, e.g. https://YOUR_PROJECT_REF.supabase.co (without /rest/v1).`
    );
  }

  return normalized;
}

export function getSupabaseAnonKey(): string {
  const key = trim(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  if (!key) {
    throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is not set.");
  }

  return key;
}

export function getSupabaseServiceRoleKey(): string {
  const key = trim(process.env.SUPABASE_SERVICE_ROLE_KEY);

  if (!key) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set.");
  }

  return key;
}

export const supabaseClientOptions = {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
} as const;

export const supabaseAdminOptions = {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
} as const;
