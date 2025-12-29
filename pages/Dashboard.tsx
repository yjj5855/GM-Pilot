import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import ExpenditureBreakdownChart from '../components/charts/ExpenditureBreakdownChart';
import PersonnelChart from '../components/charts/PersonnelChart';
import { 
  CheckCircle2, 
  Clock, 
  Circle, 
  ArrowRight, 
  AlertTriangle, 
  FileText, 
  ChevronRight, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  ArrowDownLeft,
  ChevronDown,
  ChevronUp,
  Wallet,
  Users,
  Info
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Alert {
  type: 'action' | 'risk';
  text: string;
  link: string;
}

interface TimelineItem {
  id: string;
  title: string;
  status: 'completed' | 'active' | 'pending';
  dateLabel: string;
  detail: string;
  alerts?: Alert[];
  primaryAction?: {
    label: string;
    link: string;
  };
}

const timelineData: TimelineItem[] = [
  { 
    id: '1', 
    title: '社保公积金', 
    status: 'completed', 
    dateLabel: '已验收', 
    detail: '本月增员 3 人，减员 1 人，外包已办理完毕。',
  },
  { 
    id: '2', 
    title: '12月发薪', 
    status: 'active', 
    dateLabel: '截止今日 18:00', 
    detail: '总额 ¥425,000.00，涉及 32 人。',
    alerts: [
       { type: 'action', text: '待确认：12月工资发放明细', link: '/inbox' }
    ],
    primaryAction: {
      label: '去确认',
      link: '/inbox'
    }
  },
  { 
    id: '3', 
    title: '个税申报', 
    status: 'active', 
    dateLabel: '申报中', 
    detail: '正计算专项附加扣除，预计明日出结果。',
    alerts: [
      { type: 'risk', text: '异常：员工张三专项扣除填报冲突', link: '/inbox' }
    ]
  },
  { 
    id: '4', 
    title: '本期报税', 
    status: 'pending', 
    dateLabel: '预计 12/15 开启', 
    detail: '等待财务上传月度费用单据。',
  },
];

const Dashboard: React.FC = () => {
  const [isTimelineExpanded, setIsTimelineExpanded] = useState(false);

  // Filter items for collapsed view: Only show Active or Risky items
  const activeItems = timelineData.filter(item => item.status === 'active' || item.alerts?.some(a => a.type === 'risk'));
  // If no active items, show the first pending, or just the last completed
  const collapsedViewItems = activeItems.length > 0 ? activeItems : [timelineData[timelineData.length - 1]];

  const renderTimelineItem = (item: TimelineItem, index: number, isLast: boolean, isCompact: boolean) => {
    const hasRisk = item.alerts?.some(a => a.type === 'risk');
    const hasAction = item.alerts?.some(a => a.type === 'action');
    
    // In compact mode, we might simplify the UI
    const showDetails = isTimelineExpanded || isCompact; 

    return (
      <div key={item.id} className={`relative pl-8 ${isLast ? '' : 'pb-8'}`}>
        {/* Connector Line - Only show if not last, or if compact and we want to suggest continuity */}
        {!isLast && (
          <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-gray-100"></div>
        )}

        {/* Status Icon */}
        <div className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center border-2 z-10 bg-white ${
            item.status === 'completed' ? 'border-green-500 text-green-500' :
            hasRisk ? 'border-orange-500 text-orange-500' :
            hasAction ? 'border-red-500 text-red-500' :
            item.status === 'active' ? 'border-blue-500 text-blue-500' :
            'border-gray-200 text-gray-300'
        }`}>
            {item.status === 'completed' ? <CheckCircle2 size={14} fill="currentColor" className="text-white" /> :
            hasRisk ? <AlertTriangle size={12} fill="currentColor" className="text-white" /> :
            hasAction ? <FileText size={12} fill="currentColor" className="text-white" /> :
            item.status === 'active' ? <Clock size={14} /> :
            <Circle size={8} fill="currentColor" className="text-gray-200" />}
        </div>

        {/* Content */}
        <div>
            <div className="flex justify-between items-start mb-1">
            <h3 className="text-sm font-bold text-gray-900">
                {item.title}
            </h3>
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                item.status === 'completed' ? 'bg-green-50 text-green-700 border-green-100' :
                hasAction ? 'bg-red-50 text-red-600 border-red-100' :
                hasRisk ? 'bg-orange-50 text-orange-600 border-orange-100' :
                item.status === 'active' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                'bg-gray-50 text-gray-400 border-transparent'
            }`}>
                {item.dateLabel}
            </span>
            </div>

            <div className={`mt-2 rounded-lg p-3 border ${hasRisk ? 'bg-orange-50/30 border-orange-100' : 'bg-gray-50 border-gray-100'}`}>
                <p className="text-xs text-gray-700 leading-relaxed mb-2">
                {item.detail}
                </p>

                {/* Alerts Integration */}
                {item.alerts && item.alerts.length > 0 && (
                    <div className="space-y-2 mb-2">
                    {item.alerts.map((alert, idx) => (
                        <Link to={alert.link} key={idx} className={`flex items-center justify-between p-2 rounded border text-xs font-medium transition-colors ${
                            alert.type === 'risk' 
                            ? 'bg-white border-orange-200 text-orange-700 hover:bg-orange-50' 
                            : 'bg-white border-red-200 text-red-600 hover:bg-red-50'
                        }`}>
                            <div className="flex items-center gap-2">
                            {alert.type === 'risk' ? <AlertTriangle size={14} /> : <AlertCircle size={14} />}
                            <span>{alert.text}</span>
                            </div>
                            <ChevronRight size={14} className="opacity-50" />
                        </Link>
                    ))}
                    </div>
                )}

                {item.primaryAction && (
                    <Link to={item.primaryAction.link} className="inline-flex w-full items-center justify-center gap-1 bg-blue-600 text-white text-xs font-bold py-2 rounded-md shadow-sm active:bg-blue-700 transition-colors">
                    {item.primaryAction.label} <ArrowRight size={12} />
                    </Link>
                )}
            </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <header className="flex justify-between items-center pt-2">
        <div className="flex items-center gap-1 active:opacity-60 transition-opacity cursor-pointer">
          <h1 className="text-xl font-bold text-gray-900">上海示例科技有限公司</h1>
          <ChevronDown size={20} className="text-gray-400" />
        </div>
        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold border border-blue-200 shadow-sm">
          GM
        </div>
      </header>

      {/* Account Balance / Overview */}
      <section>
        <div className="bg-gray-900 rounded-2xl p-5 text-white shadow-xl relative overflow-hidden">
             {/* Decorative blob */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-gray-800 rounded-full blur-2xl -mr-10 -mt-10 opacity-50 pointer-events-none"></div>

             <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                   <p className="text-gray-400 text-xs font-medium mb-2">企业账户可用余额 (元)</p>
                   <h2 className="text-3xl font-bold tracking-tight text-white font-mono">¥142,590.00</h2>
                </div>
                <div className="bg-gray-800/80 p-2.5 rounded-xl border border-gray-700/50 backdrop-blur-sm shadow-inner">
                   <Wallet className="text-emerald-400" size={24} />
                </div>
             </div>

             <div className="grid grid-cols-2 gap-3 relative z-10">
                {/* Income */}
                <div className="bg-gray-800/50 rounded-xl p-3 flex items-center gap-3 border border-gray-700/30">
                   <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                      <ArrowDownLeft size={16} className="text-emerald-500" />
                   </div>
                   <div>
                      <p className="text-gray-400 text-[10px] mb-0.5">本月收入</p>
                      <p className="font-bold text-lg leading-none">¥62,000</p>
                   </div>
                </div>

                {/* Expense */}
                <div className="bg-gray-800/50 rounded-xl p-3 flex items-center gap-3 border border-gray-700/30">
                   <div className="w-9 h-9 rounded-full bg-rose-500/10 flex items-center justify-center shrink-0 border border-rose-500/20">
                      <ArrowUpRight size={16} className="text-rose-500" />
                   </div>
                   <div>
                      <p className="text-gray-400 text-[10px] mb-0.5">本月支出</p>
                      <p className="font-bold text-lg leading-none">¥29,000</p>
                   </div>
                </div>
             </div>
        </div>
      </section>

      {/* 1. Timeline / Delivery Progress (Top Position) */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Section Header with Progress */}
        <div 
          className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex justify-between items-center cursor-pointer active:bg-gray-100 transition-colors"
          onClick={() => setIsTimelineExpanded(!isTimelineExpanded)}
        >
          <div>
            <h2 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
              本期交付进度
              <span className="bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5 rounded-md font-bold">进行中</span>
            </h2>
          </div>
          <div className="flex items-center gap-2">
             <div className="text-right flex items-baseline gap-1">
                <span className="text-lg font-bold text-blue-600">25%</span>
             </div>
             {isTimelineExpanded ? <ChevronUp size={16} className="text-gray-400"/> : <ChevronDown size={16} className="text-gray-400"/>}
          </div>
        </div>
        
        {/* Progress Bar Line */}
        <div className="h-1 w-full bg-gray-100">
             <div className="h-full bg-blue-500 w-1/4"></div>
        </div>

        {/* Timeline List */}
        <div className="p-5">
           {isTimelineExpanded ? (
               // Expanded View: Show All
               timelineData.map((item, index) => renderTimelineItem(item, index, index === timelineData.length - 1, false))
           ) : (
               // Collapsed View: Show only active/risky items
               <>
                 <div className="text-xs text-gray-400 mb-4 font-medium flex items-center gap-1">
                    <AlertCircle size={12}/> 当前需关注事项：
                 </div>
                 {collapsedViewItems.map((item, index) => renderTimelineItem(item, index, index === collapsedViewItems.length - 1, true))}
                 {collapsedViewItems.length < timelineData.length && (
                    <div 
                        className="mt-4 text-center text-xs text-blue-600 font-medium cursor-pointer py-2 bg-blue-50 rounded-lg dashed border border-blue-200"
                        onClick={() => setIsTimelineExpanded(true)}
                    >
                        查看全部 {timelineData.length} 个节点
                    </div>
                 )}
               </>
           )}
        </div>
      </section>

      {/* 2. Operations Data Reports (Charts) */}
      <section>
        <h2 className="font-bold text-gray-800 text-sm mb-3">经营数据报表</h2>
        <div className="space-y-4">
            
            {/* Expenditure Chart Card */}
            <Card className="p-4 border-none shadow-sm ring-1 ring-gray-100">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <div className="flex items-center gap-2 text-gray-500 mb-1">
                            <Wallet size={14} />
                            <span className="text-xs font-medium">本月预估支出</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">¥48.2w</div>
                    </div>
                    <Link to="/work" className="text-xs text-blue-600 font-medium flex items-center bg-blue-50 px-2 py-1 rounded-lg">明细 <ChevronRight size={12}/></Link>
                </div>

                {/* New Breakdown Chart */}
                <ExpenditureBreakdownChart />
                
                {/* Tax Risk Tip */}
                <div className="mt-2 pt-3 border-t border-gray-50 flex items-start gap-2">
                    <Info size={14} className="text-orange-500 mt-0.5 shrink-0" />
                    <p className="text-[10px] text-gray-500 leading-snug">
                        <span className="font-bold text-gray-700">税务提示：</span> 外包服务费占比 4.5%，请确保在12月15日前回收全额增值税专票，以避免汇算清缴风险。
                    </p>
                </div>
            </Card>

            {/* Personnel Chart Card */}
            <Card className="p-4 border-none shadow-sm ring-1 ring-gray-100">
                <div className="flex justify-between items-start mb-4">
                     <div>
                        <div className="flex items-center gap-2 text-gray-500 mb-1">
                            <Users size={14} />
                            <span className="text-xs font-medium">在职人员</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">32 <span className="text-sm font-normal text-gray-500">人</span></div>
                        <div className="flex gap-2 mt-1">
                            <div className="flex items-center gap-0.5 text-[10px] text-green-700 bg-green-50 px-1.5 py-0.5 rounded">
                                <span>入职 +3</span>
                                <ArrowUpRight size={10} />
                            </div>
                            <div className="flex items-center gap-0.5 text-[10px] text-orange-700 bg-orange-50 px-1.5 py-0.5 rounded">
                                <span>离职 -1</span>
                                <ArrowDownRight size={10} />
                            </div>
                        </div>
                     </div>
                     <Link to="/work" className="text-xs text-blue-600 font-medium flex items-center bg-blue-50 px-2 py-1 rounded-lg">名单 <ChevronRight size={12}/></Link>
                </div>
                
                <PersonnelChart />
                <div className="text-center text-[10px] text-gray-400 mt-2">近4个月人员规模趋势</div>
            </Card>

        </div>
      </section>

    </div>
  );
};

export default Dashboard;