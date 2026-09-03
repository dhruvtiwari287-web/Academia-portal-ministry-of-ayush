import React, { useState, useEffect } from 'react';
import {
  X,
  Bell,
  CheckCheck,
  ExternalLink,
  ShieldAlert,
  SlidersHorizontal,
  Search,
  CheckCircle2,
  Clock,
  Info,
  Calendar,
  Sparkles,
  ArrowLeft,
  Mail,
  Smartphone,
  Save,
  Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Notification } from '../../types/index.js';
import { api } from '../../services/api.js';
import { useAuth } from '../../context/AuthContext.js';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateCount?: (count: number) => void;
}

interface PreferencesState {
  opportunityAlerts: { inApp: boolean; email: boolean; push: boolean };
  applicationUpdates: { inApp: boolean; email: boolean; push: boolean };
  mentorship: { inApp: boolean; email: boolean; push: boolean };
  learning: { inApp: boolean; email: boolean; push: boolean };
  research: { inApp: boolean; email: boolean; push: boolean };
  industryEvents: { inApp: boolean; email: boolean; push: boolean };
  systemNotifications: { inApp: boolean; email: boolean; push: boolean };
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose, onUpdateCount }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'ACTIVITY' | 'PREFERENCES'>('ACTIVITY');
  const [savingPrefs, setSavingPrefs] = useState<boolean>(false);
  const [prefsSavedMessage, setPrefsSavedMessage] = useState<string | null>(null);

  const [preferences, setPreferences] = useState<PreferencesState>({
    opportunityAlerts: { inApp: true, email: true, push: false },
    applicationUpdates: { inApp: true, email: true, push: true },
    mentorship: { inApp: true, email: true, push: false },
    learning: { inApp: true, email: false, push: false },
    research: { inApp: true, email: true, push: false },
    industryEvents: { inApp: true, email: false, push: false },
    systemNotifications: { inApp: true, email: true, push: true }
  });

  const navigate = useNavigate();

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await api.getNotifications();
      if (res.success) {
        setNotifications(res.notifications);
        onUpdateCount?.(res.unreadCount);
      }
    } catch (err) {
      console.error('Failed to load notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPreferences = async () => {
    try {
      const res = await api.getNotificationPreferences();
      if (res.success && res.preferences) {
        setPreferences(res.preferences);
      }
    } catch (err) {
      console.error('Failed to load preferences:', err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
      fetchPreferences();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleMarkRead = async (id: string) => {
    try {
      await api.markNotificationRead(id);
      setNotifications(prev => prev.map(n => (n.id === id ? { ...n, isRead: true } : n)));
      const remainingUnread = notifications.filter(n => n.id !== id && !n.isRead).length;
      onUpdateCount?.(remainingUnread);
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await api.markAllNotificationsRead();
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      onUpdateCount?.(0);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAction = (notif: Notification) => {
    handleMarkRead(notif.id);
    if (notif.actionUrl) {
      navigate(notif.actionUrl);
      onClose();
    }
  };

  const handleSavePreferences = async () => {
    setSavingPrefs(true);
    try {
      const res = await api.updateNotificationPreferences(preferences);
      if (res.success) {
        setPrefsSavedMessage('Preferences saved successfully.');
        setTimeout(() => setPrefsSavedMessage(null), 2500);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSavingPrefs(false);
    }
  };

  // Human-readable relative timestamp helper
  const getRelativeTime = (dateStr: string) => {
    const time = new Date(dateStr).getTime();
    const now = Date.now();
    const diffMs = now - time;
    const diffMins = Math.floor(diffMs / (60 * 1000));
    const diffHours = Math.floor(diffMs / (60 * 60 * 1000));
    const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));

    if (diffMins < 2) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return new Date(dateStr).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  // Grouping helper
  const getDateGroup = (dateStr: string): 'Today' | 'Yesterday' | 'Earlier' => {
    const time = new Date(dateStr).getTime();
    const now = Date.now();
    const diffHours = (now - time) / (60 * 60 * 1000);
    if (diffHours <= 24) return 'Today';
    if (diffHours <= 48) return 'Yesterday';
    return 'Earlier';
  };

  // Filtering
  const filtered = notifications.filter(n => {
    const matchesFilter =
      filter === 'All'
        ? true
        : filter === 'Unread'
        ? !n.isRead
        : n.category.toLowerCase() === filter.toLowerCase();

    const matchesSearch =
      searchQuery.trim() === ''
        ? true
        : n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          n.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
          n.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const categories = [
    'All',
    'Unread',
    'Opportunities',
    'Applications',
    'Mentorship',
    'Learning',
    'Research',
    'System'
  ];

  // Group notifications
  const groupedNotifications: Record<'Today' | 'Yesterday' | 'Earlier', Notification[]> = {
    Today: [],
    Yesterday: [],
    Earlier: []
  };

  filtered.forEach(n => {
    const group = getDateGroup(n.createdAt);
    groupedNotifications[group].push(n);
  });

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="notification-drawer">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                    {viewMode === 'ACTIVITY' ? 'Notification & Activity Center' : 'Notification Preferences'}
                  </h3>
                  {viewMode === 'ACTIVITY' && unreadCount > 0 && (
                    <span className="px-1.5 py-0.5 text-[11px] font-bold rounded-full bg-emerald-600 text-white">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {viewMode === 'ACTIVITY'
                    ? `Role: ${user?.role || 'STUDENT'} • Smart Institutional Stream`
                    : 'Configure In-App, Email & Push Alert Channels'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {viewMode === 'ACTIVITY' ? (
                <>
                  <button
                    onClick={handleMarkAllRead}
                    title="Mark all as read"
                    disabled={unreadCount === 0}
                    className="p-1.5 text-xs text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1 disabled:opacity-40"
                  >
                    <CheckCheck className="w-4 h-4" />
                    <span className="hidden sm:inline">Mark all read</span>
                  </button>
                  <button
                    onClick={() => setViewMode('PREFERENCES')}
                    title="Notification Preferences"
                    className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setViewMode('ACTIVITY')}
                  className="px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-950/40 flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Alerts</span>
                </button>
              )}

              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* VIEW 1: ACTIVITY STREAM */}
          {viewMode === 'ACTIVITY' && (
            <>
              {/* Search Bar */}
              <div className="px-4 pt-3 pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search notifications by keyword..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Filter Pills */}
              <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto text-xs no-scrollbar">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-colors ${
                      filter === cat
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Notification List Grouped by Date */}
              <div className="flex-1 overflow-y-auto p-4 space-y-5">
                {loading ? (
                  <div className="py-20 text-center text-slate-400 text-sm flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                    <span>Loading activity stream...</span>
                  </div>
                ) : filtered.length === 0 ? (
                  <div className="py-20 text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
                      <Bell className="w-6 h-6" />
                    </div>
                    <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      No notifications found
                    </h4>
                    <p className="text-xs text-slate-400 max-w-xs mx-auto">
                      {searchQuery
                        ? `No alerts matching "${searchQuery}" in this category.`
                        : 'You are all caught up! Updates on research, internships, and mentorship will appear here.'}
                    </p>
                  </div>
                ) : (
                  (['Today', 'Yesterday', 'Earlier'] as const).map(group => {
                    const items = groupedNotifications[group];
                    if (items.length === 0) return null;

                    return (
                      <div key={group} className="space-y-2.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            {group}
                          </span>
                          <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800" />
                          <span className="text-[10px] text-slate-400">{items.length}</span>
                        </div>

                        <div className="space-y-2.5">
                          {items.map(notif => (
                            <div
                              key={notif.id}
                              className={`p-3.5 rounded-xl border transition-all ${
                                !notif.isRead
                                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/70 shadow-xs'
                                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2 mb-1.5">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-100/70 dark:bg-emerald-900/40">
                                    {notif.category}
                                  </span>

                                  {/* Smart Priority Indicators */}
                                  {notif.priority === 'HIGH' && (
                                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900 flex items-center gap-0.5">
                                      <ShieldAlert className="w-2.5 h-2.5" /> High Priority
                                    </span>
                                  )}
                                  {notif.priority === 'NORMAL' && (
                                    <span className="px-1.5 py-0.5 rounded text-[10px] font-medium text-slate-500 dark:text-slate-400">
                                      Standard
                                    </span>
                                  )}
                                  {notif.priority === 'LOW' && (
                                    <span className="px-1.5 py-0.5 rounded text-[10px] font-medium text-slate-400">
                                      Notice
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-center gap-1.5">
                                  <span className="text-[11px] text-slate-400 whitespace-nowrap">
                                    {getRelativeTime(notif.createdAt)}
                                  </span>
                                  {!notif.isRead && (
                                    <button
                                      onClick={() => handleMarkRead(notif.id)}
                                      title="Mark as read"
                                      className="text-slate-400 hover:text-emerald-600 p-0.5"
                                    >
                                      <CheckCircle2 className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </div>
                              </div>

                              <h4 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1 leading-snug">
                                {notif.title}
                              </h4>
                              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                                {notif.message}
                              </p>

                              {/* Actionable Button */}
                              {notif.actionUrl && (
                                <div className="flex items-center justify-end pt-2 border-t border-slate-100 dark:border-slate-800/80">
                                  <button
                                    onClick={() => handleAction(notif)}
                                    className="px-2.5 py-1 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md shadow-xs flex items-center gap-1 transition-colors"
                                  >
                                    <span>{notif.actionLabel || 'View Details'}</span>
                                    <ExternalLink className="w-3 h-3" />
                                  </button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </>
          )}

          {/* VIEW 2: NOTIFICATION PREFERENCES */}
          {viewMode === 'PREFERENCES' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
                  <Info className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Channel Delivery Architecture</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                  In-App alerts are delivered live and instantaneously via the platform backend. Email and push notification channels can be enabled in accordance with institutional policy.
                </p>
              </div>

              {prefsSavedMessage && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{prefsSavedMessage}</span>
                </div>
              )}

              <div className="space-y-3">
                {[
                  { key: 'opportunityAlerts', label: 'Opportunity Alerts', desc: 'New internships, fellowships & training openings' },
                  { key: 'applicationUpdates', label: 'Application Updates', desc: 'Shortlists, selection outcomes & interview scheduling' },
                  { key: 'mentorship', label: 'Mentorship Sessions', desc: 'Session confirmations, reminders & feedback reports' },
                  { key: 'learning', label: 'Learning & Assessments', desc: 'Competency gap modules & certificate issuances' },
                  { key: 'research', label: 'Research & Innovation', desc: 'Live extramural trials & hackathon challenges' },
                  { key: 'industryEvents', label: 'Industry Workshops & FDPs', desc: 'Schedule T GMP, HPTLC & pharmacovigilance workshops' },
                  { key: 'systemNotifications', label: 'System & Passport Updates', desc: 'Cryptographic skill endorsements & institutional sign-offs' }
                ].map(item => {
                  const pref = (preferences as any)[item.key] || { inApp: true, email: false, push: false };
                  return (
                    <div
                      key={item.key}
                      className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 space-y-2"
                    >
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                          {item.label}
                        </h4>
                        <p className="text-[11px] text-slate-400">{item.desc}</p>
                      </div>

                      <div className="flex items-center gap-4 text-xs pt-1 border-t border-slate-100 dark:border-slate-800">
                        <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300">
                          <input
                            type="checkbox"
                            checked={pref.inApp}
                            onChange={e =>
                              setPreferences(p => ({
                                ...p,
                                [item.key]: { ...((p as any)[item.key]), inApp: e.target.checked }
                              }))
                            }
                            className="rounded text-emerald-600 focus:ring-emerald-500"
                          />
                          <span>In-App</span>
                        </label>

                        <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300">
                          <input
                            type="checkbox"
                            checked={pref.email}
                            onChange={e =>
                              setPreferences(p => ({
                                ...p,
                                [item.key]: { ...((p as any)[item.key]), email: e.target.checked }
                              }))
                            }
                            className="rounded text-emerald-600 focus:ring-emerald-500"
                          />
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3 text-slate-400" />
                            <span>Email</span>
                          </span>
                        </label>

                        <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300">
                          <input
                            type="checkbox"
                            checked={pref.push}
                            onChange={e =>
                              setPreferences(p => ({
                                ...p,
                                [item.key]: { ...((p as any)[item.key]), push: e.target.checked }
                              }))
                            }
                            className="rounded text-emerald-600 focus:ring-emerald-500"
                          />
                          <span className="flex items-center gap-1">
                            <Smartphone className="w-3 h-3 text-slate-400" />
                            <span>Push</span>
                          </span>
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2">
                <button
                  onClick={handleSavePreferences}
                  disabled={savingPrefs}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  {savingPrefs ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving preferences...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Notification Preferences</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
