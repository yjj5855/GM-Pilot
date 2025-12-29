import React, { useState } from 'react';
import { 
  Banknote, 
  FileCheck, 
  UserPlus, 
  TrendingUp, 
  Receipt, 
  Calculator, 
  FileUp, 
  MessageSquare, 
  AlertOctagon, 
  Search,
  BarChart3,
  HelpCircle,
  FileBadge,
  Contact,
  FileSignature,
  Ticket,
  CreditCard,
  History
} from 'lucide-react';

// Define the structure for categorized menu items
interface ServiceItem {
  id: string;
  label: string;
  iconName: string;
  badge?: {
    text: string;
    color: string;
  };
}

interface ServiceGroup {
  title: string;
  themeColor: 'blue' | 'emerald' | 'purple';
  items: ServiceItem[];
}

const serviceGroups: ServiceGroup[] = [
  {
    title: '人事管理 (HR)',
    themeColor: 'blue',
    items: [
      { 
        id: 'hr-roster', 
        label: '花名册', 
        iconName: 'Contact',
        badge: { text: '32人', color: 'bg-blue-600 text-white' }
      },
      { id: 'hr-1', label: '工资发放', iconName: 'Banknote' },
      { id: 'hr-2', label: '个税申报', iconName: 'FileCheck' },
      { id: 'hr-emp', label: '员工管理', iconName: 'UserPlus' }, // Was 社保增减
      { id: 'hr-4', label: '社保缴费', iconName: 'CreditCard' },
      { id: 'hr-6', label: '合同管理', iconName: 'FileSignature' },
      // Removed 基数调整
    ]
  },
  {
    title: '财务税务 (Finance)',
    themeColor: 'emerald',
    items: [
      { id: 'fn-1', label: '报税记录', iconName: 'History' }, // Was 本期报税 -> 报税记录
      { id: 'fn-2', label: '税款缴纳', iconName: 'Calculator' },
      { id: 'fn-3', label: '资料补交', iconName: 'FileUp' },
      { id: 'fn-4', label: '发票管理', iconName: 'Ticket' },
      { id: 'fn-5', label: '财税报表', iconName: 'BarChart3' },
    ]
  },
  {
    title: '综合服务 (Services)',
    themeColor: 'purple',
    items: [
      { id: 'ot-1', label: '政策咨询', iconName: 'HelpCircle' },
      { id: 'ot-2', label: '证明开具', iconName: 'FileBadge' },
      { id: 'ot-3', label: '口径确认', iconName: 'MessageSquare' },
      { id: 'ot-4', label: '异常处理', iconName: 'AlertOctagon' },
    ]
  }
];

const Work: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const renderIcon = (name: string, size: number = 24) => {
    const props = { size };
    switch (name) {
      case 'Banknote': return <Banknote {...props} />;
      case 'FileCheck': return <FileCheck {...props} />;
      case 'UserPlus': return <UserPlus {...props} />;
      case 'TrendingUp': return <TrendingUp {...props} />;
      case 'Receipt': return <Receipt {...props} />;
      case 'Calculator': return <Calculator {...props} />;
      case 'FileUp': return <FileUp {...props} />;
      case 'BarChart3': return <BarChart3 {...props} />;
      case 'HelpCircle': return <HelpCircle {...props} />;
      case 'FileBadge': return <FileBadge {...props} />;
      case 'MessageSquare': return <MessageSquare {...props} />;
      case 'AlertOctagon': return <AlertOctagon {...props} />;
      case 'Contact': return <Contact {...props} />;
      case 'FileSignature': return <FileSignature {...props} />;
      case 'Ticket': return <Ticket {...props} />;
      case 'CreditCard': return <CreditCard {...props} />;
      case 'History': return <History {...props} />;
      default: return <FileCheck {...props} />;
    }
  };

  const getThemeStyles = (theme: string) => {
    switch (theme) {
      case 'blue': return { bg: 'bg-blue-50', text: 'text-blue-600', iconBg: 'bg-blue-50' };
      case 'emerald': return { bg: 'bg-emerald-50', text: 'text-emerald-600', iconBg: 'bg-emerald-50' };
      case 'purple': return { bg: 'bg-purple-50', text: 'text-purple-600', iconBg: 'bg-purple-50' };
      default: return { bg: 'bg-gray-50', text: 'text-gray-600', iconBg: 'bg-gray-50' };
    }
  };

  return (
    <div className="pb-8 bg-white min-h-full">
      {/* Search Header */}
      <div className="bg-white px-4 pt-4 pb-2 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-900 mb-3">工作台</h1>
        <div className="relative">
            <input 
                type="text" 
                placeholder="查找功能或事务..." 
                className="w-full h-10 pl-10 pr-4 rounded-xl bg-gray-100 border-none text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="px-4 py-2 space-y-8">
        
        {/* Service Groups - 4 Column Grid */}
        {serviceGroups.map((group) => {
            const theme = getThemeStyles(group.themeColor);
            return (
                <section key={group.title}>
                    <div className="flex items-center gap-2 mb-4">
                        <h2 className="text-sm font-bold text-gray-800">{group.title}</h2>
                    </div>
                    <div className="grid grid-cols-4 gap-y-6 gap-x-2">
                        {group.items.map((item) => (
                            <div 
                                key={item.id} 
                                className="flex flex-col items-center gap-2 cursor-pointer active:opacity-60 transition-opacity group relative"
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 ${theme.iconBg} ${theme.text} group-hover:scale-105 transition-transform relative`}>
                                    {renderIcon(item.iconName, 26)}
                                    {item.badge && (
                                      <div className={`absolute -top-2 -right-4 px-1.5 py-0.5 rounded-full text-[10px] font-bold shadow-sm border border-white ${item.badge.color}`}>
                                        {item.badge.text}
                                      </div>
                                    )}
                                </div>
                                <div className="text-xs font-medium text-gray-700 text-center leading-tight">
                                    {item.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            );
        })}
      </div>
    </div>
  );
};

export default Work;