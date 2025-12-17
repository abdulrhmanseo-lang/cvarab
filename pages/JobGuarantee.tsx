
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Send, Briefcase, MessageCircle, CheckCircle2, ArrowLeft, Star, Zap, X, ChevronDown, Users, TrendingUp, Clock, AlertTriangle, Check, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const JobGuarantee: React.FC = () => {
  const whatsappLink = "https://wa.me/966540673935?text=أرغب%20في%20الاشتراك%20في%20باقة%20التوظيف%20المضمونة%20من%20Score%20CV";
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "كيف تضمنون استرداد المبلغ؟",
      a: "الأمر بسيط: يتم تفعيل عداد 30 يوماً في لوحة التحكم الخاصة بك. إذا انتهت المدة ولم تحصل على أي تفاعل (اتصال، إيميل، أو مقابلة)، سيظهر لك زر 'استرداد المبلغ' تلقائياً. نضغط عليه، ويعود المبلغ لحسابك البنكي."
    },
    {
      q: "هل الخدمة تشمل جميع التخصصات؟",
      a: "نعم، نحن نستهدف الشركات بناءً على مسماك الوظيفي وخبراتك، سواء كنت مهندساً، إدارياً، مبرمجاً، محاسباً، أو حديث التخرج. نحن نستهدف قطاع الشركات المتوسطة والكبرى."
    },
    {
      q: "كيف تصل سيرتي للشركات؟",
      a: "لدينا قاعدة بيانات ضخمة لمسؤولي التوظيف في السعودية. نستخدم تقنية Direct Inboxing لإرسال سيرتك وكأنها رسالة شخصية منك مباشرة لبريد المسؤول، مما يضمن نسبة فتح تتجاوز 80%."
    },
    {
      q: "هل أحتاج لتعديل سيرتي الذاتية؟",
      a: "لا تقلق! الاشتراك يشمل مراجعة وتعديل سيرتك الذاتية لتكون متوافقة تماماً مع الـ ATS قبل البدء في إرسالها للشركات."
    }
  ];

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans overflow-x-hidden selection:bg-amber-500 selection:text-black">
      
      {/* Background Ambient Effects */}
      <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[#1A1A1A] border border-amber-500/30 text-amber-400 px-5 py-2 rounded-full text-sm font-bold mb-8 shadow-[0_0_30px_rgba(245,158,11,0.15)] backdrop-blur-md"
            >
                <ShieldCheck size={18} className="fill-amber-500/10" />
                <span>الضمان الذهبي: وظيفة أو استرداد أموالك</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight tracking-tight"
            >
                لا تبحث عن وظيفة... <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-600 drop-shadow-2xl">دع الوظيفة تجدك</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed font-light"
            >
                نحن لا نساعدك في التقديم فحسب، بل نقوم بالمهمة نيابة عنك.
                <strong className="text-white font-bold block mt-2">نضمن لك 3 مقابلات عمل خلال 30 يوماً، أو تسترد الـ 199 ريال كاملة.</strong>
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
                <a href={whatsappLink} target="_blank" rel="noreferrer" className="w-full sm:w-auto group">
                    <button className="w-full px-10 py-5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-black text-xl rounded-2xl shadow-[0_0_50px_rgba(245,158,11,0.3)] transition-all flex items-center justify-center gap-3 hover:scale-105 active:scale-95 relative overflow-hidden">
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        <span className="relative z-10">اشترك بـ 199 ريال</span>
                        <ArrowLeft className="relative z-10 group-hover:-translate-x-1 transition-transform" size={24} />
                    </button>
                </a>
                <Link to="/dashboard/jobs-tracking" className="w-full sm:w-auto">
                    <button className="w-full px-10 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 backdrop-blur-md">
                        كيف يعمل الضمان؟
                    </button>
                </Link>
            </motion.div>

            {/* Live Stats */}
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.6 }}
               className="mt-16 flex flex-wrap justify-center gap-4 md:gap-12 opacity-80"
            >
               <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-xl border border-white/5">
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                   <span className="text-sm font-bold">140+ عرض وظيفي أرسل اليوم</span>
               </div>
               <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-xl border border-white/5">
                   <Users size={16} className="text-amber-500"/>
                   <span className="text-sm font-bold">2000+ مشترك نشط</span>
               </div>
            </motion.div>
        </div>
      </section>

      {/* Problem / Solution (The Hook) */}
      <section className="py-24 bg-gradient-to-b from-[#0A0A0A] to-[#050505] border-t border-white/5 relative">
        <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white mb-4">لماذا تفشل الطرق التقليدية؟</h2>
                <p className="text-gray-400 text-lg">الفرق بين معاناتك الحالية وبين ما نقدمه لك</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
                 {/* The Problem */}
                 <div className="bg-[#121212] rounded-3xl p-8 border border-white/5 hover:border-red-500/30 transition-colors group">
                     <h3 className="text-2xl font-bold text-gray-300 mb-8 flex items-center gap-3">
                        <span className="bg-red-500/10 p-2 rounded-lg"><X className="text-red-500" /></span>
                        الطريقة التقليدية
                     </h3>
                     <ul className="space-y-6">
                         <li className="flex gap-4 text-gray-400">
                             <X size={24} className="text-red-900 shrink-0 mt-1" />
                             <div>
                                <strong className="block text-gray-300 mb-1">التقديم اليدوي المرهق</strong>
                                تعبئة نفس البيانات مئات المرات في بوابات توظيف معقدة.
                             </div>
                         </li>
                         <li className="flex gap-4 text-gray-400">
                             <X size={24} className="text-red-900 shrink-0 mt-1" />
                             <div>
                                <strong className="block text-gray-300 mb-1">الرفض الآلي (ATS)</strong>
                                75% من السير الذاتية تُرفض قبل أن يراها أي بشر.
                             </div>
                         </li>
                         <li className="flex gap-4 text-gray-400">
                             <X size={24} className="text-red-900 shrink-0 mt-1" />
                             <div>
                                <strong className="block text-gray-300 mb-1">الانتظار المجهول</strong>
                                تمر الأسابيع دون أي رد، ولا تعرف هل وصل طلبك أم لا.
                             </div>
                         </li>
                     </ul>
                 </div>

                 {/* The Solution */}
                 <div className="bg-gradient-to-br from-amber-900/10 to-[#121212] rounded-3xl p-8 border border-amber-500/30 relative overflow-hidden transform md:scale-105 shadow-[0_0_50px_-10px_rgba(245,158,11,0.15)]">
                     <div className="absolute top-0 right-0 bg-amber-500 text-black text-xs font-bold px-4 py-1 rounded-bl-xl">VIP</div>
                     <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <span className="bg-amber-500/20 p-2 rounded-lg"><Check className="text-amber-500" /></span>
                        مع خدمة سكور
                     </h3>
                     <ul className="space-y-6">
                         <li className="flex gap-4 text-white">
                             <div className="bg-green-500/20 p-1 rounded-full h-fit mt-1"><Check size={16} className="text-green-500" /></div>
                             <div>
                                <strong className="block text-white mb-1">أتمتة كاملة</strong>
                                نحن نرسل سيرتك لأكثر من 100 شركة أسبوعياً نيابة عنك.
                             </div>
                         </li>
                         <li className="flex gap-4 text-white">
                             <div className="bg-green-500/20 p-1 rounded-full h-fit mt-1"><Check size={16} className="text-green-500" /></div>
                             <div>
                                <strong className="block text-white mb-1">وصول مباشر للمسؤول</strong>
                                رسالتك تصل لصندوق الوارد (Inbox) لمدير التوظيف مباشرة.
                             </div>
                         </li>
                         <li className="flex gap-4 text-white">
                             <div className="bg-green-500/20 p-1 rounded-full h-fit mt-1"><Check size={16} className="text-green-500" /></div>
                             <div>
                                <strong className="block text-white mb-1">ضمان استرجاع الأموال</strong>
                                لوحة تحكم تتبع كل طلب. لا مقابلات؟ استرجع فلوسك.
                             </div>
                         </li>
                     </ul>
                     <div className="mt-8 pt-8 border-t border-white/10 text-center">
                         <a href={whatsappLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-amber-500 font-bold hover:text-amber-400 transition-colors">
                             احصل على العرض الآن <ArrowLeft size={18}/>
                         </a>
                     </div>
                 </div>
            </div>
        </div>
      </section>

      {/* How it Works (Steps) */}
      <section className="py-24 container mx-auto px-4 relative">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent hidden lg:block"></div>
          
          <h2 className="text-4xl font-black text-center mb-20 relative z-10">رحلتك في 4 خطوات</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {[
                 { step: "01", title: "التحليل والتجهيز", desc: "نستلم سيرتك، يحللها خبراؤنا، ونعيد صياغتها لتصبح مغناطيساً للفرص.", icon: <Zap /> },
                 { step: "02", title: "الاستهداف الدقيق", desc: "نحدد الشركات التي تبحث عن تخصصك بالضبط في سوق العمل السعودي.", icon: <Target /> },
                 { step: "03", title: "النشر والتقديم", desc: "نباشر إرسال سيرتك لمدراء التوظيف مباشرة (Direct Inbox).", icon: <Send /> },
                 { step: "04", title: "المقابلات", desc: "تستقبل اتصالات للمقابلات، وتتابع النتائج عبر لوحة تحكمك.", icon: <Briefcase /> },
              ].map((item, idx) => (
                  <div key={idx} className="bg-[#151515] p-8 rounded-3xl border border-white/5 hover:border-amber-500/50 transition-all group hover:-translate-y-2">
                      <div className="text-4xl font-black text-white/5 mb-4 group-hover:text-amber-500/20 transition-colors">{item.step}</div>
                      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-amber-500 mb-6 group-hover:bg-amber-500 group-hover:text-black transition-all">
                          {item.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
              ))}
          </div>
      </section>

      {/* The Guarantee Seal */}
      <section className="py-20 bg-amber-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="flex-1 text-center md:text-right">
                  <div className="inline-flex items-center gap-2 bg-black/10 px-4 py-1 rounded-full text-black font-bold mb-4 border border-black/10">
                      <ShieldCheck size={18} /> سياسة حماية المشترك
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-black mb-6">ضمان استرجاع الأموال 100%</h2>
                  <p className="text-black/80 text-xl font-medium leading-relaxed max-w-2xl">
                      نحن واثقون من جودة خدمتنا لدرجة أننا نتحمل المخاطرة بالكامل. 
                      إذا لم تحصل على أي تفاعل وظيفي خلال 30 يوماً، سنعيد لك مبلغ 199 ريال فوراً.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
                      <div className="flex items-center gap-2 text-black font-bold text-sm"><CheckCircle2 size={18}/> عقد إلكتروني</div>
                      <div className="flex items-center gap-2 text-black font-bold text-sm"><CheckCircle2 size={18}/> استرجاع تلقائي</div>
                      <div className="flex items-center gap-2 text-black font-bold text-sm"><CheckCircle2 size={18}/> دون أسئلة</div>
                  </div>
              </div>
              <div className="shrink-0 relative">
                  <div className="w-64 h-64 border-8 border-black rounded-full flex items-center justify-center relative bg-white rotate-12 shadow-2xl">
                      <div className="text-center">
                          <div className="text-6xl font-black text-black leading-none">30</div>
                          <div className="text-xl font-bold text-black uppercase tracking-widest">يوم</div>
                          <div className="text-sm font-bold text-amber-600 mt-2">ضمان ذهبي</div>
                      </div>
                      <div className="absolute inset-0 border-4 border-dashed border-gray-300 rounded-full m-2 animate-spin-slow"></div>
                  </div>
              </div>
          </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 container mx-auto px-4">
          <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">انضم لمن سبقوك للقمة</h2>
              <div className="flex justify-center gap-1">
                  {[1,2,3,4,5].map(i => <Star key={i} size={20} className="fill-amber-500 text-amber-500" />)}
              </div>
              <p className="text-gray-400 mt-4">تقييم 4.9/5 من أكثر من 500 مشترك</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
               {[
                 { name: "خالد الحربي", role: "مهندس مشاريع", company: "Roshn", quote: "كنت متردد في البداية، لكن بعد أسبوعين من الاشتراك وصلتني 3 دعوات للمقابلة. الخدمة تستاهل كل ريال." },
                 { name: "سارة العمري", role: "HR Specialist", company: "STC", quote: "الفرق في صياغة الـ CV كان جذرياً. خدمة العملاء ممتازة وساعدوني في التحضير للمقابلة." },
                 { name: "فيصل القحطاني", role: "محاسب", company: "Riyad Bank", quote: "فعلاً التوظيف المضمون اسم على مسمى. استرجعت قيمة الاشتراك من أول راتب." }
               ].map((story, i) => (
                   <div key={i} className="bg-[#121212] p-8 rounded-3xl border border-white/5 relative">
                       <div className="absolute -top-4 -right-4 bg-amber-500 w-10 h-10 rounded-full flex items-center justify-center text-black font-black text-xl">“</div>
                       <p className="text-gray-300 mb-6 leading-relaxed text-lg">"{story.quote}"</p>
                       <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                           <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center font-bold text-xl text-white">
                               {story.name.charAt(0)}
                           </div>
                           <div>
                               <div className="font-bold text-white">{story.name}</div>
                               <div className="text-xs text-amber-500">{story.role} @ {story.company}</div>
                           </div>
                       </div>
                   </div>
               ))}
          </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-10 text-white">الأسئلة الشائعة</h2>
          <div className="space-y-4">
              {faqs.map((faq, i) => (
                  <div key={i} className="bg-black/40 rounded-2xl border border-white/5 overflow-hidden">
                      <button 
                        onClick={() => toggleFaq(i)}
                        className="w-full flex items-center justify-between p-6 text-right font-bold hover:bg-white/5 transition-colors text-lg"
                      >
                          <span className="text-white">{faq.q}</span>
                          <ChevronDown size={20} className={`text-amber-500 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                          {openFaq === i && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                  <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5 text-base">
                                      {faq.a}
                                  </div>
                              </motion.div>
                          )}
                      </AnimatePresence>
                  </div>
              ))}
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 w-full bg-[#1A1A1A]/90 backdrop-blur-lg border-t border-white/10 p-4 z-50 md:hidden">
          <a href={whatsappLink} target="_blank" rel="noreferrer">
              <button className="w-full py-3 bg-amber-500 text-black font-bold rounded-xl shadow-lg flex items-center justify-center gap-2">
                  <MessageCircle size={20} /> اشترك الآن (199 ريال)
              </button>
          </a>
      </div>

    </div>
  );
};

export default JobGuarantee;
