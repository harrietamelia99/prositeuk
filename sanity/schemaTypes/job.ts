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
      title: "URL slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input: string) =>
          input.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").slice(0, 96),
      },
      description: "Click 'Generate' after entering the title — this is set automatically.",
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
      name: "region",
      title: "Map Region",
      type: "string",
      description: "Used to place this job on the map. Pick the nearest region.",
      options: {
        list: [
          { title: "London & South East", value: "london-south-east" },
          { title: "Suffolk / East Anglia", value: "suffolk-east-anglia" },
          { title: "Midlands", value: "midlands" },
          { title: "North West", value: "north-west" },
          { title: "Yorkshire", value: "yorkshire" },
          { title: "South West", value: "south-west" },
          { title: "Wales", value: "wales" },
          { title: "Scotland", value: "scotland" },
          { title: "North East", value: "north-east" },
          { title: "Remote / UK-Wide", value: "remote" },
        ],
      },
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
