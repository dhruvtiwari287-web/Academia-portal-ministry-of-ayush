import React, { useState, useEffect } from 'react';
import { X, HelpCircle, Send, CheckCircle2, Clock, AlertTriangle, MessageSquare, Loader2 } from 'lucide-react';
import { HelpDeskTicket } from '../../types/index.js';
import { api } from '../../services/api.js';

interface HelpDeskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpDeskModal: React.FC<HelpDeskModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'NEW_TICKET' | 'MY_TICKETS'>('NEW_TICKET');
  const [tickets, setTickets] = useState<HelpDeskTicket[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [category, setCategory] = useState('Skill Passport');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const categories = [
    'Account & Profile',
    'Internships',
    'Applications',
    'Mentorship',
    'Learning',
    'Research',
    'Certifications',
    'Documents',
    'Skill Passport',
    'Industry Opportunities',
    'Technical Support',
    'Other'
  ];

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const res = await api.getHelpDeskTickets();
      if (res.success) {
        setTickets(res.tickets);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchTickets();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) return;

    setSubmitting(true);
    try {
      const res = await api.createHelpDeskTicket({ category, subject, description });
      if (res.success) {
        setSuccessMessage(res.message);
        setSubject('');
        setDescription('');
        await fetchTickets();
        setTimeout(() => {
          setActiveTab('MY_TICKETS');
          setSuccessMessage(null);
        }, 1200);
      }
    } catch (err: any) {
      alert(err.message || 'Failed to submit ticket');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'OPEN':
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">Open</span>;
      case 'IN_PROGRESS':
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800">In Progress</span>;
      case 'WAITING_FOR_RESPONSE':
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800">Waiting Response</span>;
      case 'RESOLVED':
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">Resolved</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700">{status}</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Academic & Technical Help Desk
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ministry of Ayush & AIIA Platform Support & Inquiries
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-5 pt-3 border-b border-slate-200 dark:border-slate-800 flex gap-4 text-sm font-medium">
          <button
            onClick={() => setActiveTab('NEW_TICKET')}
            className={`pb-2.5 border-b-2 transition-colors ${
              activeTab === 'NEW_TICKET'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Submit New Ticket
          </button>
          <button
            onClick={() => setActiveTab('MY_TICKETS')}
            className={`pb-2.5 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'MY_TICKETS'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <span>My Tickets</span>
            {tickets.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold">
                {tickets.length}
              </span>
            )}
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1">
          {activeTab === 'NEW_TICKET' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {successMessage && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-300 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>{successMessage}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-hidden"
                >
                  {categories.map(c => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Subject / Summary
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  placeholder="e.g. Skill Passport verification request for completed GCP module"
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Detailed Description
                </label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Provide complete context, institutional reference, or document identifier..."
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-hidden resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors disabled:opacity-50 shadow-xs"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  <span>Submit Ticket</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-3">
              {loading ? (
                <div className="py-12 flex items-center justify-center text-slate-400 text-sm">
                  <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading your support tickets...
                </div>
              ) : tickets.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-sm">
                  You have not submitted any help desk tickets yet.
                </div>
              ) : (
                tickets.map(tkt => (
                  <div
                    key={tkt.id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                        #{tkt.ticketId}
                      </span>
                      {getStatusBadge(tkt.status)}
                    </div>
                    <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                      {tkt.category}
                    </div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {tkt.subject}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {tkt.description}
                    </p>
                    {tkt.resolutionNote && (
                      <div className="mt-2 p-2.5 rounded-lg bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-800 dark:text-emerald-300">
                        <span className="font-semibold block mb-0.5">Official Academic Support Response:</span>
                        {tkt.resolutionNote}
                      </div>
                    )}
                    <div className="text-[11px] text-slate-400 pt-1">
                      Submitted: {new Date(tkt.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
