import React, { useEffect } from 'react';
import ScrollAnimation from '../components/ScrollAnimation';
import { ArrowLeft, FileText, ShieldAlert, Scale, CheckCircle, Briefcase, Shield, Copyright, Link as LinkIcon, Lock, RefreshCw, } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfUse: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-bg-dark min-h-screen pt-32 pb-20 relative overflow-hidden">
             {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-purple/5 blur-[120px] pointer-events-none rounded-full" />
            
            <div className="container mx-auto px-5 max-w-4xl relative z-10">
                <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Voltar para Home
                </Link>

                <ScrollAnimation>
                    <div className="text-center mb-16">
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 text-neon-purple">
                                <FileText size={32} />
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Termos de Uso</h1>
                        <p className="text-gray-400">Última atualização: Janeiro de 2026</p>
                    </div>
                </ScrollAnimation>

                <div className="space-y-8 text-gray-300 leading-relaxed font-light text-lg">
                    
                    {/* Intro */}
                    <ScrollAnimation>
                        <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl mb-8">
                            <p className="mb-4 font-medium text-white">Bem-vindo ao site da UX Vision.</p>
                            <p>
                                Ao acessar ou utilizar este site, você concorda integralmente com os presentes Termos de Uso. 
                                Caso não concorde com qualquer condição aqui descrita, recomendamos que não utilize nossos serviços ou conteúdos.
                            </p>
                        </div>
                    </ScrollAnimation>

                    {/* 1. Aceitação */}
                    <ScrollAnimation delay={0.1}>
                        <section className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="text-neon-cyan">1.</span> Aceitação dos Termos
                                <CheckCircle className="text-neon-purple ml-auto opacity-50" size={20} />
                            </h2>
                            <p className="mb-4">
                                Ao acessar o site da UX Vision, você declara que leu, compreendeu e concorda com estes Termos de Uso, bem como com a nossa Política de Privacidade.
                            </p>
                            <p>
                                O uso contínuo do site após alterações nos termos será considerado como aceitação automática das novas condições.
                            </p>
                        </section>
                    </ScrollAnimation>

                    {/* 2. Sobre */}
                    <ScrollAnimation delay={0.15}>
                        <section className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="text-neon-cyan">2.</span> Sobre a UX Vision
                                <Briefcase className="text-neon-purple ml-auto opacity-50" size={20} />
                            </h2>
                            <p className="mb-4">
                                A UX Vision é um estúdio digital especializado na criação de experiências digitais, design de interfaces (UI/UX), desenvolvimento web, soluções SaaS, microsaas, consultoria digital e produtos relacionados.
                            </p>
                            <p>
                                Os serviços podem ser contratados mediante orçamento, proposta formal ou assinatura de contrato específico.
                            </p>
                        </section>
                    </ScrollAnimation>

                    {/* 3. Uso do Site */}
                    <ScrollAnimation delay={0.2}>
                        <section className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="text-neon-cyan">3.</span> Uso do Site
                                <Shield className="text-neon-purple ml-auto opacity-50" size={20} />
                            </h2>
                            <p className="mb-4">
                                Você se compromete a utilizar este site apenas para fins lícitos, respeitando a legislação vigente e estes Termos.
                            </p>
                            <p className="mb-2 font-bold text-white">É proibido:</p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-400">
                                <li>Utilizar o site para atividades ilegais ou fraudulentas.</li>
                                <li>Tentar acessar áreas restritas sem autorização.</li>
                                <li>Copiar, reproduzir ou distribuir conteúdos sem permissão.</li>
                                <li>Interferir no funcionamento do site ou de seus sistemas.</li>
                            </ul>
                        </section>
                    </ScrollAnimation>

                    {/* 4. Propriedade Intelectual */}
                    <ScrollAnimation delay={0.25}>
                        <section className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="text-neon-cyan">4.</span> Propriedade Intelectual
                                <Copyright className="text-neon-purple ml-auto opacity-50" size={20} />
                            </h2>
                            <p className="mb-4">
                                Todo o conteúdo presente neste site — incluindo textos, imagens, layouts, marcas, logotipos, ícones, códigos, animações e materiais gráficos — é de propriedade exclusiva da UX Vision, salvo quando indicado o contrário.
                            </p>
                            <p>
                                Nenhum conteúdo pode ser copiado, reproduzido, modificado ou redistribuído sem autorização expressa e por escrito.
                            </p>
                        </section>
                    </ScrollAnimation>

                    {/* 5. Serviços e Orçamentos */}
                    <ScrollAnimation delay={0.3}>
                        <section className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="text-neon-cyan">5.</span> Serviços e Orçamentos
                                <FileText className="text-neon-purple ml-auto opacity-50" size={20} />
                            </h2>
                            <p className="mb-4">
                                As informações apresentadas no site têm caráter informativo. Valores, prazos, escopos e condições comerciais só são válidos quando formalizados em proposta ou contrato.
                            </p>
                            <p>
                                A UX Vision reserva-se o direito de recusar projetos que entenda não estarem alinhados com seus princípios técnicos, éticos ou estratégicos.
                            </p>
                        </section>
                    </ScrollAnimation>

                    {/* 6. Limitação de Responsabilidade */}
                    <ScrollAnimation delay={0.35}>
                        <section className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="text-neon-cyan">6.</span> Limitação de Responsabilidade
                                <ShieldAlert className="text-neon-purple ml-auto opacity-50" size={20} />
                            </h2>
                            <p className="mb-4">
                                A UX Vision não garante que o site estará disponível de forma ininterrupta ou livre de erros.
                            </p>
                            <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                                <p className="mb-2 font-bold text-white">Não nos responsabilizamos por:</p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-400">
                                    <li>Danos decorrentes do uso ou da impossibilidade de uso do site.</li>
                                    <li>Perdas de dados, lucros cessantes ou falhas de terceiros.</li>
                                    <li>Conteúdos externos acessados por links disponibilizados no site.</li>
                                </ul>
                            </div>
                        </section>
                    </ScrollAnimation>

                    {/* 7. Links para Terceiros */}
                    <ScrollAnimation delay={0.4}>
                        <section className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="text-neon-cyan">7.</span> Links para Terceiros
                                <LinkIcon className="text-neon-purple ml-auto opacity-50" size={20} />
                            </h2>
                            <p>
                                Este site pode conter links para sites de terceiros. A UX Vision não se responsabiliza pelo conteúdo, políticas ou práticas desses sites externos.
                            </p>
                        </section>
                    </ScrollAnimation>

                    {/* 8. Privacidade e Dados */}
                    <ScrollAnimation delay={0.45}>
                        <section className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="text-neon-cyan">8.</span> Privacidade e Dados
                                <Lock className="text-neon-purple ml-auto opacity-50" size={20} />
                            </h2>
                            <p>
                                O tratamento de dados pessoais segue as diretrizes da Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018).
                            </p>
                            <p className="mt-2">
                                Para mais informações, consulte nossa <Link to="/privacy" className="text-neon-cyan hover:underline">Política de Privacidade</Link>.
                            </p>
                        </section>
                    </ScrollAnimation>

                    {/* 9. Modificações */}
                    <ScrollAnimation delay={0.5}>
                        <section className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="text-neon-cyan">9.</span> Modificações dos Termos
                                <RefreshCw className="text-neon-purple ml-auto opacity-50" size={20} />
                            </h2>
                            <p>
                                A UX Vision pode alterar estes Termos de Uso a qualquer momento, sem aviso prévio. Recomendamos que você revise este documento periodicamente.
                            </p>
                        </section>
                    </ScrollAnimation>

                    {/* 10. Lei e Foro */}
                    <ScrollAnimation delay={0.55}>
                        <section className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="text-neon-cyan">10.</span> Lei Aplicável e Foro
                                <Scale className="text-neon-purple ml-auto opacity-50" size={20} />
                            </h2>
                            <p className="mb-4">
                                Estes Termos são regidos pelas leis da República Federativa do Brasil.
                            </p>
                            <p>
                                Fica eleito o foro da comarca do domicílio da UX Vision para dirimir quaisquer questões relacionadas a estes Termos, com renúncia a qualquer outro, por mais privilegiado que seja.
                            </p>
                        </section>
                    </ScrollAnimation>
                    
                    <div className="text-center pt-10 border-t border-white/10">
                        <p className="text-gray-500 text-sm">
                            Dúvidas sobre os termos? Entre em contato via <a href="mailto:contato@uxvision.com.br" className="text-neon-cyan hover:underline">contato@uxvision.com.br</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsOfUse;