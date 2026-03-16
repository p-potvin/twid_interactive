import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { COUNTRIES_DATA } from '../data/countries';
import { CountryData } from '../types';

interface WorldMapProps {
  onSelectCountry: (country: CountryData) => void;
  selectedCountries: CountryData[];
  isDarkMode?: boolean;
}

export default function WorldMap({ onSelectCountry, selectedCountries, isDarkMode = false }: WorldMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [worldData, setWorldData] = useState<any>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const currentMonth = useMemo(() => new Date().getMonth() + 1, []);
  const selectedIds = useMemo(() => selectedCountries.map(c => c.id), [selectedCountries]);

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then((res) => res.json())
      .then((data) => setWorldData(data));
  }, []);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      if (width > 0 && height > 0) {
        setDimensions({ width, height });
      }
    });
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!worldData || !svgRef.current || dimensions.width === 0) return;

    const { width, height } = dimensions;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Use Natural Earth projection for a more realistic look
    const projection = d3.geoNaturalEarth1()
      .scale(width / 5.5)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);
    const countries = topojson.feature(worldData, worldData.objects.countries) as any;

    // Ocean background
    svg.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'transparent');

    const g = svg.append('g');

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 8])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
        // Keep labels readable when zooming
        g.selectAll('.country-label').attr('font-size', `${8 / event.transform.k}px`);
        g.selectAll('.country-icon').attr('font-size', `${10 / event.transform.k}px`);
      });

    svg.call(zoom);

    // Add Graticule (Grid lines)
    const graticule = d3.geoGraticule();
    g.append('path')
      .datum(graticule)
      .attr('class', 'graticule')
      .attr('d', path as any)
      .style('fill', 'none')
      .style('stroke', isDarkMode ? '#334155' : '#cbd5e1')
      .style('stroke-width', '0.5px')
      .style('stroke-opacity', 0.4);

    // Add subtle ocean sphere
    g.append('path')
      .datum({ type: 'Sphere' })
      .attr('class', 'sphere')
      .attr('d', path as any)
      .style('fill', isDarkMode ? '#0f172a' : '#f8fafc')
      .style('stroke', isDarkMode ? '#1e293b' : '#e2e8f0')
      .style('stroke-width', '1px');

    const tooltip = d3.select('body')
      .append('div')
      .attr('class', 'absolute hidden glass-panel text-slate-800 dark:text-slate-100 px-4 py-3 rounded-2xl shadow-xl border border-white/50 dark:border-white/10 text-sm pointer-events-none z-50')
      .style('opacity', 0);

    // Draw countries
    g.selectAll('path.country')
      .data(countries.features)
      .enter()
      .append('path')
      .attr('class', 'country cursor-pointer transition-colors duration-300')
      .attr('d', path as any)
      .attr('fill', (d: any) => {
        const countryId = d.id;
        const data = COUNTRIES_DATA[countryId];
        
        if (selectedIds.includes(countryId)) return '#4f46e5'; // Selected (Indigo 600)
        
        if (data) {
          const isPeak = data.peakSeasons.includes(currentMonth);
          if (isPeak) return isDarkMode ? '#6366f1' : '#818cf8';
          return isDarkMode ? '#1e293b' : '#e2e8f0';
        }
        
        return isDarkMode ? '#020617' : '#ffffff'; // No data
      })
      .attr('stroke', (d: any) => {
        if (selectedIds.includes(d.id)) return isDarkMode ? '#818cf8' : '#312e81';
        return isDarkMode ? '#334155' : '#cbd5e1';
      })
      .attr('stroke-width', (d: any) => selectedIds.includes(d.id) ? 1.5 : 0.5)
      .on('mouseover', function (event, d: any) {
        const countryId = d.id;
        const data = COUNTRIES_DATA[countryId];
        
        // Bring to front to fix border clipping
        d3.select(this).raise();

        if (data) {
          d3.select(this)
            .attr('stroke', '#6366f1')
            .attr('stroke-width', 1.5)
            .style('filter', 'drop-shadow(0px 4px 6px rgba(99, 102, 241, 0.3))');

          tooltip.transition().duration(200).style('opacity', 1);
          tooltip.classed('hidden', false);
          
          const tooltipHtml = `
            <div class="font-bold text-base mb-1">${data.name}</div>
            <div class="flex items-center gap-2 text-xs font-medium ${data.peakSeasons.includes(currentMonth) ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'}">
              ${data.peakSeasons.includes(currentMonth) ? '☀️ Peak Season' : '❄️ Off Season'}
            </div>
            <div class="mt-2 pt-2 border-t border-slate-200/50 dark:border-white/10 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
              <div class="text-slate-500 dark:text-slate-400">Work: <span class="text-indigo-600 dark:text-indigo-400 font-mono font-bold">${Math.round(data.owid.workMinutes/60)}h</span></div>
              <div class="text-slate-500 dark:text-slate-400">Sleep: <span class="text-indigo-600 dark:text-indigo-400 font-mono font-bold">${Math.round(data.owid.sleepMinutes/60)}h</span></div>
            </div>
            <div class="text-[10px] uppercase tracking-wider text-indigo-500 dark:text-indigo-400 mt-3 font-bold">Click to compare</div>
          `;

          tooltip
            .html(tooltipHtml)
            .style('left', event.pageX + 15 + 'px')
            .style('top', event.pageY - 28 + 'px');
        }
      })
      .on('mousemove', function (event) {
        tooltip
          .style('left', event.pageX + 15 + 'px')
          .style('top', event.pageY - 28 + 'px');
      })
      .on('mouseout', function (event, d: any) {
        const isSelected = selectedIds.includes(d.id);
        d3.select(this)
          .attr('stroke', isSelected ? (isDarkMode ? '#818cf8' : '#312e81') : (isDarkMode ? '#334155' : '#cbd5e1'))
          .attr('stroke-width', isSelected ? 1.5 : 0.5)
          .style('filter', 'none');

        tooltip.transition().duration(300).style('opacity', 0).on('end', () => {
          tooltip.classed('hidden', true);
        });
      })
      .on('click', (event, d: any) => {
        const countryId = d.id;
        const data = COUNTRIES_DATA[countryId];
        if (data) {
          onSelectCountry(data);
        }
      });

    // Add on-map data labels for countries with data and large enough area
    const labeledCountries = countries.features.filter((d: any) => {
      const area = path.area(d);
      return COUNTRIES_DATA[d.id] && area > 600; // Only label large enough countries
    });

    g.selectAll('text.country-label')
      .data(labeledCountries)
      .enter()
      .append('text')
      .attr('class', 'country-label pointer-events-none font-sans font-semibold')
      .attr('transform', (d: any) => `translate(${path.centroid(d)[0]}, ${path.centroid(d)[1] - 4})`)
      .attr('text-anchor', 'middle')
      .attr('font-size', '8px')
      .attr('fill', isDarkMode ? '#94a3b8' : '#475569')
      .text((d: any) => COUNTRIES_DATA[d.id].name);

    g.selectAll('text.country-icon')
      .data(labeledCountries)
      .enter()
      .append('text')
      .attr('class', 'country-icon pointer-events-none font-sans')
      .attr('transform', (d: any) => `translate(${path.centroid(d)[0]}, ${path.centroid(d)[1] + 6})`)
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .text((d: any) => {
        const data = COUNTRIES_DATA[d.id];
        return data.peakSeasons.includes(currentMonth) ? '☀️' : '';
      });

    return () => {
      tooltip.remove();
    };
  }, [worldData, selectedIds, currentMonth, onSelectCountry, dimensions, isDarkMode]);

  return (
    <div ref={wrapperRef} className="w-full h-full glass-panel rounded-[2rem] overflow-hidden relative flex-1">
      <svg ref={svgRef} className="w-full h-full block" />
      
      {/* Map Legend */}
      <div className="absolute bottom-8 left-8 glass-panel px-5 py-4 rounded-2xl shadow-xl">
        <h3 className="text-slate-800 dark:text-white text-sm font-bold mb-4 font-display tracking-tight">Live Tourism Index</h3>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-4 h-4 rounded-full bg-[#818cf8] border border-[#6366f1] shadow-inner"></div>
          <span className="text-slate-600 dark:text-slate-400 text-xs font-medium">Peak Season (Current Month)</span>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-4 h-4 rounded-full bg-[#e2e8f0] dark:bg-slate-700 border border-[#cbd5e1] dark:border-slate-600 shadow-inner"></div>
          <span className="text-slate-600 dark:text-slate-400 text-xs font-medium">Off Season</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-[#4f46e5] border border-[#312e81] shadow-inner"></div>
          <span className="text-slate-600 dark:text-slate-400 text-xs font-medium">Selected for Comparison</span>
        </div>
      </div>
    </div>
  );
}
