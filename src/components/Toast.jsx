import React, { createContext, useContext, useState, useCallback } from 'react'
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react'

const ToastContext = createContext()

export const useToast = () => useContext(ToastContext)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback(({ message, type = 'success' }) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000)
  }, [])

  const dismiss = (id) => setToasts(prev => prev.filter(t => t.id !== id))

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 pointer-events-none">
        {toasts.map(toast => (
          <ToastItem key={toast.id} toast={toast} onDismiss={() => dismiss(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

const STYLES = {
  success: { bg: 'bg-green-500', icon: <CheckCircle size={20} /> },
  error:   { bg: 'bg-red-500',   icon: <XCircle size={20} /> },
  warning: { bg: 'bg-yellow-500',icon: <AlertTriangle size={20} /> },
  info:    { bg: 'bg-blue-500',  icon: <Info size={20} /> },
}

function ToastItem({ toast, onDismiss }) {
  const { bg, icon } = STYLES[toast.type] || STYLES.info
  return (
    <div
      className={`${bg} text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 min-w-72 max-w-sm pointer-events-auto`}
      style={{ animation: 'slideInRight 0.25s ease-out' }}
    >
      {icon}
      <span className="flex-1 font-medium text-sm">{toast.message}</span>
      <button onClick={onDismiss} className="hover:opacity-75 transition-opacity ml-1">
        <X size={16} />
      </button>
    </div>
  )
}
