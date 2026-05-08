import { NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";
import { readAppConfig, writeAppConfig } from "@/lib/app-config";
import { defaultPricing } from "@/lib/pricing";
import { defaultScheduleWindows } from "@/lib/schedule-types";
import { defaultPublicBusinessConfig } from "@/lib/public-business";

export async function GET(request: Request) {
  try {
    const session = await getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const stored = await readAppConfig();
    const config = {
      pricing: stored.pricing ?? defaultPricing,
      addonsConfig: stored.addonsConfig ?? [],
      repCommissionPercent: stored.repCommissionPercent ?? 20,
      scheduleWindows: stored.scheduleWindows ?? defaultScheduleWindows,
      publicBusiness: stored.publicBusiness ?? defaultPublicBusinessConfig,
      plans: stored.plans ?? { activePlan: "free", free: { addonsFree: true } },
    };

    return NextResponse.json(config);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to load config." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSessionFromRequest(request);
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();
    const current = await readAppConfig();
    await writeAppConfig({ ...current, ...body });

    return NextResponse.json({
      message: "Config saved successfully.",
      config: body,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to save config." }, { status: 500 });
  }
}
