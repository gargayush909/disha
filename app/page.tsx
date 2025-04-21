'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaGraduationCap, FaUsers, FaStar, FaClock, FaRocket, FaChalkboardTeacher, FaChevronDown, FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import AnimateOnScroll from './components/AnimateOnScroll';

export default function Home() {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Set initial window size
    if (typeof window !== 'undefined') {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  useSmoothScroll();

  const successStories = [
    {
      name: "Rahul Verma",
      exam: "JEE Advanced 2023",
      rank: "AIR 156",
      image: "https://i.pravatar.cc/150?img=1",
      quote: "The structured approach and personal attention from my mentor helped me improve my Physics score from 65 to 95. The weekly practice tests were game-changers."
    },
    {
      name: "Sneha Patel",
      exam: "NEET 2023",
      rank: "AIR 342",
      image: "https://i.pravatar.cc/150?img=2",
      quote: "My mentor's strategy for Biology section helped me maximize my score. The detailed analysis of previous year papers was invaluable."
    },
    {
      name: "Arjun Singh",
      exam: "JEE Mains 2023",
      rank: "AIR 445",
      image: "https://i.pravatar.cc/150?img=3",
      quote: "The personalized study plan and weekly doubt-clearing sessions helped me stay consistent throughout my preparation."
    }
  ];

  const testimonials = [
    {
      name: "Kavita Sharma",
      relation: "Parent",
      image: "https://i.pravatar.cc/150?img=4",
      quote: "The mentorship program provided the guidance my daughter needed. The mentors are not just teachers but motivators who understand student psychology."
    },
    {
      name: "Dr. Amit Kumar",
      relation: "Education Expert",
      image: "https://i.pravatar.cc/150?img=5",
      quote: "The program's approach to personalized mentoring sets it apart. The focus on conceptual clarity rather than rote learning is commendable."
    },
    {
      name: "Riya Desai",
      relation: "Current Student",
      image: "https://i.pravatar.cc/150?img=6",
      quote: "The flexibility to choose mentors and scheduling sessions according to my convenience has made preparation much easier."
    }
  ];

  const features = [
    {
      icon: <FaChalkboardTeacher className="w-8 h-8" />,
      title: "1:1 Personalized Mentorship",
      description: "Get undivided attention from top IIT/NEET mentors who understand your unique needs"
    },
    {
      icon: <FaRocket className="w-8 h-8" />,
      title: "Strategic Preparation",
      description: "Custom study plans and strategies tailored to your current level and target goals"
    },
    {
      icon: <FaClock className="w-8 h-8" />,
      title: "Flexible Scheduling",
      description: "Book sessions at your convenience, morning to evening slots available"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Students Mentored" },
    { number: "95%", label: "Success Rate" },
    { number: "500+", label: "Expert Mentors" },
    { number: "4.9/5", label: "Average Rating" }
  ];

  const scrollToContent = () => {
    const statsSection = document.querySelector('#stats-section');
    if (statsSection) {
      statsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBooking = () => {
    router.push('/book');
  };

  const renderStats = () => (
    <section id="stats-section" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <AnimateOnScroll key={index} delay={index * 100}>
              <div className="text-center">
                <h3 className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">{stat.number}</h3>
                <p className="text-gray-600 text-lg">{stat.label}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );

  const renderFeatures = () => (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-pink-50">
      <div className="container mx-auto px-4">
        <AnimateOnScroll>
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
            Why Choose Our Mentorship?
          </h2>
        </AnimateOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <AnimateOnScroll key={index} delay={index * 200}>
              <div className="premium-card p-8">
                <div className="text-orange-500 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );

  const renderSuccessStories = () => (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-pink-50">
      <div className="container mx-auto px-4">
        <AnimateOnScroll>
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
            Recent Success Stories
          </h2>
        </AnimateOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {successStories.map((story, index) => (
            <AnimateOnScroll key={index} delay={index * 200}>
              <div className="premium-card p-8">
                <div className="flex items-center mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                    <Image
                      src={story.image}
                      alt={story.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{story.name}</h3>
                    <p className="text-orange-600">{story.exam}</p>
                    <p className="text-pink-600 font-semibold">{story.rank}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">&quot;{story.quote}&quot;</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-pink-50 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Shapes */}
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                transform: windowSize.width ? `translate(${
                  (mousePosition.x - windowSize.width / 2) / (i + 5) / 2
                }px, ${
                  (mousePosition.y - windowSize.height / 2) / (i + 5) / 2
                }px)` : 'none',
                willChange: 'transform',
              }}
            >
              <div 
                className={`rounded-full blur-sm ${
                  i % 3 === 0 
                    ? 'w-6 h-6 bg-gradient-to-r from-orange-200 to-pink-200 opacity-20' 
                    : i % 3 === 1 
                    ? 'w-4 h-4 bg-gradient-to-r from-pink-200 to-orange-200 opacity-15'
                    : 'w-8 h-8 bg-gradient-to-r from-orange-100 to-pink-100 opacity-10'
                }`}
              ></div>
            </div>
          ))}
          
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 bg-grid-pattern opacity-5"
            style={{
              transform: `translateY(${scrollY * 0.1}px) rotate(${scrollY * 0.02}deg)`,
            }}
          ></div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Decorative Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-full blur-3xl transform rotate-45 animate-pulse"></div>
          </div>

          {/* Floating Decorative Icons */}
          <div className="absolute inset-0 pointer-events-none">
            <FaGraduationCap className="absolute top-1/4 left-1/4 text-orange-500/20 w-12 h-12 animate-float" style={{ animationDelay: '0.5s' }} />
            <FaStar className="absolute top-1/3 right-1/4 text-pink-500/20 w-8 h-8 animate-float" style={{ animationDelay: '1.5s' }} />
            <FaRocket className="absolute bottom-1/4 right-1/3 text-orange-500/20 w-10 h-10 animate-float" style={{ animationDelay: '1s' }} />
          </div>

          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 text-transparent bg-clip-text animate-fade-in-up relative">
              Your Dream Rank Awaits
              <div className="absolute -right-8 top-0 w-6 h-6 bg-orange-500/20 rounded-full animate-ping"></div>
              <div className="absolute -left-4 bottom-0 w-4 h-4 bg-pink-500/20 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
              <div className="absolute right-1/4 top-1/2 w-3 h-3 bg-orange-500/20 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto animate-fade-in-up relative z-10" style={{ animationDelay: '0.3s' }}>
              Get personalized mentorship from IIT & NEET toppers who've been
              in your shoes and conquered these exams.
            </p>

            {/* Premium Search Bar */}
            <div className="max-w-2xl mx-auto w-full animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div 
                onClick={() => router.push('/mentors')}
                className="group cursor-pointer relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-pink-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-white rounded-xl p-4 flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <FaSearch className="w-5 h-5" />
                  </div>
                  <div className="flex-grow">
                    <div className="text-lg text-gray-400 group-hover:text-gray-600 transition-colors duration-300">Search for mentors...</div>
                    <div className="text-sm text-gray-400 mt-0.5">Find your perfect mentor by name, subject, or qualification</div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <kbd className="px-2 py-1 bg-gray-100 rounded-lg">⌘</kbd>
                    <kbd className="px-2 py-1 bg-gray-100 rounded-lg">K</kbd>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-fade-in-up relative group" style={{ animationDelay: '0.6s' }}>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-pink-600 rounded-lg blur opacity-30 group-hover:opacity-75 transition duration-300"></div>
              <button 
                onClick={handleBooking}
                className="relative inline-flex items-center bg-gradient-to-r from-orange-500 to-pink-600 text-white text-xl font-semibold px-8 py-4 rounded-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-auto"
              >
                <span className="relative z-10">Book Your Session Now</span>
              </button>
            </div>

            {/* Scroll Indicator - Repositioned */}
            <div 
              onClick={scrollToContent}
              className="mt-16 inline-flex flex-col items-center text-gray-500 cursor-pointer hover:text-orange-500 transition-colors duration-300 animate-bounce"
            >
              <span className="text-sm font-medium mb-2">Scroll to explore</span>
              <FaChevronDown className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Enhanced Decorative Corner Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-500/5 to-pink-500/5 rounded-bl-full transform -translate-x-1/4 translate-y-1/4 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-500/5 to-orange-500/5 rounded-tr-full transform translate-x-1/4 -translate-y-1/4 blur-3xl"></div>
        
        {/* Additional Decorative Elements */}
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-orange-500/5 rounded-full blur-xl animate-pulse-soft"></div>
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-pink-500/5 rounded-full blur-xl animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
      </section>

      {/* Add Explore Mentors Section after Hero Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-orange-600 to-pink-600 text-transparent bg-clip-text">
            Learn from the Best
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Our mentors are top rankers from IITs, AIIMS, and other premier institutions who have been through the same journey and know what it takes to succeed.
          </p>
          <button
            onClick={() => router.push('/mentors')}
            className="inline-flex items-center bg-gradient-to-r from-orange-500 to-pink-600 text-white text-xl font-semibold px-8 py-4 rounded-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <FaUsers className="mr-2" />
            Explore Our Mentors
          </button>
        </div>
      </section>

      {renderSuccessStories()}

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-orange-600 to-pink-600 text-transparent bg-clip-text">
            What People Say About Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-orange-50 to-pink-50 p-8 rounded-xl shadow-lg"
              >
                <div className="flex items-center mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-orange-600">{testimonial.relation}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">&quot;{testimonial.quote}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {renderStats()}
      {renderFeatures()}

      {/* CTA Section with AnimateOnScroll */}
      <section className="py-20 bg-gradient-to-br from-orange-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <AnimateOnScroll>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Ready to Transform Your Preparation?
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll delay={200}>
            <p className="text-xl mb-12 max-w-2xl mx-auto">
              Join thousands of successful students who've achieved their dream ranks through our mentorship program.
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll delay={400}>
            <button 
              onClick={handleBooking}
              className="bg-white text-xl font-semibold px-8 py-4 rounded-lg text-orange-600 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Start Your Journey Today
            </button>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}
