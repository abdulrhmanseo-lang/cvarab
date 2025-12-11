import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Target, Send, Briefcase, MessageCircle, Clock, CheckCircle2, ArrowLeft } from 'lucide-react';

const JobGuarantee: React.FC = () => {
  const whatsappLink = "https://wa.me/966540673935?text=أرغب%20في%20الاشتراك%20في%20باقة%20التوظيف%20المضمونة%20من%20Score%20CV";

  return (
    <div className="bg-dark min-h-screen text-white pb-20">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
             <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_20%,rgba(245,158,11,0.15),transparent_50%)]"></div>
             <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_80%,rgba(124,58,237,0.1),transparent_50%)]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-4 py-1.5 rounded-full text-sm font-bold mb-8 animate-fade-up">
                <ShieldCheck size={16} />
                <span>ضمان استرجاع الأموال 100%</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                وظيفتك القادمة.. <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">أو تسترجع فلوسك</span>
            </h1>
            
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                نحن لا نكتب سيرتك الذاتية فقط، بل نرسلها يومياً لمئات الشركات السعودية والخليجية نيابةً عنك.
                إذا لم تحصل على رد أو مقابلة خلال 30 يوماً، نعيد لك مبلغ الاشتراك بالكامل.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href={whatsappLink} target="_blank" rel="noreferrer">
                    <button className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-black text-lg rounded-xl shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all flex items-center gap-2 hover:scale-105 active:scale-95">
                        <MessageCircle size={20} />
                        اشترك الآن - 199 ريال
                    </button>
                </a>
                <Link to="/dashboard/jobs-tracking">
                    <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold transition-all flex items-center gap-2">
                        شاهد لوحة التحكم
                        <ArrowLeft size={18} />
                    </button>
                </Link>
            </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-card/30 border-y border-white/5">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">كيف نضمن لك الوظيفة؟</h2>
            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { icon: <Target className="text-amber-400" size={32} />, title: "1. تحسين شامل", desc: "نحلل سيرتك بالذكاء الاصطناعي ونعيد صياغتها لتناسب الوظائف المستهدفة." },
                    { icon: <Send className="text-amber-400" size={32} />, title: "2. نشر تلقائي", desc: "نظامنا يرسل سيرتك + خطاب تقديم (Cover Letter) لمئات مدراء التوظيف والشركات." },
                    { icon: <Clock className="text-amber-400" size={32} />, title: "3. متابعة وضمان", desc: "نتابع الردود معك. إذا مرت 30 يوم بدون أي تجاوب، تسترجع مبلغك فوراً." }
                ].map((item, i) => (
                    <div key={i} className="bg-white/5 p-8 rounded-3xl border border-white/5 hover:border-amber-500/30 transition-all text-center group">
                        <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                            {item.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                        <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Target Companies */}
      <section className="py-20 container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-10">نصلك بكبرى الشركات</h2>
          <div className="flex flex-wrap justify-center gap-4 opacity-70">
              {["أرامكو السعودية", "سابك", "نيوم", "STC", "الخطوط السعودية", "البنك الأهلي", "مصرف الراجحي", "شركات المقاولات", "القطاع الصحي", "الشركات التقنية"].map((c, i) => (
                  <span key={i} className="px-6 py-3 bg-white/5 rounded-xl border border-white/10 text-gray-300 font-medium">{c}</span>
              ))}
          </div>
      </section>

      {/* Guarantee Terms Box */}
      <section className="container mx-auto px-4 max-w-3xl">
          <div className="bg-gradient-to-br from-[#1a1500] to-[#2a2000] border border-amber-500/30 rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                  <ShieldCheck size={48} className="text-amber-500/20" />
              </div>
              <h3 className="text-2xl font-bold text-amber-400 mb-6 flex items-center gap-3">
                  <Briefcase />
                  شروط الضمان الذهبي
              </h3>
              <ul className="space-y-4 text-gray-300 mb-8">
                  <li className="flex gap-3"><CheckCircle2 className="text-amber-500 shrink-0" /> يشمل الضمان الحصول على (رد بالإيميل، اتصال هاتفي، أو دعوة لمقابلة).</li>
                  <li className="flex gap-3"><CheckCircle2 className="text-amber-500 shrink-0" /> يجب أن تكون السيرة الذاتية مكتملة البيانات بنسبة 100%.</li>
                  <li className="flex gap-3"><CheckCircle2 className="text-amber-500 shrink-0" /> يتم استرجاع المبلغ عبر التحويل البنكي خلال 5 أيام عمل من طلب الاسترداد.</li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                  <a href={whatsappLink} target="_blank" rel="noreferrer" className="flex-1">
                    <button className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl transition-all">
                        ابدأ التحدي الآن
                    </button>
                  </a>
              </div>
          </div>
      </section>
    </div>
  );
};

export default JobGuarantee;