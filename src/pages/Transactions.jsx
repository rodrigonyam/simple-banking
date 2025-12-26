import React, { useState } from 'react'
import { useAuth } from '../App'
import { ArrowUpRight, ArrowDownLeft, Filter, Search, Calendar } from 'lucide-react'

function Transactions() {
  const { user } = useAuth()
  const [filterType, setFilterType] = useState('all')
  const [filterAccount, setFilterAccount] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const transactions = user?.transactions || []
  
  const filteredTransactions = transactions.filter(transaction => {
    const matchesType = filterType === 'all' || transaction.type === filterType
    const matchesAccount = filterAccount === 'all' || transaction.account === filterAccount
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesType && matchesAccount && matchesSearch
  })

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'credit':
        return <ArrowUpRight size={16} className="text-green-600" />
      case 'debit':
        return <ArrowDownLeft size={16} className="text-red-600" />
      case 'transfer':
        return <ArrowDownLeft size={16} className="text-blue-600" />
      default:
        return <ArrowDownLeft size={16} className="text-gray-600" />
    }
  }

  const getTransactionColor = (type, amount) => {
    if (amount > 0) return 'text-green-600'
    return 'text-red-600'
  }

  const getTransactionBg = (type) => {
    switch (type) {
      case 'credit':
        return 'bg-green-100'
      case 'debit':
        return 'bg-red-100'
      case 'transfer':
        return 'bg-blue-100'
      default:
        return 'bg-gray-100'
    }
  }

  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Transaction History</h1>
        <p className="text-gray-600">View and manage your account transactions</p>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="grid grid-3 gap-4">
          <div className="form-group">
            <label className="form-label">
              <Search size={18} className="inline mr-2" />
              Search
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <Filter size={18} className="inline mr-2" />
              Transaction Type
            </label>
            <select
              className="form-input"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="credit">Credits</option>
              <option value="debit">Debits</option>
              <option value="transfer">Transfers</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              <Calendar size={18} className="inline mr-2" />
              Account
            </label>
            <select
              className="form-input"
              value={filterAccount}
              onChange={(e) => setFilterAccount(e.target.value)}
            >
              <option value="all">All Accounts</option>
              <option value="Checking">Checking</option>
              <option value="Savings">Savings</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transaction Summary */}
      <div className="grid grid-3 mb-6">
        <div className="card bg-green-50">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Total Credits</h3>
          <p className="text-2xl font-bold text-green-600">
            ${filteredTransactions
              .filter(t => t.amount > 0)
              .reduce((sum, t) => sum + t.amount, 0)
              .toFixed(2)}
          </p>
        </div>

        <div className="card bg-red-50">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Total Debits</h3>
          <p className="text-2xl font-bold text-red-600">
            ${Math.abs(filteredTransactions
              .filter(t => t.amount < 0)
              .reduce((sum, t) => sum + t.amount, 0))
              .toFixed(2)}
          </p>
        </div>

        <div className="card bg-blue-50">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Net Change</h3>
          <p className={`text-2xl font-bold ${
            filteredTransactions.reduce((sum, t) => sum + t.amount, 0) >= 0 
              ? 'text-green-600' : 'text-red-600'
          }`}>
            ${filteredTransactions.reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Transactions List */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-6">
          {filteredTransactions.length} Transaction{filteredTransactions.length !== 1 ? 's' : ''}
        </h2>

        <div className="space-y-4">
          {filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${getTransactionBg(transaction.type)}`}>
                  {getTransactionIcon(transaction.type)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{transaction.description}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <p className="text-sm text-gray-600">
                      {new Date(transaction.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                    <span className="text-gray-400">•</span>
                    <p className="text-sm text-gray-600">{transaction.account} Account</p>
                    <span className="text-gray-400">•</span>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      transaction.type === 'credit' ? 'bg-green-100 text-green-700' :
                      transaction.type === 'debit' ? 'bg-red-100 text-red-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-lg font-bold ${getTransactionColor(transaction.type, transaction.amount)}`}>
                  {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No transactions found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Transactions