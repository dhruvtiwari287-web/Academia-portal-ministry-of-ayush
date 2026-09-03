import React, { useState, useEffect } from 'react';
import {
  Users,
  Calendar,
  Clock,
  CheckCircle2,
  Star,
  FileText,
  Target,
  ArrowRight,
  MessageSquare,
  ShieldCheck,
  Send
} from 'lucide-react';
import { MentorshipSession } from '../../types/index.js';
import { api } from '../../services/api.js';

export const MentorDashboard: React.FC = () => {
  const [sessions, setSessions] = useState<MentorshipSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'UPCOMING' | 'COMPLETED' | 'MENTEES'>('UPCOMING');

  // Feedback form state
  const [feedbackSessionId, setFeedbackSessionId] = useState<string | null>(null);
  const [strengths, setStrengths] = useState('');
  const [actionItem, setActionItem] = useState('');

  const loadData = async () => {
    try {
      const res = await api.getMentorshipSessions();
      if (res.success) {
        setSessions(res.sessions);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackSessionId) return;

    setSessions(prev =>
      prev.map(s =>
        s.id === feedbackSessionId
          ? {
              ...s,
              status: 'COMPLETED',
              feedback: {
                strengths: strengths.split(',').map(s => s.trim()),
                growthAreas: ['Refine institutional protocol drafting'],
                recommendedAction: actionItem,
                rating: 5
              }
            }
          : s
      )
    );
    setFeedbackSessionId(null);
    setStrengths('');
    setActionItem('');
    alert('Session feedback and action items recorded and synced with mentee Skill Passport!');
  };

  const upcomingSessions = sessions.filter(s => s.status !== 'COMPLETED');
  const completedSessions = sessions.filter(s => s.status === 'COMPLETED');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
          <Users className="w-4 h-4" />
          <span>Senior AYUSH Clinician & Expert Portal</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
          Mentor Session Management & Mentee Roster
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Review upcoming 1-on-1 sessions, review student goals, submit evaluative notes, and verify competency progressions.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Active Mentees
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mt-1 font-mono">
            4 Scholars
          </div>
          <div className="text-xs text-slate-500 mt-1">Maximum cap: 5 mentees</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Upcoming Sessions
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-700 dark:text-emerald-400 mt-1 font-mono">
            {upcomingSessions.length} Scheduled
          </div>
          <div className="text-xs text-slate-500 mt-1">Next session in 2 days</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Average Mentee Rating
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-amber-500 mt-1 font-mono flex items-center gap-1">
            <Star className="w-6 h-6 fill-current" />
            <span>4.9 / 5.0</span>
          </div>
          <div className="text-xs text-slate-500 mt-1">Based on 24 completed sessions</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('UPCOMING')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'UPCOMING'
              ? 'bg-emerald-700 text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          Upcoming Sessions ({upcomingSessions.length})
        </button>
        <button
          onClick={() => setActiveTab('COMPLETED')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'COMPLETED'
              ? 'bg-emerald-700 text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          Completed Sessions & Logs ({completedSessions.length})
        </button>
      </div>

      {/* Upcoming Sessions Tab */}
      {activeTab === 'UPCOMING' && (
        <div className="space-y-4">
          {upcomingSessions.length === 0 ? (
            <div className="py-16 text-center text-slate-400">
              No pending sessions currently scheduled.
            </div>
          ) : (
            upcomingSessions.map(s => (
              <div
                key={s.id}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                      Upcoming Consultation
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                      {s.topic}
                    </h3>
                    <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        Candidate: Aarav Sharma (AIIA BAMS Year 4)
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-mono text-emerald-600">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(s.scheduledAt).toLocaleString()} ({s.durationMinutes} mins)
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setFeedbackSessionId(s.id);
                      setStrengths('Comprehensive Ayurvedic pulse reading logic, clear formulation understanding');
                      setActionItem('Submit formal clinical protocol draft to Institutional Ethics Committee');
                    }}
                    className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center gap-1.5 shadow-xs transition-colors self-start sm:self-auto"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Complete & Log Evaluation</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-slate-100 mb-1">
                      Student Objective:
                    </div>
                    <p className="text-slate-600 dark:text-slate-300">{s.studentGoal}</p>
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-slate-100 mb-1">
                      Target Milestone:
                    </div>
                    <p className="text-slate-600 dark:text-slate-300">{s.milestoneCovered}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Completed Sessions Tab */}
      {activeTab === 'COMPLETED' && (
        <div className="space-y-4">
          {completedSessions.map(s => (
            <div
              key={s.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    {s.topic}
                  </h4>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Completed on {new Date(s.scheduledAt).toLocaleDateString()}
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  COMPLETED
                </span>
              </div>

              {s.feedback && (
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 text-xs space-y-2">
                  <div>
                    <strong className="text-emerald-900 dark:text-emerald-300">Observed Strengths:</strong>{' '}
                    <span className="text-slate-700 dark:text-slate-300">
                      {s.feedback.strengths.join(', ')}
                    </span>
                  </div>
                  <div>
                    <strong className="text-emerald-900 dark:text-emerald-300">Action Item Assigned:</strong>{' '}
                    <span className="text-slate-700 dark:text-slate-300">
                      {s.feedback.recommendedAction}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Feedback Dialog */}
      {feedbackSessionId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Log Mentee Evaluation & Notes
              </h3>
              <button
                onClick={() => setFeedbackSessionId(null)}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleAddFeedback} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Observed Competencies & Strengths (comma-separated)
                </label>
                <input
                  type="text"
                  required
                  value={strengths}
                  onChange={e => setStrengths(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Concrete Action Items & Homework
                </label>
                <textarea
                  rows={3}
                  required
                  value={actionItem}
                  onChange={e => setActionItem(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 outline-hidden"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setFeedbackSessionId(null)}
                  className="px-4 py-2 font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center gap-1.5 shadow-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Submit Evaluation & Close Session</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
