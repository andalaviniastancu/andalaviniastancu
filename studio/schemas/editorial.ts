import { defineField, defineType } from "sanity";
import { createBatchImageInput } from "../components/batch-image-input";

const batchImages = createBatchImageInput((assetId, key) => ({
  _type: "image",
  _key: key,
  asset: { _type: "reference", _ref: assetId },
}));

export const editorial = defineType({
  name: "editorial",
  title: "Editorial",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "images",
      title: "Full editorial",
      description: "Drag to reorder. Use the button below to add several at once.",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: false },
          fields: [
            {
              name: "alt",
              title: "Alt text",
              type: "string",
              description: "Describes the image for screen readers.",
            },
          ],
        },
      ],
      options: { layout: "grid" },
      components: { input: batchImages },
    }),
    defineField({
      name: "credits",
      title: "Team credits",
      description: "Drag to reorder. Shown at the end of the editorial page.",
      type: "array",
      of: [{ type: "credit" }],
    }),
  ],
  preview: { select: { title: "title", media: "images.0" } },
});
