// Reproducible offline catalog generation. Metadata is fixed in button-data.json;
// executable example code is always read from the actual Vue SFC, never a copy.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve, dirname } from 'node:path'
import { createHash } from 'node:crypto'
const root = dirname(fileURLToPath(import.meta.url))
const catalogPath = resolve(root, 'src/button-data.json')
const data = JSON.parse(readFileSync(catalogPath, 'utf8'))
data.install = "从文档下载组件tgz与demo-layout.css；本地执行 npm install ./brick-components-0.1.0-button-full-r6.tgz vue@3.5.46。导入 @brick/components 和 @brick/components/button/style.css；案例另外导入下载的 ./demo-layout.css。未发布公共npm，不能从公共registry直接安装@brick/components。"
data.downloads = { package: 'brick-components-0.1.0-button-full-r6.tgz', demoCSS: 'demo-layout.css' }
data.demoStyles = readFileSync(resolve(root, 'src/demo-layout.css'), 'utf8')
data.limitations = data.limitations.filter(x => !x.includes('Wave') && !x.includes('COMP-FULL-R1') && !x.includes('320全屏'))
const scopeLimit = '不声称全组件库、全可访问性或不可信代码隔离已经完成。'
if (!data.limitations.includes(scopeLimit)) data.limitations.push(scopeLimit)
data.limitations.push('精卫COMP-FULL-R2已集成。自主有限Wave仅可用非link原生按钮，固定550ms、本地token；reduced-motion不创建。没有上游computed-border动态取色/隐藏元素/CSP全局伪元素机制，不是上游完全等价动画。自主SVG存在像素差异。工程自检不是独立验收。')
data.loadingClarification = '固定原站loading最后两个交互按钮同文Click me!，第二个带poweroff图标。本页明确标为Click me!和Click with icon；保留上游React原文供追溯，不能将两个按钮当一个。'
data.faqImage = { url:'https://gw.alipayobjects.com/zos/antfincdn/Hz5HL9gsT4/f29f170d-b78d-4d2b-aa71-0da6a9ead4d9.png', source:'AntD3 fixed commit components/button/index.zh-CN.md L43', handling:'保留原始外部图链接以追溯FAQ，不复制第三方CDN图片入包；静态交付不依赖外图加载来解释空格规则。' }
data.faq = data.faq.split(' FAQ图来源：')[0] + ' FAQ图来源：' + data.faqImage.url + '；' + data.faqImage.handling
for (const item of data.mapping) {
  if(item.react === 'icon string / inline Icon') item.vue='icon具名slot优先于icon prop，空slot回退prop；Icon子节点保原顺序。具名slot为Brick扩展。'
  if(item.react === 'Button.Group') item.vue='命名导出ButtonGroup，无Button.Group静态别名；子Button显式size优先于Group继承，未指定时继承。'
}
const ids = ['basic', 'icon', 'size', 'disabled', 'loading', 'multiple', 'button-group', 'ghost', 'block']
if (data.demos.length !== 9 || ids.some(id => !data.demos.some(d => d.id === id)) || data.api.length !== 12)
  throw new Error('Fixed upstream coverage changed; explicit source review required')
if (data.demos.some(d => d.debug)) throw new Error('Public/debug inventory mismatch')
data.demos.find(d => d.id === 'loading').description['zh-CN'] = '添加 loading 属性可让按钮处于加载状态。原站原文“最后两个按钮演示点击后进入加载状态”对应本页 Click me! 与 Click with icon（带poweroff图标），不是本页补充的 Delayed loading / Reset loading。'
data.demos.find(d => d.id === 'icon').description['zh-CN'] = data.demos.find(d => d.id === 'icon').description['zh-CN'].split(' Brick补充：')[0] + ' Brick补充：本页末尾第10个Search按钮带尾部Icon，用于Vue子节点顺序映射，不计原站9个按钮。'
for (const demo of [...data.demos, ...data.supplementary]) {
  const path = resolve(root, 'src/demos', demo.id + '.vue')
  if (!existsSync(path)) throw new Error('Missing SFC: ' + demo.id)
  demo.code = readFileSync(path, 'utf8')
  demo.vueSourceSHA256 = createHash('sha256').update(demo.code).digest('hex')
}
const json = JSON.stringify(data, null, 2) + '\n'
writeFileSync(catalogPath, json)
writeFileSync(resolve(root, 'public/button.json'), json)
mkdirSync(resolve(root, 'public/docs'), { recursive: true })
writeFileSync(resolve(root, 'public/demo-layout.css'), data.demoStyles)
writeFileSync(resolve(root, 'public/docs/button.json'), json)
const md = ['# Brick Button 按钮', data.intro['zh-CN'], data.intro['en-US'],
  '## 何时使用', data.when['zh-CN'], data.when['en-US'], '## 安装与导入', data.install,
  '```ts\n' + data.imports + '\n```', '## 版本', JSON.stringify(data.versions),
  '## 下载与案例样式', `[组件tgz](./${data.downloads.package}) · [案例辅助CSS](./demo-layout.css)`,
  '```css\n' + data.demoStyles + '\n```', data.loadingClarification,
  '## API（React → Vue）', '|属性 / Vue 名称|上游类型|Vue 类型|Brick默认|上游默认（中 / 英）|Since|说明|', '|---|---|---|---|---|---|---|']
const cell = value => String(value).replaceAll('|', '&#124;').replaceAll('\n', ' ')
for (const a of data.api) md.push(`|${cell(a.name)} / ${cell(a.mapping)}|${cell(a.upstreamType)}|${cell(a.vueType)}|${cell(a.vueDefault)}|${cell(a.upstreamDefault['zh-CN'])} / ${cell(a.upstreamDefault['en-US'])}|${cell(a.since || '—')}|${cell(a.description['zh-CN'])} / ${cell(a.description['en-US'])}|`)
md.push('## 事件、Slots 与 Group', JSON.stringify(data.mapping, null, 2), JSON.stringify(data.groupAPI, null, 2), '## 全部公开案例（9）')
for (const d of data.demos) md.push('### ' + d.title['zh-CN'] + ' / ' + d.title['en-US'], d.description['zh-CN'], d.description['en-US'], '```vue\n' + d.code + '\n```')
md.push('## Brick 补充示例（不计上游公开案例）')
for (const d of data.supplementary) md.push('### ' + d.title['zh-CN'], d.description['zh-CN'], d.description['en-US'], '```vue\n' + d.code + '\n```')
md.push('## FAQ 与注意', data.faq, '## 隐藏与特殊项', JSON.stringify(data.specialItems, null, 2),
  '## 来源与许可', `${data.upstream.name} ${data.upstream.version} / ${data.upstream.commit} / ${data.upstream.license}`, ...data.links.map(l => l.url), '## 限制', ...data.limitations)
for (const file of ['button.md', 'llms-full.txt']) writeFileSync(resolve(root, 'public', file), md.join('\n\n') + '\n')
writeFileSync(resolve(root, 'public/docs/button.md'), md.join('\n\n').replaceAll('](./brick-components-', '](../brick-components-').replaceAll('](./demo-layout.css)', '](../demo-layout.css)') + '\n')
writeFileSync(resolve(root, 'public/llms.txt'), '# Brick Button\n\n> Vue + TypeScript candidate; AntD3 reference. LLM documents are a Brick addition.\n\n- [Button full reference](./button.md)\n- [Machine catalog](./button.json)\n- [Full text](./llms-full.txt)\n')
console.log(JSON.stringify({ counts: data.counts, sfcHashes: [...data.demos, ...data.supplementary].map(d => ({ id: d.id, sha256: d.vueSourceSHA256 })) }, null, 2))
