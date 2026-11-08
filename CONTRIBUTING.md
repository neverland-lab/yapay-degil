# Katkı rehberi

İki yolla katkı verebilirsin. Hata ya da öneriyi [Issues](https://github.com/neverland-lab/yapay-degil/issues/new/choose) bölümünden, "Hata bildirimi" ya da "İstek ya da öneri" şablonuyla yazabilirsin. Değişikliği kendin yapmak istersen pull request açabilirsin (4. bölüm).

Bu projede "bence bu kelime güzel durmuyor" türünden bir yargı yetmiyor. Bir kalıbı eklemek için onun dil modellerinin Türkçesinde insan yazısından belirgin biçimde sık geçtiğini, İngilizce bir cümle yapısını kopyaladığını ya da bir TDK kuralına aykırı olduğunu gösterebilmek gerekiyor.

## 1. Yeni bir kalıp önerirken

Issue açarken şunları yazarsan iş kolaylaşır:

- Kalıbın kendisi, örneğin *"potansiyelini ortaya çıkarmak"*.
- Varsa İngilizce kaynağı, örneğin *"unlock the potential"*.
- Ne kadar ağır olduğu. Sözlükte üç katman var: Tier-1 tek görülmede bile yapay duran kalıplar, sentaks katmanı İngilizce cümle iskeletinin Türkçeye taşınması, Tier-2 ise ancak sık geçince yapay duran bağlaçlar ve TDK yazım hataları.
- Gerçek bir model çıktısından bir örnek ve aynı cümlenin bilgi kaybı olmadan onarılmış hâli.
- Kuralın uygulanmaması gereken yerler. Örneğin `-mAktAdIr` akademik ve resmî yazıda korunur.
- Kuralın türü: `[TDK]`, `[Dil bilgisi]` ya da `[Üslup]`. `[Dil bilgisi]` yalnızca uyulmayınca cümlenin bozulduğu ya da anlamın kaydığı durumlar için kullanılır, dayanağı `references/sentaks-ve-morfoloji.md` başındaki kaynaklarda. Bir kurala `[TDK]` demek için [TDK Yazım Kılavuzu](https://yazim.tdk.gov.tr/index.html) ya da [Güncel Türkçe Sözlük](https://sozluk.gov.tr/) maddesini bağlantısıyla göster. Kılavuzda karşılığı olmayan kural `[Üslup]` olarak girer, dedektör de onu "TDK hatası" diye raporlamaz.

## 2. Dosyaları eşitleme

`SKILL.md` ya da `references/*.md` dosyalarından birini değiştirdiysen commit'ten önce şunları çalıştır:

```bash
# dist/ altındaki tek dosyayı ve skills/ paketini günceller
python3 scripts/build_dist.py

# dedektörün çalıştığını gösterir
python3 scripts/detect_tr_ai.py README.md
```

## 3. Bilgi eklememe ilkesi

`evals/evals.json` ya da `references/register-ve-ornekler.md` dosyasına örnek eklerken onarılmış metinde kaynakta olmayan sayı, tarih, özel isim ya da kişisel anekdot olmasın. Miktar ve kesinlik de bilgidir: Kaynak "birçok" diyorsa "yüzlerce", "artırabilir" diyorsa "artırır" yazma. Klişeyi silince somut bir bilgi gerekiyorsa ve kaynakta yoksa `[somut veri: ...]` yer tutucusunu kullan.

## 4. Pull request açma

Depoyu fork'la, değişikliğin için ayrı bir dal aç. Büyük bir değişiklikse önce bir issue açıp konuşalım, emeğin boşa gitmesin.

Bir PR'da tek bir konu olsun. Bir kural, bir kalıp ya da bir düzeltme. Birbirinden bağımsız değişiklikleri ayrı PR'lara böl.

Kuralı değiştiren ya da yeni bir sayı ekleyen PR'da dayanağını göster. Bu skill'deki eşikler gerçek metinlerden ölçüldü (`references/derlem-olcumleri.md`). Yeni bir eşik öneriyorsan hangi metinlerde, nasıl ölçtüğünü yaz. Telifli metinlerden uzun alıntı koyma, sayılar ve kendi kurduğun örnekler yeter.

Göndermeden önce şunları çalıştır:

```bash
python3 scripts/build_dist.py
python3 scripts/run_tests.py
```

Testlerin hepsi geçmeli. `build_dist.py` `dist/` ve `skills/yapay-degil/` kopyalarını günceller, bu dosyaları da PR'a ekle. Örnek ve test eklerken 3. bölümdeki sadakat ilkesine uy.

