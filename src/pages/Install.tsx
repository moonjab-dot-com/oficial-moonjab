import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Smartphone, Monitor, Apple, Chrome } from "lucide-react";
import { Link } from "react-router-dom";
import { SEOHead } from '@/components/SEOHead';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function Install() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [platform, setPlatform] = useState<"ios" | "android" | "desktop">("desktop");

  useEffect(() => {
    // Detect platform
    const userAgent = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setPlatform("ios");
    } else if (/android/.test(userAgent)) {
      setPlatform("android");
    } else {
      setPlatform("desktop");
    }

    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    // Listen for install prompt
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  return (
    <div
      <SEOHead title="Instalar MoonJab" description="Instala MoonJab como aplicación en tu dispositivo. Accede rápidamente desde tu celular o computadora." path="/install" /> className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 space-y-6 rounded-2xl shadow-clovely-xl border-2">
        <div className="text-center space-y-3">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
            <Smartphone className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Instalar MoonJab</h1>
          <p className="text-muted-foreground">
            Instala la app en tu dispositivo para acceso rápido sin conexión
          </p>
        </div>

        {isInstalled ? (
          <div className="text-center space-y-4">
            <Badge className="bg-green-500 text-white">
              ✓ App Instalada
            </Badge>
            <p className="text-sm text-muted-foreground">
              MoonJab ya está instalada en tu dispositivo
            </p>
            <Link to="/dashboard">
              <Button variant="premium" className="w-full">
                Ir al Dashboard
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Android / Desktop with prompt */}
            {deferredPrompt && (
              <Button 
                onClick={handleInstall} 
                variant="premium" 
                className="w-full min-h-[48px] shadow-clovely-glow"
              >
                <Download className="w-5 h-5 mr-2" />
                Instalar Ahora
              </Button>
            )}

            {/* Platform-specific instructions */}
            <div className="space-y-4">
              {platform === "ios" && (
                <Card className="p-4 bg-muted/50 space-y-3">
                  <div className="flex items-center gap-2">
                    <Apple className="w-5 h-5" />
                    <span className="font-medium">iPhone / iPad</span>
                  </div>
                  <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                    <li>Toca el botón <strong>Compartir</strong> (cuadrado con flecha)</li>
                    <li>Desplázate y toca <strong>"Añadir a pantalla de inicio"</strong></li>
                    <li>Toca <strong>"Añadir"</strong> en la esquina superior derecha</li>
                  </ol>
                </Card>
              )}

              {platform === "android" && !deferredPrompt && (
                <Card className="p-4 bg-muted/50 space-y-3">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5" />
                    <span className="font-medium">Android</span>
                  </div>
                  <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                    <li>Toca el menú <strong>⋮</strong> del navegador</li>
                    <li>Selecciona <strong>"Instalar aplicación"</strong> o <strong>"Añadir a pantalla de inicio"</strong></li>
                    <li>Confirma la instalación</li>
                  </ol>
                </Card>
              )}

              {platform === "desktop" && !deferredPrompt && (
                <Card className="p-4 bg-muted/50 space-y-3">
                  <div className="flex items-center gap-2">
                    <Monitor className="w-5 h-5" />
                    <span className="font-medium">Computadora</span>
                  </div>
                  <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                    <li>Busca el ícono de instalación en la barra de direcciones</li>
                    <li>O abre el menú del navegador y selecciona <strong>"Instalar MoonJab"</strong></li>
                  </ol>
                </Card>
              )}
            </div>

            {/* Benefits */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Beneficios de instalar:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ Acceso rápido desde tu pantalla de inicio</li>
                <li>✓ Funciona sin conexión</li>
                <li>✓ Experiencia de app nativa</li>
                <li>✓ Notificaciones push</li>
              </ul>
            </div>
          </div>
        )}

        <div className="pt-4 border-t text-center">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ← Volver al inicio
          </Link>
        </div>
      </Card>
    </div>
  );
}
