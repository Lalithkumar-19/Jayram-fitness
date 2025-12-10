import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Clock, LogOut, Dumbbell, Menu, X } from 'lucide-react';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const admin = localStorage.getItem('adminInfo');
    const logout = () => {
        localStorage.removeItem('adminInfo');
        navigate('/admin/login');
    };
    if (!admin) {
        navigate('/admin/login');
    }

    const navItems = [
        { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { label: 'Members', path: '/admin/members', icon: Users },
        { label: 'Expiring Soon', path: '/admin/expiring', icon: Clock },
    ];

    return (
        <div className="flex h-screen bg-[#1D1D1D] font-vazirmatn text-white overflow-hidden">
            {/* Sidebar */}
            <aside
                className={`${isSidebarOpen ? 'w-64' : 'w-0'} fixed inset-y-0 left-0 z-50 flex flex-col bg-black/40 border-r border-white/10 transition-all duration-300 backdrop-blur-xl md:relative overflow-hidden`}
            >
                {/* Header */}
                <div className="flex h-16 items-center justify-center border-b border-white/10 font-gagalin tracking-wider">
                    {isSidebarOpen && (
                        <div className="flex items-center gap-2 text-xl">
                            <Dumbbell className="h-6 w-6 text-primary" />
                            <span>ADMIN</span>
                        </div>
                    )}
                </div>

                {/* Nav */}
                <nav className="flex-1 space-y-2 p-4">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${isActive
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                                title={!isSidebarOpen ? item.label : ''}
                            >
                                <item.icon className="h-5 w-5 shrink-0" />
                                {isSidebarOpen && <span className="font-medium">{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="border-t border-white/10 p-4">
                    <span
                        onClick={logout}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-red-500 transition-colors hover:bg-red-500/10"
                    >
                        <LogOut className="h-5 w-5 shrink-0" />
                        {isSidebarOpen && <span className="font-medium">Logout</span>}
                    </span>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-[#1D1D1D] relative">
                <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[100px]" />
                    <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-secondary/5 blur-[100px]" />
                </div>

                {/* Mobile Toggle */}
                <div className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-[#1D1D1D]/80 backdrop-blur-md px-6 md:hidden">
                    <span className="font-gagalin text-lg">JayRam Fitness</span>
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        {isSidebarOpen ? <X /> : <Menu />}
                    </button>
                </div>

                <div className="p-6 md:p-8 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
