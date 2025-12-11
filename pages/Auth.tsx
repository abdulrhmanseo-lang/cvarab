import React, { useState } from 'react';
import { Star, Mail, Lock, User, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
           <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse-slow"></div>
           <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] animate-pulse-slow delay-1000"></div>
        </div>

        <div className="bg-card/50 backdrop-blur-xl border border-white/10 w-full max-w-md p-8 rounded-3xl shadow-2xl relative z-10 animate-fade-up">
            <div className="text-center mb-8">
                <Link to="/" className="inline-flex items-center gap-2 justify-center mb-4 group">
                    <div className="bg-primary text-white p-2 rounded-lg group-hover:rotate-12 transition-transform">
                         <Star size={24} fill="currentColor" />
                    </div>
                    <span className="text-2xl font-black text-white">سكور</span>
                </Link>
                <h2 className="text-xl font-bold text-white mb-2">{isLogin ? 'مرحباً بعودتك' : 'إنشاء حساب جديد'}</h2>
                <p className="text-gray-500 text-sm">ابدأ رحلة نجاحك المهني اليوم</p>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                {!isLogin && (
                    <div className="relative">
                        <User className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input type="text" placeholder="الاسم الكامل" className="w-full bg-dark border border-white/10 rounded-xl py-3 pr-12 pl-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                    </div>
                )}
                <div className="relative">
                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input type="email" placeholder="البريد الإلكتروني" className="w-full bg-dark border border-white/10 rounded-xl py-3 pr-12 pl-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                </div>
                <div className="relative">
                    <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input type="password" placeholder="كلمة المرور" className="w-full bg-dark border border-white/10 rounded-xl py-3 pr-12 pl-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                </div>

                <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all active:scale-95 mt-4 flex items-center justify-center gap-2">
                    {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب'}
                    <ArrowLeft size={18} />
                </button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-gray-500 text-sm">
                    {isLogin ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}{' '}
                    <button onClick={() => setIsLogin(!isLogin)} className="text-primary font-bold hover:underline">
                        {isLogin ? 'سجل الآن' : 'سجل الدخول'}
                    </button>
                </p>
            </div>
        </div>
    </div>
  );
};

export default Auth;