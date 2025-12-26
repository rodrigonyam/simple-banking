import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../App'
import { Lock, CreditCard, AlertCircle, Hash } from 'lucide-react'

function Login() {
  const [accountNumber, setAccountNumber] = useState('')
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const result = login(accountNumber, pin)
    
    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.error)
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        </div>
        <div className="relative container mx-auto px-6 py-16">
          <div className="text-center text-white">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
                <CreditCard size={48} className="text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Simple Banking
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Secure, Fast, and Modern Banking at Your Fingertips
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="bg-white/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Lock size={32} className="text-blue-200" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Secure Banking</h3>
                <p className="text-blue-200 text-sm">Bank-grade security with PIN protection</p>
              </div>
              <div className="text-center">
                <div className="bg-white/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Hash size={32} className="text-purple-200" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Instant Access</h3>
                <p className="text-blue-200 text-sm">Quick PIN-based authentication</p>
              </div>
              <div className="text-center">
                <div className="bg-white/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <CreditCard size={32} className="text-green-200" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Full Banking</h3>
                <p className="text-blue-200 text-sm">All banking operations in one place</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100">
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-4 w-16 h-16 mx-auto mb-4 shadow-lg">
                  <Lock className="text-white" size={32} />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  Welcome Back
                </h2>
                <p className="text-gray-600">Enter your credentials to access your account</p>
              </div>

<div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 mb-6">
                <div className="flex items-center mb-3">
                  <div className="bg-blue-500 rounded-full p-2 mr-3">
                    <CreditCard size={16} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-blue-800">Demo Account</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-700 font-medium">Account Number:</span>
                    <code className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg font-mono text-sm">1234567890</code>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-700 font-medium">PIN:</span>
                    <code className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg font-mono text-sm">1234</code>
                  </div>
                </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded p-4 mb-4">
              <div className="flex items-center">
                <AlertCircle className="text-red-500 mr-2" size={20} />
                <span className="text-red-700">{error}</span>
              </div>
            </div>
          )}

<form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-group">
                  <label htmlFor="accountNumber" className="form-label text-gray-700 font-semibold">
                    <CreditCard size={18} className="inline mr-2 text-blue-600" />
                    Account Number
                  </label>
                  <input
                    id="accountNumber"
                    type="text"
                    className="form-input border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 rounded-xl transition-all duration-200"
                    placeholder="Enter your 10-digit account number"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    required
                    maxLength="10"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="pin" className="form-label text-gray-700 font-semibold">
                    <Hash size={18} className="inline mr-2 text-purple-600" />
                    PIN
                  </label>
                  <input
                    id="pin"
                    type="password"
                    className="form-input border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 rounded-xl transition-all duration-200"
                    placeholder="Enter your 4-digit PIN"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    required
                    maxLength="4"
                    pattern="[0-9]{4}"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Signing In...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Lock size={20} className="mr-2" />
                      Access My Account
                    </div>
                  )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Secure banking with 256-bit SSL encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login