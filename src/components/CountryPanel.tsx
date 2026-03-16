import React, { useEffect, useState } from 'react';
import { CountryData, WeatherData } from '../types';
import { X, CloudRain, Sun, Cloud, Wind, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import Charts from './Charts';
import { motion, AnimatePresence } from 'motion/react';

interface CountryPanelProps {
  countries: CountryData[];
  onClose: (id: string) => void;
  onCloseAll: () => void;
}

export default function CountryPanel({ countries, onClose, onCloseAll }: CountryPanelProps) {
  const [weatherData, setWeatherData] = useState<Record<string, WeatherData>>({});
  const [loading, setLoading] = useState(true);
  const [isWeatherCollapsed, setIsWeatherCollapsed] = useState(false);
  const [isChartsCollapsed, setIsChartsCollapsed] = useState(false);

  useEffect(() => {
    if (countries.length === 0) return;
    setLoading(true);
    
    Promise.all(
      countries.map(c => 
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${c.lat}&longitude=${c.lon}&current_weather=true`)
          .then(res => res.json())
          .then(data => ({ id: c.id, weather: data.current_weather }))
          .catch(() => ({ id: c.id, weather: null }))
      )
    ).then(results => {
      const newWeather: Record<string, WeatherData> = {};
      results.forEach(r => {
        if (r.weather) {
          newWeather[r.id] = {
            temperature: r.weather.temperature,
            windspeed: r.weather.windspeed,
            weathercode: r.weather.weathercode,
          };
        }
      });
      setWeatherData(newWeather);
      setLoading(false);
    });
  }, [countries]);

  const getWeatherIcon = (code: number) => {
    if (code <= 3) return <Sun className="w-6 h-6 text-amber-500 drop-shadow-sm" />;
    if (code <= 48) return <Cloud className="w-6 h-6 text-slate-400 dark:text-slate-500 drop-shadow-sm" />;
    return <CloudRain className="w-6 h-6 text-indigo-500 drop-shadow-sm" />;
  };

  const currentMonth = new Date().getMonth() + 1;

  if (countries.length === 0) return null;

  return (
    <div className="w-full h-full glass-panel border-y-0 border-r-0 border-l-white/50 dark:border-l-white/10 flex flex-col overflow-hidden shadow-[-20px_0_40px_rgba(0,0,0,0.05)] transition-colors">
      {/* Header */}
      <div className="p-6 border-b border-slate-200/50 dark:border-white/10 bg-white/40 dark:bg-slate-900/40 flex justify-between items-center sticky top-0 z-10 backdrop-blur-md">
        <div>
          <h2 className="text-2xl font-display font-bold text-slate-800 dark:text-white tracking-tight">
            {countries.length > 1 ? 'Comparison Mode' : countries[0].name}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
            {countries.length > 1 ? `Comparing ${countries.length} countries` : countries[0].touristType}
          </p>
        </div>
        <button onClick={onCloseAll} className="p-2 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-800/50 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-6">
        {/* Weather Section */}
        <div>
          <button 
            onClick={() => setIsWeatherCollapsed(!isWeatherCollapsed)}
            className="w-full flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-4 group"
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
              Current Weather
            </div>
            {isWeatherCollapsed ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
          </button>
          
          <AnimatePresence initial={false}>
            {!isWeatherCollapsed && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="flex gap-4 overflow-x-auto pb-4 snap-x custom-scrollbar">
                  {countries.map((country, idx) => {
                    const isPeakSeason = country.peakSeasons.includes(currentMonth);
                    const weather = weatherData[country.id];
                    
                    return (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        key={country.id} 
                        className="min-w-[280px] flex-1 bg-white dark:bg-slate-900/50 p-5 rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm relative snap-start group hover:shadow-md transition-all"
                      >
                        {countries.length > 1 && (
                          <button onClick={() => onClose(country.id)} className="absolute top-3 right-3 p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-full transition-colors opacity-0 group-hover:opacity-100">
                            <X className="w-4 h-4" />
                          </button>
                        )}
                        <div className="flex items-center gap-2 mb-3">
                          <MapPin className="w-4 h-4 text-indigo-500" />
                          <h3 className="font-bold text-slate-800 dark:text-white text-lg truncate pr-6">{country.name}</h3>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-5">
                          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${isPeakSeason ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200/50 dark:border-amber-500/20' : 'bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200/50 dark:border-white/5'}`}>
                            {isPeakSeason ? '☀️ Peak Season' : '❄️ Off Season'}
                          </span>
                        </div>

                        {loading ? (
                          <div className="h-14 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 animate-pulse"></div>
                            <div className="flex-1 space-y-2">
                              <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded animate-pulse w-1/2"></div>
                              <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded animate-pulse w-1/3"></div>
                            </div>
                          </div>
                        ) : weather ? (
                          <div className="flex items-center justify-between bg-slate-50/80 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100/50 dark:border-white/5">
                            <div className="flex items-center gap-3">
                              {getWeatherIcon(weather.weathercode)}
                              <div>
                                <div className="text-2xl font-light text-slate-800 dark:text-white tracking-tight">{weather.temperature}°<span className="text-lg text-slate-400">C</span></div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center justify-end gap-1.5">
                                <Wind className="w-3.5 h-3.5 text-sky-400"/> 
                                {weather.windspeed} <span className="text-[10px] text-slate-400">km/h</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-sm text-slate-400 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-center border border-slate-100/50 dark:border-white/5">Weather unavailable</div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Charts Section */}
        <div className="bg-white dark:bg-slate-900/50 rounded-3xl p-6 border border-slate-100 dark:border-white/5 shadow-sm">
          <button 
            onClick={() => setIsChartsCollapsed(!isChartsCollapsed)}
            className="w-full flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-6 group"
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
              Data Comparison
            </div>
            {isChartsCollapsed ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
          </button>
          
          <AnimatePresence initial={false}>
            {!isChartsCollapsed && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <Charts countries={countries} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
