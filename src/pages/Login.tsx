import { observer } from "mobx-react-lite";
import logo from "../assets/logo.svg";
import signIn from "../assets/signIn.svg";
import Input from "../components/Login/Input";
import { useState } from "react";
import Book from "../components/Login/Book";
enum Method {
  verifyLogin = 0,
  passwordLogin,
}
const Login = observer(() => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [verify, setVerify] = useState("");
  const [method, setMethod] = useState(Method.verifyLogin);
  return (
    <div className="w-screen h-screen">
      <div className="h-[50px] w-full flex items-center pr-[100px] z-[9999]">
        <img src={logo} className="h-[30px] ml-[50px]" />
      </div>
      <div className="grid gap-[5rem] grid-cols-2 p-[5rem] w-full">
        <div className="">
          <img src={signIn} className="h-[8rem] animate-title0In origin-bottom" />
          <div className="mt-[3rem] opacity-0 animate-floatIn w-full h-fit p-[4rem] border-[2px] border-black rounded-[12px]">
            <div className="flex pb-[0.5rem] mb-[1rem] text-lg relative gap-[3em]">
              <div
                onClick={() => setMethod(Method.verifyLogin)}
                className="w-[5em] text-lg cursor-pointer"
              >
                验证码登录
              </div>
              <div
                onClick={() => setMethod(Method.passwordLogin)}
                className="w-[4em] text-lg cursor-pointer"
              >
                密码登录
              </div>
              <div
                className={`absolute transition-all bottom-0 h-[2px] left-0 text-lg w-[5em] bg-black z-[1] ${
                  method === Method.passwordLogin ? "w-[4em] left-[8em]" : ""
                } `}
              ></div>
            </div>
            <div className="flex flex-nowrap overflow-hidden">
              <div className={`w-[200%] flex flex-shrink-0 transition-all ${method === Method.verifyLogin? " translate-x-0":" translate-x-[-50%]"}`}>
                <div className={`w-1/2 flex-shrink-0 py-[1rem]`}>
                  <Input
                    isError={isNaN(Number(phone))}
                    content={phone}
                    onSetContent={setPhone}
                    type="text"
                    placeholder="请输入手机号码"
                  />
                  <div className="flex gap-[1rem]  w-full mt-[2rem]">
                    <Input
                      isError={verify.length > 0 && verify.length < 6}
                      content={verify}
                      onSetContent={setVerify}
                      type="text"
                      placeholder="请输入验证码"
                    />
                    <button className="bg-black flex-shrink-0 text-white rounded-full ml-[auto] px-[1rem] w-fit">
                      获取验证码
                    </button>
                  </div>
                  <button className="w-full bg-black text-white text-center py-[0.8rem] mt-[2rem] rounded-full">
                    立即登录
                  </button>
                  <p className="text-[12px] text-gray-400 mt-[1rem]">
                    *未注册的手机号码验证后将自动创建账号
                  </p>
                </div>
                <div className={`w-1/2 flex-shrink-0 py-[1rem]`}>
                  <Input
                    isError={isNaN(Number(phone))}
                    content={phone}
                    onSetContent={setPhone}
                    type="text"
                    placeholder="请输入手机号码"
                  />
                  <div className="flex gap-[1rem]  w-full mt-[2rem]">
                    <Input
                      isError={false}
                      content={password}
                      onSetContent={setPassword}
                      type="password"
                      placeholder="请输入密码"
                    />
                  </div>
                  <button className="w-full bg-black text-white text-center py-[0.8rem] mt-[2rem] rounded-full">
                    立即登录
                  </button>
                  <p className="text-[12px] text-gray-400 mt-[1rem]">
                    *未注册的手机号码验证后将自动创建账号
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Book />
      </div>
    </div>
  );
});

export default Login;
