import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateContent } from '../utils/api'; // Adjust path if needed
import logo from '../assets/logo.png'; // Import the logo

// Reusable layout component for a consistent look across dashboard pages
const DashboardLayout = ({ children }) => (
    <div className="min-h-screen bg-slate-100 font-sans">
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <img src={logo} alt="StudyAI Logo" className="h-8 w-auto" />
                    <span className="text-xl font-bold text-slate-800">StudyAI Dashboard</span>
                </div>
                {/* You can add user profile/logout buttons here later */}
            </div>
        </header>
        <main className="container mx-auto px-6 py-12">
            {children}
        </main>
    </div>
);

const DashboardPage = () => {
    const [topic, setTopic] = useState('');
    const [loading, setLoading] = useState(null); // 'quiz', 'flashcards', or null
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleGenerate = async (contentType) => {
        if (!topic.trim()) {
            setError('Please enter a topic to begin.');
            return;
        }
        setLoading(contentType);
        setError('');
        try {
            console.log("1. Sending request to API..."); // DEBUG
            const response = await generateContent({
                topic,
                content_type: contentType
            });
            console.log("2. Received response from API:", response); // DEBUG

            // Check if the response has the expected structure
            if (response && response.questions) {
                 console.log("3. Response is valid. Navigating..."); // DEBUG
                 navigate('/dashboard/quiz', { state: { data: response, topic } });
            } else if (response && response.flashcards) {
                 console.log("3. Response is valid. Navigating..."); // DEBUG
                 navigate('/dashboard/flashcards', { state: { data: response, topic } });
            } else {
                // This will catch cases where the AI gives a weird response
                console.error("3. Invalid response structure:", response);
                setError("The AI returned an unexpected data format. Please try again.");
            }

        } catch (err) {
            setError('Sorry, we couldn\'t generate content. Please try again.');
            console.error("4. An error occurred in the catch block:", err); // DEBUG
        } finally {
            console.log("5. Re-enabling buttons."); // DEBUG
            setLoading(null);
        }
    };

    return (
        <DashboardLayout>
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg max-w-3xl mx-auto">
                <div className="text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800">Welcome!</h1>
                    <p className="text-slate-500 mt-2 text-lg">What would you like to study today?</p>
                </div>

                <div className="mt-8">
                    <div className="mb-4">
                        <label htmlFor="topic" className="sr-only">Study Topic</label>
                        <input
                            id="topic"
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="e.g., The Renaissance, Quantum Physics, JavaScript Promises"
                            className="w-full px-5 py-4 border border-slate-300 rounded-lg text-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        />
                    </div>

                    {error && <p className="text-sm text-red-600 text-center mb-4">{error}</p>}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <button
                            onClick={() => handleGenerate('quiz')}
                            disabled={!!loading}
                            className="w-full px-4 py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                        >
                            {loading === 'quiz' ? 'Generating...' : 'Create Quiz'}
                        </button>
                        <button
                            onClick={() => handleGenerate('flashcards')}
                            disabled={!!loading}
                            className="w-full px-4 py-3 font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                        >
                            {loading === 'flashcards' ? 'Generating...' : 'Create Flashcards'}
                        </button>
                        <button
                            onClick={() => navigate('/dashboard/assistant')}
                            disabled={!!loading}
                            className="w-full px-4 py-3 font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-700 disabled:bg-sky-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                        >
                            Ask Assistant
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default DashboardPage;