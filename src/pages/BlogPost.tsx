import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPostBySlug, fetchRelatedPosts } from '../services/supabaseService';
import { subscribeNewsletter } from '../services/emailService';
import { BlogPost as BlogPostType } from '../types';
import { ArrowLeft, Calendar, Clock, User, Linkedin, Facebook, Link as LinkIcon, Share2, Rocket, ArrowRight, Loader2, CheckCircle, X } from 'lucide-react';
import ScrollAnimation from '../components/ScrollAnimation';
import MultiStepForm from '../components/MultiStepForm';

const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<BlogPostType | null>(null);
    const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
    const [loading, setLoading] = useState(true);

    // Estado do Modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Estado da Newsletter Sidebar
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [copySuccess, setCopySuccess] = useState(false);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            if (slug) {
                const data = await fetchPostBySlug(slug);
                if (data) {
                    setPost(data);
                    const related = await fetchRelatedPosts(slug, data.category);
                    setRelatedPosts(related);
                } else {
                    setPost(null);
                }
            }
            setLoading(false);
        };
        load();
        window.scrollTo(0, 0);
    }, [slug]);

    useEffect(() => {
        if (isModalOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';
        return () => { document.body.style.overflow = 'auto'; };
    }, [isModalOpen]);

    const handleShare = (platform: string) => {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(post?.title || '');
        let shareUrl = '';

        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
                break;
            case 'whatsapp':
                 shareUrl = `https://api.whatsapp.com/send?text=${title}%20${url}`;
                 break;
            case 'copy':
                navigator.clipboard.writeText(window.location.href);
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 2000);
                return;
        }

        if (shareUrl) window.open(shareUrl, '_blank');
    };

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newsletterEmail) return;

        setNewsletterStatus('loading');
        const result = await subscribeNewsletter(newsletterEmail);

        if (result.success) {
            setNewsletterStatus('success');
            setNewsletterEmail('');
            setTimeout(() => setNewsletterStatus('idle'), 5000);
        } else {
            setNewsletterStatus('error');
        }
    };

    if (loading) return <div className="min-h-screen bg-bg-dark flex items-center justify-center text-white">Carregando...</div>;
    if (!post) return <div className="min-h-screen bg-bg-dark flex items-center justify-center text-white">Artigo não encontrado.</div>;

    return (
        <div className="bg-bg-dark min-h-screen pt-40 pb-24">
            
            <div className="container mx-auto px-5 max-w-7xl">
                {/* Back Button */}
                <Link to="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition-colors group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Voltar ao Blog
                </Link>

                {/* 
                   CORREÇÃO DO STICKY: 
                   Removemos 'items-start'. Agora as colunas têm a mesma altura (stretch).
                   Isso permite que a div interna (sticky) flutue dentro da coluna da direita.
                */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 relative">
                    
                    {/* --- MAIN CONTENT (LEFT COL) --- */}
                    <div className="lg:col-span-2">
                        <ScrollAnimation>
                            <article>
                                {/* Post Header */}
                                <header className="mb-12">
                                    <div className="flex items-center gap-4 mb-6">
                                        <span className="px-4 py-1 rounded-full bg-neon-purple/10 border border-neon-purple/30 text-neon-purple text-xs font-bold uppercase tracking-widest">
                                            {post.category}
                                        </span>
                                        <span className="text-gray-500 text-sm flex items-center gap-1">
                                            <Clock size={14} /> {post.readTime} de leitura
                                        </span>
                                    </div>
                                    
                                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-[1.1]">
                                        {post.title}
                                    </h1>
                                    
                                    <div className="flex items-center gap-4 text-gray-400 text-sm border-b border-white/10 pb-8">
                                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/5">
                                            <User size={24} className="text-white" />
                                        </div>
                                        <div>
                                            <p className="text-white font-medium text-base">{post.author || 'UX Vision Team'}</p>
                                            <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                                                <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                </header>

                                {/* Featured Image */}
                                <div className="w-full h-[350px] md:h-[500px] rounded-3xl overflow-hidden mb-16 border border-white/10 shadow-2xl relative group">
                                    <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 to-transparent opacity-60"></div>
                                    <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                </div>

                                {/* Content Body */}
                                <div className="
                                    prose prose-lg md:prose-xl prose-invert max-w-none
                                    text-gray-300
                                    
                                    /* --- TIPOGRAFIA GERAL --- */
                                    /* leading-[1.8] diminui um pouco a altura em relação ao leading-loose (2.0) */
                                    leading-relaxed md:leading-[1.8]
                                    
                                    /* --- PARÁGRAFOS (ESPAÇAMENTO AUMENTADO) --- */
                                    /* 'mb-16' aumenta o espaço entre os parágrafos para separar bem os blocos */
                                    prose-p:font-light 
                                    prose-p:text-lg md:prose-p:text-xl 
                                    prose-p:mb-16
                                    prose-p:mt-0
                                    
                                    /* --- TÍTULOS --- */
                                    prose-headings:text-white 
                                    prose-headings:font-bold 
                                    prose-headings:scroll-mt-32
                                    
                                    prose-h2:text-3xl md:prose-h2:text-4xl 
                                    prose-h2:mt-24 
                                    prose-h2:mb-10 
                                    prose-h2:text-neon-cyan 
                                    prose-h2:leading-tight

                                    prose-h3:text-2xl md:prose-h3:text-3xl 
                                    prose-h3:mt-20 
                                    prose-h3:mb-8 
                                    prose-h3:text-white 
                                    prose-h3:leading-tight

                                    prose-h4:text-xl md:prose-h4:text-2xl 
                                    prose-h4:mt-16 
                                    prose-h4:mb-6 
                                    prose-h4:text-neon-purple 
                                    prose-h4:uppercase 
                                    prose-h4:tracking-widest
                                    
                                    /* --- CITAÇÕES --- */
                                    prose-blockquote:border-l-4 prose-blockquote:border-neon-purple 
                                    prose-blockquote:bg-white/[0.03] prose-blockquote:py-8 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl 
                                    prose-blockquote:text-xl prose-blockquote:italic prose-blockquote:text-gray-200 
                                    prose-blockquote:my-16 prose-blockquote:shadow-lg
                                    
                                    /* --- IMAGENS E LINKS --- */
                                    prose-img:rounded-3xl prose-img:border prose-img:border-white/10 prose-img:my-16 prose-img:shadow-2xl prose-img:w-full
                                    prose-a:text-neon-cyan prose-a:no-underline hover:prose-a:underline hover:prose-a:text-white transition-colors
                                    
                                    /* --- LISTAS --- */
                                    prose-ul:my-10 prose-li:mb-4
                                    prose-ol:my-10
                                ">
                                    <div dangerouslySetInnerHTML={{ __html: post.content || post.excerpt }} />
                                </div>
                                
                                {/* Share Section */}
                                <div className="mt-24 pt-12 border-t border-white/10">
                                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                                        <Share2 className="text-neon-purple" size={24} />
                                        Gostou? Compartilhe este artigo
                                    </h3>
                                    <div className="flex flex-wrap gap-4">
                                        <button onClick={() => handleShare('linkedin')} className="flex items-center gap-3 px-6 py-4 bg-[#0077b5]/10 text-[#0077b5] border border-[#0077b5]/30 rounded-2xl hover:bg-[#0077b5] hover:text-white transition-all font-bold text-sm">
                                            <Linkedin size={20} /> LinkedIn
                                        </button>
                                        <button onClick={() => handleShare('facebook')} className="flex items-center gap-3 px-6 py-4 bg-[#1877F2]/10 text-[#1877F2] border border-[#1877F2]/30 rounded-2xl hover:bg-[#1877F2] hover:text-white transition-all font-bold text-sm">
                                            <Facebook size={20} /> Facebook
                                        </button>
                                        <button onClick={() => handleShare('whatsapp')} className="flex items-center gap-3 px-6 py-4 bg-[#25d366]/10 text-[#25d366] border border-[#25d366]/30 rounded-2xl hover:bg-[#25d366] hover:text-white transition-all font-bold text-sm">
                                            WhatsApp
                                        </button>
                                        <button onClick={() => handleShare('copy')} className="flex items-center gap-3 px-6 py-4 bg-white/5 text-gray-400 border border-white/10 rounded-2xl hover:bg-white/20 hover:text-white transition-all font-bold text-sm ml-auto">
                                            {copySuccess ? <CheckCircle size={20} className="text-green-500"/> : <LinkIcon size={20} />}
                                            {copySuccess ? 'Copiado!' : 'Copiar Link'}
                                        </button>
                                    </div>
                                </div>
                            </article>
                        </ScrollAnimation>
                    </div>

                    {/* --- SIDEBAR (RIGHT COL) --- */}
                    {/* A coluna se estica para acompanhar a altura do Main Content */}
                    <div className="lg:col-span-1 h-full">
                        {/* 
                            STICKY CONTAINER
                            - 'sticky': ativa o comportamento
                            - 'top-32': define a distância do topo
                            - Este elemento vai deslizar dentro da coluna 'lg:col-span-1'
                        */}
                        <div className="space-y-12 lg:sticky lg:top-32">
                            
                            {/* 1. Ad Banner */}
                            <ScrollAnimation delay={0.1}>
                                <div className="bg-gradient-to-br from-[#1a1a1a] to-black border border-white/10 rounded-3xl p-8 relative overflow-hidden group shadow-2xl">
                                    <div className="absolute top-0 right-0 w-40 h-40 bg-neon-purple/20 rounded-full blur-[60px] group-hover:bg-neon-purple/30 transition-all"></div>
                                    
                                    <Rocket className="w-12 h-12 text-neon-cyan mb-6" />
                                    <h3 className="text-2xl font-bold text-white mb-3">Quer um site ou sistema como este?</h3>
                                    <p className="text-gray-400 text-base mb-8 leading-relaxed">
                                        Transforme sua ideia em realidade digital. Desenvolvimento high-end focado em performance e conversão.
                                    </p>
                                    <button 
                                        onClick={() => setIsModalOpen(true)}
                                        className="block w-full text-center py-4 bg-white text-black font-bold rounded-xl hover:bg-neon-cyan transition-colors shadow-lg shadow-neon-cyan/10"
                                    >
                                        Solicitar Orçamento
                                    </button>
                                </div>
                            </ScrollAnimation>

                            {/* 2. Related Posts */}
                            <ScrollAnimation delay={0.2}>
                                <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8">
                                    <h3 className="text-xl font-bold text-white mb-8 border-l-4 border-neon-purple pl-4">
                                        Relacionados
                                    </h3>
                                    <div className="space-y-8">
                                        {relatedPosts.map(rel => (
                                            <Link to={`/blog/${rel.slug}`} key={rel.id} className="group flex gap-5 items-start">
                                                <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 border border-white/10">
                                                    <img src={rel.image_url} alt={rel.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                </div>
                                                <div>
                                                    <span className="text-[10px] font-bold text-neon-cyan uppercase tracking-wider mb-1 block">{rel.category}</span>
                                                    <h4 className="text-base font-bold text-gray-200 group-hover:text-white transition-colors line-clamp-2 mb-2 leading-snug">
                                                        {rel.title}
                                                    </h4>
                                                    <span className="text-xs text-gray-500">{rel.date}</span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </ScrollAnimation>

                            {/* 3. Newsletter Mini */}
                            <ScrollAnimation delay={0.3}>
                                <div className="bg-grad-purple p-8 rounded-3xl text-center relative overflow-hidden shadow-neon-purple/20 shadow-xl">
                                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                                    <div className="relative z-10">
                                        <h3 className="text-2xl font-bold text-white mb-2">Newsletter VIP</h3>
                                        <p className="text-white/80 text-sm mb-6">Receba dicas exclusivas semanalmente.</p>
                                        
                                        <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                                            <input 
                                                type="email" 
                                                required
                                                placeholder="Email" 
                                                className="w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:bg-black/30 transition-all"
                                                value={newsletterEmail}
                                                onChange={(e) => setNewsletterEmail(e.target.value)}
                                                disabled={newsletterStatus === 'loading' || newsletterStatus === 'success'}
                                            />
                                            <button 
                                                type="submit"
                                                disabled={newsletterStatus === 'loading' || newsletterStatus === 'success'}
                                                className="bg-white text-purple-700 p-3 rounded-xl hover:bg-gray-100 hover:scale-105 transition-all flex items-center justify-center min-w-[48px]"
                                            >
                                                {newsletterStatus === 'loading' ? (
                                                    <Loader2 className="animate-spin" size={20} />
                                                ) : newsletterStatus === 'success' ? (
                                                    <CheckCircle size={20} />
                                                ) : (
                                                    <ArrowRight size={20} />
                                                )}
                                            </button>
                                        </form>
                                        {newsletterStatus === 'success' && (
                                            <p className="text-white text-xs mt-2 font-bold bg-black/20 rounded px-2 py-1 inline-block">Cadastrado!</p>
                                        )}
                                    </div>
                                </div>
                            </ScrollAnimation>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL DE ORÇAMENTO */}
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

export default BlogPost;