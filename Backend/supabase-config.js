import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = "https://dvcticgzggpmmluentsq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2Y3RpY2d6Z2dwbW1sdWVudHNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNjUwNjksImV4cCI6MjA1ODc0MTA2OX0.3klZQAU630HuDpplOG1qfLlRdD7s4uFqHdlMmqCDWyA";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);