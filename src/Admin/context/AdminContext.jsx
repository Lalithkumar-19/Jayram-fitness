import React, { createContext, useContext, useState, useEffect } from "react";
import { addDays } from "date-fns";

const AdminContext = createContext();

export const useAdmin = () => {
    return useContext(AdminContext);
};

// Initial Mock Data
const INITIAL_MEMBERS = [
    { id: 1, firstName: "John", surname: "Doe", dob: "1990-05-15", gender: "male", email: "john@example.com", address: "123 Main St", occupation: "Engineer", weight: 75, height: 180, disability: "no", healthProblems: [], joinDate: "2023-01-01", duration: "yearly", endDate: "2024-01-01", totalAmount: 12000, paidAmount: 12000, incharge: "Ramesh", status: "active" },
    { id: 2, firstName: "Jane", surname: "Smith", dob: "1995-08-20", gender: "female", email: "jane@example.com", address: "456 Oak Ave", occupation: "Doctor", weight: 60, height: 165, disability: "no", healthProblems: ["Back Pain"], joinDate: "2023-11-15", duration: "1 month", endDate: "2023-12-15", totalAmount: 1500, paidAmount: 1000, incharge: "Suresh", status: "active" },
    { id: 3, firstName: "Mike", surname: "Johnson", dob: "1988-12-10", gender: "male", email: "mike@example.com", address: "789 Pine Ln", occupation: "Teacher", weight: 85, height: 175, disability: "yes", disabilityDetail: "Knee Injury", healthProblems: [], joinDate: "2023-06-01", duration: "6 months", endDate: "2023-12-01", totalAmount: 7000, paidAmount: 7000, incharge: "Ramesh", status: "inactive" },
];

const INITIAL_REVENUE_DATA = [
    { name: 'Jan', total: 4000 },
    { name: 'Feb', total: 3000 },
    { name: 'Mar', total: 2000 },
    { name: 'Apr', total: 2780 },
    { name: 'May', total: 1890 },
    { name: 'Jun', total: 2390 },
    { name: 'Jul', total: 3490 },
    { name: 'Aug', total: 4000 },
    { name: 'Sep', total: 3000 },
    { name: 'Oct', total: 5000 },
    { name: 'Nov', total: 4500 },
    { name: 'Dec', total: 6000 },
];

export const AdminProvider = ({ children }) => {
    const [members, setMembers] = useState(INITIAL_MEMBERS);
    const [incharges, setIncharges] = useState(["Goutham", "Venkat", "Shyam"]);
    const [revenueData, setRevenueData] = useState(INITIAL_REVENUE_DATA);

    const addMember = (newMember) => {
        setMembers(prev => [...prev, { ...newMember, id: prev.length + 1, status: "active" }]);
        // In a real app, update revenue as well
    };

    const updateMember = (id, updatedData) => {
        setMembers(prev => prev.map(m => m.id === id ? { ...m, ...updatedData } : m));
    };

    const deleteMember = (id) => {
        setMembers(prev => prev.filter(m => m.id !== id));
    };

    const addIncharge = (name) => {
        if (name && !incharges.includes(name)) {
            setIncharges(prev => [...prev, name]);
        }
    };

    const calculateStats = () => {
        const totalMembers = members.length;
        const activeMembers = members.filter(m => m.status === 'active').length;
        // Mocking revenue calc for current month
        const thisMonthRevenue = 25000;
        const totalRevenue = members.reduce((sum, m) => sum + (Number(m.paidAmount) || 0), 0);

        return { totalMembers, activeMembers, thisMonthRevenue, totalRevenue };
    };

    return (
        <AdminContext.Provider value={{
            members,
            incharges,
            revenueData,
            stats: calculateStats(),
            addMember,
            updateMember,
            deleteMember,
            addIncharge
        }}>
            {children}
        </AdminContext.Provider>
    );
};
