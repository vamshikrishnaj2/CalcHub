import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { SEOManager } from './SEOManager';
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Smartphone,
  Cpu,
  CheckCircle,
  FileText,
  Info,
  ArrowRight,
  TrendingUp,
  Award,
  Lock,
  Globe,
  DollarSign,
  HeartPlus,
  Calculator,
  Clock,
  Scale,
  ExternalLink,
  Compass,
  UserX,
  Layout,
  AlertCircle
} from 'lucide-react';

// Icon mapping matching other areas of the application
const categoryIconMap: { [key: string]: any } = {
  financial: DollarSign,
  health: HeartPlus,
  math: Calculator,
  datetime: Clock,
  unit: Scale
};

export default function AboutPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'about';

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentTab]);

  const handleTabChange = (tabId: string) => {
    setSearchParams({ tab: tabId });
  };

  // Why Choose Us Section Cards data
  const whyChooseUsCards = [
    {
      id: 'fast',
      title: 'Fast Calculations',
      desc: 'Real-time results calculated instantly in your browser as you type with zero queue latency, server loading times, or lag.',
      icon: Zap,
      badgeColor: 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400',
      borderColor: 'group-hover:border-amber-500/30'
    },
    {
      id: 'mobile',
      title: 'Mobile-Friendly',
      desc: 'Responsive, touch-optimized layouts engineered to render seamlessly across smartphones, tablets, and desktop displays.',
      icon: Smartphone,
      badgeColor: 'bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400',
      borderColor: 'group-hover:border-purple-500/30'
    },
    {
      id: 'clean',
      title: 'Clean Interface',
      desc: 'An intuitive, distraction-free workspace focused strictly on your calculations without popups, banners, or cognitive clutter.',
      icon: Layout,
      badgeColor: 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400',
      borderColor: 'group-hover:border-blue-500/30'
    },
    {
      id: 'free',
      title: 'Free to Use',
      desc: '100% free access to all calculators for everyone—no paywalls, hidden premium fees, or subscription tiers.',
      icon: Award,
      badgeColor: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400',
      borderColor: 'group-hover:border-emerald-500/30'
    },
    {
      id: 'nosignup',
      title: 'No Sign-Up Required',
      desc: 'Use any tool instantly without registering an account, providing an email, or logging in—complete privacy by design.',
      icon: UserX,
      badgeColor: 'bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400',
      borderColor: 'group-hover:border-rose-500/30'
    },
    {
      id: 'accuracy',
      title: 'Reliable & Accurate',
      desc: 'Engineered using verified algebraic parameters, certified financial models, and standardized physical unit formulas.',
      icon: CheckCircle,
      badgeColor: 'bg-teal-50 dark:bg-teal-950/30 text-teal-600 dark:text-teal-400',
      borderColor: 'group-hover:border-teal-500/30'
    }
  ];

  // Map category data internally for modern aesthetic category grid representation
  const mainCategories = [
    {
      id: 'financial',
      title: 'Financial Calculators',
      desc: 'Forecast home mortgages, outline retirement funds, configure compound interests, or simulate monthly loan EMI values.',
      color: 'from-emerald-500 to-teal-500',
      count: '5 Premium tools',
      sampleLink: '/financial/emi'
    },
    {
      id: 'health',
      title: 'Health Calculators',
      desc: 'Map basic metabolic calorie goals, evaluate standardized body mass indexes, and manage nutritional deficit standards.',
      color: 'from-pink-500 to-rose-500',
      count: '2 Active indices',
      sampleLink: '/health/bmi'
    },
    {
      id: 'math',
      title: 'Mathematics Solvers',
      desc: 'Simplify percentage models, solve algebraic fractions, compute fraction operations, or navigate high-precision math parameters.',
      color: 'from-amber-400 to-orange-500',
      count: '3 Solve systems',
      sampleLink: '/math/percentage'
    },
    {
      id: 'datetime',
      title: 'Date & Time Calculators',
      desc: 'Count time-span differences, find your exact age milestones in weeks, or check business day gaps.',
      color: 'from-blue-500 to-indigo-600',
      count: '2 Temporal indexes',
      sampleLink: '/datetime/age'
    },
    {
      id: 'unit',
      title: 'Physical Unit Converters',
      desc: 'Seamlessly shift temperature registers, coordinate imperial length structures, or transform mass weights.',
      color: 'from-purple-500 to-fuchsia-600',
      count: '3 Dynamic matrices',
      sampleLink: '/unit/length'
    }
  ];

  return (
    <div className="bg-slate-50 dark:bg-zinc-950 min-h-screen text-gray-800 dark:text-zinc-100 font-sans transition-colors pt-16 pb-2">
      <SEOManager
        title="About CalcHub - Fast, Free & Accurate Online Calculators"
        description="Learn about CalcHub's mission to provide fast, free, accurate, and privacy-focused online calculators for finance, health, education, mathematics, and everyday life."
        canonicalPath="/about"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' }
        ]}
      />
      
      {/* Tab sub-navigation bar */}
      <div className="bg-white/75 dark:bg-zinc-900/75 backdrop-blur-md border-b border-gray-100 dark:border-zinc-850 sticky top-16 z-40 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 sm:space-x-4 overflow-x-auto py-3 scrollbar-none">
            <button
              onClick={() => handleTabChange('about')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                currentTab === 'about'
                  ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/10'
                  : 'bg-transparent text-gray-500 hover:text-gray-800 dark:text-zinc-400 dark:hover:text-white'
              }`}
            >
              <Info size={13} /> About CalcHub
            </button>
            <button
              onClick={() => handleTabChange('privacy')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                currentTab === 'privacy'
                  ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/10'
                  : 'bg-transparent text-gray-500 hover:text-gray-800 dark:text-zinc-400 dark:hover:text-white'
              }`}
            >
              <ShieldCheck size={13} /> Privacy Policy
            </button>
            <button
              onClick={() => handleTabChange('terms')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                currentTab === 'terms'
                  ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/10'
                  : 'bg-transparent text-gray-500 hover:text-gray-800 dark:text-zinc-400 dark:hover:text-white'
              }`}
            >
              <FileText size={13} /> Terms of Service
            </button>
            <button
              onClick={() => handleTabChange('disclaimer')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                currentTab === 'disclaimer'
                  ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/10'
                  : 'bg-transparent text-gray-500 hover:text-gray-800 dark:text-zinc-400 dark:hover:text-white'
              }`}
            >
              <AlertCircle size={13} /> Disclaimer
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {currentTab === 'about' && (
          <motion.div
            key="about"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {/* 1. HERO SECTION */}
            <section className="relative overflow-hidden pt-12 pb-20 bg-gradient-to-b from-white via-slate-50 to-transparent dark:from-zinc-900/40 dark:via-zinc-950 dark:to-transparent border-b border-gray-100 dark:border-zinc-900">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(16,185,129,0.06),transparent_40%)] pointer-events-none" />
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider shadow-sm">
                  <Sparkles size={11} className="animate-pulse" /> Streamlining Complex Calculations Globally
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-950 dark:text-white tracking-tight max-w-4xl mx-auto leading-[1.05]">
                  CalcHub
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-emerald-600 dark:text-emerald-400 font-extrabold max-w-2xl mx-auto uppercase tracking-wide">
                  Simplifying life's numerical challenges online
                </p>
                <p className="text-sm sm:text-base text-gray-500 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
                  Avoid outdated layouts, paid calculators, or dense algebraic formula pages. CalcHub delivers state-of-the-art interactive engines engineered for instant accuracy with zero cognitive clutter.
                </p>
                <div className="pt-6 flex justify-center gap-3">
                  <Link
                    to="/"
                    className="px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-md shadow-emerald-500/20 hover:scale-102 flex items-center gap-1.5"
                  >
                    Explore 33 Calculators <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </section>

            {/* 2. ABOUT CALCHUB, MISSION & VISION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* About copy */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-widest font-extrabold text-emerald-500">The Ultimate Hub</span>
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                      About CalcHub
                    </h2>
                  </div>
                  <p className="text-sm text-gray-650 dark:text-zinc-300 leading-relaxed">
                    CalcHub serves as a central clearinghouse of professional calculation resources for millions of developers, finance professionals, home buyers, fitness enthusiasts, and students worldwide. We curate math equations, index values, and physical metrics structured under compliant mathematical formulas.
                  </p>
                  <p className="text-sm text-gray-650 dark:text-zinc-300 leading-relaxed">
                    Whether you are preparing for personal financial tracking with an <Link to="/financial/sip" className="text-emerald-500 font-semibold hover:underline">SIP mutual fund planner</Link>, validating indices with a <Link to="/health/bmi" className="text-emerald-500 font-semibold hover:underline">BMI health index tracker</Link>, resolving fractions, or doing instant unit transformations on high precision registers, our user interface handles full algebraic expansion client-side instantly.
                  </p>
                </div>

                {/* Mission & Vision cards */}
                <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-5">
                  {/* Our Mission card */}
                  <div className="relative group p-6 rounded-3xl bg-gradient-to-tr from-emerald-500/5 to-teal-500/5 dark:from-emerald-950/20 dark:to-zinc-900 border border-emerald-500/10 dark:border-zinc-800 shadow-xs hover:shadow-md transition-all">
                    <div className="space-y-3">
                      <div className="h-10 w-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/10">
                        <TrendingUp size={18} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-950 dark:text-white">Our Mission</h3>
                      <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed">
                        To simplify math and logical algorithms into highly responsive, elegant web workspaces. We empower everyday users globally to resolve complex computations instantly without dense spreadsheets or subscription walls.
                      </p>
                    </div>
                  </div>

                  {/* Our Vision card */}
                  <div className="relative group p-6 rounded-3xl bg-gradient-to-tr from-blue-500/5 to-indigo-500/5 dark:from-blue-950/20 dark:to-zinc-900 border border-blue-500/10 dark:border-zinc-800 shadow-xs hover:shadow-md transition-all">
                    <div className="space-y-3">
                      <div className="h-10 w-10 rounded-xl bg-blue-500 text-white flex items-center justify-center shadow-md shadow-blue-500/10">
                        <Compass size={18} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-950 dark:text-white">Our Vision</h3>
                      <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed">
                        We're building one central place where anyone can find fast, reliable calculators for daily life, education, finance, health, and business—engineered with clarity and zero noise.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* 3. WHY CHOOSE US (6 feature grid) */}
            <section className="bg-white dark:bg-zinc-900/50 py-20 border-y border-gray-100 dark:border-zinc-900 transition-colors">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center space-y-3">
                  <span className="text-[10px] uppercase tracking-widest font-extrabold text-emerald-500">Engineered with Intent</span>
                  <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Why Choose CalcHub?</h2>
                  <p className="text-xs sm:text-sm text-gray-400 dark:text-zinc-500 max-w-xl mx-auto">
                    Built to modern SaaS specifications, CalcHub balances physical calculation integrity with premium usability.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {whyChooseUsCards.map(card => {
                    const IconComp = card.icon;
                    return (
                      <div
                        key={card.id}
                        className="group p-6 bg-slate-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 hover:border-emerald-500/20 dark:hover:border-emerald-500/15 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                      >
                        <div className={`p-2.5 rounded-xl inline-self-start self-start ${card.badgeColor}`}>
                          <IconComp size={18} />
                        </div>
                        <div className="space-y-1.5 flex-grow">
                          <h3 className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                            {card.title}
                          </h3>
                          <p className="text-[11px] sm:text-xs text-gray-400 dark:text-zinc-400 leading-relaxed">
                            {card.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* 4. CATEGORIES WE COVER */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
              <div className="text-center space-y-3">
                <span className="text-[10px] uppercase tracking-widest font-extrabold text-emerald-500">Modular Classification</span>
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Categories We Cover</h2>
                <p className="text-xs sm:text-sm text-gray-400 dark:text-zinc-500 max-w-xl mx-auto">
                  Browse standard tools organized across five principal domains for rapid searching.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {mainCategories.map(cat => {
                  const IconComp = categoryIconMap[cat.id] || Info;
                  return (
                    <Link
                      key={cat.id}
                      to={cat.sampleLink}
                      className="group p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-850 hover:border-emerald-500/20 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        <div className={`h-10 w-10 rounded-xl bg-gradient-to-tr ${cat.color} text-white flex items-center justify-center shadow-lg shadow-emerald-500/5`}>
                          <IconComp size={18} />
                        </div>
                        <div>
                          <h3 className="text-xs sm:text-sm font-extrabold text-gray-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                            {cat.title}
                          </h3>
                          <p className="text-[10px] text-gray-400 mt-1 lines-clamp-3 leading-relaxed">
                            {cat.desc}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-gray-50 dark:border-zinc-850 flex items-center justify-between">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{cat.count}</span>
                        <span className="text-[10px] text-emerald-500 font-bold group-hover:translate-x-1.5 transition-transform flex items-center gap-0.5">
                          View <ArrowRight size={10} />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* 5. DEEP SEO PARAGRAPH CONTENT */}
            <section className="bg-slate-100/50 dark:bg-zinc-950/40 py-16 border-y border-gray-100 dark:border-zinc-900/50 transition-colors">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center sm:text-left">
                <span className="text-[9px] uppercase tracking-widest font-extrabold text-gray-450 dark:text-zinc-500 block text-center">
                  Search Engine Optimization (SEO) Context Guidelines
                </span>
                <div className="space-y-6 text-xs sm:text-sm text-gray-540 dark:text-zinc-400 leading-relaxed">
                  <p>
                    Evaluating loan indices, tracking nutritional indices, or configuring temperature scales shouldn’t require downloading heavy software clients. CalcHub curates elite, premium, 100% free <strong className="font-semibold text-gray-800 dark:text-zinc-200">online calculators</strong> that are immediate, highly accurate, and responsive. Operating on modern client-side architectures, users globally can secure calculations without cookies, login walls, or advertisements.
                  </p>
                  <p>
                    Our extensive range of <strong className="font-semibold text-gray-800 dark:text-zinc-200">free calculators</strong> adapts automatically to physical and algebraic requirements. Track compound growth variables, home mortgages, and local liabilities with our certified <strong className="font-semibold text-gray-800 dark:text-zinc-200">financial calculators</strong>. Build better metabolic insights using targeted <strong className="font-semibold text-gray-800 dark:text-zinc-200">health calculators</strong>. For classroom standards or structural engineering formulas, convert densities using physics-compliant <strong className="font-semibold text-gray-800 dark:text-zinc-200">unit converters</strong> or run math calculations inside percentage equations.
                  </p>
                  <p>
                    By keeping parameters local to the browser client, CalcHub protects sensitive figures. Your income totals, compound savings margins, health counts, and scientific computations remain strictly your own. Discover the power of premium mathematical rendering at CalcHub today.
                  </p>
                </div>
              </div>
            </section>

            {/* 6. CTA SECTION */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
              <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_90%,rgba(255,255,255,0.08),transparent_55%)] pointer-events-none" />
                <div className="max-w-2xl mx-auto space-y-6 relative">
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-none"> Ready to Start Computing? </h2>
                  <p className="text-xs sm:text-sm text-emerald-50/90 leading-relaxed font-semibold">
                    Browse our full array of 33 instant mathematical, date, health, and unit calculators. Completely free. No strings attached.
                  </p>
                  <div className="pt-2">
                    <Link
                      to="/"
                      className="px-8 py-3 rounded-full bg-white text-emerald-600 text-xs font-black hover:bg-emerald-50 hover:scale-103 transition-all inline-flex items-center gap-1.5 shadow-md shadow-emerald-950/20"
                    >
                      Explore the Homepage Dashboard <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {currentTab === 'privacy' && (
          <motion.div
            key="privacy"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
          >
            <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-850 p-8 sm:p-12 space-y-8 shadow-sm transition-colors">
              <div className="space-y-2 pb-6 border-b dark:border-zinc-850">
                <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-500 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1 rounded-full">
                  <ShieldCheck size={11} /> Privacy Certification
                </div>
                <h1 className="text-3xl font-black tracking-tight text-gray-950 dark:text-white">Privacy Policy</h1>
                <p className="text-xs text-gray-400">Effective Date: May 2026 | CalcHub Protection Index</p>
              </div>

              <div className="space-y-6 text-xs sm:text-sm text-gray-650 dark:text-zinc-300 leading-relaxed font-sans">
                <p className="font-semibold text-gray-800 dark:text-zinc-100">
                  Your privacy is our highest mandate. At CalcHub, we do not capture, log, parse, or transmit any digits entered into our computation engines.
                </p>

                <h3 className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white pt-2">1. Client-Side Processing</h3>
                <p>
                  All algebraic formulas, financial spreadsheets, weight indices, and physical calculations are processed entirely within your computer or mobile browser client using vanilla JavaScript compilers and local state managers. No input is ever serialized or synchronized with external databases.
                </p>

                <h3 className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white pt-2">2. Local Storage Assets</h3>
                <p>
                  The "Favorites" and "Recent Searches" features found in our navigation components utilize client-side <code>localStorage</code> hooks. These tags reside purely on your local machine and can be cleared instantaneously from your browser history cache. Our backend systems do not read these cookies.
                </p>

                <h3 className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white pt-2">3. Third-Party Analytics</h3>
                <p>
                  To measure traffic volume and page speeds, we record anonymous browser header meta-stats. No personal identity markers, IP coordinates, or numerical calculation histories are tracked, maintaining full compliance with GDPR and CCPA standards.
                </p>

                <h3 className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white pt-2">4. Absolute Security</h3>
                <p>
                  Because we do not store customer profiles or record transactions, your figures are immune to server breaches or database intrusions.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {currentTab === 'terms' && (
          <motion.div
            key="terms"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
          >
            <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-850 p-8 sm:p-12 space-y-8 shadow-sm transition-colors">
              <div className="space-y-2 pb-6 border-b dark:border-zinc-850">
                <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-500 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1 rounded-full">
                  <FileText size={11} /> Legal Framework
                </div>
                <h1 className="text-3xl font-black tracking-tight text-gray-950 dark:text-white">Terms of Service</h1>
                <p className="text-xs text-gray-400">Effective Date: May 2026 | CalcHub Global Index</p>
              </div>

              <div className="space-y-6 text-xs sm:text-sm text-gray-650 dark:text-zinc-300 leading-relaxed font-sans">
                <p>
                  By accessing CalcHub tools, you agree to comply with the standard terms and conditions detailed below.
                </p>

                <h3 className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white pt-2">1. Educational Index Indicator</h3>
                <p>
                  Calculators published on this educational hub are provided for approximation and reference purposes only. While our algorithms map certified math equations (e.g. compound interest multipliers and physical conversion models), output parameters should not be construed as verified legal, financial, architectural, or professional recommendations.
                </p>

                <h3 className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white pt-2">2. Liability Disclaimer</h3>
                <p>
                  CalcHub mathematical frameworks are executed "as-is" without physical waranties or performance guaranties. CalcHub is not responsible for investment choices, tax liabilities, calorie deficiencies, or structural measurements based on these interactive modules.
                </p>

                <h3 className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white pt-2">3. Acceptable Use Policy</h3>
                <p>
                  You agree to use these tools solely via standard web browsers. Scraping calculations, calling APIs continuously, or trying to overload client-side JavaScript functions to block performance for other users is strictly prohibited.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {currentTab === 'disclaimer' && (
          <motion.div
            key="disclaimer"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
          >
            <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-850 p-8 sm:p-12 space-y-8 shadow-sm transition-colors">
              <div className="space-y-2 pb-6 border-b dark:border-zinc-850">
                <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-500 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1 rounded-full">
                  <AlertCircle size={11} /> Important Notice
                </div>
                <h1 className="text-3xl font-black tracking-tight text-gray-950 dark:text-white">Disclaimer</h1>
                <p className="text-xs text-gray-400">Effective Date: May 2026 | CalcHub Global Index</p>
              </div>

              <div className="space-y-6 text-xs sm:text-sm text-gray-650 dark:text-zinc-300 leading-relaxed font-sans">
                <p className="text-sm sm:text-base font-semibold text-gray-800 dark:text-zinc-100">
                  The calculators on CalcHub are provided for informational purposes only. Please verify important results independently before making financial, medical, legal, tax, or other critical decisions.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
