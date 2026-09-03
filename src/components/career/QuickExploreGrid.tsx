import React from 'react';
import {
  Stethoscope,
  Microscope,
  FlaskConical,
  Building2,
  Leaf,
  Users,
  GraduationCap,
  Activity,
  Lightbulb,
  Briefcase,
  ArrowRight
} from 'lucide-react';

interface QuickExploreProps {
  onSelectCategory: (category: string) => void;
  onSelectPathwayTitle?: (titleKeywords: string) => void;
}

interface QuickTile {
  id: string;
  title: string;
  category: string;
  keyword: string;
  icon: React.ReactNode;
  description: string;
  highlightCompetency: string;
  targetRole: string;
  color: string;
}

export const QuickExploreGrid: React.FC<QuickExploreProps> = ({
  onSelectCategory,
  onSelectPathwayTitle
}) => {
  const tiles: QuickTile[] = [
    {
      id: 'clinical-practice',
      title: 'Clinical Practice',
      category: 'Clinical Care',
      keyword: 'Clinical Practice',
      icon: <Stethoscope className="w-5 h-5" />,
      description: 'Hospital IPD/OPD rotations, classical Ayurvedic diagnostics, Shodhana therapies, and specialized Panchakarma care centers.',
      highlightCompetency: 'Nadi & Rogi Pariksha, Panchakarma Protocol',
      targetRole: 'Clinical Specialist / Medical Officer',
      color: 'emerald'
    },
    {
      id: 'clinical-research',
      title: 'Clinical Research',
      category: 'Research & Academia',
      keyword: 'Clinical Research',
      icon: <Microscope className="w-5 h-5" />,
      description: 'Good Clinical Practice (GCP) compliant clinical trials, safety registries, CTRI registration, and protocol design for herbal interventions.',
      highlightCompetency: 'ICMR-AYUSH GCP, CTRI Protocols',
      targetRole: 'Clinical Research Associate (CRA)',
      color: 'blue'
    },
    {
      id: 'ayush-research',
      title: 'AYUSH Research',
      category: 'Research & Academia',
      keyword: 'Drug Discovery',
      icon: <FlaskConical className="w-5 h-5" />,
      description: 'Extramural grant projects with AIIA, CCRAS, CSIR, and ICMR. Phytochemical characterization and reverse pharmacology.',
      highlightCompetency: 'Scientific Paper Writing, Bio-statistics',
      targetRole: 'Junior / Senior Research Fellow (JRF/SRF)',
      color: 'violet'
    },
    {
      id: 'pharmaceutical-industry',
      title: 'Pharmaceutical Industry',
      category: 'Pharmaceutical Industry',
      keyword: 'Pharmaceutical',
      icon: <Building2 className="w-5 h-5" />,
      description: 'Ayurvedic, Siddha & Unani (ASU) manufacturing, Schedule T GMP compliance, shelf-life studies, and pharmacopoeial assays.',
      highlightCompetency: 'Schedule T GMP, ASU Pharmacopoeial Testing',
      targetRole: 'QC/QA Executive / Formulation Scientist',
      color: 'amber'
    },
    {
      id: 'medicinal-plants',
      title: 'Medicinal Plants & Agro-Forestry',
      category: 'Pharmaceutical Industry',
      keyword: 'Medicinal Plants',
      icon: <Leaf className="w-5 h-5" />,
      description: 'Good Agricultural and Field Collection Practices (GACP), sustainable harvesting, National Medicinal Plants Board (NMPB) schemes.',
      highlightCompetency: 'Botanical Identification, Supply Chain GACP',
      targetRole: 'Botanical Procurement Officer / Agronomist',
      color: 'emerald'
    },
    {
      id: 'public-health',
      title: 'Public Health & Policy',
      category: 'Public Health & Policy',
      keyword: 'Public Health',
      icon: <Users className="w-5 h-5" />,
      description: 'National AYUSH Mission implementation, Ayushman Bharat Health & Wellness Centres, epidemic preventive community protocols.',
      highlightCompetency: 'Community Health Assessment, Policy Advocacy',
      targetRole: 'District AYUSH Officer / Program Lead',
      color: 'teal'
    },
    {
      id: 'academic-career',
      title: 'Academic Career',
      category: 'Research & Academia',
      keyword: 'Academic',
      icon: <GraduationCap className="w-5 h-5" />,
      description: 'NCISM-recognized faculty positions, bedside clinical tutoring, curriculum design, and postgraduate mentorship.',
      highlightCompetency: 'Medical Pedagogy, Classical Text Exegesis',
      targetRole: 'Assistant Professor / Clinical Lecturer',
      color: 'indigo'
    },
    {
      id: 'digital-health',
      title: 'Digital Health & Informatics',
      category: 'Healthcare Technology',
      keyword: 'Health Informatics',
      icon: <Activity className="w-5 h-5" />,
      description: 'Ayush Grid deployment, NAMASTE portal terminology mapping to WHO ICD-11, telemedicine portals, and health informatics.',
      highlightCompetency: 'NAMASTE Ontology, Ayush Grid EHR',
      targetRole: 'Health Informatician / EHR Consultant',
      color: 'cyan'
    },
    {
      id: 'healthcare-innovation',
      title: 'Healthcare Innovation',
      category: 'Innovation & Incubation',
      keyword: 'MedTech',
      icon: <Lightbulb className="w-5 h-5" />,
      description: 'Smart automation of traditional drug preparation (Sneha Kalpana endpoint sensors), diagnostic bio-devices, and AIIA incubation.',
      highlightCompetency: 'Sensor Integration, Bio-Design Prototyping',
      targetRole: 'AYUSH MedTech Innovator / Product Lead',
      color: 'rose'
    },
    {
      id: 'entrepreneurship',
      title: 'Entrepreneurship & Wellness',
      category: 'Wellness & Lifestyle Medicine',
      keyword: 'Wellness',
      icon: <Briefcase className="w-5 h-5" />,
      description: 'Setting up NABH-accredited integrated wellness resorts, herbal nutraceutical startups, and specialized lifestyle clinics.',
      highlightCompetency: 'NABH Accreditation, Healthcare Enterprise',
      targetRole: 'Wellness Center Founder / Clinic Director',
      color: 'orange'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Quick Career Exploration
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Select a specialized vertical to immediately filter corresponding progression maps and accredited learning paths.
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 self-start sm:self-auto">
          10 Primary AYUSH Verticals
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5">
        {tiles.map(tile => (
          <div
            key={tile.id}
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-500 dark:hover:border-emerald-500/70 transition-all shadow-xs hover:shadow-md flex flex-col justify-between group"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                {tile.icon}
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
                {tile.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3 line-clamp-3">
                {tile.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
              <div className="text-[10px] text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-700 dark:text-slate-300 block">Core Skill:</span>
                <span className="truncate block">{tile.highlightCompetency}</span>
              </div>
              <button
                onClick={() => {
                  onSelectCategory(tile.category);
                  if (onSelectPathwayTitle) onSelectPathwayTitle(tile.keyword);
                }}
                className="w-full py-1.5 px-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 rounded-lg transition-colors flex items-center justify-center gap-1"
              >
                <span>View Pathway</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
