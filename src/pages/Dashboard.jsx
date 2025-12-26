import React from 'react'
import { useAuth } from '../App'
import { CreditCard, TrendingUp, ArrowUpRight, ArrowDownLeft, Eye, PlusCircle, MinusCircle, ArrowLeftRight } from 'lucide-react'

function Dashboard() {
  const { user } = useAuth()

  const totalBalance = user?.accounts.reduce((sum, account) => sum + account.balance, 0) || 0
  const recentTransactions = user?.transactions.slice(0, 5) || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Welcome Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-blue-100 text-lg md:text-xl">
                Here's your financial overview for today
              </p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
                <TrendingUp size={48} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-6 relative z-10">
        {/* Total Balance Card */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 mb-8">
          <div className="text-center">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-full p-4 w-20 h-20 mx-auto mb-6 shadow-lg">
              <TrendingUp size={48} className="text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Total Portfolio Value</h2>
            <p className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
              ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-gray-600 text-lg">Across all your accounts</p>
          </div>
        </div>

        {/* Core Banking Operations */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Banking Operations</h2>
            <p className="text-gray-600 text-lg">Quick access to all your banking needs</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <a href="/deposit" className="group">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl">
                <div className="text-center">
                  <PlusCircle size={32} className="mx-auto mb-3" />
                  <h3 className="font-bold text-lg">Deposit</h3>
                  <p className="text-green-100 text-sm mt-1">Add funds</p>
                </div>
              </div>
            </a>
            <a href="/withdrawal" className="group">
              <div className="bg-gradient-to-br from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl">
                <div className="text-center">
                  <MinusCircle size={32} className="mx-auto mb-3" />
                  <h3 className="font-bold text-lg">Withdraw</h3>
                  <p className="text-red-100 text-sm mt-1">Get cash</p>
                </div>
              </div>
            </a>
            <a href="/transfer" className="group">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl">
                <div className="text-center">
                  <ArrowLeftRight size={32} className="mx-auto mb-3" />
                  <h3 className="font-bold text-lg">Transfer</h3>
                  <p className="text-blue-100 text-sm mt-1">Move funds</p>
                </div>
              </div>
            </a>
            <a href="/transactions" className="group">
              <div className="bg-gradient-to-br from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl">
                <div className="text-center">
                  <Eye size={32} className="mx-auto mb-3" />
                  <h3 className="font-bold text-lg">History</h3>
                  <p className="text-purple-100 text-sm mt-1">View activity</p>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Account Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {user?.accounts.map((account, index) => (
            <div key={account.id} className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className={`h-2 ${
                index === 0 ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 
                'bg-gradient-to-r from-green-500 to-emerald-600'
              }`}></div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-2xl ${
                      index === 0 ? 'bg-blue-100' : 'bg-green-100'
                    }`}>
                      <CreditCard className={`${
                        index === 0 ? 'text-blue-600' : 'text-green-600'
                      }`} size={32} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{account.type}</h3>
                      <p className="text-gray-600 font-mono">{account.accountNumber}</p>
                    </div>
                  </div>
                  <Eye className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" size={24} />
                </div>
                <div className="text-center">
                  <p className="text-gray-600 text-sm mb-2">Available Balance</p>
                  <p className="text-4xl font-bold text-gray-900 mb-4">
                    ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                  <div className="flex justify-center space-x-4">
                    <button className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      index === 0 ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' : 
                      'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}>
                      View Details
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg text-sm font-semibold transition-all">
                      Download Statement
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Recent Activity</h2>
              <p className="text-gray-600">Your latest transactions</p>
            </div>
            <a href="/transactions" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg">
              View All
            </a>
          </div>

          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-200 group">
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl group-hover:scale-110 transition-transform duration-200 ${
                    transaction.type === 'credit' ? 'bg-green-100 text-green-600' :
                    transaction.type === 'debit' ? 'bg-red-100 text-red-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {transaction.type === 'credit' ? 
                      <ArrowUpRight size={24} /> : 
                      <ArrowDownLeft size={24} />
                    }
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">{transaction.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <span className="font-medium">
                        {new Date(transaction.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="font-medium">{transaction.account}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
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
                  <p className={`text-2xl font-bold ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}

            {recentTransactions.length === 0 && (
              <div className="text-center py-12">
                <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-4">
                  <BarChart3 size={48} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No recent activity</h3>
                <p className="text-gray-500">Your transactions will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard