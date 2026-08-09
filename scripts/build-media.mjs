import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE_DIR = "source-images";
const OUTPUT_DIR = path.join("public", "media");
const MANIFEST = path.join("app", "data", "media.ts");
const WIDTHS = [128, 256, 384, 640, 1200, 2048];
const QUALITY = 72;

const SLUGS = {
  "vakuum-universe": "vakuum-universe",
  numeroswitzerland: "numero-switzerland",
  nyankiir: "nyankiir",
  c41magazine: "c41-magazine",
};

async function buildImage(sourcePath, slug, index) {
  const original = sharp(sourcePath);
  const { width, height } = await original.metadata();
  const targetDir = path.join(OUTPUT_DIR, slug);
  await mkdir(targetDir, { recursive: true });

  for (const requestedWidth of WIDTHS) {
    await sharp(sourcePath)
      .resize({ width: Math.min(requestedWidth, width) })
      .webp({ quality: QUALITY })
      .toFile(path.join(targetDir, `${index}-${requestedWidth}.webp`));
  }

  return { key: `${slug}/${index}`, src: `/media/${slug}/${index}`, width, height };
}

async function main() {
  await rm(OUTPUT_DIR, { recursive: true, force: true });
  const entries = [];

  for (const [folder, slug] of Object.entries(SLUGS)) {
    const files = (await readdir(path.join(SOURCE_DIR, folder)))
      .filter((file) => /\.(jpe?g|png|tiff?)$/i.test(file))
      .sort();

    for (const [position, file] of files.entries()) {
      const entry = await buildImage(
        path.join(SOURCE_DIR, folder, file),
        slug,
        position + 1,
      );
      entries.push(entry);
      process.stdout.write(`${entry.key} ${entry.width}x${entry.height}\n`);
    }
  }

  const body = entries
    .map(
      ({ key, src, width, height }) =>
        `  "${key}": { src: "${src}", width: ${width}, height: ${height} },`,
    )
    .join("\n");

  await writeFile(
    MANIFEST,
    `export const MEDIA = {\n${body}\n} as const;\n`,
    "utf8",
  );

  process.stdout.write(`\n${entries.length} images, ${WIDTHS.length} widths each\n`);
}

await main();
