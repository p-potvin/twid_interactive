import React, { useState, useEffect } from 'react';
import WorldMap from './components/WorldMap';
import CountryPanel from './components/CountryPanel';
import TopRankings from './components/TopRankings';
import { CountryData } from './types';
import { Globe2, Sparkles, Moon, Sun, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [selectedCountries, setSelectedCountries] = useState<CountryData[]>([]);
  const [isRankingsCollapsed, setIsRankingsCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const handleSelectCountry = (country: CountryData) => {
    setSelectedCountries(prev => {
      if (prev.find(c => c.id === country.id)) {
        return prev.filter(c => c.id !== country.id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), country];
      }
      return [...prev, country];
    });
  };

  const handleRemoveCountry = (id: string) => {
    setSelectedCountries(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans overflow-hidden selection:bg-indigo-100 dark:selection:bg-indigo-900 selection:text-indigo-900 dark:selection:text-indigo-100 transition-colors duration-300">
      {/* Floating Header */}
      <header className="absolute top-0 left-0 right-0 h-20 px-8 flex items-center justify-between z-40 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border-b border-white/50 dark:border-white/10 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/50">
            <Globe2 className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-display font-bold tracking-tight text-slate-800 dark:text-white">
            Cultural Rhythm <span className="text-slate-400 dark:text-slate-500 font-medium">Explorer</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2.5 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-white/50 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <div className="hidden sm:flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50/80 dark:bg-indigo-900/30 px-4 py-2 rounded-full border border-indigo-100/50 dark:border-indigo-500/20 shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Powered by OWID & Open-Meteo</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden relative pt-20">
        {/* Left Sidebar: Rankings */}
        <div className="relative flex h-full">
          <motion.div
            animate={{ width: isRankingsCollapsed ? 0 : 340, opacity: isRankingsCollapsed ? 0 : 1 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="overflow-hidden h-full"
          >
            <TopRankings onSelect={handleSelectCountry} selectedIds={selectedCountries.map(c => c.id)} />
          </motion.div>
          
          <button
            onClick={() => setIsRankingsCollapsed(!isRankingsCollapsed)}
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-full flex items-center justify-center z-50 shadow-md hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            {isRankingsCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Map Container */}
        <div 
          className="flex-1 flex flex-col p-6 relative z-10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]" 
          style={{ 
            paddingRight: selectedCountries.length > 0 ? '480px' : '24px',
            paddingLeft: isRankingsCollapsed ? '24px' : '24px'
          }}
        >
          <WorldMap 
            onSelectCountry={handleSelectCountry} 
            selectedCountries={selectedCountries} 
            isDarkMode={isDarkMode}
          />
        </div>

        {/* Right Side Panel: Comparison */}
        <AnimatePresence>
          {selectedCountries.length > 0 && (
            <motion.div 
              initial={{ x: '100%', opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.5 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-20 right-0 bottom-0 w-[460px] z-30"
            >
              <CountryPanel 
                countries={selectedCountries} 
                onClose={handleRemoveCountry}
                onCloseAll={() => setSelectedCountries([])}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
