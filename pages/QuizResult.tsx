
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { MOCK_QUIZ } from '../constants';
import { Check, X, RefreshCcw, BookOpen, ChevronRight, Award, Trophy } from 'lucide-react';

interface ResultState {
  score: number;
  totalPoints: number;
  percentage: number;
  results: {
    questionId: string;
    userAnswers: string[];
    isCorrect: boolean;
  }[];
  correctCount: number;
  totalQuestions: number;
}

const QuizResult: React.FC = () => {
  const { state } = useLocation();
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const quiz = MOCK_QUIZ;

  if (!state) {
    return <div className="p-8 text-center">No result data found.</div>;
  }

  const { percentage, correctCount, totalQuestions, results } = state as ResultState;
  const isPassed = percentage >= quiz.passingScore;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Score Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            <div className={`p-8 text-center ${isPassed ? 'bg-emerald-600' : 'bg-red-500'} text-white relative overflow-hidden`}>
                <div className="absolute top-0 left-0 w-full h-full bg-white/10 opacity-30 pattern-grid"></div>
                <div className="relative z-10">
                    <div className="inline-flex items-center justify-center p-4 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                        {isPassed ? <Trophy className="w-10 h-10 text-yellow-300" /> : <X className="w-10 h-10 text-white" />}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                        {isPassed ? 'Quiz Completed!' : 'Keep Practicing'}
                    </h1>
                    <p className="text-white/90 text-lg mb-6">
                        {isPassed ? 'Great job! You passed the assessment.' : 'You didn\'t meet the passing score this time.'}
                    </p>
                    
                    <div className="flex justify-center items-end gap-2">
                        <span className="text-6xl font-black">{percentage}%</span>
                        <span className="text-xl font-medium mb-2 opacity-80">Score</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100">
                <div className="p-6 text-center">
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Correct</span>
                    <span className="text-2xl font-bold text-slate-800">{correctCount}</span>
                </div>
                <div className="p-6 text-center">
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total</span>
                    <span className="text-2xl font-bold text-slate-800">{totalQuestions}</span>
                </div>
                <div className="p-6 text-center">
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Time</span>
                    <span className="text-2xl font-bold text-slate-800">8:45</span>
                </div>
            </div>

            <div className="p-6 bg-slate-50 flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                    onClick={() => navigate(`/quiz/${quizId}`)}
                    className="flex items-center justify-center px-6 py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm"
                >
                    <RefreshCcw className="w-4 h-4 mr-2" /> Retry Quiz
                </button>
                <button 
                    onClick={() => navigate('/courses/c1')}
                    className="flex items-center justify-center px-6 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
                >
                    Back to Course <ChevronRight className="w-4 h-4 ml-2" />
                </button>
            </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800 ml-2">Detailed Breakdown</h2>
            {quiz.questions.map((q, idx) => {
                const result = results.find(r => r.questionId === q.id);
                const isCorrect = result?.isCorrect;
                
                return (
                    <div key={q.id} className={`bg-white rounded-xl border-l-4 p-6 shadow-sm ${isCorrect ? 'border-emerald-500' : 'border-red-500'}`}>
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <span className="text-xs font-bold text-slate-400 uppercase mb-1 block">Question {idx + 1}</span>
                                <h3 className="text-lg font-bold text-slate-800">{q.text}</h3>
                            </div>
                            <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isCorrect ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-500'}`}>
                                {isCorrect ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                            </div>
                        </div>

                        <div className="space-y-2 mb-4">
                            {q.options.map(opt => {
                                const isSelected = result?.userAnswers.includes(opt.id);
                                const isActualCorrect = q.correctAnswerIds.includes(opt.id);
                                
                                let optionClass = "border-slate-200 text-slate-600";
                                if (isActualCorrect) optionClass = "border-emerald-500 bg-emerald-50 text-emerald-800 font-medium";
                                else if (isSelected && !isCorrect) optionClass = "border-red-300 bg-red-50 text-red-800";
                                else if (isSelected) optionClass = "border-slate-400 bg-slate-50 font-medium";

                                return (
                                    <div key={opt.id} className={`p-3 rounded-lg border flex items-center justify-between text-sm ${optionClass}`}>
                                        <span>{opt.text}</span>
                                        {isActualCorrect && <Check className="w-4 h-4 text-emerald-600" />}
                                        {isSelected && !isActualCorrect && <X className="w-4 h-4 text-red-500" />}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-600 flex gap-3">
                            <BookOpen className="w-5 h-5 text-slate-400 shrink-0" />
                            <div>
                                <span className="font-bold text-slate-700 block mb-1">Explanation</span>
                                {q.explanation}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>

      </div>
    </div>
  );
};

export default QuizResult;
