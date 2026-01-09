
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: 'Jan', rate: 7.2, price: 100 },
  { name: 'Feb', rate: 7.5, price: 105 },
  { name: 'Mar', rate: 8.0, price: 102 },
  { name: 'Apr', rate: 8.2, price: 108 },
  { name: 'May', rate: 7.8, price: 115 },
  { name: 'Jun', rate: 7.5, price: 120 },
];

export const MarketDashboard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-full flex flex-col overflow-hidden">
      <div className="mb-6">
        <h2 className="luxury-font text-2xl text-slate-900 mb-1">Thị Trường Real-time</h2>
        <p className="text-slate-500 text-sm">Cập nhật chỉ số vĩ mô & BĐS</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-xl">
          <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider mb-1">Lãi suất vay</p>
          <p className="text-2xl font-bold text-blue-900">7.5%</p>
          <span className="text-xs text-blue-500">Giảm 0.5% so với Q1</span>
        </div>
        <div className="bg-amber-50 p-4 rounded-xl">
          <p className="text-xs text-amber-600 font-semibold uppercase tracking-wider mb-1">Luật Đất Đai</p>
          <p className="text-sm font-bold text-amber-900">Hiệu lực 2024</p>
          <span className="text-xs text-amber-500">Siết phân lô vùng ven</span>
        </div>
      </div>

      <div className="flex-1 min-h-[200px] mb-6">
        <p className="text-xs font-semibold text-slate-400 uppercase mb-4">Biến động giá (VNĐ/m2)</p>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0f172a" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#0f172a" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
            <Tooltip 
               contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            <Area type="monotone" dataKey="price" stroke="#0f172a" strokeWidth={2} fillOpacity={1} fill="url(#colorPrice)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-semibold text-slate-400 uppercase">Ưu tiên đầu tư Q3/2024</p>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <p className="text-sm text-slate-700 font-medium">Chung cư nội đô (Sẵn sổ)</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <p className="text-sm text-slate-700 font-medium">Đất nền pháp lý sạch</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-red-400"></div>
          <p className="text-sm text-slate-700 font-medium">Condotel (Cần thận trọng)</p>
        </div>
      </div>
    </div>
  );
};
