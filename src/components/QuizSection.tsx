import React, { useState, useEffect } from 'react';
import { HelpCircle, Star, Search, RefreshCw, Sparkles, BookOpen, Check, AlertCircle } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translate';

interface QuizSectionProps {
  language: string;
}

export default function QuizSection({ language }: QuizSectionProps) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [loading, setLoading] = useState(true);

  // Dictionary Search State
  const [dictSearch, setDictSearch] = useState('');

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const dictionary = [
    { term: 'False Nine', def: 'An unconventional striker who drops deep into midfield, drawing opposition defenders out of position to create space for wingers.' },
    { term: 'Gegenpressing', def: 'A tactical system pioneered in Germany where a team immediately attempts to win back possession after losing it, rather than falling back.' },
    { term: 'Tiki-Taka', def: 'A style of play characterized by short passing, movement, and working the ball through various channels to maintain possession.' },
    { term: 'Expected Goals (xG)', def: 'A statistical measure that estimates the probability of a shot resulting in a goal based on position, angle, and defensive pressure.' },
    { term: 'Panenka', def: 'A penalty kick technique where the player gently chips the ball down the center of the goal, anticipating the goalkeeper will dive to one side.' },
    { term: 'Catenaccio', def: 'A highly organized and effective defensive tactical system designed in Italy, focusing on defense, sweepers, and counter-attacks.' }
  ];

  const dailyFacts = [
    { title: 'Fastest Champions League Goal', desc: 'Roy Makaay scored the fastest goal in UEFA Champions League history for Bayern Munich against Real Madrid in just 10.12 seconds in 2007.' },
    { title: 'The Longest Undefeated Streak', desc: 'AC Milan holds the record for the longest unbeaten run in European top five leagues, going 58 matches undefeated between 1991 and 1993.' },
    { title: 'Top World Cup Scorer', desc: 'Miroslav Klose of Germany holds the absolute record for most FIFA World Cup goals scored, netting 16 goals across 4 separate tournaments.' }
  ];

  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  useEffect(() => {
    async function fetchQuiz() {
      setLoading(true);
      try {
        const response = await fetch('/api/football?action=quiz');
        const data = await response.json();
        if (data.success) {
          setQuestions(data.questions || []);
        }
      } catch (err) {
        console.error('Failed to fetch quiz questions:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchQuiz();
  }, []);

  const handleOptionSelect = (option: string) => {
    if (selectedOption !== null) return; // prevent dual choosing
    setSelectedOption(option);
    
    const currentQ = questions[currentIndex];
    if (option === currentQ.answer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setQuizFinished(false);
  };

  const filteredDictionary = dictionary.filter(entry => 
    entry.term.toLowerCase().includes(dictSearch.toLowerCase()) ||
    entry.def.toLowerCase().includes(dictSearch.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:py-10 flex flex-col gap-8 pb-20">
      
      {/* Visual Header */}
      <div className="relative rounded-3xl border border-zinc-800 bg-zinc-900/25 p-6 sm:p-8 overflow-hidden">
        <div className="absolute top-0 right-0 h-28 w-28 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_50%)] pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/25">
              <HelpCircle className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white">{t.quiz}</h1>
              <p className="text-zinc-500 text-xs mt-0.5">Test your tactical intelligence and learn specialized football definitions.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Quiz / Daily Fact */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Interactive Quiz Panel (7 Cols) */}
        <div className="md:col-span-8 flex flex-col gap-4">
          <h3 className="text-xs font-extrabold uppercase text-zinc-500 tracking-wider ml-1">Daily Football Quiz</h3>
          
          <div className="rounded-2xl border border-zinc-900 bg-zinc-900/15 p-6 min-h-[300px] flex flex-col justify-between">
            {loading ? (
              <div className="text-center py-12 flex-1 flex flex-col justify-center">
                <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-emerald-500 border-r-transparent mx-auto"></div>
                <span className="text-xs text-zinc-500 font-mono mt-3 uppercase tracking-wider">Syncing Quiz Questions...</span>
              </div>
            ) : quizFinished ? (
              <div className="text-center py-8 flex-1 flex flex-col items-center justify-center gap-4">
                <Star className="h-12 w-12 text-yellow-400 animate-bounce" />
                <div>
                  <h4 className="text-lg font-bold text-white">Quiz Completed!</h4>
                  <p className="text-xs text-zinc-500 mt-1">You scored **{score} out of {questions.length}** correct predictions!</p>
                </div>
                <button
                  onClick={restartQuiz}
                  className="px-4 py-2 text-xs rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-400 transition-colors"
                >
                  Play Again
                </button>
              </div>
            ) : questions.length > 0 ? (
              <div className="flex flex-col gap-5 justify-between h-full">
                
                {/* Question Info */}
                <div>
                  <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono font-bold uppercase mb-3.5">
                    <span>Question {currentIndex + 1} of {questions.length}</span>
                    <span>Score: {score}</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-extrabold text-zinc-200">
                    {questions[currentIndex].question}
                  </h4>
                </div>

                {/* Question Options */}
                <div className="flex flex-col gap-2.5 my-3">
                  {questions[currentIndex].options.map((opt: string) => {
                    const isSelected = selectedOption === opt;
                    const isCorrect = opt === questions[currentIndex].answer;
                    let btnStyle = 'border-zinc-800 bg-zinc-950/45 text-zinc-400 hover:border-zinc-700 hover:text-white';
                    
                    if (selectedOption !== null) {
                      if (isCorrect) {
                        btnStyle = 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-bold';
                      } else if (isSelected) {
                        btnStyle = 'border-red-500/40 bg-red-500/10 text-red-400 font-bold';
                      } else {
                        btnStyle = 'border-zinc-900 bg-zinc-950/20 text-zinc-600 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={opt}
                        onClick={() => handleOptionSelect(opt)}
                        disabled={selectedOption !== null}
                        className={`w-full text-left px-4 py-3 text-xs sm:text-sm rounded-xl border transition-all ${btnStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {/* Actions row */}
                <div className="flex justify-end pt-2 border-t border-zinc-900/40">
                  {selectedOption !== null && (
                    <button
                      onClick={handleNext}
                      className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800 text-xs font-semibold transition-colors"
                    >
                      {currentIndex + 1 === questions.length ? 'Finish Quiz' : 'Next Question'}
                    </button>
                  )}
                </div>

              </div>
            ) : null}
          </div>
        </div>

        {/* Daily Fact Sidebar (5 Cols) */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <h3 className="text-xs font-extrabold uppercase text-zinc-500 tracking-wider ml-1">{t.factsTitle}</h3>
          
          <div className="rounded-2xl border border-zinc-900 bg-zinc-900/15 p-5 flex flex-col justify-between h-56 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.06),transparent_50%)] pointer-events-none"></div>

            <div className="flex flex-col gap-2.5 relative z-10">
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="h-3 w-3 animate-pulse" />
                {dailyFacts[currentFactIndex].title}
              </span>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                {dailyFacts[currentFactIndex].desc}
              </p>
            </div>

            <div className="flex justify-between items-center relative z-10 pt-4 border-t border-zinc-900/40">
              <span className="text-[9px] text-zinc-600 font-mono">FACT #{currentFactIndex + 1}</span>
              <button
                onClick={() => setCurrentFactIndex((currentFactIndex + 1) % dailyFacts.length)}
                className="p-1.5 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-500 hover:text-white transition-colors"
                title="Next Fact"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Football Dictionary (Full Width) */}
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex justify-between items-center border-b border-zinc-900 pb-2 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4.5 w-4.5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">{t.dictionaryTitle}</h3>
          </div>
          
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search terms (e.g., False Nine, Tiki-Taka)..."
              value={dictSearch}
              onChange={(e) => setDictSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs rounded-xl border border-zinc-850 bg-zinc-950 text-zinc-300 placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredDictionary.map((entry, idx) => (
            <div 
              key={idx}
              className="rounded-xl border border-zinc-900 bg-zinc-900/10 p-4.5 flex flex-col gap-2 hover:border-zinc-850 transition-colors"
            >
              <h4 className="text-xs font-extrabold text-emerald-400 uppercase font-mono tracking-wide">
                {entry.term}
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                {entry.def}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
