# Yazım ve noktalama

Dil modeli İngilizce noktalama alışkanlıklarını Türkçeye taşır, yabancı terime yanlış ek getirir, bitişik ve ayrı yazılan sözleri karıştırır. Bu dosya o hataların listesidir. Yazım denetlerken ya da bir işaretin doğru olup olmadığından emin olmadığında buraya bak.

İki tür madde var. **Kılavuz** diye işaretlenenler TDK Yazım Kılavuzu'nda açıkça yazar, her metin türünde geçerlidir ve "yazım hatası" diye bildirilebilir. **Tercih** diye işaretlenenlerin kılavuzda kuralı yoktur, çeviri kokusunu azaltan alışkanlıklardır, hata diye bildirilmez. Kaynak: [yazim.tdk.gov.tr](https://yazim.tdk.gov.tr/content/09-noktalama-isaretleri.html).

## Noktalama

**Uzun çizgi (kılavuz).** Uzun çizgi (—) yalnızca satır başında konuşmayı gösterir. İngilizcedeki gibi cümle ortasında ara söz ayırmaz. Ara söz için virgül ya da iki yanına bitişik kısa çizgi kullanılır: *Küçük bir sürü -dört inekle birkaç koyun- yolun ağzında durmuştu.* Çoğu zaman en doğal çözüm cümleyi ikiye bölmektir.

**Aralıkta kısa çizgi (kılavuz).** Sayı ve tarih aralığında orta çizgi (–) değil kısa çizgi kullanılır: `09.30-10.30`, `2024-2026`.

**`ve`, `veya`, `ya da` yanında virgül (kılavuz).** Bu bağlaçlardan önce de sonra da virgül konmaz: *Elma, armut ve muz aldık.* Tekrarlı bağlaçların arasına da konmaz: *Hem gider hem ağlar.*

**`ama` öncesinde virgül (tercih).** Kılavuzda `ama, fakat, ancak` için virgül kuralı yoktur. Ölçtüğümüz yazarlar `ama`ların dörtte birinin önüne virgül koyuyor. Kaynakta varsa silme, yoksa ekleme.

**Noktalı virgül (tercih ve kılavuz).** İç virgülü olmayan iki bağımsız cümleyi noktalı virgülle yapıştırmak İngilizce alışkanlığıdır, noktayla ayır: *Model veriyi analiz eder; bu süreç iki saniye sürer* değil, *Model veriyi analiz eder. Bu süreç iki saniye sürer.* Kılavuzdaki kullanımları ise doğrudur ve korunur: virgülle ayrılmış takımları ayırmak (*Erkek çocuklara Doğan, Tuğrul, Orhan; kız çocuklara İnci, Çiçek, Yonca adları verilir*) ve içinde virgül bulunan sıralı cümleleri ayırmak. Blogda, denemede ve öyküde bu yapıştırmayı gördüğün yerde düzelt: yazarların deneme parçalarının çoğunda hiç noktalı virgül yok, modellerinkinde bin kelimede beş. Açıklayıcı, akademik ve kurum metninde yazarlar da kullanır, orada yalnızca yapıştırma olanı ayır, kılavuzdaki kullanımına dokunma.

**Ulaçtan sonra virgül (kılavuz).** `-Ip, -ArAk, -IncA, -mAdAn, -DIkçA` eklerinden sonra virgül konmaz: *Veriyi çekip, işledik* değil, *Veriyi çekip işledik.* Art arda sıralanan ulaçlar virgülle ayrılır.

**Başlıkta büyük harf (kılavuz ve tercih).** Kitap, makale ve bildiride ana başlık tümüyle büyük, alt başlıklar her kelimenin ilk harfi büyük yazılır. Bu düzende `ve, ile, ya, veya, yahut, ki, da, de` ve soru eki küçük kalır: *Suç ve Ceza*. Hata, bunları büyük yazmaktır: *Yapay Zekâ Ve Gelecek*. Blog, teknik belge ve şirket yazısında başlığı düz cümle gibi, yalnızca ilk harfi büyük yazmak daha doğal durur (tercih).

## Saat, sayı, yüzde (kılavuz)

- Saat ile dakika arasına nokta konur: `14.30`. İki nokta (`14:30`) İngilizce yazımdır.
- Saate gelen ek okunuşun son sesine uyar. Dakika sıfırsa saat, değilse dakika okunur: `13.00'te` (on üçte), `11.00'de` (on birde), `17.30'da` (otuzda), `09.15'te` (on beşte), `10.00'da` (onda).
- Kesir virgülle ayrılır: `3,14`, `%42,5`. Nokta binleri ayırır: `10.000`, `1.250.000`.
- Yüzde işareti sayıdan önce ve bitişik yazılır: `%25`.

## Yabancı terimler

**Zorla çevirme (tercih).** Yazılımcıların Türkçe konuşurken de İngilizcesini kullandığı terimleri çevirme: `endpoint, deploy, middleware, webhook, payload, commit, merge, token, prompt, pipeline`. *Uç nokta, ara katman, olay güdümlü, çekme isteği* gibi karşılıkları meslekten kimse kullanmaz. Yerleşik Türkçesi olanları Türkçe yaz: geliştirici, kullanıcı, veri tabanı, doğrulama, canlı ortam, klasör. İkisi de yaşayanlarda (*cache / önbellek, server / sunucu, request / istek*) başta birini seç ve metin boyunca onu kullan.

**Ek okunuşa uyar.** Kısaltmalara ve özel adlara gelen ek kesmeyle ayrılır ve okunuşa göre gelir (kılavuz): *TDK'nin, ABD'de, TV'ye.* Kurum adlarına gelen ek kesmeyle ayrılmaz: *Türk Dil Kurumundan.* `cache`, `endpoint` gibi yabancı cins adlara kesmeyle ek getirmek kılavuzda düzenlenmemiştir ama teknik Türkçede yerleşik gelenektir (tercih). Orada da ek yazılışa değil, kelimenin Türkçe ağızdaki son sesine uyar.

| Terim | Okunuş | Yanlış | Doğru |
| :--- | :--- | :--- | :--- |
| `cache` | keş | cache'ı, cache'de, cache'dan | cache'i, cache'te, cache'ten |
| `SQL` | es-kü-el | SQL'ı, SQL'da | SQL'i, SQL'de |
| `JSON` | ceyson | JSON'i, JSON'de | JSON'ı, JSON'da |
| `URL` | u-re-le | URL'ı, URL'da | URL'yi, URL'de |
| `CPU` | si-pi-yu | CPU'ı | CPU'yu, CPU'da |
| `GitHub` | githab | GitHub'de, GitHub'i | GitHub'da, GitHub'ı |
| `Google` | gugıl | Google'de, Google'i | Google'da, Google'ı |
| `Docker` | dakır | Docker'de, Docker'i | Docker'da, Docker'ı |
| `React` | riekt | React'ı, React'da | React'i, React'te |
| `Node.js` | nod-cey-es | Node.js'ı, Node.js'da | Node.js'i, Node.js'te |

Okunuşu kişiden kişiye değişen terimlerde (`API`: api ya da ey-pi-ay, `queue`: kyu ya da kuyruk diye okunur) iki okunuştan birine uyan eki hata sayma. Yalnızca aynı metinde iki okunuşun karışmasını düzelt: `API'yi` ile `API'dan` yan yana durmaz.

## Bitişik ve ayrı yazılanlar (kılavuz)

| Doğru | Yanlış | Not |
| :--- | :--- | :--- |
| birçok, birkaç, biraz | bir çok, bir kaç | |
| pek çok, pek az | pekçok | `pek` hep ayrı |
| hiçbir, herhangi bir | hiç bir, herhangibir | |
| bir şey, her şey, hiçbir şey | birşey, herşey | `şey` hep ayrı |
| art arda, yan yana, iç içe | ard arda, artarda, yanyana | ikilemeler ayrı |
| yanı sıra, ardı sıra | yanısıra | |
| ön söz, ön yargı | önsöz, önyargı | ama `öngörü`, `önsezi` bitişik |
| iş birliği, güç birliği | işbirliği | |
| veri tabanı, iş akışı | | teknik metinde `veritabanı` da yaygın, birini seç |
| fark etmek, terk etmek | farketmek, terketmek | ses değişmiyorsa ayrı |
| kaydetmek, reddetmek, keşfetmek | kayıt etmek, red etmek | ses düşüyor ya da türüyorsa bitişik |
| ya da | yada | |
| şu an, her zaman, bir arada | şuan, herzaman, birarada | |
| tabii ki | tabiki, tabi ki | |
| yalnız, yanlış, herkes | yanlız, yalnış, herkez | |
| orijinal, sürpriz, kılavuz, doküman | orjinal, süpriz, klavuz, döküman | |

Bağlaç olan `ki` ayrı yazılır: *demek ki, kaldı ki, öyle ki.* Yedi sözde kalıplaşıp bitişmiştir: *belki, çünkü, hâlbuki, mademki, meğerki, oysaki, sanki.*

Bağlaç olan `da / de` ayrı yazılır ve hiçbir zaman `ta / te` olmaz: *Ben de geldim. Kitap da aldım.* Ek olan `-da / -de` bitişiktir: *evde, kitapta.* Ayırmak için sözü cümleden çıkar: anlam bozulmuyorsa bağlaçtır, ayrı yazılır.
