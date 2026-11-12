---
name: yapay-degil
description: Türkçe metni insan eliyle yazılmış gibi doğal yazar veya onarır. Kullanıcı Türkçe bir metin için "insanileştir", "humanize et", "AI hissiyatını sil" veya "doğal Türkçeye çevir" dediğinde, metinde çeviri kokusu ya da TDK hatası denetimi istediğinde, Türkçe blog, makale, kurumsal yazı, sosyal medya içeriği veya teknik doküman yazarken kullan.
license: MIT
metadata:
  author: neverland-lab, yucezerey
  version: "2.0.0"
---

# yapay-degil

Dil modelinin yazdığı Türkçe çoğu zaman yanlış değildir, ama okur birkaç cümlede bunu bir insanın yazmadığını anlar. Kelimeler Türkçedir, cümlenin iskeleti İngilizcedir. Cümleler hep aynı boydadır. Paragraf bir duyuruyla açılır, bir özetle kapanır. Araya da hiçbir şey söylemeyen sözler girer: "önemli bir rol oynar", "sadece bir araç değil, aynı zamanda bir fırsat".

Bu skill o izleri tanımanı ve Türkçeyi bir yazarın kuracağı gibi kurmanı sağlar. Buradaki ölçülerin hepsi sayılarak bulundu: Türkçe yazılmış 145 kitap, makale ve belgeyle dil modellerinin aynı türlerde yazdığı metinler yan yana ölçüldü. Sayılar `references/olculer.md` dosyasında.

Üç iş yaparsın. Onarımda verilen metni, söylediği hiçbir şeyi değiştirmeden doğal Türkçeye çevirirsin. Yazımda bir konudan ya da taslaktan yeni metin yazarsın. Denetimde metne dokunmazsın: yapay duran yerleri ve yazım hatalarını alıntılayarak gösterir, her birinin nedenini söylersin. Kullanıcı hangisini istediğini çoğu zaman açıkça söyler. Söylemediyse ve elinde bir metin varsa onarım istiyordur.

## Bilgiye dokunma

Onarımda değişen yalnızca söyleyiştir. Kaynakta olmayan sayı, tarih, ad, örnek, anı ya da neden-sonuç bağı ekleme. "İnsan gibi" görünsün diye uydurulan her ayrıntı bir yalandır ve kullanıcı o metnin altına kendi adını yazacak.

Kesinlik de bilgidir. "Birçok" yerine "yüzlerce", "artırabilir" yerine "artırır", "gibi belirtiler" yerine kapalı bir liste yazarsan kaynağın söylemediği bir şeyi söylemiş olursun. `gibi`, `bazı`, `çoğu`, `yaklaşık`, `yeniden`, `hâlâ` ve `-ebil-` gibi küçük sözler anlam taşır, onları koru.

Bir klişeyi silince yerinde boşluk kalıyorsa ve dolduracak bilgi kaynakta yoksa iki yolun var: cümleyi olduğu kadarıyla sade söyle ya da köşeli ayraçla yer tut (`[kaç belge?]`) ve kullanıcıya sor. Üçüncü yol, yani boşluğu kendin doldurmak, yok.

Kaynakta bozuk ya da iki türlü anlaşılan bir cümle varsa en yakın okumayı yaz ve bunu metnin altında kullanıcıya söyle. Sessizce düzeltme, sessizce de bırakma.

Cümlelerin sınırını değiştirmek bilgiye dokunmak değildir. Bir cümleyi ikiye bölebilir, ikisini birleştirebilir, sırasını değiştirebilirsin. Yeter ki bir şey eklenmesin, bir şey de kaybolmasın.

## Önce metnin türüne bak

Aynı düzeltme bir türde metni iyileştirir, ötekinde bozar. Başlamadan önce metnin hangi türe girdiğine karar ver. Kullanıcı kendi yazısından örnek verdiyse o örnek aşağıdaki her şeyin üstündedir.

| Tür | Dokun | Dokunma |
| :--- | :--- | :--- |
| Blog, deneme, köşe yazısı | Her şeye: kuruluş, cümle, ritim, kalıplar. `-mektedir` gider. | Yazarın kendi sesi, yerindeki `işte`, `zaten`, `hani` |
| Öykü, roman | Ritim, kalıplar, ders veren kapanış | Olay, imge, olayın parçası olan son cümle |
| Şirket yazısı, tanıtım | Vaat sözleri, dolambaçlı edilgen, kalıplar | Ürün ve marka adları, "siz" hitabı |
| Ders kitabı, popüler bilim | Kalıplar, sıralama dizilişi | Tanımdaki `-dir`, noktalı virgül, düzenli cümle boyu |
| Teknik belge | `-mektedir`, zorlama çeviri terim, kalıplar | Kod, komut, yerleşik İngilizce terim, tanımdaki `-dir` |
| Akademik, hukuki | Kalıplar, sıralama dizilişi, yazım | Belge düzeni, atıf, `-mektedir`, cümle sınırları, `söz konusu` |
| Kamu ve kurum içi yazışma | Yalnızca gerçek kusur: koşutluk, yazım, slogan başlık, dolgu | Adlaştırma, edilgen, kip, cümle sınırları, `-mıştır` serileri, kurum terimleri |

Son iki satır en sık yapılan hatanın yeridir. Resmî dilin ağırlığı yapay zekâ izi değildir, o dil yapay zekâdan önce de öyleydi. Kurum içi bir notu blog diline çekersen metni bozmuş olursun. Türlerin ayrıntısı ve baştan sona örnekler `references/metin-turleri.md` dosyasında.

## Yapay duran ne?

Önem sırasıyla beş şey. Sıra önemli: Kelime değiştirmek en kolayıdır ve en az işe yarayanıdır. Kuruluşu düzeltmeden kalıpları ayıklarsan metin yine yapay okunur.

### 1. Ritim

Ölçtüğümüz her türde modelleri yazarlardan ayıran ilk şey bu çıktı. Yazar kısa cümleyle uzun cümleyi yan yana kullanır: altı kelime, sonra yirmi iki, sonra on bir, sonra dört. Model her cümleyi aynı kalıba döker. Kimi model hepsini on beş yirmi kelimeye, kimi hepsini yedi sekiz kelimeye dizer. İkisi de düzdür. Model iki uçtan da kaçar: denemede uzun cümle kurmaz (yazarların yüz cümlesinden on biri yirmi sekiz kelimeyi geçer, modelin üçü), akademik metinde kısa cümle kurmaz.

Yazarken bunu baştan gözet: cümlelerin boyu içeriğe göre değişsin, kısa söylenecek şeyi kısa, uzun anlatılacak şeyi uzun yaz.

Onarırken iş değişir, çünkü ritim en kolay bozulan şeydir. İki kez denedik. Onarıcı uzun cümleleri bölünce metin kaynaktan daha düz çıktı, çünkü her şey orta boya indi. Cümle boyu değişsin diye cümleleri zorla bölüp birleştirince de sayılar düzeldi ama okur metni daha kötü buldu: virgülle ve noktalı virgülle yapıştırılmış cümleler, yarıda kesilmiş yargılar, birbirini tutmayan kipler. İkisinden çıkan kural şu: Ritmi cümle sınırlarıyla oynayarak değil, kuruluşu düzelterek düzelt. Sahne kuran girişi, özet kapanışı, sıralama sözlerini, içi boş kalıpları atınca ve cümleyi Türkçenin düzeniyle kurunca cümle boyları çoğu zaman kendiliğinden değişir.

Bunların üstüne cümle sınırına ancak şu durumlarda dokun:

- Uzun cümleyi bölme. Kaynaktaki yirmi beş otuz kelimelik cümle derdini tek solukta anlatıyorsa kalsın. Yalnızca okurun yüklemi bulamadığı, iç içe üç yan cümleli cümleyi böl.
- Blogda, denemede, öyküde ve şirket yazısında art arda dört beş cümle aynı boydaysa bir yerinden kır. Aynı şeyi anlatan iki cümleyi ulaçla ya da bağlaçla birleştir ("Veriyi çektik. Sonra temizledik." yerine "Veriyi çekip temizledik."). Ya da virgülle dizilmiş yargılardan birini ayır ("Kapı açıldı, içeri girdi, kimse yoktu" yerine "Kapı açıldı. İçeri girdi, kimse yoktu."). Bir paragrafta bir iki dokunuş yeter.
- Ders kitabında, teknik belgede, akademik ve kurum yazısında ritim için cümle bölme ve birleştirme. Bu türlerde okur düzenli cümle bekler. Oradaki tekdüzeliği geçiş sözlerini ve kalıpları ayıklamak giderir.

Her dokunuşu şöyle sına: Cümleyi sesli okuyan biri burada kendiliğinden durur muydu? Durmazdıysa geri al. İki bağımsız cümleyi virgülle ya da noktalı virgülle yapıştırma, bir cümleyi öznesiz ya da yüklemsiz bir parçaya ("Bu, ... içindir.") bölme. Kaynakta olmayan cümle ekleme: ritim için uydurulan "Mesele tam da bu." türü özdeyişler yeni bir yapaylıktır.

### Tutarlılık

Onarırken metnin kendi içinde tutarlı kalmasına bak, okurun ilk fark ettiği şey budur.

- Kip. Metin hangi kiple gidiyorsa onunla gitsin. Kurum yazısı `-mektedir` ve `-mıştır` ile yazılmışsa birkaç cümleyi geniş zamana çevirme. Denemede şimdiki zamanla başladıysan ortasında geniş zamana geçme. Kipi ancak bütün metinde, türün gerektirdiği yönde değiştir (blogdaki `-mektedir`in hepsi gider).
- Ek. Ad cümlelerinde `-dir`i düşürüyorsan aynı türden cümlelerin hepsinde düşür. Yarısı "önemlidir", yarısı "önemli" olan paragraf savruk durur.
- Hitap ve terim. "Sen" dediysen "siz"e geçme, `cache` dediysen sonra "önbellek" yazma.

### 2. Kuruluş

Model yazıyı bir sunum gibi kurar. Şunlar onun izidir:

- Konuya girmeden konuyu duyuran giriş: "Bu yazıda ... ele alacağız", "Günümüzün hızla değişen dünyasında".
- Söyleneni tekrar eden ya da okura ders veren kapanış: "Sonuç olarak ...", "Unutmamak gerekir ki ...", "İşte asıl fark burada."
- Sayarak ilerleyen paragraflar: "Birincisi ... İkincisi ... Son olarak ...". Cümleyi "Ayrıca", "Bununla birlikte", "Bu nedenle", "Öte yandan" ile açma alışkanlığı. Yazarlar cümleyi çoğunlukla "Ama", "Çünkü", "Ve", "Sonra" ile ya da hiçbir bağlaç olmadan açar.
- Her paragrafın aynı iskelette olması: iddia, açıklama, özet cümlesi.
- Düz yazı yerine kalın etiketli maddeler (`**Hız:** ...`) ve her şeyin başlıklara bölünmesi.
- İki bağımsız cümlenin noktalı virgülle yapıştırılması. Denemede ve öyküde yazarların çoğu sayfasında hiç noktalı virgül yoktur, modelin her paragrafında bir tane vardır. Noktayla ayır.

Onarırken girişi sil ve konunun kendisiyle başla. Kapanış yeni bir şey söylemiyorsa sil. Geçiş sözünü at, cümleler arasındaki bağı içerikle kur. Maddeleri, gerçekten liste değillerse, paragrafa çevir.

### 3. Karşıtlık ve üçleme

İki kalıp modelin elinden düşmez.

Biri kimsenin savunmadığı bir şeyi reddedip asıl iddiayı öyle söylemektir: "Bu sadece bir araç değil, aynı zamanda bir felsefe", "Mesele hız değil, güven". Olumsuz yarıyı at, iddiayı düz söyle. Ama olumsuz yarı gerçekten yaygın bir kanıyı ya da okurun beklentisini düzeltiyorsa bir iş görüyordur, kalır: "Yalnızlık şehrin kusuru değil, bizim alışkanlığımız." Bu kalıbı silerken yerine kılık değiştirmiş bir başkasını kurma ("X ile değil, Y ile").

Öteki her şeyi üçe tamamlamaktır: "hızlı, güvenilir ve ölçeklenebilir". Gerçekten kaç şey varsa o kadarını say. Kaynakta üç özellik yazıyorsa üçü de kalır, bilgi silinmez. Giden, üçüncüsü yalnızca kulağa iyi geldiği için eklenmiş olandır, onu da ancak yazarken kendin eklediysen atarsın.

### 4. Cümlenin iskeleti

İngilizce cümle yüklemi başa alır, ayrıntıyı arkaya dizer. Türkçe tersini yapar. Model iskeleti çevirmeden kelimeleri çevirir. En sık görülenler:

- Niteleyen arkada kalır: "Bir sistem kurduk, bu sistem verileri tarıyor" yerine "Verileri tarayan bir sistem kurduk".
- Eylemler `ve` ile dizilir: "Veriyi çektik ve işledik" yerine "Veriyi çekip işledik".
- Vurgu dolguyla verilir: "Bunu mümkün kılan şey ekibin deneyimiydi" yerine "Bunu ekibin deneyimi mümkün kıldı".
- Gereksiz zamir, gereksiz `bir`, içi boş fiil: "Biz büyük bir artış gerçekleştirdik" yerine "Çok büyüdük".
- İki yükleme tek nesne bağlanır ve ek uymaz: "Geri bildirimleri inceliyor ve yer veriyoruz" yerine "Geri bildirimleri inceliyor, bunlara yer veriyoruz".

Her birinin kuralı, sınırı ve örnekleri `references/cumle-kurulusu.md` dosyasında. Cümle onarırken o dosyayı oku.

### 5. Sözler

Modelin sevdiği sözlerin listesi `references/kaliplar.md` dosyasında, her birinin yazarlarda ve modellerde ne sıklıkla geçtiğiyle birlikte. Liste üçe ayrılır: yazarlarda neredeyse hiç geçmeyenler (gördüğün yerde değiştir), modellerde belirgin sık olanlar (çoğu zaman değiştir) ve tek tek olağan olup ancak yığılınca iz bırakanlar (yoğunsa seyrelt).

Listede olmayan söz yasak değildir, listede olan da her yerde yanlış değildir. `Âdeta`, `söz konusu`, `kuşkusuz`, `bir şekilde` gibi sözleri uzun süre yapay zekâ izi saydık. Saydığımızda yazarların bunları modellerden sık kullandığı çıktı. Bir sözü silmeden önce sor: Bu cümle bir şey söylüyor mu, yoksa yalnızca önemli olduğunu mu söylüyor? "Kritik bir rol oynar" neyin değiştiğini söylemez. Onu at, neyin değiştiğini yaz. Kaynak da söylemiyorsa cümleyi sade bırak.

Yazım ve noktalama en sonda gelir: uzun çizgi, `ve`den önce virgül, saat ve yüzde yazımı, yabancı terime gelen ek, bitişik ve ayrı yazılan sözler. Liste `references/yazim-ve-noktalama.md` dosyasında. Oradaki "kılavuz" maddeleri her türde geçerlidir, "tercih" maddeleri türe göre esner.

## Nasıl çalışırsın

1. Metnin tamamını oku ve türüne karar ver. Kullanıcının verdiği örnek yazı varsa cümle boyunu, hitabını, bağlaçlarını ondan al.
2. Paragraf paragraf ilerle. Önce kuruluş, sonra cümle iskeleti, sonra sözler, en son yazım. Kusuru olmayan cümleye dokunma: onarım her cümleyi yeniden yazmak değildir, yapay duranı düzeltmektir. İyi bir editör metnin dörtte üçünü olduğu gibi bırakır.
3. Denetle. Kod çalıştırabiliyorsan taslağı bir dosyaya yazıp denetçiyi çalıştır:

   ```bash
   python3 scripts/denetle.py taslak.md --tur deneme --kaynak kaynak.md
   ```

   Türler: `deneme`, `anlati`, `kurumsal`, `aciklayici`, `teknik`, `akademik`, `kamu`. Betik skill klasöründedir, çıktısı UTF-8'dir. Raporu şöyle kullan:

   - "Kaynağa sadakat" en önemli bölümdür. Kaybolan ya da eklenen her sayıya, ada ve ihtiyat sözüne tek tek bak. Bilerek yaptıysan kalır, gözünden kaçtıysa geri koy.
   - "Düzelt" başlığındaki bulguları düzelt. "Bir bak" başlığındakiler yazarlarda da geçen sözlerdir: yerindeyse bırak, aynı söz üç dört kez geçiyorsa seyrelt.
   - "Kaynağa göre" satırı onarımın metni kaynaktan daha tekdüze yapıp yapmadığını söyler. Yaptıysa büyük olasılıkla uzun cümleleri böldün: geri birleştir.
   - Ritim ve "Düz yer" satırları bilgidir, emir değildir. Blogda, denemede ve öyküde düz yer gösteriliyorsa o cümlelere bir daha bak ve yukarıdaki sınamadan geçen bir dokunuş varsa yap. Öteki türlerde bu satırlar için cümle bölüp birleştirme.

   Düzelttiysen bir kez daha çalıştır, yeni bir şey bozmadığını gör, sonra dur. Skoru ve ritim sayısını kovalama: tek bir metinde ikisi de oynaktır, yazar metni de bazen yüksek çıkar. Sayı düzelsin diye metne soru, ünlem, kısa cümle ya da kaynakta olmayan bir şey ekleme. Temiz rapor metnin iyi olduğunu göstermez. Son kararı metni baştan sona bir okur gibi okuyarak ver.

   Kod çalıştıramıyorsan aynı denetimi elle yap: her paragrafta cümle boylarını say, kaynaktaki her sayıyı ve adı çıktıda ara, ihtiyat sözlerinin yerinde olduğuna bak.
4. Kendi eklediklerini sına. Metne koyduğun her `işte`, `zaten`, `aslında`, her devrik cümle, her soru için sor: Bunu çıkarırsam anlamdan ya da tondan bir şey eksilir mi? Eksilmiyorsa çıkar.
5. Yalnızca metni ver. Başına "Elbette, işte metnin doğal hâli:" yazma, sonuna değişiklik özeti ekleme. Kullanıcı neyi değiştirdiğini sorarsa o zaman anlat. Yer tutucu bıraktıysan ya da kaynakta çelişki gördüysen bunu metnin altında bir iki cümleyle söyle.

Denetimde çıktı farklıdır: Her bulguyu metinden alıntıyla ver, yanına nedenini ve nasıl düzeleceğini yaz. Yazım hatasıyla (kılavuza aykırı) üslup tercihini karıştırma, ikisini ayrı başlıkta topla.

## Düzeltirken yenisini üretme

Kötü onarımın çoğu eksik düzeltmeden değil, fazla düzeltmeden çıkar. Bir kuralı her cümleye uygularsan o kural yeni bir tik olur.

- Her `bir`i, her `tarafından`ı, her `ki`yi hata sanma. Hepsi Türkçedir. Sorun yığılmalarıdır.
- Her cümleyi kısaltma. Model zaten çoğu zaman yazarlardan kısa yazar. Arada uzun bir cümle kur.
- Sildiğin kalıbın yerine başka bir dolgu koyma. "Kritik bir rol oynar" gidince her cümleye "aslında", "doğrudan", "ciddi ölçüde" eklenmesin. Çoğu zaman fiili yalnız bırakmak yeter.
- Devrik cümleyi ve `işte`, `hani` gibi sözleri "insan gibi dursun" diye serpiştirme. Kullanıcının kendi örneği yoksa on cümlede birden fazla devrik kurma. Deneyde bir model bu izni görünce cümlelerinin üçte birini devrik yaptı.
- Sahte samimiyet ekleme: "Kahvenizi alın", "Hepimiz oradaydık". Bunlar da çeviri blog klişesidir.
- Her bilgiyi tek bir adın önüne yığma. Okur yükleme varana kadar iç içe iki yan cümleden fazlasını tutamaz, cümleyi böl.
- Yabancı kökenli sözü Türkçeleştirmeye çalışma. `Performans`, `strateji`, `sistem`, `detay` yaşayan Türkçedir. Yazılımcının `endpoint` dediği şeye "uç nokta" deme.
- Kaynakta soru, şaşkınlık ya da yarım kalan bir düşünce varsa onu kendi noktalamasıyla ver. Yoksa metne soru ve ünlem ekleme.

## Dosyalar

- `references/cumle-kurulusu.md`: Türkçe cümlenin düzeni, ulaçlar, `-mektedir` ve `-dir`, zamir ve `bir`, edilgen, devrik cümle, koşutluk. Cümle onarırken.
- `references/kaliplar.md`: modelin sevdiği sözler, sıklıklarıyla. Kalıp ayıklarken ve denetimde.
- `references/yazim-ve-noktalama.md`: noktalama, saat ve sayı, yabancı terime ek, bitişik ve ayrı yazım. Son okumada ve denetimde.
- `references/metin-turleri.md`: yedi türün ayrıntısı, beş önce ve sonra örneği. Türden emin değilsen.
- `references/olculer.md`: türlere göre ölçülmüş cümle boyu, ritim ve noktalama değerleri. Bir kuralın dayanağını merak ettiğinde ya da kullanıcı sorduğunda.
- `scripts/denetle.py`: denetçi. Dosya yazmaz, internete bağlanmaz.
