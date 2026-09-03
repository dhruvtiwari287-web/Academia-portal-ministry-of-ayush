import React, { useState } from 'react';
import {
  GitCompare,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Briefcase,
  Building,
  Target,
  Sparkles,
  ShieldCheck,
  Microscope,
  Stethoscope
} from 'lucide-react';
import { CareerPathway } from '../../types/index.js';

interface CareerComparisonProps {
  pathways: CareerPathway[];
  onSetTargetPathway?: (pathwayId: string) => void;
}

export const CareerComparison: React.FC<CareerComparisonProps> = ({
  pathways,
  onSetTargetPathway
}) => {
  const [pathwayAId, setPathwayAId] = useState<string>(
    pathways[0]?.id || 'path-clinical-research'
  );
  const [pathwayBId, setPathwayBId] = useState<string>(
    pathways[1]?.id || 'path-hospital-panchakarma'
  );
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const pathwayA = pathways.find(p => p.id === pathwayAId) || pathways[0];
  const pathwayB = pathways.find(p => p.id === pathwayBId) || pathways[1] || pathways[0];

  const handleSetTarget = (pathway: CareerPathway) => {
    if (onSetTargetPathway) {
      onSetTargetPathway(pathway.id);
      setSuccessMsg(`Target career successfully updated to "${pathway.title}"`);
      setTimeout(() => setSuccessMsg(null), 3500);
    }
  };

  // Helper comparison dimensions
  const dimensions = [
    {
      title: 'Target Placements & Work Environment',
      icon: <Building className="w-4 h-4 text-emerald-600" />,
      getValueA: (p: CareerPathway) => (
        <div className="space-y-1 text-xs">
          <div className="font-semibold text-slate-800 dark:text-slate-200">
            {p.internshipTypes.join(', ')}
          </div>
          <div className="text-slate-500 text-[11px]">
            Primary domain: {p.category}
          </div>
        </div>
      ),
      getValueB: (p: CareerPathway) => (
        <div className="space-y-1 text-xs">
          <div className="font-semibold text-slate-800 dark:text-slate-200">
            {p.internshipTypes.join(', ')}
          </div>
          <div className="text-slate-500 text-[11px]">
            Primary domain: {p.category}
          </div>
        </div>
      )
    },
    {
      title: 'Core Competencies Required',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
      getValueA: (p: CareerPathway) => (
        <div className="space-y-1">
          {p.competenciesRequired.map((c, i) => (
            <div key={i} className="flex items-start gap-1.5 text-xs text-slate-700 dark:text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
              <span>{c}</span>
            </div>
          ))}
        </div>
      ),
      getValueB: (p: CareerPathway) => (
        <div className="space-y-1">
          {p.competenciesRequired.map((c, i) => (
            <div key={i} className="flex items-start gap-1.5 text-xs text-slate-700 dark:text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span>{c}</span>
            </div>
          ))}
        </div>
      )
    },
    {
      title: 'Required Curricular Learning Path',
      icon: <BookOpen className="w-4 h-4 text-blue-600" />,
      getValueA: (p: CareerPathway) => (
        <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
          {p.learningAreas.map((lp, i) => (
            <div key={i} className="p-2 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
              <span className="font-semibold text-emerald-700 dark:text-emerald-400">Step {i + 1}: </span>
              <span>{lp}</span>
            </div>
          ))}
        </div>
      ),
      getValueB: (p: CareerPathway) => (
        <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
          {p.learningAreas.map((lp, i) => (
            <div key={i} className="p-2 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
              <span className="font-semibold text-blue-700 dark:text-blue-400">Step {i + 1}: </span>
              <span>{lp}</span>
            </div>
          ))}
        </div>
      )
    },
    {
      title: 'Practical & Clinical Exposure',
      icon: <Stethoscope className="w-4 h-4 text-purple-600" />,
      getValueA: (p: CareerPathway) => (
        <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
          {p.projectTypes.join('; ') ||
            'Supervised clinical rotations, patient documentation, hands-on diagnostics and procedure observation.'}
        </div>
      ),
      getValueB: (p: CareerPathway) => (
        <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
          {p.projectTypes.join('; ') ||
            'Specialized clinical rotations, diagnostic logbook maintenance, and therapeutic procedure observation.'}
        </div>
      )
    },
    {
      title: 'Research & Analytical Exposure',
      icon: <Microscope className="w-4 h-4 text-amber-600" />,
      getValueA: (p: CareerPathway) => (
        <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
          {p.researchSkills.join(', ') ||
            'Evidence appraisal, institutional ethics compliance, dissertation writing, and scientific literature review.'}
        </div>
      ),
      getValueB: (p: CareerPathway) => (
        <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
          {p.researchSkills.join(', ') ||
            'Quality evaluation, literature synthesis, and institutional project documentation.'}
        </div>
      )
    },
    {
      title: 'Recommended Preparation & Next Steps',
      icon: <Target className="w-4 h-4 text-rose-600" />,
      getValueA: (p: CareerPathway) => (
        <div className="p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 text-xs text-slate-700 dark:text-slate-300 space-y-1">
          <div className="font-semibold text-emerald-800 dark:text-emerald-300">
            Immediate Recommended Action:
          </div>
          <div>
            Enroll in introductory {p.competenciesRequired[0] || 'competency'} module and complete the diagnostic pre-assessment.
          </div>
        </div>
      ),
      getValueB: (p: CareerPathway) => (
        <div className="p-3 rounded-lg bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 text-xs text-slate-700 dark:text-slate-300 space-y-1">
          <div className="font-semibold text-blue-800 dark:text-blue-300">
            Immediate Recommended Action:
          </div>
          <div>
            Complete the {p.competenciesRequired[0] || 'competency'} assessment and schedule an advisory discussion with an institutional mentor.
          </div>
        </div>
      )
    }
  ];

  if (!pathwayA || !pathwayB) {
    return (
      <div className="p-8 text-center text-slate-400">
        Loading career pathways for comparison...
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
            <GitCompare className="w-4 h-4" />
            <span>Side-by-Side Evaluation</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Compare AYUSH Career Pathways
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Evaluate two distinct progression routes across academic requirements, clinical hours, research exposure, and employment outcomes.
          </p>
        </div>

        {successMsg && (
          <div className="px-3 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center gap-1.5 shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}
      </div>

      {/* Selectors Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pathway A Selector Card */}
        <div className="p-4 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/20 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
              Pathway A (Primary)
            </span>
            <button
              onClick={() => handleSetTarget(pathwayA)}
              className="px-3 py-1 text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg transition-colors shadow-xs"
            >
              Set as Target
            </button>
          </div>
          <select
            value={pathwayAId}
            onChange={e => setPathwayAId(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-800 rounded-lg text-slate-900 dark:text-slate-100 font-semibold focus:ring-2 focus:ring-emerald-500 outline-hidden"
          >
            {pathways.map(p => (
              <option key={p.id} value={p.id}>
                {p.title} ({p.category})
              </option>
            ))}
          </select>
          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
            {pathwayA.overview}
          </p>
        </div>

        {/* Pathway B Selector Card */}
        <div className="p-4 rounded-xl border border-blue-300 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-950/20 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300">
              Pathway B (Alternative)
            </span>
            <button
              onClick={() => handleSetTarget(pathwayB)}
              className="px-3 py-1 text-xs font-semibold bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors shadow-xs"
            >
              Set as Target
            </button>
          </div>
          <select
            value={pathwayBId}
            onChange={e => setPathwayBId(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-blue-300 dark:border-blue-800 rounded-lg text-slate-900 dark:text-slate-100 font-semibold focus:ring-2 focus:ring-blue-500 outline-hidden"
          >
            {pathways.map(p => (
              <option key={p.id} value={p.id}>
                {p.title} ({p.category})
              </option>
            ))}
          </select>
          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
            {pathwayB.overview}
          </p>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden shadow-xs">
        {dimensions.map((dim, idx) => (
          <div key={idx} className="p-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              {dim.icon}
              <span>{dim.title}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <div className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 mb-1">
                  {pathwayA.title}
                </div>
                {dim.getValueA(pathwayA)}
              </div>

              <div className="p-3 rounded-lg bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <div className="text-[10px] font-bold text-blue-700 dark:text-blue-400 mb-1">
                  {pathwayB.title}
                </div>
                {dim.getValueB(pathwayB)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
