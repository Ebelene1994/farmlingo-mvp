
import React from 'react';
import { User, FarmTask, Transaction, MarketItem } from '../types';
import { 
    CloudRain, Droplets, Wind, TrendingUp, TrendingDown, Minus, 
    CheckSquare, Square, MoreHorizontal, DollarSign, Sprout, Tractor, 
    ClipboardList, Plus, Calendar, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { WEATHER_DATA, MARKET_DATA, FARM_TASKS, FARM_TRANSACTIONS } from '../constants';
import { Link } from 'react-router-dom';

interface FarmerDashboardProps {
  user: User;
}

const FarmerDashboard: React.FC<FarmerDashboardProps> = ({ user }) => {
  const weather = WEATHER_DATA[0];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-amber-100 text-amber-700';
      case 'low': return 'bg-blue-100 text-blue-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusIcon = (status: string) => {
      switch(status) {
          case 'completed': return <CheckSquare className="w-5 h-5 text-emerald-500" />;
          case 'pending': return <Square className="w-5 h-5 text-slate-300 hover:text-emerald-500 transition-colors" />;
          case 'in-progress': return <div className="w-5 h-5 border-2 border-amber-500 rounded flex items-center justify-center"><div className="w-2.5 h-2.5 bg-amber-500 rounded-sm"></div></div>;
          default: return <Square className="w-5 h-5 text-slate-300" />;
      }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
                <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full border-2 border-white shadow-sm" />
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Hello, {user.name.split(' ')[0]}</h1>
                    <p className="text-slate-500 text-sm">Welcome back to your farm dashboard.</p>
                </div>
            </div>
            <div className="flex gap-3">
                 <button className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold text-sm hover:bg-emerald-700 transition-colors shadow-sm">
                    <Plus className="w-4 h-4 mr-2" /> Add Crop Cycle
                 </button>
                 <button className="flex items-center px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg font-semibold text-sm hover:bg-slate-50 transition-colors">
                    Log Expense
                 </button>
            </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                    <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><DollarSign className="w-5 h-5" /></div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded flex items-center">
                        <ArrowUpRight className="w-3 h-3 mr-1" /> 12%
                    </span>
                </div>
                <div className="text-2xl font-bold text-slate-800">$42,500</div>
                <p className="text-xs text-slate-500 font-medium">Est. Revenue (YTD)</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                    <div className="p-2 bg-amber-50 rounded-lg text-amber-600"><Sprout className="w-5 h-5" /></div>
                    <span className="text-xs font-bold text-slate-400">4 Active</span>
                </div>
                <div className="text-2xl font-bold text-slate-800">120 Acres</div>
                <p className="text-xs text-slate-500 font-medium">Crop Coverage</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Tractor className="w-5 h-5" /></div>
                    <span className="text-xs font-bold text-slate-400">All Good</span>
                </div>
                <div className="text-2xl font-bold text-slate-800">5 Units</div>
                <p className="text-xs text-slate-500 font-medium">Equipment Status</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                    <div className="p-2 bg-purple-50 rounded-lg text-purple-600"><ClipboardList className="w-5 h-5" /></div>
                    <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                        3 Urgent
                    </span>
                </div>
                <div className="text-2xl font-bold text-slate-800">8 Pending</div>
                <p className="text-xs text-slate-500 font-medium">Farm Tasks</p>
            </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column (2/3) */}
            <div className="lg:col-span-2 space-y-6">
                
                {/* Weather Widget (Compact) */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-6 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                    <div className="relative z-10 flex items-center gap-4">
                        <div>
                             <h3 className="font-bold text-lg flex items-center gap-2"><CloudRain className="w-5 h-5" /> Today's Forecast</h3>
                             <p className="text-blue-100 text-sm">{user.location}</p>
                        </div>
                        <div className="h-10 w-px bg-white/20 hidden sm:block"></div>
                        <div className="text-center sm:text-left">
                             <div className="text-3xl font-bold">{weather.temp}°C</div>
                             <p className="text-sm font-medium text-blue-100">{weather.condition}</p>
                        </div>
                    </div>
                    <div className="relative z-10 flex gap-6 text-center">
                        <div>
                            <div className="text-xs text-blue-200 uppercase font-bold tracking-wider mb-1">Wind</div>
                            <div className="font-semibold flex items-center justify-center gap-1"><Wind className="w-4 h-4" /> 12km/h</div>
                        </div>
                        <div>
                            <div className="text-xs text-blue-200 uppercase font-bold tracking-wider mb-1">Rain</div>
                            <div className="font-semibold flex items-center justify-center gap-1"><CloudRain className="w-4 h-4" /> {weather.rainfall}mm</div>
                        </div>
                        <div>
                            <div className="text-xs text-blue-200 uppercase font-bold tracking-wider mb-1">Humidity</div>
                            <div className="font-semibold flex items-center justify-center gap-1"><Droplets className="w-4 h-4" /> {weather.humidity}%</div>
                        </div>
                    </div>
                </div>

                {/* Market Prices */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-emerald-600" /> Market Prices
                        </h3>
                        <Link to="/market" className="text-xs font-bold text-emerald-600 hover:underline">View Full Report</Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500 font-medium">
                                <tr>
                                    <th className="px-6 py-3">Commodity</th>
                                    <th className="px-6 py-3">Price</th>
                                    <th className="px-6 py-3">Trend</th>
                                    <th className="px-6 py-3 text-right">Change</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {MARKET_DATA.map(item => (
                                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-slate-800">{item.commodity}</td>
                                        <td className="px-6 py-4 font-mono text-slate-600">${item.price.toFixed(2)} <span className="text-xs text-slate-400">/{item.unit}</span></td>
                                        <td className="px-6 py-4">
                                            {item.trend === 'up' && <span className="flex items-center text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded w-fit"><TrendingUp className="w-3 h-3 mr-1" /> Up</span>}
                                            {item.trend === 'down' && <span className="flex items-center text-red-600 text-xs font-bold bg-red-50 px-2 py-1 rounded w-fit"><TrendingDown className="w-3 h-3 mr-1" /> Down</span>}
                                            {item.trend === 'stable' && <span className="flex items-center text-slate-600 text-xs font-bold bg-slate-100 px-2 py-1 rounded w-fit"><Minus className="w-3 h-3 mr-1" /> Stable</span>}
                                        </td>
                                        <td className={`px-6 py-4 text-right font-bold ${item.trend === 'up' ? 'text-emerald-600' : item.trend === 'down' ? 'text-red-600' : 'text-slate-500'}`}>
                                            {item.trend === 'up' ? '+' : item.trend === 'down' ? '-' : ''}{item.change}%
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Financial Overview */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                     <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="font-bold text-slate-800">Recent Transactions</h3>
                        <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal className="w-5 h-5" /></button>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {FARM_TRANSACTIONS.map(tx => (
                            <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-full ${tx.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                                        {tx.type === 'income' ? <ArrowDownRight className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800 text-sm">{tx.description}</p>
                                        <p className="text-xs text-slate-500">{tx.date} • {tx.category}</p>
                                    </div>
                                </div>
                                <span className={`font-mono font-bold text-sm ${tx.type === 'income' ? 'text-emerald-600' : 'text-red-600'}`}>
                                    {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString()}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Right Sidebar (1/3) */}
            <div className="space-y-6">
                
                {/* Task List */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full max-h-[500px]">
                    <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-xl">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <ClipboardList className="w-5 h-5 text-slate-500" /> Tasks
                        </h3>
                        <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2 py-0.5 rounded-full">{FARM_TASKS.filter(t => t.status === 'pending').length}</span>
                    </div>
                    <div className="p-4 space-y-3 flex-1 overflow-y-auto">
                        {FARM_TASKS.map(task => (
                            <div key={task.id} className="flex items-start gap-3 p-3 bg-white border border-slate-100 rounded-lg shadow-sm hover:border-emerald-200 transition-colors cursor-pointer group">
                                <button className="mt-0.5">{getStatusIcon(task.status)}</button>
                                <div className="flex-1">
                                    <p className={`text-sm font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors ${task.status === 'completed' ? 'line-through opacity-50' : ''}`}>
                                        {task.title}
                                    </p>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${getPriorityColor(task.priority)}`}>
                                            {task.priority}
                                        </span>
                                        <span className="text-xs text-slate-400 flex items-center gap-1">
                                            <Calendar className="w-3 h-3" /> {task.dueDate}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button className="w-full py-2 border border-dashed border-slate-300 rounded-lg text-sm text-slate-500 hover:text-emerald-600 hover:border-emerald-300 hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2">
                            <Plus className="w-4 h-4" /> Add New Task
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </div>
  );
};

export default FarmerDashboard;
