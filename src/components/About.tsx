import { Card } from '@/components/ui/card';
import { Code2, Server, Smartphone, Zap } from 'lucide-react';

const About = () => {
  const skills = [
    {
      icon: Code2,
      title: 'Desenvolvimento Full-Stack',
      description: 'React, Node.js, Python, TypeScript'
    },
    {
      icon: Server,
      title: 'Infraestrutura & DevOps',
      description: 'AWS, Docker, CI/CD, Monitoramento'
    },
    {
      icon: Smartphone,
      title: 'Aplicações Mobile',
      description: 'React Native, Flutter, PWAs'
    },
    {
      icon: Zap,
      title: 'Soluções Rápidas',
      description: 'Automação, APIs, Integração de Sistemas'
    }
  ];

  return (
    <section id="sobre" className="py-section bg-gradient-dark">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Sobre <span className="bg-gradient-primary bg-clip-text text-transparent">MtsFerreira</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Engenheiro de software com foco em soluções práticas e eficientes para desafios tecnológicos complexos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="animate-slide-in">
              <h3 className="font-heading text-2xl font-semibold mb-6">Experiência Técnica</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Com mais de 5 anos desenvolvendo soluções tecnológicas, combino expertise técnica com 
                uma abordagem pragmática para entregar resultados que realmente fazem a diferença nos negócios.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Especialista em arquiteturas escaláveis, desde aplicações web modernas até sistemas complexos 
                de backend, sempre priorizando performance, segurança e manutenibilidade.
              </p>
              <div className="flex flex-wrap gap-2">
                {['JavaScript', 'TypeScript', 'Python', 'React', 'Node.js', 'AWS', 'Docker', 'PostgreSQL'].map((tech) => (
                  <span 
                    key={tech}
                    className="px-3 py-1 bg-muted/30 rounded-full text-sm border border-border/30 hover:border-primary/30 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <Card key={index} className="p-4 bg-card/50 backdrop-blur-sm border-border/30 hover:border-primary/30 transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <skill.icon className="h-8 w-8 text-primary mb-3" />
                  <h4 className="font-semibold mb-2 text-sm">{skill.title}</h4>
                  <p className="text-xs text-muted-foreground">{skill.description}</p>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Card className="p-8 bg-gradient-primary/10 backdrop-blur-sm border-primary/20 max-w-4xl mx-auto">
              <h3 className="font-heading text-xl font-semibold mb-4">Metodologia de Trabalho</h3>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Análise → Planejamento → Desenvolvimento → Testes → Entrega → Suporte</strong>
                <br />
                Processo estruturado que garante qualidade, prazos cumpridos e total transparência durante todo o projeto.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;