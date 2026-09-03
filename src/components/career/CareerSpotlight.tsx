import React, { useState } from 'react';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  BookOpen,
  Briefcase,
  Layers,
  ArrowRight,
  TrendingUp,
  Activity,
  Microscope,
  Building2,
  Leaf,
  Users,
  Lightbulb
} from 'lucide-react';

interface SpotlightItem {
  id: string;
  careerArea: string;
  badge: string;
  growthTag: string;
  whyItMatters: string;
  keyCompetencies: string[];
  recommendedLearning: string[];
  typicalExperience: string;
  relatedOpportunities: string[];
  industryPartners: string[];
  icon: React.ReactNode;
}

interface CareerSpotlightProps {
  onExplorePathway?: (areaName: string) => void;
}

export const CareerSpotlight: React.FC<CareerSpotlightProps> = ({ onExplorePathway }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const spotlights: SpotlightItem[] = [
    {
      id: 'digital-health',
      careerArea: 'Digital Health in AYUSH & Medical Informatics',
      badge: 'High National Priority',
      growthTag: '+28% Annual Sector Growth',
      whyItMatters:
        'The Government of India’s Ayush Grid and WHO ICD-11 Traditional Medicine Module integration requires clinicians who understand diagnostic taxonomies and electronic medical records to digitize public health dispensaries and research hospitals.',
      keyCompetencies: [
        'NAMASTE Portal Terminology Mapping',
        'Ayush Grid EHR Standards & Interoperability',
        'Tele-consultation Compliance & Data Security',
        'Clinical Decision Support System (CDSS) Validation'
      ],
      recommendedLearning: [
        'Ayush Grid Architecture & Electronic Health Records',
        'WHO ICD-11 Dual Coding & Ontology Workshop',
        'Health Informatics for AYUSH Practitioners'
      ],
      typicalExperience:
        '1–2 years handling e-Hospital AYUSH modules, telemedicine triage, and clinical data verification for institutional repositories.',
      relatedOpportunities: [
        'Health Informatics Specialist (Ministry of Ayush)',
        'Clinical Data Ontologist (EHR Providers)',
        'Telemedicine Program Director'
      ],
      industryPartners: ['Ministry of Ayush Informatics Division', 'AIIA Digital Health Centre', 'Centre for Development of Advanced Computing (C-DAC)'],
      icon: <Activity className="w-6 h-6 text-emerald-600" />
    },
    {
      id: 'evidence-research',
      careerArea: 'Evidence-Informed AYUSH Clinical Research',
      badge: 'Academic & Industry Flagship',
      growthTag: 'Global Scientific Recognition',
      whyItMatters:
        'Bridging traditional Ayurvedic epistemologies with contemporary bio-statistical rigor and ICMR Good Clinical Practice enables global publication and inclusion in mainstream national healthcare regimens.',
      keyCompetencies: [
        'ICMR-AYUSH Good Clinical Practice (GCP)',
        'Randomized Controlled Trial (RCT) Protocol Design',
        'Safety Biomarker Monitoring & Liver Function Assays',
        'Scientific Paper Writing for Indexed Medical Journals'
      ],
      recommendedLearning: [
        'GCP & Ethical Guidelines for Clinical Trials in ASU',
        'Biostatistics for Integrative Medicine Using R/Python',
        'Clinical Trial Registry of India (CTRI) Protocol Filing'
      ],
      typicalExperience:
        'Clinical research coordination in multi-arm Phase-2/3 trials, adverse event reporting, and Institutional Ethics Committee submissions.',
      relatedOpportunities: [
        'Clinical Research Associate (CRA)',
        'Junior Research Fellow (JRF) in Extramural Projects',
        'Integrative Medicine Trial Coordinator'
      ],
      industryPartners: ['All India Institute of Ayurveda (AIIA)', 'CCRAS Headquarters', 'ICMR National Institutes'],
      icon: <Microscope className="w-6 h-6 text-blue-600" />
    },
    {
      id: 'pharma-standardization',
      careerArea: 'Pharmaceutical Quality Assurance & Schedule T GMP',
      badge: 'Manufacturing Regulatory Demand',
      growthTag: 'Global ASU Export Expansion',
      whyItMatters:
        'With Indian traditional formulations entering international markets, rigorous Schedule T GMP, heavy metal assays, aflatoxin screening, and stability protocols are essential.',
      keyCompetencies: [
        'Schedule T Good Manufacturing Practices',
        'Ayurvedic Pharmacopoeia of India (API) Analytical Assays',
        'HPTLC Fingerprinting & Marker Compound Quantification',
        'Stability Testing & Accelerated Shelf-Life Studies'
      ],
      recommendedLearning: [
        'Schedule T GMP Compliance for ASU Drug Formulations',
        'Quality Control of Phytochemicals & Heavy Metal Assays',
        'Standard Operating Procedures for Classical Kalpanas'
      ],
      typicalExperience:
        'Quality control laboratory testing, batch manufacturing record (BMR) preparation, and regulatory audit readiness in licensed pharmacies.',
      relatedOpportunities: [
        'Quality Assurance (QA) / Quality Control (QC) Officer',
        'Regulatory Affairs Associate',
        'Formulation Development Scientist'
      ],
      industryPartners: ['Dabur Research Foundation', 'Arya Vaidya Sala Kottakkal', 'Multani Pharmaceuticals'],
      icon: <Building2 className="w-6 h-6 text-amber-600" />
    },
    {
      id: 'medicinal-plants',
      careerArea: 'Medicinal Plant Conservation & GACP Supply Chains',
      badge: 'Sustainable Agro-Economy',
      growthTag: 'NMPB National Focus',
      whyItMatters:
        'Raw material adulteration and unsustainable wild-crafting threaten the efficacy of ASU medicines. Experts in Good Agricultural & Field Collection Practices ensure batch purity from seed to clinic.',
      keyCompetencies: [
        'Botanical Authentication & Macro-Microscopic Identification',
        'Good Agricultural and Collection Practices (WHO-GACP)',
        'DNA Barcoding of Rare and Endangered Species (RET)',
        'Fair-Trade Sourcing & Geo-Climatic Yield Variation'
      ],
      recommendedLearning: [
        'GACP Standards & Traceability for Medicinal Flora',
        'Taxonomic Identification & Herbarium Verification',
        'Phytochemical Profiling Across Seasonal Harvests'
      ],
      typicalExperience:
        'Fieldwork with cultivation cooperatives, botanical gardens, and raw herb mandis validating specimen purity against adulterants.',
      relatedOpportunities: [
        'Raw Material Procurement Specialist',
        'Botanical Field Inspector',
        'NMPB Project Technical Officer'
      ],
      industryPartners: ['National Medicinal Plants Board (NMPB)', 'AIIA Herbal Garden', 'CSIR-NBRI Lucknow'],
      icon: <Leaf className="w-6 h-6 text-emerald-600" />
    },
    {
      id: 'public-health',
      careerArea: 'Preventive Healthcare & AYUSH Public Health Policy',
      badge: 'Ayushman Bharat Expansion',
      growthTag: 'Universal Health Coverage Mission',
      whyItMatters:
        'Primary healthcare transformation integrates AYUSH through 12,500+ Ayushman Bharat Health & Wellness Centres across India, managing non-communicable lifestyle disorders (NCDs) via Dinacharya and Yoga.',
      keyCompetencies: [
        'Community Lifestyle Disorder Screening & Risk Stratification',
        'National AYUSH Mission Program Implementation',
        'Nutritional Assessment (Ahara & Poshan Abhiyaan)',
        'Epidemiological Field Surveying & Health Communication'
      ],
      recommendedLearning: [
        'Public Health Implementation of National AYUSH Mission',
        'Preventive Protocols for Metabolic Syndromes',
        'Community Health Engagement & Health Literacy'
      ],
      typicalExperience:
        'Rural primary health center rotations, community wellness camp leadership, and public health screening programs.',
      relatedOpportunities: [
        'District AYUSH Program Coordinator',
        'Community Health Officer (CHO)',
        'Public Health Policy Fellow'
      ],
      industryPartners: ['National Health Authority (NHA)', 'Ministry of Ayush Public Health Cell', 'State AYUSH Directorates'],
      icon: <Users className="w-6 h-6 text-purple-600" />
    },
    {
      id: 'healthcare-innovation',
      careerArea: 'Smart Automation & AYUSH MedTech Bio-Design',
      badge: 'Incubation & Patent Frontier',
      growthTag: 'Smart Automation Theme',
      whyItMatters:
        'Automating classical pharmaceutical milestones—such as sensor-guided endpoint detection in Sneha Kalpana or computerized Vamana/Virechana monitoring—brings precision to ancient healing sciences.',
      keyCompetencies: [
        'Sensor Integration with Ayurvedic Boiling/Roasting Vessels',
        'Medical Device Prototyping & CAD Design',
        'Intellectual Property & Patent Drafting for Traditional Tech',
        'Clinical Usability Validation with Senior Vaidyas'
      ],
      recommendedLearning: [
        'Smart Automation Protocols in Ayurvedic Pharmacy',
        'Bio-Design & MedTech Incubation Fundamentals',
        'Patent Law & Prior Art Search (TKDL Database)'
      ],
      typicalExperience:
        'Incubation laboratory prototyping, hackathons, and interdisciplinary engineering-medical collaboration.',
      relatedOpportunities: [
        'AYUSH MedTech Product Manager',
        'Healthcare Innovation Fellow',
        'Startup Founder / Patent Engineer'
      ],
      industryPartners: ['AIIA Bio-Design & Incubation Centre', 'IIT Delhi Healthcare Hub', 'Biotechnology Industry Research Assistance Council (BIRAC)'],
      icon: <Lightbulb className="w-6 h-6 text-rose-600" />
    }
  ];

  const current = spotlights[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % spotlights.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + spotlights.length) % spotlights.length);
  };

  return (
    <div className="space-y-4">
      {/* Header with Carousel Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Emerging Horizons Spotlight</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            High-Growth Career Spotlights
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Deep dive into emerging multidisciplinary domains bridging traditional wisdom and smart automation.
          </p>
        </div>

        {/* Carousel controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-mono text-slate-500 mr-2">
            {currentIndex + 1} / {spotlights.length}
          </span>
          <button
            onClick={handlePrev}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
            title="Previous Spotlight"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
            title="Next Spotlight"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Feature Spotlight Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        {/* Top Badges & Area Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
              {current.icon}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                  {current.badge}
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                  {current.growthTag}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                {current.careerArea}
              </h3>
            </div>
          </div>

          {onExplorePathway && (
            <button
              onClick={() => onExplorePathway(current.careerArea)}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 rounded-lg shadow-xs transition-colors flex items-center gap-1.5 self-start md:self-auto"
            >
              <span>Explore Progression Flowchart</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Why It Matters */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1.5">
          <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Why This Discipline Matters</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {current.whyItMatters}
          </p>
        </div>

        {/* 2-Column Core Diagnostics: Competencies & Learning Path */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Key Competencies */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Key Required Competencies</span>
            </div>
            <div className="space-y-2">
              {current.keyCompetencies.map((comp, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/20 text-xs font-medium text-slate-800 dark:text-slate-200 flex items-start gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0" />
                  <span>{comp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Learning */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Accredited Curricular Modules</span>
            </div>
            <div className="space-y-2">
              {current.recommendedLearning.map((learn, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/20 text-xs font-medium text-slate-800 dark:text-slate-200 flex items-start gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                  <span>{learn}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Experience & Related Opportunities Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Typical Clinical & Practical Exposure
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {current.typicalExperience}
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Target Career Placements
            </div>
            <div className="flex flex-wrap gap-1.5">
              {current.relatedOpportunities.map((opp, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                >
                  {opp}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Thumbnail Selector Strip */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Select Other Spotlights:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {spotlights.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setCurrentIndex(idx)}
                className={`p-2 rounded-lg text-left text-xs transition-all border ${
                  idx === currentIndex
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-600 dark:text-slate-400'
                }`}
              >
                <div className="truncate">{item.careerArea.split(' ')[0]} {item.careerArea.split(' ')[1]}</div>
                <div className="text-[10px] text-slate-400 font-normal">{item.growthTag.split(' ')[0]}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
