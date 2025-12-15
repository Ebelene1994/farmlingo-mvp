
import React, { useState } from 'react';
import { 
    Users, Shield, AlertTriangle, Activity, Search, Filter, 
    MoreHorizontal, CheckCircle, XCircle, FileText, Ban,
    TrendingUp, MessageSquare, BookOpen, Download, ChevronDown,
    Plus, Settings, RefreshCw, Clock, UserPlus
} from 'lucide-react';
import { 
    BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
    PieChart, Pie, Cell, AreaChart, Area, Legend
} from 'recharts';
import { SYSTEM_LOGS, USER_REPORTS, ALL_USERS } from '../constants';
import { UserRole, User } from '../types';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'moderation' | 'logs'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Local state for user management simulation
  const [users, setUsers] = useState<User[]>(ALL_USERS);
  
  // Log Filtering State
  const [logLevelFilter, setLogLevelFilter] = useState<string>('all');
  const [logModuleFilter, setLogModuleFilter] = useState<string>('all');

  // --- Mock Data for Analytics ---
  const engagementData = [
    { name: 'Mon', active: 400, new: 24 },
    { name: 'Tue', active: 300, new: 13 },
    { name: 'Wed', active: 550, new: 38 },
    { name: 'Thu', active: 450, new: 20 },
    { name: 'Fri', active: 600, new: 45 },
    { name: 'Sat', active: 350, new: 15 },
    { name: 'Sun', active: 200, new: 10 },
  ];

  const roleDistribution = [
    { name: 'Students', value: 65, color: '#10b981' }, // Emerald-500
    { name: 'Farmers', value: 25, color: '#3b82f6' }, // Blue-500
    { name: 'Admins', value: 10, color: '#6366f1' },  // Indigo-500
  ];

  const courseCompletionData = [
    { month: 'Jan', completed: 45, enrolled: 120 },
    { month: 'Feb', completed: 52, enrolled: 135 },
    { month: 'Mar', completed: 48, enrolled: 140 },
    { month: 'Apr', completed: 61, enrolled: 155 },
    { month: 'May', completed: 55, enrolled: 170 },
    { month: 'Jun', completed: 67, enrolled: 190 },
  ];

  const forumActivityData = [
    { day: 'Mon', posts: 12, comments: 45 },
    { day: 'Tue', posts: 18, comments: 52 },
    { day: 'Wed', posts: 15, comments: 38 },
    { day: 'Thu', posts: 22, comments: 65 },
    { day: 'Fri', posts: 28, comments: 72 },
    { day: 'Sat', posts: 10, comments: 25 },
    { day: 'Sun', posts: 8, comments: 15 },
  ];

  // --- Filtering Logic ---
  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLogs = SYSTEM_LOGS.filter(l => {
    const matchesSearch = l.module.includes(searchTerm.toLowerCase()) ||
                          l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          l.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = logLevelFilter === 'all' || l.level === logLevelFilter;
    const matchesModule = logModuleFilter === 'all' || l.module === logModuleFilter;
    return matchesSearch && matchesLevel && matchesModule;
  });

  // --- Actions ---
  const toggleUserStatus = (userId: string) => {
    setUsers(prev => prev.map(u => 
        u.id === userId 
            ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } 
            : u
    ));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-slate-50 min-h-screen space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <Shield className="w-6 h-6 text-indigo-600" /> Admin Dashboard
                </h1>
                <p className="text-slate-500 text-sm">System overview, user management, and moderation tools.</p>
            </div>
            
            <div className="flex bg-white p-1 rounded-lg border border-slate-200 shadow-sm overflow-x-auto max-w-full">
                {['overview', 'users', 'moderation', 'logs'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                            activeTab === tab 
                            ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                            : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                        }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-300">
                {/* 1. Stats Cards Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                        <div className="flex justify-between items-start mb-2 relative z-10">
                            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Users</h3>
                            <Users className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div className="text-3xl font-bold text-slate-800 relative z-10">12,450</div>
                        <div className="text-xs text-emerald-600 font-medium mt-1 flex items-center relative z-10">
                            <TrendingUp className="w-3 h-3 mr-1" /> +12% this month
                        </div>
                        <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
                            <Users className="w-24 h-24 text-emerald-600" />
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                        <div className="flex justify-between items-start mb-2 relative z-10">
                            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Active Reports</h3>
                            <AlertTriangle className="w-5 h-5 text-amber-500" />
                        </div>
                        <div className="text-3xl font-bold text-slate-800 relative z-10">{USER_REPORTS.filter(r => r.status === 'pending').length}</div>
                        <div className="text-xs text-amber-600 font-medium mt-1 relative z-10">Action Required</div>
                        <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
                            <Shield className="w-24 h-24 text-amber-600" />
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">System Health</h3>
                            <Activity className="w-5 h-5 text-blue-500" />
                        </div>
                        <div className="text-3xl font-bold text-slate-800">99.9%</div>
                        <div className="text-xs text-slate-400 font-medium mt-1">Uptime this week</div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Course Progress</h3>
                            <BookOpen className="w-5 h-5 text-purple-500" />
                        </div>
                        <div className="text-3xl font-bold text-slate-800">1,204</div>
                        <div className="text-xs text-purple-600 font-medium mt-1">Completions this week</div>
                    </div>
                </div>

                {/* 2. Main Analytics Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* User Growth Chart */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="font-bold text-slate-800">Platform Engagement</h3>
                                <p className="text-xs text-slate-500">Active users vs New signups</p>
                            </div>
                            <select className="text-xs border border-slate-200 rounded-md text-slate-600 px-2 py-1 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                                <option>Last 7 Days</option>
                                <option>Last 30 Days</option>
                            </select>
                        </div>
                        <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={engagementData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                                    <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                                    <Bar dataKey="active" name="Active Users" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={32} />
                                    <Bar dataKey="new" name="New Signups" fill="#10b981" radius={[4, 4, 0, 0]} barSize={32} />
                                    <Legend wrapperStyle={{paddingTop: '20px'}} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Role Distribution Chart */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                        <h3 className="font-bold text-slate-800 mb-2">User Roles</h3>
                        <p className="text-xs text-slate-500 mb-6">Distribution by account type</p>
                        <div className="flex-1 min-h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={roleDistribution}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {roleDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{borderRadius: '8px', border: 'none'}} />
                                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* 3. Operational Row: Recent Users, Quick Actions, Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Recent Users Preview */}
                    <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h3 className="font-bold text-slate-800">Recent Registrations</h3>
                            <button 
                                onClick={() => setActiveTab('users')}
                                className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
                            >
                                View All
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-white text-slate-500 font-medium border-b border-slate-100">
                                    <tr>
                                        <th className="px-6 py-3">User</th>
                                        <th className="px-6 py-3">Role</th>
                                        <th className="px-6 py-3">Status</th>
                                        <th className="px-6 py-3 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {users.slice(0, 4).map(user => (
                                        <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-3">
                                                <div className="flex items-center gap-3">
                                                    <img src={user.avatar} className="w-8 h-8 rounded-full border border-slate-200" alt="" />
                                                    <div>
                                                        <div className="font-bold text-slate-800 text-xs">{user.name}</div>
                                                        <div className="text-slate-500 text-[10px]">{user.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-[4px] text-[10px] font-bold border ${
                                                    user.role === UserRole.ADMIN ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                                    user.role === UserRole.FARMER ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                                    'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                }`}>
                                                    {user.role.toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-3">
                                                <div className="flex items-center gap-1.5">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                                                    <span className="text-slate-600 text-xs font-medium">{user.status || 'Active'}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3 text-right">
                                                <button className="text-slate-400 hover:text-indigo-600">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Right Column: Quick Actions & Timeline */}
                    <div className="space-y-6">
                        
                        {/* Quick Actions Widget */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                            <h3 className="font-bold text-slate-800 mb-4">Quick Actions</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <button className="flex flex-col items-center justify-center p-3 bg-slate-50 hover:bg-indigo-50 border border-slate-100 hover:border-indigo-100 rounded-lg transition-all group">
                                    <UserPlus className="w-6 h-6 text-slate-500 group-hover:text-indigo-600 mb-2" />
                                    <span className="text-xs font-semibold text-slate-600 group-hover:text-indigo-700">Create User</span>
                                </button>
                                <button className="flex flex-col items-center justify-center p-3 bg-slate-50 hover:bg-emerald-50 border border-slate-100 hover:border-emerald-100 rounded-lg transition-all group">
                                    <FileText className="w-6 h-6 text-slate-500 group-hover:text-emerald-600 mb-2" />
                                    <span className="text-xs font-semibold text-slate-600 group-hover:text-emerald-700">Generate Report</span>
                                </button>
                                <button className="flex flex-col items-center justify-center p-3 bg-slate-50 hover:bg-amber-50 border border-slate-100 hover:border-amber-100 rounded-lg transition-all group">
                                    <Shield className="w-6 h-6 text-slate-500 group-hover:text-amber-600 mb-2" />
                                    <span className="text-xs font-semibold text-slate-600 group-hover:text-amber-700">Manage Roles</span>
                                </button>
                                <button className="flex flex-col items-center justify-center p-3 bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-100 rounded-lg transition-all group">
                                    <Settings className="w-6 h-6 text-slate-500 group-hover:text-blue-600 mb-2" />
                                    <span className="text-xs font-semibold text-slate-600 group-hover:text-blue-700">Settings</span>
                                </button>
                            </div>
                        </div>

                        {/* Recent Activity Timeline */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                             <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-slate-800">Recent Activity</h3>
                                <button 
                                    onClick={() => setActiveTab('logs')}
                                    className="text-xs font-bold text-slate-400 hover:text-indigo-600"
                                >
                                    View Log
                                </button>
                            </div>
                            <div className="space-y-4">
                                {SYSTEM_LOGS.slice(0, 4).map((log, idx) => (
                                    <div key={log.id} className="flex gap-3 relative">
                                        {idx !== 3 && <div className="absolute left-[11px] top-6 bottom-[-20px] w-0.5 bg-slate-100"></div>}
                                        <div className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold border-2 border-white shadow-sm z-10 ${
                                            log.level === 'error' ? 'bg-red-100 text-red-600' :
                                            log.level === 'warning' ? 'bg-amber-100 text-amber-600' :
                                            'bg-blue-100 text-blue-600'
                                        }`}>
                                            {log.level.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="pb-1">
                                            <p className="text-xs font-semibold text-slate-800">{log.action}</p>
                                            <p className="text-[10px] text-slate-500">
                                                <span className="font-medium text-slate-600">{log.user.split('@')[0]}</span> • {log.timestamp.split(' ')[1]}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* USERS TAB (Full Management) */}
        {activeTab === 'users' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-300">
                <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="relative flex-1 w-full sm:w-auto max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Search users by name or email..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                            <Filter className="w-4 h-4" /> Filter
                        </button>
                        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                            <Plus className="w-4 h-4" /> Add User
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 font-medium">
                            <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">XP</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredUsers.map(user => (
                                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={user.avatar} className="w-8 h-8 rounded-full" alt="" />
                                            <div>
                                                <div className="font-bold text-slate-900">{user.name}</div>
                                                <div className="text-slate-500 text-xs">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${
                                            user.role === UserRole.ADMIN ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                            user.role === UserRole.FARMER ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                            'bg-emerald-50 text-emerald-700 border-emerald-200'
                                        }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                                            <span className="text-slate-700">{user.status || 'Active'}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 font-mono">{user.xp?.toLocaleString() || 0}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button 
                                                onClick={() => toggleUserStatus(user.id)}
                                                className={`text-xs px-2 py-1 rounded border transition-colors ${
                                                    user.status === 'Active' 
                                                    ? 'text-red-600 border-red-200 hover:bg-red-50' 
                                                    : 'text-emerald-600 border-emerald-200 hover:bg-emerald-50'
                                                }`}
                                            >
                                                {user.status === 'Active' ? 'Suspend' : 'Activate'}
                                            </button>
                                            <button className="text-slate-400 hover:text-indigo-600 p-1">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}

        {/* MODERATION TAB */}
        {activeTab === 'moderation' && (
            <div className="space-y-6 animate-in fade-in duration-300">
                <div className="grid gap-4">
                    {USER_REPORTS.map(report => (
                        <div key={report.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
                                        report.reason === 'spam' ? 'bg-orange-100 text-orange-700' :
                                        report.reason === 'harassment' ? 'bg-red-100 text-red-700' :
                                        'bg-slate-100 text-slate-700'
                                    }`}>
                                        {report.reason}
                                    </span>
                                    <span className="text-xs text-slate-400">• {report.timestamp}</span>
                                    <span className={`text-xs font-bold ${
                                        report.status === 'pending' ? 'text-amber-500' : 'text-emerald-500'
                                    }`}>
                                        {report.status.toUpperCase()}
                                    </span>
                                </div>
                                <h3 className="font-bold text-slate-800 mb-1">
                                    Report against <span className="text-indigo-600 cursor-pointer hover:underline">@{report.reportedUserName}</span>
                                </h3>
                                <p className="text-sm text-slate-600">
                                    Reported by <span className="font-semibold">{report.reporterName}</span> for {report.contentType}.
                                </p>
                                <div className="mt-4 p-3 bg-slate-50 rounded-lg text-xs text-slate-500 border border-slate-100 font-mono">
                                    Preview of reported content would appear here...
                                </div>
                            </div>
                            <div className="flex flex-row md:flex-col justify-center items-end gap-3 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                                <button className="flex-1 w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-100 transition-colors">
                                    <CheckCircle className="w-4 h-4" /> Dismiss
                                </button>
                                <button className="flex-1 w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
                                    <Ban className="w-4 h-4" /> Ban User
                                </button>
                            </div>
                        </div>
                    ))}
                    {USER_REPORTS.length === 0 && (
                        <div className="text-center p-12 text-slate-400 bg-white rounded-xl border border-dashed border-slate-200">
                            <CheckCircle className="w-12 h-12 mx-auto mb-2 opacity-50 text-emerald-500" />
                            <p>No pending reports. All clear!</p>
                        </div>
                    )}
                </div>
            </div>
        )}

        {/* LOGS TAB */}
        {activeTab === 'logs' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-300">
                <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Search logs by user, action, or module..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="flex gap-2">
                        <div className="relative">
                            <select 
                                value={logModuleFilter}
                                onChange={(e) => setLogModuleFilter(e.target.value)}
                                className="appearance-none pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                            >
                                <option value="all">All Modules</option>
                                <option value="auth">Auth</option>
                                <option value="course">Course</option>
                                <option value="forum">Forum</option>
                                <option value="chat">Chat</option>
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                        <div className="relative">
                            <select 
                                value={logLevelFilter}
                                onChange={(e) => setLogLevelFilter(e.target.value)}
                                className="appearance-none pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                            >
                                <option value="all">All Levels</option>
                                <option value="info">Info</option>
                                <option value="warning">Warning</option>
                                <option value="error">Error</option>
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm font-mono">
                        <thead className="bg-slate-50 text-slate-500 font-medium font-sans">
                            <tr>
                                <th className="px-6 py-3">Timestamp</th>
                                <th className="px-6 py-3">Level</th>
                                <th className="px-6 py-3">Module</th>
                                <th className="px-6 py-3">Action</th>
                                <th className="px-6 py-3">User</th>
                                <th className="px-6 py-3">IP</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredLogs.map(log => (
                                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-3 text-slate-500 whitespace-nowrap">{log.timestamp}</td>
                                    <td className="px-6 py-3">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                            log.level === 'error' ? 'bg-red-100 text-red-700' :
                                            log.level === 'warning' ? 'bg-amber-100 text-amber-700' :
                                            'bg-blue-100 text-blue-700'
                                        }`}>
                                            {log.level}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3 text-slate-700 font-bold capitalize">{log.module}</td>
                                    <td className="px-6 py-3 text-slate-800">{log.action}</td>
                                    <td className="px-6 py-3 text-slate-600">{log.user}</td>
                                    <td className="px-6 py-3 text-slate-400">{log.ip}</td>
                                </tr>
                            ))}
                            {filteredLogs.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500 bg-slate-50/30">
                                        No logs found matching filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )}
    </div>
  );
};

export default AdminDashboard;
