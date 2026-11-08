// onarim.js - "Yapay zekâya düzelttir" düğmelerinin hazırladığı istek. Skill'in (SKILL.md) en önemli kurallarının kısa hâli,
// metin türüne göre bir satır, denetçinin bulduğu yerler ve metnin kendisi. İstek ziyaretçinin kendi
// sohbetinde açılır: hiçbir API çağrılmaz.
(function (root) {
  "use strict";

  const GENEL = `Aşağıdaki Türkçe metni doğal Türkçeyle yeniden yaz.

Kurallar:
1. Bilgiye dokunma. Kaynakta olmayan sayı, isim, örnek ya da iddia ekleme, olanı da çıkarma. "Olabilir", "bazı", "gibi" türünden ihtiyat ve kapsam sözleri aynen kalsın. Bir kalıbı silince yerine somut bilgi gerekiyorsa ve bu bilgi kaynakta yoksa uydurma, cümleyi sadeleştir.
2. Kelime değiştirmek yetmez, cümleyi Türkçenin düzeniyle kur. Niteleyicileri adın önüne al. Sıralı eylemleri "ve" yerine "-ıp", "-arak" gibi eklerle bağla. Vurgulanan bilgiyi yüklemin hemen önüne koy. Fiildeki kişi eki özneyi zaten gösteriyorsa "ben, biz, o" gibi zamirleri at.
3. Hazır sözleri at: "Günümüzün hızla değişen dünyasında" gibi açılışlar, "sadece X değil, aynı zamanda Y", "kritik bir rol oynamak", "âdeta", "yadsınamaz", "bununla birlikte", "öte yandan", "söz konusu", baştakini tekrarlayan "Sonuç olarak" kapanışları. Yerlerine "doğrudan", "aslında" gibi başka süsler koyma, çoğu zaman fiili yalın bırakmak yeter. "X değil, Y" kalıbını başka bir biçimde yeniden kurma.
4. Cümle boyları karışık olsun. Art arda üç cümle aynı uzunlukta kalmasın, birini böl ya da ikisini birleştir. Ritim için yeni cümle uydurma, var olanları böl ve birleştir. Her cümleyi kısa yazmak da tekdüzedir.
5. Yazım: Uzun çizgi (—) kullanma. "ve", "veya", "ya da" sözlerinin önüne virgül koyma. Saati 14.30, ondalık sayıyı %12,5 diye yaz. "birçok, birkaç, her şey, iş birliği, art arda" yazımlarına dikkat et. İki cümleyi noktalı virgülle birbirine yapıştırma.
6. "**Başlık:** açıklama" biçiminde kalın etiketli madde kurma. Kaynakta paragraf varsa paragraf kalsın.`;

  const TUR = {
    "": "Metnin türünü (blog, teknik belge, kurumsal yazı, akademik metin, öykü, resmî yazışma) kendin belirle ve tonunu koru.",
    "blog-deneme": "Metin türü blog ya da deneme. \"-mektedir\" yerine \"-iyor\" ya da geniş zaman kullan. Devrik cümle olabilir ama on cümlede birini geçmesin.",
    "teknik": "Metin türü teknik belge. Tanım cümlelerindeki \"-dır\" kalsın, \"-mektedir\" ise \"-ar/-ir\" ya da \"-iyor\" olsun. Devrik cümle kurma. Yerleşik İngilizce terimleri (endpoint, cache, deploy) zorla Türkçeleştirme.",
    "kurumsal": "Metin türü kurumsal yazı. Kurum kendi işini kendisi yapmış gibi söylesin (\"ekibimiz tarafından gerçekleştirildi\" değil \"ekibimiz yaptı\"). \"Kahvenizi alın\" türünden sahte samimiyet ekleme. Devrik cümle kurma.",
    "akademik-resmi": "Metin türü akademik ya da resmî. Belgenin düzenini ve \"-mektedir\" eklerini koru, yalnızca hazır sözleri ve çeviri kokan cümleleri onar. Devrik cümle kurma.",
    "edebi-anlati": "Metin türü edebî anlatı. Ritim önemli, cümle boylarını iyice çeşitlendir. Kaynakta olmayan duygu, imge ya da olay ekleme.",
    "kamu-kurum": "Metin türü kamu ya da kurum içi yazışma. Kurum dilini koru: adlaştırma, edilgen çatı, \"-mektedir\" ve art arda \"-mıştır\" ile biten cümleler bu türde olağandır. Yalnızca anlatım bozukluklarını ve yazım hatalarını düzelt.",
  };

  const fmt = (x) => String(x).replace(".", ",");

  function istek(metin, rapor, aciklamaBul) {
    const satirlar = [];
    const goruldu = new Map();
    for (const f of rapor.findings) {
      const a = aciklamaBul(f.rule);
      const ad = a ? a.baslik : f.rule;
      if (!goruldu.has(ad)) goruldu.set(ad, []);
      const l = goruldu.get(ad);
      const m = f.match.trim();
      if (m && !l.includes(m)) l.push(m);
    }
    for (const [ad, yerler] of goruldu) {
      satirlar.push(`- ${ad}: ${yerler.slice(0, 4).map((y) => `«${y}»`).join(", ")}`);
    }
    const rh = rapor.rhythm;
    if (rh.flat_rhythm_warning) satirlar.push(`- Ritim düz: cümle boyu değişkenliği ${fmt(rh.window_cov_median)} (Türk yazarlarda 0,46-0,49). Cümle boylarını çeşitlendir.`);
    if (rh.band_15_22_warning) satirlar.push(`- Cümlelerin %${Math.round(rh.band_15_22_ratio * 100)}'i 15-22 kelime arasında (yazarlarda %14-25). Bazılarını böl, bazılarını birleştir.`);
    if (rapor.high_mektedir_warning) satirlar.push(`- "-mektedir" çok sık: yüz kelimede ${fmt(rapor.mektedir_per_100_words)} (bu türde üst sınır ${fmt(rapor.mektedir_target_range[1])}).`);
    if (rapor.repeated_ending_warning) satirlar.push(`- Art arda ${rapor.repeated_ending_max_run} cümle aynı ekle bitiyor.`);

    let s = GENEL + "\n\n" + TUR[rapor.register || ""];
    if (satirlar.length) {
      s += "\n\nOtomatik denetçinin bu metinde işaretlediği yerler (ipucu olarak kullan, hepsi hata olmayabilir):\n" + satirlar.join("\n");
    }
    s += "\n\nYalnızca onarılmış metni ver. Başına ya da sonuna açıklama ekleme.\n\nMetin:\n\"\"\"\n" + metin.trim() + "\n\"\"\"";
    return s;
  }

  // Adres çubuğuyla gönderilebilecek en uzun istek (kodlanmış hâliyle). ChatGPT 24 bin karakteri kabul etti, Claude
  // otomatik istemciye 403 döndüğü için sınanamadı. 16 KB yaygın sunucu sınırının altında kalındı. Uzunsa kopyala ve aç.
  const URL_SINIRI = 14000;
  const SAGLAYICI = {
    chatgpt: { ad: "ChatGPT", taban: "https://chatgpt.com/", sorgu: (q) => "https://chatgpt.com/?q=" + q },
    claude: { ad: "Claude", taban: "https://claude.ai/new", sorgu: (q) => "https://claude.ai/new?q=" + q },
    gemini: { ad: "Gemini", taban: "https://gemini.google.com/app", sorgu: null },
  };
  function adres(saglayici, metin) {
    const p = SAGLAYICI[saglayici];
    const q = encodeURIComponent(metin);
    if (p.sorgu && q.length <= URL_SINIRI) return { url: p.sorgu(q), kopyala: false };
    return { url: p.taban, kopyala: true };
  }

  root.YD_ONARIM = { istek, adres, SAGLAYICI };
})(globalThis);
