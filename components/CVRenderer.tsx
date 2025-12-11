
import React from 'react';
import { CVData, TemplateId, Language } from '../types';
import { Mail, Phone, MapPin, Globe, Linkedin, Briefcase, GraduationCap, Award, Code, Layout as LayoutIcon, User } from 'lucide-react';

interface CVRendererProps {
  data: CVData;
}

// Helper to determine text direction and font
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

// --- SUB-COMPONENTS FOR SECTIONS ---

const SectionHeader = ({ title, className, icon: Icon }: { title: string, className?: string, icon?: any }) => (
  <h3 className={`font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${className}`}>
    {Icon && <Icon size={18} className="opacity-70" />}
    {title}
  </h3>
);

const ContactItem = ({ icon: Icon, text, className }: { icon: any, text: string, className?: string }) => {
  if (!text) return null;
  return (
    <div className={`flex items-center gap-2 text-sm ${className}`}>
      <Icon size={14} />
      <span>{text}</span>
    </div>
  );
};

// --- LAYOUT ARCHETYPES ---

// 1. Sidebar Layout (Modern, Tech, Designer)
const LayoutSidebar = ({ data, config }: { data: CVData, config: any }) => {
  const { dir, font, labels } = getLangConfig(data.language);
  const isDarkSidebar = config.sidebar === 'dark';
  
  return (
    <div className={`w-full h-full flex bg-white text-gray-800 ${font} ${dir === 'rtl' ? 'flex-row' : 'flex-row-reverse'}`} dir={dir}>
      {/* Sidebar */}
      <div className={`w-[32%] p-8 flex flex-col gap-8 ${isDarkSidebar ? 'bg-slate-900 text-white' : 'bg-gray-100 text-gray-900'}`} style={{ backgroundColor: config.sidebarColor }}>
        
        {/* Photo Placeholder / Initials */}
        <div className="flex justify-center mb-4">
           <div className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold border-4 ${isDarkSidebar ? 'border-white/20 bg-white/10' : 'border-gray-300 bg-white'}`}>
             {data.fullName.charAt(0)}
           </div>
        </div>

        {/* Contact */}
        <div>
           <SectionHeader title={labels.contact} className={`text-sm border-b ${isDarkSidebar ? 'border-white/20' : 'border-gray-300'} pb-2`} />
           <div className={`space-y-3 ${isDarkSidebar ? 'text-gray-300' : 'text-gray-600'}`}>
             <ContactItem icon={Mail} text={data.email} />
             <ContactItem icon={Phone} text={data.phone} />
             <ContactItem icon={MapPin} text={data.location} />
           </div>
        </div>

        {/* Skills */}
        <div>
           <SectionHeader title={labels.skills} className={`text-sm border-b ${isDarkSidebar ? 'border-white/20' : 'border-gray-300'} pb-2`} />
           <div className="flex flex-wrap gap-2">
             {data.skills.map((s, i) => (
               <span key={i} className={`text-xs px-2 py-1 rounded ${isDarkSidebar ? 'bg-white/10 text-white' : 'bg-white border border-gray-300 text-gray-700'}`}>
                 {s}
               </span>
             ))}
           </div>
        </div>

        {/* Education (Sidebar Version) */}
        <div>
           <SectionHeader title={labels.edu} className={`text-sm border-b ${isDarkSidebar ? 'border-white/20' : 'border-gray-300'} pb-2`} />
           <div className="space-y-4">
             {data.education.map(edu => (
               <div key={edu.id} className="text-sm">
                 <div className={`font-bold ${isDarkSidebar ? 'text-white' : 'text-gray-900'}`}>{edu.degree}</div>
                 <div className={isDarkSidebar ? 'text-gray-400' : 'text-gray-500'}>{edu.school}</div>
                 <div className={`text-xs mt-1 ${isDarkSidebar ? 'text-gray-500' : 'text-gray-400'}`}>{edu.year}</div>
               </div>
             ))}
           </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-[68%] p-10 flex flex-col gap-8">
        
        {/* Header */}
        <div className="border-b-2 pb-6" style={{ borderColor: config.accentColor }}>
          <h1 className="text-4xl font-black uppercase mb-2" style={{ color: config.accentColor }}>{data.fullName}</h1>
          <p className="text-xl font-medium text-gray-500 tracking-wide">{data.jobTitle}</p>
        </div>

        {/* Summary */}
        <div>
          <SectionHeader title={labels.summary} icon={User} className="text-gray-900" />
          <p className="text-sm leading-7 text-gray-600 text-justify">{data.summary}</p>
        </div>

        {/* Experience */}
        <div>
          <SectionHeader title={labels.exp} icon={Briefcase} className="text-gray-900" />
          <div className="space-y-6">
             {data.experience.map(exp => (
               <div key={exp.id} className="relative pl-4 border-l-2 border-gray-100">
                 <div className="flex justify-between items-baseline mb-1">
                   <h4 className="font-bold text-lg text-gray-800">{exp.title}</h4>
                   <span className="text-xs font-bold px-2 py-1 rounded bg-gray-100 text-gray-600">{exp.startDate} - {exp.endDate}</span>
                 </div>
                 <div className="text-sm font-semibold mb-2" style={{ color: config.accentColor }}>{exp.company}</div>
                 <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">{exp.description}</p>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// 2. Linear Layout (ATS, Classic, Minimal)
const LayoutLinear = ({ data, config }: { data: CVData, config: any }) => {
  const { dir, font, labels } = getLangConfig(data.language);
  const isSerif = config.fontType === 'serif';
  
  return (
    <div className={`w-full h-full bg-white text-black p-12 ${font} ${isSerif ? (data.language === Language.Arabic ? 'font-sans' : 'font-serif') : ''}`} dir={dir}>
      
      {/* Header */}
      <div className={`text-center mb-8 ${config.headerStyle === 'border' ? 'border-b-2 border-gray-800 pb-6' : ''}`}>
        <h1 className="text-3xl font-bold uppercase mb-2 tracking-wide">{data.fullName}</h1>
        <p className="text-lg text-gray-600 mb-3">{data.jobTitle}</p>
        <div className="flex justify-center flex-wrap gap-4 text-sm text-gray-600">
          <span>{data.email}</span> | <span>{data.phone}</span> | <span>{data.location}</span>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <h3 className="font-bold text-sm uppercase border-b border-gray-400 mb-3 pb-1 tracking-wider" style={{ color: config.accentColor }}>{labels.summary}</h3>
        <p className="text-sm leading-relaxed text-justify">{data.summary}</p>
      </div>

      {/* Skills (Top for Functional, Bottom for others) */}
      {config.skillsTop && (
         <div className="mb-6">
            <h3 className="font-bold text-sm uppercase border-b border-gray-400 mb-3 pb-1 tracking-wider" style={{ color: config.accentColor }}>{labels.skills}</h3>
            <div className="text-sm leading-6">{data.skills.join(" • ")}</div>
         </div>
      )}

      {/* Experience */}
      <div className="mb-6">
        <h3 className="font-bold text-sm uppercase border-b border-gray-400 mb-4 pb-1 tracking-wider" style={{ color: config.accentColor }}>{labels.exp}</h3>
        <div className="space-y-5">
          {data.experience.map(exp => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-bold text-base">{exp.title}</h4>
                <span className="text-sm font-medium text-gray-600">{exp.startDate} - {exp.endDate}</span>
              </div>
              <div className="text-sm font-medium italic text-gray-700 mb-1">{exp.company}</div>
              <p className="text-sm text-gray-800 whitespace-pre-line leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mb-6">
        <h3 className="font-bold text-sm uppercase border-b border-gray-400 mb-4 pb-1 tracking-wider" style={{ color: config.accentColor }}>{labels.edu}</h3>
        {data.education.map(edu => (
            <div key={edu.id} className="flex justify-between items-baseline mb-2">
                <div>
                    <span className="font-bold text-sm block">{edu.degree}</span>
                    <span className="text-sm text-gray-700">{edu.school}</span>
                </div>
                <span className="text-sm text-gray-600">{edu.year}</span>
            </div>
        ))}
      </div>

      {/* Skills (Bottom) */}
      {!config.skillsTop && (
         <div>
            <h3 className="font-bold text-sm uppercase border-b border-gray-400 mb-3 pb-1 tracking-wider" style={{ color: config.accentColor }}>{labels.skills}</h3>
            <div className="text-sm leading-6">{data.skills.join(" • ")}</div>
         </div>
      )}
    </div>
  );
};

// 3. Header Accent Layout (Corporate, Executive, Medical)
const LayoutHeaderAccent = ({ data, config }: { data: CVData, config: any }) => {
    const { dir, font, labels } = getLangConfig(data.language);
    
    return (
      <div className={`w-full h-full bg-white text-gray-800 ${font}`} dir={dir}>
        {/* Colorful Header */}
        <div className="p-10 text-white" style={{ backgroundColor: config.accentColor }}>
            <h1 className="text-4xl font-bold mb-2">{data.fullName}</h1>
            <p className="text-xl opacity-90 font-light mb-6">{data.jobTitle}</p>
            <div className="flex flex-wrap gap-6 text-sm opacity-90">
                <div className="flex items-center gap-2"><Mail size={16}/> {data.email}</div>
                <div className="flex items-center gap-2"><Phone size={16}/> {data.phone}</div>
                <div className="flex items-center gap-2"><MapPin size={16}/> {data.location}</div>
            </div>
        </div>

        <div className="p-10 grid grid-cols-12 gap-8">
            {/* Main Column */}
            <div className="col-span-8">
                <div className="mb-8">
                    <SectionHeader title={labels.summary} icon={User} className="text-gray-900 border-b pb-2" />
                    <p className="text-sm leading-7 text-gray-600">{data.summary}</p>
                </div>

                <div>
                    <SectionHeader title={labels.exp} icon={Briefcase} className="text-gray-900 border-b pb-2" />
                    <div className="space-y-6 mt-4">
                        {data.experience.map(exp => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="font-bold text-lg" style={{ color: config.accentColor }}>{exp.title}</h4>
                                    <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">{exp.startDate} - {exp.endDate}</span>
                                </div>
                                <div className="text-sm font-bold text-gray-700 mb-2">{exp.company}</div>
                                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Side Column */}
            <div className="col-span-4 bg-gray-50 p-6 rounded-xl h-fit">
                <div className="mb-8">
                    <SectionHeader title={labels.skills} icon={Award} className="text-gray-900 mb-4" />
                    <div className="flex flex-col gap-2">
                        {data.skills.map((s, i) => (
                            <div key={i} className="bg-white px-3 py-2 rounded shadow-sm text-sm border border-gray-100 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: config.accentColor }}></div>
                                {s}
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <SectionHeader title={labels.edu} icon={GraduationCap} className="text-gray-900 mb-4" />
                     {data.education.map(edu => (
                         <div key={edu.id} className="mb-4 last:mb-0 border-l-2 pl-3" style={{ borderColor: config.accentColor }}>
                             <div className="font-bold text-sm">{edu.degree}</div>
                             <div className="text-xs text-gray-600">{edu.school}</div>
                             <div className="text-xs text-gray-400 mt-0.5">{edu.year}</div>
                         </div>
                     ))}
                </div>
            </div>
        </div>
      </div>
    );
};


// --- MAIN RENDERER ---

const CVRenderer: React.FC<CVRendererProps> = ({ data }) => {
  // Mapping TemplateId to Layout + Config
  const getTemplateRender = () => {
    switch (data.templateId) {
      
      // === ARABIC TEMPLATES ===
      
      case TemplateId.AR_ATS:
        return <LayoutLinear data={data} config={{ accentColor: '#000', fontType: 'sans', skillsTop: false }} />;
      
      case TemplateId.AR_CLASSIC:
        return <LayoutLinear data={data} config={{ accentColor: '#1F2937', fontType: 'serif', headerStyle: 'border' }} />;
      
      case TemplateId.AR_CORPORATE:
        return <LayoutHeaderAccent data={data} config={{ accentColor: '#1e3a8a' }} />; // Dark Blue
      
      case TemplateId.AR_TECH:
        return <LayoutSidebar data={data} config={{ sidebar: 'dark', sidebarColor: '#111827', accentColor: '#10B981' }} />; // Dark + Emerald
      
      case TemplateId.AR_DESIGNER:
        return <LayoutSidebar data={data} config={{ sidebar: 'light', sidebarColor: '#FDF2F8', accentColor: '#DB2777' }} />; // Pink/Rose
      
      case TemplateId.AR_BUSINESS:
        return <LayoutHeaderAccent data={data} config={{ accentColor: '#7C2D12' }} />; // Brown/Rust
      
      case TemplateId.AR_FUNCTIONAL:
        return <LayoutLinear data={data} config={{ accentColor: '#4B5563', skillsTop: true }} />;
      
      case TemplateId.AR_MODERN_PURPLE:
        return <LayoutSidebar data={data} config={{ sidebar: 'light', sidebarColor: '#F3E8FF', accentColor: '#7C3AED' }} />; // Brand Purple
      
      case TemplateId.AR_MINIMAL_CLEAN:
        return <LayoutLinear data={data} config={{ accentColor: '#000', headerStyle: 'simple' }} />;
      
      case TemplateId.AR_MEDICAL:
        return <LayoutHeaderAccent data={data} config={{ accentColor: '#0F766E' }} />; // Teal

      // === ENGLISH TEMPLATES ===
      
      case TemplateId.EN_MODERN_PRO:
        return <LayoutSidebar data={data} config={{ sidebar: 'dark', sidebarColor: '#1e293b', accentColor: '#3b82f6' }} />;
      
      case TemplateId.EN_MINIMAL_ATS:
        return <LayoutLinear data={data} config={{ accentColor: '#000', fontType: 'serif' }} />;
      
      case TemplateId.EN_EXECUTIVE:
        return <LayoutHeaderAccent data={data} config={{ accentColor: '#0f172a' }} />; // Slate 900
      
      case TemplateId.EN_TECH:
        return <LayoutSidebar data={data} config={{ sidebar: 'dark', sidebarColor: '#000', accentColor: '#22c55e' }} />; // Matrix Green
      
      case TemplateId.EN_PRODUCT:
        return <LayoutLinear data={data} config={{ accentColor: '#2563eb', headerStyle: 'border' }} />; // Royal Blue
      
      case TemplateId.EN_CREATIVE:
        return <LayoutSidebar data={data} config={{ sidebar: 'light', sidebarColor: '#fff1f2', accentColor: '#e11d48' }} />; // Rose
      
      case TemplateId.EN_BUSINESS:
        return <LayoutHeaderAccent data={data} config={{ accentColor: '#1d4ed8' }} />;
      
      case TemplateId.EN_MEDICAL:
        return <LayoutHeaderAccent data={data} config={{ accentColor: '#0891b2' }} />; // Cyan
      
      case TemplateId.EN_TWO_COLUMN:
        return <LayoutSidebar data={data} config={{ sidebar: 'light', sidebarColor: '#f3f4f6', accentColor: '#374151' }} />;
      
      case TemplateId.EN_SIDEBAR_COLOR:
        return <LayoutSidebar data={data} config={{ sidebar: 'dark', sidebarColor: '#4f46e5', accentColor: '#4f46e5' }} />; // Indigo

      default:
        return <LayoutLinear data={data} config={{ accentColor: '#000' }} />;
    }
  };

  return (
    <div className="w-full h-full shadow-inner bg-white overflow-hidden text-left" id="cv-root">
      {getTemplateRender()}
    </div>
  );
};

export default CVRenderer;
