import { Link } from "react-router-dom";
import developedBy from "/src/assets/developedBy.svg"
import team from "/src/assets/team.svg"
import arrow from "../../assets/titleArrow.svg";

const Last = () => {
  return <div className="snap-start items-center flex relative w-screen h-screen">
    <div className="flex m-[auto] w-fit gap-[2rem]">
      <img className="w-[40vw]" src={developedBy} />
      <img className="w-[20vw]" src={team} />
      <Link to={"/graph"}>
        <div className=" flex cursor-pointer justify-center group items-center left-[3rem] bottom-[10rem] bg-black rounded-full w-[20rem] h-[6rem]">
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
  </div>
}

export default Last;