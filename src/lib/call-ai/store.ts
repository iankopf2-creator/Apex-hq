import { readJsonArray, writeJsonArray } from "../../../shared/json-store";
import type { CallCapture } from "./types";

const FILENAME = "call-ai-dry-runs.json";

export async function listCallAiDryRuns(): Promise<CallCapture[]> {
  return readJsonArray<CallCapture>(FILENAME);
}

export async function saveCallAiDryRun(
  record: CallCapture
): Promise<CallCapture> {
  const all = await listCallAiDryRuns();
  all.push(record);
  const trimmed = all.length > 200 ? all.slice(-200) : all;
  await writeJsonArray(FILENAME, trimmed);
  return record;
}
