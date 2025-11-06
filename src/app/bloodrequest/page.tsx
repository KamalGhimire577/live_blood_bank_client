"use client";
import { useState } from "react";

export default function BloodRequestForm() {
  const [formData, setFormData] = useState({
    requester_name: "",
    requester_phone: "",
    requester_address: "",
    blood_group: "",
    urgent: false,
  });

  const handleChange = (e:any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();

    // Simple Validation
    if (
      !formData.requester_name.trim() ||
      !formData.requester_phone.match(/^(98|97)\d{8}$/) ||
      !formData.requester_address.trim() ||
      !formData.blood_group
    ) {
      alert("Please fill all fields correctly!");
      return;
    }

    console.log("Form submitted:", formData);
    // TODO: Send to backend API
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f9fcff] py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-red-100 p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Blood Request Form
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Requester Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="requester_name"
              value={formData.requester_name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="w-full rounded-md border border-red-400 bg-white px-3.5 py-2 text-base text-gray-900 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-blue-100 transition-all duration-200 placeholder:text-gray-400 sm:text-sm"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="requester_phone"
              value={formData.requester_phone}
              onChange={handleChange}
              placeholder="98XXXXXXXX"
              pattern="^(98|97)\d{8}$"
              required
              className="w-full rounded-md border border-red-400 bg-white px-3.5 py-2 text-base text-gray-900 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-blue-100 transition-all duration-200 placeholder:text-gray-400 sm:text-sm"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              name="requester_address"
              value={formData.requester_address}
              onChange={handleChange}
              placeholder="Enter your address"
              required
              className="w-full rounded-md border border-red-400 bg-white px-3.5 py-2 text-base text-gray-900 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-blue-100 transition-all duration-200 placeholder:text-gray-400 sm:text-sm"
            />
          </div>

          {/* Blood Group */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Blood Group
            </label>
            <select
              name="blood_group"
              value={formData.blood_group}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-red-400 bg-white px-3.5 py-2 text-base text-gray-900 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-blue-100 transition-all duration-200 sm:text-sm"
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          {/* Urgent Checkbox */}
          <div className="flex items-center">
            <input
              id="urgent"
              name="urgent"
              type="checkbox"
              checked={formData.urgent}
              onChange={handleChange}
              className="h-4 w-4 text-red-500 focus:ring-blue-400 border-gray-300 rounded"
            />
            <label
              htmlFor="urgent"
              className="ml-2 block text-sm text-gray-700 font-medium"
            >
              Mark as Urgent Request
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-linear-to-r from-red-500 to-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-md hover:from-blue-600 hover:to-red-600 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-500 transition-all"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}
