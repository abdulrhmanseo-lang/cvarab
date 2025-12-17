
export interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  year: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link?: string;
}

export enum TemplateId {
  // Arabic Templates
  AR_ATS = 'ar_ats', // 1. ATS Standard
  AR_CLASSIC = 'ar_classic', // 2. Official/Government
  AR_CORPORATE = 'ar_corporate', // 3. Aramco/Sabic Style
  AR_TECH = 'ar_tech', // 4. Developer/Tech
  AR_DESIGNER = 'ar_designer', // 5. Creative/Designer
  AR_BUSINESS = 'ar_business', // 6. Manager/KPIs
  AR_FUNCTIONAL = 'ar_functional', // 7. Skills Focused
  AR_MODERN_PURPLE = 'ar_modern_purple', // 8. Brand Identity
  AR_MINIMAL_CLEAN = 'ar_minimal_clean', // 9. Whitespace Heavy
  AR_MEDICAL = 'ar_medical', // 10. Medical/Health

  // English Templates
  EN_MODERN_PRO = 'en_modern_pro', // 1. Sidebar Dark
  EN_MINIMAL_ATS = 'en_minimal_ats', // 2. Standard US
  EN_EXECUTIVE = 'en_executive', // 3. C-Level/Director
  EN_TECH = 'en_tech', // 4. Developer
  EN_PRODUCT = 'en_product', // 5. PM/Product
  EN_CREATIVE = 'en_creative', // 6. Designer
  EN_BUSINESS = 'en_business', // 7. Analyst/Consultant
  EN_MEDICAL = 'en_medical', // 8. Health
  EN_TWO_COLUMN = 'en_two_column', // 9. Classic Split
  EN_SIDEBAR_COLOR = 'en_sidebar_color' // 10. Colored Sidebar
}

export enum Language {
  Arabic = 'ar',
  English = 'en'
}

export interface CVData {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  certifications: string[];
  targetCompany: string; 
  templateId: TemplateId;
  language: Language;
  freeText?: string;
}

export interface ATSAnalysis {
  score: number;
  missingKeywords: string[];
  feedback: string;
  companyFit: string;
}

export enum TargetCompany {
  None = "غير محدد",
  Aramco = "أرامكو السعودية",
  Sabic = "سابك",
  AlRajhi = "مصرف الراجحي",
  STC = "stc",
  Neom = "نيوم",
  Saudia = "الخطوط السعودية"
}

export type Plan = 'free' | 'basic' | 'pro' | 'guaranteed';

export interface BillingTransaction {
  id: string;
  date: string;
  amount: number;
  plan: Plan;
  status: 'paid' | 'failed' | 'pending';
  invoiceUrl?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  plan: Plan;
  subscriptionActive: boolean;
  subscriptionEnds?: string;
  billingHistory: BillingTransaction[];
}
