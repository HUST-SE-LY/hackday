import { observer } from "mobx-react-lite";
import loginStore from "../../stores/login";
import countStore from "../../stores/count";
import Count from "../../components/Home/Count";

const Home = observer(() => {
  return (
    <div className="w-screen h-screen flex flex-col gap-[10px] justify-center items-center">
      <div>Login state: {loginStore.isLogin ? "login" : "logout"}</div>
      <Count />
      <button
        className="w-fit h-fit bg-blue-300 rounded-full px-[2rem] py-[0.5rem] shadow-lg transition-all hover:bg-blue-600 hover:text-white hover:shadow-xl"
        onClick={() => loginStore.login()}
      >
        login
      </button>
      <button
        className="w-fit h-fit bg-blue-300 rounded-full px-[2rem] py-[0.5rem] shadow-lg transition-all hover:bg-blue-600 hover:text-white hover:shadow-xl"
        onClick={() => countStore.add()}
      >
        add
      </button>
      <button
        className="w-fit h-fit bg-blue-300 rounded-full px-[2rem] py-[0.5rem] shadow-lg transition-all hover:bg-blue-600 hover:text-white hover:shadow-xl"
        onClick={() => countStore.minus()}
      >
        minus
      </button>
    </div>
  );
});

export default Home;
