import {
  PersonalInfo,
  ProjectItem,
  ExperienceItem,
  SkillCategory,
  EducationItem,
} from "@/types/portfolio";

export const personalInfo: PersonalInfo = {
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
    "Engineering dependable, database-driven web platforms that transform complex organizational workflows into intuitive, resilient digital systems.",
  aboutSummary: [
    "Full Stack Developer with dedicated experience designing, building, and maintaining production web applications using Laravel, JavaScript, Node.js, and MySQL.",
    "Proven track record delivering mission-critical web platforms across public information portals, online registration services, institutional scheduling engines, and internal administration workflows.",
    "Skilled in relational database modeling, structured CRUD engineering, secure REST APIs, search engine optimization (SEO), and responsive modern interface design.",
    "Holds a Bachelor of Informatics from Universitas Negeri Semarang (GPA 3.80 / 4.00) with proven analytical depth from published research in applied machine learning.",
  ],
};

export const projectsData: ProjectItem[] = [
  {
    id: "belajar-cerdas",
    slug: "belajar-cerdas",
    number: "01",
    title: "Belajar Cerdas",
    subtitle: "Integrated School Management Platform",
    period: "Mar 2026 – Jun 2026",
    role: "Web Developer — Freelance",
    category: "WEB",
    tools: "Laravel, MySQL, JavaScript, Blade, Tailwind CSS, RBAC",
    projectUrl: "https://belajarcerdas.id",
    githubUrl: "https://github.com/ubaidlah773/belajar-cerdas",
    coverImage: "/uploads/belajar-cerdas-cover.svg",
    tags: ["Laravel", "MySQL", "JavaScript", "Multi-Role Dashboard", "Scheduling", "Calendar"],
    description:
      "Developed interconnected dashboards for students, teachers, school principals, parents, and foundations within the Belajar Cerdas platform.",
    highlights: [
      "Multi-role dashboards engineered for 5 distinct stakeholders",
      "Dynamic lesson scheduling system adapted to specific role workflows",
      "Integrated academic event calendar for institutional planning",
      "Responsive and interactive user interfaces across devices",
      "Role-based access control (RBAC) ensuring data boundaries",
    ],
    mockupType: "belajar-cerdas",
    badgeText: "Enterprise LMS",
    overview:
      "Belajar Cerdas is a comprehensive school management ecosystem architected to streamline academic administration. The platform bridges disparate school stakeholders into a unified operational dashboard, removing communication silos and synchronizing academic schedules in real-time.",
    technologies: {
      frontend: ["JavaScript", "Blade Templates", "Tailwind CSS", "Interactive DOM Utilities"],
      backend: ["Laravel", "PHP", "Role-Based Access Control (RBAC)"],
      database: ["MySQL", "Relational Schema Normalization", "Eloquent ORM"],
      infrastructure: ["Web Hosting", "Git Version Control", "Composer"],
    },
    features: [
      {
        title: "Multi-Role Dashboard Architecture",
        description:
          "Engineered tailored user experiences for 5 distinct roles: Students (assignments & classes), Teachers (curriculum & grading), School Principals (academic oversight), Parents (child progress monitoring), and Foundations (multi-branch administrative governance).",
      },
      {
        title: "Lesson Scheduling Engine",
        description:
          "Implemented a scheduling system that handles classroom time slots, teacher allocation, and subject recurrence while preventing timetable collisions.",
      },
      {
        title: "Academic Event Calendar",
        description:
          "Built an interactive institutional calendar to coordinate academic milestones, term assessments, parent-teacher conferences, and extracurricular events.",
      },
      {
        title: "Responsive Cross-Device Layout",
        description:
          "Structured an adaptive responsive interface allowing administrators on desktops and parents on mobile devices to access platform workflows without layout degradation.",
      },
    ],
    developmentHighlights: [
      "Designed normalized relational database tables linking subjects, classrooms, user roles, and recurring schedule slots in MySQL.",
      "Implemented strict authorization middleware ensuring sensitive student evaluations and administrative notes remain protected by role.",
      "Optimized query relationships using eager loading to prevent N+1 overhead across complex dashboard overviews.",
    ],
  },
  {
    id: "lapas-tuban",
    slug: "lapas-tuban",
    number: "02",
    title: "Lapas Tuban",
    subtitle: "Digital Services Platform",
    period: "2025 – 2026",
    role: "Facilities Manager Intern — Web Development Focus",
    category: "WEB",
    tools: "Laravel, MySQL, JavaScript, CRUD, SEO, Tailwind CSS",
    projectUrl: "https://lapastuban.kemenkumham.go.id",
    githubUrl: "https://github.com/ubaidlah773/lapas-tuban-web",
    coverImage: "/uploads/lapas-tuban-cover.svg",
    tags: ["Laravel", "MySQL", "JavaScript", "CRUD", "SEO", "Administrative Security"],
    description:
      "Developed multiple web-based systems supporting the digitalization of administrative and public services.",
    highlights: [
      "Official Lapas Tuban public portal & transparency hub",
      "Internal digital payroll management system",
      "Clinic patient data management module",
      "Satbang administrative documentation system",
      "Database-driven CRUD with rigorous data validation",
      "Routine maintenance, security hardening & performance optimization",
    ],
    mockupType: "lapas-tuban",
    badgeText: "Public Sector Portal & Intranet",
    overview:
      "A comprehensive digitalization initiative for Lembaga Pemasyarakatan Kelas IIB Tuban. The project encompasses an outward-facing public portal for institutional transparency alongside internal administrative applications that replaced legacy paper-based workflows.",
    technologies: {
      frontend: ["JavaScript", "Tailwind CSS", "Semantic HTML5", "Responsive UI"],
      backend: ["Laravel", "PHP", "CSRF Protection", "Authentication Guards"],
      database: ["MySQL", "Structured Relational Data", "Query Optimization"],
      infrastructure: ["Government Web Server", "Linux Environment", "SEO Tooling"],
    },
    features: [
      {
        title: "Official Public Information Portal",
        description:
          "Developed and launched the official website delivering public information, organizational structure, visiting protocols, and legal announcements with SEO optimization.",
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
    ],
    developmentHighlights: [
      "Structured secure CRUD interfaces with parameter sanitization, CSRF defenses, and authentication logging.",
      "Applied on-page SEO best practices and semantic metadata to maximize public accessibility and government transparency score.",
      "Conducted regular code audits, dependency patches, and database indexing to maintain system stability.",
    ],
  },
  {
    id: "queue-system",
    slug: "visitor-registration-queue-system",
    number: "03",
    title: "Online Visitor Registration & Queue System",
    subtitle: "Public Intake & Real-Time Queue Calling",
    period: "Dec 2025 – Jan 2026",
    role: "Full Stack Developer",
    category: "WEB",
    tools: "Laravel, MySQL, Queue Dispatch, Real-Time Audio, SEO",
    projectUrl: "https://antrian.lapastuban.id",
    githubUrl: "https://github.com/ubaidlah773/queue-management-system",
    tags: ["Laravel", "MySQL", "Queue Management", "Real-Time Display", "Web Hosting", "SEO"],
    description:
      "Designed and developed an online visitor registration system to streamline the visitor registration process.",
    highlights: [
      "Online visitor registration portal with pre-booking",
      "Automated queue numbering and desk assignment",
      "Queue calling mechanism with sound/audio alerts",
      "Real-time queue display monitor for waiting lounges",
      "Live web hosting deployment & domain configuration",
      "SEO implementation for public search accessibility",
    ],
    mockupType: "queue-system",
    badgeText: "Real-Time Queue Platform",
    coverImage: "/uploads/queue-system-cover.svg",
    overview:
      "A purpose-built public visitor intake and queue orchestration platform. Designed to eliminate physical congestion, the system allows visitors to book registration slots online and enables facility staff to process queues smoothly via automated counter calling.",
    technologies: {
      frontend: ["JavaScript", "HTML5 Audio API", "Real-Time DOM Updates", "Responsive CSS"],
      backend: ["Laravel", "PHP", "Queue Dispatch Logic"],
      database: ["MySQL", "Transaction Locking", "Audit Timestamps"],
      infrastructure: ["Production Web Hosting", "DNS / SSL Setup", "SEO Optimization"],
    },
    features: [
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
    ],
    developmentHighlights: [
      "Engineered race-condition prevention during peak registration hours using atomic database transactions.",
      "Deployed and configured application on production web hosting with custom DNS routing and HTTPS encryption.",
      "Implemented structured JSON-LD and meta tags for search engines so local visitors easily find the registration portal.",
    ],
  },
  {
    id: "demo-lpk",
    slug: "demo-lpk",
    number: "04",
    title: "Demo LPK",
    subtitle: "Vocational Training Center Web Platform",
    period: "2026",
    role: "Full Stack Developer",
    category: "WEB",
    tools: "Laravel, PHP, MySQL, Tailwind CSS, Blade",
    projectUrl: "https://demo-lpk.vercel.app",
    githubUrl: "https://github.com/ubaidlah773/demo-lpk",
    tags: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "Web Development"],
    description:
      "Web platform developed for vocational training centers (LPK) featuring course management, participant registration, and program schedules.",
    highlights: [
      "Multi-discipline vocational training course catalog",
      "Online participant intake and registration workflows",
      "Instructor and classroom scheduling management",
      "Responsive interface optimized for desktop and mobile devices",
    ],
    mockupType: "demo-lpk",
    badgeText: "Vocational Platform",
    coverImage: "/uploads/demo-lpk-cover.svg",
    overview:
      "Demo LPK is a dedicated web platform tailored for vocational training institutions. It enables administrators to manage training programs, coordinate instructor timetables, and process prospective student applications online.",
    technologies: {
      frontend: ["JavaScript", "Blade Templates", "Tailwind CSS"],
      backend: ["Laravel", "PHP", "MVC Architecture"],
      database: ["MySQL", "Relational Database Design"],
      infrastructure: ["Web Hosting", "Git"],
    },
    features: [
      {
        title: "Course Catalog Management",
        description:
          "Structured repository of vocational courses, certifications, and syllabus outlines for prospective trainees.",
      },
      {
        title: "Participant Registration Intake",
        description:
          "Online admission forms with applicant data validation and registration status tracking.",
      },
      {
        title: "Training Schedule Coordinator",
        description:
          "Calendar and time-slot scheduling for classrooms, batches, and vocational instructors.",
      },
    ],
    developmentHighlights: [
      "Implemented relational schema connecting training batches, modules, and registered participants in MySQL.",
      "Engineered responsive forms with validation and structured administrative oversight.",
    ],
  },
  {
    id: "demo-umroh",
    slug: "demo-umroh",
    number: "05",
    title: "Demo Umroh",
    subtitle: "Travel & Pilgrimage Package Portal",
    period: "2026",
    role: "Full Stack Developer",
    category: "WEB",
    tools: "Laravel, PHP, MySQL, Tailwind CSS, Responsive Web Design",
    projectUrl: "https://demo-umroh.vercel.app",
    githubUrl: "https://github.com/ubaidlah773/demo-umroh",
    tags: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "Booking Management"],
    description:
      "Comprehensive travel and Umroh booking platform featuring package catalog, departure schedule management, and online consultation.",
    highlights: [
      "Tiered Umroh and Hajj travel package catalog",
      "Scheduled departure calendar with seat capacity tracking",
      "Online consultation and direct lead inquiry integration",
      "Mobile-first responsive presentation for prospective pilgrims",
    ],
    mockupType: "demo-umroh",
    badgeText: "Travel & Pilgrimage Portal",
    coverImage: "/uploads/demo-umroh-cover.svg",
    overview:
      "Demo Umroh is an informational and booking management platform designed for travel agencies specializing in Umroh and Hajj pilgrimages. It provides clear itineraries, pricing tiers, and direct consultation channels.",
    technologies: {
      frontend: ["JavaScript", "Blade Templates", "Tailwind CSS", "Mobile-First Design"],
      backend: ["Laravel", "PHP"],
      database: ["MySQL", "Relational Models"],
      infrastructure: ["Vercel / Cloud Deployment", "Git"],
    },
    features: [
      {
        title: "Package Comparison & Detail View",
        description:
          "Detailed day-by-day itineraries, hotel accommodations, airline info, and pricing tiers.",
      },
      {
        title: "Departure Schedule Management",
        description:
          "Live tracking of available slots and dates for upcoming pilgrimage departure batches.",
      },
      {
        title: "Consultation Request Workflow",
        description:
          "Direct booking and inquiry system connecting prospective pilgrims with travel consultants.",
      },
    ],
    developmentHighlights: [
      "Designed high-trust visual hierarchy with clear typography and package disclosures.",
      "Optimized page load speed and asset delivery for high mobile conversion.",
    ],
  },
  {
    id: "coffee-shop",
    slug: "coffee-shop",
    number: "06",
    title: "Coffee Shop",
    subtitle: "Modern Café & Ordering Experience",
    period: "2025",
    role: "Frontend Developer & Web Designer",
    category: "WEB",
    tools: "HTML, CSS, JavaScript, Web Design, Responsive UI",
    projectUrl: "",
    githubUrl: "https://github.com/ubaidlah773/coffee-shop",
    tags: ["HTML", "CSS", "JavaScript", "Web Design", "Responsive UI"],
    description:
      "Modern, responsive coffee shop website engineered with semantic HTML, modern CSS styling, and interactive JavaScript features.",
    highlights: [
      "Interactive beverage and culinary menu catalog",
      "Modern aesthetic layout with high-impact visual presentation",
      "Dynamic JavaScript cart and order summary calculation",
      "Fluid responsive layout tested across mobile, tablet, and desktop",
    ],
    mockupType: "coffee-shop",
    badgeText: "Web Design & Dev",
    coverImage: "/uploads/coffee-shop-cover.svg",
    overview:
      "A modern web design and frontend implementation for an artisan coffee shop. Focused on exceptional visual presentation, intuitive navigation, and responsive layouts that showcase coffee offerings and café ambiance.",
    technologies: {
      frontend: ["HTML5", "CSS3", "JavaScript (ES6)", "Flexbox & Grid"],
      backend: ["Static Web Architecture"],
      database: ["Client-Side Storage"],
      infrastructure: ["Git", "GitHub Pages / Vercel"],
    },
    features: [
      {
        title: "Artisan Menu & Filtering",
        description:
          "Organized categories for espresso drinks, manual brews, teas, and pastries.",
      },
      {
        title: "Interactive Cart & Order Summary",
        description:
          "Dynamic order calculations using vanilla JavaScript with local state handling.",
      },
      {
        title: "Atmospheric Brand Storytelling",
        description:
          "Engaging visual narrative highlighting bean origins, roasting techniques, and ambiance.",
      },
    ],
    developmentHighlights: [
      "Structured semantic HTML5 elements adhering to accessibility and SEO best practices.",
      "Crafted custom CSS animations and responsive breakpoints without relying on heavy external libraries.",
    ],
  },
  {
    id: "agent-properti",
    slug: "agent-properti",
    number: "07",
    title: "Agent Properti",
    subtitle: "Property Agent Website",
    period: "2026",
    role: "Full Stack Developer",
    category: "WEB",
    tools: "Web Development, UI/UX, Responsive Design",
    projectUrl: "",
    githubUrl: "",
    tags: ["Web Development", "UI/UX", "Responsive Design"],
    description:
      "Website profesional untuk agen properti dengan fokus pada presentation listing, informasi properti, dan pengalaman pengguna yang mudah digunakan.",
    highlights: [
      "Presentation listing properti dengan tampilan visual modern",
      "Penyajian detail spesifikasi unit dan fasilitas secara terstruktur",
      "Pengalaman pengguna yang intuitif dan mudah dinavigasi",
      "Tata letak responsif untuk kenyamanan akses di seluruh perangkat",
    ],
    mockupType: "agent-properti",
    badgeText: "Property Agent Website",
    coverImage: "/uploads/agent-properti-cover.svg",
    overview:
      "Website profesional untuk agen properti dengan fokus pada presentation listing, informasi properti, dan pengalaman pengguna yang mudah digunakan.",
    technologies: {
      frontend: ["Web Development", "UI/UX", "Responsive Design"],
      backend: ["Web Architecture"],
      database: ["Structured Property Data"],
      infrastructure: ["Web Hosting"],
    },
    features: [
      {
        title: "Presentation Listing Properti",
        description:
          "Katalog listing properti yang tertata dengan rapi, informatif, dan memudahkan pengunjung menemukan unit yang dicari.",
      },
      {
        title: "Informasi Detail Properti",
        description:
          "Penyajian spesifikasi properti, fasilitas, lokasi, dan galeri visual yang lengkap.",
      },
      {
        title: "Pengalaman Pengguna Responsif",
        description:
          "Aksesibilitas dan navigasi yang dioptimalkan untuk kenyamanan penjelajahan di perangkat mobile maupun desktop.",
      },
    ],
    developmentHighlights: [
      "Penerapan prinsip UI/UX untuk pengalaman browsing properti yang lancar dan ramah pengguna.",
      "Struktur layout responsif yang adaptif terhadap berbagai resolusi layar.",
    ],
  },
  {
    id: "undangan-online",
    slug: "undangan-online",
    number: "08",
    title: "Undangan Online",
    subtitle: "Wedding Invitation Website",
    period: "2026",
    role: "Full Stack Developer",
    category: "WEB",
    tools: "HTML, CSS, JavaScript, Responsive Design, Animation",
    projectUrl: "",
    githubUrl: "",
    tags: ["HTML", "CSS", "JavaScript", "Responsive Design", "Animation"],
    description:
      "Website undangan pernikahan interaktif dengan visual storytelling, animasi pembukaan, galeri, informasi acara, dan desain yang dapat disesuaikan dengan tema pernikahan.",
    highlights: [
      "Visual storytelling dengan animasi pembukaan interaktif",
      "Galeri foto momen spesial dan informasi detail acara",
      "Desain adaptif dan customizable sesuai tema pernikahan",
      "Implementasi interaktivitas berbasis JavaScript dan CSS animation",
    ],
    mockupType: "undangan-online",
    badgeText: "Wedding Invitation Website",
    coverImage: "/uploads/undangan-online-cover.svg",
    overview:
      "Website undangan pernikahan interaktif dengan visual storytelling, animasi pembukaan, galeri, informasi acara, dan desain yang dapat disesuaikan dengan tema pernikahan.",
    technologies: {
      frontend: ["HTML", "CSS", "JavaScript", "Responsive Design", "Animation"],
      backend: ["Static Web Architecture"],
      database: ["Client State Handling"],
      infrastructure: ["Web Hosting"],
    },
    features: [
      {
        title: "Animasi Pembukaan & Visual Storytelling",
        description:
          "Pengalaman sambutan interaktif dengan transisi animasi pembuka undangan yang berkesan.",
      },
      {
        title: "Galeri Foto & Momen Acara",
        description:
          "Penampilan galeri foto berkualitas tinggi yang terintegrasi dengan layout elegan.",
      },
      {
        title: "Informasi Acara & Rute Lokasi",
        description:
          "Penyampaian tanggal, waktu akad & resepsi, serta panduan lokasi acara yang jelas bagi tamu undangan.",
      },
    ],
    developmentHighlights: [
      "Penerapan animasi transisi CSS dan interaktivitas JavaScript yang halus tanpa memberatkan performa.",
      "Desain responsif yang memastikan kenyamanan tamu saat membuka undangan di perangkat ponsel.",
    ],
  },
];

export const experienceData: ExperienceItem[] = [
  {
    id: "belajar-cerdas-exp",
    company: "Belajar Cerdas",
    role: "Web Developer — Freelance",
    period: "Mar 2026 – Jun 2026",
    location: "Remote / Indonesia",
    type: "Freelance",
    responsibilities: [
      "Developed interconnected dashboards for students, teachers, school principals, parents, and foundations within the Belajar Cerdas platform.",
      "Implemented a lesson scheduling system tailored to the workflows of each user role.",
      "Built an event calendar to support school activities and academic management.",
      "Designed responsive and interactive user interfaces to enhance accessibility across devices.",
    ],
    techStack: ["Laravel", "MySQL", "JavaScript", "Blade", "Tailwind CSS"],
  },
  {
    id: "lapas-tuban-exp",
    company: "Lembaga Pemasyarakatan Kelas IIB Tuban",
    role: "Facilities Manager Intern — Web Development Focus",
    period: "Nov 2025 – May 2026",
    location: "Tuban, Indonesia",
    type: "Internship",
    responsibilities: [
      "Developed and maintained the official Lapas Tuban website as a public information and transparency portal.",
      "Built internal administrative systems including digital payroll, clinic patient records, and Satbang administration to improve data management efficiency.",
      "Implemented database-driven CRUD operations using Laravel and MySQL.",
      "Performed routine system maintenance, security enhancements, and performance optimizations.",
    ],
    techStack: ["Laravel", "MySQL", "JavaScript", "HTML/CSS", "SEO", "System Administration"],
  },
  {
    id: "kelas-pintar-exp",
    company: "Kelas Pintar",
    role: "Freelance Question Tagging",
    period: "Sep 2025 – Jan 2026",
    location: "Remote / Indonesia",
    type: "Freelance",
    responsibilities: [
      "Reviewed, validated, and classified educational questions based on curriculum standards.",
      "Tagged question metadata (difficulty level, subject, learning topics) to improve search accuracy within the question bank.",
      "Maintained high data quality and accuracy across thousands of educational items.",
    ],
    techStack: ["Educational Data Classification", "Metadata Tagging", "Quality Assurance"],
  },
  {
    id: "surya-hijau-exp",
    company: "PT. Surya Hijau Manfaat Publisher",
    role: "Data Engineer & Article Reviewer",
    period: "Aug 2024 – Jan 2025",
    location: "Indonesia",
    type: "Contract",
    responsibilities: [
      "Reviewed and evaluated scientific articles and research publications for technical and structural accuracy.",
      "Managed and organized publication datasets, metadata, and indexing systems.",
      "Assisted in the peer review and editorial workflow for academic journals.",
    ],
    techStack: ["Data Engineering", "Dataset Management", "Academic Indexing", "Technical Review"],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    category: "Development",
    description: "Core languages, frameworks, relational databases, and architectural standards.",
    skills: [
      { name: "HTML", tag: "Markup" },
      { name: "CSS", tag: "Styling" },
      { name: "JavaScript", tag: "Full Stack" },
      { name: "Python", tag: "Data & ML" },
      { name: "C++", tag: "Systems" },
      { name: "Laravel", tag: "PHP Framework" },
      { name: "Node.js", tag: "Server Runtime" },
      { name: "Express.js", tag: "Backend Framework" },
      { name: "MySQL", tag: "Relational RDBMS" },
      { name: "SQLite", tag: "Embedded DB" },
      { name: "Git", tag: "Version Control" },
      { name: "GitHub", tag: "Code Repository" },
      { name: "REST API", tag: "System Integration" },
      { name: "CRUD", tag: "Data Operations" },
      { name: "SEO", tag: "Search Visibility" },
      { name: "Responsive Web Design", tag: "Adaptive Layouts" },
    ],
  },
  {
    category: "Design",
    description: "UI and visual design capabilities grounded in verified web design experience.",
    skills: [
      { name: "UI Design", tag: "Interface Craft" },
      { name: "Responsive Web Design", tag: "Mobile First" },
      { name: "Figma", tag: "UI/UX Prototyping" },
      { name: "Canva", tag: "Visual Assets" },
      { name: "Website Layout", tag: "Structure & Grid" },
      { name: "Visual Design", tag: "Aesthetics & Hierarchy" },
    ],
  },
  {
    category: "Soft Skills",
    description: "Professional interpersonal, analytical, and collaborative execution competencies.",
    skills: [
      { name: "Problem Solving", tag: "Analytical" },
      { name: "Communication", tag: "Interpersonal" },
      { name: "Team Collaboration", tag: "Teamwork" },
      { name: "Attention to Detail", tag: "Precision" },
      { name: "Adaptability", tag: "Agility" },
      { name: "Time Management", tag: "Execution" },
      { name: "Continuous Learning", tag: "Growth Mindset" },
    ],
  },
];

export const educationData: EducationItem[] = [
  {
    id: "unnes",
    institution: "Universitas Negeri Semarang",
    degree: "Bachelor of Informatics",
    period: "Aug 2021 – Jul 2025",
    gradeLabel: "GPA",
    gradeValue: "3.80 / 4.00",
    achievements: [
      "Finalist, DIMAS-TI Data Mining Competition 2023",
      "Published 7 research articles on machine learning applications",
    ],
    coursework: [
      "Artificial Intelligence",
      "Data Analysis",
      "Research Methodology",
      "Information Technology Research",
    ],
  },
  {
    id: "revou",
    institution: "RevoU Tech Academy",
    degree: "Data Analyst & Software Engineer",
    period: "Aug 2023 – Dec 2023",
    gradeLabel: "Final Score",
    gradeValue: "92 / 100",
    competencies: [
      "Data Analytics & Cleaning",
      "Software Engineering (Frontend & Backend)",
      "MySQL Relational Modeling",
      "Data Visualization & Dashboards",
    ],
  },
];
