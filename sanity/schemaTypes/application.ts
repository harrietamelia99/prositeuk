import { defineField, defineType } from "sanity";

export const applicationType = defineType({
  name: "application",
  title: "Application",
  type: "document",
  fields: [
    defineField({ name: "jobTitle", title: "Job applied for", type: "string", readOnly: true }),
    defineField({ name: "jobId", title: "Job ID", type: "string", readOnly: true, hidden: true }),
    defineField({ name: "candidateName", title: "Candidate name", type: "string", readOnly: true }),
    defineField({ name: "email", title: "Email", type: "string", readOnly: true }),
    defineField({ name: "phone", title: "Phone", type: "string", readOnly: true }),
    defineField({ name: "message", title: "Cover message", type: "text", readOnly: true }),
    defineField({ name: "cvLink", title: "CV link", type: "url", readOnly: true }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Screened", value: "screened" },
          { title: "Interview", value: "interview" },
          { title: "Offer", value: "offer" },
          { title: "Hired", value: "hired" },
          { title: "Rejected", value: "rejected" },
        ],
        layout: "radio",
      },
      initialValue: "new",
    }),
    defineField({ name: "notes", title: "Recruiter notes", type: "text" }),
    defineField({ name: "appliedAt", title: "Applied at", type: "datetime", readOnly: true }),
  ],
  preview: {
    select: { title: "candidateName", subtitle: "jobTitle", status: "status" },
    prepare({ title, subtitle, status }) {
      return { title, subtitle: `${subtitle} · ${status}` };
    },
  },
  orderings: [
    { title: "Newest first", name: "appliedAtDesc", by: [{ field: "appliedAt", direction: "desc" }] },
  ],
});
