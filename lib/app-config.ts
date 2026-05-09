import "server-only";

import { promises as fs } from "fs";
import path from "path";
import { hasTursoConfig, tursoExecute } from "@/lib/turso";
import type { AddOnSelection } from "@/lib/quote";

export interface AddonConfig {
  id: keyof AddOnSelection;
  label: string;
  free: boolean;
  [key: string]: any;
}

export interface AppConfig {
  [key: string]: any;
}

const CONFIG_FILE = path.join(process.cwd(), "app-config.json");

export async function readAppConfig(): Promise<AppConfig> {
  if (hasTursoConfig()) {
    try {
      const result = await tursoExecute("SELECT data FROM app_config WHERE id = 1");
      if (result.rows.length > 0) {
        return JSON.parse(String(result.rows[0].data));
      }
    } catch {
      // Fall through to file system fallback
    }
  }

  try {
    const data = await fs.readFile(CONFIG_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return {};
  }
}

export async function writeAppConfig(config: AppConfig): Promise<void> {
  if (hasTursoConfig()) {
    await tursoExecute({
      sql: "INSERT OR REPLACE INTO app_config (id, data) VALUES (1, ?)",
      args: [JSON.stringify(config)],
    });
    return;
  }

  await fs.writeFile(CONFIG_FILE, JSON.stringify(config, null, 2));
}
