import { SEOHead } from '@/components/SEOHead';
import { motion } from 'framer-motion';
import { OfficialLogo } from '@/components/OfficialLogo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2, Twitter, Linkedin, User } from 'lucide-react';
import { blogPosts } from './Blog';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const post = blogPosts.find(p => p.id === id);
  const currentIndex = blogPosts.findIndex(p => p.id === id);
  const nextPost = blogPosts[currentIndex + 1];
  const prevPost = blogPosts[currentIndex - 1];

  if (!post) {
    return (
      <div
      <SEOHead title="Blog" description="Artículo del blog de MoonJab sobre empleabilidad, CV y desarrollo profesional." path="/blog" /> className="min-h-screen bg-background flex items-center justify-center">
        <SEOHead title="Blog" description="Artículo del blog de MoonJab sobre empleabilidad y desarrollo profesional." path="/blog" />
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Artículo no encontrado</h1>
          <Link to="/blog">
            <Button>Volver al blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const shareUrl = window.location.href;
  const shareText = `${post.title} - MoonJab Blog`;

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between max-w-7xl">
          <OfficialLogo size="lg" to="/" />
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link to="/blog">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Blog
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Image */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </div>

      {/* Article */}
      <article className="container mx-auto px-6 max-w-3xl -mt-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="bg-background rounded-2xl p-8 md:p-12 shadow-xl mb-8">
            <Badge className="mb-4 bg-primary/10 text-primary">
              {post.category}
            </Badge>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-muted-foreground mb-8">
              {post.excerpt}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 pb-8 border-b">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{post.author}</p>
                  <p className="text-sm text-muted-foreground">{post.authorRole}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readTime} de lectura
                </span>
              </div>
            </div>

            {/* Share */}
            <div className="flex items-center gap-4 pt-6">
              <span className="text-sm text-muted-foreground">Compartir:</span>
              <a 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a 
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <button 
                onClick={() => navigator.clipboard.writeText(shareUrl)}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
            {post.content.split('\n').map((paragraph, i) => {
              if (paragraph.startsWith('## ')) {
                return <h2 key={i} className="text-3xl font-bold mt-12 mb-6">{paragraph.replace('## ', '')}</h2>;
              }
              if (paragraph.startsWith('### ')) {
                return <h3 key={i} className="text-2xl font-bold mt-8 mb-4">{paragraph.replace('### ', '')}</h3>;
              }
              if (paragraph.startsWith('#### ')) {
                return <h4 key={i} className="text-xl font-bold mt-6 mb-3">{paragraph.replace('#### ', '')}</h4>;
              }
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return <p key={i} className="font-bold text-lg">{paragraph.replace(/\*\*/g, '')}</p>;
              }
              if (paragraph.startsWith('- ')) {
                return <li key={i} className="ml-6">{paragraph.replace('- ', '')}</li>;
              }
              if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ')) {
                return <li key={i} className="ml-6">{paragraph.replace(/^\d+\. /, '')}</li>;
              }
              if (paragraph.startsWith('❌') || paragraph.startsWith('✅')) {
                return <p key={i} className="pl-4 border-l-4 border-primary/30 my-2">{paragraph}</p>;
              }
              if (paragraph.startsWith('---')) {
                return <hr key={i} className="my-12" />;
              }
              if (paragraph.startsWith('*') && paragraph.endsWith('*')) {
                return <p key={i} className="italic text-muted-foreground">{paragraph.replace(/^\*|\*$/g, '')}</p>;
              }
              if (paragraph.startsWith('"') || paragraph.startsWith('"')) {
                return <blockquote key={i} className="border-l-4 border-primary pl-6 italic my-8 text-xl">{paragraph}</blockquote>;
              }
              if (paragraph.trim() === '') return null;
              return <p key={i} className="my-4 leading-relaxed">{paragraph}</p>;
            })}
          </div>

          {/* CTA */}
          <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center mb-16">
            <h3 className="text-2xl font-bold mb-4">
              ¿Listo para impulsar tu carrera?
            </h3>
            <p className="text-lg opacity-90 mb-6">
              Descubre tu potencial con el diagnóstico gratuito de MoonJab
            </p>
            <Link to="/registro">
              <Button size="lg" variant="secondary" className="font-semibold">
                Empieza gratis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Navigation */}
          <div className="grid md:grid-cols-2 gap-6 pb-16">
            {prevPost && (
              <button
                onClick={() => navigate(`/blog/${prevPost.id}`)}
                className="p-6 rounded-xl border text-left hover:border-primary hover:bg-muted/50 transition-all group"
              >
                <span className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                  <ArrowLeft className="h-4 w-4" />
                  Artículo anterior
                </span>
                <span className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                  {prevPost.title}
                </span>
              </button>
            )}
            {nextPost && (
              <button
                onClick={() => navigate(`/blog/${nextPost.id}`)}
                className="p-6 rounded-xl border text-right hover:border-primary hover:bg-muted/50 transition-all group md:col-start-2"
              >
                <span className="text-sm text-muted-foreground flex items-center justify-end gap-2 mb-2">
                  Siguiente artículo
                  <ArrowRight className="h-4 w-4" />
                </span>
                <span className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                  {nextPost.title}
                </span>
              </button>
            )}
          </div>
        </motion.div>
      </article>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-6 text-center">
          <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
            ← Volver al blog
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default BlogPost;
