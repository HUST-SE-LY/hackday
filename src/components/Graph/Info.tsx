type infoProps = {
  top: number;
  left: number;
  currentInfo: string;
  labels: string;
};

const Info = ({ top, left, labels, currentInfo }: infoProps) => {
  return (
    <div
      style={{
        top: `${top}px`,
        left: `${left}px`,
      }}
      className="absolute animate-floatingWindowIn p-[1rem] bg-white rounded-lg border shadow-xl"
    >
      <p className="mb-[1rem]">{labels}</p>
      <p className="text-sm">{currentInfo}</p>
    </div>
  );
};

export default Info;
