import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AdminContext = createContext();

export const useAdmin = () => {
    return useContext(AdminContext);
};

export const AdminProvider = ({ children }) => {
    // Auth State
    const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem('adminInfo')) || null);

    // Data State
    const [members, setMembers] = useState([]); // This will hold current page's members
    const [allMembers, setAllMembers] = useState([]); // Or maybe just keep pagination logic in components?
    // Actually, for "Expiring" we need a different API call. 
    // Let's keep `members` as the list for the main table.

    const [expiringMembers, setExpiringMembers] = useState([]);
    const [incharges, setIncharges] = useState(["Goutham", "Venkat", "Shyam"]); // Keep mock for now or add API

    // Stats & Dashboard
    const [stats, setStats] = useState({
        totalMembers: 0,
        activeMembers: 0,
        totalRevenue: 0,
        todayRevenue: 0,
        revenueData: []
    });

    // Pagination Info
    const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });

    const API_URL = "https://jayram-fitness-backend.vercel.app/api";

    // Attach token to requests
    const config = () => ({
        headers: {
            Authorization: `Bearer ${admin?.token}`,
        },
    });

    // Login
    const login = async (email, password) => {
        try {
            const { data } = await axios.post(`${API_URL}/auth/login`, { email, password });
            setAdmin(data);
            localStorage.setItem('adminInfo', JSON.stringify(data));
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || error.message };
        }
    };

    const logout = () => {
        setAdmin(null);
        localStorage.removeItem('adminInfo');
    };

    // Fetch Members (Paginated)
    const fetchMembers = async (page = 1, search = "") => {
        try {
            const { data } = await axios.get(`${API_URL}/members?page=${page}&search=${search}`, config());
            setMembers(data.members);
            setPagination({
                page: data.currentPage,
                pages: data.totalPages,
                total: data.totalMembers
            });
        } catch (error) {
            console.error(error);
        }
    };

    // Fetch Expiring Members
    const fetchExpiringMembers = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/members/expiring`, config());
            setExpiringMembers(data);
        } catch (error) {
            console.error(error);
        }
    };

    // Fetch Stats
    const fetchStats = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/dashboard/stats`, config());
            setStats(data); // { totalMembers, activeMembers, totalRevenue, revenueData }
        } catch (error) {
            console.error(error);
        }
    };

    // Add Member
    const addMember = async (memberData) => {
        try {
            await axios.post(`${API_URL}/members`, memberData, config());
            // Refresh data
            fetchMembers(pagination.page);
            fetchStats();
        } catch (error) {
            console.error(error);
            alert("Error adding member: " + (error.response?.data?.message || error.message));
        }
    };

    // Update Member
    const updateMember = async (id, memberData) => {
        try {
            await axios.put(`${API_URL}/members/${id}`, memberData, config());
            // Refresh data
            fetchMembers(pagination.page);
            fetchExpiringMembers(); // In case we renewed
            fetchStats();
        } catch (error) {
            console.error(error);
            alert("Error updating member");
        }
    };

    // Delete Member
    const deleteMember = async (id) => {
        if (!window.confirm("Are you sure you want to delete this member?")) return;
        try {
            await axios.delete(`${API_URL}/members/${id}`, config());
            // Refresh data
            fetchMembers(pagination.page);
            fetchStats();
        } catch (error) {
            console.error(error);
            alert("Error deleting member");
        }
    };

    const addIncharge = (name) => {
        // keeping this simple/local for now as requested by user previously, or connect to API if needed
        if (name && !incharges.includes(name)) {
            setIncharges(prev => [...prev, name]);
        }
    };

    return (
        <AdminContext.Provider value={{
            admin,
            login,
            logout,
            members,
            expiringMembers,
            pagination,
            incharges,
            stats, // Contains revenueData etc.
            revenueData: stats.revenueData || [],

            fetchMembers, // Exposed for Members.jsx to trigger search/page change
            fetchExpiringMembers,
            fetchStats,

            addMember,
            updateMember,
            deleteMember,
            addIncharge
        }}>
            {children}
        </AdminContext.Provider>
    );
};
