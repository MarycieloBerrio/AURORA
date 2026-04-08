export type CareerLevel = "Pregrado" | "Tecnología";

export interface MockCareer {
  id: string;
  title: string;
  area: string;
  level: CareerLevel;
  affinity: number;
  description: string;
}

export const MOCK_STEM_CAREERS: MockCareer[] = [
  {
    id: "software-eng",
    title: "Ingeniería de Software",
    area: "Tecnología",
    level: "Pregrado",
    affinity: 94,
    description: "Diseño, desarrollo y mantenimiento de sistemas y aplicaciones de software.",
  },
  {
    id: "data-science",
    title: "Ciencia de Datos",
    area: "Tecnología / Matemáticas",
    level: "Pregrado",
    affinity: 91,
    description: "Análisis e interpretación de grandes volúmenes de datos para extraer conocimiento.",
  },
  {
    id: "ai-ml",
    title: "Inteligencia Artificial",
    area: "Tecnología / Ciencias",
    level: "Pregrado",
    affinity: 88,
    description: "Desarrollo de sistemas capaces de aprender, razonar y resolver problemas.",
  },
  {
    id: "systems-eng",
    title: "Ingeniería en Sistemas",
    area: "Tecnología",
    level: "Tecnología",
    affinity: 85,
    description: "Planificación, diseño e implementación de infraestructuras tecnológicas.",
  },
  {
    id: "cybersecurity",
    title: "Ciberseguridad",
    area: "Tecnología",
    level: "Tecnología",
    affinity: 82,
    description: "Protección de sistemas, redes y datos frente a ataques y vulnerabilidades.",
  },
  {
    id: "electronics-eng",
    title: "Ingeniería Electrónica",
    area: "Ingeniería",
    level: "Pregrado",
    affinity: 78,
    description: "Diseño y desarrollo de circuitos, dispositivos y sistemas electrónicos.",
  },
  {
    id: "mechatronics",
    title: "Ingeniería Mecatrónica",
    area: "Ingeniería",
    level: "Pregrado",
    affinity: 75,
    description: "Integración de mecánica, electrónica y software en sistemas automatizados.",
  },
  {
    id: "biotech",
    title: "Biotecnología",
    area: "Ciencias Biológicas",
    level: "Pregrado",
    affinity: 71,
    description: "Aplicación de organismos vivos y procesos biológicos en productos y servicios.",
  },
  {
    id: "applied-math",
    title: "Matemáticas Aplicadas",
    area: "Ciencias Exactas",
    level: "Pregrado",
    affinity: 67,
    description: "Uso de modelos matemáticos para resolver problemas en ciencia e ingeniería.",
  },
  {
    id: "dev-software",
    title: "Desarrollo de Software",
    area: "Tecnología",
    level: "Tecnología",
    affinity: 65,
    description: "Construcción de aplicaciones y sistemas mediante programación aplicada.",
  },
  {
    id: "chemical-eng",
    title: "Ingeniería Química",
    area: "Ingeniería",
    level: "Pregrado",
    affinity: 63,
    description: "Transformación de materias primas en productos útiles mediante procesos químicos.",
  },
  {
    id: "networks",
    title: "Redes y Telecomunicaciones",
    area: "Tecnología",
    level: "Tecnología",
    affinity: 61,
    description: "Diseño, implementación y gestión de infraestructuras de comunicación digital.",
  },
  {
    id: "physics",
    title: "Física Aplicada",
    area: "Ciencias Exactas",
    level: "Pregrado",
    affinity: 59,
    description: "Estudio de los principios físicos del universo y su aplicación tecnológica.",
  },
  {
    id: "biomedical-eng",
    title: "Ingeniería Biomédica",
    area: "Ingeniería / Salud",
    level: "Pregrado",
    affinity: 55,
    description: "Aplicación de principios de ingeniería al diseño de soluciones médicas.",
  },
  {
    id: "civil-eng",
    title: "Ingeniería Civil",
    area: "Ingeniería",
    level: "Pregrado",
    affinity: 51,
    description: "Diseño y construcción de infraestructuras como puentes, edificios y vías.",
  },
  {
    id: "computer-arch",
    title: "Arquitectura de Computadores",
    area: "Tecnología",
    level: "Pregrado",
    affinity: 47,
    description: "Diseño de la estructura interna y el funcionamiento de sistemas de cómputo.",
  },
  {
    id: "environmental-eng",
    title: "Ingeniería Ambiental",
    area: "Ingeniería / Ciencias",
    level: "Pregrado",
    affinity: 43,
    description: "Desarrollo de soluciones tecnológicas para proteger el medio ambiente.",
  },
];
