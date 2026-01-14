import React from 'react'
import Title from '../components/Title'
import { FiCheckCircle, FiClock, FiUsers } from 'react-icons/fi'
import NewsLetter from '../components/NewsLetter'

const About = () => {
  const reasons = [
    {
      icon: <FiCheckCircle className="text-3xl text-indigo-600 group-hover:text-white" />,
      title: 'Quality Assurance',
      desc: 'We meticulously select and vet each product to ensure it meets our stringent quality standards.'
    },
    {
      icon: <FiClock className="text-3xl text-indigo-600 group-hover:text-white" />,
      title: 'Convenience',
      desc: 'With our user-friendly interface and hassle-free ordering process, shopping has never been easier.'
    },
    {
      icon: <FiUsers className="text-3xl text-indigo-600 group-hover:text-white" />,
      title: 'Exceptional Service',
      desc: 'Our team of dedicated professionals is here to assist you every step of the way.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="text-center mb-8">
        <Title title1={"ABOUT"} title2={"US"} />
      </div>

      {/* Intro Section */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 mb-24">
        <div className="w-full md:w-1/2">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
            alt="Our Team" 
            className="rounded-lg shadow-sm w-full h-[400px] object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-6 text-gray-600 leading-relaxed">
          <p>
            Welcome to our platform. Our journey began with a simple mission: to bridge the gap between quality and affordability. We believe that everyone deserves access to products that enhance their lifestyle.
          </p>
          <p>
            Since our inception, we have focused on customer-centric growth, ensuring that every update and every product added brings value to your daily routine.
          </p>
          <div className="pt-2">
            <h4 className="font-bold text-gray-800">Our Mission</h4>
            <p className="mt-1 italic">"To innovate, inspire, and provide excellence in every interaction."</p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-left">
          <Title title1={"WHY"} title2={"CHOOSE US"} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reasons.map((item, index) => (
            <div 
              key={index} 
              className="group p-8 bg-white border border-gray-100 rounded-xl shadow-sm hover:bg-indigo-600 hover:shadow-xl transition-all duration-300 flex flex-col gap-4"
            >
              <div className="p-3 w-fit rounded-lg bg-indigo-50 group-hover:bg-indigo-500 transition-colors">
                {item.icon}
              </div>
              <h4 className="font-bold text-lg text-gray-800 group-hover:text-white">
                {item.title}
              </h4>
              <p className="text-sm text-gray-600 group-hover:text-indigo-50 leading-6">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
      <NewsLetter />
    </div>
  )
}

export default About