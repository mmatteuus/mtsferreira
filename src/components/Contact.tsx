import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Mail, MapPin, Clock, Phone, Send, ArrowRight } from 'lucide-react';

const Contact = () => {
  const openWhatsApp = () => {
    window.open('https://wa.me/5563992476987?text=Olá! Gostaria de contratar seus serviços. Podemos conversar?', '_blank');
  };

  const openEmail = () => {
    window.open('mailto:contato@mtsferreira.dev?subject=Solicitação de Orçamento&body=Olá! Gostaria de solicitar um orçamento para:', '_blank');
  };

  const contactMethods = [
    {
      icon: MessageSquare,
      title: 'WhatsApp',
      description: 'Resposta imediata',
      detail: '(63) 99247-6987',
      action: openWhatsApp,
      highlight: true
    },
    {
      icon: Mail,
      title: 'E-mail',
      description: 'Para projetos detalhados',
      detail: 'contato@mtsferreira.dev',
      action: openEmail,
      highlight: false
    },
    {
      icon: MapPin,
      title: 'Presencial',
      description: 'Palmas/TO e região',
      detail: 'Agendamento necessário',
      action: openWhatsApp,
      highlight: false
    }
  ];

  const services = [
    'Desenvolvimento de aplicações web',
    'Criação de APIs e integrações',
    'Aplicativos mobile',
    'Automação de processos',
    'Manutenção de sistemas',
    'Consultoria técnica',
    'Migração de dados',
    'Otimização de performance'
  ];

  return (
    <section id="contato" className="py-section bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Vamos conversar sobre seu <span className="bg-gradient-text bg-clip-text text-transparent animate-glow-pulse">projeto</span>
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Entre em contato para discutir como posso ajudar a 
              <span className="text-primary font-medium"> resolver seus desafios</span> 
              <span className="text-accent font-medium"> tecnológicos</span>.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Contact Methods */}
            <div className="animate-slide-in">
              <h3 className="font-heading text-2xl font-semibold mb-8 text-white">Formas de Contato</h3>
              
              <div className="space-y-4 mb-8">
                {contactMethods.map((method, index) => (
                  <Card 
                    key={index} 
                    className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-glow ${method.highlight ? 'bg-gradient-primary/10 border-primary/30' : 'bg-card/50 border-border/30 hover:border-primary/30'}`}
                    onClick={method.action}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${method.highlight ? 'bg-primary/20' : 'bg-muted/30'}`}>
                        <method.icon className={`h-5 w-5 ${method.highlight ? 'text-primary' : 'text-white/70'}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-white">{method.title}</h4>
                          {method.highlight && (
                            <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full">
                              Recomendado
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-white/70 mb-1">{method.description}</p>
                        <p className="text-sm font-medium text-white">{method.detail}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-white/50" />
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="p-6 bg-muted/20 border-border/30">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-5 w-5 text-white/70" />
                  <h4 className="font-semibold text-white">Horário de Atendimento</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/70">Segunda à Sexta:</span>
                    <span className="text-white">08:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Sábado:</span>
                    <span className="text-white">09:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Emergências:</span>
                    <span className="text-accent">24/7 via WhatsApp</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Services & CTA */}
            <div className="animate-fade-in">
              <h3 className="font-heading text-2xl font-semibold mb-8 text-white">Como posso ajudar?</h3>
              
              <div className="grid grid-cols-1 gap-3 mb-8">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-sm text-white/80">{service}</span>
                  </div>
                ))}
              </div>

              <Card className="p-8 bg-gradient-primary/5 backdrop-blur-sm border-primary/20">
                <h4 className="font-heading text-xl font-semibold mb-4 text-center text-white">
                  Orçamento Gratuito
                </h4>
                <p className="text-white/70 text-center mb-6 text-sm leading-relaxed">
                  Descreva seu projeto ou problema e receba um orçamento detalhado sem compromisso. 
                  Primeira consultoria sempre gratuita.
                </p>
                
                <div className="space-y-3">
                  <Button variant="cta" size="lg" onClick={openWhatsApp} className="w-full animate-glow-pulse">
                    <MessageSquare className="h-5 w-5" />
                    Solicitar orçamento pelo WhatsApp
                  </Button>
                  
                  <Button variant="outline" size="lg" onClick={openEmail} className="w-full">
                    <Send className="h-5 w-5" />
                    Enviar detalhes por e-mail
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t border-border/30 text-center">
                  <div className="flex items-center justify-center gap-4 text-sm text-white/70">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-accent rounded-full" />
                      <span>Resposta rápida</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-accent rounded-full" />
                      <span>Orçamento gratuito</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-accent rounded-full" />
                      <span>Sem compromisso</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="text-center">
            <Card className="p-6 bg-accent/5 backdrop-blur-sm border-accent/20 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Phone className="h-5 w-5 text-accent animate-pulse" />
                <h3 className="font-heading text-lg font-semibold text-white">Emergências Técnicas</h3>
              </div>
              <p className="text-sm text-white/70 mb-4">
                Sistema fora do ar? Problema crítico? Entre em contato imediatamente.
              </p>
              <Button variant="outline" onClick={openWhatsApp} className="border-accent/30 text-accent hover:bg-accent/10">
                <MessageSquare className="h-4 w-4" />
                Contato de emergência
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;