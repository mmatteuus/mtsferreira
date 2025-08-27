import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, Monitor, Wrench, MessageSquare, Clock, Shield, ArrowRight } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Globe,
      title: 'Desenvolvimento de Aplicações',
      description: 'Sistemas web, APIs REST, aplicações mobile e soluções customizadas para seu negócio.',
      features: ['Single Page Applications', 'Progressive Web Apps', 'APIs RESTful', 'Integração de Sistemas'],
      highlight: 'Entrega em 7-30 dias'
    },
    {
      icon: Monitor,
      title: 'Suporte Presencial',
      description: 'Atendimento técnico in-loco para resolução de problemas complexos e implementação de soluções.',
      features: ['Diagnóstico no local', 'Implementação guiada', 'Treinamento da equipe', 'Configuração de ambiente'],
      highlight: 'Disponível na região'
    },
    {
      icon: MessageSquare,
      title: 'Suporte Online',
      description: 'Assistência remota 24/7 para manutenção, correções e evolução dos seus sistemas.',
      features: ['Monitoramento 24/7', 'Correção de bugs', 'Atualizações de segurança', 'Otimização de performance'],
      highlight: 'Resposta em até 2h'
    },
    {
      icon: Wrench,
      title: 'Manutenção de Sistemas',
      description: 'Manutenção preventiva e corretiva para garantir alta disponibilidade dos seus sistemas.',
      features: ['Backup automático', 'Atualizações regulares', 'Monitoramento proativo', 'Relatórios mensais'],
      highlight: 'SLA 99.9% uptime'
    }
  ];

  const openWhatsApp = () => {
    window.open('https://wa.me/5563992476987?text=Olá! Gostaria de saber mais sobre os serviços de desenvolvimento.', '_blank');
  };

  return (
    <section id="servicos" className="py-section bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Serviços <span className="bg-gradient-text bg-clip-text text-transparent">Profissionais</span>
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              <span className="text-primary font-medium">Soluções completas</span> em desenvolvimento e suporte técnico, 
              adaptadas às suas <span className="text-accent font-medium">necessidades específicas</span>.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {services.map((service, index) => (
              <Card key={index} className="p-8 bg-card/50 backdrop-blur-sm border-border/30 hover:border-primary/30 hover:shadow-glow transition-all duration-300 group animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-xl font-semibold mb-2">{service.title}</h3>
                    <div className="inline-flex items-center gap-2 text-sm text-accent font-medium mb-3">
                      <Clock className="h-3 w-3" />
                      {service.highlight}
                    </div>
                  </div>
                </div>
                
                <p className="text-white/80 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-sm text-white/70">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button variant="outline" className="w-full group-hover:border-primary/50" onClick={openWhatsApp}>
                  Solicitar orçamento
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Card className="p-8 bg-gradient-primary/5 backdrop-blur-sm border-primary/20 max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-4 mb-6">
                <Shield className="h-8 w-8 text-accent" />
                <h3 className="font-heading text-2xl font-semibold">Garantia de Qualidade</h3>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-accent mb-1">30 dias</div>
                  <div className="text-sm text-white/70">Garantia em correções</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent mb-1">24/7</div>
                  <div className="text-sm text-white/70">Suporte de emergência</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent mb-1">100%</div>
                  <div className="text-sm text-white/70">Satisfação garantida</div>
                </div>
              </div>

              <Button variant="cta" size="xl" className="mt-8" onClick={openWhatsApp}>
                <MessageSquare className="h-5 w-5" />
                Resolva seu problema hoje
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;