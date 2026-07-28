import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, Clock, Sun, Moon, Sparkles, Terminal, Menu, X, Info, Calculator, ArrowRight } from 'lucide-react';
import { calculatorsList } from '../data/calculatorsList';

export default function Navbar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<typeof calculatorsList>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recents, setRecents] = useState<string[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const [favDropdownOpen, setFavDropdownOpen] = useState(false);
  const [recentDropdownOpen, setRecentDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const favRef = useRef<HTMLDivElement>(null);
  const recentRef = useRef<HTMLDivElement>(null);

  // Load localStorage assets
  const loadSyncAssets = () => {
    const listFavs = JSON.parse(localStorage.getItem('favCalculators') || '[]');
    setFavorites(listFavs);

    const listRecs = JSON.parse(localStorage.getItem('recentCalculators') || '[]');
    setRecents(listRecs);
  };

  useEffect(() => {
    loadSyncAssets();

    // Listen for custom storage shifts (e.g. from CalculatorLayout toggle actions)
    window.addEventListener('storage', loadSyncAssets);

    // Initial theme checks
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }

    // Capture clicks outside dropdowns to close them gracefully
    const handleOutsideClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchQuery('');
        setSuggestions([]);
      }
      if (favRef.current && !favRef.current.contains(e.target as Node)) {
        setFavDropdownOpen(false);
      }
      if (recentRef.current && !recentRef.current.contains(e.target as Node)) {
        setRecentDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      window.removeEventListener('storage', loadSyncAssets);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  // Filter search matches
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSuggestions([]);
      return;
    }
    const query = searchQuery.toLowerCase().trim();
    const filtered = calculatorsList.filter(
      c => c.title.toLowerCase().includes(query) ||
           c.description.toLowerCase().includes(query) ||
           c.category.toLowerCase().includes(query) ||
           c.id.toLowerCase().includes(query) ||
           (c.metaTitle && c.metaTitle.toLowerCase().includes(query)) ||
           (c.metaDescription && c.metaDescription.toLowerCase().includes(query))
    );
    setSuggestions(filtered);
  }, [searchQuery]);

  const handleToggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    }
  };

  const handleSelectSuggestion = (path: string) => {
    setSearchQuery('');
    setSuggestions([]);
    navigate(path);
  };

  const favCalcs = calculatorsList.filter(c => favorites.includes(c.id));
  const recentCalcs = calculatorsList.filter(c => recents.includes(c.id));

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-gray-100 dark:border-zinc-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo container */}
          <Link to="/" aria-label="CalcHub Home" className="flex items-center gap-2 group shrink-0">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white font-black text-lg shadow-sm group-hover:scale-105 transition-all">
              %
            </div>
            <span className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white tracking-tight">
              CalcHub
            </span>
          </Link>

          {/* Autocomplete Search Bar */}
          <form
            onSubmit={e => {
              e.preventDefault();
              if (suggestions.length > 0) {
                handleSelectSuggestion(suggestions[0].path);
              }
            }}
            ref={searchRef}
            className="relative flex-grow max-w-md hidden sm:block"
          >
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                aria-label="Search online calculators"
                placeholder="Search GST, EMI, SIP, BMI, Age Calculator..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Escape') {
                    setSearchQuery('');
                  }
                }}
                className="w-full pl-9 pr-8 py-1.5 rounded-full text-xs font-medium border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 text-gray-800 dark:text-zinc-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 focus:bg-white dark:focus:bg-zinc-900 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                  title="Clear search"
                >
                  <X size={12} />
                </button>
              )}
            </div>
            {/* Suggestions dropdown */}
            {searchQuery.trim() !== '' && (
              <div className="absolute top-full mt-2 left-0 right-0 max-h-80 overflow-y-auto bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-xl z-50 p-2 text-left">
                <div className="flex items-center justify-between px-2 py-1 mb-1 border-b border-gray-100 dark:border-zinc-800 text-[11px] text-gray-500 dark:text-zinc-400">
                  <span className="font-semibold text-[10px] uppercase tracking-wider">
                    Results ({suggestions.length})
                  </span>
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="hover:text-gray-900 dark:hover:text-white transition-colors text-[10px]"
                  >
                    Clear
                  </button>
                </div>

                {suggestions.length > 0 ? (
                  <div className="space-y-1">
                    {suggestions.map(c => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => handleSelectSuggestion(c.path)}
                        className="w-full flex justify-between items-center p-2 hover:bg-slate-50 dark:hover:bg-zinc-800/60 rounded-xl transition-colors group text-left"
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                          <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors shrink-0">
                            <Calculator size={14} />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-gray-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                                {c.title}
                              </span>
                              <span className="text-[9px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded-full shrink-0">
                                {c.category}
                              </span>
                            </div>
                            <p className="text-[10px] text-gray-500 dark:text-zinc-400 line-clamp-1 mt-0.5">
                              {c.description}
                            </p>
                          </div>
                        </div>
                        <ArrowRight size={13} className="text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors shrink-0" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-400 dark:text-zinc-500 text-xs">
                    No calculators found for "{searchQuery}".
                  </div>
                )}
              </div>
            )}
          </form>

          {/* Desktop Right items */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Favorites dropdown */}
            <div ref={favRef} className="relative hidden md:block">
              <button
                onClick={() => { setFavDropdownOpen(!favDropdownOpen); setRecentDropdownOpen(false); }}
                className="p-1.5 text-gray-600 hover:text-emerald-500 dark:text-zinc-400 transition-colors relative"
                title="Favorited Calculators"
                aria-label="View saved favorite calculators"
              >
                <Heart size={18} className={favCalcs.length > 0 ? 'fill-emerald-500 stroke-emerald-500' : ''} />
                {favCalcs.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-emerald-500 text-[8px] font-bold text-white flex items-center justify-center">
                    {favCalcs.length}
                  </span>
                )}
              </button>
              {favDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-xl py-2 px-1 text-xs">
                  <div className="font-bold text-gray-800 dark:text-zinc-200 px-3 py-1.5 border-b dark:border-zinc-800">Favorites ({favCalcs.length})</div>
                  {favCalcs.length > 0 ? (
                    <div className="max-h-60 overflow-y-auto mt-1">
                      {favCalcs.map(fav => (
                        <Link
                          key={fav.id}
                          to={fav.path}
                          onClick={() => setFavDropdownOpen(false)}
                          className="flex flex-col p-2 hover:bg-slate-50 dark:hover:bg-zinc-850 rounded-lg transition-colors"
                        >
                          <span className="font-bold text-gray-800 dark:text-zinc-200">{fav.title}</span>
                          <span className="text-[10px] text-gray-400 line-clamp-1 mt-0.5">{fav.description}</span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-400 italic">No favorites tagged yet. Click the heart on any calculator page.</div>
                  )}
                </div>
              )}
            </div>

            {/* Recents dropdown */}
            <div ref={recentRef} className="relative hidden md:block">
              <button
                onClick={() => { setRecentDropdownOpen(!recentDropdownOpen); setFavDropdownOpen(false); }}
                className="p-1.5 text-gray-600 hover:text-emerald-500 dark:text-zinc-400 transition-colors relative"
                title="Recently used"
                aria-label="View recently used calculators"
              >
                <Clock size={18} />
                {recentCalcs.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                )}
              </button>
              {recentDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-xl py-2 px-1 text-xs">
                  <div className="font-bold text-gray-800 dark:text-zinc-200 px-3 py-1.5 border-b dark:border-zinc-800">Recently Used</div>
                  {recentCalcs.length > 0 ? (
                    <div className="max-h-60 overflow-y-auto mt-1">
                      {recentCalcs.map(rec => (
                        <Link
                          key={rec.id}
                          to={rec.path}
                          onClick={() => setRecentDropdownOpen(false)}
                          className="flex flex-col p-2 hover:bg-slate-50 dark:hover:bg-zinc-850 rounded-lg transition-colors"
                        >
                          <span className="font-bold text-gray-800 dark:text-zinc-200">{rec.title}</span>
                          <span className="text-[10px] text-gray-400 line-clamp-1 mt-0.5">{rec.description}</span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-400 italic">No recently visited calculators.</div>
                  )}
                </div>
              )}
            </div>

            {/* About Link */}
            <Link
              to="/about"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-gray-600 dark:text-zinc-400 hover:text-emerald-500 hover:bg-slate-50 dark:hover:bg-zinc-900/60 rounded-full transition-colors"
            >
              <Info size={14} /> About
            </Link>

            {/* Theme trigger */}
            <button
              onClick={handleToggleTheme}
              className="p-1.5 text-gray-600 dark:text-zinc-400 hover:text-emerald-500 transition-colors"
              title="Toggle theme mode"
              aria-label="Toggle light and dark theme mode"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="sm:hidden p-1 text-gray-600 dark:text-zinc-400 hover:text-emerald-500"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Responsive Header menu drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-4 space-y-4">
          {/* Mobile search */}
          <form
            onSubmit={e => {
              e.preventDefault();
              if (suggestions.length > 0) {
                handleSelectSuggestion(suggestions[0].path);
                setMobileMenuOpen(false);
              }
            }}
            className="relative"
          >
            <div className="relative flex items-center">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                aria-label="Search online calculators"
                placeholder="Search GST, EMI, SIP, BMI, Age Calculator..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Escape') {
                    setSearchQuery('');
                  }
                }}
                className="w-full pl-8 pr-7 py-2 rounded-xl text-xs font-medium border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900 text-gray-800 dark:text-zinc-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full"
                  title="Clear search"
                >
                  <X size={12} />
                </button>
              )}
            </div>
            {searchQuery.trim() !== '' && (
              <div className="absolute top-full mt-1.5 left-0 right-0 max-h-60 overflow-y-auto bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-lg z-50 p-2 text-left">
                <div className="flex items-center justify-between px-2 py-1 mb-1 border-b border-gray-100 dark:border-zinc-800 text-[11px] text-gray-500 dark:text-zinc-400">
                  <span className="font-semibold text-[10px] uppercase tracking-wider">
                    Results ({suggestions.length})
                  </span>
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="hover:text-gray-900 dark:hover:text-white transition-colors text-[10px]"
                  >
                    Clear
                  </button>
                </div>
                {suggestions.length > 0 ? (
                  <div className="space-y-1">
                    {suggestions.map(c => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => { handleSelectSuggestion(c.path); setMobileMenuOpen(false); }}
                        className="w-full flex justify-between items-center p-2 hover:bg-slate-50 dark:hover:bg-zinc-800/60 rounded-lg text-left group"
                      >
                        <div className="flex items-center gap-2 min-w-0 pr-2">
                          <Calculator size={14} className="text-gray-400 group-hover:text-emerald-600 shrink-0" />
                          <div className="min-w-0">
                            <span className="text-xs font-bold text-gray-800 dark:text-zinc-200 block truncate group-hover:text-emerald-600">
                              {c.title}
                            </span>
                            <span className="text-[10px] text-gray-400 line-clamp-1 block">
                              {c.description}
                            </span>
                          </div>
                        </div>
                        <ArrowRight size={12} className="text-gray-400 shrink-0" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 text-center text-gray-400 text-xs">
                    No calculators found for "{searchQuery}".
                  </div>
                )}
              </div>
            )}
          </form>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button onClick={() => { setFavDropdownOpen(true); setRecentDropdownOpen(false); }} className="p-2.5 border rounded-xl bg-slate-50/50 flex items-center justify-center gap-1.5 text-gray-600 font-semibold">
              <Heart size={14} className={favCalcs.length > 0 ? 'fill-emerald-500 stroke-emerald-500' : ''} />
              Saved ({favorites.length})
            </button>
            <button onClick={() => { setRecentDropdownOpen(true); setFavDropdownOpen(false); }} className="p-2.5 border rounded-xl bg-slate-50/50 flex items-center justify-center gap-1.5 text-gray-600 font-semibold">
              <Clock size={14} />
              Recents ({recents.length})
            </button>
          </div>

          {/* Quick lists on active drawers */}
          {favDropdownOpen && favCalcs.length > 0 && (
            <div className="border-t pt-3">
              <span className="text-[10px] uppercase font-bold text-gray-400 mb-1.5 block">Mobile Saved favorites</span>
              <div className="grid grid-cols-1 gap-1">
                {favCalcs.map(fav => (
                  <Link key={fav.id} to={fav.path} onClick={() => setMobileMenuOpen(false)} className="px-2.5 py-1.5 bg-slate-50 dark:bg-zinc-900 rounded font-bold text-xs text-gray-700 dark:text-zinc-300">
                    {fav.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {recentDropdownOpen && recentCalcs.length > 0 && (
            <div className="border-t pt-3">
              <span className="text-[10px] uppercase font-bold text-gray-400 mb-1.5 block">Recently visited list</span>
              <div className="grid grid-cols-1 gap-1">
                {recentCalcs.map(rec => (
                  <Link key={rec.id} to={rec.path} onClick={() => setMobileMenuOpen(false)} className="px-2.5 py-1.5 bg-slate-50 dark:bg-zinc-900 rounded font-bold text-xs text-gray-700 dark:text-zinc-300">
                    {rec.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
