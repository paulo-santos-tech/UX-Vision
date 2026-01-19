// ==============================================================================
// SERVIÇO DE EMAIL SIMPLIFICADO (Via FormSubmit.co)
// ==============================================================================
// Não requer instalação de libs, nem cadastro prévio.
// Apenas ative clicando no link que chegará no primeiro email de teste.

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
        const response = await fetch(ENDPOINT, {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                // Dados do Formulário
                "Nome do Cliente": formData.name,
                "Email de Contato": formData.email,
                "WhatsApp": formData.whatsapp,
                "Tipo de Projeto": formData.type || "Não informado",
                "Detalhes": formData.details || "Sem detalhes",
                
                // Configurações do FormSubmit
                "_subject": `🚀 Novo Lead: ${formData.name}`, // Assunto do email
                "_cc": SECONDARY_EMAIL, // Envia cópia para o marketing
                "_template": "box", // Layout bonito automático
                "_captcha": "false" // Desativa captcha chato (opcional)
            })
        });

        const result = await response.json();

        if (response.ok) {
            return { success: true };
        } else {
            console.error("Erro FormSubmit:", result);
            return { success: false, error: "Falha no envio" };
        }

    } catch (error) {
        console.error("Erro de conexão:", error);
        return { success: false, error };
    }
};

// ==============================================================================
// FUNÇÃO DE NEWSLETTER (NOVO)
// ==============================================================================
export const subscribeNewsletter = async (email: string) => {
    try {
        const response = await fetch(ENDPOINT, {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "Nova Inscrição": "Newsletter",
                "Email do Assinante": email,
                
                // Configurações
                "_subject": `📧 Nova Inscrição na Newsletter: ${email}`,
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