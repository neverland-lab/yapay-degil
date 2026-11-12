# Değişiklik günlüğü

Her sürümde neyin değiştiği burada yazar. Sürüm numaraları şöyle artar: kuralları ya da kurulum adını değiştiren büyük adımda ilk sayı, yeni kural ya da ölçümde ortadaki sayı, düzeltmede sondaki sayı.

## 2.1.0 (13 Kasım 2026)

Skill metni 1.3.3'e döndü. 2.0'da baştan yazılan metin körlemesine onarım sınamasında eskisini geçememişti. Sınamadan geçen metni geri aldık, 2.0'ın getirdiği altyapı yerinde kaldı.

- `SKILL.md` ve beş referans dosyası 1.3.3'teki hâliyle geri geldi: `sentaks-ve-morfoloji.md`, `ai-turkcesi-sozlugu.md`, `tdk-ve-noktalama.md`, `derlem-olcumleri.md`, `register-ve-ornekler.md`. 2.0'ın referans dosyaları (`cumle-kurulusu.md`, `kaliplar.md`, `yazim-ve-noktalama.md`, `metin-turleri.md`, `olculer.md`) skill'den çıktı, `v2.0.0` etiketinde duruyor.
- `SKILL.md`'ye tek ekleme yapıldı: sonda denetçinin nasıl çalıştırılacağını anlatan kısa bir bölüm. Denetçi son kontrol olarak kullanılıyor, skor ve ritim sayısı hedef yapılmıyor. Bu bölüm ayrıca sınanmadı.
- Denetçi (`scripts/denetle.py`, `scripts/kurallar.py`), web sayfası, ölçüm araçları, `docs/olcumler.md` ve derleme düzeni 2.0.0'daki gibi.
- Bilinen tutarsızlık: Skill metni "âdeta", "söz konusu" ve "bu bağlamda"yı yasaklı sayıyor, denetçi ölçüme dayanarak bunlar için uyarmıyor. `references/derlem-olcumleri.md` 1.3.3'teki sayıları taşıyor, güncel ölçüm `docs/olcumler.md` dosyasında.
- Testlerde skill metni için "kalın etiketli madde yok" denetimi kaldırıldı, uzun çizgi denetimi duruyor. Web sayfasındaki "Ölçümler" bağlantısı `docs/olcumler.md` dosyasına gidiyor (2.0.0'da silinen bir dosyayı gösteriyordu).

## 2.0.0 (12 Kasım 2026)

Skill, dedektör ve depo düzeni baştan kuruldu. Kurallar yeniden ölçüldü, ölçümün göstermediği kurallar çıkarıldı.

Bilinen durum: Yeniden yazılan skill metni körlemesine onarım sınamasında 1.3.3'ü geçemedi (14 karşılaştırmanın 10'unda okur eski sürümü seçti). Ayrıntı `docs/olcumler.md`, "Skill metninin sınanması". Denetçi, ölçüm ve kalıp sözlüğü bu sınamadan bağımsız.

Skill metni:

- `SKILL.md` baştan yazıldı ve kısaldı (24 bin karakterden 17 bine). Artık kendi kurallarına uyuyor: kalın etiketli madde, İngilizce terim parantezi, "Tier-1" ve "P0" gibi etiketler yok.
- Sıra değişti. Önce ritim ve yazının kuruluşu, sonra karşıtlık ve üçleme kalıpları, sonra cümle iskeleti, en son sözler ve yazım. Eski sürüm kelime listesini öne koyuyordu, ölçümde en zayıf ayırıcı o çıktı.
- Yedi metin türü var. "Ders kitabı ve popüler bilim" ayrı bir tür oldu. Her tür için neye dokunulacağı ve neyin yerinde bırakılacağı tek tabloda.
- Ritim için cümle sınırıyla oynamak onarımda yasaklandı, yerine tutarlılık kuralları (kip, ek, hitap) geldi. İki sınamada da ritmi zorlayan talimat okurun gözünde metni bozdu.
- Model taslağını denetçiyle sınıyor. Denetçi skill'in parçası oldu ve kurulumda iniyor. Kod çalıştıramayan ortamda aynı denetim elle yapılıyor.
- Referans dosyaları yeniden yazıldı ve adları değişti: `cumle-kurulusu.md`, `kaliplar.md`, `yazim-ve-noktalama.md`, `metin-turleri.md`, `olculer.md`. Uzun ölçüm anlatısı skill'den çıkıp `docs/olcumler.md` dosyasına taşındı, skill'de yalnızca kısa bir ölçü tablosu kaldı. Tek dosyalık sürüm 116 bin karakterden 70 bine indi.

Ölçüm:

- Model derlemi beş katına çıktı ve yedi türe yayıldı: altı modelden 200 metin. Akademik, teknik, kamu, şirket yazısı ve açıklayıcı metinde modeller ilk kez ölçüldü.
- Kalıp sözlüğü ilk kez ölçüldü. "Âdeta", "söz konusu", "bu bağlamda", "kuşkusuz", "bir şekilde", "rol oynamak", "gelin ... bakalım" yazarlarda modellerdeki kadar ya da daha sık çıktı ve listeden çıkarıldı. Yerlerine ölçümde ayırt edici çıkanlar girdi: "değer katmak", "zemin hazırlamak", "tam da bu noktada", "bir diğer", "olanak tanımak", "göz ardı edilmemeli", "bir X değil, bir Y".
- Ritim farkının her türde olduğu görüldü. Kamu belgelerinde yazarların ritmi öteki türlerle aynı çıktı (0,46). Eski sürümdeki "kamu metninde ritim düşüktür" yargısı eski cümle bölücünün hatasıydı.
- Yeni ölçüler: geçiş sözüyle başlayan cümle oranı, kısa ve uzun cümle oranı, "değil," karşıtlığı, üçlü sıralama.

Denetçi:

- `scripts/detect_tr_ai.py` gitti, yerine `scripts/denetle.py` geldi. Kurallar ayrı bir veri dosyasında (`scripts/kurallar.py`), her kuralın açıklaması ve örneği de orada. Web sayfası açıklamaları oradan alıyor.
- Cümle bölücü baştan yazıldı: kısaltma, sıra sayısı, tırnak içi soru ve üç noktada cümleyi bölmüyor, tek kelimelik cümleleri sayıyor, başlık, liste ve konuşma satırlarını ritme katmıyor. Kod blokları taranmıyor.
- `--kaynak` seçeneği eklendi: onarılmış metni kaynağıyla karşılaştırıp kaybolan ve eklenen sayıları, adları, azalan ihtiyat sözlerini gösteriyor.
- Rapor düz kalan yerleri cümle numarası ve cümle boylarıyla gösteriyor. Kesin düzeltmesi olan yazım bulgularında doğrusu yazıyor.
- Skor artık elle seçilmiş ağırlıklarla değil, derlemden hesaplanan lojistik regresyonla veriliyor ve dosya bazında çapraz sınamayla ölçüldü (AUC 0,89-0,98). Düzeyler 0-49 düşük, 50-79 orta, 80 ve üstü yüksek. Sekiz cümleden kısa metinde skor yok.
- `--register` yerine `--tur`. Eski tür adları (`blog-deneme`, `akademik-resmi`, `kamu-kurum` vb.) çalışmaya devam ediyor. `--json` çıktısının alan adları değişti.

Depo:

- Derleme tek betikte: `araclar/derle.py`. Testler `araclar/sina.py` (29 test). Her kural kendi örneğiyle sınanıyor, web sayfasındaki denetçi Python sürümüyle karşılaştırılıyor.
- Ölçüm araçları depoya girdi (`araclar/olc.py`, `ozet.py`, `ayarla.py`). Kendi derlemi olan aynı ölçümü ve skor ayarını yeniden yapabilir.
- Eski araştırma ve test raporları (`docs/ARASTIRMA_VE_MIMARI_RAPORU.md`, `docs/TEST_VE_DOGRULAMA_RAPORU.txt`) kaldırıldı, içerikleri `docs/olcumler.md` ve testlerle karşılanıyor.

## 1.3.3 (9 Kasım 2026)

Skill metni değişmedi, değişiklikler dedektörde ve web sayfasında.

- Dedektör artık bir skor veriyor (0-100) ve her puanın gerekçesini yazıyor. Önceden ritim uyarısı çıksa bile "Toplam Yakalanan Sinyal" satırı yalnızca kalıpları saydığı için güncel modellerin metinleri "0" görünüyordu. Seviyeler: 0-34 Düşük, 35-64 Orta, 65-100 Yüksek. Skor olasılık değil, ağırlıklar elle seçildi. Akademik, teknik ve kamu metninde ritmin ağırlığı azaltıldı. Beş cümleden kısa metinde skor üretilmiyor.
- `--json` çıktısına `score`, `level`, `reasons` alanları eklendi, eski alanlar aynı.
- Güncel modellerde sık görülen dört kalıp eklendi: "yalnızca X değil, Y de" ("aynı zamanda" olmadan), "büyük önem taşımak", "rol oynamak", "belirgin şekilde". İnsan metninde 10.000 kelimede en fazla 2 kez geçiyorlar.
- Web sayfasında skor ve gerekçeleri gösteren bir kutu var. `check_site.py` skoru da karşılaştırıyor.
- Derlemdeki 400 kelimelik parçalarda "Orta" ya da üstü oranı: roman %3-6, deneme %23, açıklayıcı psikoloji %26, akademik, teknik ve kurum %1'in altında. Model metinlerinde deneme %85, edebî %40.

## Web sayfası (8 Kasım 2026)

Skill değişmedi, sürüm numarası artmadı.
- Dedektörün tarayıcı sürümü yayına çıktı: https://neverland-lab.github.io/yapay-degil/ Metni yapıştırınca kalıpları, yazım hatalarını ve ritmi gösteriyor. Her kural için sade bir açıklama ve önce/sonra örneği var. Metin bilgisayardan çıkmıyor, hiçbir API kullanılmıyor.
- Kurallar tek yerde, `detect_tr_ai.py`'de duruyor. `scripts/build_site.py` sayfanın kural dosyasını onlardan üretiyor. `scripts/check_site.py` tarayıcı sürümünün Python'la aynı sonucu verdiğini ve her kuralın açıklaması olduğunu sınıyor (eval örnekleri ve 120 derlem dosyası, 952 durum).
- Sayfaya "Yapay zekâya düzelttir" düğmeleri eklendi: metin, skill'in kısaltılmış onarım talimatı ve sayfanın bulduğu işaretlerle birlikte ziyaretçinin kendi ChatGPT, Claude ya da Gemini sohbetinde açılıyor. Gemini'de ve uzun metinlerde istek panoya kopyalanıyor. Talimat `docs/site/onarim.js` dosyasında.
- Sayfadaki bütün açıklamalar dil bilgisi terimi kullanmadan, gündelik dille yeniden yazıldı. Her kuralın "Böyle değil / Böyle" örneği var. Sayfa artık boş açılıyor, yazı hiçbir yere kaydedilmiyor.

## 1.3.2 (8 Kasım 2026)

Kural değişmedi.
- Devrik cümle sayacı 40 yerine 400 cümleyle denetlendi, bir insan okur da 60 cümleyi işaretledi. `references/derlem-olcumleri.md`'deki "%75 uyuşuyor" cümlesinin yerine sayacın ne kadar fazla ve eksik saydığı yüz cümlelik bir örnekle anlatıldı. Derlem genelindeki devrik oranları değişmedi.

## 1.3.1 (8 Kasım 2026)

Kural değişmedi, açıklamalar düzeltildi.
- `references/derlem-olcumleri.md` baştan yazıldı. Derlemin bütün parçaları (145 insan metni) başa bir tabloyla kondu. Kurum dili ve teknik metin ölçümleri "Sınırlamalar" bölümünden kendi bölümlerine taşındı. Sayılar aynı, yalnızca anlatım sadeleşti. Attila İlhan'ın adındaki yazım hatası düzeltildi.
- `SKILL.md`'deki derlem özeti güncel derlemi anlatıyor.
- `CONTRIBUTING.md`, `AGENTS.md`, `CLAUDE.md` ve `docs/ARASTIRMA_VE_MIMARI_RAPORU.md` sade Türkçeyle yeniden yazıldı. `AGENTS.md` artık altı metin türünü ve ölçüm dosyasını gösteriyor.
- `docs/TEST_VE_DOGRULAMA_RAPORU.txt` güncel test çıktısıyla yenilendi.

## 1.3.0 (8 Kasım 2026)

Ölçümler:
- Köşe yazısı derlemi (5 yazar) ve mektup, günlük, anı derlemi (5 kitap). Köşe yazısında 1000 kelimede yaklaşık 11 soru ve 9 üç nokta var, denemenin üç dört katı.
- İBB'nin 2023 ve 2024 faaliyet raporları 2018-2020 raporlarıyla aynı aralıkta çıktı. Pamuk'un 2014 romanı eklendi.

Kurallar:
- `ama`dan önce virgül artık yapay zekâ izi sayılmıyor. Türk yazarlar `ama`ların %19-32'sinde virgül koyuyor, modeller %18. Skill bu virgülü ne siler ne ekler. Dedektörden de çıkarıldı (`ya da` öncesi virgül uyarısı kaldı).
- Noktalama çeşitliliği kuralına köşe yazısı, blog ve sosyal medya için ölçülmüş oranlar eklendi.

## 1.2.1 (8 Kasım 2026)

Dedektör (`scripts/detect_tr_ai.py`) sadeleştirildi. Her kuralın insan metinlerinde (yaklaşık 865.000 kelime: roman, deneme, psikoloji, akademik, teknik, kurum) ve model metinlerinde ne sıklıkla uyarı verdiği 400 kelimelik parçalarda ölçüldü, insan metnine sık yanlış alarm verenler gevşetildi:
- Eski tüm-metin ritim uyarısı kaldırıldı, yerine geçen beş cümlelik pencere ölçüsü kaldı. Eşik 0,38, yalnızca edebî, deneme ve kurumsal metinde uyarı verir.
- Art arda aynı ekle biten cümle sınırı 3'ten 5'e çıktı. Akademik metinde `-mAktAdIr` alt sınırı kalktı.
- Yeni register: `kamu-kurum` (Kamu / Kurum İçi Yazışma).
- Satır başındaki diyalog tiresi uyarı vermez. "Söz konusu / bu bağlamda" akademik, teknik ve kamu metninde, "bununla birlikte / öte yandan" akademik ve kamu metninde işaretlenmez.

Sonuç: Örneğin denemede ritim uyarısı alan insan parçası %35'ten %27'ye, psikolojide aynı ek uyarısı %39'dan %8'e, akademik kitapta `-mAktAdIr` uyarısı %71'den %0'a indi. Model denemelerinin %90'ı ritim uyarısını almaya devam ediyor.

## 1.2.0 (8 Kasım 2026)

Ölçümler:
- Çağdaş roman derlemi: 17 kitap, 13'ü 2000 sonrası. Cümleler kısalmış (ortanca 8 kelime), ritim değişkenliği aynı. Devrik oranını dönem değil yazar belirliyor (%4-37), devrik varsayılanı korundu.
- Açıklayıcı metin derlemi: Türkçe yazılmış beş psikoloji kitabı. Ritim değişkenliği edebî metinden düşük (0,38-0,48), noktalı virgül 1000 kelimede 3-7.

Kurallar:
- Ritim: Akademik ve açıklayıcı metinde edebî değişkenlik hedefi zorlanmaz.
- Noktalı virgül: Açıklayıcı metinde 1000 kelimede 3-7 olağan, onarımda insanın koyduğu noktalı virgül sınır yüzünden silinmez.

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
