import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "prositeuk",
  title: "PROSITEUK",
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("PROSITEUK")
          .items([
            S.listItem()
              .title("Jobs")
              .child(
                S.list()
                  .title("Jobs")
                  .items([
                    S.listItem()
                      .title("Live Jobs")
                      .child(S.documentList().title("Live Jobs").filter('_type == "job" && status == "published"')),
                    S.listItem()
                      .title("Drafts")
                      .child(S.documentList().title("Drafts").filter('_type == "job" && status == "draft"')),
                    S.listItem()
                      .title("Closed")
                      .child(S.documentList().title("Closed").filter('_type == "job" && status == "closed"')),
                    S.divider(),
                    S.listItem()
                      .title("All Jobs")
                      .child(S.documentList().title("All Jobs").filter('_type == "job"')),
                  ])
              ),
            S.divider(),
            S.listItem()
              .title("Applications")
              .child(
                S.list()
                  .title("Applications")
                  .items([
                    S.listItem()
                      .title("🆕 New")
                      .child(S.documentList().title("New").filter('_type == "application" && status == "new"').defaultOrdering([{ field: "appliedAt", direction: "desc" }])),
                    S.listItem()
                      .title("📋 Screened")
                      .child(S.documentList().title("Screened").filter('_type == "application" && status == "screened"').defaultOrdering([{ field: "appliedAt", direction: "desc" }])),
                    S.listItem()
                      .title("🗓 Interview")
                      .child(S.documentList().title("Interview").filter('_type == "application" && status == "interview"').defaultOrdering([{ field: "appliedAt", direction: "desc" }])),
                    S.listItem()
                      .title("💼 Offer")
                      .child(S.documentList().title("Offer").filter('_type == "application" && status == "offer"').defaultOrdering([{ field: "appliedAt", direction: "desc" }])),
                    S.listItem()
                      .title("✅ Hired")
                      .child(S.documentList().title("Hired").filter('_type == "application" && status == "hired"').defaultOrdering([{ field: "appliedAt", direction: "desc" }])),
                    S.listItem()
                      .title("❌ Rejected")
                      .child(S.documentList().title("Rejected").filter('_type == "application" && status == "rejected"').defaultOrdering([{ field: "appliedAt", direction: "desc" }])),
                    S.divider(),
                    S.listItem()
                      .title("All Applications")
                      .child(S.documentList().title("All Applications").filter('_type == "application"').defaultOrdering([{ field: "appliedAt", direction: "desc" }])),
                  ])
              ),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
});
