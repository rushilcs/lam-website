import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type ValentineScreenProps = {
  onYes: () => void;
  onNoDisappear: () => void;
  showCaption: boolean;
};

const NO_LABELS = ["No", "Nope", "Not a chance", "Nice try", "lol no"];
const MARGIN = 16;

const getRangeForAttempt = (attempt: number) => {
  if (attempt <= 2) return [60, 90, 160] as const;
  if (attempt <= 5) return [120, 180, 120] as const;
  return [220, 320, 90] as const;
};

const ValentineScreen = ({ onYes, onNoDisappear, showCaption }: ValentineScreenProps) => {
  const noRef = useRef<HTMLButtonElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const yesRef = useRef<HTMLButtonElement>(null);
  const zoneRef = useRef<HTMLDivElement>(null);

  const [attempts, setAttempts] = useState(0);
  const [noPosition, setNoPosition] = useState<{ x: number; y: number } | null>(
    null
  );
  const [noHidden, setNoHidden] = useState(false);
  const [noFading, setNoFading] = useState(false);

  const label = useMemo(() => {
    if (attempts >= 6 && attempts <= 8) {
      return NO_LABELS[(attempts - 6) % NO_LABELS.length];
    }
    return "NO";
  }, [attempts]);

  const positionWithinViewport = useCallback(
    (x: number, y: number) => {
      const zone = zoneRef.current;
      const button = noRef.current;
      if (!zone) return { x, y };
      const zoneRect = zone.getBoundingClientRect();
      const width = button?.offsetWidth ?? 80;
      const height = button?.offsetHeight ?? 44;
      const maxX = zoneRect.width - width - MARGIN;
      const maxY = zoneRect.height - height - MARGIN;
      return {
        x: Math.min(Math.max(x, MARGIN), maxX),
        y: Math.min(Math.max(y, MARGIN), maxY),
      };
    },
    []
  );

  useEffect(() => {
    if (noPosition || !anchorRef.current || !noRef.current || !zoneRef.current) return;
    const anchorRect = anchorRef.current.getBoundingClientRect();
    const buttonRect = noRef.current.getBoundingClientRect();
    const yesRect = yesRef.current?.getBoundingClientRect() ?? anchorRect;
    const zoneRect = zoneRef.current.getBoundingClientRect();
    const gap = 12;
    const initial = positionWithinViewport(
      yesRect.left - zoneRect.left + yesRect.width + gap,
      yesRect.top - zoneRect.top + yesRect.height / 2 - buttonRect.height / 2
    );
    setNoPosition(initial);
  }, [noPosition, positionWithinViewport]);

  const triggerDodge = useCallback(() => {
    if (noHidden) return;
    setAttempts((prev) => {
      const nextAttempt = prev + 1;

      if (nextAttempt >= 9) {
        setNoFading(true);
        window.setTimeout(() => {
          setNoHidden(true);
          onNoDisappear();
        }, 220);
        return nextAttempt;
      }

      const [min, max] = getRangeForAttempt(nextAttempt);
      const deltaX = (Math.random() > 0.5 ? 1 : -1) * (min + Math.random() * (max - min));
      const deltaY = (Math.random() > 0.5 ? 1 : -1) * (min + Math.random() * (max - min));

      setNoPosition((current) => {
        const zone = zoneRef.current;
        const fallbackX = zone ? zone.clientWidth / 2 : window.innerWidth / 2;
        const fallbackY = zone ? zone.clientHeight / 2 : window.innerHeight / 2;
        const start = current ?? { x: fallbackX, y: fallbackY };
        return positionWithinViewport(start.x + deltaX, start.y + deltaY);
      });

      return nextAttempt;
    });
  }, [noHidden, onNoDisappear, positionWithinViewport]);

  const transitionMs = attempts >= 6 ? 90 : attempts >= 3 ? 120 : 160;
  const noStyle = {
    transform: `translate3d(${noPosition?.x ?? 0}px, ${noPosition?.y ?? 0}px, 0)`,
    ["--no-move-ms" as const]: `${transitionMs}ms`,
    opacity: noPosition ? 1 : 0,
    pointerEvents: noPosition ? "auto" : "none",
  } as const;

  return (
    <div className="valentine-screen">
      <div className="val-bg" aria-hidden="true">
        <div className="val-bg-base" />
        <div className="val-blob blob-a" />
        <div className="val-blob blob-b" />
        <div className="val-blob blob-c" />
        <div className="val-bokeh">
          {Array.from({ length: 22 }).map((_, index) => (
            <span key={index} className={`bokeh-dot bokeh-${index + 1}`}>
              ❤
            </span>
          ))}
        </div>
        <div className="val-noise" />
      </div>
      <div className="val-decor-ring" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, index) => (
          <span key={index} className={`ring-heart ring-${index + 1}`}>
            ❤
          </span>
        ))}
      </div>
      <div className="val-decor teddy" aria-hidden="true">
        <svg viewBox="0 0 120 120" role="presentation">
          <circle cx="35" cy="30" r="14" fill="#f6d2b5" />
          <circle cx="85" cy="30" r="14" fill="#f6d2b5" />
          <circle cx="60" cy="60" r="32" fill="#f2c6a3" />
          <circle cx="50" cy="55" r="4" fill="#56392d" />
          <circle cx="70" cy="55" r="4" fill="#56392d" />
          <ellipse cx="60" cy="66" rx="8" ry="6" fill="#f9e2cf" />
          <path d="M56 70c4 4 8 4 12 0" stroke="#56392d" strokeWidth="2" fill="none" />
          <path
            d="M45 82c6-6 24-6 30 0 0 10-6 20-15 20s-15-10-15-20z"
            fill="#ff7aa6"
          />
          <path d="M49 88h22" stroke="#fff" strokeWidth="2" opacity="0.7" />
        </svg>
      </div>
      <div className="val-decor roses" aria-hidden="true">
        <svg viewBox="0 0 140 120" role="presentation">
          <circle cx="40" cy="40" r="16" fill="#fff" />
          <circle cx="70" cy="30" r="16" fill="#fff" />
          <circle cx="95" cy="50" r="16" fill="#fff" />
          <circle cx="55" cy="60" r="16" fill="#fff" />
          <circle cx="85" cy="70" r="16" fill="#fff" />
          <circle cx="40" cy="40" r="8" fill="#ffd7e5" />
          <circle cx="70" cy="30" r="8" fill="#ffd7e5" />
          <circle cx="95" cy="50" r="8" fill="#ffd7e5" />
          <circle cx="55" cy="60" r="8" fill="#ffd7e5" />
          <circle cx="85" cy="70" r="8" fill="#ffd7e5" />
        </svg>
      </div>
      <div className="valentine-card">
        <div className="val-card-inner">
          <h1>Will you be my Valentine?</h1>
          <span className="val-underline" aria-hidden="true" />
          <div className="buttons-area" ref={anchorRef}>
            <button className="btn btn-primary" onClick={onYes} ref={yesRef}>
              YES
            </button>
            <span className="no-slot" aria-hidden="true" />
          </div>
          {showCaption && <p className="valentine-caption">okay you’re persistent 😭</p>}
        </div>
      </div>
      {!noHidden && (
        <div className="val-btn-zone" ref={zoneRef}>
          <button
            ref={noRef}
            className={`btn btn-secondary no-button ${noFading ? "no-fade" : ""}`}
            style={noStyle}
            onPointerEnter={triggerDodge}
            onPointerDown={(event) => {
              event.preventDefault();
              triggerDodge();
            }}
            onClick={(event) => event.preventDefault()}
            aria-label="No"
          >
            {label}
          </button>
        </div>
      )}
    </div>
  );
};

export default ValentineScreen;
