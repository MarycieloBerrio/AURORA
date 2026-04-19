import type { ReadingPassage } from "@/features/assessment/types";

export const READING_COMPREHENSION_PASSAGES: ReadingPassage[] = [
  {
    id: "rc-passage-1",
    title: "Los parques en las ciudades",
    content: `En muchos barrios de las ciudades colombianas, los parques cumplen una función importante en la vida de las personas. No solo son espacios para el descanso, sino también lugares donde los niños juegan, los jóvenes se reúnen y los adultos realizan actividad física. Sin embargo, en algunos sectores, estos espacios han sido descuidados por falta de mantenimiento o por el mal uso de los ciudadanos.

Un parque bien cuidado puede mejorar la calidad de vida de quienes viven cerca. Por ejemplo, las personas tienen un lugar seguro para caminar, hacer ejercicio o compartir con sus familias. Además, estos espacios ayudan a reducir el estrés y fomentan la convivencia entre vecinos. Por el contrario, cuando un parque está abandonado, puede convertirse en un foco de inseguridad y afectar negativamente la percepción del barrio.

En los últimos años, algunas comunidades han decidido organizarse para recuperar estos espacios. A través de jornadas de limpieza, siembra de árboles y actividades culturales, los vecinos logran transformar parques deteriorados en lugares agradables. Este tipo de iniciativas demuestra que la participación ciudadana es clave para mejorar el entorno.`,
    questions: [
      {
        key: "rc-q1",
        prompt: "¿Cuál es una función de los parques mencionada en el texto?",
        options: [
          { id: "a", text: "Ser lugares para la actividad física" },
          { id: "b", text: "Servir como centros comerciales" },
          { id: "c", text: "Funcionar como oficinas públicas" },
          { id: "d", text: "Reemplazar las escuelas" },
        ],
        correctOptionId: "a",
        points: 3,
        order: 1,
      },
      {
        key: "rc-q2",
        prompt: "¿Por qué un parque abandonado puede afectar negativamente a un barrio?",
        options: [
          { id: "a", text: "Porque puede generar inseguridad" },
          { id: "b", text: "Porque ocupa mucho espacio" },
          { id: "c", text: "Porque reduce el valor de las viviendas únicamente" },
          { id: "d", text: "Porque impide construir edificios" },
        ],
        correctOptionId: "a",
        points: 4,
        order: 2,
      },
      {
        key: "rc-q3",
        prompt: "¿Cuál de las siguientes acciones sería más coherente con la idea principal del texto?",
        options: [
          { id: "a", text: "Promover la participación comunitaria en su cuidado" },
          { id: "b", text: "Cerrar los parques para evitar su deterioro" },
          { id: "c", text: "Delegar el cuidado exclusivamente al gobierno" },
          { id: "d", text: "Convertir los parques en estacionamientos" },
        ],
        correctOptionId: "a",
        points: 5,
        order: 3,
      },
    ],
  },
  {
    id: "rc-passage-2",
    title: "La tecnología en la educación",
    content: `El uso de la tecnología en la educación ha aumentado considerablemente en las últimas décadas. En muchas instituciones educativas, los estudiantes utilizan computadores, tabletas y plataformas virtuales como parte de su proceso de aprendizaje. Estas herramientas permiten acceder a una gran cantidad de información y facilitan nuevas formas de enseñar y aprender.

No obstante, el uso de la tecnología también plantea desafíos. Por ejemplo, no todos los estudiantes tienen acceso a dispositivos o conexión a internet, lo que genera desigualdades. Además, el exceso de uso puede afectar la concentración y reducir la interacción directa entre estudiantes y docentes. Por esta razón, algunos expertos sugieren que la tecnología debe utilizarse de manera equilibrada.

A pesar de estas dificultades, muchos docentes han encontrado formas creativas de integrar la tecnología en sus clases. Desde el uso de videos educativos hasta simulaciones interactivas, estas herramientas pueden enriquecer el aprendizaje cuando se emplean adecuadamente. En este sentido, el reto no es eliminar la tecnología, sino aprender a usarla de manera responsable.`,
    questions: [
      {
        key: "rc-q4",
        prompt: "¿Qué dispositivos se mencionan en el texto?",
        options: [
          { id: "a", text: "Computadores y tabletas" },
          { id: "b", text: "Televisores y radios" },
          { id: "c", text: "Teléfonos fijos" },
          { id: "d", text: "Consolas de videojuegos" },
        ],
        correctOptionId: "a",
        points: 3,
        order: 4,
      },
      {
        key: "rc-q5",
        prompt: "¿Qué se puede deducir sobre el uso excesivo de la tecnología?",
        options: [
          { id: "a", text: "Puede afectar la concentración" },
          { id: "b", text: "Mejora siempre el aprendizaje" },
          { id: "c", text: "No tiene ningún efecto en los estudiantes" },
          { id: "d", text: "Reemplaza completamente al docente" },
        ],
        correctOptionId: "a",
        points: 4,
        order: 5,
      },
      {
        key: "rc-q6",
        prompt: "¿Cuál postura refleja mejor la intención del autor?",
        options: [
          { id: "a", text: "Utilizar la tecnología de manera equilibrada" },
          { id: "b", text: "Prohibir el uso de la tecnología en educación" },
          { id: "c", text: "Usar la tecnología sin restricciones" },
          { id: "d", text: "Sustituir a los docentes por tecnología" },
        ],
        correctOptionId: "a",
        points: 5,
        order: 6,
      },
    ],
  },
  {
    id: "rc-passage-3",
    title: "Las ciudades y el medio ambiente",
    content: `El crecimiento de las ciudades ha generado importantes cambios en el medio ambiente. La expansión urbana implica la transformación de ecosistemas naturales en espacios construidos, lo que afecta la biodiversidad y altera los ciclos naturales. Por ejemplo, la reducción de zonas verdes puede aumentar la temperatura en las ciudades, fenómeno conocido como "isla de calor urbana".

Además, el aumento de la población urbana incrementa la demanda de recursos como agua y energía. Esto puede generar presión sobre los sistemas de abastecimiento y contribuir al deterioro ambiental. A esto se suma la producción de residuos, que en muchos casos no se gestionan adecuadamente.

Sin embargo, algunas ciudades han comenzado a implementar estrategias para mitigar estos efectos. Entre ellas se encuentran la creación de corredores verdes, el uso de energías renovables y la promoción del transporte sostenible. Estas iniciativas buscan equilibrar el desarrollo urbano con la protección del medio ambiente.`,
    questions: [
      {
        key: "rc-q7",
        prompt: '¿Qué es una "isla de calor urbana"?',
        options: [
          { id: "a", text: "Un aumento de temperatura en la ciudad" },
          { id: "b", text: "Un tipo de parque" },
          { id: "c", text: "Un fenómeno marino" },
          { id: "d", text: "Un sistema de transporte" },
        ],
        correctOptionId: "a",
        points: 3,
        order: 7,
      },
      {
        key: "rc-q8",
        prompt: "¿Por qué aumenta la temperatura en las ciudades?",
        options: [
          { id: "a", text: "Por la reducción de zonas verdes" },
          { id: "b", text: "Por la presencia de ríos" },
          { id: "c", text: "Por la lluvia constante" },
          { id: "d", text: "Por el turismo" },
        ],
        correctOptionId: "a",
        points: 4,
        order: 8,
      },
      {
        key: "rc-q9",
        prompt: "¿Cuál medida es más coherente con el texto?",
        options: [
          { id: "a", text: "Promover el transporte sostenible" },
          { id: "b", text: "Eliminar los espacios verdes" },
          { id: "c", text: "Aumentar el uso de combustibles fósiles" },
          { id: "d", text: "Expandir la ciudad sin control" },
        ],
        correctOptionId: "a",
        points: 5,
        order: 9,
      },
    ],
  },
  {
    id: "rc-passage-4",
    title: "La ciencia y el conocimiento",
    content: `A lo largo de la historia, la ciencia ha sido considerada una de las principales herramientas para comprender el mundo. Sin embargo, el conocimiento científico no es estático, sino que evoluciona con el tiempo. Las teorías que en un momento se consideraron verdaderas pueden ser cuestionadas o reemplazadas a medida que surgen nuevas evidencias.

Este carácter dinámico de la ciencia implica que el conocimiento se construye de manera provisional. Es decir, las explicaciones científicas no son verdades absolutas, sino interpretaciones basadas en la mejor información disponible en un momento determinado. Este enfoque permite que la ciencia avance, ya que promueve la revisión constante de ideas.

No obstante, esta misma característica puede generar desconfianza en algunas personas, quienes interpretan los cambios en el conocimiento como una señal de debilidad. En realidad, la capacidad de cuestionar y corregir errores es una de las fortalezas más importantes de la ciencia. Comprender este aspecto es fundamental para desarrollar una visión crítica y fundamentada del conocimiento científico.`,
    questions: [
      {
        key: "rc-q10",
        prompt: "¿Cómo se describe el conocimiento científico en el texto?",
        options: [
          { id: "a", text: "Como dinámico y cambiante" },
          { id: "b", text: "Como definitivo e inmutable" },
          { id: "c", text: "Como irrelevante" },
          { id: "d", text: "Como basado en opiniones" },
        ],
        correctOptionId: "a",
        points: 3,
        order: 10,
      },
      {
        key: "rc-q11",
        prompt: "¿Por qué algunas personas desconfían de la ciencia?",
        options: [
          { id: "a", text: "Porque el conocimiento cambia con el tiempo" },
          { id: "b", text: "Porque no entienden los experimentos" },
          { id: "c", text: "Porque los científicos no investigan" },
          { id: "d", text: "Porque es demasiado sencilla" },
        ],
        correctOptionId: "a",
        points: 4,
        order: 11,
      },
      {
        key: "rc-q12",
        prompt: "¿Cuál afirmación refleja mejor la postura de quien escribió el texto?",
        options: [
          { id: "a", text: "La revisión constante fortalece la ciencia" },
          { id: "b", text: "La ciencia no es confiable" },
          { id: "c", text: "La ciencia debe evitar cambiar" },
          { id: "d", text: "El conocimiento científico es absoluto" },
        ],
        correctOptionId: "a",
        points: 5,
        order: 12,
      },
    ],
  },
];
