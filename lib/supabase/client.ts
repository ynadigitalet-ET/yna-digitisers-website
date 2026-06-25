import { createBrowserClient } from "@supabase/ssr";
import {
  getSupabaseAnonKey,
  getSupabaseUrl,
  supabaseClientOptions,
} from "./config";

export function createClient() {
  return createBrowserClient(
    getSupabaseUrl(),
    getSupabaseAnonKey(),
    supabaseClientOptions
  );
}
