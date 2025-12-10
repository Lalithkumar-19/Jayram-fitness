import { useEffect, useState } from "react";
import { Menu, X, Dumbbell, MessageCircle } from "lucide-react";

// Local Constants and Utilities
const GYM_INFO = {
  name: "JayRam Fitness",
  whatsapp: "917780367903", // Updated to provided number format
};

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  // { label: "Our Services", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Our Trainers", href: "#coaching" },
  { label: "Membership Plans", href: "#membership" },
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleScroll = () => {
      setIsOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);


  const whatsappLink = `https://wa.me/${GYM_INFO.whatsapp}?text=Hi%20Jayaram%20Fitness!%20I'd%20like%20to%20know%20more%20about%20your%20membership%20plans.`;

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-transparent backdrop-blur-lg transition-all duration-300">
      <div className="container flex h-16 items-center justify-between md:h-20">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary md:h-10 md:w-10 transition-transform group-hover:scale-105">
            <Dumbbell className="h-5 w-5 text-white md:h-6 md:w-6" />
          </div>
          <span className="font-gagalin text-xl tracking-wider text-white md:text-2xl transition-colors group-hover:text-primary">
            {GYM_INFO.name}
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary text-gray-300 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex  items-center justify-center gap-2 rounded-lg bg-red-500 px-8 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#25D366]/20 transition-all hover:bg-red-600 hover:scale-105 active:scale-95"
          >
            <MessageCircle className="h-7 w-7" />
            Join Now
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-white md:hidden hover:bg-white/10 transition-colors"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-white/10 bg-[#1D1D1D] md:hidden animate-in slide-in-from-top-5 duration-200">
          <nav className="container flex flex-col gap-2 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "rounded-lg px-4 py-3 text-sm font-medium transition-colors text-gray-300 hover:bg-white/5 hover:text-primary"
                )}
              >
                {link.label}
              </a>
            ))}
            <div className="px-4 pt-2">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-red-600 hover:scale-105 active:scale-95"
              >
                <MessageCircle className="h-5 w-5" />
                Join Now on WhatsApp
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
