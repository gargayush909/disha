'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface FormProps {
  mentorId?: string;
  mentorName?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  class: string;
  targetExam: string;
  guidanceTypes: string[];
  date: Date | null;
  time: string;
  message: string;
}

export default function Form({ mentorId, mentorName }: FormProps) {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Value>(new Date());
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    class: '',
    targetExam: '',
    guidanceTypes: [],
    date: null,
    time: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const timeSlots = [
    { id: 'morning', label: 'Morning (9:00 AM - 12:00 PM)' },
    { id: 'afternoon', label: 'Afternoon (12:00 PM - 4:00 PM)' },
    { id: 'evening', label: 'Evening (4:00 PM - 8:00 PM)' }
  ];

  const guidanceOptions = [
    'Study Planning',
    'Doubt Solving',
    'Test Series Discussion',
    'Previous Year Papers',
    'Strategy Building',
    'Mental Preparation'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (value: Value) => {
    setDate(value);
    // If value is a Date, use it. If it's an array, use the first date. Otherwise, use null.
    const selectedDate = value instanceof Date ? value : Array.isArray(value) ? value[0] : null;
    setFormData({ ...formData, date: selectedDate });
  };

  const handleGuidanceChange = (type: string) => {
    setFormData(prev => ({
      ...prev,
      guidanceTypes: prev.guidanceTypes.includes(type)
        ? prev.guidanceTypes.filter(t => t !== type)
        : [...prev.guidanceTypes, type]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Send confirmation email
      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentName: formData.name,
          studentEmail: formData.email,
          mentorName: mentorName || 'Selected Mentor',
          date: formData.date?.toLocaleDateString(),
          time: formData.time,
          class: formData.class,
          targetExam: formData.targetExam,
          guidanceTypes: formData.guidanceTypes,
        }),
      });

      if (!emailResponse.ok) {
        throw new Error('Failed to send confirmation email');
      }

      setSuccess(true);
      setStep(3);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          name="name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          name="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          name="phone"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
        <select
          value={formData.class}
          onChange={handleInputChange}
          name="class"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          required
        >
          <option value="">Select your class</option>
          <option value="10th">10th</option>
          <option value="11th">11th</option>
          <option value="12th">12th</option>
          <option value="dropper">Dropper</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Target Exam</label>
        <select
          value={formData.targetExam}
          onChange={handleInputChange}
          name="targetExam"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          required
        >
          <option value="">Select target exam</option>
          <option value="JEE">JEE</option>
          <option value="NEET">NEET</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Type of Guidance Needed</label>
        <div className="grid grid-cols-2 gap-3">
          {guidanceOptions.map((type) => (
            <label key={type} className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={formData.guidanceTypes.includes(type)}
                onChange={() => handleGuidanceChange(type)}
                className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>
      <button
        onClick={() => setStep(2)}
        className="w-full bg-gradient-to-r from-orange-500 to-pink-600 text-white py-3 rounded-lg hover:shadow-lg transition-all duration-300"
      >
        Next
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
        <Calendar
          onChange={handleDateChange}
          value={date}
          minDate={new Date()}
          className="w-full max-w-md mx-auto bg-white rounded-lg shadow p-4"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time Slot</label>
        <div className="grid grid-cols-1 gap-3">
          {timeSlots.map((slot) => (
            <button
              key={slot.id}
              type="button"
              onClick={() => setFormData({ ...formData, time: slot.id })}
              className={`p-3 rounded-lg text-sm font-medium ${
                formData.time === slot.id
                  ? 'bg-gradient-to-r from-orange-500 to-pink-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {slot.label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Note: The exact timing will be confirmed by the mentor within your preferred time slot.
        </p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Additional Message (Optional)</label>
        <textarea
          value={formData.message}
          onChange={handleInputChange}
          name="message"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent h-32"
        />
      </div>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="w-1/2 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-all duration-300"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-1/2 bg-gradient-to-r from-orange-500 to-pink-600 text-white py-3 rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
        >
          {loading ? 'Booking...' : 'Book Session'}
        </button>
      </div>
      {error && (
        <p className="text-red-500 text-center">{error}</p>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <svg
          className="w-8 h-8 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-gray-900">Booking Confirmed!</h3>
      <p className="text-gray-600">
        Thank you for booking a session. We have sent a confirmation email to {formData.email}.
        Please check your inbox for further details.
      </p>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map((stepNumber) => (
            <div
              key={stepNumber}
              className={`flex items-center ${stepNumber < 3 ? 'flex-1' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= stepNumber
                    ? 'bg-gradient-to-r from-orange-500 to-pink-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    step > stepNumber ? 'bg-gradient-to-r from-orange-500 to-pink-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Personal Details</span>
          <span>Schedule</span>
          <span>Confirmation</span>
        </div>
      </div>

      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
    </div>
  );
}
