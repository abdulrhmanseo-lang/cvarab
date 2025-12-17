
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TargetCompany, CVData, TemplateId, Language } from '../types';
import { Save, ChevronLeft, ChevronRight, Wand2, Briefcase, GraduationCap, User, Layout, Loader2, Check, AlertCircle, Sparkles, Eye, Edit3, X } from 'lucide-react';
import { generateProfessionalSummary, generateExperienceBullets, generateCVFromFreeText, generateSkills } from '../services/gemini';
import { validateCV, templates } from '../utils/cvHelpers';
import { useToast } from '../components/Toast';
import CVRenderer from '../components/CVRenderer';

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
  projects: [],
  certifications: [],
  targetCompany: TargetCompany.None,
  templateId: TemplateId.AR_ATS,
  language: Language.Arabic,
  freeText: ""
};

const Builder: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [cv, setCv] = useState<CVData>(initialCV);
  const [activeTab, setActiveTab] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiLoadingState, setAiLoadingState] = useState<{show: boolean, stage: number}>({ show: false, stage: 0 });
  const [activeExpGen, setActiveExpGen] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState(false);

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
    if (errors[name]) {
        setErrors(prev => { const newErrors = {...prev}; delete newErrors[name]; return newErrors; });
    }
  };

  const handleAISummary = async () => {
    if (!cv.jobTitle) {
        showToast("يرجى إدخال المسمى الوظيفي أولاً لتوليد الملخص", 'error');
        setErrors(prev => ({...prev, jobTitle: "مطلوب"}));
        return;
    }
    setIsGenerating(true);
    const newSummary = await generateProfessionalSummary(cv.summary, cv.jobTitle, cv.targetCompany, cv.language);
    setCv(prev => ({ ...prev, summary: newSummary }));
    setIsGenerating(false);
    showToast("تم توليد الملخص بنجاح", 'success');
  };

  const handleAIExperience = async (id: string, title: string, company: string, currentDesc: string) => {
    if (!title) { showToast("الرجاء إدخال المسمى الوظيفي للخبرة", 'error'); return; }
    setActiveExpGen(id);
    const bullets = await generateExperienceBullets(title, company, currentDesc, cv.language);
    updateExperience(id, 'description', bullets);
    setActiveExpGen(null);
    showToast("تم تحسين وصف الخبرة", 'success');
  }

  const handleAISkills = async () => {
    if (!cv.jobTitle) { showToast("يرجى إدخال المسمى الوظيفي أولاً", 'error'); return; }
    setIsGenerating(true);
    const newSkills = await generateSkills(cv.jobTitle, cv.language);
    if (newSkills.length > 0) {
        setCv(prev => ({ ...prev, skills: [...new Set([...prev.skills, ...newSkills])] }));
        showToast("تم اقتراح المهارات بنجاح", 'success');
    }
    setIsGenerating(false);
  };

  const handleFreeTextGeneration = async () => {
     if (!cv.freeText || cv.freeText.length < 50) {
         showToast("الرجاء كتابة تفاصيل كافية (50 حرفاً على الأقل)", 'error');
         return;
     }
     setAiLoadingState({ show: true, stage: 0 });
     try {
         await new Promise(r => setTimeout(r, 1000));
         setAiLoadingState({ show: true, stage: 1 });
         const generatedCV = await generateCVFromFreeText(cv.freeText, cv.language);
         setAiLoadingState({ show: true, stage: 2 });
         await new Promise(r => setTimeout(r, 1000));
         setCv(prev => ({
             ...prev, ...generatedCV,
             templateId: prev.templateId, language: prev.language, freeText: prev.freeText
         }));
         setAiLoadingState({ show: true, stage: 4 });
         await new Promise(r => setTimeout(r, 500));
         setAiLoadingState({ show: false, stage: 0 });
         showToast("تم إنشاء سيرتك الذاتية بنجاح!", 'success');
         setActiveTab(1);
     } catch (error) {
         console.error(error);
         setAiLoadingState({ show: false, stage: 0 });
         showToast("حدث خطأ أثناء التوليد. حاول مرة أخرى.", 'error');
     }
  }

  const addExperience = () => {
    setCv(prev => ({ ...prev, experience: [...prev.experience, { id: Date.now().toString(), title: "", company: "", startDate: "", endDate: "", description: "" }] }));
  };

  const updateExperience = (id: string, field: string, value: string) => {
    setCv(prev => ({ ...prev, experience: prev.experience.map(e => e.id === id ? { ...e, [field]: value } : e) }));
  };

  const handleFinish = async () => {
    const validationErrors = validateCV(cv);
    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        showToast("يرجى تعبئة الحقول المطلوبة", 'error');
        return;
    }
    navigate('/preview');
  };

  const steps = [
    { title: "القالب", icon: <Layout size={18} /> },
    { title: "البيانات", icon: <User size={18} /> },
    { title: "الخبرات", icon: <Briefcase size={18} /> },
    { title: "التعليم", icon: <GraduationCap size={18} /> },
    { title: "الذكاء", icon: <Sparkles size={18} /> },
  ];

  const InputClass = "w-full p-4 bg-dark/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-white placeholder-gray-600 hover:border-white/20 text-base";
  const LabelClass = "block text-sm font-bold text-gray-400 mb-2";

  return (
    <div className="bg-dark min-h-screen flex flex-col md:flex-row overflow-hidden relative">
      {/* AI Loading Overlay */}
      {aiLoadingState.show && (
          <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center">
              <Wand2 size={64} className="text-primary mb-6 animate-bounce" />
              <h2 className="text-2xl font-bold text-white mb-2 animate-pulse">{["تحليل...", "كتابة...", "تنسيق...", "ATS...", "جاهز!"][aiLoadingState.stage]}</h2>
              <div className="w-64 h-1.5 bg-gray-800 rounded-full overflow-hidden mt-4">
                  <div className="h-full bg-primary transition-all duration-500" style={{ width: `${((aiLoadingState.stage + 1) / 5) * 100}%` }}></div>
              </div>
          </div>
      )}

      {/* --- LEFT: EDITOR PANEL --- */}
      <div className="w-full md:w-[55%] lg:w-[50%] h-screen flex flex-col border-l border-white/5 bg-[#0a0a0a] relative z-20">
        
        {/* Header */}
        <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-dark/80 backdrop-blur-sm sticky top-0 z-30">
            <button onClick={() => navigate('/')} className="text-gray-400 hover:text-white flex items-center gap-1 text-sm font-bold"><ChevronRight size={16}/> خروج</button>
            <h1 className="text-white font-bold hidden md:block">محرر السيرة الذاتية</h1>
            <button onClick={handleFinish} className="bg-primary text-white px-5 py-2 rounded-lg font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all flex items-center gap-2">
                <span>حفظ</span> <Save size={14} />
            </button>
        </div>

        {/* Steps Tab Bar */}
        <div className="px-2 py-2 border-b border-white/5 bg-[#050505]">
            <div className="flex justify-between items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                {steps.map((step, idx) => (
                    <button 
                        key={idx}
                        onClick={() => setActiveTab(idx)}
                        className={`flex-1 min-w-[70px] py-2 rounded-lg flex flex-col items-center gap-1 transition-all ${activeTab === idx ? 'bg-white/10 text-primary' : 'text-gray-500 hover:bg-white/5'}`}
                    >
                        <div className={`${activeTab === idx ? 'text-primary' : 'text-gray-500'}`}>{step.icon}</div>
                        <span className="text-[10px] font-bold">{step.title}</span>
                    </button>
                ))}
            </div>
        </div>

        {/* Scrollable Form Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 pb-32 md:pb-6">
            
            {/* Step 0: Templates */}
            {activeTab === 0 && (
                <div className="animate-fade-in space-y-6">
                     <div className="flex gap-4 p-1 bg-white/5 rounded-xl mb-6">
                        <button onClick={() => setCv(p => ({...p, language: Language.Arabic, templateId: TemplateId.AR_ATS}))} className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all ${cv.language === Language.Arabic ? 'bg-primary text-white shadow' : 'text-gray-400'}`}>العربية 🇸🇦</button>
                        <button onClick={() => setCv(p => ({...p, language: Language.English, templateId: TemplateId.EN_MINIMAL_ATS}))} className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all ${cv.language === Language.English ? 'bg-primary text-white shadow' : 'text-gray-400'}`}>English 🇺🇸</button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {templates.filter(t => t.lang === cv.language).map(t => (
                            <div key={t.id} onClick={() => setCv(p => ({...p, templateId: t.id}))} className={`cursor-pointer border-2 rounded-xl overflow-hidden relative transition-all ${cv.templateId === t.id ? 'border-primary ring-2 ring-primary/30' : 'border-white/10 hover:border-white/30'}`}>
                                <div className={`h-24 ${t.color} opacity-80`}></div>
                                <div className="p-3 bg-card">
                                    <div className="text-xs font-bold text-white">{t.name}</div>
                                    <div className="text-[10px] text-gray-500">{t.type}</div>
                                </div>
                                {cv.templateId === t.id && <div className="absolute top-2 right-2 bg-primary text-white p-1 rounded-full"><Check size={10} strokeWidth={4}/></div>}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Step 1: Info */}
            {activeTab === 1 && (
                <div className="animate-fade-in space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className={LabelClass}>الاسم الكامل</label><input name="fullName" value={cv.fullName} onChange={handleInputChange} className={InputClass} placeholder="الاسم" /></div>
                        <div><label className={LabelClass}>المسمى الوظيفي</label><input name="jobTitle" value={cv.jobTitle} onChange={handleInputChange} className={InputClass} placeholder="مثال: مدير مشاريع" /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className={LabelClass}>الإيميل</label><input name="email" value={cv.email} onChange={handleInputChange} className={InputClass} dir="ltr" /></div>
                        <div><label className={LabelClass}>الجوال</label><input name="phone" value={cv.phone} onChange={handleInputChange} className={InputClass} dir="ltr" /></div>
                    </div>
                    <div><label className={LabelClass}>العنوان (المدينة، الدولة)</label><input name="location" value={cv.location} onChange={handleInputChange} className={InputClass} /></div>
                    
                    <div className="pt-4 border-t border-white/5">
                        <div className="flex justify-between items-center mb-2">
                            <label className={LabelClass}>الملخص المهني</label>
                            <button onClick={handleAISummary} disabled={isGenerating} className="text-xs bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full flex items-center gap-1 hover:bg-purple-500/30 transition-colors">
                                {isGenerating ? <Loader2 size={12} className="animate-spin"/> : <Wand2 size={12}/>} كتابة ذكية
                            </button>
                        </div>
                        <textarea name="summary" value={cv.summary} onChange={handleInputChange} rows={4} className={InputClass} placeholder="نبذة مختصرة..." />
                    </div>
                </div>
            )}

            {/* Step 2: Experience */}
            {activeTab === 2 && (
                <div className="animate-fade-in space-y-6">
                    {cv.experience.map((exp, i) => (
                        <div key={exp.id} className="bg-white/5 p-5 rounded-xl border border-white/5 relative group">
                            <button onClick={() => setCv(p => ({...p, experience: p.experience.filter(e => e.id !== exp.id)}))} className="absolute top-3 left-3 text-red-400 hover:bg-red-500/10 p-1.5 rounded transition-colors"><X size={16}/></button>
                            <div className="grid grid-cols-2 gap-3 mb-3">
                                <input value={exp.title} onChange={e => updateExperience(exp.id, 'title', e.target.value)} className={InputClass} placeholder="المسمى" />
                                <input value={exp.company} onChange={e => updateExperience(exp.id, 'company', e.target.value)} className={InputClass} placeholder="الشركة" />
                            </div>
                            <div className="grid grid-cols-2 gap-3 mb-3">
                                <input value={exp.startDate} onChange={e => updateExperience(exp.id, 'startDate', e.target.value)} className={InputClass} placeholder="من" />
                                <input value={exp.endDate} onChange={e => updateExperience(exp.id, 'endDate', e.target.value)} className={InputClass} placeholder="إلى" />
                            </div>
                            <div className="relative">
                                <button onClick={() => handleAIExperience(exp.id, exp.title, exp.company, exp.description)} className="absolute top-2 left-2 text-xs text-primary flex items-center gap-1 bg-dark/50 px-2 py-1 rounded backdrop-blur-sm hover:bg-dark">
                                    <Wand2 size={10} /> تحسين
                                </button>
                                <textarea value={exp.description} onChange={e => updateExperience(exp.id, 'description', e.target.value)} className={`${InputClass} h-24 text-sm`} placeholder="الوصف الوظيفي..." />
                            </div>
                        </div>
                    ))}
                    <button onClick={addExperience} className="w-full py-4 border border-dashed border-gray-700 text-gray-400 rounded-xl hover:border-primary hover:text-primary transition-all font-bold text-sm">+ إضافة خبرة</button>
                </div>
            )}

            {/* Step 3: Education & Skills */}
            {activeTab === 3 && (
                <div className="animate-fade-in space-y-6">
                    <div className="bg-white/5 p-5 rounded-xl">
                        <div className="flex justify-between items-center mb-3">
                            <label className={LabelClass}>المهارات</label>
                            <button onClick={handleAISkills} disabled={isGenerating} className="text-xs text-primary hover:underline flex items-center gap-1"><Sparkles size={12}/> اقتراح مهارات</button>
                        </div>
                        <textarea value={cv.skills.join(", ")} onChange={e => setCv(p => ({...p, skills: e.target.value.split(",").map(s => s.trim())}))} className={`${InputClass} h-24`} placeholder="مهارة 1، مهارة 2..." />
                    </div>

                    <div>
                        <h3 className="text-white font-bold mb-3 flex items-center gap-2"><GraduationCap size={18}/> التعليم</h3>
                        {cv.education.map((edu, idx) => (
                            <div key={edu.id} className="bg-white/5 p-4 rounded-xl border border-white/5 mb-3 flex gap-2">
                                <div className="flex-1 grid gap-2">
                                    <input value={edu.degree} onChange={e => {const n=[...cv.education]; n[idx].degree=e.target.value; setCv(p=>({...p,education:n}))}} className={`${InputClass} py-2 text-sm`} placeholder="الدرجة" />
                                    <input value={edu.school} onChange={e => {const n=[...cv.education]; n[idx].school=e.target.value; setCv(p=>({...p,education:n}))}} className={`${InputClass} py-2 text-sm`} placeholder="الجامعة" />
                                </div>
                                <div className="w-20">
                                     <input value={edu.year} onChange={e => {const n=[...cv.education]; n[idx].year=e.target.value; setCv(p=>({...p,education:n}))}} className={`${InputClass} py-2 text-sm text-center`} placeholder="السنة" />
                                </div>
                                <button onClick={() => setCv(p => ({...p, education: p.education.filter(e => e.id !== edu.id)}))} className="text-red-400 hover:bg-white/5 p-2 rounded self-center"><X size={16}/></button>
                            </div>
                        ))}
                        <button onClick={() => setCv(p => ({...p, education: [...p.education, {id: Date.now().toString(), degree:"", school:"", year:""}]}))} className="text-primary text-sm font-bold hover:underline">+ إضافة تعليم</button>
                    </div>
                </div>
            )}

            {/* Step 4: AI Free Text */}
            {activeTab === 4 && (
                <div className="animate-fade-in text-center space-y-6">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto animate-pulse"><Sparkles size={32} className="text-primary"/></div>
                    <div>
                        <h2 className="text-xl font-bold text-white">البناء الذكي</h2>
                        <p className="text-sm text-gray-400">تحدث عن نفسك وسنقوم ببناء السيرة لك.</p>
                    </div>
                    <textarea value={cv.freeText || ""} onChange={e => setCv(p => ({...p, freeText: e.target.value}))} className={`${InputClass} h-48`} placeholder="أنا محمد، خريج هندسة حاسب، عملت في stc لمدة سنتين..." />
                    <button onClick={handleFreeTextGeneration} className="w-full py-4 bg-gradient-to-r from-primary to-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-primary/30 hover:scale-105 transition-transform">
                        <Wand2 className="inline mr-2" size={18} /> بناء السيرة
                    </button>
                </div>
            )}
        </div>
      </div>

      {/* --- RIGHT: LIVE PREVIEW (Desktop) --- */}
      <div className="hidden md:flex w-[45%] lg:w-[50%] h-screen bg-[#151515] items-center justify-center relative p-8">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1f1f1f_1px,transparent_1px)] bg-[length:20px_20px] opacity-20"></div>
         <div className="transform scale-[0.65] lg:scale-[0.75] origin-center shadow-[0_0_60px_rgba(0,0,0,0.5)]">
             <div className="w-[210mm] h-[297mm] bg-white overflow-hidden text-black pointer-events-none select-none">
                 <CVRenderer data={cv} />
             </div>
         </div>
      </div>

      {/* --- MOBILE PREVIEW MODAL --- */}
      {isMobilePreviewOpen && (
          <div className="fixed inset-0 z-50 bg-[#151515] flex flex-col md:hidden animate-fade-in">
              <div className="h-14 border-b border-white/10 flex items-center justify-between px-4 bg-dark">
                  <span className="text-white font-bold">معاينة حية</span>
                  <button onClick={() => setIsMobilePreviewOpen(false)} className="bg-white/10 p-2 rounded-full text-white"><X size={20}/></button>
              </div>
              <div className="flex-1 overflow-y-auto overflow-x-hidden flex justify-center bg-gray-900 p-4">
                   <div className="transform scale-[0.5] origin-top bg-white shadow-2xl min-h-[297mm]" style={{ width: '210mm' }}>
                       <CVRenderer data={cv} />
                   </div>
              </div>
          </div>
      )}

      {/* --- MOBILE FLOATING ACTION BUTTON --- */}
      <div className="md:hidden fixed bottom-6 left-6 z-40">
          <button 
            onClick={() => setIsMobilePreviewOpen(true)}
            className="w-14 h-14 bg-primary text-white rounded-full shadow-[0_4px_20px_rgba(124,58,237,0.5)] flex items-center justify-center animate-bounce"
          >
              <Eye size={24} />
          </button>
      </div>

    </div>
  );
};

export default Builder;
