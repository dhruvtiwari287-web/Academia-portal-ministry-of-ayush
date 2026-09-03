import React, { useState, useEffect } from 'react';
import {
  Microscope,
  Calendar,
  Clock,
  Building2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Award,
  Search,
  ExternalLink
} from 'lucide-react';
import { ResearchOpportunity } from '../../types/index.js';
import { api } from '../../services/api.js';

export const ResearchOpportunities: React.FC = () => {
  const [researchList, setResearchList] = useState<ResearchOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const res = await api.getResearchOpportunities();
        if (res.success) {
          setResearchList(res.research);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = researchList.filter(r =>
    !searchQuery ||
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.mentorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
          <Microscope className="w-4 h-4" />
          <span>Scientific Inquiries & Clinical Trials</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
          AYUSH Research Opportunities & Extramural Grants
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Multi-center clinical investigations, pharmacovigilance studies, and herbal standardization grants supported by the Ministry of Ayush, AIIA, and ICMR.
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        <input
          type="text"
          placeholder="Search research projects, mentors, domains..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 outline-hidden"
        />
      </div>

      {/* Research Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(r => (
          <div
            key={r.id}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[11px] font-semibold text-purple-700 dark:text-purple-400 uppercase tracking-wider">
                  {r.domain}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                  {r.status}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
                {r.title}
              </h3>
              <div className="text-xs font-semibold text-slate-500 mb-3">
                {r.institution} • Principal Investigator: {r.mentorName}
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                <strong>Objective:</strong> {r.objective}
              </p>

              <div className="space-y-1.5 mb-4">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Skills Required:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {r.skillsRequired.map((s, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Grant / Stipend:</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-400">{r.grantOrStipend}</span>
              </div>

              <div className="text-right">
                <span className="text-slate-400 block text-[11px]">Duration:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">{r.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
