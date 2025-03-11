// components/Navbar.js
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo and Nello Health */}
            <Link href="/" className="flex-shrink-0 flex items-center">
              <img
                className="h-12 w-auto"
                src="http://asknello.com/assets/images/logo.png" // Replace with your logo path
                alt="Nello Health"
              />
           
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {/* Nav Links */}
            <Link
              href="/services"
              className="text-gray-800 hover:text-[#ff9017] px-3 py-2 rounded-md text-sm font-medium"
            >
              Services
            </Link>
            <Link
              href="/specialist"
              className="text-gray-800 hover:text-[#ff9017] px-3 py-2 rounded-md text-sm font-medium"
            >
              Specialist
            </Link>
            {/* Call to Action Button */}
            <Link
              href="/book"
              className="flex items-center bg-[#1997cf] hover:bg-[#ff9017] text-white px-8 py-3 rounded-full text-sm font-semibold"
            >
             <svg className="h-5 w-5 text-white"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />  <line x1="16" y1="2" x2="16" y2="6" />  <line x1="8" y1="2" x2="8" y2="6" />  <line x1="3" y1="10" x2="21" y2="10" /></svg>
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;