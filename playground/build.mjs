import { spawnSync } from 'node:child_process'
for (const args of [['playground/sync-button-data.mjs'], ['node_modules/vite/bin/vite.js','build','--config','playground/vendor.config.ts'], ['node_modules/vite/bin/vite.js','build','playground']]) {
  const p=spawnSync(process.execPath,args,{stdio:'inherit'})
  if(p.status!==0) process.exit(p.status??1)
}
