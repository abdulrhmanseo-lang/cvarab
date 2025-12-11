import { GoogleGenAI, Type } from "@google/genai";
import { CVData, ATSAnalysis, Language } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const modelId = "gemini-2.5-flash";

export const generateProfessionalSummary = async (currentSummary: string, jobTitle: string, targetCompany: string, language: Language): Promise<string> => {
  try {
    const langInstruction = language === Language.English ? "in English" : "in Arabic";
    const prompt = `
      You are an expert career coach for the Saudi market. 
      Rewrite the following professional summary to be ATS-friendly, professional, and concise (max 4 sentences) ${langInstruction}.
      The candidate's job title is: ${jobTitle}.
      
      ${targetCompany !== 'غير محدد' ? `IMPORTANT: The candidate is applying to ${targetCompany}. Incorporate values and keywords relevant to this specific company (e.g., safety for Aramco, innovation for NEOM, digital transformation for STC).` : ''}

      Current Summary: "${currentSummary}"
      
      Output only the rewritten summary.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });

    return response.text || currentSummary;
  } catch (error) {
    console.error("Gemini Error:", error);
    return currentSummary;
  }
};

export const generateExperienceBullets = async (title: string, company: string, description: string, language: Language): Promise<string> => {
  try {
    const langInstruction = language === Language.English ? "in English" : "in Arabic";
    const prompt = `
      Rewrite the following experience description into 3-4 professional, punchy bullet points starting with strong action verbs ${langInstruction}.
      Job Title: ${title} at ${company}.
      Input: "${description}"
      
      Output only the bullet points (using •). Do not add intro text.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });

    return response.text || description;
  } catch (error) {
    return description;
  }
}

export const analyzeCV = async (data: CVData): Promise<ATSAnalysis> => {
  try {
    const prompt = `
      Analyze this CV data for a role as ${data.jobTitle}.
      Target Company: ${data.targetCompany}.
      Language: ${data.language}.
      
      CV Content:
      Summary: ${data.summary}
      Skills: ${data.skills.join(", ")}
      Experience: ${data.experience.map(e => `${e.title} at ${e.company}: ${e.description}`).join("; ")}

      Return a JSON object with:
      - score (integer 0-100)
      - missingKeywords (array of strings, essential skills missing for this role/company)
      - feedback (string, short constructive advice in ${data.language === Language.English ? 'English' : 'Arabic'})
      - companyFit (string, specific advice for the target company in ${data.language === Language.English ? 'English' : 'Arabic'})
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER },
            missingKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
            feedback: { type: Type.STRING },
            companyFit: { type: Type.STRING }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as ATSAnalysis;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return {
      score: 75,
      missingKeywords: ["Leadership", "Communication", "English"],
      feedback: "Could not complete analysis at this time.",
      companyFit: "Check company values."
    };
  }
};