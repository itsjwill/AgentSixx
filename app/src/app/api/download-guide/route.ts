import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from "node:fs/promises";
import path from "node:path";

const EMERALD = rgb(0.063, 0.725, 0.506);
const ZINC_900 = rgb(0.09, 0.09, 0.106);
const ZINC_400 = rgb(0.635, 0.639, 0.659);
const WHITE = rgb(1, 1, 1);

const PAGE_W = 612;
const PAGE_H = 792;
const MARGIN_X = 56;
const CONTENT_W = PAGE_W - MARGIN_X * 2;

type Line =
  | { type: "h1"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "bullet"; text: string }
  | { type: "space"; gap: number };

const content: Line[] = [
  { type: "h1", text: "AgentSixx Complete Guide" },
  { type: "p", text: "The TCPA-compliant lead response and sourcing system built for real estate agents. Voice ISA + SMS + email + direct seller data, one stack, one invoice." },
  { type: "space", gap: 20 },

  { type: "h2", text: "What AgentSixx Does" },
  { type: "p", text: "Two things at once." },
  { type: "bullet", text: "Responds to every lead you already get in under 5 seconds. SMS, email, and a natural Voice ISA that books appointments while you sleep." },
  { type: "bullet", text: "Sources new leads for you. Direct seller data in your zip codes: high-equity, pre-foreclosure, absentee, probate, expired, FSBO. Skip-traced, intent-scored, delivered into the same pipeline." },
  { type: "space", gap: 16 },

  { type: "h2", text: "The 4 Core Features" },

  { type: "h3", text: "1. Voice ISA" },
  { type: "p", text: "Replaces a $2,500 to $3,500/mo human Inside Sales Agent. Answers inbound, dials outbound, qualifies on timeline and budget, transfers hot leads to your phone live, and books showings directly to your calendar. Leads ask to speak to Jennifer and get Jennifer. Not a bot." },

  { type: "h3", text: "2. Instant Lead Response" },
  { type: "p", text: "Zillow lead at 9:47pm, you are at dinner. AgentSixx already texted, emailed, and offered a call. By the time you check your phone, your calendar has a 10am showing booked." },

  { type: "h3", text: "3. Listing Lead Sourcing" },
  { type: "p", text: "Pick your zip codes. We pull direct seller records weekly, skip-trace the phones, score for intent, and drop them into your outbound queue. Territory exclusivity available on Pro and Growth data tiers." },

  { type: "h3", text: "4. 8-Layer Compliance Shield" },
  { type: "p", text: "A2P 10DLC, Federal DNC, 50-state DNC, 3,400+ serial litigators blocked, quiet hours per lead timezone, consent timestamped, recording disclosure in 11 states, and $2M E&O coverage. $0 violations since launch." },

  { type: "space", gap: 16 },

  { type: "h2", text: "7-Step Onboarding" },
  { type: "bullet", text: "Day 1: 15-min strategy call. Audit your sources, define hot-lead criteria, pick data zip codes." },
  { type: "bullet", text: "Days 2-6: Compliance setup. A2P 10DLC, DNC, litigator block, consent page, quiet hours." },
  { type: "bullet", text: "Days 4-7: Voice ISA training. Custom scripts, voice match, market-specific knowledge." },
  { type: "bullet", text: "Days 5-7: Lead source integration. Zillow, Realtor, Facebook, IDX, CRM sync." },
  { type: "bullet", text: "Days 5-7: Data activation, optional. Seller lists delivered if Data bundle active." },
  { type: "bullet", text: "Days 7-9: Test + calibrate. 20+ test calls, flow verification, script approval." },
  { type: "bullet", text: "Day 7-10: Go live. Dashboard unlocked. Slack war room opens. System runs 24/7." },

  { type: "space", gap: 16 },

  { type: "h2", text: "Plans" },
  { type: "h3", text: "Starter: $597/mo + $1,497 setup" },
  { type: "p", text: "500 leads processed, 500 voice minutes, 5,000 SMS, 1 CRM integration, email support. Data add-on starts at $97/mo." },
  { type: "h3", text: "Pro: $1,297/mo + $2,497 setup" },
  { type: "p", text: "1,000 leads, 2,000 voice min, 10,000 SMS, unlimited CRM integrations, Data Pro bundled (2,000 seller records in 5 zips), Slack war room with 15-min SLA." },
  { type: "h3", text: "Growth: $2,497/mo + $4,997 setup" },
  { type: "p", text: "2,500 leads, 5,000 voice min, 25,000 SMS, Data Growth bundled (unlimited records, 10 territory-exclusive zips), custom voice training, direct line support." },

  { type: "space", gap: 16 },

  { type: "h2", text: "90-Day Guarantee" },
  { type: "p", text: "Book 8+ qualified appointments in your first 90 days or we refund your setup fee. Clock starts the day onboarding completes and your first call ships. Requirements: real leads in your market, sources connected." },

  { type: "space", gap: 20 },

  { type: "h2", text: "Next Step" },
  { type: "p", text: "Book a 15-min demo at agentsixx.com/demo. We plug AgentSixx into your lead sources on a live Zoom and show you the first call happening in real time." },
];

async function drawWrapped(
  page: Awaited<ReturnType<PDFDocument["addPage"]>>,
  text: string,
  opts: {
    x: number;
    y: number;
    maxWidth: number;
    font: Awaited<ReturnType<PDFDocument["embedFont"]>>;
    size: number;
    color: ReturnType<typeof rgb>;
    lineGap?: number;
  }
): Promise<number> {
  const { font, size, maxWidth, color, lineGap = 4 } = opts;
  const words = text.split(/\s+/);
  let line = "";
  let y = opts.y;
  const lineHeight = size + lineGap;

  for (const word of words) {
    const attempt = line ? `${line} ${word}` : word;
    const width = font.widthOfTextAtSize(attempt, size);
    if (width > maxWidth && line) {
      page.drawText(line, { x: opts.x, y, font, size, color });
      y -= lineHeight;
      line = word;
    } else {
      line = attempt;
    }
  }
  if (line) {
    page.drawText(line, { x: opts.x, y, font, size, color });
    y -= lineHeight;
  }
  return y;
}

async function buildPdf(): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  pdf.setTitle("AgentSixx Complete Guide");
  pdf.setAuthor("AgentSixx");
  pdf.setSubject("Lead Response + Lead Sourcing for Real Estate Agents");
  pdf.setCreator("AgentSixx");

  const helvBold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const helv = await pdf.embedFont(StandardFonts.Helvetica);

  // Try to embed the wordmark; fall back silently if missing.
  let wordmarkImage: Awaited<ReturnType<PDFDocument["embedPng"]>> | null = null;
  try {
    const logoPath = path.join(process.cwd(), "public", "logo.png");
    const bytes = await fs.readFile(logoPath);
    wordmarkImage = await pdf.embedPng(bytes);
  } catch {
    wordmarkImage = null;
  }

  let page = pdf.addPage([PAGE_W, PAGE_H]);
  page.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: PAGE_H, color: ZINC_900 });

  // Cover branding
  if (wordmarkImage) {
    const scale = 260 / wordmarkImage.width;
    const w = wordmarkImage.width * scale;
    const h = wordmarkImage.height * scale;
    page.drawImage(wordmarkImage, {
      x: (PAGE_W - w) / 2,
      y: PAGE_H - 200,
      width: w,
      height: h,
    });
  } else {
    page.drawText("AgentSixx", {
      x: MARGIN_X,
      y: PAGE_H - 140,
      font: helvBold,
      size: 48,
      color: WHITE,
    });
  }

  let y = wordmarkImage ? PAGE_H - 260 : PAGE_H - 200;
  page.drawText("Complete Guide", {
    x: MARGIN_X,
    y,
    font: helvBold,
    size: 28,
    color: WHITE,
  });
  y -= 30;
  page.drawText("Lead Response + Lead Sourcing for Real Estate", {
    x: MARGIN_X,
    y,
    font: helv,
    size: 14,
    color: ZINC_400,
  });

  // Accent rule
  page.drawRectangle({
    x: MARGIN_X,
    y: y - 20,
    width: 60,
    height: 3,
    color: EMERALD,
  });

  // Start body on a fresh page
  page = pdf.addPage([PAGE_W, PAGE_H]);
  page.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: PAGE_H, color: ZINC_900 });
  y = PAGE_H - MARGIN_X;

  for (const line of content) {
    if (y < 80) {
      page = pdf.addPage([PAGE_W, PAGE_H]);
      page.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: PAGE_H, color: ZINC_900 });
      y = PAGE_H - MARGIN_X;
    }

    if (line.type === "h1") {
      y -= 6;
      y = await drawWrapped(page, line.text, {
        x: MARGIN_X,
        y,
        maxWidth: CONTENT_W,
        font: helvBold,
        size: 26,
        color: WHITE,
        lineGap: 6,
      });
      y -= 6;
    } else if (line.type === "h2") {
      y -= 10;
      page.drawRectangle({
        x: MARGIN_X,
        y: y + 2,
        width: 4,
        height: 18,
        color: EMERALD,
      });
      y = await drawWrapped(page, line.text, {
        x: MARGIN_X + 14,
        y,
        maxWidth: CONTENT_W - 14,
        font: helvBold,
        size: 18,
        color: WHITE,
        lineGap: 4,
      });
      y -= 6;
    } else if (line.type === "h3") {
      y -= 4;
      y = await drawWrapped(page, line.text, {
        x: MARGIN_X,
        y,
        maxWidth: CONTENT_W,
        font: helvBold,
        size: 13,
        color: EMERALD,
        lineGap: 3,
      });
    } else if (line.type === "p") {
      y = await drawWrapped(page, line.text, {
        x: MARGIN_X,
        y,
        maxWidth: CONTENT_W,
        font: helv,
        size: 11,
        color: ZINC_400,
        lineGap: 5,
      });
      y -= 6;
    } else if (line.type === "bullet") {
      page.drawCircle({
        x: MARGIN_X + 4,
        y: y + 4,
        size: 2,
        color: EMERALD,
      });
      y = await drawWrapped(page, line.text, {
        x: MARGIN_X + 14,
        y,
        maxWidth: CONTENT_W - 14,
        font: helv,
        size: 11,
        color: ZINC_400,
        lineGap: 4,
      });
      y -= 4;
    } else if (line.type === "space") {
      y -= line.gap;
    }
  }

  // Footer on last page
  page.drawRectangle({
    x: MARGIN_X,
    y: 50,
    width: 60,
    height: 2,
    color: EMERALD,
  });
  page.drawText("agentsixx.com", {
    x: MARGIN_X,
    y: 34,
    font: helvBold,
    size: 10,
    color: WHITE,
  });
  page.drawText("TCPA-compliant lead response + sourcing.  $0 violations since launch.", {
    x: MARGIN_X,
    y: 22,
    font: helv,
    size: 9,
    color: ZINC_400,
  });

  return pdf.save();
}

export async function GET() {
  try {
    const bytes = await buildPdf();
    return new NextResponse(Buffer.from(bytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="AgentSixx-Complete-Guide.pdf"',
        "Cache-Control": "public, max-age=300, stale-while-revalidate=3600",
      },
    });
  } catch (err) {
    console.error("[download-guide] PDF generation failed", err);
    return NextResponse.json({ error: "Failed to generate guide" }, { status: 500 });
  }
}