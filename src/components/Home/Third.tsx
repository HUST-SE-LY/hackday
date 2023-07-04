import serviceProspect from "/src/assets/serviceProspect.svg";
import serviceProspectTitle from "/src/assets/serviceProspectTitle.svg";

const Third = () => {
  return (
    <div className="snap-start relative justify-center items-center bg-black flex w-screen h-screen">
      <div className="absolute z-[10] w-[30vw] top-[20%] left-[10%]">
        <img className="w-[30vw]" src={serviceProspect} />
        <img className="w-[8vw] mt-[3rem]" src={serviceProspectTitle} />
        <p className="text-white w-[25vw] mt-[10vh] leading-[48px] text-xl">
          在这里写一些描述文字在这里写一些描述文字在这里写一些描述文字在这里写一些描述文字在这里写一些描述文字在这里写一些描述
        </p>
        <p className="text-white w-[25vw] mt-[10vh] leading-[48px] text-xl">
          在这里写一些描述文字在这里写一些描述文字在这里写一些描述文字在这里写一些描述
        </p>
      </div>
      <video className="h-[60vh] absolute left-[30vw] bottom-[20vh] " muted loop autoPlay src="/video.mp4"></video>

      <img src="" />
    </div>
  );
};

export default Third;
