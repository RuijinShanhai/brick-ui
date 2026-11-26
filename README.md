# 砖块 Brick — 初始化验证

独立新项目初始化；没有既有HEAD/base，未commit/push/PR。非成熟组件库，未实现Ant Design/ProComponents全量API。五个真实workspace模块仅验证工程联动，scaffolds目前是描述模块而非生成器。

Node >=22.12.0（本轮24.22.2），pnpm12.23.0。`pnpm install --frozen-lockfile`，`pnpm typecheck`，`pnpm build`，`pnpm format`，`pnpm dev`。playground base固定/products/brick/，本地Vite URL后加该路径。静态产物playground/dist，待CI/他人短核后按既有授权发布，不自动覆盖其他产品。
