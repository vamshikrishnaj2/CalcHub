import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, Sparkles } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'free',
    question: 'Are these calculators free to use?',
    answer: 'Yes, 100% free! All tools on CalcHub are completely free with unlimited usage. There are no hidden fees, subscriptions, premium tiers, or limits on how many calculations you can perform.',
  },
  {
    id: 'accuracy',
    question: 'How accurate are the results?',
    answer: 'Our calculators rely on standardized mathematical, scientific, and financial equations verified against industry benchmarks. For financial tools like Loan EMI, SIP, and Compound Interest, formulas match standard banking algorithms.',
  },
  {
    id: 'signup',
    question: 'Do I need to sign up or create an account?',
    answer: 'No registration or login is required. You can use every tool instantly right from your browser without creating an account or providing email details.',
  },
  {
    id: 'privacy',
    question: 'Is my personal or financial data stored?',
    answer: 'No. All calculations are executed completely client-side inside your web browser. Your numerical inputs, financial values, and data never leave your device or get saved on external servers.',
  },
  {
    id: 'mobile',
    question: 'Can I use CalcHub on my mobile phone or tablet?',
    answer: 'Absolutely. CalcHub is designed desktop-first and mobile-responsive. The interface adjusts smoothly to all screen sizes, touch targets, and dark or light display modes.',
  },
  {
    id: 'currency',
    question: 'What currency is used for financial calculations?',
    answer: 'All financial calculators default to Indian Rupees (₹) formatted according to standard financial notation, making it simple and intuitive to compute loans, investments, and taxes.',
  }
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>('free'); // default first open

  const toggle = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 border-t border-slate-200/70 dark:border-zinc-900">
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold border border-emerald-200/60 dark:border-emerald-800/40 shadow-2xs">
          <HelpCircle size={13} />
          <span>Help & Clarity</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 max-w-lg mx-auto">
          Everything you need to know about using CalcHub's calculators, privacy practices, and accuracy.
        </p>
      </div>

      {/* Accordion Disclosure list */}
      <div className="space-y-3.5">
        {FAQ_DATA.map(item => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-white dark:bg-zinc-900 border-emerald-500/40 dark:border-emerald-500/30 shadow-md shadow-emerald-500/5'
                  : 'bg-white dark:bg-zinc-900 border-slate-200/80 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 shadow-2xs'
              }`}
            >
              <button
                onClick={() => toggle(item.id)}
                type="button"
                aria-expanded={isOpen}
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-2xl cursor-pointer"
              >
                <span className="text-sm font-extrabold text-slate-900 dark:text-zinc-100 pr-2">
                  {item.question}
                </span>
                <div
                  className={`p-1.5 rounded-lg shrink-0 transition-transform duration-200 ${
                    isOpen
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rotate-180'
                      : 'bg-slate-100 dark:bg-zinc-800 text-slate-400'
                  }`}
                >
                  <ChevronDown size={16} />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-slate-600 dark:text-zinc-400 leading-relaxed border-t border-slate-100 dark:border-zinc-850/60">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom info banner */}
      <div className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500 text-white shrink-0 shadow-xs">
            <ShieldCheck size={18} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-zinc-100">Private, Fast & Reliable</h4>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400">No trackers, no server logging, pure instant client-side math.</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
          <Sparkles size={12} />
          <span>Always Up to Date</span>
        </div>
      </div>
    </section>
  );
}
