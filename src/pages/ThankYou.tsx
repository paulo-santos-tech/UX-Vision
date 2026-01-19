import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft, } from 'lucide-react';
import ScrollAnimation from '../components/ScrollAnimation';

const ThankYou: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-bg-dark flex flex-col items-center justify-center relative overflow-hidden px-5">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-cyan/5 blur-[120px] pointer-events-none rounded-full" />
            
            <div className="relative z-10 max-w-lg w-full text-center">
                <ScrollAnimation>
                    <div className="mb-8 relative inline-block">
                        <div className="absolute inset-0 bg-neon-cyan blur-2xl opacity-20 rounded-full animate-pulse-slow"></div>
                        <div className="w-24 h-24 bg-gradient-to-br from-neon-cyan/20 to-transparent border border-neon-cyan/50 rounded-full flex items-center justify-center relative z-10 mx-auto">
                            <CheckCircle className="w-12 h-12 text-neon-cyan" />
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Mensagem <span className="text-transparent bg-clip-text bg-grad-cyan">Enviada!</span>
                    </h1>
                    
                    <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                        Recebemos suas informações com sucesso. <br/>
                        Nossa equipe analisará seu projeto e entrará em contato em breve.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                            to="/" 
                            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-white text-black font-bold hover:bg-neon-cyan transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                        >
                            <ArrowLeft size={18} /> Voltar para Home
                        </Link>
                    </div>
                </ScrollAnimation>
            </div>
        </div>
    );
};

export default ThankYou;