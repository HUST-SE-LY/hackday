type infoProps = {
  top: number;
  left: number;
  currentInfo: string;
};

const Info = ({ top, left, currentInfo }: infoProps) => {
  return (
    <div
      style={{
        top: `${top}px`,
        left: `${left}px`,
      }}
      className="absolute animate-floatingWindowIn p-[1rem] bg-white rounded-lg border shadow-xl"
    >
      <p className="mb-[1rem]">关联总结：</p>
      <p className="text-sm">{currentInfo}</p>
    </div>
  );
};

export default Info;
