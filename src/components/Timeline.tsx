import type { ReactNode } from "react";

type TimelineItem = {
  label: string;
  date: string;
  isPicker?: boolean;
};

type TimelineProps = {
  lastDate?: string;
  boyfriendDate?: string;
  highlightLast?: boolean;
  highlightBoyfriend?: boolean;
  compact?: boolean;
  extraContent?: ReactNode;
  boyfriendExtraContent?: ReactNode;
};

const Timeline = ({
  lastDate,
  boyfriendDate,
  compact = false,
  extraContent,
  boyfriendExtraContent,
}: TimelineProps) => {
  const items: TimelineItem[] = [
    { label: "first time we met", date: "nov 25, 2023" },
    { label: "first time we kissed", date: "nov 25, 2023" },
    {
      label: "when i asked to be your boyfriend",
      date: boyfriendDate ?? "(pick the date)",
    },
    { label: "first time we stayed together", date: "jan 13, 2024" },
    { label: "we broke up\n(oops my bad)", date: "—" },
    { label: "it got messy", date: "(for about two years)" },
    {
      label: "we started talking again",
      date: lastDate || "(pick the date)",
      isPicker: true,
    },
  ];

  return (
    <div className={`timeline timeline-diagram ${compact ? "timeline-compact" : ""}`}>
      <div className="timeline-axis" aria-hidden="true" />
      <div
        className="timeline-nodes"
        style={{ ["--node-count" as const]: items.length }}
      >
        {items.map((item, index) => {
          const isAbove = index % 2 === 0;
          const isLast = index === items.length - 1;
          const isBoyfriend = index === 2;
          const delay = `${index * 50}ms`;
          return (
            <div
              key={item.label}
              className={`timeline-node ${isAbove ? "above" : "below"} ${
                isLast ? "special" : ""
              } ${isBoyfriend ? "boyfriend" : ""}`}
              style={{ ["--item-delay" as const]: delay }}
            >
              <div className="timeline-connector" aria-hidden="true" />
              <div className="timeline-capsule">
                <span className="timeline-label">{item.label}</span>
                <span className="timeline-date">{item.date}</span>
                {index === 2 && boyfriendExtraContent && (
                  <div className="timeline-extra">{boyfriendExtraContent}</div>
                )}
                {item.isPicker && extraContent && (
                  <div className="timeline-extra">{extraContent}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
