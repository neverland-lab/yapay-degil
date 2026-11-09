#!/usr/bin/env python3
"""
check_site.py - Vitrin sayfasındaki JavaScript denetçinin Python dedektörüyle aynı sonucu verdiğini sınar.
Node.js ister. Metin olarak evals.json'daki tüm örnekleri ve verilen ek dosyaları kullanır.
Çalıştırma: python3 scripts/check_site.py [ek_metin.txt ...]
"""

import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "scripts"))
from detect_tr_ai import analyze_text, REGISTER_PROFILES  # noqa: E402

NODE = r"""
const fs = require("fs");
require(process.argv[1]); require(process.argv[2]);
const cases = JSON.parse(fs.readFileSync(0, "utf8"));
process.stdout.write(JSON.stringify(cases.map(c => globalThis.YD.analyzeText(c.text, c.register))));
"""

COMPARE = ["mektedir_in_range", "repeated_ending_max_run", "repeated_ending_class", "repeated_ending_warning",
           "word_count", "sentence_count", "sentence_lengths", "sentence_length_cov", "rhythm",
           "mektedir_per_100_words", "high_mektedir_warning", "total_flags", "score", "level", "reasons"]


def main():
    texts = []
    evals = json.loads((ROOT / "evals" / "evals.json").read_text(encoding="utf-8"))
    for c in evals["test_cases"]:
        texts += [c["input_ai"], c["output_human"]]
    for extra in sys.argv[1:]:
        texts.append(Path(extra).read_text(encoding="utf-8"))
    registers = [None] + list(REGISTER_PROFILES)
    cases = [{"text": t, "register": r} for t in texts for r in registers]

    site = ROOT / "docs" / "site"
    out = subprocess.run(["node", "-e", NODE, str(site / "kurallar.js"), str(site / "denetci.js")],
                         input=json.dumps(cases), capture_output=True, text=True, encoding="utf-8")
    if out.returncode:
        print(out.stderr)
        sys.exit(1)
    js_results = json.loads(out.stdout)

    # Her kural etiketinin okura gösterilecek tam bir açıklaması olmalı (docs/site/aciklamalar.js).
    import detect_tr_ai as d
    labels = [lab for _, lab in d.TIER1_PATTERNS + d.TIER2_AND_SYNTAX_PATTERNS
              + d.PUNCTUATION_AND_TDK_PATTERNS + d.CASE_SENSITIVE_PATTERNS]
    labels.append(d.time_suffix_findings("13.00'da")[0]["rule"])
    cov = subprocess.run(["node", "-e", 'require(process.argv[1]); const L = JSON.parse(require("fs").readFileSync(0, "utf8"));'
                          'process.stdout.write(JSON.stringify(L.map(l => globalThis.YD_ACIKLAMA_BUL(l).length)))',
                         str(site / "aciklamalar.js")], input=json.dumps(labels), capture_output=True, text=True, encoding="utf-8")
    counts = json.loads(cov.stdout)
    bad = 0
    for lab, n in zip(labels, counts):
        if n != 1:
            bad += 1
            print(f"AÇIKLAMA {n} kayda uyuyor (1 olmalı): {lab}")

    for case, js in zip(cases, js_results):
        py = analyze_text(case["text"], case["register"])
        diffs = [k for k in COMPARE if py[k] != js[k]]
        py_f = [(f["rule"], f["match"]) for f in py["findings"]]
        js_f = [(f["rule"], f["match"]) for f in js["findings"]]
        if py_f != js_f:
            diffs.append("findings")
        if diffs:
            bad += 1
            print(f"FARK [{case['register']}] {case['text'][:50]!r}: {diffs}")
            if "findings" in diffs:
                print("   yalnız Python:", [x for x in py_f if x not in js_f])
                print("   yalnız JS    :", [x for x in js_f if x not in py_f])
    # index.html'deki betik adreslerinin ?v= özeti güncel mi? (build_site.py yazar, önbellek için)
    import hashlib, re
    html = (ROOT / "docs" / "index.html").read_text(encoding="utf-8")
    for name, v in re.findall(r'src="site/([\w.-]+\.js)\?v=([0-9a-f]+)"', html):
        if hashlib.sha256((site / name).read_bytes()).hexdigest()[:10] != v:
            bad += 1
            print(f"ESKİ ADRES: {name}?v={v}. scripts/build_site.py'yi çalıştır.")
    print(f"{len(cases) - bad}/{len(cases)} durum aynı")
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main()
