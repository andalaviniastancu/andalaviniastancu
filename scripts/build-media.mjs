import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE_DIR = path.join("source-images", "sequence");
const OUTPUT_DIR = path.join("public", "media");
const MANIFEST = path.join("app", "data", "media.ts");
const WIDTHS = [256, 384, 640, 1200, 2048];
const QUALITY = 72;

function parseName(file) {
  const match = file.match(/^(\d+)\s*(.*?)\.(?:jpe?g|png|tiff?)$/i);
  if (!match) return null;
  return { position: Number(match[1]), label: match[2].trim() };
}

async function buildImage(file, position) {
  const sourcePath = path.join(SOURCE_DIR, file);
  const { width, height } = await sharp(sourcePath).metadata();

  for (const requestedWidth of WIDTHS) {
    await sharp(sourcePath)
      .resize({ width: Math.min(requestedWidth, width) })
      .webp({ quality: QUALITY })
      .toFile(path.join(OUTPUT_DIR, `${position}-${requestedWidth}.webp`));
  }

  return { position, src: `/media/${position}`, width, height };
}

async function main() {
  await rm(OUTPUT_DIR, { recursive: true, force: true });
  await mkdir(OUTPUT_DIR, { recursive: true });

  const files = (await readdir(SOURCE_DIR))
    .map((file) => ({ file, meta: parseName(file) }))
    .filter(({ meta }) => meta)
    .sort((a, b) => a.meta.position - b.meta.position);

  const entries = [];

  for (const { file, meta } of files) {
    const entry = await buildImage(file, meta.position);
    entries.push(entry);
    process.stdout.write(
      `${meta.position}\t${entry.width}x${entry.height}\t${meta.label || "-"}\n`,
    );
  }

  const positions = entries.map(({ position }) => position);
  const expected = Array.from({ length: entries.length }, (_, i) => i + 1);
  if (positions.join() !== expected.join()) {
    throw new Error(`sequence is not 1..${entries.length}: got ${positions.join()}`);
  }

  const body = entries
    .map(
      ({ position, src, width, height }) =>
        `  { position: ${position}, src: "${src}", width: ${width}, height: ${height} },`,
    )
    .join("\n");

  await writeFile(MANIFEST, `export const MEDIA = [\n${body}\n] as const;\n`, "utf8");
  process.stdout.write(`\n${entries.length} images, ${WIDTHS.length} widths each\n`);
}

await main();
