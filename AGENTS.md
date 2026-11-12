# AGENTS.md

Bu depoda `yapay-degil` skill'i duruyor. Skill, Türkçe metni doğal yazmak ya da yapay zekâ izlerini temizlemek için kullanılır.

Türkçe bir metni yazarken, onarırken ya da denetlerken önce kök dizindeki `SKILL.md` dosyasını oku ve oradaki adımları izle. `SKILL.md` hangi durumda `references/` altındaki hangi dosyaya bakacağını söyler. Onarırken kaynakta olmayan bilgi ekleme.

Taslağını denetlemek için:

```bash
python3 scripts/denetle.py taslak.md --tur deneme --kaynak kaynak.md
```

Depoda bir şey değiştirdiysen (`SKILL.md`, `references/`, `scripts/`):

```bash
python3 araclar/derle.py    # dist/, skills/yapay-degil/ ve docs/site/kurallar.js yeniden üretilir
python3 araclar/sina.py     # testler
```

`dist/`, `skills/yapay-degil/` ve `docs/site/kurallar.js` dosyalarını elle düzenleme. Katkı kuralları `CONTRIBUTING.md` dosyasında.
