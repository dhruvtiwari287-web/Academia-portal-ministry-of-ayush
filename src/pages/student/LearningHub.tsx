import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Search,
  CheckCircle2,
  Clock,
  Award,
  Play,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Loader2
} from 'lucide-react';
import { LearningModule } from '../../types/index.js';
import { api } from '../../services/api.js';

export const LearningHub: React.FC = () => {
  const [modules, setModules] = useState<LearningModule[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'ALL' | 'ENROLLED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.getLearningModules();
        if (res.success) {
          setModules(res.modules);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleEnroll = async (modId: string) => {
    try {
      const res = await api.enrollModule(modId);
      if (res.success) {
        setModules(prev => prev.map(m => (m.id === modId ? res.module : m)));
        if (selectedModule?.id === modId) {
          setSelectedModule(res.module);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleProgress = async (modId: string, delta: number) => {
    const mod = modules.find(m => m.id === modId);
    if (!mod) return;
    const newProgress = Math.min(100, Math.max(0, (mod.progress || 0) + delta));
    try {
      const res = await api.updateModuleProgress(modId, newProgress);
      if (res.success) {
        setModules(prev => prev.map(m => (m.id === modId ? { ...m, progress: newProgress } : m)));
        if (selectedModule?.id === modId) {
          setSelectedModule(prev => (prev ? { ...prev, progress: newProgress } : null));
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = modules.filter(m => {
    const matchEnroll = activeTab === 'ALL' || (activeTab === 'ENROLLED' && m.enrolled);
    const matchSearch =
      !searchQuery ||
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchEnroll && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
          <BookOpen className="w-4 h-4" />
          <span>Accredited AYUSH Skill Curricula</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
          Learning Hub & Competency Modules
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Accredited modular courses designed with AIIA academic chairs and pharmaceutical experts to bridge clinical trial, quality control, and digital health competencies.
        </p>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('ALL')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'ALL'
                ? 'bg-emerald-700 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            All Modules ({modules.length})
          </button>
          <button
            onClick={() => setActiveTab('ENROLLED')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'ENROLLED'
                ? 'bg-emerald-700 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Enrolled / In Progress ({modules.filter(m => m.enrolled).length})
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search modules..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 outline-hidden"
          />
        </div>
      </div>

      {/* Grid of Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(mod => (
          <div
            key={mod.id}
            className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  {mod.category}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold">
                  {mod.difficulty}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2 leading-snug">
                {mod.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 mb-4">
                {mod.description}
              </p>

              {/* Learning Objectives summary */}
              <div className="space-y-1 mb-4">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Objectives:
                </span>
                {mod.learningObjectives.slice(0, 2).map((obj, i) => (
                  <div key={i} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{obj}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {mod.durationHours} Hours
                </span>
                <span>{mod.lessons.length} Lessons</span>
              </div>

              {mod.enrolled ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-500">Progress</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-mono">
                      {mod.progress}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600"
                      style={{ width: `${mod.progress}%` }}
                    />
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => setSelectedModule(mod)}
                      className="flex-1 py-1.5 px-3 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 rounded-lg hover:bg-slate-800 text-center"
                    >
                      Study Module
                    </button>
                    <button
                      onClick={() => handleProgress(mod.id, 25)}
                      title="Mark next lesson complete (+25%)"
                      className="py-1.5 px-2 text-xs font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-lg hover:bg-emerald-100"
                    >
                      +25%
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => handleEnroll(mod.id)}
                  className="w-full py-2 px-3 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Enroll in Course</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Module Detailed Study Modal / Slideover */}
      {selectedModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  {selectedModule.category}
                </span>
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {selectedModule.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedModule(null)}
                className="px-3 py-1 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              >
                Close
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4">
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200">
                <strong>AYUSH Relevance:</strong> {selectedModule.ayushRelevance}
              </div>

              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Course Curriculum & Interactive Lessons
              </h3>

              <div className="space-y-3">
                {selectedModule.lessons.map(l => {
                  const isExpanded = expandedLessonId === l.id;
                  return (
                    <div
                      key={l.id}
                      className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedLessonId(isExpanded ? null : l.id)}
                        className="w-full p-3.5 text-left flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-emerald-600" />
                          <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                            {l.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-slate-400">{l.durationMin} mins</span>
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 space-y-2 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                          <div>
                            <span className="font-bold text-slate-900 dark:text-slate-100">Core Concept:</span>{' '}
                            {l.content}
                          </div>
                          <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                            <strong>Takeaway:</strong> {l.summary}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
