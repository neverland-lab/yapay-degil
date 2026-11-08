# AGENTS.md

Bu depoda `yapay-degil` skill'i duruyor. Skill, Türkçe metni doğal yazmak ya da yapay zekâ izlerini ve çeviri kokusunu temizlemek için kullanılır. Codex, Cursor, Claude Code, Gemini CLI ve Windsurf gibi ajanlar için kısa yol tarifi:

1. Türkçe bir metni yazarken, düzenlerken ya da denetlerken önce kök dizindeki `SKILL.md` dosyasını oku.
2. İşe göre `references/` altındaki dosyalara bak:
   - `sentaks-ve-morfoloji.md`: öge dizilimi, sola dallanma, ulaçlar (`-Ip, -IncA, -dIkçA`), yüklem önündeki vurgu yeri, `-DIr` ve `-mAktAdIr`, zamir düşürme, kof fiiller, koşutluk.
   - `ai-turkcesi-sozlugu.md`: yapay zekâ Türkçesi kalıpları. Tier-1 (`yadsınamaz, âdeta, kritik bir rol oynamaktadır`), Tier-2 (`bununla birlikte, söz konusu, bu bağlamda`) ve Tier-3 pazarlama ve ürün metni klişeleri.
   - `tdk-ve-noktalama.md`: `[TDK]` ve `[Üslup]` diye ayrılmış noktalama kuralları, saat ve sayı yazımı, bitişik ve ayrı yazılan kelimeler, yabancı terimlere Türkçe okunuşa göre ek getirme (`cache'i, queue'yu, SQL'i, JSON'ı`).
   - `register-ve-ornekler.md`: altı metin türü (blog ve deneme, teknik, kurumsal, akademik, edebî, kamu ve kurum içi yazışma) ve önce/sonra örnekleri.
   - `derlem-olcumleri.md`: kuralların dayandığı ölçümler (145 insan metni ve beş dil modelinin metinleri).
3. Metni kurallara göre taramak için `python3 scripts/detect_tr_ai.py <dosya>` komutunu çalıştırabilirsin.
4. `SKILL.md` ya da `references/` altında bir şey değiştirdiysen `python3 scripts/build_dist.py` ile `dist/yapay-degil.full.md` ve `skills/yapay-degil/` kopyalarını güncelle.
