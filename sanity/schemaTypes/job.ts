import { defineField, defineType } from "sanity";

export const jobType = defineType({
  name: "job",
  title: "Job",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Job Title",
      type: "string",
      description: "The slug (URL) will be generated automatically from this title.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL slug (auto-generated)",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: () => true,
      },
      readOnly: true,
      description: "This is set automatically — no need to edit it.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "employmentType",
      title: "Employment Type",
      type: "string",
      options: {
        list: ["Permanent", "Contract", "Temporary"],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "salary",
      title: "Salary / Rate",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Job Description",
      type: "text",
      rows: 6,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Published", value: "published" },
          { title: "Closed", value: "closed" },
        ],
        layout: "radio",
      },
      initialValue: "published",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "location",
      status: "status",
    },
    prepare({ title, subtitle, status }) {
      return {
        title,
        subtitle: `${subtitle ?? ""} · ${status ?? "draft"}`,
      };
    },
  },
});
