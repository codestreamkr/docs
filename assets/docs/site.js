import { marked } from './vendor/marked.esm.js';

const base = new URL('../../', import.meta.url);
const main = document.querySelector('.main');
const sidebar = document.querySelector('.sidebar');
const toggle = document.querySelector('.mobile');
const backdrop = document.querySelector('.nav-backdrop');
const toc = document.querySelector('.toc');
const menu = document.querySelector('#navigation');
let inventory;
let requestNumber = 0;
let tocObserver;

const pageURL = (path = '', hash = '') => {
  const url = new URL('index.html', base);
  if (path) url.searchParams.set('doc', path);
  url.hash = hash;
  return url.href;
};
const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const docLink = (path, label, extra = '') => `<a href="${escape(pageURL(path))}" data-doc="${escape(path)}" ${extra}>${escape(label)}</a>`;

function setDrawer(open) {
  sidebar.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  backdrop.hidden = !open;
  document.body.style.overflow = open ? 'hidden' : '';
  document.querySelectorAll('.top,.main,.toc,.mobile,.site-footer').forEach(node => node.inert = open);
  if (open) {
    sidebar.setAttribute('role', 'dialog');
    sidebar.setAttribute('aria-modal', 'true');
    document.querySelector('.nav-close').focus();
  } else {
    sidebar.removeAttribute('role');
    sidebar.removeAttribute('aria-modal');
    toggle.focus();
  }
}
toggle.onclick = () => setDrawer(true);
backdrop.onclick = () => setDrawer(false);
document.querySelector('.nav-close').onclick = () => setDrawer(false);
matchMedia('(max-width:700px)').addEventListener('change', event => {
  if (!event.matches && sidebar.classList.contains('open')) setDrawer(false);
});
document.addEventListener('keydown', event => {
  if (!sidebar.classList.contains('open')) return;
  if (event.key === 'Escape') setDrawer(false);
  if (event.key !== 'Tab') return;
  const nodes = [...sidebar.querySelectorAll('button,summary,a')].filter(node => {
    if (!node.getClientRects().length) return false;
    for (let parent = node.parentElement; parent && parent !== sidebar; parent = parent.parentElement) {
      if (parent.matches('details:not([open])') && parent.querySelector(':scope > summary') !== node) return false;
    }
    return true;
  });
  const first = nodes[0], last = nodes.at(-1);
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});

function renderNavigation(path) {
  const contains = item => item.path === path || item.children?.some(contains);
  const itemHTML = item => {
    const selected = item.path === path ? 'class="selected" aria-current="page"' : '';
    if (!item.children?.length) return docLink(item.path, item.label, selected);
    return `<details ${contains(item) ? 'open' : ''}><summary>${escape(item.label)}</summary><div class="children">${item.path ? docLink(item.path, '가이드', selected) : ''}${item.children.map(itemHTML).join('')}</div></details>`;
  };
  menu.innerHTML = inventory.groups.map(group => `<div class="caption">${escape(group.label)}</div>${group.items.map(itemHTML).join('')}`).join('');
}

function homeHTML() {
  const platforms = [
    ['Antigravity','A','지침과 Skill, Plugin·Hook·MCP 확장을 확인해요.'],
    ['Codex','C','세션 명령, Skill과 Worktree 작업을 연결해요.'],
    ['ClaudeCode','CC','CLAUDE.md, Skill·Subagent와 Hook을 활용해요.'],
    ['GrokBuild','G','Plan·Auto, 세션과 Workflow를 확인해요.'],
    ['Pi','π','Skill, Extension과 모델 연결을 구성해요.']
  ];
  const labels = { ClaudeCode: 'Claude Code', GrokBuild: 'Grok Build' };
  const playbooks = inventory.docs.filter(doc => doc.path.startsWith('Playbooks/') && !doc.path.endsWith('README.md'));
  const guides = [ ['Git','Git','변경 확인, 커밋과 충돌 해결'], ['Python','Python','환경 준비부터 웹 백엔드 운영까지'], ['IntelliJ','IntelliJ IDEA','런타임 디버깅과 사내 SSL 설정'], ['Macos','macOS','개발 머신의 프로세스와 저장공간 관리'] ];
  return `<div class="eyebrow">CODESTREAM / DOCUMENTATION</div><h1>개발의 다음 단계를<br>여기서 찾아요.</h1><p class="intro home-intro">AI 도구의 실행 방법부터 문제를 푸는 작업 순서까지.<br>지금 필요한 문서를 골라 바로 시작해요.</p><div class="callout"><b>처음 시작하나요?</b><br>${docLink('README.md','문서 안내')}에서 목적에 맞는 경로를 확인해요.</div><h2 id="platforms">AI 플랫폼</h2><p>같은 작업 방식, 도구마다 다른 실행 방법을 확인해요.</p><div class="home-grid">${platforms.map(([name,icon,description]) => `<a class="home-card" data-doc="Platforms/${name}/README.md" href="${pageURL(`Platforms/${name}/README.md`)}"><strong><span class="platform-icon" aria-hidden="true">${icon}</span>${labels[name] || name}</strong><p>${description}</p><small>가이드 보기 →</small></a>`).join('')}</div><h2 id="playbooks">Playbook</h2><p>여러 Skill을 이어야 한다면 문제에 맞는 흐름을 골라요.</p><ul class="home-list">${playbooks.map(doc => `<li>${docLink(doc.path,doc.title.replace(/^\d+\.\s*/,''))}</li>`).join('')}</ul><h2 id="guides">개발 가이드</h2><ul class="home-list">${guides.map(([folder,label,description]) => `<li><a href="${pageURL(`${folder}/README.md`)}" data-doc="${folder}/README.md"><strong>${label}</strong><small>${description} →</small></a></li>`).join('')}</ul>`;
}

// GitHub Markdown의 한글 앵커와 중복 제목을 지원해요.
function addHeadingIDs() {
  const duplicates = new Map();
  main.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach(heading => {
    if (heading.id) return;
    const slug = heading.textContent.trim().toLowerCase().replace(/[^\p{L}\p{N}\p{M}\-_\s]/gu, '').replace(/\s/g, '-');
    const count = duplicates.get(slug) || 0;
    duplicates.set(slug, count + 1);
    heading.id = count ? `${slug}-${count}` : slug;
  });
}

function rewriteLinks(path) {
  const source = new URL(path || 'README.md', base);
  main.querySelectorAll('a[href]').forEach(anchor => {
    const href = anchor.getAttribute('href');
    if (href.startsWith('#')) return;
    const url = new URL(href, source);
    if (/^https?:$/.test(url.protocol) && url.origin !== base.origin) {
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      return;
    }
    if (url.origin !== base.origin || !url.pathname.startsWith(base.pathname)) return;
    let target = decodeURIComponent(url.pathname.slice(base.pathname.length));
    if (target === 'index.md' || target === 'index.html') {
      anchor.href = pageURL('', url.hash);
      anchor.dataset.doc = '';
      return;
    }
    if (target.endsWith('/')) {
      if (inventory.docs.some(doc => doc.path === target + 'README.md')) target += 'README.md';
      else { anchor.href = url.href; return; }
    }
    if (target.endsWith('.html')) target = target.slice(0, -5) + '.md';
    if (target.endsWith('.md')) {
      anchor.href = pageURL(target, url.hash);
      anchor.dataset.doc = target;
    } else anchor.href = url.href;
  });
  main.querySelectorAll('img[src]').forEach(image => image.src = new URL(image.getAttribute('src'), source).href);
}

function enhanceContent() {
  const firstParagraph = main.querySelector('h1 + p');
  if (firstParagraph) firstParagraph.classList.add('intro');
  main.querySelectorAll('pre').forEach(pre => {
    const box = document.createElement('div');
    box.className = 'codebox';
    const language = pre.querySelector('code')?.className.replace('language-', '') || 'text';
    const label = language === 'bash' || language === 'sh' ? '터미널' : language === 'text' ? '입력 예제' : '설정·코드';
    const header = document.createElement('div');
    header.className = 'codehead';
    header.innerHTML = `<span>${label} · ${escape(language)}</span><button class="copy" aria-label="코드 복사">복사</button>`;
    header.querySelector('button').onclick = async event => {
      try { await navigator.clipboard.writeText(pre.textContent); event.target.textContent = '복사됨'; }
      catch { event.target.textContent = '권한 필요'; }
    };
    pre.before(box);
    box.append(header, pre);
  });
  main.querySelectorAll('table').forEach(table => {
    const hint = document.createElement('p'); hint.className = 'table-hint'; hint.textContent = '표를 좌우로 밀어 전체 내용을 볼 수 있어요.';
    const wrap = document.createElement('div'); wrap.className = 'tablewrap'; wrap.tabIndex = 0; wrap.setAttribute('aria-label', '문서 표');
    table.before(hint, wrap); wrap.append(table);
  });
}

function renderTOC() {
  tocObserver?.disconnect();
  const headings = [...main.querySelectorAll('h2,h3')];
  const links = headings.map(heading => `<a href="#${encodeURIComponent(heading.id)}" ${heading.tagName === 'H3' ? 'style="padding-left:22px"' : ''}>${escape(heading.textContent)}</a>`).join('');
  toc.innerHTML = headings.length ? `<strong>이 페이지에서</strong>${links}` : '';
  if (headings.length) {
    const mobileTOC = document.createElement('details'); mobileTOC.className = 'mobile-toc'; mobileTOC.innerHTML = `<summary>이 페이지의 목차</summary>${links}`;
    const intro = main.querySelector('h1 + p') || main.querySelector('h1');
    intro?.after(mobileTOC);
    mobileTOC.addEventListener('click', event => { if (event.target.closest('a')) mobileTOC.open = false; });
    tocObserver = new IntersectionObserver(entries => {
      const entry = entries.find(item => item.isIntersecting);
      if (!entry) return;
      toc.querySelectorAll('a').forEach(anchor => anchor.classList.toggle('active', decodeURIComponent(anchor.hash.slice(1)) === entry.target.id));
    }, {rootMargin:'-10% 0px -65% 0px'});
    headings.forEach(heading => tocObserver.observe(heading));
  }
}

function scrollToHash() {
  if (location.hash) {
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    target?.scrollIntoView();
  } else window.scrollTo(0, 0);
}

async function renderPage() {
  const ticket = ++requestNumber;
  const path = new URL(location.href).searchParams.get('doc') || '';
  main.setAttribute('aria-busy', 'true');
  toc.innerHTML = '';
  try {
    if (!inventory) {
      const response = await fetch(new URL('assets/docs/navigation.json', base));
      if (!response.ok) throw new Error('문서 목록을 불러오지 못했어요.');
      inventory = await response.json();
    }
    let source;
    if (path) {
      if (!/^(?:[\p{L}\p{N}_-]+\/)*[\p{L}\p{N}_.-]+\.md$/u.test(path)) throw new Error('문서 경로를 확인해 주세요.');
      const response = await fetch(new URL(path, base));
      if (!response.ok) throw new Error('문서를 찾을 수 없어요.');
      source = await response.text();
    }
    if (ticket !== requestNumber) return;
    renderNavigation(path);
    main.innerHTML = path ? marked.parse(source) : homeHTML();
    if (path) {
      const title = main.querySelector('h1')?.textContent || path;
      const breadcrumb = document.createElement('div'); breadcrumb.className = 'crumb';
      const folders = path.split('/').slice(0,-1).filter(folder => folder !== 'Platforms');
      breadcrumb.textContent = [...folders,title].join(' › ');
      main.prepend(breadcrumb);
      rewriteLinks(path);
      const sourceLink = document.createElement('a'); sourceLink.className = 'source-link'; sourceLink.href = new URL(path,base).href; sourceLink.textContent = 'Markdown 원문 보기';
      main.append(sourceLink);
    }
    addHeadingIDs();
    enhanceContent();
    renderTOC();
    document.title = `${main.querySelector('h1')?.textContent || '기술문서'} · CodeStream`;
    toggle.textContent = `☰ 문서 탐색${path ? ' · ' + (path.split('/')[0] === 'Platforms' ? path.split('/')[1] : path.split('/')[0].replace('.md','')) : ''}`;
    scrollToHash();
  } catch (error) {
    if (ticket !== requestNumber) return;
    main.innerHTML = `<div class="error-panel"><h1>문서를 열지 못했어요.</h1><p>${escape(error.message)}</p><a href="${pageURL()}">메인으로 돌아가기</a></div>`;
  } finally {
    if (ticket === requestNumber) main.setAttribute('aria-busy', 'false');
  }
}

document.addEventListener('click', event => {
  const anchor = event.target.closest('a');
  if (!anchor || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || anchor.hasAttribute('download') || anchor.target === '_blank') return;
  const url = new URL(anchor.href);
  if (url.origin !== base.origin || url.pathname !== new URL('index.html',base).pathname) return;
  const current = new URL(location.href);
  if (sidebar.classList.contains('open')) setDrawer(false);
  const nextDoc = url.searchParams.get('doc') || '';
  if (nextDoc === (current.searchParams.get('doc') || '')) {
    if (url.hash === current.hash) return;
    event.preventDefault(); history.pushState(null,'',url); scrollToHash(); return;
  }
  event.preventDefault(); history.pushState(null,'',url);
  renderPage().then(() => main.focus({preventScroll:true}));
});
window.addEventListener('popstate',renderPage);
window.addEventListener('hashchange',scrollToHash);
renderPage();
