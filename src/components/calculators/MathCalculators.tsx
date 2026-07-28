import React, { useState } from 'react';
import CopyButton from '../CopyButton';

// --- 1. SCIENTIFIC CALCULATOR ---
export function ScientificCalculator() {
  const [display, setDisplay] = useState('0');

  const appendSymbol = (str: string) => {
    if (display === '0' && !isNaN(Number(str))) {
      setDisplay(str);
    } else {
      setDisplay(display + str);
    }
  };

  const handleClear = () => setDisplay('0');
  const handleBackspace = () => {
    if (display.length <= 1) {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const calculateTotal = () => {
    try {
      // Replace safe factors for JS eval
      let sanitizedExp = display
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/√\(/g, 'Math.sqrt(')
        .replace(/\^/g, '**');

      // Simple safety check before evaluation (no arbitrary bindings)
      if (/[^0-9.+\-*/%()eMathPIE\s]/.test(sanitizedExp.replace(/Math\.[a-z0-9]+/g, ''))) {
        throw new Error("Invalid Input");
      }

      // Safe evaluation of mathematical strings in Javascript
      const solve = Function(`"use strict"; return (${sanitizedExp})`)();
      if (solve === Infinity || isNaN(solve)) {
        setDisplay('Divide by Zero');
      } else {
        setDisplay(String(Number(solve.toFixed(8))));
      }
    } catch {
      setDisplay('Expression Error');
    }
  };

  const buttons = [
    { label: 'sin', action: () => appendSymbol('sin('), class: 'bg-zinc-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300' },
    { label: 'cos', action: () => appendSymbol('cos('), class: 'bg-zinc-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300' },
    { label: 'tan', action: () => appendSymbol('tan('), class: 'bg-zinc-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300' },
    { label: '(', action: () => appendSymbol('('), class: 'bg-zinc-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300' },
    { label: ')', action: () => appendSymbol(')'), class: 'bg-zinc-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300' },

    { label: 'log', action: () => appendSymbol('log('), class: 'bg-zinc-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300' },
    { label: 'ln', action: () => appendSymbol('ln('), class: 'bg-zinc-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300' },
    { label: '√', action: () => appendSymbol('√('), class: 'bg-zinc-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300' },
    { label: '^', action: () => appendSymbol('^'), class: 'bg-zinc-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300' },
    { label: 'π', action: () => appendSymbol('π'), class: 'bg-zinc-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300' },

    { label: '7', action: () => appendSymbol('7'), class: 'bg-white dark:bg-zinc-700 text-gray-800 dark:text-zinc-100 font-bold' },
    { label: '8', action: () => appendSymbol('8'), class: 'bg-white dark:bg-zinc-700 text-gray-800 dark:text-zinc-100 font-bold' },
    { label: '9', action: () => appendSymbol('9'), class: 'bg-white dark:bg-zinc-700 text-gray-800 dark:text-zinc-100 font-bold' },
    { label: 'DEL', action: handleBackspace, class: 'bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400 font-semibold' },
    { label: 'AC', action: handleClear, class: 'bg-rose-100 dark:bg-rose-950/40 text-rose-800 dark:text-rose-400 font-semibold' },

    { label: '4', action: () => appendSymbol('4'), class: 'bg-white dark:bg-zinc-700 text-gray-800 dark:text-zinc-100 font-bold' },
    { label: '5', action: () => appendSymbol('5'), class: 'bg-white dark:bg-zinc-700 text-gray-800 dark:text-zinc-100 font-bold' },
    { label: '6', action: () => appendSymbol('6'), class: 'bg-white dark:bg-zinc-700 text-gray-800 dark:text-zinc-100 font-bold' },
    { label: '×', action: () => appendSymbol('*'), class: 'bg-zinc-200 dark:bg-zinc-600 text-gray-800 dark:text-zinc-100 text-lg font-semibold' },
    { label: '÷', action: () => appendSymbol('/'), class: 'bg-zinc-200 dark:bg-zinc-600 text-gray-800 dark:text-zinc-100 text-lg font-semibold' },

    { label: '1', action: () => appendSymbol('1'), class: 'bg-white dark:bg-zinc-700 text-gray-800 dark:text-zinc-100 font-bold' },
    { label: '2', action: () => appendSymbol('2'), class: 'bg-white dark:bg-zinc-700 text-gray-800 dark:text-zinc-100 font-bold' },
    { label: '3', action: () => appendSymbol('3'), class: 'bg-white dark:bg-zinc-700 text-gray-800 dark:text-zinc-100 font-bold' },
    { label: '+', action: () => appendSymbol('+'), class: 'bg-zinc-200 dark:bg-zinc-600 text-gray-800 dark:text-zinc-100 text-lg font-semibold' },
    { label: '–', action: () => appendSymbol('-'), class: 'bg-zinc-200 dark:bg-zinc-600 text-gray-800 dark:text-zinc-100 text-lg font-semibold' },

    { label: '0', action: () => appendSymbol('0'), class: 'bg-white dark:bg-zinc-700 text-gray-800 dark:text-zinc-100 font-bold col-span-2' },
    { label: '.', action: () => appendSymbol('.'), class: 'bg-white dark:bg-zinc-700 text-gray-800 dark:text-zinc-100' },
    { label: 'e', action: () => appendSymbol('e'), class: 'bg-white dark:bg-zinc-700 text-gray-800 dark:text-zinc-100' },
    { label: '=', action: calculateTotal, class: 'bg-emerald-500 hover:bg-emerald-600 text-white font-bold col-span-1 shadow-sm' }
  ];

  return (
    <div className="max-w-md mx-auto bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-5 shadow-inner">
      <div className="bg-white dark:bg-zinc-950 rounded-2xl p-4 mb-4 border border-gray-100 dark:border-zinc-800 overflow-hidden text-right">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">Display Screen</span>
          <CopyButton value={display} />
        </div>
        <div className="text-3xl font-bold font-mono text-gray-900 dark:text-emerald-400 break-all h-16 flex items-end justify-end leading-none">
          {display}
        </div>
      </div>
      <div className="grid grid-cols-5 gap-1.5 text-xs font-mono">
        {buttons.map((btn, i) => (
          <button key={i} onClick={btn.action} className={`p-2.5 rounded-lg border border-gray-100/50 dark:border-zinc-800/50 active:scale-95 transition-all focus:outline-none ${btn.class}`}>
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// --- 2. PERCENTAGE CALCULATOR ---
export function PercentageCalculator() {
  const [val1, setVal1] = useState(20);
  const [val2, setVal2] = useState(150);

  const [partVal, setPartVal] = useState(30);
  const [wholeVal, setWholeVal] = useState(120);

  const [fromChange, setFromChange] = useState(50);
  const [toChange, setToChange] = useState(80);

  // Math Solvers
  const term1 = (val1 / 100) * val2; // X% of Y
  const term2 = wholeVal !== 0 ? (partVal / wholeVal) * 100 : 0; // X is what percent of Y
  const term3 = fromChange !== 0 ? ((toChange - fromChange) / fromChange) * 100 : 0; // % increase/decrease

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Box 1 */}
        <div className="bg-gray-50 dark:bg-zinc-900 p-5 rounded-2xl border border-gray-100 dark:border-zinc-800 space-y-4">
          <span className="text-xs uppercase font-bold text-gray-400 tracking-wider block">Find Percentage of Value</span>
          <div className="text-xs text-gray-700 dark:text-zinc-300 space-y-2">
            <div>
              <span className="block mb-1 font-medium">Percent Margin (%)</span>
              <input type="number" value={val1} onChange={e => setVal1(Number(e.target.value))} className="w-full px-2 py-1.5 rounded-lg border bg-white dark:bg-zinc-800 dark:border-zinc-700 text-sm" />
            </div>
            <div>
              <span className="block mb-1 font-medium">Whole Base Value</span>
              <input type="number" value={val2} onChange={e => setVal2(Number(e.target.value))} className="w-full px-2 py-1.5 rounded-lg border bg-white dark:bg-zinc-800 dark:border-zinc-700 text-sm" />
            </div>
          </div>
          <div className="pt-3 border-t dark:border-zinc-800 flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500">Result: {val1}% of {val2} is</div>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{term1}</div>
            </div>
            <CopyButton value={term1} />
          </div>
        </div>

        {/* Box 2 */}
        <div className="bg-gray-50 dark:bg-zinc-900 p-5 rounded-2xl border border-gray-100 dark:border-zinc-800 space-y-4">
          <span className="text-xs uppercase font-bold text-gray-400 tracking-wider block">Find Ratio Percentage</span>
          <div className="text-xs text-gray-700 dark:text-zinc-300 space-y-2">
            <div>
              <span className="block mb-1 font-medium">Part value</span>
              <input type="number" value={partVal} onChange={e => setPartVal(Number(e.target.value))} className="w-full px-2 py-1.5 rounded-lg border bg-white dark:bg-zinc-800 dark:border-zinc-700 text-sm" />
            </div>
            <div>
              <span className="block mb-1 font-medium">Whole value</span>
              <input type="number" value={wholeVal} onChange={e => setWholeVal(Number(e.target.value))} className="w-full px-2 py-1.5 rounded-lg border bg-white dark:bg-zinc-800 dark:border-zinc-700 text-sm" />
            </div>
          </div>
          <div className="pt-3 border-t dark:border-zinc-800 flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500">Result: {partVal} is what percent of {wholeVal}?</div>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{term2.toFixed(2)}%</div>
            </div>
            <CopyButton value={`${term2.toFixed(2)}%`} />
          </div>
        </div>

        {/* Box 3 */}
        <div className="bg-gray-50 dark:bg-zinc-900 p-5 rounded-2xl border border-gray-100 dark:border-zinc-800 space-y-4">
          <span className="text-xs uppercase font-bold text-gray-400 tracking-wider block">Percentage Transition</span>
          <div className="text-xs text-gray-700 dark:text-zinc-300 space-y-2">
            <div>
              <span className="block mb-1 font-medium">From Value</span>
              <input type="number" value={fromChange} onChange={e => setFromChange(Number(e.target.value))} className="w-full px-2 py-1.5 rounded-lg border bg-white dark:bg-zinc-800 dark:border-zinc-700 text-sm" />
            </div>
            <div>
              <span className="block mb-1 font-medium">To Value</span>
              <input type="number" value={toChange} onChange={e => setToChange(Number(e.target.value))} className="w-full px-2 py-1.5 rounded-lg border bg-white dark:bg-zinc-800 dark:border-zinc-700 text-sm" />
            </div>
          </div>
          <div className="pt-3 border-t dark:border-zinc-800 flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500">Difference from {fromChange} to {toChange} is:</div>
              <div className={`text-2xl font-black mt-1 ${term3 >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                {term3 >= 0 ? '+' : ''}{term3.toFixed(2)}%
              </div>
            </div>
            <CopyButton value={`${term3 >= 0 ? '+' : ''}${term3.toFixed(2)}%`} />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 3. FRACTION CALCULATOR ---
export function FractionCalculator() {
  const [num1, setNum1] = useState(1);
  const [den1, setDen1] = useState(2);
  const [num2, setNum2] = useState(1);
  const [den2, setDen2] = useState(3);
  const [op, setOp] = useState<'add' | 'subtract' | 'multiply' | 'divide'>('add');

  const getGcd = (a: number, b: number): number => b === 0 ? Math.abs(a) : getGcd(b, a % b);

  // Compute terms
  // a/b +/- c/d
  let resNum = 0;
  let resDen = 1;

  if (op === 'add') {
    resNum = (num1 * den2) + (num2 * den1);
    resDen = den1 * den2;
  } else if (op === 'subtract') {
    resNum = (num1 * den2) - (num2 * den1);
    resDen = den1 * den2;
  } else if (op === 'multiply') {
    resNum = num1 * num2;
    resDen = den1 * den2;
  } else if (op === 'divide') {
    resNum = num1 * den2;
    resDen = den1 * num2;
  }

  // Simplify final fractions
  const divisor = getGcd(resNum, resDen);
  let simpNum = divisor !== 0 ? resNum / divisor : resNum;
  let simpDen = divisor !== 0 ? resDen / divisor : resDen;

  // Formatting sign correctly
  if (simpDen < 0) {
    simpNum = -simpNum;
    simpDen = -simpDen;
  }

  // convert to mixed fraction
  let mixedWhole = 0;
  let mixedNum = 0;
  if (Math.abs(simpNum) >= simpDen && simpDen !== 0) {
    mixedWhole = Math.trunc(simpNum / simpDen);
    mixedNum = Math.abs(simpNum % simpDen);
  }

  const decimalVal = simpDen !== 0 ? simpNum / simpDen : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-gray-50 dark:bg-zinc-900 p-5 rounded-2xl border border-gray-100 dark:border-zinc-800">
          <h3 className="font-semibold text-gray-800 dark:text-zinc-200">Values Config</h3>
          <div className="flex items-center justify-around gap-2 text-center">
            {/* Fraction A */}
            <div className="space-y-1">
              <input type="number" value={num1} onChange={e => setNum1(Number(e.target.value))} className="w-16 text-center px-1 py-1 rounded bg-white dark:bg-zinc-800 border" />
              <div className="h-0.5 bg-gray-400 dark:bg-zinc-600 w-16 mx-auto"></div>
              <input type="number" value={den1} onChange={e => setDen1(Number(e.target.value) || 1)} className="w-16 text-center px-1 py-1 rounded bg-white dark:bg-zinc-800 border" />
            </div>

            {/* Operator selector */}
            <select value={op} onChange={e => setOp(e.target.value as any)} className="px-2 py-1.5 rounded-lg border text-sm font-bold bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100">
              <option value="add">+</option>
              <option value="subtract">–</option>
              <option value="multiply">×</option>
              <option value="divide">÷</option>
            </select>

            {/* Fraction B */}
            <div className="space-y-1">
              <input type="number" value={num2} onChange={e => setNum2(Number(e.target.value))} className="w-16 text-center px-1 py-1 rounded bg-white dark:bg-zinc-800 border" />
              <div className="h-0.5 bg-gray-400 dark:bg-zinc-600 w-16 mx-auto"></div>
              <input type="number" value={den2} onChange={e => setDen2(Number(e.target.value) || 1)} className="w-16 text-center px-1 py-1 rounded bg-white dark:bg-zinc-800 border" />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between bg-emerald-50/50 dark:bg-emerald-950/20 p-6 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/30">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider">Simplified Calculation Ratio</span>
              <CopyButton value={simpDen === 1 ? simpNum.toString() : `${simpNum}/${simpDen}`} />
            </div>
            <div className="text-3xl font-extrabold text-emerald-900 dark:text-emerald-300 mt-2 flex items-center gap-2">
              {simpDen === 1 ? simpNum : (
                <div className="inline-flex flex-col items-center leading-none text-xl">
                  <span>{simpNum}</span>
                  <span className="h-0.5 bg-emerald-700 dark:bg-emerald-400 w-full my-0.5"></span>
                  <span>{simpDen}</span>
                </div>
              )}
              {mixedWhole !== 0 && mixedNum !== 0 && (
                <span className="text-xs text-gray-500 font-normal">
                  (Equivalent Mixed Fraction: {mixedWhole} <span className="underline">{mixedNum}/{simpDen}</span>)
                </span>
              )}
            </div>
          </div>
          <div className="mt-4 p-3 bg-white dark:bg-zinc-800 rounded-xl border border-gray-100 dark:border-zinc-700/50 flex justify-between items-center text-xs">
            <span className="text-gray-500 dark:text-zinc-400">Decimal Value representation:</span>
            <span className="font-extrabold text-gray-800 dark:text-zinc-100">{decimalVal.toFixed(5).replace(/\.?0+$/, '')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 4. RATIO CALCULATOR ---
export function RatioCalculator() {
  const [ratioA, setRatioA] = useState(4);
  const [ratioB, setRatioB] = useState(8);

  const [solveA, setSolveA] = useState(2);
  const [solveB, setSolveB] = useState(3);
  const [solveC, setSolveC] = useState(10); // A : B = C : X, solve for X (D)

  // Equation: D = (C * B) / A
  const solveD = solveA !== 0 ? (solveC * solveB) / solveA : 0;

  const getGcd = (x: number, y: number): number => y === 0 ? Math.abs(x) : getGcd(y, x % y);
  const divRatio = getGcd(ratioA, ratioB);
  const simpRatioA = divRatio !== 0 ? ratioA / divRatio : ratioA;
  const simpRatioB = divRatio !== 0 ? ratioB / divRatio : ratioB;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Simple Simplifier */}
        <div className="bg-gray-50 dark:bg-zinc-900 p-5 rounded-2xl border border-gray-100 dark:border-zinc-800 space-y-4">
          <h3 className="font-semibold text-xs uppercase tracking-wider text-gray-400">Simplify Ratios</h3>
          <div className="flex gap-4 items-center">
            <input type="number" value={ratioA} onChange={e => setRatioA(Number(e.target.value))} className="w-1/2 px-3 py-2 rounded-lg border text-sm" />
            <span className="font-bold text-gray-500">:</span>
            <input type="number" value={ratioB} onChange={e => setRatioB(Number(e.target.value))} className="w-1/2 px-3 py-2 rounded-lg border text-sm" />
          </div>
          <div className="pt-3 border-t dark:border-zinc-800 flex justify-between items-center">
            <span className="text-xs text-gray-500">Simplifies to:</span>
            <div className="flex items-center gap-2">
              <strong className="text-lg text-emerald-600 dark:text-emerald-400">{simpRatioA} : {simpRatioB}</strong>
              <CopyButton value={`${simpRatioA}:${simpRatioB}`} />
            </div>
          </div>
        </div>

        {/* Solve Proportions */}
        <div className="bg-gray-50 dark:bg-zinc-900 p-5 rounded-2xl border border-gray-100 dark:border-zinc-800 space-y-4">
          <h3 className="font-semibold text-xs uppercase tracking-wider text-gray-400">Proportion Solver (A : B = C : D)</h3>
          <div className="grid grid-cols-3 gap-2 items-center text-center text-xs">
            <div>
              <span className="block mb-1 text-gray-500">Value A</span>
              <input type="number" value={solveA} onChange={e => setSolveA(Number(e.target.value))} className="w-full text-center px-2 py-1.5 rounded border text-sm" />
            </div>
            <div>
              <span className="block mb-1 text-gray-500">Value B</span>
              <input type="number" value={solveB} onChange={e => setSolveB(Number(e.target.value))} className="w-full text-center px-2 py-1.5 rounded border text-sm" />
            </div>
            <div>
              <span className="block mb-1 text-gray-500">Value C</span>
              <input type="number" value={solveC} onChange={e => setSolveC(Number(e.target.value))} className="w-full text-center px-2 py-1.5 rounded border text-sm" />
            </div>
          </div>
          <div className="pt-3 border-t dark:border-zinc-800 flex justify-between items-center text-sm">
            <span className="text-xs text-gray-500">Solved Value D:</span>
            <div className="flex items-center gap-2">
              <strong className="text-lg text-emerald-600 dark:text-emerald-400">{solveD.toFixed(3).replace(/\.?0+$/, '')}</strong>
              <CopyButton value={solveD.toFixed(3).replace(/\.?0+$/, '')} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 5. AVERAGE CALCULATOR ---
export function AverageCalculator() {
  const [listText, setListText] = useState('12, 15, 23, 7, 18, 30');

  // Solver
  const numberArr = listText
    .split(',')
    .map(t => Number(t.trim()))
    .filter(n => !isNaN(n) && listText.trim() !== '');

  const count = numberArr.length;
  const sum = numberArr.reduce((acc, curr) => acc + curr, 0);
  const mean = count > 0 ? sum / count : 0;

  // Median
  const sorted = [...numberArr].sort((a, b) => a - b);
  let median = 0;
  if (count > 0) {
    const half = Math.floor(count / 2);
    median = count % 2 !== 0 ? sorted[half] : (sorted[half - 1] + sorted[half]) / 2;
  }

  // Min/Max/Range
  const min = count > 0 ? Math.min(...numberArr) : 0;
  const max = count > 0 ? Math.max(...numberArr) : 0;
  const range = count > 0 ? max - min : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-gray-50 dark:bg-zinc-900 p-5 rounded-2xl border border-gray-100 dark:border-zinc-800">
          <h3 className="font-semibold text-gray-800 dark:text-zinc-200">Dataset Matrix</h3>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Enter List Numbers (separated by commas)</label>
            <textarea value={listText} onChange={e => setListText(e.target.value)} rows={3} className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 text-sm font-mono leading-normal focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-transparent" />
          </div>
        </div>

        <div className="flex flex-col justify-between bg-emerald-50/50 dark:bg-emerald-950/20 p-6 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/30">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider">Arithmetic Mean (Average)</span>
              <CopyButton value={mean.toFixed(2).replace(/\.?0+$/, '')} />
            </div>
            <div className="text-4xl font-extrabold text-emerald-900 dark:text-emerald-300 mt-2">{mean.toFixed(2).replace(/\.?0+$/, '')}</div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-emerald-100/30 dark:border-emerald-800/20 text-xs">
            <div className="flex justify-between"><span>Sum Total:</span> <strong className="text-gray-800 dark:text-zinc-100">{sum}</strong></div>
            <div className="flex justify-between"><span>Median Middle:</span> <strong className="text-gray-800 dark:text-zinc-100">{median}</strong></div>
            <div className="flex justify-between"><span>Total Count (N):</span> <strong className="text-gray-800 dark:text-zinc-100">{count}</strong></div>
            <div className="flex justify-between"><span>Extreme Range:</span> <strong className="text-gray-800 dark:text-zinc-100">{range} ({min} - {max})</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 6. PROFIT & LOSS CALCULATOR ---
export function ProfitAndLossCalculator() {
  const [costPrice, setCostPrice] = useState(150);
  const [sellPrice, setSellPrice] = useState(195);

  const profitLoss = sellPrice - costPrice;
  const isProfit = profitLoss >= 0;
  const percentProfitLoss = costPrice !== 0 ? (profitLoss / costPrice) * 100 : 0;
  const markup = costPrice !== 0 ? ((sellPrice - costPrice) / costPrice) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-gray-50 dark:bg-zinc-900 p-5 rounded-2xl border border-gray-100 dark:border-zinc-800">
          <h3 className="font-semibold text-gray-800 dark:text-zinc-200">Price Points</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Unit Cost Price ($)</label>
              <input type="number" value={costPrice} onChange={e => setCostPrice(Math.max(0, Number(e.target.value)))} className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-zinc-800 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Unit Selling Price ($)</label>
              <input type="number" value={sellPrice} onChange={e => setSellPrice(Math.max(0, Number(e.target.value)))} className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-zinc-800 text-sm" />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between bg-emerald-50/50 dark:bg-emerald-950/20 p-6 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/30">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider">Net Yield</span>
              <CopyButton value={`${isProfit ? '+' : '-'}$${Math.abs(profitLoss)}`} />
            </div>
            <div className={`text-4xl font-extrabold mt-2 ${isProfit ? 'text-emerald-900 dark:text-emerald-300' : 'text-rose-600 dark:text-rose-400'}`}>
              {isProfit ? '+' : '-'}${Math.abs(profitLoss)}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-emerald-100/30 dark:border-emerald-800/20 text-xs">
            <div>
              <span className="text-gray-500 block">Margin Yield (%)</span>
              <strong className={`text-md ${isProfit ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-600'}`}>
                {percentProfitLoss.toFixed(1)}%
              </strong>
            </div>
            <div>
              <span className="text-gray-500 block">Markup Added (%)</span>
              <strong className="text-md text-gray-800 dark:text-zinc-100">{markup.toFixed(1)}%</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 7. DISCOUNT CALCULATOR ---
export function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState(120);
  const [discountPercent, setDiscountPercent] = useState(25);
  const [salesTax, setSalesTax] = useState(8);

  const amountSaved = (originalPrice * discountPercent) / 100;
  const discountedPrice = originalPrice - amountSaved;
  const taxAmount = (discountedPrice * salesTax) / 100;
  const finalPrice = discountedPrice + taxAmount;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-gray-50 dark:bg-zinc-900 p-5 rounded-2xl border border-gray-100 dark:border-zinc-800 font-sans">
          <h3 className="font-semibold text-gray-800 dark:text-zinc-200">Offer Values</h3>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Standard Tag Price ($)</label>
            <input type="number" value={originalPrice} onChange={e => setOriginalPrice(Math.max(0, Number(e.target.value)))} className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-zinc-800 text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Discount Rate (%)</label>
              <input type="number" value={discountPercent} onChange={e => setDiscountPercent(Math.max(0, Number(e.target.value)))} className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-zinc-800 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Sales Tax (%)</label>
              <input type="number" value={salesTax} onChange={e => setSalesTax(Math.max(0, Number(e.target.value)))} className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-zinc-800 text-sm" />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between bg-emerald-50/50 dark:bg-emerald-950/20 p-6 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/30">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider font-sans">Checkout Retail Price</span>
              <CopyButton value={`$${finalPrice.toFixed(2)}`} />
            </div>
            <div className="text-4xl font-extrabold text-emerald-900 dark:text-emerald-300 mt-2">${finalPrice.toFixed(2)}</div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-emerald-100/30 dark:border-emerald-800/20 text-xs">
            <div>
              <span className="text-gray-500 block">Money Saved Amount</span>
              <strong className="text-base text-emerald-600 font-bold dark:text-emerald-400">${amountSaved.toFixed(2)}</strong>
            </div>
            <div>
              <span className="text-gray-500 block">Calculated Purchase Tax</span>
              <strong className="text-base text-gray-800 dark:text-zinc-100">${taxAmount.toFixed(2)}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
