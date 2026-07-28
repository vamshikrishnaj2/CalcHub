import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Share2, Heart, ArrowLeft, BookOpen, HelpCircle, Sparkles, Check, Copy } from 'lucide-react';
import { calculatorsList } from '../data/calculatorsList';
import { SEOManager } from './SEOManager';

// Core imports
import {
  EMICalculator,
  SIPCalculator,
  CompoundInterestCalculator,
  MortgageCalculator,
  LoanCalculator,
  IncomeTaxCalculator,
  GSTCalculator,
  CurrencyConverter,
  RetirementCalculator
} from './calculators/FinancialCalculators';

import {
  BMICalculator,
  CalorieCalculator,
  WaterIntakeCalculator,
  IdealWeightCalculator,
  PregnancyDueDateCalculator,
  BodyFatCalculator,
  BMRCalculator
} from './calculators/HealthCalculators';

import {
  ScientificCalculator,
  PercentageCalculator,
  FractionCalculator,
  RatioCalculator,
  AverageCalculator,
  ProfitAndLossCalculator,
  DiscountCalculator
} from './calculators/MathCalculators';

import {
  AgeCalculator,
  DateDifferenceCalculator,
  CountdownTimer,
  TimeDurationCalculator
} from './calculators/DateTimeCalculators';

import {
  LengthConverter,
  WeightConverter,
  TemperatureConverter,
  SpeedConverter,
  AreaConverter,
  VolumeConverter
} from './calculators/UnitConverters';

// Map calculator IDs directly to their interactive JSX components
const calculatorWidgets: { [key: string]: React.ComponentType } = {
  'emi': EMICalculator,
  'sip': SIPCalculator,
  'compound-interest': CompoundInterestCalculator,
  'mortgage': MortgageCalculator,
  'loan': LoanCalculator,
  'income-tax': IncomeTaxCalculator,
  'gst': GSTCalculator,
  'currency': CurrencyConverter,
  'retirement': RetirementCalculator,

  'bmi': BMICalculator,
  'calorie': CalorieCalculator,
  'water-intake': WaterIntakeCalculator,
  'ideal-weight': IdealWeightCalculator,
  'pregnancy': PregnancyDueDateCalculator,
  'body-fat': BodyFatCalculator,
  'bmr': BMRCalculator,

  'scientific': ScientificCalculator,
  'percentage': PercentageCalculator,
  'fraction': FractionCalculator,
  'ratio': RatioCalculator,
  'average': AverageCalculator,
  'profit-loss': ProfitAndLossCalculator,
  'discount': DiscountCalculator,

  'age': AgeCalculator,
  'date-difference': DateDifferenceCalculator,
  'countdown': CountdownTimer,
  'time-duration': TimeDurationCalculator,

  'length': LengthConverter,
  'weight': WeightConverter,
  'temperature': TemperatureConverter,
  'speed': SpeedConverter,
  'area': AreaConverter,
  'volume': VolumeConverter
};

export default function CalculatorLayout() {
  const { calculatorId } = useParams<{ calculatorId: string }>();
  const navigate = useNavigate();
  const [copiedLink, setCopiedLink] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  // Find info
  const calcInfo = calculatorsList.find(c => c.id === calculatorId);

  useEffect(() => {
    if (calcInfo) {
      // Dynamic tab titles for client SEO index mockups
      document.title = calcInfo.metaTitle;

      // Sync Favorites
      const favorites = JSON.parse(localStorage.getItem('favCalculators') || '[]');
      setIsFavorited(favorites.includes(calcInfo.id));

      // Sync Recents (FIFO) - prevent duplicates, limit to 6
      let recents = JSON.parse(localStorage.getItem('recentCalculators') || '[]');
      recents = recents.filter((id: string) => id !== calcInfo.id);
      recents.unshift(calcInfo.id);
      if (recents.length > 6) recents.pop();
      localStorage.setItem('recentCalculators', JSON.stringify(recents));
      window.dispatchEvent(new Event('storage'));

      // Trigger standard visual page-top focus
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [calcInfo]);

  if (!calcInfo) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-zinc-100">Calculator Not Found</h2>
        <p className="text-gray-500 mt-2">The selected calculation utility does not exist or has been relocated.</p>
        <Link to="/" className="inline-flex items-center gap-1.5 mt-6 px-4 py-2 bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-sm">
          <ArrowLeft size={14} /> Back to Hub
        </Link>
      </div>
    );
  }

  const Widget = calculatorWidgets[calcInfo.id];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleToggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem('favCalculators') || '[]');
    if (favorites.includes(calcInfo.id)) {
      favorites = favorites.filter((id: string) => id !== calcInfo.id);
      setIsFavorited(false);
    } else {
      favorites.push(calcInfo.id);
      setIsFavorited(true);
    }
    localStorage.setItem('favCalculators', JSON.stringify(favorites));
    // Dispatch standard storage event to trigger Navbar component refreshes
    window.dispatchEvent(new Event('storage'));
  };

  // Sidebar related list
  const relatedCalcs = calculatorsList
    .filter(c => c.category === calcInfo.category && c.id !== calcInfo.id)
    .slice(0, 5);

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: calcInfo.category.charAt(0).toUpperCase() + calcInfo.category.slice(1), path: `/#/${calcInfo.category}` },
    { name: calcInfo.title, path: calcInfo.path }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col pt-20">
      <SEOManager
        title={calcInfo.metaTitle || `${calcInfo.title}`}
        description={calcInfo.metaDescription || calcInfo.description}
        canonicalPath={calcInfo.path}
        calculatorName={calcInfo.title}
        categoryName={calcInfo.category}
        breadcrumbs={breadcrumbs}
        faqs={calcInfo.faqs}
      />
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-grow">
        {/* Breadcrumb bread crumbs */}
        <nav className="flex text-xs space-x-2 text-gray-400 font-medium mb-4">
          <Link to="/" className="hover:text-emerald-500 transition-colors">Home</Link>
          <span>/</span>
          <span className="capitalize">{calcInfo.category}</span>
          <span>/</span>
          <span className="text-gray-600 dark:text-zinc-400 font-semibold">{calcInfo.title}</span>
        </nav>

        {/* Header container */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-5 border-b border-gray-100 dark:border-zinc-800 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-4xl">{calcInfo.title}</h1>
            <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1 max-w-2xl">{calcInfo.description}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={handleToggleFavorite} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold shadow-sm active:scale-95 transition-all ${isFavorited ? 'border-amber-200 bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:border-amber-900/30' : 'border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-600 dark:text-zinc-300'}`}>
              <Heart size={14} className={isFavorited ? 'fill-amber-500 stroke-amber-500' : ''} />
              {isFavorited ? 'Saved in Favs' : 'Add to Favs'}
            </button>
            <button onClick={handleCopyLink} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-600 dark:text-zinc-300 text-xs font-semibold shadow-sm active:scale-95 transition-all">
              {copiedLink ? <Check size={14} className="text-emerald-500" /> : <Copy size={13} />}
              {copiedLink ? 'Copied' : 'Copy link'}
            </button>
          </div>
        </div>

        {/* Content layout bento grid spacing */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Work section */}
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-white dark:bg-zinc-900 shadow-sm border border-gray-100 dark:border-zinc-800 rounded-3xl p-6 sm:p-8">
              {Widget ? <Widget /> : <div className="text-sm">Calculator is not registered.</div>}
            </div>

            {/* Formula section (SEO structured) */}
            <section className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-2.5 text-gray-900 dark:text-white">
                <div className="p-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400">
                  <BookOpen size={18} />
                </div>
                <h2 className="text-xl font-bold tracking-tight">Calculation Formula & Mechanics</h2>
              </div>
              <div className="p-4 bg-purple-50/30 dark:bg-purple-950/10 rounded-2xl border border-purple-50/50 dark:border-purple-900/10">
                <span className="text-[10px] text-purple-600 dark:text-purple-400 font-mono block mb-1">Standard Equation Model</span>
                <code className="text-md sm:text-lg font-black font-mono text-purple-950 dark:text-purple-300">{calcInfo.formula.equation}</code>
                <p className="text-xs text-purple-900/70 dark:text-purple-400/70 mt-2 font-sans leading-relaxed">{calcInfo.formula.description}</p>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-zinc-200">How to calculate step-by-step:</h3>
                <ol className="space-y-3 pl-4 list-decimal text-xs text-gray-600 dark:text-zinc-400">
                  {calcInfo.formula.steps.map((step, idx) => (
                    <li key={idx} className="leading-relaxed pl-1">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            {/* FAQ section */}
            {calcInfo.faqs && calcInfo.faqs.length > 0 && (
              <section className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-5">
                <div className="flex items-center gap-2.5 text-gray-900 dark:text-white">
                  <div className="p-1.5 rounded-xl bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400">
                    <HelpCircle size={18} />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight">Frequently Asked Questions</h2>
                </div>
                <div className="space-y-4">
                  {calcInfo.faqs.map(faq => (
                    <div key={faq.id} className="p-4 rounded-2xl bg-gray-50/50 dark:bg-zinc-850/20 border border-gray-100 dark:border-zinc-800/80">
                      <h3 className="text-sm font-bold text-gray-800 dark:text-zinc-200 mb-1">{faq.question}</h3>
                      <p className="text-xs text-gray-600 dark:text-zinc-400 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Quick link related tools (Sidebar) */}
          <aside className="space-y-6">
            <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-5 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-gray-800 dark:text-zinc-200 border-b border-gray-100 dark:border-zinc-800 pb-3">Related Tools</h3>
              {relatedCalcs.length > 0 ? (
                <div className="space-y-2.5">
                  {relatedCalcs.map(item => (
                    <Link key={item.id} to={item.path} className="group block p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-850 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-zinc-800">
                      <span className="text-xs font-bold text-gray-800 dark:text-zinc-200 group-hover:text-emerald-500 transition-colors block">{item.title}</span>
                      <span className="text-[10px] text-gray-400 group-hover:text-gray-500 transition-colors block line-clamp-1 mt-0.5">{item.description}</span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-gray-400 italic">No alternative tools inside this group.</div>
              )}
            </div>

            {/* Micro banner design */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-3xl p-5 space-y-3 shadow-inner">
              <div className="inline-flex rounded-full bg-white/20 p-1">
                <Sparkles size={16} />
              </div>
              <h4 className="font-bold text-sm tracking-tight">Need custom ratios?</h4>
              <p className="text-[11px] leading-relaxed opacity-90">All 33 of our high-speed mathematical calculators are tailored following international standard accounting & science frameworks.</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
