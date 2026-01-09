import React, { useState } from 'react'
import { useAuth } from '../App'
import { MinusCircle, DollarSign, AlertCircle, CheckCircle, CreditCard } from 'lucide-react'

function Withdrawal() {
  const { user } = useAuth()
  const [selectedAccount, setSelectedAccount] = useState('')
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

    // Validation
    if (!selectedAccount || !amount) {
      setError('Please fill in all required fields')
      setIsLoading(false)
      return
    }

    const withdrawAmount = parseFloat(amount)
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      setError('Please enter a valid amount greater than 0')
      setIsLoading(false)
      return
    }

    const sourceAccount = accounts.find(acc => acc.id === selectedAccount)
    if (sourceAccount && withdrawAmount > sourceAccount.balance) {
      setError('Insufficient funds in the selected account')
      setIsLoading(false)
      return
    }

    if (withdrawAmount > 500) {
      setError('Daily withdrawal limit is $500')
      setIsLoading(false)
      return
    }

    // Simulate withdrawal processing
    setTimeout(() => {
      setSuccess(true)
      setIsLoading(false)
      
      // Reset form
      setSelectedAccount('')
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Withdraw Money</h1>
        <p className="text-gray-600">Withdraw cash from your account</p>
      </div>

      <div className="max-w-2xl mx-auto">
        {success && (
          <div className="card bg-green-50 border border-green-200 mb-6">
            <div className="flex items-center">
              <CheckCircle className="text-green-500 mr-3" size={24} />
              <div>
                <h3 className="text-lg font-semibold text-green-800">Withdrawal Successful!</h3>
                <p className="text-green-700">Your withdrawal has been processed successfully.</p>
              </div>
            </div>
          </div>
        )}

        <div className="card">
          <div className="text-center mb-8">
            <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
              <MinusCircle className="text-red-600" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Make a Withdrawal</h2>
            <p className="text-gray-600">Withdraw cash from your account</p>
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
            <div className="form-group mb-6">
              <label htmlFor="selectedAccount" className="form-label">
                <CreditCard size={18} className="inline mr-2" />
                Select Account
              </label>
              <select
                id="selectedAccount"
                className="form-input"
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                required
              >
                <option value="">Select account to withdraw from</option>
                {accounts.map(account => (
                  <option key={account.id} value={account.id}>
                    {getAccountDisplay(account)}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group mb-6">
              <label htmlFor="amount" className="form-label">
                <DollarSign size={18} className="inline mr-2" />
                Withdrawal Amount
              </label>
              <input
                id="amount"
                type="number"
                step="0.01"
                min="0.01"
                max="500"
                className="form-input"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
              <p className="text-sm text-gray-600 mt-2">Daily limit: $500</p>
            </div>

            <div className="form-group mb-6">
              <label htmlFor="description" className="form-label">
                Description (Optional)
              </label>
              <input
                id="description"
                type="text"
                className="form-input"
                placeholder="What is this withdrawal for?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Withdrawal Preview */}
            {selectedAccount && amount && (
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Withdrawal Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">From Account:</span>
                    <span className="font-medium">
                      {accounts.find(acc => acc.id === selectedAccount)?.type} Account
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Balance:</span>
                    <span className="font-medium">
                      ${accounts.find(acc => acc.id === selectedAccount)?.balance.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Withdrawal Amount:</span>
                    <span className="text-xl font-bold text-red-600">
                      -${parseFloat(amount || 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-3">
                    <span className="text-gray-600 font-semibold">New Balance:</span>
                    <span className="text-xl font-bold text-blue-600">
                      ${(accounts.find(acc => acc.id === selectedAccount)?.balance - parseFloat(amount || 0)).toFixed(2)}
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
              disabled={isLoading || !selectedAccount || !amount}
              className="btn btn-secondary w-full text-lg"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing Withdrawal...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <MinusCircle size={20} className="mr-2" />
                  Withdraw ${parseFloat(amount || 0).toFixed(2)}
                </div>
              )}
            </button>
          </form>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="text-yellow-500 mr-3 mt-0.5" size={20} />
              <div>
                <h4 className="font-semibold text-yellow-800 mb-1">Important Notice</h4>
                <p className="text-yellow-700 text-sm">
                  Please ensure you have sufficient funds before making a withdrawal. 
                  This is a demo application - no real money will be withdrawn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Withdrawal