import { ElementRef, useRef, useState } from "react";
import PhysicsCanvas from "./Intro/PhsicsCanvas";

const Intro = () => {
  const physicsCanvas = useRef<ElementRef<typeof PhysicsCanvas>>(null)
  const [keyWord, setKeyWord] = useState("");
  return (
    <div className=" snap-start flex justify-center items-center w-screen h-screen">
      <div className="relative w-[500px] h-[500px] flex justify-center items-center">
        <PhysicsCanvas ref={physicsCanvas} />
      </div>
      <input className="border" value={keyWord} onChange={e => setKeyWord(e.target.value)}  />    
      <button onClick={() => physicsCanvas.current?.addBox(keyWord)}>提交</button>  
    </div>
  );
};

export default Intro;
