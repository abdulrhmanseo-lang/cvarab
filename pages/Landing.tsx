
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Zap, ShieldCheck, TrendingUp, Star, Building2, Layout, ArrowLeft, MessageCircle, Crown, Briefcase, Shield, Loader2, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { initiatePayment } from '../services/payment';
import { Plan } from '../types';

const companies = [
  { name: "أرامكو", color: "text-blue-500" },
  { name: "سابك", color: "text-blue-400" },
  { name: "الراجحي", color: "text-indigo-500" },
  { name: "STC", color: "text-purple-500" },
  { name: "نيوم", color: "text-yellow-500" },
  { name: "السعودية", color: "text-sky-600" },
];

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleSubscribe = async (plan: Plan) => {
    if (!user) { navigate('/login'); return; }
    setLoadingPlan(plan);
    try { await initiatePayment(plan, user.id); } 
    catch (error) { console.error(error); setLoadingPlan(null); }
  };

  const handleQuickAIBuild = () => {
      // Navigate to builder with a specific state to auto-open AI tab
      navigate('/builder');
      // Ideally pass state { tab: 4 } if router supports it or handle in builder init
      setTimeout(() => {
          // Quick hack to force AI tab if builder uses local state defaults
          // In a real app, use query params ?tab=ai
      }, 100);
  }

  return (
    <div className="bg-dark text-white overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 lg:pt-40 lg:pb-48 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
           <div className="absolute top-[10%] left-[20%] w-72 h-72 bg-primary/30 rounded-full blur-[120px] animate-pulse-slow"></div>
           <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse-slow delay-700"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-sm text-primary-light px-4 py-1.5 rounded-full text-sm font-bold mb-8 animate-fade-up shadow-[0_0_15px_rgba(124,58,237,0.2)]">
            <Star size={14} className="fill-current animate-spin-slow" />
            <span>المنصة الأولى المتوافقة مع ATS للشركات السعودية</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-8 max-w-5xl mx-auto animate-fade-up [animation-delay:200ms]">
            ابنِ سيرتك الذاتية الاحترافية <br/>
            <span className="text-gradient drop-shadow-2xl">خلال دقائق مع سكور</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-up [animation-delay:400ms]">
            المنصة العربية الأذكى لإنشاء سيرة ذاتية مقبولة في أرامكو، سابك، نيوم. 
            احصل على تحليل Score فوري واضمن وظيفتك القادمة.
          </p>
          
          {/* Quick Actions Grid */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up [animation-delay:600ms] mb-12">
            <Link to="/builder" className="w-full sm:w-auto">
              <button className="group w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-primary to-indigo-600 hover:from-primary-light hover:to-primary text-white text-lg font-bold rounded-2xl shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all active:scale-95 flex items-center justify-center gap-2 border border-white/20">
                ابدأ الآن مجاناً
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              </button>
            </Link>
            
            <button onClick={handleQuickAIBuild} className="w-full sm:w-auto px-8 py-4 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-2xl font-bold transition-all backdrop-blur-md flex items-center justify-center gap-2 group">
                 <Sparkles size={20} className="group-hover:animate-spin" />
                 صمم لي بالذكاء
            </button>
          </div>
          
           <Link to="/job-guarantee" className="inline-block animate-fade-up [animation-delay:700ms]">
              <span className="text-amber-400 hover:text-amber-300 underline decoration-dotted text-sm font-medium flex items-center gap-1">
                 <Crown size={14} /> مهتم بخدمة التوظيف المضمون؟
              </span>
            </Link>

          {/* Floating CV Preview Mockup */}
          <div className="mt-20 relative max-w-4xl mx-auto animate-fade-up [animation-delay:800ms] hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent z-10"></div>
            <div className="bg-card/50 p-2 rounded-t-3xl border-t border-x border-white/10 shadow-2xl backdrop-blur-sm">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="grid grid-cols-3 gap-4 px-8 pb-12 opacity-80">
                    <div className="col-span-1 space-y-3">
                        <div className="h-32 bg-white/5 rounded-xl"></div>
                        <div className="h-20 bg-white/5 rounded-xl"></div>
                    </div>
                    <div className="col-span-2 space-y-3">
                         <div className="h-10 bg-white/5 rounded-xl w-3/4"></div>
                         <div className="h-4 bg-white/5 rounded-lg w-1/2"></div>
                         <div className="h-64 bg-white/5 rounded-xl mt-4"></div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-card/30 relative border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">لماذا يختار المحترفون سكور؟</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-transparent mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <ShieldCheck size={32} />, title: "متوافقة مع ATS", desc: "تصاميم مبرمجة لتعبر أنظمة الفرز بذكاء." },
              { icon: <Zap size={32} />, title: "مدعوم بالذكاء", desc: "كتابة المحتوى وتلخيص الخبرات بضغطة زر." },
              { icon: <Building2 size={32} />, title: "شركات كبرى", desc: "قوالب مخصصة لأرامكو، سابك، ونيوم." },
              { icon: <TrendingUp size={32} />, title: "تحليل Score", desc: "اعرف نسبة قوة سيرتك ونقاط الضعف فوراً." },
            ].map((f, i) => (
              <div key={i} className="group p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-primary/50 hover:bg-white/10 transition-all hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(124,58,237,0.2)] cursor-default">
                <div className="text-white mb-6 bg-gradient-to-br from-primary to-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                <p className="text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="py-24 bg-dark relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
             جاهز للعمل في <span className="text-primary">الشركات الكبرى؟</span>
          </h2>
          <p className="text-gray-400 mb-16 max-w-2xl mx-auto text-lg">
            خوارزمياتنا تضبط الكلمات المفتاحية تلقائياً لتناسب معايير التوظيف في:
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {companies.map((c, idx) => (
              <div key={idx} className="group relative bg-white/5 backdrop-blur-md border border-white/10 hover:border-primary px-8 py-6 rounded-2xl transition-all cursor-pointer hover:-translate-y-1 hover:shadow-[0_0_30px_-5px_rgba(124,58,237,0.3)] min-w-[160px]">
                <h3 className={`font-bold text-xl group-hover:text-white transition-colors ${c.color}`}>{c.name}</h3>
              </div>
            ))}
          </div>
          
          <div className="mt-20 bg-gradient-to-r from-indigo-900 to-primary/40 rounded-[2.5rem] p-10 md:p-16 text-white relative overflow-hidden border border-white/10">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="text-center lg:text-right max-w-xl">
                <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-snug">هل تستهدف وظيفة الأحلام؟</h3>
                <p className="text-indigo-200 text-lg">دع الذكاء الاصطناعي يكتب لك ملخصاً احترافياً يتوافق مع رؤية الشركة التي تختارها.</p>
              </div>
              <Link to="/builder" className="shrink-0">
                <button className="bg-white text-primary px-10 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-xl text-lg hover:scale-105 active:scale-95">
                  جرب الذكاء الاصطناعي
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 bg-card/30 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 animate-fade-up">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">خطط الأسعار</h2>
            <p className="text-gray-400 text-lg">استثمار بسيط لمستقبل مهني عظيم</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* Free */}
            <div className="glass-card p-8 rounded-3xl relative group hover:bg-white/5 transition-colors flex flex-col">
              <h3 className="text-xl font-bold text-gray-400 mb-2">الباقة المجانية</h3>
              <div className="text-4xl font-black text-white mb-6 tracking-tight">0 <span className="text-lg text-gray-500 font-normal">ريال</span></div>
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-center gap-3 text-gray-300 text-sm"><CheckCircle size={16} className="text-green-500 shrink-0" /> سيرة ذاتية واحدة</li>
                <li className="flex items-center gap-3 text-gray-300 text-sm"><CheckCircle size={16} className="text-green-500 shrink-0" /> قالب بسيط</li>
                <li className="flex items-center gap-3 text-gray-600 line-through text-sm"><CheckCircle size={16} /> تحميل PDF</li>
              </ul>
              <Link to="/builder">
                 <button className="w-full py-3 rounded-xl border border-white/20 font-bold text-white hover:bg-white hover:text-dark transition-all">جرّب الآن</button>
              </Link>
            </div>

            {/* Basic */}
            <div className="glass-card p-8 rounded-3xl relative group hover:border-primary/50 transition-colors flex flex-col">
              <h3 className="text-xl font-bold text-primary-light mb-2">الباقة الأساسية</h3>
              <div className="text-4xl font-black text-white mb-6 tracking-tight">29 <span className="text-lg text-gray-500 font-normal">/ شهر</span></div>
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-center gap-3 text-gray-300 text-sm"><CheckCircle size={16} className="text-primary shrink-0" /> 5 سير ذاتية</li>
                <li className="flex items-center gap-3 text-gray-300 text-sm"><CheckCircle size={16} className="text-primary shrink-0" /> تحميل PDF عالي الجودة</li>
                <li className="flex items-center gap-3 text-gray-300 text-sm"><CheckCircle size={16} className="text-primary shrink-0" /> فحص Score أساسي</li>
              </ul>
              
              <button 
                onClick={() => handleSubscribe('basic')}
                disabled={loadingPlan === 'basic'}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all flex items-center justify-center gap-2"
              >
                {loadingPlan === 'basic' ? <Loader2 className="animate-spin" size={18}/> : <MessageCircle size={18} />}
                اشترك الآن
              </button>
            </div>

            {/* Pro */}
            <div className="relative p-[1px] rounded-3xl bg-gradient-to-b from-primary to-indigo-600 shadow-[0_0_30px_-10px_rgba(124,58,237,0.4)] flex flex-col">
              <div className="bg-dark rounded-[23px] p-8 h-full relative overflow-hidden flex flex-col">
                 <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl">الأفضل قيمة</div>
                 
                 <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                    الاحترافية <Star size={16} className="fill-yellow-400 text-yellow-400" />
                 </h3>
                 <div className="text-4xl font-black text-white mb-6 tracking-tight">49 <span className="text-lg text-gray-400 font-normal">/ شهر</span></div>
                 
                 <ul className="space-y-4 mb-10 flex-grow">
                    <li className="flex items-center gap-3 text-white font-medium text-sm"><CheckCircle size={16} className="text-primary-light shrink-0" /> عدد غير محدود</li>
                    <li className="flex items-center gap-3 text-white font-medium text-sm"><CheckCircle size={16} className="text-primary-light shrink-0" /> جميع القوالب والشركات</li>
                    <li className="flex items-center gap-3 text-white font-medium text-sm"><CheckCircle size={16} className="text-primary-light shrink-0" /> فحص Score ذكي ومفصل</li>
                    <li className="flex items-center gap-3 text-white font-medium text-sm"><CheckCircle size={16} className="text-primary-light shrink-0" /> توليد رسالة تغطية (Cover)</li>
                 </ul>
                 
                 <button 
                    onClick={() => handleSubscribe('pro')}
                    disabled={loadingPlan === 'pro'}
                    className="w-full py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold transition-all shadow-lg shadow-primary/40 flex items-center justify-center gap-2"
                 >
                    {loadingPlan === 'pro' ? <Loader2 className="animate-spin" size={18}/> : <MessageCircle size={18} />}
                    اشترك الآن
                 </button>
              </div>
            </div>

            {/* Premium Job Guarantee Package */}
            <div className="relative p-[1px] rounded-3xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 shadow-[0_0_50px_-5px_rgba(245,158,11,0.5)] transform lg:-translate-y-4 flex flex-col z-10">
              <div className="bg-[#120f0a] rounded-[23px] p-8 h-full relative overflow-hidden flex flex-col border border-amber-500/20">
                 {/* Shine Effect */}
                 <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-pulse"></div>
                 <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-amber-600 text-black text-xs font-black px-4 py-1.5 rounded-bl-xl flex items-center gap-1 shadow-lg">
                    <Shield size={12} strokeWidth={3} />
                    ضمان 30 يوم
                 </div>
                 
                 <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 mb-2 flex items-center gap-2">
                    التوظيف المضمون
                 </h3>
                 <div className="text-4xl font-black text-white mb-6 tracking-tight">199 <span className="text-lg text-gray-400 font-normal">/ 30 يوم</span></div>
                 
                 <p className="text-xs text-amber-200/80 mb-6 bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
                    إذا لم تحصل على رد أو مقابلة خلال 30 يوم — تسترجع كامل المبلغ.
                 </p>

                 <ul className="space-y-4 mb-10 flex-grow">
                    <li className="flex items-center gap-3 text-white font-bold text-sm"><Crown size={16} className="text-amber-400 shrink-0" /> إرسال لـ 100+ شركة يومياً</li>
                    <li className="flex items-center gap-3 text-white font-medium text-sm"><CheckCircle size={16} className="text-amber-500/80 shrink-0" /> إنشاء CV مخصص للتوظيف</li>
                    <li className="flex items-center gap-3 text-white font-medium text-sm"><CheckCircle size={16} className="text-amber-500/80 shrink-0" /> صياغة Cover Letter تلقائياً</li>
                    <li className="flex items-center gap-3 text-white font-medium text-sm"><CheckCircle size={16} className="text-amber-500/80 shrink-0" /> لوحة تحكم لمتابعة الردود</li>
                    <li className="flex items-center gap-3 text-white font-medium text-sm"><CheckCircle size={16} className="text-amber-500/80 shrink-0" /> ضمان استرداد الأموال 100%</li>
                 </ul>
                 
                 <button 
                    onClick={() => handleSubscribe('guaranteed')}
                    disabled={loadingPlan === 'guaranteed'}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-black transition-all shadow-lg shadow-amber-500/40 flex items-center justify-center gap-2 active:scale-95"
                 >
                    {loadingPlan === 'guaranteed' ? <Loader2 className="animate-spin" size={18}/> : <MessageCircle size={18} />}
                    اشترك في الضمان
                 </button>
                 <div className="text-center mt-3">
                    <Link to="/job-guarantee" className="text-xs text-amber-500/80 hover:text-amber-400 underline decoration-dotted">تفاصيل أكثر عن الباقة</Link>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
