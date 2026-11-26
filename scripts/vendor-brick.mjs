import { readFileSync, writeFileSync } from 'node:fs'
import { transform } from 'sucrase'
const code = transform(readFileSync('components/src/index.ts','utf8'), { transforms:['typescript'] }).code.replace("from 'vue'", "from './vue.js'")
const css = readFileSync('playground/src/style.css','utf8')
writeFileSync('playground/public/vendor/brick.js', `const style=document.createElement('style');style.textContent=${JSON.stringify(css)};document.head.appendChild(style);\n` + code)
