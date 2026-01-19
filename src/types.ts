export interface Project {
    id: number;
    title: string;
    description: string;
    fullDescription?: string;
    challenge?: string;
    solution?: string;
    image_url: string;
    gallery?: string[];
    category: string;
    link?: string;
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
    content?: string;
    image_url: string;
    date?: string;
    author?: string;
    readTime?: string;
    status?: string;
}

export interface MicroSaas {
    id: number;
    name: string;
    description: string;
    status: 'Venda' | 'Uso' | 'Beta';
    price?: string;
    link: string;
    features: string[];
}
