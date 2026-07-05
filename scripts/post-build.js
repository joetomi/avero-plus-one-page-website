import { mkdir, copyFile } from "node:fs/promises";
import path from "node:path";

async function run() {
  try {
    const distMenuDir = path.resolve("dist", "menu");
    await mkdir(distMenuDir, { recursive: true });
    
    const srcIndex = path.resolve("dist", "index.html");
    const destIndex = path.resolve(distMenuDir, "index.html");
    
    await copyFile(srcIndex, destIndex);
    console.log("Successfully copied index.html to dist/menu/index.html for client-side routing support.");
  } catch (e) {
    console.error("Post-build copy failed:", e);
    process.exit(1);
  }
}

run();
