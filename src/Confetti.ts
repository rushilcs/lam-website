type ConfettiPiece = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
};

const COLORS = ["#ff4d6d", "#ffd166", "#ff9f1c", "#ffe5ec", "#ff758f"];

export const launchConfetti = (container: HTMLElement, durationMs: number) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  canvas.className = "confetti-canvas";
  container.appendChild(canvas);

  const resize = () => {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
  };
  resize();
  window.addEventListener("resize", resize);

  const pieces: ConfettiPiece[] = Array.from({ length: 120 }).map(() => ({
    x: Math.random() * canvas.width,
    y: -Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 120,
    vy: 160 + Math.random() * 220,
    size: 6 + Math.random() * 6,
    rotation: Math.random() * Math.PI,
    rotationSpeed: (Math.random() - 0.5) * 4,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }));

  const start = performance.now();
  let raf = 0;

  const render = (time: number) => {
    const elapsed = time - start;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach((piece) => {
      piece.x += piece.vx * 0.016;
      piece.y += piece.vy * 0.016;
      piece.rotation += piece.rotationSpeed * 0.016;
      if (piece.y > canvas.height + 20) {
        piece.y = -20;
        piece.x = Math.random() * canvas.width;
      }
      ctx.save();
      ctx.translate(piece.x, piece.y);
      ctx.rotate(piece.rotation);
      ctx.fillStyle = piece.color;
      ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size * 0.6);
      ctx.restore();
    });

    if (elapsed < durationMs) {
      raf = requestAnimationFrame(render);
    } else {
      cleanup();
    }
  };

  const cleanup = () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
    canvas.remove();
  };

  raf = requestAnimationFrame(render);
  return cleanup;
};
