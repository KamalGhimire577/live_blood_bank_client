"use client";
import { useState } from "react";

export default function Page() {
  const [activeSection, setActiveSection] = useState("dashboard");

  const adminName:string = "Admin";

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 font-bold text-red-600 text-2xl border-b border-gray-200">
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
              className={`block w-full text-left py-3 px-6 text-gray-700 hover:bg-red-100 transition-all ${
                activeSection === item.key
                  ? "bg-red-500 text-white font-semibold"
                  : ""
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button className="w-full bg-red-500 text-red py-2 rounded-md hover:bg-red-600 transition-all">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Top Navbar */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-xl font-bold text-red-600 capitalize">
            {activeSection.replace(/([A-Z])/g, " $1")}
          </h1>

          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
              {adminName[0]}
            </div>
          </div>
        </header>

        {/* Section Content */}
        <main className="p-6 space-y-6">
          {activeSection === "dashboard" && <DashboardSection />}
          {activeSection === "users" && <UsersSection />}
          {activeSection === "donors" && <DonorsSection />}
          {activeSection === "requests" && <RequestsSection />}
          {activeSection === "donations" && <DonationsSection />}
          {activeSection === "settings" && <SettingsSection />}
        </main>
      </div>
    </div>
  );
}

/* ------------------- SECTIONS ------------------- */

function DashboardSection() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Users" value="134" />
        <StatCard title="Active Donors" value="45" />
        <StatCard title="Pending Requests" value="12" />
      </div>
    </div>
  );
}

function UsersSection() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Users</h2>
      <p className="text-gray-600">Display all registered users here.</p>
    </div>
  );
}

function DonorsSection() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Donors</h2>
      <p className="text-gray-600">List of blood donors and their info.</p>
    </div>
  );
}

function RequestsSection() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Blood Requests
      </h2>
      <p className="text-gray-600">Pending and approved blood requests.</p>
    </div>
  );
}

function DonationsSection() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Donations</h2>
      <p className="text-gray-600">Record of all successful blood donations.</p>
    </div>
  );
}

function SettingsSection() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Settings</h2>
      <p className="text-gray-600">
        Manage admin profile or system preferences.
      </p>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 text-center border-t-4 border-red-500">
      <h3 className="text-lg font-medium text-gray-700">{title}</h3>
      <p className="text-3xl font-bold text-red-600 mt-2">{value}</p>
    </div>
  );
}
