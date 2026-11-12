#!/usr/bin/env python3
"""olc.py - Bir derlemi denetle.py'den geçirir: her kural ve her ölçüm insan ve model metninde ne veriyor?

Kullanım: python3 araclar/olc.py derlem.json --cikti olcum.json

derlem.json biçimi (yollar bu dosyanın klasörüne göredir):
  {"insan": {"anlati": ["cagdas/*.txt"], "deneme": ["kose-yazisi/*.txt"], ...},
   "model": {"anlati": ["llm/*_edebi-*.txt"], ...}}
Anahtarlar kurallar.py'deki metin türleridir. Metinler yaklaşık 400 kelimelik parçalara bölünür, büyük
dosyalardan eşit aralıklı en çok --en-cok parça alınır. Derlemin kendisi depoda yoktur (telif).
"""
import argparse
import glob
import json
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "scripts"))
import denetle as d  # noqa: E402

PARCA = 400


def satir_birlestir(metin: str) -> str:
    """Sabit genişlikte kırılmış satırları birleştirir: noktalamayla bitmeyen satır bir sonrakine eklenir."""
    out, buf = [], ""
    for s in metin.replace("\r", "").split("\n"):
        s = s.strip()
        if not s:
            if buf:
                out.append(buf)
                buf = ""
            continue
        buf = f"{buf} {s}" if buf else s
        if re.search(r"[.!?…:\"”’»)]$", s):
            out.append(buf)
            buf = ""
    if buf:
        out.append(buf)
    return "\n".join(out)


def parcalar(metin: str):
    buf, n = [], 0
    for p in metin.split("\n"):
        buf.append(p)
        n += len(p.split())
        if n >= PARCA:
            yield "\n".join(buf)
            buf, n = [], 0
    if n >= PARCA * 0.6:
        yield "\n".join(buf)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("derlem")
    ap.add_argument("--cikti", required=True)
    ap.add_argument("--en-cok", type=int, default=40, help="dosya başına en çok parça")
    a = ap.parse_args()
    kok = Path(a.derlem).resolve().parent
    ayar = json.loads(Path(a.derlem).read_text(encoding="utf-8"))
    satirlar, acilis = [], defaultdict(Counter)
    for kaynak in ("insan", "model"):
        for tur, desenler in ayar[kaynak].items():
            dosyalar = sorted({f for g in desenler for f in glob.glob(str(kok / g))})
            for f in dosyalar:
                ham = Path(f).read_text(encoding="utf-8", errors="replace")
                metin = satir_birlestir(ham) if kaynak == "insan" else ham
                ps = list(parcalar(metin)) or ([metin] if len(metin.split()) > 150 else [])
                if len(ps) > a.en_cok:
                    adim = len(ps) / a.en_cok
                    ps = [ps[int(i * adim)] for i in range(a.en_cok)]
                for p in ps:
                    m = d.maskele(p)
                    olcu = d.olc(m)
                    if olcu["cumle"] < d.EN_AZ_CUMLE:
                        continue
                    bulgular = d.bul(m, tur)
                    for b in d.bloklar(m):
                        for c in d.cumleler(b):
                            ks = d.kucult(c).split()
                            if ks:
                                acilis[kaynak][ks[0].strip("\"“«(,")] += 1
                                if len(ks) > 1:
                                    acilis[kaynak][" ".join(ks[:2]).strip("\"“«(,")] += 1
                    satirlar.append({
                        "kaynak": kaynak, "tur": tur, "dosya": Path(f).name, "kelime": olcu["kelime"], "cumle": olcu["cumle"],
                        "oz": d.ozellikler(olcu, bulgular),
                        "ek": {k: olcu[k] for k in ("ortanca_boy", "uzun", "unlem", "uc_nokta", "mektedir", "son_dir", "son_mistir", "seri")},
                        "kural": dict(Counter(b["id"] for b in bulgular)),
                    })
            print(f"{kaynak:6} {tur:11} {len(dosyalar):4} dosya", flush=True)
    Path(a.cikti).write_text(json.dumps({"satirlar": satirlar, "acilis": {k: dict(v.most_common(400)) for k, v in acilis.items()}},
                                        ensure_ascii=False), encoding="utf-8")
    print(f"{len(satirlar)} parça -> {a.cikti}")


if __name__ == "__main__":
    main()
