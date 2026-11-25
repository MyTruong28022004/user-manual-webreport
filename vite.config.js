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
      const content = article[2].replace(wrapEnd, '').replace(
        /src="(assets\/captures\/seldb-common-(?:menu|query)\.png)"/g,
        (_, path) => {
          const screenshot = fileURLToPath(new URL(path, import.meta.url));
          this.addWatchFile(screenshot);
          return `src="data:image/png;base64,${readFileSync(screenshot, 'base64')}"`;
        },
      );
      const sizes = readImageSizes(script[1]);
      const reference = script[1]
        .replaceAll('document.querySelector', 'container.querySelector')
        .replaceAll('document.getElementById(', 'find(')
        .replace("document.addEventListener('click'", "container.addEventListener('click'")
        .replace('loading="lazy" alt=', 'loading="lazy" \'+imageSize(n)+\' alt=')
        .replace(/^const copyMessages = .*;$/m, 'const copyMessages = words;')
        .replace('const g=G[i];', `const g=G[i];
    const [title,description] = gallery[i] ?? [g.title,g.desc];`)
        .replace("g.title+'</h4>'", "title+'</h4>'")
        .replace(`alt="'+g.title+'" src="'+IMG[g.img]`, `'+imageSize(g.img)+' alt="'+title+'" src="'+IMG[g.img]`)
        .replace("+g.desc", "+description")
        .replace(/^  const galleryLabels = .*;$/m, '  const galleryLabels = words;')
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
    ? {copy:'コピー', copied:'コピーしました', selected:'選択したコードを Ctrl+C でコピーできます。', formula:'値／式', multiple:'複数選択には <code>@SEL2</code> を使い、<b>Condition</b> に <code>One of</code> を指定します。'}
    : {copy:'Sao chép', copied:'Đã sao chép', selected:'Đã chọn mã. Nhấn Ctrl+C để sao chép.', formula:'Value/formula', multiple:'Để chọn nhiều mục, dùng <code>@SEL2</code> và đặt <b>Condition</b> thành <code>One of</code>.'};
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
