import Blog from "./Blog";
import Community from "./Community";
import Contact from "./Contact";
import Faq from "./Faq";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import OurWebsite from "./OurWebsite";
import Plans from "./Plans";
import Services from "./Services";
import Testimonials from "./Testimonials";
import Tools from "./Tools";
import Trainers from "./Trainers";

import { Helmet } from "react-helmet-async";

const LandingPage = () => {
    return (
        <>
            <Helmet>
                <title>Home</title>
                <meta name="description" content="Welcome to JayRam Fitness - The ultimate destination for fitness enthusiasts. Explore our plans, trainers, and facilities." />
                <link rel="canonical" href="https://www.jayramfitness.fit/" />
            </Helmet>
            <Header />
            <div id="home">
                <Hero />
            </div>
            <div id="about">
                <OurWebsite />
            </div>
            <div id="programs">
                <Services />
            </div>
            <div id="coaching">
                <Trainers />
            </div>
            <div id="membership">
                <Plans />
            </div>
            <Testimonials />
            <Tools />
            <Faq />
            <Contact />
            <Footer />
        </>
    );
};

export default LandingPage;
