import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Info, FileText, MessageSquare, Lock, Zap, AlertCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-zinc-950 border-t border-gray-100 dark:border-zinc-900 mt-auto transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Logo / Brand Description */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-black text-md">
                %
              </div>
              <span className="font-extrabold text-sm text-gray-900 dark:text-white tracking-tight">
                CalcHub
              </span>
            </Link>
            <p className="text-xs text-gray-400 dark:text-zinc-500 leading-relaxed max-w-sm">
              CalcHub provides fast, free, and accurate online calculators for finance, health, education, mathematics, and everyday life.
              <br className="hidden sm:inline" /> Designed with simplicity, speed, and privacy in mind. No sign-up required.
            </p>
            <div className="flex flex-wrap gap-3.5 text-[11px] text-gray-500 font-semibold">
              <span className="flex items-center gap-1"><Lock size={12} className="text-emerald-500" /> Secure HTTPS</span>
              <span className="flex items-center gap-1"><ShieldCheck size={12} className="text-emerald-500" /> Privacy Focused</span>
              <span className="flex items-center gap-1"><Zap size={12} className="text-emerald-500" /> Fast Performance</span>
            </div>
          </div>

          {/* Group 1: Finance */}
          <div>
            <h4 className="text-xs uppercase font-extrabold text-gray-900 dark:text-white tracking-wider mb-2.5">Finance</h4>
            <div className="space-y-2 text-xs">
              <Link to="/financial/emi" className="block text-gray-400 hover:text-emerald-500 transition-colors">EMI Calculator</Link>
              <Link to="/financial/sip" className="block text-gray-400 hover:text-emerald-500 transition-colors">SIP Calculator</Link>
              <Link to="/financial/compound-interest" className="block text-gray-400 hover:text-emerald-500 transition-colors">Compound Interest Calculator</Link>
              <Link to="/financial/mortgage" className="block text-gray-400 hover:text-emerald-500 transition-colors">Mortgage Calculator</Link>
              <Link to="/financial/income-tax" className="block text-gray-400 hover:text-emerald-500 transition-colors">Income Tax Calculator</Link>
            </div>
          </div>

          {/* Group 2: Health & Education */}
          <div>
            <h4 className="text-xs uppercase font-extrabold text-gray-900 dark:text-white tracking-wider mb-2.5">Health & Education</h4>
            <div className="space-y-2 text-xs">
              <Link to="/health/bmi" className="block text-gray-400 hover:text-emerald-500 transition-colors">BMI Calculator</Link>
              <Link to="/health/calorie" className="block text-gray-400 hover:text-emerald-500 transition-colors">Calorie Calculator</Link>
              <Link to="/math/scientific" className="block text-gray-400 hover:text-emerald-500 transition-colors">Scientific Calculator</Link>
              <Link to="/math/percentage" className="block text-gray-400 hover:text-emerald-500 transition-colors">Percentage Calculator</Link>
              <Link to="/math/discount" className="block text-gray-400 hover:text-emerald-500 transition-colors">Discount Calculator</Link>
            </div>
          </div>

          {/* Group 3: Converters & Date Tools */}
          <div>
            <h4 className="text-xs uppercase font-extrabold text-gray-900 dark:text-white tracking-wider mb-2.5">Converters & Date Tools</h4>
            <div className="space-y-2 text-xs">
              <Link to="/datetime/age" className="block text-gray-400 hover:text-emerald-500 transition-colors">Age Calculator</Link>
              <Link to="/datetime/date-difference" className="block text-gray-400 hover:text-emerald-500 transition-colors">Date Calculator</Link>
              <Link to="/unit/length" className="block text-gray-400 hover:text-emerald-500 transition-colors">Length Converter</Link>
              <Link to="/unit/weight" className="block text-gray-400 hover:text-emerald-500 transition-colors">Weight Converter</Link>
              <Link to="/unit/temperature" className="block text-gray-400 hover:text-emerald-500 transition-colors">Temperature Converter</Link>
            </div>
          </div>

        </div>

        {/* Legal bar */}
        <div className="mt-8 pt-8 border-t border-gray-100 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center text-[11px] text-gray-500 gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div>&copy; {new Date().getFullYear()} CalcHub &bull; v1.0</div>
            <p className="text-[10px] text-gray-400 dark:text-zinc-600">
              The calculators on CalcHub are provided for informational purposes only. Please verify important results independently before making financial, medical, legal, tax, or other critical decisions.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 font-semibold text-gray-400 dark:text-zinc-500 shrink-0">
            <Link to="/about" className="flex items-center gap-1 hover:text-emerald-500 transition-colors">
              <Info size={11} /> About
            </Link>
            <Link to="/about?tab=privacy" className="flex items-center gap-1 hover:text-emerald-500 transition-colors">
              <ShieldCheck size={11} /> Privacy Policy
            </Link>
            <Link to="/about?tab=terms" className="flex items-center gap-1 hover:text-emerald-500 transition-colors">
              <FileText size={11} /> Terms of Use
            </Link>
            <Link to="/about?tab=disclaimer" className="flex items-center gap-1 hover:text-emerald-500 transition-colors">
              <AlertCircle size={11} /> Disclaimer
            </Link>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSe1acGygNLo0NStUtp1lCeBowiq0LJQ5FyDHvB__56HIlWaLw/viewform?usp=dialog"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-emerald-500 transition-colors"
            >
              <MessageSquare size={11} /> Feedback
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

