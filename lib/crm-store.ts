import { promises as fs } from "fs";
import path from "path";
import { client } from "@/sanity/lib/client";
import { allPublishedJobsQuery, jobBySlugQuery } from "@/sanity/lib/queries";
import { Application, ApplicationStatus, CrmData, Job } from "./crm-types";
import { geocodeLocation } from "./geocode";

// ─── Jobs — sourced from Sanity ──────────────────────────────────────────────

async function attachCoordinates(jobs: Job[]): Promise<Job[]> {
  return Promise.all(
    jobs.map(async (job) => {
      if (!job.location) return job;
      const coordinates = await geocodeLocation(job.location);
      return coordinates ? { ...job, coordinates } : job;
    })
  );
}

export async function getPublishedJobs(): Promise<Job[]> {
  const jobs = await client.fetch<Job[]>(allPublishedJobsQuery, {}, { next: { revalidate: 60 } });
  return attachCoordinates(jobs);
}

export async function getAllJobs(): Promise<Job[]> {
  return getPublishedJobs();
}

export async function getJobBySlug(slug: string): Promise<Job | null> {
  const job = await client.fetch<Job | null>(jobBySlugQuery, { slug }, { next: { revalidate: 60 } });
  if (!job) return null;
  const coordinates = job.location ? await geocodeLocation(job.location) : null;
  return coordinates ? { ...job, coordinates } : job;
}

// ─── Applications — kept in local JSON (Vercel writable via /tmp workaround) ─

const DATA_FILE = path.join(process.cwd(), "data", "crm-data.json");

const initialData: CrmData = { jobs: [], applications: [] };

async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(initialData, null, 2), "utf8");
  }
}

async function readData(): Promise<CrmData> {
  await ensureDataFile();
  const file = await fs.readFile(DATA_FILE, "utf8");
  return JSON.parse(file) as CrmData;
}

async function writeData(data: CrmData) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

export async function getAllApplications() {
  const data = await readData();
  return data.applications.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function createApplication(input: {
  jobId: string;
  jobTitle: string;
  candidateName: string;
  email: string;
  phone: string;
  message: string;
  cvUrl: string;
}) {
  const data = await readData();
  const now = new Date().toISOString();

  const application: Application = {
    id: crypto.randomUUID(),
    jobId: input.jobId,
    jobTitle: input.jobTitle,
    candidateName: input.candidateName,
    email: input.email,
    phone: input.phone,
    message: input.message,
    cvUrl: input.cvUrl,
    status: "new",
    notes: "",
    createdAt: now,
    updatedAt: now
  };

  data.applications.push(application);
  await writeData(data);
  return application;
}

export async function updateApplicationStatus(applicationId: string, status: ApplicationStatus) {
  const data = await readData();
  const idx = data.applications.findIndex((application) => application.id === applicationId);
  if (idx < 0) return;
  data.applications[idx].status = status;
  data.applications[idx].updatedAt = new Date().toISOString();
  await writeData(data);
}

export async function updateApplicationNotes(applicationId: string, notes: string) {
  const data = await readData();
  const idx = data.applications.findIndex((application) => application.id === applicationId);
  if (idx < 0) return;
  data.applications[idx].notes = notes;
  data.applications[idx].updatedAt = new Date().toISOString();
  await writeData(data);
}
