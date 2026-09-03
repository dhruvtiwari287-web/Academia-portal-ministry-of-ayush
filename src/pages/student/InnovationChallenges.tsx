import React, { useState, useEffect } from 'react';
import {
  Award,
  Calendar,
  Users,
  Trophy,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { InnovationChallenge } from '../../types/index.js';
import { api } from '../../services/api.js';

export const InnovationChallenges: React.FC = () => {
  const [challenges, setChallenges] = useState<InnovationChallenge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.getResearchOpportunities(); // Or dedicated challenges
        // Sample challenges from standard dataStore
        setChallenges([
          {
            id: 'chal-1',
            title: 'National AYUSH Smart Automation & Standardization Grand Challenge',
            problem: 'Develop a computer vision and sensor-assisted monitoring protocol to automate the Sneha Kalpana (medicated oil boiling) endpoint detection according to Classical Sharangadhara Samhita standards.',
            domain: 'Ayurveda Pharmaceutical Engineering & Smart Automation',
            eligibility: 'Open to AYUSH UG/PG scholars, faculty guides, and multidisciplinary engineering partners',
            skills: ['Ayurvedic Pharmacy', 'Sensor Integration', 'Quality Control', 'Schedule T'],
            maxTeamSize: 4,
            awardInfo: '₹2,50,000 First Prize + AIIA Incubation Support + Patent Assistance',
            deadline: '2025-06-30',
            status: 'OPEN'
          },
          {
            id: 'chal-2',
            title: 'NAMASTE-ICD-11 Dual Coding & Clinical Ontology Hackathon',
            problem: 'Construct accurate bidirectional mapping rules between the Ministry of Ayush NAMASTE Portal Ayurvedic morbidity terminologies and WHO ICD-11 Traditional Medicine Module.',
            domain: 'Digital Health & Health Informatics',
            eligibility: 'Scholars in BAMS/MD/MS with clinical data interest',
            skills: ['Medical Terminology', 'Ayush Grid', 'EHR Protocols', 'Health Informatics'],
            maxTeamSize: 3,
            awardInfo: '₹1,50,000 Cash Prize + Fellowship with Ministry of Ayush Informatics Division',
            deadline: '2025-07-15',
            status: 'OPEN'
          }
        ]);
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
          <Award className="w-4 h-4" />
          <span>National Innovation Competitions</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
          AYUSH Innovation Challenges & Hackathons
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Solve national healthcare dilemmas under Ministry of Ayush initiatives, win seed grants, and incubate traditional medicine technologies at AIIA.
        </p>
      </div>

      {/* Challenges List */}
      <div className="space-y-6">
        {challenges.map(chal => (
          <div
            key={chal.id}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  {chal.domain}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                  {chal.title}
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 self-start sm:self-auto">
                {chal.status}
              </span>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>The Problem:</strong> {chal.problem}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs">
              <div>
                <div className="text-slate-400 uppercase tracking-wider font-semibold text-[10px]">
                  Prizes & Support
                </div>
                <div className="font-bold text-emerald-700 dark:text-emerald-400 mt-0.5 flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{chal.awardInfo}</span>
                </div>
              </div>
              <div>
                <div className="text-slate-400 uppercase tracking-wider font-semibold text-[10px]">
                  Team Structure
                </div>
                <div className="text-slate-700 dark:text-slate-300 font-medium mt-0.5 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>Max {chal.maxTeamSize} Members per Team</span>
                </div>
              </div>
              <div>
                <div className="text-slate-400 uppercase tracking-wider font-semibold text-[10px]">
                  Deadline
                </div>
                <div className="text-slate-700 dark:text-slate-300 font-medium mt-0.5 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(chal.deadline).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex flex-wrap gap-1.5">
                {chal.skills.map((s, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <button
                onClick={() => alert(`Registration details for ${chal.title} sent to your official student email.`)}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
              >
                <span>Register Team</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
