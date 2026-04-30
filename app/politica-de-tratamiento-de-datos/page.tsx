import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Tratamiento de Datos Personales — Aurora",
  description:
    "Política de tratamiento de datos personales de la plataforma Aurora, guía vocacional gamificada para estudiantes.",
};

export default function PoliticaTratamientoDatosPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">

        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
            </svg>
            Volver
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                <path fillRule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">Aurora — Guía Vocacional</p>
              <h1 className="text-xl font-bold text-slate-900">
                Política de Tratamiento de Datos Personales
              </h1>
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-500">
            Vigente a partir de enero de 2025 · Última actualización: enero de 2025
          </p>
        </div>

        {/* Contenido */}
        <div className="space-y-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

          <section>
            <h2 className="mb-2 text-base font-bold text-slate-800">1. Responsable del tratamiento</h2>
            <p className="text-sm leading-relaxed text-slate-600">
              <strong>AURORA — Guía vocacional gamificada para estudiantes</strong> (en adelante, <em>"Aurora"</em>),
              es la plataforma responsable del tratamiento de los datos personales que usted suministra al
              registrarse y utilizar nuestros servicios. Aurora opera conforme a la{" "}
              <strong>Ley 1581 de 2012</strong> y el{" "}
              <strong>Decreto 1074 de 2015</strong> de la República de Colombia, y demás normas que las
              modifiquen, adicionen o sustituyan.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-bold text-slate-800">2. Finalidades del tratamiento</h2>
            <p className="mb-2 text-sm leading-relaxed text-slate-600">
              Los datos personales recopilados serán utilizados para las siguientes finalidades:
            </p>
            <ul className="list-inside list-disc space-y-1 text-sm leading-relaxed text-slate-600">
              <li>Crear y gestionar la cuenta de usuario dentro de la plataforma Aurora.</li>
              <li>Personalizar la orientación vocacional según el perfil académico e intereses del titular.</li>
              <li>Calcular y presentar resultados de aptitudes, intereses RIASEC y rasgos de personalidad HEXACO.</li>
              <li>Sugerir programas de educación superior y carreras afines al perfil del usuario.</li>
              <li>Mejorar los algoritmos de recomendación vocacional mediante análisis estadísticos anonimizados.</li>
              <li>Enviar comunicaciones relacionadas con el funcionamiento de la plataforma.</li>
              <li>Cumplir con obligaciones legales aplicables.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-base font-bold text-slate-800">3. Datos personales tratados</h2>
            <p className="mb-2 text-sm leading-relaxed text-slate-600">
              Aurora recopila y trata las siguientes categorías de datos personales:
            </p>
            <div className="overflow-hidden rounded-xl border border-slate-100">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Dato</th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Finalidad</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    ["Nombre completo",          "Identificación y personalización de la experiencia"],
                    ["Correo electrónico",        "Autenticación y comunicaciones de la plataforma"],
                    ["Fecha de nacimiento",       "Verificación de elegibilidad y segmentación de contenido"],
                    ["Género",                   "Análisis estadísticos desagregados (opcional)"],
                    ["Nivel y estado educativo", "Personalización de recomendaciones vocacionales"],
                    ["Respuestas a los tests",   "Cálculo del perfil vocacional y generación de resultados"],
                    ["Información de sesión",    "Seguridad, autenticación y continuidad de la experiencia"],
                  ].map(([dato, fin]) => (
                    <tr key={dato}>
                      <td className="px-4 py-2.5 font-medium text-slate-700">{dato}</td>
                      <td className="px-4 py-2.5 text-slate-500">{fin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-[11px] text-slate-400">
              Aurora no recopila datos sensibles (salud, orientación sexual, origen étnico, opiniones políticas,
              datos biométricos ni crediticios).
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-bold text-slate-800">4. Base legal del tratamiento</h2>
            <p className="text-sm leading-relaxed text-slate-600">
              El tratamiento de sus datos personales se realiza con fundamento en el{" "}
              <strong>consentimiento libre, previo, expreso e informado</strong> que usted otorga al
              aceptar la presente política al momento de completar su perfil. Usted puede revocar este
              consentimiento en cualquier momento, lo que implicará la eliminación de su cuenta y datos
              personales, salvo aquellos que Aurora deba conservar por obligación legal.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-bold text-slate-800">5. Transferencia y transmisión de datos</h2>
            <p className="text-sm leading-relaxed text-slate-600">
              Sus datos personales pueden ser compartidos con proveedores de servicios tecnológicos que
              actúan como encargados del tratamiento en nombre de Aurora (entre ellos, servicios de
              alojamiento en la nube, autenticación y bases de datos). Dichos proveedores están
              contractualmente obligados a mantener la confidencialidad y a tratar los datos únicamente
              para las finalidades autorizadas. Aurora no vende ni cede datos personales a terceros con
              fines comerciales o publicitarios.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-bold text-slate-800">6. Derechos del titular</h2>
            <p className="mb-2 text-sm leading-relaxed text-slate-600">
              Como titular de los datos personales, usted tiene derecho a:
            </p>
            <ul className="list-inside list-disc space-y-1 text-sm leading-relaxed text-slate-600">
              <li><strong>Conocer</strong> los datos personales que Aurora tiene sobre usted y la finalidad de su tratamiento.</li>
              <li><strong>Actualizar o corregir</strong> datos inexactos o incompletos.</li>
              <li><strong>Suprimir</strong> sus datos personales cuando ya no sean necesarios o cuando revoque su consentimiento.</li>
              <li><strong>Revocar</strong> el consentimiento otorgado en cualquier momento.</li>
              <li><strong>Presentar quejas</strong> ante la Superintendencia de Industria y Comercio (SIC) de Colombia si considera que sus derechos han sido vulnerados.</li>
            </ul>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Para ejercer cualquiera de estos derechos, puede solicitar la eliminación de su cuenta
              directamente desde la plataforma o contactarnos a través del correo indicado en la sección
              de contacto.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-bold text-slate-800">7. Medidas de seguridad</h2>
            <p className="text-sm leading-relaxed text-slate-600">
              Aurora implementa medidas técnicas y organizativas razonables para proteger sus datos
              personales contra acceso no autorizado, pérdida, alteración o divulgación. Las contraseñas
              se almacenan con función de hash criptográfico (bcrypt) y las comunicaciones se realizan
              mediante protocolos cifrados (HTTPS/TLS). No obstante, ningún sistema de seguridad es
              absolutamente infalible, por lo que Aurora no puede garantizar la seguridad absoluta de
              la información transmitida por internet.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-bold text-slate-800">8. Conservación de datos</h2>
            <p className="text-sm leading-relaxed text-slate-600">
              Sus datos personales serán conservados mientras su cuenta permanezca activa o mientras sean
              necesarios para las finalidades descritas. Cuando solicite la eliminación de su cuenta, sus
              datos serán suprimidos en un plazo máximo de <strong>30 días hábiles</strong>, salvo
              aquellos que deban conservarse por obligación legal o para la resolución de disputas
              pendientes.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-bold text-slate-800">9. Menores de edad</h2>
            <p className="text-sm leading-relaxed text-slate-600">
              Aurora está dirigida a estudiantes de secundaria y educación superior. Los usuarios menores
              de 14 años deben contar con la autorización expresa de su padre, madre o representante
              legal para registrarse y utilizar la plataforma. Aurora se compromete a no recopilar
              intencionalmente datos de menores sin dicha autorización.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-bold text-slate-800">10. Modificaciones a esta política</h2>
            <p className="text-sm leading-relaxed text-slate-600">
              Aurora se reserva el derecho de modificar la presente política en cualquier momento.
              Cualquier cambio será publicado en esta página con la fecha de actualización. Si los
              cambios son sustanciales, se notificará a los usuarios registrados por correo electrónico
              con al menos 15 días de antelación a su entrada en vigor.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-bold text-slate-800">11. Contacto</h2>
            <p className="text-sm leading-relaxed text-slate-600">
              Para consultas, solicitudes o quejas relacionadas con el tratamiento de sus datos personales,
              puede comunicarse con nosotros a través de los canales disponibles en la plataforma Aurora.
            </p>
          </section>

          <div className="rounded-xl border border-amber-100 bg-amber-50 px-4 py-3">
            <p className="text-[11px] leading-relaxed text-amber-700">
              <strong>Marco legal aplicable:</strong> Ley 1581 de 2012 (Protección de Datos Personales),
              Decreto 1074 de 2015 (Decreto Único Reglamentario del Sector Comercio, Industria y Turismo),
              y demás normas concordantes de la República de Colombia.
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-[11px] text-slate-400">
          © {new Date().getFullYear()} Aurora — Guía vocacional gamificada para estudiantes
        </p>
      </div>
    </div>
  );
}
