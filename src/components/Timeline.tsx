import type { ReactNode } from "react";

type TimelineItem = {
  label: string;
  date: string;
};

const BASE_ITEMS: TimelineItem[] = [
  { label: "first time we met", date: "nov 25, 2023" },
  { label: "first time we kissed", date: "nov 25, 2023" },
  { label: "when i asked to be your boyfriend", date: "dec 19, 2023" },
  { label: "first time we stayed together", date: "jan 13, 2024" },
  { label: "we broke up (oops my bad)", date: "—" },
  { label: "it got messy", date: "(for about two years)" },
];

type TimelineProps = {
  lastDate?: string;
  highlightLast?: boolean;
  compact?: boolean;
  extraContent?: ReactNode;
};

const Timeline = ({
  lastDate,
  highlightLast = false,
  compact = false,
  extraContent,
}: TimelineProps) => {
  const items = [
    ...BASE_ITEMS,
    {
      label: "we started talking again",
      date: lastDate || "(pick the date)",
    },
  ];

  return (
    <div className={`timeline ${compact ? "timeline-compact" : ""}`}>
      <div className="timeline-line" aria-hidden="true" />
      <ul>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const highlight = highlightLast && isLast;
          const delay = `${index * 80}ms`;
          return (
            <li
              key={item.label}
              className={`timeline-item ${highlight ? "highlight" : ""}`}
              style={{ ["--item-delay" as const]: delay }}
            >
              <div className="timeline-dot" aria-hidden="true" />
              <div className="timeline-card">
                <div className="timeline-content">
                  <span className="timeline-label">{item.label}</span>
                  <span className={`timeline-date ${isLast && !lastDate ? "muted-italic" : ""}`}>
                    {item.date}
                  </span>
                </div>
                {isLast && extraContent && <div className="timeline-extra">{extraContent}</div>}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Timeline;
