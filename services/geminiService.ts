import { GoogleGenAI, Type } from "@google/genai";
import { Message, Sender } from "../types";

const SYSTEM_INSTRUCTION = `
Bạn là một Real Estate Super Agent (Siêu Môi giới) với hơn 20 năm kinh nghiệm thực chiến.
Phong cách: Chuyên nghiệp, quyết đoán, minh bạch, sắc bén nhưng khéo léo.

Cấu trúc phản hồi BẮT BUỘC (Sử dụng JSON format để trả về):
1. quickInsight: Phân tích nhanh 1-2 câu về bối cảnh thị trường (Lãi suất, Luật Đất đai 2024, Vĩ mô).
2. coreResponse: Nội dung tư vấn chính (Dùng Markdown: bullet points, bold text).
3. superAgentTip: Một mẹo nhỏ hoặc lưu ý "xương máu" về pháp lý/tài chính.
4. nextStep: Một câu hỏi gợi mở hoặc đề xuất giá trị để dẫn dắt khách hàng.

QUY TẮC:
- Luôn cập nhật tư duy theo các biến số kinh tế (Lãi suất vay mua nhà hiện tại ~7-9%, Luật Đất đai 2024 có hiệu lực, áp lực tỷ giá).
- Nếu thị trường xấu, hãy cảnh báo, không cố đẩy mua.
- Phản hồi bằng tiếng Việt.
`;

export class RealEstateService {
  private ai: GoogleGenAI;

  constructor() {
    // THAY ĐỔI 1: Để chạy ngay lập tức, hãy dán trực tiếp API Key vào dấu ngoặc kép dưới đây
    // Sau khi chạy ok, bạn có thể đổi lại thành process.env.API_KEY sau.
    const myApiKey = "AIzaSyBoXoD5BIeeWf8-9fQ1CyDT5n3ZD-mln9k"; 
    this.ai = new GoogleGenAI({ apiKey: myApiKey });
  }

  async getStrategicAdvice(userPrompt: string, history: Message[]): Promise<Partial<Message>> {
    try {
      // THAY ĐỔI 2: Đổi tên model từ 'gemini-3-pro-preview' thành 'gemini-1.5-flash'
      const model = 'gemini-1.5-flash';
      
      const chatHistory = history.map(msg => ({
        role: msg.sender === Sender.USER ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      const response = await this.ai.models.generateContent({
        model,
        contents: [
          ...chatHistory,
          { parts: [{ text: userPrompt }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              quickInsight: { type: Type.STRING },
              coreResponse: { type: Type.STRING },
              superAgentTip: { type: Type.STRING },
              nextStep: { type: Type.STRING }
            },
            required: ["quickInsight", "coreResponse", "superAgentTip", "nextStep"]
          }
        }
      });

      const result = JSON.parse(response.text || '{}');
      
      return {
        text: result.coreResponse,
        insight: result.quickInsight,
        tip: result.superAgentTip,
        nextStep: result.nextStep
      };
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  }
}

export const realEstateService = new RealEstateService();
