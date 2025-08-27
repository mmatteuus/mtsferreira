import { Button } from '@/components/ui/button';
import { Code, Github, Linkedin, Palette, MapPin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card/30 backdrop-blur-sm border-t border-border/30">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Code className="h-6 w-6 text-primary" />
                <span className="font-heading font-bold text-lg">MtsFerreira</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Engenheiro de Software especializado em soluções sob demanda, 
                suporte técnico e desenvolvimento de aplicações robustas.
              </p>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" asChild>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="https://behance.net" target="_blank" rel="noopener noreferrer" aria-label="Behance">
                    <Palette className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold mb-4">Serviços</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#servicos" className="hover:text-foreground transition-colors">
                    Desenvolvimento Web
                  </a>
                </li>
                <li>
                  <a href="#servicos" className="hover:text-foreground transition-colors">
                    Aplicações Mobile
                  </a>
                </li>
                <li>
                  <a href="#servicos" className="hover:text-foreground transition-colors">
                    Suporte Técnico
                  </a>
                </li>
                <li>
                  <a href="#servicos" className="hover:text-foreground transition-colors">
                    Manutenção de Sistemas
                  </a>
                </li>
                <li>
                  <a href="#servicos" className="hover:text-foreground transition-colors">
                    Consultoria Técnica
                  </a>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#sobre" className="hover:text-foreground transition-colors">
                    Sobre
                  </a>
                </li>
                <li>
                  <a href="#servicos" className="hover:text-foreground transition-colors">
                    Serviços
                  </a>
                </li>
                <li>
                  <a href="#projetos" className="hover:text-foreground transition-colors">
                    Projetos
                  </a>
                </li>
                <li>
                  <a href="#contato" className="hover:text-foreground transition-colors">
                    Contato
                  </a>
                </li>
                <li>
                  <a 
                    href="https://wa.me/5563992476987" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    Orçamento
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-semibold mb-4">Contato</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3" />
                  <span>(63) 99247-6987</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3" />
                  <span>contato@mtsferreira.dev</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3" />
                  <span>Palmas/TO</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/10">
                <p className="text-xs text-muted-foreground mb-2">Emergências 24h:</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  asChild
                  className="border-primary/30 text-primary hover:bg-primary/10"
                >
                  <a href="https://wa.me/5563992476987" target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-border/30">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                © {currentYear} Desenvolvido por <span className="font-semibold text-foreground">MtsFerreira</span>. 
                Todos os direitos reservados.
              </p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>Palmas/TO, Brasil</span>
                <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                <span>Disponível para projetos</span>
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;