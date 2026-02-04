
import { GoogleGenAI } from "@google/genai";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGeminiWelcomeMessage = async (name: string, dept: string, position: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `고든병원의 ${dept} 소속 ${name} ${position}님을 위한 따뜻하고 전문적인 환영 인사말을 한 문장으로 만들어줘. 상대방의 직위를 존중하는 톤앤매너를 유지해줘.`,
    });
    // .text property is used directly to get the text response.
    return response.text || `오늘도 고든병원의 환자분들을 위해 수고해주시는 ${name} ${position}님을 응원합니다.`;
  } catch (error) {
    console.error("Gemini Error:", error);
    return `오늘도 행복한 하루 되세요, ${name} ${position}님!`;
  }
};

export const summarizeNotice = async (content: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `다음 공지사항 내용을 한 줄로 요약해줘: ${content}`,
    });
    // .text property is used directly to get the text response.
    return response.text;
  } catch (error) {
    return content.substring(0, 30) + "...";
  }
};
