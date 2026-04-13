import { NextRequest, NextResponse } from "next/server";

interface DemoRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string | null;
  dealsPerYear: string;
  currentChallenge: string | null;
  preferredTime: string | null;
  createdAt: string;
  status: string;
}

// In-memory storage for demo (replace with database later)
const demoRequests: DemoRequest[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      dealsPerYear,
      currentChallenge,
      preferredTime,
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !dealsPerYear) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create demo request record
    const demoRequest = {
      id: `demo_${Date.now()}`,
      firstName,
      lastName,
      email,
      phone,
      company: company || null,
      dealsPerYear,
      currentChallenge: currentChallenge || null,
      preferredTime: preferredTime || null,
      createdAt: new Date().toISOString(),
      status: "pending",
    };

    // Store in memory (replace with database)
    demoRequests.push(demoRequest);

    // Log for debugging (remove in production)
    console.log("New demo request:", demoRequest);

    // TODO: Send notification email/SMS
    // await sendNotificationEmail(demoRequest);
    // await sendSMSNotification(demoRequest);

    // TODO: Add to CRM
    // await addToCRM(demoRequest);

    // TODO: Trigger n8n webhook
    // await fetch(process.env.N8N_WEBHOOK_URL, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(demoRequest),
    // });

    return NextResponse.json({
      success: true,
      message: "Demo request submitted successfully",
      data: { id: demoRequest.id },
    });
  } catch (error) {
    console.error("Error processing demo request:", error);
    return NextResponse.json(
      { error: "Failed to process demo request" },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return all demo requests (for admin purposes)
  // In production, this should be protected
  return NextResponse.json({
    success: true,
    data: demoRequests,
    count: demoRequests.length,
  });
}
