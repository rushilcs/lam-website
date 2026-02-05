type BackgroundProps = {
  variant: "romantic" | "valentine";
  showHearts?: boolean;
};

const Background = ({ variant, showHearts = false }: BackgroundProps) => {
  return (
    <div className={`background background-${variant}`} aria-hidden="true">
      <div className="background-base" />
      <div className="background-blob blob-one" />
      <div className="background-blob blob-two" />
      <div className="background-blob blob-three" />
      {showHearts && (
        <div className="background-hearts">
          <span>❤</span>
          <span>❤</span>
          <span>❤</span>
        </div>
      )}
      <div className="background-grain" />
    </div>
  );
};

export default Background;
