import React, { useEffect, useState } from 'react';
import { fetchMicrosaas } from '../services/supabaseService';
import { MicroSaas } from '../types';
import ScrollAnimation from '../components/ScrollAnimation';
import { CheckCircle, Rocket } from 'lucide-react';

const Microsaas: React.FC = () => {
    const [products, setProducts] = useState<MicroSaas[]>([]);

    useEffect(() => {
        const load = async () => {
            const data = await fetchMicrosaas();
            setProducts(data);
        };
        load();
    }, []);

    return (
        <div className="pt-32 pb-20 min-h-screen bg-bg-dark">
            <div className="container mx-auto px-5">
                <div className="text-center mb-16">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-neon-cyan/10 rounded-full">
                            <Rocket className="text-neon-cyan w-10 h-10" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Nossos <span className="text-neon-cyan">Microsaas</span></h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">Sistemas prontos para uso, códigos fonte para venda e ferramentas beta.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((item, idx) => (
                        <ScrollAnimation key={item.id} delay={idx * 0.1}>
                            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-8 hover:border-neon-cyan/50 transition-all group relative overflow-hidden">
                                
                                <div className={`absolute top-0 right-0 px-4 py-1 text-xs font-bold uppercase rounded-bl-xl
                                    ${item.status === 'Venda' ? 'bg-neon-purple text-white' : 'bg-neon-cyan text-black'}`}>
                                    {item.status}
                                </div>

                                <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
                                <p className="text-gray-400 mb-6 h-12">{item.description}</p>
                                
                                <div className="space-y-3 mb-8">
                                    {item.features.map((feat, i) => (
                                        <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                                            <CheckCircle size={16} className="text-neon-purple" />
                                            {feat}
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10">
                                    <span className="text-xl font-bold text-white">{item.price ? item.price : 'Grátis / Beta'}</span>
                                    <a href={item.link} className="bg-white/10 hover:bg-neon-cyan hover:text-black text-white px-4 py-2 rounded-lg transition-all font-semibold">
                                        Acessar
                                    </a>
                                </div>
                            </div>
                        </ScrollAnimation>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Microsaas;