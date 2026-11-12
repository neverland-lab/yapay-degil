# Katkı rehberi

İki yolla katkı verebilirsin. Hata ya da öneriyi [Issues](https://github.com/neverland-lab/yapay-degil/issues/new/choose) bölümünden, "Hata bildirimi" ya da "İstek ya da öneri" şablonuyla yazabilirsin. Değişikliği kendin yapmak istersen pull request açabilirsin.

Bu projede "bence bu kelime güzel durmuyor" türünden bir yargı yetmiyor. Bunu kendi hatamızdan öğrendik: "âdeta", "söz konusu", "kuşkusuz" gibi sözleri uzun süre yapay zekâ izi saydık, sayınca yazarların bunları modellerden sık kullandığı çıktı. Bir kalıbı eklemek için onun dil modellerinin Türkçesinde yazarlarınkinden belirgin biçimde sık geçtiğini ya da bir yazım kuralına aykırı olduğunu gösterebilmek gerekiyor.

## Depo nasıl kurulu?

Elle yazılan dosyalar şunlar:

```text
SKILL.md                  skill'in kendisi
references/               skill'in gerektiğinde okuduğu beş dosya
scripts/denetle.py        denetçi (skill'in parçası, kurulumda iner)
scripts/kurallar.py       denetçinin kuralları, açıklamaları ve skor katsayıları
docs/                     web sayfası ve ölçüm belgesi (docs/olcumler.md)
evals/ornekler.json       testlerin kullandığı önce ve sonra örnekleri
araclar/                  derleme, test ve ölçüm betikleri
```

`dist/`, `skills/yapay-degil/` ve `docs/site/kurallar.js` elle düzenlenmez, `araclar/derle.py` üretir. Bir şey değiştirdikten sonra:

```bash
python3 araclar/derle.py
python3 araclar/sina.py
```

Testlerin hepsi geçmeli. Node.js kuruluysa testler web sayfasındaki denetçinin Python sürümüyle aynı sonucu verdiğini de sınar. Üretilen dosyaları da PR'a ekle.

## Yeni bir kalıp önerirken

Kalıplar `scripts/kurallar.py` dosyasında birer kayıt olarak durur. Bir kayıt şunları ister: kısa bir ad, sınıf, güç, düzenli ifade, okura gösterilecek başlık ve açıklama, bir yanlış ve bir doğru örnek. Testler her kuralın kendi yanlış örneğini yakaladığını, doğru örneğini yakalamadığını sınar.

Güç değerini sıklık belirler. Yazarlarda on bin kelimede 0,1'den az geçen ve modellerde en az beş kat sık olan kalıp 3 alır. Modellerde üç kat ve üstü sık olan 2, yazarlarda da olağan olup ancak yığılınca iz bırakan 1 alır. Elinde bir derlem varsa `araclar/olc.py` ile `araclar/ozet.py` bu tabloyu çıkarır. Yoksa issue'da gerçek model çıktısından birkaç örnek ver, ölçümü biz yaparız.

Açıklamaları dil bilgisi terimi kullanmadan yaz. Sayfayı öğrenciler de, esnaf da okuyor: "yüklem", "ulaç", "edilgen" yerine ne demek istediğini gündelik sözle anlat ve bir örnek ver.

Kılavuzda yazan bir yazım kuralı öneriyorsan [TDK Yazım Kılavuzu](https://yazim.tdk.gov.tr/index.html) ya da [Güncel Türkçe Sözlük](https://sozluk.gov.tr/) maddesini göster. Kılavuzda karşılığı olmayan şey `references/yazim-ve-noktalama.md` dosyasına "tercih" olarak girer, "yazım hatası" diye bildirilmez.

## Skill metnini değiştirirken

`SKILL.md` ve `references/` kendi kurallarına uyar: kalın etiketli madde yok, uzun çizgi yok, İngilizce terim parantezi yok. Model, okuduğu talimatın üslubunu yazdığı metne taşır. Talimatı yapay zekâ Türkçesiyle yazarsak çıktı da öyle olur.

Bir kuralı değiştiren ya da yeni bir sayı ekleyen değişiklikte dayanağını göster: hangi metinler, nasıl ölçtün. Sayıyı tutturan kural her zaman metni iyileştirmez. Akademik metinde ritmi artıran bir kuralı denedik, sayılar düzeldi ama okur metni daha yapay buldu. Mümkünse değişikliği körlemesine bir okurla da sına: aynı metnin eski ve yeni kuralla onarılmış hâllerini etiketsiz ver, hangisini seçtiğine bak.

## Bilgi eklememe ilkesi

`evals/ornekler.json` ya da `references/metin-turleri.md` dosyasına örnek eklerken onarılmış metinde kaynakta olmayan sayı, tarih, ad ya da anı olmasın. Miktar ve kesinlik de bilgidir: Kaynak "birçok" diyorsa "yüzlerce", "artırabilir" diyorsa "artırır" yazma. `python3 scripts/denetle.py sonra.md --kaynak once.md` bunu senin yerine denetler.

Telifli metinlerden alıntı koyma. Depoda yalnızca sayılar ve kendi kurduğumuz örnekler var.

## Pull request açarken

Depoyu fork'la, değişikliğin için ayrı bir dal aç. Büyük bir değişiklikse önce bir issue açıp konuşalım, emeğin boşa gitmesin. Bir PR'da tek bir konu olsun: bir kural, bir kalıp ya da bir düzeltme.
