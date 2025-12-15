
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_QUIZ } from '../constants';
import { Clock, ChevronRight, ChevronLeft, CheckCircle, AlertTriangle, X } from 'lucide-react';

const QuizPlayer: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  
  // In a real app, fetch quiz by ID. Using MOCK_QUIZ for demo.
  const quiz = MOCK_QUIZ; // Assuming quizId matches for now

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string[]>>({});
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleOptionSelect = (questionId: string, optionId: string, type: 'single' | 'multiple' | 'boolean') => {
    setSelectedAnswers(prev => {
      const current = prev[questionId] || [];
      if (type === 'single' || type === 'boolean') {
        return { ...prev, [questionId]: [optionId] };
      } else {
        // Multiple choice toggle
        if (current.includes(optionId)) {
          return { ...prev, [questionId]: current.filter(id => id !== optionId) };
        } else {
          return { ...prev, [questionId]: [...current, optionId] };
        }
      }
    });
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Calculate score
    let score = 0;
    let totalPoints = 0;
    let correctCount = 0;

    const results = quiz.questions.map(q => {
      const userAnswers = selectedAnswers[q.id] || [];
      const isCorrect = 
        q.correctAnswerIds.length === userAnswers.length &&
        q.correctAnswerIds.every(id => userAnswers.includes(id));
      
      totalPoints += q.points;
      if (isCorrect) {
        score += q.points;
        correctCount++;
      }

      return {
        questionId: q.id,
        userAnswers,
        isCorrect
      };
    });

    const percentage = Math.round((score / totalPoints) * 100);
    
    // Simulate API delay
    setTimeout(() => {
      navigate(`/quiz/${quizId}/result`, { 
        state: { 
          score, 
          totalPoints, 
          percentage, 
          results, 
          correctCount,
          totalQuestions: quiz.questions.length 
        } 
      });
    }, 1000);
  };

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  if (!quiz) return <div>Quiz not found</div>;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Quiz Header */}
      <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 sticky top-0 z-20">
        <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
                <X className="w-5 h-5" />
            </button>
            <h1 className="font-bold text-slate-800 hidden sm:block">{quiz.title}</h1>
        </div>
        
        <div className="flex items-center gap-6">
            <div className={`flex items-center gap-2 font-mono text-lg font-bold ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-slate-700'}`}>
                <Clock className="w-5 h-5" />
                {formatTime(timeLeft)}
            </div>
            <div className="hidden sm:block w-32 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>
        </div>
      </header>

      {/* Quiz Body */}
      <main className="flex-1 max-w-3xl mx-auto w-full p-6 md:p-10 flex flex-col">
        <div className="flex-1 flex flex-col justify-center">
            <div className="mb-6">
                <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                    Question {currentQuestionIndex + 1} of {quiz.questions.length}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mt-4 leading-tight">
                    {currentQuestion.text}
                </h2>
                {currentQuestion.type === 'multiple' && (
                    <p className="text-sm text-slate-500 mt-2 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1" /> Select all that apply
                    </p>
                )}
            </div>

            <div className="space-y-3">
                {currentQuestion.options.map(option => {
                    const isSelected = (selectedAnswers[currentQuestion.id] || []).includes(option.id);
                    return (
                        <div 
                            key={option.id}
                            onClick={() => handleOptionSelect(currentQuestion.id, option.id, currentQuestion.type)}
                            className={`p-5 rounded-xl border-2 cursor-pointer transition-all flex items-center group ${
                                isSelected 
                                ? 'border-emerald-500 bg-emerald-50/50 shadow-sm' 
                                : 'border-slate-200 bg-white hover:border-emerald-300 hover:bg-slate-50'
                            }`}
                        >
                            <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center shrink-0 transition-colors ${
                                isSelected 
                                ? 'border-emerald-500 bg-emerald-500 text-white' 
                                : 'border-slate-300 group-hover:border-emerald-400'
                            }`}>
                                {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                            </div>
                            <span className={`text-base font-medium ${isSelected ? 'text-emerald-900' : 'text-slate-700'}`}>
                                {option.text}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
      </main>

      {/* Quiz Footer */}
      <footer className="bg-white border-t border-slate-200 p-4 md:p-6 sticky bottom-0 z-20">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
            <button 
                onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                disabled={currentQuestionIndex === 0}
                className="px-6 py-3 rounded-lg font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronLeft className="w-5 h-5 inline mr-1" /> Previous
            </button>

            {isLastQuestion ? (
                <button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-transform active:scale-95 flex items-center"
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
                </button>
            ) : (
                <button 
                    onClick={() => setCurrentQuestionIndex(prev => Math.min(quiz.questions.length - 1, prev + 1))}
                    className="px-8 py-3 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-colors flex items-center"
                >
                    Next <ChevronRight className="w-5 h-5 inline ml-1" />
                </button>
            )}
        </div>
      </footer>
    </div>
  );
};

export default QuizPlayer;
