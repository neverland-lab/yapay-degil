// Bu dosya scripts/build_site.py ile detect_tr_ai.py'den üretilir. Elle düzenleme.
globalThis.YD_KURALLAR = {
 "ignoreCase": [
  {
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))yads[iıIİ]namaz(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))[iıIİ]nkar\\s+ed[iıIİ]lemez(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))",
   "label": "Tier-1 Klişe: 'yadsınamaz / inkar edilemez' (undeniable calque)"
  },
  {
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))[aâ]deta(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))",
   "label": "Tier-1 Klişe: 'âdeta / adeta' (aşırı benzetme zarfı)"
  },
  {
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))der[iıIİ]nlemes[iıIİ]ne\\s+(?:[iıIİ]nmek|[iıIİ]ncelemek|bakmak|ele\\s+almak|anal[iıIİ]z)(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))mercek\\s+alt[iıIİ]na\\s+al",
   "label": "Tier-1 Klişe: 'derinlemesine inmek / mercek altına almak' (delve into calque)"
  },
  {
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))kr[iıIİ]t[iıIİ]k\\s+(?:b[iıIİ]r\\s+)?(?:rol\\s+oyna|öneme\\s+sah[iıIİ]p)|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))hayat[iıIİ]\\s+(?:b[iıIİ]r\\s+)?öneme\\s+sah[iıIİ]p",
   "label": "Tier-1 Klişe: 'kritik bir rol oynamak / öneme sahip olmak'"
  },
  {
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))gen[iıIİ]ş\\s+b[iıIİ]r\\s+yelpaze|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))zeng[iıIİ]n\\s+b[iıIİ]r\\s+(?:doku|moza[iıIİ]k)(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))",
   "label": "Tier-1 Klişe: 'geniş bir yelpaze / zengin bir doku-mozaik'"
  },
  {
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))sadece\\s+[^,.!?]+?\\s+değ[iıIİ]l,\\s*ayn[iıIİ]\\s+zamanda(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))yaln[iıIİ]zca\\s+[^,.!?]+?\\s+değ[iıIİ]l,\\s*ayn[iıIİ]\\s+zamanda(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))",
   "label": "P0 Yapısal: 'sadece X değil, aynı zamanda Y' (negatif paralellik)"
  },
  {
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))yaln[iıIİ]zca\\s+[^,.!?]+?\\s+olmakla\\s+kalmay[iıIİ]p(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))sadece\\s+[^,.!?]+?\\s+göstermekle\\s+kalma",
   "label": "P0 Yapısal: 'yalnızca X olmakla kalmayıp' (not only... but also)"
  },
  {
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))günümüzün\\s+h[iıIİ]zla\\s+değ[iıIİ]şen(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))d[iıIİ]j[iıIİ]talleşen\\s+çağ[iıIİ]m[iıIİ]zda(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))",
   "label": "P0 Sahneleme: 'günümüzün hızla değişen...' (boş giriş klişesi)"
  },
  {
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))ç[iıIİ]ğ[iıIİ]r\\s+açan(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))dönüm\\s+noktas[iıIİ][\\p{L}\\p{N}_]*(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))k[iıIİ]lometre\\s+taş[iıIİ][\\p{L}\\p{N}_]*(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))",
   "label": "Tier-1 Şişirme: 'çığır açan / dönüm noktası / kilometre taşı'"
  },
  {
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))potans[iıIİ]yel[iıIİ]n[iıIİ]\\s+ortaya\\s+ç[iıIİ]kar|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))b[iıIİ]r\\s+üst\\s+sev[iıIİ]yeye\\s+taş[iıIİ]",
   "label": "Tier-1 Klişe: 'potansiyelini ortaya çıkarmak / bir üst seviyeye taşımak'"
  },
  {
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))en\\s+büyük\\s+(?:kan[iıIİ]t[iıIİ]d[iıIİ]r|gösterges[iıIİ]d[iıIİ]r)(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))",
   "label": "Tier-1 Şişirme: 'en büyük kanıtıdır / göstergesidir' (testament to calque)"
  },
  {
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))kusursuz\\s+b[iıIİ]r\\s+şek[iıIİ]lde(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))pürüzsüz\\s+b[iıIİ]r\\s+şek[iıIİ]lde(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))",
   "label": "Tier-1 Klişe: 'kusursuz / pürüzsüz bir şekilde' (seamlessly calque)"
  },
  {
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))bununla\\s+b[iıIİ]rl[iıIİ]kte(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))öte\\s+yandan(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))",
   "label": "Tier-2 Geçiş: 'bununla birlikte / öte yandan' (moreover/however)"
  },
  {
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))bel[iıIİ]rtmek\\s+gerek[iıIİ]r\\s+k[iıIİ](?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))unutulmamal[iıIİ]d[iıIİ]r\\s+k[iıIİ](?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))vurgulamak\\s+(?:gerek[iıIİ]r|öneml[iıIİ]d[iıIİ]r)\\s+k[iıIİ](?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))",
   "label": "Tier-2 Dolgu: 'belirtmek / vurgulamak gerekir ki'"
  },
  {
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))söz\\s+konusu(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))bu\\s+bağlamda(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))bu\\s+doğrultuda(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))bahs[iıIİ]\\s+geçen(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))",
   "label": "Tier-2 Bürokratik: 'söz konusu / bu bağlamda / bu doğrultuda'"
  },
  {
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))bütüncül\\s+(?:b[iıIİ]r\\s+)?yaklaş[iıIİ]m(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))parad[iıIİ]gma\\s+değ[iıIİ]ş[iıIİ]m[iıIİ](?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))s[iıIİ]nerj[iıIİ]\\s+yarat",
   "label": "Tier-2 Jargon: 'bütüncül yaklaşım / paradigma değişimi / sinerji'"
  },
  {
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))sonuç\\s+olarak(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))özetlemek\\s+gerek[iıIİ]rse(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))son\\s+tahl[iıIİ]lde(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))",
   "label": "Tier-2 Kapanış: 'sonuç olarak / özetlemek gerekirse'"
  },
  {
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))taraf[iıIİ]ndan\\s+(?:gerçekleşt[iıIİ]r[iıIİ]l|sağlan|[iıIİ]cra\\s+ed[iıIİ]l)|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))(?:ek[iıIİ]b[iıIİ]m[iıIİ]z|ş[iıIİ]rket[iıIİ]m[iıIİ]z|kurumumuz|taraf[iıIİ]m[iıIİ]z)\\s+taraf[iıIİ]ndan(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))",
   "label": "P1 Sentaks: Edilgen çatı ('tarafından') + kof eylem ya da yazarın kendi kurumu"
  },
  {
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))(?:göstermekted[iıIİ]r|bel[iıIİ]rtmekted[iıIİ]r|kan[iıIİ]tlamaktad[iıIİ]r|ortaya\\s+koymaktad[iıIİ]r)\\s+k[iıIİ](?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))",
   "label": "P1 Sentaks: Hint-Avrupa tipi '...-mektedir ki' yan cümle kopyası"
  },
  {
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))(?:büyük|yüksek|kr[iıIİ]t[iıIİ]k|c[iıIİ]dd[iıIİ]|öneml[iıIİ]|hayat[iıIİ])\\s+b[iıIİ]r\\s+(?:önem\\s+taş[iıIİ]|art[iıIİ]ş\\s+göster|rol\\s+oyna|[iıIİ]vme\\s+kazan|önem\\s+arz)",
   "label": "P1 Sentaks: Kalıplaşmış birleşik eylemde gereksiz 'bir' (a/an calque)"
  },
  {
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))ne(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))[^.!?]*?(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))ne\\s+de(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))[^.!?]*?(?:[\\p{L}\\p{N}_]+(?:m[ae]d[iıIİiıIİuü]|m[iıIİiıIİuü]yor|m[ae]z|m[ae]y[ae]c[ae]k|m[ae]m[iıIİiıIİuü]ş)|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))değ[iıIİ]l)[\\p{L}\\p{N}_]*(?=\\s*[.!?]|\\s*$)",
   "label": "P1 Koşutluk: 'ne ... ne de' ile olumsuz yüklem (yazı dilinde anlatım bozukluğu)"
  },
  {
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))[\\p{L}\\p{N}_]+m[ae]k,\\s+(?:[\\p{L}\\p{N}_]+\\s+){0,6}[\\p{L}\\p{N}_]+m[ae](?:s[iıIİiıIİ]|m[iıIİiıIİ]z|n[iıIİiıIİ]z)(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))",
   "label": "P1 Koşutluk: Listede yalın ve iyelikli ad-eylem karışık ('-mAk, ... -mAsI')"
  },
  {
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))(?:uç\\s+nokta(?:lar|larda|lara|lar[iıIİ])?|olay\\s+güdümlü|ara\\s+katman|çekme\\s+[iıIİ]steğ[iıIİ])(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))",
   "label": "P2 Terminoloji: Zorlama teknik terim çevirisi ('uç nokta / olay güdümlü / ara katman')"
  },
  {
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))ev\\s+sah[iıIİ]pl[iıIİ]ğ[iıIİ]\\s+yapmakta|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))katk[iıIİ]da\\s+bulunmakta",
   "label": "P1 Kof Fiil: '-mAktAdIr' ile şişirilmiş 'ev sahipliği yapmak / katkıda bulunmak'"
  },
  {
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))(?:sadece|yaln[iıIİ]zca)\\s+[^\\s,.!?]+(?:\\s+[^\\s,.!?]+){0,3}\\s+değ[iıIİ]l,(?!\\s*ayn[iıIİ]\\s+zamanda)",
   "label": "Tier-2 Yapısal: 'yalnızca X değil, Y de' (aynı zamanda olmadan negatif paralellik)"
  },
  {
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))(?:büyük|öneml[iıIİ]|kr[iıIİ]t[iıIİ]k|hayat[iıIİ])\\s+önem\\s+taş[iıIİ]",
   "label": "Tier-2 Kalıp: 'büyük önem taşımak' (önemi söyleyip göstermeyen kalıp)"
  },
  {
   "re": "(?<!kr[iıIİ]t[iıIİ]k )(?<!b[iıIİ]r )(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))rol\\s+oyna",
   "label": "Tier-2 Kalıp: 'rol oynamak' (ne işe yaradığını söylemeyen kalıp)"
  },
  {
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))bel[iıIİ]rg[iıIİ]n\\s+(?:b[iıIİ]r\\s+)?şek[iıIİ]lde",
   "label": "Tier-2 Kalıp: 'belirgin şekilde' (ne kadar olduğunu söylemeyen zarf)"
  },
  {
   "re": "—",
   "label": "P2 Noktalama: Uzun çizgi (em-dash '—') kullanımı (TDK diyalog dışında yasaklar)"
  },
  {
   "re": "[\\p{L}\\p{N}_]+[–][\\p{L}\\p{N}_]+",
   "label": "P2 Noktalama: Aralıkta orta çizgi (en-dash '–') kullanımı (TDK kısa çizgi '-' şart koşar)"
  },
  {
   "re": ",\\s*(?:ve|veya|yahut)(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))|(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))(?:ve|veya|yahut),",
   "label": "P2 TDK Noktalama: 've / veya / yahut' bağlacından önce veya sonra virgül (TDK: konmaz)"
  },
  {
   "re": ",\\s*ya\\s+da(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))",
   "label": "P2 Üslup: 'ya da' öncesi virgül ('veya' gibi virgülsüz yazılır)"
  },
  {
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))(?:[01]?\\d|2[0-3]):[0-5]\\d(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))",
   "label": "P2 TDK Saat Hatası: Saat arasında iki nokta (':') kullanımı (TDK tek nokta '.' şart koşar, örn: 14.30)"
  },
  {
   "re": "%\\d+\\.\\d+",
   "label": "P2 TDK Sayı Hatası: Yüzde ondalık ayracı olarak nokta kullanımı (TDK virgül şart koşar, örn: %112,5)"
  },
  {
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))(?:b[iıIİ]rşey|herşey|h[iıIİ]çb[iıIİ]rşey|yada|b[iıIİ]r çok|b[iıIİ]r kaç|pekçok|ard arda|yan[iıIİ]s[iıIİ]ra|önsöz|önyarg[iıIİ]|[iıIİ]şb[iıIİ]rl[iıIİ]ğ[iıIİ]|farketmek|terketmek|halbu k[iıIİ]|oysa k[iıIİ])(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))",
   "label": "P2 TDK İmla Hatası: Birleşik/ayrı yazılan kelime hatası"
  }
 ],
 "caseSensitive": [
  {
   "re": "(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))(?:cache'ı|cache'de|cache'dan|SQL'ı|SQL'da|SQL'dan|JSON'i|JSON'de|queue'ya|React'ı|React'da|Node\\.js'ı|Node\\.js'da|GitHub'de|Google'de|URL'ı|URL'da)(?:(?<=[\\p{L}\\p{N}_])(?![\\p{L}\\p{N}_])|(?<![\\p{L}\\p{N}_])(?=[\\p{L}\\p{N}_]))",
   "label": "P2 Fonetik Ek Hatası: Yabancı terime Türkçe okunuşu yerine yazılışına göre ek getirilmesi"
  }
 ],
 "registers": {
  "blog-deneme": {
   "label": "Blog / Deneme / Sosyal Medya",
   "mektedir_min": 0.0,
   "mektedir_max": 0.5
  },
  "teknik": {
   "label": "Teknik / Mühendislik",
   "mektedir_min": 0.0,
   "mektedir_max": 1.0
  },
  "kurumsal": {
   "label": "Kurumsal / SaaS / İş İletişimi",
   "mektedir_min": 0.0,
   "mektedir_max": 1.0
  },
  "akademik-resmi": {
   "label": "Akademik / Resmî / Hukuki",
   "mektedir_min": 0.0,
   "mektedir_max": 2.5
  },
  "edebi-anlati": {
   "label": "Edebî / Anlatı",
   "mektedir_min": 0.0,
   "mektedir_max": 0.5
  },
  "kamu-kurum": {
   "label": "Kamu / Kurum İçi Yazışma",
   "mektedir_min": 0.0,
   "mektedir_max": 2.5
  }
 },
 "defaultProfile": {
  "label": "Register belirtilmedi (genel eşik)",
  "mektedir_min": 0.0,
  "mektedir_max": 2.5
 },
 "registerSkip": {
  "Tier-2 Bürokratik": [
   "akademik-resmi",
   "kamu-kurum",
   "teknik"
  ],
  "Tier-2 Geçiş": [
   "akademik-resmi",
   "kamu-kurum"
  ]
 },
 "repeatedEndingLimit": 5,
 "repeatedEndingLimits": {
  "akademik-resmi": 7,
  "kamu-kurum": 99
 },
 "windowCovTarget": 0.38,
 "rhythmWarnRegisters": [
  "blog-deneme",
  "edebi-anlati",
  "kurumsal"
 ],
 "rhythmWarnDefault": true,
 "band1522Warn": 0.3,
 "score": {
  "weights": {
   "ritim": 55,
   "bant": 15,
   "mektedir": 10,
   "seri": 10,
   "kalip": 35
  },
  "lowRhythmRegisters": [
   "akademik-resmi",
   "kamu-kurum",
   "teknik"
  ],
  "lowRhythmFactor": 0.4,
  "covHuman": 0.45,
  "covModel": 0.3,
  "belowHuman": 0.35,
  "belowModel": 0.85,
  "bandHuman": 0.25,
  "bandModel": 0.5,
  "patternFull": 1.5,
  "minWindows": 1,
  "lowPatterns": [
   "Tier-2 Kalıp: 'rol oynamak'",
   "Tier-2 Kalıp: 'belirgin şekilde'"
  ],
  "levels": [
   [
    65,
    "Yüksek"
   ],
   [
    35,
    "Orta"
   ],
   [
    0,
    "Düşük"
   ]
  ],
  "note": "Not: Bu skor henüz etiketli veriyle kalibre edilmedi. Olasılık değil, iz yoğunluğu göstergesidir."
 }
};
