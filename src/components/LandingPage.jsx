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

const LandingPage = () => {
    return (
        <>
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
