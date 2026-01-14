import React, { useState } from 'react'
import { FiFacebook, FiInstagram, FiTwitter, FiPhone, FiMapPin, FiMail, FiSend } from 'react-icons/fi'

function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!/\S+@\S+\.\S+/.test(email)) {
      setStatus('error')
      return
    }
    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
      setEmail('')
    }, 800)
  }

  return (
    <footer className="bg-gray-900 text-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-2xl font-bold">ecart</h4>
          <p className="text-sm text-gray-300 mt-3">Curated products, fast shipping and friendly support — everything you need in one place.</p>
          <div className="flex gap-3 mt-4">
            <a aria-label="Facebook" className="p-2 rounded bg-gray-800 hover:bg-indigo-600 transition" href="#">
              <FiFacebook className="text-xl" />
            </a>
            <a aria-label="Instagram" className="p-2 rounded bg-gray-800 hover:bg-pink-500 transition" href="#">
              <FiInstagram className="text-xl" />
            </a>
            <a aria-label="Twitter" className="p-2 rounded bg-gray-800 hover:bg-sky-500 transition" href="#">
              <FiTwitter className="text-xl" />
            </a>
          </div>
        </div>

        <div>
          <h5 className="font-semibold">Quick Links</h5>
          <ul className="mt-3 space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">Collections</a></li>
            <li><a href="#" className="hover:text-white">About</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        <div>
          <h5 className="font-semibold">Support</h5>
          <ul className="mt-3 space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white">Help Center</a></li>
            <li><a href="#" className="hover:text-white">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms</a></li>
          </ul>
        </div>

        <div>
          <h5 className="font-semibold">Contact</h5>
          <div className="mt-3 text-sm text-gray-300 space-y-2">
            <div className="flex items-center gap-2"><FiMapPin /> <span>123 Market St, City, Country</span></div>
            <div className="flex items-center gap-2"><FiPhone /> <span>+1 (555) 123-4567</span></div>
            <div className="flex items-center gap-2"><FiMail /> <span>support@shoply.com</span></div>
          </div>

          <form onSubmit={handleSubscribe} className="mt-4 flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="flex-1 px-3 py-2 rounded bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none"
            />
            <button type="submit" className="px-4 py-2 bg-indigo-600 rounded flex items-center gap-2">
              {status === 'loading' ? 'Sending...' : 'Join'} <FiSend />
            </button>
          </form>

          <div className="mt-2 text-sm">
            {status === 'success' && <span className="text-green-400">Thanks for subscribing!</span>}
            {status === 'error' && <span className="text-red-400">Please enter a valid email.</span>}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <div>© {new Date().getFullYear()} ecart — All rights reserved.</div>
          <div className="mt-2 md:mt-0">Made with ❤️ · <a href="#" className="hover:text-white">Terms</a> · <a href="#" className="ml-2 hover:text-white">Privacy</a></div>
        </div>
      </div>
    </footer>
  )
}

export default Footer