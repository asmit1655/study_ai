import React, { useState } from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';

const QuizPage = () => {
    // Retrieve the quiz data and topic passed from the dashboard
    const location = useLocation();
    const { data, topic } = location.state || {};
    const questions = data?.questions;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [isAnswered, setIsAnswered] = useState(false);

    // If there's no question data, redirect back to the dashboard
    if (!questions || questions.length === 0) {
        return <Navigate to="/dashboard" replace />;
    }

    const currentQuestion = questions[currentIndex];
    const isCorrect = selectedOption === currentQuestion.answer;

    const handleSelectOption = (option) => {
        if (!isAnswered) {
            setSelectedOption(option);
            setIsAnswered(true);
            if (option === currentQuestion.answer) {
                setScore(prev => prev + 1);
            }
        }
    };

    const handleNext = () => {
        setIsAnswered(false);
        setSelectedOption(null);

        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setShowResult(true);
        }
    };

    // Display the final score card
    if (showResult) {
        const percentage = Math.round((score / questions.length) * 100);
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 p-4 font-sans">
                <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
                    <h2 className="text-3xl font-bold text-slate-800 mb-4">Quiz Complete!</h2>
                    <p className="text-lg text-slate-600 mb-2">You scored</p>
                    <p className="text-6xl font-bold text-indigo-600 mb-2">{score} / {questions.length}</p>
                    <p className="text-xl font-semibold text-slate-500 mb-8">({percentage}%)</p>
                    <Link to="/dashboard" className="w-full block px-4 py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
                        Create Another Quiz
                    </Link>
                </div>
            </div>
        );
    }

    // Display the current question
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 p-4 font-sans">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl w-full">
                <div className="mb-6">
                    <p className="text-sm text-slate-500">Topic: {topic}</p>
                    <p className="text-lg font-semibold text-indigo-600">Question {currentIndex + 1} of {questions.length}</p>
                    <h2 className="text-2xl font-bold text-slate-800 mt-2">{currentQuestion.question}</h2>
                </div>
                <div className="space-y-4">
                    {currentQuestion.options.map((option) => {
                        const isSelected = selectedOption === option;
                        let buttonClass = 'w-full text-left p-4 rounded-lg border-2 transition-all text-slate-700 ';
                        
                        if (isAnswered) {
                            if (option === currentQuestion.answer) {
                                buttonClass += 'bg-green-100 border-green-500 text-green-800 font-semibold';
                            } else if (isSelected) {
                                buttonClass += 'bg-red-100 border-red-500 text-red-800';
                            } else {
                                buttonClass += 'border-slate-300 cursor-not-allowed';
                            }
                        } else {
                            buttonClass += isSelected ? 'bg-indigo-100 border-indigo-500' : 'border-slate-300 hover:bg-slate-100';
                        }

                        return (
                            <button key={option} onClick={() => handleSelectOption(option)} disabled={isAnswered} className={buttonClass}>
                                {option}
                            </button>
                        );
                    })}
                </div>
                {isAnswered && (
                     <button onClick={handleNext} className="mt-8 w-full px-4 py-3 font-semibold text-white bg-slate-800 rounded-lg hover:bg-slate-900 transition-colors">
                        {currentIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default QuizPage;