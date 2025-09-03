import { Button } from '@/components/ui/button';
import { ArrowRight, Download, MessageSquare } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';
const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contato');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  const openWhatsApp = () => {
    window.open('https://wa.me/5563992476987', '_blank');
  };
  return <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-dark opacity-90" aria-hidden="true" />
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url(${heroImage})`
    }} role="img" aria-label="Imagem de um desenvolvedor programando no computador" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-muted/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-border/20">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">Disponível para novos projetos</span>
          </div>

          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent leading-tight">
            Engenheiro de Software
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-2xl mx-auto">Desenvolvedor de Sistemas</p>
          
          <p className="text-lg text-white mb-8 max-w-3xl mx-auto leading-relaxed">Especialista em soluções tecnológicas sob demanda com suporte presencial e online. Desenvolvemos aplicações robustas, ofereçemos manutenção resolução  de problemas complexos com entrega rápida e garantida.</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="xl" onClick={openWhatsApp} className="animate-glow-pulse">
              <MessageSquare className="h-5 w-5" />
              Peça um orçamento
              <ArrowRight className="h-5 w-5" />
            </Button>
            
            <Button variant="outline" size="xl" onClick={scrollToContact}>
              <Download className="h-5 w-5" />
              Ver projetos
            </Button>
          </div>

          <div className="flex justify-center items-center gap-8 mt-12 text-sm text-muted-foreground">
            <div className="flex flex-col items-center">
              <span className="font-semibold text-foreground text-lg">5+</span>
              <span>Anos de experiência</span>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="flex flex-col items-center">
              <span className="font-semibold text-foreground text-lg">50+</span>
              <span>Projetos entregues</span>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="flex flex-col items-center">
              <span className="font-semibold text-foreground text-lg">24h</span>
              <span>Suporte disponível</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>;
  };

  export default Hero;
