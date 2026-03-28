import { SEOHead } from '@/components/SEOHead';
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, SearchX } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <SEOHead title="Página No Encontrada" description="La página que buscas no existe o fue movida." path="/404" noindex />
      <div className="text-center max-w-xs space-y-5">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
          <SearchX className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-1">404</h1>
          <p className="text-sm text-muted-foreground">La página que buscas no existe o fue movida.</p>
        </div>
        <Link to="/">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <ArrowLeft className="h-3 w-3" /> Volver al inicio
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
