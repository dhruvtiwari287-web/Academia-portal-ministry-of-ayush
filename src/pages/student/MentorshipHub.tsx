import React, { useState, useEffect } from 'react';
import {
  Users,
  Calendar,
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Star,
  BookOpen,
  MessageSquare,
  Award,
  Target,
  PlusCircle,
  FileCheck,
  Send,
  Loader2
} from 'lucide-react';
import { MentorProfile, MentorshipSession } from '../../types/index.js';
import { api } from '../../services/api.js';

export const MentorshipHub: React.FC = () => {
  const [mentors, setMentors] = useState<MentorProfile[]>([]);
  const [sessions, setSessions] = useState<MentorshipSession[]>([]);
  const [activeTab, setActiveTab] = useState<'FIND_MENTOR' | 'MY_SESSIONS' | 'CAREER_GOALS'>('FIND_MENTOR');
  const [loading, setLoading] = useState(true);

  // Booking Modal
  const [selectedMentor, setSelectedMentor] = useState<MentorProfile | null>(null);
  const [sessionDate, setSessionDate] = useState('2025-05-15');
  const [sessionTime, setSessionTime] = useState('14:00');
  const [topic, setTopic] = useState('');
  const [studentGoal, setStudentGoal] = useState('');
  const [milestone, setMilestone] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    try {
      const [mentorRes, sessionRes] = await Promise.all([
        api.getMentors(),
        api.getMentorshipSessions()
      ]);
      if (mentorRes.success) setMentors(mentorRes.mentors);
      if (sessionRes.success) setSessions(sessionRes.sessions);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleBookSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMentor) return;

    setSubmitting(true);
    try {
      const scheduledAt = `${sessionDate}T${sessionTime}:00Z`;
      const res = await api.scheduleMentorshipSession({
        mentorId: selectedMentor.id,
        scheduledAt,
        topic,
        studentGoal,
        milestoneCovered: milestone,
        durationMinutes: 45
      });
      if (res.success) {
        setBookingSuccess(res.message);
        await loadData();
        setTimeout(() => {
          setSelectedMentor(null);
          setActiveTab('MY_SESSIONS');
        }, 1500);
      }
    } catch (err: any) {
      alert(err.message || 'Failed to schedule session');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
          <Users className="w-4 h-4" />
          <span>Clinical & Academic Mentorship Ecosystem</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
          Mentorship & Expert Guidance Hub
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Connect 1-on-1 with All India Institute of Ayurveda faculty, ICMR-AYUSH investigators, and pharmaceutical leaders with algorithmic competency matching.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('FIND_MENTOR')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'FIND_MENTOR'
                ? 'bg-emerald-700 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Find Expert Mentors ({mentors.length})
          </button>
          <button
            onClick={() => setActiveTab('MY_SESSIONS')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'MY_SESSIONS'
                ? 'bg-emerald-700 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <span>My Scheduled Sessions</span>
            {sessions.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-white dark:bg-slate-900 text-emerald-700">
                {sessions.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('CAREER_GOALS')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'CAREER_GOALS'
                ? 'bg-emerald-700 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Mentorship Goals Tracker
          </button>
        </div>
      </div>

      {activeTab === 'FIND_MENTOR' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mentors.map(m => (
            <div
              key={m.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                      {m.domain}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                      {m.name}
                    </h3>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {m.designation} • {m.organization}
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      <span>{m.compatibilityScore || 94}% Compatibility</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400 mb-3">
                  <span>{m.yearsOfExperience} Years Clinical & Research Exp</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-amber-500 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-current" /> {m.rating}
                  </span>
                  <span>•</span>
                  <span className="text-emerald-600 font-semibold">{m.availability}</span>
                </div>

                {/* Compatibility Reasons */}
                {m.compatibilityReasons && (
                  <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 rounded-xl mb-3 text-xs text-emerald-900 dark:text-emerald-200 space-y-1">
                    <span className="font-bold block">Why this mentor matches you:</span>
                    {m.compatibilityReasons.map((r, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Mentorship Topics:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {m.mentorshipTopics.map((t, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {m.currentMenteesCount} of {m.maxMentees} slots filled
                </span>
                <button
                  onClick={() => {
                    setSelectedMentor(m);
                    setTopic(m.mentorshipTopics[0] || '');
                    setStudentGoal('Prepare protocol draft for multi-centric clinical evaluation');
                    setMilestone('Milestone 1: Ethical review submission');
                    setBookingSuccess(null);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Schedule 1-on-1 Session</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : activeTab === 'MY_SESSIONS' ? (
        <div className="space-y-4">
          {sessions.map(s => (
            <div
              key={s.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                    Mentorship Session
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                    {s.topic}
                  </h3>
                  <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-3">
                    <span>Mentor: {s.mentorName}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(s.scheduledAt).toLocaleString()} ({s.durationMinutes} mins)
                    </span>
                  </div>
                </div>

                <div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      s.status === 'COMPLETED'
                        ? 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                    }`}
                  >
                    {s.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="font-bold text-slate-900 dark:text-slate-100 mb-1">
                    Student Prepared Goal:
                  </div>
                  <div className="text-slate-600 dark:text-slate-300">{s.studentGoal}</div>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="font-bold text-slate-900 dark:text-slate-100 mb-1">
                    Milestone Tracked:
                  </div>
                  <div className="text-slate-600 dark:text-slate-300">{s.milestoneCovered}</div>
                </div>
              </div>

              {s.feedback && (
                <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800/60 text-xs space-y-1.5">
                  <div className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Post-Session Evaluative Feedback from Mentor</span>
                  </div>
                  <div className="text-slate-700 dark:text-slate-300">
                    <strong>Strengths:</strong> {s.feedback.strengths.join(', ')}
                  </div>
                  <div className="text-slate-700 dark:text-slate-300">
                    <strong>Recommended Next Step:</strong> {s.feedback.recommendedAction}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* Career Goals Tracker Tab */
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  Structured Mentorship Milestones
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                  AYUSH Clinical Trial Investigator Certification Pathway
                </h3>
              </div>
              <span className="text-base font-mono font-bold text-emerald-600">67% Complete</span>
            </div>

            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-600" style={{ width: '67%' }} />
            </div>

            <div className="space-y-2 pt-2">
              {[
                { title: 'Complete Good Clinical Practice (GCP) Module & Assessment', done: true },
                { title: 'Submit Draft Protocol on Classical Formulations to Institutional Mentor', done: true },
                { title: 'Attend Phase-2 Clinical Safety Monitoring Workshop', done: true },
                { title: 'Publish Case Series in Indexed AYUSH Journal (JRIM/AIIA)', done: false },
                { title: 'Complete Verified Industry Internship with Pharmacovigilance Centre', done: false }
              ].map((m, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl border flex items-center justify-between text-xs font-medium ${
                    m.done
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60 text-slate-800 dark:text-slate-200'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      className={`w-4 h-4 ${m.done ? 'text-emerald-600' : 'text-slate-300'}`}
                    />
                    <span className={m.done ? 'line-through text-slate-500' : ''}>{m.title}</span>
                  </div>
                  <span className="text-[10px] font-bold">
                    {m.done ? 'Verified' : 'In Progress'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Booking Dialog */}
      {selectedMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  Schedule 1-on-1 Mentorship
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  {selectedMentor.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMentor(null)}
                className="px-2.5 py-1 text-xs text-slate-400 hover:text-slate-600"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleBookSession} className="p-5 space-y-4">
              {bookingSuccess && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{bookingSuccess}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={sessionDate}
                    onChange={e => setSessionDate(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    required
                    value={sessionTime}
                    onChange={e => setSessionTime(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Primary Discussion Topic
                </label>
                <input
                  type="text"
                  required
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                  placeholder="e.g. Clinical Trial Protocol Design & Ethics Review"
                  className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Your Specific Goal / Question for the Mentor
                </label>
                <textarea
                  required
                  rows={2}
                  value={studentGoal}
                  onChange={e => setStudentGoal(e.target.value)}
                  placeholder="What specific guidance or feedback are you seeking during this session?"
                  className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Milestone Covered
                </label>
                <input
                  type="text"
                  required
                  value={milestone}
                  onChange={e => setMilestone(e.target.value)}
                  placeholder="e.g. Protocol Ethical Submission"
                  className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 outline-hidden"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedMentor(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center gap-1.5 shadow-xs disabled:opacity-50"
                >
                  {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  <span>Confirm Booking</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
