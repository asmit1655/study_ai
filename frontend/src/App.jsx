import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // Adjust path if needed

// A small, reusable SVG Icon component for visual flair
const Icon = ({ path, className = "w-8 h-8 text-indigo-500" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={path}></path>
  </svg>
);

// New component for the animated background
const AnimatedHeroBackground = () => (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute w-full h-full bg-gradient-to-br from-indigo-50 via-white to-purple-50 opacity-60"></div>
        <div
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"
            style={{ animationDelay: '0s' }}
        ></div>
        <div
            className="absolute top-1/2 right-1/4 w-48 h-48 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"
            style={{ animationDelay: '2s' }}
        ></div>
         <div
            className="absolute bottom-10 left-1/3 w-24 h-24 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"
            style={{ animationDelay: '4s' }}
        ></div>
    </div>
);


// The main App component which includes the Landing Page
function App() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to the landing page after logging out
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans antialiased">
      {/* --- Navigation Bar --- */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-slate-900 hover:text-indigo-600 transition-colors">
            StudyAI
          </Link>
          <div className="flex items-center space-x-4">
            {token ? (
              <>
                <Link to="/dashboard" className="text-slate-600 font-medium hover:text-indigo-600 transition-colors">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-200 transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-slate-600 font-medium hover:text-indigo-600 transition-colors">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* --- Main Content: Landing Page --- */}
      <main>
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 text-center bg-white overflow-hidden">
          <AnimatedHeroBackground />
          <div className="container mx-auto px-6 relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-4 leading-tight">
              Supercharge Your
              <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text"> Learning with AI</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              Generate quizzes, flashcards, and get instant answers from your personal AI tutor. Your journey to smarter studying starts here.
            </p>
            <Link
              to={token ? "/dashboard" : "/register"}
              className="bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 inline-block shadow-lg shadow-indigo-500/30"
            >
              {token ? "Go to Dashboard" : "Start for Free"}
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <span className="text-indigo-600 font-semibold uppercase tracking-wider">Features</span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
                Everything You Need to Succeed
                </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              {/* Feature 1: Quizzes */}
              <div className="text-center p-8 bg-white rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="bg-indigo-100 inline-block p-4 rounded-full mb-4">
                    <Icon path="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mt-4 mb-2">AI-Powered Quizzes</h3>
                <p className="text-slate-600">
                  Instantly generate multiple-choice quizzes on any topic to test your knowledge and identify areas for improvement.
                </p>
              </div>
              {/* Feature 2: Flashcards */}
              <div className="text-center p-8 bg-white rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="bg-indigo-100 inline-block p-4 rounded-full mb-4">
                    <Icon path="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mt-4 mb-2">Dynamic Flashcards</h3>
                <p className="text-slate-600">
                  Create digital flashcards in seconds. Perfect for memorizing key terms, dates, and concepts on the go.
                </p>
              </div>
              {/* Feature 3: Assistant */}
              <div className="text-center p-8 bg-white rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="bg-indigo-100 inline-block p-4 rounded-full mb-4">
                    <Icon path="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mt-4 mb-2">Personal AI Assistant</h3>
                <p className="text-slate-600">
                  Stuck on a problem? Ask our AI assistant for clear, concise explanations and expand your understanding.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-indigo-600 font-semibold uppercase tracking-wider">Testimonials</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
                    Loved by Students Everywhere
                    </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-10">
                    <div className="bg-slate-50 p-8 rounded-xl border border-slate-200">
                        <p className="text-slate-600 mb-6">"StudyAI has completely changed how I prepare for exams. The quiz generator is a lifesaver for identifying my weak spots. I feel more confident and prepared than ever before."</p>
                        <div className="font-semibold text-slate-800">- Sarah J., University Student</div>
                    </div>
                    <div className="bg-slate-50 p-8 rounded-xl border border-slate-200">
                        <p className="text-slate-600 mb-6">"The AI assistant is like having a 24/7 tutor. I can ask it anything, and I get clear, easy-to-understand answers instantly. It's an incredible tool for anyone serious about learning."</p>
                        <div className="font-semibold text-slate-800">- Michael B., High School Student</div>
                    </div>
                </div>
            </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Ready to Elevate Your Studies?</h2>
                <p className="text-lg text-slate-600 mt-4 mb-8 max-w-2xl mx-auto">Join thousands of students who are learning smarter, not harder. Get started with StudyAI for free today.</p>
                <Link
                    to={token ? "/dashboard" : "/register"}
                    className="bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 inline-block shadow-lg shadow-indigo-500/30"
                >
                    {token ? "Back to Dashboard" : "Sign Up Now"}
                </Link>
            </div>
        </section>

      </main>

      {/* --- Footer --- */}
      <footer className="bg-white border-t border-slate-200">
        <div className="container mx-auto px-6 py-8 text-center text-slate-500">
          <p>&copy; {new Date().getFullYear()} StudyAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;