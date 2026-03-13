import React from 'react';
import { COUNTRIES_DATA } from '../data/countries';
import { CountryData } from '../types';
import { motion } from 'motion/react';

interface TopRankingsProps {
  onSelect: (c: CountryData) => void;
  selectedIds: string[];
}

export default function TopRankings({ onSelect, selectedIds }: TopRankingsProps) {
  const countries = Object.values(COUNTRIES_DATA);
  
  const topWork = [...countries].sort((a, b) => b.owid.workMinutes - a.owid.workMinutes).slice(0, 5);
  const topSleep = [...countries].sort((a, b) => b.owid.sleepMinutes - a.owid.sleepMinutes).slice(0, 5);
  const topLeisure = [...countries].sort((a, b) => b.owid.leisureMinutes - a.owid.leisureMinutes).slice(0, 5);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const renderList = (title: string, list: CountryData[], key: 'workMinutes' | 'sleepMinutes' | 'leisureMinutes', format: (v: number) => string, colorClass: string, bgClass: string) => (
    <div className="mb-10">
      <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
        <div className={`w-1.5 h-1.5 rounded-full ${bgClass}`}></div>
        {title}
      </h3>
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-2.5">
        {list.map((c, i) => {
          const isSelected = selectedIds.includes(c.id);
          return (
            <motion.div 
              variants={item}
              key={c.id} 
              onClick={() => onSelect(c)}
              className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer group ${
                isSelected 
                  ? 'bg-indigo-50 border-indigo-200 shadow-sm shadow-indigo-100' 
                  : 'bg-white border-slate-100 hover:border-indigo-100 hover:shadow-md hover:shadow-slate-200/50'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <span className={`flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-bold transition-colors ${
                  isSelected ? 'bg-indigo-200 text-indigo-700' : 'bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                }`}>
                  {i + 1}
                </span>
                <span className={`text-sm font-semibold transition-colors ${isSelected ? 'text-indigo-900' : 'text-slate-700 group-hover:text-slate-900'}`}>
                  {c.name}
                </span>
              </div>
              <span className={`font-mono text-xs font-bold px-2.5 py-1 rounded-lg transition-colors ${
                isSelected ? 'bg-indigo-100 text-indigo-700' : `bg-slate-50 ${colorClass} group-hover:${bgClass} group-hover:text-white`
              }`}>
                {format(c.owid[key])}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );

  return (
    <div className="w-[340px] glass-panel border-y-0 border-l-0 border-r-white/50 h-full overflow-y-auto custom-scrollbar p-8 z-20">
      <h2 className="text-2xl font-display font-bold text-slate-800 mb-8 tracking-tight">Global Rankings</h2>
      {renderList('Most Paid Work', topWork, 'workMinutes', v => `${Math.floor(v/60)}h ${v%60}m`, 'text-rose-500', 'bg-rose-500')}
      {renderList('Most Sleep', topSleep, 'sleepMinutes', v => `${Math.floor(v/60)}h ${v%60}m`, 'text-blue-500', 'bg-blue-500')}
      {renderList('Most Leisure Time', topLeisure, 'leisureMinutes', v => `${Math.floor(v/60)}h ${v%60}m`, 'text-emerald-500', 'bg-emerald-500')}
    </div>
  );
}
