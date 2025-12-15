import React from 'react';
import { User, Course, WeatherData } from '../types';
import { COURSES, WEATHER_DATA } from '../constants';
import { Book, Award, Clock, Sun, Droplets } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const activeCourses = COURSES.filter(c => c.progress !== undefined && c.progress > 0);
  const currentWeather = WEATHER_DATA[0];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-500 rounded-2xl p-6 text-white shadow-lg">
        <h2 className="text-3xl font-bold mb-2">Welcome back, {user.name.split(' ')[0]}!</h2>
        <p className="opacity-90">You have completed 3 lessons this week. Keep up the good work!</p>
        <div className="flex gap-4 mt-6">
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <Award className="w-5 h-5 text-yellow-300" />
                <span className="font-semibold">{user.xp} XP</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <Clock className="w-5 h-5 text-blue-200" />
                <span className="font-semibold">25h Learned</span>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Courses */}
        <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-800">Continue Learning</h3>
                <button className="text-sm text-emerald-600 font-medium hover:underline">View All</button>
            </div>
            
            <div className="grid gap-4">
                {activeCourses.length > 0 ? activeCourses.map(course => (
                    <div key={course.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-4 hover:shadow-md transition-shadow">
                        <img src={course.thumbnail} alt={course.title} className="w-full sm:w-32 h-32 sm:h-24 object-cover rounded-lg" />
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <h4 className="font-semibold text-slate-800">{course.title}</h4>
                                <p className="text-sm text-slate-500 mt-1">{course.instructor} • {course.duration}</p>
                            </div>
                            <div className="mt-4">
                                <div className="flex justify-between text-xs text-slate-500 mb-1">
                                    <span>{course.progress}% Complete</span>
                                    <span>{course.totalLessons} Lessons</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2">
                                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="text-center p-8 bg-white rounded-xl border border-dashed border-slate-300">
                        <Book className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                        <p className="text-slate-500">No active courses. Start exploring!</p>
                    </div>
                )}
            </div>
        </div>

        {/* Right Column - Weather */}
        <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <Sun className="w-5 h-5 text-orange-500" />
                        Weather Forecast
                    </h3>
                    <span className="text-xs text-slate-500">{user.location}</span>
                </div>
                <div className="p-6 text-center">
                     <div className="text-5xl font-bold text-slate-800 mb-2">{currentWeather.temp}°C</div>
                     <p className="text-slate-500 flex justify-center items-center gap-2">
                        {currentWeather.condition}
                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                        <Droplets className="w-4 h-4 text-blue-500" /> {currentWeather.humidity}%
                     </p>
                </div>
                <div className="h-40 w-full px-2">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={WEATHER_DATA}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                            <Line type="monotone" dataKey="temp" stroke="#10b981" strokeWidth={3} dot={{r: 4, fill: '#10b981'}} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
                <h3 className="font-bold text-slate-800 mb-4">Achievements</h3>
                <div className="flex flex-wrap gap-2">
                    {user.badges.map((badge, idx) => (
                        <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                            <Award className="w-3 h-3 mr-1" />
                            {badge}
                        </span>
                    ))}
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200 border-dashed">
                        + Unlock more
                    </span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;