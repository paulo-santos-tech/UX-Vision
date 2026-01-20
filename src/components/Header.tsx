import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronRight, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../logo.svg'; // Importação correta do logo na pasta src

// ==================================================================================
// CONFIGURAÇÃO DOS LINKS
// ==================================================================================
const NAV_LINKS = [
    { name: 'Quem Somos', href: 'about', type: 'anchor' },   
    { name: 'O que fazemos', href: 'services', type: 'anchor' }, 
    { name: 'Como fazemos', href: 'process', type: 'anchor' },   
    { name: 'Portfólio', href: '/portfolio', type: 'route' },    
    { name: 'Microsaas', href: '/microsaas', type: 'route' },    
    { name: 'Blog', href: 'blog', type: 'anchor' },              
];

// 🔴 COLOQUE O LINK DO SEU CMS AQUI
const EXTERNAL_CMS_URL = "https://seu-cms-externo.com/login"; 

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [isOpen]);

    // Função específica para o clique no Logo
    const handleLogoClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsOpen(false);
        
        if (location.pathname === '/') {
            // Se já está na home, sobe suavemente
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Se está em outra página, vai para home e reseta o scroll
            navigate('/');
            window.scrollTo(0, 0);
        }
    };

    const handleNavClick = async (e: React.MouseEvent, target: string, type: string) => {
        e.preventDefault();
        setIsOpen(false);

        setTimeout(() => {
            if (type === 'route') {
                navigate(target);
                window.scrollTo(0, 0);
            } else {
                if (location.pathname === '/') {
                    scrollToId(target);
                } else {
                    navigate('/');
                    setTimeout(() => scrollToId(target), 300); 
                }
            }
        }, 150);
    };

    const scrollToId = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
    };

    const headerBgClass = isOpen 
        ? 'bg-black border-b border-white/10' 
        : scrolled 
            ? 'bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-white/10 shadow-[0_4px_30px_rgba(178,0,255,0.1)]' 
            : 'bg-[#0a0a0a]/40 backdrop-blur-md border-b border-white/5'; 

    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 h-[90px] md:h-[100px] flex items-center ${headerBgClass}`}>
            <div className="max-w-[1400px] w-full mx-auto px-6 flex justify-between items-center relative z-50">
                
                {/* LOGO COM COMPORTAMENTO DE SCROLL TO TOP */}
                <Link 
                    to="/" 
                    className="flex items-center gap-3 group relative z-50 hover:opacity-80 transition-opacity" 
                    onClick={handleLogoClick}
                >
                    {/* Usando a variável importada 'logo' */}
                    <img 
                        src={logo} 
                        alt="UX Vision Logo" 
                        className="h-10 md:h-12 w-auto object-contain" 
                    />
                </Link>

                <nav className="hidden lg:flex items-center gap-8">
                    {NAV_LINKS.map((link, idx) => (
                        <a 
                            key={idx}
                            href={link.type === 'route' ? link.href : `#${link.href}`}
                            onClick={(e) => handleNavClick(e, link.href, link.type)}
                            className="cursor-pointer text-gray-200 hover:text-white font-medium text-sm tracking-wide transition-colors relative group shadow-black drop-shadow-md"
                        >
                            {link.name}
                            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-grad-cyan transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    ))}
                    
                    <Link 
                        to="/ux-vision-cms" 
                        className="ml-4 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all border border-transparent hover:border-white/10"
                        title="Acesso CMS"
                    >
                        <User size={20} />
                    </Link>

                    <a href="#contact" onClick={(e) => handleNavClick(e, 'contact', 'anchor')} className="bg-white/10 hover:bg-neon-purple/20 border border-white/20 hover:border-neon-purple text-white px-6 py-2.5 rounded-full font-semibold text-xs uppercase tracking-widest transition-all shadow-lg hover:shadow-neon-purple/20">
                        Orçamento
                    </a>
                </nav>

                <button 
                    className="lg:hidden text-white focus:outline-none p-2 relative z-50 bg-white/10 rounded-lg border border-white/10 active:scale-95 transition-transform"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} className="text-red-500" /> : <Menu size={24} />}
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-0 top-[90px] md:top-[100px] w-full h-[calc(100vh-90px)] bg-black/95 backdrop-blur-xl z-40 flex flex-col overflow-y-auto"
                    >
                        <div className="flex flex-col p-8 gap-2">
                            {NAV_LINKS.map((link, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <a 
                                        href={link.type === 'route' ? link.href : `#${link.href}`}
                                        onClick={(e) => handleNavClick(e, link.href, link.type)}
                                        className="flex items-center justify-between p-4 border-b border-white/5 text-2xl font-bold text-gray-300 hover:text-white hover:pl-6 transition-all duration-300 group"
                                    >
                                        {link.name}
                                        <ChevronRight className="opacity-0 group-hover:opacity-100 text-neon-cyan transition-opacity" />
                                    </a>
                                </motion.div>
                            ))}
                            
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <Link 
                                    to="/ux-vision-cms"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center justify-between p-4 border-b border-white/5 text-xl font-bold text-gray-400 hover:text-white transition-all duration-300 group"
                                >
                                    Acesso CMS
                                    <User size={20} />
                                </Link>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="mt-8"
                            >
                                <a 
                                    href="#contact" 
                                    onClick={(e) => handleNavClick(e, 'contact', 'anchor')}
                                    className="block w-full text-center bg-grad-purple text-white py-5 rounded-2xl font-bold text-lg shadow-[0_0_30px_rgba(178,0,255,0.3)] hover:scale-[1.02] transition-transform"
                                >
                                    Fazer Orçamento
                                </a>
                                
                                <div className="mt-8 text-center text-gray-500 text-sm">
                                    <p>contato@uxvision.com.br</p>
                                    <p className="mt-2 text-xs opacity-50">São Paulo, Brasil</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;