import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  ExternalLink,
  ArrowRight,
  Printer,
  Sparkles,
  Stethoscope,
  Microscope,
  FlaskConical,
  Building2,
  Leaf,
  Users,
  GraduationCap,
  Activity,
  Lightbulb
} from 'lucide-react';

interface CareerRow {
  id: string;
  careerArea: string;
  focusArea: string;
  keyCompetencies: string[];
  typicalExposure: string;
  relatedOpportunities: string[];
  recommendedDisciplines: string[];
  icon: React.ReactNode;
}

interface CareerMatrixTableProps {
  onSelectPathway?: (pathwayTitle: string) => void;
}

export const CareerMatrixTable: React.FC<CareerMatrixTableProps> = ({ onSelectPathway }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState('All Disciplines');

  const rows: CareerRow[] = [
    {
      id: 'clinical-practice',
      careerArea: 'Clinical Practice',
      focusArea: 'Hospital Inpatient & Outpatient Care, Classical Shodhana/Panchakarma Clinics, Specialized Wellness Centers',
      keyCompetencies: [
        'Classical Rogi & Roga Pariksha (Ashtavidha / Dashavidha)',
        'Panchakarma Procedure Protocols & Complication Management',
        'Holistic Dietetics (Ahara-Vihara Prescription)',
        'Clinical Documentation & Patient Consent'
      ],
      typicalExposure: 'Mandatory rotatory clinical internship (IPD/OPD), bed-side rounds, specialty case conferences',
      relatedOpportunities: [
        'Medical Officer (Govt/Private)',
        'Panchakarma Center Director',
        'Clinical Consultant',
        'Institutional Physician'
      ],
      recommendedDisciplines: ['BAMS', 'BHMS', 'BUMS', 'BSMS', 'BNYS'],
      icon: <Stethoscope className="w-4 h-4 text-emerald-600" />
    },
    {
      id: 'clinical-research',
      careerArea: 'Clinical Research',
      focusArea: 'Integrative Clinical Trials, Phase II/III Herb-Drug Studies, Multicenter Safety Registries, GCP Documentation',
      keyCompetencies: [
        'ICMR-AYUSH Good Clinical Practice (GCP) Guidelines',
        'Clinical Trial Protocol Design & CTRI Registration',
        'Safety Biomarker Profiling & Adverse Event (AE) Reporting',
        'Case Report Form (CRF) Electronic Data Capture'
      ],
      typicalExposure: 'Clinical research trials at national institutes (AIIA, CCRAS, ICMR), Institutional Ethics Committee observer ship',
      relatedOpportunities: [
        'Clinical Research Associate (CRA)',
        'Clinical Trial Coordinator',
        'Medical Safety Monitor',
        'Regulatory Submissions Specialist'
      ],
      recommendedDisciplines: ['BAMS', 'BHMS', 'BUMS', 'BSMS'],
      icon: <Microscope className="w-4 h-4 text-blue-600" />
    },
    {
      id: 'ayush-research',
      careerArea: 'AYUSH Research & Laboratory Science',
      focusArea: 'Phytochemistry, Molecular Mechanisms of ASU Formulations, Extramural Research Projects, Reverse Pharmacology',
      keyCompetencies: [
        'Research Methodology & Bio-statistical Modeling',
        'Scientific Paper Writing for PubMed/Scopus Indexed Journals',
        'Experimental Pharmacological Assays & Pre-clinical Models',
        'Grant Proposal Drafting for Ministry of Ayush / DST'
      ],
      typicalExposure: 'Dissertation projects in central research labs, research methodology workshops, poster symposiums',
      relatedOpportunities: [
        'Junior / Senior Research Fellow (JRF/SRF)',
        'Research Officer (CCRAS/CCRUM/CCRH)',
        'Institutional Research Scientist',
        'Postdoctoral Scholar'
      ],
      recommendedDisciplines: ['BAMS', 'BHMS', 'BUMS', 'BSMS', 'BNYS'],
      icon: <FlaskConical className="w-4 h-4 text-purple-600" />
    },
    {
      id: 'pharmaceutical-industry',
      careerArea: 'Pharmaceutical Industry & Quality Control',
      focusArea: 'Ayurvedic/Siddha/Unani Drug Manufacturing, Schedule T Compliance, Pharmacopoeial Standardization, ASU Regulatory Affairs',
      keyCompetencies: [
        'Schedule T Good Manufacturing Practices (GMP)',
        'Ayurvedic Pharmacopoeia of India (API) Testing Procedures',
        'HPTLC Fingerprinting & Marker Compound Quantification',
        'ASU Drug Dossier Preparation & State Licensing Filing'
      ],
      typicalExposure: 'Industrial internships at licensed ASU manufacturing units, quality control testing labs, pilot plants',
      relatedOpportunities: [
        'Quality Assurance (QA) Manager',
        'Analytical Chemistry / QC Chemist',
        'Formulation R&D Executive',
        'Regulatory Affairs Officer'
      ],
      recommendedDisciplines: ['BAMS', 'BUMS', 'BSMS'],
      icon: <Building2 className="w-4 h-4 text-amber-600" />
    },
    {
      id: 'medicinal-plants',
      careerArea: 'Medicinal Plants & Agro-Sourcing',
      focusArea: 'Good Agricultural and Collection Practices (WHO-GACP), Sustainable Harvesting, Supply Chain Traceability, NMPB Projects',
      keyCompetencies: [
        'Botanical Authentication & Macro-Microscopic Verification',
        'GACP Standards Implementation & Cultivator Training',
        'Phytochemical Profiling Across Geo-Climatic Zones',
        'National Medicinal Plants Board (NMPB) Subsidy Management'
      ],
      typicalExposure: 'Field collection tours, botanical garden curation, herbarium specimen mounting, raw drug mandi audits',
      relatedOpportunities: [
        'Raw Material Procurement Specialist',
        'Botanical Authentication Officer',
        'Cultivation Manager (Herbal Industry)',
        'NMPB Technical Consultant'
      ],
      recommendedDisciplines: ['BAMS', 'BUMS', 'BSMS'],
      icon: <Leaf className="w-4 h-4 text-emerald-600" />
    },
    {
      id: 'public-health',
      careerArea: 'Public Health & Preventive Medicine',
      focusArea: 'National AYUSH Mission, Ayushman Bharat Health & Wellness Centres, Epidemic Preventive Protocols, Swasthavritta',
      keyCompetencies: [
        'Community Health Assessment & NCD Screening',
        'Epidemiological Field Survey Design & Data Analysis',
        'Public Health Communication & Behavior Change Education',
        'Primary Health Center (PHC) AYUSH Wing Administration'
      ],
      typicalExposure: 'Community health camps, rural Primary Health Center postings, Poshan Abhiyaan nutritional drives',
      relatedOpportunities: [
        'District AYUSH Officer',
        'Community Health Officer (CHO)',
        'Public Health Program Director',
        'Preventive Health Policy Consultant'
      ],
      recommendedDisciplines: ['BAMS', 'BHMS', 'BUMS', 'BSMS', 'BNYS'],
      icon: <Users className="w-4 h-4 text-teal-600" />
    },
    {
      id: 'academic-career',
      careerArea: 'Academic Career & Medical Pedagogy',
      focusArea: 'Undergraduate & Postgraduate Medical Teaching, NCISM-Aligned Curriculum Delivery, Bedside Clinical Preceptorship',
      keyCompetencies: [
        'Evidence-Informed Medical Pedagogy & Problem-Based Learning',
        'Classical Text Analysis & Exegesis (Samhita Adhyayan)',
        'Formative & Summative Student Assessment Methods',
        'Institutional Quality Assurance (NAAC/NABH)'
      ],
      typicalExposure: 'Academic teaching assistantships, case conferences, national seminar presentations, journal clubs',
      relatedOpportunities: [
        'Assistant Professor / Lecturer',
        'Associate Professor / Reader',
        'Clinical Preceptor',
        'Departmental Head / Academic Dean'
      ],
      recommendedDisciplines: ['BAMS', 'BHMS', 'BUMS', 'BSMS', 'BNYS'],
      icon: <GraduationCap className="w-4 h-4 text-indigo-600" />
    },
    {
      id: 'digital-health',
      careerArea: 'Digital Health & Medical Informatics',
      focusArea: 'Ayush Grid Architecture, NAMASTE Portal Ontology Mapping, WHO ICD-11 Traditional Medicine Module, Tele-medicine',
      keyCompetencies: [
        'NAMASTE Portal Diagnostic Terminology Standardization',
        'WHO ICD-11 Dual-Coding Practices for Traditional Systems',
        'Electronic Health Record (EHR) Implementation & Interoperability',
        'Tele-consultation Clinical Protocols & Data Confidentiality'
      ],
      typicalExposure: 'Ayush Grid pilot implementations, clinical data curation projects, hospital information system testing',
      relatedOpportunities: [
        'Health Informatics Specialist',
        'AYUSH Medical Ontologist',
        'Telemedicine Operations Lead',
        'Healthcare Data Analyst'
      ],
      recommendedDisciplines: ['BAMS', 'BHMS', 'BUMS', 'BSMS', 'BNYS'],
      icon: <Activity className="w-4 h-4 text-cyan-600" />
    },
    {
      id: 'healthcare-innovation',
      careerArea: 'Healthcare Innovation & Bio-Design',
      focusArea: 'Smart Automation of Traditional Pharmaceutics, Classical Diagnostic Bio-sensors, Smart Panchakarma Equipment',
      keyCompetencies: [
        'Bio-Design Prototyping & Medical Device Validation',
        'Sensor Integration for Traditional Kalpana Endpoints',
        'Intellectual Property (IP) Protection & TKDL Verification',
        'Incubation Grant Proposals (BIRAC / AIIA Startup Cell)'
      ],
      typicalExposure: 'AIIA Incubation Center hackathons, multidisciplinary engineering tie-ups, clinical prototyping trials',
      relatedOpportunities: [
        'AYUSH MedTech Innovator / Founder',
        'Medical Device Product Manager',
        'Incubation Technical Manager',
        'Healthcare IP Consultant'
      ],
      recommendedDisciplines: ['BAMS', 'BHMS', 'BUMS', 'BSMS', 'BNYS'],
      icon: <Lightbulb className="w-4 h-4 text-rose-600" />
    }
  ];

  const disciplines = ['All Disciplines', 'BAMS', 'BHMS', 'BUMS', 'BSMS', 'BNYS'];

  const filteredRows = rows.filter(r => {
    const matchDiscipline =
      selectedDiscipline === 'All Disciplines' ||
      r.recommendedDisciplines.includes(selectedDiscipline);

    const matchSearch =
      !searchTerm ||
      r.careerArea.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.focusArea.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.keyCompetencies.some(c => c.toLowerCase().includes(searchTerm.toLowerCase())) ||
      r.relatedOpportunities.some(o => o.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchDiscipline && matchSearch;
  });

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const headers = ['Career Area', 'Focus Area', 'Key Competencies', 'Typical Exposure', 'Related Opportunities'];
    const csvContent = [
      headers.join(','),
      ...filteredRows.map(r =>
        [
          `"${r.careerArea}"`,
          `"${r.focusArea.replace(/"/g, '""')}"`,
          `"${r.keyCompetencies.join('; ').replace(/"/g, '""')}"`,
          `"${r.typicalExposure.replace(/"/g, '""')}"`,
          `"${r.relatedOpportunities.join('; ').replace(/"/g, '""')}"`
        ].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `AYUSH_Career_Matrix_${selectedDiscipline}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      {/* Table Header and Action Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Comprehensive AYUSH Medical Branch & Career Matrix
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Structured institutional mapping of AYUSH specializations, required clinical/academic competencies, and career outcomes.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-emerald-600" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print Matrix</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by competency, career branch, or placement outcome..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-hidden"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
          {disciplines.map(d => (
            <button
              key={d}
              onClick={() => setSelectedDiscipline(d)}
              className={`px-2.5 py-1 text-xs rounded-md font-medium whitespace-nowrap transition-colors ${
                selectedDiscipline === d
                  ? 'bg-emerald-700 text-white dark:bg-emerald-600 font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Matrix Table */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-3.5 min-w-[160px]">Career Area</th>
                <th className="p-3.5 min-w-[220px]">Focus Area</th>
                <th className="p-3.5 min-w-[240px]">Key Competencies</th>
                <th className="p-3.5 min-w-[200px]">Typical Exposure</th>
                <th className="p-3.5 min-w-[180px]">Related Opportunities</th>
                <th className="p-3.5 w-24 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    No career paths match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredRows.map(row => (
                  <tr
                    key={row.id}
                    className="hover:bg-emerald-50/30 dark:hover:bg-emerald-950/10 transition-colors group cursor-pointer"
                    onClick={() => onSelectPathway && onSelectPathway(row.careerArea)}
                  >
                    {/* Career Area */}
                    <td className="p-3.5 align-top">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="p-1 rounded-md bg-slate-100 dark:bg-slate-800">
                          {row.icon}
                        </div>
                        <span className="font-bold text-slate-900 dark:text-slate-100">
                          {row.careerArea}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {row.recommendedDisciplines.map(d => (
                          <span
                            key={d}
                            className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-500"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Focus Area */}
                    <td className="p-3.5 align-top text-slate-600 dark:text-slate-300 leading-relaxed">
                      {row.focusArea}
                    </td>

                    {/* Key Competencies */}
                    <td className="p-3.5 align-top">
                      <ul className="space-y-1 text-slate-700 dark:text-slate-200">
                        {row.keyCompetencies.map((comp, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-[11px]">
                            <span className="w-1 h-1 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                            <span>{comp}</span>
                          </li>
                        ))}
                      </ul>
                    </td>

                    {/* Typical Exposure */}
                    <td className="p-3.5 align-top text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                      {row.typicalExposure}
                    </td>

                    {/* Related Opportunities */}
                    <td className="p-3.5 align-top">
                      <div className="flex flex-wrap gap-1">
                        {row.relatedOpportunities.map((opp, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700"
                          >
                            {opp}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Action */}
                    <td className="p-3.5 align-top text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onSelectPathway) onSelectPathway(row.careerArea);
                        }}
                        className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900 text-emerald-700 dark:text-emerald-300 transition-colors inline-flex items-center justify-center"
                        title="View Progression Flowchart"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
