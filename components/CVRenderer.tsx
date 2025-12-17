
import React from 'react';
import { CVData, TemplateId, Language } from '../types';
import { Mail, Phone, MapPin, Globe, Linkedin, Briefcase, GraduationCap, Award, Code, Layout as LayoutIcon, User } from 'lucide-react';

interface CVRendererProps {
  data: CVData;
}

const getLangConfig = (lang: Language) => ({
  dir: lang === Language.Arabic ? 'rtl' : 'ltr',
  font: lang === Language.Arabic ? 'font-sans' : 'font-english',
  labels: lang === Language.Arabic ? {
    exp: 'الخبرات العملية',
    edu: 'التعليم والمؤهلات',
    skills: 'المهارات',
    summary: 'الملخص المهني',
    contact: 'معلومات التواصل',
    projects: 'المشاريع'
  } : {
    exp: 'Work Experience',
    edu: 'Education',
    skills: 'Skills',
    summary: 'Professional Summary',
    contact: 'Contact Info',
    projects: 'Projects'
  }
});

// --- SUB-COMPONENTS ---
const SectionHeader = ({ title, className, icon: Icon, style }: any) => (
  <h3 className={`font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${className}`} style={style}>
    {Icon && <Icon size={16} className="opacity-80 shrink-0" />}
    <span className="mt-1">{title}</span>
  </h3>
);

const ContactItem = ({ icon: Icon, text, className }: any) => {
  if (!text) return null;
  return (
    <div className={`flex items-center gap-2 text-[10pt] ${className}`}>
      <Icon size={12} className="shrink-0" />
      <span className="truncate">{text}</span>
    </div>
  );
};

// --- LAYOUTS ---

// 1. Sidebar Layout
const LayoutSidebar = ({ data, config }: { data: CVData, config: any }) => {
  const { dir, font, labels } = getLangConfig(data.language);
  const isDark = config.sidebar === 'dark';
  
  return (
    <div className={`w-full h-full flex bg-white text-gray-800 ${font} ${dir === 'rtl' ? 'flex-row' : 'flex-row-reverse'}`} dir={dir}>
      {/* Sidebar */}
      <div className={`w-[32%] p-6 flex flex-col gap-6 shrink-0 ${isDark ? 'bg-slate-900 text-white' : 'bg-gray-100 text-gray-900'}`} style={{ backgroundColor: config.sidebarColor, minHeight: '297mm' }}>
        <div className="flex justify-center mb-2">
           <div className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold border-4 ${isDark ? 'border-white/20 bg-white/10' : 'border-gray-300 bg-white'}`}>
             {data.fullName.charAt(0)}
           </div>
        </div>
        <div>
           <SectionHeader title={labels.contact} className={`text-xs border-b ${isDark ? 'border-white/20' : 'border-gray-300'} pb-2`} />
           <div className={`space-y-2.5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
             <ContactItem icon={Mail} text={data.email} />
             <ContactItem icon={Phone} text={data.phone} />
             <ContactItem icon={MapPin} text={data.location} />
           </div>
        </div>
        <div>
           <SectionHeader title={labels.skills} className={`text-xs border-b ${isDark ? 'border-white/20' : 'border-gray-300'} pb-2`} />
           <div className="flex flex-wrap gap-1.5">
             {data.skills.map((s, i) => (
               <span key={i} className={`text-[9pt] px-2 py-1 rounded ${isDark ? 'bg-white/10 text-white' : 'bg-white border border-gray-300 text-gray-700'}`}>
                 {s}
               </span>
             ))}
           </div>
        </div>
        <div>
           <SectionHeader title={labels.edu} className={`text-xs border-b ${isDark ? 'border-white/20' : 'border-gray-300'} pb-2`} />
           <div className="space-y-3">
             {data.education.map(edu => (
               <div key={edu.id} className="text-[10pt]">
                 <div className={`font-bold leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>{edu.degree}</div>
                 <div className={isDark ? 'text-gray-400' : 'text-gray-500'}>{edu.school}</div>
                 <div className={`text-[9pt] mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{edu.year}</div>
               </div>
             ))}
           </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-[68%] p-8 flex flex-col gap-6">
        <div className="border-b-2 pb-4" style={{ borderColor: config.accentColor }}>
          <h1 className="text-3xl font-black uppercase mb-1 leading-tight" style={{ color: config.accentColor }}>{data.fullName}</h1>
          <p className="text-lg font-medium text-gray-500 tracking-wide">{data.jobTitle}</p>
        </div>
        <div>
          <SectionHeader title={labels.summary} icon={User} className="text-gray-900 text-sm" />
          <p className="text-[10pt] leading-6 text-gray-600 text-justify">{data.summary}</p>
        </div>
        <div>
          <SectionHeader title={labels.exp} icon={Briefcase} className="text-gray-900 text-sm" />
          <div className="space-y-5">
             {data.experience.map(exp => (
               <div key={exp.id} className="relative pl-3 border-l-2 border-gray-100">
                 <div className="flex justify-between items-baseline mb-0.5">
                   <h4 className="font-bold text-[11pt] text-gray-800">{exp.title}</h4>
                   <span className="text-[9pt] font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 whitespace-nowrap">{exp.startDate} - {exp.endDate}</span>
                 </div>
                 <div className="text-[10pt] font-semibold mb-1.5" style={{ color: config.accentColor }}>{exp.company}</div>
                 <p className="text-[10pt] text-gray-600 whitespace-pre-line leading-5">{exp.description}</p>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// 2. Linear Layout
const LayoutLinear = ({ data, config }: { data: CVData, config: any }) => {
  const { dir, font, labels } = getLangConfig(data.language);
  const isSerif = config.fontType === 'serif';
  
  return (
    <div className={`w-full h-full bg-white text-black p-10 ${font} ${isSerif ? (data.language === Language.Arabic ? 'font-sans' : 'font-serif') : ''}`} dir={dir}>
      <div className={`text-center mb-6 ${config.headerStyle === 'border' ? 'border-b-2 border-gray-800 pb-4' : ''}`}>
        <h1 className="text-3xl font-bold uppercase mb-1 tracking-wide">{data.fullName}</h1>
        <p className="text-lg text-gray-600 mb-2">{data.jobTitle}</p>
        <div className="flex justify-center flex-wrap gap-3 text-[10pt] text-gray-600">
          <span>{data.email}</span> • <span>{data.phone}</span> • <span>{data.location}</span>
        </div>
      </div>

      <div className="mb-5">
        <h3 className="font-bold text-[11pt] uppercase border-b border-gray-400 mb-2 pb-1 tracking-wider" style={{ color: config.accentColor }}>{labels.summary}</h3>
        <p className="text-[10pt] leading-6 text-justify">{data.summary}</p>
      </div>

      {config.skillsTop && (
         <div className="mb-5">
            <h3 className="font-bold text-[11pt] uppercase border-b border-gray-400 mb-2 pb-1 tracking-wider" style={{ color: config.accentColor }}>{labels.skills}</h3>
            <div className="text-[10pt] leading-6">{data.skills.join(" • ")}</div>
         </div>
      )}

      <div className="mb-5">
        <h3 className="font-bold text-[11pt] uppercase border-b border-gray-400 mb-3 pb-1 tracking-wider" style={{ color: config.accentColor }}>{labels.exp}</h3>
        <div className="space-y-4">
          {data.experience.map(exp => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline mb-0.5">
                <h4 className="font-bold text-[11pt]">{exp.title}</h4>
                <span className="text-[10pt] font-medium text-gray-600 whitespace-nowrap">{exp.startDate} - {exp.endDate}</span>
              </div>
              <div className="text-[10pt] font-medium italic text-gray-700 mb-1">{exp.company}</div>
              <p className="text-[10pt] text-gray-800 whitespace-pre-line leading-5">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <h3 className="font-bold text-[11pt] uppercase border-b border-gray-400 mb-3 pb-1 tracking-wider" style={{ color: config.accentColor }}>{labels.edu}</h3>
        {data.education.map(edu => (
            <div key={edu.id} className="flex justify-between items-baseline mb-1">
                <div>
                    <span className="font-bold text-[10pt] block">{edu.degree}</span>
                    <span className="text-[10pt] text-gray-700">{edu.school}</span>
                </div>
                <span className="text-[10pt] text-gray-600 whitespace-nowrap">{edu.year}</span>
            </div>
        ))}
      </div>

      {!config.skillsTop && (
         <div>
            <h3 className="font-bold text-[11pt] uppercase border-b border-gray-400 mb-2 pb-1 tracking-wider" style={{ color: config.accentColor }}>{labels.skills}</h3>
            <div className="text-[10pt] leading-6">{data.skills.join(" • ")}</div>
         </div>
      )}
    </div>
  );
};

// 3. Header Accent
const LayoutHeaderAccent = ({ data, config }: { data: CVData, config: any }) => {
    const { dir, font, labels } = getLangConfig(data.language);
    
    return (
      <div className={`w-full h-full bg-white text-gray-800 ${font}`} dir={dir}>
        <div className="p-8 text-white" style={{ backgroundColor: config.accentColor }}>
            <h1 className="text-3xl font-bold mb-1">{data.fullName}</h1>
            <p className="text-lg opacity-90 font-light mb-4">{data.jobTitle}</p>
            <div className="flex flex-wrap gap-4 text-[10pt] opacity-90">
                <div className="flex items-center gap-1.5"><Mail size={14}/> {data.email}</div>
                <div className="flex items-center gap-1.5"><Phone size={14}/> {data.phone}</div>
                <div className="flex items-center gap-1.5"><MapPin size={14}/> {data.location}</div>
            </div>
        </div>

        <div className="p-8 grid grid-cols-12 gap-6">
            <div className="col-span-8">
                <div className="mb-6">
                    <SectionHeader title={labels.summary} icon={User} className="text-gray-900 border-b pb-1 text-sm" />
                    <p className="text-[10pt] leading-6 text-gray-600">{data.summary}</p>
                </div>
                <div>
                    <SectionHeader title={labels.exp} icon={Briefcase} className="text-gray-900 border-b pb-1 text-sm" />
                    <div className="space-y-5 mt-3">
                        {data.experience.map(exp => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-center mb-0.5">
                                    <h4 className="font-bold text-[11pt]" style={{ color: config.accentColor }}>{exp.title}</h4>
                                    <span className="text-[9pt] bg-gray-100 px-2 py-0.5 rounded text-gray-600 whitespace-nowrap">{exp.startDate} - {exp.endDate}</span>
                                </div>
                                <div className="text-[10pt] font-bold text-gray-700 mb-1">{exp.company}</div>
                                <p className="text-[10pt] text-gray-600 leading-5 whitespace-pre-line">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="col-span-4 bg-gray-50 p-5 rounded-xl h-fit">
                <div className="mb-6">
                    <SectionHeader title={labels.skills} icon={Award} className="text-gray-900 mb-3 text-sm" />
                    <div className="flex flex-col gap-1.5">
                        {data.skills.map((s, i) => (
                            <div key={i} className="bg-white px-2 py-1.5 rounded shadow-sm text-[9pt] border border-gray-100 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: config.accentColor }}></div>
                                {s}
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <SectionHeader title={labels.edu} icon={GraduationCap} className="text-gray-900 mb-3 text-sm" />
                     {data.education.map(edu => (
                         <div key={edu.id} className="mb-3 last:mb-0 border-l-2 pl-2" style={{ borderColor: config.accentColor }}>
                             <div className="font-bold text-[10pt] leading-tight">{edu.degree}</div>
                             <div className="text-[9pt] text-gray-600">{edu.school}</div>
                             <div className="text-[9pt] text-gray-400 mt-0.5">{edu.year}</div>
                         </div>
                     ))}
                </div>
            </div>
        </div>
      </div>
    );
};

const CVRenderer: React.FC<CVRendererProps> = ({ data }) => {
  const getTemplateRender = () => {
    switch (data.templateId) {
      case TemplateId.AR_ATS: return <LayoutLinear data={data} config={{ accentColor: '#000', fontType: 'sans', skillsTop: false }} />;
      case TemplateId.AR_CLASSIC: return <LayoutLinear data={data} config={{ accentColor: '#1F2937', fontType: 'serif', headerStyle: 'border' }} />;
      case TemplateId.AR_CORPORATE: return <LayoutHeaderAccent data={data} config={{ accentColor: '#1e3a8a' }} />;
      case TemplateId.AR_TECH: return <LayoutSidebar data={data} config={{ sidebar: 'dark', sidebarColor: '#111827', accentColor: '#10B981' }} />;
      case TemplateId.AR_DESIGNER: return <LayoutSidebar data={data} config={{ sidebar: 'light', sidebarColor: '#FDF2F8', accentColor: '#DB2777' }} />;
      case TemplateId.AR_BUSINESS: return <LayoutHeaderAccent data={data} config={{ accentColor: '#7C2D12' }} />;
      case TemplateId.AR_FUNCTIONAL: return <LayoutLinear data={data} config={{ accentColor: '#4B5563', skillsTop: true }} />;
      case TemplateId.AR_MODERN_PURPLE: return <LayoutSidebar data={data} config={{ sidebar: 'light', sidebarColor: '#F3E8FF', accentColor: '#7C3AED' }} />;
      case TemplateId.AR_MINIMAL_CLEAN: return <LayoutLinear data={data} config={{ accentColor: '#000', headerStyle: 'simple' }} />;
      case TemplateId.AR_MEDICAL: return <LayoutHeaderAccent data={data} config={{ accentColor: '#0F766E' }} />;
      
      case TemplateId.EN_MODERN_PRO: return <LayoutSidebar data={data} config={{ sidebar: 'dark', sidebarColor: '#1e293b', accentColor: '#3b82f6' }} />;
      case TemplateId.EN_MINIMAL_ATS: return <LayoutLinear data={data} config={{ accentColor: '#000', fontType: 'serif' }} />;
      case TemplateId.EN_EXECUTIVE: return <LayoutHeaderAccent data={data} config={{ accentColor: '#0f172a' }} />;
      case TemplateId.EN_TECH: return <LayoutSidebar data={data} config={{ sidebar: 'dark', sidebarColor: '#000', accentColor: '#22c55e' }} />;
      case TemplateId.EN_PRODUCT: return <LayoutLinear data={data} config={{ accentColor: '#2563eb', headerStyle: 'border' }} />;
      case TemplateId.EN_CREATIVE: return <LayoutSidebar data={data} config={{ sidebar: 'light', sidebarColor: '#fff1f2', accentColor: '#e11d48' }} />;
      case TemplateId.EN_BUSINESS: return <LayoutHeaderAccent data={data} config={{ accentColor: '#1d4ed8' }} />;
      case TemplateId.EN_MEDICAL: return <LayoutHeaderAccent data={data} config={{ accentColor: '#0891b2' }} />;
      case TemplateId.EN_TWO_COLUMN: return <LayoutSidebar data={data} config={{ sidebar: 'light', sidebarColor: '#f3f4f6', accentColor: '#374151' }} />;
      case TemplateId.EN_SIDEBAR_COLOR: return <LayoutSidebar data={data} config={{ sidebar: 'dark', sidebarColor: '#4f46e5', accentColor: '#4f46e5' }} />;

      default: return <LayoutLinear data={data} config={{ accentColor: '#000' }} />;
    }
  };

  return (
    <div className="w-full h-full bg-white text-left box-border" id="cv-root">
      {getTemplateRender()}
    </div>
  );
};

export default CVRenderer;
