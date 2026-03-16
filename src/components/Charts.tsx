import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { CountryData } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ChartsProps {
  countries: CountryData[];
}

export default function Charts({ countries }: ChartsProps) {
  const [collapsedCharts, setCollapsedCharts] = useState<Record<string, boolean>>({});

  if (countries.length === 0) return null;

  const toggleChart = (id: string) => {
    setCollapsedCharts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const COLORS = ['#6366f1', '#10b981', '#f43f5e', '#f59e0b'];

  // 1. Hustle vs Rest (Work vs Sleep)
  const workSleepData = countries.map(c => ({
    name: c.name,
    Work: Math.round(c.owid.workMinutes / 60 * 10) / 10,
    Sleep: Math.round(c.owid.sleepMinutes / 60 * 10) / 10,
    Other: Math.round((1440 - (c.owid.workMinutes + c.owid.sleepMinutes)) / 60 * 10) / 10,
  }));

  // 2. Free Time Index (Leisure)
  const leisureData = countries.map(c => ({
    name: c.name,
    Leisure: Math.round(c.owid.leisureMinutes / 60 * 10) / 10,
  }));

  // 3. Cultural Structure (Unpaid Care Work by Gender)
  const careData = countries.map(c => ({
    name: c.name,
    Female: Math.round(c.owid.unpaidCare.female / 60 * 10) / 10,
    Male: Math.round(c.owid.unpaidCare.male / 60 * 10) / 10,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-white/10 text-sm">
          <p className="font-bold text-slate-800 dark:text-white mb-3">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-6 mb-1.5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
                <span className="text-slate-500 dark:text-slate-400 capitalize">{entry.name}</span>
              </div>
              <span className="font-mono font-bold text-slate-700 dark:text-slate-200">{entry.value}h</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderHeader = (id: string, title: string, subtitle?: string) => (
    <button 
      onClick={() => toggleChart(id)}
      className="w-full text-left mb-4 group"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{title}</h3>
        {collapsedCharts[id] ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronUp className="w-4 h-4 text-slate-400" />}
      </div>
      {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>}
    </button>
  );

  return (
    <div className="space-y-10">
      {/* Chart 1: Hustle vs Rest */}
      <div>
        {renderHeader('hustle', 'The Hustle vs. Rest Ratio', 'Hours spent on paid work vs. sleep per day.')}
        <AnimatePresence initial={false}>
          {!collapsedCharts['hustle'] && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="h-56 w-full overflow-hidden"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={workSleepData} layout="vertical" margin={{ top: 0, right: 0, left: 40, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorWork" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.9}/>
                      <stop offset="95%" stopColor="#e11d48" stopOpacity={0.9}/>
                    </linearGradient>
                    <linearGradient id="colorSleep" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.9}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.9}/>
                    </linearGradient>
                  </defs>
                  <XAxis type="number" hide domain={[0, 24]} />
                  <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(248, 250, 252, 0.1)' }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar dataKey="Work" stackId="a" fill="url(#colorWork)" radius={[4, 0, 0, 4]} barSize={24} />
                  <Bar dataKey="Sleep" stackId="a" fill="url(#colorSleep)" />
                  <Bar dataKey="Other" stackId="a" fill="rgba(241, 245, 249, 0.1)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chart 2: Leisure Comparison */}
      <div>
        {renderHeader('leisure', 'Leisure Time (Hours/Day)')}
        <AnimatePresence initial={false}>
          {!collapsedCharts['leisure'] && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="h-56 w-full mt-6 overflow-hidden"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={leisureData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorLeisure" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.9}/>
                      <stop offset="95%" stopColor="#059669" stopOpacity={0.9}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(241, 245, 249, 0.1)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(248, 250, 252, 0.1)' }} />
                  <Bar dataKey="Leisure" fill="url(#colorLeisure)" radius={[6, 6, 0, 0]} barSize={40}>
                    {leisureData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chart 3: Cultural Structure */}
      <div>
        {renderHeader('care', 'Unpaid Care Work', 'Hours per day by gender.')}
        <AnimatePresence initial={false}>
          {!collapsedCharts['care'] && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="h-64 w-full overflow-hidden"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={careData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorFemale" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d946ef" stopOpacity={0.9}/>
                      <stop offset="95%" stopColor="#c026d3" stopOpacity={0.9}/>
                    </linearGradient>
                    <linearGradient id="colorMale" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.9}/>
                      <stop offset="95%" stopColor="#64748b" stopOpacity={0.9}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(241, 245, 249, 0.1)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(248, 250, 252, 0.1)' }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar dataKey="Female" fill="url(#colorFemale)" radius={[6, 6, 0, 0]} barSize={32} />
                  <Bar dataKey="Male" fill="url(#colorMale)" radius={[6, 6, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
