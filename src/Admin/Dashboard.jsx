import React from 'react';
import { useAdmin } from './context/AdminContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, Users, Calendar, IndianRupee } from 'lucide-react';

const Dashboard = () => {
    const { revenueData, stats } = useAdmin();

    const StatCard = ({ title, value, icon: Icon, color }) => (
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all hover:bg-white/10">
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/5" />
            <div className="relative flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-400">{title}</p>
                    <h3 className="mt-2 font-gagalin text-3xl tracking-wide">{value}</h3>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${color} text-white shadow-lg`}>
                    <Icon className="h-6 w-6" />
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold font-gagalin">Dashboard</h1>
                <p className="text-gray-400">Welcome back, Admin</p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Revenue"
                    value={`${stats.totalRevenue.toLocaleString()}`}
                    icon={IndianRupee}
                    color="from-green-500 to-emerald-600"
                />
                <StatCard
                    title="Monthly Revenue"
                    value={`₹${stats.thisMonthRevenue.toLocaleString()}`}
                    icon={TrendingUp}
                    color="from-blue-500 to-indigo-600"
                />
                <StatCard
                    title="Total Members"
                    value={stats.totalMembers}
                    icon={Users}
                    color="from-primary to-orange-600"
                />
                <StatCard
                    title="Active Members"
                    value={stats.activeMembers}
                    icon={Calendar}
                    color="from-purple-500 to-pink-600"
                />
            </div>

            {/* Charts */}
            <div className="grid gap-8 lg:grid-cols-2">
                {/* Monthly Revenue Chart */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                    <h3 className="mb-6 font-gagalin text-xl">Revenue Analytics</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData}>
                                <defs>
                                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#D90A14" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#D90A14" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1D1D1D', borderColor: '#333', color: '#fff' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="total" stroke="#D90A14" fillOpacity={1} fill="url(#colorTotal)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* This Month Breakdown (Mock visualization) */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                    <h3 className="mb-6 font-gagalin text-xl">Monthly Growth</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueData.slice(-6)}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ backgroundColor: '#1D1D1D', borderColor: '#333', color: '#fff' }}
                                />
                                <Bar dataKey="total" fill="#D90A14" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
