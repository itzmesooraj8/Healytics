/**
 * seed-demo.js — Run once to create the demo user in Supabase
 * Usage: node backend/seed-demo.js
 */
require("dotenv").config({ path: require("path").join(__dirname, ".env") });
const { createClient } = require("@supabase/supabase-js");
const bcrypt = require("bcryptjs");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

async function seed() {
  console.log("🌱 Seeding demo user...\n");

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    console.error("❌ Missing SUPABASE_URL or SUPABASE_SERVICE_KEY in backend/.env");
    process.exit(1);
  }

  const hash = await bcrypt.hash("demo1234", 10);

  const { data, error } = await supabase
    .from("users")
    .upsert(
      {
        name: "Demo Patient",
        email: "demo@healytics.ai",
        password: hash,
        role: "patient",
      },
      { onConflict: "email" }
    )
    .select("id, name, email, role");

  if (error) {
    console.error("❌ Seed failed:", error.message);
    process.exit(1);
  }

  console.log("✅ Demo user ready:");
  console.log("   Email:    demo@healytics.ai");
  console.log("   Password: demo1234");
  console.log("   Role:     patient");
  console.log("   ID:      ", data?.[0]?.id);
  console.log("\n🎉 Run `npm run dev` and try the Quick Demo Login button!");
}

seed();
