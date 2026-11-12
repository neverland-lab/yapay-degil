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


<!-- references/cumle-kurulusu.md -->

# Cümle kuruluşu

Dil modelinin Türkçesinde kelimeler yerindedir, cümlenin iskeleti İngilizcedir. Bu dosya o iskeleti tanımayı ve Türkçenin kendi düzenine çevirmeyi anlatır. Cümle onarırken ya da bir cümlenin neden tuhaf durduğunu açıklarken buraya bak.

Buradaki maddelerin bir kısmı kuraldır: uyulmazsa cümle bozulur ya da anlam kayar. Bir kısmı tercihtir: uyulmazsa cümle yanlış olmaz ama çeviri kokar. Hangisi olduğu her maddede yazıyor. Tercihler metnin türüne göre esner, kurallar esnemez.

Ek gösteriminde büyük harf, ünlü uyumuna göre değişen sesi gösterir: `A` a ya da e, `I` ı, i, u ya da ü, `D` d ya da t. Dayanak: Göksel ve Kerslake, *Turkish: A Comprehensive Grammar* (2005); Erguvanlı-Taylan, *The Function of Word Order in Turkish Grammar* (1984).

## 1. Türkçe cümlenin düzeni

Türkçede belirleyen önce, belirlenen sonra gelir. Sıfat adın, tamlayan tamlananın, yan cümle ana cümlenin önündedir, yüklem en sonda durur. İngilizce çoğu yapıda bunun tersini yapar: yüklemi erkenden verir, ayrıntıyı arkasına ekler.

| | Türkçe | İngilizce |
| :--- | :--- | :--- |
| Cümle | Raporu gönderdim. | I sent the report. |
| Tamlama | sunucunun belleği | the memory of the server |
| Niteleme | dün kurduğumuz sunucu | the server that we set up yesterday |
| Yan cümle | Gecikeceğini söyledi. | He said that he would be late. |

Türkçe cümlenin ağırlığı sondadır, anlam yüklemle kapanır. Aşağıdaki maddelerin hepsi bu farktan çıkar.

### Her konumun bir işi var (kural)

Öge sırası serbest görünür ama her yerin görevi bellidir.

- Cümle başı konudur: bilinen şey, zaman ve yer çerçevesi. *Bu sürümde iki hata düzelttik.*
- Yüklemin hemen önü odaktır: yeni ya da vurgulanan bilgi. *Hatayı Ayşe buldu.*
- Yüklemin arkası arka plandır: zaten bilinen, ikincil bilgi. *Okumuyor kimse bu raporları.*

Eksiz nesne yüklemden ayrılmaz. *Ahmet'e rapor gönderdim* doğaldır, *Rapor Ahmet'e gönderdim* bozuktur. Ek almış nesne serbesttir: *Raporu Ahmet'e gönderdim* de *Ahmet'e raporu gönderdim* de doğru, yalnızca vurgu değişir.

### Vurgu kelimeyle değil, yerle verilir (tercih)

İngilizce vurguyu cümleyi yararak verir: *It was X that...*, *What made this possible was X*. Model bunu Türkçeye "... şey ... idi" kalıbıyla ya da "tam da bu noktada", "asıl önemli olan şu ki" gibi dolgularla taşır. Türkçede vurgulanacak ögeyi yüklemin önüne almak yeter.

- Yapay: *Bunu mümkün kılan şey, ekibin deneyimiydi.*
- Doğal: *Bunu ekibin deneyimi mümkün kıldı.*

Aynı dört kelime, dört ayrı vurgu: *Raporu dün Ahmet'e gönderdim* (kime), *Raporu dün Ahmet'e ben gönderdim* (kim), *Raporu Ahmet'e dün gönderdim* (ne zaman), *Dün Ahmet'e raporu gönderdim* (neyi).

### Uzun öge önce (tercih)

Uzun ve ağır öge başa, kısa öge yüklemin yanına gelir.

- Ağır: *Ahmet'e geçen hafta müşterilerden gelen bütün şikâyet e-postalarını ilettim.*
- Dengeli: *Geçen hafta müşterilerden gelen bütün şikâyet e-postalarını Ahmet'e ilettim.*

## 2. Niteleyen öne gelir

İngilizce niteleyen cümleyi adın arkasına dizer: *a system that scans the data every night*. Model bunu iki yoldan taşır: cümleyi bölüp işaret sözüyle tekrarlar ya da `ki` ile bağlar. Türkçe niteleyeni sıfat-fiille (`-(y)An`, `-DIk`, `-(y)AcAk`) adın önüne koyar.

- Yapay: *Bir sistem kurduk, bu sistem her gece verileri tarayıp raporluyor.*
- Doğal: *Her gece verileri tarayıp raporlayan bir sistem kurduk.*
- Yapay: *Görüyoruz ki kullanıcılar bu özelliği kullanmıyor.*
- Doğal: *Kullanıcıların bu özelliği kullanmadığını görüyoruz.*

Sıfat-fiil seçimi kuraldır. Nitelenen ad yan cümlenin öznesiyse `-(y)An` gelir (*kodu yazan geliştirici*), nesnesi ya da başka bir ögesiyse `-DIk` ya da `-(y)AcAk` ile iyelik eki (*geliştiricinin yazdığı kod*, *yarın kuracağımız sunucu*). *Geliştiricinin yazan kod* yanlıştır.

### `ki` suç değil

`ki` bağlacını şüphe işareti sayma. Ölçtüğümüz yazarlar onu modellerden sık kullanıyor: *demek ki, öyle ki, kaldı ki, dedi ki, yazık ki*. *Öyle bir mimari kurduk ki yüksek trafikte bile gecikme olmuyor* yerleşik bir sonuç yapısıdır, sıfat-fiile çevrilince vurgusu kaybolur. Şüpheli olan yalnızca İngilizce *that* cümlesinin kopyasıdır: *Görüyoruz ki...*, *Belirtmek gerekir ki...*, *Araştırmalar göstermektedir ki...*

### Öne yığmanın da sınırı var (tercih)

İngilizce iskeleti onarırken her bilgiyi tek bir adın önüne doldurma. Okur yükleme varana kadar hepsini aklında tutmak zorunda kalır.

- Yığılmış: *Geçen ay müşterinin şikâyet ettiği hatayı düzelttiğimiz sürümde ortaya çıkan yeni sorunu inceleyen ekip rapor yazdı.*
- Dengeli: *Geçen ay müşterinin şikâyet ettiği hatayı yeni sürümde düzelttik. Bu sürümde çıkan yeni sorunu inceleyen ekip rapor yazdı.*

Bir adın önünde bir yan cümle, onun içinde de en çok bir yan cümle daha bulunsun. Fazlası varsa cümleyi böl.

### Ad zincirleri (tercih)

İngilizce ad yığınlarını (*customer segmentation module performance optimization process*) eksiz adları art arda dizerek çevirme. Eksiz dizilen ad sayısı üçü geçmesin, fazlasını tamlama ekiyle çöz.

- Yapay: *Müşteri segmentasyon modülü performans iyileştirme çalışması sonuç raporu*
- Doğal: *Müşteri segmentasyon modülünün performansını iyileştirme çalışmasının sonuç raporu*

Kaynakta çalışmayı kimin yaptığı yazmıyorsa "yaptığımız" gibi bir özne ekleme.

## 3. `ve` yerine ulaç

İngilizce art arda gelen eylemleri ve neden-sonuç bağını ayrı kelimelerle kurar: *and, and then, when, as*. Türkçe iki yüklemi ulaç ekleriyle tek akışta birleştirir.

| İlişki | Yapay | Doğal |
| :--- | :--- | :--- |
| Sıra | Veriyi çektik ve sonra temizledik. | Veriyi çekip temizledik. |
| Tetikleme | Cache doldu ve istekler yavaşlamaya başladı. | Cache dolunca istekler yavaşlamaya başladı. |
| Orantı | Trafik arttı ve buna bağlı olarak hata oranı da yükseldi. | Trafik arttıkça hata oranı da yükseldi. |
| Yöntem | Maliyetleri düşürdük ve bu sayede kârlılığı artırdık. | Maliyetleri düşürerek kârlılığı artırdık. |
| Eş zamanlılık | Birinci grup hızlı ilerler ve ikinci grup geride kalır. | Birinci grup hızlı ilerlerken ikincisi geride kalır. |

Ulaç her `ve`nin yerine geçmez. Dört sınırı var, dördü de kuraldır.

- Nedensellik uydurma. Ulaç iki olay arasına zaman ya da neden bağı koyar. Kaynakta iki cümle yalnızca yan yana duruyorsa onları ulaçla bağlama, virgülle ya da ayrı cümle olarak bırak.
- Gizli özne. Ulaçlı yan cümlenin öznesi söylenmemişse okur onu ana cümlenin öznesi sanar. *Veriyi çekip sistem çöktü* cümlesinde veriyi sistem çekmiş olur. Özneler farklıysa iki cümle kur: *Veriyi çektik, ardından sistem çöktü.*
- Olumsuzluğun yayılması. *Raporu okuyup onaylamadı* hem "okudu ama onaylamadı" hem "ikisini de yapmadı" diye anlaşılır. Yalnızca ikinci eylem olumsuzsa açık yaz: *Raporu okudu ama onaylamadı.*
- Zıtlık ulaçla kurulmaz. `-(y)Ip` sıralar, karşılaştırmaz. *Komşunun sesini duyuyoruz ama adını bilmiyoruz* cümlesini *duyup bilmiyoruz* yapma. Zıtlık için *ama*, *oysa* ya da `-(y)ken` kullan.

Ulaçtan sonra virgül konmaz. Yalnızca art arda gelen ulaçlar virgülle ayrılır.

## 4. `-mektedir` ve `-dir`

Bu ikisi sık karıştırılır ama ayrı şeylerdir.

`-mAktAdIr` bir fiil çekimidir (*artmaktadır, sağlamaktadır*) ve resmî üsluba aittir. Akademik, hukuki ve kurum yazısında yerindedir. Başka türlerde `-(I)yor` ya da `-Ar/-Ir` kullan.

- Yapay (blog): *Bu yöntem geliştiricilere büyük kolaylık sağlamaktadır.*
- Doğal: *Bu yöntem geliştiricilerin işini kolaylaştırıyor.*

`-DIr` ad cümlesinin bildirme ekidir (*Bu yöntem etkilidir*). Fiile çevrilemez, ya kalır ya düşer. Tanım ve sınıflandırmada kalır: *Redis bir anahtar-değer veri tabanıdır.* Anlatı ve sohbet akışında seyreltilir, yoksa metin ders kitabına döner.

- Yapay (blog): *Bu yöntem oldukça etkilidir. Burası sistemin en kritik parçasıdır.*
- Doğal: *Bu yöntem oldukça etkili. Burası da sistemin en kritik parçası.*

Ek düşünce cümle eksik kalmaz, yüklem ad olsa da olur: *Bu, onun son çabasıdır* ile *Bu, onun son çabası* aynı şeyi söyler, ikincisi konuşur gibidir. Hepsini düşürme. Paragrafın son cümlesinde ya da bir tanımda ek kalsın.

Konuşma dilinde `-DIr` tahmin de bildirir (*Şimdi evdedir*). Gündelik metne eklenen her `-DIr` cümleye ya resmîlik ya belirsizlik katar.

Aynı eki alan sıralı yüklemlerde ek yalnızca sonuncuya gelir (tercih): *Bu yöntem hızlıdır ve güvenilirdir* değil, *Bu yöntem hızlı ve güvenilirdir.*

Akademik ve kurum yazısında art arda üç dört cümlenin aynı ekle bitmesi olağandır. Ölçtüğümüz 2016-2019 makalelerinin çoğunda üçlü `-mektedir` serisi var, faaliyet raporlarında on cümlelik `-mıştır` serileri görülüyor. Bu türlerde seriyi kırmaya çalışma. Sayılar `olculer.md` dosyasında.

## 5. Zamir, `bir`, `kendi`

Yüklemdeki kişi eki özneyi, iyelik eki sahibi zaten söyler. İngilizcenin zorunlu *I, we, it, this* zamirlerini her cümleye taşıma.

- Yapay: *Biz önce veri tabanını yedekledik, sonra biz migration script'ini çalıştırdık. O sorunsuz tamamlandı.*
- Doğal: *Önce veri tabanını yedekledik, ardından migration script'ini çalıştırdık. İşlem sorunsuz tamamlandı.*

Açık söylenen zamir Türkçede karşıtlık bildirir (kural). *Ben gittim* "başkası değil, ben" demektir. Gereksiz zamir cümleyi ağırlaştırmakla kalmaz, istenmeyen bir vurgu da ekler.

`bir` Türkçenin kendi sözüdür: *güzel bir gün*, *derin bir iz bıraktı*. Sorun yoğunluktadır. Model her sıfat tamlamasına İngilizce *a/an* karşılığı bir `bir` koyar.

- Yapay: *Bu güncelleme büyük bir önem taşıyor ve yüksek bir performans ile iyi bir kullanıcı deneyimi sunuyor.*
- Doğal: *Bu güncelleme büyük önem taşıyor, yüksek performans ve iyi kullanıcı deneyimi sunuyor.*

Önce kalıplaşmış eylemlerin içindekini at (*önem taşımak, artış göstermek*). Bir cümlede birden fazla "sıfat + bir + soyut ad" varsa seyrelt. Tek ve somut bir şeyi anlatan `bir`e dokunma.

*His own, its own* çevirisi olan `kendi`yi karşıtlık yoksa tekrarlama: *Her servis kendi veri tabanına bağlanır ve onun kendi yapılandırmasını okur* değil, *Her servis kendi veri tabanına bağlanıp yapılandırmasını okur.*

## 6. Edilgen, adlaştırma, kof fiil

`tarafından` Türkçedir. *Köprü Mimar Sinan tarafından yapıldı* kusursuz bir cümledir: konu köprü, yeni bilgi Mimar Sinan. Etkene çevirirsen konuyu değiştirirsin. Çeviri kokusu iki durumda çıkar: yapan yazarın kendisi ya da kurumuysa, ya da `tarafından` içi boş bir fiille gelmişse (*tarafından gerçekleştirilmiştir*).

- Yapay: *Yeni kimlik doğrulama modülü güvenlik ekibimiz tarafından test edilmiş ve onaylanmıştır.*
- Doğal: *Güvenlik ekibimiz yeni kimlik doğrulama modülünü test edip onayladı.*

Model eylemi ada çevirip yardımcı fiille yeniden eyleme bağlar: *-mAsI gerekmektedir, -mAsI sağlanmalıdır, -mAsI önem arz etmektedir.* Çoğu zaman fiil doğrudan çekilebilir (tercih).

- Yapay: *Verilerin düzenli olarak yedeklenmesinin sağlanması gerekmektedir.*
- Doğal: *Veriler düzenli olarak yedeklenmeli.*

Kamu ve kurum yazışmasında bu yapılar beklenen biçimdir, orada dokunma.

Tek fiille söylenecek iş ad + yardımcı fiille şişer. Bu öbeklerin çoğu Türkçede yerleşiktir, sorun sıklıktadır.

| Şişkin | Yalın |
| :--- | :--- |
| toplantı gerçekleştirdik | toplantı yaptık |
| hız artışı sağlar | hızlandırır |
| yüksek hıza sahiptir | çok hızlıdır |
| üç katmana sahiptir | üç katmandan oluşur |
| birçok yapıya ev sahipliği yapmaktadır | bölgede birçok yapı var |
| kritik bir rol oynamaktadır | sonucu belirler |
| raporda üç bölüm yer almaktadır | raporda üç bölüm var |
| önemli olan bir adım | önemli bir adım |
| ilk adım olarak veriyi sildik | ilk adımda veriyi sildik |

*Katkıda bulunmak* yerleşik bir deyimdir. Yerine sözlükte olmayan *katkı sunmak* yazma.

## 7. Görülen ve duyulan geçmiş

Türkçe olayı görüp görmediğini fiilde ayırır, İngilizce ayırmaz. Model bu yüzden `-mIş`ı neredeyse hiç kullanmaz. Olay sonradan öğrenilmiş ya da kayıttan çıkarılmışsa gündelik yazıda `-mIş` doğaldır.

- Düz: *Gece yarısı bellek sızıntısı oldu ve servis kapandı. Sabah log'lara baktığımızda fark ettik.*
- Doğal: *Gece yarısı bellek sızıntısı olmuş, servis de kapanmış. Sabah log'lara bakınca fark ettik.*

Resmî raporda ve tutanakta kayıtla kesinleşmiş olgu için `-DI` olağandır, `-mIş`ı zorla yayma.

Genel doğrular için `-Ar/-Ir` de `-(I)yor` da doğaldır. Geniş zaman daha tanımsal durur, teknik tanımda onu seç: *Redis veriyi bellekte tutar.* Aynı paragrafta aynı türden bilgiyi anlatırken ikisini karıştırma.

## 8. Cümleler arası bağ

*Which means* ve *this means that* Türkçeye "Bu da ... anlamına gelir" diye ikinci bir cümle olarak geçer. Bağ çoğu zaman tek cümlede kurulur.

- Yapay: *Cache süresi kısa tutuldu. Bu da veri tabanı yükünün artması anlamına geliyor.*
- Doğal: *Cache süresi kısa tutulduğu için veri tabanı yükü artıyor.*

Model her cümleyi baştan kesin bilgi gibi yazar. Yazar düşünürken daraltır, çekince koyar, bunu da küçük sözlerle yapar: *ise, de, zaten, yani, bir de, daha doğrusu.*

- Yapay: *Birinci yöntem hızlıdır, ikinci yöntem yavaştır.*
- Doğal: *Birinci yöntem hızlı, ikincisi ise yavaş.*

Bu sözlerin her biri silme sınavından geçmeli: çıkarınca anlamdan ya da tondan bir şey eksilmiyorsa süstür.

## 9. Devrik cümle

Yüklemin arkası bilinen bilginin yeridir. Gündelik ve edebî yazıda bilinen ögeyi oraya atmak cümleye konuşma sıcaklığı verir.

- Düz: *Kimse bu uzun hata raporlarını sonuna kadar okumuyor.*
- Devrik: *Kimse sonuna kadar okumuyor bu uzun hata raporlarını.*

Yeni bilgi ve eksiz nesne yüklemin arkasına geçmez (kural): *Ahmet'e gönderdim rapor* bozuktur.

Yazarlarda yüklemden sonra kalan kısım çoğunlukla bir iki kelimedir: bir zamir (*beni, ona*), *bu*, bir ad ya da *belki, zaten, hiç* gibi bir söz. Ne sıklıkla devrik kurulacağını yazar belirler, ölçtüğümüz kitaplarda oran %2 ile %37 arasında. Kullanıcının kendi örneği yoksa on cümlede biri geçme. Teknik, kurumsal, akademik ve kurum yazısında devrik kurma.

## 10. Koşutluk

`ve`, virgül ya da ikili bağlaçla bağlanan ögeler aynı görevdeyse aynı biçimde kurulur. İki yükleme birden bağlanan öge de ikisinin istediği biçime uymalıdır. Model bu hataları sık yapar, çünkü İngilizcede ad hâl eki almaz: *We review and include user feedback* cümlesinde iki fiil tek nesneyi rahatça paylaşır. Türkçede her yüklem nesnesine kendi ekini dayatır. Bu bölümdekilerin hepsi kuraldır. Okul kitaplarında "anlatım bozukluğu" diye geçer.

**Ortak öge iki yüklemin de ekine uymalı.** Biri *neyi*, öteki *neye* soruyorsa ögeyi ikinci yükleme zamirle yeniden bağla.

- Bozuk: *Kullanıcı geri bildirimlerini inceliyor ve yol haritamızda yer veriyoruz.*
- Doğru: *Kullanıcı geri bildirimlerini inceliyor ve bunlara yol haritamızda yer veriyoruz.*

Ek aynı olsa bile anlam uymayabilir: *Müşteri verilerinin gizliliğini önemsiyor ve üçüncü taraflarla paylaşmıyoruz* cümlesinde paylaşılmayan şey gizlilik olur. Doğrusu: *... önemsiyor ve bu verileri üçüncü taraflarla paylaşmıyoruz.*

**Ortak özne iki yüklemin de çatısına uymalı.** Aynı özne bir etken, bir edilgen yükleme birlikte bağlanamaz.

- Bozuk: *Sistem gelen istekleri doğruladıktan sonra veri tabanına kaydedilir.* (Kaydedilen sistem olur.)
- Doğru: *Sistem gelen istekleri doğruladıktan sonra veri tabanına kaydeder.*

Özneleri ayrı iki cümle farklı çatıda olabilir: *Ekip testleri tamamladı ve yeni sürüm yayına alındı* doğrudur.

**Ortak ek ancak her kanada uyuyorsa düşer.** Kişi ya da olumsuzluk farklıysa düşürülemez.

- Bozuk: *Pazarlama ekibi yeni kampanyalara, siz ise müşteri bağlılığına odaklanacak.*
- Doğru: *Pazarlama ekibi yeni kampanyalara odaklanacak, siz ise müşteri bağlılığına odaklanacaksınız.*
- Bozuk: *Model hızlı ve doğruluğu yeterli değildi.* (Modelin hızlı olmadığını da söyler.)
- Doğru: *Model hızlıydı ama doğruluğu yeterli değildi.*

**Liste ögeleri aynı biçimde kurulur.** `-mAk`, `-mAsI` ve yalın ad aynı listede karışmaz.

- Bozuk: *Bu güncellemenin amaçları arayüzü hızlandırmak, bellek sızıntılarının giderilmesi ve daha kolay bir kurulum.*
- Doğru: *Bu güncellemenin amaçları arayüzü hızlandırmak, bellek sızıntılarını gidermek ve kurulumu kolaylaştırmak.*

**İkili bağlacın iki kanadı denk olur.** *Hem ... hem, ne ... ne, ya ... ya, ister ... ister.*

- Bozuk: *Arayüz hem kullanıcı dostu bir deneyim sunuyor hem de erişilebilirlik standartlarına tam uyumluluk.*
- Doğru: *Arayüz hem kullanıcı dostu bir deneyim sunuyor hem de erişilebilirlik standartlarına tam uyuyor.*

*Ne ... ne* yargıyı kendisi olumsuz yapar, yüklem olumlu çekilir: *Bu strateji ne maliyeti düşürdü ne de yanıt süresini kısalttı.* Olumsuz yüklem (*düşürmedi ... kısaltmadı*) konuşmada duyulur ama yazıda bozukluk sayılır.

### Yapay simetri (tercih)

Koşutluğun tersi de bir kusurdur: anlamın gerektirmediği simetri. Model üç biçimini sever.

- Ayna karşıtlık: *Teknoloji insan için vardır, insan teknoloji için değil.*
- Zincirleme tekrar: *Veriyi anlamak geleceği anlamaktır, geleceği anlamak değişimi yönetmektir.*
- Aynı kalıba dökülmüş üçlü: *Bu platform hızıyla zamanı, güvenliğiyle veriyi, esnekliğiyle geleceği korur.*

Bunlar slogan dilidir ve çoğu zaman bilgi taşımaz. Süsü at, geriye kalan iddiayı söyle: *Bu platform hızlı, güvenli ve esnek.* Kaynakta üç özellik varsa üçü de kalır, sorun sayıda değil kalıptadır. Geriye somut bir iddia kalmıyorsa uydurma, cümleyi sil ya da kullanıcıya sor.

Gerçek bir karşıtlığı ya da gerçekten koşut iki olguyu anlatan simetri kalır: *Birinci yöntem hızlı, ikincisi ise yavaş.*


<!-- references/kaliplar.md -->

# Kalıplar

Dil modelinin Türkçe yazarken sarıldığı sözler. Kalıp ayıklarken ve denetimde buraya bak.

Bu liste tahminle değil sayarak kuruldu. Her sözün yanındaki iki sayı, on bin kelimede kaç kez geçtiğini gösterir: önce Türkçe yazan yazarlarda (119 metin, 1,1 milyon kelime), sonra dil modellerinde (altı model, 200 metin, 83 bin kelime). Model derlemi küçük olduğu için sayılar kesin oran değil, yön gösterir.

Üç şeyi akılda tut. Birincisi, bir sözün listede olması onu yasak yapmaz: aşağıdaki üçüncü grup yazarlarda da geçer. İkincisi, sözü silmek yetmez, çünkü sorun çoğu zaman sözün kendisi değil, cümlenin bir şey söylememesidir. "Kritik bir rol oynar" neyin değiştiğini söylemez. Neyin değiştiği kaynakta yazıyorsa onu yaz, yazmıyorsa cümleyi sade bırak. Uydurma. Üçüncüsü, sildiğin kalıbın yerine eş anlamlısını koyma: "yadsınamaz" yerine "tartışılmaz" yazmak hiçbir şeyi düzeltmez.

## 1. Yazarlarda neredeyse hiç yok

Gördüğün yerde değiştir. Bunlar yazarlarda on bin kelimede 0,1'in altında, modellerde beş ila on kat sık.

| Kalıp | Yazar | Model | Ne yapılır |
| :--- | :--- | :--- | :--- |
| sadece X değil, aynı zamanda Y | 0,08 | 1,3 | Olumsuz yarıyı at. *Kitap sadece eğlenceli değil, aynı zamanda öğretici* → *Kitap hem eğlenceli hem öğretici.* |
| bir X değil, bir Y | 0,08 | 0,9 | Asıl iddiayı düz söyle. *Bu bir güncelleme değil, bir devrim* → neyin değiştiğini yaz. |
| değer katmak, fark yaratmak, ivme kazanmak, güç katmak | 0,04 | 1,0 | Ne değiştiğini yaz. |
| tam da bu noktada, işte bu noktada | 0,03 | 0,7 | Sil. |
| zemin hazırlamak | 0,04 | 0,7 | *yol açmak* ya da doğrudan sonuç. |
| çığır açan, dönüm noktası, kilometre taşı, devrim niteliğinde | 0,06 | 0,7 | Abartıyı at, olguyu söyle. |
| günümüzün hızla değişen dünyasında, günümüz dünyasında, dijital çağda | 0,01 | 0,6 | Sil, konuya gir. |
| yadsınamaz, inkâr edilemez | 0,05 | 0,4 | Sil ya da önemi gösteren bilgiyi yaz. |
| göz ardı edilmemeli | 0,03 | 0,4 | Uyarıyı at, nedeni söyle. |
| geniş bir yelpaze, zengin bir mozaik | 0,02 | 0,2 | Kaç çeşit, ne çeşit. |

## 2. Modellerde belirgin sık

Çoğu zaman değiştir. Yazarlarda da geçer ama modellerde üç ila yedi kat sık.

| Kalıp | Yazar | Model | Ne yapılır |
| :--- | :--- | :--- | :--- |
| bir diğer (önemli nokta, etken, konu) | 0,4 | 2,5 | *bir başka, öteki* ya da hiçbir şey demeden yeni konuya geç. |
| olanak tanımak, imkân sağlamak, fırsat sunmak | 0,4 | 1,7 | Fiili doğrudan çek: *görmenize olanak tanır* → *görebilirsiniz.* |
| sonuç olarak, kısacası, özetle, özetlemek gerekirse | 0,3 | 1,6 | Kapanış yeni bir şey söylemiyorsa paragrafı sil. Akademik metinde olağandır. |
| derinlemesine, mercek altına almak | 0,1 | 1,2 | Sil. |
| büyük önem taşımak, önem arz etmek | 0,2 | 1,1 | Neden önemli olduğunu yaz. |
| her geçen gün | 0,1 | 0,6 | *giderek* ya da sayı. |
| köprü kurmak, kapı aralamak | 0,05 | 0,4 | Benzetmeyi at, bağı söyle. |
| bütüncül yaklaşım, sinerji, proaktif, paradigma değişimi | 0,1 | 0,5 | Yapılacak işi düz yaz. |
| kritik öneme sahip | 0,04 | 0,1 | *çok önemli* ya da neden. |
| deneyim sunmak, çözüm sunmak | 0,02 | 0,1 | Okurun ne yapabileceğini yaz. |

## 3. Yığılınca iz bırakanlar

Tek tek olağandır. Aynı metinde birkaç kez geçiyorsa seyrelt.

| Kalıp | Yazar | Model | Not |
| :--- | :--- | :--- | :--- |
| yalnızca X değil, Y de | 0,9 | 4,6 | Yazarlar da kullanır. Olumsuz yarı bir kanıyı düzeltiyorsa kalır. |
| ... anlamına gelir | 0,7 | 2,2 | Sözcük açıklıyorsa yerinde. "Bu da ... anlamına gelir" diye sonuç bağlıyorsa tek cümle kur. |
| -nın ötesinde | 0,6 | 1,7 | |
| bununla birlikte, öte yandan, dahası | 1,0 | 1,5 | Akademik metinde olağan. Gündelik yazıda *ama, bir de* yeter. |
| bu yolculuk, bir yolculuk | 0,5 | 1,0 | Gerçek yolculuksa dokunma. |
| unutmamak gerekir, unutulmamalıdır | 0,2 | 0,7 | |
| önemli bir rol oynamak | 0,3 | 0,6 | Ne yaptığını yaz. |
| bu noktada | 0,2 | 0,5 | |

## Kalıp sandığımız ama olmayanlar

Bu sözleri uzun süre yapay zekâ izi saydık. Saydığımızda yazarların bunları modellerden sık ya da onlar kadar kullandığı çıktı. Gördüğün yerde silme. Yalnızca aynı metinde göze batacak kadar tekrar ediyorsa azalt.

| Söz | Yazar | Model |
| :--- | :--- | :--- |
| âdeta | 1,6 | 0,8 |
| ... bir şekilde, ... bir biçimde | 3,7 | 1,8 |
| kuşkusuz, şüphesiz | 1,0 | 0,6 |
| söz konusu, bu bağlamda, bu doğrultuda | 0,9 | 0,4 |
| -e sahip olmak | 1,7 | 1,9 |
| rol oynamak (sıfatsız) | 0,3 | 0,3 |
| eşsiz, benzersiz, unutulmaz | 0,6 | 0,3 |
| belirtmek gerekir ki | 0,1 | 0,1 |

`ki` bağlacı, `tarafından` ve `ama`dan önceki virgül de bu gruptadır: hepsi Türkçenin kendi malı. Ayrıntıları `cumle-kurulusu.md` ve `yazim-ve-noktalama.md` dosyalarında.

## Bugünkü modellerde ölçemediklerimiz

Şu kalıplar ölçtüğümüz altı modelin metinlerinde hiç çıkmadı. Eski modellerin, İngilizceden çevrilmiş tanıtım metinlerinin ve makine çevirisinin izi olarak bilinirler. Görürsen düzelt, ama sıklıkları hakkında bir şey söyleyemiyoruz.

- İçi boş fiille `tarafından`: *ekibimiz tarafından gerçekleştirilmiştir* → *ekibimiz yaptı.*
- *Araştırmalar göstermektedir ki ...* → *Araştırmalara göre ...*
- *kusursuz bir şekilde, pürüzsüzce, zahmetsizce* → *sorunsuz, kolayca* ya da hiç.
- *potansiyelini ortaya çıkarmak, bir üst seviyeye taşımak* → okurun ne kazanacağı.
- *-nın kalbinde yer alan* → *merkezindeki.*
- *en büyük kanıtıdır, canlı bir göstergesidir* → kanıtın kendisi.
- Çeviri reklam sözleri: *oyun değiştirici, tek durak noktası, hepsi bir arada, başlamaya hazır mısınız, zamandan ve paradan tasarruf edin, ihtiyaçlarınıza özel tasarlanmış.*
- Blog ve gündelik yazıda `-mektedir`.
- Cümle ortasında uzun çizgi. Yazım hatasıdır, `yazim-ve-noktalama.md` dosyasına bak.

## Cümle başları

Modeller cümleyi bir geçiş sözüyle açmayı sever. Bin cümlede sayınca en ayırt edici açılışlar şunlar (yazarlarda hepsi sıfıra yakın, modellerde bin cümlede iki ila beş):

*Sonuç olarak, Son olarak, İlk olarak, İkinci olarak, Üçüncü olarak, Birincisi, İkincisi, Öncelikle, Bu doğrultuda, Bu çerçevede, Bu sayede, Bu yazıda, Bu bölümde, Bir diğer, Önemli olan, Şimdi ise, Bugün ise, Bunun yerine, Buna karşın, Aynı şekilde.*

Yazarlarda da geçen ama modellerde iki üç kat sık olanlar: *Ancak, Bu nedenle, Bu durum, Yine de, Böylece, Oysa, Ayrıca, Bununla birlikte.*

Bunları tek tek yasaklama. Paragrafa bak: art arda üç cümle bir geçiş sözüyle başlıyorsa ikisini at, bağı cümlenin içeriğiyle kur.

## Sohbetten kalanlar

Metnin başında ya da sonunda duran, yazıya değil konuşmaya ait cümleler. Görürsen sil, yazarken de üretme.

- *Elbette! İşte metninizin daha doğal hâli:*
- *Harika bir konu! Gelin birlikte inceleyelim.*
- *Umarım bu düzenleme işinize yarar. Başka bir değişiklik isterseniz belirtin.*
- Kullanıcı istemediği hâlde eklenen değişiklik özeti.


<!-- references/yazim-ve-noktalama.md -->

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


<!-- references/metin-turleri.md -->

# Metin türleri ve örnekler

Doğal Türkçe tek bir ses değildir. Sözleşmede devrik cümle özensizliktir, blog yazısında `-mektedir` robotluktur. Aynı düzeltme bir türde metni iyileştirir, ötekinde bozar. Bu dosya yedi türün her birinde neye dokunulacağını, neyin o türün kendi sesi olduğu için yerinde bırakılacağını anlatır, sonra da baştan sona örnekler verir. Metnin türünden emin olmadığında ya da bir türde ilk kez çalışırken buraya bak.

Kullanıcı kendi yazısından örnek verdiyse o örnek buradaki her şeyin üstündedir: cümle boyunu, bağlaçlarını, hitabını ondan al.

## Yedi tür

**Blog, deneme, köşe yazısı, sosyal medya.** Masanın karşısından anlatan biri konuşur. Okura "sen" ya da "siz" der ve bunu yol boyunca değiştirmez. Cümle boyu en çok burada oynar: dört kelimelik bir cümle yirmi sekiz kelimelik bir cümlenin yanında durabilir. Soru sorulur, iki nokta kullanılır, düşünce yarım bırakılabilir. `-mektedir` silinir, ad cümlesindeki `-dir` seyrelir. *İşte, zaten, hani, tabii, daha doğrusu* gibi sözler yerindeyse kalır. Devrik cümle olur ama seyrek. Yazı bir sahneyle, somut bir gözlemle ya da doğrudan soruyla açılır, konuyu duyurarak değil.

**Öykü, roman, anlatı.** Ritim ve imge öndedir, bütün kipler serbesttir. Soru, ünlem ve üç nokta anlatının olağan parçasıdır. Model anlatıda düz bildirme cümlesine sıkışır ve çoğu zaman yazarlardan da kısa yazar. Sorun kısalık değil, cümlelerin hep aynı boyda olmasıdır. Onarırken imge ekleme, olay ekleme. Son cümle olayın ya da mekânın parçasıysa kalır. Gidecek olan okura ders veren kapanıştır.

**Şirket yazısı: tanıtım, bülten, duyuru, ürün metni.** Müşteriye kendi adına yazan, açık sözlü biri konuşur. Hitap "siz"dir. Tez ilk cümlededir. Şirketin kendi yaptığı iş etken söylenir: "tarafımızca gerçekleştirilmiştir" değil, "yaptık". Vaat sözleri (*bir üst seviyeye taşıyın, potansiyelinizi ortaya çıkarın*) yerine okurun ne kazanacağı yazılır, kaynakta yazıyorsa. Devrik cümle ve samimiyet numarası yok.

**Ders kitabı, popüler bilim, açıklayıcı yazı.** Konuyu bilen biri bilmeyene anlatır. Bu türde yazarların cümleleri romandakinden daha düzenlidir, noktalı virgül ve iki nokta sıktır, `-dir` ile biten tanım cümleleri olağandır. Edebî ritmi burada zorlama. Belirgin bir tekdüzelik yoksa cümle sınırlarına dokunma.

**Teknik belge.** Sorunu çözmüş biri, çözecek olana yazar. Doğrudan soruna ve karara girer. Kural ve tanım geniş zamanla söylenir (*Redis veriyi bellekte tutar*), tanım cümlesinde `-dir` kalır, `-mektedir` gitmelidir. Yerleşik İngilizce terim olduğu gibi durur, ek okunuşuna göre gelir. Devrik cümle yok. Kod, komut ve çıktı bloklarına dokunma.

**Akademik ve hukuki yazı.** Belgenin iskeleti korunur: bölüm sırası, atıflar, terimler. `-mektedir` ve `-dir` burada yerindedir, art arda üç dört cümlenin aynı ekle bitmesi de olağandır. *Söz konusu, bu bağlamda, öte yandan* bu türde insan yazısında da geçer, tek tek ayıklama. Uzun cümle bu türün hakkıdır: yazarların her dört beş cümlesinden biri yirmi sekiz kelimeyi geçer. Model burada bütün cümleleri aynı uzunlukta kurar, kısa cümleye hiç yer vermez ve her beş cümleden birini "Ayrıca", "Bu doğrultuda", "Sonuç olarak" gibi bir sözle açar. Onarımda cümleleri bölüp birleştirmeye değil, bu dizilişi bozmaya bak: geçiş sözlerini at, kalıpları ayıkla. Ritim için cümle sınırlarıyla oynama ve kısa özdeyiş cümleleri ekleme, iki ayrı deneyde okur bunları mekanik buldu. Kipi koru. Devrik cümle yok.

**Kamu ve kurum içi yazışma.** İç notlar, resmî yazılar, faaliyet raporları, sunum açıklamaları. Kurum adına yazan nesnel bir ses konuşur. Okura doğrudan seslenilmez. Bu türde model izleriyle kurum dilinin özellikleri örtüşür, çünkü modeller bu dili de öğrenmiştir. Adlaştırma (*uyku düzeninin bozulması*), edilgen çatı, `-mektedir`, art arda `-mıştır` ile biten cümleler ve kurum terimleri (*süreç, müdahale, farkındalık*) burada çeviri kokusu değil, beklenen biçimdir. Bunları temizlersen metni resmiyetten çıkarırsın. Cümle sınırlarına ve kipe dokunma: metin `-mektedir` ile yazılmışsa birkaç cümleyi geniş zamana çevirmek onu yamalı gösterir. Yalnızca gerçek kusurları onar: koşutluk ve ortak öge hataları, yazım ve noktalama, slogan gibi başlıklar, sahne kuran girişler (*"... günümüzde"*), dolgular (*"İşte bu noktada"*), şişirmeler (*"hayati bir önem"*), kapanış klişeleri.

## Aynı cümle, dört türde

Modelin yazdığı:

> Cache stratejisinin doğru bir şekilde belirlenmesi, sistem performansı açısından kritik bir öneme sahiptir ve gecikme sürelerinin azaltılmasında yadsınamaz bir rol oynamaktadır.

- Akademik: *Önbellekleme stratejisinin doğru belirlenmesi, sistem performansını ve yanıt sürelerini belirlemektedir.*
- Teknik: *Cache stratejisini doğru kurmak performansı artırır ve gecikmeyi düşürür.*
- Şirket yazısı: *Doğru önbellek stratejisi sisteminizi hızlandırır, yanıt sürelerini kısaltır.*
- Blog: *Performansı belirleyen şeylerden biri cache stratejisi. Doğru kurarsanız gecikme de azalıyor.*

Dört cümlenin hiçbiri "yarı yarıya" ya da "%40" demiyor, çünkü kaynak bir miktar vermiyor.

## Örnek 1: Blog

Önce:

> Günümüzün hızla değişen iş dünyasında, uzaktan çalışma modeli sadece geçici bir trend değil, aynı zamanda kurumsal kültürün temel bir yapı taşı haline gelmiştir ve bu durumun önemi yadsınamaz. Şirketler tarafından gerçekleştirilen araştırmalar göstermektedir ki, çalışanlara esneklik sağlamak verimlilik üzerinde kritik bir rol oynamaktadır. Bununla birlikte, iletişim kopukluklarını önlemek adına bütüncül bir yaklaşım benimsenmelidir. Sonuç olarak, geleceğin çalışma dünyasında başarılı olmak isteyen kurumlar bu dönüşüme ayak uydurmak zorundadır.

Sonra:

> Uzaktan çalışma artık şirket kültürünün kalıcı bir parçası. Şirketlerin yaptığı araştırmalar da aynı şeyi söylüyor: Çalışanlara esneklik tanıdığınızda verimlilik artıyor. İşin zor kısmı iletişimi koparmamak, bunun için işin bütününe bakmak gerekiyor. Bundan sonra başarılı olmak isteyen kurumlar bu değişime ayak uydurmak zorunda.

Gidenler: sahne kuran giriş, "sadece ... değil, aynı zamanda", "yadsınamaz", "tarafından gerçekleştirilen", "göstermektedir ki", "kritik bir rol oynamaktadır", "Bununla birlikte", "bütüncül bir yaklaşım", "Sonuç olarak". Kalanlar: dört iddianın dördü. Kaynak araştırmaların adını vermiyor, çıktı da vermiyor. Kaynak "zorundadır" diyor, çıktı bunu "iyi olur"a yumuşatmıyor.

## Örnek 2: Teknik

Önce:

> ## Cache Stampede Problemi Ve Çözüm Yöntemleri
> Bir önbellek (cache) anahtarının süresi dolduğunda, aynı anda gelen birçok istek veritabanına yönlendirilir ve bu durum sistemde adeta bir darboğaz yaratmaktadır. Bu sorun özellikle yüksek bir trafiğe sahip olan uç noktalarda (endpoints) kritik bir öneme sahiptir. Bu problemi çözmek için dağıtık kilit (distributed lock) mekanizması kullanılabilir, ama bu yöntem gecikme süresini artırabilir.

Sonra:

> ## Cache stampede sorunu ve çözümü
> Bir `cache` anahtarının süresi dolduğu anda gelen istekler hep birlikte veritabanına yönelip darboğaz oluşturur. Bu sorun özellikle yüksek trafikli `endpoint`'lerde önem kazanır. Dağıtık kilit (`distributed lock`) kullanılabilir, ama bu yöntem gecikmeyi artırabilir.

Kaynak "birçok istek" diyor, çıktı "yüzlerce" demiyor. Kaynak "artırabilir" diyor, çıktı "artırır" demiyor. Kaynakta "kesinti" yok, çıktıya da girmiyor. Başlıkta ve gövdede aynı terim (`cache`) kullanılıyor.

## Örnek 3: Akademik

Önce:

> Türkiye'de 2020-2024 yılları arasında yenilenebilir enerji yatırımları sadece artış göstermekle kalmamış, aynı zamanda enerji arz güvenliğinde de çığır açan bir dönüm noktası olmuştur. Enerji Bakanlığı tarafından paylaşılan verilere göre, güneş enerjisi kurulu gücü %112 oranında bir büyüme gerçekleştirmiştir ki bu durum sektörün dinamik yapısının en büyük kanıtıdır.

Sonra:

> Türkiye'de 2020-2024 yılları arasında yenilenebilir enerji yatırımları artmış, bu artış enerji arz güvenliğini de etkilemiştir. Enerji Bakanlığının verilerine göre güneş enerjisi kurulu gücü bu dönemde %112 büyümüştür.

`-mıştır` kaldı, çünkü tür akademik. Giden, olguya bir şey katmayan abartı: "çığır açan bir dönüm noktası", "en büyük kanıtıdır".

## Örnek 4: Kamu ve kurum içi yazışma

Önce:

> Dijital Dünyada Kaybolmadan: Gençlerde Ekran Bağımlılığında Erken Farkındalık ve Aile Desteği
>
> Teknolojinin günlük yaşamın merkezinde yer aldığı günümüzde, gençlerin ekran karşısında geçirdiği süre giderek artıyor. [...] İşte bu noktada, sorunu henüz derinleşmeden fark etmek hayati bir önem taşıyor. Uyku düzeninin bozulması, ders başarısında düşüş, yüz yüze iletişimden kaçınma ve ekran süresine müdahale edildiğinde aşırı öfkelenme gibi belirtiler, erken uyarı sinyalleridir. [...] Yasaklayıcı ve suçlayıcı yaklaşımlar yerine; anlayışlı, kapsayıcı ve ailece yürütülen bir değişim süreci çok daha kalıcı sonuçlar verir. Ailenin sürece dahil olması [...]

Sonra:

> Gençlerde Ekran Bağımlılığında Erken Farkındalık ve Aile Desteği
>
> Gençlerin ekran karşısında geçirdiği süre giderek artmaktadır. [...] Bu nedenle sorunun henüz derinleşmeden fark edilmesi büyük önem taşır. Gencin uyku düzeninin bozulması, ders başarısının düşmesi, yüz yüze iletişimden kaçınması ve ekran süresine müdahale edildiğinde aşırı öfkelenmesi gibi belirtiler erken uyarı işaretleridir. [...] Yasaklayıcı ve suçlayıcı yaklaşımlar yerine anlayışlı, kapsayıcı ve ailece yürütülen bir değişim süreci çok daha kalıcı sonuçlar verir. Ailenin sürece dâhil olması [...]

Adlaştırmalar, `-mektedir`, "süreç" ve "müdahale" yerinde kaldı. Değişenler: slogan başlık, sahne kuran giriş, "İşte bu noktada", "hayati", belirtiler listesinin biçimi (ad-eylemle yalın ad karışıktı), "yerine;" noktalı virgülü, "dahil" yazımı. "Gibi belirtiler" korundu: listeyi kapalı bir sayıma çevirmek kaynakta olmayan bir kesinlik eklerdi.

## Örnek 5: Denemede ritim

Bu örnek yalnızca blog, deneme ve öykü içindir. Öteki türlerde ritim için cümle sınırına dokunulmaz. Modelin ritim kusuru tek tek cümlelerde görünmez, paragrafın bütününde görünür. Burada dört cümlenin dördü de aynı boydaydı ve paragrafın kuruluşu zaten değişiyordu (dolgu ve karşıtlık kalıbı gidiyordu), cümle sınırları o sırada yeniden çizildi.

Önce (cümle boyları 18, 19, 18, 23 kelime):

> Modern insanın en büyük paradoksu, sınırsız özgürlük ve seçenek bolluğu içinde derin bir yersiz yurtsuzluk hissiyle kuşatılmış olmasıdır. Her şeyin hızla tüketildiği, kimliklerin bile anlık tercihlere indirgendiği bu sıvılaşmış çağda birey, varoluşsal bir ağırlık merkezine ihtiyaç duyar. İşte gelenek, tam da bu noktada bir sığınak veya kaçış alanı olarak değil, bir "zemin" olarak devreye girer. İnsana dünyaya fırlatılmış yalnız bir atom olmadığını, kendisinden önce başlayan ve kendisinden sonra da devam edecek olan büyük bir anlatının parçası olduğunu hatırlatır.

Sonra (cümle boyları 13, 5, 18, 7, 20 kelime):

> Modern insan sınırsız özgürlüğün ve seçenek bolluğunun ortasında derin bir yersiz yurtsuzluk duyuyor. En büyük paradoksu da bu. Her şeyin hızla tüketildiği, kimliklerin bile anlık tercihlere indirgendiği bu sıvılaşmış çağda birey varoluşsal bir ağırlık merkezi arar. Gelenek burada bir zemin olarak devreye girer. İnsana dünyaya fırlatılmış yalnız bir atom olmadığını, kendisinden önce başlayıp kendisinden sonra da sürecek büyük bir anlatının parçası olduğunu hatırlatır.

Nasıl yapıldı:

1. Cümlelerin kelime sayısı yazıldı. Dördü de birbirine yakındı.
2. İlk cümlenin yargısı kısa bir cümleye ayrıldı ("En büyük paradoksu da bu."). Bu cümle uydurulmadı, kaynaktaki "en büyük paradoksu" sözünden çıktı.
3. Süs atıldı, yargı kaldı: "İşte ... tam da bu noktada" dolgusu ve "sığınak değil, zemin" karşıtlığı gitti, "zemin" kaldı.
4. Kaynakta olmayan cümle eklenmedi.


<!-- references/olculer.md -->

# Ölçüler

Skill'deki "yazarlar şöyle yazar, modeller böyle" cümlelerinin dayandığı sayılar. Bir kuralın nereden geldiğini merak ettiğinde ya da kullanıcı sorduğunda buraya bak. Yazarken bu sayıları tutturmaya çalışma: bunlar tanı ölçüsüdür, hedef değildir.

Yazar tarafı doğrudan Türkçe yazılmış kitap, makale ve belgelerden gelir: roman ve öykü, deneme ve köşe yazısı, mektup ve günlük, psikoloji kitapları, akademik kitap ve makaleler, teknik belgeler, kamu raporları. 119 metinden örneklenmiş 1,1 milyon kelime. Çeviri kitap yoktur. Model tarafı altı dil modelinin (Gemini 4, Gemini Flash, GPT-OSS, Claude Haiku, Sonnet ve Opus) aynı türlerde, üslup yönlendirmesi verilmeden yazdığı 200 metindir. Metinler dört yüz kelimelik parçalara bölünüp parça parça ölçüldü. Yöntemin tamamı, sınırları ve deneyler depodaki `docs/olcumler.md` dosyasında.

## Türlere göre

Her hücrede önce yazarların, sonra modellerin değeri var.

| | Öykü, roman | Deneme, köşe | Açıklayıcı | Teknik | Akademik | Kamu |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Ritim | 0,48 / 0,40 | 0,48 / 0,33 | 0,41 / 0,32 | 0,46 / 0,33 | 0,46 / 0,27 | 0,46 / 0,27 |
| Ortanca cümle (kelime) | 8 / 11 | 10 / 14 | 14 / 12 | 12 / 15 | 18 / 22 | 22 / 20 |
| Altı kelime ve altı cümle | %37 / %26 | %29 / %11 | %14 / %8 | %17 / %7 | %11 / %2 | %4 / %2 |
| 28 kelime ve üstü cümle | %7 / %2 | %11 / %3 | %10 / %2 | %11 / %8 | %25 / %20 | %38 / %24 |
| Geçiş sözüyle başlayan cümle | %1 / %2 | %2 / %7 | %6 / %12 | %5 / %12 | %7 / %20 | %6 / %13 |
| Soru (bin kelimede) | 8 / 3 | 8 / 1,4 | 2,3 / 1,4 | 3 / 0,6 | 0,8 / 0 | 0 / 0 |
| Ünlem (bin kelimede) | 6 / 0,1 | 6 / 0,3 | 0,3 / 0 | 0,6 / 0 | 0,4 / 0 | 0 / 0 |
| Üç nokta (bin kelimede) | 6 / 0,5 | 10 / 0,5 | 1,9 / 0 | 2 / 0 | 0,4 / 0 | 0 / 0 |
| İki nokta (bin kelimede) | 4,6 / 1,9 | 6,4 / 1,7 | 6,3 / 1,8 | 17 / 2,9 | 5 / 0,3 | 2,8 / 0,4 |
| "… değil, …" (bin kelimede) | 0,7 / 1,1 | 1,1 / 3,8 | 0,9 / 3,4 | 0,1 / 0,6 | 0,4 / 1,8 | 0,1 / 1 |
| "A, B ve C" (bin kelimede) | 3,7 / 2,7 | 4,8 / 8,2 | 6,8 / 9,5 | 3,5 / 7,9 | 6,5 / 14,8 | 12,5 / 16,1 |
| `-mektedir` (yüz kelimede) | 0 / 0 | 0,1 / 0,1 | 0,3 / 0,1 | 0,3 / 0 | 0,8 / 1,5 | 1,1 / 1,7 |

Ritim, art arda gelen beş cümlenin boyunun ne kadar değiştiğini gösterir (değişim katsayısı, parçadaki ortanca). Hep on iki on dört kelimelik cümleler 0,06 verir, dört ile yirmi beş arasında gidip gelen cümleler 0,62. Geçiş sözü: *Ancak, Ayrıca, Bu nedenle, Sonuç olarak, Öte yandan, Birincisi, Son olarak* ve benzerleri. Şirket yazısı için yazar derlemimiz yok. Modellerin şirket yazısında ritmi 0,29, geçiş sözüyle başlayan cümle oranı %10.

## Tablodan çıkanlar

Ritim her türde ayırıyor. Resmî türlerde bile: kamu raporunun cümleleri uzundur ama boyları değişir, modelin yazdığı raporda hepsi aynı boydadır. Altı modelin ortancaları 0,27 ile 0,38 arasında, yazarların çoğu 0,45'in üstünde.

Model iki uçtan da kaçıyor. Serbest türlerde uzun cümle kurmuyor (deneme: yazarlarda yüz cümlenin on biri, modelde üçü yirmi sekiz kelimeyi geçiyor), bilgi veren türlerde kısa cümle kurmuyor (akademik: yazarlarda yüz cümlenin on biri, modelde ikisi altı kelimenin altında).

Model cümleyi geçiş sözüyle açıyor. Akademik metinde her beş cümleden biri böyle başlıyor, yazarlarda on dört cümleden biri. Bin cümlede sayınca en ayırt edici açılışlar: *Sonuç olarak, Son olarak, Üçüncü olarak, Bu doğrultuda, Bu sayede, Bir diğer, Önemli olan, Bunun yerine.* Yazarlarda bunlar yok denecek kadar az. Yazarların sık açılışları: *Ve, Ama, Çünkü, Hem, Hatta, Zaten, Evet, Hiç.*

Model soru sormuyor, ünlem ve üç nokta kullanmıyor. Deneme ve anlatıda yazarların bin kelimesinde sekiz soru var, modelde bir ile üç arası.

Karşıtlık ve üçleme model işi. "… değil, …" kalıbı denemede üç buçuk kat, "A, B ve C" sıralaması akademik metinde iki kat sık. Kamu dilinde üçlü sıralama yazarlarda da sıktır, orada iz sayılmaz.

`-mektedir` resmî türlerin malı. Akademik makalelerde yüz kelimede bir civarındadır, kamu raporunda biraz üstünde. Model bu türlerde yazarlardan da sık kullanıyor. Öteki türlerde yazarlarda da modelde de sıfıra yakın: bugünkü modeller blog yazısına `-mektedir` koymuyor, ama eski modellerin ve çeviri metinlerin izidir.

## Yazara göre değişenler

Devrik cümle. Anlatıda cümlelerin onda biri kadarı devriktir, ama oran kitaptan kitaba %2 ile %37 arasında oynar. Dönem değil yazar belirliyor: aynı yazarın iki kitabında bile yön tutmuyor. Yüklemden sonra kalan kısım yazarlarda beş devriğin dördünde bir iki kelimedir.

Noktalı virgül. Ortalamaya bakınca fark görünmüyor, çünkü birkaç yazar onu çok seviyor. Ortancaya bakınca görünüyor: deneme ve köşe yazısı parçalarının yarısından çoğunda hiç noktalı virgül yok, öyküde bin kelimede iki. Modellerin deneme ve öyküsünde ortanca beş. Model noktalı virgülü iki bağımsız cümleyi yapıştırmak için kullanıyor. Açıklayıcı, akademik ve kamu metninde yazarlar da kullanır (ortanca üç ile beş arası), orada iz sayılmaz.

`ama` öncesinde virgül. Yazarlar `ama`ların dörtte birinin önüne virgül koyuyor (%19-32). Kural değil, alışkanlık.

`ki` bağlacı. Yazarlar bin kelimede iki üç kez kullanıyor, modeller bir ya da hiç. Şüphe işareti değildir.

## Skor

`scripts/denetle.py` bu ölçülerden 0-100 arası bir yapay zekâ izi skoru hesaplar. Skor üç metin ailesi için ayrı kurulmuş birer lojistik regresyondur ve şöyle okunur: yazar ve model metni eşit sıklıkta gelseydi bu parçanın model yazısı olma olasılığı. Hiç görmediği kitap ve metinlerde sınandığında:

| | Yazar metni 50 ve üstü | Yazar metni 80 ve üstü | Model metni 50 ve üstü | Model metni 80 ve üstü |
| :--- | :--- | :--- | :--- | :--- |
| Öykü, roman, deneme | %13-23 | %3-10 | %84 | %66 |
| Açıklayıcı, teknik | %3-22 | %1-7 | %78 | %59 |
| Akademik, kamu | %6-8 | %3-5 | %91 | %81 |

Yani skor tek başına "bunu yapay zekâ yazdı" demeye yetmez: deneme yazarlarının her dört beş parçasından biri "orta" çıkıyor. Skoru hüküm vermek için değil, onarımın işe yarayıp yaramadığını görmek için kullan. Sekiz cümleden kısa metinde skor üretilmez.
