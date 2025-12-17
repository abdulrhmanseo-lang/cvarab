
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FileText, Briefcase, Settings, LogOut, CreditCard, CheckCircle2, Clock } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('ar-SA');
  };

  return (
    <div className="min-h-screen bg-dark pt-24 pb-12">
       <div className="container mx-auto px-4">
           {/* Welcome & Subscription Card */}
           <div className="bg-gradient-to-r from-card to-white/5 border border-white/10 rounded-3xl p-8 mb-8 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-indigo-600"></div>
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                   <div>
                       <h1 className="text-3xl font-bold text-white mb-2">مرحباً، {user?.name}</h1>
                       <div className="flex flex-wrap items-center gap-3">
                           <span className="text-gray-400">حالة الاشتراك:</span>
                           {user?.subscriptionActive ? (
                               <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-bold uppercase border border-green-500/20 flex items-center gap-1">
                                   <CheckCircle2 size={14} /> نشط - {user.plan}
                               </span>
                           ) : (
                               <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm font-bold uppercase">
                                   مجاني
                               </span>
                           )}
                           {user?.subscriptionEnds && (
                               <span className="text-xs text-gray-500 flex items-center gap-1">
                                   <Clock size={12} /> ينتهي في {formatDate(user.subscriptionEnds)}
                               </span>
                           )}
                       </div>
                   </div>
                   <button onClick={logout} className="flex items-center gap-2 text-red-400 hover:bg-red-500/10 px-4 py-2 rounded-lg transition-colors border border-transparent hover:border-red-500/20">
                       <LogOut size={18} />
                       تسجيل الخروج
                   </button>
               </div>
           </div>

           <div className="grid lg:grid-cols-3 gap-8">
               {/* Main Actions */}
               <div className="lg:col-span-2 grid md:grid-cols-2 gap-6 h-fit">
                    <Link to="/builder" className="bg-white/5 border border-white/5 p-6 rounded-2xl hover:bg-white/10 transition-all group">
                        <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                            <FileText size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">سيرتي الذاتية</h3>
                        <p className="text-gray-400 text-sm">تعديل وتحديث السيرة الذاتية الخاصة بك.</p>
                    </Link>

                    <Link to="/dashboard/jobs-tracking" className="bg-white/5 border border-white/5 p-6 rounded-2xl hover:bg-white/10 transition-all group relative overflow-hidden">
                        {user?.plan !== 'guaranteed' && (
                            <div className="absolute top-3 left-3 bg-amber-500 text-black text-xs font-bold px-2 py-0.5 rounded">PRO</div>
                        )}
                        <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center text-amber-500 mb-4 group-hover:scale-110 transition-transform">
                            <Briefcase size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">تتبع التوظيف</h3>
                        <p className="text-gray-400 text-sm">متابعة حالة الإرسال للشركات والردود.</p>
                    </Link>

                    <div className="bg-white/5 border border-white/5 p-6 rounded-2xl hover:bg-white/10 transition-all group cursor-pointer">
                        <div className="w-12 h-12 bg-gray-700/50 rounded-xl flex items-center justify-center text-gray-300 mb-4 group-hover:scale-110 transition-transform">
                            <Settings size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">إعدادات الحساب</h3>
                        <p className="text-gray-400 text-sm">تغيير كلمة المرور والبيانات الشخصية.</p>
                    </div>
               </div>

               {/* Billing History */}
               <div className="bg-card border border-white/10 rounded-3xl p-6 h-fit">
                   <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                       <CreditCard size={20} className="text-primary"/>
                       سجل الفواتير
                   </h3>
                   
                   {!user?.billingHistory || user.billingHistory.length === 0 ? (
                       <div className="text-center py-8 text-gray-500 text-sm">
                           لا توجد عمليات دفع سابقة
                       </div>
                   ) : (
                       <div className="space-y-4">
                           {user.billingHistory.map((bill) => (
                               <div key={bill.id} className="bg-white/5 p-4 rounded-xl flex justify-between items-center">
                                   <div>
                                       <div className="text-white font-bold text-sm uppercase">{bill.plan}</div>
                                       <div className="text-xs text-gray-500">{formatDate(bill.date)}</div>
                                   </div>
                                   <div className="text-right">
                                       <div className="text-primary font-bold">{bill.amount} ريال</div>
                                       <div className="text-[10px] text-green-400 bg-green-400/10 px-2 py-0.5 rounded inline-block mt-1">مدفوع</div>
                                   </div>
                               </div>
                           ))}
                       </div>
                   )}
                   
                   {!user?.subscriptionActive && (
                       <Link to="/#pricing" className="block mt-6 w-full py-3 bg-white/5 border border-white/10 hover:bg-primary hover:text-white hover:border-primary text-gray-300 rounded-xl text-center text-sm font-bold transition-all">
                           ترقية الباقة الآن
                       </Link>
                   )}
               </div>
           </div>
       </div>
    </div>
  );
};

export default Dashboard;
