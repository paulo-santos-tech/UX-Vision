
import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProjectById } from '../services/supabaseService';
import { Project } from '../types';
import ScrollAnimation from '../components/ScrollAnimation';
import MultiStepForm from '../components/MultiStepForm';
import { ArrowLeft, ArrowUpRight, User, Code2, Layers, CheckCircle2, X, ChevronLeft, ChevronRight, Maximize2, Rocket, CheckCircle, ArrowRight } from 'lucide-react';

const ProjectDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    // Estado do Modal de Orçamento
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const load = async () => {
            if (id) {
                const data = await fetchProjectById(id);
                setProject(data || null);
            }
            setLoading(false);
        };
        load();
        window.scrollTo(0, 0);
    }, [id]);

    // Trava o scroll quando modal ou lightbox estão abertos
    useEffect(() => {
        if (isModalOpen || lightboxIndex !== null) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';
        return () => { document.body.style.overflow = 'auto'; };
    }, [isModalOpen, lightboxIndex]);

    const closeLightbox = useCallback(() => setLightboxIndex(null), []);

    const nextImage = useCallback(() => {
        if (!project?.gallery) return;
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % project.gallery!.length : null));
    }, [project]);

    const prevImage = useCallback(() => {
        if (!project?.gallery) return;
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + project.gallery!.length) % project.gallery!.length : null));
    }, [project]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (lightboxIndex === null) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [lightboxIndex, closeLightbox, nextImage, prevImage]);

    // Função para formatar texto puro em parágrafos HTML se necessário
    const formatContent = (content?: string) => {
        if (!content) return '';
        
        // Se já parece HTML (tem tags), retorna como está
        if (/<[a-z][\s\S]*>/i.test(content)) {
            return content;
        }

        // Se for texto puro, quebra nas novas linhas duplas e cria parágrafos
        return content
            .split(/\n\s*\n/) // Divide por quebras de linha duplas
            .filter(Boolean)
            .map(p => `<p>${p.trim().replace(/\n/g, '<br/>')}</p>`) // Mantém quebras simples como <br>
            .join('');
    };

    if (loading) return (
        <div className="min-h-screen bg-bg-dark flex flex-col items-center justify-center text-white gap-4">
            <div className="w-10 h-10 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
    
    if (!project) return <div className="min-h-screen bg-bg-dark flex items-center justify-center text-white">Projeto não encontrado.</div>;

    return (
        <div className="bg-bg-dark min-h-screen relative overflow-hidden">
            
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-neon-purple/10 blur-[150px] pointer-events-none rounded-full" />
            <div className="absolute top-[40%] left-[-200px] w-[500px] h-[500px] bg-neon-cyan/5 blur-[120px] pointer-events-none rounded-full" />

            <div className="container mx-auto px-5 md:px-6 pt-32 pb-20 relative z-10">
                
                <Link to="/portfolio" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 md:mb-12 transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-neon-cyan/50 transition-all">
                        <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                    </div>
                    <span className="text-sm font-medium">Voltar ao Portfólio</span>
                </Link>

                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 lg:mb-24">
                    <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8">
                        <ScrollAnimation>
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="px-3 py-1 rounded border border-neon-cyan/30 text-neon-cyan text-[10px] font-bold uppercase tracking-[0.2em] bg-neon-cyan/5">
                                        {project.category || 'Projeto'}
                                    </span>
                                    {project.year && <span className="text-gray-500 text-xs font-mono">//{project.year}</span>}
                                </div>
                                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">{project.title}</h1>
                                <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed border-l-2 border-white/10 pl-4 md:pl-6">{project.description}</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                                    <div className="flex items-center gap-2 text-gray-500 text-xs uppercase font-bold mb-1"><User size={14} /> Cliente</div>
                                    <div className="text-white font-medium truncate">{project.client || 'Confidencial'}</div>
                                </div>
                                <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                                    <div className="flex items-center gap-2 text-gray-500 text-xs uppercase font-bold mb-1"><Layers size={14} /> Serviço</div>
                                    <div className="text-white font-medium">{project.category || 'Desenvolvimento'}</div>
                                </div>
                            </div>

                            {project.link && (
                                <div className="mt-4">
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-neon-cyan transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(0,226,255,0.4)] group">
                                        Acessar Projeto Online
                                        <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </a>
                                </div>
                            )}
                        </ScrollAnimation>
                    </div>

                    <div className="lg:col-span-7 relative mt-8 lg:mt-0">
                        <ScrollAnimation delay={0.2}>
                            <div className="absolute -inset-1 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-3xl opacity-20 blur-lg"></div>
                            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#111] shadow-2xl group">
                                <div className="h-8 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                                </div>
                                <div className="relative overflow-hidden aspect-video cursor-pointer">
                                    <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </ScrollAnimation>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 space-y-12 md:space-y-16">
                        <ScrollAnimation>
                            <div className="prose prose-invert prose-lg max-w-none">
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-8 flex items-center gap-3"><span className="w-8 h-1 bg-neon-purple rounded-full"></span> Visão Geral</h3>
                                
                                {/* 
                                    AQUI ESTÁ A CORREÇÃO PRINCIPAL:
                                    1. Usamos formatContent para converter texto puro em HTML com parágrafos.
                                    2. Aumentamos o espaçamento (mb-10) e a altura da linha (leading-loose).
                                */}
                                <div 
                                    className="
                                        text-gray-300 font-light text-base md:text-lg leading-loose
                                        prose-p:mb-10 md:prose-p:mb-12
                                        prose-headings:text-white prose-headings:font-bold prose-headings:mb-6 prose-headings:mt-12
                                        prose-strong:text-white prose-strong:font-semibold
                                        prose-ul:list-disc prose-ul:pl-5 prose-ul:mb-10 prose-li:mb-2
                                        prose-a:text-neon-cyan prose-a:no-underline hover:prose-a:underline
                                    "
                                    dangerouslySetInnerHTML={{ 
                                        __html: formatContent(project.fullDescription || project.description) 
                                    }} 
                                />
                            </div>
                        </ScrollAnimation>
                        
                        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                            {project.challenge && (
                                <ScrollAnimation delay={0.1}>
                                    <div className="bg-white/[0.02] border border-white/5 p-6 md:p-8 rounded-2xl h-full hover:border-red-500/30 transition-colors">
                                        <h3 className="text-lg md:text-xl font-bold text-white mb-4 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500"></span> O Desafio</h3>
                                        <div 
                                            className="text-gray-400 leading-relaxed text-sm whitespace-pre-wrap"
                                            dangerouslySetInnerHTML={{ __html: formatContent(project.challenge) }}
                                        />
                                    </div>
                                </ScrollAnimation>
                            )}
                             {project.solution && (
                                <ScrollAnimation delay={0.2}>
                                    <div className="bg-white/[0.02] border border-white/5 p-6 md:p-8 rounded-2xl h-full hover:border-green-500/30 transition-colors">
                                        <h3 className="text-lg md:text-xl font-bold text-white mb-4 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500"></span> A Solução</h3>
                                        <div 
                                            className="text-gray-400 leading-relaxed text-sm whitespace-pre-wrap"
                                            dangerouslySetInnerHTML={{ __html: formatContent(project.solution) }}
                                        />
                                    </div>
                                </ScrollAnimation>
                            )}
                        </div>
                    </div>

                    {/* SIDEBAR - TECH STACK E CTA */}
                    <div className="lg:col-span-4">
                        <ScrollAnimation delay={0.3}>
                            <div className="lg:sticky lg:top-32 space-y-8">
                                
                                {/* 1. Tech Stack Card */}
                                <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8">
                                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Code2 className="text-neon-cyan" size={20} /> Tech Stack</h3>
                                    <div className="space-y-3">
                                        {project.technologies.map((tech, i) => (
                                            <div key={i} className="group flex items-center justify-between p-3 rounded-xl bg-black/20 border border-white/5 hover:border-neon-purple/50 transition-all">
                                                <span className="text-gray-300 font-medium text-sm">{tech}</span>
                                                <CheckCircle2 size={16} className="text-gray-600 group-hover:text-neon-purple transition-colors" />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 2. CTA Banner (Anúncio) */}
                                <div className="bg-gradient-to-br from-[#1a1a1a] to-black border border-white/10 rounded-2xl p-6 relative overflow-hidden group shadow-2xl">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-neon-purple/20 rounded-full blur-[50px] group-hover:bg-neon-purple/30 transition-all"></div>
                                    
                                    <Rocket className="w-8 h-8 text-neon-cyan mb-4" />
                                    <h3 className="text-xl font-bold text-white mb-2">Gostou deste projeto?</h3>
                                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                                        Podemos criar algo exclusivo e escalável para o seu negócio.
                                    </p>
                                    <button 
                                        onClick={() => setIsModalOpen(true)}
                                        className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-neon-cyan transition-colors shadow-lg shadow-neon-cyan/10 flex items-center justify-center gap-2"
                                    >
                                        Solicitar Orçamento <ArrowRight size={16}/>
                                    </button>
                                </div>
                            </div>
                        </ScrollAnimation>
                    </div>
                </div>

                {project.gallery && project.gallery.length > 0 && (
                    <div className="mt-20 md:mt-32 border-t border-white/5 pt-12 md:pt-16">
                        <ScrollAnimation>
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center gap-4">
                                <span className="text-neon-cyan opacity-50">02.</span> Galeria
                            </h2>
                        </ScrollAnimation>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {project.gallery.map((img, idx) => (
                                <ScrollAnimation key={idx} delay={idx * 0.05}>
                                    <div 
                                        className="group relative rounded-xl overflow-hidden border border-white/10 bg-black/50 aspect-[4/3] cursor-pointer"
                                        onClick={() => setLightboxIndex(idx)}
                                    >
                                        <img 
                                            src={img} 
                                            alt={`Interface ${idx + 1}`} 
                                            className="w-full h-full object-cover opacity-90 md:opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" 
                                        />
                                        
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <div className="bg-neon-cyan/20 p-3 rounded-full border border-neon-cyan/50 text-neon-cyan transform scale-50 group-hover:scale-100 transition-transform duration-300">
                                                <Maximize2 size={24} />
                                            </div>
                                        </div>
                                    </div>
                                </ScrollAnimation>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* LIGHTBOX DE IMAGENS */}
            {lightboxIndex !== null && project.gallery && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl animate-fade-in p-4">
                    
                    <button 
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-red-500/20 rounded-full text-white hover:text-red-500 transition-all border border-white/10"
                    >
                        <X size={24} />
                    </button>

                    <div className="relative w-full h-full flex items-center justify-center">
                        <img 
                            src={project.gallery[lightboxIndex]} 
                            alt="Zoom" 
                            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl animate-scale-up"
                        />
                        
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 px-4 py-2 rounded-full text-white text-xs font-mono border border-white/10 backdrop-blur-md">
                            {lightboxIndex + 1} / {project.gallery.length}
                        </div>
                        
                        <div className="absolute inset-x-0 bottom-0 top-auto h-20 md:hidden flex justify-between items-center px-4 w-full">
                             <button 
                                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                className="p-4 bg-black/50 rounded-full text-white border border-white/10"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button 
                                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                className="p-4 bg-black/50 rounded-full text-white border border-white/10"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </div>

                    <button 
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        className="absolute left-4 z-50 p-3 bg-black/50 hover:bg-neon-cyan/20 rounded-full text-white hover:text-neon-cyan transition-all border border-white/10 hover:border-neon-cyan/50 backdrop-blur-md hidden md:block"
                    >
                        <ChevronLeft size={32} />
                    </button>

                    <button 
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="absolute right-4 z-50 p-3 bg-black/50 hover:bg-neon-cyan/20 rounded-full text-white hover:text-neon-cyan transition-all border border-white/10 hover:border-neon-cyan/50 backdrop-blur-md hidden md:block"
                    >
                        <ChevronRight size={32} />
                    </button>
                </div>
            )}

            {/* MODAL DE ORÇAMENTO (Igual ao do Blog) */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-5 animate-fade-in">
                    <div className="relative w-full max-w-4xl bg-bg-dark rounded-3xl shadow-2xl overflow-hidden border border-white/10 animate-scale-up">
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-red-500/20 text-white hover:text-red-500 rounded-full transition-colors border border-white/10"
                        >
                            <X size={24} />
                        </button>
                        
                        <div className="grid lg:grid-cols-2">
                             <div className="hidden lg:flex flex-col justify-center p-12 bg-white/[0.02] relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-neon-purple/10 to-transparent"></div>
                                <div className="relative z-10">
                                    <h2 className="text-4xl font-bold mb-6">Vamos escalar seu negócio?</h2>
                                    <p className="text-gray-400 mb-8 leading-relaxed">
                                        Nossa equipe está pronta para entender seus desafios e propor uma solução digital sob medida.
                                    </p>
                                    <ul className="space-y-4">
                                        <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle size={16} className="text-neon-cyan" /> Análise de Requisitos</li>
                                        <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle size={16} className="text-neon-cyan" /> Proposta Técnica Detalhada</li>
                                        <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle size={16} className="text-neon-cyan" /> Cronograma de Execução</li>
                                    </ul>
                                </div>
                             </div>
                             
                             <div className="p-1">
                                <MultiStepForm embedded={true} />
                             </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectDetails;
