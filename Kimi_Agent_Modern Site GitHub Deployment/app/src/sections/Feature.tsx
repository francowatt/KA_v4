import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Monitor, Users, Cloud, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: Monitor, text: 'Live dashboards & event timelines' },
  { icon: Users, text: 'Role-based access control' },
  { icon: Cloud, text: 'Cloud & on-premise options' },
];

export default function Feature() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const label = labelRef.current;
    const panel = panelRef.current;
    const caption = captionRef.current;

    if (!section || !bg || !label || !panel || !caption) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=125%',
          pin: true,
          scrub: 0.6,
        }
      });

      // Background entrance (0-30%)
      scrollTl.fromTo(bg,
        { scale: 1.1, opacity: 0.6 },
        { scale: 1, opacity: 1, ease: 'none' },
        0
      );

      // Label entrance
      scrollTl.fromTo(label,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, ease: 'none' },
        0.05
      );

      // Panel entrance from left (0-30%)
      scrollTl.fromTo(panel,
        { x: '-55vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      // Panel content stagger
      scrollTl.fromTo(
        panel.querySelectorAll('.panel-content'),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.03, ease: 'none' },
        0.08
      );

      // Caption entrance
      scrollTl.fromTo(caption,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, ease: 'none' },
        0.15
      );

      // Exit phase (70-100%)
      scrollTl.fromTo(bg,
        { scale: 1, opacity: 1 },
        { scale: 1.06, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(panel,
        { x: 0, opacity: 1 },
        { x: '-22vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo([label, caption],
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned z-40"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0"
        style={{ opacity: 0.6 }}
      >
        <img
          src="/feature_control.jpg"
          alt="Control room"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-dark/80 via-dark/40 to-transparent" />
      </div>

      {/* Label */}
      <span
        ref={labelRef}
        className="absolute label-mono"
        style={{ right: '6vw', top: '6vh' }}
      >
        PLATFORM
      </span>

      {/* Caption */}
      <p
        ref={captionRef}
        className="absolute text-sm text-muted-foreground"
        style={{ right: '6vw', bottom: '8vh' }}
      >
        Real-time. Any device.
      </p>

      {/* Glass Panel */}
      <div
        ref={panelRef}
        className="absolute glass-panel rounded-3xl p-8 md:p-12"
        style={{
          left: '6vw',
          top: '14vh',
          width: 'min(40vw, 520px)',
          minHeight: 'auto'
        }}
      >
        <h2 className="panel-content font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
          Command Center{' '}
          <span className="text-gradient">Visibility</span>
        </h2>

        <p className="panel-content text-muted-foreground mb-8 leading-relaxed">
          Monitor sites from anywhere. Get instant alerts, review footage, and manage access from a single pane—desktop or mobile.
        </p>

        <div className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="panel-content flex items-center gap-4 group"
            >
              <div className="w-10 h-10 rounded-lg bg-cyan/10 flex items-center justify-center group-hover:bg-cyan/20 transition-colors">
                <feature.icon className="w-5 h-5 text-cyan" />
              </div>
              <span className="text-white/90">{feature.text}</span>
            </div>
          ))}
        </div>

        <button className="panel-content group px-6 py-3 bg-cyan text-dark font-semibold rounded-xl hover:bg-cyan-light transition-all duration-300 shadow-glow hover:shadow-glow-strong flex items-center gap-2">
          Book a Demo
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
