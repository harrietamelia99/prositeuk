import { promises as fs } from "fs";
import path from "path";
import { Application, ApplicationStatus, CrmData, Job, JobStatus } from "./crm-types";

const DATA_FILE = path.join(process.cwd(), "data", "crm-data.json");

const initialData: CrmData = {
  jobs: [
    {
      id: "job-1",
      slug: "site-engineer-london",
      title: "Site Engineer",
      location: "London, UK",
      employmentType: "Permanent",
      salary: "£45,000 - £55,000",
      description:
        "We are looking for an experienced Site Engineer to support key infrastructure projects across London. You will coordinate with project teams, ensure quality standards and deliver works safely and on schedule.",
      status: "published",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],
  applications: []
};

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

export async function getAllJobs() {
  const data = await readData();
  return data.jobs.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getPublishedJobs() {
  const jobs = await getAllJobs();
  return jobs.filter((job) => job.status === "published");
}

export async function getJobBySlug(slug: string) {
  const jobs = await getAllJobs();
  return jobs.find((job) => job.slug === slug);
}

export async function getAllApplications() {
  const data = await readData();
  return data.applications.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function createJob(input: {
  title: string;
  location: string;
  employmentType: string;
  salary: string;
  description: string;
  status: JobStatus;
}) {
  const data = await readData();
  const now = new Date().toISOString();
  const slugBase = input.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  let slug = slugBase || "job";
  let counter = 1;

  while (data.jobs.some((job) => job.slug === slug)) {
    counter += 1;
    slug = `${slugBase}-${counter}`;
  }

  const job: Job = {
    id: crypto.randomUUID(),
    slug,
    title: input.title,
    location: input.location,
    employmentType: input.employmentType,
    salary: input.salary,
    description: input.description,
    status: input.status,
    createdAt: now,
    updatedAt: now
  };

  data.jobs.push(job);
  await writeData(data);
  return job;
}

export async function updateJobStatus(jobId: string, status: JobStatus) {
  const data = await readData();
  const idx = data.jobs.findIndex((job) => job.id === jobId);
  if (idx < 0) return;
  data.jobs[idx].status = status;
  data.jobs[idx].updatedAt = new Date().toISOString();
  await writeData(data);
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
