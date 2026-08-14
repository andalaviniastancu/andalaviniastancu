import { defineField, defineType } from "sanity";
import { createBatchImageInput } from "../components/batch-image-input";

const batchFrames = createBatchImageInput((assetId, key) => ({
  _type: "frame",
  _key: key,
  image: { _type: "image", asset: { _type: "reference", _ref: assetId } },
}));

export const homeSequence = defineType({
  name: "homeSequence",
  title: "Home sequence",
  type: "document",
  fields: [
    defineField({
      name: "frames",
      title: "Running order",
      description:
        "Drag to reorder. This is the order visitors step through on the homepage.",
      type: "array",
      of: [{ type: "frame" }],
      options: { layout: "grid" },
      components: { input: batchFrames },
    }),
  ],
  preview: { prepare: () => ({ title: "Home sequence" }) },
});
