#!/usr/bin/env python3
"""denetle.py - Türkçe metinde yapay zekâ izlerini, ritmi ve yazım hatalarını tarar.

Kullanım:
  python3 scripts/denetle.py metin.md                    rapor
  python3 scripts/denetle.py metin.md --tur akademik     metin türüne göre
  python3 scripts/denetle.py yeni.md --kaynak eski.md    onarımda bilgi kaybı ya da eklemesi var mı
  python3 scripts/denetle.py metin.md --json             makine okur çıktı
  python3 scripts/denetle.py -                           metni standart girdiden okur

Dosya yazmaz, internete bağlanmaz, ek kütüphane istemez. Kurallar kurallar.py'de durur.
"""

import argparse
import json
import math
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import kurallar as K  # noqa: E402

UNLU_KALIN, UNLU_INCE, SERT = "aıou", "eiöü", "fstkçşhp"
KOD = re.compile(r"```.*?```|~~~.*?~~~", re.S)
SATIR_ICI = re.compile(r"`[^`\n]+`|https?://\S+|www\.\S+")
KELIME = re.compile(r"[^\W_]+(?:['’.\-][^\W_]+)*")
CUMLE_SONU = re.compile(r"([.!?…]+)([\"”’»)\]*_]*)(\s+|$)")
PENCERE = 5
COV_ESIK = 0.38


def kucult(s: str) -> str:
    """Türkçe küçük harf. Uzunluk değişmez, konumlar özgün metinle aynı kalır."""
    t = s.replace("I", "ı").replace("İ", "i").lower()
    return t if len(t) == len(s) else "".join((c.lower() if len(c.lower()) == 1 else c) for c in s.replace("I", "ı").replace("İ", "i"))


def maskele(metin: str) -> str:
    """Kod bloklarını boşlukla, satır içi kodu ve adresleri tek sözcük sayılacak biçimde örter."""
    metin = KOD.sub(lambda m: re.sub(r"[^\n]", " ", m.group(0)), metin)
    return SATIR_ICI.sub(lambda m: re.sub(r"\S", "x", m.group(0)), metin)


def kelimeler(s: str) -> list:
    return KELIME.findall(s)


def tur_coz(tur):
    if not tur:
        return None
    anahtar = K.TUR_ESADLARI.get(tur.lower(), tur.lower())
    if anahtar not in K.TURLER:
        raise ValueError(f"Bilinmeyen metin türü: {tur}. Seçenekler: {', '.join(K.TURLER)}")
    return anahtar


# --- satırlar, bloklar, cümleler -------------------------------------------------------------------

def _satir_turu(satirlar: list, i: int) -> str:
    s = satirlar[i].strip()
    if not s:
        return "bos"
    if re.match(r"#{1,6}\s", s) or re.fullmatch(r"[=\-*_]{3,}", s):
        return "baslik"
    if s[0] in "—–" or re.match(r"-\s?[^\W\d_\"“]", s) and not re.match(r"-\s[^\W\d_]", s):
        return "konusma"
    if re.match(r"(?:[-*+•]|\d+[.)])\s", s):
        return "madde"
    if s[0] in ">|":
        return "diger"
    if not re.search(r"[.!?…:;,\"”’)\]]$", s) and len(s.split()) <= 10:
        onceki = satirlar[i - 1].strip() if i else ""
        sonraki = satirlar[i + 1].strip() if i + 1 < len(satirlar) else ""
        once_tamam = not onceki or re.search(r"[.!?…:\"”’)\]]$", onceki) or onceki.startswith("#")
        sonra_tamam = not sonraki or not sonraki[0].islower()
        if once_tamam and sonra_tamam:
            return "baslik"
    return "duz"


def bloklar(metin: str) -> list:
    """Düz yazı bloklarını döndürür. Başlık, liste, alıntı, tablo ve konuşma satırları dışarıda kalır."""
    satirlar = metin.split("\n")
    out, buf = [], []
    for i in range(len(satirlar)):
        if _satir_turu(satirlar, i) == "duz":
            buf.append(satirlar[i].strip())
        elif buf:
            out.append(" ".join(buf))
            buf = []
    if buf:
        out.append(" ".join(buf))
    return out


def cumleler(blok: str) -> list:
    """Bloğu cümlelere böler. Kısaltma, sıra sayısı (3. bölüm), üç nokta ve tırnak içi söz cümleyi bölmez."""
    out, bas = [], 0
    for m in CUMLE_SONU.finditer(blok):
        son = m.end()
        kalan = blok[son:son + 1]
        if kalan and (kalan.islower() or kalan in ",;:"):
            continue                                    # "Neden?" diye sordu. / 19. yüzyıl / belki... ama
        if m.group(1) == ".":
            onceki = re.search(r"([^\W\d_]+)$", blok[bas:m.start()])
            if onceki:
                k = kucult(onceki.group(1))
                if k in K.KISALTMA or (len(k) == 1 and onceki.group(1).isupper()):
                    continue
                if k in K.KISALTMA_SONDA and not (kalan and kalan.isupper()):
                    continue
        parca = blok[bas:m.end(2)].strip()
        if kelimeler(parca):
            out.append(parca)
        bas = son
    kuyruk = blok[bas:].strip()
    if kelimeler(kuyruk):
        out.append(kuyruk)
    return out


def boy(cumle: str) -> int:
    return len(kelimeler(cumle))


# --- ölçümler --------------------------------------------------------------------------------------

def _ortanca(xs: list):
    if not xs:
        return None
    s = sorted(xs)
    n = len(s)
    return s[n // 2] if n % 2 else (s[n // 2 - 1] + s[n // 2]) / 2


def _cov(xs: list) -> float:
    ort = sum(xs) / len(xs)
    return math.sqrt(sum((x - ort) ** 2 for x in xs) / len(xs)) / ort if ort else 0.0


def son_ek(cumle: str) -> str:
    ks = kelimeler(cumle)
    if not ks:
        return ""
    w = kucult(ks[-1])
    if re.search(r"m[ae]kt[ae]d[ıi]r(?:l[ae]r)?$", w):
        return "-mektedir"
    if re.search(r"m[ıiuü]şt[ıiuü]r(?:l[ae]r)?$", w):
        return "-miştir"
    if re.search(r"[dt][ıiuü]r(?:l[ae]r)?$", w) and len(w) > 4:
        return "-dir"
    return ""


GECIS_RE = re.compile(r'^["“«(]?(?:' +"|".join(re.escape(g).replace(r"\ ", r"\s+") for g in sorted(K.GECIS, key=len, reverse=True)) + r")\b")
UCLU_RE = re.compile(r"[^\W\d_]+,\s+(?:[^\W\d_]+\s+){0,2}[^\W\d_]+\s+ve\s+[^\W\d_]+")


def olc(metin: str) -> dict:
    """Metnin ritim, noktalama ve ek ölçümleri. Metin maskelenmiş olmalı."""
    bl = bloklar(metin)
    cum = [c for b in bl for c in cumleler(b)]
    cum = [c for c in cum if boy(c) <= 120]            # noktalaması düşmüş tarama artığı
    boylar = [boy(c) for c in cum]
    duz = " ".join(bl)
    kelime = len(kelimeler(metin))
    duz_kelime = max(len(kelimeler(duz)), 1)
    n = len(boylar)

    covlar = [_cov(boylar[i:i + PENCERE]) for i in range(max(n - PENCERE + 1, 0))]
    pencereler = sorted(((c, i) for i, c in enumerate(covlar)))
    kucuk = [kucult(c) for c in cum]

    seri, seri_ek, kosu, onceki = 0, "", 0, ""
    for c in cum:
        ek = son_ek(c)
        kosu = kosu + 1 if ek and ek == onceki else (1 if ek else 0)
        onceki = ek
        if kosu > seri:
            seri, seri_ek = kosu, ek

    def binde(desen):
        return round(len(re.findall(desen, duz)) / duz_kelime * 1000, 2)

    def oran(sayi):
        return round(sayi / n, 3) if n else None

    return {
        "kelime": kelime,
        "cumle": n,
        "boylar": boylar,
        "ortanca_boy": _ortanca(boylar),
        "ritim": round(_ortanca(covlar), 3) if covlar else None,
        "duz_pencere": round(sum(c < COV_ESIK for c in covlar) / len(covlar), 3) if covlar else None,
        "orta_boy": oran(sum(15 <= b <= 22 for b in boylar)),
        "kisa": oran(sum(b <= 6 for b in boylar)),
        "uzun": oran(sum(b >= 28 for b in boylar)),
        "gecis": oran(sum(bool(GECIS_RE.match(c)) for c in kucuk)),
        "bu_basi": oran(sum(bool(re.match(r"^bu\b", c)) for c in kucuk)),
        "soru": binde(r"\?"), "unlem": binde(r"!"), "uc_nokta": binde(r"\.\.\.|…"),
        "iki_nokta": binde(r":(?=\s)"), "noktali_virgul": binde(r";"),
        "uclu": round(len(UCLU_RE.findall(kucult(duz))) / duz_kelime * 1000, 2),
        "degil_virgul": round(len(re.findall(r"\bdeğil[,;]", kucult(duz))) / duz_kelime * 1000, 2),
        "mektedir": round(len(re.findall(r"\w+m[ae]kt[ae]d[ıi]r\b", kucult(metin))) / max(kelime, 1) * 100, 2),
        "son_dir": oran(sum(son_ek(c) == "-dir" for c in cum)),
        "son_mistir": oran(sum(son_ek(c) == "-miştir" for c in cum)),
        "seri": seri, "seri_ek": seri_ek,
        "en_duz": [{"ilk_cumle": i + 1, "boylar": boylar[i:i + PENCERE], "baslangic": " ".join(cum[i].split()[:6])}
                   for c, i in pencereler[:3] if c < COV_ESIK],
    }


# --- kalıp ve yazım bulguları ----------------------------------------------------------------------

def _yazim_deseni() -> str:
    parca = []
    for yanlis in sorted(K.YAZIM, key=len, reverse=True):
        govde = re.escape(yanlis).replace(r"\ ", r"\s+")
        parca.append(rf"\b{govde}\b" if yanlis in K.YAZIM_TAM else rf"\b{govde}\w*")
    return "|".join(parca)


_DERLENMIS = None


def derlenmis() -> list:
    global _DERLENMIS
    if _DERLENMIS is None:
        _DERLENMIS = []
        for k in K.KURALLAR:
            desen = _yazim_deseni() if k["id"] == "yazim" else k["desen"]
            _DERLENMIS.append((k, re.compile(desen) if desen else None))
    return _DERLENMIS


def _son_sozcuk(n: int) -> str:
    birler = {1: "bir", 2: "iki", 3: "üç", 4: "dört", 5: "beş", 6: "altı", 7: "yedi", 8: "sekiz", 9: "dokuz"}
    onlar = {1: "on", 2: "yirmi", 3: "otuz", 4: "kırk", 5: "elli"}
    if n == 0:
        return "sıfır"
    return birler[n % 10] if n % 10 else onlar[n // 10]


def saat_eki(saat: int, dakika: int, ayrilma: bool) -> str:
    """Ek, saatin okunuşunun son sesine uyar: 13.00'te (on üçte), 17.30'da (otuzda)."""
    s = _son_sozcuk(dakika if dakika else saat)
    son_unlu = next(c for c in reversed(s) if c in UNLU_KALIN + UNLU_INCE)
    return ("t" if s[-1] in SERT else "d") + ("a" if son_unlu in UNLU_KALIN else "e") + ("n" if ayrilma else "")


def duzeltme(kural: dict, eslesme: str):
    """Kesin düzeltmesi olan bulgular için önerilen yazım, yoksa None."""
    if kural["id"] == "yazim":
        k = kucult(eslesme)
        for yanlis, dogru in sorted(K.YAZIM.items(), key=lambda x: -len(x[0])):
            m = re.match(re.escape(yanlis).replace(r"\ ", r"\s+"), k)
            if m:
                yeni = dogru + eslesme[m.end():]
                if eslesme[0].isupper():
                    yeni = ("İ" if yeni[0] == "i" else yeni[0].upper()) + yeni[1:]
                return yeni
        return None
    if "duzelt" in kural:
        bul, koy = kural["duzelt"]
        return re.sub(bul, koy, eslesme)
    return None


def bul(metin: str, tur=None) -> list:
    """Kalıp, cümle, biçim, noktalama ve yazım bulguları. Çakışan eşleşmelerden güçlü olan kalır."""
    kucuk = kucult(metin)
    aday = []
    for sira, (k, desen) in enumerate(derlenmis()):
        if desen is None or tur in k.get("atla", ()):
            continue
        for m in desen.finditer(metin if k.get("asil") else kucuk):
            if m.end() > m.start():
                aday.append((-k["guc"], sira, m.start(), m.end(), k))
    for m in re.finditer(r"(?<![\w.])(\d{1,2})\.(\d{2})'([dt][ae]n?)\b", kucuk):
        saat, dakika = int(m.group(1)), int(m.group(2))
        if saat <= 24 and dakika <= 59:
            beklenen = saat_eki(saat, dakika, m.group(3).endswith("n"))
            if m.group(3) != beklenen:
                aday.append((-1, 999, m.start(), m.end(), {"id": "saat-eki", "sinif": "yazim", "guc": 1,
                                                           "_oneri": f"{m.group(1)}.{m.group(2)}'{beklenen}"}))
    aday.sort(key=lambda a: (a[0], a[1], a[2]))
    dolu, out = [], []
    for _, _, bas, son, k in aday:
        if any(bas < s and b < son for b, s in dolu):
            continue
        dolu.append((bas, son))
        eslesme = metin[bas:son]
        b = {"id": k["id"], "sinif": k["sinif"], "guc": k["guc"], "eslesme": eslesme.strip(), "konum": bas}
        oneri = k.get("_oneri") or duzeltme(k, eslesme)
        if oneri and oneri != eslesme:
            b["oneri"] = oneri.strip()
        out.append(b)
    out.sort(key=lambda b: b["konum"])
    return out


# --- skor ------------------------------------------------------------------------------------------

SEVIYELER = [(80, "Yüksek"), (50, "Orta"), (0, "Düşük")]
EN_AZ_CUMLE = 8


def ozellikler(olcu: dict, bulgular: list) -> dict:
    """Skorun kullandığı sayılar. araclar/ayarla.py de aynı işlevi çağırır."""
    yuz = max(olcu["kelime"], 1) / 100
    return {
        "ritim": olcu["ritim"], "duz_pencere": olcu["duz_pencere"], "orta_boy": olcu["orta_boy"], "kisa": olcu["kisa"],
        "uzun": olcu["uzun"], "gecis": olcu["gecis"], "soru": min(olcu["soru"], 30), "iki_nokta": min(olcu["iki_nokta"], 30),
        "noktali_virgul": min(olcu["noktali_virgul"], 30), "uclu": min(olcu["uclu"], 20),
        "degil_virgul": min(olcu["degil_virgul"], 15), "bu_basi": olcu["bu_basi"],
        "guclu_kalip": min(sum(b["guc"] == 3 for b in bulgular if b["sinif"] in ("kalip", "cumle", "noktalama", "artik")) / yuz, 3),
        "orta_kalip": min(sum(b["guc"] == 2 for b in bulgular if b["sinif"] in ("kalip", "cumle", "bicim")) / yuz, 3),
        "zayif_kalip": min(sum(b["guc"] == 1 for b in bulgular if b["sinif"] in ("kalip", "cumle")) / yuz, 4),
    }


def skorla(olcu: dict, bulgular: list, tur=None) -> dict:
    if olcu["cumle"] < EN_AZ_CUMLE or K.SKOR is None:
        neden = (f"Skor için en az {EN_AZ_CUMLE} cümlelik düz yazı gerekiyor, bu metinde {olcu['cumle']} cümle var."
                 if K.SKOR is not None else "Skor henüz ayarlanmadı.")
        return {"skor": None, "seviye": "Skor yok", "gerekceler": [{"ozellik": "yetersiz", "pay": 0, "metin": neden}]}
    model = K.SKOR["aileler"][K.SKOR["tur_ailesi"].get(tur, K.SKOR["tur_ailesi"][None])]
    oz = ozellikler(olcu, bulgular)
    z, paylar = model["sabit"], []
    for ad, w in model["katsayi"].items():
        ort, sap = model["olcek"][ad]
        katki = w * ((oz[ad] or 0) - ort) / sap
        z += katki
        paylar.append((katki, ad))
    skor = round(100 / (1 + math.exp(-z)))
    seviye = next(ad for taban, ad in SEVIYELER if skor >= taban)
    aile = K.SKOR["tur_ailesi"].get(tur, K.SKOR["tur_ailesi"][None])
    gerekceler = [{"ozellik": ad, "pay": round(k, 2), "metin": _gerekce(ad, oz, olcu, bulgular)}
                  for k, ad in sorted(paylar, reverse=True) if k > _gerekce_esigi(ad, aile)][:5]
    return {"skor": skor, "seviye": seviye, "gerekceler": gerekceler}


def _gerekce_esigi(ad: str, aile: str) -> float:
    """Bir özelliğin gerekçe olarak yazılması için gereken en küçük pay. Soru azlığı yalnızca serbest türlerde,
    kısa ve uzun cümle azlığı ancak belirginse yazılır: resmî metne soru ekletmek istemeyiz."""
    if ad == "soru":
        return 0.15 if aile == "serbest" else 99
    if ad in ("kisa", "uzun"):
        return 0.5
    return 0.15


def _tr(x, basamak=2) -> str:
    return f"{x:.{basamak}f}".replace(".", ",")


def _gerekce(ad: str, oz: dict, olcu: dict, bulgular: list) -> str:
    def say(guc):
        adlar = {}
        for b in bulgular:
            if b["guc"] == guc and b["sinif"] in ("kalip", "cumle", "bicim", "noktalama", "artik"):
                adlar[b["eslesme"].lower()] = adlar.get(b["eslesme"].lower(), 0) + 1
        return ", ".join(f"“{k}”" + (f" ({v} kez)" if v > 1 else "") for k, v in list(adlar.items())[:6])
    metinler = {
        "ritim": f"Cümle boyları birbirine yakın: art arda beş cümlede değişkenlik {_tr(olcu['ritim'] or 0)} (yazarlarda 0,45 dolayı).",
        "duz_pencere": f"Beşer cümlelik parçaların %{round((olcu['duz_pencere'] or 0) * 100)}'i tekdüze.",
        "orta_boy": f"Cümlelerin %{round((olcu['orta_boy'] or 0) * 100)}'i 15-22 kelime arasında toplanmış.",
        "kisa": f"Kısa cümle az: altı kelime ve altındakiler %{round((olcu['kisa'] or 0) * 100)}.",
        "uzun": f"Uzun cümle az: 28 kelime ve üstündekiler %{round((olcu['uzun'] or 0) * 100)}.",
        "gecis": f"Cümlelerin %{round((olcu['gecis'] or 0) * 100)}'i “Ancak”, “Ayrıca”, “Bu nedenle” gibi bir geçiş sözüyle başlıyor.",
        "soru": f"Soru cümlesi az: bin kelimede {_tr(olcu['soru'], 1)}.",
        "iki_nokta": f"İki nokta kullanımı: bin kelimede {_tr(olcu['iki_nokta'], 1)}.",
        "noktali_virgul": f"Noktalı virgül sık: bin kelimede {_tr(olcu['noktali_virgul'], 1)}.",
        "uclu": f"“A, B ve C” biçiminde üçlü sıralama sık: bin kelimede {_tr(olcu['uclu'], 1)}.",
        "degil_virgul": f"“… değil, …” karşıtlığı sık: bin kelimede {_tr(olcu['degil_virgul'], 1)}.",
        "bu_basi": f"Cümlelerin %{round((olcu['bu_basi'] or 0) * 100)}'i “Bu” ile başlıyor.",
        "guclu_kalip": "Yazarlarda neredeyse hiç görülmeyen kalıplar: " + say(3) + ".",
        "orta_kalip": "Modellerin sık kullandığı kalıplar: " + say(2) + ".",
        "zayif_kalip": "Tek tek olağan ama burada yoğun sözler: " + say(1) + ".",
    }
    return metinler.get(ad, ad)


# --- sadakat: onarılmış metin kaynağa sadık mı? ----------------------------------------------------

SAYI_RE = re.compile(r"%?\d+(?:[.,:]\d+)*%?")
SAYI_SOZ = {"iki": "2", "üç": "3", "dört": "4", "beş": "5", "altı": "6", "yedi": "7", "sekiz": "8", "dokuz": "9", "on": "10"}


def _sayilar(metin: str) -> set:
    out = set()
    for s in SAYI_RE.findall(metin):
        s = s.strip("%").replace(":", ".")
        if re.fullmatch(r"\d{1,3}(?:\.\d{3})+", s):
            s = s.replace(".", "")
        out.add(s.replace(",", "."))
    for w in kelimeler(kucult(metin)):
        if w in SAYI_SOZ:
            out.add(SAYI_SOZ[w])
    return out


def _ozel_adlar(metin: str) -> set:
    out = set()
    for b in bloklar(metin) or [metin]:
        for c in cumleler(b):
            for w in c.split()[1:]:
                w = w.strip("\"“”‘’'«»()[],;:.!?*_")
                kok = re.split(r"['’]", w)[0]
                if len(kok) > 1 and kok[0].isupper() and not kok.isdigit():
                    out.add(kok)
    return out


def sadakat(kaynak: str, cikti: str) -> dict:
    """Kaynakla çıktıyı karşılaştırır: sayılar, özel adlar, ihtiyat sözleri, uzunluk."""
    ks, cs = _sayilar(kaynak), _sayilar(cikti)
    kaynak_kucuk, cikti_kucuk = kucult(kaynak), kucult(cikti)
    def govde(ad):                                      # ek farkını yok say: Bakanlığı / Bakanlığının
        k = kucult(ad)
        return k[:max(4, len(k) - 3)]

    kisaltmalar = K.KISALTMA | K.KISALTMA_SONDA
    yeni_ad = sorted(a for a in _ozel_adlar(cikti) if govde(a) not in kaynak_kucuk and kucult(a) not in kisaltmalar)
    kayip_ad = sorted(a for a in _ozel_adlar(kaynak) if govde(a) not in cikti_kucuk and kucult(a) not in kisaltmalar)
    azalan = []
    for desen in K.IHTIYAT:
        a, b = len(re.findall(desen, kaynak_kucuk)), len(re.findall(desen, cikti_kucuk))
        if b < a:
            ornek = re.search(desen, kaynak_kucuk).group(0)
            azalan.append({"ornek": ornek, "kaynak": a, "cikti": b})
    kk, ck = len(kelimeler(kaynak)), len(kelimeler(cikti))
    return {
        "kayip_sayi": sorted(ks - cs), "yeni_sayi": sorted(cs - ks),
        "kayip_ad": kayip_ad, "yeni_ad": yeni_ad, "azalan_ihtiyat": azalan,
        "kelime_orani": round(ck / max(kk, 1), 2),
        "temiz": not (ks - cs or cs - ks or yeni_ad or kayip_ad or azalan),
    }


# --- rapor -----------------------------------------------------------------------------------------

def denetle(metin: str, tur=None, kaynak=None) -> dict:
    tur = tur_coz(tur)
    profil = K.TURLER[tur] if tur else K.GENEL_TUR
    m = maskele(metin)
    olcu = olc(m)
    bulgular = bul(m, tur)
    rapor = {
        "tur": tur, "tur_adi": profil["ad"], "olcu": olcu, "bulgular": bulgular,
        "uyarilar": {
            "ritim": bool(olcu["ritim"] is not None and olcu["cumle"] >= EN_AZ_CUMLE and olcu["ritim"] < profil["ritim"]),
            # Kısa metinde tek bir -mektedir oranı şişirir: en az üç tane olmalı.
            "mektedir": olcu["mektedir"] > profil["mektedir_ust"] and olcu["mektedir"] * olcu["kelime"] >= 250,
            "seri": olcu["seri"] >= profil["seri"],
        },
        "mektedir_ust": profil["mektedir_ust"], "seri_siniri": profil["seri"],
    }
    rapor.update(skorla(olcu, bulgular, tur))
    if kaynak is not None:
        rapor["sadakat"] = sadakat(maskele(kaynak), m)
        k = denetle(kaynak, tur)
        rapor["kaynak"] = {"skor": k["skor"], **{a: k["olcu"][a] for a in ("cumle", "ritim", "kisa", "uzun", "gecis")}}
    return rapor


SINIF_ADI = {"kalip": "Kalıp", "cumle": "Cümle kuruluşu", "bicim": "Biçim", "noktalama": "Noktalama",
             "yazim": "Yazım", "artik": "Sohbet artığı"}


def yazdir(r: dict, ad: str):
    o = r["olcu"]
    print(f"yapay-degil denetimi: {ad}  ({r['tur_adi']})")
    print(f"{o['kelime']} kelime, {o['cumle']} cümle (düz yazı)")
    if r["skor"] is None:
        print(f"Yapay zekâ izi: {r['gerekceler'][0]['metin']}")
    else:
        print(f"Yapay zekâ izi: {r['skor']}/100 ({r['seviye']})")
        for g in r["gerekceler"]:
            print(f"  - {g['metin']}")
        print("  (Skor tanıdır, hedef değil. Düşsün diye metne soru, kısa cümle ya da kaynakta olmayan bir şey ekleme.)")
    if o["ritim"] is not None:
        durum = "tekdüze" if r["uyarilar"]["ritim"] else "olağan"
        print(f"\nRitim: {_tr(o['ritim'])} ({durum}). Ortanca cümle {o['ortanca_boy']:g} kelime, "
              f"15-22 kelimelik cümle %{round(o['orta_boy'] * 100)}, altı kelime ve altı %{round(o['kisa'] * 100)}.")
        if r["uyarilar"]["ritim"] or o["duz_pencere"] > 0.5:
            if o["en_duz"]:
                print("  Art arda beş cümlenin aynı boyda kaldığı yerler:")
            for p in o["en_duz"]:
                print(f"  Düz yer: {p['ilk_cumle']}. cümleden başlayarak boylar {p['boylar']}  “{p['baslangic']}…”")
    resmi = r["tur"] in ("akademik", "kamu")
    if r["tur"] in ("aciklayici", "teknik", "akademik", "kamu") and o["ritim"] is not None:
        print("  (Bu türde ritim satırları yalnızca bilgidir: ritim için cümle bölme ve birleştirme.)")
    if r["uyarilar"]["mektedir"]:
        print(f"-mektedir yoğun: 100 kelimede {_tr(o['mektedir'])}, bu türde yazarlarda en çok {_tr(r['mektedir_ust'], 1)}."
              + (" Bilgi içindir: onarımda kipi değiştirme." if resmi else ""))
    if r["uyarilar"]["seri"]:
        print(f"Art arda {o['seri']} cümle {o['seri_ek']} ile bitiyor."
              + (" Bilgi içindir: onarımda kipi değiştirme." if resmi else ""))
    if "kaynak" in r and r["kaynak"]["ritim"] is not None and o["ritim"] is not None:
        k = r["kaynak"]
        yuzde = lambda x: f"%{round((x or 0) * 100)}"  # noqa: E731
        print(f"\nKaynağa göre: skor {k['skor']} -> {r['skor']}, ritim {_tr(k['ritim'])} -> {_tr(o['ritim'])}, "
              f"altı kelime ve altı cümle {yuzde(k['kisa'])} -> {yuzde(o['kisa'])}, "
              f"28 kelime ve üstü cümle {yuzde(k['uzun'])} -> {yuzde(o['uzun'])}.")
        if o["ritim"] < k["ritim"] - 0.02:
            if (o["uzun"] or 0) < (k["uzun"] or 0) and o["cumle"] > k["cumle"]:
                print("  Onarım metni kaynaktan daha tekdüze yapmış: uzun cümleler bölünmüş, hepsi orta boya inmiş. "
                      "Böldüğün cümleleri geri birleştir.")
            else:
                print("  Onarımdan sonra cümle boyları kaynaktakinden daha az değişiyor. Cümle böldüysen geri al.")
    guclu = [b for b in r["bulgular"] if not (b["guc"] == 1 and b["sinif"] in ("kalip", "cumle"))]
    zayif = [b for b in r["bulgular"] if b["guc"] == 1 and b["sinif"] in ("kalip", "cumle")]

    def dok(liste):
        for b in liste:
            oneri = f"  ->  {b['oneri']}" if "oneri" in b else ""
            print(f"  [{SINIF_ADI[b['sinif']]}] {b['id']}: “{b['eslesme']}”{oneri}")

    if guclu:
        print(f"\nDüzelt ({len(guclu)}):")
        dok(guclu)
    if zayif:
        print(f"\nBir bak ({len(zayif)}). Bunlar yazarlarda da geçer, yerindeyse kalsın, yığılmışsa seyrelt:")
        dok(zayif)
    if not r["bulgular"]:
        print("\nKalıp ya da yazım bulgusu yok.")
    if "sadakat" in r:
        s = r["sadakat"]
        print("\nKaynağa sadakat:" + (" fark bulunmadı." if s["temiz"] else ""))
        for etiket, anahtar in [("Kaynakta olup çıktıda olmayan sayılar", "kayip_sayi"), ("Çıktıya eklenen sayılar", "yeni_sayi"),
                                ("Kaynakta olup çıktıda olmayan adlar", "kayip_ad"), ("Çıktıya eklenen adlar", "yeni_ad")]:
            if s[anahtar]:
                print(f"  {etiket}: {', '.join(s[anahtar])}")
        for a in s["azalan_ihtiyat"]:
            print(f"  İhtiyat ya da kapsam sözü azalmış: “{a['ornek']}” türü kaynakta {a['kaynak']}, çıktıda {a['cikti']}")
        print(f"  Çıktı kaynağın {_tr(s['kelime_orani'])} katı uzunlukta.")
        if not s["temiz"]:
            print("  Bu liste yalnızca aday gösterir. Her birine kaynakla karşılaştırarak bak.")


def _oku(yol: str) -> str:
    if yol == "-":
        return sys.stdin.buffer.read().decode("utf-8")
    p = Path(yol)
    if not p.exists():
        raise FileNotFoundError(f"{yol} bulunamadı.")
    return p.read_text(encoding="utf-8")


def main():
    for akis in (sys.stdout, sys.stderr):
        if hasattr(akis, "reconfigure"):
            akis.reconfigure(encoding="utf-8")
    ap = argparse.ArgumentParser(description="Türkçe metinde yapay zekâ izlerini ve yazım hatalarını tarar.")
    ap.add_argument("dosya", help="Taranacak metin dosyası, ya da standart girdi için -")
    ap.add_argument("--tur", "--register", dest="tur", help="Metin türü: " + ", ".join(K.TURLER))
    ap.add_argument("--kaynak", help="Onarımın kaynağı olan dosya. Verilirse sayı, ad ve ihtiyat sözleri karşılaştırılır.")
    ap.add_argument("--json", action="store_true", help="Çıktıyı JSON olarak ver")
    a = ap.parse_args()
    try:
        r = denetle(_oku(a.dosya), a.tur, _oku(a.kaynak) if a.kaynak else None)
    except (ValueError, FileNotFoundError) as e:
        print(f"Hata: {e}", file=sys.stderr)
        sys.exit(2)
    if a.json:
        print(json.dumps(r, ensure_ascii=False, indent=1))
    else:
        yazdir(r, a.dosya)


if __name__ == "__main__":
    main()
