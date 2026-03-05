// Supabase Edge Function: ai-interpret
// Deploy: supabase functions deploy ai-interpret
// Set secret: supabase secrets set GEMINI_API_KEY=your-key-here

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { profileName, markers, rawText } = await req.json();

    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "GEMINI_API_KEY not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Build prompt
    const markerText = markers
      .map(
        (m: { name: string; value: number; unit: string; min: number; max: number; status: string }) =>
          `${m.name}: ${m.value} ${m.unit} [Normal: ${m.min}–${m.max}] → ${m.status}`
      )
      .join("\n");

    const prompt = `You are a compassionate medical AI assistant helping patients understand their lab results in simple language. 

Patient: ${profileName}

Lab Results:
${markerText}

${rawText ? `Raw Report Text:\n${rawText}\n` : ""}
Please provide:
1. A brief, plain-English summary (2–3 sentences) of the overall health picture
2. The top 3 most important findings the patient should know about
3. One encouraging note about any normal values

Keep the language simple and empathetic. End with: "Always consult your doctor before making any health decisions based on this interpretation."`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Gemini API error: ${JSON.stringify(data)}`);
    }

    const explanation = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return new Response(
      JSON.stringify({ explanation, model: "gemini-1.5-flash", success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Edge function error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
