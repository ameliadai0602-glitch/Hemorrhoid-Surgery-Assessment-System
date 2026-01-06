import { GoogleGenAI } from "@google/genai";
import { PreOpData, IntraOpData, PostOpData, FollowUpData, FormType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateClinicalNote = async (
  formType: FormType,
  data: PreOpData | IntraOpData | PostOpData | FollowUpData
): Promise<string> => {
  if (!process.env.API_KEY) {
    return "請設定 API Key 以使用 AI 摘要功能。";
  }

  let prompt = "";
  const jsonData = JSON.stringify(data, null, 2);

  switch (formType) {
    case 'pre-op':
      prompt = `
      你是一位專業的外科醫師助理。請根據以下 JSON 格式的「術前評估與器械選擇」資料，撰寫一份繁體中文的專業病歷摘要 (Admission Note / Pre-op Note)。
      重點包含：痔瘡分級、症狀、病人身體狀況風險、選擇的手術器械及其理由。
      語氣需專業、客觀。
      
      資料:
      ${jsonData}
      `;
      break;
    case 'intra-op':
      prompt = `
      你是一位專業的手術室護理師。請根據以下 JSON 格式的「術中紀錄」資料，撰寫一份繁體中文的手術紀錄摘要 (Operation Note Summary)。
      重點包含：使用的能量器械與設定、手術時間、出血量、是否有併發症。
      
      資料:
      ${jsonData}
      `;
      break;
    case 'post-op':
      prompt = `
      你是一位病房護理師。請根據以下 JSON 格式的「術後評估」資料，撰寫一份繁體中文的護理紀錄 (Nursing Note)。
      重點包含：VAS疼痛指數、排尿狀況、傷口觀察、用藥情形與衛教反應。
      
      資料:
      ${jsonData}
      `;
      break;
    case 'follow-up':
      prompt = `
      你是一位門診護理師。請根據以下 JSON 格式的「門診追蹤」資料，撰寫一份繁體中文的門診追蹤紀錄 (Follow-up Note)。
      重點包含：術後恢復狀況、滿意度、排便控制功能及理學檢查發現。
      
      資料:
      ${jsonData}
      `;
      break;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } 
      }
    });
    return response.text || "無法產生摘要";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "產生摘要時發生錯誤，請檢查網絡或 API Key。";
  }
};