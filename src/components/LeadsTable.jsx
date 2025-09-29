import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import DeleteConfirmationModal from "../pages/Delete_Lead"; // ✅ Import DeleteConfirmationModal

const LeadsTable = () => {
  const [leads, setLeads] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const navigate = useNavigate(); // ✅ Initialize navigate

  // ✅ Load saved leads from localStorage when component mounts
  useEffect(() => {
    const savedLeads = JSON.parse(localStorage.getItem("leads")) || [];
    setLeads(savedLeads);
  }, []);

  // ✅ Open delete modal function
  const handleDeleteClick = (lead) => {
    setSelectedLead(lead);
    setShowDeleteModal(true);
  };

  // ✅ Close delete modal function
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedLead(null);
  };

  // ✅ Confirm delete function
  const handleConfirmDelete = (leadId) => {
    const updatedLeads = leads.filter((lead) => lead.id !== leadId);
    setLeads(updatedLeads);
    localStorage.setItem("leads", JSON.stringify(updatedLeads)); // update storage
    setShowDeleteModal(false);
    setSelectedLead(null);
  };

  // ✅ Badge generator
  const getBadge = (value, type) => {
    const colors = {
      status: {
        Approved: "bg-green-500 text-white",
        Pending: "bg-yellow-400 text-black",
        Rejected: "bg-red-500 text-white",
        Contact: "bg-blue-500 text-white",
      },
      qualification: {
        Qualified: "bg-green-500 text-white",
        "In Progress": "bg-yellow-400 text-black",
        "Hot Lead": "bg-green-600 text-white",
        Unqualified: "bg-red-500 text-white",
        "Warm Lead": "bg-blue-400 text-white",
      },
    };

    const cls = colors[type]?.[value] || "bg-gray-300 text-black";
    return (
      <span className={`px-2 py-1 text-xs rounded font-medium ${cls}`}>
        {value}
      </span>
    );
  };

  // ✅ Search filter
  const filteredLeads = leads.filter(
    (lead) =>
      lead.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          Lead Management Table
        </h2>
        <div className="flex gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-64 border rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={16} />
          </div>
          <button
            onClick={() => navigate("/add_lead")} // ✅ Redirect to /add_lead
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow cursor-pointer"
          >
            <Plus className="mr-8" size={16} />
            Add New Lead
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Lead ID",
                "Lead Name",
                "Lead Phone",
                "Lead Email",
                "Company Name",
                "Company Email",
                "Company Phone",
                "Lead Source",
                "Industry",
                "ICP Score",
                "Owner",
                "Notes",
                "Lead Status",
                "Projected Revenue",
                "Actual Revenue",
                "Employees",
                "Qualification",
                "Activity ID",
                "Engagement",
                "Actions",
              ].map((col) => (
                <th
                  key={col}
                  className="text-left py-3 px-4 text-xs font-semibold text-gray-700"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredLeads.length > 0 ? (
              filteredLeads.map((lead, idx) => (
                <tr
                  key={lead.id}
                  className={`${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100`}
                >
                  <td className="py-3 px-4 text-blue-600 font-medium">
                    {lead.id}
                  </td>
                  <td className="py-3 px-4 flex items-center gap-2">
                    {lead.avatar && (
                      <img
                        src={lead.avatar}
                        alt={lead.name}
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <span
                      className="cursor-pointer text-blue-700 hover:underline"
                      onClick={() => navigate(`/lead_detail/${lead.id}`)}
                    >
                      {lead.name}
                    </span>
                  </td>
                  <td className="py-3 px-4">{lead.phone}</td>
                  <td className="py-3 px-4 text-blue-600">{lead.email}</td>
                  <td className="py-3 px-4">{lead.company}</td>
                  <td className="py-3 px-4">{lead.companyEmail}</td>
                  <td className="py-3 px-4">{lead.companyPhone}</td>
                  <td className="py-3 px-4 flex items-center gap-1">
                    {lead.source?.iconClass && (
                      <i
                        className={lead.source.iconClass + " text-blue-500 mr-1"}
                      ></i>
                    )}
                    {lead.source?.type}
                  </td>
                  <td className="py-3 px-4">{lead.industry}</td>
                  <td className="py-3 px-4">{lead.icpScore}</td>
                  <td className="py-3 px-4">{lead.owner}</td>
                  <td className="py-3 px-4">{lead.notes}</td>
                  <td className="py-3 px-4">
                    {getBadge(lead.status, "status")}
                  </td>
                  <td className="py-3 px-4">{lead.projectedRevenue}</td>
                  <td className="py-3 px-4">{lead.actualRevenue}</td>
                  <td className="py-3 px-4">{lead.employees}</td>
                  <td className="py-3 px-4">
                    {getBadge(lead.qualification, "qualification")}
                  </td>
                  <td className="py-3 px-4">{lead.activityId}</td>
                  <td className="py-3 px-4">{lead.engagement}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                        onClick={() => navigate(`/lead_detail/${lead.id}`)}
                      >
                        <Eye size={14} />
                      </button>
                      <button 
                        className="p-2 bg-yellow-400 text-black rounded hover:bg-yellow-500"
                        onClick={() => navigate(`/edit_lead/${lead.id}`)}
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(lead)}
                        className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="20"
                  className="text-center py-6 text-gray-500 italic"
                >
                  No leads found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination (static for now) */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing 1 to {filteredLeads.length} of {leads.length} results
        </p>
        <div className="flex items-center gap-2">
          <button className="p-2 border rounded hover:bg-gray-100">
            <ChevronLeft size={16} />
          </button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
          <button className="px-3 py-1 border rounded hover:bg-gray-100">2</button>
          <button className="px-3 py-1 border rounded hover:bg-gray-100">3</button>
          <span className="px-2 text-gray-400">...</span>
          <button className="px-3 py-1 border rounded hover:bg-gray-100">25</button>
          <button className="p-2 border rounded hover:bg-gray-100">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedLead && (
        <DeleteConfirmationModal
          lead={selectedLead}
          onClose={handleCloseDeleteModal}
          onConfirmDelete={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default LeadsTable;
