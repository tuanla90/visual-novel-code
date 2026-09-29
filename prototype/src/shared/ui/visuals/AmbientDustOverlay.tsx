import { memo, useMemo } from 'react';
import './ambient-dust.css';

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  opacity: number;
}

/**
 * Hiệu ứng hạt bụi sáng lơ lửng (Ambient Dust Motes / Sunlight Particles) trong bối cảnh Visual Novel.
 * Tạo chiều sâu không gian điện ảnh cho phòng CLB và giảng đường đại học Hoa Phượng.
 * Hiệu năng cao (CSS GPU-accelerated), tự động tắt khi người dùng bật prefers-reduced-motion.
 */
export const AmbientDustOverlay = memo(function AmbientDustOverlay() {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.round(5 + (i * 5.2 + (i % 3) * 7) % 90),
      top: Math.round(10 + (i * 7.8 + (i % 4) * 11) % 80),
      size: 2 + (i % 3) * 1.5,
      duration: 10 + (i % 5) * 3,
      delay: -(i * 1.6),
      driftX: -20 + (i % 7) * 8,
      opacity: 0.2 + (i % 4) * 0.12,
    }));
  }, []);

  return (
    <div className="ambient-dust" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="ambient-dust__mote"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            ['--drift-x' as string]: `${p.driftX}px`,
          }}
        />
      ))}
    </div>
  );
});
