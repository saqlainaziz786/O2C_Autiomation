// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";   // ⬅️ Yahin import karo
import LeadsOverview from "./pages/LeadsOverview";
import LeadCreationForm from "./pages/LeadCreationForm";
import LeadDetails from "./pages/Lead_Details";
import Engagement from "./components/Engagement";
import EditLeadForm from "./pages/Edit_Lead";

const App = () => {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar har page pe fix hoga */}
        <Sidebar />

        {/* Page content area */}
        <div className="flex-1 overflow-y-auto p-5">
          <Routes>
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/leads_overview" replace />} />

            {/* Pages */}
            <Route path="/leads_overview" element={<LeadsOverview />} />
            <Route path="/add_lead" element={<LeadCreationForm />} />
            <Route path="/lead_detail/:id" element={<LeadDetails />} />
            <Route path="/edit_lead/:id" element={<EditLeadForm />} />
            <Route path="/engagement" element={<Engagement />} />

            {/* 404 fallback */}
            <Route
              path="*"
              element={<h1 className="text-center text-red-500 mt-10">404 - Page Not Found</h1>}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
