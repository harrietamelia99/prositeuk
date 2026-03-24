import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { createApplication } from "@/lib/crm-store";

function sanitizeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "-");
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const jobId = String(formData.get("jobId") || "");
    const jobTitle = String(formData.get("jobTitle") || "");
    const candidateName = String(formData.get("candidateName") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const cv = formData.get("cv");

    if (!jobId || !jobTitle || !candidateName || !email || !phone || !message || !(cv instanceof File)) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const extension = path.extname(cv.name || "").toLowerCase();
    const allowed = [".pdf", ".doc", ".docx"];
    if (!allowed.includes(extension)) {
      return NextResponse.json({ error: "CV must be a PDF, DOC or DOCX file" }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads", "cv");
    await fs.mkdir(uploadDir, { recursive: true });
    const fileName = `${Date.now()}-${sanitizeFileName(cv.name)}`;
    const fullPath = path.join(uploadDir, fileName);
    const bytes = await cv.arrayBuffer();
    await fs.writeFile(fullPath, Buffer.from(bytes));

    await createApplication({
      jobId,
      jobTitle,
      candidateName,
      email,
      phone,
      message,
      cvUrl: `/uploads/cv/${fileName}`
    });

    return NextResponse.redirect(new URL(`/jobs?applied=1`, request.url), { status: 303 });
  } catch {
    return NextResponse.json({ error: "Could not submit application" }, { status: 500 });
  }
}
