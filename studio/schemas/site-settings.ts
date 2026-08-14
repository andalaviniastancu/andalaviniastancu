import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
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
      name: "instagramHandle",
      title: "Instagram handle",
      type: "string",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
    }),
    defineField({
      name: "infoHeading",
      title: "Info heading",
      description: "The opening line on the Info page.",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "infoNote",
      title: "Info note",
      description: "The closing line on the Info page.",
      type: "string",
    }),
    defineField({
      name: "indexOrder",
      title: "Index order",
      description: "Drag to reorder the editorials in the Index dropdown.",
      type: "array",
      of: [{ type: "reference", to: [{ type: "editorial" }] }],
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
