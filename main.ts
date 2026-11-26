// The Painfully Honest Out-of-Office — entry program.
//
// Writes a single painfully honest but still polite out-of-office
// auto-reply to /output/entry.txt, exactly as the gate requires: UTF-8
// text, 1 to 200 characters, not only white space, one sentence, no
// trailing newline.
//
// The line (152 characters) was chosen from 8 candidates compared
// head-to-head against the judge brief — see
// ../u-po-pu-the-painfully-honest-out-of-office-63e7ca0b-candidates.md.
// Angle: the auto-reply admits it was written by a machine, because a
// human would have pretended to be delighted to hear from you — honesty
// about the performance of politeness itself, polite to everyone because
// it criticises only the sender's own behaviour.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I am away until Monday, and this reply was written by a machine, which is honest, because a human would have pretended to be delighted to hear from you.";

// Runtime mirror of the sealed gate: refuse to write anything invalid
// rather than submit a file the judge would score 0. The gate also
// requires one sentence, so a stray line break inside the line is a
// failure too — the judge compares exactly what the file holds.
if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
  throw new Error(`entry line fails the 1-200 character gate: ${LINE.length} chars`);
}
if (/[\r\n]/.test(LINE)) {
  throw new Error("entry line must be a single sentence on one line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
