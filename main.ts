// One Line, One Laugh: Roast Your Fridge
// Writes a single roast line (<= 200 chars) to /output/entry.txt.
//
// The line: the smart fridge acts with petty intent — it orders its own
// groceries, then punishes its owner for the yoghurt it let expire.
// Specific detail (self-ordered groceries, expired yoghurt), twist in the
// last words (apologising to the yoghurt), one sentence, reads aloud clean.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ROAST =
  "My smart fridge ordered its own groceries, then locked the door until I apologised to the yoghurt it let expire.";

const MAX_CHARS = 200;

function validate(line: string): void {
  if (line.trim().length === 0) {
    throw new Error("entry must not be blank");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(
      `entry is ${line.length} chars, over the ${MAX_CHARS} cap`,
    );
  }
  if (line.includes("\n")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  validate(ROAST);
  // Never delete the output dir: the grader mounts it read-only for us.
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", ROAST, "utf8");
  // Read back what landed on disk and confirm it is byte-identical.
  const written = readFileSync("/output/entry.txt", "utf8");
  if (written !== ROAST) {
    throw new Error("entry.txt on disk does not match the roast line");
  }
  console.log(`wrote ${ROAST.length} chars to /output/entry.txt`);
}

main();
