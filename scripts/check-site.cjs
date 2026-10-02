// 실행: NODE_PATH=<playwright가 설치된 경로> node scripts/check-site.cjs [사이트 URL]
const {chromium} = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const base = process.argv[2] || 'http://127.0.0.1:8767/index.html';
const documents = JSON.parse(fs.readFileSync(path.join(root,'assets/docs/navigation.json'))).docs;
(async () => {
  const browser = await chromium.launch({headless:true, ...(process.env.CHROME_PATH ? {executablePath:process.env.CHROME_PATH} : {})});
  const page = await browser.newPage();
  const errors=[];
  page.on('pageerror', error=>errors.push(error.message));
  const seen = new Map(), links=[];
  async function openDoc(doc='') {
    const url = new URL(base); if(doc)url.searchParams.set('doc',doc);
    await page.goto(url.href);
    await page.waitForSelector('.main[aria-busy="false"]');
    assert.equal(await page.locator('.error-panel').count(),0,doc);
  }
  await openDoc();
  assert.equal(await page.locator('.home-card').count(),5);
  for(const doc of documents) {
    await openDoc(doc.path);
    assert.equal(await page.locator('.main h1').first().textContent(),doc.title,doc.path);
    const data=await page.evaluate(()=>({ids:[...document.querySelectorAll('.main [id]')].map(x=>x.id),links:[...document.querySelectorAll('.main a')].map(x=>({href:x.href,doc:x.dataset.doc}))}));
    seen.set(doc.path,new Set(data.ids));links.push(...data.links.map(x=>({...x,source:doc.path})));
  }
  for(const link of links) {
    const url=new URL(link.href);
    if(url.origin!==new URL(base).origin)continue;
    if(url.pathname.endsWith('index.html') || url.pathname==='/') {
      const doc=url.searchParams.get('doc')||link.source;
      if(url.searchParams.has('doc'))assert.ok(fs.existsSync(path.join(root,doc)),`경로: ${doc}`);
      if(url.hash && seen.has(doc)) assert.ok(seen.get(doc).has(decodeURIComponent(url.hash.slice(1))),`앵커: ${link.source} → ${doc}${url.hash}`);
    } else {
      const target=decodeURIComponent(url.pathname.slice(new URL(base).pathname.replace(/index.html$/,'').length));
      assert.ok(fs.existsSync(path.join(root,target)),`리소스: ${target}`);
    }
  }
  await page.setViewportSize({width:320,height:844});
  for(const doc of documents){
    await openDoc(doc.path);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`모바일 넘침 ${doc.path}`);
  }
  for(const width of [320,390,768,1440]) {
    await page.setViewportSize({width,height:844});
    for(const doc of ['', 'Platforms/Codex/workflows.md','Platforms/Pi/reference/07-analysis-and-testing.md','Python/python_07_web_api_contract_guide.md']) {
      await openDoc(doc);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`넘침 ${width} ${doc}`);
    }
    if(width<=700) {
      const before=await page.locator('.main').boundingBox();
      await page.locator('.mobile').click();
      assert.equal(await page.locator('.sidebar[aria-modal="true"]').count(),1);
      assert.equal((await page.locator('.main').boundingBox()).y,before.y);
      await page.keyboard.press('Shift+Tab');
      assert.equal(await page.locator('#navigation summary').last().evaluate(x=>x===document.activeElement),true,'닫힌 그룹에서 초점 순환');
      await page.keyboard.press('Tab');
      assert.equal(await page.locator('.nav-close').evaluate(x=>x===document.activeElement),true,'닫기 버튼으로 초점 순환');
      await page.locator('#navigation summary').last().click();
      await page.locator('.nav-close').focus();
      await page.keyboard.press('Shift+Tab');
      assert.equal(await page.locator('#navigation a').last().evaluate(x=>x===document.activeElement),true,'열린 그룹에서 초점 순환');
      await page.keyboard.press('Tab');
      assert.equal(await page.locator('.nav-close').evaluate(x=>x===document.activeElement),true);
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('.mobile').evaluate(x=>x===document.activeElement),true);
      await page.locator('.mobile').click();
      await page.locator('#navigation a.selected').click();
      assert.equal(await page.locator('.sidebar.open').count(),0);
    }
  }
  const examplePath='Platforms/Pi/examples/basic-pi-package/README.md';
  for(const source of ['Platforms/Pi/README.md','Platforms/Pi/reference/04-starting-a-project.md','Platforms/Pi/reference/07-analysis-and-testing.md']) {
    await openDoc(source);
    await page.locator(`.main a[data-doc="${examplePath}"]`).first().click();
    await page.waitForFunction(()=>document.querySelector('.main h1')?.textContent==='Pi 로컬 예제 package');
    assert.equal(await page.locator('.error-panel').count(),0);
    assert.equal(new URL(page.url()).searchParams.get('doc'),examplePath);
  }
  await openDoc('Platforms/Codex/README.md');
  await page.locator('.main a[data-doc="Platforms/Codex/setup.md"]').first().click();
  await page.waitForFunction(()=>document.querySelector('.main h1')?.textContent.includes('환경'));
  await page.goBack();await page.waitForSelector('.main[aria-busy="false"]');
  assert.equal(await page.locator('.main h1').textContent(),'Codex 가이드');
  assert.equal(errors.length,0,errors.join('\n'));
  console.log(`문서 ${documents.length}개 데스크톱·모바일,  내부 링크·앵커 ${links.length}개, 4개 화면 폭, 메뉴·뒤로가기 검사 통과`);
  await browser.close();
})().catch(error=>{console.error(error);process.exit(1)});
