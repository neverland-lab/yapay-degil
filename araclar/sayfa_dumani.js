// sayfa_dumani.js - docs/index.html içindeki betiği sahte bir belgeyle çalıştırır: sayfa açılırken ve örnek metinler
// yüklenirken hata fırlıyor mu? Görünümü sınamaz, yalnızca betiğin yeni rapor biçimiyle uyuştuğunu sınar.
// Kullanım: node araclar/sayfa_dumani.js   (araclar/sina.py de çağırır)
const fs = require("fs");
const path = require("path");
const kok = path.resolve(__dirname, "..", "docs");
const html = fs.readFileSync(path.join(kok, "index.html"), "utf8");

const ogeler = new Map();
function oge(ad) {
  const dinleyici = {};
  const o = {
    ad, value: "", textContent: "", innerHTML: "", href: "", style: {}, dataset: {}, scrollHeight: 10,
    classList: { add() {}, remove() {} },
    addEventListener(tur, f) { (dinleyici[tur] = dinleyici[tur] || []).push(f); },
    tetikle(tur, olay) { (dinleyici[tur] || []).forEach((f) => f(olay || { target: o, preventDefault() {} })); },
    appendChild() {}, setAttribute() {}, focus() {}, setSelectionRange() {}, querySelector() { return null; },
    closest() { return null; },
  };
  return o;
}
const al = (id) => { if (!ogeler.has(id)) ogeler.set(id, oge(id)); return ogeler.get(id); };
const ornekDugmeleri = ["kalip", "gemini", "onarim"].map((k) => Object.assign(oge("ornek-" + k), { dataset: { ornek: k } }));
const gitDugmeleri = ["chatgpt", "claude", "gemini"].map((s) => Object.assign(oge("git-" + s), { dataset: { s } }));

globalThis.document = {
  getElementById: al,
  createElement: () => oge("yeni"),
  querySelectorAll: (secici) => (secici === "[data-ornek]" ? ornekDugmeleri : secici === "a.git" ? gitDugmeleri : []),
  fonts: null,
};
globalThis.window = { addEventListener() {} };
globalThis.navigator = { clipboard: { writeText: async () => {} } };
globalThis.getSelection = () => ({ removeAllRanges() {}, addRange() {} });
globalThis.innerHeight = 800;

for (const ad of [...html.matchAll(/src="site\/([\w.-]+\.js)/g)].map((m) => m[1])) require(path.join(kok, "site", ad));
const betik = html.slice(html.lastIndexOf("<script>") + 8, html.lastIndexOf("</script>"));
new Function(betik)();

for (const d of ornekDugmeleri) {
  d.tetikle("click");
  for (const tur of ["", ...Object.keys(globalThis.YD_KURALLAR.turler)]) {
    al("tur").value = tur;
    al("tur").tetikle("change");
    if (!/\d/.test(al("skor").textContent)) throw new Error(`skor yazılmadı: ${d.dataset.ornek} / ${tur}`);
    if (!al("olculer").innerHTML.includes("<svg")) throw new Error("ölçü çizimi yok");
    if (al("isaretler").innerHTML.includes("undefined") || al("olculer").innerHTML.includes("undefined") ||
        al("skor-neden").innerHTML.includes("undefined") || al("istek").textContent.includes("undefined")) {
      throw new Error(`çıktıda 'undefined' var: ${d.dataset.ornek} / ${tur}`);
    }
  }
}
al("temizle").tetikle("click");
console.log("sayfa betiği: tamam");
