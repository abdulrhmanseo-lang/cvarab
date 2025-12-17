
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { CVData, ATSAnalysis, Language } from "../types";

// Declaration to prevent TS errors in browser environment where process might be missing from types
// We assume process.env.API_KEY is injected by the bundler or polyfilled in index.html
declare const process: { env: { API_KEY: string } };

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

export const generateSkills = async (jobTitle: string, language: Language): Promise<string[]> => {
  try {
    const langInstruction = language === Language.English ? "in English" : "in Arabic";
    const prompt = `
      List 15 professional hard and soft skills for a ${jobTitle} role ${langInstruction}.
      Output strictly a comma-separated list of skills. Do not use numbers or bullet points.
      Example output: Skill 1, Skill 2, Skill 3
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });

    const text = response.text || "";
    // Clean up text (remove newlines, replace bullets/numbers if model fails instruction, split by comma)
    return text.replace(/\n/g, ',').split(',').map(s => s.trim().replace(/^[•\-\d\.]+\s*/, '')).filter(s => s.length > 0);
  } catch (error) {
    console.error("Gemini Skills Error:", error);
    return [];
  }
};

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

export const generateCVFromFreeText = async (text: string, language: Language): Promise<Partial<CVData>> => {
  try {
    const langInstruction = language === Language.English ? "in English" : "in Arabic";
    const prompt = `
      You are an expert CV writer. Extract information from the following text and structure it into a CV JSON format.
      Language of output: ${langInstruction}.
      
      Input Text: "${text}"
      
      Return a JSON object with the following fields:
      - fullName (string)
      - jobTitle (string)
      - email (string, or empty if not found)
      - phone (string, or empty if not found)
      - location (string, or empty if not found)
      - summary (string, professional summary derived from text)
      - skills (array of strings)
      - experience (array of objects with title, company, startDate, endDate, description)
      - education (array of objects with degree, school, year)
      
      Ensure dates are formatted concisely (e.g., "2020", "Jan 2020", "Present").
      Ensure experience descriptions are formatted as professional bullet points.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            fullName: { type: Type.STRING },
            jobTitle: { type: Type.STRING },
            email: { type: Type.STRING },
            phone: { type: Type.STRING },
            location: { type: Type.STRING },
            summary: { type: Type.STRING },
            skills: { type: Type.ARRAY, items: { type: Type.STRING } },
            experience: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  company: { type: Type.STRING },
                  startDate: { type: Type.STRING },
                  endDate: { type: Type.STRING },
                  description: { type: Type.STRING },
                }
              }
            },
            education: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  degree: { type: Type.STRING },
                  school: { type: Type.STRING },
                  year: { type: Type.STRING },
                }
              }
            }
          }
        }
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    
    // Add unique IDs to generated items
    if (parsed.experience) {
      parsed.experience = parsed.experience.map((e: any) => ({ 
        ...e, 
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9) 
      }));
    }
    if (parsed.education) {
      parsed.education = parsed.education.map((e: any) => ({ 
        ...e, 
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9) 
      }));
    }

    return parsed;
  } catch (error) {
    console.error("Gemini Free Text Generation Error:", error);
    throw error;
  }
};
