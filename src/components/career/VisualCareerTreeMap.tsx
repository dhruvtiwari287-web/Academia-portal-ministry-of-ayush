import React, { useState } from 'react';
import {
  GitFork,
  Stethoscope,
  Microscope,
  Building2,
  GraduationCap,
  Activity,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Info
} from 'lucide-react';

interface CareerNode {
  id: string;
  name: string;
  subTracks: {
    name: string;
    description: string;
    requiredCompetency: string;
    clinicalHours: string;
  }[];
}

interface DisciplineData {
  discipline: string;
  code: string;
  branches: {
    category: string;
    icon: React.ReactNode;
    color: string;
    nodes: CareerNode[];
  }[];
}

interface VisualCareerTreeMapProps {
  onSelectPathwayKeyword?: (keyword: string) => void;
}

export const VisualCareerTreeMap: React.FC<VisualCareerTreeMapProps> = ({
  onSelectPathwayKeyword
}) => {
  const disciplines = [
    'Ayurveda (BAMS)',
    'Homeopathy (BHMS)',
    'Unani (BUMS)',
    'Siddha (BSMS)',
    'Yoga & Naturopathy (BNYS)',
    'Sowa-Rigpa'
  ];

  const [activeDiscipline, setActiveDiscipline] = useState('Ayurveda (BAMS)');
  const [selectedSubTrack, setSelectedSubTrack] = useState<{
    branch: string;
    track: string;
    name: string;
    description: string;
    requiredCompetency: string;
    clinicalHours: string;
  } | null>({
    branch: 'Clinical Practice',
    track: 'Hospital & Inpatient Care',
    name: 'Hospital / OPD Specialization',
    description: 'Management of chronic metabolic, musculoskeletal, and degenerative disorders using classical Ayurvedic formulations and Nadi Pariksha.',
    requiredCompetency: 'Classical Rogi & Roga Pariksha, Panchakarma Protocol',
    clinicalHours: '540 Hours Logged'
  });

  const getDisciplineData = (disc: string): DisciplineData => {
    return {
      discipline: disc,
      code: disc.split('(')[1]?.replace(')', '') || 'AYUSH',
      branches: [
        {
          category: 'Clinical Practice',
          icon: <Stethoscope className="w-4 h-4 text-emerald-600" />,
          color: 'emerald',
          nodes: [
            {
              id: 'cp-hosp',
              name: 'Hospital / Inpatient (IPD)',
              subTracks: [
                {
                  name: 'Hospital / OPD Specialization',
                  description: 'Management of chronic metabolic, musculoskeletal, and degenerative disorders using classical formulations.',
                  requiredCompetency: 'Classical Rogi & Roga Pariksha, Treatment Planning',
                  clinicalHours: '540 Hours Required'
                },
                {
                  name: 'Panchakarma Care Center',
                  description: 'Execution of Shodhana therapies (Vamana, Virechana, Basti, Nasya, Raktamokshana) and pre/post-procedure regimens.',
                  requiredCompetency: 'Snehana-Swedana, Panchakarma Protocol',
                  clinicalHours: '420 Hours Required'
                },
                {
                  name: 'Integrative Wellness & Spa Retreats',
                  description: 'Preventive healthcare, Ahara-Vihara counseling, stress alleviation, and luxury medical wellness resorts.',
                  requiredCompetency: 'Prakriti Pariksha, Dinacharya Lifestyle Regimen',
                  clinicalHours: '280 Hours Required'
                }
              ]
            }
          ]
        },
        {
          category: 'Research Career',
          icon: <Microscope className="w-4 h-4 text-blue-600" />,
          color: 'blue',
          nodes: [
            {
              id: 'rc-trials',
              name: 'Integrative Clinical & Drug Trials',
              subTracks: [
                {
                  name: 'Good Clinical Practice (GCP) Trials',
                  description: 'Design and coordination of multi-center RCTs evaluating classical formulations under ICMR-AYUSH guidelines.',
                  requiredCompetency: 'ICH-GCP Compliance, CTRI Protocols',
                  clinicalHours: 'Research Methodology Cert.'
                },
                {
                  name: 'Drug Discovery & Phytochemistry',
                  description: 'Reverse pharmacology, marker compound quantification (HPTLC), bio-assays, and herb-drug interaction studies.',
                  requiredCompetency: 'ASU Pharmacopoeial Testing, Scientific Writing',
                  clinicalHours: 'Institutional Lab Postings'
                },
                {
                  name: 'Public Health Epidemiology',
                  description: 'National AYUSH Mission monitoring, epidemic prevention protocols, and population-scale community health analytics.',
                  requiredCompetency: 'Epidemiological Field Surveying, Biostatistics',
                  clinicalHours: 'Community Field Rotations'
                }
              ]
            }
          ]
        },
        {
          category: 'Industry Career',
          icon: <Building2 className="w-4 h-4 text-amber-600" />,
          color: 'amber',
          nodes: [
            {
              id: 'ic-pharma',
              name: 'Pharmaceutical Manufacturing (ASU)',
              subTracks: [
                {
                  name: 'Pharma Formulation (Bhaishajya)',
                  description: 'Pilot-scale production of classical Asava-Arishta, Taila, Ghrita, Bhasma, and modern tablet/capsule dosage forms.',
                  requiredCompetency: 'Schedule T GMP, BMR Documentation',
                  clinicalHours: 'Industry Apprenticeship'
                },
                {
                  name: 'Quality Assurance & Standardization',
                  description: 'Batch release testing, heavy metal assays, microbial limit tests, and stability study validation.',
                  requiredCompetency: 'API Pharmacopoeial Standardization, HPTLC',
                  clinicalHours: 'Analytical Lab Internship'
                },
                {
                  name: 'Regulatory Affairs & Licensing',
                  description: 'Drug dossier preparation, State Licensing Authority filing, Rule 158(B) proof of safety, and export clearance.',
                  requiredCompetency: 'Drugs & Cosmetics Act ASU Provisions',
                  clinicalHours: 'Regulatory Compliance Workshop'
                }
              ]
            }
          ]
        },
        {
          category: 'Academic Career',
          icon: <GraduationCap className="w-4 h-4 text-indigo-600" />,
          color: 'indigo',
          nodes: [
            {
              id: 'ac-teach',
              name: 'Medical Education & Lecturing',
              subTracks: [
                {
                  name: 'Undergraduate Medical Lectureship',
                  description: 'Teaching Samhitas, Dravyaguna, or Roga Nidana with modern pedagogical tools and case-based learning.',
                  requiredCompetency: 'Classical Text Exegesis, Medical Pedagogy',
                  clinicalHours: 'Postgraduate MD/MS Required'
                },
                {
                  name: 'Bedside Clinical Preceptorship',
                  description: 'Supervising student interns in hospital wards, case presentations, and hands-on clinical reasoning.',
                  requiredCompetency: 'Bedside Teaching, Formative Assessment',
                  clinicalHours: 'Hospital Faculty Appointment'
                }
              ]
            }
          ]
        },
        {
          category: 'Entrepreneurship & Digital Health',
          icon: <Activity className="w-4 h-4 text-cyan-600" />,
          color: 'cyan',
          nodes: [
            {
              id: 'ed-tech',
              name: 'Health Informatics & Smart Devices',
              subTracks: [
                {
                  name: 'Telemedicine & Digital Platforms',
                  description: 'Remote clinical consultations, digital prescribing, patient monitoring, and adherence tracking apps.',
                  requiredCompetency: 'Ayush Grid Compliance, Tele-health Triage',
                  clinicalHours: 'Digital Health Practicum'
                },
                {
                  name: 'AYUSH Medical Informatics',
                  description: 'Mapping classical Ayurvedic/Unani/Siddha disease terms to WHO ICD-11 using the NAMASTE portal.',
                  requiredCompetency: 'NAMASTE Ontology, EHR Architecture',
                  clinicalHours: 'Informatics Project Log'
                },
                {
                  name: 'MedTech Smart Automation',
                  description: 'Designing automated Sneha Kalpana boiling sensors, computerized Panchakarma tables, and digital diagnostics.',
                  requiredCompetency: 'Bio-Design Prototyping, Sensor Integration',
                  clinicalHours: 'Incubation Hackathons'
                }
              ]
            }
          ]
        }
      ]
    };
  };

  const currentData = getDisciplineData(activeDiscipline);

  return (
    <div className="space-y-4">
      {/* Header & Discipline Switcher */}
      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              <GitFork className="w-4 h-4" />
              <span>Interactive Multi-Disciplinary Career Map</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Visual AYUSH Career Hierarchy
            </h2>
          </div>
          <span className="text-[11px] font-medium text-slate-500">
            Switch discipline to view dedicated clinical and industry tracks
          </span>
        </div>

        {/* Discipline Switcher Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {disciplines.map(d => (
            <button
              key={d}
              onClick={() => setActiveDiscipline(d)}
              className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                activeDiscipline === d
                  ? 'bg-emerald-700 text-white dark:bg-emerald-600 shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Visual Tree Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Tree Diagram: 7 Columns */}
        <div className="lg:col-span-7 space-y-3">
          {/* Root Node */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-800 to-teal-800 text-white font-bold text-sm shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>{activeDiscipline} Graduate Progression</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-700/70 border border-emerald-500 font-mono">
              Root Level
            </span>
          </div>

          {/* 5 Main Branch Categories */}
          <div className="space-y-3 pl-2 sm:pl-4 border-l-2 border-emerald-200 dark:border-emerald-800/60 ml-3">
            {currentData.branches.map((branch, bIdx) => (
              <div
                key={bIdx}
                className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2.5 shadow-xs"
              >
                <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
                    {branch.icon}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {branch.category}
                  </h3>
                </div>

                {/* Subtracks for this branch */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {branch.nodes[0]?.subTracks.map((track, tIdx) => {
                    const isSelected = selectedSubTrack?.name === track.name;
                    return (
                      <button
                        key={tIdx}
                        onClick={() =>
                          setSelectedSubTrack({
                            branch: branch.category,
                            track: branch.nodes[0].name,
                            ...track
                          })
                        }
                        className={`p-2.5 rounded-lg text-left text-xs transition-all border ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold shadow-xs'
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-800/30'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="truncate">{track.name}</span>
                          <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-60" />
                        </div>
                        <div className="text-[10px] text-slate-500 font-normal line-clamp-1">
                          {track.requiredCompetency}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Detail Inspection Card: 5 Columns */}
        <div className="lg:col-span-5">
          {selectedSubTrack ? (
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 shadow-sm sticky top-20">
              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
                  <span>{selectedSubTrack.branch}</span>
                  <span>•</span>
                  <span>{selectedSubTrack.track}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {selectedSubTrack.name}
                </h3>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-2">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Curricular Scope & Description</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedSubTrack.description}
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Required Core Competency
                </div>
                <div className="p-3 rounded-lg border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/40 dark:bg-emerald-950/20 text-xs font-semibold text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{selectedSubTrack.requiredCompetency}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Clinical / Practical Exposure Benchmark
                </div>
                <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 font-mono">
                  {selectedSubTrack.clinicalHours}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    if (onSelectPathwayKeyword) {
                      onSelectPathwayKeyword(selectedSubTrack.name);
                    }
                  }}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 rounded-xl transition-colors shadow-xs flex items-center justify-center gap-1.5"
                >
                  <span>View 8-Stage Progression Flowchart</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 text-center text-xs text-slate-400">
              Click on any sub-track node to inspect its competencies and clinical benchmarks.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
