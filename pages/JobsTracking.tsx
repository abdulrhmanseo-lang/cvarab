import React, { useState } from 'react';
import { Send, Eye, MessageSquare, Clock, AlertCircle, RefreshCw, Briefcase, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const JobsTracking: React.FC = () => {
  // Mock Data
  const [daysRemaining] = useState(23);
  const stats = {
    sent: 124,
    viewed: 18,
    responses: 0,
    interviews: 0
  };

  const applications = [
    { company: "مجموعة الشايع", role: "مدير مبيعات", date: "منذ ساعتين", status: "sent" },
    { company: "شركة السيف للمقاولات", role: "مهندس مشروع", date: "منذ 5 ساعات", status: "viewed" },
    { company: "نماء للكيماويات", role: "أخصائي سلامة", date: "أمس", status: "sent" },
    { company: "شركة المراعي", role: "مشرف لوجستي", date: "أمس", status: "sent" },
    { company: "Jarir Bookstore", role: "Store Manager", date: "منذ يومين", status: "viewed" },
  ];

  return (
    <div className="bg-dark min-h-screen pb-20">
      {/* Header */}
      <div className="bg-card border-b border-white/5 py-8">
        <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                <Link to="/" className="hover:text-primary">الرئيسية</Link>
                <ChevronRight size={14} />
                <span className="text-white">لوحة تحكم التوظيف</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1">مرحباً، محمد 👋</h1>
                    <p className="text-gray-400 text-sm">نحن نعمل على إيصال سيرتك لأفضل الشركات.</p>
                </div>
                <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-xl">
                    <Clock className="text-amber-500" size={20} />
                    <div>
                        <div className="text-xs text-amber-500/80 font-bold uppercase">الضمان الذهبي</div>
                        <div className="text-amber-400 font-bold text-sm">متبقي {daysRemaining} يوم</div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/5 border border-white/5 p-6 rounded-2xl">
                  <div className="flex items-center gap-3 mb-2 text-gray-400">
                      <Send size={18} />
                      <span className="text-sm">تم الإرسال</span>
                  </div>
                  <div className="text-3xl font-black text-white">{stats.sent}</div>
              </div>
              <div className="bg-white/5 border border-white/5 p-6 rounded-2xl">
                  <div className="flex items-center gap-3 mb-2 text-blue-400">
                      <Eye size={18} />
                      <span className="text-sm">تمت المشاهدة</span>
                  </div>
                  <div className="text-3xl font-black text-white">{stats.viewed}</div>
              </div>
              <div className="bg-white/5 border border-white/5 p-6 rounded-2xl">
                  <div className="flex items-center gap-3 mb-2 text-green-400">
                      <MessageSquare size={18} />
                      <span className="text-sm">ردود / مقابلات</span>
                  </div>
                  <div className="text-3xl font-black text-white">{stats.responses}</div>
              </div>
              <div className="bg-white/5 border border-white/5 p-6 rounded-2xl">
                  <div className="flex items-center gap-3 mb-2 text-purple-400">
                      <Briefcase size={18} />
                      <span className="text-sm">عروض عمل</span>
                  </div>
                  <div className="text-3xl font-black text-white">{stats.interviews}</div>
              </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
              {/* Recent Activity */}
              <div className="lg:col-span-2">
                  <div className="bg-card border border-white/5 rounded-3xl overflow-hidden">
                      <div className="p-6 border-b border-white/5 flex justify-between items-center">
                          <h3 className="font-bold text-white">سجل الإرسال الأخير</h3>
                          <button className="text-primary text-sm hover:underline">عرض الكل</button>
                      </div>
                      <div className="divide-y divide-white/5">
                          {applications.map((app, i) => (
                              <div key={i} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                                  <div className="flex items-center gap-4">
                                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 font-bold border border-white/10">
                                          {app.company.charAt(0)}
                                      </div>
                                      <div>
                                          <div className="text-white font-bold">{app.company}</div>
                                          <div className="text-xs text-gray-500">{app.role}</div>
                                      </div>
                                  </div>
                                  <div className="text-right">
                                      <div className={`text-xs font-bold px-2 py-1 rounded-md mb-1 inline-block ${app.status === 'viewed' ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'}`}>
                                          {app.status === 'viewed' ? 'تمت المشاهدة' : 'تم الإرسال'}
                                      </div>
                                      <div className="text-[10px] text-gray-600">{app.date}</div>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>

              {/* Sidebar / Guarantee Status */}
              <div>
                  <div className="bg-gradient-to-b from-[#1a1500] to-[#2a2000] border border-amber-500/20 rounded-3xl p-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                      
                      <h3 className="text-amber-400 font-bold mb-4 flex items-center gap-2 relative z-10">
                          <AlertCircle size={18} />
                          حالة الضمان
                      </h3>
                      
                      <div className="bg-black/30 rounded-xl p-4 mb-6 relative z-10">
                          <div className="flex justify-between text-sm text-gray-300 mb-2">
                              <span>المدة المنقضية</span>
                              <span>7 / 30 يوم</span>
                          </div>
                          <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                              <div className="bg-amber-500 h-full w-[23%]"></div>
                          </div>
                      </div>

                      <p className="text-xs text-gray-400 leading-relaxed mb-6 relative z-10">
                          إذا لم تحصل على أي رد أو دعوة للمقابلة بحلول <strong>2025/03/01</strong>، سيظهر لك زر استرجاع المبلغ أدناه تلقائياً.
                      </p>

                      <button 
                        disabled={true}
                        className="w-full py-3 bg-white/5 border border-white/10 text-gray-500 rounded-xl font-bold cursor-not-allowed flex items-center justify-center gap-2 relative z-10"
                      >
                          <RefreshCw size={16} />
                          طلب استرجاع المبلغ (غير متاح حالياً)
                      </button>
                      <div className="text-center mt-3 text-[10px] text-gray-600">
                          يتاح الزر فقط بعد انتهاء الـ 30 يوم
                      </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-card border border-white/5 rounded-3xl p-6 mt-6">
                      <h3 className="text-white font-bold mb-4">إجراءات سريعة</h3>
                      <div className="space-y-3">
                          <button className="w-full text-right p-3 rounded-xl hover:bg-white/5 text-gray-300 text-sm transition-colors flex justify-between items-center group">
                              <span>تحديث السيرة الذاتية</span>
                              <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                          <button className="w-full text-right p-3 rounded-xl hover:bg-white/5 text-gray-300 text-sm transition-colors flex justify-between items-center group">
                              <span>تغيير المسمى الوظيفي المستهدف</span>
                              <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                          <button className="w-full text-right p-3 rounded-xl hover:bg-white/5 text-gray-300 text-sm transition-colors flex justify-between items-center group">
                              <span>التواصل مع الدعم الفني</span>
                              <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default JobsTracking;