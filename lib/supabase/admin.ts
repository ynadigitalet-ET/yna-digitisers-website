import { createClient } from "@supabase/supabase-js";
import {
  getSupabaseServiceRoleKey,
  getSupabaseUrl,
  supabaseAdminOptions,
} from "./config";

/** Service-role client for server-side writes — bypasses RLS */
export function createAdminClient() {
  return createClient(
    getSupabaseUrl(),
    getSupabaseServiceRoleKey(),
    supabaseAdminOptions
  );
}
