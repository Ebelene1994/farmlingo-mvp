
import React, { useState } from 'react';
import { 
    CloudRain, Sun, Wind, Droplets, MapPin, Calendar, 
    AlertTriangle, Info, ArrowUpRight, ArrowDownRight, 
    ChevronDown, Thermometer, Sprout, Bug
} from 'lucide-react';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
    ResponsiveContainer, BarChart, Bar, Legend, ComposedChart, Line
} from 'recharts';
import { WEATHER_DATA, LOCATIONS, WEATHER_ALERTS, FARM_INSIGHTS, HISTORICAL_WEATHER } from '../constants';

const Weather: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]);
  const [activeGraph, setActiveGraph] = useState<'temp' | 'rain'>('temp');

  const current = WEATHER_DATA[0];

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen space-y-8">
        {/* Header & Location */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <CloudRain className="w-8 h-8 text-emerald-600" /> Weather & Insights
                </h1>
                <p className="text-slate-500 text-sm">Real-time forecasts and data-driven farming advice.</p>
            </div>
            
            <div className="relative group">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600" />
                <select 
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="pl-9 pr-8 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none cursor-pointer min-w-[200px]"
                >
                    {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
        </div>

        {/* Alerts Section */}
        {WEATHER_ALERTS.length > 0 && (
            <div className="space-y-3">
                {WEATHER_ALERTS.map(alert => (
                    <div key={alert.id} className={`p-4 rounded-xl border flex items-start gap-3 shadow-sm ${
                        alert.type === 'warning' ? 'bg-red-50 border-red-100 text-red-800' : 
                        alert.type === 'alert' ? 'bg-amber-50 border-amber-100 text-amber-800' : 
                        'bg-blue-50 border-blue-100 text-blue-800'
                    }`}>
                        <div className={`p-2 rounded-full shrink-0 ${
                             alert.type === 'warning' ? 'bg-red-100 text-red-600' : 
                             alert.type === 'alert' ? 'bg-amber-100 text-amber-600' : 
                             'bg-blue-100 text-blue-600'
                        }`}>
                            <AlertTriangle className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm mb-1">{alert.title}</h3>
                            <p className="text-sm opacity-90">{alert.message}</p>
                            <span className="text-xs font-medium mt-2 block opacity-75">{alert.date}</span>
                        </div>
                    </div>
                ))}
            </div>
        )}

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* 1. Current Weather Card */}
            <div className="lg:col-span-2 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8">
                    <div>
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold mb-4 border border-white/10">
                            <span className="w-2 h-2 bg-emerald-300 rounded-full mr-2 animate-pulse"></span>
                            Live Conditions
                        </div>
                        <div className="text-7xl font-bold tracking-tighter mb-2">{current.temp}°</div>
                        <p className="text-xl font-medium text-emerald-100 flex items-center gap-2">
                            {current.condition === 'Sunny' ? <Sun className="w-6 h-6" /> : <CloudRain className="w-6 h-6" />}
                            {current.condition}
                        </p>
                        <p className="text-sm text-emerald-200 mt-1">Feels like {current.temp + 2}°</p>
                    </div>

                    <div className="flex flex-col justify-center gap-4 min-w-[200px]">
                        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between border border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/10 rounded-lg"><Droplets className="w-5 h-5" /></div>
                                <span className="text-sm font-medium">Humidity</span>
                            </div>
                            <span className="font-bold text-lg">{current.humidity}%</span>
                        </div>
                        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between border border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/10 rounded-lg"><Wind className="w-5 h-5" /></div>
                                <span className="text-sm font-medium">Wind</span>
                            </div>
                            <span className="font-bold text-lg">12 km/h</span>
                        </div>
                        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between border border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/10 rounded-lg"><CloudRain className="w-5 h-5" /></div>
                                <span className="text-sm font-medium">Rainfall</span>
                            </div>
                            <span className="font-bold text-lg">{current.rainfall}mm</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Farming Insights Sidebar */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center">
                    <Sprout className="w-5 h-5 text-emerald-600 mr-2" /> Farming Insights
                </h3>
                <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-1">
                    {FARM_INSIGHTS.map(insight => (
                        <div key={insight.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors group">
                            <div className="flex justify-between items-start mb-2">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase border ${
                                    insight.impact === 'High' ? 'bg-red-50 text-red-600 border-red-100' : 
                                    insight.impact === 'Medium' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                    'bg-blue-50 text-blue-600 border-blue-100'
                                }`}>
                                    {insight.impact} Impact
                                </span>
                                {insight.type === 'pest' ? <Bug className="w-4 h-4 text-slate-400" /> : <Droplets className="w-4 h-4 text-slate-400" />}
                            </div>
                            <h4 className="font-bold text-slate-800 text-sm mb-1 group-hover:text-emerald-700 transition-colors">{insight.title}</h4>
                            <p className="text-xs text-slate-500 leading-relaxed">{insight.description}</p>
                        </div>
                    ))}
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 border-dashed text-center">
                        <p className="text-xs font-medium text-emerald-700">Soil moisture optimal for planting corn this week.</p>
                    </div>
                </div>
            </div>
        </div>

        {/* 7-Day Forecast */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center">
                <Calendar className="w-5 h-5 text-emerald-600 mr-2" /> 7-Day Forecast
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {WEATHER_DATA.map((day, idx) => (
                    <div key={day.day} className={`p-4 rounded-xl border text-center transition-all hover:shadow-md ${idx === 0 ? 'bg-emerald-50 border-emerald-200 ring-2 ring-emerald-100' : 'bg-white border-slate-100 hover:border-emerald-100'}`}>
                        <span className={`text-xs font-bold uppercase mb-2 block ${idx === 0 ? 'text-emerald-700' : 'text-slate-400'}`}>
                            {idx === 0 ? 'Today' : day.day}
                        </span>
                        <div className="my-3 flex justify-center">
                            {day.condition === 'Sunny' && <Sun className="w-8 h-8 text-amber-400" />}
                            {day.condition === 'Cloudy' && <Sun className="w-8 h-8 text-slate-400" />}
                            {day.condition === 'Rainy' && <CloudRain className="w-8 h-8 text-blue-400" />}
                            {day.condition === 'Stormy' && <Wind className="w-8 h-8 text-indigo-400" />}
                        </div>
                        <div className="text-xl font-bold text-slate-800 mb-1">{day.temp}°</div>
                        <div className="text-xs font-medium text-slate-500 flex items-center justify-center gap-1">
                            <Droplets className="w-3 h-3" /> {day.humidity}%
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Historical Data Charts */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h3 className="font-bold text-slate-800 flex items-center">
                    <ArrowUpRight className="w-5 h-5 text-emerald-600 mr-2" /> Historical Climate Data
                </h3>
                <div className="flex bg-slate-100 p-1 rounded-lg">
                    <button 
                        onClick={() => setActiveGraph('temp')}
                        className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${activeGraph === 'temp' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Temperature
                    </button>
                    <button 
                        onClick={() => setActiveGraph('rain')}
                        className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${activeGraph === 'rain' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Rainfall
                    </button>
                </div>
            </div>

            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    {activeGraph === 'temp' ? (
                        <AreaChart data={HISTORICAL_WEATHER}>
                            <defs>
                                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} unit="°C" />
                            <Tooltip 
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }} 
                                cursor={{ stroke: '#cbd5e1', strokeDasharray: '4 4' }}
                            />
                            <Area type="monotone" dataKey="temp" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorTemp)" />
                        </AreaChart>
                    ) : (
                        <ComposedChart data={HISTORICAL_WEATHER}>
                             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                             <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                             <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} unit="mm" />
                             <Tooltip 
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }} 
                                cursor={{ fill: '#f8fafc' }}
                             />
                             <Bar dataKey="rain" barSize={30} fill="#3b82f6" radius={[4, 4, 0, 0]} />
                             <Line type="monotone" dataKey="rain" stroke="#93c5fd" strokeWidth={2} dot={{r: 4, fill: '#3b82f6'}} />
                        </ComposedChart>
                    )}
                </ResponsiveContainer>
            </div>
            <p className="text-center text-xs text-slate-400 mt-4">Data based on historical averages for {selectedLocation}</p>
        </div>
    </div>
  );
};

export default Weather;
