import React, { useState, useEffect } from 'react';
import CopyButton from '../CopyButton';

export const CURRENCIES = [
  { code: 'INR', symbol: '₹', locale: 'en-IN', name: 'INR (₹ Rupees)' },
  { code: 'USD', symbol: '$', locale: 'en-US', name: 'USD ($ Dollar)' },
  { code: 'EUR', symbol: '€', locale: 'de-DE', name: 'EUR (€ Euro)' },
  { code: 'GBP', symbol: '£', locale: 'en-GB', name: 'GBP (£ Pound)' },
  { code: 'CAD', symbol: 'C$', locale: 'en-CA', name: 'CAD (C$ Dollar)' },
  { code: 'AUD', symbol: 'A$', locale: 'en-AU', name: 'AUD (A$ Dollar)' },
  { code: 'AED', symbol: 'AED', locale: 'ar-AE', name: 'AED (Dirham)' },
  { code: 'JPY', symbol: '¥', locale: 'ja-JP', name: 'JPY (¥ Yen)' },
];

export const formatCurrency = (val: number, currencyCode = 'INR') => {
  const curr = CURRENCIES.find(c => c.code === currencyCode) || CURRENCIES[0];
  try {
    return new Intl.NumberFormat(curr.locale, {
      style: 'currency',
      currency: curr.code,
      maximumFractionDigits: 0
    }).format(val);
  } catch {
    return `${curr.symbol}${Math.round(val).toLocaleString()}`;
  }
};

// --- 1. EMI CALCULATOR ---
export function EMICalculator() {
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(15);

  const n = years * 12;
  const r = (rate / 12) / 100;
  const emi = r === 0 ? principal / n : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - principal;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-gray-50 dark:bg-zinc-900 p-5 rounded-2xl border border-gray-100 dark:border-zinc-800">
          <h3 className="font-semibold text-gray-800 dark:text-zinc-200">Term Settings</h3>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Loan Amount (₹)</label>
            <input type="number" value={principal} onChange={e => setPrincipal(Math.max(0, Number(e.target.value)))} className="w-full relative px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
            <input type="range" min="10000" max="10000000" step="50000" value={principal} onChange={e => setPrincipal(Number(e.target.value))} className="w-full mt-2 accent-emerald-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Interest Rate (% per annum)</label>
            <input type="number" step="0.1" value={rate} onChange={e => setRate(Math.max(0, Number(e.target.value)))} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
            <input type="range" min="1" max="25" step="0.1" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full mt-2 accent-emerald-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Loan Tenure (Years)</label>
            <input type="number" value={years} onChange={e => setYears(Math.max(1, Number(e.target.value)))} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
            <input type="range" min="1" max="30" step="1" value={years} onChange={e => setYears(Number(e.target.value))} className="w-full mt-2 accent-emerald-500" />
          </div>
        </div>

        <div className="flex flex-col justify-between bg-emerald-50/50 dark:bg-emerald-950/20 p-6 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/30">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider">Estimated Monthly EMI</span>
              <CopyButton value={formatCurrency(emi)} />
            </div>
            <div className="text-4xl font-extrabold text-emerald-900 dark:text-emerald-300 mt-2">{formatCurrency(emi)}</div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-emerald-100/30 dark:border-emerald-800/20">
            <div>
              <span className="text-xs text-gray-500 dark:text-zinc-400">Total Principal</span>
              <div className="text-lg font-bold text-gray-800 dark:text-zinc-100">{formatCurrency(principal)}</div>
            </div>
            <div>
              <span className="text-xs text-gray-500 dark:text-zinc-400">Total Interest Payable</span>
              <div className="text-lg font-bold text-gray-800 dark:text-zinc-100">{formatCurrency(totalInterest)}</div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-white dark:bg-zinc-800 rounded-xl border border-emerald-100 dark:border-zinc-700/50">
            <span className="text-xs text-gray-500 dark:text-zinc-400 block">Cumulative Payment (Principal + Interest)</span>
            <div className="text-xl font-extrabold text-gray-900 dark:text-white">{formatCurrency(totalPayment)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 2. SIP CALCULATOR ---
export function SIPCalculator() {
  const [monthlyInput, setMonthlyInput] = useState(5000);
  const [returns, setReturns] = useState(12);
  const [years, setYears] = useState(10);

  const P = monthlyInput;
  const i = (returns / 12) / 100;
  const n = years * 12;

  const totalValue = i === 0 ? P * n : P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  const investedAmount = P * n;
  const estReturns = totalValue - investedAmount;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-gray-50 dark:bg-zinc-900 p-5 rounded-2xl border border-gray-100 dark:border-zinc-800">
          <h3 className="font-semibold text-gray-800 dark:text-zinc-200">SIP Allocations</h3>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Monthly Recurring Savings (₹)</label>
            <input type="number" value={monthlyInput} onChange={e => setMonthlyInput(Math.max(0, Number(e.target.value)))} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
            <input type="range" min="500" max="100000" step="500" value={monthlyInput} onChange={e => setMonthlyInput(Number(e.target.value))} className="w-full mt-2 accent-emerald-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Expected Return Rate (% per year)</label>
            <input type="number" step="0.5" value={returns} onChange={e => setReturns(Math.max(0, Number(e.target.value)))} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
            <input type="range" min="1" max="30" step="0.5" value={returns} onChange={e => setReturns(Number(e.target.value))} className="w-full mt-2 accent-emerald-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Investment Horizon (Years)</label>
            <input type="number" value={years} onChange={e => setYears(Math.max(1, Number(e.target.value)))} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
            <input type="range" min="1" max="40" step="1" value={years} onChange={e => setYears(Number(e.target.value))} className="w-full mt-2 accent-emerald-500" />
          </div>
        </div>

        <div className="flex flex-col justify-between bg-emerald-50/50 dark:bg-emerald-950/20 p-6 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/30">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider">Maturity Future Value</span>
              <CopyButton value={formatCurrency(totalValue)} />
            </div>
            <div className="text-4xl font-extrabold text-emerald-900 dark:text-emerald-300 mt-2">{formatCurrency(totalValue)}</div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-emerald-100/30 dark:border-emerald-800/20">
            <div>
              <span className="text-xs text-gray-500 dark:text-zinc-400">Total Money Saved</span>
              <div className="text-lg font-bold text-gray-800 dark:text-zinc-100">{formatCurrency(investedAmount)}</div>
            </div>
            <div>
              <span className="text-xs text-gray-500 dark:text-zinc-400">Wealth Growth Returns</span>
              <div className="text-lg font-bold text-gray-800 dark:text-zinc-100">{formatCurrency(estReturns)}</div>
            </div>
          </div>
          <div className="mt-4 p-4 rounded-xl bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700/50 flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-zinc-400">Ratio (Savings vs Yield)</span>
            <div className="h-2.5 w-32 bg-gray-100 dark:bg-zinc-700 rounded-full overflow-hidden flex">
              <div className="bg-gray-400 dark:bg-zinc-500 h-full" style={{ width: `${(investedAmount / totalValue) * 100}%` }}></div>
              <div className="bg-emerald-500 h-full flex-grow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 3. COMPOUND INTEREST CALCULATOR ---
export function CompoundInterestCalculator() {
  const [initPrincipal, setInitPrincipal] = useState(100000);
  const [rate, setRate] = useState(7.5);
  const [years, setYears] = useState(8);
  const [frequency, setFrequency] = useState(12);

  const r = rate / 100;
  const n = frequency;
  const t = years;
  const finalValue = initPrincipal * Math.pow(1 + r/n, n * t);
  const interestEarned = finalValue - initPrincipal;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-gray-50 dark:bg-zinc-900 p-5 rounded-2xl border border-gray-100 dark:border-zinc-800">
          <h3 className="font-semibold text-gray-800 dark:text-zinc-200">Interest Setup</h3>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Starting Principal (₹)</label>
            <input type="number" value={initPrincipal} onChange={e => setInitPrincipal(Math.max(0, Number(e.target.value)))} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Nominal Interest Rate (% per annum)</label>
            <input type="number" step="0.1" value={rate} onChange={e => setRate(Math.max(0, Number(e.target.value)))} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Maturity Length (Years)</label>
            <input type="number" value={years} onChange={e => setYears(Math.max(1, Number(e.target.value)))} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Compounding Frequency</label>
            <select value={frequency} onChange={e => setFrequency(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500">
              <option value="1">Annually (1 / year)</option>
              <option value="2">Semi-Annually (2 / year)</option>
              <option value="4">Quarterly (4 / year)</option>
              <option value="12">Monthly (12 / year)</option>
              <option value="365">Daily (365 / year)</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col justify-between bg-emerald-50/50 dark:bg-emerald-950/20 p-6 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/30">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider">Compounded Future Balance</span>
              <CopyButton value={formatCurrency(finalValue)} />
            </div>
            <div className="text-4xl font-extrabold text-emerald-900 dark:text-emerald-300 mt-2">{formatCurrency(finalValue)}</div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-emerald-100/30 dark:border-emerald-800/20">
            <div>
              <span className="text-xs text-gray-500 dark:text-zinc-400">Total Deposited</span>
              <div className="text-lg font-bold text-gray-800 dark:text-zinc-100">{formatCurrency(initPrincipal)}</div>
            </div>
            <div>
              <span className="text-xs text-gray-500 dark:text-zinc-400">Accumulated Interest</span>
              <div className="text-lg font-bold text-gray-800 dark:text-zinc-100">{formatCurrency(interestEarned)}</div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-white dark:bg-zinc-800/80 rounded-xl border border-gray-100 dark:border-zinc-700/50 text-xs text-gray-500 dark:text-zinc-400 leading-relaxed">
            Over a span of <strong>{years} years</strong>, your initial deposit of <strong>{formatCurrency(initPrincipal)}</strong> generates <strong>{formatCurrency(interestEarned)}</strong> in interest due to the power of compounding <strong>{n === 12 ? 'monthly' : n === 365 ? 'daily' : n === 4 ? 'quarterly' : 'annually'}</strong>.
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 4. MORTGAGE CALCULATOR ---
export function MortgageCalculator() {
  const [homeValue, setHomeValue] = useState(3500000);
  const [downPayment, setDownPayment] = useState(700000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [term, setTerm] = useState(20);
  const [propertyTax, setPropertyTax] = useState(1.2);
  const [insurance, setInsurance] = useState(0.8);

  const principal = Math.max(0, homeValue - downPayment);
  const r = (interestRate / 12) / 100;
  const n = term * 12;

  const monthlyPI = r === 0 ? principal / n : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const monthlyTax = (homeValue * (propertyTax / 100)) / 12;
  const monthlyInsurance = (homeValue * (insurance / 100)) / 12;
  const grossMonthlyPITI = monthlyPI + monthlyTax + monthlyInsurance;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-gray-50 dark:bg-zinc-900 p-5 rounded-2xl border border-gray-100 dark:border-zinc-800">
          <h3 className="font-semibold text-gray-800 dark:text-zinc-200">Mortgage Parameters</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Property Price (₹)</label>
              <input type="number" value={homeValue} onChange={e => setHomeValue(Math.max(0, Number(e.target.value)))} className="w-full px-2 py-1.5 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-800 text-sm dark:text-zinc-100" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Down Payment (₹)</label>
              <input type="number" value={downPayment} onChange={e => setDownPayment(Math.max(0, Number(e.target.value)))} className="w-full px-2 py-1.5 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-800 text-sm dark:text-zinc-100" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Interest Rate (%)</label>
              <input type="number" step="0.1" value={interestRate} onChange={e => setInterestRate(Math.max(0, Number(e.target.value)))} className="w-full px-2 py-1.5 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-800 text-sm dark:text-zinc-100" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Term (Years)</label>
              <select value={term} onChange={e => setTerm(Number(e.target.value))} className="w-full px-2 py-1.5 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-800 text-sm dark:text-zinc-100">
                <option value="15">15 Years (Fixed)</option>
                <option value="20">20 Years (Fixed)</option>
                <option value="30">30 Years (Fixed)</option>
                <option value="10">10 Years (Fixed)</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Property Tax (% / year)</label>
              <input type="number" step="0.05" value={propertyTax} onChange={e => setPropertyTax(Math.max(0, Number(e.target.value)))} className="w-full px-2 py-1.5 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-800 text-sm dark:text-zinc-100" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Insurance (% / year)</label>
              <input type="number" step="0.05" value={insurance} onChange={e => setInsurance(Math.max(0, Number(e.target.value)))} className="w-full px-2 py-1.5 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-800 text-sm dark:text-zinc-100" />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between bg-emerald-50/50 dark:bg-emerald-950/20 p-6 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/30">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider">Estimated Monthly Payment</span>
              <CopyButton value={formatCurrency(grossMonthlyPITI)} />
            </div>
            <div className="text-4xl font-extrabold text-emerald-900 dark:text-emerald-300 mt-2">{formatCurrency(grossMonthlyPITI)}</div>
          </div>
          <div className="space-y-2 mt-6 pt-6 border-t border-emerald-100/30 dark:border-emerald-800/20">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500 dark:text-zinc-400">Principal & Interest (P&I)</span>
              <span className="font-semibold text-gray-800 dark:text-zinc-200">{formatCurrency(monthlyPI)}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500 dark:text-zinc-400">Property Taxes</span>
              <span className="font-semibold text-gray-800 dark:text-zinc-200">{formatCurrency(monthlyTax)}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500 dark:text-zinc-400">Homeowner's Insurance</span>
              <span className="font-semibold text-gray-800 dark:text-zinc-200">{formatCurrency(monthlyInsurance)}</span>
            </div>
            <div className="flex justify-between items-center text-xs pt-1 border-t border-gray-100 dark:border-zinc-800">
              <span className="text-gray-500 dark:text-zinc-400">Total Financing Needed</span>
              <span className="font-semibold text-gray-800 dark:text-zinc-200">{formatCurrency(principal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 5. LOAN CALCULATOR ---
export function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(250000);
  const [interest, setInterest] = useState(10.5);
  const [tenure, setTenure] = useState(5);
  const [loanType, setLoanType] = useState('reducing');

  const r = (interest / 12) / 100;
  const n = tenure * 12;

  let monthlyInstallment = 0;
  let totalInterest = 0;

  if (loanType === 'reducing') {
    monthlyInstallment = r === 0 ? loanAmount / n : (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    totalInterest = (monthlyInstallment * n) - loanAmount;
  } else {
    totalInterest = loanAmount * (interest / 100) * tenure;
    monthlyInstallment = (loanAmount + totalInterest) / n;
  }

  const payoutSum = loanAmount + totalInterest;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-gray-50 dark:bg-zinc-900 p-5 rounded-2xl border border-gray-100 dark:border-zinc-800">
          <h3 className="font-semibold text-gray-800 dark:text-zinc-200">Loan Config</h3>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Principal Amount (₹)</label>
            <input type="number" value={loanAmount} onChange={e => setLoanAmount(Math.max(0, Number(e.target.value)))} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Interest (%)</label>
              <input type="number" step="0.1" value={interest} onChange={e => setInterest(Math.max(0, Number(e.target.value)))} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Term (Years)</label>
              <input type="number" value={tenure} onChange={e => setTenure(Math.max(1, Number(e.target.value)))} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Calculation Method</label>
            <div className="flex gap-4 mt-1">
              <label className="flex items-center text-xs text-gray-700 dark:text-zinc-300">
                <input type="radio" value="reducing" checked={loanType === 'reducing'} onChange={() => setLoanType('reducing')} className="mr-1.5 accent-emerald-500" />
                Reducing Balance (Amortized)
              </label>
              <label className="flex items-center text-xs text-gray-700 dark:text-zinc-300">
                <input type="radio" value="flat" checked={loanType === 'flat'} onChange={() => setLoanType('flat')} className="mr-1.5 accent-emerald-500" />
                Flat Simple Interest
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between bg-emerald-50/50 dark:bg-emerald-950/20 p-6 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/30">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider">Estimated Monthly Payment</span>
              <CopyButton value={formatCurrency(monthlyInstallment)} />
            </div>
            <div className="text-4xl font-extrabold text-emerald-900 dark:text-emerald-300 mt-2">{formatCurrency(monthlyInstallment)}</div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-emerald-100/30 dark:border-emerald-800/20">
            <div>
              <span className="text-xs text-gray-500 dark:text-zinc-400">Total Interest Due</span>
              <div className="text-lg font-bold text-gray-800 dark:text-zinc-100">{formatCurrency(totalInterest)}</div>
            </div>
            <div>
              <span className="text-xs text-gray-500 dark:text-zinc-400">Total Lifetime Pay</span>
              <div className="text-lg font-bold text-gray-800 dark:text-zinc-100">{formatCurrency(payoutSum)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 6. INCOME TAX CALCULATOR ---
export function IncomeTaxCalculator() {
  const [income, setIncome] = useState(1200000);
  const [deductions, setDeductions] = useState(150000);

  const taxableIncome = Math.max(0, income - deductions);
  let taxOwed = 0;

  const brackets = [
    { limit: 300000, rate: 0.00 },
    { limit: 600000, rate: 0.05 },
    { limit: 900000, rate: 0.10 },
    { limit: 1200000, rate: 0.15 },
    { limit: 1500000, rate: 0.20 },
    { limit: Infinity, rate: 0.30 }
  ];

  let previousLimit = 0;
  for (const bracket of brackets) {
    if (taxableIncome > bracket.limit) {
      taxOwed += (bracket.limit - previousLimit) * bracket.rate;
      previousLimit = bracket.limit;
    } else {
      taxOwed += (taxableIncome - previousLimit) * bracket.rate;
      break;
    }
  }

  const keyEffectiveRate = taxableIncome > 0 ? (taxOwed / taxableIncome) * 100 : 0;
  const netIncome = income - taxOwed;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-gray-50 dark:bg-zinc-900 p-5 rounded-2xl border border-gray-100 dark:border-zinc-800">
          <h3 className="font-semibold text-gray-800 dark:text-zinc-200">Exemptions & Earnings</h3>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Gross Annual Income (₹)</label>
            <input type="number" step="10000" value={income} onChange={e => setIncome(Math.max(0, Number(e.target.value)))} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Total Standard/Itemized Deductions (₹)</label>
            <input type="number" step="5000" value={deductions} onChange={e => setDeductions(Math.max(0, Number(e.target.value)))} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 text-sm" />
          </div>
        </div>

        <div className="flex flex-col justify-between bg-emerald-50/50 dark:bg-emerald-950/20 p-6 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/30">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider">Estimated Tax Owed</span>
              <CopyButton value={formatCurrency(taxOwed)} />
            </div>
            <div className="text-4xl font-extrabold text-emerald-900 dark:text-emerald-300 mt-2">{formatCurrency(taxOwed)}</div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-emerald-100/30 dark:border-emerald-800/20">
            <div>
              <span className="text-xs text-gray-500 dark:text-zinc-400">Taxable Net Base</span>
              <div className="text-lg font-bold text-gray-800 dark:text-zinc-100">{formatCurrency(taxableIncome)}</div>
            </div>
            <div>
              <span className="text-xs text-gray-500 dark:text-zinc-400">Effective Tax Rate</span>
              <div className="text-lg font-bold text-gray-800 dark:text-zinc-100">{keyEffectiveRate.toFixed(1)}%</div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-white dark:bg-zinc-800 rounded-xl border border-emerald-100 dark:border-zinc-700/50 flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-zinc-400">Net Take-Home Income</span>
            <span className="text-sm font-extrabold text-gray-800 dark:text-zinc-100">{formatCurrency(netIncome)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 7. GST CALCULATOR ---
export function GSTCalculator() {
  const [basePrice, setBasePrice] = useState(1000);
  const [gstRate, setGstRate] = useState(18);
  const [gstMode, setGstMode] = useState('exclusive');

  let gstAmount = 0;
  let finalPrice = 0;
  let netPrice = 0;

  if (gstMode === 'exclusive') {
    gstAmount = (basePrice * gstRate) / 100;
    finalPrice = basePrice + gstAmount;
    netPrice = basePrice;
  } else {
    netPrice = basePrice / (1 + (gstRate / 100));
    gstAmount = basePrice - netPrice;
    finalPrice = basePrice;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-gray-50 dark:bg-zinc-900 p-5 rounded-2xl border border-gray-100 dark:border-zinc-800">
          <h3 className="font-semibold text-gray-800 dark:text-zinc-200">GST Settings</h3>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Base Invoice Value (₹)</label>
            <input type="number" value={basePrice} onChange={e => setBasePrice(Math.max(0, Number(e.target.value)))} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">GST / VAT Rate (%)</label>
            <select value={gstRate} onChange={e => setGstRate(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 text-sm">
              <option value="5">5%</option>
              <option value="12">12%</option>
              <option value="18">18%</option>
              <option value="28">28%</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Tax Application</label>
            <div className="flex gap-4 mt-1">
              <label className="flex items-center text-xs text-gray-700 dark:text-zinc-300">
                <input type="radio" value="exclusive" checked={gstMode === 'exclusive'} onChange={() => setGstMode('exclusive')} className="mr-1.5 accent-emerald-500" />
                Add GST (Exclusive)
              </label>
              <label className="flex items-center text-xs text-gray-700 dark:text-zinc-300">
                <input type="radio" value="inclusive" checked={gstMode === 'inclusive'} onChange={() => setGstMode('inclusive')} className="mr-1.5 accent-emerald-500" />
                Remove GST (Inclusive)
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between bg-emerald-50/50 dark:bg-emerald-950/20 p-6 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/30">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs uppercase font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider">
                {gstMode === 'exclusive' ? 'Total Gross Price (Tax Added)' : 'Original Net Price (Tax Extracted)'}
              </span>
              <CopyButton value={formatCurrency(gstMode === 'exclusive' ? finalPrice : netPrice)} />
            </div>
            <div className="text-4xl font-extrabold text-emerald-900 dark:text-emerald-300 mt-2">
              {formatCurrency(gstMode === 'exclusive' ? finalPrice : netPrice)}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-emerald-100/30 dark:border-emerald-800/20">
            <div>
              <span className="text-xs text-gray-500 dark:text-zinc-400">Isolated GST Amount</span>
              <div className="text-lg font-bold text-gray-800 dark:text-zinc-100">{formatCurrency(gstAmount)}</div>
            </div>
            <div>
              <span className="text-xs text-gray-500 dark:text-zinc-400">Total Invoice Total</span>
              <div className="text-lg font-bold text-gray-800 dark:text-zinc-100">{formatCurrency(finalPrice)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 8. CURRENCY CONVERTER ---
export function CurrencyConverter() {
  const [amount, setAmount] = useState(100);
  const [source, setSource] = useState('USD');
  const [target, setTarget] = useState('INR');

  const rates: { [key: string]: { [key: string]: number } } = {
    USD: { USD: 1, EUR: 0.92, GBP: 0.79, INR: 83.5, JPY: 154.5, CAD: 1.36, AUD: 1.52, AED: 3.67 },
    EUR: { USD: 1.09, EUR: 1, GBP: 0.86, INR: 90.8, JPY: 167.9, CAD: 1.48, AUD: 1.65, AED: 4.00 },
    GBP: { USD: 1.27, EUR: 1.16, GBP: 1, INR: 106.1, JPY: 195.6, CAD: 1.72, AUD: 1.93, AED: 4.66 },
    INR: { USD: 0.012, EUR: 0.011, GBP: 0.0094, INR: 1, JPY: 1.85, CAD: 0.016, AUD: 0.018, AED: 0.044 },
    JPY: { USD: 0.0065, EUR: 0.006, GBP: 0.0051, INR: 0.54, JPY: 1, CAD: 0.0088, AUD: 0.0098, AED: 0.024 },
    CAD: { USD: 0.74, EUR: 0.68, GBP: 0.58, INR: 61.4, JPY: 113.6, CAD: 1, AUD: 1.12, AED: 2.70 },
    AUD: { USD: 0.66, EUR: 0.61, GBP: 0.52, INR: 54.9, JPY: 101.6, CAD: 0.89, AUD: 1, AED: 2.41 },
    AED: { USD: 0.27, EUR: 0.25, GBP: 0.21, INR: 22.7, JPY: 42.1, CAD: 0.37, AUD: 0.41, AED: 1 }
  };

  const lookupRate = rates[source]?.[target] || 1;
  const result = amount * lookupRate;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-gray-50 dark:bg-zinc-900 p-5 rounded-2xl border border-gray-100 dark:border-zinc-800">
          <h3 className="font-semibold text-gray-800 dark:text-zinc-200">Exchange Pair</h3>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Enter Value</label>
            <input type="number" value={amount} onChange={e => setAmount(Math.max(0, Number(e.target.value)))} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">From Currency</label>
              <select value={source} onChange={e => setSource(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 text-sm">
                {Object.keys(rates).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">To Currency</label>
              <select value={target} onChange={e => setTarget(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 text-sm">
                {Object.keys(rates).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between bg-emerald-50/50 dark:bg-emerald-950/20 p-6 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/30">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider">Converted Total</span>
              <CopyButton value={formatCurrency(result, target)} />
            </div>
            <div className="text-4xl font-extrabold text-emerald-900 dark:text-emerald-300 mt-2">
              {formatCurrency(result, target)}
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-emerald-100/30 dark:border-emerald-800/20 text-xs text-gray-500 dark:text-zinc-400 space-y-1">
            <div>Conversion multiplier: <strong>1 {source} = {lookupRate} {target}</strong></div>
            <div className="italic text-[10px]">Reference FX Rates shown are static guidelines. Actual market spreads can fluctuate.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 9. RETIREMENT CALCULATOR ---
export function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retireAge, setRetireAge] = useState(60);
  const [savings, setSavings] = useState(250000);
  const [monthlyContribution, setMonthlyContribution] = useState(15000);
  const [preReturn, setPreReturn] = useState(10);
  const [postExpense, setPostExpense] = useState(60000);
  const [postReturn, setPostReturn] = useState(6);

  const [depletionAge, setDepletionAge] = useState<number | string>(0);
  const [atRetirementValue, setAtRetirementValue] = useState(0);

  useEffect(() => {
    let currentBalance = savings;
    const workingYears = Math.max(0, retireAge - currentAge);
    const monthsWorking = workingYears * 12;
    const ratePre = (preReturn / 100) / 12;

    for (let m = 0; m < monthsWorking; m++) {
      currentBalance = (currentBalance * (1 + ratePre)) + monthlyContribution;
    }
    setAtRetirementValue(currentBalance);

    let drawBalance = currentBalance;
    const ratePost = (postReturn / 100) / 12;
    let monthsPost = 0;
    const maxMonths = 12 * 70;

    while (drawBalance > 0 && monthsPost < maxMonths) {
      drawBalance = (drawBalance * (1 + ratePost)) - postExpense;
      if (drawBalance > 0) {
        monthsPost++;
      }
    }

    if (monthsPost >= maxMonths) {
      setDepletionAge('100+ (Indefinite)');
    } else {
      const finalAgeStr = Math.round(retireAge + (monthsPost / 12));
      setDepletionAge(finalAgeStr >= 100 ? '100+' : finalAgeStr);
    }
  }, [currentAge, retireAge, savings, monthlyContribution, preReturn, postExpense, postReturn]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3 bg-gray-50 dark:bg-zinc-900 p-5 rounded-2xl border border-gray-100 dark:border-zinc-800 text-xs">
          <h3 className="font-semibold text-gray-800 dark:text-zinc-200 text-sm mb-2">Retirement Factors</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-medium text-gray-600 dark:text-zinc-400 mb-0.5">Current Age</label>
              <input type="number" value={currentAge} onChange={e => setCurrentAge(Math.max(18, Number(e.target.value)))} className="w-full px-2 py-1 rounded bg-white dark:bg-zinc-800 border dark:border-zinc-700" />
            </div>
            <div>
              <label className="block font-medium text-gray-600 dark:text-zinc-400 mb-0.5">Retirement Age</label>
              <input type="number" value={retireAge} onChange={e => setRetireAge(Math.max(currentAge + 1, Number(e.target.value)))} className="w-full px-2 py-1 rounded bg-white dark:bg-zinc-800 border dark:border-zinc-700" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-medium text-gray-600 dark:text-zinc-400 mb-0.5">Savings Nest Egg (₹)</label>
              <input type="number" value={savings} onChange={e => setSavings(Math.max(0, Number(e.target.value)))} className="w-full px-2 py-1 rounded bg-white dark:bg-zinc-800 border dark:border-zinc-700" />
            </div>
            <div>
              <label className="block font-medium text-gray-600 dark:text-zinc-400 mb-0.5">Monthly Contribution (₹)</label>
              <input type="number" value={monthlyContribution} onChange={e => setMonthlyContribution(Math.max(0, Number(e.target.value)))} className="w-full px-2 py-1 rounded bg-white dark:bg-zinc-800 border dark:border-zinc-700" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-medium text-gray-600 dark:text-zinc-400 mb-0.5">Pre-Retire Yield (%)</label>
              <input type="number" value={preReturn} onChange={e => setPreReturn(Math.max(1, Number(e.target.value)))} className="w-full px-2 py-1 rounded bg-white dark:bg-zinc-800 border dark:border-zinc-700" />
            </div>
            <div>
              <label className="block font-medium text-gray-600 dark:text-zinc-400 mb-0.5">Post Exp (₹/mo)</label>
              <input type="number" value={postExpense} onChange={e => setPostExpense(Math.max(1, Number(e.target.value)))} className="w-full px-2 py-1 rounded bg-white dark:bg-zinc-800 border dark:border-zinc-700" />
            </div>
          </div>
          <div>
            <label className="block font-medium text-gray-600 dark:text-zinc-400 mb-0.5">Post-Retire Yield (%)</label>
            <input type="number" value={postReturn} onChange={e => setPostReturn(Math.max(1, Number(e.target.value)))} className="w-full px-2 py-1 rounded bg-white dark:bg-zinc-800 border dark:border-zinc-700 w-1/2" />
          </div>
        </div>

        <div className="flex flex-col justify-between bg-emerald-50/50 dark:bg-emerald-950/20 p-6 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/30">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider">Projected Fund Depletion Age</span>
              <CopyButton value={`${depletionAge} years`} />
            </div>
            <div className="text-4xl font-extrabold text-emerald-900 dark:text-emerald-300 mt-2">{depletionAge} years</div>
          </div>
          <div className="space-y-4 mt-6 pt-6 border-t border-emerald-100/30 dark:border-emerald-800/20 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-zinc-400">Wealth At Retirement:</span>
              <strong className="text-gray-800 dark:text-zinc-200">{formatCurrency(atRetirementValue)}</strong>
            </div>
            <div className="p-3 bg-white dark:bg-zinc-800 rounded-lg text-[11px] leading-relaxed text-gray-500 dark:text-zinc-400">
              Your assets will grow compounding at <strong>{preReturn}%</strong> before retirement, then support monthly withdrawals of <strong>{formatCurrency(postExpense)}</strong> while receiving a <strong>{postReturn}%</strong> yield baseline.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
