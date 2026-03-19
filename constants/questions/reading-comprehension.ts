import type { ReadingPassage } from "@/features/assessment/types";

export const READING_COMPREHENSION_PASSAGE: ReadingPassage = {
  id: "rc-passage-1",
  title: "El agua: recurso vital en peligro",
  content: `El agua es uno de los recursos más importantes para la vida en la Tierra. Cubre aproximadamente el 71% de la superficie del planeta, pero solo el 2.5% es agua dulce, y de esa cantidad, menos del 1% está disponible para el consumo humano directo. El resto se encuentra congelada en glaciares y casquetes polares o en acuíferos subterráneos de difícil acceso.

A pesar de su aparente abundancia, el agua dulce es un recurso cada vez más escaso. El crecimiento poblacional, la industrialización y la agricultura intensiva han incrementado dramáticamente la demanda de agua en las últimas décadas. Se estima que la agricultura consume alrededor del 70% del agua dulce disponible a nivel mundial, mientras que la industria utiliza un 20% y el uso doméstico representa apenas el 10% restante.

El cambio climático agrava esta situación de múltiples maneras. Las alteraciones en los patrones de precipitación provocan sequías más prolongadas en algunas regiones y lluvias torrenciales en otras. El derretimiento acelerado de los glaciares, que funcionan como reservorios naturales de agua dulce, representa una amenaza a largo plazo para millones de personas que dependen de los ríos alimentados por estas fuentes.

La contaminación del agua es otro problema crítico. Los vertidos industriales, los pesticidas agrícolas y las aguas residuales sin tratar terminan en ríos, lagos y acuíferos, reduciendo aún más la cantidad de agua apta para el consumo. Según la Organización Mundial de la Salud, aproximadamente 2,000 millones de personas en el mundo utilizan fuentes de agua contaminadas.

Frente a estos desafíos, diversas soluciones se están implementando a nivel global. La desalinización del agua de mar, aunque costosa y energéticamente intensiva, se ha convertido en una alternativa viable en regiones áridas como Medio Oriente. La reutilización de aguas residuales tratadas para riego agrícola e industrial es otra estrategia en crecimiento. Además, tecnologías de riego por goteo y sistemas de captación de agua de lluvia permiten un uso más eficiente del recurso disponible.

Sin embargo, los expertos coinciden en que la solución más efectiva a largo plazo es la gestión integral de los recursos hídricos, que combina políticas públicas, educación ambiental, innovación tecnológica y cooperación internacional. Sin un cambio fundamental en la forma en que valoramos y administramos el agua, las generaciones futuras enfrentarán una crisis hídrica sin precedentes.`,
  questions: [
    {
      key: "rc-q1",
      prompt: "Según el texto, ¿qué porcentaje del agua en la Tierra es agua dulce?",
      options: [
        { id: "a", text: "71%" },
        { id: "b", text: "2.5%" },
        { id: "c", text: "1%" },
        { id: "d", text: "10%" },
      ],
      correctOptionId: "b",
      order: 1,
    },
    {
      key: "rc-q2",
      prompt: "¿Cuál es el sector que consume la mayor cantidad de agua dulce a nivel mundial?",
      options: [
        { id: "a", text: "La industria" },
        { id: "b", text: "El uso doméstico" },
        { id: "c", text: "La agricultura" },
        { id: "d", text: "La minería" },
      ],
      correctOptionId: "c",
      order: 2,
    },
    {
      key: "rc-q3",
      prompt: "Según el texto, ¿cómo afecta el cambio climático a los recursos hídricos?",
      options: [
        { id: "a", text: "Solo provoca sequías en todas las regiones" },
        { id: "b", text: "Altera los patrones de precipitación y acelera el derretimiento de glaciares" },
        { id: "c", text: "Aumenta la cantidad de agua dulce disponible" },
        { id: "d", text: "No tiene relación con los recursos hídricos" },
      ],
      correctOptionId: "b",
      order: 3,
    },
    {
      key: "rc-q4",
      prompt: "¿Cuántas personas aproximadamente utilizan fuentes de agua contaminadas según la OMS?",
      options: [
        { id: "a", text: "500 millones" },
        { id: "b", text: "1,000 millones" },
        { id: "c", text: "2,000 millones" },
        { id: "d", text: "3,500 millones" },
      ],
      correctOptionId: "c",
      order: 4,
    },
    {
      key: "rc-q5",
      prompt: "¿Qué desventaja se menciona sobre la desalinización del agua de mar?",
      options: [
        { id: "a", text: "Es lenta y poco efectiva" },
        { id: "b", text: "Solo funciona en climas fríos" },
        { id: "c", text: "Es costosa y consume mucha energía" },
        { id: "d", text: "Contamina los océanos" },
      ],
      correctOptionId: "c",
      order: 5,
    },
    {
      key: "rc-q6",
      prompt: "¿Cuál es la idea principal del último párrafo del texto?",
      options: [
        { id: "a", text: "La tecnología resolverá todos los problemas del agua" },
        { id: "b", text: "La gestión integral de recursos hídricos es la solución más efectiva a largo plazo" },
        { id: "c", text: "La cooperación internacional es imposible de lograr" },
        { id: "d", text: "Las generaciones futuras no tendrán problemas de agua" },
      ],
      correctOptionId: "b",
      order: 6,
    },
    {
      key: "rc-q7",
      prompt: "¿Qué se puede inferir del texto sobre la relación entre población y agua?",
      options: [
        { id: "a", text: "El crecimiento poblacional no afecta la disponibilidad de agua" },
        { id: "b", text: "A mayor población, menor demanda de agua" },
        { id: "c", text: "El crecimiento poblacional incrementa la presión sobre los recursos hídricos" },
        { id: "d", text: "La población mundial está disminuyendo" },
      ],
      correctOptionId: "c",
      order: 7,
    },
    {
      key: "rc-q8",
      prompt: "¿Cuál de las siguientes NO se menciona como una solución al problema del agua?",
      options: [
        { id: "a", text: "Desalinización del agua de mar" },
        { id: "b", text: "Reutilización de aguas residuales" },
        { id: "c", text: "Construcción de represas en todos los ríos" },
        { id: "d", text: "Sistemas de captación de agua de lluvia" },
      ],
      correctOptionId: "c",
      order: 8,
    },
  ],
};
