import { useEffect, useRef } from "react";

type GameModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onWin: () => void;
  reducedMotion: boolean;
};

const MAX_SPEED = 520;
const SPEED_GROWTH = 1.06;
const SPEED_INTERVAL_MS = 1200;

const GameModal = ({ isOpen, onClose, onWin, reducedMotion }: GameModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<HTMLButtonElement>(null);
  const rafRef = useRef<number>();
  const speedTimerRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const velocityRef = useRef({ x: 220, y: 180 });
  const positionRef = useRef({ x: 40, y: 40 });

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "Tab" && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKey);
    const closeButton = modalRef.current?.querySelector<HTMLButtonElement>(".modal-close");
    closeButton?.focus();
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const panel = panelRef.current;
    const heart = heartRef.current;
    if (!panel || !heart) return;

    const resetPosition = () => {
      const panelRect = panel.getBoundingClientRect();
      const heartRect = heart.getBoundingClientRect();
      positionRef.current = {
        x: (panelRect.width - heartRect.width) / 2,
        y: (panelRect.height - heartRect.height) / 2,
      };
      velocityRef.current = {
        x: 360 + Math.random() * 80,
        y: 300 + Math.random() * 80,
      };
      lastTimeRef.current = performance.now();
      heart.style.transform = `translate(${positionRef.current.x}px, ${positionRef.current.y}px)`;
    };

    resetPosition();

    speedTimerRef.current = window.setInterval(() => {
      const { x, y } = velocityRef.current;
      const nextX = Math.sign(x || 1) * Math.min(Math.abs(x) * SPEED_GROWTH, MAX_SPEED);
      const nextY = Math.sign(y || 1) * Math.min(Math.abs(y) * SPEED_GROWTH, MAX_SPEED);
      velocityRef.current = { x: nextX, y: nextY };
    }, SPEED_INTERVAL_MS);

    const animate = (time: number) => {
      const delta = Math.min((time - lastTimeRef.current) / 1000, 0.03);
      lastTimeRef.current = time;

      const panelRect = panel.getBoundingClientRect();
      const heartRect = heart.getBoundingClientRect();
      const maxX = panelRect.width - heartRect.width;
      const maxY = panelRect.height - heartRect.height;

      let nextX = positionRef.current.x + velocityRef.current.x * delta;
      let nextY = positionRef.current.y + velocityRef.current.y * delta;

      if (nextX <= 0 || nextX >= maxX) {
        velocityRef.current.x *= -1;
        nextX = Math.max(0, Math.min(maxX, nextX));
      }

      if (nextY <= 0 || nextY >= maxY) {
        velocityRef.current.y *= -1;
        nextY = Math.max(0, Math.min(maxY, nextY));
      }

      positionRef.current = { x: nextX, y: nextY };
      heart.style.transform = `translate(${nextX}px, ${nextY}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const handleResize = () => resetPosition();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (speedTimerRef.current) window.clearInterval(speedTimerRef.current);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={`modal-backdrop ${reducedMotion ? "reduced" : ""}`}>
      <div className="modal-panel glass-panel" ref={modalRef} role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <h2>Catch the Heart</h2>
        <p>Tap the heart to win.</p>
        <div className="game-panel" ref={panelRef}>
          <button
            className="game-heart"
            ref={heartRef}
            onClick={onWin}
            onPointerDown={(event) => {
              event.preventDefault();
              onWin();
            }}
            aria-label="Heart"
          >
            ♥
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameModal;
