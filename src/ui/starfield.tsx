import { useEffect, useRef } from 'react';

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stars: { x: number; y: number; z: number; o: number }[] = [];
    const numStars = 800; // Quantidade de estrelas
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);
    resize();

    // Inicializa as estrelas
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * width,
        o: Math.random() // Opacidade
      });
    }

    let animationFrameId: number;

    const draw = () => {
      // Fundo escuro com leve rastro para dar sensação de velocidade
      ctx.fillStyle = 'rgba(5, 5, 5, 0.4)';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < numStars; i++) {
        let star = stars[i];
        
        // Velocidade da viagem (ajuste este valor para mais rápido/devagar)
        star.z -= 3; 

        // Reposiciona a estrela quando ela passa da "câmera"
        if (star.z <= 0) {
          star.x = Math.random() * width - width / 2;
          star.y = Math.random() * height - height / 2;
          star.z = width;
        }

        // Projeção 3D para 2D
        const x = cx + (star.x / star.z) * width;
        const y = cy + (star.y / star.z) * width;
        
        // O tamanho aumenta conforme a estrela se aproxima
        const radius = (1 - star.z / width) * 2;

        // Só desenha se estiver dentro da tela
        if (x >= 0 && x <= width && y >= 0 && y <= height) {
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          // A estrela fica mais brilhante conforme se aproxima
          const opacity = (1 - star.z / width) * star.o;
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.fill();
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };
    
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none bg-[#050505]" 
    />
  );
}
