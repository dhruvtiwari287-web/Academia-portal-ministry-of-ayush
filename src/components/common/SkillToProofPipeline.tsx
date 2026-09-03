import React, { useState } from 'react';
import {
  CheckCircle2,
  BookOpen,
  Briefcase,
  IdCard,
  ArrowRight,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Award,
  Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface PipelineStage {
  id: string;
  stageNumber: number;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  exampleTitle: string;
  exampleDetail: string;
  evidence: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'NEXT_UP';
  actionUrl?: string;
  actionLabel?: string;
}

export const SkillToProofPipeline: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [selectedStage, setSelectedStage] = useState<number>(0);

  const stages: PipelineStage[] = [
    {
      id: 'skill',
      stageNumber: 1,
      label: 'SKILL',
      sublabel: 'Gap Identification',
      icon: <Layers className="w-5 h-5" />,
      exampleTitle: 'Research Methodology & GCP Protocols in Ayurveda',
      exampleDetail: 'Diagnostic gap identified via automated competency assessment. Target requirement is 4.5/5.0 for clinical trials.',
      evidence: 'Objective assessment score: 3.5 / 5.0 (Moderate Gap)',
      status: 'COMPLETED',
      actionUrl: '/student/skill-gaps',
      actionLabel: 'Analyze Skill Gap'
    },
    {
      id: 'learning',
      stageNumber: 2,
      label: 'LEARNING',
      sublabel: 'Curriculum & Case Studies',
      icon: <BookOpen className="w-5 h-5" />,
      exampleTitle: 'Good Clinical Practice (ICH-GCP E6 R2) & Schedule Y Training',
      exampleDetail: '16-hour accredited self-paced module with real-world case simulations on Phase II/III Ayurvedic trial reporting.',
      evidence: 'Module completed with 94% quiz score & certificate issued',
      status: 'COMPLETED',
      actionUrl: '/student/learning',
      actionLabel: 'View Learning Modules'
    },
    {
      id: 'experience',
      stageNumber: 3,
      label: 'EXPERIENCE',
      sublabel: 'Applied Research / Rotation',
      icon: <Briefcase className="w-5 h-5" />,
      exampleTitle: 'All India Institute of Ayurveda Clinical Research Rotation',
      exampleDetail: '3-month live rotation assisting in patient informed consent, CRF monitoring, and ASU pharmacovigilance data entry.',
      evidence: '120 hospital clinical hours logged & verified by AIIA supervisor',
      status: 'COMPLETED',
      actionUrl: '/student/projects',
      actionLabel: 'Explore Live Projects'
    },
    {
      id: 'proof',
      stageNumber: 4,
      label: 'PROOF',
      sublabel: 'Verified Skill Passport',
      icon: <IdCard className="w-5 h-5" />,
      exampleTitle: 'Digital AYUSH Skill Passport Endorsement',
      exampleDetail: 'Faculty-verified and mentor-stamped competency entry with cryptographic verification hash (AYUSH-VRF-2026-9042).',
      evidence: 'Officially shared with 8 matched healthcare recruiters',
      status: 'IN_PROGRESS',
      actionUrl: '/student/passport',
      actionLabel: 'Open Skill Passport'
    }
  ];

  const current = stages[selectedStage];

  if (compact) {
    return (
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Core Architecture: Skill → Learning → Experience → Proof</span>
          </div>
          <span className="text-[11px] text-slate-500">Progressive Maturation</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {stages.map((stage, idx) => (
            <div
              key={stage.id}
              className={`p-2.5 rounded-lg border text-left transition-all ${
                idx === 3
                  ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50/60 dark:bg-emerald-950/30'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-slate-400">0{stage.stageNumber}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100">{stage.label}</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{stage.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-1">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            <span>Continuous Medical Career Pathway</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            The AYUSH Competency Pipeline: Skill → Learning → Experience → Proof
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Real healthcare capability requires verified mastery at every step rather than unvalidated resume claims.
          </p>
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-500">
          <span>Current Stage:</span>
          <span className="font-bold text-emerald-700 dark:text-emerald-400">0{current.stageNumber} • {current.label}</span>
        </div>
      </div>

      {/* Stepper Pipeline Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stages.map((stage, idx) => {
          const isSelected = selectedStage === idx;
          return (
            <button
              key={stage.id}
              onClick={() => setSelectedStage(idx)}
              className={`p-3.5 rounded-xl border text-left transition-all relative ${
                isSelected
                  ? 'border-emerald-600 dark:border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 shadow-xs ring-2 ring-emerald-500/20'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/40 dark:bg-slate-800/30'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-400'}`}>
                  Stage 0{stage.stageNumber}
                </span>
                <span className={isSelected ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}>
                  {stage.icon}
                </span>
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-slate-100">{stage.label}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{stage.sublabel}</div>
              {stage.status === 'COMPLETED' && (
                <div className="mt-2 flex items-center gap-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Validated</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Stage Deep Dive */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
              {current.stageNumber}
            </span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              {current.label}: {current.exampleTitle}
            </h3>
          </div>
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            {current.sublabel}
          </span>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          {current.exampleDetail}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-xs">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span><strong>Verified Evidence:</strong> {current.evidence}</span>
          </div>

          {current.actionUrl && (
            <Link
              to={current.actionUrl}
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300"
            >
              <span>{current.actionLabel}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
