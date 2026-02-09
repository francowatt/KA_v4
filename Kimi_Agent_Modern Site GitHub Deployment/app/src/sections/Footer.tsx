import { Linkedin, Twitter } from 'lucide-react';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
  { label: 'Privacy Policy', href: '#' },
];

export default function Footer() {
  return (
    <footer className="relative z-50 bg-dark border-t border-white/5">
      <div className="px-6 md:px-[6vw] py-12 md:py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <div>
            <div className="font-heading text-2xl font-bold text-white mb-3">
              Khuselo
            </div>
            <p className="text-gradient font-heading text-lg font-semibold mb-4">
              Secure. Connect. Control.
            </p>
            <p className="text-muted-foreground text-sm max-w-xs">
              End-to-end communications, networking, and surveillance solutions across South Africa.
            </p>
          </div>

          {/* Links */}
          <div>
            <div className="label-mono mb-4">NAVIGATION</div>
            <ul className="space-y-3">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-cyan transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <div className="label-mono mb-4">CONNECT</div>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-cyan/20 transition-colors group"
              >
                <Linkedin className="w-5 h-5 text-white/70 group-hover:text-cyan transition-colors" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-cyan/20 transition-colors group"
              >
                <Twitter className="w-5 h-5 text-white/70 group-hover:text-cyan transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2026 Khuselo Africa. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Designed with precision. Built for reliability.
          </p>
        </div>
      </div>
    </footer>
  );
}
