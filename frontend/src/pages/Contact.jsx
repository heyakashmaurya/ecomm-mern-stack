import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi'
import NewsLetter from '../components/NewsLetter'
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import { userDataContext } from '../context/UserContext';



const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const {userData} = useContext(userDataContext);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    // Handle form submission logic here
   try {
    if(!userData){
      toast.error("Please login to send a message");
      setLoading(false);
      return;
    }
   await new Promise((resolve) => setTimeout(resolve, 1500));
      setFormData({
      name: '',
      email: '',
      subject: '',
      message: '' 
    })
      toast.success("Message sent successfully!");
    setLoading(false);
   } catch (error) {
    toast.error("Failed to send message");
   }finally{
    setLoading(false)
   }
  

  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      {/* Page Title */}
      <div className="text-center mb-8">
        <Title title1={"CONTACT"} title2={"US"} />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
        
        {/* Left Side: Contact Information */}
        <div className="w-full lg:w-1/3 flex flex-col gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Get in Touch</h3>
            <p className="text-gray-600">Have a question or feedback? We would love to hear from you. Our team typically responds within 24 hours.</p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-sm text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <FiPhone className="text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-gray-800">+1 (555) 000-0000</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-sm text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <FiMail className="text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-800">support@yourbrand.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-sm text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <FiMapPin className="text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium text-gray-800">54709 Willms Station, Washington, USA</p>
              </div>
            </div>
          </div>

          <div className="mt-4 p-6 bg-indigo-50 rounded-xl border border-indigo-100">
            <h4 className="font-bold text-indigo-900 mb-1">Careers at OurBrand</h4>
            <p className="text-sm text-indigo-700">Learn more about our teams and job openings.</p>
            <button className="mt-4 px-6 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-600 hover:text-white transition-all text-sm font-medium">
              Explore Jobs
            </button>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="w-full lg:w-2/3 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Your Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  value={formData.name}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <input 
                  type="email"
                  value={formData.email} 
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Subject</label>
              <input 
                type="text" 
                value={formData.subject}
                placeholder="How can we help?"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Message</label>
              <textarea 
                value={formData.message}
                rows="5" 
                placeholder="Write your message here..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
              ></textarea>
            </div>

            <button
  type="submit"
  disabled={loading}
  className={`flex items-center justify-center gap-2 py-4 rounded-lg font-semibold transition-all
    ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}
  `}
>
  {loading ? <Loading /> : <>
    <FiSend /> Send Message
  </>}
</button>
          </form>
        </div>

      </div>
      <NewsLetter />
    </div>
  )
}

export default Contact