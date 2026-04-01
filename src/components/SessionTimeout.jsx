import React, { useEffect, useRef, useState } from 'react'
import { Clock } from 'lucide-react'
import { useAuth } from '../App'

const IDLE_MS = 5 * 60 * 1000   // 5 minutes
const WARN_MS = 30 * 1000        // warn 30 s before logout

function SessionTimeout() {
  const { isAuthenticated, logout } = useAuth()
  const [showWarning, setShowWarning] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(30)

  const idleTimer    = useRef(null)
  const warnTimer    = useRef(null)
  const countdown    = useRef(null)
  const resetRef     = useRef(null)

  useEffect(() => {
    if (!isAuthenticated) {
      clearAll()
      setShowWarning(false)
      return
    }

    const reset = () => {
      clearAll()
      setShowWarning(false)

      warnTimer.current = setTimeout(() => {
        setShowWarning(true)
        setSecondsLeft(30)
        countdown.current = setInterval(() => {
          setSecondsLeft(s => s - 1)
        }, 1000)
      }, IDLE_MS - WARN_MS)

      idleTimer.current = setTimeout(() => {
        logout()
      }, IDLE_MS)
    }

    resetRef.current = reset

    const events = ['mousedown', 'mousemove', 'keydown', 'touchstart', 'scroll']
    events.forEach(e => window.addEventListener(e, reset, { passive: true }))
    reset()

    return () => {
      events.forEach(e => window.removeEventListener(e, reset))
      clearAll()
    }
  }, [isAuthenticated, logout])

  function clearAll() {
    clearTimeout(idleTimer.current)
    clearTimeout(warnTimer.current)
    clearInterval(countdown.current)
  }

  if (!showWarning) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 z-10 text-center">
        <div className="bg-yellow-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <Clock className="text-yellow-600" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Session Expiring</h2>
        <p className="text-gray-600 mb-4">
          You've been inactive. Your session will expire in:
        </p>
        <div className="text-6xl font-bold text-red-500 mb-6 tabular-nums">{secondsLeft}s</div>
        <div className="flex gap-3">
          <button
            onClick={() => logout()}
            className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
          >
            Log Out
          </button>
          <button
            onClick={() => resetRef.current?.()}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
          >
            Stay Logged In
          </button>
        </div>
      </div>
    </div>
  )
}

export default SessionTimeout
