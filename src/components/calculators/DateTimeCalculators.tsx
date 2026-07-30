import React, { useState, useEffect, useRef } from 'react';
import CopyButton from '../CopyButton';

// --- 1. AGE CALCULATOR ---
export function AgeCalculator() {
  const [dob, setDob] = useState('1998-05-15');
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);

  const calculateAgeDetails = () => {
    const dobObj = new Date(dob);
    const targetObj = new Date(targetDate);

    if (isNaN(dobObj.getTime()) || isNaN(targetObj.getTime()) || dobObj > targetObj) {
      return null;
    }

    let years = targetObj.getFullYear() - dobObj.getFullYear();
    let months = targetObj.getMonth() - dobObj.getMonth();
    let days = targetObj.getDate() - dobObj.getDate();

    if (days < 0) {
      months--;
      // get days in previous month
      const prevMonth = new Date(targetObj.getFullYear(), targetObj.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Secondary metrics
    const totalMs = targetObj.getTime() - dobObj.getTime();
    const totalDays = Math.floor(totalMs / (24 * 60 * 60 * 1000));
    const totalWeeks = Math.floor(totalDays / 7);
    const remainingDaysAfterWeeks = totalDays % 7;
    const totalMonths = (years * 12) + months;

    return {
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      remainingDaysAfterWeeks,
      totalMonths,
      totalHours: totalDays * 24,
      totalMinutes: totalDays * 24 * 60,
      totalSeconds: totalDays * 24 * 60 * 60
    };
  };

  const age = calculateAgeDetails();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-gray-50 dark:bg-zinc-900 p-5 rounded-2xl border border-gray-100 dark:border-zinc-800">
          <h3 className="font-semibold text-gray-800 dark:text-zinc-200">Lifespan Timeline</h3>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Date of Birth</label>
            <input type="date" value={dob} onChange={e => setDob(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Age at Date (Defaults to today)</label>
            <input type="date" value={targetDate} onChange={e => setTargetDate(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
          </div>
        </div>

        <div className="flex flex-col justify-between bg-emerald-50/50 dark:bg-emerald-950/20 p-6 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/30">
          {age ? (
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider">Chronological Age</span>
                <CopyButton value={`${age.years} Years, ${age.months} Months, ${age.days} Days`} />
              </div>
              <div className="text-3xl font-extrabold text-emerald-900 dark:text-emerald-300 mt-2">
                {age.years} Years, {age.months} Months, {age.days} Days
              </div>

              <div className="space-y-2 mt-6 pt-6 border-t border-emerald-100/30 dark:border-emerald-800/20 text-xs">
                <div className="flex justify-between"><span>Total Months:</span> <strong className="text-gray-800 dark:text-zinc-100">{age.totalMonths} months</strong></div>
                <div className="flex justify-between"><span>Total Weeks:</span> <strong className="text-gray-800 dark:text-zinc-100">{age.totalWeeks} weeks, {age.remainingDaysAfterWeeks} days</strong></div>
                <div className="flex justify-between"><span>Total Days:</span> <strong className="text-gray-800 dark:text-zinc-100">{age.totalDays.toLocaleString()} days</strong></div>
                <div className="flex justify-between"><span>Total Hours elapsed:</span> <strong className="text-gray-800 dark:text-zinc-100">{age.totalHours.toLocaleString()} hours</strong></div>
                <div className="flex justify-between"><span>Total Seconds elapsed:</span> <strong className="text-gray-800 dark:text-zinc-100">{age.totalSeconds.toLocaleString()} seconds</strong></div>
              </div>
            </div>
          ) : (
            <div className="text-sm font-semibold text-rose-500">
              Please enter valid chronological dates (Date of Birth must be prior to the relative target date).
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- 2. DATE DIFFERENCE CALCULATOR ---
export function DateDifferenceCalculator() {
  const [start, setStart] = useState('2026-01-01');
  const [end, setEnd] = useState('2026-12-31');
  const [includeEnd, setIncludeEnd] = useState(false);

  const calculateSpread = () => {
    const sObj = new Date(start);
    const eObj = new Date(end);

    if (isNaN(sObj.getTime()) || isNaN(eObj.getTime())) return null;

    let totalMs = eObj.getTime() - sObj.getTime();
    if (includeEnd) {
      totalMs += (24 * 60 * 60 * 1000); // add 1 day
    }

    const totalDays = Math.round(totalMs / (24 * 60 * 60 * 1000));
    const weeks = Math.floor(totalDays / 7);
    const modDays = totalDays % 7;

    return {
      totalDays,
      weeks,
      modDays
    };
  };

  const spread = calculateSpread();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-gray-50 dark:bg-zinc-900 p-5 rounded-2xl border border-gray-100 dark:border-zinc-800">
          <h3 className="font-semibold text-gray-800 dark:text-zinc-200">Gaps</h3>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Starting Date</label>
            <input type="date" value={start} onChange={e => setStart(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Ending Target Date</label>
            <input type="date" value={end} onChange={e => setEnd(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="includeEnd" checked={includeEnd} onChange={e => setIncludeEnd(e.target.checked)} className="mr-2 accent-emerald-500" />
            <label htmlFor="includeEnd" className="text-xs text-gray-700 dark:text-zinc-400 font-medium cursor-pointer">Include end day in aggregate calculations (+1 day)</label>
          </div>
        </div>

        <div className="flex flex-col justify-between bg-emerald-50/50 dark:bg-emerald-950/20 p-6 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/30">
          {spread ? (
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider">Gap Distance</span>
                <CopyButton value={`${Math.abs(spread.totalDays)} Days`} />
              </div>
              <div className="text-5xl font-black text-emerald-900 dark:text-emerald-300 mt-2">
                {Math.abs(spread.totalDays)} <span className="text-lg font-normal text-gray-500">Days</span>
              </div>
              <div className="text-sm font-semibold text-gray-700 dark:text-zinc-300 mt-2">
                Equivalent to: {spread.weeks} Weeks and {spread.modDays} Days
              </div>
            </div>
          ) : (
            <div className="text-sm font-semibold text-rose-500">
              Select proper date endpoints.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- 3. COUNTDOWN TIMER ---
export function CountdownTimer() {
  const [targetTimeStr, setTargetTimeStr] = useState(() => {
    const future = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000); // 5 days from now default
    return future.toISOString().slice(0, 16);
  });

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, completed: false });
  const intervalRef = useRef<any>(null);

  const runTick = () => {
    const epochTarget = new Date(targetTimeStr).getTime();
    if (isNaN(epochTarget)) return;

    const delta = epochTarget - Date.now();

    if (delta <= 0) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, completed: true });
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      const days = Math.floor(delta / (24 * 60 * 60 * 1000));
      const hours = Math.floor((delta % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
      const minutes = Math.floor((delta % (60 * 60 * 1000)) / (60 * 1000));
      const seconds = Math.floor((delta % (60 * 1000)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds, completed: false });
    }
  };

  useEffect(() => {
    runTick();
    intervalRef.current = setInterval(runTick, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [targetTimeStr]);

  const handleSetSample = (mins: number) => {
    const future = new Date(Date.now() + mins * 60 * 1000);
    setTargetTimeStr(future.toISOString().slice(0, 16));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-gray-50 dark:bg-zinc-900 p-5 rounded-2xl border border-gray-100 dark:border-zinc-800 text-xs">
          <h3 className="font-semibold text-gray-800 dark:text-zinc-200 text-sm">Timer Settings</h3>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Target End Year / Date / Hour</label>
            <input type="datetime-local" value={targetTimeStr} onChange={e => setTargetTimeStr(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500" />
          </div>
          <div className="pt-2">
            <span className="block text-gray-500 dark:text-zinc-400 mb-1">Quick Add shortcuts:</span>
            <div className="flex gap-2">
              <button onClick={() => handleSetSample(5)} className="px-3 py-1 bg-white dark:bg-zinc-800 text-slate-800 dark:text-white border border-slate-200 dark:border-zinc-700 rounded-lg shadow-2xs text-xs font-medium hover:border-slate-300 dark:hover:border-zinc-600 transition-colors cursor-pointer">5 Minutes</button>
              <button onClick={() => handleSetSample(60)} className="px-3 py-1 bg-white dark:bg-zinc-800 text-slate-800 dark:text-white border border-slate-200 dark:border-zinc-700 rounded-lg shadow-2xs text-xs font-medium hover:border-slate-300 dark:hover:border-zinc-600 transition-colors cursor-pointer">1 Hour</button>
              <button onClick={() => handleSetSample(24 * 60)} className="px-3 py-1 bg-white dark:bg-zinc-800 text-slate-800 dark:text-white border border-slate-200 dark:border-zinc-700 rounded-lg shadow-2xs text-xs font-medium hover:border-slate-300 dark:hover:border-zinc-600 transition-colors cursor-pointer">1 Day</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between bg-emerald-50/50 dark:bg-emerald-950/20 p-6 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/30">
          <div>
            <span className="text-xs uppercase font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider">Time Remaining</span>
            {timeLeft.completed ? (
              <div className="text-3xl font-extrabold text-rose-600 mt-4">Target Countdown Arrived! 🎉</div>
            ) : (
              <div className="grid grid-cols-4 gap-2 text-center mt-4">
                <div className="bg-white dark:bg-zinc-800 p-3 rounded-xl border">
                  <div className="text-3xl font-black text-gray-900 dark:text-emerald-400">{timeLeft.days}</div>
                  <div className="text-[10px] text-gray-500 font-mono">Days</div>
                </div>
                <div className="bg-white dark:bg-zinc-800 p-3 rounded-xl border">
                  <div className="text-3xl font-black text-gray-900 dark:text-emerald-400">{timeLeft.hours}</div>
                  <div className="text-[10px] text-gray-500 font-mono">Hours</div>
                </div>
                <div className="bg-white dark:bg-zinc-800 p-3 rounded-xl border">
                  <div className="text-3xl font-black text-gray-900 dark:text-emerald-400">{timeLeft.minutes}</div>
                  <div className="text-[10px] text-gray-500 font-mono">Mins</div>
                </div>
                <div className="bg-white dark:bg-zinc-800 p-3 rounded-xl border animate-pulse">
                  <div className="text-3xl font-black text-gray-900 dark:text-emerald-400">{timeLeft.seconds}</div>
                  <div className="text-[10px] text-gray-500 font-mono">Secs</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 4. TIME DURATION CALCULATOR ---
export function TimeDurationCalculator() {
  const [stamp1, setStamp1] = useState('09:00');
  const [stamp2, setStamp2] = useState('17:30');

  // Multi-session state for adder
  const [addedSessions, setAddedSessions] = useState<{ id: number; hours: number; minutes: number }[]>([
    { id: 1, hours: 2, minutes: 45 },
    { id: 2, hours: 3, minutes: 15 }
  ]);

  const getSingleDelta = () => {
    const [h1, m1] = stamp1.split(':').map(Number);
    const [h2, m2] = stamp2.split(':').map(Number);

    if (isNaN(h1) || isNaN(m1) || isNaN(h2) || isNaN(m2)) return null;

    let deltaMins = (h2 * 60 + m2) - (h1 * 60 + m1);
    if (deltaMins < 0) {
      deltaMins += 24 * 60; // adjust past midnight
    }

    const tHours = Math.floor(deltaMins / 60);
    const tMins = deltaMins % 60;
    return { hours: tHours, minutes: minsDecimal(tMins) };
  };

  const minsDecimal = (val: number) => val;

  const handleAddSession = () => {
    setAddedSessions([...addedSessions, { id: Date.now(), hours: 1, minutes: 0 }]);
  };

  const handleRemoveSession = (id: number) => {
    setAddedSessions(addedSessions.filter(s => s.id !== id));
  };

  const handleSessionChange = (id: number, key: 'hours' | 'minutes', value: number) => {
    setAddedSessions(addedSessions.map(s => {
      if (s.id === id) {
        return { ...s, [key]: Math.max(0, value) };
      }
      return s;
    }));
  };

  // Compute sum totals of session durations
  const totalMinSums = addedSessions.reduce((acc, curr) => acc + (curr.hours * 60 + curr.minutes), 0);
  const sumHours = Math.floor(totalMinSums / 60);
  const sumMins = totalMinSums % 60;

  const singleDiffResult = getSingleDelta();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Single Clock Difference */}
        <div className="bg-gray-50 dark:bg-zinc-900 p-5 rounded-2xl border border-gray-100 dark:border-zinc-800 space-y-4">
          <h3 className="font-semibold text-gray-800 dark:text-zinc-200">Session Clock Range Difference</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="block text-xs text-gray-500 dark:text-zinc-400 mb-1">Punch In Time</span>
              <input type="time" value={stamp1} onChange={e => setStamp1(e.target.value)} className="w-full px-2 py-1 border border-slate-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-100" />
            </div>
            <div>
              <span className="block text-xs text-gray-500 dark:text-zinc-400 mb-1">Punch Out Time</span>
              <input type="time" value={stamp2} onChange={e => setStamp2(e.target.value)} className="w-full px-2 py-1 border border-slate-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-100" />
            </div>
          </div>
          {singleDiffResult && (
            <div className="mt-4 pt-3 border-t flex justify-between items-center text-xs">
              <span className="text-gray-500">Calculated Elapsed Time:</span>
              <div className="flex items-center gap-2">
                <strong className="text-md text-emerald-600 dark:text-emerald-400">{singleDiffResult.hours} hours, {singleDiffResult.minutes} minutes</strong>
                <CopyButton value={`${singleDiffResult.hours} hours, ${singleDiffResult.minutes} minutes`} />
              </div>
            </div>
          )}
        </div>

        {/* Multi-Session Duration Accumulator */}
        <div className="bg-gray-50 dark:bg-zinc-900 p-5 rounded-2xl border border-gray-100 dark:border-zinc-800 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-800 dark:text-zinc-200 text-sm">Add / Accumulate Task Durations</h3>
            <button onClick={handleAddSession} className="text-xs px-2.5 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded font-semibold active:scale-95 transition-all">+ Add Row</button>
          </div>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
            {addedSessions.map((row, idx) => (
              <div key={row.id} className="flex gap-2 items-center">
                <span className="text-[10px] text-gray-400 font-mono">Row #{idx+1}</span>
                <input type="number" placeholder="Hrs" value={row.hours} onChange={e => handleSessionChange(row.id, 'hours', Number(e.target.value))} className="w-16 px-1.5 py-1 text-center border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 rounded font-mono text-xs" />
                <span className="text-gray-400 dark:text-zinc-400">hr</span>
                <input type="number" placeholder="Mins" value={row.minutes} onChange={e => handleSessionChange(row.id, 'minutes', Number(e.target.value))} className="w-16 px-1.5 py-1 text-center border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 rounded font-mono text-xs" />
                <span className="text-gray-400">min</span>
                <button onClick={() => handleRemoveSession(row.id)} className="text-[10px] text-rose-500 hover:underline inline ml-auto font-mono">Remove</button>
              </div>
            ))}
          </div>
          <div className="pt-3 border-t dark:border-zinc-800 flex justify-between items-center text-xs">
            <span className="text-gray-500">Gross Cumulative Time Sum:</span>
            <div className="flex items-center gap-2">
              <strong className="text-base text-emerald-600 dark:text-emerald-400">{sumHours} hr, {sumMins} min</strong>
              <CopyButton value={`${sumHours} hr, ${sumMins} min`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
