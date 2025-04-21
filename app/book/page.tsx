'use client';

import { useRouter } from 'next/navigation';
import Form from '../../components/Form';
import { FaArrowLeft } from 'react-icons/fa';

export default function BookingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <button 
          onClick={() => router.push('/')}
          className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-8 group transition-all duration-300"
        >
          <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="text-lg">Back to Home</span>
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 text-transparent bg-clip-text mb-4 animate-fade-in-up">
              Book Your Mentorship Session
            </h1>
            <p className="text-xl text-gray-600 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Take the first step towards your dream rank. Fill out the form below to schedule your free trial session.
            </p>
          </div>
          
          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
} 