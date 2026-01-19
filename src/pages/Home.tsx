import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeroCanvas from '../components/HeroCanvas';
import PortfolioCarousel from '../components/PortfolioCarousel';
import ScrollAnimation from '../components/ScrollAnimation';
import { fetchProjects, fetchBlogPosts } from '../services/supabaseService';
import { sendProjectRequest } from '../services/emailService';
import { Project, BlogPost } from '../types';
import { Code, ShoppingCart, Layout, Smartphone, ArrowRight, Zap, ArrowUpRight, Search, PenTool, Cpu, Rocket, Mail, CheckCircle, ChevronRight, ChevronLeft, Target, Award, Users, AlertCircle } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const Home: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const p = await fetchProjects();
            setProjects(p);
            const b = await fetchBlogPosts();
            setBlogPosts(b);
        };
        loadData();
    }, []);

    // Função auxiliar para rolar suavemente
    const handleScrollToContact = (e: React.MouseEvent) => {
        e.preventDefault();
        const element = document.getElementById('contact');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="w-full bg-bg-dark overflow-x-hidden">
            {/* ==================================================================================== */}
            {/* 1. SEÇÃO HERO (TOPO DO SITE) */}
            {/* ==================================================================================== */}
            <section id="home" className="relative min-h-screen w-full flex flex-col items-center justify-center pt-24 pb-12 md:pt-0">
                <HeroCanvas />
                
                <div className="relative z-10 px-5 max-w-7xl mx-auto w-full text-center md:text-left flex flex-col md:items-center">
                    <ScrollAnimation>
                        {/* ✏️ BADGE "DISPONÍVEL" */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 mx-auto md:mx-0 animate-fade-in-up hover:border-neon-cyan/50 transition-colors cursor-default">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
                            </span>
                            <span className="text-[10px] md:text-sm font-medium tracking-wide uppercase text-gray-300">Disponível para novos projetos</span>
                        </div>
                    </ScrollAnimation>

                    <ScrollAnimation delay={0.1}>
                        {/* ✏️ TÍTULO PRINCIPAL (MANCHETE) */}
                        <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold leading-tight md:leading-[1.1] mb-6 md:mb-8 tracking-tight text-center">
                            Design que <br />
                            <span className="text-transparent bg-clip-text bg-grad-purple inline-block hover:scale-105 transition-transform duration-500 cursor-default drop-shadow-[0_0_15px_rgba(178,0,255,0.3)]">Inspira.</span>{" "}
                            <span className="text-outline">Código</span> que <br />
                            <span className="text-transparent bg-clip-text bg-grad-cyan inline-block hover:scale-105 transition-transform duration-500 cursor-default drop-shadow-[0_0_15px_rgba(0,226,255,0.3)]">Funciona.</span>
                        </h1>
                    </ScrollAnimation>
                    
                    <ScrollAnimation delay={0.2}>
                        {/* ✏️ SUBTÍTULO / DESCRIÇÃO CURTA */}
                        <p className="text-base md:text-2xl text-gray-400 max-w-3xl mx-auto text-center mb-8 md:mb-12 font-light leading-relaxed px-2">
                            Agência digital especializada em criar ecossistemas digitais de alta performance, unindo estética premium e funcionalidade robusta.
                        </p>
                    </ScrollAnimation>

                    <ScrollAnimation delay={0.3}>
                        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center w-full sm:w-auto px-4 sm:px-0">
                            {/* BOTÃO INICIAR PROJETO - Vai para o formulário */}
                            <a 
                                href="#contact" 
                                onClick={handleScrollToContact}
                                className="w-full sm:w-auto group relative px-8 py-4 md:px-9 md:py-5 bg-white text-black rounded-full font-bold text-base md:text-lg hover:bg-neon-cyan transition-colors overflow-hidden flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(0,226,255,0.5)] cursor-pointer"
                            >
                                <span className="relative z-10">Iniciar Projeto</span>
                                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                            
                            <Link to="/portfolio" className="w-full sm:w-auto px-8 py-4 md:px-9 md:py-5 text-white border border-white/20 rounded-full font-medium text-base md:text-lg hover:bg-white/5 hover:border-white/40 transition-colors backdrop-blur-sm text-center">
                                Ver Portfólio
                            </Link>
                        </div>
                    </ScrollAnimation>
                </div>
            </section>

            {/* ==================================================================================== */}
            {/* 2. QUEM SOMOS (ABOUT) */}
            {/* ==================================================================================== */}
            <section id="about" className="py-20 md:py-32 relative bg-[#080808] border-t border-white/5">
                <div className="container max-w-7xl mx-auto px-5 md:px-6">
                    <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">
                        {/* Left: Text */}
                        <div className="md:w-1/2">
                            <ScrollAnimation>
                                <h2 className="text-xs md:text-sm font-bold tracking-widest text-neon-cyan uppercase mb-2 md:mb-3">Quem Somos</h2>
                                {/* ✏️ TÍTULO SOBRE */}
                                <h3 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                                    Não somos apenas devs. <br/>
                                    Somos <span className="text-transparent bg-clip-text bg-grad-purple">Parceiros de Negócio.</span>
                                </h3>
                                {/* ✏️ TEXTO CORRIDO SOBRE */}
                                <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6">
                                    A UX Vision nasceu da necessidade de unir o design estético com a engenharia robusta. 
                                    Muitas agências focam em um e esquecem do outro. Nós acreditamos que a mágica acontece na intersecção.
                                </p>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-8">
                                    <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                                        <div className="text-neon-purple shrink-0">
                                            <Target size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white">Foco em ROI</h4>
                                            <p className="text-xs text-gray-500">Resultados reais</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                                        <div className="text-neon-cyan shrink-0">
                                            <Award size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white">Qualidade Premium</h4>
                                            <p className="text-xs text-gray-500">Sem atalhos</p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollAnimation>
                        </div>

                        {/* Right: Visual/Stats */}
                        {/* ✏️ ESTATÍSTICAS (NÚMEROS) */}
                        <div className="md:w-1/2 w-full">
                            <ScrollAnimation delay={0.2}>
                                <div className="grid grid-cols-2 gap-3 md:gap-4">
                                    <div className="bg-white/5 p-4 md:p-8 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center h-32 md:h-48">
                                        <span className="text-3xl md:text-5xl font-bold text-white mb-2">50+</span>
                                        <span className="text-gray-400 text-xs md:text-sm">Projetos</span>
                                    </div>
                                    <div className="bg-white/5 p-4 md:p-8 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center h-32 md:h-48 mt-4 md:mt-8">
                                        <span className="text-3xl md:text-5xl font-bold text-white mb-2">98%</span>
                                        <span className="text-gray-400 text-xs md:text-sm">NPS</span>
                                    </div>
                                    <div className="bg-white/5 p-4 md:p-8 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center h-32 md:h-48 -mt-4 md:-mt-8">
                                        <span className="text-3xl md:text-5xl font-bold text-white mb-2">24/7</span>
                                        <span className="text-gray-400 text-xs md:text-sm">Suporte</span>
                                    </div>
                                    <div className="bg-white/5 p-4 md:p-8 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center h-32 md:h-48">
                                        <Users className="w-8 h-8 md:w-12 md:h-12 text-neon-purple mb-2" />
                                        <span className="text-gray-400 text-xs md:text-sm">Time Expert</span>
                                    </div>
                                </div>
                            </ScrollAnimation>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================================================================================== */}
            {/* 3. O QUE FAZEMOS (SERVICES) */}
            {/* ==================================================================================== */}
            <section id="services" className="py-20 md:py-32 relative bg-bg-dark">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                
                <div className="container max-w-7xl mx-auto px-5 md:px-6">
                    <ScrollAnimation>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-4 md:gap-6">
                            <div className="max-w-xl">
                                <h2 className="text-xs md:text-sm font-bold tracking-widest text-neon-purple uppercase mb-2 md:mb-3">Expertise</h2>
                                <h3 className="text-3xl md:text-5xl font-bold leading-tight">Soluções Digitais <br/>360 Graus</h3>
                            </div>
                            <p className="text-gray-400 max-w-md text-lg md:text-xl text-left leading-relaxed">
                                Do design à implementação, cuidamos de cada pixel e linha de código.
                            </p>
                        </div>
                    </ScrollAnimation>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
                        {/* ✏️ CARD GRANDE (DESTAQUE) */}
                        <div className="md:col-span-2">
                             <ServiceCardLarge 
                                icon={<Code />} 
                                title="Desenvolvimento Web High-End" 
                                desc="Desenvolvimento robusto com React, Next.js e Tailwind. Também somos especialistas em Bubble e WordPress (Elementor) para soluções ágeis e gerenciáveis."
                             />
                        </div>
                        {/* ✏️ CARDS MENORES */}
                        <ServiceCard icon={<ShoppingCart />} title="E-commerce" desc="Lojas que convertem visitantes em clientes fiéis." />
                        <ServiceCard icon={<Layout />} title="Sistemas & Dashboards" desc="Painéis administrativos e SaaS com arquitetura escalável." />
                        <ServiceCard icon={<Smartphone />} title="Mobile UI/UX" desc="Interfaces nativas intuitivas para iOS e Android." />
                        
                        <div className="md:col-span-1 bg-grad-purple rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden group min-h-[250px]">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                            <div className="relative z-10">
                                <Zap className="w-12 h-12 text-white mb-4" />
                                <h3 className="text-2xl font-bold text-white mb-2">Performance First</h3>
                                <p className="text-white/80 text-lg">Otimização máxima para Core Web Vitals.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================================================================================== */}
            {/* 4. COMO FAZEMOS (PROCESS) */}
            {/* ==================================================================================== */}
            <section id="process" className="py-20 md:py-40 relative overflow-hidden bg-bg-dark border-t border-white/5">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[800px] bg-grad-purple opacity-5 blur-[120px] rounded-full pointer-events-none"></div>

                <div className="container max-w-6xl mx-auto px-5 md:px-6 relative z-10">
                    <ScrollAnimation>
                        <div className="text-center mb-16 md:mb-28">
                            <h2 className="text-xs md:text-sm font-bold tracking-widest text-neon-purple uppercase mb-2 md:mb-3">Workflow</h2>
                            <h3 className="text-3xl md:text-6xl font-bold">O Método UX Vision</h3>
                            <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-lg md:text-xl">Um processo refinado para transformar complexidade em resultados simples.</p>
                        </div>
                    </ScrollAnimation>

                    <div className="relative pl-4 md:pl-0">
                        <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-neon-purple via-neon-cyan to-transparent md:-ml-0.5 rounded-full opacity-30"></div>
                        <div className="absolute left-[28px] md:left-1/2 top-0 h-1/2 w-1 bg-gradient-to-b from-neon-purple to-transparent md:-ml-0.5 rounded-full blur-sm"></div>

                        {/* ✏️ PASSOS DO PROCESSO */}
                        <ProcessStep 
                            icon={<Search />} 
                            number="01" 
                            title="Discovery & Research" 
                            desc="Mergulhamos fundo no ecossistema do seu negócio. Análise de competidores, definição de personas e alinhamento de KPIs." 
                            align="left" 
                        />
                        <ProcessStep 
                            icon={<PenTool />} 
                            number="02" 
                            title="Architecture & UX" 
                            desc="Desenhamos a estrutura lógica e a jornada do usuário. Wireframes de baixa fidelidade para validar fluxos antes do visual." 
                            align="right" 
                        />
                        <ProcessStep 
                            icon={<Cpu />} 
                            number="03" 
                            title="High-End Development" 
                            desc="Codificação limpa usando as stacks mais modernas (React, Node, Next.js). Foco total em performance e animações fluidas." 
                            align="left" 
                        />
                        <ProcessStep 
                            icon={<Rocket />} 
                            number="04" 
                            title="Launch & Growth" 
                            desc="Deploy em infraestrutura escalável (Vercel/AWS). Testes A/B, otimização de SEO e monitoramento contínuo." 
                            align="right" 
                        />
                    </div>
                </div>
            </section>

            {/* ==================================================================================== */}
            {/* 5. PORTFOLIO SECTION */}
            {/* ==================================================================================== */}
            <section id="portfolio" className="py-20 md:py-32 bg-black relative border-t border-white/5">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-neon-purple/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"></div>

                <div className="container max-w-[1600px] mx-auto px-5 md:px-6 relative z-10">
                    <ScrollAnimation>
                        <div className="text-center mb-10 md:mb-16">
                            <h2 className="text-xs md:text-sm font-bold tracking-widest text-neon-cyan uppercase mb-2 md:mb-3">Selected Works</h2>
                            <h3 className="text-3xl md:text-6xl font-bold mb-4">Projetos em Destaque</h3>
                        </div>
                    </ScrollAnimation>

                    <ScrollAnimation delay={0.2}>
                        <PortfolioCarousel projects={projects} />
                    </ScrollAnimation>
                    
                    <div className="text-center mt-8 md:mt-12">
                         <Link to="/portfolio" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors border-b border-transparent hover:border-neon-cyan pb-1 text-base md:text-lg">
                            Ver arquivo completo <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

             {/* ==================================================================================== */}
             {/* 6. BLOG SECTION */}
             {/* ==================================================================================== */}
             <section id="blog" className="py-20 md:py-32 border-t border-white/5 bg-bg-dark">
                <div className="container max-w-7xl mx-auto px-5 md:px-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-6">
                         <ScrollAnimation>
                            <h2 className="text-3xl md:text-5xl font-bold">Insights & <br/> Updates</h2>
                        </ScrollAnimation>
                        <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-all text-base md:text-lg w-full md:w-auto justify-center">
                            Ler todos os artigos <ArrowUpRight size={20} />
                        </Link>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* 🟢 LISTA DE POSTS (LIMITADO A 3) */}
                        {blogPosts.slice(0, 3).map((post, idx) => (
                            <ScrollAnimation key={post.id} delay={idx * 0.1}>
                                <Link to={`/blog/${post.slug}`} className="group cursor-pointer">
                                    <div className="h-[240px] md:h-[260px] rounded-3xl overflow-hidden mb-6 relative border border-white/5">
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                                        <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute top-4 left-4 z-20">
                                            <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider text-white border border-white/10">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-neon-cyan transition-colors leading-tight">{post.title}</h3>
                                    <p className="text-gray-400 text-sm md:text-base line-clamp-2 leading-relaxed">{post.excerpt}</p>
                                </Link>
                            </ScrollAnimation>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* ==================================================================================== */}
            {/* 7. CONTACT SECTION */}
            {/* ==================================================================================== */}
            <section id="contact" className="py-16 md:py-24 relative overflow-hidden bg-bg-dark border-t border-white/5">
                 <div className="absolute right-0 bottom-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-neon-cyan/5 rounded-full blur-[100px] pointer-events-none"></div>

                 <div className="container mx-auto px-5 md:px-6 relative z-10">
                      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
                          
                          {/* LEFT SIDE */}
                          <div className="lg:w-1/2 w-full">
                                <ScrollAnimation>
                                    <h2 className="text-4xl md:text-7xl font-bold mb-6 md:mb-8 leading-tight">
                                        Vamos criar algo <br/> 
                                        <span className="text-transparent bg-clip-text bg-grad-purple drop-shadow-[0_0_10px_rgba(178,0,255,0.5)]">
                                            extraordinário?
                                        </span>
                                    </h2>
                                    <p className="text-gray-400 text-lg md:text-xl mb-8 md:mb-12 max-w-lg leading-relaxed">
                                        Estamos prontos para levar seu projeto para o próximo nível. Preencha o formulário e vamos começar.
                                    </p>
                                </ScrollAnimation>

                                <div className="grid gap-4 md:gap-8">
                                    <ContactInfoCard 
                                        icon={<Mail />} 
                                        title="Email" 
                                        value="contato@uxvision.com.br" 
                                        action="Enviar Email" 
                                        link="mailto:contato@uxvision.com.br"
                                    />
                                    <ContactInfoCard 
                                        icon={<FaWhatsapp />} 
                                        title="WhatsApp" 
                                        value="(14) 99820-3321" 
                                        action="Enviar Mensagem" 
                                        link="https://wa.me/5514998203321"
                                    />
                                </div>
                          </div>

                          {/* RIGHT SIDE */}
                          <div className="lg:w-1/2 w-full">
                                <ScrollAnimation delay={0.2}>
                                    <MultiStepForm />
                                </ScrollAnimation>
                          </div>
                      </div>
                 </div>
            </section>
        </div>
    );
};

// --- SUB-COMPONENTS ---

const ServiceCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
    <ScrollAnimation>
        <div className="h-full bg-white/[0.02] backdrop-blur-sm border border-white/5 p-6 md:p-8 rounded-3xl hover:border-neon-cyan/30 transition-all duration-300 hover:bg-white/[0.04] group flex flex-col">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:bg-neon-cyan group-hover:text-black transition-all duration-300">
                {React.cloneElement(icon as React.ReactElement<any>, { size: 24 })}
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-3">{title}</h3>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">{desc}</p>
        </div>
    </ScrollAnimation>
);

const ServiceCardLarge = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
    <ScrollAnimation className="h-full">
        <div className="h-full bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm border border-white/5 p-8 md:p-10 rounded-3xl hover:border-neon-purple/30 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-neon-purple/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-neon-purple/20 transition-all"></div>
            
            <div className="relative z-10">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/5 flex items-center justify-center text-neon-purple mb-6 md:mb-8 border border-white/5 transition-all duration-300 group-hover:bg-neon-purple group-hover:text-white group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(178,0,255,0.5)]">
                    {React.cloneElement(icon as React.ReactElement<any>, { size: 28 })}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{title}</h3>
                <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-lg">{desc}</p>
            </div>
        </div>
    </ScrollAnimation>
);

const ProcessStep = ({ icon, number, title, desc, align }: { icon: React.ReactNode, number: string, title: string, desc: string, align: 'left' | 'right' }) => (
    <ScrollAnimation>
        {/* Mobile: Always layout content to the right of the line. Desktop: Alternating. */}
        <div className={`relative mb-16 md:mb-24 w-full md:w-1/2 flex 
            ${align === 'right' 
                ? 'md:ml-auto md:justify-start pl-16 md:pl-24' 
                : 'md:mr-auto md:justify-end pl-16 md:pr-24'}`}>
            
            {/* Horizontal Connector Line */}
            <div className={`absolute top-8 w-12 md:w-16 h-[2px] bg-gradient-to-r from-neon-purple/50 to-transparent z-0 
                ${align === 'right' 
                    ? 'left-[28px] md:left-0' // Mobile: Left aligned | Desktop: Left aligned (for right items)
                    : 'left-[28px] md:right-0 md:bg-gradient-to-l' // Mobile: Left aligned | Desktop: Right aligned (for left items)
                }`}>
            </div>

            {/* Dot on Main Line */}
            <div className={`absolute top-6 w-5 h-5 bg-bg-dark border-2 border-neon-cyan rounded-full z-20 shadow-[0_0_15px_rgba(0,226,255,0.8)]
                ${align === 'right' 
                    ? 'left-[19px] md:-left-[10px]' 
                    : 'left-[19px] md:-right-[10px]'}`}>
                <div className="absolute inset-0 bg-neon-cyan opacity-50 rounded-full animate-ping"></div>
            </div>

            {/* Card Content */}
            <div className="relative group w-full max-w-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="relative bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 hover:border-neon-cyan/30 transition-all duration-300 overflow-hidden">
                    <span className="absolute -top-6 -right-4 text-[6rem] md:text-[8rem] font-black text-white/[0.02] select-none group-hover:text-white/[0.05] transition-colors">{number}</span>
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center text-neon-cyan mb-4 md:mb-6 shadow-lg group-hover:scale-110 transition-transform">
                        {React.cloneElement(icon as React.ReactElement<any>, { size: 20 })}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-white group-hover:text-neon-cyan transition-colors relative z-10">{title}</h3>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed relative z-10">{desc}</p>
                </div>
            </div>
        </div>
    </ScrollAnimation>
);

const ContactInfoCard = ({ icon, title, value, action, link }: { icon: React.ReactNode, title: string, value: string, action: string, link: string }) => (
    <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex items-center gap-4 md:gap-6 p-5 md:p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group cursor-pointer"
    >
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black flex items-center justify-center text-neon-purple border border-white/10 group-hover:scale-110 group-hover:border-neon-purple transition-all shadow-[0_0_15px_rgba(178,0,255,0.1)] shrink-0">
            {React.cloneElement(icon as React.ReactElement<any>, { size: 18 })}
        </div>
        <div className="overflow-hidden">
            <h4 className="text-gray-400 text-xs md:text-sm mb-1">{title}</h4>
            <p className="text-base md:text-xl font-bold text-white mb-1 truncate">{value}</p>
            <span className="text-[10px] md:text-xs text-neon-cyan font-bold uppercase tracking-wider flex items-center gap-1 hover:underline">
                {action} <ChevronRight size={12} />
            </span>
        </div>
    </a>
);

const MultiStepForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '', type: '', details: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleNext = () => setStep(prev => Math.min(prev + 1, 3));
    const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));
    
    const progressWidth = step === 1 ? '33%' : step === 2 ? '66%' : '100%';

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ""); 
        if (value.length > 11) value = value.slice(0, 11);
        if (value.length > 10) value = value.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        else if (value.length > 6) value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
        else if (value.length > 2) value = value.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
        else if (value.length > 0) value = value.replace(/^(\d{0,2})/, "($1");
        setFormData({ ...formData, whatsapp: value });
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        
        const result = await sendProjectRequest(formData);
        
        setLoading(false);
        if (result.success) {
            navigate('/thank-you');
        } else {
            setError('Erro ao enviar. Verifique sua conexão ou tente novamente mais tarde.');
        }
    };

    return (
        <div className="bg-[#0f0f0f] border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 left-0 h-1 bg-gray-800 w-full">
                 <div className="h-full bg-grad-cyan transition-all duration-500 ease-out shadow-[0_0_10px_#00e2ff]" style={{ width: progressWidth }}></div>
             </div>

             <div className="mb-6 flex justify-between items-center">
                 <span className="text-gray-500 text-xs font-mono">PASSO {step} DE 3</span>
                 {step > 1 && (
                     <button onClick={handlePrev} className="text-gray-400 hover:text-white flex items-center gap-1 text-sm">
                         <ChevronLeft size={14} /> Voltar
                     </button>
                 )}
             </div>

             <div className="min-h-[350px]">
                 {step === 1 && (
                     <div className="space-y-5 animate-fade-in-up">
                         <h3 className="text-2xl md:text-3xl font-bold mb-2">Vamos começar!</h3>
                         <p className="text-gray-400 text-sm md:text-base mb-6">Conte-nos quem você é para iniciarmos.</p>
                         
                         <div className="space-y-4">
                            <input 
                                type="text" 
                                placeholder="Seu Nome Completo" 
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-neon-cyan transition-all text-base"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                            <input 
                                type="email" 
                                placeholder="Seu E-mail Corporativo" 
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-neon-cyan transition-all text-base"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                             <input 
                                type="tel" 
                                placeholder="WhatsApp (DD) 9..." 
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-neon-cyan transition-all text-base"
                                value={formData.whatsapp}
                                onChange={handlePhoneChange}
                                maxLength={15}
                            />
                         </div>
                     </div>
                 )}

                {step === 2 && (
                     <div className="space-y-5 animate-fade-in-up">
                         <h3 className="text-2xl md:text-3xl font-bold mb-2">Sobre o Projeto</h3>
                         <p className="text-gray-400 text-sm md:text-base mb-6">O que você deseja construir?</p>
                         
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                             {['Site / Landing Page', 'E-commerce', 'Sistema Web / SaaS', 'Mobile App'].map((type) => (
                                 <button 
                                    key={type}
                                    onClick={() => setFormData({...formData, type})}
                                    className={`p-3 rounded-xl border text-sm font-medium transition-all text-left
                                        ${formData.type === type 
                                            ? 'bg-neon-purple/20 border-neon-purple text-white' 
                                            : 'bg-black/50 border-white/10 text-gray-400 hover:border-white/30'}`}
                                 >
                                     {type}
                                 </button>
                             ))}
                         </div>
                         <textarea 
                            placeholder="Descreva brevemente sua ideia..." 
                            rows={4}
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-neon-cyan transition-all resize-none text-base"
                            value={formData.details}
                            onChange={(e) => setFormData({...formData, details: e.target.value})}
                        />
                     </div>
                 )}

                 {step === 3 && (
                     <div className="space-y-6 animate-fade-in-up text-center pt-8">
                         <div className="w-16 h-16 md:w-20 md:h-20 bg-neon-cyan/10 rounded-full flex items-center justify-center mx-auto mb-6">
                             {loading ? (
                                <div className="w-10 h-10 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin"></div>
                             ) : (
                                <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-neon-cyan" />
                             )}
                         </div>
                         <h3 className="text-2xl md:text-3xl font-bold mb-2">
                             {loading ? 'Enviando...' : 'Tudo Pronto!'}
                         </h3>
                         <p className="text-gray-400 text-sm md:text-base max-w-xs mx-auto">
                            Revisamos seus dados. Clique abaixo para enviar.
                         </p>
                         {error && (
                            <div className="flex items-center justify-center gap-2 text-red-500 text-sm mt-4 bg-red-500/10 p-2 rounded-lg">
                                <AlertCircle size={16} /> {error}
                            </div>
                         )}
                     </div>
                 )}
             </div>

             <div className="mt-6 pt-6 border-t border-white/5 flex justify-end">
                 {step < 3 ? (
                     <button 
                        onClick={handleNext}
                        className="bg-white text-black hover:bg-neon-cyan px-6 py-3 md:px-8 rounded-xl font-bold flex items-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(0,226,255,0.4)] w-full md:w-auto justify-center"
                     >
                         Próximo <ChevronRight size={18} />
                     </button>
                 ) : (
                     <button 
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full bg-grad-purple text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(178,0,255,0.4)] hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                         {loading ? 'Processando...' : 'Enviar Solicitação'} <Rocket size={18} />
                     </button>
                 )}
             </div>
        </div>
    );
}

export default Home;