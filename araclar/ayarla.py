#!/usr/bin/env python3
"""ayarla.py - Skorun katsayılarını olc.py çıktısından hesaplar ve scripts/kurallar.py'deki SKOR'u yazar.

Kullanım: python3 araclar/ayarla.py olcum.json [--yaz]

Her metin ailesi için ayrı bir lojistik regresyon kurulur. İnsan ve model parçaları eşit ağırlıkla sayılır,
yani skor "insan ve model metni eşit sıklıkta gelseydi bu parçanın model olma olasılığı" diye okunur.
Başarı, dosya bazında beş katlı çapraz sınamayla ölçülür: bir kitabın ya da bir model metninin parçaları
hem öğrenme hem sınama tarafına düşmez. Beklenen yönün tersine çıkan özellik atılır.
"""
import argparse
import json
import math
import pprint
import random
import re
import sys
from collections import defaultdict
from pathlib import Path

AILELER = {
    "serbest": ["anlati", "deneme"],
    "bilgi": ["aciklayici", "teknik", "kurumsal"],
    "resmi": ["akademik", "kamu"],
}
TUR_AILESI = {t: a for a, ts in AILELER.items() for t in ts}
TUR_AILESI[None] = "serbest"
# Beklenen yön: +1 model metninde yüksek, -1 model metninde düşük.
YON = {"ritim": -1, "duz_pencere": 1, "orta_boy": 1, "kisa": -1, "uzun": -1, "gecis": 1, "soru": -1, "uclu": 1,
       "degil_virgul": 1, "bu_basi": 1, "guclu_kalip": 1, "orta_kalip": 1, "zayif_kalip": 1}
L2 = 1.0
ESIKLER = (35, 50, 65, 80)


def egit(X, y, w, tur=400, hiz=0.5):
    n, k = len(X), len(X[0])
    b, th = 0.0, [0.0] * k
    for _ in range(tur):
        gb, g = 0.0, [0.0] * k
        for xi, yi, wi in zip(X, y, w):
            p = 1 / (1 + math.exp(-max(min(b + sum(t * x for t, x in zip(th, xi)), 30), -30)))
            e = (p - yi) * wi
            gb += e
            for j in range(k):
                g[j] += e * xi[j]
        b -= hiz * gb
        th = [t - hiz * (gj + L2 * t / n) for t, gj in zip(th, g)]
    return b, th


def olcekle(satirlar, adlar):
    olcek = {}
    for a in adlar:
        v = [s["oz"][a] or 0 for s in satirlar]
        ort = sum(v) / len(v)
        sap = math.sqrt(sum((x - ort) ** 2 for x in v) / len(v)) or 1.0
        olcek[a] = (round(ort, 4), round(sap, 4))
    return olcek


def matris(satirlar, adlar, olcek):
    return [[((s["oz"][a] or 0) - olcek[a][0]) / olcek[a][1] for a in adlar] for s in satirlar]


def agirlik(satirlar):
    m = sum(s["kaynak"] == "model" for s in satirlar)
    i = len(satirlar) - m
    return [0.5 / m if s["kaynak"] == "model" else 0.5 / i for s in satirlar]


def kur(satirlar, adlar):
    """Yönü ters çıkan özellikleri atarak eğitir."""
    adlar = list(adlar)
    while True:
        olcek = olcekle(satirlar, adlar)
        b, th = egit(matris(satirlar, adlar, olcek), [s["kaynak"] == "model" for s in satirlar], agirlik(satirlar))
        ters = [a for a, t in zip(adlar, th) if t * YON[a] < 0]
        if not ters:
            return {"sabit": round(b, 4), "katsayi": {a: round(t, 4) for a, t in zip(adlar, th)}, "olcek": olcek}
        adlar = [a for a in adlar if a not in ters]


def tahmin(model, s):
    z = model["sabit"] + sum(w * ((s["oz"][a] or 0) - model["olcek"][a][0]) / model["olcek"][a][1]
                             for a, w in model["katsayi"].items())
    return 100 / (1 + math.exp(-z))


def auc(puanlar):
    poz = [p for p, y in puanlar if y]
    neg = [p for p, y in puanlar if not y]
    if not poz or not neg:
        return float("nan")
    return sum((a > b) + 0.5 * (a == b) for a in poz for b in neg[::max(len(neg) // 400, 1)]) / (len(poz) * len(neg[::max(len(neg) // 400, 1)]))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("olcum")
    ap.add_argument("--yaz", action="store_true", help="sonucu scripts/kurallar.py'ye yaz")
    a = ap.parse_args()
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    satirlar = json.loads(Path(a.olcum).read_text(encoding="utf-8"))["satirlar"]
    random.seed(7)
    skor = {"tur_ailesi": TUR_AILESI, "aileler": {}}
    for aile, turler in AILELER.items():
        alt = [s for s in satirlar if s["tur"] in turler]
        dosyalar = sorted({(s["kaynak"], s["dosya"]) for s in alt})
        random.shuffle(dosyalar)
        kat = {d: i % 5 for i, d in enumerate(dosyalar)}
        sinama = []
        for k in range(5):
            ogr = [s for s in alt if kat[(s["kaynak"], s["dosya"])] != k]
            sin = [s for s in alt if kat[(s["kaynak"], s["dosya"])] == k]
            m = kur(ogr, YON)
            sinama += [(tahmin(m, s), s) for s in sin]
        model = kur(alt, YON)
        skor["aileler"][aile] = model
        print(f"\n== {aile} ({', '.join(turler)}): {sum(s['kaynak'] == 'insan' for s in alt)} insan, "
              f"{sum(s['kaynak'] == 'model' for s in alt)} model parçası")
        print(f"   çapraz sınama AUC: {auc([(p, s['kaynak'] == 'model') for p, s in sinama]):.3f}")
        print("   katsayılar: " + ", ".join(f"{k} {v:+.2f}" for k, v in sorted(model["katsayi"].items(), key=lambda x: -abs(x[1]))))
        grup = defaultdict(list)
        for p, s in sinama:
            ad = s["dosya"].split("_")[0] if s["kaynak"] == "model" else ""
            grup[(s["kaynak"], s["tur"], ad)].append(p)
        print(f"   {'':28}{'parça':>6}{'ortanca':>9}" + "".join(f"{'>=' + str(e):>7}" for e in ESIKLER))
        for g in sorted(grup):
            v = sorted(grup[g])
            print(f"   {' '.join(x for x in g if x):28}{len(v):6}{v[len(v) // 2]:9.0f}"
                  + "".join(f"{sum(x >= e for x in v) / len(v):7.0%}" for e in ESIKLER))
        tum = sorted(p for p, s in sinama if s["kaynak"] == "model")
        print(f"   {'model (hepsi)':28}{len(tum):6}{tum[len(tum) // 2]:9.0f}"
              + "".join(f"{sum(x >= e for x in tum) / len(tum):7.0%}" for e in ESIKLER))
    if a.yaz:
        hedef = Path(__file__).resolve().parent.parent / "scripts" / "kurallar.py"
        metin = hedef.read_text(encoding="utf-8")
        yeni = "SKOR = " + pprint.pformat(skor, width=118, sort_dicts=False) + "\n"
        metin = re.sub(r"(?s)^SKOR = .*\Z", lambda _: yeni, metin, flags=re.M)
        hedef.write_text(metin, encoding="utf-8", newline="\n")
        print(f"\n{hedef} güncellendi")


if __name__ == "__main__":
    main()
