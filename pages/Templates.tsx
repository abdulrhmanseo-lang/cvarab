
import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, CheckCircle } from 'lucide-react';

const Templates: React.FC = () => {
  return (
    <div className="bg-dark min-h-screen py-20 text-white">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-up">
                <h1 className="text-4xl font-black mb-4">قوالب احترافية للشركات الكبرى</h1>
                <p className="text-gray-400 text-lg">صممت خصيصاً لتتوافق مع أنظمة الـ ATS في الخليج والسعودية</p>
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 max-w-6xl mx-auto space-y-8">
                {/* Template 1 */}
                <div className="group relative break-inside-avoid">
                    <div className="absolute inset-0 bg-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative bg-card border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all hover:-translate-y-2">
                        <div className="h-64 bg-gray-800 relative group-hover:scale-105 transition-transform duration-700">
                             {/* Mockup */}
                             <div className="absolute inset-4 bg-white rounded shadow-lg opacity-90">
                                 <div className="h-4 bg-gray-200 w-1/3 m-4 rounded"></div>
                                 <div className="h-2 bg-gray-100 w-full m-4 rounded"></div>
                                 <div className="h-2 bg-gray-100 w-full m-4 rounded"></div>
                             </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">القالب الكلاسيكي</h3>
                            <p className="text-gray-500 text-sm mb-4">مناسب لـ: أرامكو، سابك، الوزارات</p>
                            <Link to="/builder">
                                <button className="w-full py-3 bg-white/5 hover:bg-primary hover:text-white border border-white/10 rounded-xl font-bold transition-all">استخدم القالب</button>
                            </Link>
                        </div>
                    </div>
                </div>

                 {/* Template 2 */}
                 <div className="group relative break-inside-avoid">
                    <div className="absolute inset-0 bg-indigo-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative bg-card border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all hover:-translate-y-2">
                        <div className="absolute top-4 left-4 z-10 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full">الأكثر استخداماً</div>
                        <div className="h-64 bg-gray-800 relative group-hover:scale-105 transition-transform duration-700">
                             {/* Mockup */}
                             <div className="absolute inset-4 bg-white rounded shadow-lg opacity-90 grid grid-cols-3 gap-2 p-2">
                                 <div className="col-span-1 bg-gray-100 rounded"></div>
                                 <div className="col-span-2 space-y-2">
                                     <div className="h-4 bg-gray-200 w-1/2 rounded"></div>
                                     <div className="h-20 bg-gray-50 rounded"></div>
                                 </div>
                             </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">القالب الحديث</h3>
                            <p className="text-gray-500 text-sm mb-4">مناسب لـ: نيوم، مسك، الشركات التقنية</p>
                            <Link to="/builder">
                                <button className="w-full py-3 bg-white/5 hover:bg-indigo-600 hover:text-white border border-white/10 rounded-xl font-bold transition-all">استخدم القالب</button>
                            </Link>
                        </div>
                    </div>
                </div>

                 {/* Template 3 */}
                 <div className="group relative break-inside-avoid">
                    <div className="absolute inset-0 bg-blue-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative bg-card border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all hover:-translate-y-2">
                        <div className="h-64 bg-gray-800 relative group-hover:scale-105 transition-transform duration-700">
                             {/* Mockup */}
                             <div className="absolute inset-4 bg-white rounded shadow-lg opacity-90">
                                 <div className="h-8 bg-blue-100 w-full mb-4 rounded-t"></div>
                                 <div className="p-2 space-y-2">
                                     <div className="h-2 bg-gray-100 w-3/4 rounded"></div>
                                     <div className="h-2 bg-gray-100 w-full rounded"></div>
                                 </div>
                             </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">القالب البسيط</h3>
                            <p className="text-gray-500 text-sm mb-4">مناسب لـ: حديثي التخرج، البنوك</p>
                            <Link to="/builder">
                                <button className="w-full py-3 bg-white/5 hover:bg-blue-600 hover:text-white border border-white/10 rounded-xl font-bold transition-all">استخدم القالب</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Templates;
