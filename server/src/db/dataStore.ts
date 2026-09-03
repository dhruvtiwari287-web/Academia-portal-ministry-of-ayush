// AYUSH Academia–Industry Data Store
// Provides reliable persistence, CRUD operations, matching algorithms, and realistic domain seed data.

export interface UserEntity {
  id: string;
  email: string;
  passwordHash: string; // bcrypt hash or verified
  role: 'STUDENT' | 'FACULTY' | 'MENTOR' | 'RECRUITER' | 'ADMIN';
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface StudentProfileEntity {
  id: string;
  userId: string;
  discipline: 'AYURVEDA' | 'YOGA_NATUROPATHY' | 'UNANI' | 'SIDDHA' | 'SOWA_RIGPA' | 'HOMOEOPATHY' | 'INTERDISCIPLINARY';
  program: string; // e.g., 'BAMS (Final Year)', 'MD (Ayurveda - Kayachikitsa)'
  institution: string; // e.g., 'All India Institute of Ayurveda (AIIA), New Delhi'
  academicYear: number;
  enrollmentNumber: string;
  careerGoal: string;
  targetPathwayId: string;
  researchInterests: string[];
  clinicalInterests: string[];
  location: string;
  availabilityStatus: string;
  profileCompletion: number;
  readinessScore: number;
  passportNumber: string;
}

export interface CareerPathwayEntity {
  id: string;
  title: string;
  category: string;
  disciplineAffinity: string[];
  overview: string;
  suitability: string;
  competenciesRequired: string[];
  learningAreas: string[];
  researchSkills: string[];
  certifications: string[];
  projectTypes: string[];
  internshipTypes: string[];
  marketOutlook: string;
}

export interface CompetencyEntity {
  id: string;
  code: string;
  title: string;
  category: string;
  description: string;
  importanceInAyush: string;
  evaluationMethod: string;
  currentLevel: number; // 1-5
  targetLevel: number;
  verified: boolean;
}

export interface SkillGapEntity {
  id: string;
  competencyTitle: string;
  currentScore: number; // %
  targetScore: number; // %
  gapMagnitude: 'Low' | 'Moderate' | 'High';
  priority: 'Low' | 'Medium' | 'High';
  recommendedAction: string;
  recommendedModule: string;
  recommendedMentor: string;
}

export interface LearningModuleEntity {
  id: string;
  title: string;
  category: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  durationHours: number;
  learningObjectives: string[];
  ayushRelevance: string;
  enrolled: boolean;
  progress: number;
  lessons: { id: string; title: string; durationMin: number; content: string; summary?: string }[];
}

export interface VideoResourceEntity {
  id: string;
  title: string;
  topic: string;
  category: string;
  duration: string;
  source: string;
  sourceUrl: string;
  learningObjective: string;
  isFiveMinute: boolean;
  completed: boolean;
}

export interface OpportunityEntity {
  id: string;
  recruiterId: string;
  title: string;
  organization: string;
  organizationType: string;
  opportunityType: string;
  domain: string;
  location: string;
  mode: 'On-site' | 'Hybrid' | 'Remote';
  duration: string;
  stipend: string;
  description: string;
  eligibility: string;
  deadline: string;
  requiredCompetencies: string[];
  preferredCompetencies: string[];
  applicationQuestions: string[];
  status: 'ACTIVE' | 'CLOSED';
  createdAt: string;
}

export interface ApplicationEntity {
  id: string;
  opportunityId: string;
  studentId: string;
  status: 'APPLIED' | 'UNDER_REVIEW' | 'SHORTLISTED' | 'INTERVIEW_SCHEDULED' | 'ACCEPTED' | 'INTERNSHIP_STARTED' | 'COMPLETED' | 'REJECTED';
  statementOfPurpose: string;
  answers: Record<string, string>;
  compatibilityScore: number;
  appliedAt: string;
  history: { status: string; note: string; timestamp: string }[];
}

export interface ResearchOpportunityEntity {
  id: string;
  title: string;
  domain: string;
  institution: string;
  mentorName: string;
  objective: string;
  skillsRequired: string[];
  eligibility: string;
  duration: string;
  grantOrStipend: string;
  deadline: string;
  status: 'OPEN' | 'ONGOING' | 'COMPLETED';
}

export interface LiveProjectEntity {
  id: string;
  title: string;
  category: string;
  description: string;
  organization: string;
  mentorName: string;
  duration: string;
  eligibility: string;
  skillsCovered: string[];
  status: 'RECRUITING' | 'IN_PROGRESS' | 'COMPLETED';
  milestones: { id: string; title: string; completed: boolean; dueDate: string }[];
  teamMembersCount: number;
}

export interface MentorProfileEntity {
  id: string;
  userId: string;
  name: string;
  domain: string;
  organization: string;
  designation: string;
  yearsOfExperience: number;
  specialties: string[];
  mentorshipTopics: string[];
  maxMentees: number;
  currentMenteesCount: number;
  availability: string;
  rating: number;
}

export interface MentorshipSessionEntity {
  id: string;
  mentorId: string;
  mentorName: string;
  studentId: string;
  studentName: string;
  scheduledAt: string;
  durationMinutes: number;
  topic: string;
  studentGoal: string;
  milestoneCovered: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  notesPreSession: string;
  notesPostSession?: string;
  feedback?: {
    strengths: string[];
    growthAreas: string[];
    recommendedAction: string;
  };
}

export interface MentorshipGoalEntity {
  id: string;
  studentId: string;
  mentorId: string;
  title: string;
  targetDate: string;
  progressPct: number;
  milestones: { title: string; done: boolean }[];
}

export interface CollaborationRequestEntity {
  id: string;
  recruiterId?: string;
  organization: string;
  facultyId?: string;
  type: 'Guest Lecture' | 'Workshop' | 'Research Project' | 'Consultancy' | 'Faculty Training' | 'Live Project';
  title: string;
  description: string;
  proposedTimeline: string;
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED';
  createdAt: string;
}

export interface InnovationChallengeEntity {
  id: string;
  title: string;
  problem: string;
  domain: string;
  eligibility: string;
  skills: string[];
  maxTeamSize: number;
  awardInfo: string;
  deadline: string;
  status: 'OPEN' | 'CLOSED';
}

export interface HelpDeskTicketEntity {
  id: string;
  ticketId: string;
  userId: string;
  userRole: string;
  userName: string;
  category: string;
  subject: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'WAITING_FOR_RESPONSE' | 'RESOLVED';
  createdAt: string;
  updatedAt: string;
  resolutionNote?: string;
}

export interface NotificationEntity {
  id: string;
  userId: string;
  category: 'Opportunities' | 'Applications' | 'Mentorship' | 'Learning' | 'Research' | 'System';
  title: string;
  message: string;
  actionUrl?: string;
  actionLabel?: string;
  priority: 'LOW' | 'NORMAL' | 'HIGH';
  isRead: boolean;
  createdAt: string;
}

export interface DocumentEntity {
  id: string;
  studentId: string;
  title?: string;
  category?: 'RESUME' | 'CERTIFICATE' | 'INTERNSHIP_REPORT' | 'RESEARCH_PAPER' | string;
  docType: 'Resume' | 'Certificate' | 'Internship Report' | 'Research Paper' | 'Academic Record';
  fileName: string;
  fileSize?: string;
  fileSizeKb: number;
  fileUrl: string;
  isVerified?: boolean;
  uploadedAt: string;
}

// Initial In-Memory / Runtime database state
class AyushDataStore {
  users: UserEntity[] = [];
  studentProfiles: StudentProfileEntity[] = [];
  careerPathways: CareerPathwayEntity[] = [];
  competencies: CompetencyEntity[] = [];
  skillGaps: SkillGapEntity[] = [];
  learningModules: LearningModuleEntity[] = [];
  videoResources: VideoResourceEntity[] = [];
  opportunities: OpportunityEntity[] = [];
  applications: ApplicationEntity[] = [];
  researchOpportunities: ResearchOpportunityEntity[] = [];
  liveProjects: LiveProjectEntity[] = [];
  mentorProfiles: MentorProfileEntity[] = [];
  mentorshipSessions: MentorshipSessionEntity[] = [];
  mentorshipGoals: MentorshipGoalEntity[] = [];
  collaborationRequests: CollaborationRequestEntity[] = [];
  innovationChallenges: InnovationChallengeEntity[] = [];
  helpDeskTickets: HelpDeskTicketEntity[] = [];
  notifications: NotificationEntity[] = [];
  documents: DocumentEntity[] = [];

  constructor() {
    this.seedInitialData();
  }

  seedInitialData() {
    // 1. Users
    this.users = [
      {
        id: 'usr-student-1',
        email: 'student@demo.local',
        passwordHash: '$2a$10$vN91xYyvj3FzDqWqH84qaej0tG1BfWv0qD7rCj2tqL0VbYd.Demo.',
        role: 'STUDENT',
        firstName: 'Ananya',
        lastName: 'Sharma',
        avatarUrl: 'https://images.unsplash.com/photo-1594824813521-82d24269e8bb?w=150&auto=format&fit=crop&q=80',
        createdAt: '2026-01-15T09:00:00Z'
      },
      {
        id: 'usr-faculty-1',
        email: 'faculty@demo.local',
        passwordHash: '$2a$10$vN91xYyvj3FzDqWqH84qaej0tG1BfWv0qD7rCj2tqL0VbYd.Demo.',
        role: 'FACULTY',
        firstName: 'Rajeshwar',
        lastName: 'Joshi',
        avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
        createdAt: '2026-01-10T08:00:00Z'
      },
      {
        id: 'usr-mentor-1',
        email: 'mentor@demo.local',
        passwordHash: '$2a$10$vN91xYyvj3FzDqWqH84qaej0tG1BfWv0qD7rCj2tqL0VbYd.Demo.',
        role: 'MENTOR',
        firstName: 'Meenakshi',
        lastName: 'Sundaram',
        avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
        createdAt: '2026-01-08T10:00:00Z'
      },
      {
        id: 'usr-recruiter-1',
        email: 'recruiter@demo.local',
        passwordHash: '$2a$10$vN91xYyvj3FzDqWqH84qaej0tG1BfWv0qD7rCj2tqL0VbYd.Demo.',
        role: 'RECRUITER',
        firstName: 'Vikramaditya',
        lastName: 'Sengupta',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        createdAt: '2026-01-05T11:00:00Z'
      }
    ];

    // 2. Student Profile
    this.studentProfiles = [
      {
        id: 'stu-1',
        userId: 'usr-student-1',
        discipline: 'AYURVEDA',
        program: 'BAMS (Final Year)',
        institution: 'All India Institute of Ayurveda (AIIA), New Delhi',
        academicYear: 4,
        enrollmentNumber: 'AIIA/UG/2022/048',
        careerGoal: 'AYUSH Clinical Research & Pharmacovigilance',
        targetPathwayId: 'cp-ayush-research',
        researchInterests: ['Standardization of Herbal Formulations', 'Clinical Trial Protocols', 'Panchakarma Biomarkers'],
        clinicalInterests: ['Kayachikitsa', 'Dravyaguna Vijnana'],
        location: 'New Delhi / NCR',
        availabilityStatus: 'Available for 6-Month Research Internship',
        profileCompletion: 88,
        readinessScore: 78,
        passportNumber: 'AYUSH-PASSPORT-2026-0984'
      }
    ];

    // 3. Career Pathways (10 Key AYUSH Career Tracks)
    this.careerPathways = [
      {
        id: 'cp-clinical-practice',
        title: 'Clinical Practice',
        category: 'Clinical Care',
        disciplineAffinity: ['AYURVEDA', 'YOGA_NATUROPATHY', 'UNANI', 'SIDDHA', 'HOMOEOPATHY'],
        overview: 'Specialized diagnosis and treatment protocol formulation following classical foundational principles (Nadi Pariksha, Rogi-Roga Pariksha) alongside modern clinical diagnostic tools.',
        suitability: 'Suited for scholars dedicated to direct patient care, personalized wellness management, and hospital clinical departments.',
        competenciesRequired: ['Clinical Reasoning & Classical Diagnostics', 'Domain Knowledge', 'Documentation', 'Professional Communication', 'Problem Solving'],
        learningAreas: ['Advanced Kayachikitsa Protocols', 'Panchakarma Procedure Monitoring', 'Drug Interaction Management', 'Dietetics & Pathya-Apathya'],
        researchSkills: ['Case Documentation', 'Adverse Event Reporting'],
        certifications: ['Clinical Panchakarma Advanced Training', 'Emergency First Response in AYUSH Hospitals'],
        projectTypes: ['Chronic Disease Clinical Observation Protocols', 'Lifestyle Disorder Intervention Studies'],
        internshipTypes: ['Hospital Clinical Internship (AIIA, NIA, IPGTRA)', 'Specialty Clinical Observerships'],
        marketOutlook: 'High demand across national AYUSH hospitals, wellness centers, and specialized outpatient departments.'
      },
      {
        id: 'cp-clinical-research',
        title: 'Clinical Research',
        category: 'Research & Academia',
        disciplineAffinity: ['AYURVEDA', 'SIDDHA', 'UNANI', 'HOMOEOPATHY'],
        overview: 'Specialized path investigating traditional drug efficacy, safety, mechanism of action, reverse pharmacology, and GCP-compliant clinical trials under CCRAS/CSIR frameworks.',
        suitability: 'Ideal for scholars with strong analytical aptitude, interest in scientific validation of classical concepts, and hospital trial coordination.',
        competenciesRequired: ['Research Methodology in AYUSH', 'Research Ethics & Good Clinical Practice (GCP)', 'Scientific & Academic Communication', 'Clinical Reasoning & Classical Diagnostics', 'Healthcare Data Literacy & Biostatistics'],
        learningAreas: ['Good Clinical Practice (GCP) in AYUSH', 'Biostatistics', 'Phytochemical Analysis', 'Protocol Designing', 'Manuscript Writing'],
        researchSkills: ['Systematic Reviews', 'Meta-Analysis', 'HPLC/HPTLC Fingerprinting', 'IRB Protocol Submission'],
        certifications: ['WHO Guidelines on Traditional Medicine Clinical Research', 'ICMR Research Methodology Certification'],
        projectTypes: ['Comparative Clinical Efficacy Trials', 'Toxicity Profiling of Bhasma Formulations', 'Real-World Evidence Studies'],
        internshipTypes: ['Research Internship at CCRAS Centers', 'Clinical Research Associate at AIIA', 'CSIR Laboratory Fellowship'],
        marketOutlook: 'Rapidly expanding with international research collaborations and ICMR-Ayush joint research grants.'
      },
      {
        id: 'cp-pharma-industry',
        title: 'Ayurvedic Pharmaceutical Industry',
        category: 'Pharmaceutical Industry',
        disciplineAffinity: ['AYURVEDA', 'SIDDHA', 'UNANI'],
        overview: 'Formulation development, pharmacognosy, quality control, GMP standardization, and Ayurvedic Pharmacopoeia of India (API) compliance in modern production units.',
        suitability: 'Students fascinated by Dravyaguna, Rasashastra, Bhaishajya Kalpana, and modern analytical instrumentation.',
        competenciesRequired: ['Domain Knowledge', 'Research Methodology in AYUSH', 'Documentation', 'Healthcare Data Literacy & Biostatistics'],
        learningAreas: ['Herbal Drug Standardization', 'Quality Assurance & Quality Control', 'Stability Testing', 'Regulatory Affairs (Schedule T)'],
        researchSkills: ['Spectroscopy & Chromatography', 'Heavy Metal & Microbial Testing'],
        certifications: ['Good Laboratory Practice (GLP) for Herbal Products', 'Ayush Drug Inspector Regulatory Training'],
        projectTypes: ['Shelf-life Evaluation of Asava-Arishta', 'Novel Drug Delivery Systems for Herbal Extracts'],
        internshipTypes: ['R&D Internship at Dabur, Himalaya, Baidyanath, Charak', 'Government Quality Control Testing Labs'],
        marketOutlook: 'Robust growth propelled by AYUSH export initiatives and stringent international quality standards.'
      },
      {
        id: 'cp-healthcare-research',
        title: 'Healthcare Research',
        category: 'Research & Academia',
        disciplineAffinity: ['AYURVEDA', 'HOMOEOPATHY', 'UNANI', 'SIDDHA', 'YOGA_NATUROPATHY'],
        overview: 'Fundamental laboratory research, phytochemistry, preclinical studies, in-vitro assays, and translational biomedicine bridging classical epistemology with modern pharmacology.',
        suitability: 'Scholars aspiring to doctoral studies, fundamental bio-research, and apex institute scientific careers.',
        competenciesRequired: ['Research Methodology in AYUSH', 'Scientific & Academic Communication', 'Research Ethics & Good Clinical Practice (GCP)'],
        learningAreas: ['Bio-assay Directed Fractionation', 'Preclinical Animal Model Studies', 'Immunomodulation Assays'],
        researchSkills: ['Molecular Biology Assays', 'Genomic & Metabolomic Profiling'],
        certifications: ['Laboratory Animal Handling Certification (CPCSEA)', 'Advanced Molecular Biology in Traditional Medicine'],
        projectTypes: ['Mechanism of Action Studies on Rasayana Drugs', 'Network Pharmacology Modeling of Polyherbal Decoctions'],
        internshipTypes: ['CSIR-CDRI Research Fellowship', 'National Institute of Immunology Observership'],
        marketOutlook: 'High priority under Ministry of Ayush Extra-Mural Research (EMR) and Golden Triangle initiatives.'
      },
      {
        id: 'cp-public-health',
        title: 'Public Health',
        category: 'Public Health & Policy',
        disciplineAffinity: ['AYURVEDA', 'YOGA_NATUROPATHY', 'HOMOEOPATHY', 'UNANI', 'SIDDHA'],
        overview: 'Epidemiology, national health programs (National AYUSH Mission), community wellness, maternal/child nutrition (Suposhan), and communicable disease containment.',
        suitability: 'Students passionate about community impact, health policy, epidemiology, and public health systems.',
        competenciesRequired: ['Leadership', 'Scientific & Academic Communication', 'Healthcare Data Literacy & Biostatistics', 'Teamwork', 'Problem Solving'],
        learningAreas: ['Epidemiological Survey Methods', 'National Health Mission Structure', 'Swasthavritta & Dinacharya Community Implementation'],
        researchSkills: ['Community Needs Assessment', 'Survey Data Analysis'],
        certifications: ['Public Health Management in Traditional Medicine', 'Epidemiology & Biostatistics for Ayush Officers'],
        projectTypes: ['Rural Geriatric Health Screening Protocols', 'School Nutrition & Anemia Eradication Programs'],
        internshipTypes: ['National AYUSH Mission Field Trainee', 'State Health Society Public Health Associate'],
        marketOutlook: 'High recruitment under Ayushman Arogya Mandir (Ayush) network across states.'
      },
      {
        id: 'cp-academic-career',
        title: 'Academic Career',
        category: 'Research & Academia',
        disciplineAffinity: ['AYURVEDA', 'HOMOEOPATHY', 'UNANI', 'SIDDHA', 'YOGA_NATUROPATHY'],
        overview: 'Medical pedagogy, university professorship, educational curriculum innovation, classical textual scholarship (Samhita Adhyayana), and academic mentorship.',
        suitability: 'Scholars passionate about teaching, textual interpretation, academic mentorship, and institutional leadership.',
        competenciesRequired: ['Domain Knowledge', 'Scientific & Academic Communication', 'Research Methodology in AYUSH', 'Clinical Reasoning & Classical Diagnostics'],
        learningAreas: ['Curriculum Design & Competency Based Medical Education (CBME)', 'Manuscriptology & Epigraphy', 'Objective Structured Clinical Examination (OSCE)'],
        researchSkills: ['Critical Textual Analysis', 'Educational Impact Assessment'],
        certifications: ['Faculty Development Program in Medical Education', 'National Commission for Indian System of Medicine (NCISM) Teacher Training'],
        projectTypes: ['Digital Annotation of Classical Commentaries', 'Clinical Simulation Models for Ayurvedic Trainees'],
        internshipTypes: ['Teaching Associate at Apex Institutes (AIIA, NIA, BHU)', 'Academic Curriculum Committee Assistant'],
        marketOutlook: 'Continuous tenure opportunities across 500+ government and private AYUSH colleges across India.'
      },
      {
        id: 'cp-healthcare-admin',
        title: 'Healthcare Administration',
        category: 'Healthcare Management',
        disciplineAffinity: ['AYURVEDA', 'HOMOEOPATHY', 'UNANI', 'SIDDHA', 'YOGA_NATUROPATHY'],
        overview: 'Hospital operations, NABH accreditation management, healthcare supply chain, AYUSH medical tourism coordination, and clinical quality assurance.',
        suitability: 'Clinicians with leadership drive, organizational aptitude, and interest in hospital executive roles.',
        competenciesRequired: ['Leadership', 'Problem Solving', 'Documentation', 'Professional Communication'],
        learningAreas: ['NABH Standards for AYUSH Hospitals', 'Healthcare Financial Management', 'Hospital Information Systems (HIS)'],
        researchSkills: ['Clinical Audit Methodologies', 'Patient Satisfaction Analytics'],
        certifications: ['NABH Assessor / Quality Manager Certification', 'Healthcare Executive Diploma in Hospital Operations'],
        projectTypes: ['Standard Operating Procedures (SOP) Formulation for Panchakarma Units', 'Hospital Waste Management Protocol Audit'],
        internshipTypes: ['Operations Associate at NABH Accredited AYUSH Hospital', 'Medical Tourism Coordination Intern'],
        marketOutlook: 'Strong demand as AYUSH healthcare facilities increasingly seek NABH and international accreditation.'
      },
      {
        id: 'cp-wellness-industry',
        title: 'Wellness Industry',
        category: 'Wellness & Lifestyle Medicine',
        disciplineAffinity: ['AYURVEDA', 'YOGA_NATUROPATHY'],
        overview: 'Preventive lifestyle medicine, medical wellness resorts, Panchakarma rejuvenation spas, corporate wellness consultancy, and personalized wellness retreats.',
        suitability: 'Practitioners passionate about preventive lifestyle curation, mind-body balance, and global wellness tourism.',
        competenciesRequired: ['Domain Knowledge', 'Clinical Reasoning & Classical Diagnostics', 'Professional Communication'],
        learningAreas: ['Dinacharya & Ritucharya Lifestyle Optimization', 'Therapeutic Yoga Sequencing', 'Integrative Spa Therapies'],
        researchSkills: ['Biomarkers of Well-being', 'Stress Reduction Metrics'],
        certifications: ['Certified Ayurvedic Lifestyle & Wellness Consultant', 'Corporate Mindfulness & Stress Management Specialist'],
        projectTypes: ['Corporate Burnout Reduction Program Design', 'Integrative Detoxification Protocol Manual'],
        internshipTypes: ['Wellness Resident at Premier Ayurvedic Retreats (Somatheeram, Ananda, Kairali)', 'Spa Operations Trainee'],
        marketOutlook: 'Fastest growing sector globally driven by rising international appetite for holistic non-pharmacological therapies.'
      },
      {
        id: 'cp-health-tech',
        title: 'Healthcare Technology',
        category: 'Healthcare Technology',
        disciplineAffinity: ['INTERDISCIPLINARY', 'AYURVEDA', 'HOMOEOPATHY', 'YOGA_NATUROPATHY'],
        overview: 'Application of electronic health records (NAMASTE portal, Ayush Grid), telemetry, AI diagnostic assistive algorithms, and clinical database administration.',
        suitability: 'Clinicians with strong digital curiosity, data literacy, and passion for modernizing traditional medical systems.',
        competenciesRequired: ['Digital Health & Health Informatics Literacy', 'Healthcare Data Literacy & Biostatistics', 'Documentation', 'Problem Solving'],
        learningAreas: ['Ayush Grid Standards', 'SNOMED-CT & NAMASTE Terminology Mapping', 'Tele-Consultation Compliance (ABDM)'],
        researchSkills: ['Database Querying', 'Clinical Workflow Modeling'],
        certifications: ['Ayush Health Informatics Specialist', 'Digital Health Record Auditing'],
        projectTypes: ['NAMASTE-ICD-11 Dual Coding Implementation', 'Prakriti Assessment Digital Scale Validation'],
        internshipTypes: ['Ayush Grid Technology Trainee', 'Healthtech Startup Clinical Data Analyst'],
        marketOutlook: 'Pioneering frontier supported by Digital India and National Digital Health Mission (ABDM).'
      },
      {
        id: 'cp-entrepreneurship',
        title: 'Entrepreneurship',
        category: 'Innovation & Incubation',
        disciplineAffinity: ['AYURVEDA', 'HOMOEOPATHY', 'UNANI', 'SIDDHA', 'YOGA_NATUROPATHY'],
        overview: 'Launching AYUSH D2C health brands, specialized clinical chains, herbal nutraceutical ventures, and AI-enabled Ayurvedic wellness tech startups.',
        suitability: 'Innovators aiming to commercialize proprietary formulations, establish healthcare enterprises, or raise seed funding.',
        competenciesRequired: ['Leadership', 'Problem Solving', 'Domain Knowledge', 'Scientific & Academic Communication'],
        learningAreas: ['FSSAI & Ayush Regulatory Licensing', 'Venture Financing & Intellectual Property Rights (IPR)', 'Herbal Formulation Packaging & Supply Chain'],
        researchSkills: ['Competitive Market Analysis', 'Patent Prior-Art Searches'],
        certifications: ['Startup Incubation Program at AIIA Technology Business Incubator', 'Patent & Trademark Filing in Herbal Products'],
        projectTypes: ['Business Plan for Eco-Friendly Herbal OTC Products', 'Feasibility Study of Scalable Panchakarma Day Care Clinics'],
        internshipTypes: ['Incubatee at AIIA Bio-Incubator', 'Management Trainee at High-Growth AYUSH Startup'],
        marketOutlook: 'Supported by Startup India, BIRAC, and Ministry of Ayush incubation seed grants up to ₹25 Lakhs.'
      }
    ];

    // 4. Competencies
    this.competencies = [
      {
        id: 'comp-1',
        code: 'AYU-RES-01',
        title: 'Research Methodology in AYUSH',
        category: 'Research Methodology',
        description: 'Ability to formulate research hypotheses, design controlled trials, select appropriate sampling frames, and interpret traditional vs biomedical outcomes.',
        importanceInAyush: 'Essential for publishing in indexed journals and submitting competitive CCRAS/ICMR grant proposals.',
        evaluationMethod: 'Objective knowledge assessment and research protocol design defense.',
        currentLevel: 3, // Intermediate (65%)
        targetLevel: 5,
        verified: true
      },
      {
        id: 'comp-2',
        code: 'AYU-ETH-02',
        title: 'Research Ethics & Good Clinical Practice (GCP)',
        category: 'Research Ethics',
        description: 'Comprehending ethical clearance, ICMR guidelines for biomedical research on humans, informed consent, and pharmacovigilance in AYUSH.',
        importanceInAyush: 'Mandatory prerequisite for clinical trial investigators and institutional ethical committee clearance.',
        evaluationMethod: 'Case scenario analysis on informed consent and protocol deviation.',
        currentLevel: 4, // Advanced (85%)
        targetLevel: 5,
        verified: true
      },
      {
        id: 'comp-3',
        code: 'AYU-CLN-03',
        title: 'Clinical Reasoning & Classical Diagnostics',
        category: 'Clinical Reasoning',
        description: 'Synthesizing Rogi-Roga Pariksha, Dosha-Dushya assessment, differential diagnosis, and evidence-based clinical decision making.',
        importanceInAyush: 'Core clinical capability defining competent therapeutic prescription.',
        evaluationMethod: 'Educational clinical case study evaluations and patient trajectory analysis.',
        currentLevel: 3, // Intermediate (72%)
        targetLevel: 4,
        verified: true
      },
      {
        id: 'comp-4',
        code: 'AYU-COM-04',
        title: 'Scientific & Academic Communication',
        category: 'Scientific Communication',
        description: 'Writing structured research abstracts, manuscripts according to CONSORT-AYUSH guidelines, and delivering academic presentations.',
        importanceInAyush: 'Bridges traditional wisdom into mainstream global scientific dialogue.',
        evaluationMethod: 'Abstract peer-review exercise and presentation scoring.',
        currentLevel: 2, // Beginner-Intermediate (52%)
        targetLevel: 4,
        verified: false
      },
      {
        id: 'comp-5',
        code: 'AYU-DIG-05',
        title: 'Digital Health & Health Informatics Literacy',
        category: 'Digital Health Awareness',
        description: 'Proficiency with Ayush Grid, NAMASTE classification, electronic case report forms (e-CRF), and tele-AYUSH protocols.',
        importanceInAyush: 'Required for national healthcare integration under Ayushman Bharat Digital Mission.',
        evaluationMethod: 'Simulated e-CRF entry and terminology standard classification quiz.',
        currentLevel: 2, // Beginner (45%)
        targetLevel: 4,
        verified: false
      },
      {
        id: 'comp-6',
        code: 'AYU-DAT-06',
        title: 'Healthcare Data Literacy & Biostatistics',
        category: 'Healthcare Data Literacy',
        description: 'Understanding p-values, confidence intervals, sample size calculation, chi-square, t-tests, and survival curves in clinical datasets.',
        importanceInAyush: 'Critical for analyzing clinical trial results without mathematical errors.',
        evaluationMethod: 'Practical statistical problem set using clinical dataset variables.',
        currentLevel: 2, // Beginner (48%)
        targetLevel: 4,
        verified: false
      },
      {
        id: 'comp-7',
        code: 'AYU-DOC-07',
        title: 'Clinical & Regulatory Documentation',
        category: 'Documentation',
        description: 'Standardized case note recording, adverse drug event reporting (ASU pharmacovigilance format), and protocol compliance.',
        importanceInAyush: 'Ensures medico-legal safety and reproducible clinical evidence.',
        evaluationMethod: 'Pharmacovigilance yellow card documentation assessment.',
        currentLevel: 4, // Proficient (82%)
        targetLevel: 5,
        verified: true
      }
    ];

    // 5. Skill Gaps for the student
    this.skillGaps = [
      {
        id: 'sg-1',
        competencyTitle: 'Healthcare Data Literacy & Biostatistics',
        currentScore: 48,
        targetScore: 80,
        gapMagnitude: 'High',
        priority: 'High',
        recommendedAction: 'Enroll in Module "Biostatistics for AYUSH Clinical Trials" and book a session with Mentor Dr. Meenakshi Sundaram.',
        recommendedModule: 'lm-biostats',
        recommendedMentor: 'usr-mentor-1'
      },
      {
        id: 'sg-2',
        competencyTitle: 'Digital Health & Health Informatics Literacy',
        currentScore: 45,
        targetScore: 75,
        gapMagnitude: 'High',
        priority: 'High',
        recommendedAction: 'Complete "Ayush Grid & ABDM Digital Terminology" interactive tutorial.',
        recommendedModule: 'lm-digital-health',
        recommendedMentor: 'usr-mentor-1'
      },
      {
        id: 'sg-3',
        competencyTitle: 'Scientific & Academic Communication',
        currentScore: 52,
        targetScore: 80,
        gapMagnitude: 'Moderate',
        priority: 'Medium',
        recommendedAction: 'Participate in the upcoming Abstract Writing Workshop and submit draft protocol for mentor review.',
        recommendedModule: 'lm-manuscript-writing',
        recommendedMentor: 'usr-mentor-1'
      }
    ];

    // 6. Learning Modules
    this.learningModules = [
      {
        id: 'lm-gcp-trials',
        title: 'Good Clinical Practice (GCP) & Ethical Frameworks in AYUSH',
        category: 'Research Ethics',
        description: 'In-depth coverage of ICMR ethical guidelines, Central Council for Research in Ayurvedic Sciences (CCRAS) research norms, investigator responsibilities, and informed consent.',
        difficulty: 'Intermediate',
        durationHours: 12,
        learningObjectives: [
          'Master Institutional Ethics Committee (IEC) submission processes',
          'Implement GCP standards in AYUSH clinical trial sites',
          'Accurately identify and report adverse events using ASU Pharmacovigilance criteria'
        ],
        ayushRelevance: 'Mandatory training for students and investigators undertaking clinical research or seeking institutional grants.',
        enrolled: true,
        progress: 100,
        lessons: [
          { id: 'l-1', title: 'Principles of Bioethics in Traditional Medicine', durationMin: 45, content: 'Explores beneficence, non-maleficence, autonomy, and justice specifically regarding classical formulations and modified extracts.', summary: 'Foundational ethics rules and declaration of Helsinki compliance.' },
          { id: 'l-2', title: 'IEC Submission & Protocol Formulation', durationMin: 50, content: 'Step-by-step checklist of documents required for human ethical clearance in institutional setups.', summary: 'Essential documentation requirements.' },
          { id: 'l-3', title: 'ASU Pharmacovigilance & Safety Reporting', durationMin: 60, content: 'Classification of adverse drug reactions, causality assessment scales, and National Pharmacovigilance Center guidelines.', summary: 'Protocol for reporting suspected adverse reactions.' }
        ]
      },
      {
        id: 'lm-biostats',
        title: 'Biostatistics & Quantitative Analysis for AYUSH Clinical Trials',
        category: 'Healthcare Data',
        description: 'Practical biostatistics covering hypothesis testing, sample size calculation for superiority/non-inferiority trials, parametric vs non-parametric tests for Ayurvedic outcomes.',
        difficulty: 'Intermediate',
        durationHours: 15,
        learningObjectives: [
          'Calculate sample sizes for clinical trials with Ayurvedic interventions',
          'Select appropriate statistical tests for subjective scoring scales (VAS, Likert)',
          'Interpret odds ratios, confidence intervals, and survival analysis'
        ],
        ayushRelevance: 'Directly bridges classical clinical assessment with globally accepted statistical validation.',
        enrolled: true,
        progress: 40,
        lessons: [
          { id: 'l-4', title: 'Variables and Measurement Scales in Clinical Studies', durationMin: 40, content: 'Mapping classical parameters (Agni, Kostha, Bala) into validated clinical assessment scales.', summary: 'Translating classical parameters to quantitative metrics.' },
          { id: 'l-5', title: 'Sample Size Determination and Power Analysis', durationMin: 55, content: 'Formulas and software tools to determine statistical power for AYUSH randomized controlled trials.', summary: 'Ensuring statistical validity through adequate sample sizing.' }
        ]
      },
      {
        id: 'lm-digital-health',
        title: 'Ayush Grid, NAMASTE Portal & Healthcare Data Standards',
        category: 'Digital Health',
        description: 'Comprehensive overview of the Ministry of Ayush digital ecosystem: Ayush Grid architecture, National Ayush Morbidity and Standardized Terminologies Electronic (NAMASTE) portal, and ICD-11 integration.',
        difficulty: 'Beginner',
        durationHours: 8,
        learningObjectives: [
          'Navigate and document within the NAMASTE nomenclature system',
          'Understand dual coding with ICD-11 Traditional Medicine Module 2',
          'Implement ABDM electronic medical records compliance'
        ],
        ayushRelevance: 'Empowers future doctors to practice in digitized clinics and contribute to national epidemiological data.',
        enrolled: false,
        progress: 0,
        lessons: [
          { id: 'l-6', title: 'The Ayush Grid Master Plan & Architecture', durationMin: 35, content: 'Overview of national IT backbone connecting hospitals, research institutes, colleges, and dispensaries.', summary: 'Key components of the Ayush digital healthcare infrastructure.' },
          { id: 'l-7', title: 'NAMASTE Coding and ICD-11 Dual Recording', durationMin: 45, content: 'Translating classical Ayurvedic diagnostic terms into standardized national and international codes.', summary: 'Hands-on terminology mapping.' }
        ]
      },
      {
        id: 'lm-manuscript-writing',
        title: 'Scientific Manuscript Writing & CONSORT-AYUSH Reporting',
        category: 'Scientific Communication',
        description: 'Techniques for publishing in high-impact PubMed/Scopus indexed journals like JAIM, Ayu, and Journal of Ethnopharmacology using standard CONSORT extensions.',
        difficulty: 'Advanced',
        durationHours: 10,
        learningObjectives: [
          'Draft structured IMRaD scientific papers adhering to CONSORT-AYUSH',
          'Perform rigorous literature syntheses with PRISMA guidelines',
          'Address peer-reviewer comments and protocol validation queries'
        ],
        ayushRelevance: 'Vital for academic promotion, PhD admissions, and international scientific recognition.',
        enrolled: false,
        progress: 0,
        lessons: [
          { id: 'l-8', title: 'Structure of an Indexed Clinical Paper', durationMin: 50, content: 'Deconstructing Title, Abstract, Introduction, Methods, Results, and Discussion sections.', summary: 'Structure and editorial expectations for research articles.' }
        ]
      }
    ];

    // 7. Video Resources (Watch & Learn + 5-Minute Learning)
    this.videoResources = [
      {
        id: 'vid-1',
        title: 'Understanding Reverse Pharmacology in Herbal Formulations',
        topic: 'Drug Discovery & Traditional Knowledge',
        category: 'AYUSH Research',
        duration: '14 mins',
        source: 'AIIA Academic Video Archive (Demo Resource)',
        sourceUrl: 'https://aiia.gov.in/educational-resources/reverse-pharmacology-lecture',
        learningObjective: 'Understand how documented traditional clinical experiences guide modern phytochemical extraction and targeted preclinical safety validation.',
        isFiveMinute: false,
        completed: true
      },
      {
        id: 'vid-2',
        title: '5-Min Brief: Reading and Interpreting Forest Plots in Meta-Analysis',
        topic: 'Evidence-Based Medicine',
        category: 'Research Methodology',
        duration: '5 mins',
        source: 'National Institute of Ayurveda Educational Stream (Demo Resource)',
        sourceUrl: 'https://nia.nic.in/learning/meta-analysis-forest-plots',
        learningObjective: 'Learn how to interpret odds ratios, diamond summary markers, and heterogeneity (I-squared) in published herbal systematic reviews.',
        isFiveMinute: true,
        completed: false
      },
      {
        id: 'vid-3',
        title: 'ASU Pharmacovigilance: Step-by-Step Yellow Card Documentation',
        topic: 'Drug Safety & Regulation',
        category: 'Clinical Education',
        duration: '12 mins',
        source: 'Pharmacovigilance Program for ASU Drugs (Demo Resource)',
        sourceUrl: 'https://ayush.gov.in/pharmacovigilance-training',
        learningObjective: 'Master the proper completion of suspected adverse reaction forms for classical and proprietary Ayurvedic formulations.',
        isFiveMinute: false,
        completed: false
      },
      {
        id: 'vid-4',
        title: '5-Min Brief: Key Highlights of NAMASTE Portal Classification',
        topic: 'Digital Health & Health Informatics',
        category: 'Digital Health',
        duration: '5 mins',
        source: 'Ayush Grid Knowledge Series (Demo Resource)',
        sourceUrl: 'https://ayushgrid.gov.in/namaste-quick-guide',
        learningObjective: 'Quick 5-minute visual walkthrough on navigating morbidity codes for Ayurvedic clinical documentation.',
        isFiveMinute: true,
        completed: true
      }
    ];

    // 8. Opportunities (Internships, Training, Research)
    this.opportunities = [
      {
        id: 'opp-1',
        recruiterId: 'usr-recruiter-1',
        title: 'Junior Clinical Research Fellow (Ayurveda Clinical Trials)',
        organization: 'All India Institute of Ayurveda (AIIA) - Clinical Research Division',
        organizationType: 'Autonomous Apex Academic & Research Institute',
        opportunityType: 'RESEARCH_INTERNSHIP',
        domain: 'AYUSH Clinical Research',
        location: 'New Delhi (Sarita Vihar)',
        mode: 'On-site',
        duration: '6 Months (Full-Time / Stipendiary)',
        stipend: '₹31,000 / month + HRA (ICMR-Ayush Norms)',
        description: 'Assist Senior Research Officers in conducting GCP-compliant Phase-II clinical trials on classical polyherbal formulations in chronic metabolic and autoimmune conditions. Tasks include patient screening, e-CRF documentation, compliance monitoring, and sample coordination.',
        eligibility: 'BAMS graduates or final-year BAMS interns awaiting registration. Strong interest in clinical research ethics.',
        deadline: '2026-10-15T23:59:59Z',
        requiredCompetencies: ['Research Methodology in AYUSH', 'Research Ethics & Good Clinical Practice (GCP)', 'Clinical Reasoning & Classical Diagnostics'],
        preferredCompetencies: ['Clinical & Regulatory Documentation', 'Scientific & Academic Communication'],
        applicationQuestions: [
          'Briefly outline your clinical exposure to Panchakarma or Kayachikitsa research protocols.',
          'Describe a research question in traditional medicine you are eager to investigate.'
        ],
        status: 'ACTIVE',
        createdAt: '2026-08-20T10:00:00Z'
      },
      {
        id: 'opp-2',
        recruiterId: 'usr-recruiter-1',
        title: 'Herbal Drug Standardization & Quality Assurance Trainee',
        organization: 'Dabur India R&D Centre (Ayurvedic Division)',
        organizationType: 'Healthcare & Pharmaceutical Industry',
        opportunityType: 'PHARMACEUTICAL_RESEARCH',
        domain: 'Pharmaceutical Research',
        location: 'Ghaziabad, NCR',
        mode: 'On-site',
        duration: '4 Months',
        stipend: '₹22,000 / month',
        description: 'Hands-on industrial training in modern Dravyaguna research, TLC/HPTLC fingerprinting, organoleptic analysis, pesticide residue screening, and batch stability testing according to Ayurvedic Pharmacopoeia of India specifications.',
        eligibility: 'BAMS/MD scholars or B.Pharm (Ayurveda) final year students with basic laboratory orientation.',
        deadline: '2026-10-25T23:59:59Z',
        requiredCompetencies: ['Research Methodology in AYUSH', 'Clinical & Regulatory Documentation'],
        preferredCompetencies: ['Healthcare Data Literacy & Biostatistics'],
        applicationQuestions: [
          'Which analytical techniques have you had exposure to during your academic training?',
          'What interests you in industrial scale herbal manufacturing quality control?'
        ],
        status: 'ACTIVE',
        createdAt: '2026-08-22T14:30:00Z'
      },
      {
        id: 'opp-3',
        recruiterId: 'usr-recruiter-1',
        title: 'Ayush Grid & Health Informatics Research Intern',
        organization: 'Centre for Development of Advanced Computing (C-DAC) & Ayush Grid',
        organizationType: 'Government Technology & Research Agency',
        opportunityType: 'DIGITAL_HEALTH',
        domain: 'Healthcare Technology',
        location: 'Pune / Remote Hybrid',
        mode: 'Hybrid',
        duration: '3 Months',
        stipend: '₹25,000 / month',
        description: 'Collaborate with health informaticians on validating NAMASTE portal terminology mappings, testing clinical decision support algorithms for Dosha-Prakriti assessment, and reviewing tele-health user interfaces for rural dispensaries.',
        eligibility: 'AYUSH students (BAMS, BHMS, BNYS, BUMS) with demonstrated interest in digital health, data documentation, or computer applications in medicine.',
        deadline: '2026-11-05T23:59:59Z',
        requiredCompetencies: ['Digital Health & Health Informatics Literacy', 'Clinical & Regulatory Documentation'],
        preferredCompetencies: ['Healthcare Data Literacy & Biostatistics'],
        applicationQuestions: [
          'How do you envision electronic health records benefiting classical AYUSH diagnostic documentation?'
        ],
        status: 'ACTIVE',
        createdAt: '2026-08-25T11:00:00Z'
      },
      {
        id: 'opp-4',
        recruiterId: 'usr-recruiter-1',
        title: 'Public Health & Nutrition Field Fellow (National AYUSH Mission)',
        organization: 'State Ayush Society & National Ayush Mission (NAM)',
        organizationType: 'Public Health & Government Mission',
        opportunityType: 'PUBLIC_HEALTH',
        domain: 'Public Health & Community Medicine',
        location: 'Jaipur, Rajasthan',
        mode: 'On-site',
        duration: '6 Months',
        stipend: '₹28,000 / month',
        description: 'Field evaluation of Ayushman Arogya Mandir (Ayush) preventive wellness programs, Swasthavritta community camps, geriatric wellness tracking, and maternal anemia nutrition initiatives.',
        eligibility: 'Final year students or postgraduates in Swasthavritta, Kaumarbhritya, or community health.',
        deadline: '2026-10-30T23:59:59Z',
        requiredCompetencies: ['Clinical Reasoning & Classical Diagnostics', 'Scientific & Academic Communication'],
        preferredCompetencies: ['Healthcare Data Literacy & Biostatistics'],
        applicationQuestions: [
          'Describe a community preventive health camp initiative you participated in.'
        ],
        status: 'ACTIVE',
        createdAt: '2026-08-28T09:00:00Z'
      }
    ];

    // 9. Applications
    this.applications = [
      {
        id: 'app-101',
        opportunityId: 'opp-1',
        studentId: 'stu-1',
        status: 'SHORTLISTED',
        statementOfPurpose: 'As a final-year scholar at AIIA with strong foundational training in Kayachikitsa and certified training in GCP guidelines, I am deeply committed to contributing to evidence-based traditional medicine trials. My previous work includes reviewing protocol designs for lifestyle disorders.',
        answers: {
          'question_0': 'Completed 6 weeks observership in AIIA IPD Kayachikitsa unit assisting in patient assessment logs.',
          'question_1': 'Investigating serum inflammatory markers before and after classical Virechana therapy in metabolic syndrome.'
        },
        compatibilityScore: 89,
        appliedAt: '2026-08-24T10:15:00Z',
        history: [
          { status: 'APPLIED', note: 'Application and academic transcripts submitted successfully.', timestamp: '2026-08-24T10:15:00Z' },
          { status: 'UNDER_REVIEW', note: 'Application dossier under review by AIIA Clinical Research Committee.', timestamp: '2026-08-26T14:20:00Z' },
          { status: 'SHORTLISTED', note: 'Shortlisted for technical evaluation interview based on high competency compatibility.', timestamp: '2026-08-29T16:00:00Z' }
        ]
      }
    ];

    // 10. Research Opportunities
    this.researchOpportunities = [
      {
        id: 'res-1',
        title: 'Biomarker Modulation in Classical Panchakarma Procedures for Autoimmune Disorders',
        domain: 'AYUSH Clinical Research',
        institution: 'All India Institute of Ayurveda (AIIA), New Delhi',
        mentorName: 'Prof. Dr. Rajeshwar V. Joshi (AIIA)',
        objective: 'Conduct targeted cytokine profiling (IL-6, TNF-alpha) in patients undergoing monitored Basti and Virechana regimens.',
        skillsRequired: ['Clinical Reasoning', 'Research Ethics', 'Protocol Documentation'],
        eligibility: 'MD (Ayurveda) scholars or selected meritorious final year BAMS students.',
        duration: '1 Year',
        grantOrStipend: 'Funded under Ministry of Ayush Extra-Mural Research Scheme (EMR)',
        deadline: '2026-11-15T23:59:59Z',
        status: 'OPEN'
      },
      {
        id: 'res-2',
        title: 'Phytochemical Fingerprinting & HPTLC Standardization of Endangered Medhya Rasayana Herbs',
        domain: 'Medicinal Plant Research',
        institution: 'National Medicinal Plants Board (NMPB) & CSIR Lab',
        mentorName: 'Dr. K. S. Balachandran',
        objective: 'Standardize extraction parameters for Shankhpushpi (Convolvulus pluricaulis) and Bacopa monnieri to establish geographic marker profiles.',
        skillsRequired: ['Herbal Drug Standardization', 'Data Analysis', 'Laboratory GLP'],
        eligibility: 'Dravyaguna / Pharmacognosy / Phytochemistry researchers.',
        duration: '8 Months',
        grantOrStipend: 'NMPB Junior Fellowship: ₹25,000 / month',
        deadline: '2026-11-30T23:59:59Z',
        status: 'OPEN'
      },
      {
        id: 'res-3',
        title: 'Validation of NAMASTE-ICD-11 Dual Morbidity Coding in Tertiary AYUSH Hospitals',
        domain: 'Digital Health & Health Informatics',
        institution: 'National Institute of Ayurveda (NIA), Jaipur & WHO CC',
        mentorName: 'Dr. Meenakshi Sundaram',
        objective: 'Evaluate inter-rater reliability of electronic health records documented in parallel using Ayurvedic diagnostic criteria and international diagnostic codes.',
        skillsRequired: ['Digital Health Awareness', 'Documentation', 'Biostatistics'],
        eligibility: 'Open to AYUSH academic interns and postgraduate scholars.',
        duration: '6 Months',
        grantOrStipend: 'Institutional Research Grant',
        deadline: '2026-12-10T23:59:59Z',
        status: 'OPEN'
      }
    ];

    // 11. Live Projects
    this.liveProjects = [
      {
        id: 'proj-1',
        title: 'Multi-Center Registry of Classical Formulations in Type-2 Diabetes Management',
        category: 'AYUSH Clinical Trial',
        description: 'National real-world evidence registry collecting standardized clinical outcomes from 5 AYUSH teaching hospitals observing patients prescribed Nisamalaki and Shilajatu formulations.',
        organization: 'Ministry of Ayush Collaborative Research Grid',
        mentorName: 'Prof. Dr. Rajeshwar V. Joshi',
        duration: '9 Months',
        eligibility: 'Student Investigators from affiliated AYUSH colleges.',
        skillsCovered: ['Case Documentation', 'e-CRF Entry', 'ASU Pharmacovigilance', 'GCP Compliance'],
        status: 'IN_PROGRESS',
        teamMembersCount: 8,
        milestones: [
          { id: 'm-1', title: 'Protocol IRB Approval & Site Readiness', completed: true, dueDate: '2026-03-01' },
          { id: 'm-2', title: 'Cohort Enrollment (500 Subjects)', completed: true, dueDate: '2026-06-15' },
          { id: 'm-3', title: 'Mid-term 6-Month Glycemic & Lipid Profiling', completed: false, dueDate: '2026-10-30' },
          { id: 'm-4', title: 'Statistical Aggregation & Final Manuscript Draft', completed: false, dueDate: '2026-12-15' }
        ]
      }
    ];

    // 12. Mentors
    this.mentorProfiles = [
      {
        id: 'men-1',
        userId: 'usr-mentor-1',
        name: 'Dr. Meenakshi Sundaram',
        domain: 'AYUSH Research & Digital Health',
        organization: 'Autonomous National Research Council & WHO Collaborating Center',
        designation: 'Senior Principal Scientist & Clinical Epidemiologist',
        yearsOfExperience: 16,
        specialties: ['Clinical Trial Design', 'GCP Ethics', 'Ayush Grid Informatic Standards', 'ICMR-Ayush Interdisciplinary Grants'],
        mentorshipTopics: ['Preparing for Research Internships', 'Navigating Scientific Publications', 'Translating Classical Texts to Research Protocols'],
        maxMentees: 6,
        currentMenteesCount: 3,
        availability: 'Wednesday Evenings & Saturday Mornings',
        rating: 4.95
      },
      {
        id: 'men-2',
        userId: 'usr-mentor-2',
        name: 'Prof. Dr. Anupama Venugopal (Demo Mentor Profile)',
        domain: 'Classical Panchakarma & Clinical Practice',
        organization: 'Department of Panchakarma, National Institute of Ayurveda',
        designation: 'Professor & Head of Department',
        yearsOfExperience: 22,
        specialties: ['Advanced Panchakarma Protocols', 'Complication Management in Shodhana', 'Clinical Case Presentation'],
        mentorshipTopics: ['Setting Up Clinical Specialty Centers', 'Differential Diagnosis in Neurological Conditions'],
        maxMentees: 5,
        currentMenteesCount: 4,
        availability: 'Friday Afternoons',
        rating: 4.88
      },
      {
        id: 'men-3',
        userId: 'usr-mentor-3',
        name: 'Dr. Hemant Bhargav (Demo Mentor Profile)',
        domain: 'Integrative Medicine & Mind-Body Interventions',
        organization: 'Integrative Medicine Center, Apex Medical Institute',
        designation: 'Associate Professor & Senior Research Scientist',
        yearsOfExperience: 12,
        specialties: ['Yoga & Ayurveda in Neuropsychiatry', 'fMRI & Biological Markers in Mind-Body Research', 'Biostatistics'],
        mentorshipTopics: ['Interdisciplinary Research Collaborations', 'Grant Writing for Global Funding'],
        maxMentees: 4,
        currentMenteesCount: 2,
        availability: 'Sunday Mornings',
        rating: 4.92
      }
    ];

    // 13. Mentorship Sessions & Goals
    this.mentorshipSessions = [
      {
        id: 'sess-1',
        mentorId: 'men-1',
        mentorName: 'Dr. Meenakshi Sundaram',
        studentId: 'stu-1',
        studentName: 'Dr. Ananya Sharma',
        scheduledAt: '2026-09-10T16:00:00Z',
        durationMinutes: 45,
        topic: 'Preparation for Clinical Research Associate Interview & Protocol Design',
        studentGoal: 'Secure Junior Research Fellow appointment at AIIA Clinical Trials Division',
        milestoneCovered: 'Research Ethics & Good Clinical Practice Checklist',
        status: 'SCHEDULED',
        notesPreSession: 'Reviewing candidate resume, statement of purpose, and competency gap in healthcare data literacy. Plan to discuss handling statistical review queries.'
      },
      {
        id: 'sess-0',
        mentorId: 'men-1',
        mentorName: 'Dr. Meenakshi Sundaram',
        studentId: 'stu-1',
        studentName: 'Dr. Ananya Sharma',
        scheduledAt: '2026-08-15T16:00:00Z',
        durationMinutes: 45,
        topic: 'Initial Career Goal Mapping & Research Methodology Roadmap',
        studentGoal: 'Formulate career transition from BAMS clinical studies to research fellow',
        milestoneCovered: 'Literature Review Strategies & GCP Certification',
        status: 'COMPLETED',
        notesPreSession: 'Student showed keen interest in reverse pharmacology.',
        notesPostSession: 'Ananya possesses exceptional domain grounding in classical Dravya properties. Recommended immediate enrollment in Biostatistics module.',
        feedback: {
          strengths: ['Deep grasp of Charaka Samhita Chikitsa Sthana', 'High enthusiasm for clinical inquiry', 'Meticulous documentation habit'],
          growthAreas: ['Quantitative biostatistics proficiency', 'Familiarity with electronic CRF platforms'],
          recommendedAction: 'Complete the 15-hour Biostatistics module before next session.'
        }
      }
    ];

    this.mentorshipGoals = [
      {
        id: 'mg-1',
        studentId: 'stu-1',
        mentorId: 'men-1',
        title: 'Prepare for National AYUSH Research Internship',
        targetDate: '2026-10-31',
        progressPct: 68,
        milestones: [
          { title: 'Complete GCP Ethics & ASU Pharmacovigilance Module', done: true },
          { title: 'Draft Sample Clinical Trial Protocol for Lifestyle Disease', done: true },
          { title: 'Review Biostatistics Essentials & Sample Size Calculation', done: false },
          { title: 'Participate in Mock Research Defense Interview with Mentor', done: false },
          { title: 'Finalize Skill Passport & Research Dossier', done: false }
        ]
      }
    ];

    // 14. Collaboration Requests (Faculty <-> Industry)
    this.collaborationRequests = [
      {
        id: 'collab-1',
        recruiterId: 'usr-recruiter-1',
        organization: 'Dabur India R&D Centre',
        type: 'Workshop',
        title: 'Industrial Standardization & Schedule T GMP Compliance Masterclass',
        description: 'Industry technical leads propose conducting a 2-day intensive hands-on workshop for postgraduates and faculty on chromatographic fingerprinting of herbal raw materials.',
        proposedTimeline: 'November 2026',
        status: 'PENDING',
        createdAt: '2026-08-25T12:00:00Z'
      },
      {
        id: 'collab-2',
        recruiterId: 'usr-recruiter-1',
        organization: 'Himalaya Wellness Company (R&D)',
        type: 'Research Project',
        title: 'Collaborative Pharmacological Evaluation of Classical Hepatoprotective Formulations',
        description: 'Industry-sponsored academic research trial seeking academic faculty co-principal investigator to lead clinical trial validation.',
        proposedTimeline: 'January 2027 - December 2027',
        status: 'ACCEPTED',
        createdAt: '2026-08-10T14:00:00Z'
      },
      {
        id: 'collab-3',
        recruiterId: 'usr-recruiter-1',
        organization: 'Ayush Grid Technology Consortium',
        type: 'Guest Lecture',
        title: 'Artificial Intelligence & Large Language Models in Traditional Medical Documentation',
        description: 'Inviting faculty participation for expert symposium exploring terminology mapping and clinical decision support safeguards.',
        proposedTimeline: 'October 2026',
        status: 'PENDING',
        createdAt: '2026-08-28T16:00:00Z'
      }
    ];

    // 15. Innovation Challenges
    this.innovationChallenges = [
      {
        id: 'chal-1',
        title: 'National AYUSH Smart Automation & Standardization Challenge 2026',
        problem: 'Design automated, low-cost optical or sensor-based methods to verify genuine herbal species and detect adulteration in raw medicinal plant markets (Mandi levels).',
        domain: 'Medicinal Plant Standardization',
        eligibility: 'Interdisciplinary teams comprising AYUSH scholars and bio-engineers/data scientists.',
        skills: ['Herbal Drug Standardization', 'Healthcare Innovation', 'Teamwork', 'Problem Solving'],
        maxTeamSize: 4,
        awardInfo: 'Seed grant of ₹5,00,000 for incubation at AIIA Technology Business Incubator.',
        deadline: '2026-11-20T23:59:59Z',
        status: 'OPEN'
      },
      {
        id: 'chal-2',
        title: 'Ayush Telehealth Decision Support & Prakriti Assessment App',
        problem: 'Create an algorithmic questionnaire scoring system with explainable validation to assist community health workers in preliminary Dosha-Prakriti stratification.',
        domain: 'Digital Health Innovation',
        eligibility: 'All AYUSH undergraduate and postgraduate students.',
        skills: ['Clinical Reasoning', 'Digital Health Awareness', 'Scientific Communication'],
        maxTeamSize: 3,
        awardInfo: 'National Recognition Certificate by Ministry of Ayush + Pilot Deployment in 20 Dispensaries.',
        deadline: '2026-12-05T23:59:59Z',
        status: 'OPEN'
      }
    ];

    // 16. Help Desk Tickets
    this.helpDeskTickets = [
      {
        id: 'tkt-1',
        ticketId: 'AYUSH-TK-2026-1042',
        userId: 'usr-student-1',
        userRole: 'STUDENT',
        userName: 'Dr. Ananya Sharma',
        category: 'Skill Passport',
        subject: 'Verification of GCP Ethics Module Completion Badge',
        description: 'I completed the 12-hour GCP & Ethical Frameworks course with 100% quiz score. Please review and attach verified badge to my official Skill Passport.',
        status: 'IN_PROGRESS',
        createdAt: '2026-08-27T10:00:00Z',
        updatedAt: '2026-08-28T14:00:00Z',
        resolutionNote: 'Credential verified by academic registrar. Updating certificate hash onto Skill Passport.'
      },
      {
        id: 'tkt-2',
        ticketId: 'AYUSH-TK-2026-1018',
        userId: 'usr-student-1',
        userRole: 'STUDENT',
        userName: 'Dr. Ananya Sharma',
        category: 'Applications',
        subject: 'Inquiry regarding AIIA Clinical Research Fellow interview slot timing',
        description: 'Requesting confirmation on whether the shortlisted interview will be conducted via video conference or on-campus at AIIA Sarita Vihar.',
        status: 'RESOLVED',
        createdAt: '2026-08-30T09:30:00Z',
        updatedAt: '2026-08-31T11:20:00Z',
        resolutionNote: 'Candidate notified: Both hybrid tele-interview and on-campus options are available. Formal invite sent.'
      }
    ];

    // 17. Notifications (Centralized Role-Specific Activity Stream)
    this.notifications = [
      // STUDENT NOTIFICATIONS (usr-student-1)
      {
        id: 'notif-s1',
        userId: 'usr-student-1',
        category: 'Applications',
        title: 'Application Shortlisted for Clinical Research Fellow',
        message: 'Your application for Junior Clinical Research Fellow at All India Institute of Ayurveda (AIIA) has been shortlisted by the selection committee.',
        actionUrl: '/student/internships',
        actionLabel: 'View Application',
        priority: 'HIGH',
        isRead: false,
        createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString() // 10 min ago
      },
      {
        id: 'notif-s2',
        userId: 'usr-student-1',
        category: 'Mentorship',
        title: 'Upcoming Mentorship Session Reminder',
        message: 'Mentorship session with Dr. Meenakshi Sundaram (Clinical Research & GCP Lead) is scheduled for tomorrow at 4:00 PM.',
        actionUrl: '/student/mentorship',
        actionLabel: 'View Session Brief',
        priority: 'HIGH',
        isRead: false,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2 hours ago
      },
      {
        id: 'notif-s3',
        userId: 'usr-student-1',
        category: 'Opportunities',
        title: 'New AYUSH Research Internship Matches Your Profile',
        message: 'CCRAS Extramural Clinical Research Fellowship (94% Match) in Standardized Panchakarma Trials is now open.',
        actionUrl: '/student/internships',
        actionLabel: 'View Opportunity',
        priority: 'NORMAL',
        isRead: false,
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString() // 6 hours ago
      },
      {
        id: 'notif-s4',
        userId: 'usr-student-1',
        category: 'Learning',
        title: 'Competency Gap Identified: Healthcare Data Literacy',
        message: 'Your recent assessment identified a targeted gap in CTRI registry protocol filing and biostatistics. Recommended learning module is ready.',
        actionUrl: '/student/learning',
        actionLabel: 'Continue Learning',
        priority: 'NORMAL',
        isRead: false,
        createdAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString() // Yesterday
      },
      {
        id: 'notif-s5',
        userId: 'usr-student-1',
        category: 'Mentorship',
        title: 'Mentor Feedback Received from Dr. Sundaram',
        message: 'Detailed evaluation added for "Clinical Observation & Protocol Drafting". Recommended milestone: CTRI registry submission.',
        actionUrl: '/student/mentorship',
        actionLabel: 'Review Progress',
        priority: 'NORMAL',
        isRead: true,
        createdAt: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString() // Yesterday
      },
      {
        id: 'notif-s6',
        userId: 'usr-student-1',
        category: 'Research',
        title: 'New Innovation Challenge: NAMASTE-ICD-11 Dual Coding',
        message: 'Ministry of Ayush & AIIA Smart Automation Challenge for Ayurvedic disease classification is accepting team submissions.',
        actionUrl: '/student/challenges',
        actionLabel: 'Explore Challenge',
        priority: 'NORMAL',
        isRead: true,
        createdAt: new Date(Date.now() - 50 * 60 * 60 * 1000).toISOString() // Earlier
      },
      {
        id: 'notif-s7',
        userId: 'usr-student-1',
        category: 'System',
        title: 'AYUSH Skill Passport Endorsed',
        message: 'Head of Kayachikitsa & Panchakarma Dept. has verified 120 inpatient clinical rotation hours on your cryptographic Skill Passport.',
        actionUrl: '/student/passport',
        actionLabel: 'View Skill Passport',
        priority: 'HIGH',
        isRead: true,
        createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString() // Earlier
      },

      // FACULTY NOTIFICATIONS (usr-faculty-1)
      {
        id: 'notif-f1',
        userId: 'usr-faculty-1',
        category: 'Opportunities',
        title: 'New Industry Collaboration Request: Schedule T GMP Workshop',
        message: 'Dabur India R&D Centre submitted a formal proposal for a 2-day hands-on industry workshop with AIIA PG scholars.',
        actionUrl: '/faculty/dashboard',
        actionLabel: 'Review Proposal',
        priority: 'HIGH',
        isRead: false,
        createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString() // 15 min ago
      },
      {
        id: 'notif-f2',
        userId: 'usr-faculty-1',
        category: 'Research',
        title: 'Joint Research Collaboration Proposal from Himalaya Wellness',
        message: 'Proposal submitted for collaborative LC-MS/MS marker profiling of classical Ashwagandharishta batches.',
        actionUrl: '/faculty/dashboard',
        actionLabel: 'View Research Request',
        priority: 'HIGH',
        isRead: false,
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString() // 3 hours ago
      },
      {
        id: 'notif-f3',
        userId: 'usr-faculty-1',
        category: 'Learning',
        title: 'Student Competency Report Available: Batch 2022',
        message: 'Aggregated analytics reveal 64% readiness in Research Methodology and 48% in Digital Health across final-year BAMS scholars.',
        actionUrl: '/faculty/dashboard',
        actionLabel: 'Inspect Analytics',
        priority: 'NORMAL',
        isRead: false,
        createdAt: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString() // Today
      },
      {
        id: 'notif-f4',
        userId: 'usr-faculty-1',
        category: 'Applications',
        title: 'FDP Opportunity: Advanced ASU Drug Standardisation',
        message: 'Pharmacopoeia Commission for Indian Medicine & Homoeopathy (PCIM&H) faculty development program open for nominations.',
        actionUrl: '/faculty/dashboard',
        actionLabel: 'View Details',
        priority: 'NORMAL',
        isRead: true,
        createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString() // Yesterday
      },

      // MENTOR NOTIFICATIONS (usr-mentor-1)
      {
        id: 'notif-m1',
        userId: 'usr-mentor-1',
        category: 'Mentorship',
        title: 'Upcoming Mentorship Session with Dr. Ananya Sharma',
        message: 'Scheduled 1-on-1 session tomorrow at 4:00 PM on "GCP Trial Protocol Design & Ethics Review".',
        actionUrl: '/mentor/dashboard',
        actionLabel: 'View Session Brief',
        priority: 'HIGH',
        isRead: false,
        createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString() // 25 min ago
      },
      {
        id: 'notif-m2',
        userId: 'usr-mentor-1',
        category: 'Mentorship',
        title: 'Mentee Milestone Awaiting Review: Protocol Draft',
        message: 'Dr. Ananya Sharma uploaded draft protocol for heavy metal safety in Rasashastra for your clinical feedback.',
        actionUrl: '/mentor/dashboard',
        actionLabel: 'Review Milestone',
        priority: 'NORMAL',
        isRead: false,
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString() // 4 hours ago
      },
      {
        id: 'notif-m3',
        userId: 'usr-mentor-1',
        category: 'Mentorship',
        title: 'Mentee Completed Milestone: GCP Guidelines',
        message: 'Scholar successfully scored 92% on Good Clinical Practice module under goal "AYUSH Research Fellowship".',
        actionUrl: '/mentor/dashboard',
        actionLabel: 'Check Mentee Goal',
        priority: 'NORMAL',
        isRead: true,
        createdAt: new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString() // Yesterday
      },

      // RECRUITER NOTIFICATIONS (usr-recruiter-1)
      {
        id: 'notif-r1',
        userId: 'usr-recruiter-1',
        category: 'Applications',
        title: 'New Application: Junior Clinical Research Fellow',
        message: 'Dr. Ananya Sharma (Final Year BAMS • AIIA New Delhi) submitted an application matching 89% of required competencies.',
        actionUrl: '/recruiter/dashboard',
        actionLabel: 'Review Candidate',
        priority: 'HIGH',
        isRead: false,
        createdAt: new Date(Date.now() - 8 * 60 * 1000).toISOString() // 8 min ago
      },
      {
        id: 'notif-r2',
        userId: 'usr-recruiter-1',
        category: 'Opportunities',
        title: 'High-Match Candidate Identified (94% Match)',
        message: 'Verified Skill Passport candidate matching Schedule T GMP and HPTLC quality control specifications.',
        actionUrl: '/recruiter/dashboard',
        actionLabel: 'View Candidate Match',
        priority: 'NORMAL',
        isRead: false,
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() // 5 hours ago
      },
      {
        id: 'notif-r3',
        userId: 'usr-recruiter-1',
        category: 'Applications',
        title: 'Application Deadline Approaching in 48 Hours',
        message: 'Summer ASU Clinical Trial Coordinator Cohort posting will close in 2 days. 18 candidates pending review.',
        actionUrl: '/recruiter/dashboard',
        actionLabel: 'Manage Pipeline',
        priority: 'HIGH',
        isRead: true,
        createdAt: new Date(Date.now() - 32 * 60 * 60 * 1000).toISOString() // Yesterday
      }
    ];

    // 18. Documents
    this.documents = [
      {
        id: 'doc-1',
        studentId: 'stu-1',
        title: 'Academic Curriculum Vitae (AIIA Clinical Format)',
        category: 'RESUME',
        docType: 'Resume',
        fileName: 'Dr_Ananya_Sharma_Academic_CV_2026.pdf',
        fileSize: '245 KB',
        fileSizeKb: 245,
        fileUrl: '#/documents/Dr_Ananya_Sharma_Academic_CV_2026.pdf',
        isVerified: true,
        uploadedAt: '2026-08-20T10:00:00Z'
      },
      {
        id: 'doc-2',
        studentId: 'stu-1',
        title: 'ICMR-CCRAS Good Clinical Practice (GCP) Certification',
        category: 'CERTIFICATE',
        docType: 'Certificate',
        fileName: 'ICMR_Good_Clinical_Practice_Certification.pdf',
        fileSize: '512 KB',
        fileSizeKb: 512,
        fileUrl: '#/documents/ICMR_Good_Clinical_Practice_Certification.pdf',
        isVerified: true,
        uploadedAt: '2026-08-22T14:30:00Z'
      },
      {
        id: 'doc-3',
        studentId: 'stu-1',
        title: 'AIIA BAMS Official Transcript & Clinical Logbook Part III',
        category: 'INTERNSHIP_REPORT',
        docType: 'Academic Record',
        fileName: 'AIIA_BAMS_Official_Transcript_Part_III.pdf',
        fileSize: '890 KB',
        fileSizeKb: 890,
        fileUrl: '#/documents/AIIA_BAMS_Official_Transcript_Part_III.pdf',
        isVerified: true,
        uploadedAt: '2026-08-21T09:15:00Z'
      },
      {
        id: 'doc-4',
        studentId: 'stu-1',
        title: 'Pharmacovigilance & ASU Adverse Event Reporting Paper',
        category: 'RESEARCH_PAPER',
        docType: 'Research Paper',
        fileName: 'ASU_Pharmacovigilance_Review_AIIA_2026.pdf',
        fileSize: '1.4 MB',
        fileSizeKb: 1400,
        fileUrl: '#/documents/ASU_Pharmacovigilance_Review_AIIA_2026.pdf',
        isVerified: true,
        uploadedAt: '2026-08-25T11:00:00Z'
      }
    ];
  }

  // Helper calculation for Explainable Match
  calculateOpportunityCompatibility(student: StudentProfileEntity, opportunity: OpportunityEntity) {
    let score = 50; // base score
    const breakdown: { title: string; matched: boolean; weight: number }[] = [];

    // 1. Career interest alignment (30%)
    const careerMatch = student.careerGoal.toLowerCase().includes('research') && opportunity.domain.toLowerCase().includes('research');
    if (careerMatch) {
      score += 20;
      breakdown.push({ title: 'Career Interest Aligned (AYUSH Clinical Research)', matched: true, weight: 20 });
    } else {
      breakdown.push({ title: 'Career Interest Alignment', matched: false, weight: 20 });
    }

    // 2. Required Competency Match (30%)
    const studentCompTitles = this.competencies.filter(c => c.currentLevel >= 3).map(c => c.title.toLowerCase());
    let matchedComps = 0;
    opportunity.requiredCompetencies.forEach(req => {
      const match = studentCompTitles.some(s => req.toLowerCase().includes(s) || s.includes(req.toLowerCase().slice(0, 10)));
      if (match) matchedComps++;
    });

    const compWeight = Math.min(20, matchedComps * 7);
    score += compWeight;
    breakdown.push({ title: `Required Competencies (${matchedComps}/${opportunity.requiredCompetencies.length} verified level ≥ 3)`, matched: matchedComps > 0, weight: compWeight });

    // 3. Eligibility match (20%)
    if (student.program.includes('BAMS') || student.program.includes('MD')) {
      score += 15;
      breakdown.push({ title: 'Program & Academic Year Eligibility Met (BAMS Final Year)', matched: true, weight: 15 });
    }

    // 4. Research interest overlap (10%)
    const interestOverlap = student.researchInterests.some(ri => opportunity.description.toLowerCase().includes(ri.toLowerCase().slice(0, 8)));
    if (interestOverlap) {
      score += 10;
      breakdown.push({ title: 'Research Specialty Alignment (Formulations & Protocols)', matched: true, weight: 10 });
    }

    return {
      score: Math.min(96, Math.max(45, score)),
      breakdown,
      recommendationToImprove: 'Strengthen Healthcare Data Literacy & Biostatistics to reach 95%+ compatibility.'
    };
  }

  calculateMentorCompatibility(student: StudentProfileEntity, mentor: MentorProfileEntity) {
    let score = 65;
    const reasons: string[] = [];

    if (student.targetPathwayId === 'cp-ayush-research' && mentor.domain.includes('Research')) {
      score += 15;
      reasons.push('Career goal aligned with Mentor’s research trajectory');
    }

    const commonSpecialty = mentor.specialties.some(sp => student.careerGoal.toLowerCase().includes(sp.toLowerCase().slice(0, 6)));
    if (commonSpecialty || mentor.domain.includes('Clinical')) {
      score += 10;
      reasons.push('Specialty overlap in Clinical Protocols & GCP Guidelines');
    }

    if (mentor.currentMenteesCount < mentor.maxMentees) {
      score += 5;
      reasons.push('Immediate slots available in weekly cohort');
    }

    return {
      compatibility: Math.min(95, score),
      reasons
    };
  }
}

export const db = new AyushDataStore();
