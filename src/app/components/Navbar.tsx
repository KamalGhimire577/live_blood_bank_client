"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e:any) => {
    e.preventDefault();
    if (!search.trim()) return;
    alert(`Searching for "${search}"...`);
    setSearch("");
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md transition-all duration-300 ease-in-out ${
        scrolled ? "py-3" : "py-2" // Reduced height (was py-5/py-3)
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 lg:px-10 gap-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={60} // reduced size
              height={45}
              className="object-contain bg-transparent"
            />
          </Link>
        </div>

        {/* Center Search Bar */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 justify-center"
        >
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search donors by address..."
              className="w-full rounded-full border border-slate-300 py-1 pl-4 pr-9 text-sm text-slate-700 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
            </button>
          </div>
        </form>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-4">
          {["Home", "Live Donors", "About Us", "Contact Us"].map((item, i) => (
            <li key={i}>
              <Link
                href={
                  item === "Home"
                    ? "/"
                    : item === "Live Donors"
                    ? "/blog"
                    : item === "About Us"
                    ? "/about"
                    : "/contact"
                }
                className="text-sm font-medium text-slate-700 hover:text-red-500"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/signin"
            className="text-sm font-medium text-slate-700 hover:text-red-500"
          >
            Sign In
          </Link>
          <Link
            href="/donorsignin"
            className="rounded-md bg-linear-to-br from-red-400 to-red-500 px-3 py-1 text-sm font-medium text-white shadow-md transition-transform duration-200 ease-in-out hover:scale-[1.03]"
          >
            Become a Donor
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          type="button"
          className="md:hidden flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="h-6 w-6 text-slate-900"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden absolute left-0 right-0 top-full bg-white shadow-md border-t border-slate-200 animate-slideDown">
          <ul className="flex flex-col items-center py-3 gap-3">
            {/* Search */}
            <li className="w-10/12">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search donors..."
                    className="w-full rounded-full border border-slate-300 py-1 pl-4 pr-9 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </li>

            {/* Links */}
            {["Home", "Live Donors", "About Us", "Contact Us"].map(
              (item, i) => (
                <li key={i}>
                  <Link
                    href={
                      item === "Home"
                        ? "/"
                        : item === "Live Donors"
                        ? "/blog"
                        : item === "About Us"
                        ? "/about"
                        : "/contact"
                    }
                    onClick={() => setMenuOpen(false)}
                    className="text-slate-700 hover:text-red-500"
                  >
                    {item}
                  </Link>
                </li>
              )
            )}

            {/* Actions */}
            <li>
              <Link
                href="/signin"
                onClick={() => setMenuOpen(false)}
                className="text-slate-700 hover:text-red-500"
              >
                Sign In
              </Link>
            </li>
            <li>
              <Link
                href="/donorsignup"
                onClick={() => setMenuOpen(false)}
                className="rounded-md bg-linear-to-br from-red-400 to-red-500 px-4 py-1.5 text-sm font-medium text-white shadow-md"
              >
                Become a Donor
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
