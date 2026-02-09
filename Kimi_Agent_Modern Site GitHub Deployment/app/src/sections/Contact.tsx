import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, Download, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;

    if (!section || !left || !right) return;

    const ctx = gsap.context(() => {
      // Left column animation
      gsap.fromTo(left,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          }
        }
      );

      // Right column animation
      gsap.fromTo(right,
        { x: '6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          }
        }
      );

      // Form fields stagger
      const fields = left.querySelectorAll('.form-field');
      gsap.fromTo(fields,
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: left,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1,
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative z-50 bg-dark-light py-20 md:py-28"
    >
      <div className="px-6 md:px-[6vw] max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Form */}
          <div ref={leftRef}>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Ready to secure your{' '}
              <span className="text-gradient">operations</span>?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg">
              Tell us what you're building. We'll recommend a system, timeline, and budget—no guesswork.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <a
                href="mailto:operations@khuseloafrica.com"
                className="form-field flex items-center gap-4 text-white/80 hover:text-cyan transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-cyan/10 flex items-center justify-center group-hover:bg-cyan/20 transition-colors">
                  <Mail className="w-5 h-5 text-cyan" />
                </div>
                operations@khuseloafrica.com
              </a>
              <a
                href="tel:+270152973734"
                className="form-field flex items-center gap-4 text-white/80 hover:text-cyan transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-cyan/10 flex items-center justify-center group-hover:bg-cyan/20 transition-colors">
                  <Phone className="w-5 h-5 text-cyan" />
                </div>
                +27 (0) 15 297 3734
              </a>
              <div className="form-field flex items-center gap-4 text-white/80">
                <div className="w-10 h-10 rounded-lg bg-cyan/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-cyan" />
                </div>
                1 Industria Street, Polokwane, South Africa
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-field">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-dark border border-white/10 rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:border-cyan/50 transition-colors"
                    required
                  />
                </div>
                <div className="form-field">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-dark border border-white/10 rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:border-cyan/50 transition-colors"
                    required
                  />
                </div>
              </div>
              <div className="form-field">
                <input
                  type="text"
                  name="company"
                  placeholder="Company name"
                  value={formState.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark border border-white/10 rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:border-cyan/50 transition-colors"
                />
              </div>
              <div className="form-field">
                <textarea
                  name="message"
                  placeholder="Tell us about your project..."
                  value={formState.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-dark border border-white/10 rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:border-cyan/50 transition-colors resize-none"
                  required
                />
              </div>
              <div className="form-field flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  className="group px-6 py-3 bg-cyan text-dark font-semibold rounded-xl hover:bg-cyan-light transition-all duration-300 shadow-glow hover:shadow-glow-strong flex items-center justify-center gap-2"
                >
                  {submitted ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Message Sent
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="px-6 py-3 border border-white/20 text-white font-medium rounded-xl hover:bg-white/5 hover:border-cyan/50 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Company Profile
                </button>
              </div>
            </form>
          </div>

          {/* Right Column - Image */}
          <div ref={rightRef} className="relative">
            <div className="relative rounded-3xl overflow-hidden h-full min-h-[400px]">
              <img
                src="/contact_team.jpg"
                alt="Our team"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
              
              {/* Stats overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass-panel rounded-2xl p-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="font-heading text-2xl md:text-3xl font-bold text-cyan">15+</div>
                      <div className="text-xs text-muted-foreground mt-1">Years Experience</div>
                    </div>
                    <div>
                      <div className="font-heading text-2xl md:text-3xl font-bold text-cyan">500+</div>
                      <div className="text-xs text-muted-foreground mt-1">Projects Done</div>
                    </div>
                    <div>
                      <div className="font-heading text-2xl md:text-3xl font-bold text-cyan">4</div>
                      <div className="text-xs text-muted-foreground mt-1">Branches</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
