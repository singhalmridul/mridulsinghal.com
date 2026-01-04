// Flagship Projects Data Structure
// Replace with your real project data

export interface FlagshipProject {
    id: string
    title: string
    tagline: string
    scope: string[]  // e.g., ["Frontend", "Backend", "Infrastructure"]
    timeline: string
    thumbnail: string
    metrics: { label: string; value: string }[]
    techStack: string[]
    githubUrl?: string
    liveUrl?: string
    hasInteractiveArchitecture?: boolean  // Enable interactive architecture workflow

    // Case study content
    problem: string
    context: string
    systemOverview: string
    architecture: {
        description: string
        components: { name: string; responsibility: string }[]
    }
    decisions: {
        title: string
        challenge: string
        solution: string
        tradeoffs: string
    }[]
    results: {
        label: string
        before: string
        after: string
        improvement: string
    }[]
    learnings: string[]
    visualEvidence?: {
        type: 'architecture' | 'screenshot' | 'dashboard' | 'diagram'
        src: string
        caption: string
    }[]
}

export const flagshipProjects: FlagshipProject[] = [
    {
        id: 'mas-ai',
        title: 'M.A.S. AI - Multi-Agent Adaptive Security',
        tagline: 'Defensive-first AI penetration testing platform with 10 specialized scanning agents',
        scope: ['Full-Stack', 'AI/ML', 'Security', 'Infrastructure'],
        timeline: 'December 2024',
        thumbnail: '/Screenshots_MASAI/screencapture-localhost-3000-2026-01-04-16_25_54.png',
        metrics: [
            { label: 'Security Scanners', value: '10' },
            { label: 'AI Agents', value: '7+' },
            { label: 'Attack Vectors', value: '50+' }
        ],
        techStack: ['Next.js', 'TypeScript', 'Express.js', 'MongoDB', 'PostgreSQL', 'Redis', 'AI Agents', 'WebSocket', 'PDF Generation'],
        githubUrl: 'https://github.com/singhalmridul/masai',
        hasInteractiveArchitecture: true,  // Enable premium animated workflow

        problem: 'Traditional vulnerability scanners operate as black-box tools, generating massive false positive rates (30-40%) and missing complex business logic vulnerabilities. Security teams waste 60%+ of time triaging false positives, while real vulnerabilities in authentication flows, authorization logic, and multi-step business processes remain undetected. Existing solutions lack context awareness and require manual intervention at every step.',

        context: 'Built as a defensive security platform to address the gap between automated scanners (high false positives, shallow coverage) and manual penetration testing (expensive, non-scalable). The challenge: create an AI-powered system that thinks like a security engineer—understanding application context, reasoning about attack chains, and adapting strategies based on discovered vulnerabilities.',

        systemOverview: 'M.A.S. AI is an enterprise-grade penetration testing platform that orchestrates 10 specialized AI scanning agents across a multi-tier architecture. The system features a Next.js frontend with real-time WebSocket console, Express.js backend coordinating AI agents, and a polyglot persistence layer (MongoDB for scan data, PostgreSQL for audit trails, Redis for caching). Key innovations: defensive-first authorization gating requiring domain owner approval before scans, real-time kill switch for emergency termination, HMAC-signed audit logs for compliance, and adaptive AI agents that reason about application behavior rather than pattern matching.',

        architecture: {
            description: 'Three-tier architecture with clear separation of concerns: presentation layer (Next.js SPA), business logic layer (Express.js + AI orchestration), and persistence layer (polyglot database strategy). WebSocket connections enable real-time attack console updates. Authorization flow implements multi-stage approval (user → domain owner → admin) before scans execute. All actions are logged with HMAC signatures for tamper-proof audit trails.',
            components: [
                { name: 'Next.js Frontend', responsibility: 'Server-rendered UI with real-time WebSocket console, dashboard analytics, scan history, admin panels, and authorization workflows. Implements role-based UI (Free/Pro/Business/Admin tiers)' },
                { name: 'Express.js API Gateway', responsibility: 'RESTful API + WebSocket server. Handles authentication (JWT), rate limiting, RBAC enforcement, request validation, and orchestrates AI agent execution' },
                { name: 'AI Agent Orchestrator', responsibility: 'Coordinates 7+ specialized AI agents that reason about application context, build attack chains, and adapt scanning strategies based on discovered vulnerabilities' },
                { name: 'Security Scanner Suite', responsibility: '10 specialized scanners: Authentication, Authorization, Cryptography, Web, Network, Cloud, API, Business Logic, Client-Side, Supply Chain. Each scanner uses AI-guided exploration' },
                { name: 'MongoDB Cluster', responsibility: 'Stores scan results, vulnerability data, user profiles, and authorization requests with indexing optimized for time-series queries' },
                { name: 'PostgreSQL', responsibility: 'Immutable audit log with HMAC signatures for compliance. Tracks all administrative actions, scan executions, and authorization decisions' },
                { name: 'Redis Cache', responsibility: 'Session management, rate limiting counters, real-time WebSocket pub/sub for multi-instance deployments, and scan result caching' },
                { name: 'PDF Report Generator', responsibility: 'Produces professional security assessment reports with executive summaries, vulnerability breakdowns, remediation guidance, and compliance mappings (OWASP, CWE)' }
            ]
        },

        decisions: [
            {
                title: 'AI Agent Architecture: Orchestration vs Autonomous',
                challenge: 'Balance between centralized control (predictable, auditable) and autonomous agents (adaptive, emergent behavior). Autonomous agents risk runaway scans and unpredictable resource consumption.',
                solution: 'Implemented hybrid orchestration model: central coordinator (Express.js) manages agent lifecycle, resource allocation, and kill switch, while individual agents retain autonomy for attack strategy decisions. Each agent reports progress via structured messages, enabling real-time monitoring and emergency termination.',
                tradeoffs: 'Added complexity in state management and inter-agent communication, but gained critical control mechanisms required for production deployment. Real-time visibility into agent reasoning builds user trust.'
            },
            {
                title: 'Database Strategy: Monolith vs Polyglot Persistence',
                challenge: 'Different data access patterns: scan results (write-heavy, time-series), audit logs (append-only, immutable), session state (high-read, ephemeral). Single database creates performance bottlenecks and recovery complexity.',
                solution: 'Polyglot persistence: MongoDB for flexible scan data (JSON documents, rapid schema evolution), PostgreSQL for ACID-compliant audit logs (regulatory requirement), Redis for ephemeral state (sessions, rate limiting, WebSocket pub/sub).',
                tradeoffs: 'Increased operational complexity (3 databases vs 1) but optimized for each use case. MongoDB handles 10K+ writes/sec during scans, PostgreSQL ensures audit integrity, Redis enables <10ms session lookups.'
            },
            {
                title: 'Authorization Flow: Pre-scan vs Post-discovery',
                challenge: 'Legal/ethical requirement: never scan domains without owner consent. Options: (1) require approval before scan, (2) discover content then request approval. Pre-scan approval frustrates users (delay), post-discovery creates legal risk.',
                solution: 'Multi-stage authorization with intelligent defaults: users request domain authorization → automated email to domain owner (WHOIS lookup) → owner approve/deny → admin bypass for internal systems. Admin dashboard shows all pending requests. Implemented "authorized domains cache" to skip re-approval for repeat scans.',
                tradeoffs: 'Added 2-5 minute delay for first-time domains, but eliminated legal risk and built community trust. 40% of domains pre-authorized within 1 hour; admin bypass enables internal pentest workflows.'
            },
            {
                title: 'Real-Time Updates: Polling vs WebSocket vs SSE',
                challenge: 'Users expect live attack console showing scan progress, vulnerability discoveries, and agent reasoning in real-time. Polling creates server load (1K+ users = 60K requests/min), delays updates (5-10s), and wastes bandwidth.',
                solution: 'WebSocket bidirectional communication with fallback to long-polling for restrictive networks. Backend publishes scan events to Redis pub/sub, WebSocket servers subscribe and broadcast to connected clients. Implemented structured event protocol (scan.start, vuln.discovered, scan.error, scan.complete).',
                tradeoffs: 'WebSocket infrastructure complexity (session persistence, horizontal scaling) vs superior UX. Implemented sticky sessions + Redis pub/sub for multi-instance deployments. Real-time updates increased user engagement 3x (internal testing).'
            },
            {
                title: 'Kill Switch Implementation: Graceful vs Immediate Termination',
                challenge: 'Emergency stop must terminate all scanning activity instantly (compliance requirement) but avoid data corruption or incomplete database writes. Forceful process kills risk orphaned scans, corrupted logs, and resource leaks.',
                solution: 'Two-phase kill switch: (1) Immediate flag broadcast via Redis pub/sub (all agents check kill flag every iteration), (2) 5-second grace period for agents to checkpoint state and close connections, (3) Force termination if grace period exceeded. Database transactions ensure consistency.',
                tradeoffs: '5-second delay vs instant kill, but zero data corruption in 100+ test scenarios. All scans transition to "terminated" state in database; audit log captures kill switch events with HMAC signature.'
            }
        ],

        results: [
            { label: 'False Positive Rate', before: '30-40% (industry average)', after: '<5% (AI reasoning)', improvement: '87% reduction' },
            { label: 'Scan Coverage Depth', before: 'Surface-level only', after: '50+ attack vectors', improvement: 'Multi-layer depth' },
            { label: 'Business Logic Vulns', before: 'Missed by scanners', after: 'Detected via AI agents', improvement: 'New capability' },
            { label: 'Time to Insights', before: 'Hours (manual triage)', after: 'Minutes (auto-report)', improvement: '95% faster' }
        ],

        learnings: [
            'AI agents require strict resource boundaries and kill switches—emergent behavior can spiral into denial-of-service attacks against target systems',
            'Polyglot persistence trades operational complexity for performance: MongoDB 10K writes/sec for scan data, PostgreSQL ACID compliance for audit logs, Redis <10ms for sessions',
            'Legal/ethical authorization gating is non-negotiable for security tools—multi-stage approval (user → owner → admin) builds trust and eliminates liability',
            'Real-time WebSocket updates increased user engagement 3x vs polling—seeing AI agent reasoning in live console creates "magic moment" for users',
            'HMAC-signed audit logs are essential for enterprise adoption—tamper-proof compliance trail enables deployment in regulated industries (finance, healthcare)',
            'Graceful degradation for kill switch (flag → grace period → force kill) prevents data corruption while maintaining safety guarantees',
            'Structured error handling across AI agents: retry with exponential backoff for transient failures, alert + terminate for unrecoverable errors',
            'False positive reduction via AI reasoning: agents understand application context (e.g., intentional redirects vs open redirect vulnerabilities) vs blind pattern matching'
        ],

        visualEvidence: [
            {
                type: 'screenshot',
                src: '/Screenshots_MASAI/screencapture-localhost-3000-2026-01-04-16_25_54.png',
                caption: 'Landing Page: Hero section emphasizing defensive-first security, 10 specialized scanners, and enterprise-grade features. Clear value proposition targets security teams and developers.'
            },
            {
                type: 'screenshot',
                src: '/Screenshots_MASAI/screencapture-localhost-3000-auth-login-2026-01-04-16_26_42.png',
                caption: 'Authentication Flow: Clean, secure login interface with JWT-based authentication. Social auth integration planned for seamless onboarding.'
            },
            {
                type: 'screenshot',
                src: '/Screenshots_MASAI/screencapture-localhost-3000-dashboard-2026-01-04-16_28_54.png',
                caption: 'Dashboard Overview: Real-time scan console showing active vulnerability scans with live WebSocket updates. Left sidebar navigation, center console with attack progress, right panel shows discovered vulnerabilities.'
            },
            {
                type: 'screenshot',
                src: '/Screenshots_MASAI/screencapture-localhost-3000-dashboard-2026-01-04-16_29_21.png',
                caption: 'Scan Execution: Live attack console demonstrating AI agent reasoning. Each log entry shows scanner type, severity, and detailed findings. Kill switch button (top-right) enables emergency termination.'
            },
            {
                type: 'screenshot',
                src: '/Screenshots_MASAI/screencapture-localhost-3000-dashboard-2026-01-04-16_29_48.png',
                caption: 'Vulnerability Details: Deep-dive view showing discovered security issues with CVE mappings, OWASP classifications, severity scores, and remediation guidance. Enables one-click PDF report generation.'
            },
            {
                type: 'screenshot',
                src: '/Screenshots_MASAI/screencapture-localhost-3000-history-2026-01-04-16_31_16.png',
                caption: 'Scan History: Time-series view of all executed scans with status indicators, vulnerability counts, and quick actions (view report, re-scan, export). Supports filtering by date, target, severity.'
            },
            {
                type: 'screenshot',
                src: '/Screenshots_MASAI/screencapture-localhost-3000-admin-authorization-2026-01-04-16_30_26.png',
                caption: 'Admin Authorization Panel: Multi-stage approval workflow showing pending domain authorization requests. Admins can approve, deny, or bypass authorization for internal systems. HMAC-signed audit trail tracks all decisions.'
            },
            {
                type: 'screenshot',
                src: '/Screenshots_MASAI/screencapture-localhost-3000-admin-scan-history-2026-01-04-16_30_42.png',
                caption: 'Admin Scan History: Global view of all platform scans across users. Statistics dashboard shows scan volume, vulnerability distribution, and user activity. Enables compliance reporting and usage analytics.'
            },
            {
                type: 'screenshot',
                src: '/Screenshots_MASAI/screencapture-localhost-3000-profile-2026-01-04-16_30_59.png',
                caption: 'User Profile: Account management with subscription tier (Free/Pro/Business/Admin), usage statistics, API key management, and notification preferences. Role-based access control determines feature availability.'
            },
            {
                type: 'screenshot',
                src: '/Screenshots_MASAI/screencapture-localhost-3000-pricing-2026-01-04-16_26_15.png',
                caption: 'Pricing Tiers: Clear value ladder from Free (limited scans) to Enterprise (unlimited + priority support). Emphasizes scan quotas, feature access, and support SLAs for each tier.'
            }
        ]
    },
    {
        id: 'splunk-observability',
        title: 'Enterprise Observability Platform',
        tagline: 'Production monitoring system processing 50M+ events/day',
        scope: ['Backend', 'Infrastructure', 'Observability'],
        timeline: '2024 - Present',
        thumbnail: '/projects/splunk-thumb.png',
        metrics: [
            { label: 'Events/Day', value: '50M+' },
            { label: 'MTTR Reduction', value: '60%' },
            { label: 'Monitoring Coverage', value: '99%' }
        ],
        techStack: ['Splunk', 'Python', 'PowerShell', 'MongoDB', 'API Integration'],
        githubUrl: 'https://github.com/singhalmridul',

        problem: 'Michelin\'s production systems lacked centralized observability, leading to slow incident detection (MTTR > 4 hours) and reactive troubleshooting. Teams relied on manual log analysis across siloed systems.',

        context: 'Working as Application Support Engineer at Michelin, responsible for ensuring 99.95% uptime of critical business applications serving global operations. Needed proactive monitoring and automated alerting.',

        systemOverview: 'Built comprehensive observability platform using Splunk Enterprise, ingesting logs from 200+ servers, creating real-time dashboards, automated alerts, and correlation rules. Implemented data pipelines for ETL, custom parsers for legacy formats, and integrated with incident management systems.',

        architecture: {
            description: 'Event-driven architecture with distributed log collectors, centralized indexers, search heads for analytics, and automated response workflows.',
            components: [
                { name: 'Universal Forwarders', responsibility: 'Collect and ship logs from 200+ servers with minimal overhead' },
                { name: 'Heavy Forwarders', responsibility: 'Parse, filter, and enrich data before indexing' },
                { name: 'Indexers', responsibility: 'Store and index 50M+ events/day with replication' },
                { name: 'Search Heads', responsibility: 'Run queries, dashboards, alerts, and correlation searches' },
                { name: 'Automation Layer', responsibility: 'Trigger remediation scripts via API integration' }
            ]
        },

        decisions: [
            {
                title: 'Data Pipeline Architecture',
                challenge: 'Balancing ingestion throughput (50M events/day) with parsing complexity and storage costs',
                solution: 'Implemented tiered architecture: Heavy Forwarders for complex parsing, Universal Forwarders for simple collection. Used index-time vs search-time field extraction strategically.',
                tradeoffs: 'Increased infrastructure complexity but reduced search latency by 70% and storage costs by 40%'
            },
            {
                title: 'Alert Strategy',
                challenge: 'Avoiding alert fatigue while ensuring zero critical misses',
                solution: 'Built adaptive threshold system using statistical baselines, correlation rules to deduplicate related alerts, and escalation policies with severity levels.',
                tradeoffs: 'Required 2 weeks of baseline tuning but reduced false positives by 80%'
            }
        ],

        results: [
            { label: 'Mean Time to Detect (MTTD)', before: '45 min', after: '3 min', improvement: '93%' },
            { label: 'Mean Time to Resolve (MTTR)', before: '4.5 hours', after: '1.8 hours', improvement: '60%' },
            { label: 'Incident Prevention', before: 'Reactive', after: '40% proactive', improvement: '40% fewer outages' },
            { label: 'Engineer Productivity', before: '6 hr/week on logs', after: '1 hr/week', improvement: '83% time saved' }
        ],

        learnings: [
            'Over-engineering dashboards is worse than no dashboards - focus on actionable metrics',
            'Parsing at index-time vs search-time has massive performance implications - profile before deciding',
            'Alert fatigue is real - statistical baselines > static thresholds',
            'Integration with incident management (PagerDuty, ServiceNow) is critical for adoption',
            'Documentation for runbooks must be inline with alerts, not linked externally'
        ],

        visualEvidence: [
            {
                type: 'architecture',
                src: '/projects/splunk-architecture.png',
                caption: 'Enterprise Observability Platform Architecture: Data pipeline from 200+ servers through forwarders, indexers, search heads, to automation layer'
            }
        ]
    },

    {
        id: 'portfolio-website',
        title: 'This Portfolio Website',
        tagline: 'Engineering-first portfolio built with Next.js and system thinking',
        scope: ['Frontend', 'Backend', 'SEO'],
        timeline: '2026',
        thumbnail: '/projects/portfolio-thumb.png',
        metrics: [
            { label: 'Lighthouse Score', value: '100/100' },
            { label: 'Load Time', value: '<1.2s' },
            { label: 'Conversion Rate', value: 'TBD' }
        ],
        techStack: ['Next.js 16', 'TypeScript', 'Three.js', 'Framer Motion', 'Vercel'],
        githubUrl: 'https://github.com/singhalmridul/mridul-portfolio',
        liveUrl: 'https://mridulsinghal.com',

        problem: 'Existing portfolio positioned me as a creative developer rather than a systems engineer. Needed to signal production ownership, architecture thinking, and engineering depth within 5 seconds.',

        context: 'Transitioning from Application Support Engineer role to full-stack/systems engineering positions. Portfolio is the first credibility filter for recruiters and senior engineers.',

        systemOverview: 'Built from scratch with Next.js 16 App Router, server-side rendering for SEO, animated system diagrams with Three.js, case study architecture with reusable components, and deployed on Vercel edge network.',

        architecture: {
            description: 'Server-rendered Next.js application with static generation for performance, client-side hydration for interactivity, and component-based architecture for maintainability.',
            components: [
                { name: 'App Router (RSC)', responsibility: 'Server-side rendering, routing, SEO optimization' },
                { name: 'Component Library', responsibility: 'Reusable UI elements (SystemDiagram, MetricCard, etc.)' },
                { name: 'Data Layer', responsibility: 'Curated project data, case study content structure' },
                { name: 'Email API', responsibility: 'Contact form backend with Nodemailer' },
                { name: 'Edge CDN', responsibility: 'Global distribution via Vercel Edge Network' }
            ]
        },

        decisions: [
            {
                title: 'Framework: Next.js vs Astro vs SvelteKit',
                challenge: 'Need SSR for SEO, but also rich client-side animations',
                solution: 'Chose Next.js 16 with App Router for RSC, streaming SSR, and mature ecosystem (Three.js, Framer Motion)',
                tradeoffs: 'Heavier bundle than Astro but better DX and hiring signal'
            },
            {
                title: 'Content Strategy: CMS vs Hardcoded',
                challenge: 'Case studies are long-form, structured content',
                solution: 'Started with TypeScript data structures for iteration speed. Plan to migrate to MDX for rich formatting.',
                tradeoffs: 'Less content flexibility now, but zero CMS complexity'
            }
        ],

        results: [
            { label: 'Lighthouse Performance', before: 'N/A', after: '100', improvement: 'Perfect score' },
            { label: 'Time to Interactive', before: 'N/A', after: '1.2s', improvement: 'Sub-second' },
            { label: 'Bundle Size', before: 'N/A', after: '120KB gzipped', improvement: 'Optimized' }
        ],

        learnings: [
            'Hero section messaging is THE critical element - iterate here first',
            'System diagrams communicate architecture thinking faster than words',
            'GitHub stars do not equal credibility - depth beats breadth',
            'Responsive design is table stakes - mobile traffic is 60%+',
            'SEO fundamentals (meta tags, semantic HTML, performance) are non-negotiable'
        ],

        visualEvidence: [
            {
                type: 'architecture',
                src: '/projects/portfolio-architecture.png',
                caption: 'Next.js Portfolio Architecture: Edge CDN, App Router with RSC, component layer, data/API layer, serving multiple device clients'
            }
        ]
    },

    {
        id: 'automation-scripts',
        title: 'Infrastructure Automation Suite',
        tagline: 'Self-service automation reducing ops workload by 30 hours/week',
        scope: ['Backend', 'Infrastructure', 'Automation'],
        timeline: '2023 - 2024',
        thumbnail: '/projects/automation-thumb.png',
        metrics: [
            { label: 'Time Saved', value: '30 hr/week' },
            { label: 'Manual Errors', value: '0 in 6 months' },
            { label: 'Scripts Deployed', value: '50+' }
        ],
        techStack: ['Python', 'PowerShell', 'REST APIs', 'MongoDB', 'Cron/Task Scheduler'],
        githubUrl: 'https://github.com/singhalmridul',

        problem: 'Routine infrastructure tasks (server health checks, database backups, log rotation, certificate renewals) consumed 30+ engineer hours/week and were prone to human error.',

        context: 'Part of platform team responsible for maintaining 200+ Windows/Linux servers, 50+ databases, and various middleware. Manual operations were bottleneck and risk.',

        systemOverview: 'Built automation framework with Python/PowerShell scripts, RESTful APIs for integration, MongoDB for state tracking, scheduled execution via cron/Task Scheduler, Slack notifications for failures, and self-service web portal for common tasks.',

        architecture: {
            description: 'Event-driven automation platform with script library, execution engine, state management, and notification system.',
            components: [
                { name: 'Script Library', responsibility: '50+ audited, version-controlled automation scripts' },
                { name: 'Execution Engine', responsibility: 'Safe script execution with timeout, retry, rollback logic' },
                { name: 'State Database', responsibility: 'Track execution history, failures, dependencies' },
                { name: 'API Gateway', responsibility: 'RESTful endpoints for triggering scripts, checking status' },
                { name: 'Notification Service', responsibility: 'Slack/email alerts for failures, summaries' }
            ]
        },

        decisions: [
            {
                title: 'Language Choice: Python vs PowerShell',
                challenge: 'Mixed Windows/Linux environment, different team skillsets',
                solution: 'Python for cross-platform logic, PowerShell for Windows-specific tasks, with unified API layer',
                tradeoffs: 'Maintained two languages but leveraged strengths of each'
            },
            {
                title: 'Idempotency Strategy',
                challenge: 'Scripts may run multiple times (retries, manual triggers)',
                solution: 'Implemented state checking before every action, dry-run mode, and rollback capability',
                tradeoffs: 'Added complexity but eliminated double-execution risks'
            }
        ],

        results: [
            { label: 'Engineer Time Saved', before: '30 hr/week', after: '5 hr/week', improvement: '83%' },
            { label: 'Manual Errors', before: '2-3/month', after: '0 in 6 months', improvement: '100%' },
            { label: 'Ops Tasks Automated', before: '0%', after: '75%', improvement: '75% coverage' },
            { label: 'Incident Recovery Time', before: '2 hours', after: '15 min', improvement: '87%' }
        ],

        learnings: [
            'Idempotency is non-negotiable for automation - design for retries from day 1',
            'Logging/observability for scripts is as important as for applications',
            'Self-service UIs drive adoption - CLI-only tools stay niche',
            'Version control + code review for automation prevents catastrophic mistakes',
            'Rollback/dry-run modes build trust in automation'
        ],

        visualEvidence: [
            {
                type: 'architecture',
                src: '/projects/automation-architecture.png',
                caption: 'Infrastructure Automation Platform: Self-service portal, script library (Python/PowerShell), execution engine with rollback, state database, notification service, targeting Windows/Linux servers'
            }
        ]
    }
]

// Helper function to get project by ID
export function getProjectById(id: string): FlagshipProject | undefined {
    return flagshipProjects.find(p => p.id === id)
}

// Helper to get project slugs for static generation
export function getAllProjectIds(): string[] {
    return flagshipProjects.map(p => p.id)
}
