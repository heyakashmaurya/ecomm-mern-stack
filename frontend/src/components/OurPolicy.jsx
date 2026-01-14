import React from 'react'
import Title from './Title'
import { FiShield, FiTruck, FiRefreshCcw, FiInfo } from 'react-icons/fi'

const policies = [
  {
    icon: <FiShield className="text-2xl text-indigo-600" />,
    title: 'Privacy Policy',
    desc: 'We collect minimal personal data and use industry-standard measures to protect it. Your data will never be sold.'
  },
  {
    icon: <FiTruck className="text-2xl text-green-600" />,
    title: 'Shipping Policy',
    desc: 'Orders are processed within 1-2 business days. Shipping times vary by destination and chosen carrier.'
  },
  {
    icon: <FiRefreshCcw className="text-2xl text-red-500" />,
    title: 'Return & Refund',
    desc: 'Returns accepted within 14 days of delivery. Refunds processed after item inspection.'
  },
  {
    icon: <FiInfo className="text-2xl text-yellow-600" />,
    title: 'Terms & Conditions',
    desc: 'Use of the site is subject to our terms. Please read them carefully before making purchases.'
  }
]

function OurPolicy() {
  return (
    <div className="max-h-screen flex flex-col items-center py-20 gap-10 bg-gray-50">
      <div className="w-full text-center">
        <Title title1={"Our"} title2={"Policy"} />
      </div>

      <div className="w-[92%] max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {policies.map((p, idx) => (
          <div key={idx} className="flex gap-4 p-6 bg-white rounded-lg shadow-sm items-start">
            <div className="w-12 h-12 flex items-center justify-center bg-indigo-50 rounded-full">
              {p.icon}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OurPolicy
