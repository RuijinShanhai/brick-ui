// A typed workspace descriptor, not a claimed project-generation CLI.
export const workspaceDescriptor = {
  stage: "initialization",
  directories: [
    ["components", "InitButton：最小基础动作包装"],
    ["pro-components", "WorkspaceDemo：按钮组合与响应式计数"],
    ["templates", "InitLayout：仅布局组合验证"],
    ["scaffolds", "workspaceDescriptor：类型化目录描述，尚非生成器"],
    ["playground", "Vue 应用入口：导入以上模块并验证联动"],
  ],
} as const;
