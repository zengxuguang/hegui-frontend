---
trigger: always_on
alwaysApply: true
---

# Superpowers × OpenSpec 工程纪律（强制 · 实现仓版）

Superpowers 技能服务于 hegui 项目的 OpenSpec 六步工作流（explore → propose → apply → verify → sync → archive）。
两套机制冲突时，**OpenSpec 制品流程优先**；superpowers 技能负责各阶段内部的执行纪律，不得替代 openspec 命令。

## 1. 本仓定位（实现仓）

- 本仓是 hegui 四仓拓扑中的**实现仓**（hegui-backend / hegui-frontend / hegui-api 之一）；
- 本仓 `openspec/config.yaml` 只有 `store: hegui-specs` 指针：所有 openspec 命令作用于 hegui-specs store；
  规范（specs/）、变更（changes/）、门禁 rules 均由 store 统一管理，**不要在本仓创建规范或变更制品**；
- 规范变更一律在 **hegui-specs 仓**发起 change（explore → propose → apply → verify → sync → archive）；
  本仓只承接 **apply 阶段**的实现写入；
- 实现必须与 hegui-api 的 OpenAPI 契约、hegui-specs 中对应模块 spec 的场景保持一致。

## 2. 阶段映射（按当前 OpenSpec 阶段自动应用对应技能）

| OpenSpec 阶段 | 必用 Superpowers 技能 | 纪律要求 |
|---|---|---|
| explore 摸底 | brainstorming | 苏格拉底式澄清需求，先问清再动手；产出设计共识后才可进 propose |
| propose 规划 | writing-plans | 把 spec 拆成 2 小时以内的任务，写明文件路径与依赖，落盘 tasks.md |
| apply 施工 | executing-plans / test-driven-development | 按计划逐步执行，每步验证；严格 TDD（见 §3） |
| verify 质检 | verification-before-completion / requesting-code-review | 证据先行 + 独立审查（见 §4、§5） |
| sync / archive | finishing-a-development-branch / chinese-commit-conventions | 分支合并决策 + 规范 commit message |
| 任意阶段遇 bug | systematic-debugging | 四阶段根因分析，禁止盲改（见 §6） |

> 本仓日常开发大多处于 apply / verify 阶段；explore / propose 阶段请在 hegui-specs 仓进行。

## 3. TDD 铁律（apply 阶段强制）

- 任何功能实现或 bug 修复，**必须先写失败测试，再写实现**（RED → GREEN → REFACTOR）。
- 先写实现后补测试视为违规：删掉实现，从测试重来。
- 不允许以"这个不好测试"为由跳过测试；确实难测时，先在 tasks.md 登记并说明，经确认后才能调整。
- 验证命令基线：hegui-backend 用 `go build ./...`、`go test ./...`；hegui-frontend 用 `npm run build` 及单测；hegui-api 以 OpenAPI 契约校验为准。

## 4. 完成前验证（verify 阶段强制）

- 声称"完成 / 已修复 / 测试通过"之前，**必须实际运行验证命令并出示输出**。
- 无验证证据不得把 tasks.md 任务标记为 [x]；"看起来对"不是证据。
- 验证失败时回到 apply（verify-fail），禁止带着失败进入 sync。

## 5. 代码审查纪律

- 每个 Phase 完成后、进入下一 Phase 前，必须用 requesting-code-review 派独立审查。
- 收到审查反馈后用 receiving-code-review 处理：技术存疑的反馈要先验证再改，**不得盲从、也不得敷衍**；拒绝修改需给出理由。
- 跨模块交互的代码，审查时必须核对双方 spec 的场景是否覆盖。

## 6. 调试纪律

遇到任何 bug、测试失败或异常行为：先走 systematic-debugging 四阶段（定位 → 分析 → 假设 → 修复验证），
在没有找到根因之前**禁止**直接改代码"试试看"。

## 7. 写入范围限制

- 本仓只写实现代码与测试；规范 / 变更产物（specs、changes）只进 hegui-specs store。
- `.qoder/rules/` 与 `.qoder/skills/` 的规则、技能文件不属于 change 范围，未经用户明确要求不得修改或删除。
- 每个变更一个分支：`feature/{module}-{change-name}`；分支收尾走 finishing-a-development-branch 流程。
