"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SignUp() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup:", formData);
    // TODO: Add API call here
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center">
            <Image
              src="/logo.png"
              alt="App Logo"
              width={80}
              height={80}
              className="mx-auto"
            />
            <h2 className="mt-6 text-2xl font-semibold text-gray-900 sm:text-3xl">
              Create your account
            </h2>
            <p className="mt-3 text-base text-gray-600">
              Join our blood donation community today.
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Full Name
              </label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="mt-2 w-full rounded-md border-0 bg-white px-3.5 py-2 text-base text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-red-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="mt-2 w-full rounded-md border-0 bg-white px-3.5 py-2 text-base text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-red-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="98XXXXXXXX"
                pattern="^(98|97)\d{8}$"
                required
                className="mt-2 w-full rounded-md border-0 bg-white px-3.5 py-2 text-base text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-red-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
                className="mt-2 w-full rounded-md border-0 bg-white px-3.5 py-2 text-base text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-red-500 sm:text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-linear-to-r from-red-500 to-rose-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:from-rose-500 hover:to-red-400 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-red-500"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-semibold text-red-500 hover:text-red-400"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
