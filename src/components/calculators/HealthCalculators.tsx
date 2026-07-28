import React, { useState } from 'react';
import CopyButton from '../CopyButton';

// --- 1. BMI CALCULATOR ---
export function BMICalculator() {
  const [weight, setWeight] = useState(70); // kg
  const [height, setHeight] = useState(175); // cm
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');

  // Imperial states
  const [weightLbs, setWeightLbs] = useState(154);
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(9);

  let bmi = 0;
  if (unit === 'metric') {
    const heightM = height / 100;
    bmi = heightM > 0 ? weight / (heightM * heightM) : 0;
  } else {
    // Imperial
    const totalInches = (heightFt * 12) + heightIn;
    bmi = totalInches > 0 ? (weightLbs / (totalInches * totalInches)) * 703 : 0;
  }

  const getBmiCategory = (val: number) => {
    if (val < 18.5) return { label: 'Underweight', color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/20' };
    if (val >= 18.5 && val < 25) return { label: 'Normal Weight', color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 shadow-sm' };
    if (val >= 25 && val < 30) return { label: 'Overweight', color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/20' };
    return { label: 'Obese', color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/20' };
  };

  const cat = getBmiCategory(bmi);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-gray-50 dark:bg-zinc-900 p-5 rounded-2xl border border-gray-100 dark:border-zinc-800">
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-semibold text-gray-800 dark:text-zinc-200">Metrics Setup</h3>
            <div className="inline-flex rounded-lg p-0.5 bg-gray-100 dark:bg-zinc-800 text-xs">
              <button onClick={() => setUnit('metric')} className={`px-2.5 py-1 rounded-md font-medium transition-all ${unit === 'metric' ? 'bg-white dark:bg-zinc-700 text-gray-800 dark:text-zinc-100 shadow' : 'text-gray-500'}`}>Metric</button>
              <button onClick={() => setUnit('imperial')} className={`px-2.5 py-1 rounded-md font-medium transition-all ${unit === 'imperial' ? 'bg-white dark:bg-zinc-700 text-gray-800 dark:text-zinc-100 shadow' : 'text-gray-500'}`}>Imperial</button>
            </div>
          </div>

          {unit === 'metric' ? (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Weight (kg)</label>
                <input type="number" value={weight} onChange={e => setWeight(Math.max(1, Number(e.target.value)))} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
                <input type="range" min="30" max="200" value={weight} onChange={e => setWeight(Number(e.target.value))} className="w-full mt-2 accent-emerald-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Height (cm)</label>
                <input type="number" value={height} onChange={e => setHeight(Math.max(1, Number(e.target.value)))} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
                <input type="range" min="100" max="230" value={height} onChange={e => setHeight(Number(e.target.value))} className="w-full mt-2 accent-emerald-500" />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Weight (lbs)</label>
                <input type="number" value={weightLbs} onChange={e => setWeightLbs(Math.max(1, Number(e.target.value)))} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Height Feet</label>
                  <input type="number" value={heightFt} onChange={e => setHeightFt(Math.max(1, Number(e.target.value)))} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Height Inches</label>
                  <input type="number" value={heightIn} onChange={e => setHeightIn(Math.max(0, Math.min(11, Number(e.target.value))))} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100" />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between bg-emerald-50/50 dark:bg-emerald-950/20 p-6 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/30">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider">Your Body Mass Index (BMI)</span>
              <CopyButton value={bmi.toFixed(1)} />
            </div>
            <div className="text-5xl font-extrabold text-emerald-900 dark:text-emerald-300 mt-2">{bmi.toFixed(1)}</div>
          </div>
          <div className="mt-4">
            <span className="text-xs text-gray-500 dark:text-zinc-400">Biological Classification Range</span>
            <div className={`mt-1.5 px-3 py-2 text-sm font-bold rounded-xl inline-block ${cat.color}`}>
              {cat.label}
            </div>
          </div>
          <div className="mt-4 space-y-1.5 pt-4 border-t border-emerald-100/30 dark:border-emerald-800/20 text-xs text-gray-500 dark:text-zinc-400">
            <div className="flex justify-between"><span>Normal range:</span> <span>18.5 – 24.9</span></div>
            <div className="flex justify-between text-amber-600 dark:text-amber-400"><span>Overweight range:</span> <span>25.0 – 29.9</span></div>
            <div className="flex justify-between text-blue-600 dark:text-blue-400"><span>Underweight range:</span> <span>&lt; 18.5</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 2. CALORIE CALCULATOR ---
export function CalorieCalculator() {
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState(70); // kg
  const [height, setHeight] = useState(175); // cm
  const [activity, setActivity] = useState(1.375); // light exercise

  // BMR via Mifflin-St Jeor
  const bmr = gender === 'male'
    ? (10 * weight) + (6.25 * height) - (5 * age) + 5
    : (10 * weight) + (6.25 * height) - (5 * age) - 161;

  const maintenance = bmr * activity;
  const loseWeight = maintenance - 500;
  const gainWeight = maintenance + 350;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3 bg-gray-50 dark:bg-zinc-900 p-5 rounded-2xl border border-gray-100 dark:border-zinc-800 text-xs">
          <h3 className="font-semibold text-gray-800 dark:text-zinc-200 text-sm mb-2">Thermal Attributes</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-gray-600 dark:text-zinc-400 mb-0.5">Biological Sex</label>
              <select value={gender} onChange={e => setGender(e.target.value as 'male' | 'female')} className="w-full px-2 py-1.5 rounded-lg border bg-white dark:bg-zinc-800 dark:border-zinc-700">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-600 dark:text-zinc-400 mb-0.5">Age (Years)</label>
              <input type="number" value={age} onChange={e => setAge(Math.max(1, Number(e.target.value)))} className="w-full px-2 py-1.5 rounded-lg border bg-white dark:bg-zinc-800 dark:border-zinc-700" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-gray-600 dark:text-zinc-400 mb-0.5">Weight (kg)</label>
              <input type="number" value={weight} onChange={e => setWeight(Math.max(1, Number(e.target.value)))} className="w-full px-2 py-1.5 rounded-lg border bg-white dark:bg-zinc-800 dark:border-zinc-700" />
            </div>
            <div>
              <label className="block text-gray-600 dark:text-zinc-400 mb-0.5">Height (cm)</label>
              <input type="number" value={height} onChange={e => setHeight(Math.max(1, Number(e.target.value)))} className="w-full px-2 py-1.5 rounded-lg border bg-white dark:bg-zinc-800 dark:border-zinc-700" />
            </div>
          </div>
          <div>
            <label className="block text-gray-600 dark:text-zinc-400 mb-0.5">Routine Activity Level</label>
            <select value={activity} onChange={e => setActivity(Number(e.target.value))} className="w-full px-2 py-1.5 rounded-lg border bg-white dark:bg-zinc-800 dark:border-zinc-700">
              <option value="1.2">Sedentary (No Exercise)</option>
              <option value="1.375">Lightly Active (1-3 days/wk)</option>
              <option value="1.55">Moderately Active (3-5 days/wk)</option>
              <option value="1.725">Very Active (6-7 days intense)</option>
              <option value="1.9">Extremely Active (Heavy Physical Job)</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col justify-between bg-emerald-50/50 dark:bg-emerald-950/20 p-6 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/30">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider">Daily Maintenance Energy</span>
              <CopyButton value={`${Math.round(maintenance)} kcal`} />
            </div>
            <div className="text-4xl font-extrabold text-emerald-900 dark:text-emerald-300 mt-2">{Math.round(maintenance)} <span className="text-lg font-normal text-gray-500">kcal/day</span></div>
          </div>
          <div className="space-y-2 mt-6 pt-6 border-t border-emerald-100/30 dark:border-emerald-800/20 text-xs">
            <div className="flex justify-between items-center text-gray-700 dark:text-zinc-300">
              <span>Mild Weight Loss (-500 kcal):</span>
              <span className="font-extrabold text-amber-600 dark:text-amber-400">{Math.round(Math.max(1200, loseWeight))} kcal</span>
            </div>
            <div className="flex justify-between items-center text-gray-700 dark:text-zinc-300">
              <span>Mild Weight Gain (+350 kcal):</span>
              <span className="font-extrabold text-blue-600 dark:text-blue-400">{Math.round(gainWeight)} kcal</span>
            </div>
            <div className="flex justify-between items-center text-gray-700 dark:text-zinc-300 pt-1 border-t dark:border-zinc-800">
              <span>Basal Metabolic Rate (BMR):</span>
              <span className="font-semibold text-gray-500">{Math.round(bmr)} kcal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 3. WATER INTAKE CALCULATOR ---
export function WaterIntakeCalculator() {
  const [weight, setWeight] = useState(70);
  const [exercise, setExercise] = useState(30); // minutes

  // Standard metric: 35ml per kg of weight + 12ml per minute of high aerobic output
  const totalWaterMl = (weight * 35) + (exercise * 12);
  const totalLiters = totalWaterMl / 1000;
  const glasses = totalWaterMl / 250; // 250ml glass template

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-gray-50 dark:bg-zinc-900 p-5 rounded-2xl border border-gray-100 dark:border-zinc-800">
          <h3 className="font-semibold text-gray-800 dark:text-zinc-200">Fluid Settings</h3>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Body Weight (kg)</label>
            <input type="number" value={weight} onChange={e => setWeight(Math.max(1, Number(e.target.value)))} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
            <input type="range" min="30" max="150" value={weight} onChange={e => setWeight(Number(e.target.value))} className="w-full mt-2 accent-emerald-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Daily High-Intensity Exercise (Minutes)</label>
            <input type="number" value={exercise} onChange={e => setExercise(Math.max(0, Number(e.target.value)))} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
            <input type="range" min="0" max="150" value={exercise} onChange={e => setExercise(Number(e.target.value))} className="w-full mt-2 accent-emerald-500" />
          </div>
        </div>

        <div className="flex flex-col justify-between bg-blue-50/50 dark:bg-blue-950/10 p-6 rounded-2xl border border-blue-100/50 dark:border-blue-900/20">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-semibold text-blue-700 dark:text-blue-400 tracking-wider">Hydration Targets</span>
              <CopyButton value={`${totalLiters.toFixed(2)} Liters`} />
            </div>
            <div className="text-4xl font-extrabold text-blue-900 dark:text-blue-300 mt-2">{totalLiters.toFixed(2)} <span className="text-lg font-normal text-gray-500">Liters / day</span></div>
          </div>
          <div className="mt-4 p-4 rounded-xl bg-white dark:bg-zinc-800 border border-blue-100 dark:border-zinc-700/50 flex justify-between items-center">
            <span className="text-xs text-gray-500 dark:text-zinc-400">Equivalent standard glasses (250ml)</span>
            <span className="text-lg font-extrabold text-blue-600 dark:text-blue-400">{glasses.toFixed(1)} Glasses</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 4. IDEAL WEIGHT CALCULATOR ---
export function IdealWeightCalculator() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [heightCm, setHeightCm] = useState(175);

  const inchesOverFiveFeet = Math.max(0, (heightCm / 2.54) - 60);

  // Devine formula: Male = 50 + 2.3 kg/inch, Female = 45.5 + 2.3 kg/inch
  const devineIdeal = gender === 'male'
    ? 50.0 + (2.3 * inchesOverFiveFeet)
    : 45.5 + (2.3 * inchesOverFiveFeet);

  // Robinson formula: Male = 52 + 1.9 kg/inch, Female = 49 + 1.7 kg/inch
  const robinsonIdeal = gender === 'male'
    ? 52.0 + (1.9 * inchesOverFiveFeet)
    : 49.0 + (1.7 * inchesOverFiveFeet);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-gray-50 dark:bg-zinc-900 p-5 rounded-2xl border border-gray-100 dark:border-zinc-800">
          <h3 className="font-semibold text-gray-800 dark:text-zinc-200">Scale Standards</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Biological Gender</label>
              <select value={gender} onChange={e => setGender(e.target.value as 'male' | 'female')} className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-zinc-800 dark:border-zinc-700 text-sm">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Height (cm)</label>
              <input type="number" value={heightCm} onChange={e => setHeightCm(Math.max(120, Number(e.target.value)))} className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-zinc-800 dark:border-zinc-700 text-sm" />
            </div>
          </div>
          <input type="range" min="130" max="220" value={heightCm} onChange={e => setHeightCm(Number(e.target.value))} className="w-full mt-2 accent-emerald-500" />
        </div>

        <div className="flex flex-col justify-between bg-emerald-50/50 dark:bg-emerald-950/20 p-6 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/30">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider">Devine Medical Baseline Target</span>
              <CopyButton value={`${devineIdeal.toFixed(1)} kg`} />
            </div>
            <div className="text-4xl font-extrabold text-emerald-900 dark:text-emerald-300 mt-2">{devineIdeal.toFixed(1)} <span className="text-lg font-normal text-gray-500">kg</span></div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-emerald-100/30 dark:border-emerald-800/20">
            <div>
              <span className="text-xs text-gray-500 dark:text-zinc-400">Equivalent in Lbs</span>
              <div className="text-base font-bold text-gray-800 dark:text-zinc-100">{(devineIdeal * 2.20462).toFixed(1)} lbs</div>
            </div>
            <div>
              <span className="text-xs text-gray-500 dark:text-zinc-400">Robinson Formula Target</span>
              <div className="text-base font-bold text-gray-800 dark:text-zinc-100">{robinsonIdeal.toFixed(1)} kg</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 5. PREGNANCY DUE DATE CALCULATOR ---
export function PregnancyDueDateCalculator() {
  const [lmpDate, setLmpDate] = useState('2026-01-01');

  // Calculates due date: LMP + 280 days
  const getDueDate = () => {
    if (!lmpDate) return null;
    const lmp = new Date(lmpDate);
    if (isNaN(lmp.getTime())) return null;

    const due = new Date(lmp.getTime() + (280 * 24 * 60 * 60 * 1000));
    return due;
  };

  const due = getDueDate();
  const today = new Date();
  const totalDays = due && lmpDate ? Math.round((due.getTime() - new Date(lmpDate).getTime()) / (24 * 60 * 60 * 1000)) : 280;

  // calculate current gestations
  let currentWeeks = 0;
  let remainingDays = 0;
  if (lmpDate) {
    const elapsedMs = today.getTime() - new Date(lmpDate).getTime();
    const elapsedDays = Math.max(0, Math.floor(elapsedMs / (24 * 60 * 60 * 1000)));
    currentWeeks = Math.floor(elapsedDays / 7);
    remainingDays = elapsedDays % 7;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-gray-50 dark:bg-zinc-900 p-5 rounded-2xl border border-gray-100 dark:border-zinc-800">
          <h3 className="font-semibold text-gray-800 dark:text-zinc-200">Cycle Baseline</h3>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">First Day of Last Menstrual Period (LMP)</label>
            <input type="date" value={lmpDate} onChange={e => setLmpDate(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
          </div>
        </div>

        <div className="flex flex-col justify-between bg-emerald-50/50 dark:bg-emerald-950/20 p-6 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/30">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider">Estimated Date of Delivery (EDD)</span>
              <CopyButton value={due ? due.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'} />
            </div>
            <div className="text-3xl font-extrabold text-emerald-900 dark:text-emerald-300 mt-2">
              {due ? due.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
            </div>
          </div>
          <div className="space-y-2 mt-6 pt-6 border-t border-emerald-100/30 dark:border-emerald-800/20 text-xs">
            <div className="flex justify-between items-center text-gray-700 dark:text-zinc-300">
              <span>Approx Gestation Age:</span>
              <span className="font-bold text-gray-800 dark:text-zinc-100">{currentWeeks} Weeks, {remainingDays} Days</span>
            </div>
            <div className="flex justify-between items-center text-gray-700 dark:text-zinc-300">
              <span>Total Gestation Cycle:</span>
              <span className="font-bold text-gray-800 dark:text-zinc-100">{totalDays} Days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 6. BODY FAT CALCULATOR ---
export function BodyFatCalculator() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [height, setHeight] = useState(175); // cm
  const [waist, setWaist] = useState(85); // cm
  const [neck, setNeck] = useState(38); // cm
  const [hip, setHip] = useState(90); // cm (only for female)

  // US Navy Formulas (Requires metrics in cm, using logarithms)
  let bf = 0;
  if (gender === 'male') {
    if (waist - neck > 0 && height > 0) {
      bf = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
    }
  } else {
    // female
    if (waist + hip - neck > 0 && height > 0) {
      bf = 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387;
    }
  }

  // Bound extreme ratios to realistic body physics
  bf = Math.max(2, Math.min(60, bf));

  const getBfCategory = (val: number, sex: 'male' | 'female') => {
    if (sex === 'male') {
      if (val < 6) return 'Essential Fat (under 6%)';
      if (val >= 6 && val < 14) return 'Athletic Range';
      if (val >= 14 && val < 18) return 'Fitness Standard';
      if (val >= 18 && val < 25) return 'Average Range';
      return 'Excess Level';
    } else {
      if (val < 14) return 'Essential Fat (under 14%)';
      if (val >= 14 && val < 21) return 'Athletic Range';
      if (val >= 21 && val < 25) return 'Fitness Standard';
      if (val >= 25 && val < 32) return 'Average Range';
      return 'Excess Level';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3 bg-gray-50 dark:bg-zinc-900 p-5 rounded-2xl border border-gray-100 dark:border-zinc-800 text-xs">
          <h3 className="font-semibold text-gray-800 dark:text-zinc-200 text-sm mb-2">Anatomic Circumferences (cm)</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-gray-600 dark:text-zinc-400 mb-0.5">Biological Gender</label>
              <select value={gender} onChange={e => setGender(e.target.value as 'male' | 'female')} className="w-full px-2 py-1.5 rounded-lg border bg-white dark:bg-zinc-800 dark:border-zinc-700">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-600 dark:text-zinc-400 mb-0.5">Height (cm)</label>
              <input type="number" value={height} onChange={e => setHeight(Math.max(50, Number(e.target.value)))} className="w-full px-2 py-1.5 rounded-lg border bg-white dark:bg-zinc-800 dark:border-zinc-700" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-gray-600 dark:text-zinc-400 mb-0.5">Waist Circle (cm)</label>
              <input type="number" value={waist} onChange={e => setWaist(Math.max(30, Number(e.target.value)))} className="w-full px-2 py-1.5 rounded-lg border bg-white dark:bg-zinc-800 dark:border-zinc-700" />
            </div>
            <div>
              <label className="block text-gray-600 dark:text-zinc-400 mb-0.5">Neck Circle (cm)</label>
              <input type="number" value={neck} onChange={e => setNeck(Math.max(15, Number(e.target.value)))} className="w-full px-2 py-1.5 rounded-lg border bg-white dark:bg-zinc-800 dark:border-zinc-700" />
            </div>
          </div>
          {gender === 'female' && (
            <div className="w-1/2">
              <label className="block text-gray-600 dark:text-zinc-400 mb-0.5">Hip Circle (cm)</label>
              <input type="number" value={hip} onChange={e => setHip(Math.max(30, Number(e.target.value)))} className="w-full px-2 py-1.5 rounded-lg border bg-white dark:bg-zinc-800 dark:border-zinc-700" />
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between bg-emerald-50/50 dark:bg-emerald-950/20 p-6 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/30">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider">Estimated Body Fat Percentage</span>
              <CopyButton value={`${bf.toFixed(1)}%`} />
            </div>
            <div className="text-5xl font-extrabold text-emerald-900 dark:text-emerald-300 mt-2">{bf.toFixed(1)}%</div>
          </div>
          <div className="mt-4 pt-4 border-t border-emerald-100/30 dark:border-emerald-800/20 text-xs">
            <span className="text-gray-500 dark:text-zinc-400 block mb-1">Body fat fitness category:</span>
            <div className="text-sm font-extrabold text-gray-800 dark:text-zinc-100">{getBfCategory(bf, gender)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 7. BMR CALCULATOR ---
export function BMRCalculator() {
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState(70); // kg
  const [height, setHeight] = useState(175); // cm

  // Mifflin-St Jeor Equation
  const bmr = gender === 'male'
    ? (10 * weight) + (6.25 * height) - (5 * age) + 5
    : (10 * weight) + (6.25 * height) - (5 * age) - 161;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-gray-50 dark:bg-zinc-900 p-5 rounded-2xl border border-gray-100 dark:border-zinc-800 text-xs">
          <h3 className="font-semibold text-gray-800 dark:text-zinc-200 text-sm mb-2">Resting Metabolic Parameters</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-600 dark:text-zinc-400 mb-1">Biological sex</label>
              <select value={gender} onChange={e => setGender(e.target.value as 'male' | 'female')} className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-zinc-800 dark:border-zinc-700 text-sm">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-600 dark:text-zinc-400 mb-1">Age (Years)</label>
              <input type="number" value={age} onChange={e => setAge(Math.max(1, Number(e.target.value)))} className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-zinc-800 dark:border-zinc-700 text-sm" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-600 dark:text-zinc-400 mb-1">Weight (kg)</label>
              <input type="number" value={weight} onChange={e => setWeight(Math.max(1, Number(e.target.value)))} className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-zinc-800 dark:border-zinc-700 text-sm" />
            </div>
            <div>
              <label className="block text-gray-600 dark:text-zinc-400 mb-1">Height (cm)</label>
              <input type="number" value={height} onChange={e => setHeight(Math.max(1, Number(e.target.value)))} className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-zinc-800 dark:border-zinc-700 text-sm" />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between bg-emerald-50/50 dark:bg-emerald-950/20 p-6 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/30">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider">Your Basal Metabolic Rate (BMR)</span>
              <CopyButton value={`${Math.round(bmr)} kcal`} />
            </div>
            <div className="text-4xl font-extrabold text-emerald-900 dark:text-emerald-300 mt-2">{Math.round(bmr)} <span className="text-lg font-normal text-gray-500">kcal/day</span></div>
          </div>
          <div className="mt-4 p-4 rounded-xl bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700/50 text-xs text-grat-500 text-gray-500 leading-relaxed">
            Your BMR represents the total calories required to support passive involuntary life-supporting biological operations (including breathing, circulating blood, cellular growth) without any active exertion.
          </div>
        </div>
      </div>
    </div>
  );
}
