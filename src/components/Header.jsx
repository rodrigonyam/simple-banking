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
    <header className="header">
      <div className="container">
        <nav className="nav">
          <Link to="/" className="nav-brand">
            <CreditCard className="inline mr-2" size={28} />
            Simple Banking
          </Link>
          
          {isAuthenticated ? (
            <div className="flex items-center gap-6">
              <ul className="nav-links">
                <li>
                  <Link to="/dashboard" className="nav-link flex items-center gap-2">
                    <BarChart3 size={18} />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/deposit" className="nav-link flex items-center gap-2">
                    <PlusCircle size={18} />
                    Deposit
                  </Link>
                </li>
                <li>
                  <Link to="/withdrawal" className="nav-link flex items-center gap-2">
                    <MinusCircle size={18} />
                    Withdrawal
                  </Link>
                </li>
                <li>
                  <Link to="/transfer" className="nav-link flex items-center gap-2">
                    <ArrowLeftRight size={18} />
                    Transfer
                  </Link>
                </li>
                <li>
                  <Link to="/transactions" className="nav-link flex items-center gap-2">
                    <BarChart3 size={18} />
                    History
                  </Link>
                </li>
              </ul>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <User size={20} />
                  <span>Welcome, {user?.name}</span>
                </div>
                <button onClick={handleLogout} className="btn btn-outline flex items-center gap-2">
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div>
              <Link to="/login" className="btn btn-outline">
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