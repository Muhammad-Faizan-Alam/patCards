'use client';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { PencilIcon, HomeIcon, AboutIcon, ContactIcon } from '@/components/icons'; // Adjust the import path as necessary


const Navbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const username = session?.user?.email?.split('@')[0] || 'User';

  const navLinks = [
    { name: 'Home', path: '/user', icon: HomeIcon },
    { name: 'About', path: '/user/about', icon: AboutIcon },
    { name: 'Contact', path: '/user/contact', icon: ContactIcon },
  ];

  return (
    <nav className="bg-white shadow-md px-4 py-3 w-full z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo with SVG */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-7 h-7">
            <PencilIcon />
            {/* Modern underline */}
            <div className="absolute bottom-[-6px] left-1/2 w-6 h-[3px] bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full -translate-x-1/2" />
          </div>
          <span className="text-xl font-bold font-serif text-yellow-600 tracking-wide">
            PastCards
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map(link => {
            const active = pathname === link.path;
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`text-gray-700 font-medium hover:text-yellow-500 transition flex items-center ${
                  active ? 'text-yellow-600 underline underline-offset-4' : ''
                }`}
              >
                <Icon active={active} />
                {link.name}
              </Link>
            );
          })}

          {/* User section */}
          {session ? (
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <div className="cursor-pointer px-4 py-1 bg-yellow-100 rounded-full hover:bg-yellow-200 font-semibold text-gray-800">
                {username}
              </div>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50 text-sm">
                  <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                    Profile
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: '/login' })}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-4">
              <Link href="/login" className="text-blue-600 font-medium hover:underline">
                Login
              </Link>
              <Link href="/signup" className="text-blue-600 font-medium hover:underline">
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 space-y-2 px-4 pb-4 border-t pt-3">
          {navLinks.map(link => {
            const active = pathname === link.path;
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`text-gray-700 font-medium hover:text-yellow-500 flex items-center ${
                  active ? 'text-yellow-600 underline underline-offset-4' : ''
                }`}
              >
                <Icon active={active} />
                {link.name}
              </Link>
            );
          })}
          {session ? (
            <div className="pt-2 border-t space-y-2">
              <div className="text-gray-800 font-semibold">{username}</div>
              <Link href="/profile" className="block text-sm hover:underline">
                Profile
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="block text-sm text-left hover:underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-4 pt-2 border-t">
              <Link href="/login" className="text-blue-600 font-medium hover:underline">
                Login
              </Link>
              <Link href="/signup" className="text-blue-600 font-medium hover:underline">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;