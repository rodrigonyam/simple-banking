import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../App'
import { User, LogOut, CreditCard, ArrowLeftRight, BarChart3, PlusCircle, MinusCircle } from 'lucide-react'

function Header() {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      <div className="container relative z-10">
        <nav className="nav py-6">
          <Link to="/" className="nav-brand flex items-center text-white hover:text-blue-100 transition-colors">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 mr-3">
              <CreditCard className="text-white" size={28} />
            </div>
            <span className="text-2xl font-bold">Simple Banking</span>
          </Link>
          
          {isAuthenticated ? (
            <div className="flex items-center gap-8">
              <ul className="nav-links flex gap-8">
                <li>
                  <Link to="/dashboard" className="nav-link flex items-center gap-2 text-white hover:text-blue-100 transition-colors font-medium">
                    <div className="bg-white/20 rounded-lg p-2">
                      <BarChart3 size={18} />
                    </div>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/deposit" className="nav-link flex items-center gap-2 text-white hover:text-green-200 transition-colors font-medium">
                    <div className="bg-white/20 rounded-lg p-2">
                      <PlusCircle size={18} />
                    </div>
                    Deposit
                  </Link>
                </li>
                <li>
                  <Link to="/withdrawal" className="nav-link flex items-center gap-2 text-white hover:text-red-200 transition-colors font-medium">
                    <div className="bg-white/20 rounded-lg p-2">
                      <MinusCircle size={18} />
                    </div>
                    Withdrawal
                  </Link>
                </li>
                <li>
                  <Link to="/transfer" className="nav-link flex items-center gap-2 text-white hover:text-blue-200 transition-colors font-medium">
                    <div className="bg-white/20 rounded-lg p-2">
                      <ArrowLeftRight size={18} />
                    </div>
                    Transfer
                  </Link>
                </li>
                <li>
                  <Link to="/transactions" className="nav-link flex items-center gap-2 text-white hover:text-purple-200 transition-colors font-medium">
                    <div className="bg-white/20 rounded-lg p-2">
                      <BarChart3 size={18} />
                    </div>
                    History
                  </Link>
                </li>
              </ul>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 text-white">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                    <User size={20} />
                  </div>
                  <span className="font-medium">Welcome, {user?.name}</span>
                </div>
                <button onClick={handleLogout} className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200 flex items-center gap-2">
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div>
              <Link to="/login" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-200">
                Login
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header