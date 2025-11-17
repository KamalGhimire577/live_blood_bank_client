"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/lib/store/hooks";

const getMenuItems = (role: string) => {
  const baseItems = [
    {
      title: "Your Requests",
      icon: "M9 12h6m2 8H7a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2z",
      href: "/requests"
    },
    {
      title: "Logout",
      icon: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1",
      href: "/logout"
    }
  ];

  if (role === "donor") {
    return [
      {
        title: "Donor Dashboard",
        icon: "M3 3h7v7H3V3zm11 0h7v7h-7V3zm-11 11h7v7H3v-7zm11 0h7v7h-7v-7z",
        href: "/donor/dashboard"
      },
      ...baseItems
    ];
  }

  if (role === "admin") {
    return [
      {
        title: "Admin Dashboard",
        icon: "M3 3h7v7H3V3zm11 0h7v7h-7V3zm-11 11h7v7H3v-7zm11 0h7v7h-7v-7z",
        href: "/admin/dashboard"
      },
      ...baseItems
    ];
  }

  return baseItems;
};

export default function Navbar() {
  const { user, token } = useAppSelector((state) => state.auth);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const menuItems = getMenuItems(user.role || "user");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle outside click to close sidebar and profile dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('mobile-sidebar');
      const menuButton = document.getElementById('menu-button');
      const profileDropdown = document.getElementById('profile-dropdown');
      const profileButton = document.getElementById('profile-button');
      
      if (menuOpen && sidebar && !sidebar.contains(event.target as Node) && !menuButton?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
      
      if (profileOpen && profileDropdown && !profileDropdown.contains(event.target as Node) && !profileButton?.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };

    if (menuOpen || profileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen, profileOpen]);

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (!search.trim()) return;
    alert(`Searching for "${search}"...`);
    setSearch("");
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md transition-all duration-300 ease-in-out ${
        scrolled ? "py-3" : "py-2"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 lg:px-10 gap-4">
        {/* Logo + Greeting */}
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={60}
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
                    ? "/livedonor"
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
          {!token && (
            <>
              <Link
                href="/auth/signin"
                className="text-sm font-medium text-slate-700 hover:text-red-500"
              >
                Sign In
              </Link>
              <Link
                href="/auth/donorsignup"
                className="rounded-md bg-linear-to-br from-red-400 to-red-500 px-3 py-1 text-sm font-medium text-white shadow-md transition-transform duration-200 ease-in-out hover:scale-[1.03]"
              >
                Become a Donor
              </Link>
            </>
          )}

          {token && (
            <div className="relative">
              <div
                id="profile-button"
                className="w-10 h-10 rounded-full border-2 border-blue-500 bg-red-400 flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              
              {profileOpen && (
                <div 
                  id="profile-dropdown"
                  className="fixed top-16 right-4 w-64 bg-linear-to-b from-red-900 to-blue-500 text-white rounded-lg shadow-xl p-5 z-50"
                >
                  {/* Close Button */}
                  <div className="flex justify-end mb-2">
                    <button
                      onClick={() => setProfileOpen(false)}
                      className="p-1 rounded-full hover:bg-red-800 transition-colors"
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-16 h-16 rounded-full border-2 border-red-700 bg-red-700 flex items-center justify-center mb-3">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                    <h2 className="text-lg font-bold text-red-100">{user.userName || 'User'}</h2>
                    <p className="text-red-200 text-sm">{user.phoneNumber}</p>
                    <p className="text-red-300 font-semibold text-sm">Role: {user.role || 'user'}</p>
                  </div>
                  
                  <nav className="flex flex-col gap-2">
                    {menuItems.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg border border-red-700 text-red-300 hover:bg-red-800 hover:text-white transition-all text-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                        </svg>
                        {item.title}
                      </Link>
                    ))}
                  </nav>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          id="menu-button"
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

      {/* Mobile Right Sidebar */}
      {menuOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setMenuOpen(false)}
          />
          
          {/* Sidebar */}
          <div 
            id="mobile-sidebar"
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 md:hidden transform translate-x-0 transition-transform duration-300 ease-in-out"
          >
            {/* Close Button */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col h-full overflow-y-auto">
              {/* Search */}
              <div className="p-4 border-b">
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search donors..."
                      className="w-full rounded-full border border-slate-300 py-2 pl-4 pr-10 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                    <button
                      type="submit"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 p-4">
                <ul className="space-y-4">
                  {["Home", "Live Donors", "About Us", "Contact Us"].map((item, i) => (
                    <li key={i}>
                      <Link
                        href={
                          item === "Home"
                            ? "/"
                            : item === "Live Donors"
                            ? "/livedonor"
                            : item === "About Us"
                            ? "/about"
                            : "/contact"
                        }
                        onClick={() => setMenuOpen(false)}
                        className="block py-2 px-3 text-slate-700 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* User Actions */}
                <div className="mt-8 pt-4 border-t">
                  {!token ? (
                    <div className="space-y-3">
                      <Link
                        href="/auth/signin"
                        onClick={() => setMenuOpen(false)}
                        className="block w-full text-center py-2 px-4 text-slate-700 hover:text-red-500 border border-slate-300 rounded-lg transition-colors"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/auth/donorsignup"
                        onClick={() => setMenuOpen(false)}
                        className="block w-full text-center py-2 px-4 bg-linear-to-r from-red-400 to-red-500 text-white rounded-lg shadow-md hover:from-red-500 hover:to-red-600 transition-colors"
                      >
                        Become a Donor
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{user.userName || 'User'}</p>
                          <p className="text-sm text-gray-600">{user.role || 'user'}</p>
                        </div>
                      </div>
                      
                      {menuItems.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-3 py-2 px-3 text-slate-700 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                          </svg>
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
