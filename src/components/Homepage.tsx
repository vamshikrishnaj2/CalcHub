import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  DollarSign,
  HeartPulse,
  Calculator,
  Clock,
  Scale,
  TrendingUp,
  Flame,
  ArrowRight,
  BookmarkCheck,
  Star,
  History,
  Trash2
} from 'lucide-react';
import { CATEGORIES, calculatorsList } from '../data/calculatorsList';
import { SEOManager } from './SEOManager';
import FAQSection from './FAQSection';

// Icon mapping handler helper
const iconMapping: { [key: string]: any } = {
  DollarSign: DollarSign,
  HeartPulse: HeartPulse,
  Calculator: Calculator,
  Clock: Clock,
  Scale: Scale
};

export default function Homepage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [recentIds, setRecentIds] = useState<string[]>([]);

  // Load recent calculators from local storage
  const loadRecents = () => {
    try {
      const stored = localStorage.getItem('recentCalculators');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setRecentIds(parsed);
        }
      } else {
        setRecentIds([]);
      }
    } catch {
      setRecentIds([]);
    }
  };

  useEffect(() => {
    loadRecents();
    window.addEventListener('storage', loadRecents);
    return () => {
      window.removeEventListener('storage', loadRecents);
    };
  }, []);

  const clearRecents = () => {
    localStorage.removeItem('recentCalculators');
    setRecentIds([]);
    window.dispatchEvent(new Event('storage'));
  };

  // Map IDs to calculator items (limit to last 5)
  const recentCalculators = recentIds
    .map(id => calculatorsList.find(c => c.id === id))
    .filter((c): c is typeof calculatorsList[0] => Boolean(c))
    .slice(0, 5);

  const popularCalculators = calculatorsList.filter(c => c.isPopular);
  const trendingCalculators = calculatorsList.filter(c => c.isTrending);

  return (
    <div className="bg-[#F8FAFC] dark:bg-zinc-950 min-h-screen text-slate-800 dark:text-zinc-100 font-sans transition-colors pt-20 pb-16">
      <SEOManager canonicalPath="/" />
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-10 pb-14 bg-gradient-to-b from-white via-slate-50/80 to-[#F8FAFC] dark:from-zinc-900 dark:via-zinc-950/80 dark:to-zinc-950 border-b border-slate-200/70 dark:border-zinc-850/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="flex flex-col items-center gap-2.5">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-emerald-200/60 dark:border-emerald-800/40 shadow-2xs">
              <Sparkles size={12} /> FAST &bull; ACCURATE &bull; FREE &bull; NO SIGN-UP REQUIRED
            </div>
            <div className="inline-flex items-center px-3 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800/60 text-slate-600 dark:text-zinc-400 border border-slate-200/80 dark:border-zinc-800 text-[10px] font-semibold uppercase tracking-wider">
              33+ FREE CALCULATORS &bull; MORE COMING SOON
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Free Online Calculators
            <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              Solved Instantly
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-4xl mx-auto leading-relaxed font-normal">
            CalcHub provides fast, free, and accurate online calculators for finance, health, education, mathematics, and everyday life. Designed with simplicity, speed, and privacy in mind—no sign-up required.
          </p>
        </div>
      </section>

      {/* 2. RECENT CALCULATIONS SECTION */}
      {recentCalculators.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-slate-200/70 dark:border-zinc-900">
          <div className="flex items-center justify-between pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30 shadow-2xs">
                <History size={16} />
              </div>
              <div>
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">Recent Calculations</h2>
                <p className="text-[11px] text-slate-400 dark:text-zinc-500">Calculators you recently visited</p>
              </div>
            </div>
            <button
              onClick={clearRecents}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-slate-500 hover:text-rose-500 dark:text-zinc-400 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-rose-200/60 dark:hover:border-rose-900/30"
              title="Clear recent history"
            >
              <Trash2 size={12} /> Clear History
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {recentCalculators.map(calc => (
              <Link
                key={calc.id}
                to={calc.path}
                className="group p-4 bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-2xl shadow-xs hover:shadow-md hover:shadow-emerald-500/10 hover:-translate-y-[3px] hover:border-emerald-500/40 dark:hover:border-emerald-500/30 transition-all duration-200 ease-out flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="text-[9px] uppercase font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 rounded-full tracking-wider border border-emerald-100/80 dark:border-emerald-900/40">
                      {calc.category}
                    </span>
                    <Clock size={12} className="text-slate-300 dark:text-zinc-600" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors block line-clamp-1">
                    {calc.title}
                  </span>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400 line-clamp-2 mt-1.5 leading-relaxed">
                    {calc.description}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-3.5 group-hover:translate-x-1 transition-transform">
                  Calculate <ArrowRight size={11} />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 3. POPULAR & TRENDING METRICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 border-b border-slate-200/70 dark:border-zinc-900">
        {/* Popular List */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-200/70 dark:border-zinc-850">
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/20 text-amber-500 border border-amber-100/80 dark:border-amber-900/30 shadow-2xs">
              <Star size={16} className="fill-amber-500" />
            </div>
            <h2 className="text-xs uppercase tracking-wider font-extrabold text-slate-700 dark:text-zinc-300">Popular Tools</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {popularCalculators.map(calc => (
              <Link
                key={calc.id}
                to={calc.path}
                className="group p-4 sm:p-5 bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-2xl shadow-xs hover:shadow-md hover:shadow-emerald-500/10 hover:-translate-y-[3px] hover:border-emerald-500/40 dark:hover:border-emerald-500/30 transition-all duration-200 ease-out flex flex-col justify-between"
              >
                <div>
                  <span className="text-sm font-bold text-slate-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors block">{calc.title}</span>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-2 mt-1.5 leading-relaxed">{calc.description}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-3.5 group-hover:translate-x-1 transition-transform">
                  Solve <ArrowRight size={11} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Trending List */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-200/70 dark:border-zinc-850">
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 border border-emerald-100/80 dark:border-emerald-900/30 shadow-2xs">
              <TrendingUp size={16} />
            </div>
            <h2 className="text-xs uppercase tracking-wider font-extrabold text-slate-700 dark:text-zinc-300">Trending Now</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {trendingCalculators.map(calc => (
              <Link
                key={calc.id}
                to={calc.path}
                className="group p-4 sm:p-5 bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-2xl shadow-xs hover:shadow-md hover:shadow-emerald-500/10 hover:-translate-y-[3px] hover:border-emerald-500/40 dark:hover:border-emerald-500/30 transition-all duration-200 ease-out flex flex-col justify-between"
              >
                <div>
                  <span className="text-sm font-bold text-slate-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors block">{calc.title}</span>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-2 mt-1.5 leading-relaxed">{calc.description}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-3.5 group-hover:translate-x-1 transition-transform">
                  Solve <ArrowRight size={11} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MULTI-CATEGORY GRID SECTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 sm:space-y-16">
        <div className="text-center space-y-2.5">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Interactive Calculation Categories</h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 max-w-lg mx-auto">Click any category icon to filter, or browse the complete set of standard calculators.</p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-200/70 dark:border-zinc-900 pb-6">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 ${activeCategory === null ? 'bg-slate-900 dark:bg-zinc-100 text-white dark:text-zinc-950 shadow-sm' : 'bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 border border-slate-200/80 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 hover:bg-slate-50/80'}`}
          >
            All Categories
          </button>
          {CATEGORIES.map(cat => {
            const CatIcon = iconMapping[cat.icon];
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 inline-flex items-center gap-2 ${activeCategory === cat.id ? 'bg-emerald-500 text-white shadow-sm' : 'bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 border border-slate-200/80 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 hover:bg-slate-50/80'}`}
              >
                {CatIcon && <CatIcon size={13} />}
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic Category Panels rendering with increased spacing between categories */}
        <div className="space-y-16 sm:space-y-20">
          {CATEGORIES.filter(cat => activeCategory === null || activeCategory === cat.id).map(category => {
            const childCalcs = calculatorsList.filter(c => c.category === category.id);
            const CatIcon = iconMapping[category.icon];

            return (
              <div key={category.id} className="space-y-5">
                <div className="flex items-center gap-3 text-slate-900 dark:text-white pb-1">
                  {CatIcon && (
                    <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 shadow-2xs border border-emerald-100/80 dark:border-emerald-900/30">
                      <CatIcon size={20} />
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{category.label}</h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 leading-normal mt-0.5">{category.desc}</p>
                  </div>
                </div>

                {/* Grid list children */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {childCalcs.map(calc => (
                    <Link
                      key={calc.id}
                      to={calc.path}
                      className="group p-4 sm:p-5 bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-2xl shadow-xs hover:shadow-md hover:shadow-emerald-500/10 hover:-translate-y-[3px] hover:border-emerald-500/40 dark:hover:border-emerald-500/30 transition-all duration-200 ease-out flex justify-between gap-3.5 items-start"
                    >
                      <div className="space-y-1">
                        <span className="text-sm font-bold text-slate-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors block">{calc.title}</span>
                        <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed line-clamp-2 mt-1">{calc.description}</p>
                      </div>
                      <div className="shrink-0 p-2 rounded-xl bg-slate-50 dark:bg-zinc-800 text-slate-400 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/40 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 border border-slate-100 dark:border-zinc-750 transition-colors">
                        <ArrowRight size={13} />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. FREQUENTLY ASKED QUESTIONS */}
      <FAQSection />

    </div>
  );
}
