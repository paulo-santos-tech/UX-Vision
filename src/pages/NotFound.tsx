import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

const NotFound: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-bg-dark flex flex-col items-center justify-center relative overflow-hidden px-5">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-purple/5 blur-[120px] pointer-events-none rounded-full" />

            <div className="relative z-10 text-center">
                <div className="relative inline-block mb-4">
                    <h1 className="text-[120px] md:text-[180px] font-black leading-none text-transparent bg-clip-text bg-white/5 select-none">
                        404
                    </h1>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-neon-purple animate-pulse">
                        <AlertTriangle size={64} />
                    </div>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Página não encontrada
                </h2>
                
                <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto leading-relaxed">
                    Parece que você se perdeu no ciberespaço. A página que você está procurando foi movida, deletada ou nunca existiu.
                </p>

                <Link 
                    to="/" 
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-grad-purple text-white font-bold hover:shadow-[0_0_30px_rgba(178,0,255,0.4)] transition-all hover:scale-105"
                >
                    <Home size={20} />
                    Voltar para Segurança
                </Link>
            </div>
        </div>
    );
};

export default NotFound;