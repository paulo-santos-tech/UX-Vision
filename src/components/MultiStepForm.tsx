import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendProjectRequest } from '../services/emailService';
import { ChevronLeft, ChevronRight, CheckCircle, Rocket, AlertCircle } from 'lucide-react';

const MultiStepForm: React.FC = () => {
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
        <div className="bg-[#0f0f0f] border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden h-full">
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
};

export default MultiStepForm;