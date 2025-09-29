"use client"

import { useState } from "react"

export default function CRMDashboard() {
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    const leads = [
        {
            id: "#L001",
            name: "Michael Johnson",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
            company: "TechCorp Inc.",
            status: "Approved",
            statusColor: "bg-green-500",
            engagementId: "#E001",
            stage: "Negotiation",
            stageColor: "bg-blue-500",
            partnershipNeeds: "Enterprise Solution, API Integration",
            sharedDocs: { icon: "fas fa-file-pdf", name: "Proposal.pdf", color: "text-red-500" },
            signedDocs: "2/3 Signed",
            signedColor: "bg-green-500",
            partnershipType: "Strategic",
            partnershipColor: "bg-orange-600",
            candidateId: "#C001",
            milestones: "Phase 2",
            milestoneColor: "bg-slate-600",
            demoStatus: "Completed",
            demoColor: "bg-purple-600",
            collaborationNotes: "Weekly sync meetings scheduled",
            objections: "Budget approval pending",
        },
        {
            id: "#L002",
            name: "Sarah Williams",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
            company: "Digital Solutions",
            status: "Pending",
            statusColor: "bg-yellow-500",
            engagementId: "#E002",
            stage: "Discovery",
            stageColor: "bg-yellow-500",
            partnershipNeeds: "Marketing Automation, Analytics",
            sharedDocs: { icon: "fas fa-file-word", name: "Requirements.docx", color: "text-blue-500" },
            signedDocs: "0/2 Signed",
            signedColor: "bg-yellow-500",
            partnershipType: "Vendor",
            partnershipColor: "bg-yellow-500",
            candidateId: "#C002",
            milestones: "Phase 1",
            milestoneColor: "bg-slate-600",
            demoStatus: "Scheduled",
            demoColor: "bg-yellow-500",
            collaborationNotes: "Initial requirements gathering",
            objections: "Timeline concerns raised",
        },
        {
            id: "#L003",
            name: "David Chen",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
            company: "Innovation Labs",
            status: "Contact",
            statusColor: "bg-blue-500",
            engagementId: "#E003",
            stage: "Proposal",
            stageColor: "bg-green-500",
            partnershipNeeds: "Healthcare Platform, Compliance",
            sharedDocs: { icon: "fas fa-file-powerpoint", name: "Demo.pptx", color: "text-orange-500" },
            signedDocs: "3/3 Signed",
            signedColor: "bg-green-500",
            partnershipType: "Technology",
            partnershipColor: "bg-orange-600",
            candidateId: "#C003",
            milestones: "Phase 3",
            milestoneColor: "bg-slate-600",
            demoStatus: "Completed",
            demoColor: "bg-purple-600",
            collaborationNotes: "Technical integration planning",
            objections: "Security requirements clarified",
        },
        {
            id: "#L004",
            name: "Emma Thompson",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
            company: "Global Enterprises",
            status: "Rejected",
            statusColor: "bg-red-500",
            engagementId: "#E004",
            stage: "Closed",
            stageColor: "bg-red-500",
            partnershipNeeds: "Financial Services, Reporting",
            sharedDocs: { icon: "fas fa-file-excel", name: "Budget.xlsx", color: "text-green-500" },
            signedDocs: "0/1 Signed",
            signedColor: "bg-red-500",
            partnershipType: "None",
            partnershipColor: "bg-red-500",
            candidateId: "#C004",
            milestones: "Cancelled",
            milestoneColor: "bg-red-500",
            demoStatus: "Cancelled",
            demoColor: "bg-red-500",
            collaborationNotes: "Budget constraints identified",
            objections: "Cost too high for current budget",
        },
        {
            id: "#L005",
            name: "Robert Taylor",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face",
            company: "StartupHub",
            status: "Pending",
            statusColor: "bg-yellow-500",
            engagementId: "#E005",
            stage: "Evaluation",
            stageColor: "bg-yellow-500",
            partnershipNeeds: "SaaS Platform, Scalability",
            sharedDocs: { icon: "fas fa-file-alt", name: "Specs.txt", color: "text-gray-500" },
            signedDocs: "1/2 Signed",
            signedColor: "bg-yellow-500",
            partnershipType: "Channel",
            partnershipColor: "bg-yellow-500",
            candidateId: "#C005",
            milestones: "Phase 1",
            milestoneColor: "bg-slate-600",
            demoStatus: "In Progress",
            demoColor: "bg-yellow-500",
            collaborationNotes: "Product evaluation ongoing",
            objections: "Feature customization discussed",
        },
    ]

    const filteredLeads = leads.filter(
        (lead) =>
            lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.company.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main Content */}
            <div className="p-4 lg:p-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-xl p-6 mb-6 shadow-lg">
                        <h1 className="text-3xl font-bold text-white">Lead Management Dashboard</h1>
                        <p className="text-blue-100 mt-2">Track and manage your sales leads efficiently</p>
                    </div>
                </div>

                {/* Main Data Table Section */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                    <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            <h2 className="text-2xl font-bold text-gray-800">Lead Management & Engagement Details</h2>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search leads..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent w-full sm:w-64 text-gray-600"
                                    />
                                    <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                                </div>
                                <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg transition-colors duration-200 font-medium shadow-lg">
                                    <i className="fas fa-plus mr-2"></i>Add New Lead
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-left py-4 px-4 font-semibold text-gray-800 text-sm">Lead ID</th>
                                    <th className="text-left py-4 px-4 font-semibold text-gray-800 text-sm">Lead Name</th>
                                    <th className="text-left py-4 px-4 font-semibold text-gray-800 text-sm">Company Name</th>
                                    <th className="text-left py-4 px-4 font-semibold text-gray-800 text-sm">Lead Status</th>
                                    <th className="text-left py-4 px-4 font-semibold text-gray-800 text-sm">Engagement ID</th>
                                    <th className="text-left py-4 px-4 font-semibold text-gray-800 text-sm">Stage</th>
                                    <th className="text-left py-4 px-4 font-semibold text-gray-800 text-sm">Partnership Needs</th>
                                    <th className="text-left py-4 px-4 font-semibold text-gray-800 text-sm">Shared Documents</th>
                                    <th className="text-left py-4 px-4 font-semibold text-gray-800 text-sm">Signed Docs</th>
                                    <th className="text-left py-4 px-4 font-semibold text-gray-800 text-sm">Partnership Type</th>
                                    <th className="text-left py-4 px-4 font-semibold text-gray-800 text-sm">Candidate ID</th>
                                    <th className="text-left py-4 px-4 font-semibold text-gray-800 text-sm">Milestones</th>
                                    <th className="text-left py-4 px-4 font-semibold text-gray-800 text-sm">Demo Status</th>
                                    <th className="text-left py-4 px-4 font-semibold text-gray-800 text-sm">Collaboration Notes</th>
                                    <th className="text-left py-4 px-4 font-semibold text-gray-800 text-sm">
                                        Objections & Clarifications
                                    </th>
                                    <th className="text-left py-4 px-4 font-semibold text-gray-800 text-sm">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLeads.map((lead, index) => (
                                    <tr
                                        key={lead.id}
                                        className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition-colors duration-200`}
                                    >
                                        <td className="py-4 px-4 text-sm font-medium text-blue-700">{lead.id}</td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center space-x-3">
                                                <img
                                                    src={lead.avatar || "/placeholder.svg"}
                                                    alt="Lead"
                                                    className="w-8 h-8 rounded-full border border-gray-300"
                                                />
                                                <span className="font-medium text-gray-800 text-sm">{lead.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-sm text-gray-800">{lead.company}</td>
                                        <td className="py-4 px-4">
                                            <span className={`${lead.statusColor} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                                                {lead.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-sm font-medium text-blue-700">{lead.engagementId}</td>
                                        <td className="py-4 px-4">
                                            <span className={`${lead.stageColor} text-white px-2 py-1 rounded-full text-xs font-medium`}>
                                                {lead.stage}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-sm text-gray-600">{lead.partnershipNeeds}</td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center space-x-2">
                                                <i className={`${lead.sharedDocs.icon} ${lead.sharedDocs.color}`}></i>
                                                <span className="text-sm text-gray-600">{lead.sharedDocs.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`${lead.signedColor} text-white px-2 py-1 rounded-full text-xs font-medium`}>
                                                {lead.signedDocs}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span
                                                className={`${lead.partnershipColor} text-white px-2 py-1 rounded-full text-xs font-medium`}
                                            >
                                                {lead.partnershipType}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-sm font-medium text-blue-700">{lead.candidateId}</td>
                                        <td className="py-4 px-4">
                                            <span className={`${lead.milestoneColor} text-white px-2 py-1 rounded-full text-xs font-medium`}>
                                                {lead.milestones}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`${lead.demoColor} text-white px-2 py-1 rounded-full text-xs font-medium`}>
                                                {lead.demoStatus}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-sm text-gray-600">{lead.collaborationNotes}</td>
                                        <td className="py-4 px-4 text-sm text-gray-600">{lead.objections}</td>
                                        <td className="py-4 px-4">
                                            <div className="flex space-x-2">
                                                <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors">
                                                    <i className="fas fa-eye text-xs"></i>
                                                </button>
                                                <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-800 p-2 rounded-lg transition-colors">
                                                    <i className="fas fa-edit text-xs"></i>
                                                </button>
                                                <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors">
                                                    <i className="fas fa-trash text-xs"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

