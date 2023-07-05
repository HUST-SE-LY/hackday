import serviceProspect from "/src/assets/serviceProspect.svg";
import serviceProspectTitle from "/src/assets/serviceProspectTitle.svg";
import thirdImg from '/src/assets/thirdImg.svg'

const Third = () => {
  return (
    <div className="snap-start relative justify-center items-center bg-black flex w-screen h-screen">
      <div className="absolute z-[10] w-[30vw] top-[20%] left-[10%]">
        <img className="w-[30vw]" src={serviceProspect} />
        <img className="w-[8vw] mt-[3rem]" src={serviceProspectTitle} />
        <p className="text-white w-[25vw] mt-[10vh] leading-[48px] text-xl">
        生成脑图，让灵感可视，思路更清晰
        </p>

      </div>
      <div className="absolute bottom-[10vh] z-10 w-[40vw] h-[70vh] left-[50vw]">
        <video className="h-[60vh] border rounded-xl w-[30vh] z-10 object-cover absolute left-[0] top-[0] " muted loop autoPlay src="/video.mp4"></video>
      <img className="absolute w-[30vh] bottom-[5vh]  z-0 left-[28vh]" src={thirdImg} />
      </div>
      
    </div>
  );
};

export default Third;
