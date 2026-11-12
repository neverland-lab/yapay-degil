#!/usr/bin/env python3
"""sina.py - Depo testleri. Kullanım: python3 araclar/sina.py   (Node.js varsa tarayıcı sürümü de sınanır)

Sınananlar: cümle bölücü, kurallar ve kendi örnekleri, sadakat denetimi, önce/sonra örnekleri (evals/ornekler.json),
üretilen kopyaların kaynakla aynı olması, Python ve JavaScript denetçilerinin aynı sonucu vermesi.
"""
import hashlib
import json
import re
import shutil
import subprocess
import sys
import unittest
from pathlib import Path

KOK = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(KOK / "scripts"))
sys.path.insert(0, str(KOK / "araclar"))
import denetle as d  # noqa: E402
import kurallar as K  # noqa: E402
import derle  # noqa: E402

ORNEKLER = json.loads((KOK / "evals" / "ornekler.json").read_text(encoding="utf-8"))


def idler(metin, tur=None):
    return [b["id"] for b in d.denetle(metin, tur)["bulgular"]]


class CumleBolucu(unittest.TestCase):
    def bol(self, s):
        return d.cumleler(s)

    def test_kisaltma_ve_sira_sayisi(self):
        self.assertEqual(len(self.bol("Dr. Ahmet 3. bölümü okudu. Prof. Dr. A. Hamdi geldi mi?")), 2)

    def test_tirnak_icinde_soru(self):
        self.assertEqual(len(self.bol('"Neden?" diye sordu Ayşe. Kimse cevap vermedi.')), 2)

    def test_uc_nokta_devam(self):
        self.assertEqual(len(self.bol("Belki... ama olmadı. Sonra gitti.")), 2)

    def test_tek_kelimelik_cumle_sayilir(self):
        self.assertEqual([d.boy(c) for c in self.bol("Evet. Geldi ve oturdu.")], [1, 3])

    def test_saat_ve_ondalik(self):
        self.assertEqual(len(self.bol("Toplantı 14.30'da başladı. Oran %12,5 oldu.")), 2)

    def test_vb_sonda(self):
        self.assertEqual(len(self.bol("Kalem, defter vb. Sonra çıktık.")), 2)
        self.assertEqual(len(self.bol("Kalem, defter vb. şeyler aldık.")), 1)

    def test_baslik_ve_liste_ritme_girmez(self):
        metin = "## Başlık burada\n\nİlk cümle bu. İkincisi de bu.\n\n- madde bir\n- madde iki\n\n— Geldin mi? dedi."
        self.assertEqual(d.olc(metin)["cumle"], 2)


class Kurallar(unittest.TestCase):
    def test_her_kuralin_aciklamasi_var(self):
        for k in K.KURALLAR:
            with self.subTest(k["id"]):
                self.assertTrue(k.get("baslik") and k.get("neden"), "baslik ve neden gerekli")
                self.assertEqual(len(k.get("ornek", [])), 2, "ornek [yanlış, doğru] olmalı")

    def test_ornek_kurali_tetikler_duzeltilmisi_tetiklemez(self):
        for k in K.KURALLAR:
            with self.subTest(k["id"]):
                self.assertIn(k["id"], idler(k["ornek"][0]), "ilk örnek kuralı tetiklemeli")
                self.assertNotIn(k["id"], idler(k["ornek"][1]), "ikinci örnek temiz olmalı")

    def test_idler_tekil_ve_guc_gecerli(self):
        ids = [k["id"] for k in K.KURALLAR]
        self.assertEqual(len(ids), len(set(ids)))
        for k in K.KURALLAR:
            self.assertIn(k["guc"], (1, 2, 3))
            self.assertIn(k["sinif"], d.SINIF_ADI)
            for t in k.get("atla", []):
                self.assertIn(t, K.TURLER)

    def test_tur_atlar(self):
        self.assertIn("bununla-birlikte", idler("Bununla birlikte ürün geldi.", "deneme"))
        self.assertNotIn("bununla-birlikte", idler("Bununla birlikte ürün geldi.", "akademik"))

    def test_eski_tur_adlari_calisir(self):
        self.assertEqual(d.tur_coz("blog-deneme"), "deneme")
        self.assertEqual(d.tur_coz("akademik-resmi"), "akademik")
        with self.assertRaises(ValueError):
            d.tur_coz("olmayan")

    def test_konusma_cizgisi_isaretlenmez(self):
        self.assertNotIn("uzun-cizgi", idler("— Geldin mi?\n— Geldim."))
        self.assertIn("uzun-cizgi", idler("Sonuç — beklendiği gibi — olumlu."))

    def test_kod_blogu_taranmaz(self):
        self.assertEqual(idler("Şunu çalıştır:\n\n```\nsaat = '14:30'  # herşey\n```\n"), [])

    def test_saat_eki(self):
        self.assertEqual(d.saat_eki(13, 0, False), "te")
        self.assertEqual(d.saat_eki(17, 30, False), "da")
        self.assertEqual(d.saat_eki(9, 15, True), "ten")
        b = d.denetle("Toplantı 13.00'da.")["bulgular"]
        self.assertEqual([(x["id"], x["oneri"]) for x in b], [("saat-eki", "13.00'te")])
        self.assertEqual(idler("Toplantı 13.00'te, yemek 17.30'da."), [])

    def test_yazim_onerisi(self):
        b = d.denetle("Herşeyi anlattım, bir çok kişi dinledi.")["bulgular"]
        self.assertEqual([x["oneri"] for x in b], ["Her şeyi", "birçok"])

    def test_cakisan_eslesmede_guclu_olan_kalir(self):
        ids = idler("Veri kalitesi kritik bir rol oynar.")
        self.assertIn("onemli-rol", ids)
        self.assertNotIn("rol-oyna", ids)


class Sadakat(unittest.TestCase):
    def test_temiz(self):
        s = d.sadakat("Ankara'da 2024 yılında 3 okul açıldı, bazıları küçük.", "2024'te Ankara'da 3 okul açıldı. Bazıları küçük.")
        self.assertTrue(s["temiz"], s)

    def test_eklenen_ve_kaybolan(self):
        s = d.sadakat("Birçok istek gelebilir.", "Yüzlerce istek gelir, İzmir'de 40 sunucu var.")
        self.assertIn("40", s["yeni_sayi"])
        self.assertIn("İzmir", s["yeni_ad"])
        self.assertTrue(any("bil" in a["ornek"] for a in s["azalan_ihtiyat"]))
        self.assertFalse(s["temiz"])


class Ornekler(unittest.TestCase):
    def test_once_sonra(self):
        for o in ORNEKLER["onarim"]:
            with self.subTest(o["id"]):
                once, sonra = d.denetle(o["yapay"], o["tur"]), d.denetle(o["dogal"], o["tur"], kaynak=o["yapay"])
                self.assertGreaterEqual(len(once["bulgular"]), o["en_az_bulgu"])
                self.assertEqual([b["id"] for b in sonra["bulgular"]], [])
                self.assertFalse(sonra["uyarilar"]["mektedir"])
                self.assertEqual(sonra["sadakat"]["yeni_sayi"], [])
                self.assertEqual(sonra["sadakat"]["yeni_ad"], [])
                for s in o.get("korunacak", []):
                    self.assertIn(s, o["dogal"])

    def test_dogal_metin_isaretlenmez(self):
        for o in ORNEKLER["dogal"]:
            with self.subTest(o["id"]):
                self.assertEqual(idler(o["metin"], o["tur"]), [])

    def test_skor_yonu(self):
        if K.SKOR is None:
            self.skipTest("skor ayarlanmamış")
        for o in ORNEKLER["skor"]:
            with self.subTest(o["id"]):
                r = d.denetle(o["metin"], o["tur"])
                if o["beklenen"] == "yok":
                    self.assertIsNone(r["skor"])
                elif o["beklenen"] == "yuksek":
                    self.assertGreaterEqual(r["skor"], 65)
                    self.assertTrue(r["gerekceler"])
                else:
                    self.assertLess(r["skor"], 35)


class Paket(unittest.TestCase):
    def test_skill_basligi(self):
        s = (KOK / "SKILL.md").read_text(encoding="utf-8")
        self.assertTrue(s.startswith("---\nname: yapay-degil\n"))
        self.assertIn("\ndescription: ", s)
        self.assertLess(len(s.splitlines()), 500)
        for r in derle.REFERANSLAR:
            self.assertIn(f"references/{r}", s, f"SKILL.md {r} dosyasına bağlanmıyor")

    def test_surum_her_yerde_ayni(self):
        surum = re.search(r'version: "([\d.]+)"', (KOK / "SKILL.md").read_text(encoding="utf-8")).group(1)
        eklenti = json.loads((KOK / ".claude-plugin" / "plugin.json").read_text(encoding="utf-8"))
        self.assertEqual(eklenti["version"], surum)
        self.assertIn(f"## {surum}", (KOK / "CHANGELOG.md").read_text(encoding="utf-8"))

    def test_skill_kendi_yazim_kurallarina_uyar(self):
        for p in [KOK / "SKILL.md", *(KOK / "references" / r for r in derle.REFERANSLAR if r != "yazim-ve-noktalama.md")]:
            s = p.read_text(encoding="utf-8")
            self.assertNotIn("—", s, f"{p.name}: uzun çizgi")
            self.assertNotIn("–", s, f"{p.name}: orta çizgi")
            self.assertIsNone(re.search(r"(?m)^\s*[-*]\s+\*\*[^*\n]+:\*\*", s), f"{p.name}: kalın etiketli madde")

    def test_kopyalar_kaynakla_ayni(self):
        paket = KOK / "skills" / "yapay-degil"
        ciftler = [(KOK / "SKILL.md", paket / "SKILL.md")]
        ciftler += [(KOK / "references" / r, paket / "references" / r) for r in derle.REFERANSLAR]
        ciftler += [(KOK / "scripts" / b, paket / "scripts" / b) for b in derle.BETIKLER]
        for kaynak, kopya in ciftler:
            self.assertEqual(kaynak.read_text(encoding="utf-8"), kopya.read_text(encoding="utf-8"),
                             f"{kopya.relative_to(KOK)} eski. araclar/derle.py çalıştır.")
        tek = (KOK / "dist" / "yapay-degil.full.md").read_text(encoding="utf-8")
        for kaynak, _ in ciftler[:1 + len(derle.REFERANSLAR)]:
            self.assertIn(kaynak.read_text(encoding="utf-8").strip(), tek)

    def test_site_verisi_guncel(self):
        site = KOK / "docs" / "site"
        govde = json.dumps(derle.site_verisi(), ensure_ascii=False, indent=1)
        self.assertIn(govde, (site / "kurallar.js").read_text(encoding="utf-8"), "kurallar.js eski. araclar/derle.py çalıştır.")
        html = (KOK / "docs" / "index.html").read_text(encoding="utf-8")
        betikler = re.findall(r'src="site/([\w.-]+\.js)\?v=([0-9a-f]+)"', html)
        self.assertEqual(len(betikler), 3)
        for ad, v in betikler:
            self.assertEqual(hashlib.sha256((site / ad).read_bytes()).hexdigest()[:10], v, f"{ad} adresi eski")


NODE = r"""
const fs = require("fs");
require(process.argv[1]); require(process.argv[2]);
const girdi = JSON.parse(fs.readFileSync(0, "utf8"));
process.stdout.write(JSON.stringify(girdi.map(c => globalThis.YD.denetle(c.metin, c.tur))));
"""


@unittest.skipUnless(shutil.which("node"), "Node.js yok")
class TarayiciSurumu(unittest.TestCase):
    def test_sayfa_betigi_hatasiz_calisir(self):
        p = subprocess.run(["node", str(KOK / "araclar" / "sayfa_dumani.js")], capture_output=True, text=True, encoding="utf-8")
        self.assertEqual(p.returncode, 0, p.stderr[-800:])

    def test_python_ile_ayni(self):
        metinler = [o["yapay"] for o in ORNEKLER["onarim"]] + [o["dogal"] for o in ORNEKLER["onarim"]]
        metinler += [o["metin"] for o in ORNEKLER["dogal"] + ORNEKLER["skor"]]
        metinler += [x for k in K.KURALLAR for x in k.get("ornek", [])]
        metinler.append((KOK / "references" / "metin-turleri.md").read_text(encoding="utf-8"))
        durumlar = [{"metin": m, "tur": t} for m in metinler for t in [None, *K.TURLER]]
        site = KOK / "docs" / "site"
        p = subprocess.run(["node", "-e", NODE, str(site / "kurallar.js"), str(site / "denetci.js")],
                           input=json.dumps(durumlar), capture_output=True, text=True, encoding="utf-8")
        self.assertEqual(p.returncode, 0, p.stderr)
        for durum, js in zip(durumlar, json.loads(p.stdout)):
            py = d.denetle(durum["metin"], durum["tur"])
            etiket = f"[{durum['tur']}] {durum['metin'][:40]!r}"
            self.assertEqual([(b["id"], b["eslesme"], b.get("oneri")) for b in py["bulgular"]],
                             [(b["id"], b["eslesme"], b.get("oneri")) for b in js["bulgular"]], etiket)
            self.assertEqual(py["olcu"]["boylar"], js["olcu"]["boylar"], etiket)
            for alan, deger in py["olcu"].items():
                if isinstance(deger, float):
                    self.assertAlmostEqual(deger, js["olcu"][alan], delta=0.002, msg=f"{etiket} {alan}")
            self.assertEqual(py["uyarilar"], js["uyarilar"], etiket)
            self.assertEqual(py["seviye"] == "Skor yok", js["skor"] is None, etiket)
            if py["skor"] is not None:
                self.assertAlmostEqual(py["skor"], js["skor"], delta=1, msg=etiket)
                self.assertEqual([g["ozellik"] for g in py["gerekceler"]], [g["ozellik"] for g in js["gerekceler"]], etiket)


if __name__ == "__main__":
    unittest.main(verbosity=1)
