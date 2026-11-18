// Generates the diagrams in posts/figures/ used by posts/ostep-notes.md.
// Run: node scripts/figures/ostep.mjs   (rewrites those SVG files)
// The gantt() helper draws scheduler timelines; reuse it for new diagrams.
import fs from "node:fs";
import path from "node:path";

const out = process.argv[2] ?? path.join(import.meta.dirname, "../../posts/figures");
fs.mkdirSync(out, { recursive: true });

const J = { A: "ja", B: "jb", C: "jc", D: "jd", E: "je" };
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const t = (x, y, s, { cls = "fg", size = 13, anchor = "start", weight = 400 } = {}) =>
  `<text x="${x}" y="${y}" class="${cls}" font-size="${size}" text-anchor="${anchor}"${weight !== 400 ? ` font-weight="${weight}"` : ""}>${esc(s)}</text>`;
const svg = (name, w, h, body, { narrow = false, label } = {}) => {
  const s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"${narrow ? ' class="narrow"' : ""} role="img" aria-label="${esc(label)}">
<defs><marker id="arr-${name}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="ink"/></marker></defs>
${body}
</svg>
`;
  fs.writeFileSync(path.join(out, `${name}.svg`), s);
};
const arrow = (name, x1, y1, x2, y2, cls = "st", dash = false) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls}" stroke-width="1.4"${dash ? ' stroke-dasharray="4 3"' : ""} marker-end="url(#arr-${name})"/>`;

// Gantt chart. rows: [{label, blocks: [[job, start, end]]}]
// pre/preH: extra drawing (e.g. queues) placed above the timeline.
function gantt(name, { rows, tmax, ticks, arrivals = [], vlines = [], stats = [], label, rowH = 34, gap = 10, L = 70, W = 640, pre = "", preH = 0, xlabel = "Time (ms)" }) {
  const R = 20;
  const top = preH + (arrivals.length ? 34 : vlines.some((v) => v.label) ? 26 : 12);
  const sx = (W - L - R) / tmax;
  const X = (v) => L + v * sx;
  let b = pre;
  rows.forEach((row, i) => {
    const y = top + i * (rowH + gap);
    b += `<rect x="${L}" y="${y}" width="${W - L - R}" height="${rowH}" class="mb" rx="3"/>`;
    b += t(L - 10, y + rowH / 2 + 4.5, row.label, { anchor: "end", cls: "mu", size: 12, weight: 500 });
    for (const [job, s, e] of row.blocks) {
      const w = (e - s) * sx;
      b += `<rect x="${X(s) + 0.5}" y="${y + 0.5}" width="${Math.max(w - 1, 1)}" height="${rowH - 1}" class="${J[job]}" rx="2"/>`;
      if (w >= 12) b += t(X(s) + w / 2, y + rowH / 2 + 4.5, job, { anchor: "middle", cls: "on", size: w >= 20 ? 13 : 11, weight: 600 });
    }
    if (row.note) b += t(W - R - 8, y + rowH / 2 + 4.5, row.note, { anchor: "end", cls: "mu", size: 12 });
    if (row.idle) b += t((L + W - R) / 2, y + rowH / 2 + 4.5, row.idle, { anchor: "middle", cls: "mu", size: 12 });
  });
  const bottom = top + rows.length * (rowH + gap) - gap;
  for (const v of vlines) {
    b += `<line x1="${X(v.t)}" y1="${top - 6}" x2="${X(v.t)}" y2="${bottom + 6}" class="st" stroke-dasharray="3 3"/>`;
    if (v.label) b += t(X(v.t), top - 10, v.label, { anchor: "middle", cls: "mu", size: 11 });
  }
  for (const a of arrivals) {
    b += arrow(name, X(a.t), preH + 8, X(a.t), top - 2);
    b += t(X(a.t) + 6, preH + 16, a.label, { cls: "mu", size: 11 });
  }
  const ay = bottom + 12;
  b += `<line x1="${L}" y1="${ay}" x2="${W - R}" y2="${ay}" class="ax"/>`;
  for (const v of ticks) {
    b += `<line x1="${X(v)}" y1="${ay}" x2="${X(v)}" y2="${ay + 5}" class="ax"/>`;
    b += t(X(v), ay + 19, v, { anchor: "middle", cls: "mu", size: 11 });
  }
  b += t((L + W - R) / 2, ay + (ticks.length ? 37 : 20), xlabel, { anchor: "middle", cls: "mu", size: 11 });
  let y = ay + (ticks.length ? 62 : 45);
  for (const s of stats) {
    b += t(L, y, s, { size: 13 });
    y += 20;
  }
  svg(name, W, y - 6 + (stats.length ? 0 : -10), b, { label });
}

const range = (a, b, s) => Array.from({ length: Math.floor((b - a) / s) + 1 }, (_, i) => a + i * s);

// ---- Chapter 7 ----
gantt("fifo", {
  label: "FIFO schedule: A runs 0 to 100, B 100 to 110, C 110 to 120",
  rows: [{ label: "CPU", blocks: [["A", 0, 100], ["B", 100, 110], ["C", 110, 120]] }],
  tmax: 120, ticks: range(0, 120, 20),
  stats: ["Average turnaround = (100 + 110 + 120) / 3 = 110"],
});
gantt("sjf", {
  label: "SJF schedule: B 0 to 10, C 10 to 20, A 20 to 120",
  rows: [{ label: "CPU", blocks: [["B", 0, 10], ["C", 10, 20], ["A", 20, 120]] }],
  tmax: 120, ticks: range(0, 120, 20),
  stats: ["Average turnaround = (10 + 20 + 120) / 3 = 50"],
});
gantt("sjf-late", {
  label: "SJF with late arrivals: A runs 0 to 100 even though B and C arrive at 10",
  rows: [{ label: "CPU", blocks: [["A", 0, 100], ["B", 100, 110], ["C", 110, 120]] }],
  arrivals: [{ t: 10, label: "B, C arrive" }],
  tmax: 120, ticks: range(0, 120, 20),
  stats: ["Average turnaround = (100 + (110 − 10) + (120 − 10)) / 3 ≈ 103.3"],
});
gantt("stcf", {
  label: "STCF: A runs 0 to 10, is preempted by B and C, then finishes 30 to 120",
  rows: [{ label: "CPU", blocks: [["A", 0, 10], ["B", 10, 20], ["C", 20, 30], ["A", 30, 120]] }],
  arrivals: [{ t: 10, label: "B, C arrive" }],
  tmax: 120, ticks: range(0, 120, 20),
  stats: ["Average turnaround = ((120 − 0) + (20 − 10) + (30 − 10)) / 3 = 50"],
});
{
  const rr = [];
  for (let i = 0; i < 15; i++) rr.push(["ABC"[i % 3], i, i + 1]);
  gantt("sjf-vs-rr", {
    label: "SJF runs A, B, C for 5 ms each; Round Robin alternates them every 1 ms",
    rows: [
      { label: "SJF", blocks: [["A", 0, 5], ["B", 5, 10], ["C", 10, 15]] },
      { label: "RR", blocks: rr },
    ],
    tmax: 15, ticks: range(0, 15, 1), L: 60,
    stats: [
      "SJF average response = (0 + 5 + 10) / 3 = 5",
      "RR (1 ms slice) average response = (0 + 1 + 2) / 3 = 1",
    ],
  });
}

// ---- Chapter 8 ----
{
  const W = 520, L = 150, rowH = 30, gap = 6, top = 10;
  let b = "";
  const jobs = { 8: ["A", "B"], 4: ["C"], 1: ["D"] };
  for (let q = 8; q >= 1; q--) {
    const y = top + (8 - q) * (rowH + gap);
    b += t(L - 14, y + rowH / 2 + 4.5, `Q${q}`, { anchor: "end", size: 13, weight: 600 });
    if (q === 8) b += t(18, y + rowH / 2 + 4.5, "High priority", { cls: "mu", size: 12 });
    if (q === 1) b += t(18, y + rowH / 2 + 4.5, "Low priority", { cls: "mu", size: 12 });
    b += `<line x1="${L}" y1="${y + rowH / 2}" x2="${W - 20}" y2="${y + rowH / 2}" class="ln" stroke-width="1.5"/>`;
    (jobs[q] || []).forEach((j, i) => {
      const cx = L + 30 + i * 60;
      if (i > 0) b += arrow("mlfq-queues", cx - 46, y + rowH / 2, cx - 16, y + rowH / 2);
      b += `<circle cx="${cx}" cy="${y + rowH / 2}" r="13" class="${J[j]}"/>`;
      b += t(cx, y + rowH / 2 + 4.5, j, { anchor: "middle", cls: "on", weight: 600 });
    });
  }
  b += `<line x1="96" y1="${top + 30}" x2="96" y2="${top + 7 * (rowH + gap) - 4}" class="ax" stroke-width="1.4" marker-end="url(#arr-mlfq-queues)"/>`;
  svg("mlfq-queues", W, top + 8 * (rowH + gap) + 4, b, { narrow: true, label: "MLFQ with eight queues: A and B in Q8, C in Q4, D in Q1" });
}
gantt("mlfq-long-short", {
  label: "A long job drops from Q2 to Q0; short job B arrives at 100 in Q2 and finishes quickly",
  rows: [
    { label: "Q2", blocks: [["A", 0, 10], ["B", 100, 110]] },
    { label: "Q1", blocks: [["A", 10, 20], ["B", 110, 120]] },
    { label: "Q0", blocks: [["A", 20, 100], ["A", 120, 200]] },
  ],
  arrivals: [{ t: 100, label: "B arrives" }],
  tmax: 200, ticks: range(0, 200, 50), L: 50, rowH: 28,
  stats: ["New jobs start at the top. B is short, so it finishes before reaching the bottom queue."],
});
{
  const alt = (from, to, start) => {
    const out = [];
    let k = start;
    for (let s = from; s < to; s += 5) out.push(["BC"[k++ % 2], s, s + 5]);
    return out;
  };
  gantt("mlfq-no-boost", {
    label: "Without priority boost, A sits in Q0 and never runs once B and C arrive",
    rows: [
      { label: "Q2", blocks: [["A", 0, 10], ...alt(100, 200, 0)] },
      { label: "Q1", blocks: [["A", 10, 20]] },
      { label: "Q0", blocks: [["A", 20, 100]], note: "" },
    ],
    arrivals: [{ t: 100, label: "B, C arrive (interactive)" }],
    tmax: 200, ticks: range(0, 200, 50), L: 50, rowH: 28,
    stats: ["Without boost: after t = 100, A never runs again (starvation)."],
  });
  gantt("mlfq-boost", {
    label: "With a priority boost every 50 ms, A moves back to Q2 and gets CPU time",
    rows: [
      { label: "Q2", blocks: [["A", 0, 10], ["A", 50, 60], ["A", 100, 105], ["B", 105, 110], ["C", 110, 115], ["A", 115, 120], ...alt(120, 150, 0), ["A", 150, 155], ["B", 155, 160], ["C", 160, 165], ["A", 165, 170], ...alt(170, 200, 0)] },
      { label: "Q1", blocks: [["A", 10, 20], ["A", 60, 70]] },
      { label: "Q0", blocks: [["A", 20, 50], ["A", 70, 100]] },
    ],
    vlines: [{ t: 50, label: "boost" }, { t: 100, label: "boost" }, { t: 150, label: "boost" }],
    tmax: 200, ticks: range(0, 200, 50), L: 50, rowH: 28,
    stats: ["With boost (S = 50 ms): every boost puts A back in Q2, so it keeps making progress."],
  });
}

// ---- Chapter 9 ----
{
  const W = 640, L = 20, R = 20;
  const sx = (W - L - R) / 100;
  let b = "";
  b += t(L, 18, "Tickets 0–99", { cls: "mu", size: 12 });
  b += `<rect x="${L}" y="28" width="${75 * sx}" height="32" class="ja" rx="2"/>`;
  b += `<rect x="${L + 75 * sx + 1}" y="28" width="${25 * sx - 1}" height="32" class="jb" rx="2"/>`;
  b += t(L + (75 * sx) / 2, 49, "A: tickets 0–74 (75%)", { anchor: "middle", cls: "on", weight: 600 });
  b += t(L + 75 * sx + (25 * sx) / 2, 49, "B: 75–99 (25%)", { anchor: "middle", cls: "on", weight: 600 });
  const wins = [63, 85, 70, 39, 76, 17, 29, 41, 36, 39, 10, 99, 68, 83, 63, 62, 43, 0, 49, 12];
  const cw = (W - L - R) / wins.length;
  b += t(L, 92, "Winning ticket each time slice", { cls: "mu", size: 12 });
  wins.forEach((n, i) => {
    const job = n < 75 ? "A" : "B";
    const x = L + i * cw;
    b += `<rect x="${x + 1}" y="102" width="${cw - 2}" height="26" class="mb" rx="2"/>`;
    b += t(x + cw / 2, 120, n, { anchor: "middle", size: 12 });
    b += `<rect x="${x + 1}" y="132" width="${cw - 2}" height="26" class="${J[job]}" rx="2"/>`;
    b += t(x + cw / 2, 150, job, { anchor: "middle", cls: "on", weight: 600 });
  });
  b += t(L, 184, "B wins 4 of 20 slices (20%), close to its 25% share. Over more slices it gets closer.", { size: 13 });
  svg("lottery", W, 196, b, { label: "Lottery scheduling: A holds 75 tickets, B holds 25; 20 random draws pick who runs" });
}
{
  // Schematic of OSTEP Figure 9.2 (unfairness vs job length)
  const W = 560, H = 300, L = 70, R = 24, T = 20, B = 60;
  const X = (len) => L + (Math.log10(len) / 3) * (W - L - R);
  const Y = (u) => T + (1 - u) * (H - T - B);
  let b = "";
  b += `<line x1="${L}" y1="${Y(0)}" x2="${W - R}" y2="${Y(0)}" class="ax"/>`;
  b += `<line x1="${L}" y1="${Y(0)}" x2="${L}" y2="${Y(1)}" class="ax"/>`;
  for (const u of [0, 0.25, 0.5, 0.75, 1]) {
    b += `<line x1="${L}" y1="${Y(u)}" x2="${W - R}" y2="${Y(u)}" class="ln"/>`;
    b += t(L - 8, Y(u) + 4, u.toFixed(2).replace(/0$/, ""), { anchor: "end", cls: "mu", size: 11 });
  }
  for (const len of [1, 10, 100, 1000]) b += t(X(len), Y(0) + 18, len, { anchor: "middle", cls: "mu", size: 11 });
  const pts = [[1, 0.5], [2, 0.55], [5, 0.65], [10, 0.74], [20, 0.81], [50, 0.88], [100, 0.92], [200, 0.95], [500, 0.97], [1000, 0.98]];
  b += `<path d="${pts.map(([l, u], i) => `${i ? "L" : "M"}${X(l).toFixed(1)} ${Y(u).toFixed(1)}`).join(" ")}" class="sa" stroke-width="2.5"/>`;
  b += t((L + W - R) / 2, H - 22, "Job length (time slices, log scale)", { anchor: "middle", cls: "mu", size: 12 });
  b += `<text x="18" y="${(T + H - B) / 2}" class="mu" font-size="12" text-anchor="middle" transform="rotate(-90 18 ${(T + H - B) / 2})">Unfairness U (1 = perfectly fair)</text>`;
  b += t(X(1) + 12, Y(0.36), "Short jobs: luck matters a lot", { cls: "mu", size: 12 });
  b += t(X(1000) - 4, Y(0.98) + 22, "Long jobs: close to fair", { anchor: "end", cls: "mu", size: 12 });
  svg("lottery-fairness", W, H, b, { narrow: false, label: "Lottery fairness rises toward 1 as jobs run for more time slices" });
}
{
  // Stride trace (OSTEP Figure 9.3)
  const rows = [
    [0, 0, 0, "A"], [100, 0, 0, "B"], [100, 200, 0, "C"], [100, 200, 40, "C"], [100, 200, 80, "C"],
    [100, 200, 120, "A"], [200, 200, 120, "C"], [200, 200, 160, "C"], [200, 200, 200, "…"],
  ];
  const W = 520, cols = [40, 150, 260, 370], cw = 100, rh = 26, top = 66;
  let b = "";
  const heads = [["Pass(A)", "stride 100", "A"], ["Pass(B)", "stride 200", "B"], ["Pass(C)", "stride 40", "C"], ["Who runs?", "lowest pass", null]];
  heads.forEach(([h, sub, j], i) => {
    b += t(cols[i] + cw / 2, 22, h, { anchor: "middle", weight: 600 });
    b += t(cols[i] + cw / 2, 40, sub, { anchor: "middle", cls: "mu", size: 11 });
    if (j) b += `<rect x="${cols[i] + 20}" y="48" width="${cw - 40}" height="4" class="${J[j]}" rx="2"/>`;
  });
  rows.forEach((r, k) => {
    const y = top + k * rh;
    b += `<line x1="${cols[0]}" y1="${y + rh}" x2="${cols[3] + cw}" y2="${y + rh}" class="ln"/>`;
    const who = r[3];
    for (let i = 0; i < 3; i++) {
      const isMin = "ABC"[i] === who;
      if (isMin) b += `<rect x="${cols[i] + 26}" y="${y + 3}" width="${cw - 52}" height="${rh - 6}" class="mb" rx="3"/>`;
      b += t(cols[i] + cw / 2, y + rh / 2 + 4.5, r[i], { anchor: "middle", weight: isMin ? 700 : 400 });
    }
    if (J[who]) {
      b += `<circle cx="${cols[3] + cw / 2}" cy="${y + rh / 2}" r="10" class="${J[who]}"/>`;
      b += t(cols[3] + cw / 2, y + rh / 2 + 4.5, who, { anchor: "middle", cls: "on", size: 12, weight: 600 });
    } else b += t(cols[3] + cw / 2, y + rh / 2 + 4.5, who, { anchor: "middle", cls: "mu" });
  });
  b += t(cols[0], top + rows.length * rh + 26, "Tickets: A = 100, B = 50, C = 250. C runs 5 times, A twice, B once.", { size: 12, cls: "mu" });
  svg("stride", W, top + rows.length * rh + 40, b, { narrow: true, label: "Stride scheduling trace: the process with the lowest pass value runs and its pass grows by its stride" });
}
{
  const blocks = [];
  let s = 0;
  for (let r = 0; r < 2; r++) for (const j of "ABCD") { blocks.push([j, s, s + 12]); s += 12; }
  for (let r = 0; r < 3; r++) for (const j of "AB") { blocks.push([j, s, s + 24]); s += 24; }
  gantt("cfs", {
    label: "CFS with sched_latency 48 ms: four jobs get 12 ms slices; after C and D finish, A and B get 24 ms",
    rows: [{ label: "CPU", blocks }],
    vlines: [{ t: 96, label: "C, D finish" }],
    tmax: 250, ticks: range(0, 250, 50), L: 50,
    stats: ["4 jobs: 48 / 4 = 12 ms each.   2 jobs: 48 / 2 = 24 ms each."],
  });
}
{
  // Red-black tree of vruntimes (shape of OSTEP Figure 9.5)
  const nodes = {
    14: [280, 30, "b"], 9: [160, 90, "b"], 18: [400, 90, "b"],
    1: [100, 150, "b"], 10: [220, 150, "b"], 17: [340, 150, "b"], 22: [460, 150, "r"],
    5: [140, 210, "r"], 21: [420, 210, "b"], 24: [500, 210, "b"],
  };
  const edges = [[14, 9], [14, 18], [9, 1], [9, 10], [18, 17], [18, 22], [1, 5], [22, 21], [22, 24]];
  let b = "";
  for (const [a, c] of edges) b += `<line x1="${nodes[a][0]}" y1="${nodes[a][1]}" x2="${nodes[c][0]}" y2="${nodes[c][1]}" class="ax" stroke-width="1.4"/>`;
  for (const [k, [x, y, col]] of Object.entries(nodes)) {
    b += `<circle cx="${x}" cy="${y}" r="17" class="${col === "r" ? "red" : "blk"}"/>`;
    b += t(x, y + 4.5, k, { anchor: "middle", cls: col === "r" ? "on" : "blk-t", weight: 600 });
  }
  b += `<circle cx="100" cy="150" r="22" class="st" stroke-width="1.5" stroke-dasharray="3 3"/>`;
  b += arrow("cfs-tree", 40, 196, 82, 166);
  b += t(20, 212, "lowest vruntime", { cls: "mu", size: 12 });
  b += t(20, 228, "runs next", { cls: "mu", size: 12 });
  b += t(280, 262, "Each node is a running/runnable process, keyed by vruntime. Insert, delete and find-min are O(log n).", { anchor: "middle", cls: "mu", size: 12 });
  svg("cfs-tree", 560, 276, b, { label: "Red-black tree of process vruntimes; the leftmost node has the lowest vruntime and runs next" });
}

// ---- Chapter 6 ----
{
  const n = "lde-syscall";
  const W = 640;
  let b = "";
  b += `<rect x="10" y="10" width="${W - 20}" height="90" class="mb" rx="6"/>`;
  b += `<rect x="10" y="140" width="${W - 20}" height="90" class="bx" rx="6"/>`;
  b += t(24, 32, "User mode (restricted)", { cls: "mu", size: 12, weight: 600 });
  b += t(24, 162, "Kernel mode (full access)", { cls: "mu", size: 12, weight: 600 });
  b += `<line x1="10" y1="120" x2="${W - 10}" y2="120" class="ax" stroke-dasharray="5 4"/>`;
  b += t(316, 114, "hardware enforces this boundary", { anchor: "middle", cls: "mu", size: 11 });
  const box = (x, y, w, label, sub, cls = "ja") => {
    let s = `<rect x="${x}" y="${y}" width="${w}" height="44" class="${cls}" rx="5"/>`;
    s += t(x + w / 2, y + (sub ? 19 : 27), label, { anchor: "middle", cls: "on", weight: 600 });
    if (sub) s += t(x + w / 2, y + 35, sub, { anchor: "middle", cls: "on", size: 11 });
    return s;
  };
  b += box(30, 46, 150, "Process runs", "normal instructions");
  b += box(430, 46, 180, "Process continues", "with the result");
  b += box(210, 176, 220, "Trap handler (OS)", "create process, allocate memory, I/O", "jd");
  b += arrow(n, 180, 80, 240, 172);
  b += t(200, 146, "system call → trap", { anchor: "end", size: 12, weight: 600 });
  b += arrow(n, 410, 172, 470, 92);
  b += t(446, 146, "return-from-trap", { size: 12, weight: 600 });
  svg(n, W, 240, b, { label: "A system call traps from user mode into the kernel's trap handler, then returns to user mode" });
}
{
  const n = "lde-timer";
  const W = 640, lh = 70, top = 10;
  const lanes = [["Program", "user mode", "mb"], ["Hardware", "", "bx"], ["OS", "kernel mode", "mb"]];
  let b = "";
  lanes.forEach(([name, sub, cls], i) => {
    const y = top + i * (lh + 8);
    b += `<rect x="10" y="${y}" width="${W - 20}" height="${lh}" class="${cls}" rx="6"/>`;
    b += t(20, y + lh / 2 + (sub ? -1 : 4), name, { size: 12, weight: 600 });
    if (sub) b += t(20, y + lh / 2 + 14, sub, { cls: "mu", size: 11 });
  });
  const laneY = (i) => top + i * (lh + 8) + 11;
  const bh = 48;
  const step = (x, lane, w, [head, sub], cls) =>
    `<rect x="${x}" y="${laneY(lane)}" width="${w}" height="${bh}" class="${cls}" rx="5"/>` +
    t(x + w / 2, laneY(lane) + 20, head, { anchor: "middle", cls: "on", size: 12, weight: 600 }) +
    t(x + w / 2, laneY(lane) + 36, sub, { anchor: "middle", cls: "on", size: 11 });
  const S = {
    boot: [100, 2, 96, ["Boot", "trap table, timer"], "jd"],
    a: [206, 0, 84, ["Process A", "runs"], "ja"],
    timer: [300, 1, 110, ["Timer interrupt", "save A, to kernel"], "jc"],
    trap: [420, 2, 100, ["Handle trap", "switch(): A → B"], "jd"],
    ret: [530, 1, 100, ["Return-from-trap", "restore B"], "jc"],
    b: [530, 0, 100, ["Process B", "runs"], "jb"],
  };
  for (const v of Object.values(S)) b += step(...v);
  const R = (k) => S[k][0] + S[k][2], Lx = (k) => S[k][0], T = (k) => laneY(S[k][1]), B = (k) => laneY(S[k][1]) + bh;
  b += arrow(n, R("boot") - 10, T("boot"), Lx("a") + 14, B("a") + 2);
  b += arrow(n, R("a") - 10, B("a"), Lx("timer") + 14, T("timer") - 2);
  b += arrow(n, R("timer") - 10, B("timer"), Lx("trap") + 14, T("trap") - 2);
  b += arrow(n, R("trap") - 10, T("trap"), Lx("ret") + 14, B("ret") + 2);
  b += arrow(n, Lx("ret") + 50, T("ret"), Lx("b") + 50, B("b") + 2);
  svg(n, W, top + 3 * (lh + 8) + 2, b, { label: "Timer interrupt and context switch from process A to process B" });
}

// ---- Chapter 10 ----
{
  const n = "multicore-cache";
  const W = 640;
  let b = "";
  const cpu = (x, label, cacheText, cacheCls) => {
    let s = `<rect x="${x}" y="14" width="200" height="40" class="ja" rx="5"/>`;
    s += t(x + 100, 39, label, { anchor: "middle", cls: "on", weight: 600 });
    s += `<rect x="${x}" y="64" width="200" height="44" class="${cacheCls}" rx="5"/>`;
    s += t(x + 100, 84, "Cache", { anchor: "middle", size: 12, weight: 600 });
    s += t(x + 100, 100, cacheText, { anchor: "middle", cls: "mu", size: 11 });
    s += `<line x1="${x + 100}" y1="108" x2="${x + 100}" y2="150" class="ax" stroke-width="1.4"/>`;
    return s;
  };
  b += cpu(60, "CPU 0", "writes D → D'", "mb");
  b += cpu(380, "CPU 1", "D (stale) → invalidated", "mb");
  b += `<rect x="20" y="150" width="${W - 40}" height="20" class="ink" rx="4"/>`;
  b += t(W / 2, 164, "Bus", { anchor: "middle", cls: "blk-t", size: 12, weight: 600 });
  b += `<line x1="${W / 2}" y1="170" x2="${W / 2}" y2="200" class="ax" stroke-width="1.4"/>`;
  b += `<rect x="${W / 2 - 110}" y="200" width="220" height="44" class="bx" rx="5"/>`;
  b += t(W / 2, 220, "Main memory", { anchor: "middle", weight: 600 });
  b += t(W / 2, 236, "D", { anchor: "middle", cls: "mu", size: 11 });
  b += arrow(n, 270, 128, 370, 128, "st", true);
  b += t(320, 122, "snoop", { anchor: "middle", cls: "mu", size: 11 });
  b += t(W / 2, 270, "Each cache watches the bus. When CPU 0 writes D, CPU 1's cache sees it and drops (or updates) its copy.", { anchor: "middle", cls: "mu", size: 12 });
  svg(n, W, 282, b, { label: "Two CPUs with private caches share memory over a bus; bus snooping keeps the caches coherent" });
}
// ---- Chapter 10 (10.4–10.7), Day 1 post ----
// "Q0 → (A) → (B) → NULL" drawn left to right. jobs: letters, or {job, ghost}.
const queue = (name, x, y, label, jobs, { end, empty, gapX = 58 } = {}) => {
  let b = t(x, y + 4.5, label, { size: 13, weight: 600 });
  let cx = x + label.length * 7.5 + 16;
  b += arrow(name, cx, y, cx + 22, y);
  cx += 22 + 16;
  if (empty) b += t(cx - 10, y + 4.5, empty, { cls: "mu", size: 12 });
  jobs.forEach((j, i) => {
    const job = typeof j === "string" ? j : j.job;
    const ghost = typeof j === "object" && j.ghost;
    if (i > 0) b += arrow(name, cx - gapX + 14, y, cx - 16, y);
    b += ghost
      ? `<circle cx="${cx}" cy="${y}" r="13" class="ln" stroke-width="1.5" stroke-dasharray="3 3"/>` + t(cx, y + 4.5, job, { anchor: "middle", cls: "mu", weight: 600 })
      : `<circle cx="${cx}" cy="${y}" r="13" class="${J[job]}"/>` + t(cx, y + 4.5, job, { anchor: "middle", cls: "on", weight: 600 });
    cx += gapX;
  });
  if (end) {
    b += arrow(name, cx - gapX + 14, y, cx - 12, y);
    b += t(cx - 8, y + 4.5, end, { cls: "mu", size: 12, weight: 600 });
  }
  return b;
};
const slots = (seq) => [...seq].map((j, i) => [j, i, i + 1]);

gantt("sqms", {
  label: "SQMS: one queue A to E shared by four CPUs; each job moves from CPU to CPU",
  pre: queue("sqms", 20, 24, "Queue", ["A", "B", "C", "D", "E"], { end: "NULL" }),
  preH: 52,
  rows: [
    { label: "CPU 0", blocks: slots("AEDCB"), note: "…" },
    { label: "CPU 1", blocks: slots("BAEDC"), note: "…" },
    { label: "CPU 2", blocks: slots("CBAED"), note: "…" },
    { label: "CPU 3", blocks: slots("DCBAE"), note: "…" },
  ],
  tmax: 5.6, ticks: [], xlabel: "Time →", rowH: 30, gap: 8,
});
gantt("mqms-imbalance", {
  label: "MQMS load imbalance: Q0 holds only A, Q1 holds B and D, so A gets twice the CPU",
  pre: queue("mqms-imbalance", 20, 24, "Q0", ["A"]) + queue("mqms-imbalance", 260, 24, "Q1", ["B", "D"]),
  preH: 52,
  rows: [
    { label: "CPU 0", blocks: slots("AAAAAAAA"), note: "…" },
    { label: "CPU 1", blocks: slots("BBDDBBDD"), note: "…" },
  ],
  tmax: 8.6, ticks: [], xlabel: "Time →", rowH: 30, gap: 8,
  stats: ["A gets 2× more CPU."],
});
gantt("mqms-idle", {
  label: "After A finishes, Q0 is empty and CPU 0 sits idle while CPU 1 alternates B and D",
  pre: queue("mqms-idle", 20, 24, "Q0", [], { empty: "(empty)" }) + queue("mqms-idle", 260, 24, "Q1", ["B", "D"]),
  preH: 52,
  rows: [
    { label: "CPU 0", blocks: [], idle: "idle" },
    { label: "CPU 1", blocks: slots("BBDDBBDD"), note: "…" },
  ],
  tmax: 8.6, ticks: [], xlabel: "Time →", rowH: 30, gap: 8,
});
{
  const n = "migration";
  const W = 640;
  let b = "";
  const panel = (x, title) =>
    `<rect x="${x}" y="10" width="270" height="150" class="mb" rx="6"/>` + t(x + 14, 32, title, { cls: "mu", size: 12, weight: 600 });
  b += panel(10, "Before");
  b += panel(360, "After");
  b += queue(n, 28, 70, "Q0", [], { empty: "(empty)" });
  b += queue(n, 28, 124, "Q1", ["B", "D"]);
  b += queue(n, 378, 70, "Q0", ["D"]);
  b += queue(n, 378, 124, "Q1", ["B"]);
  // Q0 peeks at Q1
  b += `<line x1="210" y1="76" x2="210" y2="104" class="st" stroke-width="1.4" stroke-dasharray="4 3" marker-end="url(#arr-${n})"/>`;
  b += t(218, 94, "peek", { cls: "mu", size: 12 });
  b += arrow(n, 288, 85, 354, 85);
  b += t(321, 76, "migrate D", { anchor: "middle", size: 12, weight: 600 });
  svg(n, W, 170, b, { label: "Migration: empty Q0 peeks at Q1 and steals job D" });
}
{
  const n = "o1-scheduler";
  const W = 640, top = 40, rh = 34;
  let b = "";
  b += t(150, 22, "Priority", { anchor: "end", cls: "mu", size: 12, weight: 600 });
  b += t(170, 22, "Timeslice", { cls: "mu", size: 12, weight: 600 });
  const widths = [250, 195, 145, 100, 60];
  widths.forEach((w, i) => {
    const y = top + i * rh;
    const lbl = i === 0 ? "highest" : i === widths.length - 1 ? "lowest" : "";
    if (lbl) b += t(150, y + 17, lbl, { anchor: "end", size: 12, weight: 600 });
    else b += t(150, y + 17, "·", { anchor: "end", cls: "mu", size: 14 });
    b += `<rect x="170" y="${y}" width="${w}" height="24" class="ja" rx="3" opacity="${1 - i * 0.14}"/>`;
  });
  const bottom = top + widths.length * rh - 10;
  b += `<line x1="460" y1="${bottom}" x2="460" y2="${top + 2}" class="st" stroke-width="1.6" marker-end="url(#arr-${n})"/>`;
  b += t(472, top + 14, "more time sleeping", { size: 12, weight: 600 });
  b += t(472, top + 30, "→ more interactive", { cls: "mu", size: 12 });
  b += t(472, top + 46, "→ boost priority", { cls: "mu", size: 12 });
  b += `<line x1="448" y1="${top + 2}" x2="448" y2="${bottom}" class="ax" stroke-width="1.6" marker-end="url(#arr-${n})"/>`;
  b += t(472, bottom - 36, "less time sleeping", { size: 12, weight: 600 });
  b += t(472, bottom - 20, "→ less interaction", { cls: "mu", size: 12 });
  b += t(472, bottom - 4, "→ less priority", { cls: "mu", size: 12 });
  svg(n, W, bottom + 16, b, { label: "O(1) scheduler: higher priorities get longer timeslices; sleeping a lot boosts priority" });
}
{
  const n = "bfs";
  const W = 640;
  let b = "";
  b += t(20, 24, "One global queue, ordered by virtual deadline", { cls: "mu", size: 12, weight: 600 });
  const tasks = [["A", 12], ["C", 15], ["B", 20], ["D", 31], ["E", 40]];
  b += t(20, 74, "Queue", { size: 13, weight: 600 });
  b += arrow(n, 76, 70, 100, 70);
  tasks.forEach(([job, d], i) => {
    const cx = 130 + i * 90;
    if (i > 0) b += arrow(n, cx - 90 + 15, 70, cx - 16, 70);
    b += `<circle cx="${cx}" cy="70" r="15" class="${J[job]}"/>`;
    b += t(cx, 75, job, { anchor: "middle", cls: "on", weight: 600 });
    b += t(cx, 104, `deadline ${d}`, { anchor: "middle", cls: "mu", size: 11 });
  });
  const cpu = (x, label) =>
    `<rect x="${x}" y="150" width="120" height="38" class="bx" rx="5"/>` + t(x + 60, 174, label, { anchor: "middle", weight: 600 });
  b += cpu(70, "CPU 0");
  b += cpu(250, "CPU 1");
  b += arrow(n, 130, 112, 130, 146);
  b += arrow(n, 220, 112, 300, 146);
  b += t(392, 174, "earliest virtual deadline first", { cls: "mu", size: 12 });
  b += t(20, 222, "deadline = now + (priority ratio × rr_interval)", { size: 13, weight: 600 });
  svg(n, W, 234, b, { label: "BFS: one global queue ordered by virtual deadline; each CPU takes the task with the earliest deadline" });
}

// ---- Chapter 13, Day 3 post ----
// Memory drawn top to bottom. regions: [label, height, class, address at its top].
// Free space uses "mb" (muted label); everything else is colored.
const memStack = (regions, { x, w, top, end }) => {
  let b = "";
  let y = top;
  const ys = [];
  for (const [name, h, cls, addr] of regions) {
    b += `<rect x="${x}" y="${y}" width="${w}" height="${h - 3}" class="${cls}" rx="3"/>`;
    b += t(x + w / 2, y + (h - 3) / 2 + 4.5, name, { anchor: "middle", cls: cls === "mb" ? "mu" : "on", weight: 600 });
    if (addr) b += t(x - 10, y + 4, addr, { anchor: "end", cls: "mu", size: 11 });
    ys.push(y);
    y += h;
  }
  if (end) b += t(x - 10, y - 3 + 4, end, { anchor: "end", cls: "mu", size: 11 });
  return { b, ys, bottom: y - 3 };
};
{
  const n = "memory-sharing";
  const W = 360, x = 80, w = 200;
  const { b, bottom } = memStack([
    ["Operating system", 42, "jd"],
    ["free", 42, "mb"],
    ["Process C", 42, "jc"],
    ["Process B", 42, "jb"],
    ["free", 42, "mb"],
    ["Process A", 42, "ja"],
  ], { x, w, top: 32 });
  const title = t(x + w / 2, 18, "Physical memory", { anchor: "middle", cls: "mu", size: 12, weight: 600 });
  svg(n, W, bottom + 10, title + b, { narrow: true, label: "Physical memory shared by the OS and processes A, B and C, with free space between them" });
}
{
  const n = "address-space";
  const W = 380, x = 90, w = 200, freeH = 170;
  let { b, ys, bottom } = memStack([
    ["Program code", 42, "jc", "0KB"],
    ["Heap", 42, "ja", "1KB"],
    ["free", freeH, "mb", "2KB"],
    ["Stack", 42, "jb", "15KB"],
  ], { x, w, top: 32, end: "16KB" });
  b = t(x + w / 2, 18, "Address space (virtual)", { anchor: "middle", cls: "mu", size: 12, weight: 600 }) + b;
  const cx = x + w / 2, f = ys[2];
  b += arrow(n, cx, f + 8, cx, f + 50);
  b += t(cx + 10, f + 34, "heap grows", { cls: "mu", size: 11 });
  b += arrow(n, cx, f + freeH - 11, cx, f + freeH - 53);
  b += t(cx + 10, f + freeH - 27, "stack grows", { cls: "mu", size: 11 });
  svg(n, W, bottom + 10, b, { narrow: true, label: "16KB address space: program code at 0KB, heap at 1KB growing down, free space, stack at 15KB growing up" });
}

console.log(fs.readdirSync(out).join("\n"));
