import { defineField, defineType } from "sanity";

export const frame = defineType({
  name: "frame",
  title: "Frame",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "editorial",
      title: "Publication",
      description: "The title shown underneath this image on the homepage.",
      type: "reference",
      to: [{ type: "editorial" }],
    }),
  ],
  preview: { select: { media: "image", title: "editorial.title" } },
});
