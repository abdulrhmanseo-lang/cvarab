
import { CVData, Language, TemplateId } from '../types';

declare var html2pdf: any;

export const templates = [
  // Arabic
  { id: TemplateId.AR_ATS, name: "ATS قياسي", lang: "ar", color: "bg-gray-100", type: "Standard" },
  { id: TemplateId.AR_CLASSIC, name: "كلاسيكي رسمي", lang: "ar", color: "bg-orange-50", type: "Classic" },
  { id: TemplateId.AR_CORPORATE, name: "شركات كبرى", lang: "ar", color: "bg-blue-100", type: "Corporate" },
  { id: TemplateId.AR_TECH, name: "تقني/مبرمج", lang: "ar", color: "bg-slate-800 text-white", type: "Tech" },
  { id: TemplateId.AR_MODERN_PURPLE, name: "سكور الحديث", lang: "ar", color: "bg-purple-100", type: "Modern" },
  { id: TemplateId.AR_DESIGNER, name: "مصمم مبدع", lang: "ar", color: "bg-pink-100", type: "Creative" },
  { id: TemplateId.AR_BUSINESS, name: "إداري/أعمال", lang: "ar", color: "bg-amber-100", type: "Business" },
  { id: TemplateId.AR_FUNCTIONAL, name: "وظيفي (مهارات)", lang: "ar", color: "bg-gray-200", type: "Functional" },
  { id: TemplateId.AR_MEDICAL, name: "طبي/صحي", lang: "ar", color: "bg-teal-100", type: "Medical" },
  { id: TemplateId.AR_MINIMAL_CLEAN, name: "بسيط ونظيف", lang: "ar", color: "bg-white border", type: "Minimal" },

  // English
  { id: TemplateId.EN_MINIMAL_ATS, name: "Minimal ATS", lang: "en", color: "bg-gray-50", type: "Standard" },
  { id: TemplateId.EN_MODERN_PRO, name: "Modern Pro", lang: "en", color: "bg-slate-200", type: "Modern" },
  { id: TemplateId.EN_EXECUTIVE, name: "Executive", lang: "en", color: "bg-slate-300", type: "Corporate" },
  { id: TemplateId.EN_TECH, name: "Tech Lead", lang: "en", color: "bg-zinc-800 text-white", type: "Tech" },
  { id: TemplateId.EN_PRODUCT, name: "Product Manager", lang: "en", color: "bg-blue-50", type: "Business" },
  { id: TemplateId.EN_CREATIVE, name: "Creative Rose", lang: "en", color: "bg-rose-100", type: "Creative" },
  { id: TemplateId.EN_BUSINESS, name: "Business Consultant", lang: "en", color: "bg-blue-100", type: "Business" },
  { id: TemplateId.EN_MEDICAL, name: "Medical Pro", lang: "en", color: "bg-cyan-100", type: "Medical" },
  { id: TemplateId.EN_TWO_COLUMN, name: "Classic Split", lang: "en", color: "bg-gray-200", type: "Classic" },
  { id: TemplateId.EN_SIDEBAR_COLOR, name: "Bold Sidebar", lang: "en", color: "bg-indigo-100", type: "Modern" },
];

export const validateCV = (cv: CVData): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!cv.fullName.trim()) errors.fullName = "الاسم الكامل مطلوب";
  if (!cv.jobTitle.trim()) errors.jobTitle = "المسمى الوظيفي مطلوب";
  if (!cv.summary.trim()) errors.summary = "الملخص المهني مطلوب";
  
  if (cv.experience.length === 0) {
      errors.experience = "يجب إضافة خبرة واحدة على الأقل";
  }

  if (cv.skills.length < 3) {
      errors.skills = "يجب إضافة 3 مهارات على الأقل";
  }

  if (cv.education.length === 0) {
      errors.education = "يجب إضافة مؤهل تعليمي واحد على الأقل";
  }

  return errors;
};

export const generatePdf = async (elementId: string, filename: string, language: Language) => {
    const element = document.getElementById(elementId);
    if (!element) throw new Error("Element not found");

    // Optimized settings for A4 and Mobile Browsers
    const opt = {
      margin: 0, // No margin to allow full bleed templates
      filename: `${filename.replace(/\s+/g, '_')}_CV.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, // High resolution
        useCORS: true, 
        logging: false,
        letterRendering: true,
        scrollY: 0,
        windowWidth: 794 // Force A4 pixel width (approx) to prevent mobile layout shifts
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Force strict print styles and specific width during generation
    const originalStyle = element.style.cssText;
    element.style.width = '210mm';
    element.style.height = '297mm'; // Force single page height context if needed, or let it flow
    element.style.minHeight = '297mm';
    element.classList.add('print-mode');
    
    try {
        await html2pdf().set(opt).from(element).save();
    } finally {
        // Restore styling
        element.classList.remove('print-mode');
        element.style.cssText = originalStyle;
    }
};
