"use client";
import { useState } from "react";

export default function Page() {
  const [activeSection, setActiveSection] = useState("profile");
  const donorName: string = "John Doe";

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 font-bold text-red-600 text-2xl border-b border-gray-200">
          LiveBlood Donor
        </div>

        <div className="p-4 text-gray-600 text-sm border-b border-gray-100">
          Logged in as:
          <span className="block text-gray-900 font-semibold">{donorName}</span>
        </div>

        <nav className="mt-4 flex-1">
          {[
            { name: "Profile", key: "profile" },
            { name: "Booking Requests", key: "requests" },
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
          <button className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-all">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Top Navbar */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-xl font-bold text-red-600 capitalize">
            {activeSection === "profile" ? "My Profile" : "Booking Requests"}
          </h1>

          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
              {donorName[0]}
            </div>
          </div>
        </header>

        {/* Section Content */}
        <main className="p-6 space-y-6">
          {activeSection === "profile" && <ProfileSection />}
          {activeSection === "requests" && <BookingRequestSection />}
        </main>
      </div>
    </div>
  );
}

/* ------------------- SECTIONS ------------------- */

function ProfileSection() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Donor Profile
      </h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-600">Full Name</p>
            <p className="font-semibold text-gray-900">John Doe</p>
          </div>
          <div>
            <p className="text-gray-600">Blood Group</p>
            <p className="font-semibold text-gray-900">O+</p>
          </div>
          <div>
            <p className="text-gray-600">Date of Birth</p>
            <p className="font-semibold text-gray-900">2000-02-14</p>
          </div>
          <div>
            <p className="text-gray-600">Last Donation</p>
            <p className="font-semibold text-gray-900">2024-12-10</p>
          </div>
          <div>
            <p className="text-gray-600">Next Eligible Date</p>
            <p className="font-semibold text-gray-900">2025-03-10</p>
          </div>
        </div>

        <button className="mt-6 px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all">
          Edit Profile
        </button>
      </div>
    </div>
  );
}

function BookingRequestSection() {
  const requests = [
    {
      id: 1,
      patient: "Kedar Ghimire",
      bloodGroup: "A+",
      status: "Pending",
      date: "2025-11-10",
    },
    {
      id: 2,
      patient: "Sita Sharma",
      bloodGroup: "O-",
      status: "Approved",
      date: "2025-11-08",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Booking Requests
      </h2>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-red-500 text-white">
            <tr>
              <th className="py-3 px-4">Patient Name</th>
              <th className="py-3 px-4">Blood Group</th>
              <th className="py-3 px-4">Request Date</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr
                key={req.id}
                className="border-b hover:bg-gray-50 transition-all"
              >
                <td className="py-3 px-4">{req.patient}</td>
                <td className="py-3 px-4">{req.bloodGroup}</td>
                <td className="py-3 px-4">{req.date}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      req.status === "Approved"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
