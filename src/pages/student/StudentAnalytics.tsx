import React, { useState } from 'react';
import {
  TrendingUp,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  Target,
  BarChart2,
  FileCheck2
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

export const StudentAnalytics: React.FC = () => {
  const competencyTimeline = [
    { month: 'Jan', ayurveda: 3.8, researchGCP: 2.5, pharmacology: 3.2, eHealth: 2.0 },
    { month: 'Feb', ayurveda: 4.1, researchGCP: 2.8, pharmacology: 3.5, eHealth: 2.6 },
    { month: 'Mar', ayurveda: 4.3, researchGCP: 3.4, pharmacology: 3.9, eHealth: 3.1 },
    { month: 'Apr', ayurveda: 4.6, researchGCP: 3.9, pharmacology: 4.2, eHealth: 3.5 },
    { month: 'May (Current)', ayurveda: 4.8, researchGCP: 4.2, pharmacology: 4.4, eHealth: 3.8 }
  ];

  const applicationFunnel = [
    { stage: 'Applied', count: 5 },
    { stage: 'Under Review', count: 3 },
    { stage: 'Shortlisted', count: 2 },
    { stage: 'Interview', count: 1 },
    { stage: 'Accepted', count: 1 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
          <TrendingUp className="w-4 h-4" />
          <span>Competency & Progression Metrics</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
          Personal Academic & Clinical Growth Analytics
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Longitudinal tracking of clinical competencies, assessment milestones, and industry placement progression.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Overall Readiness Index
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-700 dark:text-emerald-400 mt-1 font-mono">
            87.4%
          </div>
          <div className="text-xs text-emerald-600 flex items-center gap-1 mt-1 font-semibold">
            <span>+12.6% over past 4 months</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Verified Clinical Log Hours
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mt-1 font-mono">
            620 hrs
          </div>
          <div className="text-xs text-slate-500 mt-1">Across 3 hospital rotations</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Mentorship Touchpoints
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-blue-600 mt-1 font-mono">
            8 Sessions
          </div>
          <div className="text-xs text-slate-500 mt-1">100% milestone adherence</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Placement Match Index
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-purple-600 mt-1 font-mono">
            94%
          </div>
          <div className="text-xs text-purple-600 font-semibold mt-1">
            Clinical Research & QA roles
          </div>
        </div>
      </div>

      {/* Chart 1: Competency Trajectory Over Time */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Competency Growth Trajectory (5-Point Evaluation Scale)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Assessed monthly through verified clinical rotations, modular evaluations, and AIIA faculty reviews.
          </p>
        </div>

        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={competencyTimeline} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" strokeOpacity={0.2} />
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis domain={[0, 5]} tick={{ fill: '#64748b', fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '12px'
                }}
              />
              <Line type="monotone" dataKey="ayurveda" name="Ayurvedic Therapeutics" stroke="#059669" strokeWidth={2.5} />
              <Line type="monotone" dataKey="researchGCP" name="Research & GCP" stroke="#3b82f6" strokeWidth={2.5} />
              <Line type="monotone" dataKey="pharmacology" name="Phytochemistry & QA" stroke="#8b5cf6" strokeWidth={2.5} />
              <Line type="monotone" dataKey="eHealth" name="Ayush Grid & Informatics" stroke="#f59e0b" strokeWidth={2.5} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Applications Funnel */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Internship & Research Placement Pipeline
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Active distribution of applications across recruitment stages.
          </p>
        </div>

        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={applicationFunnel} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" strokeOpacity={0.2} />
              <XAxis dataKey="stage" tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis allowDecimals={false} tick={{ fill: '#64748b', fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '12px'
                }}
              />
              <Bar dataKey="count" name="Applications" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
