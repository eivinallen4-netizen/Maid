import { NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await getSessionFromRequest(request);
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const prefix = formData.get("prefix") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    if (!prefix) {
      return NextResponse.json({ error: "No prefix provided." }, { status: 400 });
    }

    // TODO: Implement file upload logic
    // This would store the image and return a URL

    const fileName = `${prefix}-${Date.now()}-${file.name}`;
    const url = `/uploads/${fileName}`;

    return NextResponse.json({
      url,
      message: "Image uploaded successfully."
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to upload image." }, { status: 500 });
  }
}
