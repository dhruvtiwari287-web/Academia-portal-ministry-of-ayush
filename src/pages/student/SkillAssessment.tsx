import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckSquare,
  HelpCircle,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Sparkles,
  BookOpen,
  Loader2
} from 'lucide-react';
import { api } from '../../services/api.js';

export const SkillAssessment: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const res = await api.getAssessment();
        if (res.success) {
          setQuestions(res.questions);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSelectOption = (qId: string, optIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: optIndex
    }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await api.submitAssessment(selectedAnswers);
      if (res.success) {
        setResults(res);
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mb-2" />
        <p className="text-sm">Loading AYUSH Competency Assessment questions...</p>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const totalCount = questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;
  const progressPct = Math.round((answeredCount / totalCount) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
          <CheckSquare className="w-4 h-4" />
          <span>AYUSH National Competency Assessment</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
          Clinical & Research Competency Assessment
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Evaluate your understanding of classical Ayurvedic clinical reasoning, Schedule T GMP protocols, ICMR-AYUSH Good Clinical Practice, and research ethics.
        </p>
      </div>

      {submitted && results ? (
        /* Results View */
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  Assessment Complete!
                </h2>
              </div>
              <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
                {results.scorePct}%
              </span>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              {results.message}
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/student/skill-gaps')}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs"
              >
                View Updated Skill Gap Radar Chart
              </button>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setCurrentIndex(0);
                  setSelectedAnswers({});
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
              >
                Retake Assessment
              </button>
            </div>
          </div>

          {/* Breakdown Review */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Detailed Question Review & AYUSH Rationale
            </h3>
            {results.breakdown.map((item: any, idx: number) => (
              <div
                key={item.questionId}
                className={`p-4 rounded-xl border ${
                  item.isCorrect
                    ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/20'
                    : 'border-rose-200 dark:border-rose-800 bg-rose-50/30 dark:bg-rose-950/20'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-slate-500">
                    Question {idx + 1} of {totalCount}
                  </span>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded ${
                      item.isCorrect
                        ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300'
                        : 'bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300'
                    }`}
                  >
                    {item.isCorrect ? 'Correct (+1.0)' : 'Review Recommended'}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  {item.question}
                </h4>
                <div className="text-xs space-y-1 text-slate-600 dark:text-slate-400 mb-3">
                  <div>
                    <strong>Your selection:</strong> {item.userOptionText}
                  </div>
                  {!item.isCorrect && (
                    <div className="text-emerald-700 dark:text-emerald-400 font-semibold">
                      <strong>Standard Best Practice:</strong> {item.correctOptionText}
                    </div>
                  )}
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                  <span className="font-bold text-emerald-700 dark:text-emerald-400 block mb-1">
                    AYUSH Regulatory & Clinical Rationale:
                  </span>
                  {item.explanation}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Assessment Active View */
        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-500 dark:text-slate-400">
                Question {currentIndex + 1} of {totalCount}
              </span>
              <span className="text-emerald-700 dark:text-emerald-400 font-mono">
                {answeredCount} Answered ({progressPct}%)
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Current Question Card */}
          {currentQ && (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                  {currentQ.category}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  Select the best single answer
                </span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug">
                {currentQ.question}
              </h2>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((opt: string, optIdx: number) => {
                  const isSelected = selectedAnswers[currentQ.id] === optIdx;
                  return (
                    <div
                      key={optIdx}
                      onClick={() => handleSelectOption(currentQ.id, optIdx)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 ring-1 ring-emerald-500'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs flex-shrink-0 mt-0.5 ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-600 text-white font-bold'
                            : 'border-slate-300 dark:border-slate-600 text-slate-500'
                        }`}
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </div>
                      <span className="text-sm leading-relaxed">{opt}</span>
                    </div>
                  );
                })}
              </div>

              {/* Navigation Controls */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex(prev => prev - 1)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg disabled:opacity-30"
                >
                  Previous Question
                </button>

                {currentIndex < totalCount - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentIndex(prev => prev + 1)}
                    className="px-5 py-2 text-xs font-semibold bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitting || answeredCount === 0}
                    className="px-6 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center gap-2 shadow-xs disabled:opacity-50"
                  >
                    {submitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4" />
                    )}
                    <span>Submit Complete Assessment</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Quick Question Jump Drawer */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
              Question Navigator
            </div>
            <div className="flex flex-wrap gap-2">
              {questions.map((q, i) => {
                const isAnswered = selectedAnswers[q.id] !== undefined;
                const isCurrent = currentIndex === i;
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                      isCurrent
                        ? 'ring-2 ring-emerald-500 bg-emerald-700 text-white'
                        : isAnswered
                        ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
