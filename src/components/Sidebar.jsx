import React, { useState } from "react";
import {
  BarChart3,
  Users,
  Handshake,
  Folder,
  CheckSquare,
  Plus,
  FileText,
  Settings,
  Trophy,
  Crown,
  LogOut,
  Menu,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

export default function Sidebar() {
  const [leadsOpen, setLeadsOpen] = useState(false);
  const [active, setActive] = useState("dashboard");

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-3 left-3 z-50">
        <button className="p-2 bg-blue-900 rounded-lg hover:bg-blue-800 cursor-pointer">
          <Menu className="h-5 w-5 text-white" />
        </button>
      </div>

      {/* Sidebar */}
      <div className="bg-gradient-to-b from-blue-800 to-blue-900 text-white w-72 min-h-screen p-4 hidden lg:flex flex-col shadow-xl border-r border-blue-700">
        {/* Logo Section */}
        <div className="text-center mb-4">
          <h1 className="text-lg font-bold leading-tight">CRM Dashboard</h1>
          <p className="text-blue-100 text-xs">Lead Management</p>
        </div>

        {/* User Profile */}
        <div className="bg-blue-950/40 rounded-xl p-4 border border-blue-600 shadow mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="/professional-male-executive.jpg"
                alt="User"
                className="w-12 h-12 rounded-full border-2 border-blue-400"
              />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-100">Alex Johnson</p>
              <p className="text-xs text-blue-200 flex items-center">
                <Crown className="text-yellow-400 mr-1" size={12} />
                Sales Manager
              </p>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-blue-600 flex justify-between text-xs">
            <div className="flex-1 text-center">
              <p className="text-blue-200">Today</p>
              <p className="text-white font-bold">24</p>
            </div>
            <div className="flex-1 text-center">
              <p className="text-blue-200">Month</p>
              <p className="text-white font-bold">847</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <p className="text-blue-200 text-[11px] font-semibold uppercase mb-2 px-2">
            Main Menu
          </p>

          {/* Dashboard */}
          <button
            className={`flex items-center w-full px-4 py-3 rounded-lg shadow transition mb-2 cursor-pointer
              ${active === "dashboard"
                ? "bg-gradient-to-r from-blue-600 to-blue-400"
                : "bg-white/10 hover:bg-blue-700"}
            `}
            onClick={() => setActive("dashboard")}
          >
            <div className="bg-white/20 p-1.5 rounded mr-3">
              <BarChart3 className="text-white" size={16} />
            </div>
            <span className="text-sm font-semibold">Dashboard</span>
          </button>

          {/* Leads with dropdown */}
          <div>
            <button
              className={`flex items-center w-full px-4 py-3 rounded-lg shadow transition mb-2 cursor-pointer
                ${active.startsWith("leads") ||
                active === "engagement" ||
                active === "resources" ||
                active === "activity"
                  ? "bg-gradient-to-r from-blue-600 to-blue-400"
                  : "bg-white/10 hover:bg-blue-700"}
              `}
              onClick={() => {
                setLeadsOpen((prev) => !prev);
                setActive("leads");
              }}
            >
              <div className="bg-white p-1.5 rounded mr-3">
                <Users className="text-blue-600" size={16} />
              </div>
              <span className="text-sm font-semibold flex-1 text-left">
                Leads
              </span>
              {leadsOpen ? (
                <ChevronDown size={14} className="text-blue-200" />
              ) : (
                <ChevronRight size={14} className="text-blue-200" />
              )}
            </button>

            {/* Dropdown submenu */}
            <div
              className={`ml-5 mt-2 space-y-2 border-l border-blue-500 pl-3 overflow-hidden transition-all duration-300 ${
                leadsOpen ? "max-h-60" : "max-h-0"
              }`}
            >
              <button
                className={`flex items-center w-full px-3 py-3 rounded-lg text-xs cursor-pointer
                  ${active === "leads-overview"
                    ? "bg-gradient-to-r from-blue-600 to-blue-400"
                    : "bg-blue-600 hover:bg-blue-500"}
                `}
                onClick={() => setActive("leads-overview")}
              >
                <Users className="mr-2" size={12} /> Leads Overview
              </button>
              <button
                className={`flex items-center w-full px-3 py-3 rounded-lg text-xs cursor-pointer
                  ${active === "engagement"
                    ? "bg-gradient-to-r from-blue-600 to-blue-400"
                    : "bg-blue-600 hover:bg-blue-500"}
                `}
                onClick={() => setActive("engagement")}
              >
                <Handshake className="mr-2" size={12} /> Engagement
              </button>
              <button
                className={`flex items-center w-full px-3 py-3 rounded-lg text-xs cursor-pointer
                  ${active === "resources"
                    ? "bg-gradient-to-r from-blue-600 to-blue-400"
                    : "bg-blue-600 hover:bg-blue-500"}
                `}
                onClick={() => setActive("resources")}
              >
                <Folder className="mr-2" size={12} /> Resources
              </button>
              <button
                className={`flex items-center w-full px-3 py-3 rounded-lg text-xs cursor-pointer
                  ${active === "activity"
                    ? "bg-gradient-to-r from-blue-600 to-blue-400"
                    : "bg-blue-600 hover:bg-blue-500"}
                `}
                onClick={() => setActive("activity")}
              >
                <CheckSquare className="mr-2" size={12} /> Activity
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <p className="text-blue-200 text-[11px] font-semibold uppercase mt-4 mb-2 px-2">
            Quick Actions
          </p>
          <div className="flex flex-col gap-1">
            <button
              className={`flex items-center w-full px-4 py-2.5 rounded-lg text-sm transition cursor-pointer
                ${active === "add-lead"
                  ? "bg-gradient-to-r from-blue-600 to-blue-400"
                  : "hover:bg-blue-700"}
              `}
              onClick={() => setActive("add-lead")}
            >
              <div className="bg-blue-600 p-1.5 rounded mr-3">
                <Plus className="text-white" size={12} />
              </div>
              Add New Lead
            </button>
            <button
              className={`flex items-center w-full px-4 py-2.5 rounded-lg text-sm transition cursor-pointer
                ${active === "generate-report"
                  ? "bg-gradient-to-r from-blue-600 to-blue-400"
                  : "hover:bg-blue-700"}
              `}
              onClick={() => setActive("generate-report")}
            >
              <FileText className="mr-3" size={12} /> Generate Report
            </button>
            <button
              className={`flex items-center w-full px-4 py-2.5 rounded-lg text-sm transition cursor-pointer
                ${active === "settings"
                  ? "bg-gradient-to-r from-blue-600 to-blue-400"
                  : "hover:bg-blue-700"}
              `}
              onClick={() => setActive("settings")}
            >
              <Settings className="mr-3" size={12} /> Settings
            </button>
          </div>
        </nav>

        {/* Performance */}
        <div className="bg-blue-950/40 rounded-lg p-3 border border-blue-600 mb-4">
          <h3 className="font-semibold mb-2 flex items-center text-sm">
            <Trophy className="text-yellow-400 mr-2" size={14} />
            Performance
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-blue-200">Conversion</span>
              <span className="text-white font-bold">68%</span>
            </div>
            <div className="w-full bg-blue-900 rounded-full h-1.5">
              <div className="h-1.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full w-[68%]"></div>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-blue-200">Monthly Target</span>
              <span className="text-white font-bold">85%</span>
            </div>
            <div className="w-full bg-blue-900 rounded-full h-1.5">
              <div className="h-1.5 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full w-[85%]"></div>
            </div>
          </div>
        </div>

        {/* Logout */}
        <button className="flex items-center w-full px-4 py-2.5 rounded-lg hover:bg-red-600 text-sm cursor-pointer">
          <LogOut className="mr-2" size={14} /> Logout
        </button>
      </div>
    </>
  );
}
