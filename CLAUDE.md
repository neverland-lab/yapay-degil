# CLAUDE.md

Bu depoda Türkçe metni doğal yazan ya da yapay zekâ izlerini temizleyen `yapay-degil` skill'i var.

- Skill'in kendisi `SKILL.md`, gerektiğinde okuduğu dosyalar `references/` altında.
- Denetçi: `python3 scripts/denetle.py <dosya> [--tur ...] [--kaynak ...]`. Kuralları `scripts/kurallar.py` dosyasında.
- Bir şey değiştirdikten sonra `python3 araclar/derle.py`, ardından `python3 araclar/sina.py`.
- `dist/`, `skills/yapay-degil/` ve `docs/site/kurallar.js` üretilir, elle düzenlenmez.
- Ölçümlerin tamamı `docs/olcumler.md` dosyasında. Derlemin kendisi depoda yok.

Kullanıcı Türkçe bir metni yazmanı, onarmanı ya da denetlemeni istediğinde `SKILL.md`'yi izle. Depodaki Türkçe belgeleri (README, CHANGELOG, katkı rehberi) düzenlerken de aynı kurallara uy: düz yazı, kalın etiketli madde yok, uzun çizgi yok.
