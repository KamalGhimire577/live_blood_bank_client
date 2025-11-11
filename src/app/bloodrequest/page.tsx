"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBloodRequest } from "@/lib/store/bloodrequest/bloodrequestSlice";
import { IBloodRequestData } from "@/lib/store/bloodrequest/bloodrequestSlice.types";
import { AppDispatch } from "@/lib/store/store";
import { Status } from "@/lib/types/type"; // optional if you track loading states

export default function BloodRequestForm() {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState<IBloodRequestData>({
    donor_id: "",
    requestor_id: "",
    requester_name: "",
    requester_phone: "",
    requester_address: "",
    urgent: false,
    blood_group: "",
    status: "",
  });

  const [status, setStatus] = useState(Status.IDLE);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(Status.LOADING);
    try {
      await dispatch(addBloodRequest(formData));
      setStatus(Status.SUCCESS);
    } catch {
      setStatus(Status.ERROR);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-rose-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center text-rose-600 mb-6">
          🩸 Blood Request Form
        </h2>

        {/* Requester Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Requester Name
          </label>
          <input
            type="text"
            value={formData.requester_name}
            onChange={(e) =>
              setFormData({ ...formData, requester_name: e.target.value })
            }
            placeholder="Enter your full name"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="text"
            value={formData.requester_phone}
            onChange={(e) =>
              setFormData({ ...formData, requester_phone: e.target.value })
            }
            placeholder="98XXXXXXXX"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
            required
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            value={formData.requester_address}
            onChange={(e) =>
              setFormData({ ...formData, requester_address: e.target.value })
            }
            placeholder="Enter your address"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
            required
          />
        </div>

        {/* Blood Group */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Blood Group
          </label>
          <select
            value={formData.blood_group}
            onChange={(e) =>
              setFormData({ ...formData, blood_group: e.target.value })
            }
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
            required
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>

        {/* Urgent Checkbox */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.urgent}
            onChange={(e) =>
              setFormData({ ...formData, urgent: e.target.checked })
            }
            className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
          />
          <label className="text-sm text-gray-700">Mark as Urgent</label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === Status.LOADING}
          className={`w-full rounded-md bg-gradient-to-r from-red-600 to-rose-500 px-4 py-2.5 text-white font-semibold transition-all duration-200 ${
            status === Status.LOADING
              ? "opacity-60 cursor-not-allowed"
              : "hover:from-rose-500 hover:to-red-600"
          }`}
        >
          {status === Status.LOADING ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
}
