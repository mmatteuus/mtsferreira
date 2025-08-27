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
              Sobre <span className="bg-gradient-text bg-clip-text text-transparent">MtsFerreira</span>
            </h2>
            <p className="text-lg mb-2 max-w-2xl mx-auto">
              <span className="bg-gradient-primary bg-clip-text text-transparent font-semibold">
                Engenheiro de Software
              </span> com foco em soluções práticas e eficientes
            </p>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              <span className="text-purple font-medium">Pós-graduado</span> em 
              <span className="text-cyan font-medium"> Cloud Computing</span>, 
              <span className="text-yellow font-medium"> Big Data</span> e 
              <span className="text-orange font-medium"> Inteligência Artificial</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="animate-slide-in">
              <h3 className="font-heading text-2xl font-semibold mb-6">
                <span className="bg-gradient-secondary bg-clip-text text-transparent">Experiência Técnica</span>
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Com mais de <span className="text-primary font-semibold">5 anos</span> desenvolvendo soluções tecnológicas, combino 
                <span className="text-accent font-medium"> expertise técnica</span> com uma abordagem pragmática para entregar 
                resultados que realmente fazem a diferença nos negócios.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Pós-graduado em <span className="text-cyan font-medium">Cloud Computing</span>, 
                <span className="text-yellow font-medium"> Big Data</span> e 
                <span className="text-orange font-medium"> Inteligência Artificial</span>. 
                Especialista em <span className="text-purple font-medium">arquiteturas escaláveis</span>, desde aplicações web modernas 
                até sistemas complexos de backend, sempre priorizando performance, segurança e manutenibilidade.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'JavaScript', color: 'text-yellow' },
                  { name: 'TypeScript', color: 'text-primary' },
                  { name: 'Python', color: 'text-accent' },
                  { name: 'React', color: 'text-cyan' },
                  { name: 'Node.js', color: 'text-accent' },
                  { name: 'AWS', color: 'text-orange' },
                  { name: 'Docker', color: 'text-primary' },
                  { name: 'PostgreSQL', color: 'text-purple' },
                  { name: 'AI/ML', color: 'text-orange' },
                  { name: 'Big Data', color: 'text-yellow' }
                ].map((tech) => (
                  <span 
                    key={tech.name}
                    className={`px-3 py-1 bg-muted/30 rounded-full text-sm border border-border/30 hover:border-primary/30 transition-colors ${tech.color} font-medium hover:shadow-glow`}
                  >
                    {tech.name}
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
            <Card className="p-8 bg-gradient-primary/10 backdrop-blur-sm border-primary/20 max-w-4xl mx-auto animate-glow-pulse">
              <h3 className="font-heading text-xl font-semibold mb-4 bg-gradient-secondary bg-clip-text text-transparent">
                Metodologia de Trabalho
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="bg-gradient-accent bg-clip-text text-transparent">
                  Análise → Planejamento → Desenvolvimento → Testes → Entrega → Suporte
                </strong>
                <br />
                Processo estruturado que garante <span className="text-primary font-medium">qualidade</span>, 
                <span className="text-accent font-medium"> prazos cumpridos</span> e total 
                <span className="text-purple font-medium"> transparência</span> durante todo o projeto.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;