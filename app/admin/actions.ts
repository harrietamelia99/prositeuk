"use server";

import { revalidatePath } from "next/cache";
import {
  createJob,
  updateApplicationNotes,
  updateApplicationStatus,
  updateJobStatus
} from "@/lib/crm-store";
import { ApplicationStatus, JobStatus } from "@/lib/crm-types";

function toJobStatus(value: string): JobStatus {
  if (value === "draft" || value === "published" || value === "closed") return value;
  return "draft";
}

function toApplicationStatus(value: string): ApplicationStatus {
  if (
    value === "new" ||
    value === "screened" ||
    value === "interview" ||
    value === "offer" ||
    value === "hired" ||
    value === "rejected"
  ) {
    return value;
  }
  return "new";
}

export async function createJobAction(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const location = String(formData.get("location") || "").trim();
  const employmentType = String(formData.get("employmentType") || "").trim();
  const salary = String(formData.get("salary") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const status = toJobStatus(String(formData.get("status") || "draft"));

  if (!title || !location || !employmentType || !salary || !description) {
    return;
  }

  await createJob({ title, location, employmentType, salary, description, status });
  revalidatePath("/admin");
  revalidatePath("/jobs");
}

export async function updateJobStatusAction(formData: FormData) {
  const jobId = String(formData.get("jobId") || "");
  const status = toJobStatus(String(formData.get("status") || "draft"));
  if (!jobId) return;
  await updateJobStatus(jobId, status);
  revalidatePath("/admin");
  revalidatePath("/jobs");
}

export async function updateApplicationStatusAction(formData: FormData) {
  const applicationId = String(formData.get("applicationId") || "");
  const status = toApplicationStatus(String(formData.get("status") || "new"));
  if (!applicationId) return;
  await updateApplicationStatus(applicationId, status);
  revalidatePath("/admin");
}

export async function updateApplicationNotesAction(formData: FormData) {
  const applicationId = String(formData.get("applicationId") || "");
  const notes = String(formData.get("notes") || "").trim();
  if (!applicationId) return;
  await updateApplicationNotes(applicationId, notes);
  revalidatePath("/admin");
}
