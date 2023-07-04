import { ElementRef, useEffect, useRef, useState } from "react";
import PhysicsCanvas from "./Intro/PhsicsCanvas";
import rightArrow from "../../assets/rightArrow.svg";


const Intro = () => {
  const physicsCanvas = useRef<ElementRef<typeof PhysicsCanvas>>(null);
  const [keyWord, setKeyWord] = useState("");
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(container.current) {
      const observer = new IntersectionObserver((entries) => {
        if(entries[0].intersectionRatio > 0) {
          console.log("ok")
          if (physicsCanvas.current) {
            physicsCanvas.current.addBox("疯狂星期四");
            setTimeout(() => {
              if (physicsCanvas.current) {
                physicsCanvas.current.addBox("肯德基");
                physicsCanvas.current.addBox("麦当劳");
                physicsCanvas.current.addBox("华莱士");
              }
            }, 1000);
            observer.disconnect();
          }
        }
      },{
        threshold: [0,0.1,0.2]
      })
      observer.observe(container.current)
    }
  },[])
  function submit() {
    keyWord && physicsCanvas.current?.addBox(keyWord);
    setKeyWord("");
  }

  return (
    <div ref={container} className=" snap-start flex w-screen h-screen">
      <div className="relative w-[900px] flex-shrink-0  h-[full] flex justify-center items-center">
        <PhysicsCanvas ref={physicsCanvas} />
      </div>
      <div className="bg-black animate-floatIn opacity-0 p-[2rem] pt-[5rem] m-[2rem] rounded-2xl gap-[5rem] flex justify-center flex-col items-center self-center  h-fit ml-[auto] w-full">
        <div className="flex items-center">
          <input
            value={keyWord}
            onChange={(e) => setKeyWord(e.target.value)}
            className="block text-lg w-[20rem] h-[3rem] rounded-full outline-none pl-[2rem] "
            placeholder="测试关键词"
            type="text"
          />
          <button
            onClick={() => {
              submit();
            }}
            className="flex justify-center items-center bg-[#4318FF] h-[3rem] w-[4rem] rounded-full"
          >
            <img className=" scale-50" src={rightArrow} />
          </button>
        </div>
        <p className="text-white leading-[2rem] w-[24rem] text-lg">
          测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字
        </p>
      </div>
    </div>
  );
};

export default Intro;
