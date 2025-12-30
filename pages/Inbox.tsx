import React, { useState } from 'react';
import { Task, TaskType } from '../types';
import { 
  CheckCircle2, 
  Clock, 
  CreditCard,
  Briefcase,
  Stamp,
  Banknote,
  AlertCircle,
  Wallet,
  Filter,
  Users,
  Files,
  ArrowLeft,
  ChevronRight,
  FileText,
  User,
  Check,
  XCircle,
  History,
  Ban
} from 'lucide-react';

// --- Mock Data ---

// 1. MAIN INBOX TASKS (Existing)
const mockTasks: Task[] = [
  // BILLS
  {
    id: 'b_service',
    title: '12月平台服务费账单',
    description: '待支付 ¥ 5,800.00',
    deadline: '2023-12-25',
    type: TaskType.CONFIRM,
    priority: 'HIGH',
    source: 'HR Outsourcing'
  },
  // FINANCE (Individual)
  {
    id: 'u_salary',
    title: '12月工资发放确认',
    description: '总额 ¥425,000.00，涉及 32 人',
    deadline: '今天 18:00',
    type: TaskType.SUBMIT_DATA, 
    priority: 'HIGH',
    source: 'Finance Outsourcing'
  },
  {
    id: 'u_tax',
    title: '11月增值税缴纳',
    description: '税额 ¥12,500.00，请确认申报表',
    deadline: '2023-12-15',
    type: TaskType.SUBMIT_DATA,
    priority: 'HIGH',
    source: 'Finance Outsourcing'
  },
  // HR GROUP
  {
    id: 'h1',
    title: '入职: 技术部-王强',
    description: '合同签署与材料归档',
    deadline: '明天',
    type: TaskType.ACCEPT,
    priority: 'MEDIUM',
    source: 'HR Outsourcing'
  },
  {
    id: 'h2',
    title: '入职: 市场部-刘思思',
    description: '试用期目标确认',
    deadline: '明天',
    type: TaskType.ACCEPT,
    priority: 'MEDIUM',
    source: 'HR Outsourcing'
  },
  {
    id: 'h3',
    title: '入职: 设计部-陈杰',
    description: '社保增员信息核对',
    deadline: '周五',
    type: TaskType.ACCEPT,
    priority: 'LOW',
    source: 'HR Outsourcing'
  },
  // OA GROUP - PENDING APPROVALS (Tasks for ME)
  {
    id: 'o1',
    title: '报销: 市场部-李娜',
    description: '11月北京出差差旅费',
    deadline: '无',
    type: TaskType.PROGRESS,
    priority: 'LOW',
    source: 'Internal OA'
  },
  {
    id: 'o2',
    title: '采购: 行政部-人体工学椅',
    description: '总价 ¥24,000，申请采购',
    deadline: '无',
    type: TaskType.PROGRESS,
    priority: 'LOW',
    source: 'Internal OA'
  },
  {
    id: 'o3',
    title: '请假: 技术部-张伟',
    description: '年假申请 (3天)',
    deadline: '无',
    type: TaskType.PROGRESS,
    priority: 'LOW',
    source: 'Internal OA'
  }
];

// 2. ADDITIONAL OA MOCK DATA

// My Approvals - Processed (History)
const mockProcessedApprovals = [
  { id: 'pa1', title: '用印申请: 财务部', description: '审计报告盖章', status: '已同意', date: '12-10' },
  { id: 'pa2', title: '请假: 市场部-王五', description: '事假 (1天)', status: '已驳回', date: '12-08' },
];

// My Requests (Things I initiated)
const mockMyRequests = [
  { id: 'mr1', title: '备用金申请', description: '¥ 50,000 部门备用金', status: 'PROCESSING', node: '财务总监审批中', date: '12-12' },
  { id: 'mr2', title: '年假申请', description: '春节调休 (2天)', status: 'APPROVED', node: '已通过', date: '12-01' },
  { id: 'mr3', title: '合同审批', description: '千机科技框架协议', status: 'REJECTED', node: '法务驳回', date: '11-28' },
  { id: 'mr4', title: '用车申请', description: '外出拜访客户', status: 'CANCELLED', node: '已撤销', date: '11-25' },
];

type GroupType = 'ENTRY' | 'OA' | null;
type OATab = 'APPROVAL' | 'REQUEST'; // Role: I am Approver vs I am Requester

// Filter Types
type ApprovalFilter = 'PENDING' | 'PROCESSED';
type RequestFilter = 'PROCESSING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';

const Inbox: React.FC = () => {
  const [activeGroup, setActiveGroup] = useState<GroupType>(null);
  
  // OA Detail View States
  const [oaTab, setOaTab] = useState<OATab>('APPROVAL');
  
  // Independent filters for each tab
  const [oaApprovalFilter, setOaApprovalFilter] = useState<ApprovalFilter>('PENDING');
  const [oaRequestFilter, setOaRequestFilter] = useState<RequestFilter>('PROCESSING');

  // --- Classification Logic ---
  const isBill = (t: Task) => t.type === TaskType.CONFIRM;
  const isFinance = (t: Task) => isBill(t) || t.source === 'Finance Outsourcing' || t.title.includes('工资');
  
  // Group Definitions
  const isEntryTask = (t: Task) => t.source === 'HR Outsourcing' && !isBill(t) && (t.title.includes('入职') || t.title.includes('增员'));
  const isOATask = (t: Task) => t.source === 'Internal OA';

  // --- Group Data Aggregation ---
  const entryTasks = mockTasks.filter(isEntryTask);
  const oaTasks = mockTasks.filter(isOATask); // These are "Pending Approvals"
  const individualTasksSource = mockTasks.filter(t => !isEntryTask(t) && !isOATask(t));

  // --- Filtering & Sorting for Main List ---
  const getSortedIndividualTasks = () => {
    return [...individualTasksSource].sort((a, b) => {
      const getWeight = (t: Task) => {
        if (t.priority === 'HIGH') return 3;
        if (t.priority === 'MEDIUM') return 2;
        return 1;
      };
      return getWeight(b) - getWeight(a);
    });
  };

  const allVisibleIndividualTasks = getSortedIndividualTasks();
  const pinnedBill = allVisibleIndividualTasks.find(isBill);
  const listTasks = allVisibleIndividualTasks.filter(t => t.id !== pinnedBill?.id);

  const highPriorityTasks = listTasks.filter(t => t.priority === 'HIGH');
  const normalPriorityTasks = listTasks.filter(t => t.priority !== 'HIGH');

  // --- Render Components ---

  const renderBillCard = (task: Task) => (
    <div className="mb-4 animate-fade-in-up">
       <div className="bg-gradient-to-br from-indigo-50/80 to-white border border-indigo-100 rounded-2xl p-5 shadow-sm relative overflow-hidden group">
          <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white text-indigo-600 flex items-center justify-center shadow-sm border border-indigo-50">
                      <CreditCard size={20} />
                  </div>
                  <div>
                      <h3 className="font-bold text-gray-900 text-sm">{task.title}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">服务周期: 2023-12</p>
                  </div>
              </div>
              {task.deadline && (
                  <div className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-lg border border-orange-100 flex items-center gap-1">
                       <Clock size={10} /> {task.deadline}
                  </div>
              )}
          </div>
          
          <div className="flex justify-between items-end pl-1">
              <div>
                   <p className="text-xs text-gray-400 mb-0.5">待支付金额</p>
                   <p className="text-2xl font-bold text-gray-900 font-mono tracking-tight">
                      ¥ 5,800<span className="text-sm text-gray-500 font-normal">.00</span>
                  </p>
              </div>
              <button className="bg-indigo-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm shadow-indigo-200 active:scale-95 transition-transform flex items-center gap-1.5 hover:bg-indigo-700">
                  <Wallet size={14} /> 立即支付
              </button>
          </div>
       </div>
    </div>
  );

  const renderGroupCard = (type: GroupType, count: number, tasks: Task[]) => {
    const isEntry = type === 'ENTRY';
    const title = isEntry ? '待办入职' : 'OA 审批';
    const icon = isEntry ? <Users size={20} /> : <Stamp size={20} />;
    const theme = isEntry ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600';
    const previewText = tasks.map(t => t.title.split(':')[1] || t.title.split('-')[1] || t.title).slice(0, 2).join('、');

    return (
      <div 
        onClick={() => setActiveGroup(type)}
        className="group bg-white rounded-2xl p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md transition-all active:scale-[0.99] cursor-pointer flex items-center gap-4 mb-3 relative overflow-hidden"
      >
        <div className="absolute right-0 top-0 bottom-0 w-1 bg-gray-50"></div>
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${theme}`}>
           {icon}
        </div>
        <div className="flex-1 min-w-0">
           <div className="flex justify-between items-center mb-1">
              <h4 className="text-sm font-bold text-gray-900">{title}</h4>
              <div className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded-full">
                 <span className="text-xs font-bold text-gray-800">{count}</span>
                 <span className="text-[10px] text-gray-400">个任务</span>
              </div>
           </div>
           <p className="text-xs text-gray-400 truncate font-medium">
             包含 {previewText} 等
           </p>
        </div>
        <ChevronRight size={18} className="text-gray-300" />
      </div>
    );
  };

  const renderTaskRow = (task: Task) => {
    let Icon = CheckCircle2;
    let theme = 'gray';
    
    if (isFinance(task)) { Icon = Banknote; theme = 'emerald'; }
    if (task.priority === 'HIGH') { theme = 'rose'; Icon = AlertCircle; }

    const themeStyles: Record<string, string> = {
      emerald: 'bg-emerald-50 text-emerald-600',
      rose: 'bg-rose-50 text-rose-600',
      gray: 'bg-gray-50 text-gray-500',
    };
    const style = themeStyles[theme] || themeStyles['gray'];

    return (
      <div key={task.id} className="group bg-white rounded-2xl p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md transition-all active:scale-[0.99] cursor-pointer flex items-center gap-4 mb-3">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${style}`}>
           <Icon size={20} strokeWidth={2} />
        </div>
        <div className="flex-1 min-w-0">
           <div className="flex justify-between items-start mb-1">
              <h4 className="text-sm font-bold text-gray-900 truncate pr-2">{task.title}</h4>
              {task.priority === 'HIGH' && (
                <span className="shrink-0 w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
              )}
           </div>
           <p className="text-xs text-gray-400 truncate font-medium">{task.description}</p>
        </div>
        <div className="text-right shrink-0 flex flex-col items-end gap-1">
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
               task.priority === 'HIGH' ? 'text-rose-600 bg-rose-50' : 'text-gray-400 bg-gray-50'
            }`}>
               {task.deadline === '无' ? '待处理' : task.deadline}
            </span>
        </div>
      </div>
    );
  };

  // --- O A  D E T A I L  L I S T  R E N D E R E R ---
  const renderOADetailList = () => {
    let itemsToRender: any[] = [];
    let emptyMsg = "";

    if (oaTab === 'APPROVAL') {
        if (oaApprovalFilter === 'PENDING') {
            itemsToRender = oaTasks;
            emptyMsg = "当前没有待处理的审批";
        } else {
            itemsToRender = mockProcessedApprovals;
            emptyMsg = "暂无已处理记录";
        }
    } else {
        // REQUEST
        itemsToRender = mockMyRequests.filter(r => r.status === oaRequestFilter);
        
        switch(oaRequestFilter) {
            case 'PROCESSING': emptyMsg = "您没有进行中的申请"; break;
            case 'APPROVED': emptyMsg = "暂无已通过的申请"; break;
            case 'REJECTED': emptyMsg = "暂无被驳回的申请"; break;
            case 'CANCELLED': emptyMsg = "暂无已撤销的申请"; break;
        }
    }

    if (itemsToRender.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                  <FileText size={24} className="opacity-20" />
                </div>
                <p className="text-xs font-medium">{emptyMsg}</p>
            </div>
        );
    }

    return itemsToRender.map((item, idx) => {
        const isApprovalContext = oaTab === 'APPROVAL';
        
        // Dynamic Visuals
        let iconBg = 'bg-gray-50';
        let iconColor = 'text-gray-500';
        let Icon = FileText;

        if (item.title.includes('报销')) { iconBg = 'bg-blue-50'; iconColor = 'text-blue-600'; Icon = Wallet; }
        else if (item.title.includes('采购')) { iconBg = 'bg-purple-50'; iconColor = 'text-purple-600'; Icon = Stamp; }
        else if (item.title.includes('请假')) { iconBg = 'bg-orange-50'; iconColor = 'text-orange-600'; Icon = Clock; }
        else if (item.status === 'APPROVED' || item.status === '已同意') { iconBg = 'bg-emerald-50'; iconColor = 'text-emerald-600'; Icon = CheckCircle2; }
        else if (item.status === 'REJECTED' || item.status === '已驳回') { iconBg = 'bg-rose-50'; iconColor = 'text-rose-600'; Icon = XCircle; }
        else if (item.status === 'CANCELLED' || item.status === '已撤销') { iconBg = 'bg-gray-100'; iconColor = 'text-gray-400'; Icon = Ban; }

        return (
            <div key={item.id || idx} className="group bg-white rounded-2xl p-4 border border-gray-100 shadow-sm mb-3 active:scale-[0.99] transition-transform">
                <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                         <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBg} ${iconColor}`}>
                             <Icon size={18} />
                         </div>
                         <div>
                             <h4 className={`text-sm font-bold ${item.status === 'CANCELLED' ? 'text-gray-400' : 'text-gray-900'}`}>{item.title}</h4>
                             <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
                         </div>
                    </div>
                    {/* Right side Status Tag */}
                    {isApprovalContext ? (
                        oaApprovalFilter === 'PENDING' ? (
                            <button className="bg-indigo-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm shadow-indigo-100">
                                审批
                            </button>
                        ) : (
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                item.status.includes('驳回') ? 'bg-rose-50 text-rose-600' : 'bg-gray-100 text-gray-500'
                            }`}>
                                {item.status}
                            </span>
                        )
                    ) : (
                         // Request Context Tag
                         <span className={`text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                             item.status === 'PROCESSING' ? 'bg-blue-50 text-blue-600' :
                             item.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-600' :
                             item.status === 'REJECTED' ? 'bg-rose-50 text-rose-600' :
                             'bg-gray-100 text-gray-400'
                         }`}>
                             {item.node}
                         </span>
                    )}
                </div>
                {/* Footer Metadata */}
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-50">
                    <span className="text-[10px] text-gray-400">
                        {isApprovalContext ? (oaApprovalFilter==='PENDING' ? '等待您的处理' : `处理于 ${item.date}`) : `发起于 ${item.date}`}
                    </span>
                    {isApprovalContext && oaApprovalFilter === 'PENDING' && (
                        <span className="text-[10px] text-orange-500 flex items-center gap-1 font-medium">
                            <Clock size={10} /> 耗时 2 小时
                        </span>
                    )}
                </div>
            </div>
        )
    });
  };

  // --- Filter Controls Component ---
  const renderOAFilters = () => {
      if (oaTab === 'APPROVAL') {
          return (
            <div className="flex gap-2">
                {(['PENDING', 'PROCESSED'] as const).map(status => (
                    <button 
                        key={status}
                        onClick={() => setOaApprovalFilter(status)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                            oaApprovalFilter === status 
                            ? 'bg-gray-900 text-white border-gray-900' 
                            : 'bg-white text-gray-500 border-gray-200'
                        }`}
                    >
                        {status === 'PENDING' ? `待处理 (${oaTasks.length})` : '已处理'}
                    </button>
                ))}
            </div>
          );
      } else {
          // REQUEST FILTERS
          const tabs = [
              { id: 'PROCESSING', label: '审批中' },
              { id: 'APPROVED', label: '已通过' },
              { id: 'REJECTED', label: '未通过' },
              { id: 'CANCELLED', label: '已撤销' },
          ];
          return (
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {tabs.map((tab) => (
                    <button 
                        key={tab.id}
                        onClick={() => setOaRequestFilter(tab.id as RequestFilter)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold border whitespace-nowrap transition-colors ${
                            oaRequestFilter === tab.id
                            ? 'bg-gray-900 text-white border-gray-900' 
                            : 'bg-white text-gray-500 border-gray-200'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
          );
      }
  };


  // --- Sub-View: Detail List ---
  if (activeGroup) {
      const isOA = activeGroup === 'OA';
      const groupTasks = activeGroup === 'ENTRY' ? entryTasks : []; 
      const title = isOA ? 'OA 审批' : '待办入职';

      return (
        <div className="flex flex-col h-full bg-[#FAFAFA]">
            {/* 1. Navbar */}
            <div className="bg-white px-4 pt-10 pb-2 sticky top-0 z-30 border-b border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                    <button 
                        onClick={() => setActiveGroup(null)}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-lg font-bold text-gray-900">{title}</h1>
                </div>

                {/* OA Specific Controls */}
                {isOA && (
                    <div className="space-y-3 pb-2">
                        {/* Role Tabs */}
                        <div className="flex p-1 bg-gray-100 rounded-xl">
                            <button 
                                onClick={() => setOaTab('APPROVAL')}
                                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                                    oaTab === 'APPROVAL' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'
                                }`}
                            >
                                待我审批
                            </button>
                            <button 
                                onClick={() => setOaTab('REQUEST')}
                                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                                    oaTab === 'REQUEST' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'
                                }`}
                            >
                                我发起的
                            </button>
                        </div>
                        
                        {/* Dynamic Status Filters */}
                        {renderOAFilters()}
                    </div>
                )}
            </div>
            
            {/* 2. List Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-5">
                {isOA ? renderOADetailList() : (
                    // Standard List for HR/Entry
                    <>
                        <p className="text-xs text-gray-400 mb-4 ml-1">共 {groupTasks.length} 项任务待处理</p>
                        <div className="space-y-1">
                            {groupTasks.map(t => renderTaskRow(t))}
                        </div>
                    </>
                )}
            </div>
        </div>
      );
  }

  // --- Main View ---
  return (
    <div className="flex flex-col h-full bg-[#FAFAFA]">
      {/* 1. Header (No Tabs) */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-30 px-5 pt-12 pb-4 border-b border-gray-100/50">
         <div className="flex justify-between items-center">
             <h1 className="text-2xl font-bold text-gray-900 tracking-tight">待办事项</h1>
             <div className="bg-gray-100 p-2 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                <Filter size={18} />
             </div>
         </div>
      </div>

      {/* 2. Scrollable Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-5">
         
         <div className="space-y-1">
            {/* 1. Pinned Bill (Service Fee) */}
            {pinnedBill && renderBillCard(pinnedBill)}

            {/* 2. High Priority Individual Tasks (Salary, Tax, etc.) */}
            {highPriorityTasks.map(renderTaskRow)}

            {/* 3. Task Groups (Aggregates) */}
            {entryTasks.length > 0 && renderGroupCard('ENTRY', entryTasks.length, entryTasks)}
            {oaTasks.length > 0 && renderGroupCard('OA', oaTasks.length, oaTasks)}

            {/* 4. Normal/Low Priority Individual Tasks */}
            {normalPriorityTasks.map(renderTaskRow)}
            
            {/* Empty State */}
            {!pinnedBill && highPriorityTasks.length === 0 && entryTasks.length === 0 && oaTasks.length === 0 && normalPriorityTasks.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                    <CheckCircle2 size={32} className="opacity-20" />
                  </div>
                  <p className="text-xs font-medium">当前无待办任务</p>
              </div>
            )}
         </div>

         <div className="h-8"></div>
      </div>
    </div>
  );
};

export default Inbox;