import React, { useState, useContext, createContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Transfer from './pages/Transfer'

// Auth Context
const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Mock user data
const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@email.com',
  accounts: [
    {
      id: 'acc1',
      type: 'Checking',
      accountNumber: '****1234',
      balance: 5420.75
    },
    {
      id: 'acc2',
      type: 'Savings',
      accountNumber: '****5678',
      balance: 15750.25
    }
  ],
  transactions: [
    {
      id: 1,
      date: '2025-12-26',
      description: 'Grocery Store',
      amount: -85.50,
      type: 'debit',
      account: 'Checking'
    },
    {
      id: 2,
      date: '2025-12-25',
      description: 'Salary Deposit',
      amount: 3500.00,
      type: 'credit',
      account: 'Checking'
    },
    {
      id: 3,
      date: '2025-12-24',
      description: 'Gas Station',
      amount: -42.30,
      type: 'debit',
      account: 'Checking'
    },
    {
      id: 4,
      date: '2025-12-23',
      description: 'Transfer to Savings',
      amount: -500.00,
      type: 'transfer',
      account: 'Checking'
    },
    {
      id: 5,
      date: '2025-12-23',
      description: 'Transfer from Checking',
      amount: 500.00,
      type: 'transfer',
      account: 'Savings'
    }
  ]
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = (email, password) => {
    // Simple mock authentication
    if (email === 'demo@bank.com' && password === 'demo123') {
      setUser(mockUser)
      setIsAuthenticated(true)
      return { success: true }
    }
    return { success: false, error: 'Invalid credentials' }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
  }

  const value = {
    user,
    isAuthenticated,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" />
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <main className="container">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/transactions" element={
                <ProtectedRoute>
                  <Transactions />
                </ProtectedRoute>
              } />
              <Route path="/transfer" element={
                <ProtectedRoute>
                  <Transfer />
                </ProtectedRoute>
              } />
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App