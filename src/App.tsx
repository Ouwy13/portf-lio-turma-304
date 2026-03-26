import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { ArrowRight, Sparkles, Code2, Layers } from 'lucide-react';
import Starfield from './components/Starfield';

const projects = [
  { id: 1, imageId: 6, names: "Erika e Cristina", link: "https://v0-site-de-doceria-xi.vercel.app/", category: "Confeitaria" },
  { id: 2, imageId: 3, names: "Rian e Wellyda", link: "https://v0-site-agro-top.vercel.app/", category: "Agronegócio" },
  { id: 3, imageId: 4, names: "Miquéias e Vini", link: "https://amhardwareshop-9vvamppt.manus.space", category: "Tecnologia" },
  { id: 4, imageId: 7, names: "Thâmily e Modesto", link: "https://v0-site-de-moda-three.vercel.app/", category: "Moda" },
  { id: 5, imageId: 9, names: "Sofya e Lara", link: null, category: "Identidade Visual" },
  { id: 6, imageId: 10, names: "Ana e Maysa Costa", link: null, category: "Branding" },
  { id: 7, imageId: 8, names: "João Pedro e Daniele", link: "https://www.figma.com/make/MmYFbfyeOuIJYDjMrntZ9d/LUMI%C3%88RE?t=hWnfKXEpB5hmrco4-6", category: "Joalheria" },
  { id: 8, imageId: 5, names: "Alex e Dudu", link: "https://v0-website-cat-cafe.vercel.app/", category: "Cafeteria" },
  { id: 9, imageId: 2, names: "Heitor e Santy", link: "https://v0-hs-imoveis.vercel.app/", category: "Imobiliária" },
  { id: 10, imageId: 1, names: "José, Murilo e João Victor", link: "https://smart-finance-2-0.vercel.app/", category: "Finanças" }
];

const technologies = [
  "Vercel", "v0", "Figma", "Google AI", "Antigravity", "Canva", "ChatGPT"
];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

// Componente para carregar imagem com fallback de extensão (.jpg -> .jpeg -> .png)
function ProjectImage({ imageId, category }: { imageId: number; category: string }) {
  const extensions = ['jpg', 'jpeg', 'png'];
  const [extIndex, setExtIndex] = useState(0);
  const [src, setSrc] = useState(`/images/${imageId}.${extensions[0]}`);

  const handleError = () => {
    if (extIndex < extensions.length - 1) {
      const nextIndex = extIndex + 1;
      setExtIndex(nextIndex);
      setSrc(`/images/${imageId}.${extensions[nextIndex]}`);
    }
  };

  return (
    <motion.img 
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.8 }}
      src={src} 
      onError={handleError}
      alt={`Projeto - ${category}`}
      className="w-full h-full object-cover will-change-transform"
      loading="lazy"
    />
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-purple-500/30 font-sans">
      
      {/* Barra de Progresso no Topo */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-blue-500 origin-left z-[100] shadow-[0_0_10px_rgba(124,58,237,0.5)]"
        style={{ scaleX }}
      />

      {/* Fundo Animado do Universo */}
      <Starfield />

      {/* Background Glows (Estilo Reflect) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex justify-center">
        <div 
          className="absolute top-[-20%] w-[800px] h-[600px] bg-purple-600/30 blur-[100px] rounded-full animate-pulse" 
          style={{ animationDuration: '8s', willChange: 'opacity' }}
        />
        <div 
          className="absolute top-[40%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 blur-[100px] rounded-full animate-pulse" 
          style={{ animationDuration: '10s', animationDelay: '2s', willChange: 'opacity' }}
        />
      </div>

      <div className="relative z-10">
        
        {/* Hero Section */}
        <header className="min-h-[90vh] flex flex-col items-center justify-center px-6 pt-20 pb-12 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="max-w-4xl mx-auto flex flex-col items-center"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-xs font-medium tracking-wide text-purple-300 mb-8 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Exposição Digital 2026</span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter leading-[1.1] mb-6 text-gradient drop-shadow-2xl">
              O Futuro em <br className="hidden md:block" />
              Código e Design.
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-gray-300 max-w-2xl font-light leading-relaxed mb-12 drop-shadow-md">
              Uma curadoria de projetos digitais desenvolvidos pelos alunos, unindo estética refinada e excelência técnica em uma jornada pelo universo da tecnologia.
            </motion.p>

            {/* Contexto Escolar Elegante */}
            <motion.div variants={fadeUp} className="glass-panel rounded-2xl p-6 md:p-8 flex flex-wrap justify-center gap-x-12 gap-y-6 text-sm text-gray-300 w-full max-w-3xl border border-white/5 shadow-2xl backdrop-blur-xl bg-black/40">
              <div className="flex flex-col items-center md:items-start gap-1">
                <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold">Turma</span>
                <span className="text-white font-medium">304</span>
              </div>
              <div className="flex flex-col items-center md:items-start gap-1">
                <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold">Curso</span>
                <span className="text-white font-medium">Técnico em Informática para Internet</span>
              </div>
              <div className="flex flex-col items-center md:items-start gap-1">
                <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold">Disciplina</span>
                <span className="text-white font-medium">Design e Desenvolvimento na Web</span>
              </div>
              <div className="flex flex-col items-center md:items-start gap-1">
                <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold">Professor</span>
                <span className="text-white font-medium">Wênlen</span>
              </div>
              <div className="flex flex-col items-center md:items-start gap-1">
                <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold">Instituição</span>
                <span className="text-white font-medium">IEMA-Pleno Brejo</span>
              </div>
            </motion.div>
          </motion.div>
        </header>

        {/* Tecnologias e Ferramentas */}
        <section className="py-20 border-y border-white/5 bg-black/20 backdrop-blur-sm relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-3 mb-10"
            >
              <Layers className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl md:text-2xl font-medium tracking-wide text-gray-200">Tecnologias & Ferramentas Utilizadas</h2>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="flex flex-wrap justify-center gap-4 md:gap-6"
            >
              {technologies.map((tech) => (
                <motion.div
                  key={tech}
                  variants={fadeUp}
                  whileHover={{ scale: 1.05, y: -5, backgroundColor: "rgba(255,255,255,0.1)" }}
                  className="glass-panel px-6 py-3 rounded-full border border-white/10 flex items-center gap-2 cursor-default transition-colors duration-300 shadow-lg"
                >
                  <Code2 className="w-4 h-4 text-purple-400" />
                  <span className="font-medium tracking-wide text-gray-100">{tech}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Galeria de Projetos */}
        <main className="max-w-6xl mx-auto px-6 py-24 md:py-32 space-y-32 md:space-y-48">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <motion.article 
                key={project.id}
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-150px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col gap-12 md:gap-20 items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Imagem / Logo Container */}
                <div className="w-full md:w-1/2 flex justify-center">
                  <motion.div 
                    whileHover={{ scale: 1.03, rotateY: isEven ? 5 : -5 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative w-full max-w-md aspect-square rounded-[2rem] glass-panel p-2 overflow-hidden group shadow-2xl border border-white/10 perspective-1000"
                  >
                    {/* Glow sutil atrás da imagem */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-transparent to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-[#0a0a0a] flex items-center justify-center relative z-10">
                      <ProjectImage imageId={project.imageId} category={project.category} />
                    </div>
                  </motion.div>
                </div>

                {/* Informações do Projeto */}
                <div className={`w-full md:w-1/2 flex flex-col ${isEven ? 'md:items-start text-left' : 'md:items-end md:text-right text-left'}`}>
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="flex items-center gap-4 mb-6"
                  >
                    <span className="text-sm font-mono text-purple-400 font-bold">
                      {String(project.id).padStart(2, '0')}
                    </span>
                    <span className="h-px w-12 bg-gradient-to-r from-purple-500/50 to-transparent" />
                    <span className="text-xs uppercase tracking-widest text-gray-300 font-semibold">
                      {project.category}
                    </span>
                  </motion.div>
                  
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-4 text-gradient drop-shadow-lg"
                  >
                    {project.names}
                  </motion.h2>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-gray-300 font-light leading-relaxed mb-8 max-w-md drop-shadow-sm"
                  >
                    {project.link 
                      ? "Exploração completa de interface e experiência do usuário, desenvolvida com foco em usabilidade e estética moderna."
                      : "Desenvolvimento de identidade visual e branding, focado em transmitir os valores e a essência da marca através do design."}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    {project.link && (
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300"
                      >
                        <span>Visitar Projeto</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                    )}
                    
                    {!project.link && (
                      <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-gray-300 text-sm bg-white/5 backdrop-blur-md shadow-lg">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="font-medium">Projeto de Identidade Visual</span>
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.article>
            );
          })}
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 py-12 mt-20 bg-black/40 backdrop-blur-lg">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-400">
            <p className="font-medium">© 2026 Turma 304. IEMA-Pleno Brejo.</p>
            <p className="flex items-center gap-2">
              Desenvolvido para a disciplina de Design e Desenvolvimento na Web
            </p>
          </div>
        </footer>
        
      </div>
    </div>
  );
}
