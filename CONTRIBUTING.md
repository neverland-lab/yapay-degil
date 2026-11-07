# Katkıda Bulunma Rehberi (CONTRIBUTING.md)

> İki yolla katkı verebilirsin. Hata ya da öneriyi [Issues](https://github.com/neverland-lab/yapay-degil/issues/new/choose) bölümünden "Hata bildirimi" ya da "İstek ya da öneri" şablonuyla yazabilirsin. Değişikliği kendin yapmak istersen pull request açabilirsin (bkz. 4. bölüm). Aşağıdaki şablon ikisi için de hangi bilgilerin işe yaradığını gösteriyor.

`yapay-degil` projesine katkıda bulunmak istediğin için teşekkürler! Bu projenin temel ilkesi, "bence bu kelime güzel değil" gibi öznel yargılar yerine, **Büyük Dil Modellerinin (LLM) Türkçe çıktılarında istatistiksel olarak aşırı temsil edilen kalıpları, İngilizce sözdizimsel kopyaları (calque/translationese) ve TDK Yazım Kılavuzu kurallarını** kanıta dayalı olarak belgelemektir.

## 1. Yeni Bir "Yapay Zekâ Türkçesi" Kalıbı Ekleme Kuralları

Yeni bir kelime, bağlaç veya cümle yapısı için Issue açarken lütfen aşağıdaki şablonu doldur:

- **Kalıp / Kelime Adı:** (Örn: *"potansiyelini ortaya çıkarmak"*)
- **İngilizce Kaynak Kalıp (Calque):** (Örn: *"unlock the potential"*)
- **Şiddet Derecesi (Severity):**
  - `P0 / Tier-1`: Tek görülmede dahi kesin AI ifşası olan kalıplar.
  - `P1 / Sentaks`: İngilizce cümle iskeletinin Türkçeye kopyalanması.
  - `P2 / Tier-2 & TDK`: Yoğunlukta yapay duran bağlaçlar veya TDK noktalama/imla hataları.
- **Önce (Makine Türkçesi Örneği):** Kalıbın gerçek bir LLM çıktısındaki doğal olmayan kullanımı.
- **Sonra (İnsan Türkçesi Örneği):** Olgusal sadakati bozmadan onarılmış doğal Türkçe karşılığı.
- **İstisna / Sınır Durumu (Do-Not-Flag):** Bu kuralın hangi register'da veya bağlamda **uygulanmaması** gerektiği (Örn: `-mAktAdIr` eki akademik/resmî register'da korunur).
- **Kural Türü:** `[TDK]`, `[Dil bilgisi]` veya `[Üslup]`. Cümle yapısı kurallarında `[Dil bilgisi]` etiketi yalnızca uyulmadığında cümlenin bozulduğu ya da anlamın kaydığı durumlar içindir, dayanağını göster (bkz. `references/sentaks-ve-morfoloji.md` başındaki kaynaklar). Bir kuralı `[TDK]` diye etiketlemek için TDK Yazım Kılavuzu'ndaki ([yazim.tdk.gov.tr](https://yazim.tdk.gov.tr/index.html)) veya Güncel Türkçe Sözlük'teki ([sozluk.gov.tr](https://sozluk.gov.tr/)) ilgili maddeyi bağlantısıyla göster. Kılavuzda karşılığı olmayan kurallar `[Üslup]` olarak eklenir ve dedektörde "TDK hatası" diye raporlanmaz.

## 2. Paket Senkronizasyonu ve Doğrulama

`SKILL.md` veya `references/*.md` dosyalarında değişiklik yaptıktan sonra (depo bakımcıları için) commit atmadan önce şu iki komutu çalıştır:

```bash
# 1. Tek parça dist/ dosyasını ve skills/ alt paketini güncelle
python3 scripts/build_dist.py

# 2. Dedektör betiğinin sorunsuz çalıştığını doğrula
python3 scripts/detect_tr_ai.py README.md
```

## 3. Olgusal Sadakat İlkemiz

Test ve örnek (`evals/evals.json` ve `references/register-ve-ornekler.md`) eklerken "Sonra (After)" metinlerinde kaynak metinde bulunmayan hiçbir yeni sayı, tarih, özel isim veya kişisel anekdot eklenmediğinden emin ol. Miktar ve kesinlik de bilgidir: Kaynak "birçok" diyorsa "yüzlerce", "artırabilir" diyorsa "artırır" yazma. Klişeyi silince somut bilgi gerekiyorsa ve kaynakta yoksa `[somut veri: ...]` yer tutucusunu kullan.

## 4. Pull Request Açma

Depoyu fork'la, değişikliğin için ayrı bir dal aç. Büyük bir değişiklikse önce bir issue açıp konuşalım, emeğin boşa gitmesin.

Bir PR'da tek bir konu olsun. Bir kural, bir kalıp ya da bir düzeltme. Birbirinden bağımsız değişiklikleri ayrı PR'lara böl.

Kuralı değiştiren ya da yeni bir sayı ekleyen PR'da dayanağını göster. Bu skill'deki eşikler gerçek metinlerden ölçüldü (`references/derlem-olcumleri.md`). Yeni bir eşik öneriyorsan hangi metinlerde, nasıl ölçtüğünü yaz. Telifli metinlerden uzun alıntı koyma, sayılar ve kendi kurduğun örnekler yeter.

Göndermeden önce şunları çalıştır:

```bash
python3 scripts/build_dist.py
python3 scripts/run_tests.py
```

Testlerin hepsi geçmeli. `build_dist.py` `dist/` ve `skills/yapay-degil/` kopyalarını günceller, bu dosyaları da PR'a ekle. Örnek ve test eklerken 3. bölümdeki sadakat ilkesine uy.

