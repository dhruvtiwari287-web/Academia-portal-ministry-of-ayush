// API client service for AYUSH Academia–Industry Platform

const API_BASE = '/api';

export function getAuthToken(): string | null {
  return localStorage.getItem('ayush_token');
}

export function setAuthToken(token: string) {
  localStorage.setItem('ayush_token', token);
}

export function removeAuthToken() {
  localStorage.removeItem('ayush_token');
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Also include demo role header if stored for quick fallback
  const demoRole = localStorage.getItem('ayush_demo_role');
  if (demoRole && !token) {
    headers['x-demo-role'] = demoRole;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `API Error: ${response.statusText}`);
  }

  return data;
}

export const api = {
  // Auth
  login: (credentials: { email: string; password: string; role?: string }) =>
    apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  demoLogin: (role: string) =>
    apiRequest('/auth/demo-login', { method: 'POST', body: JSON.stringify({ role }) }),
  getMe: () => apiRequest('/auth/me'),

  // Student
  getStudentProfile: () => apiRequest('/students/profile'),
  updateStudentProfile: (data: any) =>
    apiRequest('/students/profile', { method: 'PUT', body: JSON.stringify(data) }),
  setStudentPathway: (pathwayId: string) =>
    apiRequest('/students/pathway', { method: 'POST', body: JSON.stringify({ pathwayId }) }),

  // Careers
  getCareers: (params?: { category?: string; discipline?: string }) => {
    const query = new URLSearchParams();
    if (params?.category) query.append('category', params.category);
    if (params?.discipline) query.append('discipline', params.discipline);
    return apiRequest(`/careers?${query.toString()}`);
  },
  getCareerById: (id: string) => apiRequest(`/careers/${id}`),

  // Competencies & Assessments
  getCompetencies: () => apiRequest('/competencies'),
  getSkillGaps: () => apiRequest('/skills/gaps'),
  getAssessment: () => apiRequest('/assessments'),
  submitAssessment: (answers: Record<string, number>) =>
    apiRequest('/assessments/submit', { method: 'POST', body: JSON.stringify({ answers }) }),

  // Learning & Videos
  getLearningModules: () => apiRequest('/learning/modules'),
  enrollModule: (moduleId: string) =>
    apiRequest('/learning/enroll', { method: 'POST', body: JSON.stringify({ moduleId }) }),
  updateModuleProgress: (moduleId: string, progress: number) =>
    apiRequest('/learning/progress', { method: 'POST', body: JSON.stringify({ moduleId, progress }) }),
  getVideos: () => apiRequest('/videos'),
  toggleVideoComplete: (videoId: string) =>
    apiRequest('/videos/toggle-complete', { method: 'POST', body: JSON.stringify({ videoId }) }),

  // Opportunities & Applications
  getOpportunities: () => apiRequest('/opportunities'),
  createOpportunity: (data: any) =>
    apiRequest('/opportunities', { method: 'POST', body: JSON.stringify(data) }),
  getApplications: () => apiRequest('/applications'),
  applyOpportunity: (data: { opportunityId: string; statementOfPurpose: string; answers?: any }) =>
    apiRequest('/applications/apply', { method: 'POST', body: JSON.stringify(data) }),
  updateApplicationStatus: (id: string, status: string, note?: string) =>
    apiRequest(`/applications/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status, note }) }),

  // Research & Projects
  getResearchOpportunities: () => apiRequest('/research'),
  getLiveProjects: () => apiRequest('/projects'),

  // Mentorship
  getMentors: () => apiRequest('/mentors'),
  getMentorshipSessions: () => apiRequest('/mentorship/sessions'),
  scheduleMentorshipSession: (data: any) =>
    apiRequest('/mentorship/schedule', { method: 'POST', body: JSON.stringify(data) }),
  submitMentorFeedback: (data: any) =>
    apiRequest('/mentorship/feedback', { method: 'POST', body: JSON.stringify(data) }),

  // Collaboration
  getCollaborationRequests: () => apiRequest('/collaboration'),
  createCollaborationRequest: (data: any) =>
    apiRequest('/collaboration', { method: 'POST', body: JSON.stringify(data) }),
  updateCollaborationStatus: (id: string, status: string) =>
    apiRequest(`/collaboration/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),

  // Passport & Documents
  getSkillPassport: () => apiRequest('/portfolio/passport'),
  getDocuments: () => apiRequest('/documents'),
  uploadDocument: (data: any) =>
    apiRequest('/documents', { method: 'POST', body: JSON.stringify(data) }),
  deleteDocument: (id: string) =>
    apiRequest(`/documents/${id}`, { method: 'DELETE' }),

  // Notifications & Help Desk
  getNotifications: () => apiRequest('/notifications'),
  markNotificationRead: (id: string) =>
    apiRequest(`/notifications/${id}/read`, { method: 'PATCH' }),
  markAllNotificationsRead: () =>
    apiRequest('/notifications/mark-all-read', { method: 'POST' }),
  getNotificationPreferences: () => apiRequest('/notifications/preferences'),
  updateNotificationPreferences: (prefs: any) =>
    apiRequest('/notifications/preferences', { method: 'POST', body: JSON.stringify(prefs) }),
  getHelpDeskTickets: () => apiRequest('/helpdesk'),
  createHelpDeskTicket: (data: any) =>
    apiRequest('/helpdesk', { method: 'POST', body: JSON.stringify(data) }),

  // Search & Analytics
  searchGlobal: (query: string) => apiRequest(`/search?q=${encodeURIComponent(query)}`),
  getStudentAnalytics: () => apiRequest('/analytics/student'),
  getFacultyAnalytics: () => apiRequest('/analytics/faculty'),
  getRecruiterAnalytics: () => apiRequest('/analytics/recruiter')
};
