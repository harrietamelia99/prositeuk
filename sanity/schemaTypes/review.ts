import { defineField, defineType } from "sanity";

export const reviewType = defineType({
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    defineField({
      name: "firstName",
      title: "First name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "reviewerType",
      title: "Reviewer type",
      type: "string",
      options: {
        list: [
          { title: "Client", value: "client" },
          { title: "Candidate", value: "candidate" },
          { title: "Worker on placement", value: "placement" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "company",
      title: "Company or project (optional)",
      type: "string",
    }),
    defineField({
      name: "rating",
      title: "Star rating",
      type: "number",
      options: {
        list: [
          { title: "★★★★★ (5)", value: 5 },
          { title: "★★★★☆ (4)", value: 4 },
          { title: "★★★☆☆ (3)", value: 3 },
          { title: "★★☆☆☆ (2)", value: 2 },
          { title: "★☆☆☆☆ (1)", value: 1 },
        ],
      },
      validation: (rule) => rule.required().min(1).max(5).integer(),
    }),
    defineField({
      name: "review",
      title: "Review",
      type: "text",
      rows: 6,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "canPublish",
      title: "Happy for us to share it publicly",
      type: "boolean",
      description: "Ticked by the reviewer. Only use reviews with this ticked on the website, social media or outreach.",
    }),
    defineField({
      name: "approved",
      title: "Approved for use",
      type: "boolean",
      initialValue: false,
      description: "Tick once you've read it and are happy to use it.",
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted at",
      type: "datetime",
      readOnly: true,
    }),
  ],
  preview: {
    select: { title: "firstName", subtitle: "review", type: "reviewerType", canPublish: "canPublish", rating: "rating" },
    prepare({ title, subtitle, type, canPublish, rating }) {
      const label = type === "client" ? "Client" : type === "candidate" ? "Candidate" : "Placement";
      const stars = rating ? `${"★".repeat(rating)}${"☆".repeat(5 - rating)} ` : "";
      return { title: `${stars}${title} (${label})${canPublish ? "" : " · private"}`, subtitle };
    },
  },
  orderings: [
    { title: "Newest first", name: "submittedAtDesc", by: [{ field: "submittedAt", direction: "desc" }] },
  ],
});
