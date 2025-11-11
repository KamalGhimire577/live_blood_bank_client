"use client";
import { useState } from "react";

export default function Page() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const adminName = "Admin";

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 font-bold text-red-600 text-2xl border-b">
          LiveBlood Admin
        </div>
        
        <div className="p-4 text-gray-600 text-sm border-b border-gray-100">
          Logged in as:
          <span className="block text-gray-900 font-semibold">{adminName}</span>
        </div>
        
        <nav className="mt-4 flex-1">
          {[
            { name: "Dashboard", key: "dashboard" },
            { name: "Users", key: "users" },
            { name: "Donors", key: "donors" },
            { name: "Blood Requests", key: "requests" },
            { name: "Donations List", key: "donations" },
            { name: "Settings", key: "settings" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              className={`block w-full text-left py-3 px-6 text-gray-700 hover:bg-red-100 ${
                activeSection === item.key ? "bg-red-500 text-white" : ""
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <button className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-all">
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-red-600 mb-6 capitalize">
          {activeSection}
        </h1>
        
        {activeSection === "dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-700">Total Users</h3>
              <p className="text-3xl font-bold text-red-600 mt-2">134</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-700">Active Donors</h3>
              <p className="text-3xl font-bold text-red-600 mt-2">45</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-700">Pending Requests</h3>
              <p className="text-3xl font-bold text-red-600 mt-2">12</p>
            </div>
          </div>
        )}
        
        {activeSection !== "dashboard" && (
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600">{activeSection} section content goes here.</p>
          </div>
        )}
      </div>
    </div>
  );
}