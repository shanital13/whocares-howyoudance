import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const WEBHOOK_URL =
  "https://hook.eu2.make.com/4bas7h7wpr8chx2h1u4od8ik54a8pn34";

const LEVEL_LABELS: Record<string, string> = {
  beginner: "מתחילות",
  intermediate: "בינוני",
  advanced: "מתקדמות",
  all: "כל הרמות",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get tomorrow's date in Israel timezone
    const now = new Date();
    const israelTime = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Jerusalem" })
    );
    const tomorrow = new Date(israelTime);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split("T")[0]; // YYYY-MM-DD

    console.log(`Checking for classes on: ${tomorrowStr}`);

    // Get classes happening tomorrow
    const { data: classes, error: classErr } = await supabase
      .from("dance_classes")
      .select("*")
      .eq("date", tomorrowStr);

    if (classErr) throw classErr;

    if (!classes || classes.length === 0) {
      console.log("No classes tomorrow");
      return new Response(
        JSON.stringify({ message: "No classes tomorrow" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const results = [];

    for (const cls of classes) {
      // Get registrations for this class
      const { data: registrations, error: regErr } = await supabase
        .from("registrations")
        .select("user_id")
        .eq("class_id", cls.id);

      if (regErr) {
        console.error(`Error fetching registrations for ${cls.id}:`, regErr);
        continue;
      }

      // Get participant profiles
      const userIds = (registrations || []).map((r: any) => r.user_id);
      let participants: { name: string; phone: string }[] = [];

      if (userIds.length > 0) {
        const { data: profiles, error: profErr } = await supabase
          .from("profiles")
          .select("full_name, phone")
          .in("id", userIds);

        if (!profErr && profiles) {
          participants = profiles.map((p: any) => ({
            name: p.full_name || "",
            phone: p.phone || "",
          }));
        }
      }

      // Send webhook
      const payload = {
        type: "class_reminder",
        class_name: cls.name,
        class_level: LEVEL_LABELS[cls.level] || cls.level,
        class_date: cls.date,
        class_time: cls.time,
        class_location: cls.location,
        arrival_instructions: cls.arrival_instructions || "",
        participants_count: participants.length,
        participants,
      };

      console.log(`Sending reminder for "${cls.name}" with ${participants.length} participants`);

      const webhookRes = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      results.push({
        class_name: cls.name,
        participants_count: participants.length,
        webhook_status: webhookRes.status,
      });
    }

    return new Response(
      JSON.stringify({ message: "Reminders sent", results }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Reminder error:", err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
