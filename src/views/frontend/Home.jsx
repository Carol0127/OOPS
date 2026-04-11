import HeroSwiper from "../../components/HeroSwiper";
import Marquee from "../../components/Marquee";
import FeaturePhoto from "../../components/FeaturePhoto";

import "swiper/css";
import SerieSwiper from "../../components/SeriesSwiper";
import ContactForm from "../../components/ContactForm";
import Activities from "../../components/Activities";
import AboutSection from "../../components/AboutSection";

function Home() {
  return (
    <>
      <section className="w-full lg:p-10 lg:mt-20 lg:mb-5">
        <HeroSwiper />
      </section>
      <section className="max-w-324 mx-auto py-20 lg:py-30 px-4">
        <AboutSection />
      </section>
      <section className="w-full">
        <Marquee />
        <Activities spacing="py-30" />
      </section>
      <section className="py-20">
        <FeaturePhoto />
      </section>
      <section className="bg-neutral-200 py-20 lg:py-30 ps-4 lg:px-0">
        <SerieSwiper />
      </section>
      <section className="w-full py-14 lg:py-30">
        <div className="hero-section py-14 rounded-4xl lg:mx-10 lg:rounded-[100px]">
          <ContactForm />
        </div>
      </section>
    </>
  );
}

export default Home;
