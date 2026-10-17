#!/usr/bin/env node
/**
 * 版本号一致性校验（本地四处 + 市场发布状态）
 *
 * 每个插件的版本号在四处独立存在，任何一处漂移都会造成「装到手还是旧版本」
 * 或「文档写着新版本、代码没改」这类不可逆误导，因此四处必须逐字相同：
 *
 *   1. 插件工程 .csproj 的 <Version>          —— 编译进 AssemblyInformationalVersion，运行时读它
 *   2. docs/changelog/<slug>.md 的「当前最新版本」—— 日志页头部
 *   3. docs/changelog/index.md 一览表          —— 日志索引页
 *   4. docs/guide/index.md 一览表              —— 教程索引页
 *
 * 另有第五处特例：Nps2FA 在主类里带一个 FallbackVersion 常量，用于读不到
 * 程序集元数据时兜底，必须与 <Version> 相同。
 *
 * 除本地一致性外，还向插件市场取每个插件的已发布版本，判定本地处于哪一态：
 *   - 已同步：本地 == 市场（beta 期常态，改动尚未升号）
 *   - 本地领先：本地 > 市场（已升号，等待发布）
 *   - 本地落后：本地 < 市场（危险：版本号回退或漏改，发布后用户会收到降级提示）
 *
 * 用法：
 *   node scripts/check-versions.mjs              # 校验本地四处 + 市场
 *   node scripts/check-versions.mjs --no-market  # 只校验本地四处（离线）
 *   node scripts/check-versions.mjs --quiet      # 只在存在问题时打印
 *   node scripts/check-versions.mjs --strict-market  # 市场不可达也算失败
 *
 * 退出码：0 = 无问题；1 = 存在不一致、本地落后于市场，或缺文件。
 */

import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const SITE_ROOT = path.resolve(SCRIPT_DIR, "..");
const NPS_ROOT = process.env.NPS_PLUGINS_ROOT
  ? path.resolve(process.env.NPS_PLUGINS_ROOT)
  : path.resolve(SITE_ROOT, "..");
const DOCS = path.join(SITE_ROOT, "docs");

/** 市场数据接口。返回 `window.__NPS_PLUGINS__=[...];window.__NPS_ADMIN__=null;`。 */
const MARKET_URL = "https://nps.georgewu.top/admin/api.php?action=market&format=js";

/**
 * 插件注册表。
 * slug 同时是 changelog 文件名与 guide 链接末尾；marketId 是市场里的插件标识，
 * 尚未上架的插件写 null。
 */
const PLUGINS = [
  {
    slug: "pushbridge",
    label: "局域网推送网桥",
    marketId: "npspushbridge",
    projectDir: path.join(NPS_ROOT, "NpsPushBridge"),
    csproj: "NpsPushBridge.csproj",
  },
  {
    slug: "twofactor",
    label: "双因素验证",
    marketId: "2fa-nps",
    projectDir: path.join(NPS_ROOT, "2FA·NPS"),
    csproj: "Nps2FA.csproj",
    extra: { file: path.join("src", "Nps2FAPlugin.cs"), pattern: /FallbackVersion\s*=\s*"([^"]+)"/, name: "FallbackVersion" },
  },
  {
    slug: "clipboard",
    label: "剪贴板历史",
    marketId: "npsclipboard",
    projectDir: path.join(NPS_ROOT, "NpsClipboard"),
    csproj: "NpsClipboard.csproj",
  },
  {
    slug: "volume",
    label: "音量控制",
    marketId: "npsvolumecontrol",
    projectDir: path.join(NPS_ROOT, "NpsTaskbarIsland"),
    csproj: "NpsVolumeControl.csproj",
  },
  {
    slug: "mediaenhancement",
    label: "媒体增强",
    marketId: "npsmediaenhancement",
    projectDir: path.join(NPS_ROOT, "NpsMediaEnhancement"),
    csproj: "NpsMediaEnhancement.csproj",
  },
  {
    slug: "minecraft",
    label: "NPS · Minecraft",
    marketId: null,
    projectDir: path.resolve(NPS_ROOT, "..", "NPS·Minecraft Java", "NpsDynamicIsland"),
    csproj: "NpsDynamicIsland.csproj",
  },
];

const argv = process.argv.slice(2);
const quiet = argv.includes("--quiet");
const skipMarket = argv.includes("--no-market");
const strictMarket = argv.includes("--strict-market");

/** 语义化比较：返回 -1 / 0 / 1。缺位按 0 补，使 "1.2" 与 "1.2.0" 等价。 */
function compareVersion(a, b) {
  const pa = String(a ?? "").split(".").map((n) => parseInt(n, 10) || 0);
  const pb = String(b ?? "").split(".").map((n) => parseInt(n, 10) || 0);
  for (let i = 0; i < Math.max(pa.length, pb.length); i += 1) {
    const x = pa[i] ?? 0;
    const y = pb[i] ?? 0;
    if (x !== y) return x > y ? 1 : -1;
  }
  return 0;
}

function read(file) {
  if (!existsSync(file)) return null;
  return readFileSync(file, "utf8");
}

function grab(text, pattern, what, file) {
  if (text === null) return { error: `缺文件：${file}` };
  const m = text.match(pattern);
  if (!m) return { error: `未匹配到 ${what}：${file}` };
  return { value: m[1].trim() };
}

/** 从 markdown 表格里按关键字匹配行，返回第 targetCol 列（0 基）。 */
function tableCell(markdown, keyword, targetCol, file) {
  if (markdown === null) return { error: `缺文件：${file}` };
  for (const line of markdown.split(/\r?\n/)) {
    if (!line.startsWith("|") || !line.includes(keyword)) continue;
    const cells = line.split("|").slice(1, -1).map((c) => c.trim());
    if (cells.length <= targetCol) continue;
    const raw = cells[targetCol];
    const ver = raw.replace(/[*`\s]/g, "").replace(/^v/i, "");
    if (/^\d+\.\d+\.\d+/.test(ver)) return { value: ver };
  }
  return { error: `未在表格中找到「${keyword}」的版本列：${file}` };
}

/** 取市场已发布版本，返回 { map } 或 { error }。 */
async function fetchMarket() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  try {
    const res = await fetch(MARKET_URL, { signal: controller.signal });
    if (!res.ok) return { error: `HTTP ${res.status}` };
    const text = await res.text();
    const start = text.indexOf("[");
    const end = text.lastIndexOf("]");
    if (start < 0 || end < 0) return { error: "响应里没有插件数组" };
    const list = JSON.parse(text.slice(start, end + 1));
    return { map: new Map(list.map((p) => [String(p.id), String(p.version ?? "")])) };
  } catch (err) {
    return { error: err?.name === "AbortError" ? "请求超时" : String(err?.message ?? err) };
  } finally {
    clearTimeout(timer);
  }
}

const changelogIndex = read(path.join(DOCS, "changelog", "index.md"));
const guideIndex = read(path.join(DOCS, "guide", "index.md"));

const market = skipMarket ? { skipped: true } : await fetchMarket();
const rows = [];
let failures = 0;

for (const p of PLUGINS) {
  const csprojPath = path.join(p.projectDir, p.csproj);
  const changelogPath = path.join(DOCS, "changelog", `${p.slug}.md`);
  const guidePath = path.join(DOCS, "guide", `${p.slug}.md`);

  const sources = [];
  sources.push({
    name: "csproj",
    ...grab(read(csprojPath), /<Version>([^<]+)<\/Version>/, "<Version>", csprojPath),
  });

  if (p.extra) {
    const extraPath = path.join(p.projectDir, p.extra.file);
    sources.push({ name: p.extra.name, ...grab(read(extraPath), p.extra.pattern, p.extra.name, extraPath) });
  }

  sources.push({
    name: "changelog 头部",
    ...grab(read(changelogPath), /当前最新版本\s*\*\*v?([0-9][0-9.]*)\*\*/, "当前最新版本", changelogPath),
  });

  sources.push({
    name: "changelog 索引",
    ...tableCell(changelogIndex, p.label, 1, path.join(DOCS, "changelog", "index.md")),
  });

  sources.push({
    name: "guide 索引",
    ...tableCell(guideIndex, `/guide/${p.slug}`, 3, path.join(DOCS, "guide", "index.md")),
  });

  const versions = sources.filter((s) => s.value).map((s) => s.value);
  const distinct = [...new Set(versions)];
  const errors = sources.filter((s) => s.error);

  // guide 单页里的「当前版本」字段若存在，一并纳入校验
  const guidePage = read(guidePath);
  const guidePageVersion = guidePage?.match(/\|\s*当前版本\s*\|\s*\*\*([0-9][0-9.]*)\*\*/)?.[1];

  const row = {
    plugin: p,
    sources,
    distinct,
    errors,
    localVersion: sources.find((s) => s.name === "csproj")?.value ?? null,
    marketVersion: null,
    marketState: "",
    marketNote: "",
    ok: distinct.length === 1 && errors.length === 0,
  };

  if (guidePageVersion && distinct.length === 1 && guidePageVersion !== distinct[0]) {
    row.ok = false;
    row.distinct = [...distinct, guidePageVersion];
    row.extraMismatch = { guidePageVersion, file: guidePath };
  }

  if (skipMarket) {
    row.marketState = "已跳过";
  } else if (market.error) {
    row.marketState = "不可达";
  } else if (!p.marketId) {
    row.marketState = "未上架";
  } else {
    const mv = market.map.get(p.marketId);
    if (mv === undefined) {
      row.marketState = "无此条目";
      row.marketNote = `市场里没有 id 为 ${p.marketId} 的条目`;
      row.ok = false;
    } else {
      row.marketVersion = mv;
      const cmp = compareVersion(row.localVersion, mv);
      row.marketState = cmp === 0 ? "已同步" : cmp > 0 ? "本地领先" : "本地落后";
      // 本地低于市场：发布后用户会收到降级提示，属必须修的错误
      if (cmp < 0) row.ok = false;
    }
  }

  if (!row.ok) failures += 1;
  rows.push(row);
}

if (market.error && strictMarket) failures += 1;

// ---- 输出 ----
if (!quiet || failures > 0) {
  const head = ["插件", "csproj", "日志头部", "日志索引", "教程索引", "市场", "结论"];
  const body = rows.map((r) => {
    const get = (n) => r.sources.find((s) => s.name === n)?.value ?? "—";
    return [
      r.plugin.label,
      get("csproj"),
      get("changelog 头部"),
      get("changelog 索引"),
      get("guide 索引"),
      r.marketVersion ?? "—",
      r.ok ? r.marketState || "一致" : "不一致",
    ];
  });

  const widths = head.map((h, i) => Math.max(strWidth(h), ...body.map((b) => strWidth(b[i]))));
  const line = (cells) => cells.map((c, i) => c + " ".repeat(widths[i] - strWidth(c))).join("  ");

  console.log(line(head));
  console.log(widths.map((w) => "-".repeat(w)).join("  "));
  for (const b of body) console.log(line(b));

  if (skipMarket) {
    console.log("\n（市场比对已跳过）");
  } else if (market.error) {
    console.log(`\n⚠ 市场不可达：${market.error}`);
    console.log(`  ${MARKET_URL}`);
  }

  if (failures > 0) {
    console.log(`\n发现 ${failures} 处问题：`);
    for (const r of rows.filter((x) => !x.ok)) {
      console.log(`\n  [${r.plugin.label}]`);
      for (const s of r.sources) {
        if (s.error) console.log(`    - ${s.name}：${s.error}`);
      }
      if (r.distinct.length > 1) console.log(`    - 本地版本号冲突：${r.distinct.join(" / ")}`);
      if (r.extraMismatch) {
        console.log(`    - 教程页「当前版本」为 ${r.extraMismatch.guidePageVersion}（${r.extraMismatch.file}）`);
      }
      if (r.marketState === "本地落后") {
        console.log(`    - 本地 ${r.localVersion} 低于市场 ${r.marketVersion}：发布后用户会收到降级提示`);
      }
      if (r.marketNote) console.log(`    - ${r.marketNote}`);
    }
  } else {
    console.log("\n本地四处版本号一致；与市场比对无异常。");
  }
}

process.exit(failures > 0 ? 1 : 0);

/** 中日韩字符按两格宽计算，保证表格在终端里对齐。 */
function strWidth(s) {
  let w = 0;
  for (const ch of String(s)) {
    w += /[\u1100-\u115F\u2E80-\uA4CF\uAC00-\uD7A3\uF900-\uFAFF\uFE30-\uFE6F\uFF00-\uFF60\uFFE0-\uFFE6]/.test(ch) ? 2 : 1;
  }
  return w;
}
