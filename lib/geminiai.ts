import { GoogleGenerativeAI } from '@google/generative-ai';
import { SUMMARY_SYSTEM_PROMPT } from '@/utils/prompts';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function generateSummaryFromGemini(pdfText: string, retries = 3) {
  if (!process.env.GEMINI_API_KEY) throw new Error('GEMINI_API_KEY not configured');
  if (!pdfText?.trim()) throw new Error('PDF text is empty');

  const maxChars = 500000;
  const truncatedText = pdfText.length > maxChars 
    ? pdfText.substring(0, maxChars) + '\n\n[Truncated...]'
    : pdfText;

  console.log(`📄 Text: ${truncatedText.length} chars (~${Math.ceil(truncatedText.length / 4)} tokens)`);

  for (let i = 0; i < retries; i++) {
    try {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        generationConfig: { temperature: 0.2, maxOutputTokens: 2048 }
      });

      const prompt = {
        contents: [{
          role: 'user',
          parts: [
            { text: SUMMARY_SYSTEM_PROMPT },
            { text: `Transform this into an engaging summary with emojis and markdown:\n\n${truncatedText}` }
          ]
        }]
      };

      console.log(`🔄 Attempt ${i + 1}/${retries}...`);
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      
      if (!text?.trim()) throw new Error('Empty response');

      console.log('\n✅ SUMMARY GENERATED:\n');
      console.log('='.repeat(80));
      console.log(text);
      console.log('='.repeat(80));
      console.log(`\n📊 Summary length: ${text.length} characters\n`);
      
      return text;

    } catch (error: any) {
      console.error(`❌ Attempt ${i + 1} failed: ${error.message}`);

      if (error?.status === 429) {
        if (i === retries - 1) throw new Error('RATE_LIMIT_EXCEEDED');
        await new Promise(r => setTimeout(r, Math.pow(2, i) * 2000));
        continue;
      }

      if (error?.status === 403) throw new Error('Invalid API key or API not enabled');
      if (error?.status === 400) throw new Error('Invalid request - content too long');
      if (i === retries - 1) throw error;

      await new Promise(r => setTimeout(r, Math.pow(2, i) * 1000));
    }
  }

  throw new Error('Failed after all retries');
}
