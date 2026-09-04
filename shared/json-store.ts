/**
 * Writable JSON array store for Vercel-safe ephemeral persistence.
 * Prefer DATA_DIR / cwd/data, then /tmp/apex-hq-data, then in-memory.
 */
import { promises as fs } from "fs";
import path from "path";

const PREFERRED_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
const TMP_DIR = path.join("/tmp", "apex-hq-data");

type Backend = "fs" | "memory";

const memoryFiles = new Map<string, string>();
let backend: Backend | null = null;
let dataDir: string = PREFERRED_DIR;

async function dirIsWritable(dir: string): Promise<boolean> {
  try {
    await fs.mkdir(dir, { recursive: true });
    const probe = path.join(dir, ".write-probe");
    await fs.writeFile(probe, "ok", "utf8");
    await fs.unlink(probe);
    return true;
  } catch {
    return false;
  }
}

async function resolveBackend(): Promise<Backend> {
  if (backend) return backend;
  if (await dirIsWritable(PREFERRED_DIR)) {
    dataDir = PREFERRED_DIR;
    backend = "fs";
    return backend;
  }
  if (await dirIsWritable(TMP_DIR)) {
    dataDir = TMP_DIR;
    backend = "fs";
    return backend;
  }
  backend = "memory";
  return backend;
}

function filePath(filename: string): string {
  return path.join(dataDir, filename);
}

/** Read a JSON array file; missing/invalid → []. */
export async function readJsonArray<T>(filename: string): Promise<T[]> {
  const mode = await resolveBackend();
  if (mode === "memory") {
    const raw = memoryFiles.get(filename);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as T[];
    } catch {
      return [];
    }
  }
  const file = filePath(filename);
  try {
    await fs.access(file);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(file, "[]\n", "utf8");
    return [];
  }
  try {
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

/** Write a JSON array file (pretty-printed). */
export async function writeJsonArray<T>(filename: string, list: T[]): Promise<void> {
  const mode = await resolveBackend();
  const body = JSON.stringify(list, null, 2) + "\n";
  if (mode === "memory") {
    memoryFiles.set(filename, body);
    return;
  }
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(filePath(filename), body, "utf8");
}

/** Test helper: reset cached backend (e.g. after env change). */
export function __resetJsonStoreForTests(): void {
  backend = null;
  dataDir = PREFERRED_DIR;
  memoryFiles.clear();
}
