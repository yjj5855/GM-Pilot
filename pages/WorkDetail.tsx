import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Download, 
  Search, 
  Filter, 
  MoreHorizontal, 
  FileText, 
  ChevronRight, 
  Calendar,
  TrendingUp,
  User,
  BadgeCheck,
  AlertCircle,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  FileSpreadsheet,
  Receipt,
  PieChart as PieChartIcon,
  Filter as FilterIcon,
  Wallet,
  TrendingDown,
  CheckCircle2,
  Building,
  Users,
  Send,
  MessageCircle,
  Activity,
  FileBarChart,
  Briefcase,
  AlertTriangle,
  HelpCircle,
  FileBadge,
  MessageSquare,
  AlertOctagon
} from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, Legend, AreaChart, Area, XAxis, CartesianGrid, BarChart, Bar } from 'recharts';

// --- Mock Data ---

const MOCK_PAYROLL_HISTORY = [
  { month: '2023-12', amount: '425,000.00', status: '待确认', count: 32, date: '12-05' },
  { month: '2023-11', amount: '418,200.00', status: '已发放', count: 32, date: '11-05' },
  { month: '2023-10', amount: '415,000.00', status: '已发放', count: 30, date: '10-05' },
  { month: '2023-09', amount: '415,000.00', status: '已发放', count: 30, date: '09-05' },
];

const MOCK_PAYROLL_BREAKDOWN = [
  { name: '基本工资', value: 280000, color: '#3B82F6' },
  { name: '绩效奖金', value: 85000, color: '#8B5CF6' },
  { name: '五险一金', value: 50000, color: '#10B981' },
  { name: '个税', value: 10000, color: '#F59E0B' },
];

const MOCK_EMPLOYEES = [
  { id: 1, name: '张伟', dept: '技术部', role: '高级工程师', status: '正式', joinDate: '2021-03-15' },
  { id: 2, name: '李娜', dept: '市场部', role: '市场经理', status: '正式', joinDate: '2022-06-01' },
  { id: 3, name: '王强', dept: '技术部', role: '前端开发', status: '试用', joinDate: '2023-11-10' },
  { id: 4, name: '赵敏', dept: '人事部', role: 'HRBP', status: '正式', joinDate: '2020-09-20' },
  { id: 5, name: '陈晨', dept: '设计部', role: 'UI设计师', status: '离职中', joinDate: '2021-11-05' },
];

const MOCK_VOUCHERS = [
  { id: 'v1', code: '记-001', summary: '支付12月办公室房租', amount: '45,000.00', date: '2023-12-01', status: '已审核', type: '支出' },
  { id: 'v2', code: '记-002', summary: '收到技术服务费', amount: '120,000.00', date: '2023-12-03', status: '已审核', type: '收入' },
  { id: 'v3', code: '记-003', summary: '员工11月差旅报销', amount: '3,240.00', date: '2023-12-05', status: '待审核', type: '支出' },
  { id: 'v4', code: '记-004', summary: '采购办公电脑设备', amount: '12,800.00', date: '2023-12-06', status: '待审核', type: '支出' },
];

const MOCK_INVOICES = [
  { id: 'i1', code: '031002300111', name: '阿里云计算有限公司', amount: '12,000.00', date: '2023-12-01', type: '专票', status: '已认证' },
  { id: 'i2', code: '031002300222', name: '上海京东世纪贸易有限公司', amount: '4,500.00', date: '2023-12-02', type: '普票', status: '已入账' },
  { id: 'i3', code: '031002300333', name: '滴滴出行科技有限公司', amount: '850.00', date: '2023-12-05', type: '电子', status: '审核中' },
];

const MOCK_TAX_RECORDS = [
  { id: 1, title: '2023年11月 增值税及附加', amount: '12,500.00', status: '已缴款', type: '增值税', date: '2023-12-10' },
  { id: 2, title: '2023年11月 个人所得税', amount: '8,230.00', status: '申报中', type: '个税', date: '2023-12-08' },
  { id: 3, title: '2023年10月 增值税及附加', amount: '11,800.00', status: '已缴款', type: '增值税', date: '2023-11-12' },
];

const MOCK_FLOWS = [
    { id: 'f1', title: '收到技术服务费', party: '上海某某科技有限公司', amount: '120,000.00', type: 'in', date: '12-12 14:30', status: '成功' },
    { id: 'f2', title: '支付办公室租金', party: '上海物业管理有限公司', amount: '45,000.00', type: 'out', date: '12-01 09:00', status: '成功' },
    { id: 'f3', title: '支付阿里云账单', party: '阿里云计算有限公司', amount: '12,000.00', type: 'out', date: '12-05 10:15', status: '成功' },
    { id: 'f4', title: '提现-备用金', party: '基本户提现', amount: '5,000.00', type: 'out', date: '12-08 11:00', status: '处理中' },
];

const MOCK_SOCIAL_SECURITY = {
    total: 98500.00,
    companyPart: 68500.00,
    personalPart: 30000.00,
    month: '2023-12',
    status: 'pending', // pending, paid
    changes: { add: 3, remove: 1 },
    list: [
        { name: '王强', type: '新增', base: 12000, company: 3800, personal: 1200 },
        { name: '陈晨', type: '停缴', base: 10000, company: 0, personal: 0 },
        { name: '张伟', type: '正常', base: 25000, company: 8000, personal: 3500 },
    ]
};

const MOCK_CONTRACTS = [
    { id: 1, name: '王强', type: '劳动合同', endDate: '2026-11-10', status: 'normal' },
    { id: 2, name: '李娜', type: '劳动合同', endDate: '2024-01-15', status: 'expiring' }, // Expiring soon
    { id: 3, name: '陈晨', type: '解除协议', endDate: '2023-12-31', status: 'terminating' },
    { id: 4, name: '张伟', type: '保密协议', endDate: '2025-03-15', status: 'normal' },
];

const MOCK_FINANCIAL_REPORTS = [
    { id: 1, name: '2023年11月 资产负债表', type: 'PDF', size: '1.2MB', date: '12-05' },
    { id: 2, name: '2023年11月 利润表', type: 'Excel', size: '0.8MB', date: '12-05' },
    { id: 3, name: '2023年11月 现金流量表', type: 'PDF', size: '1.1MB', date: '12-05' },
    { id: 4, name: '2023年11月 纳税申报表', type: 'PDF', size: '2.5MB', date: '12-10' },
];

const MOCK_SERVICE_TICKETS = [
    { id: 't1', type: 'ot-2', title: '张伟-在职证明开具', status: '处理中', date: '12-12', update: '正在盖章中' },
    { id: 't2', type: 'ot-1', title: '高新技术企业税收优惠咨询', status: '已回复', date: '12-10', update: '外包专家已回复' },
    { id: 't3', type: 'ot-4', title: '11月个税申报异常处理', status: '已办结', date: '12-01', update: '已修正并重新申报' },
];

// --- Sub-Views ---

const PayrollView = () => (
  <div className="space-y-6">
    {/* Summary Card */}
    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg shadow-blue-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-blue-100 text-xs font-medium mb-1">本月预计支出 (12月)</p>
          <h2 className="text-3xl font-bold font-mono tracking-tight">¥ 425,000.00</h2>
        </div>
        <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
          <TrendingUp size={20} className="text-white" />
        </div>
      </div>
      <div className="flex gap-4 text-xs text-blue-100 border-t border-white/10 pt-4">
        <div className="flex items-center gap-1">
           <span className="opacity-70">实发:</span>
           <span className="font-bold">¥ 280k</span>
        </div>
        <div className="w-px h-3 bg-white/20 my-auto"></div>
        <div className="flex items-center gap-1">
           <span className="opacity-70">五险:</span>
           <span className="font-bold">¥ 50k</span>
        </div>
        <div className="w-px h-3 bg-white/20 my-auto"></div>
        <div className="flex items-center gap-1">
           <span className="opacity-70">个税:</span>
           <span className="font-bold">¥ 10k</span>
        </div>
      </div>
    </div>

    {/* Chart Section */}
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <PieChartIcon size={16} className="text-gray-400"/> 本月薪酬构成
        </h3>
        <div className="h-48 w-full flex items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={MOCK_PAYROLL_BREAKDOWN}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {MOCK_PAYROLL_BREAKDOWN.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                        ))}
                    </Pie>
                    <RechartsTooltip 
                        formatter={(value: number) => `¥${value.toLocaleString()}`}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px' }}
                    />
                    <Legend 
                        layout="vertical" 
                        verticalAlign="middle" 
                        align="right"
                        iconSize={8}
                        wrapperStyle={{ fontSize: '12px' }}
                    />
                </PieChart>
             </ResponsiveContainer>
        </div>
    </div>

    {/* Actions */}
    <div className="flex gap-3">
        <button className="flex-1 bg-white border border-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-bold shadow-sm flex items-center justify-center gap-2 active:bg-gray-50">
            <Calendar size={16} /> 调整周期
        </button>
        <button className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl text-sm font-bold shadow-sm shadow-blue-100 flex items-center justify-center gap-2 active:bg-blue-700">
            <Download size={16} /> 下载工资表
        </button>
    </div>

    {/* History List */}
    <div>
        <h3 className="text-sm font-bold text-gray-900 mb-3 ml-1">发放记录</h3>
        <div className="space-y-3">
            {MOCK_PAYROLL_HISTORY.map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center justify-between active:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 font-bold text-xs border border-gray-100">
                            {parseInt(item.month.split('-')[1])}月
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-900">{item.month} 工资表</p>
                            <p className="text-xs text-gray-400 mt-0.5">{item.count}人 · {item.date} 发起</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-mono font-bold text-gray-900">¥{parseInt(item.amount).toLocaleString()}</p>
                        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                            item.status === '已发放' ? 'text-green-600 bg-green-50' : 'text-blue-600 bg-blue-50'
                        }`}>
                            {item.status}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    </div>
  </div>
);

const EmployeeView = () => {
  const [tab, setTab] = useState<'ALL' | 'NEW' | 'LEAVING'>('ALL');
  
  const filteredEmployees = MOCK_EMPLOYEES.filter(e => {
      if (tab === 'NEW') return e.status === '试用';
      if (tab === 'LEAVING') return e.status === '离职中';
      return true;
  });

  return (
    <div className="space-y-4">
        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3">
            <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-xs text-gray-400 mb-1">在职员工</p>
                <p className="text-xl font-bold text-gray-900">32</p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-xs text-gray-400 mb-1">本月入职</p>
                <p className="text-xl font-bold text-emerald-600 flex items-center gap-1">
                    3 <ArrowUpRight size={14} strokeWidth={3}/>
                </p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-xs text-gray-400 mb-1">离职办理</p>
                <p className="text-xl font-bold text-orange-600 flex items-center gap-1">
                    1 <ArrowDownLeft size={14} strokeWidth={3}/>
                </p>
            </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 p-1 rounded-xl">
            {(['ALL', 'NEW', 'LEAVING'] as const).map(t => (
                <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                        tab === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'
                    }`}
                >
                    {t === 'ALL' ? '全部人员' : t === 'NEW' ? '新入职' : '离职中'}
                </button>
            ))}
        </div>

        {/* Search */}
        <div className="relative">
            <input 
                type="text" 
                placeholder="搜索姓名、部门..." 
                className="w-full h-10 pl-10 pr-4 rounded-xl bg-gray-100 border-none text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all text-sm"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>

        {/* List */}
        <div className="space-y-3">
            {filteredEmployees.map((emp) => (
                <div key={emp.id} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center justify-between active:scale-[0.99] transition-transform">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm ${
                            emp.id % 2 === 0 ? 'bg-indigo-400' : 'bg-blue-400'
                        }`}>
                            {emp.name.substring(0, 1)}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-sm font-bold text-gray-900">{emp.name}</h3>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                                    emp.status === '正式' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                    emp.status === '试用' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                    'bg-gray-50 text-gray-500 border-gray-200'
                                }`}>{emp.status}</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-0.5">{emp.dept} · {emp.role}</p>
                        </div>
                    </div>
                    <ChevronRight size={18} className="text-gray-300" />
                </div>
            ))}
            {filteredEmployees.length === 0 && (
                <div className="text-center py-10 text-gray-400 text-xs">
                    暂无相关人员
                </div>
            )}
        </div>
    </div>
  );
};

const SocialSecurityView = () => (
    <div className="space-y-6">
        {/* Main Card */}
        <div className="bg-emerald-600 rounded-2xl p-6 text-white shadow-lg shadow-emerald-200 relative overflow-hidden">
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-emerald-100 text-xs font-medium mb-1">12月 五险一金缴纳总额</p>
                        <h2 className="text-3xl font-bold font-mono tracking-tight">¥ {MOCK_SOCIAL_SECURITY.total.toLocaleString()}</h2>
                    </div>
                    <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm border border-white/10">
                        <Users size={20} className="text-white" />
                    </div>
                </div>
                <div className="flex gap-4 text-xs text-emerald-100 border-t border-white/10 pt-4">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-200"></div>
                        <span className="opacity-80">单位承担</span>
                        <span className="font-mono font-bold">¥ {MOCK_SOCIAL_SECURITY.companyPart.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-300"></div>
                        <span className="opacity-80">个人承担</span>
                        <span className="font-mono font-bold">¥ {MOCK_SOCIAL_SECURITY.personalPart.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Change Stats */}
        <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-xs text-gray-400">本月增员</p>
                    <p className="text-xl font-bold text-gray-900 mt-1">+{MOCK_SOCIAL_SECURITY.changes.add}</p>
                </div>
                <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                    <UserPlusIcon size={18} />
                </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-xs text-gray-400">本月减员</p>
                    <p className="text-xl font-bold text-gray-900 mt-1">-{MOCK_SOCIAL_SECURITY.changes.remove}</p>
                </div>
                <div className="bg-orange-50 p-2 rounded-lg text-orange-600">
                    <UserMinusIcon size={18} />
                </div>
            </div>
        </div>

        {/* List */}
        <div>
            <div className="flex justify-between items-center mb-3 px-1">
                <h3 className="text-sm font-bold text-gray-900">变动明细</h3>
                <button className="text-xs text-blue-600 font-bold flex items-center gap-1">
                    下载月报 <Download size={12}/>
                </button>
            </div>
            <div className="space-y-3">
                {MOCK_SOCIAL_SECURITY.list.map((item, idx) => (
                    <div key={idx} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center justify-between">
                         <div className="flex items-center gap-3">
                             <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                 item.type === '新增' ? 'bg-blue-100 text-blue-700' :
                                 item.type === '停缴' ? 'bg-orange-100 text-orange-700' :
                                 'bg-gray-100 text-gray-600'
                             }`}>
                                 {item.type}
                             </div>
                             <div>
                                 <p className="text-sm font-bold text-gray-900">{item.name}</p>
                                 <p className="text-[10px] text-gray-400 mt-0.5">基数: ¥{item.base}</p>
                             </div>
                         </div>
                         <div className="text-right">
                             <p className="text-xs font-bold text-gray-900">¥{(item.company + item.personal).toLocaleString()}</p>
                             <p className="text-[10px] text-gray-400 mt-0.5">个人: ¥{item.personal}</p>
                         </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const ContractView = () => (
    <div className="space-y-6">
        {/* Stats */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            <div className="min-w-[140px] bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                 <div className="flex items-center gap-2 mb-2 text-gray-400">
                     <FileText size={14}/> <span className="text-xs">在职合同</span>
                 </div>
                 <p className="text-2xl font-bold text-gray-900">32</p>
            </div>
            <div className="min-w-[140px] bg-orange-50 p-4 rounded-xl border border-orange-100 shadow-sm">
                 <div className="flex items-center gap-2 mb-2 text-orange-600">
                     <Clock size={14}/> <span className="text-xs font-bold">30天内到期</span>
                 </div>
                 <p className="text-2xl font-bold text-orange-700">2</p>
            </div>
            <div className="min-w-[140px] bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                 <div className="flex items-center gap-2 mb-2 text-gray-400">
                     <AlertCircle size={14}/> <span className="text-xs">已过期</span>
                 </div>
                 <p className="text-2xl font-bold text-gray-900">0</p>
            </div>
        </div>

        {/* List */}
        <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3 px-1">合同列表</h3>
            <div className="space-y-3">
                {MOCK_CONTRACTS.map((contract) => (
                    <div key={contract.id} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm relative overflow-hidden">
                        {contract.status === 'expiring' && (
                            <div className="absolute top-0 right-0 w-2 h-full bg-orange-500"></div>
                        )}
                        <div className="flex justify-between items-start mb-2">
                             <div className="flex items-center gap-2">
                                 <h4 className="text-sm font-bold text-gray-900">{contract.name}</h4>
                                 <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{contract.type}</span>
                             </div>
                             {contract.status === 'expiring' && (
                                 <span className="text-[10px] font-bold text-orange-600 flex items-center gap-1 bg-orange-50 px-2 py-0.5 rounded-full">
                                     <Clock size={10}/> 即将到期
                                 </span>
                             )}
                             {contract.status === 'terminating' && (
                                 <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                     离职办理中
                                 </span>
                             )}
                        </div>
                        <div className="flex justify-between items-end">
                            <p className="text-xs text-gray-400">到期日: {contract.endDate}</p>
                            <button className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg active:bg-blue-100">
                                查看附件
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const FinancialReportView = () => (
    <div className="space-y-6">
        {/* Trend Chart */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
             <div className="flex justify-between items-center mb-4">
                 <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                     <FileBarChart size={16} className="text-indigo-600"/> 经营概况 (近半年)
                 </h3>
                 <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">单位: 万元</span>
             </div>
             <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={[
                        {name: '7月', income: 45, expense: 38},
                        {name: '8月', income: 52, expense: 40},
                        {name: '9月', income: 48, expense: 42},
                        {name: '10月', income: 60, expense: 45},
                        {name: '11月', income: 55, expense: 43},
                        {name: '12月', income: 62, expense: 29},
                    ]}>
                        <defs>
                            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6"/>
                        <XAxis dataKey="name" tick={{fontSize: 10, fill: '#9ca3af'}} axisLine={false} tickLine={false}/>
                        <RechartsTooltip contentStyle={{borderRadius: '8px', fontSize: '12px'}}/>
                        <Area type="monotone" dataKey="income" stroke="#3B82F6" strokeWidth={2} fill="url(#colorIncome)" />
                        <Area type="monotone" dataKey="expense" stroke="#94a3b8" strokeWidth={2} strokeDasharray="4 4" fill="transparent" />
                    </AreaChart>
                </ResponsiveContainer>
             </div>
             <div className="flex justify-center gap-4 mt-2">
                 <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                     <div className="w-2 h-2 rounded-full bg-blue-500"></div> 收入
                 </div>
                 <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                     <div className="w-2 h-2 rounded-full bg-slate-400"></div> 支出
                 </div>
             </div>
        </div>

        {/* Report Files */}
        <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3 px-1">月度报表下载</h3>
            <div className="space-y-3">
                {MOCK_FINANCIAL_REPORTS.map((file) => (
                    <div key={file.id} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center justify-between">
                         <div className="flex items-center gap-3">
                             <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                 file.type === 'PDF' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                             }`}>
                                 <FileText size={20} />
                             </div>
                             <div>
                                 <p className="text-sm font-bold text-gray-900 line-clamp-1">{file.name}</p>
                                 <p className="text-[10px] text-gray-400 mt-0.5">{file.date} 上传 · {file.size}</p>
                             </div>
                         </div>
                         <button className="text-gray-400 p-2 hover:bg-gray-50 rounded-full transition-colors">
                             <Download size={18} />
                         </button>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const ServiceRequestView = ({ type }: { type: string }) => {
    let title = "综合服务";
    let icon = <HelpCircle size={20} />;
    
    if (type.includes('ot-1')) { title = "政策咨询"; icon = <MessageSquare size={20}/>; }
    if (type.includes('ot-2')) { title = "证明开具"; icon = <FileBadge size={20}/>; }
    if (type.includes('ot-3')) { title = "口径确认"; icon = <CheckCircle2 size={20}/>; }
    if (type.includes('ot-4')) { title = "异常处理"; icon = <AlertOctagon size={20}/>; }

    return (
        <div className="space-y-6">
             {/* Initiate New */}
             <div className="bg-purple-600 rounded-2xl p-6 text-white shadow-lg shadow-purple-200">
                  <div className="flex items-center gap-3 mb-4">
                      <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-sm">
                          {icon}
                      </div>
                      <h2 className="text-xl font-bold">{title}</h2>
                  </div>
                  <p className="text-purple-100 text-sm mb-6 opacity-90 leading-relaxed">
                      遇到问题或需要支持？您可以直接发起新的服务请求，外包专家将在 2 小时内响应。
                  </p>
                  <button className="w-full bg-white text-purple-700 py-3 rounded-xl text-sm font-bold shadow-sm active:bg-gray-50 transition-colors">
                      + 发起新请求
                  </button>
             </div>

             {/* History */}
             <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3 px-1">服务记录</h3>
                <div className="space-y-3">
                    {MOCK_SERVICE_TICKETS.filter(t => t.type === type || type === 'all').length > 0 ? (
                        MOCK_SERVICE_TICKETS.filter(t => t.type === type || type === 'all').map(ticket => (
                            <div key={ticket.id} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-[10px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">ID: {ticket.id}</span>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                        ticket.status === '处理中' ? 'bg-blue-50 text-blue-600' :
                                        ticket.status === '已回复' ? 'bg-green-50 text-green-600' :
                                        'bg-gray-100 text-gray-500'
                                    }`}>{ticket.status}</span>
                                </div>
                                <h4 className="text-sm font-bold text-gray-900 mb-2">{ticket.title}</h4>
                                <div className="bg-gray-50 rounded-lg p-2.5">
                                    <div className="flex items-start gap-2">
                                        <MessageCircle size={14} className="text-gray-400 mt-0.5 shrink-0"/>
                                        <p className="text-xs text-gray-600 line-clamp-2">最新进展：{ticket.update}</p>
                                    </div>
                                </div>
                                <div className="mt-2 text-right text-[10px] text-gray-400">
                                    更新于 {ticket.date}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10 text-gray-400 text-xs bg-white rounded-xl border border-dashed border-gray-200">
                            暂无历史记录
                        </div>
                    )}
                </div>
             </div>
        </div>
    );
};

// Icons needed for SocialSecurityView
const UserPlusIcon = ({ size }: { size: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" x2="20" y1="8" y2="14"/><line x1="23" x2="17" y1="11" y2="11"/></svg>
);
const UserMinusIcon = ({ size }: { size: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="23" x2="17" y1="11" y2="11"/></svg>
);

const VoucherView = () => (
    <div className="space-y-4">
        {/* Month Filter */}
        <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-800">
                <Calendar size={18} className="text-gray-500"/> 2023年12月
            </div>
            <FilterIcon size={18} className="text-gray-400"/>
        </div>

        {/* Voucher List */}
        <div className="space-y-3">
            {MOCK_VOUCHERS.map((voucher) => (
                <div key={voucher.id} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">{voucher.code}</span>
                            <span className="text-xs text-gray-400">{voucher.date}</span>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                            voucher.status === '已审核' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'
                        }`}>
                            {voucher.status}
                        </span>
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 mb-3">{voucher.summary}</h3>
                    <div className="flex justify-between items-center border-t border-gray-50 pt-3">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                             voucher.type === '收入' ? 'text-emerald-600 bg-emerald-50' : 'text-gray-600 bg-gray-50'
                        }`}>
                            {voucher.type}
                        </span>
                        <span className={`text-lg font-mono font-bold ${
                            voucher.type === '收入' ? 'text-emerald-600' : 'text-gray-900'
                        }`}>
                            {voucher.type === '收入' ? '+' : '-'}{voucher.amount}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const InvoiceView = () => (
    <div className="space-y-4">
        {/* Stats */}
        <div className="bg-indigo-600 rounded-2xl p-5 text-white shadow-lg">
            <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-indigo-200">本月进项发票 (份)</span>
                <Receipt size={18} className="text-indigo-200"/>
            </div>
            <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold font-mono">15</span>
                <span className="text-sm text-indigo-200">合计 ¥123,400.00</span>
            </div>
            <div className="flex gap-2">
                <button className="flex-1 bg-white/10 text-xs font-bold py-2 rounded-lg backdrop-blur-sm border border-white/10 flex items-center justify-center gap-1">
                    <ArrowDownLeft size={12}/> 扫码收票
                </button>
                <button className="flex-1 bg-white/10 text-xs font-bold py-2 rounded-lg backdrop-blur-sm border border-white/10 flex items-center justify-center gap-1">
                    <FileText size={12}/> 手工录入
                </button>
            </div>
        </div>

        {/* Invoice List */}
        <div className="space-y-3">
            {MOCK_INVOICES.map((inv) => (
                <div key={inv.id} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                             <div className="bg-indigo-50 p-1.5 rounded text-indigo-600">
                                <FileText size={16} />
                             </div>
                             <div>
                                <h3 className="text-sm font-bold text-gray-900">{inv.name}</h3>
                                <p className="text-xs text-gray-400 mt-0.5">代码: {inv.code}</p>
                             </div>
                        </div>
                        <span className="text-lg font-mono font-bold text-gray-900">¥{inv.amount}</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-gray-50 pt-2 mt-1">
                         <div className="flex gap-2">
                            <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">{inv.type}</span>
                            <span className="text-[10px] text-gray-400 py-0.5">{inv.date}</span>
                         </div>
                         <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                             inv.status === '已认证' ? 'bg-emerald-50 text-emerald-600' : 
                             inv.status === '已入账' ? 'bg-blue-50 text-blue-600' :
                             'bg-orange-50 text-orange-600'
                         }`}>
                             {inv.status}
                         </span>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const TransactionFlowView = () => (
    <div className="space-y-4">
        {/* Header Summary */}
        <div className="bg-[#1e3a8a] rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
             <div className="relative z-10">
                 <p className="text-xs text-blue-200 mb-1">当前账户余额</p>
                 <h2 className="text-3xl font-bold font-mono">¥ 142,590.00</h2>
             </div>
             <div className="flex gap-8 mt-4 relative z-10 border-t border-white/10 pt-4">
                 <div>
                     <p className="text-[10px] text-blue-200 mb-0.5">本月收入</p>
                     <p className="font-bold text-lg">¥ 62,000</p>
                 </div>
                 <div>
                     <p className="text-[10px] text-blue-200 mb-0.5">本月支出</p>
                     <p className="font-bold text-lg">¥ 29,000</p>
                 </div>
             </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {['全部', '收入', '支出', '转账'].map((f, i) => (
                <button key={i} className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${i===0 ? 'bg-blue-600 text-white' : 'bg-white text-gray-500 border border-gray-200'}`}>
                    {f}
                </button>
            ))}
        </div>

        {/* List */}
        <div className="space-y-3">
            {MOCK_FLOWS.map((flow) => (
                <div key={flow.id} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            flow.type === 'in' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-600'
                        }`}>
                            {flow.type === 'in' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-gray-900">{flow.title}</h3>
                            <p className="text-xs text-gray-400 mt-0.5">{flow.party}</p>
                            <p className="text-[10px] text-gray-300 mt-0.5">{flow.date}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className={`text-base font-bold font-mono ${
                            flow.type === 'in' ? 'text-emerald-600' : 'text-gray-900'
                        }`}>
                            {flow.type === 'in' ? '+' : '-'}{flow.amount}
                        </p>
                        <span className="text-[10px] text-gray-400">{flow.status}</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const TaxView = () => (
    <div className="space-y-6">
        {/* Status Card */}
        <div className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 p-3 opacity-10">
                <BadgeCheck size={80} className="text-emerald-500"/>
             </div>
             <p className="text-xs text-gray-500 mb-1">当前税务评级</p>
             <div className="flex items-center gap-2 mb-4">
                <h2 className="text-2xl font-bold text-emerald-600">A级纳税人</h2>
                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-1.5 py-0.5 rounded">正常</span>
             </div>
             <div className="h-px w-full bg-gray-100 mb-4"></div>
             <div className="flex justify-between items-center">
                <div>
                    <p className="text-xs text-gray-400">本期申报倒计时</p>
                    <p className="text-sm font-bold text-gray-800 flex items-center gap-1 mt-0.5">
                        <Clock size={14} className="text-orange-500"/> 剩余 5 天
                    </p>
                </div>
                <button className="bg-emerald-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow-sm shadow-emerald-100">
                    立即申报
                </button>
             </div>
        </div>

        {/* List */}
        <div>
            <div className="flex justify-between items-center mb-3 px-1">
                <h3 className="text-sm font-bold text-gray-900">申报缴纳记录</h3>
                <Filter size={16} className="text-gray-400" />
            </div>
            <div className="space-y-3">
                {MOCK_TAX_RECORDS.map((record) => (
                    <div key={record.id} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <div className="bg-gray-100 p-1.5 rounded text-gray-500">
                                    <FileText size={16} />
                                </div>
                                <span className="text-xs font-bold text-gray-500">{record.type}</span>
                            </div>
                            <span className="text-xs text-gray-400">{record.date}</span>
                        </div>
                        <h4 className="text-sm font-bold text-gray-900 mb-2">{record.title}</h4>
                        <div className="flex justify-between items-end">
                             <p className="text-lg font-mono font-bold text-gray-900">¥{record.amount}</p>
                             <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                 record.status === '已缴款' ? 'bg-gray-100 text-gray-500' : 'bg-orange-50 text-orange-600'
                             }`}>
                                {record.status}
                             </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const GenericView = ({ title }: { title: string }) => (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center px-8">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <Clock size={32} className="text-gray-300" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}功能建设中</h3>
        <p className="text-sm text-gray-400 leading-relaxed">
            该模块正在进行移动端适配开发，请暂时通过 PC 端后台访问完整功能。
        </p>
    </div>
);

// --- Main Page Component ---

const WorkDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Map IDs to titles and Views
  const getPageConfig = (id: string | undefined) => {
    switch(id) {
        // HR
        case 'hr-1': return { title: '薪酬管理', component: <PayrollView /> };
        case 'hr-emp': return { title: '员工管理', component: <EmployeeView /> };
        case 'hr-4': return { title: '五险一金', component: <SocialSecurityView /> }; // Updated
        case 'hr-6': return { title: '合同管理', component: <ContractView /> }; // Updated
        
        // Finance
        case 'fn-flow': return { title: '资金流水', component: <TransactionFlowView /> };
        case 'fn-2': return { title: '税款缴纳', component: <TaxView /> };
        case 'fn-3': return { title: '电子凭证', component: <VoucherView /> }; 
        case 'fn-4': return { title: '发票管理', component: <InvoiceView /> };
        case 'fn-5': return { title: '财税报表', component: <FinancialReportView /> }; // Updated

        // Services
        case 'ot-1': 
        case 'ot-2': 
        case 'ot-3': 
        case 'ot-4':
             return { title: '服务详情', component: <ServiceRequestView type={id || ''} /> }; // Updated

        default: return { title: '详情', component: <GenericView title="该" /> };
    }
  };

  const config = getPageConfig(id);

  return (
    <div className="min-h-screen bg-gray-50 pb-8 flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 pt-10 pb-4 sticky top-0 z-20 flex items-center justify-between border-b border-gray-100 shadow-sm">
        <button 
            onClick={() => navigate(-1)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200 text-gray-600 transition-colors"
        >
            <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold text-gray-900 absolute left-1/2 -translate-x-1/2">
            {config.title}
        </h1>
        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400">
            <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto no-scrollbar">
        {config.component}
      </div>
    </div>
  );
};

export default WorkDetail;