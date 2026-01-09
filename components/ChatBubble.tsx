
import React from 'react';
import { Message, Sender } from '../types';

interface ChatBubbleProps {
  message: Message;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isAgent = message.sender === Sender.AGENT;

  return (
    <div className={`flex ${isAgent ? 'justify-start' : 'justify-end'} mb-6 w-full animate-in fade-in slide-in-from-bottom-2 duration-300`}>
      <div className={`max-w-[85%] md:max-w-[75%] ${isAgent ? 'order-2' : 'order-1'}`}>
        
        {isAgent && message.insight && (
          <div className="mb-2 bg-slate-900 text-white p-3 rounded-xl rounded-bl-none text-xs leading-relaxed shadow-lg">
            <span className="font-bold uppercase tracking-widest text-[10px] block mb-1 text-slate-400">⚡ QUICK INSIGHT</span>
            {message.insight}
          </div>
        )}

        <div className={`p-4 rounded-2xl shadow-sm ${
          isAgent 
            ? 'bg-white border border-slate-200 text-slate-800 rounded-tl-none' 
            : 'bg-slate-800 text-white rounded-tr-none'
        }`}>
          <div className="prose prose-sm max-w-none whitespace-pre-wrap">
            {message.text}
          </div>
        </div>

        {isAgent && message.tip && (
          <div className="mt-2 bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-900">
            <span className="font-bold block mb-1">💎 MẸO SIÊU MÔI GIỚI:</span>
            {message.tip}
          </div>
        )}

        {isAgent && message.nextStep && (
          <div className="mt-3 flex items-center gap-2 text-sm font-medium text-slate-600 italic">
            <span className="text-slate-400">→</span>
            {message.nextStep}
          </div>
        )}

        <div className={`text-[10px] mt-1 text-slate-400 ${!isAgent && 'text-right'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};
