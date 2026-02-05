export type DateQuizStatus = "idle" | "incorrect" | "correct";

type DateQuizProps = {
  value: string;
  status: DateQuizStatus;
  onChange: (value: string) => void;
  prompt?: string;
  successMessage?: string;
  min?: string;
  max?: string;
  ariaLabel?: string;
};

const DateQuiz = ({
  value,
  status,
  onChange,
  prompt = "pick the date we started talking again",
  successMessage = "okay yeah 🥺",
  min = "2025-01-01",
  max = "2026-12-31",
  ariaLabel = "Pick the date we started talking again",
}: DateQuizProps) => {
  return (
    <div className="date-quiz" aria-live="polite">
      <p className="date-quiz-prompt">{prompt}</p>
      <label className="date-input-pill">
        <span className="date-input-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path
              d="M7 2v2M17 2v2M3.5 8.5h17M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <input
          type="date"
          min={min}
          max={max}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-label={ariaLabel}
        />
      </label>
      {status === "incorrect" && (
        <span className="date-quiz-status">hmm… try again :)</span>
      )}
      {status === "correct" && (
        <span className="date-quiz-status success">{successMessage}</span>
      )}
    </div>
  );
};

export default DateQuiz;
