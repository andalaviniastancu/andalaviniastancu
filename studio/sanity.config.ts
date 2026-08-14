import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { media } from "sanity-plugin-media";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

const SINGLETONS = ["siteSettings", "homeSequence"];

export default defineConfig({
  name: "default",
  title: "Anda Lavinia Stancu",
  projectId: "6jvpibwc",
  dataset: "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site settings")
              .id("siteSettings")
              .child(
                S.document().schemaType("siteSettings").documentId("siteSettings"),
              ),
            S.listItem()
              .title("Home sequence")
              .id("homeSequence")
              .child(
                S.document().schemaType("homeSequence").documentId("homeSequence"),
              ),
            S.divider(),
            S.documentTypeListItem("editorial").title("Editorials"),
          ]),
    }),
    media(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETONS.includes(schemaType)),
  },

  document: {
    actions: (actions, { schemaType }) =>
      SINGLETONS.includes(schemaType)
        ? actions.filter(
            ({ action }) =>
              action && !["duplicate", "delete", "unpublish"].includes(action),
          )
        : actions,
  },
})
