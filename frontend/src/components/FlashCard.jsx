import React, { useState } from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';

const FlashcardPage = () => {
    const location = useLocation();
    const { data, topic } = location.state || {};
    const flashcards = data?.flashcards;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    if (!flashcards || flashcards.length === 0) {
        return <Navigate to="/dashboard" replace />;
    }

    const currentCard = flashcards[currentIndex];

    const goToNext = () => {
        const nextIndex = (currentIndex + 1) % flashcards.length;
        setCurrentIndex(nextIndex);
        setIsFlipped(false);
    };

    const goToPrev = () => {
        const prevIndex = (currentIndex - 1 + flashcards.length) % flashcards.length;
        setCurrentIndex(prevIndex);
        setIsFlipped(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 p-4 font-sans">
            <div className="w-full max-w-2xl">
                <div className="text-center mb-6">
                    <p className="text-slate-500">Topic: {topic}</p>
                    <h1 className="text-3xl font-bold text-slate-800">Flashcards</h1>
                    <p className="text-indigo-600 font-semibold mt-2">Card {currentIndex + 1} of {flashcards.length}</p>
                </div>

                {/* Flashcard with flip animation */}
                <div className="perspective-1000 h-80">
                    <div 
                        className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
                        onClick={() => setIsFlipped(!isFlipped)}
                    >
                        {/* Front of the card */}
                        <div className="absolute w-full h-full backface-hidden bg-white rounded-2xl shadow-lg flex items-center justify-center p-8 text-center">
                            <p className="text-2xl font-semibold text-slate-800">{currentCard.front}</p>
                        </div>
                        {/* Back of the card */}
                        <div className="absolute w-full h-full backface-hidden bg-indigo-600 text-white rounded-2xl shadow-lg flex items-center justify-center p-8 text-center rotate-y-180">
                            <p className="text-xl">{currentCard.back}</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center justify-between mt-8">
                    <button onClick={goToPrev} className="px-6 py-3 font-semibold text-slate-700 bg-white rounded-lg shadow-md hover:bg-slate-200 transition-colors">
                        Previous
                    </button>
                    <button onClick={goToNext} className="px-6 py-3 font-semibold text-slate-700 bg-white rounded-lg shadow-md hover:bg-slate-200 transition-colors">
                        Next
                    </button>
                </div>

                <div className="text-center mt-8">
                    <Link to="/dashboard" className="font-medium text-indigo-600 hover:underline">
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FlashcardPage;