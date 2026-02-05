import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import IntroScreen from "./components/IntroScreen";
import Timeline from "./components/Timeline";
import DateQuiz, { DateQuizStatus } from "./components/DateQuiz";
import ValentineScreen from "./components/ValentineScreen";
import GameModal from "./components/GameModal";
import { launchConfetti } from "./Confetti";
import Background from "./components/Background";

const FinalPhoto = () => {
  const [errored, setErrored] = useState(false);
  return errored ? (
    <div className="final-photo-fallback">
      <span>Add <code>IMG_2556.jpg</code> to the <code>public</code> folder (convert from HEIC—browsers don’t support HEIC).</span>
    </div>
  ) : (
    <img
      src="/IMG_2556.jpg"
      alt="A recent picture of us"
      onError={() => setErrored(true)}
    />
  );
};

type Step =
  | "intro1"
  | "intro2"
  | "intro3"
  | "timeline"
  | "dateQuiz"
  | "valentine"
  | "game"
  | "final";

const INTRO_STEPS: Step[] = ["intro1", "intro2", "intro3"];
const INTRO_TEXT: Record<Step, string> = {
  intro1: "hi lakshmi",
  intro2: "i know our timeline has been a bit messy",
  intro3: "so i thought i'd recreate it",
  timeline: "",
  dateQuiz: "",
  valentine: "",
  game: "",
  final: "",
};

const INTRO_DURATION_MS = 3000;
const TIMELINE_DURATION_MS = 3000;
const TRANSITION_MS = 260;
const CORRECT_DATE_LAST = "2026-01-12";
const CORRECT_DATE_BOYFRIEND = "2023-12-19";

const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return prefersReducedMotion;
};

const formatDisplayDate = (value: string) => {
  if (!value) return "";
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return "";
  const date = new Date(year, month - 1, day);
  return date
    .toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    })
    .toLowerCase();
};

const App = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [step, setStep] = useState<Step>("intro1");
  const [prevStep, setPrevStep] = useState<Step | null>(null);
  const stepRef = useRef(step);

  const [selectedDateLast, setSelectedDateLast] = useState("");
  const [selectedDateBoyfriend, setSelectedDateBoyfriend] = useState("");
  const [dateStatusLast, setDateStatusLast] = useState<DateQuizStatus>("idle");
  const [dateStatusBoyfriend, setDateStatusBoyfriend] = useState<DateQuizStatus>("idle");
  const [noCaption, setNoCaption] = useState(false);

  useEffect(() => {
    if (stepRef.current !== step) {
      setPrevStep(stepRef.current);
      stepRef.current = step;
      const timeout = window.setTimeout(
        () => setPrevStep(null),
        prefersReducedMotion ? 0 : TRANSITION_MS
      );
      return () => window.clearTimeout(timeout);
    }
  }, [step, prefersReducedMotion]);

  useEffect(() => {
    const introIndex = INTRO_STEPS.indexOf(step);
    if (introIndex >= 0) {
      const timeout = window.setTimeout(() => {
        const next = INTRO_STEPS[introIndex + 1] ?? "dateQuiz";
        setStep(next);
      }, INTRO_DURATION_MS);
      return () => window.clearTimeout(timeout);
    }

    return undefined;
  }, [step]);

  const bothDatesCorrect =
    dateStatusLast === "correct" && dateStatusBoyfriend === "correct";

  useEffect(() => {
    if (step === "dateQuiz" && bothDatesCorrect) {
      const timeout = window.setTimeout(() => setStep("valentine"), 3000);
      return () => window.clearTimeout(timeout);
    }
    return undefined;
  }, [step, bothDatesCorrect]);

  useEffect(() => {
    if (step === "final" && !prefersReducedMotion) {
      const container = document.getElementById("confetti-layer");
      if (container) {
        return launchConfetti(container, 1400);
      }
    }
    return undefined;
  }, [step, prefersReducedMotion]);

  const handleDateLastChange = useCallback((value: string) => {
    setSelectedDateLast(value);
    if (value === CORRECT_DATE_LAST) {
      setDateStatusLast("correct");
    } else if (value) {
      setDateStatusLast("incorrect");
    } else {
      setDateStatusLast("idle");
    }
  }, []);

  const handleDateBoyfriendChange = useCallback((value: string) => {
    setSelectedDateBoyfriend(value);
    if (value === CORRECT_DATE_BOYFRIEND) {
      setDateStatusBoyfriend("correct");
    } else if (value) {
      setDateStatusBoyfriend("incorrect");
    } else {
      setDateStatusBoyfriend("idle");
    }
  }, []);

  const handleNoDisappear = useCallback(() => {
    setNoCaption(true);
  }, []);

  const lastItemDate = useMemo(
    () => (dateStatusLast === "correct" ? formatDisplayDate(CORRECT_DATE_LAST) : ""),
    [dateStatusLast]
  );
  const boyfriendItemDate = useMemo(
    () =>
      dateStatusBoyfriend === "correct"
        ? formatDisplayDate(CORRECT_DATE_BOYFRIEND)
        : "",
    [dateStatusBoyfriend]
  );
  const renderStep = (activeStep: Step) => {
    switch (activeStep) {
      case "intro1":
      case "intro2":
      case "intro3":
        return <IntroScreen text={INTRO_TEXT[activeStep]} />;
      case "timeline":
        return (
          <div className="screen-content">
            <div className="timeline-header">
              <h2>our timeline</h2>
            </div>
            <div className="glass-panel timeline-panel">
              <Timeline
                lastDate={lastItemDate}
                boyfriendDate={boyfriendItemDate}
                highlightLast={false}
              />
            </div>
          </div>
        );
      case "dateQuiz":
        return (
          <div className="screen-content">
            <div className="timeline-header">
              <h2>our timeline</h2>
            </div>
            <div className="glass-panel timeline-panel">
              <Timeline
                lastDate={lastItemDate}
                boyfriendDate={boyfriendItemDate}
                highlightLast
                highlightBoyfriend
                boyfriendExtraContent={
                  <DateQuiz
                    value={selectedDateBoyfriend}
                    status={dateStatusBoyfriend}
                    onChange={handleDateBoyfriendChange}
                    prompt="(pick the date)"
                    successMessage="wow you still remember that? you must REALLY like me."
                    min="2023-01-01"
                    max="2024-12-31"
                    ariaLabel="Pick the date when I asked to be your boyfriend"
                  />
                }
                extraContent={
                  <DateQuiz
                    value={selectedDateLast}
                    status={dateStatusLast}
                    onChange={handleDateLastChange}
                    successMessage="also known as the day you asked me if we could talk."
                  />
                }
              />
            </div>
          </div>
        );
      case "valentine":
        return (
          <ValentineScreen
            onYes={() => setStep("game")}
            onNoDisappear={handleNoDisappear}
            showCaption={noCaption}
          />
        );
      case "game":
        return (
          <ValentineScreen
            onYes={() => setStep("game")}
            onNoDisappear={handleNoDisappear}
            showCaption={noCaption}
          />
        );
      case "final":
        return (
          <div className="screen-content final-screen">
            <div className="final-copy">
              <h1>Guess I’m your Valentine now (again) 💘</h1>
              <p>I was hoping you’d catch that heart.</p>
            </div>
            <div id="confetti-layer" />
            <div className="final-photo">
              <FinalPhoto />
              <p>unfortunately this is somehow one of the more recent pictures of us #throwbackthursday</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const transitionDuration = prefersReducedMotion ? 0 : TRANSITION_MS;
  const activeScreenClass = `screen screen-active screen-${step}`;
  const backgroundVariant = step === "valentine" || step === "game" ? "valentine" : "romantic";
  const showHearts = step === "final" || step === "valentine";

  return (
    <div
      className="app"
      data-reduced-motion={prefersReducedMotion ? "true" : "false"}
      style={{ "--transition-ms": `${transitionDuration}ms` } as CSSProperties}
    >
      <Background variant={backgroundVariant} showHearts={showHearts && !prefersReducedMotion} />
      {prevStep && (
        <section className={`screen screen-exit screen-${prevStep}`}>
          {renderStep(prevStep)}
        </section>
      )}
      <section className={activeScreenClass}>{renderStep(step)}</section>
      <GameModal
        isOpen={step === "game"}
        onClose={() => setStep("valentine")}
        onWin={() => setStep("final")}
        reducedMotion={prefersReducedMotion}
      />
    </div>
  );
};

export default App;
