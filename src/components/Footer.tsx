import React, { useState } from 'react';
import { Rocket, Instagram, Linkedin, Github, Mail, MapPin, CheckCircle, Loader2 } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { subscribeNewsletter } from '../services/emailService';

// ✅ IMPORT DO LOGO (VITE)
import logo from '../logo.svg';
import { FaWhatsapp } from 'react-icons/fa';

const FOOTER_NAV_LINKS = [
  { name: 'Quem Somos', href: 'about', type: 'anchor' },
  { name: 'O que fazemos', href: 'services', type: 'anchor' },
  { name: 'Como fazemos', href: 'process', type: 'anchor' },
  { name: 'Portfólio', href: '/portfolio', type: 'route' },
  { name: 'Microsaas', href: '/microsaas', type: 'route' },
  { name: 'Blog', href: 'blog', type: 'anchor' },
];

const Footer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleNavClick = async (e: React.MouseEvent, target: string, type: string) => {
    e.preventDefault();

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
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
      window.scrollTo(0, 0);
    }
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

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    const result = await subscribeNewsletter(email);

    if (result.success) {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000);
    } else {
      setStatus('error');
    }
  };

  return (
    <footer className="relative bg-[#050505] pt-16 md:pt-24 pb-10 md:pb-12 overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent"></div>

      <div className="container mx-auto px-5 md:px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-16 md:mb-20">

          <div className="sm:col-span-2 lg:col-span-1 flex flex-col items-start">
            <Link
              to="/"
              className="block mb-6 md:mb-8 hover:opacity-80 transition-opacity"
              onClick={handleLogoClick}
            >
              <img
                src={logo}
                alt="UX Vision"
                className="h-12 md:h-14 w-auto object-contain"
              />
            </Link>

            <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-sm font-light">
              Transformamos ideias complexas em experiências digitais fluidas e escaláveis.
              O futuro do seu negócio começa com uma linha de código e um pixel perfeito.
            </p>

            <div className="flex gap-4">
              <SocialIcon icon={<Instagram size={20} />} href="https://instagram.com/seu-perfil" />
              <SocialIcon icon={<Linkedin size={20} />} href="https://linkedin.com/in/seu-perfil" />
              <SocialIcon icon={<Github size={20} />} href="https://github.com/seu-perfil" />
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-xl relative inline-block">
              Navegação
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-neon-purple"></span>
            </h4>
            <ul className="space-y-3 text-base text-gray-400">
              {FOOTER_NAV_LINKS.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.type === 'route' ? link.href : `#${link.href}`}
                    onClick={(e) => handleNavClick(e, link.href, link.type)}
                    className="hover:text-neon-cyan transition-colors hover:pl-2 block py-1 cursor-pointer"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-xl relative inline-block">
              Contato
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-neon-purple"></span>
            </h4>
            <ul className="space-y-4 text-base text-gray-400">
              <li className="flex items-start gap-4">
                <div className="p-2 bg-white/5 rounded-lg shrink-0 border border-white/5 mt-1">
                  <MapPin className="w-5 h-5 text-neon-purple" />
                </div>
                <span className="leading-relaxed">Ourinhos - SP<br />Brasil</span>
              </li>

              <li className="flex items-center gap-4">
                <div className="p-2 bg-white/5 rounded-lg shrink-0 border border-white/5">
                  <Mail className="w-5 h-5 text-neon-purple" />
                </div>
                <span className="break-all">contato@uxvision.com.br</span>
              </li>

              <li className="flex items-center gap-4">
                <div className="p-2 bg-white/5 rounded-lg shrink-0 border border-white/5">
                  <FaWhatsapp className="w-5 h-5 text-neon-purple" />
                </div>
                <span>(14) 99820-3321</span>
              </li>
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="text-white font-bold mb-6 text-xl relative inline-block">
              Newsletter
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-neon-purple"></span>
            </h4>
            <p className="text-gray-400 text-base mb-6">
              Receba insights sobre tecnologia e design semanalmente.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="relative max-w-sm">
              <input
                type="email"
                required
                placeholder="Seu melhor e-mail"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-base text-white focus:outline-none focus:border-neon-cyan transition-colors placeholder-white/30 disabled:opacity-50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading' || status === 'success'}
              />

              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className={`absolute right-2 top-2 bottom-2 px-4 rounded-lg transition-all flex items-center justify-center shadow-lg
                  ${status === 'success' ? 'bg-green-500 text-white' : 'bg-neon-purple hover:bg-purple-600 text-white'}
                `}
              >
                {status === 'loading' ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : status === 'success' ? (
                  <CheckCircle size={20} />
                ) : (
                  <Rocket size={20} />
                )}
              </button>
            </form>

            {status === 'success' && (
              <p className="text-green-500 text-xs mt-2 ml-1">Inscrição realizada com sucesso!</p>
            )}
            {status === 'error' && (
              <p className="text-red-500 text-xs mt-2 ml-1">Erro ao inscrever. Tente novamente.</p>
            )}
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500 text-center md:text-left">
          <p>&copy; 2025 UX Vision. Todos os direitos reservados.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/terms" className="hover:text-white transition-colors py-2">Termos de Uso</Link>
            <Link to="/privacy" className="hover:text-white transition-colors py-2">Política de Privacidade</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon, href }: { icon: React.ReactNode, href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-neon-purple hover:scale-110 transition-all duration-300 border border-white/5 hover:border-neon-purple/50 shadow-lg"
  >
    {icon}
  </a>
);

export default Footer;
