const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

function createSvg(title, subtitle, tag, color) {
  let gridLines = '';
  for (let i = 0; i < 30; i++) {
    gridLines += `<line x1="${i * 40}" y1="0" x2="${i * 40}" y2="800"/>\n`;
  }
  for (let i = 0; i < 20; i++) {
    gridLines += `<line x1="0" y1="${i * 40}" x2="1200" y2="${i * 40}"/>\n`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
    <defs>
      <linearGradient id="bg-${tag.replace(/[^a-zA-Z0-9]/g, '')}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#080B12"/>
        <stop offset="100%" stop-color="#121826"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="800" fill="url(#bg-${tag.replace(/[^a-zA-Z0-9]/g, '')})"/>
    <g stroke="rgba(255,255,255,0.03)" stroke-width="1">
      ${gridLines}
    </g>
    <!-- Window Frame -->
    <rect x="60" y="60" width="1080" height="680" rx="16" fill="#0E131F" stroke="rgba(255,255,255,0.08)" stroke-width="2"/>
    <!-- Title bar -->
    <rect x="60" y="60" width="1080" height="52" rx="16" fill="#141B2B"/>
    <circle cx="95" cy="86" r="6" fill="#EF4444"/>
    <circle cx="115" cy="86" r="6" fill="#F59E0B"/>
    <circle cx="135" cy="86" r="6" fill="#10B981"/>
    <rect x="165" y="74" width="460" height="24" rx="6" fill="#090D17" stroke="rgba(255,255,255,0.06)"/>
    <text x="180" y="90" fill="#64748B" font-family="monospace" font-size="12">system-dashboard • ${title}</text>
    
    <!-- Header Banner -->
    <rect x="90" y="140" width="1020" height="110" rx="12" fill="#131A29" stroke="rgba(255,255,255,0.06)"/>
    <text x="120" y="185" fill="#F8FAFC" font-family="sans-serif" font-weight="bold" font-size="28">${title}</text>
    <text x="120" y="220" fill="#94A3B8" font-family="sans-serif" font-size="15">${subtitle}</text>
    <rect x="940" y="165" width="140" height="34" rx="8" fill="rgba(59,130,246,0.15)" stroke="rgba(59,130,246,0.3)"/>
    <text x="1010" y="187" fill="#38BDF8" font-family="monospace" font-size="12" text-anchor="middle" font-weight="bold">${tag}</text>

    <!-- Left Content Table -->
    <rect x="90" y="275" width="670" height="430" rx="12" fill="#131A29" stroke="rgba(255,255,255,0.06)"/>
    <rect x="120" y="305" width="610" height="44" rx="8" fill="#182236"/>
    <text x="140" y="332" fill="${color}" font-family="monospace" font-size="13" font-weight="bold">&gt; Active Module: ${title}</text>
    <rect x="120" y="365" width="610" height="70" rx="8" fill="#0C101A" stroke="rgba(255,255,255,0.04)"/>
    <text x="140" y="405" fill="#E2E8F0" font-family="sans-serif" font-size="14">Record Set 01: Normalized Relational Schema Verified</text>
    <rect x="120" y="450" width="610" height="70" rx="8" fill="#0C101A" stroke="rgba(255,255,255,0.04)"/>
    <text x="140" y="490" fill="#E2E8F0" font-family="sans-serif" font-size="14">Record Set 02: Multi-Role Authorization &amp; Policy Guard Active</text>
    <rect x="120" y="535" width="610" height="70" rx="8" fill="#0C101A" stroke="rgba(255,255,255,0.04)"/>
    <text x="140" y="575" fill="#E2E8F0" font-family="sans-serif" font-size="14">Record Set 03: Optimized Database Transaction Committed</text>
    <rect x="120" y="620" width="610" height="65" rx="8" fill="#0C101A" stroke="rgba(255,255,255,0.04)"/>
    <text x="140" y="660" fill="#E2E8F0" font-family="sans-serif" font-size="14">Record Set 04: Real-Time Audit Log Synchronized</text>

    <!-- Right Content Metrics -->
    <rect x="785" y="275" width="325" height="430" rx="12" fill="#131A29" stroke="rgba(255,255,255,0.06)"/>
    <text x="815" y="315" fill="#F8FAFC" font-family="sans-serif" font-weight="bold" font-size="16">Architecture Status</text>
    <rect x="815" y="340" width="265" height="75" rx="8" fill="#182236"/>
    <text x="835" y="370" fill="#94A3B8" font-family="monospace" font-size="11">DATABASE LAYER</text>
    <text x="835" y="395" fill="#38BDF8" font-family="sans-serif" font-weight="bold" font-size="15">MySQL 8.0 • InnoDB</text>
    <rect x="815" y="430" width="265" height="75" rx="8" fill="#182236"/>
    <text x="835" y="460" fill="#94A3B8" font-family="monospace" font-size="11">SECURITY PROTOCOL</text>
    <text x="835" y="485" fill="#10B981" font-family="sans-serif" font-weight="bold" font-size="15">CSRF &amp; RBAC Active</text>
    <rect x="815" y="520" width="265" height="75" rx="8" fill="#182236"/>
    <text x="835" y="550" fill="#94A3B8" font-family="monospace" font-size="11">DEPLOYMENT</text>
    <text x="835" y="575" fill="#F59E0B" font-family="sans-serif" font-weight="bold" font-size="15">Production Hosted</text>
    <rect x="815" y="610" width="265" height="75" rx="8" fill="#182236"/>
    <text x="835" y="640" fill="#94A3B8" font-family="monospace" font-size="11">INDEXED QUERIES</text>
    <text x="835" y="665" fill="#A855F7" font-family="sans-serif" font-weight="bold" font-size="15">Zero N+1 Overhead</text>
  </svg>`;
}

const mockups = [
  { file: 'belajar-cerdas-cover.svg', title: 'Belajar Cerdas Platform', subtitle: 'Integrated School Management Architecture', tag: 'LMS Platform', color: '#3B82F6' },
  { file: 'belajar-cerdas-student.svg', title: 'Student Learning Workspace', subtitle: 'Assignments, Subject Modules & Daily Agenda', tag: 'Role: Student', color: '#10B981' },
  { file: 'belajar-cerdas-teacher.svg', title: 'Teacher Management Console', subtitle: 'Lesson Planning, Grading Matrix & Class Roll', tag: 'Role: Teacher', color: '#F59E0B' },
  { file: 'belajar-cerdas-schedule.svg', title: 'Lesson Scheduling System', subtitle: 'Multi-Role Timetable Matrix & Clash Prevention', tag: 'Schedule Engine', color: '#6366F1' },
  { file: 'belajar-cerdas-calendar.svg', title: 'Academic Event Calendar', subtitle: 'School Examination Dates & Activity Sync', tag: 'Calendar Sync', color: '#EC4899' },
  { file: 'lapas-tuban-cover.svg', title: 'Lapas Tuban Digital Services', subtitle: 'Administrative Digitalization Portal & Intranet', tag: 'Public Sector', color: '#3B82F6' },
  { file: 'lapas-tuban-website.svg', title: 'Official Transparency Portal', subtitle: 'Public Visiting Protocol & Institutional News', tag: 'Public Portal', color: '#38BDF8' },
  { file: 'lapas-tuban-payroll.svg', title: 'Digital Payroll Management', subtitle: 'Disbursement Calculation & Staff Records', tag: 'Payroll System', color: '#10B981' },
  { file: 'lapas-tuban-clinic.svg', title: 'Clinic Patient Data Management', subtitle: 'Medical Checkup Logs & Prescription Inventory', tag: 'Healthcare Logs', color: '#EF4444' },
  { file: 'lapas-tuban-administration.svg', title: 'Satbang Administration System', subtitle: 'Inmate Work Program Compliance & Audit Logs', tag: 'Satbang Admin', color: '#F59E0B' },
  { file: 'queue-system-cover.svg', title: 'Online Visitor Queue Platform', subtitle: 'Automated Counter Calling & Reception Flow', tag: 'Queue Platform', color: '#3B82F6' },
  { file: 'queue-system-calling.svg', title: 'Audio-Visual Queue Calling Desk', subtitle: 'Single-Click Audio Announce & Counter Dispatch', tag: 'Calling Console', color: '#F59E0B' },
  { file: 'queue-system-display.svg', title: 'Live Waiting Hall Monitor', subtitle: 'Real-Time Screen Display for Visitor Lounge', tag: 'Live Display', color: '#10B981' },
  { file: 'queue-system-ticket.svg', title: 'Electronic Registration Ticket', subtitle: 'Online Slot Verification & QR Authentication', tag: 'E-Ticket Service', color: '#6366F1' }
];

mockups.forEach(m => {
  fs.writeFileSync(path.join(uploadsDir, m.file), createSvg(m.title, m.subtitle, m.tag, m.color), 'utf8');
});

console.log('Successfully generated ' + mockups.length + ' mockup documentation images in public/uploads');
