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
