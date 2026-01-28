
import React, { useState, useEffect } from 'react';
import { fetchProjects } from '../services/supabaseService';
import { Project } from '../types';
import ScrollAnimation from '../components/ScrollAnimation';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PortfolioAll: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [filter, setFilter] = useState('Todos');
    const [categories, setCategories] = useState<string[]>(['Todos']);
    const navigate = useNavigate();

    useEffect(() => {
        const load = async () => {
            const data = await fetchProjects();
            setProjects(data);
            
            // Extrai categorias únicas e remove vazias/nulas
            // Isso evita o botão "vazio" (círculo) ao lado de Todos
            const uniqueCats = Array.from(new Set(data.map(p => p.category)))
                .filter(cat => cat && cat.trim().length > 0);
                
            setCategories(['Todos', ...uniqueCats]);
        };
        load();
        window.scrollTo(0, 0);
    }, []);

    const filteredProjects = filter === 'Todos' 
        ? projects 
        : projects.filter(p => p.category === filter);

    const handleProjectClick = (project: Project) => {
        // Usa o slug se existir, senão usa o ID
        const identifier = project.slug || project.id;
        navigate(`/project/${identifier}`);
    };

    return (
        <div className="pt-32 pb-20 min-h-screen bg-bg-dark">
            <div className="container mx-auto px-5">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Portfólio <span className="text-neon-purple">Completo</span></h1>
                    <p className="text-gray-400">Explore nossos trabalhos recentes por categoria.</p>
                </div>

                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2 rounded-full border transition-all capitalize ${
                                filter === cat 
                                ? 'bg-neon-purple border-neon-purple text-white shadow-[0_0_15px_rgba(178,0,255,0.4)]' 
                                : 'bg-transparent border-white/20 text-gray-400 hover:border-neon-cyan hover:text-white'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project, idx) => (
                            <ScrollAnimation key={project.id} delay={idx * 0.05}>
                                <div 
                                    onClick={() => handleProjectClick(project)}
                                    className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group hover:bg-white/10 transition-all cursor-pointer"
                                >
                                    <div className="h-60 overflow-hidden relative">
                                        <img 
                                            src={project.image_url} 
                                            alt={project.title} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold text-neon-cyan border border-neon-cyan/30">
                                            {project.category}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold mb-2 group-hover:text-neon-purple transition-colors flex items-center justify-between">
                                            {project.title}
                                            <ArrowUpRight size={18} className="opacity-50 group-hover:opacity-100" />
                                        </h3>
                                        <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>
                                        
                                        <div className="flex flex-wrap gap-2 mt-4">
                                             {project.technologies?.slice(0, 3).map((tech, i) => (
                                                <span key={i} className="text-xs text-gray-500 bg-black/30 px-2 py-1 rounded border border-white/5">
                                                    {tech}
                                                </span>
                                             ))}
                                        </div>
                                    </div>
                                </div>
                            </ScrollAnimation>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">Nenhum projeto encontrado nesta categoria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PortfolioAll;
