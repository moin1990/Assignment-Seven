import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faClock, faChartLine, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

const navLinks = [
  { to: '/',         label: 'Home',     icon: faHouse      },
  { to: '/timeline', label: 'Timeline', icon: faClock      },
  { to: '/stats',    label: 'Stats',    icon: faChartLine  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link to="/" className="flex items-center select-none">
            <span className="text-[1.15rem] font-bold text-gray-900 tracking-tight">Keen</span>
            <span className="text-[1.15rem] font-medium text-gray-900 tracking-tight">Keeper</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-1">
            {navLinks.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                end
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#2d5a4e] text-white'
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
                  }`
                }
              >
                <FontAwesomeIcon icon={icon} className="text-[13px]" />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="sm:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon icon={open ? faXmark : faBars} className="text-lg" />
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <nav className="sm:hidden pb-3 pt-1 border-t border-gray-100 space-y-0.5">
            {navLinks.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                end
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#2d5a4e] text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
              >
                <FontAwesomeIcon icon={icon} className="text-[13px]" />
                {label}
              </NavLink>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
