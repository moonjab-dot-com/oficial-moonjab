import { SEOHead } from '@/components/SEOHead';
import { motion } from 'framer-motion';
import { OfficialLogo } from '@/components/OfficialLogo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { useState } from 'react';

// Blog post data - in a real app this would come from a CMS or API
export const blogPosts = [
  {
    id: 'preparar-entrevista-tecnica-2025',
    title: 'Cómo prepararte para una entrevista técnica en 2025',
    excerpt: 'Las entrevistas técnicas han evolucionado. Descubre las mejores estrategias para destacar con los consejos de expertos de Google, Meta y Amazon.',
    content: `
## La nueva era de las entrevistas técnicas

Las entrevistas técnicas en 2025 ya no son lo que solían ser. Las empresas han evolucionado sus procesos para evaluar no solo tus habilidades técnicas, sino también tu capacidad de resolver problemas en tiempo real, comunicarte efectivamente y colaborar en equipo.

### Lo que ha cambiado

**1. Menos memorización, más razonamiento**

Las preguntas de "whiteboard" tradicionales están siendo reemplazadas por problemas más prácticos y situacionales. Las empresas quieren ver cómo piensas, no qué has memorizado.

**2. Pair programming en vivo**

Cada vez más empresas optan por sesiones de pair programming donde trabajas junto al entrevistador. Esto evalúa tu capacidad de colaborar y comunicar mientras codeas.

**3. System design desde el principio**

Ya no solo para seniors. Incluso para posiciones mid-level, las preguntas de diseño de sistemas son cada vez más comunes.

### Estrategias que funcionan

#### Practica en voz alta

El error más común es practicar en silencio. En una entrevista real, necesitas verbalizar tu proceso de pensamiento. Practica explicando cada paso mientras resuelves problemas.

#### Domina los fundamentos

- Estructuras de datos: arrays, linked lists, trees, graphs, hash tables
- Algoritmos: sorting, searching, dynamic programming, recursion
- Complejidad: Big O notation, trade-offs espacio/tiempo

#### Prepara tus historias

Para las preguntas de behavioral, ten 5-7 historias STAR preparadas que demuestren:
- Liderazgo técnico
- Resolución de conflictos
- Manejo de fallos
- Impacto en el negocio

### Recursos recomendados

1. **LeetCode** - Para práctica de algoritmos
2. **System Design Primer** - Para arquitectura
3. **MoonJab** - Para simulaciones con IA que te dan feedback real

### El día de la entrevista

- Descansa bien la noche anterior
- Ten tu setup técnico probado
- Prepara preguntas inteligentes para el final
- Recuerda: están evaluando cómo piensas, no si llegas a la solución perfecta

---

*¿Quieres practicar entrevistas con feedback de IA? Prueba el simulador de MoonJab gratis.*
    `,
    date: '5 Dic 2024',
    readTime: '8 min',
    category: 'Entrevistas',
    author: 'María González',
    authorRole: 'CEO de MoonJab',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=450&fit=crop',
    featured: true
  },
  {
    id: 'networking-busqueda-empleo',
    title: 'El poder del networking en tu búsqueda de empleo',
    excerpt: 'El 70% de los empleos se consiguen por conexiones. Aprende cómo construir una red profesional que impulse tu carrera.',
    content: `
## Por qué el networking importa más que nunca

En un mercado laboral cada vez más competitivo, tu red de contactos puede ser la diferencia entre conseguir o no el trabajo de tus sueños. Los estudios muestran que hasta el 70% de las posiciones se llenan a través de conexiones personales.

### La ciencia detrás del networking

No se trata de coleccionar tarjetas de presentación. El networking efectivo está basado en:

1. **Reciprocidad** - Dar antes de pedir
2. **Autenticidad** - Conexiones genuinas
3. **Consistencia** - Mantener relaciones a largo plazo

### Estrategias prácticas

#### En LinkedIn

- Publica contenido de valor regularmente
- Comenta de forma inteligente en posts de tu industria
- Conecta con propósito, no por cantidad
- Personaliza SIEMPRE tus invitaciones

#### En eventos

- Prepara tu elevator pitch de 30 segundos
- Haz preguntas genuinas sobre la otra persona
- Haz follow-up dentro de 48 horas
- Ofrece ayuda antes de pedirla

#### En el día a día

- Mantén contacto con ex-colegas
- Ayuda a otros a conseguir empleo
- Comparte vacantes que no son para ti
- Celebra los logros de tu red

### Los errores más comunes

❌ Solo hacer networking cuando necesitas algo
❌ Enviar mensajes genéricos copy-paste
❌ No hacer follow-up después de conocer a alguien
❌ Hablar solo de ti mismo
❌ Pedir favores en el primer contacto

### Tu plan de acción

**Semana 1-2:**
- Optimiza tu perfil de LinkedIn
- Lista 20 personas que te gustaría conocer

**Semana 3-4:**
- Conecta con 5 personas nuevas
- Asiste a 1 evento de tu industria

**Mes 2 en adelante:**
- Mantén mínimo 3 conversaciones significativas por semana
- Ofrece ayuda a al menos 1 persona

---

*El networking es una inversión a largo plazo. Empieza hoy.*
    `,
    date: '2 Dic 2024',
    readTime: '6 min',
    category: 'Networking',
    author: 'Carlos Rodríguez',
    authorRole: 'Head of Growth',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=450&fit=crop',
    featured: false
  },
  {
    id: 'errores-cv-evitar',
    title: '10 errores en tu CV que te están costando entrevistas',
    excerpt: 'Pequeños detalles que marcan la diferencia. Optimiza tu currículum y aumenta tus callbacks en un 300%.',
    content: `
## Tu CV es tu primera impresión

Los reclutadores pasan en promedio 7 segundos escaneando un CV. En ese tiempo, decides si pasas al siguiente round o vas a la pila de rechazos. Evitar estos errores puede triplicar tus callbacks.

### Los 10 errores fatales

#### 1. Un objetivo genérico

❌ "Busco un rol que me permita crecer profesionalmente"
✅ "Product Manager con 5 años en fintech buscando liderar equipos en startups B2B"

#### 2. Describir responsabilidades, no logros

❌ "Responsable del equipo de ventas"
✅ "Lideré equipo de 8 vendedores, aumentando revenue un 150% en 12 meses"

#### 3. Diseño sobrecargado

Menos es más. Los ATS (Applicant Tracking Systems) no pueden leer diseños complejos. Usa un formato limpio y profesional.

#### 4. Información irrelevante

Tu trabajo de verano hace 10 años en una pizzería no importa (a menos que apliques a la industria de restaurantes).

#### 5. Errores ortográficos

Un solo error puede descartarte. Revisa. Revisa otra vez. Pide a alguien más que revise.

#### 6. Email poco profesional

❌ chico_loco_99@hotmail.com
✅ juan.perez@gmail.com

#### 7. Demasiado largo

Una página para menos de 10 años de experiencia. Dos páginas máximo para seniors.

#### 8. Sin palabras clave

Adapta tu CV a cada posición. Incluye términos del job description.

#### 9. Sin métricas

Los números hablan. Cuantifica todo lo que puedas: porcentajes, montos, tiempos.

#### 10. Foto inadecuada (o ninguna cuando se requiere)

Si incluyes foto, que sea profesional. Fondo neutro, buena iluminación, vestimenta apropiada.

### La estructura ideal

1. **Header** - Nombre, contacto, LinkedIn
2. **Resumen** - 2-3 líneas de tu propuesta de valor
3. **Experiencia** - Logros cuantificables por rol
4. **Educación** - Relevante y reciente primero
5. **Skills** - Técnicos y soft skills relevantes

### Antes de enviar

- [ ] ¿Está adaptado a esta posición específica?
- [ ] ¿Cada punto tiene un logro cuantificable?
- [ ] ¿Es fácil de escanear en 7 segundos?
- [ ] ¿Alguien más lo ha revisado?

---

*Crea un CV optimizado con IA en minutos usando el builder de MoonJab.*
    `,
    date: '28 Nov 2024',
    readTime: '7 min',
    category: 'CV',
    author: 'Ana Martínez',
    authorRole: 'Head of Product',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=450&fit=crop',
    featured: false
  },
  {
    id: 'cambio-carrera-guia',
    title: 'Guía completa para cambiar de carrera a los 30',
    excerpt: 'Nunca es tarde para reinventarte. Una guía paso a paso basada en casos reales de transición exitosa.',
    content: `
## El mito de que es "demasiado tarde"

A los 30, tienes algo que no tenías a los 22: experiencia, perspectiva y claridad sobre lo que realmente quieres. El cambio de carrera a esta edad no es un retroceso, es una evolución estratégica.

### Por qué los 30 son ideales para cambiar

1. **Autoconocimiento** - Sabes qué te gusta y qué no
2. **Habilidades transferibles** - Has desarrollado soft skills valiosas
3. **Red de contactos** - Tienes conexiones en múltiples industrias
4. **Estabilidad emocional** - Tomas mejores decisiones

### El proceso paso a paso

#### Fase 1: Autoexploración (2-4 semanas)

- Haz un inventario de tus habilidades
- Identifica patrones en lo que disfrutas
- Toma assessments de personalidad (como RIASEC)
- Habla con 10 personas en carreras que te interesan

#### Fase 2: Investigación (4-8 semanas)

- Investiga 3-5 roles objetivo
- Entiende los requisitos y gaps
- Calcula tu runway financiero
- Identifica programas de formación

#### Fase 3: Preparación (3-6 meses)

- Adquiere las habilidades faltantes
- Trabaja en proyectos paralelos
- Actualiza tu marca personal
- Construye tu red en la nueva industria

#### Fase 4: Transición (variable)

- Aplica estratégicamente
- Aprovecha tus habilidades transferibles
- Considera roles "puente"
- Mantén opciones abiertas

### Historias reales

**Ana, 32:** Contadora → UX Designer
"Me tomó 8 meses de preparación, pero conseguí trabajo en una startup fintech. Mi experiencia en finanzas fue un diferenciador."

**Carlos, 35:** Abogado → Product Manager
"Empecé manejando el producto legal de mi firma. Eso me dio el track record para saltar a tech."

**María, 31:** Profesora → Data Analyst
"Estudié online mientras trabajaba. A los 6 meses tenía las certificaciones y un portafolio."

### Lo que nadie te dice

- El síndrome del impostor es normal
- Tu primer trabajo nuevo probablemente pague menos
- Las habilidades blandas son tu superpoder
- La red de contactos importa más que el CV
- Tardará más de lo que planeas

### Recursos para empezar

1. **Diagnóstico de MoonJab** - Descubre carreras compatibles
2. **Cursos online** - Coursera, Platzi, Udemy
3. **Comunidades** - Encuentra tu tribu en Discord/Slack
4. **Mentores** - Busca personas que hicieron la transición

---

*¿Listo para descubrir tu próximo capítulo? Empieza con el diagnóstico gratuito de MoonJab.*
    `,
    date: '25 Nov 2024',
    readTime: '10 min',
    category: 'Carrera',
    author: 'María González',
    authorRole: 'CEO de MoonJab',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop',
    featured: false
  },
  {
    id: 'negociar-salario',
    title: 'Cómo negociar tu salario (sin sentir que pides demasiado)',
    excerpt: 'La diferencia entre aceptar la primera oferta y negociar puede ser de miles de dólares al año. Aprende a hacerlo con confianza.',
    content: `
## Por qué DEBES negociar

El 70% de los empleadores esperan que negocies. No hacerlo puede costarte entre $500,000 y $1,000,000 a lo largo de tu carrera (considerando aumentos compuestos).

### La psicología de la negociación

La razón por la que no negociamos:
- Miedo al rechazo
- No saber nuestro valor
- Falta de práctica
- Creencia de que es "de mala educación"

La realidad:
- Es esperado y respetado
- Demuestra que conoces tu valor
- Es una habilidad profesional esencial

### Preparación (antes de la oferta)

#### 1. Investiga el mercado

- Glassdoor, LinkedIn Salary, Levels.fyi
- Pregunta a personas en roles similares
- Considera ubicación, industria, tamaño de empresa

#### 2. Define tus números

- **Ideal:** Lo que realmente quieres
- **Target:** Lo que aceptarías feliz
- **Walk-away:** El mínimo absoluto

#### 3. Prepara tu caso

Lista 3-5 razones concretas por las que mereces más:
- Experiencia específica relevante
- Resultados previos cuantificables
- Habilidades únicas que aportas
- Certificaciones o formación adicional

### Durante la negociación

#### Regla de oro: Nunca des el primer número

"¿Cuál es el rango presupuestado para esta posición?"
"Prefiero entender primero el scope completo del rol"

#### Cuando recibas la oferta

1. Agradece genuinamente
2. Pide tiempo (24-48 horas)
3. No muestres emoción excesiva
4. "Estoy muy emocionado/a por este rol. Me gustaría revisar los detalles y volver con algunas preguntas."

#### Al contraofertar

"Basado en mi investigación de mercado y la experiencia que traigo en [X], estaba esperando algo más cercano a [número 10-15% más alto]. ¿Hay flexibilidad?"

### Más allá del salario base

Si el salario es inamovible, negocia:
- Bonus de firma
- Equity/opciones
- Días de vacaciones adicionales
- Trabajo remoto/flexible
- Presupuesto de desarrollo profesional
- Review salarial adelantada (6 meses vs 12)

### Errores a evitar

❌ Aceptar en el momento
❌ Dar un rango en vez de un número específico
❌ Amenazar con otras ofertas (a menos que sea verdad)
❌ Ser agresivo o ultimatum
❌ Negociar después de aceptar verbalmente

### Script de ejemplo

"Muchas gracias por la oferta. Estoy muy entusiasmado con la posibilidad de unirme al equipo. Después de revisar el paquete y compararlo con mi investigación de mercado para roles similares, me gustaría discutir el salario base. Dado mi experiencia de 5 años en [área] y mis logros en [resultado específico], estaba esperando algo más cercano a $X. ¿Hay espacio para ajustar esto?"

---

*Practica tu negociación con el simulador de entrevistas de MoonJab.*
    `,
    date: '20 Nov 2024',
    readTime: '8 min',
    category: 'Salario',
    author: 'Carlos Rodríguez',
    authorRole: 'Head of Growth',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=450&fit=crop',
    featured: false
  }
];

const Blog = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [...new Set(blogPosts.map(post => post.category))];
  const filteredPosts = selectedCategory 
    ? blogPosts.filter(p => p.category === selectedCategory)
    : blogPosts;

  const featuredPost = blogPosts.find(p => p.featured);
  const regularPosts = filteredPosts.filter(p => !p.featured || selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Blog de Empleabilidad" description="Consejos prácticos sobre CV, entrevistas, networking y carrera profesional. Recursos gratuitos para impulsar tu búsqueda de empleo." path="/blog" />
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between max-w-7xl">
          <OfficialLogo size="lg" to="/" />
          <ThemeToggle />
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl sm:text-6xl font-heading font-bold mb-4 tracking-tight">
              Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Consejos prácticos, tendencias y recursos para impulsar tu carrera profesional
            </p>
          </motion.div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              Todos
            </Button>
            {categories.map(cat => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && !selectedCategory && (
        <section className="pb-16">
          <div className="container mx-auto px-6 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card 
                className="overflow-hidden cursor-pointer group hover:shadow-2xl transition-all duration-300"
                onClick={() => navigate(`/blog/${featuredPost.id}`)}
              >
                <div className="grid md:grid-cols-2">
                  <div className="aspect-video md:aspect-auto overflow-hidden">
                    <img 
                      src={featuredPost.image} 
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <Badge className="w-fit mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                      {featuredPost.category}
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-6">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {featuredPost.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      )}

      {/* Regular Posts */}
      <section className="pb-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card 
                  className="overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300 h-full flex flex-col"
                  onClick={() => navigate(`/blog/${post.id}`)}
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <Badge variant="secondary" className="w-fit mb-3">
                      {post.category}
                    </Badge>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Recibe los mejores consejos en tu inbox
          </h2>
          <p className="text-muted-foreground mb-8">
            Únete a 10,000+ profesionales que reciben tips semanales para impulsar su carrera.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <input 
              type="email" 
              placeholder="tu@email.com"
              className="px-4 py-3 rounded-lg border bg-background flex-1 max-w-sm"
            />
            <Button className="px-8">
              Suscribirse
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
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
    </div>
  );
};

export default Blog;
