import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Calendar, User, Info, IndianRupee } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { addMonths, addYears, format } from 'date-fns';

const AdmissionForm = ({ onClose, initialData }) => {
    const { addMember, updateMember, incharges, addIncharge } = useAdmin();
    const [newIncharge, setNewIncharge] = useState("");
    const [showInchargeInput, setShowInchargeInput] = useState(false);

    const [healthInput, setHealthInput] = useState("");

    // Form State
    const [formData, setFormData] = useState({
        firstName: "", surname: "", dob: "", gender: "male", email: "", mobile: "", address: "", occupation: "", weight: "", height: "",
        disability: "no", disabilityDetail: "", healthProblems: [],
        joinDate: format(new Date(), 'yyyy-MM-dd'), duration: "1 month", endDate: "",
        totalAmount: "", paidAmount: "",
        incharge: "",
    });

    // Populate form if editing
    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                dob: initialData.dob ? new Date(initialData.dob).toISOString().split('T')[0] : "",
            });
        }
    }, [initialData]);

    // Auto-calculate End Date
    useEffect(() => {
        if (formData.joinDate && formData.duration) {
            let end = new Date(formData.joinDate);
            if (formData.duration === "1 month") end = addMonths(end, 1);
            else if (formData.duration === "3 months") end = addMonths(end, 3);
            else if (formData.duration === "6 months") end = addMonths(end, 6);
            else if (formData.duration === "yearly") end = addYears(end, 1);

            setFormData(prev => ({ ...prev, endDate: format(end, 'yyyy-MM-dd') }));
        }
    }, [formData.joinDate, formData.duration]);

    // calculate age
    const calculateAge = (dob) => {
        if (!dob) return "";
        const diff = Date.now() - new Date(dob).getTime();
        return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    };

    const handleAddHealthProblem = () => {
        if (healthInput.trim()) {
            setFormData(prev => ({ ...prev, healthProblems: [...prev.healthProblems, healthInput] }));
            setHealthInput("");
        }
    };

    const handleRemoveHealthProblem = (index) => {
        setFormData(prev => ({ ...prev, healthProblems: prev.healthProblems.filter((_, i) => i !== index) }));
    };

    const handleAddIncharge = () => {
        if (newIncharge) {
            addIncharge(newIncharge);
            setFormData(prev => ({ ...prev, incharge: newIncharge }));
            setNewIncharge("");
            setShowInchargeInput(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (initialData) {
            updateMember(initialData._id || initialData.id, formData);
        } else {
            addMember(formData);
        }
        onClose(); // Close modal/form
    };

    const remainingAmount = (Number(formData.totalAmount) || 0) - (Number(formData.paidAmount) || 0);

    return (
        <div onClick={(e) => e.stopPropagation()} className="bg-[#1D1D1D] p-6 rounded-2xl max-h-[85vh] overflow-y-auto w-full max-w-4xl mx-auto border border-white/10 text-white font-vazirmatn scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
            <h2 className="text-2xl font-bold font-gagalin mb-6 text-center">{initialData ? "Edit Member Details" : "New Member Admission"}</h2>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Details */}
                <section className="space-y-4">
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-primary border-b border-white/10 pb-2">
                        <User className="h-5 w-5" /> Personal Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input label="First Name" value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} required />
                        <Input label="Surname" value={formData.surname} onChange={e => setFormData({ ...formData, surname: e.target.value })} />
                        <Input type="date" label="Date of Birth" value={formData.dob} onChange={e => setFormData({ ...formData, dob: e.target.value })} required />
                        <Input type="number" label="Age" value={formData.age} onChange={e => setFormData({ ...formData, age: e.target.value })} />
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-medium text-gray-400">Gender</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer bg-white/5 border border-white/10 rounded-xl px-4 py-2 hover:bg-white/10 transition-colors flex-1 justify-center">
                                    <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={e => setFormData({ ...formData, gender: e.target.value })} className="accent-primary" />
                                    Male
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer bg-white/5 border border-white/10 rounded-xl px-4 py-2 hover:bg-white/10 transition-colors flex-1 justify-center">
                                    <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={e => setFormData({ ...formData, gender: e.target.value })} className="accent-primary" />
                                    Female
                                </label>
                            </div>
                        </div>
                        <Input label="Email" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required className="md:col-span-1" />
                        <Input label="Mobile Number" type="tel" value={formData.mobile} onChange={e => setFormData({ ...formData, mobile: e.target.value })} required placeholder="10-digit number" />
                        <Input label="Occupation" value={formData.occupation} onChange={e => setFormData({ ...formData, occupation: e.target.value })} />
                        <Input label="Address" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} className="md:col-span-3" />
                        <Input label="Weight (kg)" type="number" value={formData.weight} onChange={e => setFormData({ ...formData, weight: e.target.value })} />
                        <Input label="Height (cm)" type="number" value={formData.height} onChange={e => setFormData({ ...formData, height: e.target.value })} />
                    </div>
                </section>

                {/* Health & Disability */}
                <section className="space-y-4">
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-primary border-b border-white/10 pb-2">
                        <Info className="h-5 w-5" /> Health Declaration
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Do you have any disability?</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="disability" value="yes" checked={formData.disability === 'yes'} onChange={e => setFormData({ ...formData, disability: e.target.value })} className="accent-primary" /> Yes</label>
                                <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="disability" value="no" checked={formData.disability === 'no'} onChange={e => setFormData({ ...formData, disability: e.target.value })} className="accent-primary" /> No</label>
                            </div>
                        </div>
                        {formData.disability === 'yes' && (
                            <Input label="Please specify disability" value={formData.disabilityDetail} onChange={e => setFormData({ ...formData, disabilityDetail: e.target.value })} />
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Health Problems</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={healthInput}
                                    onChange={e => setHealthInput(e.target.value)}
                                    placeholder="Enter health problem..."
                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:border-primary focus:outline-none"
                                />
                                <button type="button" onClick={handleAddHealthProblem} className="bg-primary px-4 py-2 rounded-xl text-white hover:bg-primaryVar1"><Plus /></button>
                            </div>
                            <ul className="mt-2 flex flex-wrap gap-2">
                                {formData.healthProblems.map((prob, i) => (
                                    <li key={i} className="bg-white/10 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                                        {prob}
                                        <button type="button" onClick={() => handleRemoveHealthProblem(i)} className="text-red-400 hover:text-red-300"><Trash2 className="h-3 w-3" /></button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Membership */}
                <section className="space-y-4">
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-primary border-b border-white/10 pb-2">
                        <Calendar className="h-5 w-5" /> Membership Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input type="date" label="Looking for Joining Date" value={formData.joinDate} onChange={e => setFormData({ ...formData, joinDate: e.target.value })} />
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Duration</label>
                            <select
                                value={formData.duration}
                                onChange={e => setFormData({ ...formData, duration: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none"
                            >
                                <option className='bg-[#1D1D1D]' value="1 month">1 Month</option>
                                <option className='bg-[#1D1D1D]' value="3 months">3 Months</option>
                                <option className='bg-[#1D1D1D]' value="6 months">6 Months</option>
                                <option className='bg-[#1D1D1D]' value="yearly">Yearly</option>
                            </select>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 flex flex-col justify-center">
                            <span className="text-sm text-gray-400">Membership Ends On</span>
                            <span className="font-bold text-lg text-primary">{formData.endDate}</span>
                        </div>
                    </div>
                </section>

                {/* Payment & Incharge */}
                <section className="space-y-4">
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-primary border-b border-white/10 pb-2">
                        <IndianRupee className="h-5 w-5" /> Payment & Incharge
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input type="number" label="Total Amount" value={formData.totalAmount} onChange={e => setFormData({ ...formData, totalAmount: e.target.value })} />
                        <Input type="number" label="Amount Paid" value={formData.paidAmount} onChange={e => setFormData({ ...formData, paidAmount: e.target.value })} />
                        <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 flex flex-col justify-center">
                            <span className="text-sm text-gray-400">Remaining Due</span>
                            <span className={`font-bold text-lg ${remainingAmount > 0 ? 'text-red-500' : 'text-green-500'}`}>₹ {remainingAmount}</span>
                        </div>

                        <div className="md:col-span-3">
                            <label className="block text-sm font-medium text-gray-400 mb-1">Incharge Name</label>
                            {!showInchargeInput ? (
                                <div className="flex gap-2">
                                    <select
                                        value={formData.incharge}
                                        onChange={e => setFormData({ ...formData, incharge: e.target.value })}
                                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none"
                                    >
                                        <option value="">Select Incharge</option>
                                        {incharges.map(inc => <option key={inc} className='bg-[#1D1D1D]' value={inc}>{inc}</option>)}
                                    </select>
                                    <button type="button" onClick={() => setShowInchargeInput(true)} className="bg-secondary px-4 py-2 rounded-xl text-white hover:bg-secondaryVar1">Add New</button>
                                </div>
                            ) : (
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newIncharge}
                                        onChange={e => setNewIncharge(e.target.value)}
                                        placeholder="Enter Name"
                                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none"
                                    />
                                    <button type="button" onClick={handleAddIncharge} className="bg-primary px-4 py-2 rounded-xl text-white">Save</button>
                                    <button type="button" onClick={() => setShowInchargeInput(false)} className="text-gray-400 px-2">Cancel</button>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                <div className="flex gap-4 pt-4 border-t border-white/10">
                    <button type="submit" className="flex-1 bg-primary text-white font-bold py-3 rounded-xl hover:bg-primaryVar1 shadow-lg shadow-primary/20 transition-all">{initialData ? "Update Member" : "Submit Admission"}</button>
                    <button type="button" onClick={onClose} className="flex-1 bg-white/5 text-gray-300 font-bold py-3 rounded-xl hover:bg-white/10 transition-all">Cancel</button>
                </div>
            </form>
        </div>
    );
};

// Helper Input Component
const Input = ({ label, className, ...props }) => (
    <div className={className}>
        <label className="block text-sm font-medium text-gray-400 mb-1">{label}</label>
        <input
            {...props}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
        />
    </div>
);

export default AdmissionForm;
