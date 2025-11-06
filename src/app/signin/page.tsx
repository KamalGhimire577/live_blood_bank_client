"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SignIn() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", { identifier, password });
    // TODO: Add API call here (email OR phone allowed)
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">
        <div className="w-full max-w-sm space-y-8 p-6 rounded-xl shadow-lg border border-gray-200">
          {/* Logo + Header */}
          <div className="text-center">
            <Image
              src="/logo.png"
              alt="App Logo"
              width={80}
              height={80}
              className="mx-auto"
            />
            <h2 className="mt-6 text-2xl font-semibold text-gray-900 sm:text-3xl">
              Login to your account
            </h2>
           
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="identifier"
                  className="block text-sm font-medium text-gray-900"
                >
                  Email or Phone Number
                </label>
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Enter your email or phone"
                  required
                  className="mt-2 w-full rounded-md border-0 bg-white px-3.5 py-2 text-base text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-red-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="mt-2 w-full rounded-md border-0 bg-white px-3.5 py-2 text-base text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-red-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-x-2.5 text-sm text-gray-900">
                <input
                  type="checkbox"
                  name="remember-me"
                  className="h-4 w-4 rounded border-gray-300 text-red-500 focus:ring-2 focus:ring-red-400"
                />
                Remember me
              </label>
              <Link
                href="/forgotpassword"
                className="text-sm font-semibold text-red-500 hover:text-red-400"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-linear-to-r from-red-500 to-rose-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:from-rose-500 hover:to-red-400 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-red-500"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-red-500 hover:text-red-400"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
