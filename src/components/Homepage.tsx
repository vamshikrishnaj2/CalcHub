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
    <div className="bg-slate-50 dark:bg-zinc-950 min-h-screen text-gray-800 dark:text-zinc-100 font-sans transition-colors pt-20 pb-12">
      <SEOManager canonicalPath="/" />
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-12 bg-gradient-to-b from-white to-slate-50 dark:from-zinc-900 dark:to-zinc-950 border-b border-gray-100 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="flex flex-col items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
              <Sparkles size={11} /> FAST &bull; ACCURATE &bull; FREE &bull; NO SIGN-UP REQUIRED
            </div>
            <div className="inline-flex items-center px-3 py-0.5 rounded-full bg-slate-100/80 dark:bg-zinc-800/50 text-gray-500 dark:text-zinc-400 border border-gray-200/60 dark:border-zinc-800/60 text-[10px] font-semibold uppercase tracking-wider">
              33+ FREE CALCULATORS &bull; MORE COMING SOON
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-none max-w-4xl mx-auto">
            Free Online Calculators
            <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              Solved Instantly
            </span>
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-zinc-400 max-w-4xl mx-auto leading-relaxed">
            CalcHub provides fast, free, and accurate online calculators for finance, health, education, mathematics, and everyday life. Designed with simplicity, speed, and privacy in mind—no sign-up required.
          </p>
        </div>
      </section>

      {/* 2. RECENT CALCULATIONS SECTION */}
      {recentCalculators.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-gray-100 dark:border-zinc-900">
          <div className="flex items-center justify-between pb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
                <History size={16} />
              </div>
              <div>
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-gray-900 dark:text-white">Recent Calculations</h2>
                <p className="text-[10px] text-gray-400">Calculators you recently visited</p>
              </div>
            </div>
            <button
              onClick={clearRecents}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-gray-400 hover:text-rose-500 dark:text-zinc-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg transition-colors cursor-pointer"
              title="Clear recent history"
            >
              <Trash2 size={12} /> Clear History
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {recentCalculators.map(calc => (
              <Link
                key={calc.id}
                to={calc.path}
                className="group p-3.5 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 hover:border-emerald-500/30 dark:hover:border-emerald-500/20 rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="text-[9px] uppercase font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full tracking-wider">
                      {calc.category}
                    </span>
                    <Clock size={11} className="text-gray-300 dark:text-zinc-600" />
                  </div>
                  <span className="text-xs font-bold text-gray-800 dark:text-zinc-100 group-hover:text-emerald-500 transition-colors block line-clamp-1">
                    {calc.title}
                  </span>
                  <p className="text-[10px] text-gray-400 line-clamp-2 mt-1 leading-relaxed">
                    {calc.description}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-3 group-hover:translate-x-1 transition-transform">
                  Calculate <ArrowRight size={10} />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 3. POPULAR & TRENDING METRICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-gray-100 dark:border-zinc-950 pb-12">
        {/* Popular List */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-gray-900 dark:text-white pb-1 border-b dark:border-zinc-900">
            <div className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/20 text-amber-500">
              <Star size={16} className="fill-amber-500" />
            </div>
            <h2 className="text-sm uppercase tracking-wider font-extrabold text-gray-500 dark:text-zinc-400">Popular Tools</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {popularCalculators.map(calc => (
              <Link key={calc.id} to={calc.path} className="group p-4 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 hover:border-emerald-500/20 dark:hover:border-emerald-500/10 rounded-2xl hover:shadow-lg hover:shadow-slate-100/50 dark:hover:shadow-none transition-all flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-800 dark:text-zinc-200 group-hover:text-emerald-500 transition-colors block">{calc.title}</span>
                  <p className="text-[10px] text-gray-400 line-clamp-2 mt-1 leading-relaxed">{calc.description}</p>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-semibold mt-3 group-hover:translate-x-1 transition-transform">
                  Solve <ArrowRight size={10} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Trending List */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-gray-900 dark:text-white pb-1 border-b dark:border-zinc-900">
            <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500">
              <TrendingUp size={16} />
            </div>
            <h2 className="text-sm uppercase tracking-wider font-extrabold text-gray-500 dark:text-zinc-400">Trending Now</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {trendingCalculators.map(calc => (
              <Link key={calc.id} to={calc.path} className="group p-4 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 hover:border-emerald-500/20 dark:hover:border-emerald-500/10 rounded-2xl hover:shadow-lg hover:shadow-slate-100/50 dark:hover:shadow-none transition-all flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-800 dark:text-zinc-200 group-hover:text-emerald-500 transition-colors block">{calc.title}</span>
                  <p className="text-[10px] text-gray-400 line-clamp-2 mt-1 leading-relaxed">{calc.description}</p>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-semibold mt-3 group-hover:translate-x-1 transition-transform">
                  Solve <ArrowRight size={10} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MULTI-CATEGORY GRID SECTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">Interactive Calculation Categories</h2>
          <p className="text-xs text-gray-400 dark:text-zinc-500 max-w-lg mx-auto">Click any category icon to filter, or browse the complete set of standard calculators.</p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b dark:border-zinc-900 pb-5">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${activeCategory === null ? 'bg-gray-900 dark:bg-zinc-100 text-white dark:text-zinc-950 shadow-md' : 'bg-white dark:bg-zinc-900 text-gray-600 dark:text-zinc-400 hover:bg-gray-100'}`}
          >
            All Categories
          </button>
          {CATEGORIES.map(cat => {
            const CatIcon = iconMapping[cat.icon];
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 ${activeCategory === cat.id ? 'bg-emerald-500 text-white shadow-md' : 'bg-white dark:bg-zinc-900 text-gray-600 dark:text-zinc-400 hover:bg-gray-100'}`}
              >
                {CatIcon && <CatIcon size={12} />}
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic Category Panels rendering */}
        <div className="space-y-12">
          {CATEGORIES.filter(cat => activeCategory === null || activeCategory === cat.id).map(category => {
            const childCalcs = calculatorsList.filter(c => c.category === category.id);
            const CatIcon = iconMapping[category.icon];

            return (
              <div key={category.id} className="space-y-4">
                <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                  {CatIcon && (
                    <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 shadow-sm border border-emerald-100/20">
                      <CatIcon size={18} />
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-extrabold tracking-tight">{category.label}</h3>
                    <p className="text-[11px] text-gray-400 leading-normal">{category.desc}</p>
                  </div>
                </div>

                {/* Grid list children */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {childCalcs.map(calc => (
                    <Link
                      key={calc.id}
                      to={calc.path}
                      className="group p-4 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 hover:border-emerald-500/20 dark:hover:border-emerald-500/10 rounded-2xl hover:shadow-md transition-all flex justify-between gap-3 items-start"
                    >
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-gray-800 dark:text-zinc-200 group-hover:text-emerald-500 transition-colors block">{calc.title}</span>
                        <p className="text-[10px] text-gray-400 leading-relaxed line-clamp-2">{calc.description}</p>
                      </div>
                      <div className="shrink-0 p-1.5 rounded-lg bg-slate-50 dark:bg-zinc-850 transition-colors group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/20 group-hover:text-emerald-500 text-gray-400">
                        <ArrowRight size={12} />
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
