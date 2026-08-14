import { Button, Card, Stack } from "@sanity/ui";
import { useCallback, useRef, useState, type ChangeEvent } from "react";
import {
  insert,
  setIfMissing,
  useClient,
  type ArrayOfObjectsInputProps,
} from "sanity";

const BATCH_SIZE = 5;
const API_VERSION = "2024-10-01";

type ItemBuilder = (assetId: string, key: string) => Record<string, unknown>;

const uniqueKey = (seed: number) =>
  `${Date.now().toString(36)}${seed}${Math.random().toString(36).slice(2, 8)}`;

export function createBatchImageInput(buildItem: ItemBuilder) {
  return function BatchImageInput(props: ArrayOfObjectsInputProps) {
    const { onChange } = props;
    const client = useClient({ apiVersion: API_VERSION });
    const fileInput = useRef<HTMLInputElement>(null);
    const [progress, setProgress] = useState<string | null>(null);

    const handleFiles = useCallback(
      async (event: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files ?? []);
        event.target.value = "";
        if (files.length === 0) return;

        onChange(setIfMissing([]));
        setProgress(`Uploading 0 / ${files.length}`);

        try {
          for (let start = 0; start < files.length; start += BATCH_SIZE) {
            const slice = files.slice(start, start + BATCH_SIZE);

            const assets = await Promise.all(
              slice.map((file) =>
                client.assets.upload("image", file, { filename: file.name }),
              ),
            );

            onChange(
              insert(
                assets.map((asset, offset) =>
                  buildItem(asset._id, uniqueKey(start + offset)),
                ),
                "after",
                [-1],
              ),
            );

            setProgress(
              `Uploading ${Math.min(start + BATCH_SIZE, files.length)} / ${files.length}`,
            );
          }
        } finally {
          setProgress(null);
        }
      },
      [client, onChange],
    );

    return (
      <Stack space={3}>
        {props.renderDefault(props)}

        <Card paddingTop={1}>
          <Button
            mode="ghost"
            tone="primary"
            width="fill"
            disabled={progress !== null}
            text={progress ?? "Upload multiple images"}
            onClick={() => fileInput.current?.click()}
          />
          <input
            ref={fileInput}
            type="file"
            multiple
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFiles}
          />
        </Card>
      </Stack>
    );
  };
}
