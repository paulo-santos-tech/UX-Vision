
// ==============================================================================
// TIPOS DO FRONTEND (Espelho do seu Banco de Dados)
// ==============================================================================

export interface Project {
    id: number; // No SQL é bigint (number no JS)
    title: string;
    slug?: string; // URL Amigável
    description: string; // Descrição curta
    fullDescription?: string; // HTML do editor (mapeado de full_description)
    challenge?: string;
    solution?: string;
    image_url: string; // Mapeado de 'image' do banco
    gallery?: string[]; // Array de URLs
    category: string;
    link?: string; // Link externo
    technologies: string[];
    client?: string;
    year?: string;
}

export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    content?: string; // HTML
    image_url: string; // Mapeado de 'image'
    date?: string; // Vamos formatar o created_at
    author?: string;
    readTime?: string; // Mapeado de 'read_time'
    status?: string;
    tags?: string[]; // Mapeado de 'tags' do banco
    meta_title?: string;
}

export interface MicroSaas {
    id: number;
    name: string;
    description: string;
    status: 'Venda' | 'Uso' | 'Beta';
    price?: string;
    link: string;
    features: string[];
    image?: string;
}

export interface Service {
    icon: string;
    title: string;
    description: string;
}

// Nova interface baseada na tabela site_settings
export interface SiteSettings {
    whatsapp?: string;
    instagram?: string;
    linkedin?: string;
    facebook?: string;
    telegram?: string;
    footer_text?: string;
    author_name?: string;
    contact_email?: string;
}
