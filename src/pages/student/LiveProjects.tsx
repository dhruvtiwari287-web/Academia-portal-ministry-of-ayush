import React, { useState, useEffect } from 'react';
import {
  FolderGit2,
  Users,
  CheckCircle2,
  Calendar,
  Building2,
  Sparkles,
  ArrowRight,
  Target
} from 'lucide-react';
import { LiveProject } from '../../types/index.js';
import { api } from '../../services/api.js';

export const LiveProjects: React.FC = () => {
  const [projects, setProjects] = useState<LiveProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.getLiveProjects();
        if (res.success) {
          setProjects(res.projects);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
          <FolderGit2 className="w-4 h-4" />
          <span>Experiential Team Collaborations</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
          Live Industry & Academic Projects
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Interdisciplinary hands-on team projects guided by industry leads and senior academicians. Work on real herbal pharmacopoeial databases and clinical registries.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map(proj => (
          <div
            key={proj.id}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  {proj.category}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300">
                  {proj.status}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
                {proj.title}
              </h3>
              <div className="text-xs text-slate-500 mb-3">
                {proj.organization} • Mentor: {proj.mentorName}
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {proj.description}
              </p>

              {/* Milestones Checklist */}
              <div className="space-y-2 mb-4">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Project Milestones:
                </span>
                {proj.milestones.map(m => (
                  <div
                    key={m.id}
                    className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2
                        className={`w-3.5 h-3.5 ${m.completed ? 'text-emerald-600' : 'text-slate-300'}`}
                      />
                      <span className={m.completed ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-300 font-medium'}>
                        {m.title}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Due: {new Date(m.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-slate-500">
                <Users className="w-3.5 h-3.5" />
                <span>{proj.teamMembersCount} Scholars in Team</span>
              </div>
              <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                Duration: {proj.duration}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
