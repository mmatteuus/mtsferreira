import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Code, Github, Linkedin, Palette } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="h-6 w-6 text-primary" />
            <span className="font-heading font-bold text-lg">MtsFerreira</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Button variant="nav" onClick={() => scrollToSection('sobre')}>
              Sobre
            </Button>
            <Button variant="nav" onClick={() => scrollToSection('servicos')}>
              Serviços
            </Button>
            <Button variant="nav" onClick={() => scrollToSection('projetos')}>
              Projetos
            </Button>
            <Button variant="nav" onClick={() => scrollToSection('pesquisar-os')}>
              Pesquisar O.S
            </Button>
            <Button variant="nav" onClick={() => scrollToSection('contato')}>
              Contato
            </Button>
          </div>

          {/* Social Links & Mobile Menu */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
                Acessar
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col gap-4">
              <Button variant="nav" onClick={() => scrollToSection('sobre')} className="justify-start">
                Sobre
              </Button>
              <Button variant="nav" onClick={() => scrollToSection('servicos')} className="justify-start">
                Serviços
              </Button>
              <Button variant="nav" onClick={() => scrollToSection('projetos')} className="justify-start">
                Projetos
              </Button>
              <Button variant="nav" onClick={() => scrollToSection('pesquisar-os')} className="justify-start">
                Pesquisar O.S
              </Button>
              <Button variant="nav" onClick={() => scrollToSection('contato')} className="justify-start">
                Contato
              </Button>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                <Button variant="ghost" size="icon" asChild>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="https://behance.net" target="_blank" rel="noopener noreferrer">
                    <Palette className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;