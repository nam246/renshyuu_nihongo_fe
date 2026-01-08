'use client'

import { useState } from 'react';
import { Check, Circle, ChevronLeft, ChevronRight } from 'lucide-react';

// Types
interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer?: number;
}

interface Answer {
  questionId: number;
  selectedOption: number;
}

// Sample quiz data
const sampleQuiz: Question[] = [
  {
    id: 1,
    question: "What is the capital of Vietnam?",
    options: ["Ho Chi Minh City", "Hanoi", "Da Nang", "Hue"],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "Which programming language is known as the 'language of the web'?",
    options: ["Python", "Java", "JavaScript", "C++"],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
    correctAnswer: 0
  },
  {
    id: 4,
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 1
  },
  {
    id: 5,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1
  },
  {
    id: 6,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: 3
  },
  {
    id: 7,
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: 1
  },
  {
    id: 8,
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: 2
  },
  {
    id: 9,
    question: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 2
  },
  {
    id: 10,
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    correctAnswer: 2
  }
];

const QuizApp = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const questionsPerPage = 1;
  const totalPages = Math.ceil(sampleQuiz.length / questionsPerPage);
  
  const currentQuestions = sampleQuiz.slice(
    (currentPage - 1) * questionsPerPage,
    currentPage * questionsPerPage
  );

  const isQuestionAnswered = (questionId: number) => {
    return answers.some(a => a.questionId === questionId);
  };

  const getAnswer = (questionId: number) => {
    return answers.find(a => a.questionId === questionId);
  };

  const handleAnswer = (questionId: number, optionIndex: number) => {
    setAnswers(prev => {
      const existing = prev.filter(a => a.questionId !== questionId);
      return [...existing, { questionId, selectedOption: optionIndex }];
    });
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = () => {
    if (answers.length < sampleQuiz.length) {
      const confirm = window.confirm(
        `You have answered ${answers.length} out of ${sampleQuiz.length} questions. Submit anyway?`
      );
      if (!confirm) return;
    }
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach(answer => {
      const question = sampleQuiz.find(q => q.id === answer.questionId);
      if (question && question.correctAnswer === answer.selectedOption) {
        correct++;
      }
    });
    return correct;
  };

  const answeredCount = answers.length;
  const progress = (answeredCount / sampleQuiz.length) * 100;

  if (showResults) {
    const score = calculateScore();
    const percentage = ((score / sampleQuiz.length) * 100).toFixed(1);
    
    return (
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Quiz Complete!</h1>
            <p className="text-6xl font-bold text-primary mb-4">{percentage}%</p>
            <p className="text-xl text-slate-600 mb-8">
              You got {score} out of {sampleQuiz.length} questions correct
            </p>
            <button
              onClick={() => {
                setAnswers([]);
                setShowResults(false);
                setCurrentPage(1);
              }}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed top-0 left-0 h-screen bg-white shadow-lg transition-transform duration-300 z-20
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          w-64 overflow-y-auto
        `}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">Questions</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 hover:bg-slate-100 rounded"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
            
            {/* Progress */}
            <div className="mb-6 p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-between mb-2 text-sm">
                <span className="text-slate-600">Progress</span>
                <span className="font-semibold">{answeredCount}/{sampleQuiz.length}</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Question Grid */}
            <div className="grid grid-cols-5 gap-2">
              {sampleQuiz.map((q, idx) => {
                const isAnswered = isQuestionAnswered(q.id);
                const isCurrent = currentPage === idx + 1;
                
                return (
                  <button
                    key={q.id}
                    onClick={() => goToPage(idx + 1)}
                    className={`
                      aspect-square rounded-lg font-semibold text-sm transition-all
                      ${isCurrent 
                        ? 'bg-primary text-white ring-2 ring-primary ring-offset-2' 
                        : isAnswered
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }
                    `}
                  >
                    {isAnswered && !isCurrent && (
                      <Check className="w-4 h-4 mx-auto" />
                    )}
                    {!isAnswered && !isCurrent && (idx + 1)}
                    {isCurrent && (idx + 1)}
                  </button>
                );
              })}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full mt-6 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
            >
              Submit Quiz
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : ''}`}>
          {/* Toggle Sidebar Button */}
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="fixed top-4 left-4 z-10 p-2 bg-white rounded-lg shadow-lg hover:bg-slate-50 transition"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          <div className="max-w-3xl mx-auto p-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-slate-500">
                  Question {currentPage} of {totalPages}
                </span>
                <span className="text-sm font-semibold text-primary">
                  {answeredCount} answered
                </span>
              </div>
              <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${(currentPage / totalPages) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            {currentQuestions.map((question) => {
              const userAnswer = getAnswer(question.id);
              
              return (
                <div key={question.id} className="bg-white rounded-xl shadow-lg p-8 mb-8">
                  <h3 className="text-xl font-bold mb-6 text-slate-800">
                    {question.question}
                  </h3>

                  <div className="space-y-3">
                    {question.options.map((option, idx) => {
                      const isSelected = userAnswer?.selectedOption === idx;
                      
                      return (
                        <button
                          key={idx}
                          onClick={() => handleAnswer(question.id, idx)}
                          className={`
                            w-full p-4 rounded-lg border-2 transition-all text-left
                            flex items-center gap-3 group
                            ${isSelected
                              ? 'border-primary bg-primary/5'
                              : 'border-slate-200 hover:border-primary/50 hover:bg-slate-50'
                            }
                          `}
                        >
                          <div className={`
                            w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0
                            ${isSelected 
                              ? 'border-primary bg-primary' 
                              : 'border-slate-300 group-hover:border-primary/50'
                            }
                          `}>
                            {isSelected && (
                              <div className="w-2 h-2 bg-white rounded-full" />
                            )}
                          </div>
                          <span className={`${isSelected ? 'font-semibold text-slate-900' : 'text-slate-700'}`}>
                            {option}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Navigation */}
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>

              {currentPage < totalPages ? (
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition"
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition font-semibold"
                >
                  Submit Quiz
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default QuizApp;