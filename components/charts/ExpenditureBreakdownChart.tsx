import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: '工资薪金', value: 325000, color: '#3B82F6' }, // Blue
  { name: '五险一金', value: 100000, color: '#60A5FA' }, // Light Blue
  { name: '纳税总额', value: 35000, color: '#F59E0B' }, // Amber/Orange (Tax)
  { name: '外包服务费', value: 22000, color: '#8B5CF6' }, // Purple
];

const ExpenditureBreakdownChart: React.FC = () => {
  const formatMoney = (value: number) => {
    return `¥${(value / 10000).toFixed(1)}w`;
  };

  return (
    <div className="h-48 w-full flex items-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="40%"
            cy="50%"
            innerRadius={45}
            outerRadius={65}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => formatMoney(value)}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontSize: '12px' }}
          />
          <Legend 
            layout="vertical" 
            verticalAlign="middle" 
            align="right"
            wrapperStyle={{ fontSize: '12px', right: 0 }}
            iconSize={8}
            formatter={(value, entry: any) => {
                const item = data.find(d => d.name === value);
                return (
                    <span className="text-gray-600 font-medium ml-1">
                        {value} <span className="text-gray-900 font-bold ml-1">{formatMoney(item?.value || 0)}</span>
                    </span>
                )
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenditureBreakdownChart;