type IntroScreenProps = {
  text: string;
};

const IntroScreen = ({ text }: IntroScreenProps) => {
  return (
    <div className="intro-screen">
      <h1>{text}</h1>
    </div>
  );
};

export default IntroScreen;
