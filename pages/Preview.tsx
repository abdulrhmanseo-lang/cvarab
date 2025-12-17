
import React, { useEffect, useState } from 'react';
import { CVData, ATSAnalysis, TemplateId, Language, TargetCompany } from '../types';
import { analyzeCV } from '../services/gemini';
import { Download, BarChart2, Edit2, AlertCircle, CheckCircle2, Star, X, ZoomIn, ZoomOut, Printer, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CVRenderer from '../components/CVRenderer';
import { generatePdf, templates } from '../utils/cvHelpers';
import { useToast } from '../components/Toast';

const Preview: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [cv, setCv] = useState<CVData | null>(null);
  const [analysis, setAnalysis] = useState<ATSAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [zoom, setZoom] = useState(0.8);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('cv_data');
    if (saved) {
      setCv(JSON.parse(saved));
    } else {
      navigate('/builder');
    }
  }, [navigate]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      // Calculate generic zoom for A4 (approx 794px width) fitting into screen
      if (width < 850) {
        setZoom((width - 40) / 794); // Fit width with padding
      } else if (width < 1200) {
        setZoom(0.7);
      } else {
        setZoom(0.85);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDownload = async () => {
    if (!cv) return;
    setIsDownloading(true);
    try {
        await generatePdf('cv-root', cv.fullName, cv.language);
        showToast('تم تحميل السيرة الذاتية بنجاح!', 'success');
    } catch (error) {
        console.error(error);
        showToast('حدث خطأ أثناء تحميل الملف.', 'error');
    } finally {
        setIsDownloading(false);
    }
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
    if (!cv) return;
    const template = templates.find(t => t.id === id);
    const targetLanguage = template?.lang === 'ar' ? Language.Arabic : Language.English;
    const updatedCV: CVData = { ...cv, templateId: id, language: targetLanguage };
    setCv(updatedCV);
    localStorage.setItem('cv_data', JSON.stringify(updatedCV));
  }

  if (!cv) return <div className="min-h-screen bg-dark flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="bg-dark min-h-screen flex flex-col font-sans">
      
      {/* --- Control Bar --- */}
      <div className="bg-card/90 backdrop-blur-md border-b border-white/5 sticky top-[70px] md:top-[80px] z-30 shadow-2xl no-print">
        <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col gap-4">
                
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                         <button onClick={() => navigate('/builder')} className="bg-white/10 p-2 rounded-full text-white hover:bg-white/20"><Edit2 size={18}/></button>
                         <div>
                             <h1 className="text-white font-bold text-sm md:text-base">{cv.fullName}</h1>
                             <p className="text-gray-500 text-xs">قالب: {templates.find(t=>t.id===cv.templateId)?.name}</p>
                         </div>
                    </div>
                    
                    <div className="hidden md:flex bg-white/5 rounded-lg border border-white/10 p-1">
                        <button onClick={() => setZoom(z => Math.max(0.4, z - 0.1))} className="p-2 hover:bg-white/10 text-white"><ZoomOut size={16}/></button>
                        <span className="px-2 text-xs text-gray-400 flex items-center">{Math.round(zoom * 100)}%</span>
                        <button onClick={() => setZoom(z => Math.min(1.5, z + 0.1))} className="p-2 hover:bg-white/10 text-white"><ZoomIn size={16}/></button>
                    </div>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                     {templates.map(t => (
                        <button 
                            key={t.id}
                            onClick={() => switchTemplate(t.id)}
                            className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap border transition-all ${cv.templateId === t.id ? 'bg-primary text-white border-primary' : 'bg-white/5 text-gray-400 border-white/10'}`}
                        >
                            {t.name}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button onClick={handleAnalysis} className="flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 rounded-xl font-bold hover:bg-indigo-600/30 text-sm">
                        <BarChart2 size={16} /> تحليل Score
                    </button>
                    <button onClick={handleDownload} disabled={isDownloading} className="flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg active:scale-95 text-sm">
                        {isDownloading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Printer size={16} />} تحميل PDF
                    </button>
                </div>
            </div>
        </div>
      </div>

      {/* --- Preview Canvas --- */}
      <div className="flex-1 bg-[#0f0f0f] relative overflow-auto flex justify-center pt-8 pb-32">
        <div 
            className="bg-white shadow-2xl transition-transform duration-200 origin-top"
            style={{ 
                width: '210mm', 
                minHeight: '297mm', // A4
                transform: `scale(${zoom})`,
                marginBottom: `-${(1 - zoom) * 297}mm` 
            }}
        >
           <CVRenderer data={cv} />
        </div>
      </div>

      {/* --- Analysis Modal --- */}
      {showScoreModal && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[60] flex items-end md:items-center justify-center p-0 md:p-4 no-print animate-fade-in">
             <div className="bg-[#1a1a1a] border-t md:border border-white/10 w-full md:max-w-2xl rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                <div className="p-6 bg-gradient-to-br from-primary/20 to-transparent flex justify-between items-center border-b border-white/5">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2"><BarChart2 className="text-primary-light"/> تحليل Score</h2>
                    <button onClick={() => setShowScoreModal(false)} className="bg-white/10 p-2 rounded-full text-white"><X size={18}/></button>
                </div>
                <div className="p-6 overflow-y-auto">
                  {isAnalyzing ? (
                    <div className="text-center py-10">
                      <Loader2 size={40} className="text-primary animate-spin mx-auto mb-4"/>
                      <p className="text-gray-400">جاري فحص السيرة الذاتية...</p>
                    </div>
                  ) : analysis ? (
                    <div className="space-y-6">
                      <div className="flex justify-center">
                          <div className={`w-32 h-32 rounded-full flex items-center justify-center text-5xl font-black border-8 ${analysis.score >= 80 ? 'border-green-500 text-green-500' : 'border-yellow-500 text-yellow-500'}`}>
                             {analysis.score}
                          </div>
                      </div>
                      <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                          <h3 className="font-bold text-white mb-2">التقرير</h3>
                          <p className="text-gray-300 text-sm leading-relaxed">{analysis.feedback}</p>
                      </div>
                      <button onClick={() => {setShowScoreModal(false); navigate('/builder');}} className="w-full py-3 bg-white text-dark rounded-xl font-bold">تحسين الآن</button>
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
