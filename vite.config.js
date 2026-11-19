import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {viteSingleFile} from 'vite-plugin-singlefile';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {japaneseCaptions, japaneseConditions, japaneseGallery} from './manual-locales.js';

const manualPath = fileURLToPath(new URL('./WebReport Manual.html', import.meta.url));
const translationPath = fileURLToPath(new URL('./manual-ja.json', import.meta.url));
const manualModule = '\0webreport-manual';
const inlineString = value => JSON.stringify(value).replaceAll('<', '\\u003c');

function readImageSizes(script) {
  const imageObject = script.match(/^const IMG\s*=\s*(\{[^\r\n]+\});/m);
  if (!imageObject) throw new Error('Could not read the manual screenshots');
  return Object.fromEntries(Object.entries(JSON.parse(imageObject[1])).flatMap(([id, url]) => {
    const [type, data] = url.split(',', 2);
    const header = Buffer.from(data.slice(0, 40), 'base64');
    if (type === 'data:image/png;base64') return [[id, [header.readUInt32BE(16), header.readUInt32BE(20)]]];
    if (type === 'data:image/webp;base64' && header.toString('ascii', 12, 16) === 'VP8 ') {
      return [[id, [header.readUInt16LE(26) & 0x3fff, header.readUInt16LE(28) & 0x3fff]]];
    }
    return [];
  }));
}

function translateMarkup(markup, translations) {
  return markup.split(/(<[^>]+>)/).map((part, index) => {
    if (index % 2) {
      return part.replace(/data-n="(\d+)" data-cap="[^"]+"/g, (original, number) =>
        japaneseCaptions[number] ? `data-n="${number}" data-cap="${japaneseCaptions[number]}"` : original
      ).replace('placeholder="Để trống nếu không dùng"', 'placeholder="任意。不要な場合は空欄"');
    }
    const original = part.trim();
    return Object.hasOwn(translations, original) ? part.replace(original, () => translations[original]) : part;
  }).join('');
}

function manualSource() {
  return {
    name: 'webreport-manual',
    resolveId(id) {
      if (id === 'virtual:webreport-manual') return manualModule;
    },
    load(id) {
      if (id !== manualModule) return;
      this.addWatchFile(manualPath);
      this.addWatchFile(translationPath);
      const source = readFileSync(manualPath, 'utf8');
      const translations = JSON.parse(readFileSync(translationPath, 'utf8'));
      const article = source.match(/<section id="tong-quan">([\s\S]*?)<\/section>([\s\S]*?)<\/main>/);
      const script = source.match(/<script>([\s\S]*?)\/\* ---- TOC \+ scrollspy \+ search ---- \*\//);
      const wrapEnd = /<\/div>\s*$/;
      const note = article?.[1].match(/<div class="note info">[\s\S]*/)?.[0].trim();
      if (!note || !wrapEnd.test(article[2]) || !script) {
        throw new Error('Could not read the article or reference tools in WebReport Manual.html');
      }
      const content = article[2].replace(wrapEnd, '');
      const sizes = readImageSizes(script[1]);
      const reference = script[1]
        .replace(/\/\* ---- lightbox ---- \*\/[\s\S]*?(?=\/\* ---- copy ---- \*\/)/, '')
        .replaceAll('document.querySelector', 'container.querySelector')
        .replaceAll('document.getElementById(', 'find(')
        .replace("document.addEventListener('click'", "container.addEventListener('click'")
        .replaceAll('aria-label="Phóng to ảnh"', 'aria-label="\'+words.zoom+\'"')
        .replace('<img loading="lazy" alt=', '<img loading="lazy" \'+imageSize(n)+\' alt=')
        .replaceAll("b.textContent='Đã chép'", 'b.textContent=words.copied')
        .replaceAll("b.textContent='Đã chọn, nhấn Ctrl+C'", 'b.textContent=words.selected')
        .replaceAll("b.textContent='Sao chép'", 'b.textContent=words.copy')
        .replace('const g=G[i];', `const g=G[i];
    const [,title,condition,description] = gallery[i] ?? [g.k,g.title,g.cond,g.desc];
    const code = language === 'ja' ? g.code.replace('Report gọi:', 'リンク元:').replace('Report nhận:', 'リンク先:') : g.code;`)
        .replace("g.title+'</h4>'", "title+'</h4>'")
        .replace(/\(g\.img\?[^\r\n]+/, `(g.img?'<figure class="pv"><button class="fig" type="button" aria-label="'+words.zoom+'"><img '+imageSize(g.img)+' alt="'+title+'" src="'+IMG[g.img]+'"></button></figure>':'')+`)
        .replace("+g.desc", "+description")
        .replace('Search Condition phù hợp:</b> \'+g.cond', "'+words.condition+'</b> '+condition")
        .replace('>Value/formula</span>', ">'+words.formula+'</span>")
        .replace('>Sao chép</button><pre>\'+esc(g.code)', ">'+words.copy+'</button><pre>'+esc(code)")
        .replace('b.textContent=g.k', 'b.textContent=gallery[i]?.[0] ?? g.k')
        .replace('rows.forEach(r=>', 'rows.forEach((r,index)=>')
        .replace("+r[2]+'</td>'", "+(conditions[index] ?? r[2])+'</td>'");
      return `export const content = ${inlineString({vi: content, ja: translateMarkup(content, translations)})};
export const prerequisites = ${inlineString({vi: note, ja: translateMarkup(note, translations)})};
const imageSizes = ${inlineString(sizes)};
const imageSize = id => {
  const size = imageSizes[id];
  return size ? 'width="' + size[0] + '" height="' + size[1] + '"' : '';
};
export function initializeReference(container, language) {
  const find = id => container.querySelector('#' + id);
  const gallery = language === 'ja' ? ${inlineString(japaneseGallery)} : [];
  const conditions = language === 'ja' ? ${inlineString(japaneseConditions)} : [];
  const words = language === 'ja'
    ? {zoom:'画面例を拡大', copy:'コピー', copied:'コピーしました', selected:'選択済み。Ctrl+C でコピー', condition:'対応する検索条件：', formula:'値／式'}
    : {zoom:'Phóng to ảnh', copy:'Sao chép', copied:'Đã chép', selected:'Đã chọn, nhấn Ctrl+C', condition:'Search Condition phù hợp:', formula:'Value/formula'};
  ${reference}
}`;
    },
  };
}

export default defineConfig({
  base: './',
  publicDir: false,
  plugins: [manualSource(), react(), viteSingleFile({outputFileName: 'index.html'})],
  build: {rollupOptions: {input: 'source.html'}},
});
