import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatsCards from "../components/StatsCards";
import LeadsTable from "../components/LeadsTable";

const LeadsOverview = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="px-5 py-5">
          <Header />
        </div>

        {/* Stats Section */}
        <div className="px-5 pb-5">
          <StatsCards />
        </div>

        {/* Leads Table Section */}
        <div className="px-5 pb-5">
          <LeadsTable />
        </div>
      </div>
    </div>
  );
};

export default LeadsOverview;
