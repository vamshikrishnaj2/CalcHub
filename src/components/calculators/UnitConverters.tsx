import React, { useState } from 'react';
import CopyButton from '../CopyButton';

// Common layout for all converters to avoid duplicate code
interface UnitGroupProps {
  label: string;
  units: { [key: string]: number }; // key: unit label, value: scale factor relative to base unit
  defaultFrom: string;
  defaultTo: string;
  isTemp?: boolean;
}

function UniversalConverter({ label, units, defaultFrom, defaultTo, isTemp = false }: UnitGroupProps) {
  const [val, setVal] = useState<number>(10);
  const [fromUnit, setFromUnit] = useState<string>(defaultFrom);
  const [toUnit, setToUnit] = useState<string>(defaultTo);

  const performConversion = (): number => {
    if (isTemp) {
      // Temperature uses specific custom functions, not basic multiplication coefficients
      if (fromUnit === 'Celsius' && toUnit === 'Fahrenheit') return (val * 9/5) + 32;
      if (fromUnit === 'Celsius' && toUnit === 'Kelvin') return val + 273.15;
      if (fromUnit === 'Fahrenheit' && toUnit === 'Celsius') return (val - 32) * 5/9;
      if (fromUnit === 'Fahrenheit' && toUnit === 'Kelvin') return ((val - 32) * 5/9) + 273.15;
      if (fromUnit === 'Kelvin' && toUnit === 'Celsius') return val - 273.15;
      if (fromUnit === 'Kelvin' && toUnit === 'Fahrenheit') return ((val - 273.15) * 9/5) + 32;
      return val; // identity
    }

    const factorFrom = units[fromUnit] || 1;
    const factorTo = units[toUnit] || 1;

    // Convert into base notation then scale to target coefficient
    const valInBase = val / factorFrom;
    return valInBase * factorTo;
  };

  const finalValue = performConversion();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-gray-50 dark:bg-zinc-900 p-5 rounded-2xl border border-gray-100 dark:border-zinc-800">
          <h3 className="font-semibold text-gray-800 dark:text-zinc-200">{label} Dimensions</h3>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Enter Quantity value</label>
            <input type="number" value={val} onChange={e => setVal(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 focus:ring-1 focus:ring-emerald-500 text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Scale From</label>
              <select value={fromUnit} onChange={e => setFromUnit(e.target.value)} className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-zinc-800 text-sm">
                {Object.keys(units).map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Scale To</label>
              <select value={toUnit} onChange={e => setToUnit(e.target.value)} className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-zinc-800 text-sm">
                {Object.keys(units).map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between bg-emerald-50/50 dark:bg-emerald-950/20 p-6 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/30">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider">Converted Dimension</span>
              <CopyButton value={`${finalValue.toLocaleString('en-US', { maximumFractionDigits: 5 })} ${toUnit}`} />
            </div>
            <div className="text-4xl font-extrabold text-emerald-900 dark:text-emerald-300 mt-2">
              {finalValue.toLocaleString('en-US', { maximumFractionDigits: 5 })}
              <span className="text-xl font-normal text-gray-500 ml-1.5">{toUnit}</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-emerald-100/30 dark:border-emerald-800/20 text-[11px] text-gray-500 dark:text-zinc-400">
            Computed conversion highlights: <strong>{val} {fromUnit}</strong> equates exactly to <strong>{finalValue.toLocaleString('en-US', { maximumFractionDigits: 5 })} {toUnit}</strong>.
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 1. LENGTH CONVERTER ---
export function LengthConverter() {
  // Base unit: Meter
  const lengthFactors = {
    Meter: 1,
    Centimeter: 100,
    Millimeter: 1000,
    Kilometer: 0.001,
    Inch: 39.3701,
    Foot: 3.28084,
    Yard: 1.09361,
    Mile: 0.000621371
  };
  return <UniversalConverter label="Length" units={lengthFactors} defaultFrom="Meter" defaultTo="Foot" />;
}

// --- 2. WEIGHT CONVERTER ---
export function WeightConverter() {
  // Base unit: Kilogram
  const weightFactors = {
    Kilogram: 1,
    Gram: 1000,
    Milligram: 1000000,
    Pound: 2.20462,
    Ounce: 35.274,
    Ton: 0.00110231 // US Short Ton
  };
  return <UniversalConverter label="Weight & Mass" units={weightFactors} defaultFrom="Kilogram" defaultTo="Pound" />;
}

// --- 3. TEMPERATURE CONVERTER ---
export function TemperatureConverter() {
  const tempFactors = {
    Celsius: 1,
    Fahrenheit: 1,
    Kelvin: 1
  };
  return <UniversalConverter label="Thermodynamic Temperature" units={tempFactors} defaultFrom="Celsius" defaultTo="Fahrenheit" isTemp={true} />;
}

// --- 4. SPEED CONVERTER ---
export function SpeedConverter() {
  // Base unit: KPH
  const speedFactors = {
    'Km/h (KPH)': 1,
    'Miles/h (MPH)': 0.621371,
    'Meters/sec (m/s)': 0.277778,
    Knots: 0.539957
  };
  return <UniversalConverter label="Velocity Speed" units={speedFactors} defaultFrom="Km/h (KPH)" defaultTo="Miles/h (MPH)" />;
}

// --- 5. AREA CONVERTER ---
export function AreaConverter() {
  // Base unit: Square Meter
  const areaFactors = {
    'Square Meter': 1,
    'Square Foot': 10.7639,
    'Square Kilometer': 0.000001,
    Acre: 0.000247105,
    Hectare: 0.0001
  };
  return <UniversalConverter label="Area Surface" units={areaFactors} defaultFrom="Square Meter" defaultTo="Acre" />;
}

// --- 6. VOLUME CONVERTER ---
export function VolumeConverter() {
  // Base unit: Liter
  const volumeFactors = {
    Liter: 1,
    Milliliter: 1000,
    Gallon: 0.264172,
    Cup: 4.22675,
    'Cubic Meter': 0.001,
    Quart: 1.05669
  };
  return <UniversalConverter label="Volume / Liquid" units={volumeFactors} defaultFrom="Liter" defaultTo="Gallon" />;
}
