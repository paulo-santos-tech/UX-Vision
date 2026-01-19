import React, { useEffect } from 'react';
import ScrollAnimation from '../components/ScrollAnimation';
import { ArrowLeft, Lock, Database, Cookie, Briefcase, Target, Share2, Shield, Scale, Trash2, Link as LinkIcon, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-bg-dark min-h-screen pt-32 pb-20 relative overflow-hidden">
             {/* Background Elements */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-neon-cyan/5 blur-[120px] pointer-events-none rounded-full" />
            
            <div className="container mx-auto px-5 max-w-4xl relative z-10">
                <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Voltar para Home
                </Link>

                <ScrollAnimation>
                    <div className="text-center mb-16">
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 text-neon-cyan">
                                <Lock size={32} />
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Política de Privacidade</h1>
                        <p className="text-gray-400">Compromisso com a sua segurança e dados.</p>
                    </div>
                </ScrollAnimation>

                <div className="space-y-8 text-gray-300 leading-relaxed font-light text-lg">
                    
                    {/* Intro */}
                    <ScrollAnimation delay={0.1}>
                        <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl mb-8">
                            <p className="italic text-gray-400 text-center mb-6">
                                "Na UX Vision, privacidade não é uma opção, é um padrão."
                            </p>
                            <p className="mb-4">
                                Esta Política de Privacidade explica como coletamos, utilizamos, armazenamos e protegemos os dados pessoais dos usuários que acessam nosso site e utilizam nossos serviços.
                            </p>
                            <p className="font-medium text-white">
                                Ao acessar este site, você concorda com as práticas descritas neste documento.
                            </p>
                        </div>
                    </ScrollAnimation>

                    {/* 1. Quem somos */}
                    <ScrollAnimation delay={0.15}>
                        <section className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="text-neon-cyan">1.</span> Quem somos
                                <Briefcase className="text-neon-purple ml-auto opacity-50" size={20} />
                            </h2>
                            <p className="mb-4">
                                A UX Vision é um estúdio digital especializado na criação de experiências digitais, design de interfaces (UI/UX), desenvolvimento web, soluções SaaS, microsaas e consultoria tecnológica.
                            </p>
                            <p>
                                Este site é operado pela UX Vision, responsável pelo tratamento dos dados pessoais aqui coletados.
                            </p>
                        </section>
                    </ScrollAnimation>

                    {/* 2. Quais dados coletamos */}
                    <ScrollAnimation delay={0.2}>
                        <section className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="text-neon-cyan">2.</span> Quais dados coletamos
                                <Database className="text-neon-purple ml-auto opacity-50" size={20} />
                            </h2>
                            <p className="mb-4">Podemos coletar os seguintes dados pessoais, de forma direta ou automática:</p>
                            
                            <div className="grid md:grid-cols-2 gap-6 mt-6">
                                <div className="bg-black/20 p-5 rounded-xl border border-white/5">
                                    <h3 className="text-white font-bold mb-3">2.1 Dados fornecidos pelo usuário</h3>
                                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-400">
                                        <li>Nome</li>
                                        <li>E-mail</li>
                                        <li>Telefone/WhatsApp</li>
                                        <li>Informações enviadas via formulários</li>
                                        <li>Conteúdos enviados voluntariamente</li>
                                    </ul>
                                </div>
                                <div className="bg-black/20 p-5 rounded-xl border border-white/5">
                                    <h3 className="text-white font-bold mb-3">2.2 Dados coletados automaticamente</h3>
                                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-400">
                                        <li>Endereço IP</li>
                                        <li>Tipo de navegador e dispositivo</li>
                                        <li>Páginas acessadas</li>
                                        <li>Data e horário de acesso</li>
                                        <li>Dados de cookies e tecnologias similares</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="mt-4 text-sm text-gray-500">
                                Esses dados são utilizados para melhorar a experiência do usuário, segurança e desempenho do site.
                            </p>
                        </section>
                    </ScrollAnimation>

                    {/* 3. Finalidade */}
                    <ScrollAnimation delay={0.25}>
                        <section className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="text-neon-cyan">3.</span> Finalidade do uso dos dados
                                <Target className="text-neon-purple ml-auto opacity-50" size={20} />
                            </h2>
                            <p className="mb-4">Utilizamos os dados coletados para:</p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-400 mb-6">
                                <li>Responder solicitações de contato e orçamento.</li>
                                <li>Prestar e aprimorar nossos serviços.</li>
                                <li>Melhorar a navegação e experiência do usuário.</li>
                                <li>Cumprir obrigações legais e regulatórias.</li>
                                <li>Garantir a segurança do site e dos usuários.</li>
                                <li>Análises estatísticas e métricas de desempenho.</li>
                            </ul>
                            <div className="p-4 bg-neon-cyan/5 border border-neon-cyan/20 rounded-xl text-white text-center font-bold">
                                Nunca vendemos ou comercializamos dados pessoais.
                            </div>
                        </section>
                    </ScrollAnimation>

                    {/* 4. Compartilhamento */}
                    <ScrollAnimation delay={0.3}>
                        <section className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="text-neon-cyan">4.</span> Compartilhamento de dados
                                <Share2 className="text-neon-purple ml-auto opacity-50" size={20} />
                            </h2>
                            <p className="mb-4">
                                Os dados podem ser compartilhados apenas quando necessário com:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-400">
                                <li>Plataformas de hospedagem e infraestrutura.</li>
                                <li>Ferramentas de analytics e métricas.</li>
                                <li>Serviços de e-mail e comunicação.</li>
                                <li>Parceiros técnicos essenciais à operação.</li>
                            </ul>
                            <p className="mt-4 text-sm text-gray-500">
                                Sempre exigimos que terceiros respeitem padrões de segurança e confidencialidade.
                            </p>
                        </section>
                    </ScrollAnimation>

                    {/* 5. Cookies */}
                    <ScrollAnimation delay={0.35}>
                        <section className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="text-neon-cyan">5.</span> Cookies e tecnologias semelhantes
                                <Cookie className="text-neon-purple ml-auto opacity-50" size={20} />
                            </h2>
                            <p className="mb-4">Utilizamos cookies para:</p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-400 mb-4">
                                <li>Funcionamento adequado do site.</li>
                                <li>Análise de tráfego e comportamento.</li>
                                <li>Melhoria de performance e experiência.</li>
                            </ul>
                            <p>
                                Você pode gerenciar ou desativar cookies diretamente nas configurações do seu navegador.
                            </p>
                        </section>
                    </ScrollAnimation>

                    {/* 6. Segurança */}
                    <ScrollAnimation delay={0.4}>
                        <section className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="text-neon-cyan">6.</span> Armazenamento e segurança
                                <Shield className="text-neon-purple ml-auto opacity-50" size={20} />
                            </h2>
                            <p className="mb-4">
                                Adotamos medidas técnicas e organizacionais para proteger os dados pessoais contra acessos não autorizados, perda, destruição, alteração indevida, vazamentos e uso indevido.
                            </p>
                            <p className="text-gray-400 text-sm italic">
                                Apesar disso, nenhum sistema é 100% inviolável. Atuamos sempre com as melhores práticas de segurança disponíveis.
                            </p>
                        </section>
                    </ScrollAnimation>

                    {/* 7. Direitos LGPD */}
                    <ScrollAnimation delay={0.45}>
                        <section className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="text-neon-cyan">7.</span> Direitos do titular (LGPD)
                                <Scale className="text-neon-purple ml-auto opacity-50" size={20} />
                            </h2>
                            <p className="mb-4">
                                De acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem direito a:
                            </p>
                            <ul className="grid md:grid-cols-2 gap-3">
                                <li className="bg-black/20 p-3 rounded-lg border border-white/5 text-sm">Confirmar a existência de tratamento</li>
                                <li className="bg-black/20 p-3 rounded-lg border border-white/5 text-sm">Acessar seus dados pessoais</li>
                                <li className="bg-black/20 p-3 rounded-lg border border-white/5 text-sm">Corrigir dados incompletos/desatualizados</li>
                                <li className="bg-black/20 p-3 rounded-lg border border-white/5 text-sm">Solicitar a exclusão de dados</li>
                                <li className="bg-black/20 p-3 rounded-lg border border-white/5 text-sm">Revogar consentimentos</li>
                                <li className="bg-black/20 p-3 rounded-lg border border-white/5 text-sm">Solicitar portabilidade</li>
                            </ul>
                        </section>
                    </ScrollAnimation>

                    {/* 8. Exclusão */}
                    <ScrollAnimation delay={0.5}>
                        <section className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="text-neon-cyan">8.</span> Exclusão de dados
                                <Trash2 className="text-neon-purple ml-auto opacity-50" size={20} />
                            </h2>
                            <p>
                                Você pode solicitar a exclusão total ou parcial dos seus dados pessoais a qualquer momento, respeitando obrigações legais e contratuais.
                            </p>
                        </section>
                    </ScrollAnimation>

                    {/* 9. Links Terceiros */}
                    <ScrollAnimation delay={0.55}>
                        <section className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="text-neon-cyan">9.</span> Links para sites de terceiros
                                <LinkIcon className="text-neon-purple ml-auto opacity-50" size={20} />
                            </h2>
                            <p>
                                Este site pode conter links para sites externos. A UX Vision não se responsabiliza pelas políticas de privacidade ou práticas desses sites.
                            </p>
                        </section>
                    </ScrollAnimation>

                    {/* 10. Alterações */}
                    <ScrollAnimation delay={0.6}>
                        <section className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="text-neon-cyan">10.</span> Alterações nesta Política
                                <RefreshCw className="text-neon-purple ml-auto opacity-50" size={20} />
                            </h2>
                            <p>
                                Esta Política de Privacidade pode ser atualizada a qualquer momento, visando melhorias ou adequações legais. Recomendamos que você revise este documento periodicamente.
                            </p>
                        </section>
                    </ScrollAnimation>

                    <div className="text-center pt-10 border-t border-white/10 mt-12">
                         <p className="text-gray-400 mb-2">Para requisições de exclusão de dados ou dúvidas:</p>
                        <a href="mailto:contato@uxvision.com.br" className="text-xl font-bold text-white hover:text-neon-cyan transition-colors">contato@uxvision.com.br</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;