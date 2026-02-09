import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const content = contentRef.current;
    const hud = hudRef.current;
    const headline = headlineRef.current;
    const sub = subRef.current;
    const cta = ctaRef.current;

    if (!section || !bg || !content || !hud || !headline || !sub || !cta) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      const loadTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Background fade in and scale
      loadTl.fromTo(bg,
        { opacity: 0, scale: 1.08 },
        { opacity: 1, scale: 1, duration: 1.1 }
      );

      // HUD elements draw on
      loadTl.fromTo(hud.querySelectorAll('.hud-line'),
        { strokeDashoffset: 200 },
        { strokeDashoffset: 0, duration: 0.9, stagger: 0.08 },
        '-=0.6'
      );

      loadTl.fromTo(hud.querySelectorAll('.hud-element'),
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.6 },
        '-=0.5'
      );

      // Headline words reveal
      const words = headline.querySelectorAll('.word');
      loadTl.fromTo(words,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.05 },
        '-=0.4'
      );

      // Subheadline and CTAs
      loadTl.fromTo([sub, cta],
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 },
        '-=0.5'
      );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements when scrolling back to top
            gsap.set([content, hud], { opacity: 1, x: 0, y: 0 });
            gsap.set(bg, { scale: 1, y: 0 });
          }
        }
      });

      // Entrance phase (0-30%): subtle background scale only
      scrollTl.fromTo(bg,
        { scale: 1 },
        { scale: 1.03, ease: 'none' },
        0
      );

      // Exit phase (70-100%)
      scrollTl.fromTo(content,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(hud,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(bg,
        { scale: 1.03, y: 0 },
        { scale: 1.1, y: '-6vh', ease: 'power2.in' },
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned z-10 flex items-center justify-center"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0 }}
      >
        <img
          src="/hero_city.jpg"
          alt="City skyline"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/40 via-transparent to-dark/80" />
      </div>

      {/* HUD Overlay */}
      <div ref={hudRef} className="absolute inset-0 pointer-events-none">
        {/* Top-left bracket */}
        <svg
          className="absolute hud-element"
          style={{ left: '6vw', top: '10vh', width: '18vw', height: '22vh' }}
        >
          <path
            className="hud-line"
            d="M 0 30 L 0 0 L 30 0"
            fill="none"
            stroke="rgba(244,246,255,0.35)"
            strokeWidth="1"
            strokeDasharray="200"
            strokeDashoffset="200"
          />
          <path
            className="hud-line"
            d="M 0 70 L 0 100 L 30 100"
            fill="none"
            stroke="rgba(244,246,255,0.35)"
            strokeWidth="1"
            strokeDasharray="200"
            strokeDashoffset="200"
          />
        </svg>

        {/* Bottom-right bracket */}
        <svg
          className="absolute hud-element"
          style={{ right: '6vw', bottom: '10vh', width: '18vw', height: '22vh' }}
        >
          <path
            className="hud-line"
            d="M 100% 30 L 100% 0 L calc(100% - 30px) 0"
            fill="none"
            stroke="rgba(244,246,255,0.35)"
            strokeWidth="1"
            strokeDasharray="200"
            strokeDashoffset="200"
          />
          <path
            className="hud-line"
            d="M 100% 70 L 100% 100 L calc(100% - 30px) 100"
            fill="none"
            stroke="rgba(244,246,255,0.35)"
            strokeWidth="1"
            strokeDasharray="200"
            strokeDashoffset="200"
          />
        </svg>

        {/* Crosshair center */}
        <div
          className="absolute hud-element"
          style={{
            left: '50%',
            top: '52%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="relative w-20 h-20">
            <div className="absolute top-1/2 left-0 w-full h-px bg-cyan/30" />
            <div className="absolute left-1/2 top-0 h-full w-px bg-cyan/30" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 border border-cyan/50 rounded-full" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-6"
        style={{ transform: 'translateY(-5vh)' }}
      >
        <h1
          ref={headlineRef}
          className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
        >
          <span className="word inline-block">Secure.</span>{' '}
          <span className="word inline-block">Connect.</span>{' '}
          <span className="word inline-block text-gradient">Control.</span>
        </h1>

        <p
          ref={subRef}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          End-to-end communications, networking, and surveillance solutions across South Africa.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#services"
            className="group px-8 py-4 bg-cyan text-dark font-semibold rounded-xl hover:bg-cyan-light transition-all duration-300 shadow-glow hover:shadow-glow-strong flex items-center gap-2"
          >
            Explore Services
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="px-8 py-4 border border-white/20 text-white font-medium rounded-xl hover:bg-white/5 hover:border-cyan/50 transition-all duration-300"
          >
            Request a Quote
          </a>
        </div>
      </div>
    </section>
  );
}
