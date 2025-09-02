import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <About />
      <Services />
      {/* Seção rápida para pesquisar/ir para O.S */}
      <section id="pesquisar-os" className="container mx-auto px-6 py-16">
        <div className="rounded-lg border border-border p-6 bg-muted/30">
          <h2 className="text-xl font-semibold mb-2">Gestão de Ordens de Serviço</h2>
          <p className="text-muted-foreground mb-4">
            Acesse o módulo para cadastrar clientes, abrir e acompanhar O.S.
          </p>
          <a href="/os" className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium bg-primary text-primary-foreground border-transparent hover:opacity-90">
            Acessar módulo de O.S
          </a>
        </div>
      </section>
      <Projects />
      <Contact />
      <Footer />
      <BackToTop />
    </main>
  );
};

export default Index;
