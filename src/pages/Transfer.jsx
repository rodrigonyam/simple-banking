import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../App'
import { useToast } from '../components/Toast'
import ConfirmModal from '../components/ConfirmModal'
import { ArrowRight, DollarSign, AlertCircle, CreditCard } from 'lucide-react'

const CONFIRM_THRESHOLD = 200

function Transfer() {
  const { user, transfer } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [fromAccount, setFromAccount] = useState('')
  const [toAccount, setToAccount] = useState('')
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

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    const transferAmount = getRawAmount()
    if (!fromAccount || !toAccount || !amount) { setError('Please fill in all required fields'); return }
    if (fromAccount === toAccount) { setError('Please select different accounts for transfer'); return }
    if (isNaN(transferAmount) || transferAmount <= 0) { setError('Please enter a valid amount greater than 0'); return }
    const sourceAccount = accounts.find(acc => acc.id === fromAccount)
    if (sourceAccount && transferAmount > sourceAccount.balance) { setError('Insufficient funds in the source account'); return }
    if (transferAmount >= CONFIRM_THRESHOLD) { setShowConfirm(true); return }
    processTransfer(transferAmount)
  }

  const processTransfer = (transferAmount) => {
    setIsLoading(true)
    setTimeout(() => {
      transfer(fromAccount, toAccount, transferAmount, description)
      setIsLoading(false)
      showToast({ message: `Transfer of $${transferAmount.toFixed(2)} successful!`, type: 'success' })
      setFromAccount(''); setToAccount(''); setAmount(''); setDescription('')
      setTimeout(() => navigate('/dashboard'), 1500)
    }, 1000)
  }

  const handleConfirm = () => { setShowConfirm(false); processTransfer(getRawAmount()) }

  const getAccountDisplay = (account) => `${account.type} (${account.accountNumber}) - $${account.balance.toFixed(2)}`

  const transferAmount = getRawAmount()
  const fromAcct = accounts.find(acc => acc.id === fromAccount)
  const toAcct = accounts.find(acc => acc.id === toAccount)

  return (
    <div className="py-8">
      <ConfirmModal
        isOpen={showConfirm}
        title="Confirm Transfer"
        message="You are about to transfer funds between accounts. Please review the details below."
        details={[
          { label: 'From', value: (fromAcct?.type || '') + ' Account' },
          { label: 'To', value: (toAcct?.type || '') + ' Account' },
          { label: 'Amount', value: `$${transferAmount.toFixed(2)}` },
          ...(description ? [{ label: 'Description', value: description }] : []),
        ]}
        confirmLabel="Confirm Transfer"
        confirmClass="bg-blue-600 hover:bg-blue-700 text-white"
        onConfirm={handleConfirm}
        onCancel={() => setShowConfirm(false)}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Transfer Money</h1>
        <p className="text-gray-600">Transfer funds between your accounts instantly</p>
      </div>

      <div className="max-w-2xl mx-auto">
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
                    <option key={account.id} value={account.id}>{getAccountDisplay(account)}</option>
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
                  {accounts
                    .filter(account => account.id !== fromAccount)
                    .map(account => (
                      <option key={account.id} value={account.id}>{getAccountDisplay(account)}</option>
                    ))}
                </select>
              </div>
            </div>

            <div className="form-group mb-6">
              <label htmlFor="amount" className="form-label">
                <DollarSign size={18} className="inline mr-2" />
                Amount
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
            </div>

            <div className="form-group mb-6">
              <label htmlFor="description" className="form-label">Description (Optional)</label>
              <input
                id="description"
                type="text"
                className="form-input"
                placeholder="What is this transfer for?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {fromAccount && toAccount && amount && (
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Transfer Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">From:</span>
                    <span className="font-medium">{fromAcct?.type} Account</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">To:</span>
                    <span className="font-medium">{toAcct?.type} Account</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="text-xl font-bold text-blue-600">${transferAmount.toFixed(2)}</span>
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
                  Processing...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <ArrowRight size={20} className="mr-2" />
                  Transfer {amount ? `$${transferAmount.toFixed(2)}` : ''}
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
                  This is a demo application — no real money will be transferred.
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
