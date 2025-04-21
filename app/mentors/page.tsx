'use client';

import { useState } from 'react';
import { FaSearch, FaArrowLeft, FaStar, FaGraduationCap, FaAward } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Mentor type definition
type Mentor = {
  id: string;
  name: string;
  image: string;
  qualification: string;
  expertise: string[];
  rating: number;
  reviews: number;
  students: number;
  rank: string;
  bio: string;
};

const mentors: Mentor[] = [
  {
    id: "1",
    name: "Dr. Rajesh Kumar",
    image: "https://i.pravatar.cc/300?img=11",
    qualification: "IIT Delhi, Ph.D. in Physics",
    expertise: ["JEE Physics", "JEE Mathematics", "Olympiad"],
    rating: 4.9,
    reviews: 245,
    students: 1200,
    rank: "IIT-JEE AIR 42",
    bio: "Former IIT professor with 15+ years of teaching experience. Specialized in helping students crack JEE Advanced Physics."
  },
  {
    id: "2",
    name: "Dr. Priya Sharma",
    image: "https://i.pravatar.cc/300?img=12",
    qualification: "AIIMS Delhi, MD",
    expertise: ["NEET Biology", "NEET Chemistry"],
    rating: 4.8,
    reviews: 189,
    students: 950,
    rank: "NEET AIR 15",
    bio: "NEET expert with proven track record. Helped over 500 students secure medical seats in top colleges."
  },
  {
    id: "3",
    name: "Amit Verma",
    image: "https://i.pravatar.cc/300?img=13",
    qualification: "IIT Bombay, M.Tech",
    expertise: ["JEE Chemistry", "JEE Mathematics"],
    rating: 4.9,
    reviews: 156,
    students: 800,
    rank: "IIT-JEE AIR 128",
    bio: "Passionate about making complex concepts simple. Specialized in helping students overcome their fear of Chemistry."
  },
  // Add more mentors as needed
];

export default function MentorsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState<string>('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.qualification.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesExpertise = !selectedExpertise || mentor.expertise.includes(selectedExpertise);
    return matchesSearch && matchesExpertise;
  });

  const allExpertise = Array.from(new Set(mentors.flatMap(mentor => mentor.expertise)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button 
          onClick={() => router.push('/')}
          className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-8 group transition-all duration-300"
        >
          <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="text-lg">Back to Home</span>
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 text-transparent bg-clip-text mb-4">
            Explore Our Expert Mentors
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find the perfect mentor who understands your goals and can guide you to success.
          </p>
        </div>

        {/* Enhanced Search and Filter Section */}
        <div className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-center">
          <div className="relative w-full md:w-[32rem] animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className={`relative bg-white rounded-2xl shadow-xl transition-all duration-500 p-1 ${isSearchFocused ? 'shadow-2xl' : ''}`}>
              <div className={`absolute inset-0 bg-gradient-to-r from-orange-500/20 to-pink-600/20 rounded-2xl blur-xl transition-all duration-500 ${isSearchFocused ? 'blur-2xl' : ''}`}></div>
              <div className="relative bg-white rounded-xl overflow-hidden">
                <div className="flex items-center gap-4 p-3">
                  <div className={`flex-shrink-0 w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-600 rounded-xl flex items-center justify-center text-white shadow-lg transition-transform duration-500 ${isSearchFocused ? 'scale-110' : ''}`}>
                    <FaSearch className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by name or qualification..."
                    className="w-full text-lg text-gray-700 placeholder-gray-400 bg-transparent border-none focus:outline-none focus:ring-0"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                  />
                  <div className="flex items-center gap-2 text-sm text-gray-400 pr-2">
                    <kbd className="px-2 py-1 bg-gray-100 rounded-lg">⌘</kbd>
                    <kbd className="px-2 py-1 bg-gray-100 rounded-lg">K</kbd>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <select
            className="w-full md:w-auto px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all bg-white text-gray-700 font-medium shadow-md hover:shadow-lg animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
            value={selectedExpertise}
            onChange={(e) => setSelectedExpertise(e.target.value)}
          >
            <option value="">All Subjects</option>
            {allExpertise.map(expertise => (
              <option key={expertise} value={expertise}>{expertise}</option>
            ))}
          </select>
        </div>

        {/* Mentors Grid with Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMentors.map((mentor, index) => (
            <div 
              key={mentor.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              <div className="relative h-48">
                <Image
                  src={mentor.image}
                  alt={mentor.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{mentor.name}</h3>
                    <p className="text-gray-600">{mentor.qualification}</p>
                  </div>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="font-semibold">{mentor.rating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {mentor.expertise.map((exp, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm"
                    >
                      {exp}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4 text-center text-sm">
                  <div>
                    <div className="font-semibold text-gray-900">{mentor.students}+</div>
                    <div className="text-gray-600">Students</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{mentor.reviews}</div>
                    <div className="text-gray-600">Reviews</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{mentor.rank}</div>
                    <div className="text-gray-600">Rank</div>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 line-clamp-2">{mentor.bio}</p>

                <button
                  onClick={() => router.push(`/book?mentor=${mentor.id}`)}
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300"
                >
                  Book Session
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 