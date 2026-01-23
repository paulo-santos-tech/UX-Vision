
import { createClient } from '@supabase/supabase-js';
import { Project, BlogPost, MicroSaas, SiteSettings } from '../types';

// ==============================================================================
// 1. CONFIGURAÇÃO E CONEXÃO
// ==============================================================================

const FALLBACK_URL = "https://gbnfoigyzcoccfdbgzmk.supabase.co";
const FALLBACK_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdibmZvaWd5emNvY2NmZGJnem1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1MDQ2MDksImV4cCI6MjA4NDA4MDYwOX0.6Qtm1ktpZvtHOrvz2WReBzibFVchD6AfYOOTbdS4umk";

const getEnv = (key: string, fallback: string): string => {
    try {
        // @ts-ignore
        if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
            // @ts-ignore
            return import.meta.env[key];
        }
    } catch (e) {}
    try {
        // @ts-ignore
        if (typeof process !== 'undefined' && process.env && process.env[key]) {
            // @ts-ignore
            return process.env[key];
        }
    } catch (e) {}
    return fallback;
};

const supabaseUrl = getEnv('VITE_SUPABASE_URL', FALLBACK_URL);
const supabaseKey = getEnv('VITE_SUPABASE_ANON_KEY', FALLBACK_KEY);

export const supabase = createClient(supabaseUrl, supabaseKey);

// ==============================================================================
// 2. AUTENTICAÇÃO
// ==============================================================================

export const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    return { data, error };
};

export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
};

export const getCurrentUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.user || null;
};

// ==============================================================================
// 3. SETTINGS (NOVO)
// ==============================================================================

let settingsCache: SiteSettings | null = null;

export const fetchSiteSettings = async (): Promise<SiteSettings | null> => {
    if (settingsCache) return settingsCache;

    try {
        // Tenta buscar a linha com ID 1 (padrão do SQL)
        const { data, error } = await supabase
            .from('site_settings')
            .select('*')
            .single();

        if (error) {
            // Se der erro (tabela vazia), retorna null mas não quebra
            console.warn('Configurações não encontradas ou erro:', error.message);
            return null;
        }

        settingsCache = data;
        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
};

// ==============================================================================
// 4. FUNÇÕES DO PORTFÓLIO
// ==============================================================================

export const fetchProjects = async (): Promise<Project[]> => {
    try {
        const { data, error } = await supabase
            .from('portfolio')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Erro ao buscar projetos:', error.message);
            return [];
        }

        return data.map((item: any) => ({
            id: item.id,
            title: item.title,
            category: item.category,
            description: item.description, 
            fullDescription: item.full_description,
            challenge: item.challenge,
            solution: item.solution,
            image_url: item.image,
            gallery: item.gallery || [],
            technologies: item.technologies || [],
            client: item.client,
            year: item.year,
            link: item.link
        }));

    } catch (err) {
        console.error('Erro inesperado em fetchProjects:', err);
        return [];
    }
};

export const fetchProjectById = async (id: string): Promise<Project | undefined> => {
    try {
        const { data, error } = await supabase
            .from('portfolio')
            .select('*')
            .eq('id', id)
            .single();

        if (error || !data) return undefined;

        return {
            id: data.id,
            title: data.title,
            category: data.category,
            description: data.description,
            fullDescription: data.full_description,
            challenge: data.challenge,
            solution: data.solution,
            image_url: data.image,
            gallery: data.gallery || [],
            technologies: data.technologies || [],
            client: data.client,
            year: data.year,
            link: data.link
        };
    } catch (err) {
        console.error(err);
        return undefined;
    }
};

// ==============================================================================
// 5. FUNÇÕES DO BLOG
// ==============================================================================

export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
    try {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('status', 'published') 
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Erro blog:', error);
            return [];
        }

        return data.map((post: any) => ({
            id: post.id,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            category: post.category,
            image_url: post.image, 
            content: post.content,
            author: post.author,
            readTime: post.read_time, 
            date: new Date(post.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
            // Novos campos
            tags: post.tags || [],
            meta_title: post.meta_title,
            meta_description: post.meta_description
        }));
    } catch (err) {
        console.error(err);
        return [];
    }
};

export const fetchPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
    try {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('slug', slug)
            .single();

        if (error || !data) return undefined;

        return {
            id: data.id,
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt,
            category: data.category,
            image_url: data.image,
            content: data.content,
            author: data.author,
            readTime: data.read_time,
            date: new Date(data.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
            tags: data.tags || [],
            meta_title: data.meta_title,
            meta_description: data.meta_description
        };
    } catch (err) {
        console.error(err);
        return undefined;
    }
};

export const fetchRelatedPosts = async (currentSlug: string, category: string): Promise<BlogPost[]> => {
    try {
        const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('category', category)
        .neq('slug', currentSlug)
        .eq('status', 'published')
        .limit(3);

        if (!data) return [];

        return data.map((post: any) => ({
            id: post.id,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            category: post.category,
            image_url: post.image,
            author: post.author,
            readTime: post.read_time,
            date: new Date(post.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
        }));
    } catch (err) {
        console.error(err);
        return [];
    }
};

// ==============================================================================
// 6. FUNÇÕES DE MICROSAAS
// ==============================================================================

export const fetchMicrosaas = async (): Promise<MicroSaas[]> => {
    try {
        const { data, error } = await supabase
            .from('microsaas')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Erro microsaas:', error);
            return [];
        }

        return data.map((item: any) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            image: item.image,
            status: item.status,
            price: item.price,
            link: item.link,
            features: item.features || [] 
        }));
    } catch (err) {
        console.error(err);
        return [];
    }
};

// ==============================================================================
// 7. FUNÇÕES DE LEADS
// ==============================================================================

export const createLead = async (leadData: { 
    name: string; 
    email: string; 
    whatsapp: string; 
    project_type?: string; 
    details?: string; 
}) => {
    try {
        const { error } = await supabase
            .from('leads')
            .insert([{
                name: leadData.name,
                email: leadData.email,
                whatsapp: leadData.whatsapp,
                project_type: leadData.project_type,
                details: leadData.details
            }]);

        if (error) {
            console.error('Erro ao salvar lead no Supabase:', error);
            return { success: false, error };
        }
        return { success: true };
    } catch (err) {
        console.error('Erro inesperado lead:', err);
        return { success: false, error: err };
    }
};
