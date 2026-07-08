// @ts-nocheck
import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.21.0";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);

    // Fetch vendors in 'Observation' status or with missing items
    const { data: vendors, error } = await supabase
      .from('vendors')
      .select('id, company_name, email, missing_items, status')
      .in('status', ['Observation', 'pending'])
      .neq('missing_items', '[]')
      .not('missing_items', 'is', null);

    if (error) {
      throw error;
    }

    if (!vendors || vendors.length === 0) {
      return new Response(JSON.stringify({ message: "No vendors to remind." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const emailsSent = [];
    const errors = [];

    // Send emails
    for (const vendor of vendors) {
      if (!vendor.email) continue;
      
      let missingList = '';
      try {
        const parsedItems = typeof vendor.missing_items === 'string' ? JSON.parse(vendor.missing_items) : vendor.missing_items;
        if (Array.isArray(parsedItems) && parsedItems.length > 0) {
           missingList = parsedItems.map(item => `<li>${item}</li>`).join('');
        }
      } catch (e) {
         missingList = `<li>Please review your dashboard for details.</li>`;
      }

      if (!missingList) continue;

      const htmlContent = `
        <h2>Action Required: Missing Documents for Vendor Registration</h2>
        <p>Dear ${vendor.company_name || 'Vendor'},</p>
        <p>Thank you for registering with DXN India Manufacturing. We are currently reviewing your application but we noticed some missing or pending documents required for compliance:</p>
        <ul>
          ${missingList}
        </ul>
        <p>Please log in to your vendor portal and upload the missing documents to proceed with your approval process.</p>
        <br/>
        <p>Best Regards,</p>
        <p>DXN Vendor Management Team</p>
      `;

      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "DXN Vendor Management <vendors@your-domain.com>",
            to: [vendor.email],
            subject: "Action Required: Missing Documents for Vendor Registration",
            html: htmlContent,
          }),
        });

        const resData = await res.json();
        if (res.ok) {
          emailsSent.push({ vendorId: vendor.id, email: vendor.email });
        } else {
          errors.push({ vendorId: vendor.id, error: resData });
        }
      } catch (emailError) {
        errors.push({ vendorId: vendor.id, error: String(emailError) });
      }
    }

    return new Response(JSON.stringify({
      message: `Processed ${vendors.length} vendors.`,
      emailsSent,
      errors
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
