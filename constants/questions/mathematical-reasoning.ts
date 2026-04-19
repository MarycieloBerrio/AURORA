import type { SkillQuestion } from "@/features/assessment/types";

export const MATHEMATICAL_REASONING_QUESTIONS: SkillQuestion[] = [
  {
    key: "mr-q1",
    prompt:
      "Si una persona trabaja regularmente 42 horas a la semana, pero la semana pasada tuvo que hacer 6 horas extra, ¿cuántas horas trabajó en total?",
    options: [
      { id: "a", text: "48" },
      { id: "b", text: "50" },
      { id: "c", text: "36" },
      { id: "d", text: "46" },
    ],
    correctOptionId: "a",
    points: 2,
    order: 1,
  },
  {
    key: "mr-q2",
    prompt: "En una tienda, 3 botellas de agua cuestan $6.000. ¿Cuánto cuesta una botella?",
    options: [
      { id: "a", text: "$2.000" },
      { id: "b", text: "$1.000" },
      { id: "c", text: "$1.500" },
      { id: "d", text: "$3.000" },
    ],
    correctOptionId: "a",
    points: 2,
    order: 2,
  },
  {
    key: "mr-q3",
    prompt:
      "Si una bolsa de panes contiene exactamente 8 panes, ¿cuántos panes hay en 13 bolsas?",
    options: [
      { id: "a", text: "104" },
      { id: "b", text: "102" },
      { id: "c", text: "94" },
      { id: "d", text: "98" },
    ],
    correctOptionId: "a",
    points: 3,
    order: 3,
  },
  {
    key: "mr-q4",
    prompt:
      "Hoy gané $85.000 haciendo un trabajo, pero tengo una deuda de $42.700. Si la pago con ese dinero, ¿cuánto me quedará?",
    options: [
      { id: "a", text: "$42.300" },
      { id: "b", text: "$42.500" },
      { id: "c", text: "$43.300" },
      { id: "d", text: "$45.500" },
    ],
    correctOptionId: "a",
    points: 3,
    order: 4,
  },
  {
    key: "mr-q5",
    prompt:
      "Un grupo de 12 amigos compraron un pastel por $60.000. Si todos aportaron la misma cantidad, ¿cuánto pagó cada uno?",
    options: [
      { id: "a", text: "$5.000" },
      { id: "b", text: "$6.000" },
      { id: "c", text: "$4.500" },
      { id: "d", text: "$6.500" },
    ],
    correctOptionId: "a",
    points: 3,
    order: 5,
  },
  {
    key: "mr-q6",
    prompt:
      "Un ciclista recorre 30 kilómetros en una hora. ¿Cuántos kilómetros recorrerá en cuatro horas y media a esa misma velocidad?",
    options: [
      { id: "a", text: "135" },
      { id: "b", text: "120" },
      { id: "c", text: "125" },
      { id: "d", text: "115" },
    ],
    correctOptionId: "a",
    points: 3,
    order: 6,
  },
  {
    key: "mr-q7",
    prompt:
      "En una heladería se vendieron 540 helados, si el 60% de ellos eran de chocolate, ¿cuántos helados de chocolate se vendieron?",
    options: [
      { id: "a", text: "324" },
      { id: "b", text: "9" },
      { id: "c", text: "90" },
      { id: "d", text: "480" },
    ],
    correctOptionId: "a",
    points: 3,
    order: 7,
  },
  {
    key: "mr-q8",
    prompt:
      "Una nadadora entrena diariamente haciendo 18 recorridos de 50 metros cada uno. Si el día de hoy hizo 4 recorridos extra, ¿qué distancia hizo en total?",
    options: [
      { id: "a", text: "1,1 kilómetros" },
      { id: "b", text: "2,2 kilómetros" },
      { id: "c", text: "1000 metros" },
      { id: "d", text: "1200 metros" },
    ],
    correctOptionId: "a",
    points: 4,
    order: 8,
  },
  {
    key: "mr-q9",
    prompt:
      "Un panadero puede decorar 7 pasteles en 3 horas. ¿Cuántos pasteles puede decorar en 4 días si dedica 6 horas por día?",
    options: [
      { id: "a", text: "56" },
      { id: "b", text: "52" },
      { id: "c", text: "50" },
      { id: "d", text: "55" },
    ],
    correctOptionId: "a",
    points: 4,
    order: 9,
  },
  {
    key: "mr-q10",
    prompt:
      "Si a una persona le toma generalmente 50 minutos para llegar al trabajo pero hoy le tomó 1 hora y 5 minutos, ¿cuánto tiempo se tardó de más?",
    options: [
      { id: "a", text: "0,25 horas" },
      { id: "b", text: "10 minutos" },
      { id: "c", text: "20 minutos" },
      { id: "d", text: "65 minutos" },
    ],
    correctOptionId: "a",
    points: 4,
    order: 10,
  },
  {
    key: "mr-q11",
    prompt:
      "Tres amigas se reparten $90.000 en razón 1:2:3. ¿Cuánto le corresponde a la que más recibe?",
    options: [
      { id: "a", text: "$45.000" },
      { id: "b", text: "$50.000" },
      { id: "c", text: "$60.000" },
      { id: "d", text: "$30.000" },
    ],
    correctOptionId: "a",
    points: 4,
    order: 11,
  },
  {
    key: "mr-q12",
    prompt:
      "Durante un evento promocional, una tienda vende a $5.000 la galleta para las primeras 20 galletas, a $4.000 la galleta para las siguientes 25, y a $3.000 por galleta adicional. ¿Cuántas galletas puede comprar como máximo con $320.000?",
    options: [
      { id: "a", text: "85" },
      { id: "b", text: "90" },
      { id: "c", text: "100" },
      { id: "d", text: "80" },
    ],
    correctOptionId: "a",
    points: 4,
    order: 12,
  },
  {
    key: "mr-q13",
    prompt:
      "En un local se venden 3 tipos de bebidas calientes: café, té y chocolate. Si la semana pasada vendieron 360 bebidas, 1/2 de ellas eran café y 1/6 té, ¿cuántas fueron chocolate?",
    options: [
      { id: "a", text: "120" },
      { id: "b", text: "240" },
      { id: "c", text: "200" },
      { id: "d", text: "180" },
    ],
    correctOptionId: "a",
    points: 5,
    order: 13,
  },
  {
    key: "mr-q14",
    prompt:
      "Si un producto aumenta su precio en 10% y luego, sobre ese valor, disminuye en 10%, ¿cómo queda el precio final?",
    options: [
      { id: "a", text: "Disminuye 1%" },
      { id: "b", text: "Aumenta 1%" },
      { id: "c", text: "Queda igual" },
      { id: "d", text: "Disminuye 10%" },
    ],
    correctOptionId: "a",
    points: 5,
    order: 14,
  },
  {
    key: "mr-q15",
    prompt: "La suma de dos números es 51 y uno es el doble del otro. ¿Cuál es el mayor?",
    options: [
      { id: "a", text: "34" },
      { id: "b", text: "26" },
      { id: "c", text: "27" },
      { id: "d", text: "17" },
    ],
    correctOptionId: "a",
    points: 5,
    order: 15,
  },
  {
    key: "mr-q16",
    prompt:
      "Una llave de agua llena un tanque en 8 horas, mientras que otra lo hace en 2 horas. ¿Cuánto tiempo tardarían juntas?",
    options: [
      { id: "a", text: "1 hora y 36 minutos" },
      { id: "b", text: "1 hora" },
      { id: "c", text: "48 minutos" },
      { id: "d", text: "1 hora y 30 minutos" },
    ],
    correctOptionId: "a",
    points: 5,
    order: 16,
  },
];
