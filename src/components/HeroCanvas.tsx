import React, { useEffect, useRef } from 'react';

const HeroCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let animationFrameId: number;
        
        const spacing = 50; 
        let cols = 0;
        let rows = 0;
        
        const mouse = { x: -1000, y: -1000 };

        class Particle {
            x: number;
            y: number;
            baseX: number;
            baseY: number;
            
            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.baseX = x;
                this.baseY = y;
            }

            update(time: number) {
                const waveX = Math.sin(time * 0.0005 + this.baseY * 0.003) * 3;
                const waveY = Math.cos(time * 0.0005 + this.baseX * 0.003) * 3;

                const dx = mouse.x - this.baseX;
                const dy = mouse.y - this.baseY;
                const distSq = dx * dx + dy * dy;
                const dist = Math.sqrt(distSq);
                
                const maxDist = 400;
                const pullStrength = 80;

                let targetX = this.baseX + waveX;
                let targetY = this.baseY + waveY;

                if (dist < maxDist) {
                    const force = (maxDist - dist) / maxDist;
                    const ease = force * force; 
                    const angle = Math.atan2(dy, dx);
                    
                    targetX += Math.cos(angle) * (pullStrength * ease);
                    targetY += Math.sin(angle) * (pullStrength * ease);
                }

                this.x += (targetX - this.x) * 0.08;
                this.y += (targetY - this.y) * 0.08;
            }
        }

        let particles: Particle[] = [];

        function init() {
            particles = [];
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    particles.push(new Particle(c * spacing, r * spacing));
                }
            }
        }

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            cols = Math.ceil(width / spacing) + 1;
            rows = Math.ceil(height / spacing) + 1;
            init();
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        function animate(time: number) {
            ctx!.clearRect(0, 0, width, height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update(time);
            }

            const gradient = ctx!.createLinearGradient(0, 0, width, height);
            gradient.addColorStop(0, 'rgba(178, 0, 255, 0.2)'); 
            gradient.addColorStop(0.5, 'rgba(0, 226, 255, 0.15)'); 
            gradient.addColorStop(1, 'rgba(178, 0, 255, 0.2)'); 

            ctx!.beginPath();
            ctx!.lineWidth = 0.5;
            ctx!.strokeStyle = gradient;

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const i = r * cols + c;
                    const p = particles[i];

                    if (c < cols - 1) {
                        const right = particles[i + 1];
                        ctx!.moveTo(p.x, p.y);
                        ctx!.lineTo(right.x, right.y);
                    }
                    
                    if (r < rows - 1) {
                        const bottom = particles[i + cols];
                        ctx!.moveTo(p.x, p.y);
                        ctx!.lineTo(bottom.x, bottom.y);
                    }
                }
            }
            ctx!.stroke();

            ctx!.beginPath();
            ctx!.lineWidth = 1.5;
            
            const mouseGrad = ctx!.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 300);
            mouseGrad.addColorStop(0, '#00e2ff'); 
            mouseGrad.addColorStop(1, 'rgba(178, 0, 255, 0)'); 

            ctx!.strokeStyle = mouseGrad;

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                
                if (dx*dx + dy*dy < 60000) {
                     const r = Math.floor(i / cols);
                     const c = i % cols;

                     if (c < cols - 1) {
                        const right = particles[i + 1];
                        ctx!.moveTo(p.x, p.y);
                        ctx!.lineTo(right.x, right.y);
                    }
                    if (r < rows - 1) {
                        const bottom = particles[i + cols];
                        ctx!.moveTo(p.x, p.y);
                        ctx!.lineTo(bottom.x, bottom.y);
                    }
                }
            }
            ctx!.stroke();

            ctx!.fillStyle = '#ffffff';
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                 const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                if (dx*dx + dy*dy < 40000) {
                    ctx!.beginPath();
                    ctx!.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
                    ctx!.fill();
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        }

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);

        handleResize();
        animationFrameId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none" />;
};

export default HeroCanvas;