import { createClient } from "@sanity/client";
import { createReadStream } from "node:fs";
import { readdir } from "node:fs/promises";
import path from "node:path";

const SOURCE_DIR = path.join("source-images", "sequence");

const PUBLICATION_BY_POSITION = {
  1: "C41 Magazine",
  2: "VAKUUM Magazine",
  3: "C41 Magazine",
  4: "C41 Magazine",
  5: "C41 Magazine",
  6: "C41 Magazine",
  7: "C41 Magazine",
  8: "Numéro Switzerland",
  9: "Numéro Switzerland",
  10: "Numéro Switzerland",
  11: "Numéro Switzerland",
  12: "Numéro Switzerland",
  13: "Numéro Switzerland",
  14: "Numéro Switzerland",
  15: "PAP Magazine",
  16: "PAP Magazine",
  17: "PAP Magazine",
  18: "PAP Magazine",
  19: "Nyankiir in London",
  20: "Nyankiir in London",
  21: "Nyankiir in London",
};

const SLUGS = {
  "Numéro Switzerland": "numero-switzerland",
  "C41 Magazine": "c41-magazine",
  "VAKUUM Magazine": "vakuum-magazine",
  "PAP Magazine": "pap-magazine",
  "Nyankiir in London": "nyankiir-in-london",
};

const INDEX_ORDER = [
  "Numéro Switzerland",
  "C41 Magazine",
  "VAKUUM Magazine",
  "PAP Magazine",
];

const SITE_NAME = "Anda Lavinia Stancu";

const credits = () => [
  { _type: "credit", _key: "photography", label: "Photography", value: "TK" },
  { _type: "credit", _key: "model", label: "Model", value: "TK" },
  { _type: "credit", _key: "hair", label: "Hair", value: "TK" },
  { _type: "credit", _key: "makeup", label: "Make-up", value: "TK" },
  { _type: "credit", _key: "styling", label: "Styling", value: SITE_NAME },
];

const client = createClient({
  projectId: "6jvpibwc",
  dataset: "production",
  apiVersion: "2024-10-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const imageRef = (assetId, key) => ({
  _type: "image",
  _key: key,
  asset: { _type: "reference", _ref: assetId },
});

async function main() {
  const files = (await readdir(SOURCE_DIR))
    .map((file) => {
      const match = file.match(/^(\d+)\s*(.*?)\.(?:jpe?g|png|tiff?)$/i);
      return match ? { file, position: Number(match[1]) } : null;
    })
    .filter(Boolean)
    .sort((a, b) => a.position - b.position);

  if (files.length === 0) throw new Error("no source images found");

  const assets = new Map();
  for (const { file, position } of files) {
    const asset = await client.assets.upload(
      "image",
      createReadStream(path.join(SOURCE_DIR, file)),
      { filename: file },
    );
    assets.set(position, asset._id);
    process.stdout.write(`uploaded ${position} -> ${asset._id}\n`);
  }

  const byPublication = new Map();
  for (const { position } of files) {
    const publication = PUBLICATION_BY_POSITION[position];
    if (!byPublication.has(publication)) byPublication.set(publication, []);
    byPublication.get(publication).push(position);
  }

  for (const [title, positions] of byPublication) {
    const slug = SLUGS[title];
    await client.createOrReplace({
      _id: `editorial-${slug}`,
      _type: "editorial",
      title,
      slug: { _type: "slug", current: slug },
      images: positions.map((position) =>
        imageRef(assets.get(position), `img-${position}`),
      ),
      credits: credits(),
    });
    process.stdout.write(`editorial ${title} (${positions.length} images)\n`);
  }

  await client.createOrReplace({
    _id: "homeSequence",
    _type: "homeSequence",
    frames: files.map(({ position }) => ({
      _type: "frame",
      _key: `frame-${position}`,
      image: imageRef(assets.get(position)).asset
        ? { _type: "image", asset: { _type: "reference", _ref: assets.get(position) } }
        : undefined,
      editorial: {
        _type: "reference",
        _ref: `editorial-${SLUGS[PUBLICATION_BY_POSITION[position]]}`,
      },
    })),
  });
  process.stdout.write(`home sequence (${files.length} frames)\n`);

  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    name: SITE_NAME,
    role: "Fashion stylist and creative consultant",
    email: "andalaviniastancu@gmail.com",
    instagramHandle: "@anda.lavinia.stancu",
    instagramUrl: "https://instagram.com/anda.lavinia.stancu",
    infoHeading: "Fashion stylist and creative consultant available worldwide",
    infoNote: "Commercial portfolio upon request",
    indexOrder: INDEX_ORDER.map((title) => ({
      _type: "reference",
      _key: SLUGS[title],
      _ref: `editorial-${SLUGS[title]}`,
    })),
  });
  process.stdout.write("site settings\n");
}

await main();
