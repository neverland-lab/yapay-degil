# CLAUDE.md

Bu depoda Türkçe metni doğal yazan ya da yapay zekâ izlerini temizleyen `yapay-degil` skill'i var.

- Skill'in kendisi: `SKILL.md`
- Cümle yapısı, sözlük, TDK kuralları ve derlem ölçümleri: `references/`
- Dedektör: `python3 scripts/detect_tr_ai.py <dosya>`
- `dist/` ve `skills/` kopyalarını güncellemek için: `python3 scripts/build_dist.py`
- Testler: `python3 scripts/run_tests.py`

Kullanıcı Türkçe bir metni yazmanı, düzeltmeni ya da doğallaştırmanı istediğinde `SKILL.md`'deki dört adımı izle. Onarırken kaynakta olmayan bilgi ekleme.
