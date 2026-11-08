#!/usr/bin/env python3
"""
build_site.py - Vitrin sayfasının kural dosyasını (docs/site/kurallar.js) dedektörden üretir.
Kurallar tek yerde, detect_tr_ai.py'de durur. Kural değişince bu betiği yeniden çalıştır.
Çalıştırma: python3 scripts/build_site.py
"""

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "scripts"))
import detect_tr_ai as d  # noqa: E402

# Python'da \w ve \b Unicode harfleri tanır, JavaScript'te tanımaz. Bu yüzden ikisi açık yazılır.
W = r"[\p{L}\p{N}_]"
B = r"(?:(?<=[\p{L}\p{N}_])(?![\p{L}\p{N}_])|(?<![\p{L}\p{N}_])(?=[\p{L}\p{N}_]))"


# Python IGNORECASE'te i, ı, I ve İ birbirinin yerine geçer ("İŞBİRLİĞİ" yakalanır). JavaScript'te İ ile ı
# büyük-küçük eşi sayılmaz, bu yüzden büyük-küçük duyarsız kurallarda dördü de açıkça yazılır.
I_VARIANTS = "iıIİ"


def to_js(pattern: str, ignore_case: bool) -> str:
    out, i, in_class = [], 0, False
    while i < len(pattern):
        ch = pattern[i]
        if pattern.startswith(r"\w", i):
            out.append(W)
            i += 2
            continue
        if pattern.startswith(r"\b", i):
            out.append(B)
            i += 2
            continue
        if ch == "\\":
            out.append(pattern[i:i + 2])
            i += 2
            continue
        if ch == "[" and not in_class:
            in_class = True
        elif ch == "]" and in_class:
            in_class = False
        if ignore_case and ch in I_VARIANTS:
            out.append(I_VARIANTS if in_class else f"[{I_VARIANTS}]")
        else:
            out.append(ch)
        i += 1
    return "".join(out)


def rules(pairs, ignore_case):
    return [{"re": to_js(p, ignore_case), "label": label} for p, label in pairs]


data = {
    "ignoreCase": rules(d.TIER1_PATTERNS + d.TIER2_AND_SYNTAX_PATTERNS + d.PUNCTUATION_AND_TDK_PATTERNS, True),
    "caseSensitive": rules(d.CASE_SENSITIVE_PATTERNS, False),
    "registers": d.REGISTER_PROFILES,
    "defaultProfile": d.DEFAULT_PROFILE,
    "registerSkip": {k: sorted(v) for k, v in d.REGISTER_SKIP.items()},
    "repeatedEndingLimit": d.REPEATED_ENDING_LIMIT,
    "repeatedEndingLimits": d.REPEATED_ENDING_LIMITS,
    "windowCovTarget": d.WINDOW_COV_TARGET,
    "rhythmWarnRegisters": [r for r in d.RHYTHM_WARN_REGISTERS if r],
    "rhythmWarnDefault": None in d.RHYTHM_WARN_REGISTERS,
    "band1522Warn": d.BAND_15_22_WARN,
}

target = ROOT / "docs" / "site" / "kurallar.js"
target.parent.mkdir(parents=True, exist_ok=True)
body = json.dumps(data, ensure_ascii=False, indent=1)
target.write_bytes(
    ("// Bu dosya scripts/build_site.py ile detect_tr_ai.py'den üretilir. Elle düzenleme.\n"
     f"globalThis.YD_KURALLAR = {body};\n").encode("utf-8")
)
print(f"{target.relative_to(ROOT)} yazıldı: {len(data['ignoreCase']) + len(data['caseSensitive'])} kural")
