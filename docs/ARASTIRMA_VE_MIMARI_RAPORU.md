# Skill'in dayandığı araştırma

Bu not, skill'in ilk hâli kurulurken yapılan araştırmayı özetliyor. Üç konuya bakıldı: dil modellerinin Türkçesinde hangi yapıların bozulduğu, başka dillerde ve Türkçede yazılmış benzer projelerin nasıl çalıştığı, skill'in hangi standartla paketleneceği. Kurallardaki sayıların nereden geldiği ayrı bir dosyada: [`references/derlem-olcumleri.md`](../references/derlem-olcumleri.md). O ölçümler bu araştırmadan sonra yapıldı ve ilk kuralların bir kısmını değiştirdi.

## 1. Modellerin Türkçede bozduğu yapılar

Dil modelleri ağırlıkla İngilizce metinle eğitiliyor. Türkçe yazarken kelimeyi Türkçe seçiyorlar ama cümleyi çoğu zaman İngilizce gibi kuruyorlar. Türkçe sondan eklemeli bir dil, yan cümleyi de ismin soluna koyuyor. İngilizce ise yan cümleyi ismin sağına takıyor. Sorunların çoğu bu farktan çıkıyor.

1. Yan cümlenin yeri. İngilizcede *"We built a system that scans data"* denir. Model bunu *"Bir sistem kurduk, bu sistem verileri tarıyor"* ya da *"Öyle bir sistem kurduk ki..."* diye aktarıyor. Türkçede sıfat-fiil (`-An, -DIk, -AcAk`) yan cümleyi ismin önüne alır: *"Verileri tarayan bir sistem kurduk."*
2. `ve` yerine ulaç. İngilizce art arda gelen eylemleri `and`, `then`, `when`, `as` ile bağlar. Türkçe ise iki eylem arasındaki ilişkiyi çoğu zaman ulaçla kurar (`-Ip, -IncA, -dIkçA, -ArAk, -mAdAn`): *"Veriyi çekip işledik"*, *"Önbellek dolunca istekler yavaşladı"*.
3. `-DIr` ve `-mAktAdIr` yığılması. İngilizcede ad cümlesinde `is/are` zorunlu. Bu alışkanlık model çıktısında cümlelerin `-DIr` ya da `-mAktAdIr` ile bitmesine yol açıyor. Türkçede geniş zamanlı ad cümlesi çoğu zaman eksiz kurulur, bu ekler akademik ve resmî yazı dışında seyreltilir.
4. Vurgu. Türkçede bir ögeyi vurgulamak için onu yüklemin hemen önüne getirmek yeter. Kalın yazı ya da *"İşte tam da bu noktada"* gibi dolgular buna gerek bırakmaz.
5. Gereksiz zamir ve `bir`. Yüklemdeki kişi eki özneyi zaten taşıdığı için `ben, biz, o` çoğu zaman fazladır. İngilizce `a/an`'ın karşılığı olarak soyut isimlerin önüne konan `bir` de öyle: *"büyük bir önem"* yerine *"büyük önem"*.
6. Edilgen çatı ve kof fiiller. *"Ekibimiz tarafından gerçekleştirilmiştir"* gibi edilgen yapılar ve `gerçekleştirmek, sağlamak, katkıda bulunmak, sahip olmak, ev sahipliği yapmak` gibi şişirilmiş fiiller doğrudan eylem fiiliyle yazılabilir.
7. `-mIş` kipi. Görülmeyen, kayıttan okunan ya da sonradan fark edilen olaylarda Türkçe `-DI` yerine `-mIş` kullanır: *"Sunucu gece yeniden başlamış."*

## 2. Benzer projeler

| Proje | Yaklaşımı | Bu skill'e geçen |
| :--- | :--- | :--- |
| [Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) | Şişirme, negatif paralellik ve yüzeysel `-ing` çözümlemeleri gibi yapay yazı işaretlerinin sınıflandırması | Kompozisyon ve söz sanatı kalıplarının yasaklandığı ilk katman |
| [blader/humanizer](https://github.com/blader/humanizer) | 25 kural, ağırlığa göre sıralama, işaretle-yaz-denetle döngüsü | Dört adımlı çalışma düzeni, tek görülmede tetiklenen kuralla sıklıkla tetiklenen kuralın ayrılması |
| [conorbronsdon/avoid-ai-writing](https://github.com/conorbronsdon/avoid-ai-writing) | Üç katmanlı kelime tabloları, yazma, denetleme ve düzeltme modları, `dist/` paketi | Üç katmanlı sözlük, çalışma modları, `dist/` ve Cursor kuralıyla paketleme |
| [durmazoguzhan/turkish-humanify](https://github.com/durmazoguzhan/turkish-humanify) | Türkçe cümle yapısı, metin türüne göre doz, ek uyumu, bilgi uydurmama ilkesi | Sola dallanma, ulaçlar, metin türleri, bilgi eklememe ilkesi |
| [oguzhankayan/turkish-native](https://github.com/oguzhankayan/turkish-native) | Arayüz ve ürün metni çeviri kalıpları, aşırı düzeltmeyi önleme | Tier-3 ürün ve pazarlama tablosu, doğal ifadelere dokunmama uyarıları |
| [bushrabeg/turkce-humanizer](https://github.com/bushrabeg/turkce-humanizer) | TDK noktalama kaynağı ve kesin noktalama yasakları | Noktalama kuralları ve yazar profiline göre ayar |

İlk sürümde beş metin türü vardı. Sonradan kamu ve kurum içi yazışma eklendi, şu an altı tür var.

## 3. Paketleme

Skill, [Agent Skills belirtimine](https://agentskills.io/specification) göre paketlendi. `SKILL.md` kısa tutuluyor ve yalnızca çalışma adımlarını içeriyor. Ayrıntılı kurallar ve tablolar `references/` altında duruyor, model onlara gerektiğinde bakıyor. Kökteki `SKILL.md` ile `skills/yapay-degil/` paketi birlikte durduğu için skill `npx skills`, `gh skill` ve Claude Code eklenti sistemiyle kurulabiliyor.
