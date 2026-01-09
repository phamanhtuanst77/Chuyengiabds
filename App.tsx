
import React, { useState, useRef, useEffect } from 'react';
import { Sender, Message } from './types';
import { realEstateService } from './services/geminiService';
import { ChatBubble } from './components/ChatBubble';
import { MarketDashboard } from './components/MarketDashboard';
import { ScenarioSelector } from './components/ScenarioSelector';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: Sender.AGENT,
      text: "Xin chào! Tôi là **EstateNexus AI**, Siêu môi giới chiến lược của bạn. \n\nVới hơn 20 năm kinh nghiệm và dữ liệu cập nhật về **Luật Đất Đai 2024**, tôi ở đây để giúp bạn tối ưu hóa dòng tiền và chốt deal hiệu quả nhất. Bạn đang quan tâm đến phân khúc nào hay đang gặp khó khăn trong cuộc đàm phán nào?",
      timestamp: new Date(),
      insight: "Thị trường đang trong giai đoạn 'thanh lọc' mạnh mẽ. Lãi suất vay mua nhà đang có xu hướng ổn định quanh mức 7.5-8.5%.",
      tip: "Đừng vội mua đất nền vùng ven chưa có sổ đỏ trong thời điểm này vì các quy định siết phân lô mới rất nghiêm ngặt.",
      nextStep: "Bạn có muốn tôi phân tích dòng tiền cho một dự án cụ thể không?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: Sender.USER,
      text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const advice = await realEstateService.getStrategicAdvice(text, messages);
      const agentMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: Sender.AGENT,
        text: advice.text || 'Xin lỗi, tôi gặp chút trục trặc trong quá trình phân tích.',
        timestamp: new Date(),
        insight: advice.insight,
        tip: advice.tip,
        nextStep: advice.nextStep
      };
      setMessages(prev => [...prev, agentMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: Sender.AGENT,
        text: "Hệ thống đang quá tải dữ liệu thị trường. Vui lòng thử lại trong giây lát hoặc kiểm tra kết nối API Key của bạn.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar - Dashboard (Desktop Only) */}
      <aside className="hidden lg:block w-96 p-6 border-r border-slate-200">
        <MarketDashboard />
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col h-full max-w-5xl mx-auto w-full">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
              EN
            </div>
            <div>
              <h1 className="font-bold text-slate-900 leading-none mb-1">EstateNexus AI</h1>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs text-slate-500 font-medium">Siêu Môi Giới (20+ năm exp)</span>
              </div>
            </div>
          </div>
          <button className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg font-semibold transition-colors">
            XUẤT CHIẾN LƯỢC (PDF)
          </button>
        </header>

        {/* Chat Feed */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 md:p-8 space-y-2 no-scrollbar"
        >
          <div className="max-w-3xl mx-auto">
            {messages.map((m) => (
              <ChatBubble key={m.id} message={m} />
            ))}
            {isLoading && (
              <div className="flex justify-start mb-6 animate-pulse">
                <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-.5s]"></div>
                  </div>
                  <span className="text-xs text-slate-400 font-medium italic">Đang phân tích dữ liệu thị trường...</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <footer className="p-4 md:p-6 bg-white border-t border-slate-200">
          <div className="max-w-3xl mx-auto space-y-4">
            <ScenarioSelector onSelect={(s) => handleSend(s)} />
            
            <div className="relative group">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Hỏi về lãi suất, pháp lý, hoặc kịch bản chốt deal..."
                className="w-full bg-slate-50 border border-slate-200 focus:border-slate-900 focus:ring-0 rounded-2xl px-5 py-4 pr-16 text-slate-800 placeholder:text-slate-400 resize-none transition-all shadow-inner"
                rows={2}
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="absolute right-3 bottom-3 w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:bg-slate-800 disabled:opacity-50 disabled:hover:bg-slate-900 transition-all shadow-lg active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                </svg>
              </button>
            </div>
            <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest font-bold">
              Powered by Gemini 3 Pro • Real Estate Intelligence
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
