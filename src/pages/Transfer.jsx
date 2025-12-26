import React, { useState } from 'react'
import { useAuth } from '../App'
import { ArrowRight, DollarSign, AlertCircle, CheckCircle, CreditCard } from 'lucide-react'

function Transfer() {
  const { user } = useAuth()
  const [fromAccount, setFromAccount] = useState('')
  const [toAccount, setToAccount] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const accounts = user?.accounts || []

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setIsLoading(true)

    // Basic validation
    if (!fromAccount || !toAccount || !amount) {
      setError('Please fill in all required fields')
      setIsLoading(false)
      return
    }

    if (fromAccount === toAccount) {
      setError('Please select different accounts for transfer')
      setIsLoading(false)
      return
    }

    const transferAmount = parseFloat(amount)
    if (isNaN(transferAmount) || transferAmount <= 0) {
      setError('Please enter a valid amount greater than 0')
      setIsLoading(false)
      return
    }

    const sourceAccount = accounts.find(acc => acc.id === fromAccount)
    if (sourceAccount && transferAmount > sourceAccount.balance) {
      setError('Insufficient funds in the source account')
      setIsLoading(false)
      return
    }

    // Simulate transfer processing
    setTimeout(() => {
      setSuccess(true)
      setIsLoading(false)
      
      // Reset form
      setFromAccount('')
      setToAccount('')
      setAmount('')
      setDescription('')
    }, 2000)
  }

  const getAccountDisplay = (account) => {
    return `${account.type} (${account.accountNumber}) - $${account.balance.toFixed(2)}`
  }

  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Transfer Money</h1>
        <p className="text-gray-600">Transfer funds between your accounts instantly</p>
      </div>

      <div className="max-w-2xl mx-auto">
        {success && (
          <div className="card bg-green-50 border border-green-200 mb-6">
            <div className="flex items-center">
              <CheckCircle className="text-green-500 mr-3" size={24} />
              <div>
                <h3 className="text-lg font-semibold text-green-800">Transfer Successful!</h3>
                <p className="text-green-700">Your money has been transferred successfully.</p>
              </div>
            </div>
          </div>
        )}

        <div className="card">
          <div className="text-center mb-8">
            <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
              <ArrowRight className="text-blue-600" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Quick Transfer</h2>
            <p className="text-gray-600">Move money between your accounts</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded p-4 mb-6">
              <div className="flex items-center">
                <AlertCircle className="text-red-500 mr-2" size={20} />
                <span className="text-red-700">{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-2 gap-6 mb-6">
              <div className="form-group">
                <label htmlFor="fromAccount" className="form-label">
                  <CreditCard size={18} className="inline mr-2" />
                  From Account
                </label>
                <select
                  id="fromAccount"
                  className="form-input"
                  value={fromAccount}
                  onChange={(e) => setFromAccount(e.target.value)}
                  required
                >
                  <option value="">Select source account</option>
                  {accounts.map(account => (
                    <option key={account.id} value={account.id}>
                      {getAccountDisplay(account)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="toAccount" className="form-label">
                  <CreditCard size={18} className="inline mr-2" />
                  To Account
                </label>
                <select
                  id="toAccount"
                  className="form-input"
                  value={toAccount}
                  onChange={(e) => setToAccount(e.target.value)}
                  required
                >
                  <option value="">Select destination account</option>
                  {accounts.map(account => (
                    <option key={account.id} value={account.id}>
                      {getAccountDisplay(account)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group mb-6">
              <label htmlFor="amount" className="form-label">
                <DollarSign size={18} className="inline mr-2" />
                Amount
              </label>
              <input
                id="amount"
                type="number"
                step="0.01"
                min="0.01"
                className="form-input"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div className="form-group mb-6">
              <label htmlFor="description" className="form-label">
                Description (Optional)
              </label>
              <input
                id="description"
                type="text"
                className="form-input"
                placeholder="What is this transfer for?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Transfer Preview */}
            {fromAccount && toAccount && amount && (
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Transfer Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">From:</span>
                    <span className="font-medium">
                      {accounts.find(acc => acc.id === fromAccount)?.type} Account
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">To:</span>
                    <span className="font-medium">
                      {accounts.find(acc => acc.id === toAccount)?.type} Account
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="text-xl font-bold text-blue-600">
                      ${parseFloat(amount || 0).toFixed(2)}
                    </span>
                  </div>
                  {description && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Description:</span>
                      <span className="font-medium">{description}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !fromAccount || !toAccount || !amount}
              className="btn btn-primary w-full text-lg"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing Transfer...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <ArrowRight size={20} className="mr-2" />
                  Transfer ${parseFloat(amount || 0).toFixed(2)}
                </div>
              )}
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="text-blue-500 mr-3 mt-0.5" size={20} />
              <div>
                <h4 className="font-semibold text-blue-800 mb-1">Security Notice</h4>
                <p className="text-blue-700 text-sm">
                  All transfers are processed securely with end-to-end encryption. 
                  This is a demo application - no real money will be transferred.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Transfer