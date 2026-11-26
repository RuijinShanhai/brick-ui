import { build } from 'vite'
import { mkdirSync, writeFileSync, copyFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
const dir='component-package'
mkdirSync(dir+'/dist',{recursive:true})
await build({configFile:false,build:{lib:{entry:'components/src/index.ts',formats:['es'],fileName:()=> 'index.js'},outDir:dir+'/dist',emptyOutDir:true,rolldownOptions:{external:['vue']}}})
const ts=spawnSync(process.execPath,['node_modules/typescript/bin/tsc','--ignoreConfig','--declaration','--emitDeclarationOnly','--outDir',dir+'/dist','--target','ES2022','--module','ESNext','--moduleResolution','Bundler','--strict','--skipLibCheck','components/src/index.ts'],{stdio:'inherit'})
if(ts.status!==0)process.exit(ts.status??1)
copyFileSync('components/src/button/style.css',dir+'/dist/style.css')
copyFileSync('playground/public/licenses/antd-button-MIT.txt',dir+'/LICENSE')
writeFileSync(dir+'/package.json',JSON.stringify({name:'@brick/components',version:'0.1.0-button-full-r6',type:'module',license:'MIT',main:'./dist/index.js',types:'./dist/index.d.ts',exports:{'.':{types:'./dist/index.d.ts',import:'./dist/index.js'},'./button/style.css':'./dist/style.css'},files:['dist','LICENSE'],peerDependencies:{vue:'3.5.46'},sideEffects:['**/*.css']},null,2))
