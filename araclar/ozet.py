#!/usr/bin/env python3
"""ozet.py - olc.py çıktısını tabloya döker: kural isabetleri, ölçüm ortancaları, cümle açılışları.

Kullanım: python3 araclar/ozet.py olcum.json [--acilis]
"""
import argparse
import json
import sys
from collections import Counter, defaultdict
from pathlib import Path


def ortanca(xs):
    s = sorted(x for x in xs if x is not None)
    return s[len(s) // 2] if s else float("nan")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("olcum")
    ap.add_argument("--acilis", action="store_true")
    a = ap.parse_args()
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    veri = json.loads(Path(a.olcum).read_text(encoding="utf-8"))
    satirlar = veri["satirlar"]
    grup = defaultdict(list)
    for s in satirlar:
        grup[(s["kaynak"], s["tur"])].append(s)
    anahtarlar = sorted(grup)
    kisa = {k: ("İ-" if k[0] == "insan" else "M-") + k[1][:6] for k in anahtarlar}

    print("PARÇA VE KELİME")
    for k in anahtarlar:
        print(f"  {kisa[k]:10} {len(grup[k]):5} parça {sum(s['kelime'] for s in grup[k]):8} kelime")

    print("\nÖLÇÜM ORTANCALARI")
    print(f"{'':16}" + "".join(f"{kisa[k]:>10}" for k in anahtarlar))
    for oz in list(satirlar[0]["oz"]) + list(satirlar[0]["ek"]):
        yer = "oz" if oz in satirlar[0]["oz"] else "ek"
        print(f"{oz:16}" + "".join(f"{ortanca([s[yer][oz] for s in grup[k]]):>10.2f}" for k in anahtarlar))

    print("\nKURAL İSABETİ / 10.000 kelime   (insan toplam | model toplam | oran)")
    kelime = {k: sum(s["kelime"] for s in grup[k]) for k in anahtarlar}
    say = {k: Counter() for k in anahtarlar}
    for k in anahtarlar:
        for s in grup[k]:
            say[k].update(s["kural"])
    ik = sum(v for k, v in kelime.items() if k[0] == "insan")
    mk = sum(v for k, v in kelime.items() if k[0] == "model")
    kurallar = sorted({r for c in say.values() for r in c})
    tablo = []
    for r in kurallar:
        i = sum(say[k][r] for k in anahtarlar if k[0] == "insan") / ik * 1e4
        m = sum(say[k][r] for k in anahtarlar if k[0] == "model") / mk * 1e4
        tablo.append((m / (i + 0.05), r, i, m))
    print(f"{'':22}{'insan':>7}{'model':>7}{'oran':>7}  " + "".join(f"{kisa[k]:>9}" for k in anahtarlar))
    for oran, r, i, m in sorted(tablo, reverse=True):
        print(f"{r:22}{i:7.2f}{m:7.2f}{oran:7.1f}  " + "".join(f"{say[k][r] / kelime[k] * 1e4:9.1f}" for k in anahtarlar))

    if a.acilis:
        ins, mod = veri["acilis"]["insan"], veri["acilis"]["model"]
        it, mt = sum(v for k, v in ins.items() if " " not in k), sum(v for k, v in mod.items() if " " not in k)
        print("\nCÜMLE AÇILIŞLARI (1000 cümlede; model/insan oranına göre)")
        sat = []
        for k in set(ins) | set(mod):
            i, m = ins.get(k, 0) / it * 1000, mod.get(k, 0) / mt * 1000
            if m >= 1.5 or i >= 3:
                sat.append(((m + 0.2) / (i + 0.2), k, i, m))
        sat.sort(reverse=True)
        for oran, k, i, m in sat[:45]:
            print(f"  {k:28}{i:7.1f}{m:7.1f}{oran:7.1f}")
        print("  ...")
        for oran, k, i, m in sat[-25:]:
            print(f"  {k:28}{i:7.1f}{m:7.1f}{oran:7.1f}")


if __name__ == "__main__":
    main()
