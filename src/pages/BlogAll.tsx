import React, { useState, useEffect } from 'react';
import { fetchBlogPosts } from '../services/supabaseService';
import { BlogPost } from '../types';
import ScrollAnimation from '../components/ScrollAnimation';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Search, Tag } from 'lucide-react';

const BlogAll: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [filter, setFilter] = useState('Todos');
    const [categories, setCategories] = useState<string[]>(['Todos']);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const load = async () => {
            const data = await fetchBlogPosts();
            setPosts(data);
            
            const cats = ['Todos', ...Array.from(new Set(data.map(p => p.category)))];
            setCategories(cats);
        };
        load();
        window.scrollTo(0, 0);
    }, []);

    const filteredPosts = posts.filter(post => {
        const matchesFilter = filter === 'Todos' || post.category === filter;
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="pt-32 pb-20 min-h-screen bg-bg-dark">
            <div className="container mx-auto px-5">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog <span className="text-neon-purple">& Insights</span></h1>
                    <p className="text-gray-400">Conteúdo profundo sobre tecnologia e design.</p>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16 max-w-5xl mx-auto">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-2 rounded-full text-sm border transition-all ${
                                    filter === cat 
                                    ? 'bg-neon-purple text-white border-neon-purple font-bold shadow-lg shadow-neon-purple/20' 
                                    : 'bg-transparent border-white/20 text-gray-400 hover:border-white hover:text-white'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    
                    <div className="relative w-full md:w-64">
                        <input 
                            type="text" 
                            placeholder="Buscar artigo..." 
                            className="w-full bg-white/5 border border-white/10 rounded-full px-5 py-2 pl-10 text-white focus:outline-none focus:border-neon-cyan transition-colors"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search size={18} className="absolute left-3 top-2.5 text-gray-500" />
                    </div>
                </div>

                {filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post, idx) => (
                            <ScrollAnimation key={post.id} delay={idx * 0.05}>
                                <Link to={`/blog/${post.slug}`} className="group block h-full">
                                    <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-neon-cyan/50 transition-all h-full flex flex-col hover:shadow-2xl hover:shadow-neon-cyan/5">
                                        <div className="h-56 overflow-hidden relative">
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                                            <img 
                                                src={post.image_url} 
                                                alt={post.title} 
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>
                                        <div className="p-8 flex flex-col flex-grow">
                                            <div className="mb-4 flex items-center justify-between">
                                                <span className="flex items-center gap-2 text-neon-cyan font-bold text-xs uppercase tracking-widest bg-neon-cyan/10 px-3 py-1 rounded-lg border border-neon-cyan/20">
                                                    <Tag size={12} /> {post.category}
                                                </span>
                                                <span className="text-gray-600 text-xs">{post.readTime}</span>
                                            </div>

                                            <h3 className="text-2xl font-bold mb-3 group-hover:text-neon-purple transition-colors leading-tight flex-grow">
                                                {post.title}
                                            </h3>
                                            <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed mb-6">
                                                {post.excerpt}
                                            </p>
                                            
                                            <div className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wide mt-auto group-hover:gap-3 transition-all">
                                                Ler Artigo <ArrowUpRight size={16} className="text-neon-purple" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </ScrollAnimation>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-gray-500 border border-white/5 rounded-3xl bg-white/[0.02]">
                        <p className="text-xl">Nenhum artigo encontrado para esta busca.</p>
                        <button onClick={() => {setFilter('Todos'); setSearchTerm('')}} className="mt-4 text-neon-cyan hover:underline">Limpar filtros</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogAll;