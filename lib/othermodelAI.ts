
import { generateSummaryFromGemini } from "./geminiai";

export const generateSummaryFromOther = async (pdfText: string): Promise<string> => {
  // Fallback to Gemini for now - replace with other model implementation
  return await generateSummaryFromGemini(pdfText);
};