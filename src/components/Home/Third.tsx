import serviceProspect from "/src/assets/serviceProspect.svg";
import serviceProspectTitle from "/src/assets/serviceProspectTitle.svg";
import thirdImg from '/src/assets/thirdImg.svg'

const Third = () => {
  return (
    <div className="snap-start relative justify-center items-center bg-black flex w-screen h-screen">
      <div className="absolute z-[10] w-[30vw] top-[20%] left-[10%]">
        <img className="w-[30vw]" src={serviceProspect} />
        <img className="w-[8vw] mt-[3rem]" src={serviceProspectTitle} />
        <p className="text-white w-[27vw] mt-[10vh] leading-[48px] text-xl">
        Aidea是您的有力助手，帮助您发现新的思路、独特的观点和创新的解决方案。利用脑图生成功能，您可以快速将您的想法和概念以图形的形式呈现出来，将灵感可视化，帮助您更直观地理解关系和层次，使思路更加清晰明了。
        </p>

      </div>
      <div className="absolute bottom-[10vh] z-10 w-[40vw] h-[70vh] left-[50vw]">
        <video className="h-[60vh] border rounded-xl w-[30vh] z-10 object-cover absolute left-[0] top-[0] " muted loop autoPlay src="/video.mp4"></video>
      <img className="absolute w-[25vw] bottom-[5vh]  z-0 left-[28vh]" src={thirdImg} />
      </div>
      
    </div>
  );
};

export default Third;
