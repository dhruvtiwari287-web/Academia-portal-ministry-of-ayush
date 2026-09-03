// Server configuration & constants
export const JWT_SECRET = process.env.JWT_SECRET || "ayush-national-academia-industry-platform-secure-key-2026";
export const PORT = 3000;

export const DEMO_CREDENTIALS = {
  STUDENT: {
    email: "student@demo.local",
    password: "Password123!",
    role: "STUDENT",
    name: "Dr. Ananya Sharma (Intern / Scholar)"
  },
  FACULTY: {
    email: "faculty@demo.local",
    password: "Password123!",
    role: "FACULTY",
    name: "Prof. Dr. Rajeshwar V. Joshi"
  },
  MENTOR: {
    email: "mentor@demo.local",
    password: "Password123!",
    role: "MENTOR",
    name: "Dr. Meenakshi Sundaram"
  },
  RECRUITER: {
    email: "recruiter@demo.local",
    password: "Password123!",
    role: "RECRUITER",
    name: "Vikramaditya Sengupta"
  }
};
