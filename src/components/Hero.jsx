import React from "react";
import { MessageCircle, ArrowRight } from "lucide-react";
import heroImage from "../assets/images/hero-gym.jpg";

// Simple Button component to mimic the requested API
const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  asChild = false,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    default: "bg-primary text-white hover:bg-primaryVar1",
    outline: "border border-white/20 bg-transparent hover:bg-white/10 hover:text-white",
    ghost: "hover:bg-white/10 hover:text-white",
    link: "text-primary underline-offset-4 hover:underline",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    xl: "h-14 px-8 rounded-full text-lg",
    icon: "h-10 w-10",
  };

  const classes = `${baseStyles} ${variants[variant] || variants.default} ${sizes[size] || sizes.default} ${className}`;

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: `${classes} ${children.props.className || ""}`,
      ...props,
    });
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

const Hero = () => {
  const whatsappLink = "https://wa.me/917780367903"; // Placeholder, replace with actual number if available

  return (
    <section className="relative min-h-[90vh] overflow-hidden flex items-center font-vazirmatn">
      {/* Background Image with modern overlay */}
      <div className="absolute inset-0 z-0" >
        <video autoPlay loop muted className="h-full w-full object-cover  scale-105 animate-slow-zoom">
          <source src="https://cdn.pixabay.com/video/2024/02/15/200657-913478674_large.mp4" type="video/mp4" />
        </video>
        {/* <img
          src={heroImage}
          alt="Jayaram Fitness gym interior"
          className="h-full w-full object-cover scale-105 animate-slow-zoom"
        /> */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="container  relative z-10 flex flex-col justify-center pt-20">
        <div className="max-w-3xl space-y-8 animate-slide-up">
          <h1 className="text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl lg:text-8xl font-gagalin">
            Elevate Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/50">
              Potential
            </span>
          </h1>

          <p className="max-w-xl text-lg text-gray-300 md:text-xl font-light leading-relaxed">
            Experience the premier fitness destination in{" "}
            <span className="text-white font-medium">
              Jaganadhagiri village, Dhraksharmam road, Kakinada
            </span>
            . Expert trainers, premium equipment, and a vibe that fuels your
            ambition.
          </p>

          <div className="flex flex-col gap-5 pt-4 sm:flex-row">
            <Button
              asChild
              size="xl"
              className="group text-lg h-14 px-8 rounded-full bg-primary hover:bg-primaryVar1 shadow-lg shadow-primary/25 transition-all hover:scale-105"
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
                Start Your Journey
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="xl"
              className="group text-lg h-14 px-8 rounded-full border-white/20 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10 hover:border-white/40 transition-all hover:scale-105"
            >
              <a href="#programs">
                Explore Plans
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>

          <div className="flex justify-center md:justify-start items-center gap-8 pt-8 text-sm text-gray-400">
            <div>
              <p className="text-2xl font-bold text-white">50 +</p>
              <p>Happy Members</p>
            </div>
            <div className="h-8 w-px bg-white/10"></div>
            <div>
              <p className="text-2xl font-bold text-white">5 +</p>
              <p>Expert Coaches</p>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
};

export default Hero;
