import { promises as fs } from "fs";
import path from "path";
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
  try {
    const data = await fs.readFile(CONFIG_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return {};
  }
}

export async function writeAppConfig(config: AppConfig): Promise<void> {
  await fs.writeFile(CONFIG_FILE, JSON.stringify(config, null, 2));
}
