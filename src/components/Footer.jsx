import { Dumbbell, Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";

export default function Footer() {
  const GYM_INFO = {
    name: "JayRam Fitness",
    tagline: "Transform Your Body, Transform Your Life",
    phone: "+91 7780367903",
    email: "contact@jayaramfitness.com",
    whatsapp: "917780367903",
    address: "Jaganadhagiri village, Dhraksharmam road, Kakinada, AP",
    hours: {
      weekdays: "5:00 AM - 10:00 PM",
      weekends: "5:00 PM - 9:00 PM",
    },
    social: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      youtube: "https://youtube.com",
    },
  };

  const NAV_LINKS = [
    { label: "Home", href: "#home" },
    // { label: "Our Services", href: "#about" },
    { label: "Programs", href: "#programs" },
    { label: "Our Trainers", href: "#coaching" },
    { label: "Membership Plans", href: "#membership" },
  ];


  return (
    <footer className="border-t border-white/10 bg-grey pt-12 md:pt-16 pb-8">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <a href="#" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
                <Dumbbell className="h-6 w-6" />
              </div>
              <span className="font-gagalin text-2xl tracking-wider text-white">{GYM_INFO.name}</span>
            </a>
            <p className="text-sm text-gray-400">
              {GYM_INFO.tagline}
            </p>
            <div className="flex gap-4">
              <a
                href={GYM_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={GYM_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-primary"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={GYM_INFO.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-primary"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-gagalin text-xl tracking-wide text-white">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-gray-400 transition-colors hover:text-primary w-fit"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h3 className="font-gagalin text-xl tracking-wide text-white">Hours</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>
                <span className="font-medium text-white">Morning :</span>{" "}
                {GYM_INFO.hours.weekdays}
              </p>
              <p>
                <span className="font-medium text-white">Evening :</span>{" "}
                {GYM_INFO.hours.weekends}
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-gagalin text-xl tracking-wide text-white">Contact</h3>
            <div className="space-y-3 text-sm">
              <a
                href={`tel:${GYM_INFO.phone}`}
                className="flex items-center gap-2 text-gray-400 transition-colors hover:text-primary w-fit"
              >
                <Phone className="h-4 w-4" />
                {GYM_INFO.phone}
              </a>
              <a
                href={`mailto:${GYM_INFO.email}`}
                className="flex items-center gap-2 text-gray-400 transition-colors hover:text-primary w-fit"
              >
                <Mail className="h-4 w-4" />
                {GYM_INFO.email}
              </a>
              <div className="flex items-start gap-2 text-gray-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{GYM_INFO.address}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center text-sm text-gray-400 md:flex-row">
          <p>&copy; {new Date().getFullYear()} {GYM_INFO.name}. All rights reserved.</p>
          {/* <div className="flex gap-4">
            <a href="#" className="hover:text-primary">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary">
              Terms of Service
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
