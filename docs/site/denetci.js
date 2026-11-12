// denetci.js - scripts/denetle.py'nin tarayıcı karşılığı. Kurallar kurallar.js'ten gelir (araclar/derle.py üretir).
// İki sürüm aynı sonucu vermeli: araclar/sina.py ikisini karşılaştırır. Burada bir şey değişirse orada da değişir.
(function (root) {
  "use strict";
  const K = root.YD_KURALLAR;
  const KALIN = "aıou", INCE = "eiöü", SERT = "fstkçşhp";
  const KELIME = /[\p{L}\p{N}]+(?:['’.\-][\p{L}\p{N}]+)*/gu;
  const CUMLE_SONU = /([.!?…]+)(["”’»)\]*_]*)(\s+|$)/gu;
  const PENCERE = 5, COV_ESIK = 0.38, EN_AZ_CUMLE = 8;
  const SEVIYELER = [[80, "Yüksek"], [50, "Orta"], [0, "Düşük"]];

  const kucult = (s) => s.replace(/I/g, "ı").replace(/İ/g, "i").toLowerCase();
  const kucukMu = (c) => c !== c.toUpperCase() && c === c.toLowerCase();
  const buyukMu = (c) => c !== c.toLowerCase() && c === c.toUpperCase();
  const kelimeler = (s) => s.match(KELIME) || [];
  const boy = (s) => kelimeler(s).length;
  const yuvarla = (x, n) => Math.round(x * 10 ** n) / 10 ** n;

  function maskele(metin) {
    return metin.replace(/```[\s\S]*?```|~~~[\s\S]*?~~~/g, (m) => m.replace(/[^\n]/g, " "))
      .replace(/`[^`\n]+`|https?:\/\/\S+|www\.\S+/g, (m) => m.replace(/\S/g, "x"));
  }

  function satirTuru(satirlar, i) {
    const s = satirlar[i].trim();
    if (!s) return "bos";
    if (/^#{1,6}\s/u.test(s) || /^[=\-*_]{3,}$/u.test(s)) return "baslik";
    if ("—–".includes(s[0]) || (/^-\s?[^\P{L}"“]/u.test(s) && !/^-\s\p{L}/u.test(s))) return "konusma";
    if (/^(?:[-*+•]|\d+[.)])\s/u.test(s)) return "madde";
    if (">|".includes(s[0])) return "diger";
    if (!/[.!?…:;,"”’)\]]$/u.test(s) && s.split(/\s+/u).length <= 10) {
      const onceki = i ? satirlar[i - 1].trim() : "";
      const sonraki = i + 1 < satirlar.length ? satirlar[i + 1].trim() : "";
      const onceTamam = !onceki || /[.!?…:"”’)\]]$/u.test(onceki) || onceki.startsWith("#");
      const sonraTamam = !sonraki || !kucukMu(sonraki[0]);
      if (onceTamam && sonraTamam) return "baslik";
    }
    return "duz";
  }

  function bloklar(metin) {
    const satirlar = metin.split("\n"), out = [];
    let buf = [];
    for (let i = 0; i < satirlar.length; i++) {
      if (satirTuru(satirlar, i) === "duz") buf.push(satirlar[i].trim());
      else if (buf.length) { out.push(buf.join(" ")); buf = []; }
    }
    if (buf.length) out.push(buf.join(" "));
    return out;
  }

  function cumleler(blok) {
    const out = [];
    let bas = 0;
    for (const m of blok.matchAll(CUMLE_SONU)) {
      const son = m.index + m[0].length;
      const kalan = blok.slice(son, son + 1);
      if (kalan && (kucukMu(kalan) || ",;:".includes(kalan))) continue;
      if (m[1] === ".") {
        const onceki = blok.slice(bas, m.index).match(/(\p{L}+)$/u);
        if (onceki) {
          const k = kucult(onceki[1]);
          if (K.kisaltma.includes(k) || (k.length === 1 && buyukMu(onceki[1]))) continue;
          if (K.kisaltmaSonda.includes(k) && !(kalan && buyukMu(kalan))) continue;
        }
      }
      const parca = blok.slice(bas, m.index + m[1].length + m[2].length).trim();
      if (kelimeler(parca).length) out.push(parca);
      bas = son;
    }
    const kuyruk = blok.slice(bas).trim();
    if (kelimeler(kuyruk).length) out.push(kuyruk);
    return out;
  }

  function ortanca(xs) {
    if (!xs.length) return null;
    const s = [...xs].sort((a, b) => a - b), n = s.length;
    return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
  }
  function cov(xs) {
    const ort = xs.reduce((a, b) => a + b, 0) / xs.length;
    return ort ? Math.sqrt(xs.reduce((a, x) => a + (x - ort) ** 2, 0) / xs.length) / ort : 0;
  }
  function sonEk(cumle) {
    const ks = kelimeler(cumle);
    if (!ks.length) return "";
    const w = kucult(ks[ks.length - 1]);
    if (/m[ae]kt[ae]d[ıi]r(?:l[ae]r)?$/u.test(w)) return "-mektedir";
    if (/m[ıiuü]şt[ıiuü]r(?:l[ae]r)?$/u.test(w)) return "-miştir";
    if (/[dt][ıiuü]r(?:l[ae]r)?$/u.test(w) && w.length > 4) return "-dir";
    return "";
  }

  const GECIS_RE = new RegExp(K.gecisRe, "u");
  const UCLU_RE = /\p{L}+,\s+(?:\p{L}+\s+){0,2}\p{L}+\s+ve\s+\p{L}+/gu;
  const say = (re, s) => (s.match(re) || []).length;

  function olc(metin) {
    const bl = bloklar(metin);
    let cum = bl.flatMap(cumleler).filter((c) => boy(c) <= 120);
    const boylar = cum.map(boy);
    const duz = bl.join(" ");
    const kelime = kelimeler(metin).length;
    const duzKelime = Math.max(kelimeler(duz).length, 1);
    const n = boylar.length;
    const covlar = [];
    for (let i = 0; i < Math.max(n - PENCERE + 1, 0); i++) covlar.push(cov(boylar.slice(i, i + PENCERE)));
    const pencereler = covlar.map((c, i) => [c, i]).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const kucuk = cum.map(kucult);
    let seri = 0, seriEk = "", kosu = 0, onceki = "";
    for (const c of cum) {
      const ek = sonEk(c);
      kosu = ek && ek === onceki ? kosu + 1 : (ek ? 1 : 0);
      onceki = ek;
      if (kosu > seri) { seri = kosu; seriEk = ek; }
    }
    const binde = (re) => yuvarla(say(re, duz) / duzKelime * 1000, 2);
    const oran = (x) => (n ? yuvarla(x / n, 3) : null);
    const kd = kucult(duz);
    return {
      kelime, cumle: n, boylar,
      ortanca_boy: ortanca(boylar),
      ritim: covlar.length ? yuvarla(ortanca(covlar), 3) : null,
      duz_pencere: covlar.length ? yuvarla(covlar.filter((c) => c < COV_ESIK).length / covlar.length, 3) : null,
      orta_boy: oran(boylar.filter((b) => b >= 15 && b <= 22).length),
      kisa: oran(boylar.filter((b) => b <= 6).length),
      uzun: oran(boylar.filter((b) => b >= 28).length),
      gecis: oran(kucuk.filter((c) => GECIS_RE.test(c)).length),
      bu_basi: oran(kucuk.filter((c) => /^bu(?![\p{L}\p{N}_])/u.test(c)).length),
      soru: binde(/\?/g), unlem: binde(/!/g), uc_nokta: binde(/\.\.\.|…/g),
      iki_nokta: binde(/:(?=\s)/g), noktali_virgul: binde(/;/g),
      uclu: yuvarla(say(UCLU_RE, kd) / duzKelime * 1000, 2),
      degil_virgul: yuvarla(say(/(?<![\p{L}\p{N}_])değil[,;]/gu, kd) / duzKelime * 1000, 2),
      mektedir: yuvarla(say(/[\p{L}\p{N}_]+m[ae]kt[ae]d[ıi]r(?![\p{L}\p{N}_])/gu, kucult(metin)) / Math.max(kelime, 1) * 100, 2),
      son_dir: oran(cum.filter((c) => sonEk(c) === "-dir").length),
      son_mistir: oran(cum.filter((c) => sonEk(c) === "-miştir").length),
      seri, seri_ek: seriEk,
      en_duz: pencereler.slice(0, 3).filter(([c]) => c < COV_ESIK).map(([, i]) => ({
        ilk_cumle: i + 1, boylar: boylar.slice(i, i + PENCERE), baslangic: cum[i].split(/\s+/u).slice(0, 6).join(" "),
      })),
    };
  }

  const derlenmis = K.kurallar.map((k) => ({ k, re: k.re ? new RegExp(k.re, "gu" + (k.m ? "m" : "")) : null }));
  const YAZIM = Object.entries(K.yazim).sort((a, b) => b[0].length - a[0].length);

  function sonSozcuk(n) {
    const birler = { 1: "bir", 2: "iki", 3: "üç", 4: "dört", 5: "beş", 6: "altı", 7: "yedi", 8: "sekiz", 9: "dokuz" };
    const onlar = { 1: "on", 2: "yirmi", 3: "otuz", 4: "kırk", 5: "elli" };
    if (n === 0) return "sıfır";
    return n % 10 ? birler[n % 10] : onlar[Math.floor(n / 10)];
  }
  function saatEki(saat, dakika, ayrilma) {
    const s = sonSozcuk(dakika ? dakika : saat);
    let sonUnlu = "";
    for (let i = s.length - 1; i >= 0; i--) if ((KALIN + INCE).includes(s[i])) { sonUnlu = s[i]; break; }
    return (SERT.includes(s[s.length - 1]) ? "t" : "d") + (KALIN.includes(sonUnlu) ? "a" : "e") + (ayrilma ? "n" : "");
  }
  const kacis = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/ /g, "\\s+");

  function duzeltme(k, eslesme) {
    if (k.id === "yazim") {
      const kk = kucult(eslesme);
      for (const [yanlis, dogru] of YAZIM) {
        const m = kk.match(new RegExp("^" + kacis(yanlis), "u"));
        if (m) {
          let yeni = dogru + eslesme.slice(m[0].length);
          if (buyukMu(eslesme[0])) yeni = (yeni[0] === "i" ? "İ" : yeni[0].toUpperCase()) + yeni.slice(1);
          return yeni;
        }
      }
      return null;
    }
    if (k.duzelt) return eslesme.replace(new RegExp(k.duzelt[0], "gu"), k.duzelt[1]);
    return null;
  }

  function bul(metin, tur) {
    const kucuk = kucult(metin), aday = [];
    derlenmis.forEach(({ k, re }, sira) => {
      if (!re || (k.atla || []).includes(tur)) return;
      re.lastIndex = 0;
      for (const m of (k.asil ? metin : kucuk).matchAll(re)) {
        if (m[0].length) aday.push([-k.guc, sira, m.index, m.index + m[0].length, k, null]);
      }
    });
    for (const m of kucuk.matchAll(/(?<![\p{L}\p{N}_.])(\d{1,2})\.(\d{2})'([dt][ae]n?)(?![\p{L}\p{N}_])/gu)) {
      const saat = parseInt(m[1], 10), dakika = parseInt(m[2], 10);
      if (saat <= 24 && dakika <= 59) {
        const beklenen = saatEki(saat, dakika, m[3].endsWith("n"));
        if (m[3] !== beklenen) {
          aday.push([-1, 999, m.index, m.index + m[0].length, { id: "saat-eki", sinif: "yazim", guc: 1 }, `${m[1]}.${m[2]}'${beklenen}`]);
        }
      }
    }
    aday.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);
    const dolu = [], out = [];
    for (const [, , bas, son, k, hazir] of aday) {
      if (dolu.some(([b, s]) => bas < s && b < son)) continue;
      dolu.push([bas, son]);
      const ham = metin.slice(bas, son);
      const b = { id: k.id, sinif: k.sinif, guc: k.guc, eslesme: ham.trim(), konum: bas, uzunluk: son - bas };
      const oneri = hazir || duzeltme(k, ham);
      if (oneri && oneri !== ham) b.oneri = oneri.trim();
      out.push(b);
    }
    out.sort((a, b) => a.konum - b.konum);
    return out;
  }

  function ozellikler(o, bulgular) {
    const yuz = Math.max(o.kelime, 1) / 100;
    const sayim = (guc, siniflar) => bulgular.filter((b) => b.guc === guc && siniflar.includes(b.sinif)).length;
    return {
      ritim: o.ritim, duz_pencere: o.duz_pencere, orta_boy: o.orta_boy, kisa: o.kisa, uzun: o.uzun, gecis: o.gecis,
      soru: Math.min(o.soru, 30), iki_nokta: Math.min(o.iki_nokta, 30), noktali_virgul: Math.min(o.noktali_virgul, 30),
      uclu: Math.min(o.uclu, 20), degil_virgul: Math.min(o.degil_virgul, 15), bu_basi: o.bu_basi,
      guclu_kalip: Math.min(sayim(3, ["kalip", "cumle", "noktalama", "artik"]) / yuz, 3),
      orta_kalip: Math.min(sayim(2, ["kalip", "cumle", "bicim"]) / yuz, 3),
      zayif_kalip: Math.min(sayim(1, ["kalip", "cumle"]) / yuz, 4),
    };
  }

  const tr = (x, n = 2) => x.toFixed(n).replace(".", ",");
  const yuzde = (x) => Math.round((x || 0) * 100);

  function gerekce(ad, o, bulgular) {
    const liste = (guc) => {
      const adlar = new Map();
      for (const b of bulgular) {
        if (b.guc === guc && ["kalip", "cumle", "bicim", "noktalama", "artik"].includes(b.sinif)) {
          const k = b.eslesme.toLowerCase();
          adlar.set(k, (adlar.get(k) || 0) + 1);
        }
      }
      return [...adlar].slice(0, 6).map(([k, v]) => `“${k}”` + (v > 1 ? ` (${v} kez)` : "")).join(", ");
    };
    const m = {
      ritim: `Cümle boyları birbirine yakın: art arda beş cümlede değişkenlik ${tr(o.ritim || 0)} (yazarlarda 0,45 dolayı).`,
      duz_pencere: `Beşer cümlelik parçaların %${yuzde(o.duz_pencere)}'i tekdüze.`,
      orta_boy: `Cümlelerin %${yuzde(o.orta_boy)}'i 15-22 kelime arasında toplanmış.`,
      kisa: `Kısa cümle az: altı kelime ve altındakiler %${yuzde(o.kisa)}.`,
      uzun: `Uzun cümle az: 28 kelime ve üstündekiler %${yuzde(o.uzun)}.`,
      gecis: `Cümlelerin %${yuzde(o.gecis)}'i “Ancak”, “Ayrıca”, “Bu nedenle” gibi bir geçiş sözüyle başlıyor.`,
      soru: `Soru cümlesi az: bin kelimede ${tr(o.soru, 1)}.`,
      iki_nokta: `İki nokta kullanımı: bin kelimede ${tr(o.iki_nokta, 1)}.`,
      noktali_virgul: `Noktalı virgül sık: bin kelimede ${tr(o.noktali_virgul, 1)}.`,
      uclu: `“A, B ve C” biçiminde üçlü sıralama sık: bin kelimede ${tr(o.uclu, 1)}.`,
      degil_virgul: `“… değil, …” karşıtlığı sık: bin kelimede ${tr(o.degil_virgul, 1)}.`,
      bu_basi: `Cümlelerin %${yuzde(o.bu_basi)}'i “Bu” ile başlıyor.`,
      guclu_kalip: "Yazarlarda neredeyse hiç görülmeyen kalıplar: " + liste(3) + ".",
      orta_kalip: "Modellerin sık kullandığı kalıplar: " + liste(2) + ".",
      zayif_kalip: "Tek tek olağan ama burada yoğun sözler: " + liste(1) + ".",
    };
    return m[ad] || ad;
  }

  function skorla(o, bulgular, tur) {
    if (o.cumle < EN_AZ_CUMLE || !K.skor) {
      const neden = K.skor ? `Skor için en az ${EN_AZ_CUMLE} cümlelik düz yazı gerekiyor, bu metinde ${o.cumle} cümle var.` : "Skor henüz ayarlanmadı.";
      return { skor: null, seviye: "Skor yok", gerekceler: [{ ozellik: "yetersiz", pay: 0, metin: neden }] };
    }
    const aile = K.skor.tur_ailesi[tur === null ? "null" : tur] || K.skor.tur_ailesi.null;
    const model = K.skor.aileler[aile];
    const oz = ozellikler(o, bulgular);
    let z = model.sabit;
    const paylar = [];
    for (const [ad, w] of Object.entries(model.katsayi)) {
      const [ort, sap] = model.olcek[ad];
      const katki = w * ((oz[ad] || 0) - ort) / sap;
      z += katki;
      paylar.push([katki, ad]);
    }
    const skor = Math.round(100 / (1 + Math.exp(-z)));
    const seviye = SEVIYELER.find(([taban]) => skor >= taban)[1];
    paylar.sort((a, b) => b[0] - a[0] || (a[1] < b[1] ? 1 : -1));
    const esik = (ad) => (ad === "soru" ? (aile === "serbest" ? 0.15 : 99) : (ad === "kisa" || ad === "uzun") ? 0.5 : 0.15);
    const gerekceler = paylar.filter(([k, ad]) => k > esik(ad)).slice(0, 5)
      .map(([k, ad]) => ({ ozellik: ad, pay: yuvarla(k, 2), metin: gerekce(ad, o, bulgular) }));
    return { skor, seviye, gerekceler };
  }

  function denetle(metin, tur) {
    tur = tur || null;
    const profil = tur ? K.turler[tur] : K.genelTur;
    const m = maskele(metin);
    const o = olc(m);
    const bulgular = bul(m, tur);
    const rapor = {
      tur, tur_adi: profil.ad, olcu: o, bulgular,
      uyarilar: {
        ritim: Boolean(o.ritim !== null && o.cumle >= EN_AZ_CUMLE && o.ritim < profil.ritim),
        mektedir: o.mektedir > profil.mektedir_ust && o.mektedir * o.kelime >= 250,
        seri: o.seri >= profil.seri,
      },
      mektedir_ust: profil.mektedir_ust, seri_siniri: profil.seri,
    };
    return Object.assign(rapor, skorla(o, bulgular, tur));
  }

  root.YD = { denetle, cumleler, bloklar, EN_AZ_CUMLE };
})(globalThis);
