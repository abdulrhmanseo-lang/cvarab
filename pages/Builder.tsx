
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TargetCompany, CVData, TemplateId, Language } from '../types';
import { Save, ChevronLeft, ChevronRight, Wand2, Briefcase, GraduationCap, User, Layout, Loader2, Check } from 'lucide-react';
import { generateProfessionalSummary, generateExperienceBullets } from '../services/gemini';

const initialCV: CVData = {
  fullName: "",
  jobTitle: "",
  email: "",
  phone: "",
  location: "",
  summary: "",
  skills: [],
  experience: [],
  education: [],
  targetCompany: TargetCompany.None,
  templateId: TemplateId.AR_ATS,
  language: Language.Arabic
};

// Enhanced Template Metadata
const templates = [
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

const Builder: React.FC = () => {
  const navigate = useNavigate();
  const [cv, setCv] = useState<CVData>(initialCV);
  const [activeTab, setActiveTab] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiLoadingState, setAiLoadingState] = useState<{show: boolean, stage: number}>({ show: false, stage: 0 });
  const [activeExpGen, setActiveExpGen] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('cv_data');
    if (saved) {
      setCv(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cv_data', JSON.stringify(cv));
  }, [cv]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCv(prev => ({ ...prev, [name]: value }));
  };

  const handleAISummary = async () => {
    if (!cv.jobTitle) return alert("يرجى إدخال المسمى الوظيفي أولاً");
    setIsGenerating(true);
    const newSummary = await generateProfessionalSummary(cv.summary, cv.jobTitle, cv.targetCompany, cv.language);
    setCv(prev => ({ ...prev, summary: newSummary }));
    setIsGenerating(false);
  };

  const handleAIExperience = async (id: string, title: string, company: string, currentDesc: string) => {
    if (!title) return alert("الرجاء إدخال المسمى الوظيفي للخبرة");
    setActiveExpGen(id);
    const bullets = await generateExperienceBullets(title, company, currentDesc, cv.language);
    updateExperience(id, 'description', bullets);
    setActiveExpGen(null);
  }

  const addExperience = () => {
    setCv(prev => ({
      ...prev,
      experience: [...prev.experience, { id: Date.now().toString(), title: "", company: "", startDate: "", endDate: "", description: "" }]
    }));
  };

  const updateExperience = (id: string, field: string, value: string) => {
    setCv(prev => ({
      ...prev,
      experience: prev.experience.map(e => e.id === id ? { ...e, [field]: value } : e)
    }));
  };

  const handleFinish = async () => {
    setAiLoadingState({ show: true, stage: 0 });
    const stages = ["نجمع معلوماتك...", "نعالج خبراتك...", "ننسق السيرة...", "نطبق معايير ATS...", "جاهز!"];
    for (let i = 0; i < stages.length; i++) {
        setAiLoadingState({ show: true, stage: i });
        await new Promise(r => setTimeout(r, 800));
    }
    setTimeout(() => {
        setAiLoadingState({ show: false, stage: 0 });
        navigate('/preview');
    }, 500);
  };

  const steps = [
    { title: "القالب واللغة", icon: <Layout size={20} /> },
    { title: "المعلومات الأساسية", icon: <User size={20} /> },
    { title: "الخبرات العملية", icon: <Briefcase size={20} /> },
    { title: "التعليم والمهارات", icon: <GraduationCap size={20} /> },
  ];

  const InputClass = "w-full p-4 bg-dark border border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-white placeholder-gray-600 hover:border-white/20";
  const LabelClass = "block text-sm font-semibold text-gray-400 mb-2";

  return (
    <div className="bg-dark min-h-screen pb-24 relative">
      {/* AI Loading Overlay */}
      {aiLoadingState.show && (
          <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center">
              <div className="w-64 mb-8 relative">
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse"></div>
                  <Wand2 size={64} className="text-primary relative z-10 mx-auto animate-bounce" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-6 animate-pulse">
                  {["نجمع معلوماتك...", "نعالج خبراتك...", "ننسق السيرة...", "نطبق معايير ATS...", "جاهز!"][aiLoadingState.stage]}
              </h2>
              <div className="w-80 h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-purple-400 transition-all duration-500 ease-out"
                    style={{ width: `${((aiLoadingState.stage + 1) / 5) * 100}%` }}
                  ></div>
              </div>
          </div>
      )}

      {/* Builder Header */}
      <div className="bg-dark/80 backdrop-blur-md border-b border-white/10 sticky top-20 z-40 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white hidden md:block">منشئ السيرة الذاتية</h1>
          
          <div className="flex gap-3">
             <button 
              onClick={() => navigate('/preview')}
              className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-2 rounded-xl font-medium transition-all"
            >
              معاينة
            </button>
            <button 
              onClick={handleFinish}
              className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40"
            >
              <span>حفظ وإنهاء</span>
              <Save size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl relative z-10">
        
        {/* Progress Steps */}
        <div className="flex justify-between mb-12 relative px-4 overflow-x-auto pb-4 md:pb-0">
           <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -z-10 -translate-y-1/2 rounded-full hidden md:block"></div>
           {steps.map((step, idx) => (
             <div 
                key={idx} 
                className={`flex flex-col items-center cursor-pointer group min-w-[80px]`}
                onClick={() => setActiveTab(idx)}
              >
               <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-500 relative ${activeTab >= idx ? 'bg-primary text-white shadow-[0_0_20px_rgba(124,58,237,0.4)]' : 'bg-card border border-white/10 text-gray-500 hover:border-primary/50'}`}>
                 {step.icon}
               </div>
               <span className={`text-sm font-bold transition-colors whitespace-nowrap ${activeTab >= idx ? 'text-white' : 'text-gray-500'}`}>{step.title}</span>
             </div>
           ))}
        </div>

        {/* Form Content Card */}
        <div className="bg-card border border-white/5 rounded-3xl p-6 md:p-10 min-h-[500px] shadow-2xl relative overflow-hidden">
          
          {/* Step 0: Templates & Language */}
          {activeTab === 0 && (
            <div className="space-y-8 animate-fade-in">
                <div className="border-b border-white/5 pb-4 mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">اختر القالب واللغة</h2>
                    <p className="text-gray-500">اختر من بين 20 قالب احترافي.</p>
                </div>

                {/* Language Toggle */}
                <div className="flex gap-4 mb-8 bg-black/20 p-2 rounded-2xl">
                    <button 
                        onClick={() => setCv(prev => ({ ...prev, language: Language.Arabic, templateId: TemplateId.AR_ATS }))}
                        className={`flex-1 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${cv.language === Language.Arabic ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:bg-white/5'}`}
                    >
                        🇸🇦 العربية
                    </button>
                    <button 
                        onClick={() => setCv(prev => ({ ...prev, language: Language.English, templateId: TemplateId.EN_MINIMAL_ATS }))}
                        className={`flex-1 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${cv.language === Language.English ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:bg-white/5'}`}
                    >
                        🇺🇸 English
                    </button>
                </div>

                {/* Templates Grid */}
                <div>
                   <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                     <Layout size={18} className="text-primary"/>
                     {cv.language === Language.Arabic ? 'القوالب العربية المتاحة' : 'Available English Templates'}
                   </h3>
                   <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {templates.filter(t => t.lang === cv.language).map(t => (
                          <div 
                              key={t.id} 
                              onClick={() => setCv(prev => ({...prev, templateId: t.id}))}
                              className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 hover:scale-105 group ${cv.templateId === t.id ? 'border-primary ring-2 ring-primary/50 ring-offset-2 ring-offset-dark' : 'border-white/5 hover:border-white/20'}`}
                          >
                              {/* Selection Indicator */}
                              {cv.templateId === t.id && (
                                <div className="absolute top-2 right-2 z-20 bg-primary text-white p-1 rounded-full shadow-lg">
                                  <Check size={12} strokeWidth={4} />
                                </div>
                              )}
                              
                              {/* Mockup Preview */}
                              <div className={`h-32 ${t.color} flex flex-col p-3 relative`}>
                                  <div className="w-1/3 h-2 bg-current opacity-20 rounded mb-2"></div>
                                  <div className="w-2/3 h-1.5 bg-current opacity-10 rounded mb-1"></div>
                                  <div className="w-1/2 h-1.5 bg-current opacity-10 rounded mb-3"></div>
                                  <div className="flex-1 bg-white/20 rounded-lg border border-black/5"></div>
                              </div>
                              
                              {/* Metadata */}
                              <div className="bg-[#1a1a1a] p-3 border-t border-white/5">
                                  <div className="text-xs font-bold text-white mb-0.5 truncate">{t.name}</div>
                                  <div className="text-[10px] text-gray-500">{t.type}</div>
                              </div>
                          </div>
                      ))}
                   </div>
                </div>
            </div>
          )}

          {/* Step 1: Basics */}
          {activeTab === 1 && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-white/5 pb-4 mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">المعلومات الشخصية</h2>
                <p className="text-gray-500">ابدأ بأساسيات سيرتك الذاتية.</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={LabelClass}>{cv.language === Language.Arabic ? 'الاسم الكامل' : 'Full Name'}</label>
                  <input type="text" name="fullName" value={cv.fullName} onChange={handleInputChange} className={InputClass} placeholder={cv.language === Language.Arabic ? "مثال: محمد أحمد" : "e.g., John Doe"} />
                </div>
                <div>
                  <label className={LabelClass}>{cv.language === Language.Arabic ? 'المسمى الوظيفي' : 'Job Title'}</label>
                  <input type="text" name="jobTitle" value={cv.jobTitle} onChange={handleInputChange} className={InputClass} />
                </div>
                <div>
                  <label className={LabelClass}>Email</label>
                  <input type="email" name="email" value={cv.email} onChange={handleInputChange} className={InputClass} placeholder="name@example.com" />
                </div>
                <div>
                  <label className={LabelClass}>{cv.language === Language.Arabic ? 'رقم الجوال' : 'Phone'}</label>
                  <input type="text" name="phone" value={cv.phone} onChange={handleInputChange} className={InputClass} />
                </div>
                <div className="md:col-span-2">
                  <label className={LabelClass}>{cv.language === Language.Arabic ? 'العنوان' : 'Location'}</label>
                  <input type="text" name="location" value={cv.location} onChange={handleInputChange} className={InputClass} />
                </div>
              </div>

              <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 relative overflow-hidden group hover:bg-primary/10 transition-colors">
                <label className="block text-sm font-bold text-primary-light mb-3 relative z-10">
                    {cv.language === Language.Arabic ? 'الشركة المستهدفة (هام لزيادة الـ Score)' : 'Target Company (Important for ATS Score)'}
                </label>
                <select 
                  name="targetCompany" 
                  value={cv.targetCompany} 
                  onChange={handleInputChange} 
                  className="w-full p-4 border border-primary/30 rounded-xl focus:ring-2 focus:ring-primary outline-none bg-dark text-white font-medium appearance-none cursor-pointer hover:border-primary/60 transition-colors"
                >
                  {Object.values(TargetCompany).map((company) => (
                    <option key={company} value={company}>{company}</option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                   <label className={LabelClass}>{cv.language === Language.Arabic ? 'الملخص المهني' : 'Professional Summary'}</label>
                   <button 
                    onClick={handleAISummary}
                    disabled={isGenerating}
                    className="text-xs flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-1.5 rounded-full font-bold hover:shadow-lg transition-all disabled:opacity-50 hover:scale-105 active:scale-95"
                   >
                     {isGenerating ? <Loader2 size={14} className="animate-spin" /> : <Wand2 size={14} />}
                     {cv.language === Language.Arabic ? 'اكتب لي بالذكاء' : 'AI Rewrite'}
                   </button>
                </div>
                <textarea 
                  name="summary" 
                  value={cv.summary} 
                  onChange={handleInputChange} 
                  rows={4} 
                  className={InputClass} 
                  placeholder={cv.language === Language.Arabic ? "أكتب نبذة مختصرة عنك..." : "Write a brief summary..."}
                ></textarea>
              </div>
            </div>
          )}

          {/* Step 2: Experience */}
          {activeTab === 2 && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-white/5 pb-4 mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">{cv.language === Language.Arabic ? 'الخبرات العملية' : 'Work Experience'}</h2>
                <p className="text-gray-500">رتب خبراتك من الأحدث إلى الأقدم.</p>
              </div>
              
              <div className="space-y-6">
                {cv.experience.map((exp) => (
                    <div key={exp.id} className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-all relative group">
                    <button 
                        className="absolute top-4 left-4 text-red-400 hover:bg-red-500/10 p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                        onClick={() => setCv(prev => ({...prev, experience: prev.experience.filter(e => e.id !== exp.id)}))}
                    >
                        {cv.language === Language.Arabic ? 'حذف' : 'Remove'}
                    </button>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">{cv.language === Language.Arabic ? 'المسمى الوظيفي' : 'Job Title'}</label>
                            <input 
                            value={exp.title} 
                            onChange={(e) => updateExperience(exp.id, 'title', e.target.value)} 
                            className={`${InputClass} py-3`}
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">{cv.language === Language.Arabic ? 'جهة العمل' : 'Company'}</label>
                            <input 
                            value={exp.company} 
                            onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} 
                            className={`${InputClass} py-3`}
                            />
                        </div>
                        <div className="flex gap-4 md:col-span-2">
                            <div className="w-1/2">
                                <label className="text-xs text-gray-500 mb-1 block">{cv.language === Language.Arabic ? 'من' : 'Start Date'}</label>
                                <input type="text" value={exp.startDate} onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)} className={`${InputClass} py-3`} placeholder="2020" />
                            </div>
                            <div className="w-1/2">
                                <label className="text-xs text-gray-500 mb-1 block">{cv.language === Language.Arabic ? 'إلى' : 'End Date'}</label>
                                <input type="text" value={exp.endDate} onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)} className={`${InputClass} py-3`} placeholder="Present" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="text-xs text-gray-500 block">{cv.language === Language.Arabic ? 'الوصف' : 'Description'}</label>
                            <button 
                                onClick={() => handleAIExperience(exp.id, exp.title, exp.company, exp.description)}
                                className="text-xs flex items-center gap-1 text-primary hover:text-primary-light"
                                disabled={activeExpGen === exp.id}
                            >
                                {activeExpGen === exp.id ? <Loader2 size={12} className="animate-spin"/> : <Wand2 size={12} />}
                                {cv.language === Language.Arabic ? 'توليد نقاط Bullet' : 'Generate Bullets'}
                            </button>
                        </div>
                        <textarea 
                            value={exp.description} 
                            onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} 
                            className={`${InputClass} h-32`}
                            placeholder={cv.language === Language.Arabic ? "• إنجاز 1\n• مسؤولية 2" : "• Achievement 1\n• Responsibility 2"}
                        ></textarea>
                    </div>
                    </div>
                ))}
              </div>
              
              <button onClick={addExperience} className="w-full py-4 border border-dashed border-gray-600 rounded-2xl text-gray-400 font-bold hover:border-primary hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
                <Briefcase size={18} />
                {cv.language === Language.Arabic ? '+ إضافة خبرة جديدة' : '+ Add Experience'}
              </button>
            </div>
          )}

          {/* Step 3: Skills & Education */}
          {activeTab === 3 && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-white/5 pb-4 mb-6">
                 <h2 className="text-2xl font-bold text-white mb-2">{cv.language === Language.Arabic ? 'التعليم والمهارات' : 'Education & Skills'}</h2>
              </div>
              
              <div>
                <label className={LabelClass}>{cv.language === Language.Arabic ? 'المهارات (افصل بفاصلة)' : 'Skills (comma separated)'}</label>
                <textarea 
                  value={cv.skills.join(", ")} 
                  onChange={(e) => setCv(prev => ({ ...prev, skills: e.target.value.split(",").map(s => s.trim()) }))}
                  className={`${InputClass} h-32`}
                />
              </div>

               <div className="mt-8">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><GraduationCap size={20} className="text-primary"/> {cv.language === Language.Arabic ? 'التعليم' : 'Education'}</h3>
                <div className="space-y-4">
                    {cv.education.map((edu, idx) => (
                        <div key={edu.id} className="bg-white/5 p-4 rounded-2xl border border-white/5 grid md:grid-cols-3 gap-4">
                            <input 
                                placeholder={cv.language === Language.Arabic ? "الدرجة" : "Degree"} 
                                value={edu.degree} 
                                onChange={(e) => {
                                    const newEdu = [...cv.education];
                                    newEdu[idx].degree = e.target.value;
                                    setCv(prev => ({...prev, education: newEdu}));
                                }} 
                                className={`${InputClass} py-2 text-sm`}
                            />
                            <input 
                                placeholder={cv.language === Language.Arabic ? "الجامعة" : "School"}
                                value={edu.school} 
                                onChange={(e) => {
                                    const newEdu = [...cv.education];
                                    newEdu[idx].school = e.target.value;
                                    setCv(prev => ({...prev, education: newEdu}));
                                }} 
                                className={`${InputClass} py-2 text-sm`}
                            />
                            <input 
                                placeholder={cv.language === Language.Arabic ? "السنة" : "Year"}
                                value={edu.year} 
                                onChange={(e) => {
                                    const newEdu = [...cv.education];
                                    newEdu[idx].year = e.target.value;
                                    setCv(prev => ({...prev, education: newEdu}));
                                }} 
                                className={`${InputClass} py-2 text-sm`}
                            />
                        </div>
                    ))}
                </div>
                 <button 
                    onClick={() => setCv(prev => ({...prev, education: [...prev.education, { id: Date.now().toString(), degree: "", school: "", year: "" }]}))}
                    className="mt-4 text-primary font-bold text-sm hover:text-primary-light transition-colors flex items-center gap-2"
                >
                    {cv.language === Language.Arabic ? '+ إضافة مؤهل' : '+ Add Education'}
                </button>
               </div>
            </div>
          )}

        </div>
        
        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button 
            disabled={activeTab === 0}
            onClick={() => setActiveTab(p => p - 1)}
            className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold bg-card text-white border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/5 transition-all"
          >
            <ChevronRight size={20} /> {cv.language === Language.Arabic ? 'السابق' : 'Back'}
          </button>

          {activeTab < steps.length - 1 ? (
             <button 
                onClick={() => setActiveTab(p => p + 1)}
                className="flex items-center gap-2 px-10 py-3 rounded-xl font-bold bg-primary text-white hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 hover:scale-105 active:scale-95"
              >
                {cv.language === Language.Arabic ? 'التالي' : 'Next'} <ChevronLeft size={20} />
              </button>
          ) : (
            <button 
                onClick={handleFinish}
                className="flex items-center gap-2 px-10 py-3 rounded-xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all hover:scale-105 active:scale-95"
              >
                {cv.language === Language.Arabic ? 'إنهاء ومعاينة' : 'Finish & Preview'} <Save size={20} />
              </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Builder;
