# Instruções para Hospedagem no Vercel

Para hospedar seu portfólio no Vercel, siga estes passos:

1. **Conecte seu Repositório:**
   - Vá para [vercel.com](https://vercel.com) e conecte sua conta do GitHub/GitLab/Bitbucket.
   - Importe este projeto.

2. **Configurações de Build:**
   - O Vercel deve detectar automaticamente que é um projeto Vite.
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

3. **Variáveis de Ambiente (Environment Variables):**
   - Se você estiver usando a API do Gemini, adicione a seguinte variável no painel do Vercel:
     - `GEMINI_API_KEY`: (Sua chave da API do Google AI Studio)
   - **Nota:** Se o seu portfólio for apenas estático e não fizer chamadas de IA no cliente, você pode ignorar isso.

4. **Imagens:**
   - Certifique-se de que todas as imagens (1 a 10) estão na pasta `public/images/`.
   - O sistema de fallback que criamos suporta `.png`, `.jpg` e `.jpeg`.

5. **Deploy:**
   - Clique em "Deploy" e seu site estará no ar em poucos segundos!

O arquivo `vercel.json` já foi configurado para garantir que as rotas funcionem corretamente.
