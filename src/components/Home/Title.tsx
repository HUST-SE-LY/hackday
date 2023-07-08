import title from "../../assets/title.svg";
import title1 from "../../assets/title1.svg";
import title2 from "../../assets/title2.svg";
import imageA from "../../assets/imageA.png";
import imageB from "../../assets/imageB.png";
import arrow from "../../assets/titleArrow.svg";
import { Link } from "react-router-dom";

const Title = () => {
  return (
    <div className="snap-start relative justify-center items-center flex w-screen h-screen">
      <div className=" animate-titleMove">
        <img src={title} className=" origin-bottom animate-title0In h-[10vh]" />
        <div className="flex mt-[2rem] gap-[2rem]">
          <img
            src={title1}
            className="origin-bottom opacity-0 animate-title1In h-[10vh]"
          />
          <img
            src={title2}
            className="origin-bottom opacity-0 animate-title2In h-[10vh]"
          />
        </div>
      </div>
      <img
        src={imageA}
        className="w-[25vw] opacity-0 animate-imageIn absolute left-[35%] bottom-[5%] z-[10]"
      />
      <img
        src={imageB}
        className="absolute animate-imageIn opacity-0 h-[70vh] right-[7%] bottom-[15%] z-[9]"
        alt=""
      />
      <Link to={"/graph"}>
        <div className="absolute animate-buttonIn opacity-0 flex cursor-pointer justify-center group items-center left-[8vw] bottom-[10rem] bg-black rounded-full w-[20rem] h-[6rem]">
          <div className="h-[3rem] overflow-hidden hover:text-black relative w-[12rem] rounded-full border-white border-[1px] text-center text-white text-[24px] leading-[3rem] font-light before:w-[0] before:transition-all before:bg-white before:absolute before:top-0 before:left-0 before:hover:w-full before:h-full">
            <p className="absolute z-[999] top-[0] left-[1rem] w-[10rem] h-[3rem] transition-all tracking-tight font-mono">
              Let's Start
            </p>
          </div>
          <div className="rounded-full w-[3rem] flex items-center justify-center h-[3rem] group-hover:animate-ping bg-white ">
            <img src={arrow} className="w-[1rem]" alt="" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Title;
