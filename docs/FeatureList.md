# GM Pilot 移动端 App 功能清单 (Feature Checklist)

> 版本: v1.1.0
> 更新时间: 2023-12
> 关联文档: [Master PRD](./PRD.md)

## 1. 核心看板 (Dashboard)
> 详情: [01_Dashboard.md](./requirements/01_Dashboard.md)

### 1.1 交付进度时间轴 (Timeline)
> [需求文档](./requirements/dashboard/timeline.md)
- [x] **节点状态展示**: Completed (绿), Active (蓝), Pending (灰), Risk (橙)。
- [x] **默认折叠**: 仅展示进行中或风险节点。
- [x] **展开全部**: 支持展开查看完整时间轴。
- [x] **进度概览**: 显示整体进度百分比。
- [x] **内容更新**:
  - “五险一金缴纳”节点：显示五险金额、一金金额及趋势。
  - “增减员与招退工”节点：显示本月增员、本月减员的具体人数。
- [x] **操作内嵌**: 节点支持跳转 Inbox 或详情页。

### 1.2 现金流走势环比 (Cash Flow Trend)
> [需求文档](./requirements/dashboard/cash_flow_trend.md)
- [x] **可视化图表**: 面积图对比本月实线与上月虚线。
- [x] **数据对比**: Tooltip 显示同期余额对比。
- [x] **跳转入口**: 跳转至资金流水详情。

### 1.3 支出构成分析 (Expenditure)
> [需求文档](./requirements/dashboard/expenditure.md)
- [x] **总额展示**: 显示本月支出合计。
- [x] **饼图可视化**: 工资、五险一金、税费、服务费占比。
- [x] **跳转入口**: 跳转至财税报表详情。

### 1.4 税前扣除限额监控 (Tax Limits)
> [需求文档](./requirements/dashboard/tax_limits.md)
- [x] **科目卡片**: 展示招待费、福利费等科目。
- [x] **进度条**: 可视化已用金额/限额标准。
- [x] **状态预警**: Safe, Warning, Critical (需纳税调整)。

### 1.5 人员规模趋势 (Personnel)
> [需求文档](./requirements/dashboard/personnel_trend.md)
- [x] **核心指标**: 在职人数及入离职变动。
- [x] **趋势图**: 近4个月人数变化面积图。

## 2. 智能待办 (Inbox)
> 详情: [02_Inbox.md](./requirements/02_Inbox.md)

### 2.1 账单置顶卡片 (Pinned Bill)
> [需求文档](./requirements/inbox/pinned_bill.md)
- [x] **触发条件**: 服务费账单等 CONFIRM 类型任务。
- [x] **视觉强调**: 独立卡片样式。
- [x] **快捷操作**: “立即支付”按钮。

### 2.2 任务聚合与列表 (Task Grouping)
> [需求文档](./requirements/inbox/task_grouping.md)
- [x] **任务聚合**: 入职任务组、OA 审批组。
- [x] **列表展示**: 高优任务平铺，普通任务排序。
- [x] **优先级视觉**: 红点或高亮标识。

### 2.3 OA 审批详情 (OA Workflow)
> [需求文档](./requirements/inbox/oa_workflow.md)
- [x] **角色切换**: 待我审批 / 我发起的。
- [x] **状态筛选**: 待处理/已处理/审批中等。
- [x] **流程节点**: 显示当前审批流转节点。