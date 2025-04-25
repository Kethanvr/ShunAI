"use client";

import React, { useRef, useEffect } from "react";

interface ParticleConfig {
  color: string;
  radius: number;
  speed: number;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  velocity: {
    x: number;
    y: number;
  };
  config: ParticleConfig;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number | null>(null);

  // Create particles
  const createParticles = (canvas: HTMLCanvasElement, count: number) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particleConfigs: ParticleConfig[] = [
      { color: "rgba(123, 97, 255, 0.5)", radius: 1.5, speed: 0.5 }, // Purple
      { color: "rgba(56, 182, 255, 0.3)", radius: 2, speed: 0.3 }, // Blue
      { color: "rgba(240, 240, 255, 0.2)", radius: 1, speed: 0.2 }, // White
    ];

    const newParticles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const config = particleConfigs[Math.floor(Math.random() * particleConfigs.length)];
      const particle: Particle = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: config.radius,
        color: config.color,
        velocity: {
          x: (Math.random() - 0.5) * config.speed,
          y: (Math.random() - 0.5) * config.speed,
        },
        config,
      };
      newParticles.push(particle);
    }

    return newParticles;
  };

  // Animation loop
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.current.forEach((particle) => {
      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();

      // Update position
      particle.x += particle.velocity.x;
      particle.y += particle.velocity.y;

      // Bounce off edges
      if (particle.x < 0 || particle.x > canvas.width) {
        particle.velocity.x = -particle.velocity.x;
      }

      if (particle.y < 0 || particle.y > canvas.height) {
        particle.velocity.y = -particle.velocity.y;
      }

      // Connect particles that are close
      particles.current.forEach((otherParticle) => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
        }
      });
    });

    animationFrameId.current = requestAnimationFrame(animate);
  };

  // Setup canvas and start animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles.current = createParticles(canvas, 50) || [];
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 opacity-40"
      style={{ pointerEvents: "none" }}
    />
  );
}
