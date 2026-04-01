import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../App'
import { useToast } from '../components/Toast'
import ConfirmModal from '../components/ConfirmModal'
import { PlusCircle, DollarSign, AlertCircle, CreditCard } from 'lucide-react'

const QUICK_AMOUNTS = [50, 100, 500, 1000]
const CONFIRM_THRESHOLD = 200

function Deposit() {
  const { user, deposit } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [selectedAccount, setSelectedAccount] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)

  const accounts = user?.accounts || []

  const getRawAmount = () => parseFloat(amount.replace(/,/g, '')) || 0

  const handleAmountChange = (e) => {
    let raw = e.target.value.replace(/,/g, '').replace(/[^0-9.]/g, '')
    if (raw === '') { setAmount(''); return }
    const dotIndex = raw.indexOf('.')
    if (dotIndex !== -1) {
      raw = raw.slice(0, dotIndex + 1) + raw.slice(dotIndex + 1).replace(/\./g, '')
      raw = raw.slice(0, dotIndex + 3)
    }
    const [intPart, decPart] = raw.split('.')
    const intNum = parseInt(intPart)
    const formattedInt = isNaN(intNum) ? '0' : intNum.toLocaleString('en-US')
    setAmount(decPart !== undefined ? `${formattedInt}.${decPart}` : formattedInt)
  }

  const setQuickAmount = (val) => setAmount(val.toLocaleString('en-US'))

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    const depositAmount = getRawAmount()
    if (!selectedAccount || !amount) { setError('Please fill in all required fields'); return }
    if (isNaN(depositAmount) || depositAmount <= 0) { setError('Please enter a valid amount greater than 0'); return }
    if (depositAmount > 10000) { setError('Daily deposit limit is $10,000'); return }
    if (depositAmount >= CONFIRM_THRESHOLD) { setShowConfirm(true); return }
    processDeposit(depositAmount)
  }

  const processDeposit = (depositAmount) => {
    setIsLoading(true)
    setTimeout(() => {
      deposit(selectedAccount, depositAmount, description)
      setIsLoading(false)
      showToast({ message: `Deposit of $${depositAmount.toFixed(2)} successful!`, type: 'success' })
      setSelectedAccount(''); setAmount(''); setDescription('')
      setTimeout(() => navigate('/dashboard'), 1500)
    }, 1000)
  }

  const handleConfirm = () => { setShowConfirm(false); processDeposit(getRawAmount()) }

  const getAccountDisplay = (account) => `${account.type} (${account.accountNumber}) - $${account.balance.toFixed(2)}`

  const depositAmount = getRawAmount()

  return (
    <div className="py-8">
      <ConfirmModal
        isOpen={showConfirm}
        title="Confirm Large Deposit"
        message="You are about to make a large deposit. Please review the details below."
        details={[
          { label: 'To Account', value: (accounts.find(a => a.id === selectedAccount)?.type || '') + ' Account' },
          { label: 'Amount', value: `$${depositAmount.toFixed(2)}` },
          ...(description ? [{ label: 'Description', value: description }] : []),
        ]}
        confirmLabel="Confirm Deposit"
        confirmClass="bg-green-600 hover:bg-green-700 text-white"
        onConfirm={handleConfirm}
        onCancel={() => setShowConfirm(false)}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Deposit Money</h1>
        <p className="text-gray-600">Add funds to your account securely</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="card">
          <div className="text-center mb-8">
            <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
              <PlusCircle className="text-green-600" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Make a Deposit</h2>
            <p className="text-gray-600">Add money to your account</p>
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
                <option value="">Select account to deposit into</option>
                {accounts.map(account => (
                  <option key={account.id} value={account.id}>{getAccountDisplay(account)}</option>
                ))}
              </select>
            </div>

            <div className="form-group mb-2">
              <label htmlFor="amount" className="form-label">
                <DollarSign size={18} className="inline mr-2" />
                Deposit Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                <input
                  id="amount"
                  type="text"
                  inputMode="decimal"
                  className="form-input pl-7"
                  placeholder="0.00"
                  value={amount}
                  onChange={handleAmountChange}
                  required
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">Daily limit: $10,000</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {QUICK_AMOUNTS.map(val => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setQuickAmount(val)}
                  className="px-3 py-1.5 text-sm font-medium bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                >
                  ${val.toLocaleString('en-US')}
                </button>
              ))}
            </div>

            <div className="form-group mb-6">
              <label htmlFor="description" className="form-label">Description (Optional)</label>
              <input
                id="description"
                type="text"
                className="form-input"
                placeholder="What is this deposit for?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {selectedAccount && amount && (
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Deposit Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">To Account:</span>
                    <span className="font-medium">{accounts.find(acc => acc.id === selectedAccount)?.type} Account</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Deposit Amount:</span>
                    <span className="text-xl font-bold text-green-600">${depositAmount.toFixed(2)}</span>
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
              className="btn btn-primary w-full text-lg"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <PlusCircle size={20} className="mr-2" />
                  Deposit {amount ? `$${depositAmount.toFixed(2)}` : ''}
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
                  All deposits are processed securely with bank-grade encryption. 
                  This is a demo application - no real money will be deposited.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Deposit