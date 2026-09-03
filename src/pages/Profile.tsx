import React, { useState } from 'react';
import {
  User,
  GraduationCap,
  Briefcase,
  Building2,
  ShieldCheck,
  Award,
  BookOpen,
  Calendar,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  CheckCircle2,
  FileText,
  Edit3,
  PlusCircle,
  Save,
  Sparkles,
  Lock,
  Moon,
  Sun,
  Bell,
  Settings,
  Layers,
  HeartPulse
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';
import { useTheme } from '../context/ThemeContext.js';

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const { theme, setTheme, toggleTheme, actualTheme } = useTheme();
  const role = user?.role || 'STUDENT';
  const [activeProfileTab, setActiveProfileTab] = useState<'OVERVIEW' | 'SETTINGS'>('OVERVIEW');
  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Student Profile Data (Section 18: Full AYUSH fields)
  const [studentData, setStudentData] = useState({
    name: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : (user as any)?.name || 'Dr. Ananya Sharma',
    email: user?.email || 'ananya.sharma@aiia.gov.in',
    discipline: 'Ayurveda',
    program: 'BAMS (Bachelor of Ayurvedic Medicine & Surgery)',
    institution: 'All India Institute of Ayurveda (AIIA), New Delhi',
    enrollmentNumber: 'AIIA-2022-BAMS-042',
    academicYear: 'Final Professional (Internship Phase)',
    graduationYear: '2026',
    careerGoal: 'AYUSH Clinical Research & GCP Coordinator',
    researchInterests: [
      'GCP in Ayurvedic Clinical Trials',
      'Panchakarma Protocol Standardization',
      'ASU Pharmacovigilance & Safety',
      'Biostatistics for Integrative Medicine'
    ],
    verifiedCompetencies: [
      'Ayurvedic Clinical Protocol (Panchakarma)',
      'Schedule T GMP Compliance',
      'GCP Clinical Trial Monitoring',
      'Standardized Herbarium Specimen Authentication',
      'NAMASTE & ICD-11 Morbidity Coding'
    ],
    selfAssessedCompetencies: [
      'Pulse Diagnosis (Nadi Pariksha) Clinical Correlation',
      'ASU Formulation Quality Control (HPTLC)',
      'Clinical Documentation in Ayush Hospital MIS'
    ],
    clinicalExposure: [
      { department: 'Panchakarma IPD & Procedures', hours: 220, institution: 'AIIA New Delhi Hospital' },
      { department: 'Kayachikitsa General OPD', hours: 180, institution: 'AIIA Inpatient Facility' },
      { department: 'Shalya Karma & Ksharasutra Theatre', hours: 120, institution: 'AIIA Inpatient Facility' },
      { department: 'Prasuti & Stree Roga Unit', hours: 100, institution: 'AIIA Clinical Complex' }
    ],
    totalClinicalHours: 620,
    readinessScore: 78,
    location: 'New Delhi, India',
    preferredOpportunityType: 'Clinical Research Fellowship & Hospital Residency',
    preferredLocation: 'New Delhi / NCR & Bengaluru',
    availability: 'Full-time On-site (Starting July 2026)'
  });

  // Faculty State
  const [facultyData, setFacultyData] = useState({
    name: 'Prof. Dr. Anand Kulkarni',
    designation: 'Professor & Dean (Clinical Research & Panchakarma)',
    institution: 'All India Institute of Ayurveda (AIIA)',
    email: 'anand.kulkarni@aiia.gov.in',
    expertise: ['Panchakarma Protocols', 'Clinical Trial Design', 'Schedule Y Compliance', 'Ayurvedic Herbology'],
    researchInterests: ['Standardization of Shodhana Therapies', 'Safety Biomarkers in Rasaushadhis', 'Integrative Rheumatology'],
    publicationsCount: 28,
    consultancyProjects: 4,
    industryCollaborations: 7,
    recentPublications: [
      'Evaluation of Standardized Panchakarma Protocol in Chronic Osteoarthritis: A Randomized Controlled Trial (AIIA Journal, 2025)',
      'Pharmacovigilance Signal Detection in ASU Formulations: A 3-Year Multicenter Retrospective Study (AYUSH Int. Reports, 2024)',
      'ICH-GCP Guidelines Adaptation for Classical Ayurvedic Formulations (CCR-Ayush Guidelines, 2024)'
    ]
  });

  // Mentor State
  const [mentorData, setMentorData] = useState({
    name: 'Dr. Rajeshwar Sharma',
    designation: 'Principal Clinician Scientist & Clinical Trialist',
    affiliation: 'Integrated Healthcare Research Centre',
    experienceYears: 16,
    specialties: ['GCP Compliance', 'Phase II/III Trial Coordination', 'Ayurvedic Regulatory Affairs', 'Biostatistics'],
    currentMentees: 12,
    maxCapacity: 15,
    rating: 4.9,
    sessionsCompleted: 48,
    availability: 'Fridays & Saturdays (10:00 AM – 1:00 PM)'
  });

  // Recruiter State
  const [recruiterData, setRecruiterData] = useState({
    orgName: 'Charak Clinical Research & Healthcare Innovations',
    category: 'Ayurvedic Pharmaceuticals & Clinical Research Organization',
    headquarters: 'Mumbai / New Delhi, India',
    accreditation: 'Schedule T GMP Certified • NABH Accredited Ethics Committee • ISO 9001:2015',
    activePostings: 4,
    totalHires: 32,
    contactPerson: 'Dr. Meenakshi Sundaram',
    contactEmail: 'careers@charakclinical.in',
    about: 'Dedicated to conducting evidence-based Phase II/III clinical trials for proprietary and classical ASU formulations with adherence to GCP and ICMR guidelines.'
  });

  const handleSave = () => {
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      setPasswordMsg({ type: 'error', text: 'Please enter your current password.' });
      return;
    }
    if (newPassword.length < 8) {
      setPasswordMsg({ type: 'error', text: 'New password must be at least 8 characters long.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    setPasswordMsg({ type: 'success', text: 'Password successfully updated in your institutional security record.' });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordMsg(null), 4000);
  };

  return (
    <div className="space-y-6" id="profile-page">
      {/* Profile Header Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center text-xl font-bold shadow-md">
            {role === 'STUDENT' && 'AS'}
            {role === 'FACULTY' && 'AK'}
            {role === 'MENTOR' && 'RS'}
            {role === 'RECRUITER' && 'CC'}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
                {role === 'STUDENT' && studentData.name}
                {role === 'FACULTY' && facultyData.name}
                {role === 'MENTOR' && mentorData.name}
                {role === 'RECRUITER' && recruiterData.orgName}
              </h1>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                Verified AYUSH {role}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
              {role === 'STUDENT' && `${studentData.program} • ${studentData.institution}`}
              {role === 'FACULTY' && `${facultyData.designation} • ${facultyData.institution}`}
              {role === 'MENTOR' && `${mentorData.designation} • ${mentorData.affiliation}`}
              {role === 'RECRUITER' && `${recruiterData.category} • ${recruiterData.headquarters}`}
            </p>
          </div>
        </div>

        {/* Action Buttons & Tabs */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setActiveProfileTab(activeProfileTab === 'OVERVIEW' ? 'SETTINGS' : 'OVERVIEW')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 ${
              activeProfileTab === 'SETTINGS'
                ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>{activeProfileTab === 'OVERVIEW' ? 'Account Settings' : 'View Profile'}</span>
          </button>

          {activeProfileTab === 'OVERVIEW' && (
            isEditing ? (
              <button
                onClick={handleSave}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center gap-1.5 shadow-xs"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-lg flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            )
          )}
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Profile records updated and synchronized with institutional database.</span>
        </div>
      )}

      {/* VIEW: ACCOUNT SETTINGS */}
      {activeProfileTab === 'SETTINGS' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Security & Password */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Security & Password</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Update credentials for your institutional account</p>
              </div>
            </div>

            {passwordMsg && (
              <div
                className={`p-3 rounded-lg text-xs flex items-center gap-2 border ${
                  passwordMsg.type === 'success'
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                    : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300'
                }`}
              >
                {passwordMsg.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <ShieldCheck className="w-4 h-4 text-rose-600 shrink-0" />
                )}
                <span>{passwordMsg.text}</span>
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                  New Password (min 8 characters)
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors"
                >
                  Update Account Password
                </button>
              </div>
            </form>
          </div>

          {/* Interface Appearance & Accessibility */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400">
                <Sun className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Appearance & Theme</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Customize color modes for daytime clinical or night study use</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900 dark:text-slate-100">Interface Theme</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Currently: <span className="font-bold uppercase text-emerald-600">{actualTheme}</span> mode ({theme})
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
                  <button
                    onClick={() => setTheme('light')}
                    className={`p-1.5 rounded-md flex items-center gap-1 transition-colors ${
                      theme === 'light'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 font-bold'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" />
                    <span className="text-[10px]">Light</span>
                  </button>

                  <button
                    onClick={() => setTheme('dark')}
                    className={`p-1.5 rounded-md flex items-center gap-1 transition-colors ${
                      theme === 'dark'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 font-bold'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5" />
                    <span className="text-[10px]">Dark</span>
                  </button>

                  <button
                    onClick={() => setTheme('system')}
                    className={`p-1.5 rounded-md text-[10px] transition-colors ${
                      theme === 'system'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 font-bold'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    Auto
                  </button>
                </div>
              </div>
            </div>

            {/* Notification Center Shortcut */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <Bell className="w-4 h-4 text-emerald-600" />
                <div>
                  <div className="font-semibold text-slate-900 dark:text-slate-100">Notification Channels</div>
                  <div className="text-[11px] text-slate-500">Configure In-App, Email & Mobile Push alert frequencies</div>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-emerald-600 px-2 py-1 rounded bg-emerald-50 dark:bg-emerald-950/50">
                Active in Header
              </span>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: MAIN PROFILE OVERVIEW */}
      {activeProfileTab === 'OVERVIEW' && role === 'STUDENT' && (
        <div className="space-y-6">
          {/* Top Grid: Academic & Clinical Credentials */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Core Academic Details */}
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-emerald-600" />
                  <span>Academic Standing & Institutional Credentials</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-400 block mb-0.5">AYUSH Discipline:</span>
                    {isEditing ? (
                      <select
                        value={studentData.discipline}
                        onChange={e => setStudentData({ ...studentData, discipline: e.target.value })}
                        className="w-full mt-1 p-1 rounded bg-white dark:bg-slate-800 border text-slate-900 dark:text-slate-100 text-xs"
                      >
                        <option value="Ayurveda">Ayurveda</option>
                        <option value="Yoga & Naturopathy">Yoga & Naturopathy</option>
                        <option value="Unani">Unani</option>
                        <option value="Siddha">Siddha</option>
                        <option value="Sowa-Rigpa">Sowa-Rigpa</option>
                        <option value="Homoeopathy">Homoeopathy</option>
                      </select>
                    ) : (
                      <span className="font-bold text-slate-800 dark:text-slate-200">{studentData.discipline}</span>
                    )}
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-400 block mb-0.5">Degree / Program:</span>
                    {isEditing ? (
                      <input
                        type="text"
                        value={studentData.program}
                        onChange={e => setStudentData({ ...studentData, program: e.target.value })}
                        className="w-full mt-1 p-1 rounded bg-white dark:bg-slate-800 border text-slate-900 dark:text-slate-100 text-xs"
                      />
                    ) : (
                      <span className="font-bold text-slate-800 dark:text-slate-200">{studentData.program}</span>
                    )}
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-400 block mb-0.5">Academic Phase:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{studentData.academicYear} (Graduating {studentData.graduationYear})</span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-400 block mb-0.5">Primary Career Goal:</span>
                    {isEditing ? (
                      <input
                        type="text"
                        value={studentData.careerGoal}
                        onChange={e => setStudentData({ ...studentData, careerGoal: e.target.value })}
                        className="w-full mt-1 p-1 rounded bg-white dark:bg-slate-800 border text-slate-900 dark:text-slate-100 text-xs"
                      />
                    ) : (
                      <span className="font-bold text-emerald-700 dark:text-emerald-400">{studentData.careerGoal}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Verified Competencies vs Self-Assessed */}
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Clinical Competencies & Skill Matrix</span>
                </h2>

                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                      Officially Verified Competencies (AIIA Faculty Endorsed)
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {studentData.verifiedCompetencies.map((comp, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>{comp}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                      Self-Assessed / In-Progress Competencies
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {studentData.selfAssessedCompetencies.map((comp, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                        >
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Clinical & Hospital Rotation Exposure */}
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <HeartPulse className="w-4 h-4 text-rose-600" />
                    <span>Inpatient & OPD Clinical Rotations</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
                    {studentData.totalClinicalHours} Total Hours Logged
                  </span>
                </h2>

                <div className="space-y-2 text-xs">
                  {studentData.clinicalExposure.map((rot, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-slate-100">{rot.department}</div>
                        <div className="text-slate-500 text-[11px]">{rot.institution}</div>
                      </div>
                      <div className="font-mono font-bold text-slate-800 dark:text-slate-200">
                        {rot.hours} Hours
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Column: Readiness & Opportunities */}
            <div className="space-y-6">
              {/* Skill Passport Summary */}
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>AYUSH Skill Passport</span>
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Cryptographically endorsed clinical and research credential repository verified under AIIA clinical registry.
                </p>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-xs font-mono text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  Passport ID: AYUSH-SKP-2026-9042
                </div>
                <div className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Status: Active & Recruiter Visible</span>
                </div>
              </div>

              {/* Career Opportunity Preferences */}
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 text-xs">
                <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-amber-600" />
                  <span>Opportunity Preferences</span>
                </h2>

                <div>
                  <span className="text-slate-400 block mb-0.5">Preferred Opening Type:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{studentData.preferredOpportunityType}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Preferred Locations:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{studentData.preferredLocation}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Availability:</span>
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">{studentData.availability}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: FACULTY PROFILE */}
      {activeProfileTab === 'OVERVIEW' && role === 'FACULTY' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <span>Faculty Areas of Expertise & Specialization</span>
              </h2>
              <div className="flex flex-wrap gap-2">
                {facultyData.expertise.map((exp, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs font-semibold rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                  >
                    {exp}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-600" />
                <span>Recent Peer-Reviewed Publications</span>
              </h2>
              <div className="space-y-2.5">
                {facultyData.recentPublications.map((pub, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
                    <span className="font-semibold text-slate-400 block mb-0.5">Publication 0{idx + 1}:</span>
                    {pub}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">Industry & Research Impact</h2>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">Publications:</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">{facultyData.publicationsCount}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">Industry Collaborations:</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">{facultyData.industryCollaborations} Active</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500">Consultancy Projects:</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">{facultyData.consultancyProjects}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: MENTOR PROFILE */}
      {activeProfileTab === 'OVERVIEW' && role === 'MENTOR' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Mentorship Domain & Guidance Specialties</span>
              </h2>
              <div className="flex flex-wrap gap-2">
                {mentorData.specialties.map((spec, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs font-semibold rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">Mentorship Availability</h2>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-xs space-y-1">
                <div className="font-semibold text-slate-800 dark:text-slate-200">{mentorData.availability}</div>
                <div className="text-slate-500">Focused 1-on-1 Academic and Clinical Reviews</div>
              </div>
              <div className="text-xs text-slate-500 pt-1">
                Current Load: {mentorData.currentMentees} / {mentorData.maxCapacity} Scholars
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: RECRUITER PROFILE */}
      {activeProfileTab === 'OVERVIEW' && role === 'RECRUITER' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-purple-600" />
                <span>About Healthcare Organization</span>
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {recruiterData.about}
              </p>
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-800 text-xs">
                <span className="text-slate-400 block mb-1">Quality Accreditations:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{recruiterData.accreditation}</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">Talent Acquisition Summary</h2>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">Active Postings:</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">{recruiterData.activePostings}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">AYUSH Scholars Hired:</span>
                  <span className="font-bold text-emerald-600">{recruiterData.totalHires}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
