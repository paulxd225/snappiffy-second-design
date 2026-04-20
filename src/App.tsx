import { Header } from './sections/Header';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Benefits } from './sections/Benefits';
import { Services } from './sections/Services';
import { CaseStudy } from './sections/CaseStudy';
import { Projects } from './sections/Projects';
import { Industries } from './sections/Industries';
import { Timeline } from './sections/Timeline';
import { FAQ } from './sections/FAQ';
import { Footer } from './sections/Footer';

export default function App() {
  return (
    <>
      <Header/>
      <Hero/>
      <About/>
      <Benefits/>
      <Services/>
      <CaseStudy/>
      <Projects/>
      <Industries/>
      <Timeline/>
      <FAQ/>
      <Footer/>
    </>
  );
}
