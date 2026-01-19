import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
    projects: Project[];
}

const PortfolioCarousel: React.FC<Props> = ({ projects }) => {
    if (!projects || projects.length === 0) return null;

    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [itemsToShow, setItemsToShow] = useState(3);
    const navigate = useNavigate();

    const SLIDE_INTERVAL = 3000; 

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) setItemsToShow(1);
            else if (window.innerWidth < 1024) setItemsToShow(2);
            else setItemsToShow(3);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % projects.length);
        }, SLIDE_INTERVAL);

        return () => clearInterval(interval);
    }, [isPaused, projects.length]);

    const getVisibleProjects = () => {
        const visible = [];
        for (let i = 0; i < itemsToShow; i++) {
            const index = (activeIndex + i) % projects.length;
            visible.push(projects[index]);
        }
        return visible;
    };

    const visibleProjects = getVisibleProjects();

    const handleProjectClick = (id: number) => {
        navigate(`/project/${id}`);
    };

    return (
        <div 
            className="relative w-full overflow-hidden py-10"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
        >
            <div className={`grid gap-6 px-4 md:px-0 transition-all duration-500`}
                style={{ 
                    gridTemplateColumns: `repeat(${itemsToShow}, minmax(0, 1fr))` 
                }}
            >
                {visibleProjects.map((project, idx) => (
                    <div 
                        key={`${project.id}-${activeIndex}-${idx}`} 
                        onClick={() => handleProjectClick(project.id)}
                        className="group relative bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,226,255,0.1)] h-[450px] flex flex-col cursor-pointer animate-fade-in"
                    >
                        <div className="h-[240px] w-full overflow-hidden relative">
                            <img 
                                src={project.image_url} 
                                alt={project.title} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                            <div className="absolute top-4 left-4">
                                <span className="bg-black/60 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/10">
                                    {project.category}
                                </span>
                            </div>
                        </div>

                        <div className="p-6 md:p-8 flex flex-col flex-grow relative">
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-neon-cyan transition-colors">
                                    {project.title}
                                </h3>
                                <div className="p-2 bg-white/5 rounded-full text-white/50 group-hover:text-white group-hover:bg-neon-purple transition-all">
                                    <ArrowUpRight size={18} />
                                </div>
                            </div>
                            
                            <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                                {project.description}
                            </p>
                            
                            <div className="mt-auto pt-4 border-t border-white/5 flex gap-2 flex-wrap">
                                {project.technologies?.slice(0, 3).map((tech, i) => (
                                    <span key={i} className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/5">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center gap-2 mt-10">
                {projects.map((_, idx) => (
                    <button 
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-10 bg-neon-cyan' : 'w-2 bg-white/20'}`}
                        aria-label={`Ir para slide ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default PortfolioCarousel;