import React, { useState } from 'react';
import { COUNTRIES_DATA } from '../data/countries';
import { CountryData } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface TopRankingsProps {
  onSelect: (c: CountryData) => void;
  selectedIds: string[];
}

export default function TopRankings({ onSelect, selectedIds }: TopRankingsProps) {
  const countries = Object.values(COUNTRIES_DATA);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (title: string) => {
    setCollapsedSections(prev => ({ ...prev, [title]: !prev[title] }));
  };
  
  const topWork = [...countries].sort((a, b) => b.owid.workMinutes - a.owid.workMinutes).slice(0, 5);
  const topSleep = [...countries].sort((a, b) => b.owid.sleepMinutes - a.owid.sleepMinutes).slice(0, 5);
  const topLeisure = [...countries].sort((a, b) => b.owid.leisureMinutes - a.owid.leisureMinutes).slice(0, 5);

  const container = {
    hidden: { opacity: 0, height: 0 },
    show: {
      opacity: 1,
      height: 'auto',
      transition: { staggerChildren: 0.05 }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const renderList = (title: string, list: CountryData[], key: 'workMinutes' | 'sleepMinutes' | 'leisureMinutes', format: (v: number) => string, colorClass: string, bgClass: string) => {
    const isCollapsed = collapsedSections[title];
    return (
      <div className="mb-6">
        <button 
          onClick={() => toggleSection(title)}
          className="w-full text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4 flex items-center justify-between group"
        >
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${bgClass}`}></div>
            {title}
          </div>
          {isCollapsed ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
        </button>
        <AnimatePresence initial={false}>
          {!isCollapsed && (
            <motion.div 
              variants={container} 
              initial="hidden" 
              animate="show" 
              exit="hidden"
              className="space-y-2.5 overflow-hidden"
            >
              {list.map((c, i) => {
                const isSelected = selectedIds.includes(c.id);
                return (
                  <motion.div 
                    variants={item}
                    key={c.id} 
                    onClick={() => onSelect(c)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer group ${
                      isSelected 
                        ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-500/30 shadow-sm shadow-indigo-100 dark:shadow-none' 
                        : 'bg-white dark:bg-slate-900/50 border-slate-100 dark:border-white/5 hover:border-indigo-100 dark:hover:border-indigo-500/30 hover:shadow-md hover:shadow-slate-200/50 dark:hover:shadow-none'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span className={`flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-bold transition-colors ${
                        isSelected ? 'bg-indigo-200 dark:bg-indigo-500 text-indigo-700 dark:text-white' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/40 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                      }`}>
                        {i + 1}
                      </span>
                      <span className={`text-sm font-semibold transition-colors ${isSelected ? 'text-indigo-900 dark:text-white' : 'text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
                        {c.name}
                      </span>
                    </div>
                    <span className={`font-mono text-xs font-bold px-2.5 py-1 rounded-lg transition-colors ${
                      isSelected ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300' : `bg-slate-50 dark:bg-slate-800 ${colorClass} group-hover:${bgClass} group-hover:text-white`
                    }`}>
                      {format(c.owid[key])}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="w-[340px] glass-panel border-y-0 border-l-0 border-r-white/50 dark:border-r-white/10 h-full overflow-y-auto custom-scrollbar p-8 z-20 transition-colors">
      <h2 className="text-2xl font-display font-bold text-slate-800 dark:text-white mb-8 tracking-tight">Global Rankings</h2>
      {renderList('Most Paid Work', topWork, 'workMinutes', v => `${Math.floor(v/60)}h ${v%60}m`, 'text-rose-500', 'bg-rose-500')}
      {renderList('Most Sleep', topSleep, 'sleepMinutes', v => `${Math.floor(v/60)}h ${v%60}m`, 'text-blue-500', 'bg-blue-500')}
      {renderList('Most Leisure Time', topLeisure, 'leisureMinutes', v => `${Math.floor(v/60)}h ${v%60}m`, 'text-emerald-500', 'bg-emerald-500')}
    </div>
  );
}
