'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type FormStep = 'details' | 'schedule' | 'payment' | 'confirmation';

type TimeSlot = {
  id: string;
  label: string;
  range: string;
};

export default function Form() {
  const [step, setStep] = useState<FormStep>('details');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    exam: '',
    class: '',
    preferences: [] as string[],
    date: new Date(),
    timeSlot: '',
  });

  const timeSlots: TimeSlot[] = [
    {
      id: 'morning',
      label: 'Morning',
      range: '8:00 AM - 12:00 PM'
    },
    {
      id: 'afternoon',
      label: 'Afternoon',
      range: '12:00 PM - 5:00 PM'
    },
    {
      id: 'evening',
      label: 'Evening',
      range: '5:00 PM - 10:00 PM'
    }
  ];

  const handleCheckboxChange = (value: string) => {
    setFormData(prev => {
      const newPrefs = prev.preferences.includes(value)
        ? prev.preferences.filter(v => v !== value)
        : [...prev.preferences, value];
      return { ...prev, preferences: newPrefs };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'details') {
      setStep('schedule');
    } else if (step === 'schedule') {
      setStep('payment');
    } else if (step === 'payment') {
      setStep('confirmation');
      sendConfirmation();
    }
  };

  const sendConfirmation = () => {
    console.log('Sending confirmation...');
  };

  const renderDetailsForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-2">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full px-4 py-3 text-lg text-gray-900 placeholder-gray-500 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-2">Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 text-lg text-gray-900 placeholder-gray-500 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-2">Mobile Number</label>
          <input
            type="tel"
            placeholder="Enter WhatsApp number"
            className="w-full px-4 py-3 text-lg text-gray-900 placeholder-gray-500 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-2">Gender</label>
          <select
            className="w-full px-4 py-3 text-lg text-gray-900 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-2">Target Exam</label>
          <select
            className="w-full px-4 py-3 text-lg text-gray-900 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
            value={formData.exam}
            onChange={(e) => setFormData({ ...formData, exam: e.target.value })}
            required
          >
            <option value="">Select Target Exam</option>
            <option value="jee">JEE</option>
            <option value="neet">NEET</option>
          </select>
        </div>
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-2">Current Class</label>
          <select
            className="w-full px-4 py-3 text-lg text-gray-900 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
            value={formData.class}
            onChange={(e) => setFormData({ ...formData, class: e.target.value })}
            required
          >
            <option value="">Select Current Class</option>
            <option value="10">10th</option>
            <option value="11">11th</option>
            <option value="12">12th</option>
            <option value="dropper">Dropper</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-lg font-semibold text-gray-900 mb-4">Mentorship Preferences</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['Time Management', 'Motivation & Confidence', 'Concept Clarity', 'Syllabus Coverage', 'Exam Strategy', 'Other'].map((label) => (
            <label key={label} className="flex items-center space-x-3 p-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition cursor-pointer">
              <input
                type="checkbox"
                checked={formData.preferences.includes(label)}
                onChange={() => handleCheckboxChange(label)}
                className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
              />
              <span className="text-lg text-gray-900">{label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderScheduling = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Select Date</h3>
        <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
          <Calendar
            onChange={(date) => setFormData({ ...formData, date: date as Date })}
            value={formData.date}
            minDate={new Date()}
            className="w-full text-lg"
          />
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Select Preferred Time Slot</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {timeSlots.map((slot) => (
            <button
              key={slot.id}
              type="button"
              onClick={() => setFormData({ ...formData, timeSlot: slot.id })}
              className={`p-4 rounded-lg border-2 text-left space-y-1 ${
                formData.timeSlot === slot.id
                  ? 'bg-orange-50 border-orange-500 ring-2 ring-orange-500'
                  : 'border-gray-300 hover:border-orange-500'
              } transition-all duration-200`}
            >
              <div className="text-lg font-semibold text-gray-900">{slot.label}</div>
              <div className="text-gray-600">{slot.range}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPayment = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Booking Summary</h3>
        <div className="space-y-4">
          <div className="flex justify-between text-lg">
            <span className="text-gray-600">Mentorship Session</span>
            <span className="text-gray-900 font-semibold">₹149</span>
          </div>
          <div className="flex justify-between text-lg">
            <span className="text-gray-600">Date</span>
            <span className="text-gray-900 font-semibold">{formData.date.toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between text-lg">
            <span className="text-gray-600">Time Slot</span>
            <span className="text-gray-900 font-semibold">
              {timeSlots.find(slot => slot.id === formData.timeSlot)?.range || ''}
            </span>
          </div>
          <div className="pt-4 border-t-2">
            <div className="flex justify-between text-lg font-semibold">
              <span className="text-gray-900">Total Amount</span>
              <span className="text-gray-900">₹149</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className="text-center space-y-6">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-2xl font-semibold text-gray-900">Booking Confirmed!</h3>
      <p className="text-lg text-gray-600">
        We've sent the confirmation details to your email and WhatsApp.
        <br />
        You'll receive a reminder 24 hours before your session.
      </p>
      <div className="pt-4">
        <button
          type="button"
          className="text-lg text-orange-500 hover:text-orange-600 font-semibold"
          onClick={() => window.location.href = 'mailto:support@disha.com'}
        >
          Need support? Contact us
        </button>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {step === 'details' && renderDetailsForm()}
      {step === 'schedule' && renderScheduling()}
      {step === 'payment' && renderPayment()}
      {step === 'confirmation' && renderConfirmation()}
      
      {step !== 'confirmation' && (
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-pink-600 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:from-orange-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          {step === 'details' && 'Continue to Schedule'}
          {step === 'schedule' && 'Proceed to Payment'}
          {step === 'payment' && 'Pay ₹149'}
        </button>
      )}
    </form>
  );
}
