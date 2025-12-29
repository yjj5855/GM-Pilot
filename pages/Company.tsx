import React from 'react';
import { 
  Settings, 
  ChevronRight, 
  Building2, 
  Landmark, 
  ShieldCheck, 
  Stamp, 
  Users,
  FileText,
  CreditCard
} from 'lucide-react';

const Company: React.FC = () => {
  return (
    <div className="min-h-full bg-gray-50 p-4 space-y-4">
      
      {/* 1. Top Company Card (Switchable) */}
      <div className="bg-white rounded-2xl p-5 shadow-sm flex justify-between items-start active:scale-[0.99] transition-transform cursor-pointer">
        <div className="flex gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center shrink-0 text-blue-600">
            <Building2 size={28} strokeWidth={1.5} />
          </div>
          <div className="pt-0.5">
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              千机科技
            </h1>
            <p className="text-gray-400 text-xs mt-1.5 mb-0.5 font-medium">统一社会信用代码</p>
            <p className="text-gray-600 text-sm font-mono tracking-wide">91310000XXXXXXXX</p>
          </div>
        </div>
        <button className="text-gray-400 p-1 hover:bg-gray-100 rounded-full transition-colors">
          <Settings size={20} />
        </button>
      </div>

      {/* 2. Bank Account Card (Dark Blue) */}
      <div className="bg-[#1e3a8a] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
        {/* Decorative circle */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex items-center gap-2 mb-6 opacity-90">
          <Landmark size={18} />
          <span className="text-sm font-medium tracking-wide">企业基本户</span>
        </div>

        <div className="text-3xl font-mono font-medium tracking-widest mb-8 text-shadow-sm">
          6222 **** **** 8888
        </div>

        <div className="flex justify-between items-end">
          <div className="text-sm opacity-80 font-medium">招商银行上海分行</div>
          <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/20 transition-colors cursor-pointer">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
            <span className="text-xs font-medium text-emerald-100">正常状态</span>
            <ChevronRight size={12} className="text-white/50 ml-1" />
          </div>
        </div>
      </div>

      {/* 3. Unified Menu List */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        
        {/* Item 1: Invoice Info */}
        <div className="flex items-center justify-between p-5 border-b border-gray-50 hover:bg-gray-50 active:bg-gray-100 cursor-pointer transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600">
               <FileText size={20} />
            </div>
            <span className="text-base font-bold text-gray-800">企业开票资料</span>
          </div>
          <div className="flex items-center gap-2">
            <ChevronRight size={18} className="text-gray-300" />
          </div>
        </div>

        {/* Item 2: Digital Certificates */}
        <div className="flex items-center justify-between p-5 border-b border-gray-50 hover:bg-gray-50 active:bg-gray-100 cursor-pointer transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600">
               <ShieldCheck size={20} />
            </div>
            <span className="text-base font-bold text-gray-800">数字证书与权限</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">已授权</span>
            <ChevronRight size={18} className="text-gray-300" />
          </div>
        </div>

        {/* Item 3: Seal Management */}
        <div className="flex items-center justify-between p-5 border-b border-gray-50 hover:bg-gray-50 active:bg-gray-100 cursor-pointer transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600">
               <Stamp size={20} />
            </div>
            <span className="text-base font-bold text-gray-800">电子印章管理</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">3个印章</span>
            <ChevronRight size={18} className="text-gray-300" />
          </div>
        </div>

        {/* Item 4: Contract Services */}
        <div className="flex items-center justify-between p-5 border-b border-gray-50 hover:bg-gray-50 active:bg-gray-100 cursor-pointer transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600">
               <CreditCard size={20} />
            </div>
            <span className="text-base font-bold text-gray-800">签约服务详情</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">专业版</span>
            <ChevronRight size={18} className="text-gray-300" />
          </div>
        </div>

        {/* Item 5: Admin Settings */}
        <div className="flex items-center justify-between p-5 hover:bg-gray-50 active:bg-gray-100 cursor-pointer transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600">
               <Users size={20} />
            </div>
            <span className="text-base font-bold text-gray-800">管理员设置</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">李总, 王财务</span>
            <ChevronRight size={18} className="text-gray-300" />
          </div>
        </div>

      </div>

    </div>
  );
};

export default Company;