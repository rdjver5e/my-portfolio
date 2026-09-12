import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from '../layout/Container';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with real-time inventory management, AI-powered recommendations, and seamless checkout experience.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis'],
    image: '/projects/ecommerce.jpg',
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 2,
    title: 'Analytics Dashboard',
    description: 'Interactive data visualization dashboard with real-time metrics, custom reports, and collaborative annotations.',
    tags: ['Next.js', 'D3.js', 'GraphQL', 'AWS'],
    image: '/projects/analytics.jpg',
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 3,
    title: 'AI Content Generator',
    description: 'ML-powered content creation tool that generates blog posts, social media content, and marketing copy.',
    tags: ['Python', 'FastAPI', 'OpenAI', 'React'],
    image: '/projects/ai-content.jpg',
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 4,
    title: 'Project Management Tool',
    description: 'Kanban-style project management with time tracking, team collaboration, and automated workflows.',
    tags: ['Vue.js', 'Firebase', 'Tailwind CSS'],
    image: '/projects/pm-tool.jpg',
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
  },
  {
    id: 5,
    title: 'Fitness Tracking App',
    description: 'Mobile-first fitness application with workout logging, nutrition tracking, and progress analytics.',
    tags: ['React Native', 'Node.js', 'MongoDB'],
    image: '/projects/fitness.jpg',
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
  },
  {
    id: 6,
    title: 'Real Estate Platform',
    description: 'Property listing platform with virtual tours, mortgage calculator, and agent matchmaking.',
    tags: ['Next.js', 'Prisma', 'Mapbox', 'Stripe'],
    image: '/projects/realestate.jpg',
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
  },
];

function ProjectCard({ project, darkMode }: { project: Project; darkMode: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(cardRef.current, 
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative rounded-3xl overflow-hidden transition-all duration-500 ${
        project.featured ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'
      } ${darkMode ? 'bg-slate-800/50' : 'bg-slate-100/50'} border ${
        darkMode ? 'border-slate-700/50 hover:border-violet-500/30' : 'border-slate-200/50 hover:border-violet-500/30'
      } hover:shadow-2xl hover:shadow-violet-500/10`}
    >
      {/* Project Image Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-blue-600/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`text-8xl font-bold ${darkMode ? 'text-slate-700' : 'text-slate-200'}`}>
            {String(project.id).padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium rounded-full bg-violet-500/20 text-violet-300 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-white/70 backdrop-blur-sm">
                +{project.tags.length - 3}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-h3 text-white mb-2">{project.title}</h3>

          {/* Description */}
          <p className="text-body text-white/70 mb-4 line-clamp-2">{project.description}</p>

          {/* Links */}
          <div className="flex gap-4">
            <a
              href={project.liveUrl}
              className="inline-flex items-center gap-2 text-body text-white hover:text-violet-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </a>
            <a
              href={project.githubUrl}
              className="inline-flex items-center gap-2 text-body text-white hover:text-violet-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-6 right-6 px-3 py-1 text-xs font-semibold rounded-full bg-violet-500 text-white">
          Featured
        </div>
      )}
    </div>
  );
}

export default function Projects({ darkMode }: { darkMode: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const title = sectionRef.current.querySelector('.section-title');
    if (title) {
      gsap.fromTo(title,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-24 lg:py-32">
      <Container>
        {/* Section Header */}
        <div className="section-title text-center mb-16">
          <span className={`inline-block px-4 py-2 rounded-full text-small font-medium mb-6 ${
            darkMode
              ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20'
              : 'bg-violet-100 text-violet-600 border border-violet-200'
          }`}>
            Selected Works
          </span>
          <h2 className="text-h2 lg:text-h1">Projects</h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              darkMode={darkMode}
            />
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/rdjverse"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-body font-medium transition-colors ${
              darkMode
                ? 'bg-white/5 text-white border border-white/20 hover:bg-white/10'
                : 'bg-black/5 text-black border border-black/20 hover:bg-black/10'
            }`}
          >
            View All Projects
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </Container>
    </section>
  );
}
