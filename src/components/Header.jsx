import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../App'
import { User, LogOut, CreditCard, ArrowLeftRight, BarChart3, PlusCircle, MinusCircle, Menu, X } from 'lucide-react'

function Header() {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setMenuOpen(false)
    navigate('/login')
  }

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 font-medium transition-all duration-200 rounded-xl px-3 py-2 ${
      isActive
        ? 'text-white bg-white/30 shadow-inner'
        : 'text-white/80 hover:text-white hover:bg-white/20'
    }`

  const navItems = isAuthenticated ? (
    <>
      <li>
        <NavLink to="/dashboard" className={navLinkClass} onClick={() => setMenuOpen(false)}>
          <div className="bg-white/20 rounded-lg p-1.5"><BarChart3 size={16} /></div>
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink to="/deposit" className={navLinkClass} onClick={() => setMenuOpen(false)}>
          <div className="bg-white/20 rounded-lg p-1.5"><PlusCircle size={16} /></div>
          Deposit
        </NavLink>
      </li>
      <li>
        <NavLink to="/withdrawal" className={navLinkClass} onClick={() => setMenuOpen(false)}>
          <div className="bg-white/20 rounded-lg p-1.5"><MinusCircle size={16} /></div>
          Withdrawal
        </NavLink>
      </li>
      <li>
        <NavLink to="/transfer" className={navLinkClass} onClick={() => setMenuOpen(false)}>
          <div className="bg-white/20 rounded-lg p-1.5"><ArrowLeftRight size={16} /></div>
          Transfer
        </NavLink>
      </li>
      <li>
        <NavLink to="/transactions" className={navLinkClass} onClick={() => setMenuOpen(false)}>
          <div className="bg-white/20 rounded-lg p-1.5"><BarChart3 size={16} /></div>
          History
        </NavLink>
      </li>
    </>
  ) : null

  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 shadow-2xl relative overflow-hidden">
      <div className="container relative z-10">
        <nav className="nav py-4">
          <NavLink to="/" className="nav-brand flex items-center text-white hover:text-blue-100 transition-colors">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 mr-3">
              <CreditCard className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold">Simple Banking</span>
          </NavLink>

          {/* Desktop nav */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center gap-6">
              <ul className="nav-links flex gap-1">
                {navItems}
              </ul>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-white text-sm">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5">
                    <User size={16} />
                  </div>
                  <span className="font-medium">{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200 flex items-center gap-2 text-sm"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          )}

          {!isAuthenticated && (
            <div className="hidden md:block">
              <NavLink to="/login" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-200">
                Login
              </NavLink>
            </div>
          )}

          {/* Mobile hamburger */}
          {isAuthenticated && (
            <button
              className="md:hidden text-white bg-white/20 hover:bg-white/30 rounded-xl p-2 transition-colors"
              onClick={() => setMenuOpen(open => !open)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          )}
        </nav>

        {/* Mobile dropdown */}
        {menuOpen && isAuthenticated && (
          <div className="md:hidden border-t border-white/20 pb-4 pt-3">
            <ul className="flex flex-col gap-1 mb-4">
              {navItems}
            </ul>
            <div className="flex items-center justify-between pt-3 border-t border-white/20">
              <div className="flex items-center gap-2 text-white text-sm">
                <User size={16} />
                <span className="font-medium">{user?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-4 rounded-xl transition-all flex items-center gap-2 text-sm"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header