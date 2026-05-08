import { NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await getSessionFromRequest(request);
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { confirmation } = (await request.json()) as { confirmation?: string };

    if (confirmation !== "RESET") {
      return NextResponse.json({ error: "Invalid confirmation." }, { status: 400 });
    }

    // TODO: Implement data reset logic
    // This would clear non-user data like jobs, quotes, reviews, etc.

    return NextResponse.json({
      message: "Data reset successfully.",
      config: {
        pricing: {},
        addonsConfig: [],
        repCommissionPercent: 0,
        scheduleWindows: {},
        publicBusiness: {},
        plans: {
          activePlan: "free",
          free: { addonsFree: true }
        }
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to reset data." }, { status: 500 });
  }
}
