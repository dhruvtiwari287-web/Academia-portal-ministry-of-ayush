// TypeScript definitions for AYUSH Academia–Industry Collaboration Platform

export type Role = 'STUDENT' | 'FACULTY' | 'MENTOR' | 'RECRUITER' | 'ADMIN';

export type AyushDiscipline =
  | 'AYURVEDA'
  | 'YOGA_NATUROPATHY'
  | 'UNANI'
  | 'SIDDHA'
  | 'SOWA_RIGPA'
  | 'HOMOEOPATHY'
  | 'INTERDISCIPLINARY';

export interface User {
  id: string;
  email: string;
  role: Role;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
}

export interface StudentProfile {
  id: string;
  userId: string;
  discipline: AyushDiscipline;
  program: string;
  institution: string;
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

export interface CareerPathway {
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

export interface Competency {
  id: string;
  code: string;
  title: string;
  category: string;
  description: string;
  importanceInAyush: string;
  evaluationMethod: string;
  currentLevel: number;
  targetLevel: number;
  verified: boolean;
}

export interface SkillGap {
  id: string;
  competencyTitle: string;
  currentScore: number;
  targetScore: number;
  gapMagnitude: 'Low' | 'Moderate' | 'High';
  priority: 'Low' | 'Medium' | 'High';
  recommendedAction: string;
  recommendedModule: string;
  recommendedMentor: string;
}

export interface LearningModule {
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
  lessons: { id: string; title: string; durationMin: number; content: string; summary: string }[];
}

export interface VideoResource {
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

export interface Opportunity {
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
  createdAt?: string;
  postedBy?: string;
  compatibilityScore?: number;
  compatibilityBreakdown?: { title: string; matched: boolean; weight: number }[];
  recommendationToImprove?: string;
}

export interface Application {
  id: string;
  opportunityId: string;
  studentId: string;
  status: 'APPLIED' | 'UNDER_REVIEW' | 'SHORTLISTED' | 'INTERVIEW_SCHEDULED' | 'ACCEPTED' | 'INTERNSHIP_STARTED' | 'COMPLETED' | 'REJECTED';
  statementOfPurpose: string;
  answers: Record<string, string>;
  compatibilityScore: number;
  appliedAt: string;
  history: { status: string; note: string; timestamp: string }[];
  opportunity?: Opportunity;
  student?: {
    name: string;
    email: string;
    program: string;
    institution: string;
    discipline: string;
    readinessScore: number;
  };
}

export interface ResearchOpportunity {
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

export interface LiveProject {
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
  teamMembersCount: number;
  milestones: { id: string; title: string; completed: boolean; dueDate: string }[];
}

export interface MentorProfile {
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
  compatibilityScore?: number;
  compatibilityReasons?: string[];
}

export interface MentorshipSession {
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

export interface MentorshipGoal {
  id: string;
  studentId: string;
  mentorId: string;
  title: string;
  targetDate: string;
  progressPct: number;
  milestones: { title: string; done: boolean }[];
}

export interface CollaborationRequest {
  id: string;
  organization: string;
  type: 'Guest Lecture' | 'Workshop' | 'Research Project' | 'Consultancy' | 'Faculty Training' | 'Live Project';
  title: string;
  description: string;
  proposedTimeline: string;
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED';
  createdAt: string;
}

export interface InnovationChallenge {
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

export interface HelpDeskTicket {
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

export interface Notification {
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

export interface DocumentItem {
  id: string;
  studentId: string;
  title?: string;
  category?: 'ALL' | 'RESUME' | 'CERTIFICATE' | 'INTERNSHIP_REPORT' | 'RESEARCH_PAPER' | string;
  docType?: 'Resume' | 'Certificate' | 'Internship Report' | 'Research Paper' | 'Academic Record';
  fileName: string;
  fileSize?: string;
  fileSizeKb?: number;
  fileUrl?: string;
  isVerified?: boolean;
  uploadedAt: string;
}

export interface SkillPassportData {
  passportNumber: string;
  studentName: string;
  discipline: string;
  institution: string;
  program: string;
  academicYear: number;
  issueAuthority: string;
  issuanceDate: string;
  verificationHash: string;
  verifiedCompetenciesCount: number;
  competencies: Competency[];
  clinicalExposure: { area: string; hours: number; institution: string; verified: boolean }[];
  researchProjects: { title: string; role: string; status: string; verified: boolean }[];
  internships: { organization: string; role: string; period: string; verified: boolean }[];
  certifications: { title: string; issuer: string; year: number; verified: boolean }[];
}

export interface CandidateProfile {
  id: string;
  name: string;
  program: string;
  discipline: string;
  institution: string;
  readinessScore: number;
  matchScore: number;
  avatarUrl?: string;
  status: 'RECOMMENDED' | 'APPLIED' | 'SHORTLISTED' | 'INTERVIEW_SCHEDULED' | 'SELECTED';
  appliedForOpportunity?: string;
  requiredCompetenciesMatched: { name: string; matched: boolean; score: number }[];
  relevantProjects: string[];
  clinicalHours: number;
  skillPassportVerified: boolean;
  whyMatches: {
    matchedPoints: string[];
    improvementPoint: string;
  };
  contactEmail: string;
}

export interface IndustryDemandStat {
  competency: string;
  domain: string;
  industryDemandPct: number;
  studentReadinessPct: number;
  gapPct: number;
  trend: '+12%' | '+18%' | '+24%' | '+8%' | '+15%';
  priority: 'Critical' | 'High' | 'Moderate';
}

export interface SessionBrief {
  sessionId: string;
  studentName: string;
  studentGoal: string;
  currentSkillGaps: { competency: string; gap: number }[];
  previousFeedback: string;
  suggestedQuestions: string[];
  previousMilestonesCompleted: string[];
}

export interface MentorSkillEvaluation {
  id: string;
  studentId: string;
  studentName: string;
  competency: string;
  rating: 'Strong' | 'Developing' | 'Needs Focus';
  comments: string;
  date: string;
  isSubmitted: boolean;
}

export interface CollaborationGraphNode {
  id: string;
  name: string;
  type: 'STUDENT' | 'FACULTY' | 'MENTOR' | 'INDUSTRY' | 'OPPORTUNITY';
  disciplineOrDomain: string;
  institutionOrOrg: string;
  status: string;
}

export interface CollaborationGraphLink {
  source: string;
  target: string;
  relationship: string;
  status: 'ACTIVE' | 'VERIFIED' | 'PROPOSED';
}

