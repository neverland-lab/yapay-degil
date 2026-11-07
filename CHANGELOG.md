# Değişiklik günlüğü

Her sürümde neyin değiştiği burada yazar. Sürüm numaraları şöyle artar: kuralları ya da kurulum adını değiştiren büyük adımda ilk sayı, yeni kural ya da ölçümde ortadaki sayı, düzeltmede sondaki sayı.

## 1.1.0 (7 Kasım 2026)

Ölçümler:
- Teknik metin derlemi eklendi: doğrudan Türkçe yazılmış 19 belge, yaklaşık 38.500 kelime (MEB mesleki eğitim modülleri, Fırat Özgül'ün Python kitabı, yerli geliştirici blogları, KVKK ve ODTÜ kılavuzları, Pardus ve Ubuntu Türkiye belgeleri). Teknik register satırı ve dedektördeki `-mAktAdIr` aralığı (100 kelimede 0-1,0) bu ölçümle doğrulandı, kural değişmedi.
- Kurum dili için yapay zekâ öncesi karşılaştırma: İBB'nin 2018-2020 faaliyet raporları 2024 raporlarıyla aynı yöntemle ölçüldü. Uzun cümle, `-mIştIr` serisi ve `-mAktAdIr` değerleri iki dönemde aynı aralıkta. Kamu register'ının dayandığı ölçümler bu yüzden geçerli.

## 1.0.0 (7 Kasım 2026)

yapay-degil'in ilk sürümü. Proje [yucezerey/turkish-anti-ai-skill](https://github.com/yucezerey/turkish-anti-ai-skill) deposundan doğdu, bu sürümle ayrı bir ad ve depoyla sürüyor.

Ölçümler:
- Kuralların dayanağı olarak bir derlem kuruldu: 22 yazarın 24 kitabı, 8 akademik kitap, 2 çağdaş roman, 44 DergiPark makalesi, 7 kamu belgesi ve beş dil modelinin metinleri. Bütün sayılar `references/derlem-olcumleri.md` dosyasında.
- Ritim kuralı artık "kısa cümle ekle" demiyor. Beş cümlelik pencerelerde cümle boyu değişkenliğine bakıyor, hedef yazarlarda ölçülen 0,46-0,49.
- Soru, ünlem, üç nokta ve noktalı virgül için ölçülmüş oranlar eklendi. Devrik cümle için bir üst sınır kondu.
- "ki" bağlacı artık şüpheli sayılmıyor, çünkü yazarlar modellerden daha sık kullanıyor.
- Akademik metinde "-mektedir" aralığı (100 kelimede 0,5-2,5) makalelerle doğrulandı. "Art arda üç cümle aynı ekle bitmesin" kuralı kaldırıldı, çünkü ChatGPT öncesi makalelerde bu olağan.

Kurallar:
- Altıncı metin türü eklendi: kamu ve kurum içi yazışma. Bu türde resmî dil korunuyor, yalnızca gerçek kusurlar onarılıyor.
- Koşutluk kuralları eklendi: ortak öge, liste biçim birliği, yapay simetri.
- TDK kuralları ile üslup tercihleri ayrıldı. Her TDK kuralı kaynağıyla birlikte veriliyor. "Ama"dan önceki virgül artık hata sayılmıyor.
- Onarımda kesinlik kontrolü eklendi: "gibi", "bazı", "-abilir" gibi ihtiyat sözcükleri korunuyor.

Dedektör:
- Ritim ölçümü ve 15-22 kelime bandı uyarısı derlem değerlerine göre ayarlandı.
- Art arda aynı ekle biten cümle sınırı metin türüne bağlandı: genelde üç, akademikte yedi.

Kurulum:
- Skill'in adı `yapay-degil` oldu. Paket `skills/yapay-degil`, tek dosya `dist/yapay-degil.full.md`.
- Claude Code eklenti kataloğu eklendi: `/plugin install yapay-degil@yapay-degil`.

Denenip eklenmeyenler:
- Akademik metinde ritmi artıran bir not: Sayılar iyileşti ama okur metni daha yapay buldu.
- Gemini'nin fazla devrik kurmasını azaltan iki talimat: İkisi de oranı değiştirmedi.
