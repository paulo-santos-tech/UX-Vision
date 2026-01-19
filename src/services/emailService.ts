
// ==============================================================================
// SERVIÇO DE EMAIL + BACKUP DE DADOS
// ==============================================================================

import { createLead } from './supabaseService';

interface EmailData {
    name: string;
    email: string;
    whatsapp: string;
    type: string;
    details: string;
}

const PRIMARY_EMAIL = "contato@uxvision.com.br";
const SECONDARY_EMAIL = "marketing.novo28@gmail.com";
const ENDPOINT = `https://formsubmit.co/ajax/${PRIMARY_EMAIL}`;

export const sendProjectRequest = async (formData: EmailData) => {
    try {
        // 1. BACKUP NO SUPABASE (Segurança de Dados)
        // Tentamos salvar no banco primeiro. Se falhar, o email ainda tenta ser enviado.
        await createLead({
            name: formData.name,
            email: formData.email,
            whatsapp: formData.whatsapp,
            project_type: formData.type,
            details: formData.details
        });

        // 2. ENVIO DO EMAIL ESTILIZADO (FormSubmit)
        const response = await fetch(ENDPOINT, {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                // -- DADOS VISUAIS (Estrutura de "Recibo") --
                
                // O FormSubmit exibe as chaves em ordem. Usamos emojis para UX.
                "📅 Data do Pedido": new Date().toLocaleDateString('pt-BR'),
                "⏰ Horário": new Date().toLocaleTimeString('pt-BR'),
                "--------------------------------": "--------------------------------",

                "👤 Nome do Cliente": formData.name,
                "✉️ E-mail Profissional": formData.email,
                "📱 WhatsApp": formData.whatsapp,
                "🚀 Tipo de Projeto": formData.type || "Consultoria Geral",
                
                "📝 Detalhes da Solicitação": formData.details || "Nenhum detalhe adicional fornecido.",
                
                "---------------------------------": "---------------------------------",
                "🔗 Origem do Lead": "Site Oficial UX Vision",

                // -- CONFIGURAÇÕES TÉCNICAS (Hidden Fields) --
                "_subject": `🔥 Novo Lead: ${formData.name} [${formData.type}]`, 
                "_cc": SECONDARY_EMAIL, 
                "_template": "table", // 'table' é mais limpo/profissional que o 'box' cinza
                "_captcha": "false" 
            })
        });

        const result = await response.json();

        if (response.ok) {
            return { success: true };
        } else {
            console.error("Erro FormSubmit:", result);
            return { success: false, error: "Falha no envio do e-mail" };
        }

    } catch (error) {
        console.error("Erro de conexão:", error);
        return { success: false, error };
    }
};

// ==============================================================================
// NEWSLETTER
// ==============================================================================
export const subscribeNewsletter = async (email: string) => {
    try {
        // Salva lead simplificado no banco
        await createLead({
            name: 'Newsletter Subscriber',
            email: email,
            whatsapp: '',
            project_type: 'Newsletter',
            details: 'Inscrição via rodapé/blog'
        });

        const response = await fetch(ENDPOINT, {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "✨ Nova Inscrição VIP": email,
                "📅 Data": new Date().toLocaleString('pt-BR'),
                
                // Configurações
                "_subject": `📧 Newsletter: ${email}`,
                "_cc": SECONDARY_EMAIL,
                "_template": "table",
                "_captcha": "false"
            })
        });

        if (response.ok) {
            return { success: true };
        } else {
            return { success: false, error: "Falha ao inscrever" };
        }
    } catch (error) {
        return { success: false, error };
    }
};
