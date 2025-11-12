"use client";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-rose-100 via-red-100 to-red-200 px-4">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 md:p-10">
        {/* Glowing accents */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-400 rounded-full blur-2xl opacity-30" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-rose-400 rounded-full blur-2xl opacity-30" />

        <h1 className="text-3xl font-bold text-center text-red-600 mb-8">
          Admin Login
        </h1>

        <form className="space-y-8 relative z-10">
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email address"
              required
              className="peer w-full border-b-2 border-gray-300 bg-transparent py-2 text-gray-900 placeholder-transparent focus:outline-none focus:border-red-500"
            />
            <label
              htmlFor="email"
              className="absolute left-0 -top-3.5 text-sm text-gray-600 transition-all 
                peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-red-600"
            >
              Email Address
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
              className="peer w-full border-b-2 border-gray-300 bg-transparent py-2 text-gray-900 placeholder-transparent focus:outline-none focus:border-red-500"
            />
            <label
              htmlFor="password"
              className="absolute left-0 -top-3.5 text-sm text-gray-600 transition-all 
                peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-red-600"
            >
              Password
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-linear-to-r from-red-600 to-rose-500 text-white font-semibold py-2.5 rounded-lg shadow-md 
            hover:from-rose-500 hover:to-red-600 transition-all duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
