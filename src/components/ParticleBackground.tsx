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
  brightness: number;
  pulseDirection: number;
  pulseSpeed: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const mousePosition = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  // Create particles
  const createParticles = (canvas: HTMLCanvasElement, count: number) => {
    const particleConfigs: ParticleConfig[] = [
      { color: "rgba(123, 97, 255, 0.7)", radius: 1.8, speed: 0.4 }, // Vibrant purple
      { color: "rgba(56, 182, 255, 0.5)", radius: 2.2, speed: 0.3 }, // Bright blue
      { color: "rgba(240, 240, 255, 0.4)", radius: 1.2, speed: 0.25 }, // White
      { color: "rgba(194, 97, 255, 0.6)", radius: 1.6, speed: 0.35 }, // Pink-purple
      { color: "rgba(16, 132, 255, 0.45)", radius: 1.9, speed: 0.3 }, // Light blue
    ];

    const newParticles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const config = particleConfigs[Math.floor(Math.random() * particleConfigs.length)];
      const particle: Particle = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: config.radius * (0.8 + Math.random() * 0.4), // Slight radius variation
        color: config.color,
        velocity: {
          x: (Math.random() - 0.5) * config.speed,
          y: (Math.random() - 0.5) * config.speed,
        },
        config,
        brightness: 0.5 + Math.random() * 0.5, // Random brightness
        pulseDirection: Math.random() > 0.5 ? 1 : -1, // Direction of pulsing
        pulseSpeed: 0.005 + Math.random() * 0.005, // Speed of pulsing
      };
      newParticles.push(particle);
    }

    return newParticles;
  };

  // Mouse move handler
  const handleMouseMove = (event: MouseEvent) => {
    mousePosition.current = {
      x: event.clientX,
      y: event.clientY,
    };
  };

  // Animation loop
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw a slight radial gradient background for depth
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, 
      canvas.height / 2, 
      0, 
      canvas.width / 2, 
      canvas.height / 2, 
      canvas.width * 0.8
    );
    gradient.addColorStop(0, "rgba(20, 20, 35, 0.05)");
    gradient.addColorStop(1, "rgba(10, 10, 20, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Process each particle
    particles.current.forEach((particle, i) => {
      // Update brightness for pulsing effect
      particle.brightness += particle.pulseDirection * particle.pulseSpeed;
      if (particle.brightness > 1) {
        particle.brightness = 1;
        particle.pulseDirection = -1;
      } else if (particle.brightness < 0.3) {
        particle.brightness = 0.3;
        particle.pulseDirection = 1;
      }
      
      // Draw particle with pulsing
      const particleColor = particle.color.replace(
        /rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d.]+\)/,
        (_, r, g, b) => `rgba(${r}, ${g}, ${b}, ${particle.brightness})`
      );
      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particleColor;
      ctx.fill();
      
      // Add subtle glow effect
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius * 2, 0, Math.PI * 2);
      const glowColor = particleColor.replace(
        /rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d.]+\)/,
        (_, r, g, b) => `rgba(${r}, ${g}, ${b}, ${particle.brightness * 0.2})`
      );
      ctx.fillStyle = glowColor;
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

      // Mouse interaction
      if (mousePosition.current.x !== null && mousePosition.current.y !== null) {
        const dx = mousePosition.current.x - particle.x;
        const dy = mousePosition.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          // Particles move away from mouse
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (150 - distance) / 150;
          particle.velocity.x -= forceDirectionX * force * 0.3;
          particle.velocity.y -= forceDirectionY * force * 0.3;
        }
      }

      // Connect particles that are close
      particles.current.forEach((otherParticle, j) => {
        if (i === j) return;
        
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          // Calculate line opacity based on distance
          const opacity = 0.15 * (1 - distance / 120) * 
                          particle.brightness * otherParticle.brightness;
          
          ctx.beginPath();
          ctx.strokeStyle = `rgba(150, 150, 255, ${opacity})`;
          ctx.lineWidth = 0.6 * (1 - distance / 120);
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
        }
      });
    });

    animationFrameId.current = requestAnimationFrame(animate);
  };
  // Setup on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas dimensions
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Adjust particle count based on screen size
        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? 30 : 80;
        
        // Recreate particles on resize
        particles.current = createParticles(canvas, particleCount) || [];
      }
    };

    // Initialize
    handleResize();
    
    // Detect device capabilities and adjust particle count
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isLowPower = isMobile || window.innerWidth < 768;
    
    // Create initial particles with appropriate count
    const particleCount = isLowPower ? 30 : 80;
    particles.current = createParticles(canvas, particleCount) || [];

    // Start animation
    animate();

    // Add event listeners
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ backgroundColor: "#05050A" }}
    />
  );
}
