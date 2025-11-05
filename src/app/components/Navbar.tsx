import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky inset-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-6xl gap-8 px-6 transition-all duration-200 ease-in-out lg:px-12 py-4">
        {/* Logo */}
        <div className="relative flex items-center">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={32}
              height={32}
              className="bg-transparent object-contain"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden items-center justify-center gap-6 md:flex">
          <li>
            <Link
              href="/pricing"
              className="pt-1.5 font-dm text-sm font-medium text-slate-700"
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="pt-1.5 font-dm text-sm font-medium text-slate-700"
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="/docs"
              className="pt-1.5 font-dm text-sm font-medium text-slate-700"
            >
              Docs
            </Link>
          </li>
        </ul>

        <div className="flex-grow"></div>

        {/* Desktop Actions */}
        <div className="hidden items-center justify-center gap-6 md:flex">
          <Link
            href="/signin"
            className="font-dm text-sm font-medium text-slate-700"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="rounded-md bg-gradient-to-br from-green-600 to-emerald-400 px-3 py-1.5 font-dm text-sm font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03]"
          >
            Sign up for free
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="relative flex items-center justify-center md:hidden">
          <button type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
              className="h-6 w-auto text-slate-900"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
