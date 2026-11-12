// Bu dosyayı araclar/derle.py scripts/kurallar.py'den üretir. Elle düzenleme.
globalThis.YD_KURALLAR = {
 "turler": {
  "deneme": {
   "ad": "Blog, deneme, köşe yazısı",
   "mektedir_ust": 0.5,
   "seri": 5,
   "ritim": 0.38
  },
  "anlati": {
   "ad": "Öykü, roman, anlatı",
   "mektedir_ust": 0.5,
   "seri": 5,
   "ritim": 0.38
  },
  "kurumsal": {
   "ad": "Şirket yazısı, tanıtım, bülten",
   "mektedir_ust": 1.0,
   "seri": 5,
   "ritim": 0.38
  },
  "aciklayici": {
   "ad": "Ders kitabı, popüler bilim",
   "mektedir_ust": 1.0,
   "seri": 5,
   "ritim": 0.32
  },
  "teknik": {
   "ad": "Teknik belge",
   "mektedir_ust": 1.0,
   "seri": 5,
   "ritim": 0.38
  },
  "akademik": {
   "ad": "Akademik, hukuki",
   "mektedir_ust": 2.5,
   "seri": 7,
   "ritim": 0.36
  },
  "kamu": {
   "ad": "Kamu ve kurum içi yazışma",
   "mektedir_ust": 2.5,
   "seri": 99,
   "ritim": 0.36
  }
 },
 "genelTur": {
  "ad": "Tür seçilmedi",
  "mektedir_ust": 2.5,
  "seri": 5,
  "ritim": 0.38
 },
 "kurallar": [
  {
   "id": "sadece-degil-ayni",
   "sinif": "kalip",
   "guc": 3,
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))(?:sadece|yalnızca|yalnız)\\s+[^,.!?\\n]+?\\s+değil,?\\s*aynı\\s+zamanda(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))",
   "baslik": "“Sadece … değil, aynı zamanda …”",
   "neden": "Yapay zekânın en sevdiği cümle. Kimse “sadece eğlenceli” demedi ki. Olmayan bir görüşü reddetmek yerine ne olduğunu düz söyle.",
   "ornek": [
    "Kitap sadece eğlenceli değil, aynı zamanda öğretici.",
    "Kitap hem eğlenceli hem öğretici."
   ]
  },
  {
   "id": "bir-x-degil-bir-y",
   "sinif": "kalip",
   "guc": 3,
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))bir\\s+[^,.!?\\n]{1,30}\\s+değil,\\s+(?:aslında\\s+|aynı\\s+zamanda\\s+)?bir\\s+",
   "baslik": "“Bir … değil, bir …”",
   "neden": "Önce kimsenin söylemediği bir şeyi reddediyor, sonra asıl sözü söylüyor. Yapay zekâ bunu çok yapar. İlk yarıyı at, asıl sözü söyle.",
   "ornek": [
    "Bu bir güncelleme değil, bir devrim.",
    "Bu sürümle uygulama baştan yazıldı."
   ]
  },
  {
   "id": "sadece-degil",
   "sinif": "kalip",
   "guc": 1,
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))(?:sadece|yalnızca|yalnız)\\s+[^\\s,.!?]+(?:\\s+[^\\s,.!?]+){0,4}\\s+değil[,;]",
   "baslik": "“Yalnızca … değil, … de”",
   "neden": "Yazarlar da kullanır, bir yazıda bir kez geçmesi sorun değil. Yapay zekâ ise dört beş kat sık kullanıyor. Sık geçiyorsa birkaçını düz söyle.",
   "ornek": [
    "Bağımlılık yalnızca bireyi değil, ailesini de etkiler.",
    "Bağımlılık en çok aileyi yıpratır."
   ]
  },
  {
   "id": "hizla-degisen",
   "sinif": "kalip",
   "guc": 3,
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))hızla\\s+değişen\\s+(?:[\\p{L}\\p{N}_]+\\s+)?(?:dünya|çağ|koşul)|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))dijitalleşen\\s+(?:çağ|dünya)|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))günümüz\\s+dünyasında|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))dijital\\s+çağda|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))günümüzün\\s+(?:hızlı|rekabetçi|dijital)",
   "baslik": "“Günümüzün hızla değişen dünyasında”",
   "neden": "Hiçbir şey söylemeyen bir giriş. Okur ilk cümlede bir şey öğrenmek ister. Doğrudan konuya gir.",
   "ornek": [
    "Günümüzün hızla değişen dünyasında iletişim her zamankinden önemli.",
    "Ekipler artık çoğunlukla yazışarak anlaşıyor."
   ]
  },
  {
   "id": "tam-bu-noktada",
   "sinif": "kalip",
   "guc": 3,
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))(?:işte\\s+)?tam\\s+(?:da\\s+)?bu\\s+noktada|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))işte\\s+bu\\s+noktada",
   "baslik": "“Tam da bu noktada”",
   "neden": "Bir şey söylemeden önce davul çalmak gibi. Yazarlarda neredeyse hiç yok. Sil, cümle aynı şeyi söyler.",
   "ornek": [
    "İşte tam da bu noktada planlama devreye giriyor.",
    "Burada iş planlamaya kalıyor."
   ]
  },
  {
   "id": "bu-noktada",
   "sinif": "kalip",
   "guc": 1,
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))bu\\s+noktada(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))",
   "atla": [
    "akademik",
    "kamu"
   ],
   "baslik": "“Bu noktada”",
   "neden": "Çoğu zaman silinince hiçbir şey eksilmez. Yer gösteriyorsa “burada” demek yeter.",
   "ornek": [
    "Bu noktada dikkat edilmesi gereken şey sıcaklıktır.",
    "Burada sıcaklığa dikkat et."
   ]
  },
  {
   "id": "yadsinamaz",
   "sinif": "kalip",
   "guc": 3,
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))yadsınamaz(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))ink[aâ]r\\s+edilemez(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))",
   "baslik": "“Yadsınamaz”, “inkâr edilemez”",
   "neden": "“Bu çok önemli” demenin süslü yolu. Neden önemli olduğunu söylemiyor, okur da ikna olmuyor. Önemini gösteren bilgiyi yaz.",
   "ornek": [
    "Bu buluşun önemi yadsınamaz.",
    "Bu buluş sayesinde hastalık iki yıl erken fark ediliyor."
   ]
  },
  {
   "id": "deger-kat",
   "sinif": "kalip",
   "guc": 3,
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))değer\\s+kat|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))fark\\s+yarat|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))ivme\\s+kazan|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))güç\\s+kat",
   "baslik": "“Değer katar”, “fark yaratır”, “ivme kazanır”",
   "neden": "Reklam dili. İyi bir şey olduğunu söylüyor ama ne olduğunu söylemiyor. Ne değiştiğini yaz.",
   "ornek": [
    "Yeni panel işinize değer katar.",
    "Yeni panelde raporu tek tıkla alırsınız."
   ]
  },
  {
   "id": "zemin-hazirla",
   "sinif": "kalip",
   "guc": 3,
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))zemin\\s+hazırla",
   "baslik": "“Zemin hazırlar”",
   "neden": "Yapay zekâ neden-sonuç anlatırken hep bu söze sarılıyor. “Yol açar”, “kolaylaştırır” ya da doğrudan sonucun kendisi yeter.",
   "ornek": [
    "Göç, aile yapısının değişmesine zemin hazırlamıştır.",
    "Göçle birlikte aile yapısı değişmiştir."
   ]
  },
  {
   "id": "goz-ardi",
   "sinif": "kalip",
   "guc": 3,
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))göz\\s+ardı\\s+edil(?:me|eme)",
   "baslik": "“Göz ardı edilmemeli”",
   "neden": "Okura parmak sallayan bir kapanış. Neyin neden önemli olduğunu söyle, uyarıyı bırak.",
   "ornek": [
    "Uykunun önemi göz ardı edilmemelidir.",
    "Az uyuyan çocuk derste dikkatini toplayamıyor."
   ]
  },
  {
   "id": "cigir-acan",
   "sinif": "kalip",
   "guc": 3,
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))çığır\\s+aç|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))dönüm\\s+noktası|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))kilometre\\s+taşı|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))devrim\\s+(?:niteliğinde|yarat)",
   "baslik": "“Çığır açan”, “dönüm noktası”",
   "neden": "Abartılı sözler. Her şeye “dönüm noktası” denince hiçbir şey büyük görünmüyor. Ne değiştiğini yazman yeter.",
   "ornek": [
    "Bu güncelleme bir dönüm noktası.",
    "Bu güncellemeyle uygulama iki kat hızlı açılıyor."
   ]
  },
  {
   "id": "yelpaze",
   "sinif": "kalip",
   "guc": 3,
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))geniş\\s+(?:bir\\s+)?yelpaze|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))zengin\\s+bir\\s+(?:doku|mozaik)",
   "baslik": "“Geniş bir yelpaze”",
   "neden": "“Çok çeşit var” demenin süslü hâli. Kaç çeşit, ne çeşit, onu yaz.",
   "ornek": [
    "Geniş bir yelpazede ürün sunuyoruz.",
    "Kırk çeşit çay satıyoruz."
   ]
  },
  {
   "id": "derinlemesine",
   "sinif": "kalip",
   "guc": 2,
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))derinlemesine(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))mercek\\s+altına\\s+al",
   "baslik": "“Derinlemesine”, “mercek altına almak”",
   "neden": "İncelemenin ne kadar derin olduğunu söylemek onu derin yapmıyor. Ne bulduğunu yaz.",
   "ornek": [
    "Bu yazıda konuyu derinlemesine inceleyeceğiz.",
    "Kiralar neden bu kadar arttı? Üç sebebi var."
   ]
  },
  {
   "id": "bir-diger",
   "sinif": "kalip",
   "guc": 2,
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))bir\\s+diğer\\s+[\\p{L}\\p{N}_]+",
   "baslik": "“Bir diğer önemli nokta”",
   "neden": "İngilizcedeki “another” sözünün çevirisi. Yapay zekâ maddeleri bununla sıralar. “Bir başka”, “öteki” ya da hiçbir şey demeden yeni konuya geçmek daha doğal.",
   "ornek": [
    "Bir diğer önemli etken ise uyku düzenidir.",
    "Uyku düzeni de etkiliyor."
   ]
  },
  {
   "id": "onem-tasi",
   "sinif": "kalip",
   "guc": 2,
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))(?:büyük|önemli|kritik|hayati|ayrı|özel)\\s+(?:bir\\s+)?önem\\s+(?:taşı|arz\\s+et)",
   "baslik": "“Büyük önem taşıyor”",
   "neden": "Bir şeyin önemli olduğunu söylüyor ama neden önemli olduğunu söylemiyor. Neyi değiştirdiğini yaz.",
   "ornek": [
    "Erken teşhis büyük önem taşıyor.",
    "Erken teşhis edilen hastaların çoğu iyileşiyor."
   ]
  },
  {
   "id": "oneme-sahip",
   "sinif": "kalip",
   "guc": 2,
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))(?:kritik|hayati|büyük|ayrı|özel|stratejik)\\s+(?:bir\\s+)?öneme\\s+sahip",
   "baslik": "“Kritik öneme sahip”",
   "neden": "İngilizceden kelime kelime çeviri. “Çok önemli” demek bile daha doğal, neden önemli olduğunu söylemek en iyisi.",
   "ornek": [
    "Yedekleme kritik bir öneme sahiptir.",
    "Yedek yoksa disk bozulduğunda her şey gider."
   ]
  },
  {
   "id": "onemli-rol",
   "sinif": "kalip",
   "guc": 1,
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))(?:kritik|hayati|kilit|merkez[iî]|önemli|büyük|belirleyici|etkin|aktif)\\s+(?:bir\\s+)?rol\\s+(?:oyna|üstlen)",
   "baslik": "“Önemli bir rol oynar”",
   "neden": "Bir şeyin işin içinde olduğunu söylüyor ama ne yaptığını söylemiyor. Ne yaptığını yaz.",
   "ornek": [
    "Uyku, sağlıkta kritik bir rol oynar.",
    "Az uyuyan kişi daha sık hastalanır."
   ]
  },
  {
   "id": "sonuc-olarak",
   "sinif": "kalip",
   "guc": 2,
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))sonuç\\s+olarak(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))özetlemek\\s+gerekirse|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))son\\s+tahlilde|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))özetle(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))kısacası(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))toparlamak\\s+gerekirse",
   "atla": [
    "akademik",
    "kamu"
   ],
   "baslik": "“Sonuç olarak”, “kısacası”",
   "neden": "Yapay zekâ neredeyse her yazıyı böyle bitiriyor ve baştakini tekrar ediyor. Son paragraf zaten sondur. Yeni bir şey söylemiyorsa o paragrafı sil.",
   "ornek": [
    "Sonuç olarak, düzenli spor sağlığa iyi gelir.",
    "Haftada üç gün yürüyen biri farkı bir ayda hisseder."
   ]
  },
  {
   "id": "olanak-tani",
   "sinif": "kalip",
   "guc": 2,
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))(?:olanak|imk[aâ]n|fırsat)\\s+(?:tanı|sun|sağla)",
   "baslik": "“Olanak tanır”, “imkân sağlar”, “fırsat sunar”",
   "neden": "Yanlış değil ama dolambaçlı. Çoğu zaman fiilin kendisi yeter: “görmenize olanak tanır” yerine “görürsünüz”.",
   "ornek": [
    "Uygulama, harcamalarınızı takip etmenize olanak tanır.",
    "Uygulamada harcamalarınızı takip edebilirsiniz."
   ]
  },
  {
   "id": "deneyim-sun",
   "sinif": "kalip",
   "guc": 2,
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))(?:deneyim|çözüm|avantaj|kolaylık|esneklik|perspektif|bakış\\s+açısı|özgürlük)[\\p{L}\\p{N}_]*\\s+sun(?:ar|uyor|maktadır|an|du)",
   "baslik": "“Deneyim sunar”, “çözüm sunar”",
   "neden": "İngilizce “offer” sözünün çevirisi, tanıtım yazılarında çok geçiyor. Ne sunduğunu değil, okurun ne yapabileceğini yaz.",
   "ornek": [
    "Yeni arayüz kusursuz bir deneyim sunuyor.",
    "Yeni arayüzde siparişi üç adımda verirsiniz."
   ]
  },
  {
   "id": "her-gecen-gun",
   "sinif": "kalip",
   "guc": 2,
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))her\\s+geçen\\s+gün(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))",
   "baslik": "“Her geçen gün”",
   "neden": "Hazır bir giriş sözü. “Giderek” demek yeter. Elinde sayı varsa sayıyı yaz.",
   "ornek": [
    "Çevrim içi alışveriş her geçen gün yaygınlaşıyor.",
    "Çevrim içi alışveriş beş yılda üç katına çıktı."
   ]
  },
  {
   "id": "kapi-arala",
   "sinif": "kalip",
   "guc": 2,
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))kapı[\\p{L}\\p{N}_]*\\s+aral[aı]",
   "baslik": "“Kapı aralar”",
   "neden": "Süslü bir benzetme. Neye yol açtığını düz söyle.",
   "ornek": [
    "Bu buluş yeni tedavilere kapı aralıyor.",
    "Bu buluşla iki yeni ilaç denenmeye başladı."
   ]
  },
  {
   "id": "kopru-kur",
   "sinif": "kalip",
   "guc": 2,
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))köprü\\s+(?:kur|görevi|işlevi)",
   "baslik": "“Köprü kurar”",
   "neden": "Yapay zekânın sevdiği bir benzetme. İki şeyi nasıl bağladığını söylemek daha çok şey anlatır.",
   "ornek": [
    "Gelenek, kuşaklar arasında köprü kurar.",
    "Dedemin anlattığı masalı şimdi ben kızıma anlatıyorum."
   ]
  },
  {
   "id": "kanitidir",
   "sinif": "kalip",
   "guc": 2,
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))en\\s+(?:büyük|güzel|açık)\\s+(?:kanıtı|göstergesi)|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))(?:açık|somut|canlı)\\s+bir\\s+(?:kanıtı|göstergesi)",
   "baslik": "“… en büyük kanıtıdır”",
   "neden": "İngilizceden kelime kelime çevrilmiş bir söz. “Kanıtıdır” demek yerine kanıtın kendisini yaz.",
   "ornek": [
    "Bu başarı, ekibin uyumunun en büyük kanıtıdır.",
    "Ekip bu işi üç ayda bitirdi, kimse ayrılmadı."
   ]
  },
  {
   "id": "kusursuz-sekilde",
   "sinif": "kalip",
   "guc": 2,
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))(?:kusursuz|pürüzsüz|zahmetsiz|sorunsuz)\\s+bir\\s+(?:şekilde|biçimde)|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))pürüzsüzce(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))zahmetsizce(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))",
   "baslik": "“Kusursuz bir şekilde”",
   "neden": "İngilizce “seamlessly” sözünün çevirisi. Ne olduğunu düz söyle.",
   "ornek": [
    "Sistem kusursuz bir şekilde çalışıyor.",
    "Sistem bir aydır hiç durmadı."
   ]
  },
  {
   "id": "potansiyel",
   "sinif": "kalip",
   "guc": 2,
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))potansiyelini\\s+(?:ortaya|açığa)\\s+çıkar|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))tam\\s+potansiyel|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))bir\\s+(?:üst|sonraki)\\s+seviyeye\\s+taşı",
   "baslik": "“Potansiyelini ortaya çıkarın”, “bir üst seviyeye taşıyın”",
   "neden": "Reklam sözü. Kulağa hoş geliyor ama hiçbir şey vaat etmiyor. Okur ne kazanacağını bilmek ister.",
   "ornek": [
    "İşletmenizi bir üst seviyeye taşıyın.",
    "Faturalarınızı beş dakikada kesin."
   ]
  },
  {
   "id": "pazarlama",
   "sinif": "kalip",
   "guc": 2,
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))oyun\\s+değiştirici|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))oyunun\\s+kurallarını\\s+değiştir|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))tek\\s+durak|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))hepsi\\s+bir\\s+arada|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))kaldıraç\\s+olarak|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))başlamaya\\s+hazır\\s+mısınız|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))ihtiyaçlarınıza\\s+(?:özel|göre)\\s+(?:olarak\\s+)?tasarlan|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))zamandan\\s+ve\\s+paradan\\s+tasarruf",
   "baslik": "Çeviri reklam sözleri",
   "neden": "İngilizce tanıtım metinlerinden kelime kelime çevrilmiş sözler: “oyun değiştirici”, “tek durak noktası”, “başlamaya hazır mısınız?”. Türkçede kimse böyle konuşmaz.",
   "ornek": [
    "Bu araç tam bir oyun değiştirici.",
    "Bu araçla bir günlük iş bir saatte bitiyor."
   ]
  },
  {
   "id": "kalbinde",
   "sinif": "kalip",
   "guc": 2,
   "re": "[\\p{L}\\p{N}_]+(?:ın|in|un|ün)\\s+(?:tam\\s+)?kalbinde\\s+(?:yer|bulun|konum)",
   "baslik": "“… kalbinde yer alan”",
   "neden": "İngilizce “in the heart of” sözünün çevirisi. “Merkezinde”, “ortasında” demek yeter.",
   "ornek": [
    "Otelimiz şehrin kalbinde yer alıyor.",
    "Otelimiz şehrin merkezinde."
   ]
  },
  {
   "id": "jargon",
   "sinif": "kalip",
   "guc": 2,
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))bütüncül\\s+(?:bir\\s+)?(?:yaklaşım|bakış)|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))holistik|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))paradigma\\s+değişimi|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))sinerji|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))proaktif",
   "baslik": "“Bütüncül yaklaşım”, “sinerji”",
   "neden": "Moda kelimeler. Ne yapılacağını anlatmıyorlar. Yapılacak işi düz bir cümleyle yaz.",
   "ornek": [
    "Bütüncül bir yaklaşımla sinerji yaratacağız.",
    "Satış ve destek ekibi aynı listeden çalışacak."
   ]
  },
  {
   "id": "bununla-birlikte",
   "sinif": "kalip",
   "guc": 1,
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))bununla\\s+birlikte(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))öte\\s+yandan(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))buna\\s+ek\\s+olarak(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))dahası(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))",
   "atla": [
    "akademik",
    "kamu"
   ],
   "baslik": "“Bununla birlikte”, “öte yandan”",
   "neden": "Yanlış değil, yazarlar da kullanır. Ama gündelik yazıda çoğu yerde “ama” ya da “bir de” demek yeter.",
   "ornek": [
    "Fiyatlar arttı. Bununla birlikte satışlar düşmedi.",
    "Fiyatlar arttı ama satışlar düşmedi."
   ]
  },
  {
   "id": "otesinde",
   "sinif": "kalip",
   "guc": 1,
   "re": "[\\p{L}\\p{N}_]+(?:nın|nin|nun|nün|ın|in|un|ün)\\s+(?:çok\\s+)?ötesin(?:de|e)(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))",
   "baslik": "“… ötesinde”",
   "neden": "İngilizce “beyond” sözünün çevirisi olarak çok kullanılıyor. Bir yazıda bir kez geçmesi sorun değil. Sık geçiyorsa neyin fazla olduğunu düz söyle.",
   "ornek": [
    "Kitap, bir yemek kitabının çok ötesinde.",
    "Kitapta tariflerin yanında köy hayatı da anlatılıyor."
   ]
  },
  {
   "id": "yolculuk",
   "sinif": "kalip",
   "guc": 1,
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))(?:bu|bir)\\s+yolculu[kğ][\\p{L}\\p{N}_]*|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))yolculuğ[\\p{L}\\p{N}_]+\\s+(?:çık|başla)",
   "baslik": "“Bu yolculukta”",
   "neden": "Gerçek bir yolculuksa sorun yok. Yapay zekâ ise öğrenmeyi, işi, hayatı hep “yolculuk” diye anlatıyor.",
   "ornek": [
    "Dil öğrenmek uzun bir yolculuktur.",
    "Dil öğrenmek yıllar alır."
   ]
  },
  {
   "id": "anlamina-gel",
   "sinif": "kalip",
   "guc": 1,
   "re": "(?:^|(?<=[.!?]\\s)|(?<=\\n))bu(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))[^.!?\\n]{0,90}anlamına\\s+gel(?!me)",
   "baslik": "“Bu da … anlamına gelir”",
   "neden": "Önceki cümlenin sonucunu “Bu da … anlamına gelir” diye ayrı bir cümleyle bildirmek İngilizce alışkanlığı. “Yani”, “bu yüzden” ya da tek cümle daha doğal.",
   "ornek": [
    "Süre kısa tutuldu. Bu da yükün artması anlamına geliyor.",
    "Süre kısa tutulduğu için yük artıyor."
   ]
  },
  {
   "id": "unutmamak-gerekir",
   "sinif": "kalip",
   "guc": 1,
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))unutmamak\\s+gerek|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))unutulmamalı|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))unutmamalı",
   "baslik": "“Unutmamak gerekir ki”",
   "neden": "Okura ders veren bir söz. Söyleyeceğin şey önemliyse doğrudan söyle.",
   "ornek": [
    "Unutmamak gerekir ki her çocuk farklıdır.",
    "Her çocuk farklıdır."
   ]
  },
  {
   "id": "belirtmek-gerekir",
   "sinif": "kalip",
   "guc": 1,
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))belirtmek\\s+gerek|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))vurgulamak\\s+(?:gerek|önemli)|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))şunu\\s+(?:belirtmek|söylemek|vurgulamak)|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))dikkat\\s+çekici\\s+(?:bir\\s+)?(?:şekilde|biçimde)|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))belirtmekte\\s+fayda",
   "baslik": "“Belirtmek gerekir ki”",
   "neden": "Bir şeyi söylemeden önce “şimdi söyleyeceğim” demek gibi. Gereksiz. Doğrudan söyle.",
   "ornek": [
    "Belirtmek gerekir ki proje gecikti.",
    "Proje gecikti."
   ]
  },
  {
   "id": "bu-yazida",
   "sinif": "kalip",
   "guc": 1,
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))bu\\s+(?:yazıda|makalede|rehberde|bölümde|yazımızda|içerikte)(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))[^.!?\\n]{0,90}(?:[ae]c[ae]ğ[ıi]z|[ae]c[ae]ğ[ıi]m)(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))",
   "baslik": "“Bu yazıda … ele alacağız”",
   "neden": "Yazının ne anlatacağını duyurmak yer kaplıyor. Uzun bir rehberin başında işe yarar, kısa yazıda doğrudan konuya gir.",
   "ornek": [
    "Bu yazıda verimli çalışmanın yollarını ele alacağız.",
    "Verimli çalışmanın ilk şartı telefonu başka odaya koymak."
   ]
  },
  {
   "id": "tarafindan-kof",
   "sinif": "cumle",
   "guc": 2,
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))tarafından\\s+(?:gerçekleştiril|sağlan|icra\\s+edil)|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))(?:ekibimiz|şirketimiz|kurumumuz|tarafımız)\\s+tarafından(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))",
   "atla": [
    "kamu"
   ],
   "baslik": "Gereksiz “tarafından”",
   "neden": "“Tarafından” her zaman yanlış değil. Ama kendi yaptığın işi “tarafımızdan gerçekleştirilmiştir” diye yazmak dolambaçlı. “Biz yaptık” demek daha açık.",
   "ornek": [
    "Analiz ekibimiz tarafından gerçekleştirilmiştir.",
    "Analizi biz yaptık."
   ]
  },
  {
   "id": "mektedir-ki",
   "sinif": "cumle",
   "guc": 1,
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))(?:göstermektedir|belirtmektedir|kanıtlamaktadır|ortaya\\s+koymaktadır|göstermiştir)\\s+ki(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))",
   "atla": [
    "akademik",
    "kamu",
    "aciklayici"
   ],
   "baslik": "“… göstermektedir ki …”",
   "neden": "İngilizce cümle düzeninden kalma. Türkçede asıl söylenecek şey cümlenin sonuna gelir.",
   "ornek": [
    "Araştırmalar göstermektedir ki uyku hafızayı güçlendirir.",
    "Araştırmalara göre uyku hafızayı güçlendiriyor."
   ]
  },
  {
   "id": "fazla-bir",
   "sinif": "cumle",
   "guc": 1,
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))(?:büyük|yüksek|kritik|ciddi|önemli|hayati|belirgin|hızlı)\\s+bir\\s+(?:artış\\s+göster|düşüş\\s+göster|gelişme\\s+göster)",
   "baslik": "Fazladan “bir”",
   "neden": "İngilizcede her şeyin önüne “a” konur. Bu alışkanlık Türkçeye “bir” olarak geçiyor. Buradaki “bir”i silince cümle bozulmuyor, kısalıyor.",
   "ornek": [
    "Satışlar ciddi bir artış gösterdi.",
    "Satışlar ciddi artış gösterdi."
   ]
  },
  {
   "id": "ne-ne-olumsuz",
   "sinif": "cumle",
   "guc": 1,
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))ne(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))[^.!?\\n]*?(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))ne\\s+de(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))[^.!?\\n]*?(?:[\\p{L}\\p{N}_]+(?:m[ae]d[ıiuü]|m[ıiuü]yor|m[ae]z|m[ae]y[ae]c[ae]k|m[ae]m[ıiuü]ş)|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))değil)[\\p{L}\\p{N}_]*(?=\\s*[.!?]|\\s*$)",
   "baslik": "“Ne … ne de” ile çift olumsuz",
   "neden": "“Ne … ne de” zaten “ikisi de değil” demek. Cümlenin sonunu da olumsuz yaparsan çift olumsuz oluyor. Konuşurken duyulur ama yazıda yanlıştır.",
   "ornek": [
    "Ne aradı ne de mesaj atmadı.",
    "Ne aradı ne de mesaj attı."
   ]
  },
  {
   "id": "liste-bicimi",
   "sinif": "cumle",
   "guc": 2,
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))[\\p{L}\\p{N}_]+m[ae]k,\\s+(?:[\\p{L}\\p{N}_]+\\s+){0,6}[\\p{L}\\p{N}_]+m[ae](?:s[ıi]|m[ıi]z|n[ıi]z)(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))",
   "baslik": "Listede biri farklı",
   "neden": "Bir listedeki şeyler aynı biçimde yazılmalı. “Yazmak, test etmek” diye giden listenin sonuna “ayıklanması” gelince liste aksıyor.",
   "ornek": [
    "Görevimiz kod yazmak, hataların ayıklanması ve test.",
    "Görevimiz kod yazmak, hataları ayıklamak ve test etmek."
   ]
  },
  {
   "id": "zorlama-terim",
   "sinif": "cumle",
   "guc": 1,
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))uç\\s+nokta(?:lar[\\p{L}\\p{N}_]*|ya|da|sı[\\p{L}\\p{N}_]*)?(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))olay\\s+güdümlü|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))ara\\s+katman|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))çekme\\s+isteği",
   "baslik": "Zorla Türkçeye çevrilmiş teknik kelime",
   "neden": "Bilgisayarcıların kullanmadığı bir çeviri. Okur ne demek istediğini anlamayabilir. Herkesin kullandığı kelimeyi yaz.",
   "ornek": [
    "Uç noktaya istek gönderin.",
    "Bu endpoint'e istek gönderin."
   ]
  },
  {
   "id": "kalin-etiket",
   "sinif": "bicim",
   "guc": 2,
   "re": "^[ \\t]*(?:[-*+•]|\\d+[.)])[ \\t]+\\*\\*[^*\\n]{1,60}(?:\\*\\*[ \\t]*[:\\-]|:\\*\\*)",
   "m": true,
   "asil": true,
   "baslik": "Kalın etiketli madde",
   "neden": "Her maddenin başına kalın bir başlık, ardından iki nokta: sohbet robotlarının yazı düzeni. Gerçekten liste değilse düz paragraf yaz.",
   "ornek": [
    "- **Hız:** Sayfalar daha çabuk açılıyor.",
    "Sayfalar daha çabuk açılıyor."
   ]
  },
  {
   "id": "baslikta-buyuk-baglac",
   "sinif": "bicim",
   "guc": 1,
   "re": "^#{1,6}[ \\t].*?\\s(?:Ve|İle|Veya|Ya|Yahut)\\s",
   "m": true,
   "asil": true,
   "baslik": "Başlıkta büyük harfle “Ve”",
   "neden": "Başlıkta her kelime büyük harfle başlasa bile “ve”, “ile”, “veya” küçük yazılır: Suç ve Ceza.",
   "ornek": [
    "## Yapay Zekâ Ve Gelecek",
    "## Yapay Zekâ ve Gelecek"
   ]
  },
  {
   "id": "uzun-cizgi",
   "sinif": "noktalama",
   "guc": 1,
   "re": "(?<=\\S)[ \\t]*—",
   "asil": true,
   "baslik": "Uzun çizgi (—)",
   "neden": "Bu çizgi İngilizcede cümle ortasında çok kullanılıyor. Türkçede yalnızca konuşma satırlarının başına konur. Yerine virgül ya da nokta koy.",
   "ornek": [
    "Sonuç — beklendiği gibi — olumlu.",
    "Sonuç, beklendiği gibi olumlu."
   ]
  },
  {
   "id": "orta-cizgi",
   "sinif": "noktalama",
   "guc": 1,
   "re": "[\\p{L}\\p{N}_]–[\\p{L}\\p{N}_]|[\\p{L}\\p{N}_]\\s–\\s[\\p{L}\\p{N}_]",
   "asil": true,
   "baslik": "Uzun aralık çizgisi (–)",
   "neden": "İki yıl ya da iki sayı arasına klavyedeki normal kısa çizgi (-) konur.",
   "ornek": [
    "2020–2024",
    "2020-2024"
   ],
   "duzelt": [
    "\\s?–\\s?",
    "-"
   ]
  },
  {
   "id": "ve-virgul",
   "sinif": "noktalama",
   "guc": 1,
   "re": ",\\s*(?:ve|veya|yahut)(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))(?:ve|veya|yahut),",
   "baslik": "“Ve” kelimesinin yanında virgül",
   "neden": "“Ve”, “veya” kelimelerinin önüne ya da arkasına virgül konmaz. İngilizcede konuyor, Türkçede konmuyor.",
   "ornek": [
    "Elma, armut, ve kiraz aldım.",
    "Elma, armut ve kiraz aldım."
   ],
   "duzelt": [
    "\\s*,\\s*",
    " "
   ]
  },
  {
   "id": "ya-da-virgul",
   "sinif": "noktalama",
   "guc": 1,
   "re": ",\\s*ya\\s+da(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))",
   "baslik": "“Ya da”dan önce virgül",
   "neden": "“Ya da”nın önüne virgül konmaz.",
   "ornek": [
    "Çay, ya da kahve içebilirsin.",
    "Çay ya da kahve içebilirsin."
   ],
   "duzelt": [
    ",\\s*",
    " "
   ]
  },
  {
   "id": "saat-iki-nokta",
   "sinif": "noktalama",
   "guc": 1,
   "re": "(?<![\\d:])(?:[01]?\\d|2[0-3]):[0-5]\\d(?![\\d:])",
   "baslik": "Saatte iki nokta (:)",
   "neden": "Türkçede saat ile dakika arasına nokta konur. 14.30 yazılır, 14:30 değil.",
   "ornek": [
    "Toplantı 14:30'da.",
    "Toplantı 14.30'da."
   ],
   "duzelt": [
    ":",
    "."
   ]
  },
  {
   "id": "yuzde-nokta",
   "sinif": "noktalama",
   "guc": 1,
   "re": "%\\d+\\.\\d+",
   "baslik": "Küsuratlı sayıda nokta",
   "neden": "Türkçede küsurat virgülle yazılır: 12,5. Nokta binleri ayırır, 1.250 “bin iki yüz elli” demek.",
   "ornek": [
    "Fiyatlar %12.5 arttı.",
    "Fiyatlar %12,5 arttı."
   ],
   "duzelt": [
    "\\.",
    ","
   ]
  },
  {
   "id": "yuzde-sonda",
   "sinif": "noktalama",
   "guc": 1,
   "re": "(?<![\\p{L}\\p{N}_.,%])\\d+(?:,\\d+)?\\s?%(?!\\d)",
   "baslik": "Yüzde işareti sayıdan sonra",
   "neden": "Türkçede yüzde işareti sayının önüne ve bitişik yazılır: %25. Sayıdan sonra yazmak İngilizce düzenidir.",
   "ornek": [
    "Satışlar 25% arttı.",
    "Satışlar %25 arttı."
   ]
  },
  {
   "id": "yazim",
   "sinif": "yazim",
   "guc": 1,
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))herhangibir[\\p{L}\\p{N}_]*|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))hiçbirşey[\\p{L}\\p{N}_]*|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))işbirliği[\\p{L}\\p{N}_]*|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))her\\s+hangi[\\p{L}\\p{N}_]*|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))hoşgeldin[\\p{L}\\p{N}_]*|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))ard\\s+arda[\\p{L}\\p{N}_]*|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))yanısıra[\\p{L}\\p{N}_]*|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))halbu\\s+ki[\\p{L}\\p{N}_]*|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))birarada[\\p{L}\\p{N}_]*|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))herzaman[\\p{L}\\p{N}_]*|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))hiçkimse[\\p{L}\\p{N}_]*|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))hiç\\s+bir[\\p{L}\\p{N}_]*|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))bir\\s+çok[\\p{L}\\p{N}_]*|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))bir\\s+kaç[\\p{L}\\p{N}_]*|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))artarda[\\p{L}\\p{N}_]*|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))önyargı[\\p{L}\\p{N}_]*|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))oysa\\s+ki[\\p{L}\\p{N}_]*|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))orjinal[\\p{L}\\p{N}_]*|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))döküman[\\p{L}\\p{N}_]*|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))tabi\\s+ki[\\p{L}\\p{N}_]*|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))birşey[\\p{L}\\p{N}_]*|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))herşey[\\p{L}\\p{N}_]*|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))pekçok[\\p{L}\\p{N}_]*|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))farket[\\p{L}\\p{N}_]*|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))farked[\\p{L}\\p{N}_]*|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))terket[\\p{L}\\p{N}_]*|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))terked[\\p{L}\\p{N}_]*|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))yanlız(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))yalnış[\\p{L}\\p{N}_]*|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))herkez[\\p{L}\\p{N}_]*|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))süpriz[\\p{L}\\p{N}_]*|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))klavuz[\\p{L}\\p{N}_]*|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))tabiki[\\p{L}\\p{N}_]*|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))önsöz[\\p{L}\\p{N}_]*|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))yada(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))şuan(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))",
   "baslik": "Yazım hatası",
   "neden": "Bu kelime Türkçede farklı yazılıyor. Doğrusu okun yanında.",
   "ornek": [
    "Herşey yolunda.",
    "Her şey yolunda."
   ]
  },
  {
   "id": "yabanci-ek",
   "sinif": "yazim",
   "guc": 1,
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))(?:cache'[ıa]|cache'd[ae]n?|SQL'ı|SQL'd?a|SQL'dan|JSON'i|JSON'de|React'ı|React'[dt]a|Node\\.js'ı|Node\\.js'[dt]a|GitHub'de|GitHub'i|Google'de|Google'i|Docker'de|Docker'i|URL'ı|URL'da)(?![\\p{L}\\p{N}_])",
   "asil": true,
   "baslik": "Yabancı kelimeye yanlış ek",
   "neden": "Yabancı bir kelimeye ek getirirken nasıl yazıldığına değil, nasıl okunduğuna bakılır. GitHub “githab” diye okunur, bu yüzden “GitHub'da” olur.",
   "ornek": [
    "Kodu GitHub'de paylaştık.",
    "Kodu GitHub'da paylaştık."
   ]
  },
  {
   "id": "saat-eki",
   "sinif": "yazim",
   "guc": 1,
   "baslik": "Saatten sonraki ek",
   "neden": "Saati sesli oku, eki ona göre getir. 13.00 “on üç” diye okunur. “On üçte” dersin, yani 13.00'te yazılır.",
   "ornek": [
    "Toplantı 13.00'da.",
    "Toplantı 13.00'te."
   ]
  },
  {
   "id": "sohbet-artigi",
   "sinif": "artik",
   "guc": 3,
   "re": "^(?:elbette|tabii\\s+ki|harika\\s+bir\\s+(?:soru|konu|fikir)|memnuniyetle)!|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))umarım\\s+[^.!?\\n]{0,60}(?:yardımcı\\s+ol|faydalı\\s+ol|işinize\\s+yara)|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))başka\\s+bir\\s+(?:sorunuz|isteğiniz|değişiklik)[^.!?\\n]{0,40}(?:isterseniz|olursa|varsa)|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))dil\\s+modeli\\s+olarak|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))bir\\s+yapay\\s+zek[aâ]\\s+olarak",
   "m": true,
   "baslik": "Sohbetten kalan cümle",
   "neden": "Bu cümle yazının değil, yapay zekâyla yapılan konuşmanın parçası. Kopyalarken yanında gelmiş. Sil.",
   "ornek": [
    "Umarım bu metin işinize yarar!",
    "Metin burada bitiyor."
   ]
  }
 ],
 "yazim": {
  "birşey": "bir şey",
  "herşey": "her şey",
  "hiçbirşey": "hiçbir şey",
  "hiç bir": "hiçbir",
  "yada": "ya da",
  "bir çok": "birçok",
  "bir kaç": "birkaç",
  "pekçok": "pek çok",
  "ard arda": "art arda",
  "artarda": "art arda",
  "yanısıra": "yanı sıra",
  "önsöz": "ön söz",
  "önyargı": "ön yargı",
  "işbirliği": "iş birliği",
  "farket": "fark et",
  "farked": "fark ed",
  "terket": "terk et",
  "terked": "terk ed",
  "halbu ki": "hâlbuki",
  "oysa ki": "oysaki",
  "herhangibir": "herhangi bir",
  "her hangi": "herhangi",
  "yanlız": "yalnız",
  "yalnış": "yanlış",
  "herkez": "herkes",
  "şuan": "şu an",
  "orjinal": "orijinal",
  "süpriz": "sürpriz",
  "klavuz": "kılavuz",
  "döküman": "doküman",
  "tabiki": "tabii ki",
  "tabi ki": "tabii ki",
  "hoşgeldin": "hoş geldin",
  "birarada": "bir arada",
  "herzaman": "her zaman",
  "hiçkimse": "hiç kimse"
 },
 "gecisRe": "^[\"“«(]?(?:bununla\\s+birlikte|dördüncü\\s+olarak|bunun\\s+yanı\\s+sıra|benzer\\s+şekilde|diğer\\s+taraftan|ikinci\\s+olarak|üçüncü\\s+olarak|bu\\s+doğrultuda|bunun\\s+yanında|buna\\s+karşılık|sonuç\\s+olarak|bu\\s+çerçevede|bunun\\s+yerine|aynı\\s+şekilde|diğer\\s+yandan|bütün\\s+bunlar|bu\\s+bağlamda|önemli\\s+olan|buna\\s+karşın|buna\\s+rağmen|nihayetinde|son\\s+olarak|ilk\\s+olarak|bu\\s+noktada|bu\\s+bölümde|bu\\s+nedenle|bu\\s+sebeple|öte\\s+yandan|tüm\\s+bunlar|birincisi|öncelikle|bu\\s+sayede|bu\\s+yazıda|bir\\s+diğer|şimdi\\s+ise|bugün\\s+ise|ikincisi|üçüncüsü|bu\\s+durum|kısacası|böylece|yine\\s+de|ayrıca|özetle|dahası|ancak|oysa)(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))",
 "kisaltma": [
  "alb",
  "apt",
  "arş",
  "av",
  "bkz",
  "cad",
  "doç",
  "dr",
  "ed",
  "gen",
  "gör",
  "haz",
  "hz",
  "krş",
  "mah",
  "mr",
  "mrs",
  "müh",
  "no",
  "prof",
  "sf",
  "sn",
  "sok",
  "st",
  "tel",
  "uzm",
  "yrd",
  "yy",
  "çev",
  "ör",
  "örn",
  "öğr"
 ],
 "kisaltmaSonda": [
  "vb",
  "vd",
  "vs"
 ],
 "skor": {
  "tur_ailesi": {
   "anlati": "serbest",
   "deneme": "serbest",
   "aciklayici": "bilgi",
   "teknik": "bilgi",
   "kurumsal": "bilgi",
   "akademik": "resmi",
   "kamu": "resmi",
   "null": "serbest"
  },
  "aileler": {
   "serbest": {
    "sabit": -2.507,
    "katsayi": {
     "ritim": -1.2752,
     "duz_pencere": 0.1904,
     "kisa": -0.7697,
     "uzun": -2.3765,
     "gecis": 0.0338,
     "soru": -1.1202,
     "degil_virgul": 0.4196,
     "guclu_kalip": 0.0367,
     "orta_kalip": 0.2806
    },
    "olcek": {
     "ritim": [
      0.4861,
      0.1005
     ],
     "duz_pencere": [
      0.2962,
      0.1805
     ],
     "kisa": [
      0.3467,
      0.205
     ],
     "uzun": [
      0.0786,
      0.1247
     ],
     "gecis": [
      0.0154,
      0.0278
     ],
     "soru": [
      7.7938,
      8.397
     ],
     "degil_virgul": [
      0.8547,
      1.655
     ],
     "guclu_kalip": [
      0.0063,
      0.0418
     ],
     "orta_kalip": [
      0.0129,
      0.0625
     ]
    }
   },
   "bilgi": {
    "sabit": -1.0722,
    "katsayi": {
     "ritim": -0.4646,
     "duz_pencere": 0.8872,
     "uzun": -0.629,
     "gecis": 0.8568,
     "soru": -0.3938,
     "uclu": 0.1081,
     "degil_virgul": 0.5076,
     "guclu_kalip": 0.7338,
     "orta_kalip": 0.1076
    },
    "olcek": {
     "ritim": [
      0.4199,
      0.12
     ],
     "duz_pencere": [
      0.4604,
      0.2699
     ],
     "uzun": [
      0.0935,
      0.0871
     ],
     "gecis": [
      0.0697,
      0.0617
     ],
     "soru": [
      2.2559,
      4.3172
     ],
     "uclu": [
      6.4075,
      5.1139
     ],
     "degil_virgul": [
      0.9639,
      1.7668
     ],
     "guclu_kalip": [
      0.0163,
      0.0729
     ],
     "orta_kalip": [
      0.0775,
      0.1922
     ]
    }
   },
   "resmi": {
    "sabit": -3.9261,
    "katsayi": {
     "ritim": -1.167,
     "duz_pencere": 1.8545,
     "uzun": -0.5455,
     "gecis": 1.0269,
     "soru": -0.5565,
     "uclu": 0.7466,
     "degil_virgul": 0.4469,
     "guclu_kalip": 0.2127,
     "zayif_kalip": 0.1476
    },
    "olcek": {
     "ritim": [
      0.4598,
      0.1456
     ],
     "duz_pencere": [
      0.3813,
      0.2753
     ],
     "uzun": [
      0.291,
      0.192
     ],
     "gecis": [
      0.0779,
      0.0803
     ],
     "soru": [
      0.4911,
      1.6844
     ],
     "uclu": [
      9.1483,
      6.4215
     ],
     "degil_virgul": [
      0.4092,
      1.1749
     ],
     "guclu_kalip": [
      0.0121,
      0.0636
     ],
     "zayif_kalip": [
      0.0341,
      0.0906
     ]
    }
   }
  }
 }
};
