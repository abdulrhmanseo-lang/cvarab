
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2, ArrowLeft, Receipt, Copy, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Plan } from '../types';
import { motion } from 'framer-motion';

const PaymentCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { upgradePlan } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading');
  
  const paymentStatus = searchParams.get('status');
  const paymentId = searchParams.get('id');
  const planParam = searchParams.get('plan') as Plan;

  // Mock amount derived from plan for display
  const getAmount = (p: string) => {
    if (p === 'basic') return '29.00 SAR';
    if (p === 'pro') return '49.00 SAR';
    if (p === 'guaranteed') return '199.00 SAR';
    return '0.00 SAR';
  }

  useEffect(() => {
    const verifyPayment = async () => {
      // Simulate verification delay for better UX
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (paymentStatus === 'paid' && paymentId) {
        let amount = 0;
        if (planParam === 'basic') amount = 29;
        if (planParam === 'pro') amount = 49;
        if (planParam === 'guaranteed') amount = 199;

        upgradePlan(planParam || 'pro', paymentId, amount);
        setStatus('success');
      } else {
        setStatus('failed');
      }
    };

    verifyPayment();
  }, [paymentStatus, paymentId, planParam, upgradePlan]);

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
           <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse-slow"></div>
           <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] animate-pulse-slow delay-1000"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-card/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 max-w-lg w-full text-center shadow-2xl relative z-10"
      >
        
        {status === 'loading' && (
          <div className="py-8">
            <div className="relative w-24 h-24 mx-auto mb-8">
                <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <ShieldCheck className="absolute inset-0 m-auto text-primary/50 animate-pulse" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">جاري تأكيد الدفع...</h2>
            <p className="text-gray-400">يرجى الانتظار قليلاً، نقوم بتأمين حسابك وتفعيل الباقة.</p>
            
            <div className="mt-8 w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-primary to-purple-500"
                ></motion.div>
            </div>
          </div>
        )}

        {status === 'success' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
               <motion.div 
                 initial={{ scale: 0 }}
                 animate={{ scale: 1 }}
                 transition={{ type: "spring", stiffness: 200, damping: 10 }}
               >
                   <CheckCircle size={48} className="text-green-500" />
               </motion.div>
               <div className="absolute inset-0 border border-green-500/30 rounded-full animate-ping opacity-20"></div>
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-2">تم الدفع بنجاح!</h2>
            <p className="text-gray-400 mb-8">شكراً لك، تم تفعيل اشتراكك بنجاح.</p>
            
            {/* Receipt Card */}
            <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/5 text-right">
                <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
                    <Receipt size={14} /> تفاصيل العملية
                </div>
                
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">رقم العملية</span>
                        <div className="flex items-center gap-2 text-white font-mono text-sm bg-black/20 px-2 py-1 rounded">
                            {paymentId}
                            <Copy size={12} className="text-gray-500 cursor-pointer hover:text-white" />
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">الباقة</span>
                        <span className="text-primary font-bold">{planParam?.toUpperCase()} PLAN</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">المبلغ المدفوع</span>
                        <span className="text-white font-bold text-lg">{getAmount(planParam)}</span>
                    </div>
                </div>
            </div>
            
            <Link to="/dashboard">
              <button className="w-full py-4 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-light hover:to-primary text-white font-bold rounded-xl transition-all shadow-[0_0_30px_rgba(124,58,237,0.4)] flex items-center justify-center gap-2 active:scale-95 group">
                الانتقال للوحة التحكم
                <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
              </button>
            </Link>
          </motion.div>
        )}

        {status === 'failed' && (
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
          >
            <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
               <XCircle size={48} className="text-red-500" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">فشلت العملية</h2>
            <p className="text-gray-400 mb-8">نعتذر، لم نتمكن من معالجة الدفع. لم يتم خصم أي مبلغ من حسابك.</p>
            
            <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-4 mb-8 text-sm text-red-200">
                يرجى التحقق من رصيد البطاقة أو التأكد من تفعيل المدفوعات عبر الإنترنت.
            </div>

            <div className="flex flex-col gap-3">
               <Link to="/#pricing">
                <button className="w-full py-3.5 bg-white text-dark font-bold rounded-xl transition-all hover:bg-gray-200 flex items-center justify-center gap-2">
                    المحاولة مرة أخرى
                </button>
               </Link>
               <Link to="/">
                <button className="text-gray-500 hover:text-white text-sm transition-colors py-2">
                    إلغاء والعودة للرئيسية
                </button>
               </Link>
            </div>
          </motion.div>
        )}

      </motion.div>
    </div>
  );
};

export default PaymentCallback;
