import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { chatWithAssistant } from '../utils/api'; // Adjust path if needed
import logo from '../assets/logo.png';

const AssistantPage = () => {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Hello! How can I help you with your studies today?" }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Effect to auto-scroll to the latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const response = await chatWithAssistant({ message: input });
            const assistantMessage = { role: 'assistant', content: response.response };
            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            const errorMessage = { role: 'assistant', content: "Sorry, I'm having trouble connecting. Please try again." };
            setMessages(prev => [...prev, errorMessage]);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-slate-100 font-sans">
            <header className="bg-white shadow-sm p-4 border-b border-slate-200">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <img src={logo} alt="Logo" className="h-8 w-auto" />
                        <h1 className="text-xl font-bold text-slate-800">AI Assistant</h1>
                    </div>
                    <Link to="/dashboard" className="font-medium text-indigo-600 hover:underline">
                        Back to Dashboard
                    </Link>
                </div>
            </header>

            {/* Chat Messages Area */}
            <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-3xl mx-auto space-y-6">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-start gap-4 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                            {msg.role === 'assistant' && (
                                <img src={logo} alt="Assistant" className="h-8 w-8 rounded-full bg-indigo-200 p-1" />
                            )}
                            <div className={`max-w-lg px-5 py-3 rounded-2xl ${
                                msg.role === 'user' 
                                ? 'bg-indigo-600 text-white rounded-br-none' 
                                : 'bg-white text-slate-700 rounded-bl-none shadow-sm'
                            }`}>
                                <p>{msg.content}</p>
                            </div>
                        </div>
                    ))}
                    {loading && (
                         <div className="flex items-start gap-4">
                            <img src={logo} alt="Assistant" className="h-8 w-8 rounded-full bg-indigo-200 p-1" />
                            <div className="max-w-lg px-5 py-3 rounded-2xl bg-white text-slate-700 rounded-bl-none shadow-sm">
                                <p className="animate-pulse">Typing...</p>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Input Form */}
            <footer className="bg-white border-t border-slate-200 p-4">
                <div className="max-w-3xl mx-auto">
                    <form onSubmit={handleSubmit} className="flex items-center gap-4">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask anything about your topic..."
                            className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        />
                        <button type="submit" disabled={loading} className="px-6 py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400">
                            Send
                        </button>
                    </form>
                </div>
            </footer>
        </div>
    );
};

export default AssistantPage;