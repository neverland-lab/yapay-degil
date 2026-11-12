#!/usr/bin/env python3
"""derle.py - Kaynaktan üretilen her şeyi yeniden üretir. SKILL.md, references/ ya da scripts/ değişince çalıştır.

  dist/yapay-degil.full.md     klasör yükleyemeyen arayüzler için tek dosya
  skills/yapay-degil/          kurulumda inen paket (SKILL.md, references/, scripts/)
  docs/site/kurallar.js        web sayfasının kural verisi (scripts/kurallar.py'den)
  docs/index.html              betik adreslerindeki içerik özeti (önbellek için)

Kullanım: python3 araclar/derle.py
Yalnızca depo içine yazar. skills/yapay-degil/ altındaki references ve scripts klasörlerini silip yeniden kopyalar.
"""
import hashlib
import json
import re
import shutil
import sys
from pathlib import Path

KOK = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(KOK / "scripts"))
import denetle as d  # noqa: E402
import kurallar as K  # noqa: E402

REFERANSLAR = ["cumle-kurulusu.md", "kaliplar.md", "yazim-ve-noktalama.md", "metin-turleri.md", "olculer.md"]
BETIKLER = ["denetle.py", "kurallar.py"]

# Python'da \w ve \b Unicode harfleri tanır, JavaScript'te tanımaz. İkisi açık yazılır.
W_ICI = r"\p{L}\p{N}_"
W = f"[{W_ICI}]"
B = f"(?:(?<={W})(?!{W})|(?<!{W})(?={W}))"


def js_desen(desen: str):
    """Python düzenli ifadesini JavaScript'e çevirir. (kaynak, çok_satırlı) döndürür."""
    cok = desen.startswith("(?m)")
    if cok:
        desen = desen[4:]
    out, i, sinifta = [], 0, False
    while i < len(desen):
        ch = desen[i]
        if desen.startswith(r"\w", i):
            out.append(W_ICI if sinifta else W)
            i += 2
        elif desen.startswith(r"\b", i) and not sinifta:
            out.append(B)
            i += 2
        elif ch == "\\":
            out.append(desen[i:i + 2])
            i += 2
        else:
            if ch == "[" and not sinifta:
                sinifta = True
            elif ch == "]" and sinifta:
                sinifta = False
            out.append(ch)
            i += 1
    return "".join(out), cok


def site_verisi() -> dict:
    kurallar = []
    for k in K.KURALLAR:
        desen = d._yazim_deseni() if k["id"] == "yazim" else k["desen"]
        kayit = {"id": k["id"], "sinif": k["sinif"], "guc": k["guc"]}
        if desen:
            kayit["re"], cok = js_desen(desen)
            if cok:
                kayit["m"] = True
        for alan in ("asil", "atla", "baslik", "neden", "ornek"):
            if alan in k:
                kayit[alan] = k[alan]
        if "duzelt" in k:
            kayit["duzelt"] = [js_desen(k["duzelt"][0])[0], k["duzelt"][1]]
        kurallar.append(kayit)
    skor = None
    if K.SKOR:
        skor = {"tur_ailesi": {("null" if t is None else t): a for t, a in K.SKOR["tur_ailesi"].items()},
                "aileler": K.SKOR["aileler"]}
    return {
        "turler": K.TURLER, "genelTur": K.GENEL_TUR, "kurallar": kurallar, "yazim": K.YAZIM,
        "gecisRe": js_desen(d.GECIS_RE.pattern)[0],
        "kisaltma": sorted(K.KISALTMA), "kisaltmaSonda": sorted(K.KISALTMA_SONDA), "skor": skor,
    }


def yaz(yol: Path, metin: str):
    yol.parent.mkdir(parents=True, exist_ok=True)
    yol.write_bytes(metin.encode("utf-8"))


def guvenli_sil(hedef: Path):
    """Yalnızca skills/yapay-degil/ altındaki bir klasörü siler. Başka bir yere çözümlenirse durur."""
    izinli = (KOK / "skills" / "yapay-degil").resolve()
    if hedef.is_symlink() or hedef.resolve().parent != izinli:
        raise SystemExit(f"Beklenmeyen silme hedefi, durduruldu: {hedef}")
    if hedef.exists():
        shutil.rmtree(hedef)


def main():
    skill = (KOK / "SKILL.md").read_text(encoding="utf-8")
    eksik = [r for r in REFERANSLAR if not (KOK / "references" / r).exists()]
    if eksik:
        raise SystemExit(f"Eksik referans: {eksik}")

    parcalar = [skill.strip()]
    for r in REFERANSLAR:
        parcalar.append(f"\n\n<!-- references/{r} -->\n\n" + (KOK / "references" / r).read_text(encoding="utf-8").strip())
    yaz(KOK / "dist" / "yapay-degil.full.md", "\n".join(parcalar) + "\n")

    paket = KOK / "skills" / "yapay-degil"
    paket.mkdir(parents=True, exist_ok=True)
    yaz(paket / "SKILL.md", skill)
    for klasor, dosyalar in (("references", REFERANSLAR), ("scripts", BETIKLER)):
        guvenli_sil(paket / klasor)
        for ad in dosyalar:
            yaz(paket / klasor / ad, (KOK / klasor / ad).read_text(encoding="utf-8"))

    govde = json.dumps(site_verisi(), ensure_ascii=False, indent=1)
    yaz(KOK / "docs" / "site" / "kurallar.js",
        "// Bu dosyayı araclar/derle.py scripts/kurallar.py'den üretir. Elle düzenleme.\n"
        f"globalThis.YD_KURALLAR = {govde};\n")

    sayfa = KOK / "docs" / "index.html"
    html = sayfa.read_text(encoding="utf-8")

    def damga(m):
        ozet = hashlib.sha256((KOK / "docs" / "site" / m.group(1)).read_bytes()).hexdigest()[:10]
        return f'src="site/{m.group(1)}?v={ozet}"'

    yeni = re.sub(r'src="site/([\w.-]+\.js)(?:\?v=[0-9a-f]+)?"', damga, html)
    if yeni != html:
        yaz(sayfa, yeni)
    print(f"dist, skills/yapay-degil ve docs/site/kurallar.js yazıldı ({len(K.KURALLAR)} kural).")


if __name__ == "__main__":
    main()
