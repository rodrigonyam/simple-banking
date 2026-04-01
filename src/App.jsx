import React, { useState, useContext, createContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import SessionTimeout from './components/SessionTimeout'
import { ToastProvider } from './components/Toast'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Transfer from './pages/Transfer'
import Deposit from './pages/Deposit'
import Withdrawal from './pages/Withdrawal'

// Auth Context
const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Demo credentials — never store real credentials in client-side code
const DEMO_CREDENTIALS = { accountNumber: '1234567890', pin: '1234' }

// Mock user data
const mockUser = {
  id: 1,
  name: 'John Doe',
  accountNumber: '1234567890',
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

  const login = (accountNumber, pin) => {
    if (accountNumber === DEMO_CREDENTIALS.accountNumber && pin === DEMO_CREDENTIALS.pin) {
      setUser(mockUser)
      setIsAuthenticated(true)
      return { success: true }
    }
    return { success: false, error: 'Invalid account number or PIN' }
  }

  const deposit = (accountId, amount, description) => {
    setUser(prev => {
      const updatedAccounts = prev.accounts.map(acc =>
        acc.id === accountId ? { ...acc, balance: acc.balance + amount } : acc
      )
      const accountType = prev.accounts.find(acc => acc.id === accountId)?.type
      const newTransaction = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        description: description || 'Deposit',
        amount,
        type: 'credit',
        account: accountType
      }
      return { ...prev, accounts: updatedAccounts, transactions: [newTransaction, ...prev.transactions] }
    })
  }

  const withdraw = (accountId, amount, description) => {
    setUser(prev => {
      const updatedAccounts = prev.accounts.map(acc =>
        acc.id === accountId ? { ...acc, balance: acc.balance - amount } : acc
      )
      const accountType = prev.accounts.find(acc => acc.id === accountId)?.type
      const newTransaction = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        description: description || 'Withdrawal',
        amount: -amount,
        type: 'debit',
        account: accountType
      }
      return { ...prev, accounts: updatedAccounts, transactions: [newTransaction, ...prev.transactions] }
    })
  }

  const transfer = (fromAccountId, toAccountId, amount, description) => {
    setUser(prev => {
      const fromType = prev.accounts.find(acc => acc.id === fromAccountId)?.type
      const toType = prev.accounts.find(acc => acc.id === toAccountId)?.type
      const updatedAccounts = prev.accounts.map(acc => {
        if (acc.id === fromAccountId) return { ...acc, balance: acc.balance - amount }
        if (acc.id === toAccountId) return { ...acc, balance: acc.balance + amount }
        return acc
      })
      const newTransactions = [
        {
          id: Date.now(),
          date: new Date().toISOString().split('T')[0],
          description: description || `Transfer to ${toType}`,
          amount: -amount,
          type: 'transfer',
          account: fromType
        },
        {
          id: Date.now() + 1,
          date: new Date().toISOString().split('T')[0],
          description: description || `Transfer from ${fromType}`,
          amount,
          type: 'transfer',
          account: toType
        },
        ...prev.transactions
      ]
      return { ...prev, accounts: updatedAccounts, transactions: newTransactions }
    })
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
  }

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    deposit,
    withdraw,
    transfer
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
    <ToastProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Header />
            <SessionTimeout />
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
              <Route path="/deposit" element={
                <ProtectedRoute>
                  <Deposit />
                </ProtectedRoute>
              } />
              <Route path="/withdrawal" element={
                <ProtectedRoute>
                  <Withdrawal />
                </ProtectedRoute>
              } />
                <Route path="/" element={<Navigate to="/dashboard" />} />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </ToastProvider>
  )
}

export default App