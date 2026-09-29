const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database with verified CV data...");

  // 1. Admin User
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync("admin123password", salt);

  await prisma.user.upsert({
    where: { username: "admin" },
    update: { passwordHash },
    create: {
      username: "admin",
      email: "ahm.idlah773@gmail.com",
      passwordHash,
      name: "Ahmad Ubai Dullah",
      role: "admin",
    },
  });
  console.log("Admin user created/verified (username: admin, password: admin123password)");

  // 2. Site Settings
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      name: "AHMAD UBAI DULLAH",
      eyebrow: "FULL STACK DEVELOPER",
      headline: "Building practical web systems that solve real-world problems.",
      supportingCopy:
        "Full Stack Developer experienced in building and maintaining web applications using Laravel, JavaScript, Node.js, and MySQL, with additional experience in data analysis and machine learning.",
      location: "Tuban, Indonesia",
      email: "ahm.idlah773@gmail.com",
      phone: "+62 819-1200-1721",
      linkedin: "https://linkedin.com/in/ahmadubai",
      linkedinDisplay: "linkedin.com/in/ahmadubai",
      github: "https://github.com/ubaidlah773",
      githubDisplay: "github.com/ubaidlah773",
      cvUrl: "/Ahmad_Ubai_Dullah_CV.pdf",
      profileImage: "/profile.png",
      aboutEditorial:
        "Engineering reliable, database-driven web platforms that bridge human workflows and robust backend architectures.",
      aboutSummary: JSON.stringify([
        "Full Stack Developer with dedicated experience designing, building, and maintaining production web applications using Laravel, JavaScript, Node.js, and MySQL.",
        "Proven track record delivering mission-critical web platforms across public information portals, online registration services, institutional scheduling engines, and internal administration workflows.",
        "Skilled in relational database modeling, structured CRUD engineering, secure REST APIs, search engine optimization (SEO), and responsive modern interface design.",
        "Holds a Bachelor of Informatics from Universitas Negeri Semarang (GPA 3.80 / 4.00) with proven analytical depth from published research in applied machine learning.",
      ]),
      metaTitle: "Ahmad Ubai Dullah — Full Stack Developer | Tuban, Indonesia",
      metaDescription:
        "Full Stack Developer based in Tuban, Indonesia. Building practical database-driven web systems with Laravel, JavaScript, Node.js, and MySQL.",
      ogImage: "/profile.png",
    },
  });
  console.log("Site settings seeded.");

  // Clear existing items to re-seed cleanly
  await prisma.projectImage.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.experience.deleteMany({});
  await prisma.skill.deleteMany({});
  await prisma.skillCategory.deleteMany({});
  await prisma.education.deleteMany({});
  await prisma.mediaItem.deleteMany({});

  // 3. Projects & Project Images
  // Project 1: Belajar Cerdas
  const p1 = await prisma.project.create({
    data: {
      number: "01",
      title: "Belajar Cerdas",
      slug: "belajar-cerdas",
      subtitle: "Integrated School Management Platform",
      period: "Mar 2026 – Jun 2026",
      role: "Web Developer — Freelance",
      category: "School Management / LMS",
      shortDescription:
        "Developed interconnected dashboards for students, teachers, school principals, parents, and foundations within the Belajar Cerdas platform.",
      fullDescription:
        "Belajar Cerdas is a multi-stakeholder school management platform built to streamline academic administration. The application bridges students, educators, principals, parents, and foundation administrators into synchronized workflows, eliminating communication barriers and unifying scheduling in real time.",
      technologies: "Laravel, MySQL, JavaScript, Blade, Tailwind CSS, RBAC",
      projectUrl: "https://belajarcerdas.id",
      githubUrl: "https://github.com/ubaidlah773/belajar-cerdas",
      featured: true,
      published: true,
      displayOrder: 1,
      coverImage: "/uploads/belajar-cerdas-cover.svg",
      mockupType: "belajar-cerdas",
      badgeText: "Enterprise LMS",
      highlights: JSON.stringify([
        "Multi-role dashboards engineered for 5 distinct stakeholders",
        "Dynamic lesson scheduling system adapted to specific role workflows",
        "Integrated academic event calendar for institutional planning",
        "Responsive and interactive user interfaces across devices",
        "Role-based access control (RBAC) ensuring data boundaries",
      ]),
      features: JSON.stringify([
        {
          title: "Multi-Role Dashboard Architecture",
          description:
            "Engineered tailored user experiences for 5 distinct roles: Students, Teachers, School Principals, Parents, and Foundations.",
        },
        {
          title: "Lesson Scheduling Engine",
          description:
            "Implemented a scheduling system that handles classroom time slots, teacher allocation, and subject recurrence while preventing timetable collisions.",
        },
        {
          title: "Academic Event Calendar",
          description:
            "Built an interactive institutional calendar to coordinate academic milestones, term assessments, and extracurricular events.",
        },
        {
          title: "Responsive Cross-Device Layout",
          description:
            "Structured an adaptive responsive interface allowing administrators on desktops and parents on mobile devices to access platform workflows seamlessly.",
        },
      ]),
      developmentHighlights: JSON.stringify([
        "Designed normalized relational database tables linking subjects, classrooms, user roles, and recurring schedule slots in MySQL.",
        "Implemented strict authorization middleware ensuring sensitive student evaluations and administrative notes remain protected by role.",
        "Optimized query relationships using eager loading to prevent N+1 overhead across complex dashboard overviews.",
      ]),
      images: {
        create: [
          {
            fileName: "belajar-cerdas-cover.svg",
            fileUrl: "/uploads/belajar-cerdas-cover.svg",
            title: "Belajar Cerdas Platform Overview",
            altText: "Belajar Cerdas integrated school management platform cover interface",
            caption: "Platform architecture overview showing interconnected school management modules.",
            sortOrder: 1,
            isCover: true,
            fileSize: 45000,
            fileType: "image/svg+xml",
          },
          {
            fileName: "belajar-cerdas-student.svg",
            fileUrl: "/uploads/belajar-cerdas-student.svg",
            title: "Student Learning Workspace",
            altText: "Belajar Cerdas student dashboard interface",
            caption: "Student portal dashboard displaying daily schedules, assignments, and curriculum progress.",
            sortOrder: 2,
            isCover: false,
            fileSize: 46000,
            fileType: "image/svg+xml",
          },
          {
            fileName: "belajar-cerdas-teacher.svg",
            fileUrl: "/uploads/belajar-cerdas-teacher.svg",
            title: "Teacher Management Console",
            altText: "Belajar Cerdas teacher console for lesson planning",
            caption: "Educator interface for syllabus scheduling, grading matrices, and classroom attendance.",
            sortOrder: 3,
            isCover: false,
            fileSize: 46000,
            fileType: "image/svg+xml",
          },
          {
            fileName: "belajar-cerdas-schedule.svg",
            fileUrl: "/uploads/belajar-cerdas-schedule.svg",
            title: "Lesson Scheduling Matrix",
            altText: "Belajar Cerdas lesson timetable collision prevention matrix",
            caption: "Timetable matrix scheduling system preventing classroom and teacher time-slot collisions.",
            sortOrder: 4,
            isCover: false,
            fileSize: 47000,
            fileType: "image/svg+xml",
          },
          {
            fileName: "belajar-cerdas-calendar.svg",
            fileUrl: "/uploads/belajar-cerdas-calendar.svg",
            title: "Academic Event Calendar",
            altText: "Belajar Cerdas school event calendar",
            caption: "Institutional academic calendar tracking examinations, terms, and milestone events.",
            sortOrder: 5,
            isCover: false,
            fileSize: 45000,
            fileType: "image/svg+xml",
          },
        ],
      },
    },
  });

  // Project 2: Lapas Tuban
  const p2 = await prisma.project.create({
    data: {
      number: "02",
      title: "Lapas Tuban",
      slug: "lapas-tuban",
      subtitle: "Digital Services Platform",
      period: "2025 – 2026",
      role: "Facilities Manager Intern — Web Development Focus",
      category: "Public Sector Portal & Intranet",
      shortDescription:
        "Developed multiple web-based systems supporting the digitalization of administrative and public services.",
      fullDescription:
        "A comprehensive institutional digitalization platform for Lembaga Pemasyarakatan Kelas IIB Tuban. Encompasses an outward-facing public transparency portal alongside internal administrative systems replacing physical records with robust database operations.",
      technologies: "Laravel, MySQL, JavaScript, CRUD, SEO, Tailwind CSS, Bootstrap",
      projectUrl: "https://lapastuban.kemenkumham.go.id",
      githubUrl: "https://github.com/ubaidlah773/lapas-tuban-web",
      featured: true,
      published: true,
      displayOrder: 2,
      coverImage: "/uploads/lapas-tuban-cover.svg",
      mockupType: "lapas-tuban",
      badgeText: "Public Sector Portal",
      highlights: JSON.stringify([
        "Official Lapas Tuban public portal & transparency hub",
        "Internal digital payroll management system",
        "Clinic patient data management module",
        "Satbang administrative documentation system",
        "Database-driven CRUD with rigorous data validation",
        "Routine maintenance, security hardening & performance optimization",
      ]),
      features: JSON.stringify([
        {
          title: "Official Public Information Portal",
          description:
            "Developed and launched the official website delivering public information, visiting protocols, and legal announcements with SEO optimization.",
        },
        {
          title: "Digital Payroll Management",
          description:
            "Constructed an internal payroll computation system calculating staff compensation, deductions, and historic disbursement records securely.",
        },
        {
          title: "Clinic Patient Medical Records",
          description:
            "Created a clinical data management system to record inmate health consultations, medical history logs, checkup schedules, and prescription inventory.",
        },
        {
          title: "Satbang Administration Workflow",
          description:
            "Built a digital administrative tool for prisoner work activity (Satbang) tracking, logging daily task fulfillment and program compliance.",
        },
      ]),
      developmentHighlights: JSON.stringify([
        "Structured secure CRUD interfaces with parameter sanitization, CSRF defenses, and authentication logging.",
        "Applied on-page SEO best practices and semantic metadata to maximize public accessibility and government transparency score.",
        "Conducted regular code audits, dependency patches, and database indexing to maintain system stability.",
      ]),
      images: {
        create: [
          {
            fileName: "lapas-tuban-cover.svg",
            fileUrl: "/uploads/lapas-tuban-cover.svg",
            title: "Lapas Tuban Platform Overview",
            altText: "Lapas Tuban digital services platform cover interface",
            caption: "Central dashboard uniting public portal and internal facility administration.",
            sortOrder: 1,
            isCover: true,
            fileSize: 46000,
            fileType: "image/svg+xml",
          },
          {
            fileName: "lapas-tuban-website.svg",
            fileUrl: "/uploads/lapas-tuban-website.svg",
            title: "Official Transparency Portal",
            altText: "Lapas Tuban public website transparency portal",
            caption: "Official public transparency website for visiting schedules and institutional bulletins.",
            sortOrder: 2,
            isCover: false,
            fileSize: 47000,
            fileType: "image/svg+xml",
          },
          {
            fileName: "lapas-tuban-payroll.svg",
            fileUrl: "/uploads/lapas-tuban-payroll.svg",
            title: "Digital Payroll Management",
            altText: "Lapas Tuban digital payroll management interface",
            caption: "Automated staff compensation computation, tax allowances, and disbursement histories.",
            sortOrder: 3,
            isCover: false,
            fileSize: 46000,
            fileType: "image/svg+xml",
          },
          {
            fileName: "lapas-tuban-clinic.svg",
            fileUrl: "/uploads/lapas-tuban-clinic.svg",
            title: "Clinic Patient Medical Records",
            altText: "Lapas Tuban clinic patient health management records",
            caption: "Clinical record management for inmate consultations, checkup calendars, and pharmaceutical supplies.",
            sortOrder: 4,
            isCover: false,
            fileSize: 46000,
            fileType: "image/svg+xml",
          },
          {
            fileName: "lapas-tuban-administration.svg",
            fileUrl: "/uploads/lapas-tuban-administration.svg",
            title: "Satbang Administration Workflow",
            altText: "Lapas Tuban Satbang administrative program compliance",
            caption: "Internal administrative tracking for inmate rehabilitation activities and security compliance.",
            sortOrder: 5,
            isCover: false,
            fileSize: 47000,
            fileType: "image/svg+xml",
          },
        ],
      },
    },
  });

  // Project 3: Queue System
  const p3 = await prisma.project.create({
    data: {
      number: "03",
      title: "Online Visitor Registration & Queue System",
      slug: "visitor-registration-queue-system",
      subtitle: "Public Intake & Real-Time Queue Calling",
      period: "Dec 2025 – Jan 2026",
      role: "Full Stack Developer",
      category: "Queue Management / Public Intake",
      shortDescription:
        "Designed and developed an online visitor registration system to streamline the visitor registration process.",
      fullDescription:
        "A purpose-built public visitor intake and queue orchestration platform. Designed to eliminate physical congestion, the system allows visitors to book registration slots online and enables facility staff to process queues smoothly via automated counter calling.",
      technologies: "Laravel, MySQL, Queue Management, Real-Time Audio Calling, Web Hosting, SEO",
      projectUrl: "https://antrian.lapastuban.id",
      githubUrl: "https://github.com/ubaidlah773/queue-management-system",
      featured: true,
      published: true,
      displayOrder: 3,
      coverImage: "/uploads/queue-system-cover.svg",
      mockupType: "queue-system",
      badgeText: "Real-Time Queue Platform",
      highlights: JSON.stringify([
        "Online visitor registration portal with pre-booking",
        "Automated queue numbering and desk assignment",
        "Queue calling mechanism with sound/audio alerts",
        "Real-time queue display monitor for waiting lounges",
        "Live web hosting deployment & domain configuration",
        "SEO implementation for public search accessibility",
      ]),
      features: JSON.stringify([
        {
          title: "Self-Service Online Registration",
          description:
            "Allows visiting family members to input required identification and choose visitation sessions from home, generating an electronic registration ticket.",
        },
        {
          title: "Queue Numbering & Session Allocation",
          description:
            "Automates sequential queue ticketing segmented by time intervals, preventing morning crowd spikes and ensuring orderly processing.",
        },
        {
          title: "Audio-Visual Queue Calling Desk",
          description:
            "Provides desk operators with a single-click call trigger that sounds an audible bell alert and updates caller numbers across reception speakers.",
        },
        {
          title: "Live Waiting Room Display",
          description:
            "Features a responsive high-contrast large-screen display showing active counter numbers, current serving tickets, and upcoming queue positions.",
        },
      ]),
      developmentHighlights: JSON.stringify([
        "Engineered race-condition prevention during peak registration hours using atomic database transactions.",
        "Deployed and configured application on production web hosting with custom DNS routing and HTTPS encryption.",
        "Implemented structured JSON-LD and meta tags for search engines so local visitors easily find the registration portal.",
      ]),
      images: {
        create: [
          {
            fileName: "queue-system-cover.svg",
            fileUrl: "/uploads/queue-system-cover.svg",
            title: "Queue System Overview",
            altText: "Online visitor registration and queue management system cover interface",
            caption: "Visitor queue orchestration and electronic reception ticketing platform.",
            sortOrder: 1,
            isCover: true,
            fileSize: 46000,
            fileType: "image/svg+xml",
          },
          {
            fileName: "queue-system-calling.svg",
            fileUrl: "/uploads/queue-system-calling.svg",
            title: "Audio Calling Desk Operator Console",
            altText: "Queue calling operator desk interface",
            caption: "Desk operator calling panel with single-click voice broadcast and automated ticket advancing.",
            sortOrder: 2,
            isCover: false,
            fileSize: 47000,
            fileType: "image/svg+xml",
          },
          {
            fileName: "queue-system-display.svg",
            fileUrl: "/uploads/queue-system-display.svg",
            title: "Waiting Hall Public Display Monitor",
            altText: "Real-time queue monitor screen for waiting hall",
            caption: "High-contrast waiting room monitor displaying active service counters and next tickets.",
            sortOrder: 3,
            isCover: false,
            fileSize: 46000,
            fileType: "image/svg+xml",
          },
          {
            fileName: "queue-system-ticket.svg",
            fileUrl: "/uploads/queue-system-ticket.svg",
            title: "Electronic Visitor Appointment Ticket",
            altText: "Visitor electronic registration appointment ticket with QR code",
            caption: "Digital visitor appointment pass with verified time slot and QR validation.",
            sortOrder: 4,
            isCover: false,
            fileSize: 46000,
            fileType: "image/svg+xml",
          },
        ],
      },
    },
  });

  console.log("Projects and Gallery Images seeded.");

  // Also register images into Media Library
  const allProjectImages = [
    { name: "belajar-cerdas-cover.svg", p: p1.id, title: "Belajar Cerdas Cover" },
    { name: "belajar-cerdas-student.svg", p: p1.id, title: "Student Dashboard" },
    { name: "belajar-cerdas-teacher.svg", p: p1.id, title: "Teacher Console" },
    { name: "belajar-cerdas-schedule.svg", p: p1.id, title: "Schedule Timetable" },
    { name: "belajar-cerdas-calendar.svg", p: p1.id, title: "Academic Calendar" },
    { name: "lapas-tuban-cover.svg", p: p2.id, title: "Lapas Tuban Cover" },
    { name: "lapas-tuban-website.svg", p: p2.id, title: "Official Website" },
    { name: "lapas-tuban-payroll.svg", p: p2.id, title: "Digital Payroll" },
    { name: "lapas-tuban-clinic.svg", p: p2.id, title: "Clinic Patient Data" },
    { name: "lapas-tuban-administration.svg", p: p2.id, title: "Satbang Administration" },
    { name: "queue-system-cover.svg", p: p3.id, title: "Queue System Cover" },
    { name: "queue-system-calling.svg", p: p3.id, title: "Audio Calling Desk" },
    { name: "queue-system-display.svg", p: p3.id, title: "Live Display Monitor" },
    { name: "queue-system-ticket.svg", p: p3.id, title: "E-Ticket Preview" },
  ];

  for (const item of allProjectImages) {
    await prisma.mediaItem.create({
      data: {
        fileName: item.name,
        fileUrl: `/uploads/${item.name}`,
        fileType: "image/svg+xml",
        fileSize: 46000,
        altText: item.title,
        caption: `Documentation screenshot for ${item.title}`,
        projectId: item.p,
      },
    });
  }
  console.log("Media Library records seeded.");

  // 4. Experiences
  const experiences = [
    {
      company: "Belajar Cerdas",
      role: "Web Developer — Freelance",
      period: "Mar 2026 – Jun 2026",
      location: "Remote / Indonesia",
      type: "Freelance",
      displayOrder: 1,
      published: true,
      responsibilities: JSON.stringify([
        "Developed interconnected dashboards for students, teachers, school principals, parents, and foundations within the Belajar Cerdas platform.",
        "Implemented a lesson scheduling system tailored to the workflows of each user role.",
        "Built an event calendar to support school activities and academic management.",
        "Designed responsive and interactive user interfaces to enhance accessibility across devices.",
      ]),
      technologies: JSON.stringify(["Laravel", "MySQL", "JavaScript", "Blade", "Tailwind CSS"]),
    },
    {
      company: "Lembaga Pemasyarakatan Kelas IIB Tuban",
      role: "Facilities Manager Intern — Web Development Focus",
      period: "Nov 2025 – May 2026",
      location: "Tuban, Indonesia",
      type: "Internship",
      displayOrder: 2,
      published: true,
      responsibilities: JSON.stringify([
        "Developed and maintained the official Lapas Tuban website as a public information and transparency portal.",
        "Built internal administrative systems including digital payroll, clinic patient records, and Satbang administration to improve data management efficiency.",
        "Implemented database-driven CRUD operations using Laravel and MySQL.",
        "Performed routine system maintenance, security enhancements, and performance optimizations.",
      ]),
      technologies: JSON.stringify(["Laravel", "MySQL", "JavaScript", "HTML/CSS", "SEO", "System Administration"]),
    },
    {
      company: "Kelas Pintar",
      role: "Freelance Question Tagging",
      period: "Sep 2025 – Jan 2026",
      location: "Remote / Indonesia",
      type: "Freelance",
      displayOrder: 3,
      published: true,
      responsibilities: JSON.stringify([
        "Reviewed, validated, and classified educational questions based on curriculum standards.",
        "Tagged question metadata (difficulty level, subject, learning topics) to improve search accuracy within the question bank.",
        "Maintained high data quality and accuracy across thousands of educational items.",
      ]),
      technologies: JSON.stringify(["Educational Data Classification", "Metadata Tagging", "Quality Assurance"]),
    },
    {
      company: "PT. Surya Hijau Manfaat Publisher",
      role: "Data Engineer & Article Reviewer",
      period: "Aug 2024 – Jan 2025",
      location: "Indonesia",
      type: "Contract",
      displayOrder: 4,
      published: true,
      responsibilities: JSON.stringify([
        "Reviewed and evaluated scientific articles and research publications for technical and structural accuracy.",
        "Managed and organized publication datasets, metadata, and indexing systems.",
        "Assisted in the peer review and editorial workflow for academic journals.",
      ]),
      technologies: JSON.stringify(["Data Engineering", "Dataset Management", "Academic Indexing", "Technical Review"]),
    },
  ];

  for (const exp of experiences) {
    await prisma.experience.create({ data: exp });
  }
  console.log("Experience records seeded.");

  // 5. Skills & Categories
  const skillSets = [
    {
      category: "Programming",
      description: "Core languages used to engineer performant algorithms and applications.",
      displayOrder: 1,
      skills: [
        { name: "HTML", tag: "Markup", displayOrder: 1 },
        { name: "CSS", tag: "Styling", displayOrder: 2 },
        { name: "JavaScript", tag: "Full Stack", displayOrder: 3 },
        { name: "Python", tag: "Data & ML", displayOrder: 4 },
        { name: "C++", tag: "Systems", displayOrder: 5 },
      ],
    },
    {
      category: "Frameworks & Runtime",
      description: "Modern backend and server runtimes for scalable web architectures.",
      displayOrder: 2,
      skills: [
        { name: "Laravel", tag: "PHP Framework", displayOrder: 1 },
        { name: "Node.js", tag: "Server Runtime", displayOrder: 2 },
        { name: "Express.js", tag: "Backend Framework", displayOrder: 3 },
      ],
    },
    {
      category: "Database",
      description: "Relational storage systems optimized for data integrity and speed.",
      displayOrder: 3,
      skills: [
        { name: "MySQL", tag: "Relational RDBMS", displayOrder: 1 },
        { name: "SQLite", tag: "Embedded Database", displayOrder: 2 },
      ],
    },
    {
      category: "Tools & Ecosystem",
      description: "Developer workflows, version control, and design tooling.",
      displayOrder: 4,
      skills: [
        { name: "Git", tag: "Version Control", displayOrder: 1 },
        { name: "GitHub", tag: "Code Repository", displayOrder: 2 },
        { name: "Figma", tag: "UI/UX Prototyping", displayOrder: 3 },
        { name: "Canva", tag: "Visual Assets", displayOrder: 4 },
        { name: "MySQL Workbench", tag: "Schema Modeling", displayOrder: 5 },
      ],
    },
    {
      category: "Web & Architecture",
      description: "Architectural disciplines for practical, accessible web systems.",
      displayOrder: 5,
      skills: [
        { name: "CRUD", tag: "Data Operations", displayOrder: 1 },
        { name: "REST API", tag: "System Integration", displayOrder: 2 },
        { name: "SEO", tag: "Search Visibility", displayOrder: 3 },
        { name: "Responsive Web Design", tag: "Adaptive Layouts", displayOrder: 4 },
      ],
    },
  ];

  for (const set of skillSets) {
    const createdCat = await prisma.skillCategory.create({
      data: {
        category: set.category,
        description: set.description,
        displayOrder: set.displayOrder,
      },
    });

    for (const s of set.skills) {
      await prisma.skill.create({
        data: {
          categoryId: createdCat.id,
          name: s.name,
          tag: s.tag,
          displayOrder: s.displayOrder,
        },
      });
    }
  }
  console.log("Skill categories and skills seeded.");

  // 6. Education
  await prisma.education.create({
    data: {
      institution: "Universitas Negeri Semarang",
      degree: "Bachelor of Informatics",
      period: "Aug 2021 – Jul 2025",
      gradeLabel: "GPA",
      gradeValue: "3.80 / 4.00",
      displayOrder: 1,
      achievements: JSON.stringify([
        "Finalist, DIMAS-TI Data Mining Competition 2023",
        "Published 7 research articles on machine learning applications",
      ]),
      coursework: JSON.stringify([
        "Artificial Intelligence",
        "Data Analysis",
        "Research Methodology",
        "Information Technology Research",
      ]),
    },
  });

  await prisma.education.create({
    data: {
      institution: "RevoU Tech Academy",
      degree: "Data Analyst & Software Engineer",
      period: "Aug 2023 – Dec 2023",
      gradeLabel: "Final Score",
      gradeValue: "92 / 100",
      displayOrder: 2,
      competencies: JSON.stringify([
        "Data Analytics & Cleaning",
        "Software Engineering (Frontend & Backend)",
        "MySQL Relational Modeling",
        "Data Visualization & Dashboards",
      ]),
    },
  });
  console.log("Education records seeded.");

  console.log("Database successfully seeded with 100% authentic CV data!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
