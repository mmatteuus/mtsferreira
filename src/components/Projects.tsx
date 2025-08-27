import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, ArrowRight, TrendingUp, Users, Zap } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'Sistema de Gestão E-commerce',
      problem: 'Empresa precisava migrar de planilhas para sistema integrado de vendas online com controle de estoque.',
      solution: 'Desenvolvimento de plataforma completa com painel administrativo, API de pagamentos e sincronização de estoque.',
      result: 'Aumento de 300% nas vendas online e redução de 80% em erros de estoque.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe API'],
      metrics: {
        icon: TrendingUp,
        value: '+300%',
        label: 'Crescimento vendas'
      }
    },
    {
      title: 'Aplicativo de Delivery',
      problem: 'Rede de restaurantes necessitava de app próprio para competir com grandes plataformas de delivery.',
      solution: 'App mobile híbrido com sistema de pedidos, tracking em tempo real e painel para gerenciamento de entregas.',
      result: 'Redução de 25% nas taxas de comissão e controle total da experiência do cliente.',
      technologies: ['React Native', 'Firebase', 'Google Maps API', 'Push Notifications'],
      metrics: {
        icon: Users,
        value: '10k+',
        label: 'Usuários ativos'
      }
    },
    {
      title: 'Automação de Processos Internos',
      problem: 'Consultoria com processos manuais demorados para geração de relatórios e controle de horas.',
      solution: 'Sistema de automação com integração entre CRM, planilhas e geração automática de relatórios.',
      result: 'Economia de 15 horas semanais e aumento de 40% na produtividade da equipe.',
      technologies: ['Python', 'APIs REST', 'Zapier', 'Google Sheets API'],
      metrics: {
        icon: Zap,
        value: '-15h',
        label: 'Economia semanal'
      }
    },
    {
      title: 'Plataforma de Cursos Online',
      problem: 'Instituição educacional precisava de solução própria para ensino à distância durante pandemia.',
      solution: 'LMS completo com videoaulas, exercícios interativos, certificados automáticos e painel de progresso.',
      result: 'Migração de 100% das aulas presenciais e manutenção da qualidade educacional.',
      technologies: ['Next.js', 'Supabase', 'Video.js', 'PDF-lib'],
      metrics: {
        icon: Users,
        value: '500+',
        label: 'Alunos cadastrados'
      }
    },
    {
      title: 'Sistema de Monitoramento IoT',
      problem: 'Indústria necessitava monitorar equipamentos remotamente para prevenir falhas e otimizar manutenção.',
      solution: 'Dashboard em tempo real com sensores IoT, alertas automáticos e relatórios de performance.',
      result: 'Redução de 60% em paradas não programadas e economia de 30% nos custos de manutenção.',
      technologies: ['Vue.js', 'MQTT', 'InfluxDB', 'Grafana'],
      metrics: {
        icon: TrendingUp,
        value: '-60%',
        label: 'Paradas reduzidas'
      }
    }
  ];

  const openWhatsApp = () => {
    window.open('https://wa.me/5563992476987?text=Olá! Vi seus projetos e gostaria de discutir uma solução para meu negócio.', '_blank');
  };

  return (
    <section id="projetos" className="py-section bg-gradient-dark">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Projetos de <span className="bg-gradient-text bg-clip-text text-transparent animate-glow-pulse">Impacto</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              <span className="text-primary font-medium">Casos reais</span> de sucesso que demonstram como a 
              <span className="text-accent font-medium"> tecnologia</span> pode 
              <span className="text-purple font-medium"> transformar negócios</span> e processos.
            </p>
          </div>

          <div className="grid gap-8 mb-16">
            {projects.map((project, index) => (
              <Card key={index} className="p-8 bg-card/50 backdrop-blur-sm border-border/30 hover:border-primary/30 hover:shadow-glow transition-all duration-500 group animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="grid md:grid-cols-3 gap-8">
                  {/* Problem & Solution */}
                  <div className="md:col-span-2">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-heading text-xl font-semibold group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2 bg-primary/10 rounded-full px-3 py-1">
                        <project.metrics.icon className="h-3 w-3 text-accent" />
                        <span className="text-sm font-semibold text-accent">{project.metrics.value}</span>
                        <span className="text-xs text-muted-foreground">{project.metrics.label}</span>
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div>
                        <Badge variant="outline" className="mb-2 border-red-500/30 text-red-400">
                          Problema
                        </Badge>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {project.problem}
                        </p>
                      </div>

                      <div>
                        <Badge variant="outline" className="mb-2 border-blue-500/30 text-blue-400">
                          Solução
                        </Badge>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {project.solution}
                        </p>
                      </div>

                      <div>
                        <Badge variant="outline" className="mb-2 border-green-500/30 text-green-400">
                          Resultado
                        </Badge>
                        <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                          {project.result}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* CTA Section */}
                  <div className="flex flex-col justify-center items-center text-center p-6 bg-gradient-primary/5 rounded-lg border border-primary/10">
                    <h4 className="font-semibold mb-3">Projeto similar?</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Vamos conversar sobre como posso ajudar seu negócio.
                    </p>
                    <Button variant="outline" size="sm" onClick={openWhatsApp} className="group-hover:border-primary/50">
                      Conversar agora
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Card className="p-8 bg-gradient-primary/10 backdrop-blur-sm border-primary/20 max-w-4xl mx-auto">
              <h3 className="font-heading text-2xl font-semibold mb-4">
                Pronto para transformar seu negócio?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
                Cada projeto é único. Vamos analisar seu desafio específico e desenvolver a solução ideal 
                para suas necessidades, com o mesmo cuidado e qualidade dos casos apresentados.
              </p>
              <Button variant="cta" size="xl" onClick={openWhatsApp}>
                Vamos começar seu projeto
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;