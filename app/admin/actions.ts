"use server";

import { revalidatePath } from "next/cache";
import {
  updateApplicationNotes,
  updateApplicationStatus,
} from "@/lib/crm-store";
import { ApplicationStatus } from "@/lib/crm-types";

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
