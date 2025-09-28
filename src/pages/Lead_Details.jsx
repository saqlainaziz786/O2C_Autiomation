"use client"
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function LeadDetails() {
    const { id } = useParams();
    const [lead, setLead] = useState(null);

    useEffect(() => {
        const savedLeads = JSON.parse(localStorage.getItem("leads")) || [];
        const foundLead = savedLeads.find(l => l.id === Number(id));
        setLead(foundLead);
    }, [id]);

    const handleBack = () => window.history.back();
    const handleCall = () => { console.log("Calling lead..."); };
    const handleEmail = () => { console.log("Sending email..."); };
    const handleEdit = () => { console.log("Editing lead..."); };
    const handleScheduleMeeting = () => { console.log("Scheduling meeting..."); };
    const handleDeleteLead = () => { console.log("Deleting lead..."); };

    if (!lead) {
        return (
            <div className="text-center mt-20 text-red-500 text-xl">
                Lead not found!
            </div>
        );
    }

    return (
        <div className="bg-gray-50 font-sans min-h-screen">
            {/* Fixed Header - same padding/margin as LeadCreationForm */}
            <div className="fixed top-0 left-72 right-3 z-40 bg-white shadow-lg border-b border-gray-200">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 sm:h-20">
                        {/* Left Section */}
                        <div className="flex items-center space-x-3 sm:space-x-6">
                            {/* Back Button */}
                            <button
                                onClick={handleBack}
                                className="bg-blue-600 text-white p-2 sm:p-3 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                            >
                                <i className="fas fa-arrow-left text-sm sm:text-lg"></i>
                            </button>
                            {/* Title */}
                            <div className="flex items-center space-x-2 sm:space-x-4">
                                <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center">
                                    <i className="fas fa-user text-white text-sm sm:text-xl"></i>
                                </div>
                                <div>
                                    <h1 className="text-lg sm:text-2xl font-bold text-gray-800">Lead Details</h1>
                                    <p className="text-xs sm:text-sm text-gray-600 font-semibold">Lead ID: #{lead.id}</p>
                                </div>
                            </div>
                        </div>
                        {/* Right Section */}
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={handleCall}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                            >
                                <i className="fas fa-phone mr-2"></i>Call
                            </button>
                            <button
                                onClick={handleEmail}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                <i className="fas fa-envelope mr-2"></i>Email
                            </button>
                            <button
                                onClick={handleEdit}
                                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                            >
                                <i className="fas fa-edit mr-2"></i>Edit
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-24 sm:pt-32 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Lead Header Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                            <div className="flex items-center space-x-6">
                                <div className="relative">
                                    <img
                                        src={lead.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"}
                                        alt={lead.name}
                                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-blue-200 shadow-lg"
                                    />
                                    <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 sm:w-8 sm:h-8 rounded-full border-4 border-white flex items-center justify-center">
                                        <i className="fas fa-check text-white text-xs sm:text-sm"></i>
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{lead.name}</h2>
                                    <p className="text-lg text-blue-600 font-semibold">{lead.company}</p>
                                    <div className="flex flex-wrap items-center gap-3 mt-3">
                                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">{lead.status}</span>
                                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">{lead.qualification}</span>
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                                            Lead ID: #{lead.id}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center lg:text-right">
                                <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 sm:p-6 rounded-xl">
                                    <p className="text-sm text-gray-600 mb-1">ICP Score</p>
                                    <p className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">{lead.icpScore}</p>
                                    <div className="w-20 sm:w-24 bg-gray-200 rounded-full h-3 mx-auto">
                                        <div className="bg-green-600 h-3 rounded-full" style={{ width: `${lead.icpScore || 0}%` }}></div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">High Quality Lead</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Lead Information Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Personal & Contact Information */}
                        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                                <i className="fas fa-user mr-3 text-blue-600"></i>
                                Lead Information
                            </h3>
                            <div className="space-y-4">
                                <InfoRow label="Lead ID" value={lead.id} icon="fas fa-id-badge" />
                                <InfoRow label="Lead Name" value={lead.name} icon="fas fa-user" />
                                <InfoRow label="Lead Phone" value={lead.phone} icon="fas fa-phone" />
                                <InfoRow label="Lead Email" value={lead.email} icon="fas fa-envelope" />
                                <InfoRow label="Lead Source" value={
                                    <>
                                        {lead.source?.iconClass && (
                                            <i className={lead.source.iconClass + " text-blue-500 mr-1"}></i>
                                        )}
                                        {lead.source?.type}
                                    </>
                                } icon="fab fa-linkedin" />
                                <InfoRow label="Owner" value={lead.owner} icon="fas fa-user-tie" />
                            </div>
                        </div>

                        {/* Company Information */}
                        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                                <i className="fas fa-building mr-3 text-blue-600"></i>
                                Company Information
                            </h3>
                            <div className="space-y-4">
                                <InfoRow label="Company Name" value={lead.company} icon="fas fa-building" />
                                <InfoRow label="Company Email" value={lead.companyEmail} icon="fas fa-envelope" />
                                <InfoRow label="Company Phone" value={lead.companyPhone} icon="fas fa-phone" />
                                <InfoRow label="Industry" value={lead.industry} icon="fas fa-industry" />
                                <InfoRow label="Employees" value={lead.employees} icon="fas fa-users" />
                                <InfoRow label="ICP Score" value={lead.icpScore} icon="fas fa-star" />
                            </div>
                        </div>
                    </div>

                    {/* Revenue & Status Information */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                        {/* Revenue Information */}
                        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                                <i className="fas fa-dollar-sign mr-3 text-green-600"></i>
                                Revenue Information
                            </h3>
                            <div className="space-y-4">
                                <InfoRow label="Projected Revenue" value={lead.projectedRevenue} icon="fas fa-chart-line" />
                                <InfoRow label="Actual Revenue" value={lead.actualRevenue} icon="fas fa-money-bill-wave" />
                            </div>
                        </div>

                        {/* Status & Activity Information */}
                        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                                <i className="fas fa-tasks mr-3 text-purple-600"></i>
                                Status & Activity
                            </h3>
                            <div className="space-y-4">
                                <InfoRow label="Lead Status" value={lead.status} icon="fas fa-flag" />
                                <InfoRow label="Qualification" value={lead.qualification} icon="fas fa-check-circle" />
                                <InfoRow label="Activity ID" value={lead.activityId} icon="fas fa-clipboard-list" />
                                <InfoRow label="Engagement" value={lead.engagement} icon="fas fa-handshake" />
                            </div>
                        </div>
                    </div>

                    {/* Notes Section */}
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 mt-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                            <i className="fas fa-sticky-note mr-3 text-yellow-600"></i>
                            Notes
                        </h3>
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
                            <div className="flex items-start space-x-3">
                                <i className="fas fa-quote-left text-yellow-600 text-lg mt-1"></i>
                                <div className="flex-1">
                                    <p className="text-gray-700 text-lg leading-relaxed">
                                        {lead.notes}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 mt-8 justify-center">
                        <button
                            onClick={handleCall}
                            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium shadow-lg"
                        >
                            <i className="fas fa-phone mr-2"></i>Call Lead
                        </button>
                        <button
                            onClick={handleEmail}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg"
                        >
                            <i className="fas fa-envelope mr-2"></i>Send Email
                        </button>
                        <button
                            onClick={handleScheduleMeeting}
                            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium shadow-lg"
                        >
                            <i className="fas fa-calendar mr-2"></i>Schedule Meeting
                        </button>
                        <button
                            onClick={handleEdit}
                            className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium shadow-lg"
                        >
                            <i className="fas fa-edit mr-2"></i>Edit Lead
                        </button>
                        <button
                            onClick={handleDeleteLead}
                            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium shadow-lg"
                        >
                            <i className="fas fa-trash mr-2"></i>Delete Lead
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper component for info rows
function InfoRow({ label, value, icon }) {
    return (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
                <i className={`${icon} text-blue-600 w-5`}></i>
                <span className="font-medium text-gray-700">{label}</span>
            </div>
            <span className="font-bold text-gray-800">{value}</span>
        </div>
    );
}

