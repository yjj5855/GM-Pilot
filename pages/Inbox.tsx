import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Task, TaskType } from '../types';
import { CheckCircle2, AlertTriangle, FileInput, ArrowRightLeft, Clock, Layers, Filter } from 'lucide-react';

const mockTasks: Task[] = [
  {
    id: '1',
    title: '12月工资发放确认',
    description: '总额 ¥425,000.00，涉及 32 人。请确认发放明细及个税扣除。',
    deadline: '今天 18:00',
    type: TaskType.CONFIRM,
    priority: 'HIGH',
    source: 'HR Outsourcing'
  },
  {
    id: '2',
    title: '12月进项发票缺失',
    description: '外包财务反馈缺3张大额技术服务费发票，合计 ¥12,000。',
    deadline: '明天 12:00',
    type: TaskType.SUBMIT_DATA,
    priority: 'MEDIUM',
    source: 'Finance Outsourcing'
  },
  {
    id: '3',
    title: '社保增员名单验收',
    description: '本月新增 3 人社保公积金缴纳，请验收办理结果凭证。',
    deadline: '2023-12-15',
    type: TaskType.ACCEPT,
    priority: 'LOW',
    source: 'HR Outsourcing'
  },
  {
    id: '4',
    title: '个税申报异常',
    description: '员工张三专项附加扣除填报冲突，需处理。',
    deadline: '2023-12-11',
    type: TaskType.EXCEPTION,
    priority: 'HIGH',
    source: 'HR Outsourcing'
  },
  // Progress items
  {
    id: '5',
    title: '12月报税申报',
    description: '外包财务正在计算本期应缴税额，预计 12/15 需确认。',
    deadline: '进行中',
    type: TaskType.PROGRESS,
    priority: 'LOW',
    source: 'Finance Outsourcing'
  },
  {
    id: '6',
    title: '研发费用加计扣除',
    description: '内部财务已提交资料，等待外包审核。',
    deadline: '进行中',
    type: TaskType.PROGRESS,
    priority: 'LOW',
    source: 'Finance Outsourcing'
  }
];

type ViewMode = 'TODO' | 'PROGRESS';

const Inbox: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('TODO');
  const [filterType, setFilterType] = useState<TaskType | 'ALL'>('ALL');

  // Logic to separate data
  const todoList = mockTasks.filter(t => t.type !== TaskType.PROGRESS);
  const progressList = mockTasks.filter(t => t.type === TaskType.PROGRESS);

  // Filter logic for Todo list
  const displayList = viewMode === 'TODO' 
    ? (filterType === 'ALL' ? todoList : todoList.filter(t => t.type === filterType))
    : progressList; // Progress list usually doesn't need sub-filters yet

  const getIcon = (type: TaskType) => {
    switch (type) {
      case TaskType.CONFIRM: return <CheckCircle2 size={16} />;
      case TaskType.SUBMIT_DATA: return <FileInput size={16} />;
      case TaskType.ACCEPT: return <CheckCircle2 size={16} />;
      case TaskType.EXCEPTION: return <AlertTriangle size={16} />;
      case TaskType.PROGRESS: return <Clock size={16} />;
      default: return <CheckCircle2 size={16} />;
    }
  };

  const getTypeLabel = (type: TaskType) => {
    switch (type) {
      case TaskType.CONFIRM: return '待确认';
      case TaskType.SUBMIT_DATA: return '补资料';
      case TaskType.ACCEPT: return '待验收';
      case TaskType.EXCEPTION: return '处理异常';
      case TaskType.PROGRESS: return '进行中';
    }
  };

  const getTypeColor = (type: TaskType) => {
    switch (type) {
      case TaskType.CONFIRM: return 'text-blue-600 bg-blue-50';
      case TaskType.SUBMIT_DATA: return 'text-purple-600 bg-purple-50';
      case TaskType.ACCEPT: return 'text-green-600 bg-green-50';
      case TaskType.EXCEPTION: return 'text-red-600 bg-red-50';
      case TaskType.PROGRESS: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="sticky top-0 z-10 bg-white shadow-sm pb-1">
        <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">待办任务</h1>
          <div className="text-xs font-medium text-gray-400 flex items-center gap-1">
             <Layers size={14} />
             共 {mockTasks.length} 项
          </div>
        </div>
        
        {/* Segmented Control */}
        <div className="px-4 py-3">
          <div className="flex p-1 bg-gray-100 rounded-xl">
            <button
              onClick={() => { setViewMode('TODO'); setFilterType('ALL'); }}
              className={`flex-1 py-1.5 text-sm font-semibold rounded-lg transition-all ${
                viewMode === 'TODO' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              我的待办 <span className="ml-1 text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full">{todoList.length}</span>
            </button>
            <button
              onClick={() => setViewMode('PROGRESS')}
              className={`flex-1 py-1.5 text-sm font-semibold rounded-lg transition-all ${
                viewMode === 'PROGRESS' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              任务进度
            </button>
          </div>
        </div>

        {/* Sub-filters (Only for Todo View) */}
        {viewMode === 'TODO' && (
          <div className="flex overflow-x-auto no-scrollbar px-4 pb-3 gap-2">
            {[
              { id: 'ALL', label: '全部' },
              { id: TaskType.CONFIRM, label: '待确认' },
              { id: TaskType.SUBMIT_DATA, label: '补资料' },
              { id: TaskType.ACCEPT, label: '待验收' },
              { id: TaskType.EXCEPTION, label: '异常' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id as TaskType | 'ALL')}
                className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                  filterType === tab.id 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-white text-gray-500 border-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Task List */}
      <div className="p-4 space-y-3">
        {displayList.length === 0 ? (
           <div className="flex flex-col items-center justify-center h-48 text-gray-400">
             <div className="bg-gray-100 p-4 rounded-full mb-3">
                <CheckCircle2 size={32} className="opacity-40" />
             </div>
             <p className="text-sm">当前无相关事项</p>
           </div>
        ) : (
          displayList.map(task => (
            <Card key={task.id} className="relative overflow-hidden group active:scale-[0.99] transition-transform duration-200 border-none shadow-sm ring-1 ring-gray-100">
               {/* Left accent bar */}
               <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                 task.type === TaskType.PROGRESS ? 'bg-gray-300' :
                 task.priority === 'HIGH' ? 'bg-red-500' : 
                 task.priority === 'MEDIUM' ? 'bg-orange-400' : 'bg-green-500'
               }`}></div>

               <div className="pl-3">
                 <div className="flex justify-between items-start mb-2">
                    <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getTypeColor(task.type)}`}>
                        {getIcon(task.type)}
                        <span>{getTypeLabel(task.type)}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium">{task.source}</span>
                 </div>
                 
                 <h3 className="font-bold text-gray-900 text-base mb-1">{task.title}</h3>
                 <p className="text-sm text-gray-500 leading-relaxed mb-3 line-clamp-2">
                   {task.description}
                 </p>
                 
                 {task.type !== TaskType.PROGRESS ? (
                   <div className="flex justify-between items-center border-t border-gray-50 pt-3 mt-1">
                      <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded ${
                          task.priority === 'HIGH' ? 'text-red-600 bg-red-50' : 'text-gray-500 bg-gray-50'
                      }`}>
                         <ArrowRightLeft size={12} /> 截止: {task.deadline}
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow-sm active:bg-blue-700">
                        处理
                      </button>
                   </div>
                 ) : (
                    <div className="flex justify-between items-center border-t border-gray-50 pt-3 mt-1 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><Clock size={12}/> 进行中</span>
                        <span className="flex items-center gap-1 text-blue-600 font-medium">查看详情 <ArrowRightLeft size={10} className="rotate-180"/></span>
                    </div>
                 )}
               </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Inbox;