import { Router, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, DEMO_CREDENTIALS } from '../config/constants.js';
import { db } from '../db/dataStore.js';
import { authenticateToken, requireRole, AuthRequest } from '../middleware/auth.js';

export const apiRouter = Router();

// ============================================================
// 1. AUTHENTICATION & DEMO LOGIN
// ============================================================
apiRouter.post('/auth/login', (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  // Find user by email
  const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials. Please verify your email and password.' });
  }

  // Check role match if specified
  if (role && user.role !== role) {
    return res.status(403).json({
      success: false,
      message: `Access denied. Account registered under role '${user.role}', but attempting login via '${role}' portal.`
    });
  }

  // Generate JWT token
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  return res.json({
    success: true,
    message: 'Authentication successful.',
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      avatarUrl: user.avatarUrl
    }
  });
});

apiRouter.post('/auth/demo-login', (req, res) => {
  const { role } = req.body;
  const roleKey = (role || 'STUDENT').toUpperCase() as keyof typeof DEMO_CREDENTIALS;
  const creds = DEMO_CREDENTIALS[roleKey];

  if (!creds) {
    return res.status(400).json({ success: false, message: 'Invalid demo role requested.' });
  }

  const user = db.users.find(u => u.email === creds.email);
  if (!user) {
    return res.status(404).json({ success: false, message: 'Demo account not found.' });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  return res.json({
    success: true,
    message: `Logged in as demo ${user.role} (${user.firstName} ${user.lastName})`,
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      avatarUrl: user.avatarUrl
    }
  });
});

apiRouter.get('/auth/me', authenticateToken, (req: AuthRequest, res: Response) => {
  const user = db.users.find(u => u.id === req.user?.id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User record not found.' });
  }

  let profileData: any = null;
  if (user.role === 'STUDENT') {
    profileData = db.studentProfiles.find(p => p.userId === user.id);
  } else if (user.role === 'FACULTY') {
    profileData = {
      institution: 'All India Institute of Ayurveda (AIIA), New Delhi',
      department: 'Kayachikitsa & Clinical Research',
      designation: 'Professor & Head of Department',
      expertiseAreas: ['Panchakarma Protocol Validation', 'Reverse Pharmacology', 'Herbal Formulation Standardisation'],
      publicationsCount: 38
    };
  } else if (user.role === 'MENTOR') {
    profileData = db.mentorProfiles.find(p => p.userId === user.id);
  } else if (user.role === 'RECRUITER') {
    profileData = {
      organization: 'AIIA Clinical Research & Dabur AYUSH Healthcare Consortia',
      organizationType: 'Healthcare & Research Consortia',
      designation: 'Head of Academic Liaison & Clinical Placements',
      industryDomain: 'AYUSH Pharmaceutical & Clinical Trials'
    };
  }

  return res.json({
    success: true,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      avatarUrl: user.avatarUrl
    },
    profile: profileData
  });
});

// ============================================================
// 2. STUDENT PORTAL ENDPOINTS
// ============================================================
apiRouter.get('/students/profile', authenticateToken, (req: AuthRequest, res: Response) => {
  const student = db.studentProfiles[0];
  const targetPathway = db.careerPathways.find(p => p.id === student.targetPathwayId);
  return res.json({
    success: true,
    profile: student,
    targetPathway,
    notice: 'Demo Data: Initialized for Ayush Academia-Industry Platform'
  });
});

apiRouter.put('/students/profile', authenticateToken, (req: AuthRequest, res: Response) => {
  const student = db.studentProfiles[0];
  const { careerGoal, researchInterests, clinicalInterests, location, availabilityStatus } = req.body;
  if (careerGoal !== undefined) student.careerGoal = careerGoal;
  if (researchInterests !== undefined) student.researchInterests = researchInterests;
  if (clinicalInterests !== undefined) student.clinicalInterests = clinicalInterests;
  if (location !== undefined) student.location = location;
  if (availabilityStatus !== undefined) student.availabilityStatus = availabilityStatus;

  return res.json({
    success: true,
    message: 'Profile updated successfully.',
    profile: student
  });
});

apiRouter.post('/students/pathway', authenticateToken, (req: AuthRequest, res: Response) => {
  const { pathwayId } = req.body;
  const pathway = db.careerPathways.find(p => p.id === pathwayId);
  if (!pathway) {
    return res.status(404).json({ success: false, message: 'Career pathway not found.' });
  }

  const student = db.studentProfiles[0];
  student.targetPathwayId = pathwayId;
  student.careerGoal = pathway.title;

  return res.json({
    success: true,
    message: `Career pathway set to '${pathway.title}'. Competency roadmap updated.`,
    targetPathway: pathway
  });
});

// ============================================================
// 3. CAREER EXPLORER & FLOWCHART
// ============================================================
apiRouter.get('/careers', (req, res) => {
  const { category, discipline } = req.query;
  let list = [...db.careerPathways];

  if (category) {
    list = list.filter(c => c.category.toLowerCase().includes(String(category).toLowerCase()));
  }
  if (discipline) {
    list = list.filter(c => c.disciplineAffinity.includes(String(discipline).toUpperCase()));
  }

  return res.json({
    success: true,
    count: list.length,
    pathways: list
  });
});

apiRouter.get('/careers/:id', (req, res) => {
  const pathway = db.careerPathways.find(p => p.id === req.params.id);
  if (!pathway) {
    return res.status(404).json({ success: false, message: 'Career pathway not found.' });
  }
  return res.json({ success: true, pathway });
});

// ============================================================
// 4. COMPETENCIES, ASSESSMENTS & SKILL GAPS
// ============================================================
apiRouter.get('/competencies', (req, res) => {
  return res.json({
    success: true,
    competencies: db.competencies
  });
});

apiRouter.get('/skills/gaps', authenticateToken, (req: AuthRequest, res: Response) => {
  return res.json({
    success: true,
    skillGaps: db.skillGaps,
    readinessScore: db.studentProfiles[0].readinessScore,
    radarData: db.competencies.map(c => ({
      subject: c.category.replace('Awareness', '').replace('Literacy', '').trim(),
      current: Math.round(c.currentLevel * 20),
      target: Math.round(c.targetLevel * 20),
      fullMark: 100
    }))
  });
});

apiRouter.get('/assessments', (req, res) => {
  const assessment = {
    id: 'asmt-ayush-core-1',
    title: 'Educational & Career Competency Evaluation: Research & Clinical Reasoning',
    category: 'Research & Clinical Competencies',
    description: '10 objective scenarios assessing Research Methodology, GCP Ethics, Clinical Reasoning, and Digital Health Awareness.',
    disclaimer: 'Educational & Career Assessment only. NOT a clinical qualification or medical licensing examination.',
    timeMinutes: 15,
    questions: [
      {
        id: 'q1',
        competency: 'Research Methodology in AYUSH',
        prompt: 'In a randomized controlled trial assessing a modified classical polyherbal decoction vs standard care, what is the primary purpose of blinding (masking) the outcome assessors?',
        options: [
          'To ensure patient adherence to the dietary regimen',
          'To prevent detection bias during subjective scoring of symptoms',
          'To calculate the exact pharmacokinetic bioavailability of tannins',
          'To eliminate the requirement for institutional ethics clearance'
        ],
        correctIndex: 1,
        explanation: 'Blinding outcome assessors prevents detection and observer bias when interpreting subjective clinical outcome measures (such as pain scales or symptom severity scores).'
      },
      {
        id: 'q2',
        competency: 'Research Ethics & Good Clinical Practice (GCP)',
        prompt: 'According to ICMR and AYUSH GCP guidelines, what mandatory action must a Principal Investigator take upon encountering a Serious Adverse Event (SAE)?',
        options: [
          'Wait until the full trial concludes before compiling reports',
          'Report the SAE to the Institutional Ethics Committee (IEC) and regulatory body within 24 hours of occurrence',
          'Switch the participant to a double dose of classical Rasayana',
          'Inform the manufacturer and delete the patient record'
        ],
        correctIndex: 1,
        explanation: 'AYUSH GCP and ICMR guidelines strictly mandate that any Serious Adverse Event must be reported to the Institutional Ethics Committee and Central Licensing Authority within 24 hours.'
      },
      {
        id: 'q3',
        competency: 'Clinical Reasoning & Classical Diagnostics',
        prompt: 'When evaluating a patient exhibiting signs of Vata-Pitta Prakopa with impaired Agni (Vishamagni), what is the foundational clinical rationale before administering heavy nourishing Rasayana drugs?',
        options: [
          'Immediate administration of high-dose Ghrita formulations',
          'Deepana and Pachana interventions to clear Ama and normalize digestive fire',
          'Immediate surgical intervention without dietary regulation',
          'Discontinuation of all fluids and sleep restriction'
        ],
        correctIndex: 1,
        explanation: 'In classical Ayurveda, administration of heavy nutritive Rasayanas in the presence of Ama and impaired Agni aggravates morbidity. Deepana-Pachana must precede Rasayana therapy.'
      },
      {
        id: 'q4',
        competency: 'Digital Health & Health Informatics Literacy',
        prompt: 'What is the primary function of the NAMASTE portal launched by the Ministry of Ayush?',
        options: [
          'Online retail sale of raw medicinal plant cuttings',
          'Standardized terminology and morbidity coding mapped to ICD-11 for electronic health records',
          'Automated robotic surgical scheduling',
          'Dispensing unregulated overseas prescriptions'
        ],
        correctIndex: 1,
        explanation: 'NAMASTE provides standardized national terminologies and disease classification for AYUSH systems, enabling seamless dual-coding with WHO ICD-11.'
      }
    ]
  };

  return res.json({ success: true, assessment });
});

apiRouter.post('/assessments/submit', authenticateToken, (req: AuthRequest, res: Response) => {
  const { answers } = req.body; // { q1: 1, q2: 1, ... }
  // Scoring logic
  const correctAnswers: Record<string, number> = { q1: 1, q2: 1, q3: 1, q4: 1 };
  let correctCount = 0;
  const total = Object.keys(correctAnswers).length;

  Object.entries(correctAnswers).forEach(([qId, ans]) => {
    if (answers && answers[qId] === ans) {
      correctCount++;
    }
  });

  const percentage = Math.round((correctCount / total) * 100);

  // Update student readiness score dynamically
  const student = db.studentProfiles[0];
  student.readinessScore = Math.min(95, Math.max(60, Math.round(student.readinessScore * 0.7 + percentage * 0.3)));

  return res.json({
    success: true,
    score: percentage,
    correctCount,
    totalQuestions: total,
    feedback: percentage >= 75
      ? 'Strong competency performance in Research Methodology and GCP Ethics!'
      : 'Satisfactory baseline. We recommend reinforcing quantitative Biostatistics and NAMASTE terminology modules.',
    newReadinessScore: student.readinessScore
  });
});

// ============================================================
// 5. LEARNING HUB & VIDEO LEARNING
// ============================================================
apiRouter.get('/learning/modules', (req, res) => {
  return res.json({
    success: true,
    modules: db.learningModules
  });
});

apiRouter.post('/learning/enroll', authenticateToken, (req: AuthRequest, res: Response) => {
  const { moduleId } = req.body;
  const module = db.learningModules.find(m => m.id === moduleId);
  if (!module) {
    return res.status(404).json({ success: false, message: 'Module not found.' });
  }
  module.enrolled = true;
  return res.json({
    success: true,
    message: `Enrolled in '${module.title}' successfully.`,
    module
  });
});

apiRouter.post('/learning/progress', authenticateToken, (req: AuthRequest, res: Response) => {
  const { moduleId, progress } = req.body;
  const module = db.learningModules.find(m => m.id === moduleId);
  if (!module) {
    return res.status(404).json({ success: false, message: 'Module not found.' });
  }
  module.progress = Math.min(100, Math.max(0, Number(progress)));
  return res.json({
    success: true,
    message: `Module progress updated to ${module.progress}%.`,
    module
  });
});

apiRouter.get('/videos', (req, res) => {
  return res.json({
    success: true,
    videos: db.videoResources,
    notice: 'Demo Learning Resources: Sourced from accredited institutional archives.'
  });
});

apiRouter.post('/videos/toggle-complete', authenticateToken, (req: AuthRequest, res: Response) => {
  const { videoId } = req.body;
  const video = db.videoResources.find(v => v.id === videoId);
  if (!video) {
    return res.status(404).json({ success: false, message: 'Video not found.' });
  }
  video.completed = !video.completed;
  return res.json({
    success: true,
    completed: video.completed,
    video
  });
});

// ============================================================
// 6. OPPORTUNITIES & APPLICATIONS
// ============================================================
apiRouter.get('/opportunities', (req, res) => {
  const student = db.studentProfiles[0];
  const list = db.opportunities.map(opp => {
    const match = db.calculateOpportunityCompatibility(student, opp);
    return {
      ...opp,
      compatibilityScore: match.score,
      compatibilityBreakdown: match.breakdown,
      recommendationToImprove: match.recommendationToImprove
    };
  });

  return res.json({
    success: true,
    count: list.length,
    opportunities: list
  });
});

apiRouter.post('/opportunities', authenticateToken, requireRole(['RECRUITER', 'ADMIN']), (req: AuthRequest, res: Response) => {
  const {
    title,
    organization,
    organizationType,
    opportunityType,
    domain,
    location,
    mode,
    duration,
    stipend,
    description,
    eligibility,
    deadline,
    requiredCompetencies,
    preferredCompetencies,
    applicationQuestions
  } = req.body;

  if (!title || !organization || !domain || !description || !deadline) {
    return res.status(400).json({ success: false, message: 'Missing required opportunity fields.' });
  }

  const newOpp: any = {
    id: `opp-${Date.now()}`,
    recruiterId: req.user?.id || 'usr-recruiter-1',
    title,
    organization,
    organizationType: organizationType || 'Healthcare & Research Organization',
    opportunityType: opportunityType || 'RESEARCH_INTERNSHIP',
    domain,
    location: location || 'On-site / Campus',
    mode: mode || 'On-site',
    duration: duration || '6 Months',
    stipend: stipend || '₹25,000 / month',
    description,
    eligibility: eligibility || 'AYUSH final year students or graduates',
    deadline,
    requiredCompetencies: requiredCompetencies || ['Research Methodology in AYUSH', 'Clinical Reasoning & Classical Diagnostics'],
    preferredCompetencies: preferredCompetencies || ['Healthcare Data Literacy & Biostatistics'],
    applicationQuestions: applicationQuestions || ['Why are you interested in this position?'],
    status: 'ACTIVE',
    createdAt: new Date().toISOString()
  };

  db.opportunities.unshift(newOpp);

  return res.status(201).json({
    success: true,
    message: 'Opportunity published successfully.',
    opportunity: newOpp
  });
});

apiRouter.get('/applications', authenticateToken, (req: AuthRequest, res: Response) => {
  const user = req.user!;
  if (user.role === 'STUDENT') {
    const studentApps = db.applications.map(app => {
      const opp = db.opportunities.find(o => o.id === app.opportunityId);
      return {
        ...app,
        opportunity: opp
      };
    });
    return res.json({ success: true, applications: studentApps });
  } else if (user.role === 'RECRUITER') {
    const recruiterApps = db.applications.map(app => {
      const opp = db.opportunities.find(o => o.id === app.opportunityId);
      const stu = db.studentProfiles.find(s => s.id === app.studentId);
      const studentUser = db.users.find(u => u.id === stu?.userId);
      return {
        ...app,
        opportunity: opp,
        student: {
          ...stu,
          name: studentUser ? `${studentUser.firstName} ${studentUser.lastName}` : 'Dr. Ananya Sharma',
          email: studentUser?.email || 'student@demo.local'
        }
      };
    });
    return res.json({ success: true, applications: recruiterApps });
  }

  return res.json({ success: true, applications: db.applications });
});

apiRouter.post('/applications/apply', authenticateToken, requireRole(['STUDENT']), (req: AuthRequest, res: Response) => {
  const { opportunityId, statementOfPurpose, answers } = req.body;
  if (!opportunityId) {
    return res.status(400).json({ success: false, message: 'Opportunity ID is required.' });
  }

  const existing = db.applications.find(a => a.opportunityId === opportunityId && a.studentId === 'stu-1');
  if (existing) {
    return res.status(400).json({ success: false, message: 'You have already submitted an application for this opportunity.' });
  }

  const opp = db.opportunities.find(o => o.id === opportunityId);
  const student = db.studentProfiles[0];
  const compatibility = opp ? db.calculateOpportunityCompatibility(student, opp).score : 85;

  const newApp: any = {
    id: `app-${Date.now()}`,
    opportunityId,
    studentId: 'stu-1',
    status: 'APPLIED',
    statementOfPurpose: statementOfPurpose || 'Deeply committed to AYUSH clinical and research excellence.',
    answers: answers || {},
    compatibilityScore: compatibility,
    appliedAt: new Date().toISOString(),
    history: [
      { status: 'APPLIED', note: 'Application dossier submitted.', timestamp: new Date().toISOString() }
    ]
  };

  db.applications.unshift(newApp);

  // Trigger notification to Recruiter
  db.notifications.unshift({
    id: `notif-${Date.now()}`,
    userId: 'usr-recruiter-1',
    category: 'Applications',
    title: 'New Student Application Received',
    message: `Dr. Ananya Sharma applied for '${opp?.title || 'Internship'}'. Compatibility: ${compatibility}%.`,
    actionUrl: '/recruiter/applications',
    actionLabel: 'Review Application',
    priority: 'NORMAL',
    isRead: false,
    createdAt: new Date().toISOString()
  });

  return res.status(201).json({
    success: true,
    message: 'Application submitted successfully! Track progress in Application Pipeline.',
    application: newApp
  });
});

apiRouter.patch('/applications/:id/status', authenticateToken, requireRole(['RECRUITER', 'ADMIN']), (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { status, note } = req.body;

  const app = db.applications.find(a => a.id === id);
  if (!app) {
    return res.status(404).json({ success: false, message: 'Application not found.' });
  }

  app.status = status;
  app.history.push({
    status,
    note: note || `Application status updated to ${status} by recruiter.`,
    timestamp: new Date().toISOString()
  });

  // Notify student
  db.notifications.unshift({
    id: `notif-${Date.now()}`,
    userId: 'usr-student-1',
    category: 'Applications',
    title: `Application Status: ${status.replace('_', ' ')}`,
    message: note || `Your application status has progressed to ${status.replace('_', ' ')}.`,
    actionUrl: '/student/internships',
    actionLabel: 'Check Pipeline',
    priority: 'HIGH',
    isRead: false,
    createdAt: new Date().toISOString()
  });

  return res.json({
    success: true,
    message: `Application updated to ${status}.`,
    application: app
  });
});

// ============================================================
// 7. RESEARCH & LIVE PROJECTS
// ============================================================
apiRouter.get('/research', (req, res) => {
  return res.json({
    success: true,
    researchOpportunities: db.researchOpportunities
  });
});

apiRouter.get('/projects', (req, res) => {
  return res.json({
    success: true,
    projects: db.liveProjects
  });
});

// ============================================================
// 8. MENTORSHIP WORKFLOWS
// ============================================================
apiRouter.get('/mentors', (req, res) => {
  const student = db.studentProfiles[0];
  const list = db.mentorProfiles.map(mentor => {
    const match = db.calculateMentorCompatibility(student, mentor);
    return {
      ...mentor,
      compatibilityScore: match.compatibility,
      compatibilityReasons: match.reasons
    };
  });

  return res.json({
    success: true,
    mentors: list
  });
});

apiRouter.get('/mentorship/sessions', authenticateToken, (req: AuthRequest, res: Response) => {
  return res.json({
    success: true,
    sessions: db.mentorshipSessions,
    goals: db.mentorshipGoals
  });
});

apiRouter.post('/mentorship/schedule', authenticateToken, (req: AuthRequest, res: Response) => {
  const { mentorId, scheduledAt, topic, studentGoal } = req.body;
  const mentor = db.mentorProfiles.find(m => m.id === mentorId) || db.mentorProfiles[0];

  const newSession: any = {
    id: `sess-${Date.now()}`,
    mentorId: mentor.id,
    mentorName: mentor.name,
    studentId: 'stu-1',
    studentName: 'Dr. Ananya Sharma',
    scheduledAt: scheduledAt || '2026-09-18T16:00:00Z',
    durationMinutes: 45,
    topic: topic || 'Career Transition & Research Internship Protocol Review',
    studentGoal: studentGoal || 'Prepare for National AYUSH Research Fellow Appointment',
    milestoneCovered: 'Research Protocol Formulation & GCP Checklist',
    status: 'SCHEDULED',
    notesPreSession: 'Candidate requests review of clinical trial design and ethical committee submission.'
  };

  db.mentorshipSessions.unshift(newSession);

  // Notify mentor
  db.notifications.unshift({
    id: `notif-${Date.now()}`,
    userId: 'usr-mentor-1',
    category: 'Mentorship',
    title: 'New Mentorship Session Booked',
    message: `Dr. Ananya Sharma booked a session on '${newSession.topic}'.`,
    actionUrl: '/mentor/sessions',
    actionLabel: 'View Brief',
    priority: 'HIGH',
    isRead: false,
    createdAt: new Date().toISOString()
  });

  return res.status(201).json({
    success: true,
    message: `Session booked with ${mentor.name} successfully.`,
    session: newSession
  });
});

apiRouter.post('/mentorship/feedback', authenticateToken, requireRole(['MENTOR', 'FACULTY']), (req: AuthRequest, res: Response) => {
  const { sessionId, strengths, growthAreas, recommendedAction } = req.body;
  const session = db.mentorshipSessions.find(s => s.id === sessionId);
  if (!session) {
    return res.status(404).json({ success: false, message: 'Mentorship session not found.' });
  }

  session.status = 'COMPLETED';
  session.feedback = {
    strengths: strengths || ['Diligent clinical observation skills'],
    growthAreas: growthAreas || ['Advanced quantitative biostatistics'],
    recommendedAction: recommendedAction || 'Complete protocol draft before next week.'
  };

  // Notify student
  db.notifications.unshift({
    id: `notif-${Date.now()}`,
    userId: 'usr-student-1',
    category: 'Mentorship',
    title: 'Mentor Feedback Received',
    message: `${session.mentorName} provided feedback on your recent session.`,
    actionUrl: '/student/mentorship',
    actionLabel: 'View Feedback',
    priority: 'NORMAL',
    isRead: false,
    createdAt: new Date().toISOString()
  });

  return res.json({
    success: true,
    message: 'Feedback submitted successfully.',
    session
  });
});

// ============================================================
// 9. COLLABORATION (FACULTY <-> INDUSTRY)
// ============================================================
apiRouter.get('/collaboration', (req, res) => {
  return res.json({
    success: true,
    requests: db.collaborationRequests
  });
});

apiRouter.post('/collaboration', authenticateToken, requireRole(['RECRUITER', 'ADMIN']), (req: AuthRequest, res: Response) => {
  const { organization, type, title, description, proposedTimeline } = req.body;
  const newReq: any = {
    id: `collab-${Date.now()}`,
    organization: organization || 'Healthcare Industry Partner',
    type: type || 'Workshop',
    title: title || 'Joint Academic Symposium',
    description: description || 'Proposing collaborative session with academic faculty.',
    proposedTimeline: proposedTimeline || 'Q4 2026',
    status: 'PENDING',
    createdAt: new Date().toISOString()
  };
  db.collaborationRequests.unshift(newReq);

  // Notify faculty
  db.notifications.unshift({
    id: `notif-${Date.now()}`,
    userId: 'usr-faculty-1',
    category: 'Opportunities',
    title: `New Collaboration Request: ${newReq.type}`,
    message: `${newReq.organization} proposed '${newReq.title}'.`,
    actionUrl: '/faculty/collaboration',
    actionLabel: 'Review Request',
    priority: 'HIGH',
    isRead: false,
    createdAt: new Date().toISOString()
  });

  return res.status(201).json({
    success: true,
    message: 'Collaboration proposal submitted to faculty.',
    request: newReq
  });
});

apiRouter.patch('/collaboration/:id/status', authenticateToken, requireRole(['FACULTY', 'ADMIN']), (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { status } = req.body; // ACCEPTED, DECLINED
  const item = db.collaborationRequests.find(c => c.id === id);
  if (!item) {
    return res.status(404).json({ success: false, message: 'Request not found.' });
  }

  item.status = status;
  return res.json({
    success: true,
    message: `Collaboration request status set to ${status}.`,
    request: item
  });
});

// ============================================================
// 10. SKILL PASSPORT & DIGITAL PORTFOLIO
// ============================================================
apiRouter.get('/portfolio/passport', authenticateToken, (req: AuthRequest, res: Response) => {
  const student = db.studentProfiles[0];
  const user = db.users.find(u => u.id === student.userId)!;

  const passportData = {
    passportNumber: student.passportNumber,
    studentName: `${user.firstName} ${user.lastName}`,
    discipline: student.discipline,
    institution: student.institution,
    program: student.program,
    academicYear: student.academicYear,
    issueAuthority: 'Ministry of Ayush / All India Institute of Ayurveda',
    issuanceDate: '2026-02-10',
    verificationHash: 'SHA256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
    verifiedCompetenciesCount: db.competencies.filter(c => c.verified).length,
    competencies: db.competencies,
    clinicalExposure: [
      { area: 'Kayachikitsa IPD', hours: 240, institution: 'AIIA Hospital', verified: true },
      { area: 'Panchakarma Shodhana Monitoring', hours: 180, institution: 'AIIA Hospital', verified: true },
      { area: 'Dravyaguna Herbarium & Identification', hours: 120, institution: 'AIIA Botanical Garden', verified: true }
    ],
    researchProjects: [
      { title: 'Standardization of Classical Decoctions', role: 'Student Co-Investigator', status: 'Completed', verified: true }
    ],
    internships: [
      { organization: 'All India Institute of Ayurveda', role: 'Clinical Intern', period: '6 Months', verified: true }
    ],
    certifications: [
      { title: 'ICMR Good Clinical Practice (GCP)', issuer: 'ICMR / NIE', year: 2026, verified: true },
      { title: 'ASU Pharmacovigilance Monitoring', issuer: 'National Pharmacovigilance Center', year: 2025, verified: true }
    ]
  };

  return res.json({
    success: true,
    passport: passportData
  });
});

// ============================================================
// 11. DOCUMENTS MANAGEMENT
// ============================================================
apiRouter.get('/documents', authenticateToken, (req: AuthRequest, res: Response) => {
  return res.json({
    success: true,
    documents: db.documents
  });
});

apiRouter.post('/documents', authenticateToken, (req: AuthRequest, res: Response) => {
  const { docType, fileName, fileSizeKb, title, category, fileSize } = req.body;
  if (!fileName) {
    return res.status(400).json({ success: false, message: 'Document file name is required.' });
  }

  const derivedCategory = category || (docType ? String(docType).toUpperCase().replace(/\s+/g, '_') : 'CERTIFICATE');
  const derivedDocType = docType || (category ? String(category).replace(/_/g, ' ') : 'Certificate');
  const derivedTitle = title || fileName.replace(/\.[^/.]+$/, '');

  const newDoc: any = {
    id: `doc-${Date.now()}`,
    studentId: 'stu-1',
    title: derivedTitle,
    category: derivedCategory,
    docType: derivedDocType,
    fileName,
    fileSize: fileSize || (fileSizeKb ? `${fileSizeKb} KB` : '1.2 MB'),
    fileSizeKb: fileSizeKb || 320,
    fileUrl: `#/documents/${fileName}`,
    isVerified: true,
    uploadedAt: new Date().toISOString()
  };

  db.documents.unshift(newDoc);

  return res.status(201).json({
    success: true,
    message: 'Document uploaded and validated successfully.',
    document: newDoc
  });
});

apiRouter.delete('/documents/:id', authenticateToken, (req: AuthRequest, res: Response) => {
  const index = db.documents.findIndex(d => d.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Document not found.' });
  }
  const deleted = db.documents.splice(index, 1)[0];
  return res.json({
    success: true,
    message: `Document '${deleted.fileName}' removed.`,
    document: deleted
  });
});

// ============================================================
// 12. NOTIFICATIONS & PREFERENCES
// ============================================================
apiRouter.get('/notifications', authenticateToken, (req: AuthRequest, res: Response) => {
  const userId = req.user?.id || 'usr-student-1';
  const list = db.notifications.filter(n => n.userId === userId);
  const unreadCount = list.filter(n => !n.isRead).length;

  return res.json({
    success: true,
    notifications: list,
    unreadCount
  });
});

apiRouter.patch('/notifications/:id/read', authenticateToken, (req: AuthRequest, res: Response) => {
  const notif = db.notifications.find(n => n.id === req.params.id);
  if (notif) {
    notif.isRead = true;
  }
  return res.json({ success: true, notification: notif });
});

apiRouter.post('/notifications/mark-all-read', authenticateToken, (req: AuthRequest, res: Response) => {
  const userId = req.user?.id || 'usr-student-1';
  db.notifications.forEach(n => {
    if (n.userId === userId) n.isRead = true;
  });
  return res.json({ success: true, message: 'All notifications marked as read.' });
});

// In-memory preferences store with fallback defaults
const userNotificationPreferences: Record<string, any> = {};

apiRouter.get('/notifications/preferences', authenticateToken, (req: AuthRequest, res: Response) => {
  const userId = req.user?.id || 'usr-student-1';
  const prefs = userNotificationPreferences[userId] || {
    opportunityAlerts: { inApp: true, email: true, push: false },
    applicationUpdates: { inApp: true, email: true, push: true },
    mentorship: { inApp: true, email: true, push: false },
    learning: { inApp: true, email: false, push: false },
    research: { inApp: true, email: true, push: false },
    industryEvents: { inApp: true, email: false, push: false },
    systemNotifications: { inApp: true, email: true, push: true }
  };
  return res.json({ success: true, preferences: prefs });
});

apiRouter.post('/notifications/preferences', authenticateToken, (req: AuthRequest, res: Response) => {
  const userId = req.user?.id || 'usr-student-1';
  userNotificationPreferences[userId] = req.body;
  return res.json({ success: true, message: 'Notification preferences updated successfully.', preferences: req.body });
});

// ============================================================
// 13. HELP DESK (FULL TICKETING SYSTEM)
// ============================================================
apiRouter.get('/helpdesk', authenticateToken, (req: AuthRequest, res: Response) => {
  const userId = req.user?.id || 'usr-student-1';
  const tickets = db.helpDeskTickets.filter(t => t.userId === userId);
  return res.json({
    success: true,
    tickets
  });
});

apiRouter.post('/helpdesk', authenticateToken, (req: AuthRequest, res: Response) => {
  const { category, subject, description } = req.body;
  if (!category || !subject || !description) {
    return res.status(400).json({ success: false, message: 'Category, subject, and description are required.' });
  }

  const user = req.user!;
  const newTicket: any = {
    id: `tkt-${Date.now()}`,
    ticketId: `AYUSH-TK-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    userId: user.id,
    userRole: user.role,
    userName: `${user.firstName} ${user.lastName}`,
    category,
    subject,
    description,
    status: 'OPEN',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  db.helpDeskTickets.unshift(newTicket);

  return res.status(201).json({
    success: true,
    message: `Help Desk Ticket #${newTicket.ticketId} created. Academic support team will respond within 24-48 hours.`,
    ticket: newTicket
  });
});

// ============================================================
// 14. GLOBAL SEARCH ACROSS ALL MODULES
// ============================================================
apiRouter.get('/search', (req, res) => {
  const query = (req.query.q as string || '').toLowerCase().trim();
  if (!query) {
    return res.json({
      success: true,
      results: {
        careers: [],
        learning: [],
        videos: [],
        internships: [],
        research: [],
        mentors: [],
        certifications: [],
        industryOpportunities: [],
        workshops: [],
        projects: []
      }
    });
  }

  const careers = db.careerPathways.filter(c =>
    c.title.toLowerCase().includes(query) || c.overview.toLowerCase().includes(query)
  ).map(c => ({ id: c.id, title: c.title, category: c.category, subtitle: c.overview.slice(0, 75) + '...', url: `/student/careers` }));

  const learning = db.learningModules.filter(m =>
    m.title.toLowerCase().includes(query) || m.category.toLowerCase().includes(query) || m.description.toLowerCase().includes(query)
  ).map(m => ({ id: m.id, title: m.title, category: m.category, subtitle: `${m.durationHours} hrs • ${m.difficulty}`, url: `/student/learning` }));

  const videos = db.videoResources.filter(v =>
    v.title.toLowerCase().includes(query) || v.category.toLowerCase().includes(query) || v.learningObjective.toLowerCase().includes(query)
  ).map(v => ({ id: v.id, title: v.title, category: v.category, subtitle: `${v.duration} • Source: ${v.source}`, url: `/student/videos` }));

  const internships = db.opportunities.filter(o =>
    o.title.toLowerCase().includes(query) || o.domain.toLowerCase().includes(query) || o.organization.toLowerCase().includes(query)
  ).map(o => ({ id: o.id, title: o.title, category: o.domain, subtitle: `${o.organization} • ${o.duration}`, url: `/student/internships` }));

  const research = db.researchOpportunities.filter(r =>
    r.title.toLowerCase().includes(query) || r.domain.toLowerCase().includes(query) || r.institution.toLowerCase().includes(query)
  ).map(r => ({ id: r.id, title: r.title, category: r.domain, subtitle: `${r.institution} • Grant: ${r.grantOrStipend || 'Institutional'}`, url: `/student/research` }));

  const mentors = db.mentorProfiles.filter(m =>
    m.name.toLowerCase().includes(query) || m.specialties.some(s => s.toLowerCase().includes(query)) || m.domain.toLowerCase().includes(query)
  ).map(m => ({ id: m.id, title: m.name, category: m.domain, subtitle: m.specialties.join(', '), url: `/student/mentorship` }));

  // Certifications
  const certifications = [
    { id: 'cert-1', title: 'Good Clinical Practice (GCP) in ASU Drug Research', category: 'Clinical Trials', subtitle: 'CDSCO & ICMR Compliant Certification', url: '/student/passport' },
    { id: 'cert-2', title: 'Schedule T GMP Quality Control & In-Process Testing', category: 'Pharma GMP', subtitle: 'PCIM&H & AIIA Verified Laboratory Credential', url: '/student/passport' },
    { id: 'cert-3', title: 'WHO ICD-11 Traditional Medicine Dual Coding', category: 'Digital Health', subtitle: 'NAMASTE Portal Morbidity Coding Certificate', url: '/student/passport' },
    { id: 'cert-4', title: 'Pharmacovigilance & Adverse Drug Reaction Reporting for ASU Drugs', category: 'Pharmacovigilance', subtitle: 'NPvCC & Ministry of Ayush Accredited', url: '/student/passport' }
  ].filter(c => c.title.toLowerCase().includes(query) || c.category.toLowerCase().includes(query));

  // Industry Opportunities & Workshops/FDPs
  const industryOpportunities = db.opportunities.filter(o =>
    o.organizationType === 'Industry Leader' || o.opportunityType === 'TRAINING' || o.title.toLowerCase().includes('industry') || o.organization.toLowerCase().includes(query)
  ).map(o => ({ id: o.id, title: o.title, category: 'Industry Placement', subtitle: `${o.organization} • ${o.location}`, url: '/student/internships' }));

  const workshops = [
    { id: 'wk-1', title: 'National Hands-on FDP on ASU Standardisation & HPTLC Profiling', category: 'Faculty Development (FDP)', subtitle: 'Organized by AIIA & Dabur Research Foundation', url: '/faculty/dashboard' },
    { id: 'wk-2', title: 'Industry-Academia Workshop: Schedule T Validation in Ayurvedic Manufacturing', category: 'Industry Workshop', subtitle: '3-Day Practical Masterclass for PG Scholars & Faculty', url: '/faculty/dashboard' },
    { id: 'wk-3', title: 'CTRI Protocol Filing & Biostatistics for Clinical Investigators', category: 'Research Workshop', subtitle: 'Clinical Trial Registry - India Masterclass', url: '/student/learning' }
  ].filter(w => w.title.toLowerCase().includes(query) || w.category.toLowerCase().includes(query));

  const projects = db.liveProjects.filter(p =>
    p.title.toLowerCase().includes(query) || p.category.toLowerCase().includes(query) || p.organization.toLowerCase().includes(query)
  ).map(p => ({ id: p.id, title: p.title, category: p.category, subtitle: `${p.organization} • ${p.duration}`, url: '/student/projects' }));

  return res.json({
    success: true,
    query,
    results: {
      careers,
      learning,
      videos,
      internships,
      research,
      mentors,
      certifications,
      industryOpportunities,
      workshops,
      projects
    }
  });
});

// ============================================================
// 15. ANALYTICS (STUDENT, FACULTY, RECRUITER)
// ============================================================
apiRouter.get('/analytics/student', authenticateToken, (req: AuthRequest, res: Response) => {
  return res.json({
    success: true,
    metrics: {
      profileCompletion: db.studentProfiles[0].profileCompletion,
      readinessScore: db.studentProfiles[0].readinessScore,
      competenciesMastered: 4,
      totalCompetencies: 7,
      learningHoursCompleted: 24,
      internshipsApplied: db.applications.length,
      mentorshipSessionsAttended: 1,
      skillPassportBadges: 5
    }
  });
});

apiRouter.get('/analytics/faculty', authenticateToken, requireRole(['FACULTY', 'ADMIN']), (req: AuthRequest, res: Response) => {
  return res.json({
    success: true,
    metrics: {
      studentSkillReadinessAvg: 72,
      industryDemandAlignment: 68,
      internshipParticipationRate: 84,
      activeResearchProjectsCount: 4,
      pendingIndustryProposals: db.collaborationRequests.filter(c => c.status === 'PENDING').length
    },
    demandComparison: [
      { competency: 'Research Methodology & GCP', demand: 90, readiness: 65, gap: 'High' },
      { competency: 'ASU Pharmacovigilance & Safety', demand: 85, readiness: 82, gap: 'Low' },
      { competency: 'Digital Health (NAMASTE & ABDM)', demand: 88, readiness: 45, gap: 'Critical' },
      { competency: 'Healthcare Data & Biostatistics', demand: 80, readiness: 48, gap: 'High' },
      { competency: 'Clinical Diagnostic Reasoning', demand: 92, readiness: 78, gap: 'Moderate' }
    ]
  });
});

apiRouter.get('/analytics/recruiter', authenticateToken, requireRole(['RECRUITER', 'ADMIN']), (req: AuthRequest, res: Response) => {
  return res.json({
    success: true,
    metrics: {
      activeOpportunitiesCount: db.opportunities.length,
      totalApplicants: db.applications.length,
      shortlistedCount: db.applications.filter(a => a.status === 'SHORTLISTED').length,
      interviewScheduledCount: db.applications.filter(a => a.status === 'INTERVIEW_SCHEDULED').length,
      averageCandidateMatch: 86
    }
  });
});
