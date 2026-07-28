import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Homepage from './components/Homepage';
import CalculatorLayout from './components/CalculatorLayout';
import AboutPage from './components/AboutPage';

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-gray-800 dark:text-zinc-100 flex flex-col font-sans transition-colors duration-150 selection:bg-emerald-500/20 selection:text-emerald-500">
        <Navbar />
        
        {/* Router Boundaries */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/:category/:calculatorId" element={<CalculatorLayout />} />
            {/* Fallback route redirection */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </HashRouter>
  );
}
