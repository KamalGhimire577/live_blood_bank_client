"use client";
import { useState } from "react";

export default function DonorForm() {
  const [formData, setFormData] = useState({
    user_id: "",
    address: "",
    bloodgroup: "",
    dob: "",
    last_donation_date: "",
    next_eligible_date: "",
    confirmEligibility: false,
  });

  const [ageError, setAgeError] = useState("");

  const handleChange = (e:any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Age validation on DOB
    if (name === "dob") {
      const dobDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - dobDate.getFullYear();
      const monthDiff = today.getMonth() - dobDate.getMonth();

      if (age < 18 || (age === 18 && monthDiff < 0)) {
        setAgeError("You must be at least 18 years old to donate blood.");
      } else {
        setAgeError("");
      }
    }
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();

    if (ageError) {
      alert("Please ensure donor is at least 18 years old.");
      return;
    }

    if (!formData.confirmEligibility) {
      alert("Please confirm that you meet the age requirement.");
      return;
    }

    console.log("Donor Form Submitted:", formData);
    // TODO: Send form data to backend
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f9fcff] py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-red-100 p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          🩸 Donor Registration
        </h2>

        <form className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              className="w-full rounded-md border border-red-400 bg-white px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full rounded-md border border-red-400 bg-white px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              placeholder="Enter your email"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              className="w-full rounded-md border border-red-400 bg-white px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              placeholder="98XXXXXXXX"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              className="w-full rounded-md border border-red-400 bg-white px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              placeholder="Enter your address"
            />
          </div>

          {/* Blood Group */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Blood Group
            </label>
            <select className="w-full rounded-md border border-red-400 px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-blue-400">
              <option>Select blood group</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              className="w-full rounded-md border border-red-400 bg-white px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
            <p className="text-sm text-gray-500 mt-1">
              Donor must be at least 18 years old.
            </p>
          </div>

          {/* Last Donation Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Donation Date (optional)
            </label>
            <input
              type="date"
              className="w-full rounded-md border border-red-400 bg-white px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
          </div>

          {/* 18+ Confirmation */}
          <div className="flex items-start gap-2 mt-3">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 text-red-500 border-gray-300 rounded focus:ring-blue-400"
            />
            <label className="text-sm text-gray-700 leading-tight">
              I confirm that I am at least 18 years old and eligible to
              donate blood.
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            className="w-full rounded-md bg-linear-to-r from-red-500 to-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-md hover:from-blue-600 hover:to-red-600 transition-all"
          >
            Register as Donor
          </button>
        </form>
      </div>
    </div>
  );
}
