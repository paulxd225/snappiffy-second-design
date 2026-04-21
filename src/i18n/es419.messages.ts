import type { Messages } from "./en.messages";
import { esESMessages } from "./esES.messages";

const base = JSON.parse(JSON.stringify(esESMessages)) as Messages;
base.hero.phrases = [
	"celulares a medida,",
	"marketplaces,",
	"apps internas,",
	"sitios web,",
	"MVP,",
	"soluciones,",
];
base.hero.prefix = "Apps ";
base.footer.labelEmail = "Correo electrónico";
base.timeline.steps[0].d =
	"Agenda una llamada de descubrimiento o visita presencial (solo en Ohio) para entender a fondo tus necesidades y procesos. Te entregamos un plan con alcance, plazos, presupuesto y entregables.";

export const es419Messages: Messages = base;
