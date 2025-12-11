import React, { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Star, Menu, X, Instagram, Twitter, Linkedin, MessageCircle, Briefcase } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'قوالب السيرة', path: '/templates' },
    { name: 'خدمة التوظيف', path: '/job-guarantee', isNew: true },
    { name: 'الأسعار', path: '/#pricing' },
  ];

  const whatsappLink = "https://wa.me/966540673935";

  return (
    <div className="min-h-screen flex flex-col font-sans bg-dark text-secondary selection:bg-primary selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-dark/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary blur-lg opacity-40 group-hover:opacity-70 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-primary to-primary-dark text-white p-2.5 rounded-xl transform group-hover:rotate-6 transition-transform shadow-lg shadow-primary/20">
                <Star size={24} fill="currentColor" className="text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">سكور</span>
              <span className="text-[10px] text-primary-light font-bold uppercase tracking-[0.2em] -mt-1">Score CV</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-sm font-medium transition-all hover:-translate-y-0.5 flex items-center gap-2 ${
                  location.pathname === link.path 
                    ? 'text-primary' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.name}
                {link.isNew && <span className="text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/30 px-1.5 rounded-md">جديد</span>}
              </Link>
            ))}
          </nav>

          {/* CTA & Auth */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/dashboard/jobs-tracking" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              لوحة التحكم
            </Link>
            <Link to="/login" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              تسجيل الدخول
            </Link>
            <Link to="/builder">
               <button className="bg-gradient-to-r from-primary to-indigo-600 hover:from-primary-light hover:to-primary text-white px-6 py-2.5 rounded-full font-bold shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] transition-all active:scale-95 flex items-center gap-2 border border-white/10">
                 <span>ابدأ الآن</span>
                 <FileText size={18} />
               </button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-card border-b border-white/5 p-4 flex flex-col gap-4 animate-fade-in absolute w-full z-50 shadow-2xl">
             {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-300 font-medium py-3 px-4 hover:bg-white/5 rounded-xl transition-colors flex justify-between items-center"
              >
                {link.name}
                {link.isNew && <span className="text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full">جديد</span>}
              </Link>
            ))}
            <hr className="border-white/5 my-2" />
            <Link 
              to="/login" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-center text-gray-300 py-2 hover:text-white"
            >
              تسجيل الدخول
            </Link>
            <Link to="/builder" onClick={() => setIsMobileMenuOpen(false)}>
              <button className="w-full bg-primary text-white py-3 rounded-xl font-bold shadow-lg shadow-primary/30">
                أنشئ سيرتك الآن
              </button>
            </Link>
          </div>
        )}
      </header>

      {/* Content */}
      <main className="flex-grow relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-white/5 py-16 relative overflow-hidden">
        {/* Glow Element */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/20 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-8 grid md:grid-cols-4 gap-12 relative z-10">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
               <Star size={24} className="text-primary fill-primary" />
               <span className="text-2xl font-black text-white">سكور</span>
            </Link>
            <p className="max-w-md text-gray-500 leading-relaxed mb-8">
              المنصة العربية الأولى المتخصصة في إنشاء سير ذاتية متوافقة مع أنظمة ATS للشركات السعودية والخليجية الكبرى، مدعومة بأحدث تقنيات الذكاء الاصطناعي.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all hover:scale-110">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all hover:scale-110">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all hover:scale-110">
                <Instagram size={18} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">المنصة</h4>
            <ul className="space-y-4">
              <li><Link to="/builder" className="text-gray-500 hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full"></span> إنشاء CV</Link></li>
              <li><Link to="/templates" className="text-gray-500 hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full"></span> القوالب</Link></li>
              <li><Link to="/pricing" className="text-gray-500 hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full"></span> الأسعار</Link></li>
              <li><Link to="/job-guarantee" className="text-amber-500 hover:text-amber-400 transition-colors flex items-center gap-2"><Briefcase size={12} /> التوظيف المضمون</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">تواصل معنا</h4>
            <ul className="space-y-4">
              <li>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-green-500 transition-colors group">
                  <div className="p-2 bg-white/5 rounded-lg group-hover:bg-green-500/10 transition-colors">
                    <MessageCircle size={20} />
                  </div>
                  <span>واتساب: 966540673935+</span>
                </a>
              </li>
              <li><Link to="/privacy" className="text-gray-500 hover:text-white transition-colors">سياسة الخصوصية</Link></li>
              <li><Link to="/terms" className="text-gray-500 hover:text-white transition-colors">الشروط والأحكام</Link></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 md:px-8 mt-16 pt-8 border-t border-white/5 text-center flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <p>© 2025 سكور Score. جميع الحقوق محفوظة.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
             <span>صنع بحب في السعودية 🇸🇦</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;