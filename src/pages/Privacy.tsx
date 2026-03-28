import { motion } from 'framer-motion';
import { OfficialLogo } from '@/components/OfficialLogo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, Database, Globe, Mail } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';
const Privacy = () => {
  const highlights = [{
    icon: Shield,
    title: 'Datos protegidos',
    description: 'Encriptación de nivel bancario'
  }, {
    icon: Lock,
    title: 'Nunca vendemos',
    description: 'Tu información es solo tuya'
  }, {
    icon: Eye,
    title: 'Transparencia total',
    description: 'Sabes exactamente qué guardamos'
  }];
  const sections = [{
    title: '1. Información que recopilamos',
    content: `
Recopilamos información que nos proporcionas directamente cuando utilizas MoonJab:

**Información de cuenta:**
- Nombre y apellido
- Dirección de correo electrónico
- Contraseña (encriptada)
- Foto de perfil (opcional)

**Información profesional:**
- CV y experiencia laboral
- Educación y certificaciones
- Habilidades y competencias
- Preferencias de búsqueda de empleo
- Resultados de diagnóstico RIASEC

**Información de uso:**
- Interacciones con la plataforma
- Sesiones de simulación de entrevistas
- Oportunidades guardadas y aplicaciones

**Información técnica:**
- Dirección IP (anonimizada)
- Tipo de navegador y dispositivo
- Páginas visitadas y tiempo de uso
      `
  }, {
    title: '2. Cómo usamos tu información',
    content: `
Utilizamos la información recopilada para:

**Proporcionar nuestros servicios:**
- Generar diagnósticos de carrera personalizados
- Crear y optimizar tu CV
- Ofrecer simulaciones de entrevista relevantes
- Recomendar oportunidades laborales compatibles

**Mejorar la experiencia:**
- Personalizar el contenido según tu perfil
- Desarrollar nuevas funcionalidades
- Resolver problemas técnicos
- Responder a tus consultas

**Comunicación:**
- Enviar actualizaciones importantes del servicio
- Notificarte sobre nuevas oportunidades relevantes
- Compartir consejos y recursos de carrera (si lo autorizas)

**Nunca usamos tu información para:**
- Venderla a terceros
- Publicidad dirigida externa
- Tomar decisiones automatizadas que te afecten negativamente
      `
  }, {
    title: '3. Cómo protegemos tus datos',
    content: `
La seguridad de tu información es nuestra prioridad:

**Medidas técnicas:**
- Encriptación SSL/TLS 256-bit en tránsito
- Encriptación AES-256 en reposo
- Infraestructura cloud segura (AWS)
- Copias de seguridad automáticas y redundantes
- Monitoreo 24/7 de seguridad

**Medidas organizativas:**
- Acceso limitado a personal autorizado
- Capacitación regular en seguridad
- Políticas estrictas de manejo de datos
- Auditorías de seguridad periódicas

**Cumplimiento:**
- GDPR (Reglamento General de Protección de Datos)
- Mejores prácticas de la industria
- Revisiones de seguridad por terceros
      `
  }, {
    title: '4. Compartir información',
    content: `
**No vendemos tus datos.** Punto.

Solo compartimos información en casos limitados:

**Proveedores de servicios:**
- Procesadores de pago (Stripe) para transacciones
- Servicios de infraestructura (AWS) para hosting
- Herramientas de análisis (anonimizadas)

Todos nuestros proveedores están obligados contractualmente a proteger tus datos.

**Requerimientos legales:**
- Cuando lo exija la ley
- Para proteger nuestros derechos legales
- En respuesta a órdenes judiciales válidas

**Con tu consentimiento:**
- Si autorizas compartir tu CV con un empleador específico
- Para funcionalidades que requieran integración con terceros
      `
  }, {
    title: '5. Tus derechos',
    content: `
Tienes control total sobre tus datos:

**Acceso:** Puedes solicitar una copia de toda la información que tenemos sobre ti.

**Rectificación:** Puedes corregir cualquier información incorrecta en cualquier momento desde tu perfil.

**Eliminación:** Puedes solicitar la eliminación completa de tu cuenta y todos los datos asociados.

**Portabilidad:** Puedes exportar tus datos en un formato estándar.

**Oposición:** Puedes oponerte al procesamiento de tus datos para fines específicos.

**Retiro de consentimiento:** Puedes retirar tu consentimiento para comunicaciones de marketing en cualquier momento.

Para ejercer cualquiera de estos derechos, contáctanos en moonjab.com@gmail.com. Responderemos en un máximo de 30 días.
      `
  }, {
    title: '6. Retención de datos',
    content: `
**Cuenta activa:**
Mantenemos tus datos mientras tu cuenta esté activa y uses nuestros servicios.

**Cuenta inactiva:**
Si no usas MoonJab por 24 meses, te notificaremos antes de eliminar tu cuenta.

**Después de eliminación:**
- Eliminamos tus datos personales en 30 días
- Algunos datos anonimizados pueden conservarse para análisis
- Copias de seguridad se eliminan en 90 días

**Datos de facturación:**
Conservamos registros de transacciones por 7 años según requisitos legales.
      `
  }, {
    title: '7. Cookies y tecnologías similares',
    content: `
Usamos cookies esenciales para:
- Mantener tu sesión iniciada
- Recordar tus preferencias
- Garantizar la seguridad

Usamos cookies de análisis (anonimizadas) para:
- Entender cómo se usa la plataforma
- Mejorar la experiencia de usuario

**No usamos** cookies de publicidad o seguimiento de terceros.

Puedes controlar las cookies desde la configuración de tu navegador.
      `
  }, {
    title: '8. Menores de edad',
    content: `
MoonJab está diseñado para usuarios mayores de 16 años. No recopilamos intencionalmente información de menores de 16 años.

Si eres padre/madre y crees que tu hijo ha proporcionado información personal, contáctanos para eliminarla.
      `
  }, {
    title: '9. Cambios a esta política',
    content: `
Podemos actualizar esta política ocasionalmente. Cuando hagamos cambios significativos:

- Te notificaremos por email
- Mostraremos un aviso en la plataforma
- Publicaremos la fecha de la última actualización

Te recomendamos revisar esta página periódicamente.
      `
  }, {
    title: '10. Contacto',
    content: `
Si tienes preguntas sobre esta política o el manejo de tus datos:

**Email:** moonjab.com@gmail.com
**Correo postal:** MoonJab Inc., Ciudad de México, México

Responderemos a todas las consultas en un máximo de 5 días hábiles.
      `
  }];
  return <div className="min-h-screen bg-background">
      <SEOHead title="Política de Privacidad" description="Conoce cómo MoonJab protege tus datos personales y tu privacidad. Transparencia y seguridad en cada paso." path="/privacy" />
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
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-6">
              Política de Privacidad
            </h1>
            <p className="text-muted-foreground">
              Última actualización: 1 de diciembre de 2024
            </p>
          </motion.div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid sm:grid-cols-3 gap-6">
            {highlights.map((item, i) => <motion.div key={i} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: i * 0.1
          }} className="text-center p-6 rounded-2xl bg-muted/30">
                <item.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              En MoonJab, tu privacidad es fundamental. Esta política explica de manera clara y sencilla cómo recopilamos, usamos y protegemos tu información personal. Nos comprometemos a ser transparentes y a darte control sobre tus datos.
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

      {/* Contact CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <Mail className="h-10 w-10 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">¿Tienes preguntas?</h2>
          <p className="text-muted-foreground mb-6">
            Estamos aquí para resolver cualquier duda sobre tu privacidad
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
export default Privacy;