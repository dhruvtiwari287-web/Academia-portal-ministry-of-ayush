import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  BookOpen,
  Users,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';
import { SkillGap } from '../../types/index.js';
import { api } from '../../services/api.js';

export const SkillGapAnalysis: React.FC = () => {
  const [gaps, setGaps] = useState<SkillGap[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTarget, setSelectedTarget] = useState('AYUSH Clinical Research & GCP');

  useEffect(() => {
    async function load() {
      try {
        const res = await api.getSkillGaps();
        if (res.success) {
          setGaps(res.gaps || res.skillGaps || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Format data for Recharts Radar
  const radarData = (gaps || []).map(g => ({
    subject: g.competencyTitle.length > 22 ? g.competencyTitle.slice(0, 20) + '...' : g.competencyTitle,
    fullTitle: g.competencyTitle,
    Current: g.currentScore,
    Required: g.targetScore
  }));

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900">
            High Priority
          </span>
        );
      case 'Medium':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900">
            Medium Priority
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900">
            Low Priority
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>Interactive Competency Diagnostics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
            Skill Gap Analysis & Radar Diagnostic
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Visual comparison of your assessed competency levels versus the clinical and industry requirements for your target career pathway.
          </p>
        </div>

        <Link
          to="/student/assessment"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-xs transition-colors self-start md:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>Retake Competency Assessment</span>
        </Link>
      </div>

      {/* Target Pathway Selector Banner */}
      <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Info className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Diagnostic Benchmark
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Benchmark Target: {selectedTarget}
            </div>
          </div>
        </div>

        <Link
          to="/student/careers"
          className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
        >
          <span>Switch Target in Career Explorer</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Main Grid: Radar Chart on Left, Summary Stats on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Radar Chart Container (7 Cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Competency Radar Diagnostic
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Scale: 0.0 (Novice) to 5.0 (Autonomous Expert)
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="flex items-center gap-1 text-emerald-600">
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" /> Current Level
              </span>
              <span className="flex items-center gap-1 text-blue-500">
                <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" /> Industry Target
              </span>
            </div>
          </div>

          <div className="w-full h-80 sm:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius="75%">
                <PolarGrid stroke="#94a3b8" strokeOpacity={0.3} />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: '#64748b', fontSize: 11 }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 5]}
                  tick={{ fill: '#94a3b8', fontSize: 10 }}
                />
                <Radar
                  name="Current Level"
                  dataKey="Current"
                  stroke="#059669"
                  fill="#10b981"
                  fillOpacity={0.4}
                />
                <Radar
                  name="Industry Target"
                  dataKey="Required"
                  stroke="#3b82f6"
                  fill="#60a5fa"
                  fillOpacity={0.2}
                />
                <Tooltip
                  formatter={(value: any) => [`${value} / 5.0`, 'Score']}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Diagnostic Breakdown Summary (5 Cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
              Readiness Diagnostics
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Detailed gap analysis calculated against Ministry of Ayush clinical trial readiness standards.
            </p>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
                <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  Strength Area
                </div>
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 mt-0.5">
                  Ayurvedic Diagnostic Reasoning (Rogi-Roga Pariksha)
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Current score: 4.8 / 5.0 (Exceeds required threshold by +0.3). Verified in Skill Passport.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800">
                <div className="text-xs font-bold text-rose-800 dark:text-rose-300">
                  Critical Deficit to Bridge
                </div>
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 mt-0.5">
                  Statistical Significance in Traditional Medicine
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Current: 3.5 / 5.0 vs Target 4.5 / 5.0 (Gap: 1.0). High priority for Clinical Research Associate roles.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                <div className="text-xs font-bold text-blue-800 dark:text-blue-300">
                  Emerging Opportunity Area
                </div>
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 mt-0.5">
                  Ayush Grid & NAMASTE Electronic Records
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Current: 3.8 / 5.0 vs Target 4.5 / 5.0. Recommended 5-minute micro-learning video available.
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <Link
              to="/student/learning"
              className="w-full py-2.5 px-4 text-xs font-semibold bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <span>Go to Learning Hub to Bridge Gaps</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Actionable Recommendations Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
          Personalized Roadmap to Close Competency Gaps
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-3 px-3">Competency</th>
                <th className="py-3 px-3">Current / Target</th>
                <th className="py-3 px-3">Priority</th>
                <th className="py-3 px-3">Recommended Learning Module</th>
                <th className="py-3 px-3">Recommended Mentor</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {(gaps || []).map(g => (
                <tr key={g.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-3 font-semibold text-slate-900 dark:text-slate-100">
                    {g.competencyTitle}
                  </td>
                  <td className="py-3 px-3 font-mono">
                    <span className="font-bold text-slate-800 dark:text-slate-200">{g.currentScore}</span>
                    <span className="text-slate-400"> / </span>
                    <span className="text-blue-600 font-bold">{g.targetScore}</span>
                  </td>
                  <td className="py-3 px-3">{getPriorityBadge(g.priority)}</td>
                  <td className="py-3 px-3 text-slate-700 dark:text-slate-300 font-medium">
                    {g.recommendedModule}
                  </td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-400">
                    {g.recommendedMentor}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Link
                      to="/student/learning"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      <span>Enroll</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
