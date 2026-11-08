// denetci.js - scripts/detect_tr_ai.py'nin tarayıcı karşılığı. Kurallar kurallar.js'ten gelir.
// Sonuçlar Python sürümüyle aynı olmalı: scripts/check_site.py ikisini karşılaştırır.
(function (root) {
  "use strict";
  const K = root.YD_KURALLAR;
  const WORD = /[\p{L}\p{N}_]+/gu;

  // Python round(x, 2) ile aynı sonuç. toFixed sayının ikilik tabandaki tam değerini yuvarlar, Python da öyle.
  // Ayrıldıkları tek yer gerçek yarımlar (0,125 gibi, yani x*8 tek sayıyken): Python çifte, toFixed yukarı yuvarlar.
  function pyRound(x) {
    const e = x * 8;
    if (Number.isInteger(e) && e % 2 === 1) {
      const r = Math.floor(x * 100);
      return (r % 2 === 0 ? r : r + 1) / 100;
    }
    return Number(x.toFixed(2));
  }

  const compiled = {
    ic: K.ignoreCase.map((r) => ({ re: new RegExp(r.re, "giu"), label: r.label })),
    cs: K.caseSensitive.map((r) => ({ re: new RegExp(r.re, "gu"), label: r.label })),
  };

  const UNITS = { 1: "bir", 2: "iki", 3: "üç", 4: "dört", 5: "beş", 6: "altı", 7: "yedi", 8: "sekiz", 9: "dokuz" };
  const TENS = { 1: "on", 2: "yirmi", 3: "otuz", 4: "kırk", 5: "elli" };
  const BACK = "aıou", FRONT = "eiöü", HARD = "fstkçşhp";

  function lastWordOfNumber(n) {
    if (n === 0) return "sıfır";
    return n % 10 ? UNITS[n % 10] : TENS[Math.floor(n / 10)];
  }

  function expectedTimeSuffix(hour, minute, ablative) {
    const word = lastWordOfNumber(minute ? minute : hour);
    let lastVowel = "";
    for (let i = word.length - 1; i >= 0; i--) {
      if ((BACK + FRONT).includes(word[i])) { lastVowel = word[i]; break; }
    }
    const vowel = BACK.includes(lastVowel) ? "a" : "e";
    const consonant = HARD.includes(word[word.length - 1]) ? "t" : "d";
    return consonant + vowel + (ablative ? "n" : "");
  }

  function timeSuffixFindings(text) {
    const out = [];
    const re = /(?<![\p{L}\p{N}_])(\d{1,2})\.(\d{2})'(d[ae]n?|t[ae]n?)(?![\p{L}\p{N}_])/gu;
    for (const m of text.matchAll(re)) {
      const hour = parseInt(m[1], 10), minute = parseInt(m[2], 10), suffix = m[3];
      if (hour > 24 || minute > 59) continue;
      const expected = expectedTimeSuffix(hour, minute, suffix.endsWith("n"));
      if (suffix !== expected) {
        out.push({
          rule: `P2 TDK Saat Eki Hatası: Ek, saatin okunuşuna uymalı ('${m[1]}.${m[2]}'${expected}')`,
          match: m[0], position: m.index,
        });
      }
    }
    return out;
  }

  function splitWords(s) {
    const t = s.trim();
    return t ? t.split(/\s+/u) : [];
  }

  function splitSentences(text) {
    let p = text.replace(/(\d)\.(\d)/gu, "$1<DOT>$2");
    p = p.replace(/(?<![\p{L}\p{N}_])(Node|Vue|Next|Nuxt)\.js/giu, "$1<DOT>js");
    return p.split(/[.!?]+(?:\s+|$)/u)
      .filter((s) => splitWords(s).length > 1)
      .map((s) => s.split("<DOT>").join(".").trim());
  }

  function endingClass(sentence) {
    const words = sentence.match(WORD);
    if (!words) return "diger";
    const last = words[words.length - 1].toLowerCase();
    if (/m[ae]kt[ae]d[ıi]r$/u.test(last)) return "-mAktAdIr";
    if (/m[ıiuü]şt[ıiuü]r$/u.test(last)) return "-mIştIr";
    if (/[dt][ıiuü]r$/u.test(last)) return "-DIr";
    return "diger";
  }

  function maxRun(sentences) {
    let best = 0, bestClass = null, run = 0, prev = null;
    for (const s of sentences) {
      const c = endingClass(s);
      if (c !== "diger" && c === prev) run += 1;
      else if (c !== "diger") run = 1;
      else run = 0;
      prev = c;
      if (run > best) { best = run; bestClass = c; }
    }
    return [best, bestClass];
  }

  function rhythmProfile(text, warn, window = 5) {
    const lengths = [];
    for (const par of text.split("\n")) {
      if (!par.trim() || /^\s*(#|[-*>|]|\d+\.)/u.test(par)) continue;
      for (const s of splitSentences(par)) lengths.push(splitWords(s).length);
    }
    const covs = [];
    for (let i = 0; i < Math.max(lengths.length - window + 1, 0); i++) {
      const w = lengths.slice(i, i + window);
      const mean = w.reduce((a, b) => a + b, 0) / window;
      if (mean) covs.push(Math.sqrt(w.reduce((a, x) => a + (x - mean) ** 2, 0) / window) / mean);
    }
    covs.sort((a, b) => a - b);
    const median = covs.length ? pyRound(covs[Math.floor(covs.length / 2)], 2) : null;
    const band = lengths.length ? pyRound(lengths.filter((n) => n >= 15 && n <= 22).length / lengths.length, 2) : null;
    return {
      window_count: covs.length,
      window_cov_median: median,
      window_cov_below_target_ratio: covs.length ? pyRound(covs.filter((c) => c < K.windowCovTarget).length / covs.length, 2) : null,
      band_15_22_ratio: band,
      flat_rhythm_warning: warn && covs.length > 0 && median < K.windowCovTarget,
      band_15_22_warning: warn && band !== null && lengths.length >= 8 && band > K.band1522Warn,
    };
  }

  function analyzeText(text, register) {
    const key = register || null;
    const profile = key ? K.registers[key] : K.defaultProfile;
    const findings = [];
    for (const { re, label } of compiled.ic) {
      const skip = Object.entries(K.registerSkip).some(([k, regs]) => label.startsWith(k) && regs.includes(key));
      if (skip) continue;
      re.lastIndex = 0;
      for (const m of text.matchAll(re)) {
        if (m[0] === "—" && !text.slice(text.lastIndexOf("\n", m.index - 1) + 1, m.index).trim()) continue;
        findings.push({ rule: label, match: m[0], position: m.index });
      }
    }
    for (const { re, label } of compiled.cs) {
      for (const m of text.matchAll(re)) findings.push({ rule: label, match: m[0], position: m.index });
    }
    findings.push(...timeSuffixFindings(text));

    const words = text.match(WORD) || [];
    const wordCount = Math.max(words.length, 1);
    const mek = (text.match(/[\p{L}\p{N}_]+m[ae]kt[ae]d[ıiIİ]r(?![\p{L}\p{N}_])/giu) || []).length;
    const mekPer100 = pyRound((mek / wordCount) * 100, 2);

    const sentences = splitSentences(text);
    const lens = sentences.map((s) => splitWords(s).length);
    let cov = 0.5;
    if (lens.length >= 3) {
      const mean = lens.reduce((a, b) => a + b, 0) / lens.length;
      const variance = lens.reduce((a, x) => a + (x - mean) ** 2, 0) / lens.length;
      cov = mean > 0 ? pyRound(Math.sqrt(variance) / mean, 2) : 0.0;
    }
    const [runLen, runClass] = maxRun(sentences);
    const runLimit = (key && K.repeatedEndingLimits[key]) || K.repeatedEndingLimit;
    const warnRhythm = key ? K.rhythmWarnRegisters.includes(key) : K.rhythmWarnDefault;

    return {
      register: key,
      register_label: profile.label,
      mektedir_target_range: [profile.mektedir_min, profile.mektedir_max],
      mektedir_in_range: profile.mektedir_min <= mekPer100 && mekPer100 <= profile.mektedir_max,
      repeated_ending_max_run: runLen,
      repeated_ending_class: runClass,
      repeated_ending_limit: runLimit,
      repeated_ending_warning: runLen >= runLimit,
      word_count: words.length,
      sentence_count: sentences.length,
      sentence_lengths: lens,
      sentence_length_cov: cov,
      rhythm: rhythmProfile(text, warnRhythm),
      mektedir_per_100_words: mekPer100,
      high_mektedir_warning: mekPer100 > profile.mektedir_max,
      total_flags: findings.length,
      findings,
    };
  }

  root.YD = { analyzeText, splitSentences };
})(globalThis);
