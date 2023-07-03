import Intro from "../components/Home/Intro";
import Title from "../components/Home/Title";

const Home = () => {
  return (
    <div className="h-screen w-screen snap-y overflow-scroll snap-mandatory hide-scrollbar">
      <div className="fixed top-0 left-0 w-full h-[50px] bg-blue-200/10 z-[9999]"></div>
      <Title />
      <Intro />
      
    </div>
  );
};

export default Home;
