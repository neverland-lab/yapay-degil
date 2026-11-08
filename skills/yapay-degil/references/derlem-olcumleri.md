# Derlem Ölçümleri: İnsan Türkçesi ve Dil Modeli Türkçesi

Skill'in ritim, noktalama ve devrik kurallarındaki sayılar bu dosyadan gelir. Ölçümleri Kasım 2026'da yaptık. Derlem birkaç turda büyüdü: Önce 24 roman ve deneme kitabıyla beş modelin metinleri ölçüldü, sonra akademik kitaplar, DergiPark makaleleri, kurum belgeleri, teknik metinler, çağdaş romanlar, psikoloji kitapları, köşe yazıları ve mektuplar eklendi. İnsan tarafı 145 metin, yaklaşık 2,7 milyon kelime. Kitapların metni telif yüzünden depoda yok, burada yalnızca toplu sayılar var.

| Parça | Metin | Kelime (yaklaşık) |
| :--- | :--- | :--- |
| Roman, öykü ve deneme (ilk derlem) | 22 yazarın 24 kitabı | 215.000 (örneklem) |
| Akademik kitap | 8 | 75.000 (örneklem) |
| DergiPark makalesi (2016-2019 ve 2026) | 44 | 253.000 |
| Kurum belgesi ve faaliyet raporu | 7 belge, 5 İBB raporu | 36.000 + rapor başına 8.000 |
| Teknik metin | 19 | 38.500 |
| Çağdaş roman ve öykü | 17 | 1.000.000 |
| Psikoloji (açıklayıcı metin) | 5 | 415.000 |
| Köşe yazısı | 5 yazar | 285.000 |
| Mektup, günlük, anı | 5 | 260.000 |
| Dil modeli metni | 5 modelden 40 | 17.000 |

## Yöntem

İlk derlem Türkçe yazmış 22 yazarın 24 kitabından oluşur: 17 kurmaca, 7 deneme, anı ya da inceleme. Çeviri kitapları bilerek almadık, çünkü çeviri Türkçesi skill'in temizlemeye çalıştığı izleri taşır. Kitapların tamamını değil, %20, %50 ve %80 noktalarındaki sekizer sayfayı ölçtük. Sayfası olmayan .txt ve .epub dosyalarında aynı noktalardan 4.000'er kelime aldık. Örneklem diyalog dâhil yaklaşık 215.000 kelime. Yazarlardan bazıları: Adalet Ağaoğlu, İhsan Oktay Anar, Oğuz Atay, Fakir Baykurt, Halide Edib Adıvar, Memduh Şevket Esendal, Sait Faik Abasıyanık, Cemil Meriç, Murathan Mungan, Aziz Nesin, Ömer Seyfettin, Orhan Pamuk (iki kitap), Peyami Safa (iki kitap), Sabahattin Ali, Kemal Tahir, Ahmet Hamdi Tanpınar, Hasan Ali Toptaş, Ayfer Tunç, Ahmet Ümit, Çetin Altan, Attila İlhan.

Akademik derlem aynı yöntemle ölçülen 8 kitaptır. Tarih, felsefe, siyaset bilimi, iktisat ve bilim tartışması alanlarından Bahriye Üçok, Ahmet Cevizci, Tarık Zafer Tunaya, Doğan Avcıoğlu, Asaf Savaş Akat, İsmail Cem, Ahmet Yüksel Özemre ve Aydın Topaloğlu'nun kitapları. Örneklem yaklaşık 75.000 kelime. Kitaplar 1960'lardan 2000'lere uzanıyor, çoğu 2000 öncesi. Bugünkü dergi makalesinin dilini tam temsil etmedikleri için makaleleri ayrıca ölçtük (aşağıda).

Model derlemi için beş modele aynı 8 isteği verdik: 4 kurmaca, 4 deneme, her biri 400-500 kelime civarı. Modeller Gemini 4 Argon, Gemini 3.8 Flash, GPT-OSS 120B, Claude Sonnet 5.5 ve Claude Opus 5.5. İsteklerde "doğal yaz" ya da "yapay yaz" gibi bir yönlendirme yoktu.

Ölçümde diyalog paragraflarını çıkarıp yalnızca anlatı cümlelerini saydık. Ritmi, metin boyunca art arda gelen her beş cümlelik pencerede cümle uzunluğunun değişim katsayısıyla (CoV) ölçtük. Kitaplardan çıkarılan metinde paragraf sınırları güvenilir olmadığı için paragrafa dayalı ölçüm kullanmadık. Bazı dosyalarda satırlar sabit genişlikte kırılmıştı. Cümleler ortadan bölünmesin diye noktalamayla bitmeyen satırları ölçümden önce bir sonrakiyle birleştirdik. İlk ölçümde bu adım yoktu. Eklenince kurmaca değerleri neredeyse hiç değişmedi, deneme değerleri değişti: Ortanca cümle 10 kelimeden 12'ye, 15-22 kelime bandı %17'den %23'e çıktı.

Ölçümler düzenli ifadeye dayanan sezgisel sayımlardır, biçim bilgisi (morfoloji) çözümleyicisi kullanmadık. Devrik cümle sezgiseli 40 cümlelik bir doğrulama setinde bağımsız bir okurla %75 uyuştu. Devrik oranlarını bu yüzden kesin değer olarak değil, metinleri birbiriyle karşılaştırmak için kullanıyoruz.

## Sonuçlar (ortanca değerler)

| Ölçüm | İnsan kurmaca | İnsan deneme | İnsan akademik | Uzun ve tekdüze modeller (Gemini 4 Argon, Gemini 3.8 Flash, GPT-OSS) | Kısa ve tekdüze modeller (Claude Sonnet, Claude Opus) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Ortanca cümle uzunluğu (kelime) | 8 | 12 | 14,5 | 12,5-18 | kurmaca 6,5-7, deneme 10,5 |
| 15-22 kelime bandındaki cümle oranı | %14 | %23 | %25 | %29-49 | %3-13 |
| 6 kelime ve altı cümle oranı | %37 | %17 | %16 | %0-13 | %18-50 |
| 5 cümlelik pencerede CoV (cümle uzunluğu değişim katsayısı) | 0,49 | 0,46 | 0,47 | 0,28-0,41 | 0,35-0,40 |
| CoV'si 0,40'ın altında kalan pencere oranı | %33 | %36 | %33 | %47-90 | %51-76 |
| Devrik cümle oranı (sezgisel) | %9,5 | %7 | ölçülemedi (bkz. 7. not) | %1-8 | %3-7 |
| Soru işareti (1000 kelimede) | 13,0 | 3,3 | 1,1 | 0-2,3 | 0-1,5 |
| Ünlem (1000 kelimede) | 6,7 | 0,6 | 0,2 | 0 | 0 |
| Üç nokta (1000 kelimede) | 9,0 | 0,8 | 0,3 | 0-1,2 | 0 |
| İki nokta (1000 kelimede) | 7,1 | 5,6 | 4,9 | 0-6,7 | 1,2-4,0 |
| Noktalı virgül (1000 kelimede) | 2,5 | 2,0 | 5,6 | 6,7-17,9 | 0-5,1 |
| `ki` bağlacı (1000 kelimede) | 2,7 | 3,5 | 1,6 | 0-1,2 | 1,2-1,3 |
| `olarak` (1000 kelimede, deneme ve akademik) | - | 3,2 | 3,4 | 2,6-8,2 | 3,8 |
| Cümle sonu `-DIr` oranı (deneme ve akademik) | - | %12 | %25 | %15-24 | %16 |
| `-mAktAdIr` (100 kelimede) | 0 | 0,02 | 0,35 | 0 | 0 |

## Notlar

1. Modelleri yazarlardan ayıran ortak iz cümle uzunluğunda görünmüyor, ritimde görünüyor. Bütün modellerde art arda gelen cümlelerin boyu yazarlarınkinden daha az değişiyor. Yazarlara en yakın olanlar Claude Opus ile Gemini Flash (kurmacada 0,40-0,41), en uzak olanlar GPT-OSS ile Gemini 4'ün denemeleri (0,29-0,31). Modellerin bir kısmı uzun cümlelere, bir kısmı kısa cümlelere yığılıyor. Skill'in ritim kuralı bu yüzden kısa cümle eklemeyi değil, ardışık cümlelerin boyunu çeşitlendirmeyi istiyor.
2. Cümlelerin 15-22 kelime bandına yığılması Gemini ve GPT tipi modellerde görülüyor. Claude tipi modeller kurmacada yazarlardan da kısa cümle kuruyor.
3. Modeller anlatıda soru, ünlem ve üç noktayı neredeyse hiç kullanmıyor. Türk yazarların anlatısında üçü de olağan.
4. Noktalı virgülü tek başına yapay zekâ işareti saymak yanlış olur. Bazı yazarlar onu sık kullanıyor, birinde 1000 kelimede 14'e çıkıyor. Yine de Gemini ve GPT tipi modellerde sıklık yazarlarınkinin 2-6 katı.
5. `ki` bağlacı da şüphe işareti sayılmamalı. Yazarlar onu modellerden sık kullanıyor, çoğunlukla kalıplaşmış biçimlerde: *demek ki, öyle ki, kaldı ki, dedi ki*.
6. Sözlükteki klişelerin ayırt ediciliği modelden modele değişiyor. *Söz konusu* ve *dönüm noktası* hiçbir modelde sık değil. *Öte yandan* ve *Bununla birlikte* GPT-OSS ile Claude Sonnet'te cümle başında sık, Gemini'de seyrek. Modelleri en tutarlı ayıran iki şey ritim ve cümleye geçiş sözüyle başlama alışkanlığı (*Oysa, Ancak, Sonuç olarak*).
7. Akademik kitaplar cümle boyunda modellere yaklaşıyor, ritimde yaklaşmıyor. 15-22 bandı %25 (en yüksek kitapta %30), noktalı virgül 1000 kelimede 5,6 (kitaplar arasında 0,8-8,5). Akademik metinde bu iki ölçüt tek başına yapay zekâ işareti sayılmamalı. Pencere CoV'si ise kurmaca ve denemeyle aynı düzeyde: ortanca 0,47, kitaplar arasında 0,42-0,55. Akademik metinde de en güvenilir ölçüt ritim. Devrik sezgiseli bu kitaplarda %5-8 verdi, ama elle baktığımız 25 örneğin neredeyse hepsi yanlıştı. Dipnot numaraları, kaynak gösterimleri ve yüklemi düşmüş ad cümleleri devrik sayılmıştı. Gerçek devrikler yalnızca alıntılanan şiir çevirilerindeydi. "Akademik metinde devrik kullanılmaz" kuralını bu yüzden koruduk. `-mAktAdIr` bu kitaplarda beklediğimizden seyrek çıktı: 100 kelimede ortanca 0,35, en yüksek 1,4. Kitapların çoğu eski olduğu için bu sayıyı bugünkü makale dili için alt sınır saymak gerekir.

## Akademik Makale Ölçümü (DergiPark)

Akademik kitapların çoğu eski olduğundan güncel makaleleri de ölçtük. DergiPark'ın açık arşivinden iki örneklem aldık, her dergiden bir makale. Alanları karışık tuttuk: hukuk, tarih, eğitim, tıp, ziraat, iktisat, matematik, sosyoloji, ilahiyat. İlk örneklem ChatGPT'den önce, 2016-2019 arasında yayımlanmış 19 makale (yaklaşık 106.000 kelime). İkincisi 2026'da yayımlanmış 25 makale (yaklaşık 147.000 kelime). Yalnızca "Giriş" ile "Kaynakça" arasındaki gövdeyi ölçtük, İngilizce özet satırlarını, tabloları ve parantez içi atıfları çıkardık.

| Ölçüm | Makale 2016-2019 | Makale 2026 | Akademik kitap |
| :--- | :--- | :--- | :--- |
| `-mAktAdIr` (100 kelimede) | 1,0 (çeyrekler 0,5-1,2) | 1,0 (çeyrekler 0,6-1,6) | 0,35 |
| Ortanca cümle uzunluğu (kelime) | 18 | 19 | 14,5 |
| 15-22 kelime bandı | %26 | %30 | %25 |
| 5 cümlelik pencerede CoV | 0,46 | 0,42 | 0,47 |
| Cümle sonu `-DIr` oranı | %23 | %13 | %25 |
| Cümle sonu `-mIştIr` oranı | %17 | %22 | %15 |
| Art arda aynı ekle biten en uzun cümle serisi | 5 (çeyrekler 5-6) | 8 (çeyrekler 5-12) | - |
| Art arda üç `-mAktAdIr` serisi bulunan makale | 19'da 14 | 25'te 19 | 8'de 5 |
| Noktalı virgül (1000 kelimede) | 3,7 | 3,6 | 5,6 |

Skill'in akademik metin için verdiği `-mAktAdIr` aralığı (100 kelimede 0,5-2,5) makalelerle uyuşuyor, iki örneklemde de ortanca 1,0. Kitaplardaki düşük değer (0,35) türden geliyor, makale dili kitap dilinden daha resmî.

Art arda üç cümlenin aynı ekle bitmesi akademik yazıda olağan. ChatGPT öncesi makalelerin çoğunda üçlü `-mAktAdIr`, `-mIştIr` ya da `-DIr` serisi var. "Art arda üç cümle aynı ekle bitmez" kuralını bu yüzden akademik metin için kaldırdık. Dedektör akademik metinde yedi ve üstü seriyi işaretliyor. Bu sınırla 2016-2019 makalelerinin 19'undan 3'ü, 2026 makalelerinin 25'inden 19'u uyarı aldı.

2026 makaleleri ChatGPT öncesi makalelerden farklı yazılmış. Cümle sonunda `-DIr` oranı yarıya inmiş (permütasyon testinde p<0,001), aynı ekle biten seriler uzamış (p≈0,02), pencere CoV'si düşmüş (p≈0,07). Bu, yapay zekâ destekli yazımın izi olabilir. Ama örneklemler küçük ve alan dağılımları birebir eşleşmiyor, o yüzden bunu kanıt değil gözlem olarak kaydediyoruz. Akademik metinde insan ölçütü olarak 2026 makalelerini değil, 2016-2019 makalelerini kullanıyoruz.

## Skill Uygulanınca Ne Değişiyor?

Aynı ölçümleri skill'le yazılmış ve onarılmış metinlere de uyguladık. Model her denemede skill'in tam metnini istemde gördü.

### Sıfırdan yazma (Gemini 4, 8 istek)

| Ölçüm | İnsan (kurmaca ve deneme, 24 kitap) | Gemini, skill'siz | Gemini, skill ile |
| :--- | :--- | :--- | :--- |
| 5 cümlelik pencerede CoV | 0,48 | 0,33 | 0,45 |
| CoV'si 0,40'ın altında kalan pencere | %33 | %80 | %30 |
| 15-22 kelime bandı | %17 | %37 | %32 |
| 6 kelime ve altı cümle | %33 | %6 | %23 |
| Soru işareti (1000 kelimede) | 8,2 | 0 | 4,7 |
| `ki` (1000 kelimede) | 2,7 | 0 | 2,4 |
| Noktalı virgül (1000 kelimede) | 2,3 | 7,6 | 6,8 |

Skill sıfırdan yazarken ritmi ve noktalama çeşitliliğini insan düzeyine yaklaştırıyor. Tekrarlarda da sonuç değişmedi. Gemini 4'le ikinci çalıştırmada pencere CoV'si 0,44, 15-22 bandı %19 çıktı. Gemini Flash'ta pencere CoV'si 0,31'den 0,44'e çıktı, 15-22 bandı %41'den %17'ye indi. Claude Sonnet'te pencere CoV'si 0,36'dan 0,45'e yükseldi, CoV'si 0,40'ın altında kalan pencereler %62'den %36'ya düştü (yazarlarda %33), soru işareti 1000 kelimede 1,2'den 5,8'e çıktı.

İki yan etki gördük. Flash devrik cümleyi abarttı: Cümlelerin %29'u devrikti, yazarlarda bu oran %8-9. Noktalı virgül ise skill açıkça sınır koymasına rağmen azalmadı (1000 kelimede 6,8-10), bazı modellerde bu alışkanlık kuraldan güçlü çıkıyor. Skill'in derlem sayılarını ve ritim örneğini içeren sonraki sürümüyle Gemini 4 iki kez daha yazdı. Noktalı virgül 1000 kelimede 8,7'den 3,9'a ve 5,7'ye indi, pencere CoV'si 0,45-0,49 oldu, ama devrik oranı %14-15'e çıktı (yazarlarda %9,5). Modele devrik cümlelerini saydırıp sınırı aşanları düzelttiren bir talimat denedik. Oran değişmedi, talimatı eklemedik.

Skill'le yazan modellerin devrikleri biçim olarak yazarlarınkine benziyor. Yüklemden sonraki kuyruk devriklerin %76-93'ünde bir iki kelime, yazarlarda %83. Fark sıklıkta: Gemini 4'te %11-14, Flash'ta %29, Claude Sonnet'te %8, yazarlarda %9. Körlemesine okur skill'in iki sürümünü 4-4 berabere sıraladı, skill'siz metin 8 isteğin 8'inde sonuncu oldu.

### Akademik yazma (Gemini 4, 4 istek: tarih, felsefe, sosyoloji, iktisat)

Skill'siz Gemini akademik metni çok düz yazdı. Pencere CoV'si 0,23 çıktı, pencerelerin hepsi 0,40'ın altındaydı. Ortanca cümle 24 kelime, cümlelerin %74'ü `-mIştIr` ile bitiyor (yazarlarda %14), cümle başlarında sık sık *Sonuç olarak* ve *Öte yandan* var. Skill'le iki çalıştırmada pencere CoV'si 0,35-0,36'ya çıktı, ama model bu kez bütün uzun cümleleri orta boya indirdi. 28 kelimeyi aşan cümleler %35'ten %3-4'e düştü (yazarlarda %17), 15-22 bandı %38-44'te kaldı.

Bunun üzerine skill'e "akademik metinde uzun cümleyi koru, yanına kısa cümle koy" notunu ekleyip denedik. Üç çalıştırmada pencere CoV'si 0,39-0,42, uzun cümle oranı %6-12 oldu. Sayılar düzeldi ama okur metni daha doğal bulmadı. Körlemesine okur (akademik editör gözüyle okuyan Gemini) üç sıralamada notsuz skill metnini 12 karşılaştırmanın 9'unda birinci seçti. Notun son sürümü girdiği 8 karşılaştırmanın hiçbirinde birinci olmadı. Okur, ritim için eklenen kısa cümleleri ("Öğrenme süreci böyle işler.") mekanik buldu, tarih anlatısının geniş zamana kaymasını da kusur saydı. Notu skill'e eklemedik: Akademik metinde ritim değişkenliğini zorlamak kaliteyi artırmıyor. Skill'siz metin ise 8 karşılaştırmanın 7'sinde sonuncu oldu, yani skill akademik metinde de işe yarıyor.

### Onarım (Gemini 4 onarıcı, 8 metin)

Kaynak metinlerde pencere CoV'si 0,34'tü. Skill'in eski sürümüyle onarınca 0,38, ritim örneği eklenmiş sürümle iki ayrı çalıştırmada 0,39 ve 0,44 oldu. Onarımda etki yazmaya göre küçük ve çalıştırmadan çalıştırmaya değişiyor, çünkü onarıcı kaynağın cümlelerine bağlı kalıyor. Etki kaynağa göre de değişiyor: Claude Opus metinlerinde pencere CoV'si 0,38'den 0,43'e, GPT-OSS metinlerinde 0,31'den 0,33'e çıktı.

Onarıcı model de sonucu belirliyor. Aynı 8 metni Claude Sonnet onardığında pencere CoV'si yerinden oynamadı (0,34'ten 0,33'e), Gemini onardığında 0,38-0,44'e çıktı. Sonnet onarırken kaynak cümlelere çok sadık kalıyor. Bu sadakat için iyi, ritim için değil. Ritmin de düzelmesi isteniyorsa kullanıcının açıkça "cümle boylarını da düzelt" demesi gerekebilir. Onarıcının kendi alışkanlıkları da metne sızıyor: Gemini, hiç noktalı virgül içermeyen Opus metinlerine noktalı virgül ekledi.

### Kalite ve sadakat

Sıfırdan yazmada aynı isteğe skill'siz ve skill'le yazılmış Gemini metinlerini bağımsız bir model okura (yine Gemini) etiketsiz verdik. Okur 8 isteğin 8'inde skill'le yazılmış metni daha doğal buldu. Onarımda aynı okur kaynakla onarılmış sürümü körlemesine sıraladı, onarılmış sürüm 8 metnin 7'sinde öne geçti.

Skill'e "ritim kontrolü onarımda da geçerli" talimatını ekledikten sonra aynı 8 metni Gemini'ye yeniden onarttık ve eski onarımla birlikte körlemesine sıralattık. İki sürüm 4-4 berabere kaldı, kaynak metin hiçbir sıralamada birinci olmadı. Ritim aynı düzeyde kaldı (pencere CoV'si 0,44 ve 0,43). Yeni sürümde noktalı virgül yarıya indi (1000 kelimede 5,3'ten 2,8'e), devrik oranı %12'den %7'ye geriledi. Ritmi zorlayan sürüm her zaman daha doğal bulunmadı, çünkü ritim için yeniden kurulan cümlelerde yeni hatalar çıktı. Skill'deki "ritim için yeni ifade icat etme" uyarısı bu yüzden var.

Sadakat denetiminde 8 onarımın 5'i temiz çıktı, 3'ünde küçük bilgi kaybı vardı. Kayıpların ikisi kuralların yan etkisiydi (negatif paralellik ve kapanış kuralları). İki kurala da sınır ekledik.

## Çağdaş Roman Ölçümü

İlk derlemin çoğu 20. yüzyıl yazarı olduğu için 17 roman ve öykü kitabını ayrıca ölçtük (EPUB, yaklaşık bir milyon kelime). 13'ü 2000 sonrası: Hakan Günday, Sema Kaygusuz, Ayfer Tunç, Barış Bıçakçı, Emrah Serbes, Ahmet Ümit, Zülfü Livaneli, İhsan Oktay Anar, Burhan Sönmez, Ayşe Kulin, Elif Şafak (*Mahrem*), Murathan Mungan (*Çador*), Hasan Ali Toptaş (*Heba*). Karşılaştırmak için aynı yazarların eski kitaplarını da ölçtük (Orhan Pamuk, Mungan, Toptaş). Bundan önce de iki çağdaş romandan (Alev Alatlı, Ayla Kutlu) örnek almıştık. İkisinde de pencere CoV'si 0,50, soru işareti 1000 kelimede 8-15 çıkmıştı.

2000 sonrası kitaplarda ortanca cümle 8 kelime (eski derlemde 10,5), 1-6 kelimelik cümleler %40 (eskide %25). Pencere CoV'si 0,45, eskiyle aynı. Cümleler kısalmış ama ritim değişmemiş.

Devrik oranının ortancası %13 (eskide %8), ama kitaptan kitaba çok oynuyor: Sönmez'de %4, Toptaş'ın *Heba*'sında %37. Aynı yazarın eski ve yeni kitabını karşılaştırınca yön tutarsız çıkıyor. Pamuk *Cevdet Bey ve Oğulları*'nda (1982) %4, *Kafamda Bir Tuhaflık*'ta (2014) %12. Toptaş %17'den %37'ye çıkıyor, Mungan %26'dan %13'e iniyor. Devrik oranını dönem değil yazar ve kitap belirliyor. Skill'deki "kullanıcının örneği yoksa on cümlede birden fazla devrik kurma" varsayılanını bu yüzden değiştirmedik.

## Açıklayıcı Metin Ölçümü (Psikoloji)

Ders kitabıyla popüler bilim arasındaki türü ölçmek için Türkçe yazılmış beş psikoloji kitabı aldık (yaklaşık 415.000 kelime): Doğan Cüceloğlu, Üstün Dökmen, Engin Geçtan, Çiğdem Kağıtçıbaşı ile Zeynep Cemalcılar, Serol Teber. Ortanca cümle 12 kelime. 15-22 bandı %25, öbür türlerden yüksek. 28 kelimeden uzun cümleler %6,5. Pencere CoV'si 0,435 (kitaplar arasında 0,38-0,48), edebî metinden daha tekdüze. `-mAktAdIr` 100 kelimede 0,39, edebî metin (yaklaşık 0) ile akademik makale (yaklaşık 1,0) arasında. Cümlelerin %16'sı `-DIr`, %7'si `-mIştIr` ile bitiyor. Devrik %4. Noktalı virgül 1000 kelimede 3,9 (2,9-10,7), iki nokta 7,6. Skill'in ritim ve noktalı virgül kurallarına açıklayıcı metin için bu aralıkları ekledik.

## Köşe Yazısı ve Mektup Ölçümü

Blog ve sosyal medya yazısına en yakın yerli tür köşe yazısı. Beş yazarın köşe yazısı derlemesini ölçtük (yaklaşık 285.000 kelime): Murat Menteş, Attila İlhan, Çetin Altan, Cemal Süreya'nın *Günler*'i ve 2000'lerden bir magazin köşesi. Ortanca cümle 8 kelime, 1-6 kelimelik cümleler %39, pencere CoV'si 0,46, devrik %12. 1000 kelimede yaklaşık 11 soru, 9 üç nokta, 7 iki nokta ve 4 ünlem var. Denemeye göre soru üç kat, üç nokta üç dört kat fazla.

Mektup, günlük ve anı için beş kitap ölçtük (yaklaşık 260.000 kelime): Oğuz Atay'ın *Günlük*'ü, Tezer Özlü'nün *Kalanlar*'ı, Sabahattin Ali'nin mektupları, Refik Halit'in *Minelbab İlelmihrab*'ı ve Orhan Pamuk'un *İstanbul*'u. Değerler edebî anlatıya yakın: ortanca cümle 9 kelime, pencere CoV'si 0,48, devrik %13, 1000 kelimede yaklaşık 4,5 soru ve 4 iki nokta.

Bu derlemlerde `ama`dan önceki virgüle de baktık. Türk yazarlar `ama`ların %19-32'sinin önüne virgül koyuyor (çağdaş romanda %30, mektupta %32, köşe yazısında %19). Beş modelin metinlerinde bu oran %18, skill'in eski kuralıyla yazılmış metinlerde %8. Eski kural insan yazısında olağan bir özelliği siliyordu, kaldırdık.

## Kurum Dili Ölçümü

Kurum dili için 7 kamu belgesi ölçtük: iki belediye faaliyet raporu, iki Sayıştay denetim raporu, bir yönerge, bir mevzuat metni ve bir RAM raporu, toplam yaklaşık 36.000 kelime. Ortanca cümle 20 kelime, cümlelerin %35'i 28 kelimeden uzun, devrik %2. Cümlelerin %34'ü `-mIştIr` ile bitiyor, aynı ekle biten en uzun seri ortanca 9 cümle. Skill kurum yazışmasında ritim kuralını ve "art arda aynı ek" sınırını bu yüzden uygulamıyor.

Bu özelliklerin yapay zekâdan önce de var olup olmadığına bakmak için İstanbul Büyükşehir Belediyesinin 2018, 2019 ve 2020 faaliyet raporlarını 2024 raporlarıyla (Kayseri, Kozan) aynı yöntemle örnekledik, her rapordan yaklaşık 8.000 kelime düz yazı. Eski raporlarda ortanca cümle 21-24 kelime, cümlelerin %34-40'ı 28 kelimeden uzun, %31-44'ü `-mIştIr` ile bitiyor. Aynı ekle biten en uzun seri 8-13 cümle, `-mAktAdIr` 100 kelimede 1,1-1,3. 2024 raporları da aynı aralıkta: ortanca cümle 19-20, `-mIştIr` %18-37, seri 10-15, `-mAktAdIr` 0,7-1,1. Kurum farkını ayırmak için İBB'nin 2023 ve 2024 raporlarına da baktık, sonuç değişmedi: ortanca cümle 22-23, `-mIştIr` %35-42, `-mAktAdIr` 1,2-1,3. Model metinlerinde sık görülen kalıplar (*bu bağlamda*, *kritik*, *öte yandan*) iki dönemde de 1000 kelimede 0,2'nin altında. Kurum dilinin bu özellikleri yapay zekâdan önce de vardı. Faaliyet raporlarındaki noktalı virgül (1000 kelimede 3-12) liste ve sıralama ayıracı olarak kullanılıyor.

## Teknik Metin Ölçümü

Doğrudan Türkçe yazılmış 19 teknik belge ölçtük (yaklaşık 38.500 kelime): dört MEB mesleki eğitim modülü, Fırat Özgül'ün Python kitabından iki bölüm, sekiz yerli geliştirici blog yazısı, iki kurum kılavuzu (KVKK, ODTÜ), üç Pardus ve Ubuntu Türkiye belgesi. Belge ortancaları şöyle: cümle 10 kelime, 15-22 bandı %16, 28 kelimeden uzun cümle %3. `-mAktAdIr` 100 kelimede 0,29, en yüksek KVKK'da 0,97, hiçbir belge 1,0'ı geçmiyor, kitap bölümlerinde hiç yok. Cümlelerin %15'i `-DIr` ile bitiyor (kurum kılavuzlarında %31), `-mIştIr` %2, noktalı virgül yok.

Bu sayılar skill'in teknik metin kuralını (`-mAktAdIr` yerine `-Ar/-Ir`, tanımda `-DIr` kalır) ve dedektördeki 0-1,0 aralığını destekliyor. Kısa ortanca cümlenin bir kısmı başlıklardan ve liste maddelerinden geliyor. Devrik sezgiseli bu metinlerde işe yaramadı: Devrik sayılan cümlelerin hepsi tablo artığı ya da PDF'in böldüğü kelimelerdi.

## Sınırlamalar

Model tarafı küçük: beş modelden 40 metin, yaklaşık 17.000 kelime. Modellerle ilgili sayılar yön gösterir, kesin değildir.

Ölçümler sezgisel. Cümle ve devrik tespiti düzenli ifadeyle yapıldı, biçim bilgisi çözümleyicisi kullanılmadı. Devrik sezgiseli edebî metinde bağımsız okurla %75 uyuşuyor, akademik ve teknik metinde güvenilmez.

OCR ve PDF çıkarımından gelen hataları temizledik ama hepsini gideremedik. Çıkarımı bozuk olan dört kitabı ilk derlemden çıkardık. Sonraki turlarda da editör notu karışmış ya da OCR'ı çok bozuk kitapları almadık.
