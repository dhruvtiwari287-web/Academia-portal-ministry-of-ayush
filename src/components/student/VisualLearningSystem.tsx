import React, { useState } from 'react';
import {
  Play,
  Clock,
  BookOpen,
  CheckCircle2,
  Award,
  Sparkles,
  ChevronRight,
  Filter,
  Search,
  ExternalLink,
  HelpCircle,
  Bookmark,
  Share2,
  Info,
  ShieldCheck,
  Activity,
  Compass,
  Users,
  Briefcase,
  FileText,
  Layers,
  HeartPulse,
  Microscope,
  Zap,
  Check,
  X
} from 'lucide-react';

export const VisualLearningSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'WATCH' | 'FIVE_MIN' | 'DIAGRAMS' | 'CAREER_FLOW' | 'BRANCH_EXPLORER' | 'PROCESS_WORKFLOW'>('WATCH');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [savedVideos, setSavedVideos] = useState<string[]>(['vid-1', 'vid-3']);
  const [completedFiveMin, setCompletedFiveMin] = useState<string[]>(['fm-1']);
  
  // Modals
  const [activeVideoModal, setActiveVideoModal] = useState<any | null>(null);
  const [activeDiagramNode, setActiveDiagramNode] = useState<any | null>(null);
  const [activeQuizModal, setActiveQuizModal] = useState<any | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // 14 Required Video Categories
  const videoCategories = [
    'ALL',
    'Anatomy & Physiology',
    'AYUSH Education',
    'Clinical Education',
    'Research Methodology',
    'Clinical Research',
    'Public Health',
    'Pharmacology / Pharmaceutical Education',
    'Medicinal Plants',
    'Digital Health',
    'Healthcare Technology',
    'Medical Ethics',
    'Scientific Communication',
    'Healthcare Management',
    'Preventive & Wellness Education'
  ];

  // Watch & Learn Videos
  const videos = [
    {
      id: 'vid-1',
      title: 'Research Methodology: Understanding Study Designs',
      category: 'Research Methodology',
      duration: '06:42',
      level: 'Beginner',
      learningObjective: 'Understand the basic differences between common research study designs in clinical and AYUSH trials.',
      source: 'Verified educational source (AIIA Academic Committee)',
      verified: true,
      progress: 65,
      relatedTopic: 'Clinical Trials & Ethics'
    },
    {
      id: 'vid-2',
      title: 'Panchakarma Protocol Standardization & Shodhana Procedures',
      category: 'AYUSH Education',
      duration: '12:15',
      level: 'Intermediate',
      learningObjective: 'Examine standardized operating procedures for Vamana, Virechana, and Basti therapies.',
      source: 'Official Government Source (Ministry of AYUSH Portal)',
      verified: true,
      progress: 20,
      relatedTopic: 'Kayachikitsa IPD'
    },
    {
      id: 'vid-3',
      title: 'Pharmacovigilance in ASU (Ayurveda, Siddha & Unani) Formulations',
      category: 'Pharmacology / Pharmaceutical Education',
      duration: '08:30',
      level: 'Advanced',
      learningObjective: 'Identify adverse drug reactions and adverse event reporting standards for classical ASU preparations.',
      source: 'Demo Learning Resource (Pharmacology Dept)',
      verified: false,
      progress: 0,
      relatedTopic: 'Schedule T GMP Compliance'
    },
    {
      id: 'vid-4',
      title: 'Medicinal Plant Herbarium Specimen Authentication & HPTLC',
      category: 'Medicinal Plants',
      duration: '10:00',
      level: 'Intermediate',
      learningObjective: 'Learn macroscopic, microscopic, and chromatographic fingerprinting techniques for medicinal flora.',
      source: 'Verified educational source (National Medicinal Plants Board)',
      verified: true,
      progress: 100,
      relatedTopic: 'Dravyaguna Vigyan'
    },
    {
      id: 'vid-5',
      title: 'ICD-11 TM Chapter & NAMASTE Portal Morbidity Coding',
      category: 'Digital Health',
      duration: '07:20',
      level: 'Beginner',
      learningObjective: 'Master traditional medicine diagnostic terminology mapping in international health registries.',
      source: 'Demo Learning Resource',
      verified: false,
      progress: 40,
      relatedTopic: 'Healthcare Informatics'
    },
    {
      id: 'vid-6',
      title: 'Clinical Research Ethics & Informed Consent Procedures',
      category: 'Medical Ethics',
      duration: '09:10',
      level: 'Beginner',
      learningObjective: 'Understand participant rights, vulnerable populations, and ethical committee review protocols.',
      source: 'Verified educational source (ICMR Ethics Guidelines)',
      verified: true,
      progress: 0,
      relatedTopic: 'GCP Guidelines'
    }
  ];

  // 5-Minute Learning Micro-Learning Clips
  const fiveMinModules = [
    {
      id: 'fm-1',
      title: '5-Minute Research Methodology',
      estimatedTime: '5 Mins',
      objective: 'Quickly grasp hypothesis formulation and variable identification.',
      keyPoints: [
        'Define clear research questions before trial execution',
        'Distinguish between independent and dependent variables',
        'Ensure ethical review board clearance prior to data collection',
        'Maintain blinding and randomization standards'
      ],
      visualExplanation: 'Step-by-step flowchart moving from Research Question -> Null Hypothesis -> Experimental Design.',
      quiz: {
        question: 'Which component is formulated first in a standard research study?',
        options: ['Data Analysis', 'Research Question & Hypothesis', 'Publication Writing', 'Patient Discharge'],
        correct: 1,
        explanation: 'A clear research question and hypothesis must be defined before designing the methodology or collecting data.'
      }
    },
    {
      id: 'fm-2',
      title: '5-Minute Introduction to Public Health',
      estimatedTime: '5 Mins',
      objective: 'Understand preventive healthcare cycles and epidemiological surveillance in AYUSH communities.',
      keyPoints: [
        'Focus on community-wide preventive wellness (Swasthavritta)',
        'Epidemiological data tracking for chronic lifestyle disorders',
        'Integration of traditional dietary guidelines with modern nutritional science',
        'Efficacy of public health campaigns in rural sectors'
      ],
      visualExplanation: 'Circular public health intervention cycle: Surveillance -> Policy -> Community Action -> Evaluation.',
      quiz: {
        question: 'What is the primary focus of Swasthavritta in public health?',
        options: ['Surgical interventions', 'Preventive health and positive lifestyle promotion', 'Pharmaceutical manufacturing', 'Hospital administration'],
        correct: 1,
        explanation: 'Swasthavritta emphasizes preventive medicine, daily regimens (Dinacharya), and positive health.'
      }
    },
    {
      id: 'fm-3',
      title: '5-Minute Medicinal Plant Research',
      estimatedTime: '5 Mins',
      objective: 'Explore botanical authentication and phytochemical extraction principles.',
      keyPoints: [
        'Accurate botanical identification using pharmacopeial standards',
        'Extraction of active phytochemical markers',
        'Sourcing sustainability and Good Agricultural Practices (GAP)',
        'Standardized decoction and extract potency'
      ],
      visualExplanation: 'Pipeline diagram: Wild Collection -> Botanical Authentication -> Extraction -> Phytochemical Assay.',
      quiz: {
        question: 'Why is botanical authentication crucial before pharmacological testing?',
        options: ['To reduce shipping costs', 'To ensure correct species identification and therapeutic efficacy', 'To obtain marketing patents', 'To bypass ethics committees'],
        correct: 1,
        explanation: 'Botanical authentication ensures the correct plant species and quality are utilized to maintain safety and efficacy.'
      }
    },
    {
      id: 'fm-4',
      title: '5-Minute Medical Ethics',
      estimatedTime: '5 Mins',
      objective: 'Review core ethical principles in patient care and clinical trials.',
      keyPoints: [
        'Autonomy: Respecting patient decision-making rights',
        'Beneficence: Acting in the best interest of the patient/participant',
        'Non-maleficence: Doing no harm',
        'Justice: Fair distribution of healthcare resources and trial benefits'
      ],
      visualExplanation: 'Four-pillar balanced ethics scale showing Autonomy, Beneficence, Non-maleficence, and Justice.',
      quiz: {
        question: 'What does the principle of "Non-maleficence" mean in clinical practice?',
        options: ['Maximizing financial profit', 'Doing no harm to the patient or participant', 'Speeding up patient discharge', 'Writing daily research logs'],
        correct: 1,
        explanation: 'Non-maleficence obligates practitioners and researchers to avoid inflicting unnecessary harm.'
      }
    }
  ];

  // Interactive Diagrams Data
  const interactiveDiagrams = [
    {
      id: 'dia-1',
      title: 'Clinical Research Workflow',
      description: 'Step-by-step lifecycle from research conception to scientific publication.',
      stages: [
        { name: 'Research Question', definition: 'Formulating the clinical inquiry based on existing literature gaps.', explanation: 'Identifies unexplored clinical or traditional medicinal efficacy parameters.', videoId: 'vid-1' },
        { name: 'Literature Review', definition: 'Systematic search of PubMed, DHARA, and AYUSH databases.', explanation: 'Prevents duplication and establishes theoretical grounding.', videoId: 'vid-1' },
        { name: 'Study Design', definition: 'Choosing between observational, RCT, or case-control methodology.', explanation: 'Determines statistical validity and bias control.', videoId: 'vid-1' },
        { name: 'Ethics & Approvals', definition: 'Institutional Ethics Committee (IEC) review.', explanation: 'Ensures adherence to ICMR and GCP guidelines.', videoId: 'vid-6' },
        { name: 'Data Collection', definition: 'Executing trials and recording patient metrics.', explanation: 'Adheres strictly to Case Report Forms (CRFs).', videoId: 'vid-3' },
        { name: 'Data Analysis', definition: 'Biostatistical evaluation and p-value calculation.', explanation: 'Determines statistical significance of outcomes.', videoId: 'vid-1' },
        { name: 'Publication', definition: 'Drafting manuscript and peer review.', explanation: 'Shares verified findings with the global medical community.', videoId: 'vid-1' }
      ]
    },
    {
      id: 'dia-2',
      title: 'Internship & Clinical Rotation Journey',
      description: 'The professional progression of an AYUSH intern through hospital departments.',
      stages: [
        { name: 'Explore Departments', definition: 'Overview of IPD/OPD clinical rotations.', explanation: 'Exposes scholars to Kayachikitsa, Panchakarma, Shalya, and Prasuti Roga.', videoId: 'vid-2' },
        { name: 'Eligibility Check', definition: 'Verifying completed theory hours and basic clinical competencies.', explanation: 'Ensures readiness for direct patient observation.', videoId: 'vid-2' },
        { name: 'Active Rotation', definition: 'Hands-on bedside case logging under senior faculty supervision.', explanation: 'Builds diagnostic confidence and pulse diagnosis correlations.', videoId: 'vid-2' },
        { name: 'Skill Passport', definition: 'Cryptographic digital endorsement of clinical hours.', explanation: 'Serves as verified portfolio for recruiters and fellowship boards.', videoId: 'vid-4' }
      ]
    }
  ];

  // Ayurveda Branch Visual Explorer Data (Section 82)
  const ayurvedaBranches = [
    {
      name: 'Kayachikitsa',
      focus: 'General Internal Medicine & Systemic Disorders',
      competencies: ['Diagnosis of Jwara, Raktapitta, Vata Vyadhi', 'Herbo-mineral formulation prescription', 'Dietary management (Pathya-Apathya)'],
      career: 'Senior Physician, Hospital Consultant, Clinical Trial Investigator',
      description: 'The primary branch dealing with general internal medicine, focusing on treating diseases originating from internal dosha imbalances.'
    },
    {
      name: 'Panchakarma',
      focus: 'Bio-purification & Detoxification Therapies',
      competencies: ['Vamana, Virechana, Basti, Nasya, Raktamokshana', 'Pre-operative (Snehana/Swedana) management', 'Post-purification Samsarjana Krama'],
      career: 'Panchakarma Specialist, Wellness Director, Clinical Supervisor',
      description: 'Specialized fivefold therapeutic purification process designed to eliminate deep-seated toxins and restore constitutional equilibrium.'
    },
    {
      name: 'Dravyaguna',
      focus: 'Materia Medica & Pharmacology of Medicinal Plants',
      competencies: ['Botanical identification & Dravya Guna (Rasa, Guna, Virya, Vipaka)', 'Herbarium authentication & HPTLC profiling', 'Phytochemical interaction analysis'],
      career: 'Botanical Researcher, Pharmacognosist, Quality Control Scientist',
      description: 'Comprehensive science of medicinal substances, their properties, actions, and therapeutic applications.'
    },
    {
      name: 'Rasashastra & Bhaishajya Kalpana',
      focus: 'Iatrochemistry, Mineral Medicines & Pharmaceutics',
      competencies: ['Processing of Marana, Shodhana of Rasaushadhis (Minerals/Metals)', 'Standardized pharmaceutical dosage preparation', 'Schedule T GMP compliance'],
      career: 'Pharmaceutical Formulator, ASU Quality Assurance Head, R&D Scientist',
      description: 'The science of metallic, mineral, and herbal formulations, ensuring high bioavailability and safety.'
    },
    {
      name: 'Shalya',
      focus: 'Surgery, Parasurgical Procedures & Anorectal Care',
      competencies: ['Ksharasutra therapy for fistula-in-ano', 'Agnikarma and Raktamokshana techniques', 'Wound management and aseptic protocols'],
      career: 'Ayurvedic Surgeon, Proctology Specialist, Clinical Researcher',
      description: 'Traditional surgical and parasurgical interventions for acute and chronic conditions.'
    },
    {
      name: 'Shalakya',
      focus: 'Treatments of Organs Above the Clavicle (ENT, Ophthalmology & Dentistry)',
      competencies: ['Netra Tarpana protocol', 'Karnapurana therapy', 'Nasya administrative procedures'],
      career: 'Shalakya Specialist, ENT & Ophthalmology Consultant',
      description: 'Specialized branch addressing disorders of the eyes, ears, nose, throat, head, and neck.'
    },
    {
      name: 'Prasuti & Stri Roga',
      focus: 'Obstetrics, Gynecology & Pediatrics Care',
      competencies: ['Antenatal and postnatal Ayurvedic care (Garbhini Paricharya)', 'Management of gynecological dysfunctions', 'Neonatal wellness'],
      career: 'Ayurvedic Gynecologist, Obstetrician, Maternal Health Researcher',
      description: 'Dedicated to women’s health, pregnancy care, childbirth, and pediatric healthcare.'
    },
    {
      name: 'Kaumarbhritya',
      focus: 'Pediatrics & Balroga Management',
      competencies: ['Swarnaprashana immunization protocols', 'Pediatric dosha balancing and developmental assessment', 'Nutritional support for infants'],
      career: 'Pediatric Specialist, Child Health Researcher',
      description: 'Pediatric care focusing on infant feeding, immunity boosting (Swarnaprashana), and growth milestones.'
    },
    {
      name: 'Swasthavritta & Yoga',
      focus: 'Preventive Medicine, Community Health & Therapeutic Yoga',
      competencies: ['Dinacharya & Ritucharya lifestyle counseling', 'Yogic therapy and Pranayama prescription', 'Community wellness epidemiology'],
      career: 'Preventive Health Officer, Wellness Consultant, Lifestyle Medicine Expert',
      description: 'Promoting positive health, preventive medicine, and lifestyle protocols through daily routines and yoga.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Medical Visual Learning & Interactive Media System</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
            Visual Learning & Interactive Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Accelerate medical & AYUSH comprehension through interactive diagrams, verified educational video hubs, micro-learning clips, and career pathways.
          </p>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-1.5 flex-wrap bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('WATCH')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'WATCH' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            Watch & Learn
          </button>
          <button
            onClick={() => setActiveTab('FIVE_MIN')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'FIVE_MIN' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            5-Min Learning
          </button>
          <button
            onClick={() => setActiveTab('DIAGRAMS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'DIAGRAMS' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            Interactive Diagrams
          </button>
          <button
            onClick={() => setActiveTab('CAREER_FLOW')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'CAREER_FLOW' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            Career Journey
          </button>
          <button
            onClick={() => setActiveTab('BRANCH_EXPLORER')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'BRANCH_EXPLORER' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            AYUSH Branch Explorer
          </button>
          <button
            onClick={() => setActiveTab('PROCESS_WORKFLOW')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'PROCESS_WORKFLOW' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            Process Workflows
          </button>
        </div>
      </div>

      {/* TAB 1: WATCH & LEARN VIDEO HUB */}
      {activeTab === 'WATCH' && (
        <div className="space-y-6">
          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category Scroll / Selector */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 max-w-full">
              {videoCategories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 font-bold'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-64 shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search video topics..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Video Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos
              .filter(v => selectedCategory === 'ALL' || v.category === selectedCategory)
              .filter(v => !searchQuery || v.title.toLowerCase().includes(searchQuery.toLowerCase()) || v.category.toLowerCase().includes(searchQuery.toLowerCase()))
              .map(vid => (
                <div
                  key={vid.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    {/* Video Thumbnail Header */}
                    <div className="relative h-44 bg-slate-900 flex items-center justify-center group overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/40 to-transparent z-10" />
                      <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          vid.verified ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
                        }`}>
                          {vid.verified ? 'LIVE / VERIFIED' : 'DEMO / ILLUSTRATIVE'}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800/80 text-slate-200 border border-slate-700">
                          {vid.level}
                        </span>
                      </div>

                      <div className="absolute top-3 right-3 z-20">
                        <button
                          onClick={() => {
                            if (savedVideos.includes(vid.id)) {
                              setSavedVideos(savedVideos.filter(id => id !== vid.id));
                            } else {
                              setSavedVideos([...savedVideos, vid.id]);
                            }
                          }}
                          className={`p-1.5 rounded-lg border backdrop-blur-md transition-colors ${
                            savedVideos.includes(vid.id)
                              ? 'bg-emerald-600 text-white border-emerald-500'
                              : 'bg-slate-900/60 text-slate-200 border-slate-700 hover:bg-slate-800'
                          }`}
                          title="Save Video"
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between">
                        <span className="text-xs text-slate-200 font-mono flex items-center gap-1 bg-slate-900/70 px-2 py-0.5 rounded border border-slate-700">
                          <Clock className="w-3 h-3 text-emerald-400" />
                          {vid.duration}
                        </span>
                        <span className="text-[11px] text-emerald-300 font-medium">
                          {vid.category}
                        </span>
                      </div>

                      <button
                        onClick={() => setActiveVideoModal(vid)}
                        className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center z-20 shadow-lg group-hover:scale-110 transition-transform"
                        title="Watch Video"
                      >
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-3">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-2">
                        {vid.title}
                      </h3>
                      <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                        <span className="font-semibold text-slate-500 block">Learning Objective:</span>
                        <p className="line-clamp-2">{vid.learningObjective}</p>
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <span>Source: {vid.source}</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="p-4 pt-0 flex items-center justify-between gap-2">
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${vid.progress}%` }} />
                    </div>
                    <button
                      onClick={() => setActiveVideoModal(vid)}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shrink-0 flex items-center gap-1 shadow-xs"
                    >
                      <Play className="w-3 h-3 fill-white" />
                      <span>Watch</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* TAB 2: 5-MINUTE LEARNING */}
      {activeTab === 'FIVE_MIN' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <div className="font-bold">5-Minute Micro-Learning Clips</div>
              <div>High-yield educational summaries with key points, visual explanations, and quick quizzes to verify retention.</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fiveMinModules.map(item => {
              const isCompleted = completedFiveMin.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{item.estimatedTime} Micro-Module</span>
                      </span>
                      {isCompleted ? (
                        <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 flex items-center gap-1 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>✓ Learning completed</span>
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-medium">In Progress</span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {item.objective}
                    </p>

                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">3–5 Key Points:</span>
                      <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                        {item.keyPoints.map((pt, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-emerald-600 font-bold">•</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
                      <span className="font-semibold text-slate-900 dark:text-slate-100 block mb-0.5">Visual Explanation:</span>
                      {item.visualExplanation}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                    <button
                      onClick={() => {
                        setQuizAnswer(null);
                        setQuizSubmitted(false);
                        setActiveQuizModal(item);
                      }}
                      className="px-4 py-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 rounded-lg border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5 shadow-xs"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Take Quick Quiz</span>
                    </button>

                    <button
                      onClick={() => {
                        if (!isCompleted) {
                          setCompletedFiveMin([...completedFiveMin, item.id]);
                        } else {
                          setCompletedFiveMin(completedFiveMin.filter(id => id !== item.id));
                        }
                      }}
                      className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-xs transition-colors ${
                        isCompleted
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: INTERACTIVE MEDICAL DIAGRAMS */}
      {activeTab === 'DIAGRAMS' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200 flex items-center gap-3">
            <Activity className="w-5 h-5 text-blue-600 shrink-0" />
            <div>
              <div className="font-bold">Interactive Medical & Research Visualizations</div>
              <div>Click on any diagram node or workflow stage below to examine definitions, clinical explanations, and related learning modules.</div>
            </div>
          </div>

          <div className="space-y-6">
            {interactiveDiagrams.map(dia => (
              <div key={dia.id} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{dia.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{dia.description}</p>
                </div>

                {/* Interactive Workflow Node Chain */}
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 overflow-x-auto py-2">
                  {dia.stages.map((stage, sIdx) => (
                    <React.Fragment key={sIdx}>
                      <button
                        onClick={() => setActiveDiagramNode(stage)}
                        className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:border-emerald-300 dark:hover:border-emerald-700 text-left transition-all group flex-1 min-w-[140px] shadow-xs"
                      >
                        <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold mb-1">
                          Stage 0{sIdx + 1}
                        </div>
                        <div className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-300">
                          {stage.name}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                          <span>View Details</span>
                          <ChevronRight className="w-3 h-3 text-emerald-600" />
                        </div>
                      </button>
                      {sIdx < dia.stages.length - 1 && (
                        <div className="hidden md:flex items-center justify-center text-slate-400 font-bold">
                          ↓
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: CAREER FLOWCHART */}
      {activeTab === 'CAREER_FLOW' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-xs text-purple-900 dark:text-purple-200 flex items-center gap-3">
            <Compass className="w-5 h-5 text-purple-600 shrink-0" />
            <div>
              <div className="font-bold">Medical Career Journey (Interactive Flowchart)</div>
              <div>Every stage is fully interactive. Click any milestone node below to access professional exploration panels, skill assessments, and mentorship.</div>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col items-center space-y-4">
            {[
              { title: 'STUDENT', desc: 'Enrolled BAMS / AYUSH Professional Scholar', action: 'View Profile', link: '/profile' },
              { title: 'CAREER INTEREST', desc: 'Explore possible healthcare & AYUSH career pathways.', action: 'Explore Careers', link: '/student/careers' },
              { title: 'COMPETENCY ASSESSMENT', desc: 'Evaluate educational competencies across disciplines.', action: 'Take Assessment', link: '/student/assessment' },
              { title: 'SKILL GAP ANALYSIS', desc: 'Identify targeted skill gaps and priority domains.', action: 'Analyze Gaps', link: '/student/skill-gaps' },
              { title: 'LEARNING & TRAINING', desc: 'Improve identified skill gaps with accredited modules.', action: 'Open Learning Hub', link: '/student/learning' },
              { title: 'MENTORSHIP', desc: 'Connect with senior clinician scientists and trialists.', action: 'Find Mentor', link: '/student/mentors' },
              { title: 'RESEARCH / PROJECT', desc: 'Participate in evidence-based ASU research protocols.', action: 'View Research', link: '/student/research' },
              { title: 'INTERNSHIP', desc: 'Secure clinical residency and hospital fellowships.', action: 'Find Opportunities', link: '/student/internships' },
              { title: 'SKILL PASSPORT', desc: 'Cryptographically endorsed digital credential repository.', action: 'View Passport', link: '/student/passport' },
              { title: 'CAREER OPPORTUNITY', desc: 'Transition into professional healthcare and research roles.', action: 'View Openings', link: '/student/internships' }
            ].map((node, nIdx, arr) => (
              <React.Fragment key={nIdx}>
                <div
                  onClick={() => setActiveDiagramNode(node)}
                  className="w-full max-w-xl p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/40 dark:bg-emerald-950/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-all cursor-pointer shadow-xs flex items-center justify-between group"
                >
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-wider">
                      Milestone 0{nIdx + 1}
                    </div>
                    <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {node.title}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300">
                      {node.desc}
                    </div>
                  </div>
                  <span className="px-3 py-1.5 text-xs font-semibold bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 rounded-lg border border-emerald-200 dark:border-emerald-800 group-hover:bg-emerald-600 group-hover:text-white transition-colors shadow-xs">
                    {node.action}
                  </span>
                </div>

                {nIdx < arr.length - 1 && (
                  <div className="text-emerald-600 dark:text-emerald-500 font-bold text-lg my-0.5">
                    ↓
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: AYUSH BRANCH EXPLORER */}
      {activeTab === 'BRANCH_EXPLORER' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-xs text-teal-900 dark:text-teal-200 flex items-center gap-3">
            <HeartPulse className="w-5 h-5 text-teal-600 shrink-0" />
            <div>
              <div className="font-bold">Medical Branch Explorer — Visual Mode</div>
              <div>Category cards and visual hierarchy for traditional Ayurveda disciplines and clinical specializations.</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ayurvedaBranches.map((branch, bIdx) => (
              <div
                key={bIdx}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-teal-700 dark:text-teal-400 font-bold uppercase">
                      Discipline Node 0{bIdx + 1}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-semibold bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 rounded border border-teal-200">
                      Ayurveda
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    {branch.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {branch.description}
                  </p>
                  <div className="space-y-1 pt-1">
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">Core Focus & Competencies:</span>
                    <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                      {branch.competencies.map((comp, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                          <span>{comp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 block">Career Direction:</span>
                  {branch.career}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: PROCESS WORKFLOWS */}
      {activeTab === 'PROCESS_WORKFLOW' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Research Project Workflow */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase">
                <Microscope className="w-4 h-4" />
                <span>Research Project Workflow</span>
              </div>
              <div className="space-y-2">
                {[
                  'Research Question',
                  'Literature Review',
                  'Study Design',
                  'Ethics & Approvals',
                  'Data Collection',
                  'Data Analysis',
                  'Interpretation',
                  'Scientific Communication'
                ].map((step, sIdx) => (
                  <div key={sIdx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs flex items-center justify-between">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{step}</span>
                    <span className="text-[10px] font-mono text-slate-400">0{sIdx + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Internship Journey */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase">
                <Briefcase className="w-4 h-4" />
                <span>Internship Journey</span>
              </div>
              <div className="space-y-2">
                {[
                  'Explore',
                  'Eligibility',
                  'Apply',
                  'Selection',
                  'Orientation',
                  'Mentorship',
                  'Project / Training',
                  'Evaluation',
                  'Completion',
                  'Portfolio'
                ].map((step, sIdx) => (
                  <div key={sIdx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs flex items-center justify-between">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{step}</span>
                    <span className="text-[10px] font-mono text-slate-400">0{sIdx + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Career Preparation */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-purple-600 uppercase">
                <Compass className="w-4 h-4" />
                <span>Career Preparation</span>
              </div>
              <div className="space-y-2">
                {[
                  'Career Goal',
                  'Competency Assessment',
                  'Skill Gap',
                  'Learning',
                  'Mentor',
                  'Project',
                  'Internship',
                  'Career Opportunity'
                ].map((step, sIdx) => (
                  <div key={sIdx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs flex items-center justify-between">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{step}</span>
                    <span className="text-[10px] font-mono text-slate-400">0{sIdx + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: VIDEO PLAYER & DETAILS */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setActiveVideoModal(null)}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200">
                {activeVideoModal.category}
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{activeVideoModal.title}</h2>
              <div className="text-xs text-slate-500 font-mono">Duration: {activeVideoModal.duration} • Level: {activeVideoModal.level}</div>
            </div>

            {/* Video Simulated Player */}
            <div className="relative h-64 bg-slate-950 rounded-xl flex flex-col items-center justify-center text-white p-6 text-center space-y-3 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
              <div className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center shadow-xl z-10 cursor-pointer hover:scale-105 transition-transform">
                <Play className="w-8 h-8 fill-white ml-1" />
              </div>
              <div className="z-10 text-xs text-slate-300">
                Secure Educational Media Player (User-controlled playback)
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div>
                <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">Learning Objective:</span>
                <p>{activeVideoModal.learningObjective}</p>
              </div>
              <div>
                <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">Source Attribution:</span>
                <p>{activeVideoModal.source}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveVideoModal(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert('Progress updated: Video marked as watched and verified in your passport.');
                  setActiveVideoModal(null);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Mark as Watched</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: DIAGRAM NODE DETAILS */}
      {activeDiagramNode && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setActiveDiagramNode(null)}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold text-emerald-600 uppercase tracking-wider">Node Information Panel</span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">{activeDiagramNode.name || activeDiagramNode.title}</h2>
            </div>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              {activeDiagramNode.definition && (
                <div>
                  <span className="font-bold text-slate-900 dark:text-slate-100 block mb-0.5">Definition:</span>
                  <p>{activeDiagramNode.definition}</p>
                </div>
              )}
              {activeDiagramNode.explanation && (
                <div>
                  <span className="font-bold text-slate-900 dark:text-slate-100 block mb-0.5">Clinical Explanation:</span>
                  <p>{activeDiagramNode.explanation}</p>
                </div>
              )}
              {activeDiagramNode.desc && (
                <div>
                  <span className="font-bold text-slate-900 dark:text-slate-100 block mb-0.5">Overview:</span>
                  <p>{activeDiagramNode.desc}</p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end">
              <button
                onClick={() => setActiveDiagramNode(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: QUICK QUIZ */}
      {activeQuizModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setActiveQuizModal(null)}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Check Your Understanding
              </span>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">{activeQuizModal.title}</h2>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3 text-xs">
              <div className="font-semibold text-slate-900 dark:text-slate-100">{activeQuizModal.quiz.question}</div>
              <div className="space-y-2">
                {activeQuizModal.quiz.options.map((opt: string, oIdx: number) => (
                  <label
                    key={oIdx}
                    className={`flex items-center gap-2.5 p-3 rounded-lg border cursor-pointer transition-colors ${
                      quizAnswer === oIdx
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="quiz-option"
                      checked={quizAnswer === oIdx}
                      onChange={() => setQuizAnswer(oIdx)}
                      className="text-emerald-600"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {quizSubmitted && (
              <div className={`p-3 rounded-xl text-xs border ${
                quizAnswer === activeQuizModal.quiz.correct
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 text-emerald-800 dark:text-emerald-300'
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 text-rose-800 dark:text-rose-300'
              }`}>
                <div className="font-bold mb-1">
                  {quizAnswer === activeQuizModal.quiz.correct ? '✓ Correct Answer!' : '✗ Incorrect. Try again.'}
                </div>
                <div>{activeQuizModal.quiz.explanation}</div>
              </div>
            )}

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveQuizModal(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg"
              >
                Close
              </button>
              {!quizSubmitted ? (
                <button
                  onClick={() => {
                    if (quizAnswer !== null) setQuizSubmitted(true);
                  }}
                  disabled={quizAnswer === null}
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs disabled:opacity-50"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={() => setActiveQuizModal(null)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs"
                >
                  Done
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
