
import React from 'react';

interface ScenarioSelectorProps {
  onSelect: (scenario: string) => void;
}

const scenarios = [
  { id: 1, label: "Tư vấn đầu tư 2 tỷ", icon: "💰" },
  { id: 2, label: "Xử lý từ chối giá cao", icon: "🤝" },
  { id: 3, label: "Luật Đất Đai 2024", icon: "⚖️" },
  { id: 4, label: "Phân tích lãi suất vay", icon: "📈" },
];

export const ScenarioSelector: React.FC<ScenarioSelectorProps> = ({ onSelect }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
      {scenarios.map((s) => (
        <button
          key={s.id}
          onClick={() => onSelect(s.label)}
          className="flex-shrink-0 bg-white border border-slate-200 hover:border-slate-900 transition-colors px-4 py-2 rounded-full text-sm font-medium text-slate-700 flex items-center gap-2 shadow-sm"
        >
          <span>{s.icon}</span>
          {s.label}
        </button>
      ))}
    </div>
  );
};
