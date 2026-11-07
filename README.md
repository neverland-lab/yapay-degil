# yapay-degil

Yapay zekâya Türkçe yazdırınca bir şey hep tuhaf durur. Kelimeler Türkçedir ama cümleler sanki İngilizceden çevrilmiş gibidir. Her paragraf "Günümüzde" diye açılır, "Sonuç olarak" diye kapanır, aradaki cümlelerin hepsi aynı boydadır. Bu depo o tuhaflığı gideren bir skill. Claude, Cursor, Gemini CLI gibi yapay zekâ araçlarında çalışır. Metni sıfırdan doğal Türkçeyle yazdırır ya da elindeki metni onarır.

[![License: MIT](https://img.shields.io/badge/lisans-MIT-blue.svg)](LICENSE)
[![Agent Skills](https://img.shields.io/badge/Agent_Skills-v1.0-blue)](https://agentskills.io/specification)
[![Öneri ve hata bildirimi](https://img.shields.io/badge/%C3%B6neri%20ve%20hata-issues-blue.svg)](https://github.com/neverland-lab/yapay-degil/issues/new/choose)

*Turkish AI-text humanizer for Claude and other agents. Rules are calibrated on a corpus of Turkish books and academic papers.*

## Önce bir örnek

Gemini'den uzaktan çalışma üzerine kısa bir blog yazısı istedik. İlk paragrafı şöyleydi:

> Geleneksel ofis düzeninin yerini alan uzaktan çalışma modeli, modern iş dünyasının en köklü dönüşümlerinden biri haline geldi. İlk başlarda küresel şartların getirdiği bir zorunlulukla hayatımıza giren bu düzen, bugün pek çok profesyonel için vazgeçilmez bir çalışma biçimine dönüştü. Fiziksel ofis duvarlarının kalkması; günlük rutinlerden iş yapış şekillerine kadar her şeyi yeniden tanımlarken, çalışanların psikolojisi, üretkenliği ve sosyal yaşamı üzerinde de derin izler bırakıyor.

Skill'le onarılmış hâli:

> Önce küresel şartların dayattığı bir zorunluluk olarak hayatımıza giren uzaktan çalışma, ofisin yerini alarak iş dünyasının en köklü dönüşümlerinden biri oldu. Bugün pek çok çalışan için vazgeçilmez. Ofis duvarları kalkınca her şey yeniden tanımlandı: günlük rutin de, iş yapma biçimi de. Bu değişim çalışanların psikolojisinde, üretkenliğinde ve sosyal hayatında da derin izler bırakıyor.

Bilgi aynı, hiçbir şey eklenmedi. Değişen şey cümlelerin kuruluşu. Gemini'nin cümleleri 15-22 kelimede toplanıyordu ve birbirine benziyordu. Onarımda 21 kelimelik bir cümlenin ardından 6 kelimelik biri geliyor. Yazının tamamında "Dönüm Noktası" başlığı, "bununla birlikte", "madalyonun diğer yüzü", noktalı virgül ve sondaki öğüt cümlesi de gitti. Dedektörle ölçtüğümüzde 15-22 kelimelik cümlelerin oranı %67'den %35'e indi, cümle boyu değişkenliği iki katına çıktı.

## Kuralları nereden bulduk?

Skill'in ilk hâlinde "insanlar 18-22 kelimelik cümlelere sıkışmaz", "on cümlede bir kısa cümle kur" gibi kurallar vardı. Kulağa doğru geliyordu ama hiçbirinin dayanağı yoktu. Biz de saydık.

Türkçe yazmış 22 yazarın 24 kitabından (Sait Faik'ten Oğuz Atay'a, Çetin Altan'dan Pamuk'a), 8 akademik kitaptan, 2 çağdaş romandan, DergiPark'tan 44 makaleden ve 7 kamu belgesinden örnek aldık. Toplam yarım milyonu aşkın kelime. Çeviri kitapları bilerek dışarıda bıraktık, çünkü çeviri Türkçesi tam da temizlemeye çalıştığımız izleri taşıyor. Aynı yazma isteklerini beş dil modeline de verdik (Gemini 4, Gemini Flash, GPT-OSS, Claude Sonnet, Claude Opus) ve iki tarafı aynı ölçümlerden geçirdik.

Kitaplardan içerik öğrenmedik, cümle öğrendik. Bir yazarın ne anlattığı bizi ilgilendirmedi. Cümlelerini kaç kelimeyle kurduğu, ne sıklıkla soru sorduğu, yüklemi ne zaman sona bıraktığı, ne zaman öne aldığı ilgilendirdi. Kitaplarda ölçümü metnin tamamında değil, başından, ortasından ve sonundan alınan sekizer sayfada yaptık. Makalelerde giriş ile kaynakça arasındaki gövdenin tamamını saydık. Skill'in içinde hiçbir kitaptan tek bir cümle yok. Depoda yalnızca sayılar var, örnek cümleleri biz kurduk. Hepsi [`references/derlem-olcumleri.md`](references/derlem-olcumleri.md) dosyasında.

Çıkanlardan bazıları beklediğimiz gibi değildi:

- **İnsanı modelden ayıran şey kelimeler değil, ritim.** Yazarlar kısa ve uzun cümleyi art arda kullanıyor. Beş cümlelik pencerelerde cümle boyu değişkenliği yazarlarda 0,46-0,49, modellerde 0,28-0,41.
- **Modeller tek tip de değil.** Gemini ve GPT cümleleri orta boyda topluyor. Claude ise yazarlardan bile kısa yazıyor ama onun cümleleri de hep aynı boyda. Yani "kısa cümle ekle" önerisi Claude için yanlış bir öneriydi.
- **Modeller anlatıda neredeyse hiç soru, ünlem, üç nokta kullanmıyor.** Yazarların romanlarında 1000 kelimede 13 civarında soru var.
- **"ki" suçsuz çıktı.** Skill bu bağlacı şüpheli sayıyordu. Oysa yazarlar "ki"yi modellerden daha sık kullanıyor: demek ki, öyle ki, kaldı ki.
- **Akademik yazıda üç cümlenin art arda "-mektedir" ile bitmesi normal.** ChatGPT öncesi makalelerin çoğunda böyle seriler var. Bu kuralı kaldırdık.

Bir yan bulgu daha var. 2026'da yayımlanan makaleler 2016-2019'dakilerden farklı yazılıyor: cümle sonunda "-dır" kullanımı yarıya inmiş, aynı ekle biten seriler uzamış. Yapay zekânın izi olabilir ama örneklem küçük, şimdilik bir gözlem olarak duruyor.

## Model mi eğittiniz?

Hayır. Bu bilinçli bir tercih. Skill bir talimat dosyası. Model, metni yazarken ya da onarırken bu talimatlara bakıyor. Biz talimatlardaki her sayıyı ölçülmüş bir değere bağladık ve her değişikliği denedik.

Deneme düzeni şöyle: Aynı istekleri skill'li ve skill'siz yazdırıyoruz, çıkan metinleri ölçüyoruz, sonra etiketlerini silip karışık sırayla başka bir modele (Gemini) okutuyoruz. Okur hangisinin skill'li olduğunu bilmiyor. Sıfırdan yazımda skill'le yazılan metin 8 isteğin 8'inde daha doğal bulundu. Onarımda 8 metnin 7'sinde onarılmış sürüm kaynağın önüne geçti. Deneyler küçük, okur da bir model. Sayılar yön gösteriyor, kesin hüküm vermiyor.

Her deney işe yaramadı. Akademik metinde ritmi artıran bir kural denedik. Sayılar iyileşti ama okur metni daha yapay buldu, kuralı geri aldık. Gemini'nin fazla devrik cümle kurmasını iki farklı talimatla düzeltmeye çalıştık, ikisi de tutmadı. Bunların hepsi ölçüm dosyasında "denendi, eklenmedi" diye duruyor.

## Kurulum

En kısası:

```bash
npx skills add neverland-lab/yapay-degil
```

GitHub CLI kullanıyorsan:

```bash
gh skill install neverland-lab/yapay-degil
```

Claude Code'da eklenti olarak:

```text
/plugin marketplace add neverland-lab/yapay-degil
/plugin install turkish-anti-ai-skill@yapay-degil
```

Ya da elle:

```bash
# Claude Code
git clone https://github.com/neverland-lab/yapay-degil.git ~/.claude/skills/turkish-anti-ai-skill

# Codex, Gemini CLI, Cursor, Windsurf
git clone https://github.com/neverland-lab/yapay-degil.git ~/.agents/skills/turkish-anti-ai-skill
```

Cursor kuralı olarak:

```bash
mkdir -p .cursor/rules
curl -sL https://raw.githubusercontent.com/neverland-lab/yapay-degil/main/.cursor/rules/turkish-anti-ai-skill.mdc \
  -o .cursor/rules/turkish-anti-ai-skill.mdc
```

Klasör yükleyemediğin web arayüzlerinde (claude.ai projeleri, ChatGPT, Google AI Studio) her şeyin tek dosyada toplandığı [`dist/turkish-anti-ai-skill.full.md`](dist/turkish-anti-ai-skill.full.md) dosyasını talimat ya da bilgi alanına yapıştırabilirsin.

Skill'in kurulum adı `turkish-anti-ai-skill`. Depo adı değişti, skill adı aynı kaldı.

## Kullanım

Kurduktan sonra ne istediğini söylemen yeterli:

- "Şu blog yazısını insanlaştır: ..."
- "Önbellek geçersizleştirme konusunu teknik bir dille, doğal Türkçeyle yaz."
- "Bu metne dokunma, yalnızca yapay duran yerleri ve TDK hatalarını göster."

Skill metnin türüne göre davranır. Akademik makaledeki "-mektedir"e dokunmaz, blog yazısında onu ayıklar. Kurum içi yazışmanın resmî dilini gündelik dile çekmez. Romanda devrik cümleye izin verir, teknik belgede vermez. Altı metin türü tanımlı: blog ve deneme, teknik, kurumsal, akademik, edebî, kamu ve kurum içi yazışma.

Bir kuralı hiç esnetmez: Onarırken kaynakta olmayan sayı, isim, anekdot eklemez. "İnsan gibi görünmek" için uydurmaz.

## Dedektör

Skill'in yanında küçük bir Python betiği var. Metni okuyup kalıpları, TDK hatalarını, cümle ritmini ve "-mektedir" yoğunluğunu raporlar. Ek kütüphane istemez, internete bağlanmaz.

```bash
python3 scripts/detect_tr_ai.py metin.md
python3 scripts/detect_tr_ai.py makale.md --register akademik-resmi
python3 scripts/detect_tr_ai.py metin.md --json
```

Dedektör yalnızca yüzeye bakar. Cümle kuruluşunu düzeltmek modelin işi, dedektör sonuca bakıp "burada ritim düz" ya da "burada beş cümle aynı ekle bitiyor" der. Eşiklerin kaynağı yine ölçüm dosyasında.

## İçinde ne var?

```text
SKILL.md                      Ana talimat: çalışma adımları, metin türleri, öz denetim
references/
  derlem-olcumleri.md         Kitap, makale ve model ölçümleri, deney sonuçları
  sentaks-ve-morfoloji.md     Türkçe cümle kuruluşu: öge dizilimi, ulaçlar, koşutluk
  ai-turkcesi-sozlugu.md      Yapay zekâ Türkçesi kalıpları
  tdk-ve-noktalama.md         Noktalama ve yazım kuralları, kaynaklarıyla
  register-ve-ornekler.md     Metin türleri ve önce/sonra örnekleri
scripts/                      Dedektör, testler, paketleme
dist/                         Web arayüzleri için tek dosya
skills/turkish-anti-ai-skill/ Kurulumda inen paket (betik içermez)
```

Betikler hakkında: `detect_tr_ai.py` ve `run_tests.py` dosya yazmaz. `build_dist.py` yalnızca depo içinde çalışır: `dist/` dosyasını yeniden yazar, `skills/turkish-anti-ai-skill/references/` klasörünü silip yeniden kopyalar. Silme bu tek klasörle sınırlı, başka bir yol ya da sembolik bağlantı görürse durur. `npx skills` ya da `gh skill` ile kurulumda yalnızca `skills/turkish-anti-ai-skill/` iner, orada betik yoktur.

## Öneri ve hata bildirimi

Skill yanlış bir düzeltme yaptıysa ya da yapay duran yeni bir kalıp gördüysen [Issues](https://github.com/neverland-lab/yapay-degil/issues/new/choose) bölümünden yaz. Hata ve öneri için iki kısa şablon var. Depo dışarıdan pull request kabul etmiyor, değişiklikleri biz yapıyoruz.

## Teşekkür ve lisans

Bu proje [Yüce Zerey'in turkish-anti-ai-skill](https://github.com/yucezerey/turkish-anti-ai-skill) deposundan doğdu. Üç katmanlı yapı, metin türü tablosu ve dedektörün ilk hâli oradan geliyor. Derlem ölçümleri, ölçülmüş eşikler, koşutluk kuralları, kamu yazışması türü ve deneyler bu depoya eklendi. TDK kuralıyla üslup tercihini ayıran düzeltmelerimiz Kasım 2026'da ana depoya da birleştirildi.

[MIT lisansı](LICENSE) ile dağıtılıyor.
