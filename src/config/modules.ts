// 模块清单：与 store 的 openspec/specs/ 目录一一对应。
// 侧边栏菜单与路由均由本清单驱动；新增模块时在此登记。
export interface ModuleDef {
  /** 路由路径 */
  path: string
  /** 显示名称 */
  title: string
  /** store 中的模块标识（specs/{module}） */
  module: string
}

export const modules: ModuleDef[] = [
  { path: '/requirements', title: '需求管理', module: 'requirements-mgmt' },
  { path: '/requirement-reviews', title: '需求评审', module: 'requirements-review' },
  { path: '/metrics', title: '指标管理', module: 'metrics-mgmt' },
  { path: '/dimensions', title: '维度管理', module: 'dimension-mgmt' },
  { path: '/models', title: '数据建模', module: 'data-modeling' },
  { path: '/data-development', title: '数据开发', module: 'data-development' },
  { path: '/data-analysis', title: '数据分析', module: 'data-analysis' },
  { path: '/metadata', title: '元数据管理', module: 'metadata-mgmt' },
  { path: '/knowledge-base', title: '知识库', module: 'knowledge-base' },
  { path: '/data-lineage', title: '数据血缘', module: 'data-lineage' },
]
