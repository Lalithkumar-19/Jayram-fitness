import React, { useState } from "react";
import { Lock, Mail, Dumbbell, ArrowRight } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAdmin } from "./context/AdminContext";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    const { login } = useAdmin();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await login(formData.email, formData.password);
        setLoading(false);

        if (res.success) {
            setTimeout(() => {
                navigate('/admin');
            }, 3000);
        } else {
            alert(res.message);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#1D1D1D] font-vazirmatn text-white">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -left-[10%] -top-[10%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]" />
                <div className="absolute -right-[10%] -bottom-[10%] h-[500px] w-[500px] rounded-full bg-secondary/10 blur-[120px]" />
            </div>

            <div className="relative z-10 w-full max-w-md p-6">
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white shadow-xl shadow-primary/30">
                        <Dumbbell className="h-8 w-8" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-wide font-gagalin">
                        Admin <span className="text-primary">Portal</span>
                    </h1>
                    <p className="mt-2 text-sm text-gray-400">
                        Sign in to manage subscriptions and members
                    </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-300">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute left-0 top-0 flex h-full w-12 items-center justify-center text-gray-400">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="admin@jayaramfitness.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="h-12 w-full rounded-xl border border-white/10 bg-black/20 pl-12 pr-4 text-sm text-white placeholder:text-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-gray-300">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute left-0 top-0 flex h-full w-12 items-center justify-center text-gray-400">
                                    <Lock className="h-5 w-5" />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="h-12 w-full rounded-xl border border-white/10 bg-black/20 pl-12 pr-4 text-sm text-white placeholder:text-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-8 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primaryVar1 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
                        >
                            {loading ? (
                                "Signing in..."
                            ) : (
                                <>
                                    Sign In <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="mt-8 text-center text-xs text-gray-500">
                    &copy; {new Date().getFullYear()} JayRam Fitness. Admin Access Only.
                </div>
            </div>
        </div>
    );
};

export default Login;
