export type JobStatus = "draft" | "published" | "closed";

export type ApplicationStatus =
  | "new"
  | "screened"
  | "interview"
  | "offer"
  | "hired"
  | "rejected";

export type Job = {
  id: string;
  slug: string;
  title: string;
  location: string;
  employmentType: string;
  salary: string;
  description: string;
  status: JobStatus;
  region?: string;
  createdAt: string;
  updatedAt: string;
};

export type Application = {
  id: string;
  jobId: string;
  jobTitle: string;
  candidateName: string;
  email: string;
  phone: string;
  message: string;
  cvUrl: string;
  status: ApplicationStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export type CrmData = {
  jobs: Job[];
  applications: Application[];
};
