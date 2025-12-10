import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import Section from "./reusable/Section";

const Contact = () => {
    const GYM_INFO = {
        name: "Jayaram Fitness",
        address: "Jaganadhagiri village, Dhraksharmam road, Kakinada, AP",
        phone: "+91 98765 43210",
        email: "contact@jayaramfitness.com",
        whatsapp: "919876543210",
    };

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const whatsappLink = `https://wa.me/${GYM_INFO.whatsapp}?text=Hi%20Jayaram%20Fitness!%20I'd%20like%20to%20know%20more%20about%20your%20membership%20plans.`;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Simple alert instead of toast for now
        alert("Message Sent! We'll get back to you within 24 hours.");

        setFormData({ name: "", email: "", phone: "", message: "" });
        setLoading(false);
    };

    return (
        <>
            <Section className="relative">
                <div className="absolute inset-0 h-1/2 w-full bg-primaryVar4 blur-[400px]" />

                <div className="container relative z-10 text-center space-y-4">
                    <h2 className="text-3xl font-semibold lg:text-4xl lg:font-bold xl:text-5xl font-gagalin">
                        Get in <span className="text-primary">Touch</span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-sm lg:text-base text-gray-300">
                        Have questions? We'd love to hear from you. Reach out via WhatsApp for
                        the fastest response.
                    </p>
                </div>
            </Section>

            <Section className="py-10">
                <div className="container">
                    <div className="grid gap-8 lg:grid-cols-1 lg:gap-12">
                        {/* Contact Info */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-2xl font-semibold tracking-wide md:text-3xl font-gagalin">
                                    Contact <span className="text-primary">Information</span>
                                </h3>
                                <p className="mt-2 text-sm text-gray-400">
                                    Stop by our gym, give us a call, or send us a message. We're
                                    here to help you start your fitness journey.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <a
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 rounded-xl border border-white/10 bg-greyLight p-4 transition-all hover:border-primary/50 hover:bg-white/5"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/20">
                                        <MessageCircle className="h-6 w-6 text-green-500" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-white">WhatsApp (Fastest)</div>
                                        <div className="text-sm text-gray-400">
                                            Click to chat with us
                                        </div>
                                    </div>
                                </a>

                                <a
                                    href={`tel:${GYM_INFO.phone}`}
                                    className="flex items-center gap-4 rounded-xl border border-white/10 bg-greyLight p-4 transition-all hover:border-primary/50 hover:bg-white/5"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                                        <Phone className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-white">Phone</div>
                                        <div className="text-sm text-gray-400">
                                            {GYM_INFO.phone}
                                        </div>
                                    </div>
                                </a>

                                <a
                                    href={`mailto:${GYM_INFO.email}`}
                                    className="flex items-center gap-4 rounded-xl border border-white/10 bg-greyLight p-4 transition-all hover:border-primary/50 hover:bg-white/5"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                                        <Mail className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-white">Email</div>
                                        <div className="text-sm text-gray-400">
                                            {GYM_INFO.email}
                                        </div>
                                    </div>
                                </a>

                                <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-greyLight p-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                                        <MapPin className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-white">Address</div>
                                        <div className="text-sm text-gray-400">
                                            {GYM_INFO.address}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Map */}
                            <div className="overflow-hidden rounded-xl border border-white/10 bg-greyLight">
                                <iframe
                                    title="Jayaram Fitness Location"
                                    src="https://maps.google.com/maps?q=Jaganadhagiri%20village,Dhraksharmam%20road,Kakinada,Andhra%20Pradesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                    width="100%"
                                    height="250"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="block w-full"
                                />
                            </div>
                        </div>

                        {/* Contact Form */}
                        {/* <div className="h-fit rounded-2xl border border-white/10 bg-greyLight p-6 md:p-8">
                            <h2 className="text-2xl font-semibold tracking-wide text-white font-gagalin">
                                Send us a Message
                            </h2>
                            <p className="mt-2 text-sm text-gray-400">
                                Fill out the form below and we'll get back to you within 24 hours.
                            </p>

                            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-white">
                                        Full Name *
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="Your name"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                        required
                                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                </div>

                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium text-white">
                                            Email *
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            value={formData.email}
                                            onChange={(e) =>
                                                setFormData({ ...formData, email: e.target.value })
                                            }
                                            required
                                            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="text-sm font-medium text-white">
                                            Phone
                                        </label>
                                        <input
                                            id="phone"
                                            type="tel"
                                            placeholder="+91 98765 43210"
                                            value={formData.phone}
                                            onChange={(e) =>
                                                setFormData({ ...formData, phone: e.target.value })
                                            }
                                            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-white">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        placeholder="How can we help you?"
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) =>
                                            setFormData({ ...formData, message: e.target.value })
                                        }
                                        required
                                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3 text-base font-medium text-white transition-all hover:bg-primaryVar1 disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    {loading ? (
                                        "Sending..."
                                    ) : (
                                        <>
                                            <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </div> */}
                    </div>
                </div>
            </Section>
        </>
    );
};

export default Contact;
