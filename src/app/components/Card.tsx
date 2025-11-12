"use client";
import Image from "next/image";
import Link from "next/link";

export default function DonorCard() {
  return (
    <div className="flex justify-center items-center bg-[#f9fcff] py-12">
      <div className="max-w-sm w-full bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-red-100">
        {/* Header Image */}
        <div className="relative w-full h-48 bg-linear-to-r from-red-500 to-blue-500 rounded-t-2xl flex items-center justify-center">
          <Image
            src="/donor.jpeg"
            alt="Donor Image"
            width={100}
            height={100}
            className="rounded-full border-4 border-white shadow-md object-cover"
          />
        </div>

        {/* Donor Info */}
        <div className="p-6 text-center">
          <h2 className="text-xl font-bold text-gray-900">Kedar Ghimire</h2>
          <p className="text-sm text-gray-600">Kathmandu, Nepal</p>

          {/* Blood Group */}
          <div className="mt-4 flex justify-center">
            <span className="text-lg font-semibold bg-linear-to-r from-red-500 to-blue-500 text-white px-4 py-1 rounded-full shadow-md">
              Blood Group: <span className="font-bold ml-1">A+</span>
            </span>
          </div>

          {/* Contact Info */}
          <div className="mt-4 text-gray-700 space-y-1">
            <p>
              <span className="font-semibold">📞 Contact:</span> +977 9800000000
            </p>
            <p>
              <span className="font-semibold">📍 Address:</span> Baneshwor, KTM
            </p>
          </div>

          {/* Divider */}
          <div className="my-5 border-t border-gray-200"></div>

          {/* Make Request Button */}
          <Link
            href="/bloodrequest"
            className="inline-block w-full rounded-lg bg-linear-to-r from-red-500 to-blue-500 text-white font-semibold py-2.5 hover:from-blue-600 hover:to-red-600 transition-all shadow-md"
          >
            Make Request
          </Link>
        </div>
      </div>
    </div>
  );
}
