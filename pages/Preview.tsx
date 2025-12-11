import React, { useEffect, useState, useRef } from 'react';
import { CVData, TargetCompany, ATSAnalysis, TemplateId } from '../types';
import { analyzeCV } from '../services/gemini';
import { Download, BarChart2, Edit2, AlertCircle, CheckCircle2, Star, X, ZoomIn, ZoomOut, Printer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CVRenderer from '../components/CVRenderer';

const Preview: React.FC = () => {
  const navigate = useNavigate();
  const [cv, setCv] = useState<CVData | null>(null);
  const [analysis, setAnalysis] = useState<ATSAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [zoom, setZoom] = useState(0.8);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('cv_data');
    if (saved) {
      setCv(JSON.parse(saved));
    } else {
      navigate('/builder');
    }
  }, [navigate]);

  const handleDownload = () => {
    window.print();
  };

  const handleAnalysis = async () => {
    if (!cv) return;
    setIsAnalyzing(true);
    setShowScoreModal(true);
    const result = await analyzeCV(cv);
    setAnalysis(result);
    setIsAnalyzing(false);
  };

  const switchTemplate = (id: TemplateId) => {
    if (cv) {
        const updated = { ...cv, templateId: id };
        setCv(updated);
        localStorage.setItem('cv_data', JSON.stringify(updated));
    }
  }

  if (!cv) return <div className="min-h-screen bg-dark flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="bg-dark min-h-screen py-8 overflow-x-hidden flex flex-col">
      {/* Top Bar Actions (No Print) */}
      <div className="container mx-auto px-4 mb-8 no-print">
        <div className="bg-card/50 backdrop-blur-md border border-white/5 rounded-2xl p-4 flex flex-col xl:flex-row justify-between items-center gap-4 shadow-xl">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Star size={20} fill="currentColor" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-white">معاينة السيرة الذاتية</h1>
                    <p className="text-gray-500 text-xs flex items-center gap-1">
                        تستهدف: <span className="text-primary font-bold">{cv.targetCompany}</span>
                    </p>
                </div>
            </div>

            {/* Template Quick Switcher */}
            <div className="flex gap-2 overflow-x-auto pb-2 xl:pb-0 max-w-[400px]">
                {[TemplateId.AR_ATS, TemplateId.AR_MODERN_PURPLE, TemplateId.EN_MINIMAL_ATS, TemplateId.EN_MODERN_PRO].map(t => (
                    <button 
                        key={t}
                        onClick={() => switchTemplate(t)}
                        className={`text-xs px-3 py-1.5 rounded-lg whitespace-nowrap border ${cv.templateId === t ? 'bg-primary text-white border-primary' : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/30'}`}
                    >
                        {t}
                    </button>
                ))}
            </div>
            
            <div className="flex gap-3 w-full xl:w-auto">
                <div className="flex bg-white/5 rounded-xl border border-white/10 p-1 mr-4">
                     <button onClick={() => setZoom(z => Math.max(0.4, z - 0.1))} className="p-2 hover:bg-white/10 rounded-lg text-white"><ZoomOut size={16}/></button>
                     <span className="flex items-center px-2 text-xs text-gray-400 font-mono">{Math.round(zoom * 100)}%</span>
                     <button onClick={() => setZoom(z => Math.min(1.5, z + 0.1))} className="p-2 hover:bg-white/10 rounded-lg text-white"><ZoomIn size={16}/></button>
                </div>

                <button 
                    onClick={() => navigate('/builder')} 
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-white/5 text-white rounded-xl font-bold border border-white/10 hover:bg-white/10 transition-colors"
                >
                    <Edit2 size={18} /> تعديل
                </button>
                <button 
                    onClick={handleAnalysis} 
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-bold hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all active:scale-95"
                >
                    <BarChart2 size={18} /> تحليل Score
                </button>
                <button 
                    onClick={handleDownload}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-dark rounded-xl font-bold hover:bg-gray-100 shadow-lg transition-colors"
                >
                    <Printer size={18} /> تحميل PDF
                </button>
            </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-[#1a1a1a] relative flex justify-center p-8">
        
        {/* CV Render Container */}
        <div 
            className="cv-container bg-white shadow-2xl transition-transform origin-top duration-300 ease-out print-only"
            style={{ 
                width: '210mm', 
                minHeight: '297mm', 
                transform: `scale(${zoom})`,
                marginBottom: `${zoom * 100}px` 
            }}
        >
           <CVRenderer data={cv} />
        </div>

      </div>

      {/* Score Analysis Modal (No Print) */}
      {showScoreModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 no-print">
             <div className="bg-[#1a1a1a] border border-white/10 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto animate-fade-in relative">
                <button onClick={() => setShowScoreModal(false)} className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors z-20">
                    <X size={24} />
                </button>

                <div className="p-8 bg-gradient-to-br from-primary/20 to-transparent flex justify-between items-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                            <BarChart2 className="text-primary-light" /> تحليل Score
                        </h2>
                        <p className="text-gray-400 text-sm mt-1">مدعوم بواسطة Gemini 2.5 AI</p>
                    </div>
                </div>
                
                <div className="p-8">
                  {isAnalyzing ? (
                    <div className="flex flex-col items-center py-16">
                      <div className="relative w-24 h-24">
                          <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
                          <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                      </div>
                      <p className="text-gray-400 font-medium mt-6 animate-pulse">جاري تحليل نقاط القوة والضعف...</p>
                    </div>
                  ) : analysis ? (
                    <div className="space-y-8 animate-fade-in">
                      {/* Score Circle */}
                      <div className="flex justify-center">
                          <div className="relative">
                            <div className={`w-40 h-40 rounded-full flex items-center justify-center border-[12px] text-6xl font-black shadow-[0_0_40px_rgba(0,0,0,0.5)] bg-dark relative z-10 ${
                            analysis.score >= 80 ? 'border-green-500 text-green-500 shadow-green-500/20' : analysis.score >= 50 ? 'border-yellow-500 text-yellow-500 shadow-yellow-500/20' : 'border-red-500 text-red-500 shadow-red-500/20'
                            }`}>
                            {analysis.score}
                            </div>
                            {/* Glow behind score */}
                            <div className={`absolute inset-0 rounded-full blur-xl opacity-40 ${analysis.score >= 80 ? 'bg-green-500' : analysis.score >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                          </div>
                      </div>

                      {/* Feedback Grid */}
                      <div className="grid gap-4">
                        <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                            <h3 className="font-bold text-primary-light mb-2 flex items-center gap-2"><CheckCircle2 size={18} /> التقرير العام</h3>
                            <p className="text-gray-300 text-sm leading-relaxed">{analysis.feedback}</p>
                        </div>

                        {cv.targetCompany !== TargetCompany.None && (
                            <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 p-6 rounded-2xl border border-primary/20">
                            <h3 className="font-bold text-indigo-300 mb-2 flex items-center gap-2"><Star size={18} /> الملاءمة لـ {cv.targetCompany}</h3>
                            <p className="text-gray-300 text-sm leading-relaxed">{analysis.companyFit}</p>
                            </div>
                        )}

                        <div>
                            <h3 className="font-bold text-red-400 mb-3 flex items-center gap-2"><AlertCircle size={18} /> كلمات مفتاحية مفقودة</h3>
                            <div className="flex flex-wrap gap-2">
                            {analysis.missingKeywords.map((k, i) => (
                                <span key={i} className="bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-1.5 rounded-full text-sm font-medium">
                                {k}
                                </span>
                            ))}
                            </div>
                        </div>
                      </div>
                      
                      <button onClick={() => setShowScoreModal(false)} className="w-full py-4 bg-white text-dark rounded-xl font-bold hover:bg-gray-200 transition-colors">
                        سأقوم بتحسين السيرة الآن
                      </button>
                    </div>
                  ) : null}
                </div>
             </div>
          </div>
        )}
    </div>
  );
};

export default Preview;