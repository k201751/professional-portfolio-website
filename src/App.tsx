import { useState, useEffect, useRef } from 'react'
import profileImage from '../assets/profile.JPG'

// ── Types ──────────────────────────────────────────────────────────────────────

interface Experience {
  company: string
  role: string
  period: string
  description: string
  highlights: string[]
  tech: string[]
}

interface Project {
  num: string
  name: string
  category: string
  description: string
  highlights: string[]
  tech: string[]
  challenge: string
  status?: 'In Progress'
  repository?: string
}

// ── Data ──────────────────────────────────────────────────────────────────────

const EXPERIENCES: Experience[] = [
  {
    company: 'Hyve Labs',
    role: 'AI Engineer',
    period: 'Feb 2026 — Jul 2026',
    description:
      'Delivered full-stack analytics modernisation, data engineering, and AI automation solutions across cloud platforms and client products.',
    highlights: [
      'Replaced a Power BI reporting suite with a custom Next.js and FastAPI application, improving load times and delivering a more intuitive user experience.',
      'Built Python ETL pipelines that extracted Business Central API data, serialized payloads, and loaded them into BigQuery on GCP for consistent, centralised reporting.',
      'Re-implemented Power BI DAX calculation logic in FastAPI, fully decoupling reporting from the BI platform and reducing estimated licensing costs by 40–60%.',
      'Embedded an in-product user feedback loop to support continuous improvement after launch.',
      'Reworked constrained MoEngage pipelines on Azure Databricks, resolving data inaccuracies and restoring reliable reporting and segmentation workflows.',
      'Scheduled data pipelines for automated daily execution, ensuring consistent and up-to-date data availability.',
      'Developed an AI video generation pipeline for Sobha video ads, automating video composition, narration, and end-to-end ad creation.',
      'Built automated SEO metadata generation tools for DP World and Gallop AI, enriching existing and future articles and streamlining content workflows.',
    ],
    tech: [
      'Python',
      'Next.js',
      'FastAPI',
      'BigQuery',
      'GCP',
      'AWS',
      'Databricks',
      'Azure',
      'LoRA',
      'ChatGPT',
      'Gemini',
    ],
  },
  {
    company: 'InApp Solutions',
    role: 'Junior Software Engineer',
    period: 'Oct 2025 — Feb 2026',
    description:
      'Worked across backend services, frontend development, and AI/data-oriented systems in a product-focused engineering team.',
    highlights: [
      'Migrated the MedfloAI scraper from Django to a dedicated FastAPI microservice, improving performance and separation of concerns.',
      'Contributed to React-based frontend systems — UI components, integrations, and data display layers.',
      'Developed and maintained backend microservices handling API communication, data processing, and service coordination.',
      'Built automation workflows for data extraction pipelines and backend operations.',
    ],
    tech: ['Python', 'FastAPI', 'Django', 'React', 'REST APIs', 'Microservices'],
  },
  {
    company: 'Devoski Systems',
    role: 'Python Developer — Project Based',
    period: 'Jul 2025 — Sep 2025',
    description:
      'Project-based engagement building backend systems and full-stack features for client web applications.',
    highlights: [
      'Worked on a multi-tenant web system, developing backend functionality using Django REST Framework.',
      'Built a QR code generator web application from specification through to deployment.',
      'Worked with React on the frontend and MySQL for relational data persistence.',
      'Used Pandas for data-related processing, transformation, and reporting tasks.',
    ],
    tech: ['Python', 'Django REST', 'React', 'MySQL', 'Pandas'],
  },
]

const PROJECTS: Project[] = [
  {
    num: '01',
    name: 'Global Leads',
    category: 'Lead Intelligence / Data Engineering',
    description:
      'A lead research tool that collected records from several sources and helped the operations team find missing business contact details.',
    highlights: [
      'Collected lead records from a freelance marketplace, Yelp, and Google Business Profile, then cleaned and stored the data with Pandas.',
      'Used DuckDuckGo results to look for matching contact details published on the open web.',
      'Found useful matches for about 20% of masked records during testing and sent uncertain results for manual review.',
      'Built the API in Django REST Framework with JWT login, roles, user management, and password reset.',
      'Built a React and Vite admin portal for uploads, lead review, and role-based access.',
    ],
    tech: ['Python', 'Django REST', 'React', 'MySQL', 'LangChain', 'Pandas'],
    challenge:
      'Search results were often incomplete or unrelated. I added match scores and a review step so weak matches were not treated as confirmed contacts.',
  },
  {
    num: '02',
    name: 'AI Video Generation Pipeline',
    category: 'Generative AI',
    description: 'A pipeline that creates video ads from generated clips, narration, and other assets.',
    highlights: [
      'Connected the generation, narration, and rendering steps',
      'Automated asset preparation and video assembly',
      'Added settings so the workflow could be reused for different ads',
      'Checked outputs before they moved to the next stage',
    ],
    tech: ['Python', 'Generative AI', 'Automation', 'Video Processing'],
    challenge: 'Generated clips were not always usable, so the pipeline needed checks and retry rules.',
  },
  {
    num: '03',
    name: 'Fast Resume',
    category: 'Resume Tool',
    description: 'A resume project built to make creating and updating a resume faster.',
    highlights: [
      'Organised resume content into reusable sections',
      'Focused on a quick editing and update workflow',
      'Published the source code on GitHub',
    ],
    tech: ['Manually Coded'],
    challenge: 'Keeping resume content easy to update without making the layout hard to maintain.',
    repository: 'https://github.com/k201751/fast-resume',
  },
  {
    num: '04',
    name: 'Decentralised Identity Management System',
    category: 'Blockchain / Identity',
    description: 'A university project for storing and retrieving identity records through a MultiChain blockchain.',
    highlights: [
      'Stored identity details and a photo on a blockchain stream',
      'Protected record input with multisignature controls',
      'Built separate Python client and server scripts for adding and retrieving records',
      'Matched a supplied photo before returning identity information',
    ],
    tech: ['Python', 'MultiChain', 'Blockchain', 'Client–Server'],
    challenge: 'Coordinating record storage, photo matching, and access across separate client and server scripts.',
    repository: 'https://github.com/k201751/Decentralised-Identity-Management-System',
  },
  {
    num: '05',
    name: 'Autonomous Ticket Generator',
    category: 'AI Engineering / Automation',
    description: 'A service that turns client feedback into project tickets and sends them to project management tools.',
    highlights: [
      'Built the service with FastAPI and webhooks',
      'Used an LLM to pull ticket details from free-form feedback',
      'Validated the generated JSON with Pydantic',
      'Added templates for different client requirements',
    ],
    tech: ['Python', 'FastAPI', 'LLMs', 'Pydantic', 'Webhooks'],
    challenge: 'Client feedback varies in detail and format, but the output must follow the same schema.',
    status: 'In Progress',
  },
  {
    num: '06',
    name: 'Smart Traffic Monitoring System',
    category: 'Computer Vision / AI',
    description: 'A computer vision system that reads video feeds and reports traffic counts and flow.',
    highlights: [
      'Detecting and tracking vehicles across video frames',
      'Processing live and recorded video',
      'Measuring traffic density and movement',
      'Generating alerts and reports',
    ],
    tech: ['Python', 'OpenCV', 'Computer Vision', 'Machine Learning'],
    challenge: 'The system needs to process video close to real time on a machine without a dedicated GPU.',
    status: 'In Progress',
  },
  {
    num: '07',
    name: 'RideMate',
    category: 'Full Stack Development',
    description: 'A ride-sharing web app for finding people travelling along similar routes.',
    highlights: [
      'Built the application with ASP.NET MVC',
      'Added user accounts and session-based login',
      'Implemented route matching and ride coordination',
      'Stored users, routes, and rides in SQL',
    ],
    tech: ['C#', 'ASP.NET MVC', 'SQL'],
    challenge: 'Routes needed to be compared without checking every possible path between two points.',
    repository: 'https://github.com/k201751/RideMate',
  },
]

const SKILLS: Record<string, string[]> = {
  Languages: ['Python', 'C / C++', 'JavaScript', 'C#', 'Shell', 'Rust', 'HTML', 'CSS'],
  'AI / Machine Learning': [
    'PyTorch',
    'TensorFlow',
    'Keras',
    'Scikit-learn',
    'Computer Vision',
    'LLMs',
    'RAG',
    'LoRA',
    'Fine-tuning',
    'Generative AI',
  ],
  Backend: ['FastAPI', 'Django', 'Flask', 'Node.js', 'REST APIs', 'Microservices'],
  Frontend: ['React', 'Next.js', 'JavaScript', 'HTML', 'CSS'],
  Data: ['Pandas', 'NumPy', 'PostgreSQL', 'MySQL', 'DuckDB'],
  'Infrastructure / Tools': ['Docker', 'Git', 'Linux', 'Ubuntu', 'Jupyter', 'AWS S3'],
}

const SKILL_DESCRIPTIONS: Record<string, string> = {
  Python: 'Primary language for backend, AI/ML, and data engineering.',
  'C / C++': 'Systems programming and performance-critical applications.',
  JavaScript: 'Frontend development and Node.js server-side work.',
  'C#': 'ASP.NET applications and .NET ecosystem development.',
  Shell: 'Scripting, automation, and Linux system administration.',
  Rust: 'Memory-safe systems programming and tooling.',
  HTML: 'Semantic markup and web document structure.',
  CSS: 'Styling, layout, and responsive web design.',
  PyTorch: 'Primary deep learning framework for model training.',
  TensorFlow: 'Large-scale ML model training and deployment.',
  Keras: 'High-level neural network API for rapid prototyping.',
  'Scikit-learn': 'Classical ML algorithms and preprocessing pipelines.',
  'Computer Vision': 'Image processing, detection, and visual AI systems.',
  LLMs: 'Large language model integration, prompting, and orchestration.',
  RAG: 'Retrieval-Augmented Generation for knowledge-grounded AI.',
  LoRA: 'Low-rank adaptation for efficient model fine-tuning.',
  'Fine-tuning': 'Adapting pre-trained models to domain-specific tasks.',
  'Generative AI': 'Image, video, and text generation systems.',
  FastAPI: 'High-performance async Python APIs and microservices.',
  Django: 'Full-featured Python web framework for production apps.',
  Flask: 'Lightweight Python framework for APIs and small services.',
  'Node.js': 'JavaScript runtime for server-side API development.',
  'REST APIs': 'Designing, building, and consuming HTTP services.',
  Microservices: 'Service-oriented architecture and distributed systems.',
  React: 'Component-based UI and single-page applications.',
  'Next.js': 'React framework with SSR, SSG, and full-stack support.',
  Pandas: 'Data manipulation, analysis, and ETL pipelines.',
  NumPy: 'Numerical computing and array operations.',
  PostgreSQL: 'Production-grade relational database with advanced features.',
  MySQL: 'Widely-used relational database for web applications.',
  DuckDB: 'In-process analytical database for fast local data work.',
  Docker: 'Containerization and reproducible environment deployment.',
  Git: 'Version control and collaborative development workflows.',
  Linux: 'Primary development environment; comfortable with CLI and admin.',
  Ubuntu: 'Preferred Linux distribution for development and server use.',
  Jupyter: 'Interactive computing for data exploration and ML prototyping.',
  'AWS S3': 'Cloud object storage for scalable asset and data management.',
}

const PRINCIPLES = [
  {
    num: '01',
    title: 'Understand the problem',
    body: 'Start with the actual business or technical problem rather than immediately reaching for a technology. The right abstraction follows a clear problem definition — not the reverse.',
  },
  {
    num: '02',
    title: 'Build simple systems first',
    body: 'Prefer clear architecture and maintainable code over unnecessary complexity. Complexity should be introduced deliberately, when it solves a specific constraint — not by default.',
  },
  {
    num: '03',
    title: 'Automate repetitive work',
    body: 'Use software, data pipelines, and AI where automation creates measurable value. Manual work that runs daily is a system waiting to be written.',
  },
  {
    num: '04',
    title: 'Keep learning',
    body: 'Continuously explore AI/ML, distributed systems, backend architecture, and engineering practice. The field moves fast — staying current is part of the work.',
  },
]

const CURRENT_FOCUS_ITEMS = [
  'AI Engineering',
  'LLM Applications',
  'RAG Systems',
  'Machine Learning',
  'Computer Vision',
  'Data Engineering',
  'Scalable Backend Systems',
]

// ── Hooks ──────────────────────────────────────────────────────────────────────

function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [threshold])
  return scrolled
}

function useInView(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

// ── Utility Components ─────────────────────────────────────────────────────────

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(20px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-14 md:mb-20">
      <span
        className="font-mono text-[10px] tracking-[0.25em]"
        style={{ color: '#3d3d3d' }}
      >
        {num}
      </span>
      <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
      <span
        className="font-mono text-[10px] tracking-[0.25em] uppercase"
        style={{ color: '#3d3d3d' }}
      >
        {label}
      </span>
    </div>
  )
}

function TechChip({ label }: { label: string }) {
  return (
    <span
      className="font-mono text-[10px] tracking-wider px-2.5 py-1"
      style={{
        color: '#555',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '2px',
      }}
    >
      {label}
    </span>
  )
}

// ── SVG Icons ──────────────────────────────────────────────────────────────────

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      style={{
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.3s ease',
      }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

// ── Technical Visual ───────────────────────────────────────────────────────────

function TechnicalVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center" style={{ minHeight: 380 }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 440 420"
        className="grid-drift"
        style={{ opacity: 0.85 }}
      >
        {/* Background grid */}
        {Array.from({ length: 10 }).map((_, i) => (
          <line
            key={`gv${i}`}
            x1={i * 48}
            y1={0}
            x2={i * 48}
            y2={420}
            stroke="rgba(255,255,255,0.035)"
            strokeWidth="0.5"
          />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line
            key={`gh${i}`}
            x1={0}
            y1={i * 46}
            x2={440}
            y2={i * 46}
            stroke="rgba(255,255,255,0.035)"
            strokeWidth="0.5"
          />
        ))}

        {/* Architecture connection lines */}
        <line x1={88} y1={92} x2={220} y2={168} stroke="rgba(56,189,248,0.18)" strokeWidth="1" />
        <line x1={220} y1={168} x2={352} y2={104} stroke="rgba(56,189,248,0.18)" strokeWidth="1" />
        <line
          x1={220}
          y1={168}
          x2={164}
          y2={296}
          stroke="rgba(56,189,248,0.12)"
          strokeWidth="1"
          strokeDasharray="6 5"
          className="animated-dash"
        />
        <line
          x1={164}
          y1={296}
          x2={300}
          y2={332}
          stroke="rgba(56,189,248,0.1)"
          strokeWidth="1"
          strokeDasharray="6 5"
          className="animated-dash"
        />
        <line x1={352} y1={104} x2={300} y2={332} stroke="rgba(56,189,248,0.08)" strokeWidth="1" />
        <line
          x1={88}
          y1={92}
          x2={164}
          y2={296}
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="0.5"
          strokeDasharray="3 6"
        />

        {/* Nodes */}
        {([
          [88, 92, false],
          [220, 168, true],
          [352, 104, false],
          [164, 296, false],
          [300, 332, false],
        ] as [number, number, boolean][]).map(([cx, cy, primary], i) => (
          <g key={i}>
            {primary && (
              <>
                <circle cx={cx} cy={cy} r={20} fill="rgba(56,189,248,0.04)" />
                <circle cx={cx} cy={cy} r={12} fill="rgba(56,189,248,0.06)" stroke="rgba(56,189,248,0.2)" strokeWidth="0.5" />
              </>
            )}
            <circle
              cx={cx}
              cy={cy}
              r={primary ? 4 : 3}
              fill={primary ? '#38bdf8' : 'rgba(56,189,248,0.6)'}
            />
            {!primary && (
              <circle
                cx={cx}
                cy={cy}
                r={7}
                fill="none"
                stroke="rgba(56,189,248,0.2)"
                strokeWidth="0.5"
              />
            )}
          </g>
        ))}

        {/* Corner brackets */}
        <path d="M 16 16 L 16 8 L 8 8" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.75" />
        <path d="M 424 16 L 424 8 L 432 8" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.75" />
        <path d="M 16 404 L 16 412 L 8 412" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.75" />
        <path d="M 424 404 L 424 412 L 432 412" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.75" />

        {/* Metadata labels */}
        <text
          x={220}
          y={410}
          textAnchor="middle"
          fill="rgba(255,255,255,0.1)"
          fontSize="8"
          fontFamily="JetBrains Mono, monospace"
          letterSpacing="0.18em"
        >
          SYSTEM GRAPH — v2.1
        </text>
        <text
          x={88}
          y={82}
          textAnchor="middle"
          fill="rgba(56,189,248,0.35)"
          fontSize="7"
          fontFamily="JetBrains Mono, monospace"
          letterSpacing="0.1em"
        >
          INPUT
        </text>
        <text
          x={220}
          y={155}
          textAnchor="middle"
          fill="rgba(56,189,248,0.5)"
          fontSize="7"
          fontFamily="JetBrains Mono, monospace"
          letterSpacing="0.1em"
        >
          CORE
        </text>
        <text
          x={352}
          y={94}
          textAnchor="middle"
          fill="rgba(56,189,248,0.35)"
          fontSize="7"
          fontFamily="JetBrains Mono, monospace"
          letterSpacing="0.1em"
        >
          MODEL
        </text>
      </svg>
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(56,189,248,0.04) 0%, transparent 65%)',
        }}
      />
    </div>
  )
}

// ── Navbar ──────────────────────────────────────────────────────────────────────

function Navbar() {
  const scrolled = useScrolled()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { label: 'Profile', href: '#profile' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(11,11,11,0.94)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-[60px]">
          {/* Logo */}
          <a href="#hero" className="group">
            <div
              className="text-[13px] font-semibold tracking-[0.18em] uppercase"
              style={{ color: '#e8e4de' }}
            >
              Ali Naeem
            </div>
            <div
              className="font-mono text-[8px] tracking-[0.22em] uppercase mt-0.5"
              style={{ color: '#3a3a3a' }}
            >
              Software Engineer
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="font-mono text-[10px] tracking-[0.18em] uppercase transition-colors duration-200"
                style={{ color: '#555' }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#e8e4de')}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#555')}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-5">
            <a
              href="https://github.com/k201751"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{ color: '#444' }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#e8e4de')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#444')}
            >
              <GithubIcon />
            </a>
            <a
              href="https://linkedin.com/in/aliiinaeem"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{ color: '#444' }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#e8e4de')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#444')}
            >
              <LinkedinIcon />
            </a>
            <a
              href="#contact"
              className="font-mono text-[9px] tracking-[0.18em] uppercase px-4 py-2 transition-all duration-200"
              style={{
                color: '#888',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.color = '#38bdf8'
                el.style.borderColor = 'rgba(56,189,248,0.4)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.color = '#888'
                el.style.borderColor = 'rgba(255,255,255,0.1)'
              }}
            >
              Resume
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden transition-colors duration-200"
            style={{ color: '#666' }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        style={{
          maxHeight: menuOpen ? '400px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.35s ease',
          borderBottom: menuOpen ? '1px solid rgba(255,255,255,0.05)' : 'none',
          background: '#0b0b0b',
        }}
      >
        <div className="md:hidden px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-mono text-[10px] tracking-[0.2em] uppercase"
              style={{ color: '#666' }}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <div className="flex items-center gap-5 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <a href="https://github.com/k201751" target="_blank" rel="noopener noreferrer" style={{ color: '#444' }}>
              <GithubIcon />
            </a>
            <a href="https://linkedin.com/in/aliiinaeem" target="_blank" rel="noopener noreferrer" style={{ color: '#444' }}>
              <LinkedinIcon />
            </a>
            <a
              href="#contact"
              className="font-mono text-[9px] tracking-[0.15em] uppercase px-4 py-2"
              style={{ color: '#888', border: '1px solid rgba(255,255,255,0.1)' }}
              onClick={() => setMenuOpen(false)}
            >
              Resume
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

// ── Hero ───────────────────────────────────────────────────────────────────────

function HireNotification() {
  return (
    <a
      href="#contact"
      aria-label="Available for hire — go to contact section"
      className="fixed right-4 bottom-4 sm:right-7 sm:bottom-7 z-40 group"
      style={{ animation: 'hire-notification-in 0.65s ease 1s both' }}
    >
      <div
        className="relative flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-3.5 overflow-hidden"
        style={{
          background: 'rgba(12, 24, 30, 0.96)',
          border: '1px solid rgba(56,189,248,0.5)',
          boxShadow: '0 14px 45px rgba(0,0,0,0.5), 0 0 28px rgba(56,189,248,0.1)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <span className="relative flex h-3 w-3 flex-shrink-0">
          <span className="absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-60" style={{ animation: 'hire-status-ping 2s ease-out infinite' }} />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-sky-400" />
        </span>
        <div>
          <div className="font-mono text-[8px] tracking-[0.22em] uppercase mb-0.5" style={{ color: '#647b86' }}>
            Current status
          </div>
          <div className="text-[12px] sm:text-[13px] font-semibold tracking-[0.08em] uppercase" style={{ color: '#e8e4de' }}>
            Available for Hire
          </div>
        </div>
        <ArrowIcon />
      </div>
    </a>
  )
}

function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-24 pb-20"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 lg:gap-24 items-center">
          {/* Left content */}
          <div>
            <div
              className="font-mono text-[10px] tracking-[0.3em] uppercase mb-8"
              style={{
                color: '#38bdf8',
                animation: 'fadeSlideUp 0.8s ease 0.1s both',
              }}
            >
              Professional Profile
            </div>

            <h1
              className="text-[2.6rem] sm:text-[3.2rem] lg:text-[3.8rem] font-semibold leading-[1.08] tracking-[-0.02em] mb-6"
              style={{
                color: '#e8e4de',
                animation: 'fadeSlideUp 0.8s ease 0.25s both',
              }}
            >
              Software Engineer building intelligent,
              <br className="hidden sm:block" />
              <span style={{ color: '#6b6b6b' }}> reliable systems.</span>
            </h1>

            <p
              className="text-base leading-relaxed max-w-[560px] mb-10"
              style={{
                color: '#6b6b6b',
                animation: 'fadeSlideUp 0.8s ease 0.4s both',
              }}
            >
              Software engineer with experience across backend development, AI/ML systems, data
              pipelines, and modern web applications. I enjoy turning complex technical problems into
              practical, scalable software.
            </p>

            {/* Metadata row */}
            <div
              className="flex flex-wrap gap-x-6 gap-y-3 mb-12"
              style={{ animation: 'fadeSlideUp 0.8s ease 0.55s both' }}
            >
              {[
                { label: 'Based in Karachi, Pakistan' },
                { label: 'Open to Software Engineering / AI / Data roles' },
                { label: 'Available for opportunities' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: '#38bdf8', animation: 'pulse-dot 2.5s ease infinite' }}
                  />
                  <span className="font-mono text-[11px] tracking-wider" style={{ color: '#555' }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div
              className="flex flex-wrap gap-4"
              style={{ animation: 'fadeSlideUp 0.8s ease 0.7s both' }}
            >
              <a
                href="#experience"
                className="group flex items-center gap-2 px-7 py-3.5 text-[12px] font-mono tracking-[0.15em] uppercase font-medium transition-all duration-200"
                style={{
                  background: '#e8e4de',
                  color: '#0b0b0b',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = '#fff'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = '#e8e4de'
                }}
              >
                View Experience
                <ArrowIcon />
              </a>
              <a
                href="#projects"
                className="flex items-center gap-2 px-7 py-3.5 text-[12px] font-mono tracking-[0.15em] uppercase transition-all duration-200"
                style={{
                  color: '#888',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.color = '#e8e4de'
                  el.style.borderColor = 'rgba(255,255,255,0.2)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.color = '#888'
                  el.style.borderColor = 'rgba(255,255,255,0.1)'
                }}
              >
                Explore Projects
              </a>
            </div>
          </div>

          {/* Right: profile portrait */}
          <div
            className="relative w-full max-w-[420px] mx-auto lg:mx-0"
            style={{
              animation: 'fadeSlideUp 0.9s ease 0.4s both',
              border: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-[#111]">
              <img
                src={profileImage}
                alt="Ali Naeem, Software Engineer"
                className="h-full w-full object-cover object-center"
                style={{ filter: 'saturate(0.7) contrast(1.05) brightness(0.82)' }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(11,11,11,0.03) 45%, rgba(11,11,11,0.82) 100%)',
                }}
              />
              <div className="absolute left-5 right-5 bottom-5 flex items-end justify-between gap-4">
                <div>
                  <div className="font-mono text-[9px] tracking-[0.24em] uppercase mb-1" style={{ color: '#38bdf8' }}>
                    Software Engineer
                  </div>
                  <div className="text-lg font-semibold tracking-[-0.02em]" style={{ color: '#e8e4de' }}>
                    Ali Naeem
                  </div>
                </div>
                <div className="flex items-center gap-2 pb-1">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#38bdf8', animation: 'pulse-dot 2.5s ease infinite' }} />
                  <span className="font-mono text-[8px] tracking-[0.18em] uppercase" style={{ color: '#8a8a8a' }}>
                    Available
                  </span>
                </div>
              </div>
              <span className="absolute top-4 left-4 w-6 h-6 border-l border-t border-sky-400/50" />
              <span className="absolute top-4 right-4 w-6 h-6 border-r border-t border-sky-400/50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Stats ──────────────────────────────────────────────────────────────────────

function Stats() {
  const stats = [
    { value: '01+', label: 'Years professional experience' },
    { value: '05+', label: 'Production projects shipped' },
    { value: '04+', label: 'Programming languages' },
    { value: 'AI / ML', label: 'Primary specialization' },
  ]

  return (
    <section style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 80}
              className="py-12 px-0"
            >
              <div
                style={{
                  borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  paddingRight: '2rem',
                  paddingLeft: i === 0 ? '0' : '2rem',
                }}
              >
                <div
                  className="font-mono text-3xl font-light mb-2 tracking-tight"
                  style={{ color: '#e8e4de' }}
                >
                  {s.value}
                </div>
                <div className="font-mono text-[11px] tracking-wider" style={{ color: '#444' }}>
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── About ──────────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="profile" className="py-24 lg:py-32" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <SectionLabel num="01" label="Profile" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 lg:gap-24">
          {/* Left: bio */}
          <div>
            <Reveal>
              <h2
                className="text-[1.9rem] lg:text-[2.4rem] font-semibold tracking-[-0.02em] leading-[1.15] mb-8"
                style={{ color: '#e8e4de' }}
              >
                Engineering across software,
                <br />
                data, and AI.
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <div className="space-y-4 text-[15px] leading-[1.8]" style={{ color: '#6b6b6b' }}>
                <p>
                  I have a background in cybersecurity and software engineering, having studied at
                  FAST–NUCES and built production systems across backend engineering, AI/ML pipelines,
                  data infrastructure, and web applications during my early career.
                </p>
                <p>
                  My work spans REST API development, microservice architecture, computer vision
                  systems, generative AI pipelines, automation workflows, and data engineering —
                  typically in Python-first environments, with experience in React-based frontends and
                  ASP.NET applications.
                </p>
                <p>
                  The goal: build reliable, maintainable software while developing deeper expertise in
                  AI engineering and machine learning systems — bridging the gap between ML research
                  and production-grade deployment.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right: info panel */}
          <Reveal delay={150}>
            <div
              className="p-8 space-y-8"
              style={{
                background: '#111111',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {[
                {
                  heading: 'Education',
                  lines: [
                    'BS Cybersecurity',
                    'FAST – National University of Computer',
                    'and Emerging Sciences',
                    '2020 – 2024',
                  ],
                },
                {
                  heading: 'Location',
                  lines: ['Karachi, Pakistan'],
                },
                {
                  heading: 'Focus',
                  lines: [
                    'AI Engineering',
                    'Software Engineering',
                    'Data Engineering',
                  ],
                },
              ].map((block) => (
                <div key={block.heading}>
                  <div
                    className="font-mono text-[9px] tracking-[0.25em] uppercase mb-3"
                    style={{ color: '#38bdf8' }}
                  >
                    {block.heading}
                  </div>
                  {block.lines.map((line, i) => (
                    <div
                      key={i}
                      className="text-[13px] leading-[1.9]"
                      style={{ color: i === 0 ? '#c8c4be' : '#555' }}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ── Experience ─────────────────────────────────────────────────────────────────

function ExperienceItem({ exp, isLast }: { exp: Experience; isLast: boolean }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6 lg:gap-16">
      {/* Left: period + company */}
      <div className="pt-1">
        <div className="font-mono text-[10px] tracking-[0.15em] mb-1" style={{ color: '#38bdf8' }}>
          {exp.period}
        </div>
        <div className="font-semibold text-[13px] tracking-wide" style={{ color: '#888' }}>
          {exp.company}
        </div>
      </div>

      {/* Right: content */}
      <div
        className="pb-12"
        style={{ borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <h3 className="text-[1.15rem] font-semibold tracking-[-0.01em]" style={{ color: '#e8e4de' }}>
            {exp.role}
          </h3>
        </div>

        <p className="text-[14px] leading-relaxed mb-6" style={{ color: '#5a5a5a' }}>
          {exp.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {exp.tech.map((t) => (
            <TechChip key={t} label={t} />
          ))}
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] uppercase transition-colors duration-200"
          style={{ color: expanded ? '#38bdf8' : '#444' }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#38bdf8')}
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.color = expanded ? '#38bdf8' : '#444')
          }
        >
          {expanded ? 'Less detail' : 'View details'}
          <ChevronIcon open={expanded} />
        </button>

        {/* Expanded highlights */}
        <div
          style={{
            maxHeight: expanded ? '400px' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.4s ease',
          }}
        >
          <ul className="mt-6 space-y-3">
            {exp.highlights.map((h, i) => (
              <li key={i} className="flex gap-3 text-[13px] leading-relaxed" style={{ color: '#5a5a5a' }}>
                <span className="font-mono text-[10px] mt-0.5 flex-shrink-0" style={{ color: '#38bdf8' }}>
                  →
                </span>
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function Experience() {
  return (
    <section id="experience" className="py-24 lg:py-32" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <SectionLabel num="02" label="Experience" />
        <div className="space-y-0">
          {EXPERIENCES.map((exp, i) => (
            <Reveal key={exp.company} delay={i * 100}>
              <ExperienceItem exp={exp} isLast={i === EXPERIENCES.length - 1} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Project Modal ──────────────────────────────────────────────────────────────

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center p-4 md:p-8 overflow-y-auto"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-[800px] my-8"
        style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        {/* Header */}
        <div className="p-8 pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: '#38bdf8' }}>
                {project.num} — {project.category}
              </div>
              <h2 className="text-2xl font-semibold tracking-[-0.01em]" style={{ color: '#e8e4de' }}>
                {project.name}
              </h2>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="font-mono text-[8px] tracking-[0.18em] uppercase" style={{ color: '#555' }}>
                  Manually coded
                </span>
                {project.status && (
                  <span className="font-mono text-[8px] tracking-[0.18em] uppercase" style={{ color: '#38bdf8' }}>
                    • {project.status}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 p-2 transition-colors duration-200"
              style={{ color: '#555' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#e8e4de')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#555')}
            >
              <XIcon />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 space-y-8">
          <div>
            <div className="font-mono text-[9px] tracking-[0.22em] uppercase mb-3" style={{ color: '#3d3d3d' }}>
              Overview
            </div>
            <p className="text-[14px] leading-relaxed" style={{ color: '#6b6b6b' }}>
              {project.description}
            </p>
          </div>

          <div>
            <div className="font-mono text-[9px] tracking-[0.22em] uppercase mb-4" style={{ color: '#3d3d3d' }}>
              Key Technical Highlights
            </div>
            <ul className="space-y-3">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex gap-3 text-[13px] leading-relaxed" style={{ color: '#5a5a5a' }}>
                  <span className="font-mono text-[10px] mt-0.5 flex-shrink-0" style={{ color: '#38bdf8' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-mono text-[9px] tracking-[0.22em] uppercase mb-3" style={{ color: '#3d3d3d' }}>
              Primary Challenge
            </div>
            <p className="text-[13px] leading-relaxed" style={{ color: '#5a5a5a', borderLeft: '2px solid rgba(56,189,248,0.3)', paddingLeft: '1rem' }}>
              {project.challenge}
            </p>
          </div>

          <div>
            <div className="font-mono text-[9px] tracking-[0.22em] uppercase mb-3" style={{ color: '#3d3d3d' }}>
              Technologies
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <TechChip key={t} label={t} />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 pb-8 flex gap-3">
          <a
            href={project.repository ?? 'https://github.com/k201751'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] uppercase px-5 py-3 transition-all duration-200"
            style={{ color: '#888', border: '1px solid rgba(255,255,255,0.1)' }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.color = '#e8e4de'
              el.style.borderColor = 'rgba(255,255,255,0.2)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.color = '#888'
              el.style.borderColor = 'rgba(255,255,255,0.1)'
            }}
          >
            <GithubIcon size={14} /> GitHub
          </a>
        </div>
      </div>
    </div>
  )
}

// ── Projects ───────────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project
  onOpen: (p: Project) => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="p-8 cursor-pointer transition-all duration-300 group"
      style={{
        background: hovered ? '#141414' : '#0f0f0f',
        border: `1px solid ${hovered ? 'rgba(56,189,248,0.2)' : 'rgba(255,255,255,0.06)'}`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(project)}
    >
      <div className="flex items-start justify-between mb-6">
        <span
          className="font-mono text-[10px] tracking-[0.2em]"
          style={{ color: hovered ? '#38bdf8' : '#333' }}
        >
          {project.num}
        </span>
        <span
          className="font-mono text-[9px] tracking-[0.15em] uppercase px-2.5 py-1"
          style={{
            color: hovered ? '#38bdf8' : '#3a3a3a',
            border: `1px solid ${hovered ? 'rgba(56,189,248,0.25)' : 'rgba(255,255,255,0.05)'}`,
            transition: 'all 0.3s',
          }}
        >
          {project.category}
        </span>
      </div>

      <h3
        className="text-xl font-semibold tracking-[-0.01em] mb-3 transition-colors duration-200"
        style={{ color: hovered ? '#fff' : '#c8c4be' }}
      >
        {project.name}
      </h3>

      <div className="flex items-center gap-2 mb-3 font-mono text-[8px] tracking-[0.18em] uppercase">
        <span style={{ color: '#555' }}>Manually coded</span>
        {project.status && <span style={{ color: '#38bdf8' }}>• {project.status}</span>}
      </div>

      <p className="text-[13px] leading-relaxed mb-6" style={{ color: '#484848' }}>
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.slice(0, 4).map((t) => (
          <TechChip key={t} label={t} />
        ))}
        {project.tech.length > 4 && (
          <span className="font-mono text-[10px]" style={{ color: '#333', alignSelf: 'center' }}>
            +{project.tech.length - 4}
          </span>
        )}
      </div>

      <div
        className="flex items-center gap-2 font-mono text-[10px] tracking-[0.12em] uppercase transition-colors duration-200"
        style={{ color: hovered ? '#38bdf8' : '#333' }}
      >
        View details <ArrowIcon />
      </div>
    </div>
  )
}

function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section id="projects" className="py-24 lg:py-32" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <SectionLabel num="03" label="Selected Work" />

        <Reveal>
          <h2
            className="text-[1.9rem] lg:text-[2.4rem] font-semibold tracking-[-0.02em] mb-4"
            style={{ color: '#e8e4de' }}
          >
            Systems I've built.
          </h2>
          <p className="text-[14px] mb-14" style={{ color: '#444' }}>
            Click any project to view technical details.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.04)' }}>
          {PROJECTS.map((p, i) => (
            <Reveal key={p.num} delay={i * 60}>
              <ProjectCard project={p} onOpen={setSelectedProject} />
            </Reveal>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  )
}

// ── Skills ─────────────────────────────────────────────────────────────────────

function SkillChip({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false)
  const description = SKILL_DESCRIPTIONS[label]

  return (
    <div className="relative">
      <div
        className="px-3 py-2 text-[12px] transition-all duration-200 cursor-default"
        style={{
          color: hovered ? '#e8e4de' : '#555',
          background: hovered ? '#181818' : 'transparent',
          border: `1px solid ${hovered ? 'rgba(56,189,248,0.2)' : 'rgba(255,255,255,0.06)'}`,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {label}
      </div>

      {/* Tooltip */}
      {hovered && description && (
        <div
          className="absolute bottom-full left-0 mb-2 p-3 text-[11px] leading-relaxed z-10 pointer-events-none"
          style={{
            background: '#1a1a1a',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#777',
            width: '200px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
          }}
        >
          {description}
        </div>
      )}
    </div>
  )
}

function Skills() {
  return (
    <section id="skills" className="py-24 lg:py-32" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <SectionLabel num="04" label="Technology" />

        <Reveal>
          <h2
            className="text-[1.9rem] lg:text-[2.4rem] font-semibold tracking-[-0.02em] mb-3"
            style={{ color: '#e8e4de' }}
          >
            Technical capabilities.
          </h2>
          <p className="text-[13px] mb-14 font-mono" style={{ color: '#3d3d3d' }}>
            Hover any skill to see context.
          </p>
        </Reveal>

        <div className="space-y-10">
          {Object.entries(SKILLS).map(([category, items], catIdx) => (
            <Reveal key={category} delay={catIdx * 60}>
              <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6 lg:gap-12 items-start">
                <div className="pt-2">
                  <div
                    className="font-mono text-[9px] tracking-[0.22em] uppercase"
                    style={{ color: '#38bdf8' }}
                  >
                    {category}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <SkillChip key={skill} label={skill} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Engineering Approach ───────────────────────────────────────────────────────

function EngineeringApproach() {
  return (
    <section className="py-24 lg:py-32" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <Reveal>
          <div
            className="font-mono text-[10px] tracking-[0.25em] uppercase mb-6"
            style={{ color: '#3d3d3d' }}
          >
            Engineering Philosophy
          </div>
          <h2
            className="text-[1.9rem] lg:text-[2.4rem] font-semibold tracking-[-0.02em] mb-14"
            style={{ color: '#e8e4de' }}
          >
            How I approach engineering.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: 'rgba(255,255,255,0.04)' }}>
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.num} delay={i * 80}>
              <div
                className="p-8 lg:p-10"
                style={{ background: '#0b0b0b' }}
              >
                <div
                  className="font-mono text-[10px] tracking-[0.2em] mb-6"
                  style={{ color: '#38bdf8' }}
                >
                  {p.num}
                </div>
                <h3
                  className="text-[1.05rem] font-semibold mb-4 tracking-[-0.01em]"
                  style={{ color: '#e8e4de' }}
                >
                  {p.title}
                </h3>
                <p className="text-[14px] leading-relaxed" style={{ color: '#555' }}>
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Education ──────────────────────────────────────────────────────────────────

function Education() {
  const areas = [
    'Cybersecurity',
    'Software Engineering',
    'Artificial Intelligence',
    'Data Structures & Algorithms',
    'Databases',
    'Computer Networks',
    'Operating Systems',
  ]

  return (
    <section id="education" className="py-24 lg:py-32" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <SectionLabel num="05" label="Education" />

        <Reveal>
          <div
            className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 p-10 lg:p-12"
            style={{
              background: '#111111',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div>
              <div
                className="font-mono text-[9px] tracking-[0.22em] uppercase mb-3"
                style={{ color: '#38bdf8' }}
              >
                Degree
              </div>
              <h3
                className="text-2xl font-semibold tracking-[-0.01em] mb-2"
                style={{ color: '#e8e4de' }}
              >
                BS Cybersecurity
              </h3>
              <div className="text-[14px] mb-1" style={{ color: '#888' }}>
                National University of Computer and Emerging Sciences (FAST)
              </div>
              <div className="font-mono text-[11px] tracking-wider" style={{ color: '#444' }}>
                2020 — 2024
              </div>
            </div>

            <div>
              <div
                className="font-mono text-[9px] tracking-[0.22em] uppercase mb-4"
                style={{ color: '#3d3d3d' }}
              >
                Relevant Areas
              </div>
              <div className="flex flex-wrap gap-2">
                {areas.map((a) => (
                  <TechChip key={a} label={a} />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── Current Focus ──────────────────────────────────────────────────────────────

function CurrentFocus() {
  const [visible, setVisible] = useState<boolean[]>(Array(CURRENT_FOCUS_ITEMS.length).fill(false))
  const { ref, inView } = useInView(0.2)

  useEffect(() => {
    if (!inView) return
    CURRENT_FOCUS_ITEMS.forEach((_, i) => {
      setTimeout(() => {
        setVisible((prev) => {
          const next = [...prev]
          next[i] = true
          return next
        })
      }, i * 140 + 200)
    })
  }, [inView])

  return (
    <section className="py-24 lg:py-32" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-14 lg:gap-24 items-center"
        >
          <div>
            <div
              className="font-mono text-[10px] tracking-[0.25em] uppercase mb-6"
              style={{ color: '#3d3d3d' }}
            >
              Status
            </div>
            <h2
              className="text-[1.9rem] lg:text-[2.4rem] font-semibold tracking-[-0.02em] mb-6"
              style={{ color: '#e8e4de' }}
            >
              Currently exploring.
            </h2>
            <div
              className="font-mono text-[13px] leading-relaxed"
              style={{ color: '#3d3d3d' }}
            >
              currently_building{' '}
              <span style={{ color: '#38bdf8' }}>
                AI systems that connect models, data, and real-world software.
              </span>
            </div>
          </div>

          {/* Terminal-style list */}
          <div
            className="p-8"
            style={{
              background: '#0d0d0d',
              border: '1px solid rgba(255,255,255,0.06)',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            <div
              className="text-[10px] tracking-[0.15em] uppercase mb-6 pb-4"
              style={{
                color: '#2a2a2a',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              focus_areas.sh
            </div>
            <div className="space-y-3">
              {CURRENT_FOCUS_ITEMS.map((item, i) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-[13px] transition-all duration-300"
                  style={{
                    opacity: visible[i] ? 1 : 0,
                    transform: visible[i] ? 'none' : 'translateX(-8px)',
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{
                      background: '#38bdf8',
                      animation: 'pulse-dot 2s ease infinite',
                      animationDelay: `${i * 0.3}s`,
                    }}
                  />
                  <span style={{ color: '#555' }}>→</span>
                  <span style={{ color: '#e8e4de' }}>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              <span className="text-[11px]" style={{ color: '#2a2a2a' }}>
                $ <span style={{ color: '#38bdf8' }}>█</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Contact ─────────────────────────────────────────────────────────────────────

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required'
    if (!form.subject.trim()) e.subject = 'Subject is required'
    if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters'
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSent(true)
    }, 1500)
  }

  const inputStyle = (field: string) => ({
    background: '#111111',
    border: `1px solid ${errors[field] ? 'rgba(248,113,113,0.4)' : 'rgba(255,255,255,0.07)'}`,
    color: '#e8e4de',
    outline: 'none',
    width: '100%',
    padding: '12px 14px',
    fontSize: '14px',
    transition: 'border-color 0.2s',
  })

  return (
    <section id="contact" className="py-24 lg:py-32" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <SectionLabel num="06" label="Contact" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-16 lg:gap-24">
          {/* Left */}
          <div>
            <Reveal>
              <h2
                className="text-[2.2rem] lg:text-[3rem] font-semibold tracking-[-0.02em] leading-[1.1] mb-6"
                style={{ color: '#e8e4de' }}
              >
                Have a problem worth building?
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-[14px] leading-relaxed mb-12" style={{ color: '#5a5a5a' }}>
                I'm open to software engineering, AI engineering, data engineering, and machine
                learning opportunities. Always happy to discuss interesting technical challenges.
              </p>
            </Reveal>

            <Reveal delay={150}>
              <div className="space-y-5">
                {[
                  { label: 'Email', value: 'alinaeemcys@gmail.com', href: 'mailto:alinaeemcys@gmail.com' },
                  { label: 'LinkedIn', value: 'linkedin.com/in/aliiinaeem', href: 'https://linkedin.com/in/aliiinaeem' },
                  { label: 'GitHub', value: 'github.com/k201751', href: 'https://github.com/k201751' },
                ].map((item) => (
                  <div key={item.label} className="flex gap-6 items-baseline">
                    <div
                      className="font-mono text-[9px] tracking-[0.22em] uppercase w-20 flex-shrink-0"
                      style={{ color: '#3d3d3d' }}
                    >
                      {item.label}
                    </div>
                    <a
                      href={item.href}
                      className="text-[13px] transition-colors duration-200"
                      style={{ color: '#555' }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#38bdf8')}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#555')}
                    >
                      {item.value}
                    </a>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="flex flex-wrap gap-4 mt-10">
                <a
                  href="mailto:ali.naeem@email.com"
                  className="flex items-center gap-2 px-6 py-3 font-mono text-[10px] tracking-[0.15em] uppercase transition-all duration-200"
                  style={{ background: '#38bdf8', color: '#0b0b0b', fontWeight: 500 }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = '#7dd3fc')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = '#38bdf8')}
                >
                  Get in touch
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 px-6 py-3 font-mono text-[10px] tracking-[0.15em] uppercase transition-all duration-200"
                  style={{ color: '#666', border: '1px solid rgba(255,255,255,0.1)' }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = '#e8e4de'
                    el.style.borderColor = 'rgba(255,255,255,0.2)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = '#666'
                    el.style.borderColor = 'rgba(255,255,255,0.1)'
                  }}
                >
                  Download Resume
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal delay={100}>
            {sent ? (
              <div
                className="p-10 flex flex-col items-center justify-center text-center"
                style={{
                  background: '#111111',
                  border: '1px solid rgba(56,189,248,0.2)',
                  minHeight: '360px',
                }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center mb-6"
                  style={{ border: '1px solid rgba(56,189,248,0.4)' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase mb-3" style={{ color: '#38bdf8' }}>
                  Message sent
                </div>
                <p className="text-[13px]" style={{ color: '#555' }}>
                  Thanks for reaching out. I'll get back to you shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
                style={{
                  background: '#111111',
                  border: '1px solid rgba(255,255,255,0.06)',
                  padding: '2.5rem',
                }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[9px] tracking-[0.2em] uppercase mb-2" style={{ color: '#3d3d3d' }}>
                      Name
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => {
                        setForm({ ...form, name: e.target.value })
                        setErrors({ ...errors, name: '' })
                      }}
                      style={inputStyle('name')}
                      onFocus={(e) => (e.target.style.borderColor = 'rgba(56,189,248,0.3)')}
                      onBlur={(e) =>
                        (e.target.style.borderColor = errors.name
                          ? 'rgba(248,113,113,0.4)'
                          : 'rgba(255,255,255,0.07)')
                      }
                    />
                    {errors.name && (
                      <div className="font-mono text-[10px] mt-1" style={{ color: 'rgba(248,113,113,0.8)' }}>
                        {errors.name}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block font-mono text-[9px] tracking-[0.2em] uppercase mb-2" style={{ color: '#3d3d3d' }}>
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => {
                        setForm({ ...form, email: e.target.value })
                        setErrors({ ...errors, email: '' })
                      }}
                      style={inputStyle('email')}
                      onFocus={(e) => (e.target.style.borderColor = 'rgba(56,189,248,0.3)')}
                      onBlur={(e) =>
                        (e.target.style.borderColor = errors.email
                          ? 'rgba(248,113,113,0.4)'
                          : 'rgba(255,255,255,0.07)')
                      }
                    />
                    {errors.email && (
                      <div className="font-mono text-[10px] mt-1" style={{ color: 'rgba(248,113,113,0.8)' }}>
                        {errors.email}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[9px] tracking-[0.2em] uppercase mb-2" style={{ color: '#3d3d3d' }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => {
                      setForm({ ...form, subject: e.target.value })
                      setErrors({ ...errors, subject: '' })
                    }}
                    style={inputStyle('subject')}
                    onFocus={(e) => (e.target.style.borderColor = 'rgba(56,189,248,0.3)')}
                    onBlur={(e) =>
                      (e.target.style.borderColor = errors.subject
                        ? 'rgba(248,113,113,0.4)'
                        : 'rgba(255,255,255,0.07)')
                    }
                  />
                  {errors.subject && (
                    <div className="font-mono text-[10px] mt-1" style={{ color: 'rgba(248,113,113,0.8)' }}>
                      {errors.subject}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-mono text-[9px] tracking-[0.2em] uppercase mb-2" style={{ color: '#3d3d3d' }}>
                    Message
                  </label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) => {
                      setForm({ ...form, message: e.target.value })
                      setErrors({ ...errors, message: '' })
                    }}
                    style={{
                      ...inputStyle('message'),
                      resize: 'none',
                      fontFamily: 'Inter, sans-serif',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'rgba(56,189,248,0.3)')}
                    onBlur={(e) =>
                      (e.target.style.borderColor = errors.message
                        ? 'rgba(248,113,113,0.4)'
                        : 'rgba(255,255,255,0.07)')
                    }
                  />
                  {errors.message && (
                    <div className="font-mono text-[10px] mt-1" style={{ color: 'rgba(248,113,113,0.8)' }}>
                      {errors.message}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3.5 font-mono text-[10px] tracking-[0.2em] uppercase font-medium transition-all duration-200"
                  style={{
                    background: sending ? '#1a4a5a' : '#38bdf8',
                    color: '#0b0b0b',
                    cursor: sending ? 'not-allowed' : 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    if (!sending) (e.currentTarget as HTMLElement).style.background = '#7dd3fc'
                  }}
                  onMouseLeave={(e) => {
                    if (!sending) (e.currentTarget as HTMLElement).style.background = '#38bdf8'
                  }}
                >
                  {sending ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ── Footer ──────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="py-10">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="text-[12px] font-semibold tracking-[0.15em] uppercase mb-1" style={{ color: '#e8e4de' }}>
              Ali Naeem
            </div>
            <div className="font-mono text-[9px] tracking-[0.18em]" style={{ color: '#2e2e2e' }}>
              Software Engineer · AI · Data · Systems
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a href="https://github.com/k201751" target="_blank" rel="noopener noreferrer" style={{ color: '#333' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#e8e4de')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#333')}
            >
              <GithubIcon size={16} />
            </a>
            <a href="https://linkedin.com/in/aliiinaeem" target="_blank" rel="noopener noreferrer" style={{ color: '#333' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#e8e4de')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#333')}
            >
              <LinkedinIcon size={16} />
            </a>
            <a href="mailto:alinaeemcys@gmail.com" style={{ color: '#333', fontSize: '13px' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#e8e4de')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#333')}
            >
              Email
            </a>
          </div>
        </div>

        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 mt-8 pt-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
        >
          <div className="font-mono text-[10px] tracking-wider" style={{ color: '#2a2a2a' }}>
            © 2026 Ali Naeem
          </div>
          <div className="font-mono text-[10px] tracking-wider" style={{ color: '#2a2a2a' }}>
            Designed & engineered with intention.
          </div>
        </div>
      </div>
    </footer>
  )
}

// ── App ────────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div style={{ background: '#0b0b0b', color: '#e8e4de', minHeight: '100vh' }}>
      <Navbar />
      <HireNotification />
      <main>
        <Hero />
        <Stats />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <EngineeringApproach />
        <Education />
        <CurrentFocus />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
