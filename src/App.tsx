import { About } from "./sections/About";
import { Benefits } from "./sections/Benefits";
import { CaseStudy } from "./sections/CaseStudy";
import { FAQ } from "./sections/FAQ";
import { Footer } from "./sections/Footer/Footer";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Industries } from "./sections/Industries";
import { Projects } from "./sections/Projects";
import { Services } from "./sections/Services";
import { Timeline } from "./sections/Timeline";

export default function App() {
	return (
		<>
			<Header />
			<Hero />
			<About />
			<Benefits />
			<Services />
			<CaseStudy />
			<Projects />
			<Industries />
			<Timeline />
			<FAQ />
			<Footer />
		</>
	);
}
