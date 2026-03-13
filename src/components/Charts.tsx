import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { CountryData } from '../types';

interface ChartsProps {
  countries: CountryData[];
}

export default function Charts({ countries }: ChartsProps) {
  if (countries.length === 0) return null;

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
        <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 text-sm">
          <p className="font-bold text-slate-800 mb-3">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-6 mb-1.5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
                <span className="text-slate-500 capitalize">{entry.name}</span>
              </div>
              <span className="font-mono font-bold text-slate-700">{entry.value}h</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-10">
      {/* Chart 1: Hustle vs Rest */}
      <div>
        <h3 className="text-sm font-bold text-slate-800 mb-1">The Hustle vs. Rest Ratio</h3>
        <p className="text-xs text-slate-500 mb-6">Hours spent on paid work vs. sleep per day.</p>
        <div className="h-56 w-full">
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
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="Work" stackId="a" fill="url(#colorWork)" radius={[4, 0, 0, 4]} barSize={24} />
              <Bar dataKey="Sleep" stackId="a" fill="url(#colorSleep)" />
              <Bar dataKey="Other" stackId="a" fill="#f1f5f9" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Leisure Comparison */}
      <div>
        <h3 className="text-sm font-bold text-slate-800 mb-1">Leisure Time (Hours/Day)</h3>
        <div className="h-56 w-full mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={leisureData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorLeisure" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#059669" stopOpacity={0.9}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
              <Bar dataKey="Leisure" fill="url(#colorLeisure)" radius={[6, 6, 0, 0]} barSize={40}>
                {leisureData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 3: Cultural Structure */}
      <div>
        <h3 className="text-sm font-bold text-slate-800 mb-1">Unpaid Care Work</h3>
        <p className="text-xs text-slate-500 mb-6">Hours per day by gender.</p>
        <div className="h-64 w-full">
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
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="Female" fill="url(#colorFemale)" radius={[6, 6, 0, 0]} barSize={32} />
              <Bar dataKey="Male" fill="url(#colorMale)" radius={[6, 6, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
