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
