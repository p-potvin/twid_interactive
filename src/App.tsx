import React, { useState } from 'react';
import WorldMap from './components/WorldMap';
import CountryPanel from './components/CountryPanel';
import TopRankings from './components/TopRankings';
import { CountryData } from './types';
import { Globe2, Info, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [selectedCountries, setSelectedCountries] = useState<CountryData[]>([]);

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
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans overflow-hidden selection:bg-indigo-100 selection:text-indigo-900">
      {/* Floating Header */}
      <header className="absolute top-0 left-0 right-0 h-20 px-8 flex items-center justify-between z-40 bg-white/60 backdrop-blur-2xl border-b border-white/50 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/50">
            <Globe2 className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-display font-bold tracking-tight text-slate-800">
            Cultural Rhythm <span className="text-slate-400 font-medium">Explorer</span>
          </h1>
        </div>
        <div className="flex items-center gap-2 text-xs text-indigo-600 font-semibold bg-indigo-50/80 px-4 py-2 rounded-full border border-indigo-100/50 shadow-sm backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Powered by OWID & Open-Meteo</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden relative pt-20">
        {/* Left Sidebar: Rankings */}
        <TopRankings onSelect={handleSelectCountry} selectedIds={selectedCountries.map(c => c.id)} />

        {/* Map Container */}
        <div className="flex-1 flex flex-col p-6 relative z-10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]" style={{ paddingRight: selectedCountries.length > 0 ? '480px' : '24px' }}>
          <WorldMap 
            onSelectCountry={handleSelectCountry} 
            selectedCountries={selectedCountries} 
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
