import { defineField, defineType } from "sanity";

export const jobAlertSubscriberType = defineType({
  name: "jobAlertSubscriber",
  title: "Job Alert Subscriber",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Phone (optional)",
      type: "string",
    }),
    defineField({
      name: "collarPreference",
      title: "Role preference",
      type: "string",
      options: {
        list: [
          { title: "Blue Collar (Groundworkers, labourers, plant operators)", value: "blue" },
          { title: "White Collar (Site engineers, site & project management)", value: "white" },
          { title: "Both", value: "both" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Preferred location / region",
      type: "string",
    }),
    defineField({
      name: "notes",
      title: "Additional notes",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "subscribedAt",
      title: "Subscribed at",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "active",
      title: "Active subscriber",
      type: "boolean",
      initialValue: true,
      description: "Uncheck to stop sending this person job alerts.",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "email",
      collarPreference: "collarPreference",
    },
    prepare({ title, subtitle, collarPreference }) {
      const badge = collarPreference === "blue" ? "🔵" : collarPreference === "white" ? "⚪️" : "🔵⚪️";
      return { title: `${badge} ${title}`, subtitle };
    },
  },
  orderings: [
    {
      title: "Newest first",
      name: "subscribedAtDesc",
      by: [{ field: "subscribedAt", direction: "desc" }],
    },
  ],
});
