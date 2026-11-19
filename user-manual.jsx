import React, {useEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {HStack} from '@astryxdesign/core/HStack';
import {Text} from '@astryxdesign/core/Text';
import {VStack} from '@astryxdesign/core/VStack';
import {defineTheme, Theme} from '@astryxdesign/core/theme';
import '@astryxdesign/core/reset.css';
import '@astryxdesign/core/astryx.css';
import {content, initializeReference, prerequisites} from 'virtual:webreport-manual';
import {interfaceText} from './manual-locales.js';

const theme = defineTheme({name: 'webreport', color: {accent: '#075985', neutralStyle: 'cool'}});
const chapterIds = ['admin', 'designer', 'web', 'tra-cuu'];

const normalize = value => value.toLowerCase().replace(/[\u00c0-\u024f\u1e00-\u1eff]/g, letter =>
  letter.normalize('NFD').replace(/\p{M}/gu, '').replaceAll('đ', 'd')
);

function readTopics(chapters) {
  return chapters.map(chapter => {
    const section = document.getElementById(chapter.id);
    const topics = Array.from(section.querySelectorAll('h3[id]'), heading => {
      const descriptions = [heading.textContent];
      for (let element = heading.nextElementSibling; element && !element.matches('h2, h3'); element = element.nextElementSibling) {
        descriptions.push(element.textContent, element.dataset.cap ?? '');
      }
      return {id: heading.id, name: heading.textContent, search: normalize(descriptions.join(' '))};
    });
    return {...chapter, topics};
  });
}

function Contents({groups, query, active, onNavigate, labels}) {
  const term = normalize(query.trim());
  const filtered = groups.map(group => ({
    ...group,
    topics: group.topics.filter(topic => !term || topic.search.includes(term)),
  })).filter(group => !term || group.topics.length || normalize(group.name).includes(term));

  return (
    <VStack as="nav" aria-label={labels.contents} gap={4} onClick={onNavigate}>
      {!term && <a className="toc-heading" href="#tong-quan" aria-current={active === 'tong-quan' ? 'location' : undefined}>{labels.overview}</a>}
      {filtered.map(({id, name, topics}) => (
        <VStack as="section" key={id} gap={1}>
          <a className="toc-heading" href={'#' + id} aria-current={active === id ? 'location' : undefined}>{name}</a>
          {topics.map(topic => (
            <a className="toc-topic" key={topic.id} href={'#' + topic.id} aria-current={active === topic.id ? 'location' : undefined}>{topic.name}</a>
          ))}
        </VStack>
      ))}
      {!filtered.length && <Text as="p" color="secondary" role="status">{labels.noResults}</Text>}
    </VStack>
  );
}

const localizedArticle = {vi: {__html: content.vi}, ja: {__html: content.ja}};
const localizedIntro = {vi: {__html: prerequisites.vi}, ja: {__html: prerequisites.ja}};

function App() {
  const [language, setLanguage] = useState(() => {
    try { if (localStorage.getItem('webreport-language') === 'vi') return 'vi'; } catch {}
    return 'ja';
  });
  const labels = interfaceText[language];
  const chapters = chapterIds.map((id, i) => ({id, name: labels.sections[i][0], summary: labels.sections[i][1]}));
  const [groups, setGroups] = useState([]);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState('tong-quan');
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem('webreport-theme');
      if (saved) return saved === 'dark';
    } catch {}
    return matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const search = useRef(null);
  const menu = useRef(null);
  const dialog = useRef(null);
  const article = useRef(null);
  const languageTarget = useRef(null);
  const previousFocus = useRef(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = labels.title;
    initializeReference(article.current, language);
    setGroups(readTopics(chapters));
    const targets = [...document.querySelectorAll('#tong-quan, .manual-article > section[id], .manual-article h3[id]')];
    let frame = 0;
    function syncSection() {
      const headerBottom = document.querySelector('.manual-header').getBoundingClientRect().bottom;
      const current = targets.findLast(target => target.getBoundingClientRect().top <= headerBottom + 48);
      setActive(current?.id ?? 'tong-quan');
    }
    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(syncSection);
    }
    function jumpToHash() {
      const target = document.getElementById(languageTarget.current ?? location.hash.slice(1));
      languageTarget.current = null;
      if (target) target.scrollIntoView({behavior: 'instant'});
    }
    jumpToHash();
    syncSection();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [language]);

  useEffect(() => {
    function handleShortcut(event) {
      if (event.key === 'Escape' && menuOpen && !dialog.current?.open) {
        setMenuOpen(false);
        menu.current?.querySelector('button')?.focus();
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setMenuOpen(true);
        requestAnimationFrame(() => search.current?.focus());
      }
    }
    document.addEventListener('keydown', handleShortcut);
    return () => document.removeEventListener('keydown', handleShortcut);
  }, [menuOpen]);

  useEffect(() => {
    if (photo) dialog.current.showModal();
  }, [photo]);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    try { localStorage.setItem('webreport-theme', next ? 'dark' : 'light'); } catch {}
  }

  function changeLanguage(event) {
    const next = event.target.value;
    languageTarget.current = active;
    setLanguage(next);
    setQuery('');
    try { localStorage.setItem('webreport-language', next); } catch {}
  }

  function openPhoto(event) {
    const trigger = event.target.closest('.fig');
    if (!trigger) return;
    const image = trigger.querySelector('img');
    previousFocus.current = trigger;
    setPhoto({src: image.src, caption: image.alt});
  }

  function navigate(event) {
    const link = event.target.closest('a');
    if (!link) return;
    const target = document.getElementById(link.hash.slice(1));
    if (menuOpen && target) {
      target.tabIndex = -1;
      target.focus({preventScroll: true});
    }
    setMenuOpen(false);
  }

  return (
    <Theme theme={theme} mode={dark ? 'dark' : 'light'}>
      <VStack className="manual-app" as="section">
        <a className="skip-link" href="#manual-main">{labels.skip}</a>
        <HStack as="header" className="manual-header" hAlign="between" vAlign="center" gap={3}>
          <a href="#tong-quan" className="wordmark" aria-label={labels.home}>
            <HStack vAlign="center" gap={3}>
              <Text className="brand-mark" weight="bold" aria-hidden="true">W</Text>
              <VStack gap={0}>
                <Text className="brand-name" weight="bold">WebReport</Text>
                <Text className="brand-version" color="secondary">2.0 Smart</Text>
              </VStack>
            </HStack>
          </a>
          <HStack vAlign="center" gap={2}>
            <HStack className="mobile-menu" ref={menu}>
              <Button variant="secondary" label={labels.contents} aria-controls="manual-sidebar" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
            </HStack>
            <select className="language-picker" aria-label={labels.language} value={language} onChange={changeLanguage}>
              <option value="ja" lang="ja">日本語</option>
              <option value="vi" lang="vi">Tiếng Việt</option>
            </select>
            <Button variant="secondary" label={dark ? labels.light : labels.dark} onClick={toggleTheme} />
          </HStack>
        </HStack>
        <HStack as="section" className="manual-frame" vAlign="start">
          <VStack as="aside" id="manual-sidebar" className="manual-sidebar" data-open={menuOpen} gap={5}>
            <VStack gap={2}>
              <label htmlFor="manual-query" className="search-label">{labels.search}</label>
              <input id="manual-query" className="manual-query" ref={search} type="search" placeholder={labels.placeholder} value={query} onChange={event => setQuery(event.target.value)} />
            </VStack>
            <Contents groups={groups} query={query} active={active} onNavigate={navigate} labels={labels} />
          </VStack>
          <VStack as="main" id="manual-main" className="manual-main" tabIndex={-1}>
            <VStack as="section" id="tong-quan" className="hero" gap={4}>
              <Text as="p" className="hero-label" weight="bold">{labels.label}</Text>
              <Heading level={1} className="hero-heading">WebReport 2.0 Smart</Heading>
              <Text as="p" className="hero-summary">{labels.summary}</Text>
            </VStack>
            <VStack as="nav" className="chapter-list" aria-label={labels.chapters}>
              {chapters.map(chapter => (
                <a key={chapter.id} className="chapter-link" href={'#' + chapter.id}>
                  <Text weight="bold" className="chapter-name">{chapter.name}</Text>
                  <Text className="chapter-summary" color="secondary">{chapter.summary}</Text>
                </a>
              ))}
            </VStack>
            <VStack as="section" aria-label={labels.before} dangerouslySetInnerHTML={localizedIntro[language]} />
            <VStack key={language} ref={article} as="article" className="manual-article" dangerouslySetInnerHTML={localizedArticle[language]} onClick={openPhoto} />
          </VStack>
        </HStack>
        <dialog ref={dialog} className="photo-dialog" aria-label={labels.photo} onClick={event => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }} onClose={() => {
          setPhoto(null);
          previousFocus.current?.focus();
        }}>
          {photo && <VStack as="figure" gap={3}>
            <HStack hAlign="end"><Button variant="secondary" label={labels.close} onClick={() => dialog.current.close()} /></HStack>
            <img src={photo.src} alt={photo.caption} />
            <figcaption>{photo.caption}</figcaption>
          </VStack>}
        </dialog>
      </VStack>
    </Theme>
  );
}

createRoot(document.getElementById('root')).render(<App />);
