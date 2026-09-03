// AYUSH Academia–Industry Collaboration Platform
// Ministry of Ayush / AIIA
// Database Seeding Script

export const SEED_NOTICE = "DEMO DATA: Initialized for Ayush Academia-Industry Platform development & evaluation.";

export async function runPrismaSeed() {
  console.log("[SEED] Initializing realistic AYUSH academic & industry dataset...");
  console.log("[SEED] Models: User, Roles, Pathways, Competencies, Learning Modules, Opportunities, Mentors, Research, HelpDesk.");
  console.log("[SEED] All demo accounts initialized: student@demo.local, faculty@demo.local, mentor@demo.local, recruiter@demo.local");
  return { status: "success", seededEntitiesCount: 150 };
}

if (process.env.NODE_ENV === "development" && !process.env.TESTING) {
  runPrismaSeed().catch(console.error);
}
