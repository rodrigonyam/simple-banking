import React from 'react'
import { useAuth } from '../App'
import { CreditCard, TrendingUp, ArrowUpRight, ArrowDownLeft, Eye } from 'lucide-react'

function Dashboard() {
  const { user } = useAuth()

  const totalBalance = user?.accounts.reduce((sum, account) => sum + account.balance, 0) || 0
  const recentTransactions = user?.transactions.slice(0, 5) || []

  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600">
          Here's an overview of your banking activity
        </p>
      </div>

      {/* Account Summary */}
      <div className="grid grid-2 mb-8">
        <div className="card bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Total Balance</h2>
            <TrendingUp size={24} />
          </div>
          <p className="text-3xl font-bold">
            ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-blue-100 mt-2">Across all accounts</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="space-y-3">
            <a href="/transfer" className="btn btn-primary w-full">
              Transfer Money
            </a>
            <a href="/transactions" className="btn btn-outline w-full">
              View All Transactions
            </a>
          </div>
        </div>
      </div>

      {/* Account Details */}
      <div className="grid grid-2 mb-8">
        {user?.accounts.map((account) => (
          <div key={account.id} className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <CreditCard className="text-blue-600" size={24} />
                <div>
                  <h3 className="text-lg font-semibold">{account.type} Account</h3>
                  <p className="text-gray-600 text-sm">{account.accountNumber}</p>
                </div>
              </div>
              <Eye className="text-gray-400 cursor-pointer" size={20} />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">
                ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
              <p className="text-sm text-gray-600">Available Balance</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Transactions */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
          <a href="/transactions" className="text-blue-600 hover:text-blue-800 font-medium">
            View All
          </a>
        </div>

        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  transaction.type === 'credit' ? 'bg-green-100 text-green-600' :
                  transaction.type === 'debit' ? 'bg-red-100 text-red-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {transaction.type === 'credit' ? 
                    <ArrowUpRight size={16} /> : 
                    <ArrowDownLeft size={16} />
                  }
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{transaction.description}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(transaction.date).toLocaleDateString()} • {transaction.account}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${
                  transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {recentTransactions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No recent transactions
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard