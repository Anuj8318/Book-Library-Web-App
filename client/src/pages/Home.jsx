import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse delay-500"></div>
      </div>

      <Navbar />
      
      <section className="relative pt-32 pb-20 flex flex-col items-center text-center px-4">
        {/* Hero Content */}
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-full shadow-lg mb-8 animate-fadeIn">
            <span className="text-sm font-medium text-blue-600">✨ Welcome to the Future of Library Management</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 max-w-4xl leading-tight mb-6 animate-slideUp">
            Borrow Smarter.{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Read Better.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-8 animate-slideUp delay-200">
            A modern library system built for admins and book lovers. 
            <br className="hidden md:block" />
            <span className="font-semibold text-blue-600">Explore, borrow, and manage with ease.</span>
          </p>

          {/* CTA Button */}
          <div className="mb-12 animate-slideUp delay-400">
            <Link to="/login">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-lg">
                <span className="relative z-10">Get Started Today</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </Link>
          </div>
        </div>

        {/* Hero Image Section */}
        <div className="relative animate-fadeIn delay-600">
          <div className="relative group">
            {/* Floating Cards */}
            <div className="absolute -top-8 -left-8 w-16 h-20 bg-white rounded-lg shadow-lg transform rotate-12 group-hover:rotate-6 transition-transform duration-500 flex items-center justify-center">
              <span className="text-2xl">📚</span>
            </div>
            <div className="absolute -top-4 -right-12 w-16 h-20 bg-white rounded-lg shadow-lg transform -rotate-12 group-hover:-rotate-6 transition-transform duration-500 flex items-center justify-center">
              <span className="text-2xl">📖</span>
            </div>
            <div className="absolute -bottom-8 -left-12 w-16 h-20 bg-white rounded-lg shadow-lg transform rotate-6 group-hover:rotate-12 transition-transform duration-500 flex items-center justify-center">
              <span className="text-2xl">📝</span>
            </div>

            {/* Main Image */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 transform group-hover:scale-105 transition-transform duration-300">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUO58M7M1POYzz_wpMq1t_zetlS377PXojHw&s"
                alt="Library"
                className="w-80 md:w-96 h-80 object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose LibraConnect?</h2>
            <p className="text-xl text-gray-600">Experience the perfect blend of simplicity and power</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl text-white">📚</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Catalog</h3>
              <p className="text-gray-600 leading-relaxed">
                Browse through thousands of books with our intelligent search and filtering system. Find exactly what you're looking for in seconds.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl text-white">⚡</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Quick Borrow</h3>
              <p className="text-gray-600 leading-relaxed">
                Borrow books instantly with our streamlined process. No more waiting in long queues or complex paperwork.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl text-white">🛡️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Admin Control</h3>
              <p className="text-gray-600 leading-relaxed">
                Powerful admin dashboard with complete CRUD operations, user management, and detailed analytics for efficient library management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Library Experience?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who have already discovered the joy of smart library management.
          </p>
          <Link to="/login">
            <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg">
              Start Your Journey
            </button>
          </Link>
        </div>
      </section>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-400 {
          animation-delay: 0.4s;
        }

        .delay-500 {
          animation-delay: 0.5s;
        }

        .delay-600 {
          animation-delay: 0.6s;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default Home;