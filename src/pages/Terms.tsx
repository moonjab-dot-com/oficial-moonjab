import { SEOHead } from '@/components/SEOHead';
import { motion } from 'framer-motion';
import { OfficialLogo } from '@/components/OfficialLogo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Link } from 'react-router-dom';
import { FileText, CheckCircle, AlertCircle, Scale, Mail } from 'lucide-react';
const Terms = () => {
  const keyPoints = ['Debes tener 16+ años para usar MoonJab', 'Eres responsable de mantener tu cuenta segura', 'No garantizamos resultados específicos de empleo', 'Puedes cancelar en cualquier momento'];
  const sections = [{
    title: '1. Aceptación de términos',
    content: `
Al acceder o utilizar MoonJab (la "Plataforma"), aceptas estar legalmente vinculado por estos Términos y Condiciones ("Términos"). Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestros servicios.

Estos Términos constituyen un acuerdo legal entre tú ("Usuario") y MoonJab Inc. ("MoonJab", "nosotros", "nuestro").

Nos reservamos el derecho de modificar estos Términos en cualquier momento. Te notificaremos de cambios significativos por correo electrónico o mediante un aviso en la Plataforma. El uso continuado después de dichos cambios constituye tu aceptación de los nuevos Términos.
      `
  }, {
    title: '2. Descripción del servicio',
    content: `
MoonJab proporciona una plataforma de desarrollo profesional que incluye:

**Servicios principales:**
- Diagnóstico de carrera basado en el modelo RIASEC
- Creación y optimización de CV con asistencia de IA
- Simulador de entrevistas con feedback personalizado
- Búsqueda y recomendación de oportunidades laborales
- Recursos educativos y guías de carrera

**Disponibilidad:**
Nos esforzamos por mantener la Plataforma disponible 24/7, pero no garantizamos operación ininterrumpida. Podemos realizar mantenimientos programados o de emergencia que afecten temporalmente el servicio.

**Modificaciones:**
Nos reservamos el derecho de modificar, suspender o discontinuar cualquier aspecto del servicio en cualquier momento, con o sin previo aviso.
      `
  }, {
    title: '3. Registro y cuentas',
    content: `
**Elegibilidad:**
Debes tener al menos 16 años para crear una cuenta. Si eres menor de 18, necesitas el consentimiento de un padre o tutor legal.

**Información de cuenta:**
- Debes proporcionar información veraz y actualizada
- Eres responsable de mantener la confidencialidad de tu contraseña
- Debes notificarnos inmediatamente sobre cualquier uso no autorizado

**Una cuenta por persona:**
Cada usuario puede tener solo una cuenta. Está prohibido crear múltiples cuentas para evadir restricciones o abusar de ofertas promocionales.

**Suspensión y terminación:**
Nos reservamos el derecho de suspender o terminar cuentas que violen estos Términos, sin previo aviso ni responsabilidad.
      `
  }, {
    title: '4. Uso aceptable',
    content: `
Te comprometes a utilizar MoonJab de manera responsable y legal.

**Está permitido:**
- Usar la Plataforma para tu desarrollo profesional personal
- Crear CVs y practicar entrevistas para búsqueda de empleo
- Compartir contenido de carrera en tus redes (con atribución)
- Proporcionar feedback para mejorar el servicio

**Está prohibido:**
- Proporcionar información falsa o engañosa en tu perfil o CV
- Usar la Plataforma para actividades ilegales o fraudulentas
- Intentar acceder a cuentas de otros usuarios
- Interferir con el funcionamiento normal de la Plataforma
- Realizar scraping, minería de datos o ingeniería inversa
- Usar bots o scripts automatizados sin autorización
- Revender o sublicenciar el acceso a la Plataforma
- Violar derechos de propiedad intelectual de terceros
      `
  }, {
    title: '5. Contenido del usuario',
    content: `
**Tu contenido:**
Mantienes la propiedad de todo el contenido que subes (CV, información de perfil, respuestas de entrevista). Sin embargo, nos otorgas una licencia limitada para:
- Almacenar y procesar tu contenido para proporcionar el servicio
- Usar datos anonimizados y agregados para mejorar nuestros algoritmos
- Mostrar tu contenido según tus configuraciones de privacidad

**Responsabilidad:**
Eres responsable de asegurar que tu contenido:
- Es veraz y preciso
- No infringe derechos de terceros
- No contiene material ofensivo, difamatorio o ilegal

**Eliminación:**
Puedes eliminar tu contenido en cualquier momento. Tras la eliminación, haremos esfuerzos razonables para removerlo de nuestros sistemas, aunque algunas copias pueden persistir temporalmente en backups.
      `
  }, {
    title: '6. Propiedad intelectual',
    content: `
**Nuestra propiedad:**
Todo el contenido de MoonJab, incluyendo pero no limitado a:
- Diseño, logos y marca
- Código fuente y algoritmos
- Textos, gráficos e interfaces
- Plantillas de CV y guías

Está protegido por derechos de autor, marcas registradas y otras leyes de propiedad intelectual. No puedes copiar, modificar, distribuir o crear trabajos derivados sin autorización expresa.

**Tu licencia de uso:**
Te otorgamos una licencia personal, no exclusiva, no transferible y revocable para usar la Plataforma según estos Términos. Esta licencia no incluye ningún derecho de reventa o uso comercial.

**Feedback:**
Cualquier sugerencia o feedback que proporciones puede ser utilizado por nosotros sin obligación de compensación.
      `
  }, {
    title: '7. Planes y pagos',
    content: `
**Planes disponibles:**
MoonJab ofrece dos modalidades: un modo invitado gratuito con funciones limitadas y un plan Pro de pago con acceso completo a todas las herramientas.

**Precio:**
El plan Pro tiene un costo de $15 USD por mes, facturado mensualmente.

**Procesamiento de pagos:**
Los pagos se procesan de forma segura a través de Stripe. Aceptamos las principales tarjetas de crédito y débito. MoonJab no almacena datos de tarjetas; toda la información de pago es gestionada directamente por Stripe.

**Renovación automática:**
Las suscripciones se renuevan automáticamente cada mes. Puedes cancelar antes de la fecha de renovación para evitar cargos futuros.

**Cancelación:**
Puedes cancelar en cualquier momento desde Configuración > Suscripción. Mantendrás acceso a las funciones Pro hasta el final de tu período de facturación actual. No hay penalizaciones por cancelar.

**Reembolsos:**
No ofrecemos reembolsos por períodos parciales. Al cancelar, mantienes acceso hasta el final del ciclo de facturación.

**Cambios de precio:**
Nos reservamos el derecho de modificar los precios con aviso previo de 30 días por correo electrónico. Los impuestos aplicables son adicionales según tu ubicación.
      `
  }, {
    title: '8. Limitación de responsabilidad',
    content: `
**Exención de garantías:**
La Plataforma se proporciona "tal cual" y "según disponibilidad". No garantizamos que:
- El servicio será ininterrumpido o libre de errores
- Los resultados obtenidos serán precisos o confiables
- Conseguirás empleo o resultados específicos usando MoonJab

**Limitación de daños:**
En la máxima medida permitida por la ley, MoonJab no será responsable por:
- Daños indirectos, incidentales o consecuentes
- Pérdida de beneficios, datos o oportunidades
- Cualquier daño que exceda el monto pagado en los últimos 12 meses

**Decisiones de empleo:**
No somos responsables de las decisiones de contratación tomadas por empleadores. Las recomendaciones de la Plataforma son orientativas, no constituyen asesoría profesional garantizada.

**Fuerza mayor:**
No seremos responsables por incumplimientos causados por eventos fuera de nuestro control razonable.
      `
  }, {
    title: '9. Indemnización',
    content: `
Aceptas indemnizar y mantener indemne a MoonJab, sus directores, empleados y agentes, de cualquier reclamación, daño, pérdida o gasto (incluyendo honorarios legales razonables) que surja de:

- Tu uso de la Plataforma
- Tu violación de estos Términos
- Tu violación de derechos de terceros
- Contenido que subas o compartas
- Información falsa o engañosa en tu perfil

Esta obligación de indemnización sobrevive la terminación de estos Términos.
      `
  }, {
    title: '10. Resolución de disputas',
    content: `
**Resolución amistosa:**
Antes de iniciar cualquier acción legal, te comprometes a contactarnos e intentar resolver la disputa de buena fe durante al menos 30 días.

**Jurisdicción:**
Estos Términos se rigen por las leyes de México. Cualquier disputa se someterá a los tribunales competentes de la Ciudad de México.

**Arbitraje:**
Para disputas que no puedan resolverse amistosamente, ambas partes acuerdan someterse a arbitraje vinculante administrado por el Centro de Arbitraje de México.

**Renuncia a acciones colectivas:**
Aceptas resolver disputas de manera individual y renuncias a participar en demandas colectivas o representativas.
      `
  }, {
    title: '11. Disposiciones generales',
    content: `
**Acuerdo completo:**
Estos Términos, junto con nuestra Política de Privacidad, constituyen el acuerdo completo entre tú y MoonJab.

**Separabilidad:**
Si alguna disposición se considera inválida, las demás disposiciones permanecerán en vigor.

**Renuncia:**
Nuestra falta de ejercer un derecho no constituye renuncia a ese derecho.

**Cesión:**
No puedes ceder tus derechos u obligaciones sin nuestro consentimiento previo. Nosotros podemos ceder estos Términos libremente.

**Supervivencia:**
Las secciones sobre propiedad intelectual, limitación de responsabilidad, indemnización y resolución de disputas sobreviven la terminación.
      `
  }, {
    title: '12. Contacto',
    content: `
Si tienes preguntas sobre estos Términos y Condiciones:

**Email:** moonjab.com@gmail.com
**Correo postal:** MoonJab Inc., Ciudad de México, México

Para asuntos urgentes relacionados con seguridad o abuso, contacta: moonjab.com@gmail.com
      `
  }];
  return <div className="min-h-screen bg-background">
    <SEOHead title="Términos y Condiciones" description="Lee los términos de uso de MoonJab. Información sobre tu cuenta y derechos como usuario." path="/terms" />
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between max-w-7xl">
          <OfficialLogo size="lg" to="/" />
          <ThemeToggle />
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Scale className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-6">
              Términos y Condiciones
            </h1>
            <p className="text-muted-foreground">
              Última actualización: 13 de marzo de 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Points */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-xl font-bold mb-6 text-center">Puntos clave</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {keyPoints.map((point, i) => <motion.div key={i} initial={{
            opacity: 0,
            x: -10
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: i * 0.1
          }} className="flex items-center gap-3 p-4 rounded-xl bg-muted/30">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm">{point}</span>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              Estos términos establecen las reglas de uso de MoonJab. Están escritos en lenguaje claro para que entiendas exactamente tus derechos y responsabilidades. Si tienes alguna pregunta, no dudes en contactarnos.
            </p>

            {sections.map((section, i) => <motion.div key={i} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-foreground">{section.title}</h2>
                <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {section.content.split('\n').map((line, j) => {
                if (line.startsWith('**') && line.endsWith('**')) {
                  return <p key={j} className="font-semibold text-foreground mt-4 mb-2">{line.replace(/\*\*/g, '')}</p>;
                }
                if (line.startsWith('- ')) {
                  return <li key={j} className="ml-4">{line.replace('- ', '')}</li>;
                }
                if (line.trim() === '') return <br key={j} />;
                return <span key={j}>{line}</span>;
              })}
                </div>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Notice */}
      <section className="py-12 bg-amber-50 dark:bg-amber-950/20 border-y border-amber-200 dark:border-amber-800">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="flex items-start gap-4">
            <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-amber-900 dark:text-amber-100 mb-2">
                Aviso importante
              </h3>
              <p className="text-amber-800 dark:text-amber-200 text-sm leading-relaxed">
                Este resumen no reemplaza la lectura completa de los términos. Al usar MoonJab, aceptas todos los términos detallados arriba. Si tienes preguntas específicas, consulta con un profesional legal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <Mail className="h-10 w-10 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">¿Tienes preguntas?</h2>
          <p className="text-muted-foreground mb-6">
            Nuestro equipo legal está aquí para ayudarte
          </p>
          <a className="inline-flex items-center gap-2 text-primary font-medium hover:underline" href="mailto:moonjab.com@gmail.com">
            moonjab.com@gmail.com
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-6 text-center">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            ← Volver al inicio
          </Link>
        </div>
      </footer>
    </div>;
};
export default Terms;