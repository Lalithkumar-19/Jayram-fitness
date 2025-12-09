import React, { useState } from 'react';
import { useAdmin } from './context/AdminContext';
import { Plus, Search, Filter, MoreVertical, Edit2, Trash2, Eye, ChevronLeft, ChevronRight, X, Clock, AlertTriangle } from 'lucide-react';
import AdmissionForm from './components/AdmissionForm';
import { differenceInDays, parseISO } from 'date-fns';

const Expiring = () => {
    const { members, updateMember, deleteMember } = useAdmin();
    const [searchTerm, setSearchTerm] = useState("");
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null); // For View
    const [editingMember, setEditingMember] = useState(null); // For Edit

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    // Filter Expiring Members (<= 5 days) + Search Filter
    const filteredMembers = members.filter(member => {
        // First check if expiring soon
        if (member.status !== 'active' || !member.endDate) return false;
        const daysLeft = differenceInDays(parseISO(member.endDate), new Date());
        const isExpiringSoon = daysLeft <= 5 && daysLeft >= 0;

        if (!isExpiringSoon) return false;

        // Then apply search
        return (
            member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.id.toString().includes(searchTerm)
        );
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentMembers = filteredMembers.slice(startIndex, startIndex + itemsPerPage);

    const toggleStatus = (id, currentStatus) => {
        updateMember(id, { status: currentStatus === 'active' ? 'inactive' : 'active' });
    };

    const handleEdit = (member) => {
        setEditingMember(member);
        setShowAdmissionForm(true);
    };

    const handleCloseForm = () => {
        setShowAdmissionForm(false);
        setEditingMember(null);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold font-gagalin flex items-center gap-3">
                    <Clock className="h-8 w-8 text-yellow-500" />
                    Expiring Soon
                </h1>
                <p className="text-gray-400">Memberships ending within the next 5 days ({filteredMembers.length})</p>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-md">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name or ID..."
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} // Reset page on search
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:border-primary focus:outline-none"
                    />
                </div>
                <div className="text-sm text-gray-400 ml-auto">
                    Showing {filteredMembers.length > 0 ? startIndex + 1 : 0}-{Math.min(startIndex + itemsPerPage, filteredMembers.length)} of {filteredMembers.length} expiring members
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white/5 text-gray-400 font-medium">
                            <tr>
                                <th className="px-6 py-4">S.No</th>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Days Left</th>
                                <th className="px-6 py-4">End Date</th>
                                <th className="px-6 py-4">Plan</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {currentMembers.map((member) => {
                                const daysLeft = differenceInDays(parseISO(member.endDate), new Date());
                                return (
                                    <tr key={member.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4 text-gray-300">#{member.id}</td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-white">{member.firstName} {member.surname}</div>
                                            <div className="text-xs text-gray-500">{member.email}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${daysLeft <= 2 ? 'bg-red-500 text-white' : 'bg-yellow-500 text-black'}`}>
                                                {daysLeft === 0 ? "Today" : `${daysLeft} Days`}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-300">{member.endDate}</td>
                                        <td className="px-6 py-4">
                                            <span className="bg-white/10 px-2 py-1 rounded text-xs text-secondaryVar2 capitalize">{member.duration}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => toggleStatus(member.id, member.status)}
                                                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors hover:opacity-80 ${member.status === 'active'
                                                    ? 'bg-green-500/10 border-green-500 text-green-500'
                                                    : 'bg-red-500/10 border-red-500 text-red-500'
                                                    }`}
                                            >
                                                {member.status}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    title="View Details"
                                                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                                    onClick={() => setSelectedMember(member)}
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </button>
                                                <button
                                                    title="Edit / Renew"
                                                    className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 rounded-lg transition-colors"
                                                    onClick={() => handleEdit(member)}
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </button>
                                                <button
                                                    title="Delete"
                                                    onClick={() => deleteMember(member.id)}
                                                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                            {currentMembers.length === 0 && (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500 flex flex-col items-center justify-center w-full">
                                        <AlertTriangle className="h-8 w-8 mb-2 opacity-50" />
                                        No expiring members found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between border-t border-white/10 bg-white/5 px-6 py-4">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="flex items-center gap-1 text-sm font-medium text-gray-400 hover:text-white disabled:opacity-50 transition-colors"
                        >
                            <ChevronLeft className="h-4 w-4" /> Previous
                        </button>
                        <span className="text-sm text-gray-400">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="flex items-center gap-1 text-sm font-medium text-gray-400 hover:text-white disabled:opacity-50 transition-colors"
                        >
                            Next <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                )}
            </div>

            {/* Admission / Edit Modal */}
            {showAdmissionForm && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
                    onClick={handleCloseForm}
                >
                    <AdmissionForm onClose={handleCloseForm} initialData={editingMember} />
                </div>
            )}

            {/* View Details Modal */}
            {selectedMember && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
                    onClick={() => setSelectedMember(null)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-[#1D1D1D] border border-white/10 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto font-vazirmatn relative shadow-2xl"
                    >
                        <button
                            onClick={() => setSelectedMember(null)}
                            className="absolute right-4 top-4 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <div className="mb-6 flex items-center gap-4 border-b border-white/10 pb-6">
                            <div className="h-16 w-16 items-center justify-center rounded-full bg-primary/20 flex text-primary text-2xl font-bold">
                                {selectedMember.firstName[0]}{selectedMember.surname[0]}
                            </div>
                            <div>
                                <h3 className="text-2xl font-gagalin">{selectedMember.firstName} {selectedMember.surname}</h3>
                                <p className="text-gray-400 text-sm">Member ID: #{selectedMember.id}</p>
                                <span className={`mt-2 inline-block px-2 py-0.5 rounded text-xs font-bold border ${selectedMember.status === 'active' ? 'border-green-500 text-green-500 bg-green-500/10' : 'border-red-500 text-red-500 bg-red-500/10'}`}>
                                    {selectedMember.status.toUpperCase()}
                                </span>
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <DetailSection title="Personal Information">
                                <DetailRow label="Date of Birth" value={selectedMember.dob} />
                                <DetailRow label="Gender" value={selectedMember.gender} />
                                <DetailRow label="Email" value={selectedMember.email} />
                                <DetailRow label="Phone" value={selectedMember.phone || "N/A"} />
                                <DetailRow label="Occupation" value={selectedMember.occupation} />
                                <DetailRow label="Address" value={selectedMember.address} className="col-span-2" />
                            </DetailSection>

                            <DetailSection title="Physical Stats & Health">
                                <DetailRow label="Weight" value={`${selectedMember.weight} kg`} />
                                <DetailRow label="Height" value={`${selectedMember.height} cm`} />
                                <DetailRow label="Disability" value={selectedMember.disability === 'yes' ? selectedMember.disabilityDetail : 'None'} className="col-span-2" />
                                <div className="col-span-2">
                                    <span className="block text-xs text-gray-500 mb-1">Health Problems</span>
                                    {selectedMember.healthProblems?.length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {selectedMember.healthProblems.map((p, i) => (
                                                <span key={i} className="bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-1 rounded text-xs">{p}</span>
                                            ))}
                                        </div>
                                    ) : (
                                        <span className="text-white text-sm">None</span>
                                    )}
                                </div>
                            </DetailSection>

                            <DetailSection title="Membership Details">
                                <DetailRow label="Plan Duration" value={selectedMember.duration} />
                                <DetailRow label="Join Date" value={selectedMember.joinDate} />
                                <DetailRow label="End Date" value={selectedMember.endDate} />
                                <DetailRow label="Incharge" value={selectedMember.incharge} />
                            </DetailSection>

                            <DetailSection title="Payment Info">
                                <DetailRow label="Total Amount" value={`₹${selectedMember.totalAmount}`} />
                                <DetailRow label="Amount Paid" value={`₹${selectedMember.paidAmount}`} />
                                <DetailRow
                                    label="Remaining Due"
                                    value={`₹${(Number(selectedMember.totalAmount) || 0) - (Number(selectedMember.paidAmount) || 0)}`}
                                    valueClass={(Number(selectedMember.totalAmount) || 0) - (Number(selectedMember.paidAmount) || 0) > 0 ? "text-red-500 font-bold" : "text-green-500 font-bold"}
                                />
                            </DetailSection>
                        </div>

                        <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-white/10">
                            <button onClick={() => { setSelectedMember(null); handleEdit(selectedMember); }} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium">
                                Edit / Renew
                            </button>
                            <button onClick={() => setSelectedMember(null)} className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-medium">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Helper Components for Details Modal
const DetailSection = ({ title, children }) => (
    <div className="space-y-3">
        <h4 className="text-primary font-semibold border-b border-white/10 pb-1">{title}</h4>
        <div className="grid grid-cols-2 gap-3 text-sm">
            {children}
        </div>
    </div>
);

const DetailRow = ({ label, value, className = "", valueClass = "text-white" }) => (
    <div className={className}>
        <span className="block text-xs text-gray-500 mb-0.5">{label}</span>
        <span className={valueClass}>{value || "N/A"}</span>
    </div>
);

export default Expiring;
