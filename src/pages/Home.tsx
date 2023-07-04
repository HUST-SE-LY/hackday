import Intro from "../components/Home/Intro";
import Title from "../components/Home/Title";
import logo from '../assets/logo.svg'
import blackArrow from '../assets/blackArrow.svg'
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-screen w-screen snap-y overflow-scroll snap-mandatory hide-scrollbar">
      <div className="fixed top-0 left-0 w-full h-[50px] flex items-center pr-[100px] z-[9999]">
        <img src={logo} className="h-[30px] ml-[50px]" />
        <Link className="ml-auto" to="/login">
           <div className="cursor-pointer bg-white flex gap-[0.5rem] items-center w-fit h-[30px] text-[14px] border-[1px] border-black leading-[30px] rounded-[4px] px-[0.5rem]">
          <p>登录</p>
          <img src={blackArrow} className="h-[14px]" />
        </div>
        </Link>
       
      </div>
      <Title />
      <Intro />
      
    </div>
  );
};

export default Home;
