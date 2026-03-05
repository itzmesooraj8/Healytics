const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    "⚠️  SUPABASE_URL or SUPABASE_SERVICE_KEY not set — running in MOCK mode.\n" +
    "    Copy backend/.env.example to backend/.env and fill in your Supabase credentials."
  );
}

const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

module.exports = { supabase };
