import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Radio, Cable, Video, CarFront, Wifi, Wrench } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const solutions = [
  {
    icon: Radio,
    title: 'Radio Networks',
    description: 'Clear voice coverage, even in remote terrain.',
  },
  {
    icon: Cable,
    title: 'Fiber & Structured Cabling',
    description: 'High-speed backbone for offices and campuses.',
  },
  {
    icon: Video,
    title: 'CCTV & Video Analytics',
    description: 'Smart detection, night vision, and secure storage.',
  },
  {
    icon: CarFront,
    title: 'ANPR & Access Control',
    description: 'Automated gates, logs, and alerts.',
  },
  {
    icon: Wifi,
    title: 'Wireless Links',
    description: 'Point-to-point and managed Wi-Fi.',
  },
  {
    icon: Wrench,
    title: 'Support & Maintenance',
    description: 'SLAs, remote monitoring, and rapid response.',
  },
];

export default function Solutions() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;

    if (!section || !header || !grid) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(header,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 1,
          }
        }
      );

      // Grid tiles animation
      const tiles = grid.querySelectorAll('.solution-tile');
      tiles.forEach((tile) => {
        gsap.fromTo(tile,
          { y: 30, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: tile,
              start: 'top 85%',
              end: 'top 55%',
              scrub: 1,
            }
          }
        );
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-50 bg-dark py-20 md:py-28"
    >
      <div className="px-6 md:px-[6vw] max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-12 md:mb-16">
          <span className="label-mono mb-4 block">SOLUTIONS</span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Technology that fits your{' '}
            <span className="text-gradient">environment</span>
          </h2>
          <p className="text-muted-foreground max-w-xl">
            Scalable systems designed for South African conditions.
          </p>
        </div>

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="solution-tile group relative bg-dark-light rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/5 hover:border-cyan/30 transition-all duration-500 cursor-pointer hover:-translate-y-1.5"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center mb-5 group-hover:bg-cyan/20 transition-colors">
                <solution.icon className="w-6 h-6 text-cyan" />
              </div>

              {/* Content */}
              <h3 className="font-heading text-lg md:text-xl font-semibold text-white mb-2">
                {solution.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {solution.description}
              </p>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl md:rounded-3xl shadow-glow" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
