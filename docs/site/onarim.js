// onarim.js - "Yapay zekâya düzelttir" düğmelerinin hazırladığı istek. Skill'in (SKILL.md) en önemli kurallarının kısa hâli,
// metin türüne göre bir satır, denetçinin bulduğu yerler ve metnin kendisi. İstek ziyaretçinin kendi
// sohbetinde açılır: hiçbir API çağrılmaz.
(function (root) {
  "use strict";

  const GENEL = `Aşağıdaki Türkçe metni doğal Türkçeyle yeniden yaz.

Kurallar:
1. Bilgiye dokunma. Kaynakta olmayan sayı, isim, örnek ya da iddia ekleme, olanı da çıkarma. "Olabilir", "bazı", "gibi", "yaklaşık" türünden ihtiyat ve kapsam sözleri aynen kalsın. Bir kalıbı silince yerine somut bilgi gerekiyorsa ve bu bilgi kaynakta yoksa uydurma, cümleyi sadeleştir.
2. Önce ritim. Cümle boyları karışık olsun: art arda üç cümle aynı uzunlukta kalmasın, birini böl ya da ikisini birleştir. Arada uzun bir cümle de olsun, her cümleyi kısaltmak da tekdüzedir. Ritim için yeni cümle uydurma, var olanları böl ve birleştir.
3. Yazının düzeni. Konuyu duyuran girişi ("Bu yazıda ...", "Günümüzün hızla değişen dünyasında") ve söyleneni tekrarlayan kapanışı ("Sonuç olarak ...", "Unutmamak gerekir ki ...") at. Cümleleri "Ayrıca", "Bununla birlikte", "Bu nedenle", "Birincisi", "Son olarak" gibi sözlerle açma. "**Başlık:** açıklama" biçiminde kalın etiketli madde kurma, kaynakta paragraf varsa paragraf kalsın.
4. "Sadece X değil, aynı zamanda Y" ve "X değil, Y" karşıtlıklarını düz söyle, başka bir biçimde yeniden kurma. Her şeyi üçe tamamlama.
5. Cümleyi Türkçenin düzeniyle kur. Niteleyeni adın önüne al. Sıralı eylemleri "ve" yerine "-ıp", "-arak" gibi eklerle bağla. Vurgulanan bilgiyi yüklemin hemen önüne koy. Fiildeki ek özneyi zaten gösteriyorsa "ben, biz, o" gibi zamirleri at.
6. İçi boş sözleri at: "önemli bir rol oynar", "büyük önem taşır", "yadsınamaz", "bir diğer önemli nokta", "tam da bu noktada". Yerlerine "aslında", "doğrudan" gibi başka süsler koyma, çoğu zaman fiili yalın bırakmak yeter.
7. Yazım: Uzun çizgi (—) kullanma. "ve", "veya", "ya da" sözlerinin önüne virgül koyma. Saati 14.30, ondalık sayıyı %12,5 diye yaz. "birçok, birkaç, her şey, iş birliği, art arda" yazımlarına dikkat et.`;

  const TUR = {
    "": "Metnin türünü (blog, teknik belge, şirket yazısı, akademik metin, öykü, resmî yazışma) kendin belirle ve tonunu koru.",
    "deneme": "Metin türü blog, deneme ya da köşe yazısı. \"-mektedir\" yerine \"-iyor\" ya da geniş zaman kullan. Devrik cümle olabilir ama on cümlede birini geçmesin.",
    "anlati": "Metin türü öykü ya da roman. Ritim önemli, cümle boylarını iyice çeşitlendir. Kaynakta olmayan duygu, imge ya da olay ekleme.",
    "kurumsal": "Metin türü şirket yazısı. Şirket kendi işini kendisi yapmış gibi söylesin (\"ekibimiz tarafından gerçekleştirildi\" değil \"ekibimiz yaptı\"). \"Kahvenizi alın\" türünden sahte samimiyet ekleme. Devrik cümle kurma.",
    "aciklayici": "Metin türü ders kitabı ya da popüler bilim. Tanım cümlelerindeki \"-dır\" ve noktalı virgüller kalsın. Edebî ritmi zorlama, yalnızca göze batan tekdüzeliği düzelt.",
    "teknik": "Metin türü teknik belge. Tanım cümlelerindeki \"-dır\" kalsın, \"-mektedir\" ise \"-ar/-ir\" ya da \"-iyor\" olsun. Devrik cümle kurma. Yerleşik İngilizce terimleri (endpoint, cache, deploy) zorla Türkçeleştirme. Kod bloklarına dokunma.",
    "akademik": "Metin türü akademik ya da hukuki. Belgenin düzenini, atıfları, \"-mektedir\" eklerini ve uzun cümleleri koru. Yalnızca içi boş sözleri, sıralama dizilişini ve çeviri kokan cümleleri onar. Devrik cümle kurma.",
    "kamu": "Metin türü kamu ya da kurum içi yazışma. Kurum dilini koru: adlaştırma, edilgen çatı, \"-mektedir\" ve art arda \"-mıştır\" ile biten cümleler bu türde olağandır. Yalnızca anlatım bozukluklarını, dolgu sözleri ve yazım hatalarını düzelt.",
  };

  const fmt = (x) => String(x).replace(".", ",");

  function istek(metin, rapor, baslikBul) {
    const satirlar = [];
    const goruldu = new Map();
    for (const b of rapor.bulgular) {
      const ad = baslikBul(b);
      if (!goruldu.has(ad)) goruldu.set(ad, []);
      const l = goruldu.get(ad);
      if (b.eslesme && !l.includes(b.eslesme)) l.push(b.eslesme);
    }
    for (const [ad, yerler] of goruldu) {
      satirlar.push(`- ${ad}: ${yerler.slice(0, 4).map((y) => `«${y}»`).join(", ")}`);
    }
    const o = rapor.olcu;
    if (rapor.uyarilar.ritim) {
      let s = `- Ritim düz: cümle boyu değişkenliği ${fmt(o.ritim)} (Türk yazarlarda 0,45 dolayı). Cümle boylarını çeşitlendir.`;
      if (o.en_duz.length) s += ` En düz yer «${o.en_duz[0].baslangic}…» diye başlıyor (cümle boyları ${o.en_duz[0].boylar.join(", ")}).`;
      satirlar.push(s);
    }
    if (o.gecis !== null && o.gecis > 0.15) satirlar.push(`- Cümlelerin %${Math.round(o.gecis * 100)}'i bir geçiş sözüyle başlıyor. Çoğunu at.`);
    if (rapor.uyarilar.mektedir) satirlar.push(`- "-mektedir" çok sık: yüz kelimede ${fmt(o.mektedir)} (bu türde üst sınır ${fmt(rapor.mektedir_ust)}).`);
    if (rapor.uyarilar.seri) satirlar.push(`- Art arda ${o.seri} cümle aynı ekle bitiyor.`);

    let s = GENEL + "\n\n" + TUR[rapor.tur || ""];
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
