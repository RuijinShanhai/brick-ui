import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { createHash } from 'node:crypto'
import assert from 'node:assert/strict'
import { parse, compileScript, compileTemplate } from '@vue/compiler-sfc'
const root = dirname(fileURLToPath(import.meta.url))
const read = path => readFileSync(resolve(root, path), 'utf8')
const data = JSON.parse(read('src/button-data.json'))
assert.deepEqual(data, JSON.parse(read('public/button.json')))
assert.equal(data.demos.length, 9)
assert.equal(data.api.length, 12)
assert.equal(new Set(data.demos.map(d => d.id)).size, 9)
assert.equal(data.demos.filter(d => d.debug).length, 0)
const markdown = read('public/button.md')
assert.equal(markdown, read('public/llms-full.txt'))
const results = []
for (const d of [...data.demos, ...data.supplementary]) {
  const filename = d.id + '.vue', source = read('src/demos/' + filename)
  assert.equal(source, d.code)
  assert.equal(createHash('sha256').update(source).digest('hex'), d.vueSourceSHA256)
  assert.ok(markdown.includes('```vue\n' + source + '\n```'))
  const { descriptor, errors } = parse(source, { filename })
  assert.equal(errors.length, 0, filename + ': SFC parse errors')
  const script = compileScript(descriptor, { id: d.id })
  const template = compileTemplate({ id: d.id, filename, source: descriptor.template.content,
    compilerOptions: { bindingMetadata: script.bindings, expressionPlugins: ['typescript'] } })
  assert.equal(template.errors.length, 0, filename + ': template compile errors: ' + template.errors)
  assert.ok(!/from\s*['"](?:ant-design-vue|antd)['"]/.test(source), 'AntD component substitute: ' + filename)
  results.push({ id: d.id, parse: 'pass', scriptCompile: 'pass', templateCompile: 'pass', documentCodeMatch: 'pass' })
}
console.log(JSON.stringify({ status: 'pass', results, limitations: [
  'SFC syntax compilation is not Vue semantic typechecking or browser verification.',
  'No proof of ButtonGroup/Icon runtime exports, component behavior, or CSS parity.'
] }, null, 2))
