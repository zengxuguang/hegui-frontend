# AGENTS.md — hegui-frontend（前端实现仓）

本仓库是 HeGui 数据平台的 Vue3 + Element Plus 管理端实现。项目使用 OpenSpec 管理需求规范（`openspec/config.yaml` 指向 hegui-specs store），使用 SuperPowers 技能执行需求规格的应用。

在执行应用（apply）阶段，首要的是在本仓库内生成微步骤计划并归档至 `docs/<change>/plan.md`，再逐步执行（apply 编排详见 store 的 config.yaml operations 节与 `.qoder/rules/superpowers-openspec-guard.md`）。

## Propose 边界

本仓 propose 阶段只允许编写与当前仓库相关的工件（`specs/frontend/spec.md`、`design/frontend.md`、`tasks/frontend.md`），**禁止编写其他端（backend/api 契约）的工件**。本端 Scenario 必须能独立验收，不依赖"另一端已实现"作为前提；页面行为的验收可用契约一致的桩服务替代后端。spec 只描述可观察行为，不写框架、类名、目录结构；所属模块在 spec 的 Purpose 与场景标注中写明。

## Architecture

开始任务前必须理解现有架构：`src/config/modules.ts` 驱动菜单与路由、`src/api/request.ts` 统一请求与响应解包、`src/views/` 页面、`src/router/index.ts` 路由。

分析：模块职责、数据流向、状态归属、依赖关系、影响范围。修改代码前先理解调用链和影响范围，避免盲改。
多方案时，选：与现有架构最一致 → 维护成本最低 → 复杂度最低。
**禁止**引入新的架构模式。

## Reuse

复用优先级：现有业务模块 → Composable → 工具函数 → 项目依赖（Element Plus）→ 新代码。
发现已有实现时，优先复用或重构。
**禁止**：重复造轮子、语义重复的实现、引入第二套实现方式、绕过 `request.ts` 直接使用 axios/fetch。

## Root Cause

修复问题必须定位根因，当问题难以定位时，需利用浏览器开发者工具自行产生调试数据（console/网络请求）定位问题及修复。
**禁止**：无证据猜测、临时修补、条件堆叠、绕过或掩盖问题。
同时评估：重复状态、职责泄漏、循环依赖、边界不清晰、不合理抽象。

## Data First

采用数据驱动架构，减少直接数据源，多用计算属性。
推荐：Store/模块配置 → 计算属性 → 视图。
**禁止**将业务逻辑建立在 watch / emit / 定时器 / nextTick 链上。
状态必须有唯一来源：跨模块状态 → 集中管理，领域逻辑 → Composable，展示状态 → Component。
**禁止**：多副本状态、长期同步 Props 与本地状态、存储可推导数据。

## Testing

- 遵循 TDD。当前仓库尚未引入 Vitest（见 package.json），引入测试框架本身需走 change 流程；在此之前，验证基线为 `npm run build` 通过 + 页面手动验收。
- 问题修复，必须先明确复现步骤和正确标准，再修复。
- 测试业务行为，而非实现细节；外部依赖必须 mock。
- 禁止只测 happy path。

## Code Quality

代码应易于理解，而非追求技巧。
**优先**：清晰命名、单一职责、消除重复、减少副作用、显式数据流、TypeScript 类型完整。
**避免**：过长函数/组件、props 归属不清晰、隐式状态修改、魔法值、过度抽象。
**DRY**：优先复用已有 Type/Interface 与 modules.ts 模块清单，避免双源漂移。

## Validation

代码修改完成，需执行（全部通过后才可勾选 tasks 并提交 PR）：
1. `npm run build`
2. 开发服务器 `npm run dev` 联调后端，手动验收涉及页面行为

验证通过后执行代码审查（见 `.qoder/rules/superpowers-openspec-guard.md` §4）。

## Continuous Improvement

每次修改时消除重复、减少复杂度、统一实现、降低耦合、提升类型质量、改善可维护性。
减少概念数量比减少代码行数更重要。优先复用已有 Type/Interface，仅在代码无法自解释时才加注释。
