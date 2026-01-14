import React, { useState } from 'react'
import { FiMail, FiSend, FiCheck } from 'react-icons/fi'

function NewsLetter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  const handleSubmit = (e) => {
    e.preventDefault()
    const valid = /\S+@\S+\.\S+/.test(email)
    if (!valid) {
      setStatus('error')
      return
    }
    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
      setEmail('')
    }, 700)
  }

  return (
    <div className="w-full flex flex-col items-center py-12 bg-gradient-to-r from-indigo-50 to-white">
      <div className="w-[92%] max-w-3xl bg-white p-6 rounded-lg shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-100 rounded-md">
            <FiMail className="text-indigo-600 text-2xl" />
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold">Join our Newsletter</h3>
          <p className="text-sm text-gray-600">Get updates on new products, offers and exclusive deals.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex w-full md:w-auto gap-2">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            type="email"
            className="border rounded px-3 py-2 w-full md:w-64 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded flex items-center gap-2"
            aria-live="polite"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            <FiSend />
          </button>
        </form>
      </div>

      <div className="mt-4">
        {status === 'success' && (
          <div className="text-green-600 flex items-center gap-2">
            <FiCheck /> Subscribed! Check your inbox.
          </div>
        )}
        {status === 'error' && (
          <div className="text-red-600">Please enter a valid email address.</div>
        )}
      </div>
    </div>
  )
}

export default NewsLetter
