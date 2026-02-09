import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Radio, Camera, Wifi } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: '01',
    title: 'Two-Way Radio & Repeaters',
    description: 'Reliable voice networks for security, logistics, and remote operations.',
    image: '/services_radio.jpg',
    icon: Radio,
    size: 'large'
  },
  {
    id: '02',
    title: 'CCTV & ANPR Systems',
    description: '24/7 monitoring, smart analytics, and license plate recognition.',
    image: '/services_camera.jpg',
    icon: Camera,
    size: 'small'
  },
  {
    id: '03',
    title: 'Wireless Internet',
    description: 'High-capacity links and managed connectivity for campuses and enterprises.',
    image: '/services_satellite.jpg',
    icon: Wifi,
    size: 'small'
  }
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightTopRef = useRef<HTMLDivElement>(null);
  const rightBottomRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const label = labelRef.current;
    const leftCard = leftCardRef.current;
    const rightTop = rightTopRef.current;
    const rightBottom = rightBottomRef.current;

    if (!section || !label || !leftCard || !rightTop || !rightBottom) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // Label entrance
      scrollTl.fromTo(label,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, ease: 'none' },
        0
      );

      // Left card entrance (0-30%)
      scrollTl.fromTo(leftCard,
        { x: '-60vw', opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'power2.out' },
        0
      );

      // Right top card entrance (5-30%)
      scrollTl.fromTo(rightTop,
        { x: '60vw', opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'power2.out' },
        0.05
      );

      // Right bottom card entrance (10-30%)
      scrollTl.fromTo(rightBottom,
        { x: '60vw', opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'power2.out' },
        0.1
      );

      // Card content reveals
      scrollTl.fromTo(
        leftCard.querySelectorAll('.card-content'),
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
        0.12
      );

      scrollTl.fromTo(
        rightTop.querySelectorAll('.card-content'),
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
        0.16
      );

      scrollTl.fromTo(
        rightBottom.querySelectorAll('.card-content'),
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
        0.2
      );

      // Exit phase (70-100%)
      scrollTl.fromTo(leftCard,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(rightTop,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(rightBottom,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(label,
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
      id="services"
      className="section-pinned z-20 bg-dark"
    >
      {/* Label */}
      <span
        ref={labelRef}
        className="absolute label-mono"
        style={{ left: '6vw', top: '6vh' }}
      >
        SERVICES
      </span>

      {/* Cards Container */}
      <div className="absolute inset-0 flex items-center justify-center px-[6vw] py-[14vh]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full h-full max-w-7xl">
          {/* Left Large Card */}
          <div
            ref={leftCardRef}
            className="relative row-span-2 rounded-3xl overflow-hidden group cursor-pointer"
            style={{ minHeight: '400px' }}
          >
            <div className="absolute inset-0">
              <img
                src={services[0].image}
                alt={services[0].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />
            </div>
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <span className="card-content font-mono text-cyan text-sm mb-3">{services[0].id}</span>
              <div className="card-content flex items-center gap-3 mb-3">
                <Radio className="w-6 h-6 text-cyan" />
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-white">
                  {services[0].title}
                </h3>
              </div>
              <p className="card-content text-muted-foreground max-w-md">
                {services[0].description}
              </p>
            </div>
            <div className="absolute inset-0 border border-white/5 rounded-3xl group-hover:border-cyan/30 transition-colors duration-500" />
          </div>

          {/* Right Top Card */}
          <div
            ref={rightTopRef}
            className="relative rounded-3xl overflow-hidden group cursor-pointer"
            style={{ minHeight: '200px' }}
          >
            <div className="absolute inset-0">
              <img
                src={services[1].image}
                alt={services[1].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent" />
            </div>
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <span className="card-content font-mono text-cyan text-sm mb-2">{services[1].id}</span>
              <div className="card-content flex items-center gap-3 mb-2">
                <Camera className="w-5 h-5 text-cyan" />
                <h3 className="font-heading text-xl md:text-2xl font-bold text-white">
                  {services[1].title}
                </h3>
              </div>
              <p className="card-content text-muted-foreground text-sm max-w-sm">
                {services[1].description}
              </p>
            </div>
            <div className="absolute inset-0 border border-white/5 rounded-3xl group-hover:border-cyan/30 transition-colors duration-500" />
          </div>

          {/* Right Bottom Card */}
          <div
            ref={rightBottomRef}
            className="relative rounded-3xl overflow-hidden group cursor-pointer"
            style={{ minHeight: '200px' }}
          >
            <div className="absolute inset-0">
              <img
                src={services[2].image}
                alt={services[2].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent" />
            </div>
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <span className="card-content font-mono text-cyan text-sm mb-2">{services[2].id}</span>
              <div className="card-content flex items-center gap-3 mb-2">
                <Wifi className="w-5 h-5 text-cyan" />
                <h3 className="font-heading text-xl md:text-2xl font-bold text-white">
                  {services[2].title}
                </h3>
              </div>
              <p className="card-content text-muted-foreground text-sm max-w-sm">
                {services[2].description}
              </p>
            </div>
            <div className="absolute inset-0 border border-white/5 rounded-3xl group-hover:border-cyan/30 transition-colors duration-500" />
          </div>
        </div>
      </div>
    </section>
  );
}
