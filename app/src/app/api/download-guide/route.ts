import { NextResponse } from "next/server";

// Generate PDF content as a detailed guide
const generatePDFContent = () => {
  const content = `
%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R 4 0 R 5 0 R 6 0 R 7 0 R] /Count 5 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 8 0 R /Resources << /Font << /F1 9 0 R /F2 10 0 R >> >> >>
endobj
4 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 11 0 R /Resources << /Font << /F1 9 0 R /F2 10 0 R >> >> >>
endobj
5 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 12 0 R /Resources << /Font << /F1 9 0 R /F2 10 0 R >> >> >>
endobj
6 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 13 0 R /Resources << /Font << /F1 9 0 R /F2 10 0 R >> >> >>
endobj
7 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 14 0 R /Resources << /Font << /F1 9 0 R /F2 10 0 R >> >> >>
endobj
9 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>
endobj
10 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
8 0 obj
<< /Length 2500 >>
stream
BT
/F1 28 Tf
50 720 Td
(AgentSix Complete System Guide) Tj
/F2 12 Tf
0 -30 Td
(TCPA-Compliant AI Outreach for Real Estate Agents) Tj
0 -50 Td
/F1 16 Tf
(What is AgentSix?) Tj
/F2 11 Tf
0 -25 Td
(AgentSix is a done-for-you AI outreach system designed specifically for) Tj
0 -15 Td
(real estate agents. We handle all the technology, compliance, and) Tj
0 -15 Td
(operations - you focus on closing deals.) Tj
0 -30 Td
/F1 14 Tf
(The Three Core Features:) Tj
/F2 11 Tf
0 -25 Td
(1. AI Voice Outreach - Replaces your $2,500/mo ISA team) Tj
0 -15 Td
(   - Handles inbound and outbound calls 24/7) Tj
0 -15 Td
(   - Qualifies leads: timeline, budget, motivation) Tj
0 -15 Td
(   - Books appointments directly to your calendar) Tj
0 -15 Td
(   - Transfers hot leads to you live) Tj
0 -25 Td
(2. Instant Lead Response - 5 seconds, not 5 hours) Tj
0 -15 Td
(   - Responds to Zillow, Realtor.com, Facebook leads instantly) Tj
0 -15 Td
(   - Personalized SMS + email combo) Tj
0 -15 Td
(   - Smart follow-up sequences) Tj
0 -15 Td
(   - Full conversation history in dashboard) Tj
0 -25 Td
(3. Compliance Infrastructure - Your $500K lawsuit shield) Tj
0 -15 Td
(   - A2P 10DLC registration included) Tj
0 -15 Td
(   - Federal + 50 state DNC scrubbing) Tj
0 -15 Td
(   - TCPA litigator database exclusion) Tj
0 -15 Td
(   - Quiet hours enforcement per timezone) Tj
0 -15 Td
(   - $2M E&O coverage) Tj
ET
endstream
endobj
11 0 obj
<< /Length 2200 >>
stream
BT
/F1 18 Tf
50 720 Td
(Your Onboarding Process) Tj
/F2 11 Tf
0 -35 Td
/F1 12 Tf
(Step 1: Strategy Call - 15 minutes) Tj
/F2 11 Tf
0 -18 Td
(We learn about your business, lead sources, and current pain points.) Tj
0 -15 Td
(- Review your current lead sources) Tj
0 -15 Td
(- Understand your deal flow and conversion rates) Tj
0 -15 Td
(- Define your ideal customer profile) Tj
0 -25 Td
/F1 12 Tf
(Step 2: Compliance Setup - 3-5 days) Tj
/F2 11 Tf
0 -18 Td
(We handle all legal infrastructure. You sign one form.) Tj
0 -15 Td
(- A2P 10DLC registration for SMS compliance) Tj
0 -15 Td
(- Federal + state DNC list integration) Tj
0 -15 Td
(- Consent landing page at your-name.agentos.com) Tj
0 -25 Td
/F1 12 Tf
(Step 3: AI Voice Agent Training - 2-3 days) Tj
/F2 11 Tf
0 -18 Td
(We customize your AI with your scripts and personality.) Tj
0 -15 Td
(- Custom greeting and introduction scripts) Tj
0 -15 Td
(- Market-specific knowledge) Tj
0 -15 Td
(- Objection handling for your niche) Tj
0 -25 Td
/F1 12 Tf
(Step 4: Lead Source Integration - 1-2 days) Tj
/F2 11 Tf
0 -18 Td
(We connect all your lead sources.) Tj
0 -15 Td
(- Zillow Premier Agent webhook) Tj
0 -15 Td
(- Realtor.com lead forwarding) Tj
0 -15 Td
(- Facebook Lead Ads integration) Tj
0 -25 Td
/F1 12 Tf
(Step 5: Testing - 2-3 days) Tj
/F2 11 Tf
0 -18 Td
(20+ test calls before going live. You approve everything.) Tj
0 -25 Td
/F1 12 Tf
(Step 6: Go Live - Day 7-10) Tj
/F2 11 Tf
0 -18 Td
(Dashboard access, Slack war room, 24/7 AI operation.) Tj
ET
endstream
endobj
12 0 obj
<< /Length 2000 >>
stream
BT
/F1 18 Tf
50 720 Td
(How Your System Runs Daily) Tj
/F2 11 Tf
0 -35 Td
/F1 12 Tf
(24/7 - AI Handles Inbound Calls) Tj
/F2 11 Tf
0 -18 Td
(Every call to your number is answered by AI. Qualifies leads,) Tj
0 -15 Td
(books appointments, transfers hot leads to you live.) Tj
0 -30 Td
/F1 12 Tf
(9am-6pm - Outbound Campaign Active) Tj
/F2 11 Tf
0 -18 Td
(AI calls opted-in leads from your pipeline. Timezone-aware,) Tj
0 -15 Td
(quiet hours enforced, fully TCPA compliant.) Tj
0 -30 Td
/F1 12 Tf
(Under 5 Seconds - Instant Lead Response) Tj
/F2 11 Tf
0 -18 Td
(New lead from Zillow or Facebook? AI responds via SMS and) Tj
0 -15 Td
(email before they contact another agent.) Tj
0 -30 Td
/F1 12 Tf
(15 Minute SLA - Human Escalation) Tj
/F2 11 Tf
0 -18 Td
(Edge cases flagged to your Slack war room. Legal threats,) Tj
0 -15 Td
(life events, confused leads - human responds quickly.) Tj
0 -40 Td
/F1 16 Tf
(Expected Results - First 90 Days) Tj
/F2 11 Tf
0 -30 Td
/F1 12 Tf
(Week 1-2: System Calibration) Tj
/F2 11 Tf
0 -18 Td
(- 20+ test calls completed) Tj
0 -15 Td
(- Scripts refined 3-5 times) Tj
0 -25 Td
/F1 12 Tf
(Week 3-4: Early Traction) Tj
/F2 11 Tf
0 -18 Td
(- 100-200 leads contacted) Tj
0 -15 Td
(- 40-60 conversations started) Tj
0 -15 Td
(- 8-12 appointments booked) Tj
0 -25 Td
/F1 12 Tf
(Month 2: Full Operation) Tj
/F2 11 Tf
0 -18 Td
(- 600+ monthly outbound calls) Tj
0 -15 Td
(- 15-20% response rate) Tj
0 -15 Td
(- 15-25 qualified appointments) Tj
ET
endstream
endobj
13 0 obj
<< /Length 1800 >>
stream
BT
/F1 18 Tf
50 720 Td
(Pricing Packages) Tj
/F2 11 Tf
0 -40 Td
/F1 14 Tf
(STARTER - $1,497 setup + $597/mo) Tj
/F2 11 Tf
0 -22 Td
(- AI Voice: 500 minutes/mo \\(~150 outbound calls\\)) Tj
0 -15 Td
(- Buyer lead instant response: up to 100 leads/mo) Tj
0 -15 Td
(- Full compliance stack included) Tj
0 -15 Td
(- Dashboard access) Tj
0 -15 Td
(- Email support, 4-hour business-day SLA) Tj
0 -15 Td
(Best for: Solo agents doing 15-25 deals/year) Tj
0 -35 Td
/F1 14 Tf
(PRO \\(Most Popular\\) - $2,497 setup + $1,297/mo) Tj
/F2 11 Tf
0 -22 Td
(- AI Voice: 2,000 minutes/mo \\(~600 outbound calls\\)) Tj
0 -15 Td
(- Buyer lead instant response: unlimited) Tj
0 -15 Td
(- Full compliance stack included) Tj
0 -15 Td
(- Slack war room with 15-min SLA) Tj
0 -15 Td
(- Monthly strategy call) Tj
0 -15 Td
(Best for: Mid-producers doing 25-50 deals/year) Tj
0 -35 Td
/F1 14 Tf
(GROWTH - $4,997 setup + $2,497/mo) Tj
/F2 11 Tf
0 -22 Td
(- AI Voice: 5,000 minutes/mo) Tj
0 -15 Td
(- Everything in Pro, plus:) Tj
0 -15 Td
(- Custom AI training on your scripts) Tj
0 -15 Td
(- Weekly strategy calls) Tj
0 -15 Td
(- Direct line to operator) Tj
0 -15 Td
(Best for: Top producers and small teams) Tj
ET
endstream
endobj
14 0 obj
<< /Length 1600 >>
stream
BT
/F1 18 Tf
50 720 Td
(Our Guarantee) Tj
/F2 11 Tf
0 -35 Td
/F1 14 Tf
(90-Day Performance Guarantee) Tj
/F2 11 Tf
0 -25 Td
(If we don't deliver at least 8 qualified appointments in your) Tj
0 -15 Td
(first 90 days, we refund your setup fee in full.) Tj
0 -15 Td
(No questions asked.) Tj
0 -40 Td
/F1 16 Tf
(Why AgentSix?) Tj
/F2 11 Tf
0 -30 Td
(1. TCPA Compliance Built In) Tj
0 -15 Td
(   One violation costs $500-$1,500. We prevent them all.) Tj
0 -25 Td
(2. Done-For-You, Not Software) Tj
0 -15 Td
(   You don't learn a new tool. We operate it for you.) Tj
0 -25 Td
(3. Replace Your ISA at 70% Less) Tj
0 -15 Td
(   Human ISAs cost $3,000-5,000/mo. We cost $597-1,997.) Tj
0 -25 Td
(4. Instant Response = More Deals) Tj
0 -15 Td
(   5-second response vs 5-hour. You win more leads.) Tj
0 -50 Td
/F1 16 Tf
(Ready to Get Started?) Tj
/F2 11 Tf
0 -30 Td
(Book your 15-minute strategy call at:) Tj
0 -20 Td
/F1 12 Tf
(https://agentos.com/dashboard) Tj
/F2 11 Tf
0 -30 Td
(Questions? Email us at hello@agentos.com) Tj
ET
endstream
endobj
xref
0 15
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000131 00000 n
0000000270 00000 n
0000000410 00000 n
0000000550 00000 n
0000000690 00000 n
0000000893 00000 n
0000000830 00000 n
0000003446 00000 n
0000003520 00000 n
0000005773 00000 n
0000007826 00000 n
0000009679 00000 n
trailer
<< /Size 15 /Root 1 0 R >>
startxref
11332
%%EOF
`;

  return content;
};

export async function GET() {
  // For a production app, you'd use a proper PDF library like @react-pdf/renderer or pdfkit
  // This is a simplified version that returns a basic PDF

  const pdfContent = generatePDFContent();

  return new NextResponse(pdfContent, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=AgentSix-Complete-System-Guide.pdf",
    },
  });
}
