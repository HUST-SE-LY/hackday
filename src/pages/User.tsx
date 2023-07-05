import { observer } from "mobx-react-lite";
import logo from "../assets/logo.svg";
import modify from "../assets/modify.svg";
import Input from "../components/Login/Input";
import { useState } from "react";
import Book from "../components/Login/Book";

const User = observer(() => {
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  return (
    <div className="w-screen h-screen">
      <div className="h-[50px] w-full flex items-center pr-[100px] z-[9999]">
        <img src={logo} className="h-[30px] ml-[50px]" />
      </div>
      <div className="grid gap-[5rem] grid-cols-2 p-[5rem] w-full">
        <div className="max-w-[30rem]">
          <img src={modify} className="h-[8rem] animate-title0In origin-bottom" />
          <div className="mt-[3rem] opacity-0 animate-floatIn w-full h-fit p-[4rem] border-[2px] border-black rounded-[12px]">
            <div className="flex pb-[0.5rem] mb-[1rem] text-lg relative gap-[3em]">
              <div
                className="w-[5em] text-lg cursor-pointer"
              >
                验证码登录
              </div>
            </div>
            <div className="flex flex-nowrap overflow-hidden">
              <div className={`w-[200%] flex flex-shrink-0 transition-all`}>
                <div className={`w-1/2 flex-shrink-0 py-[1rem]`}>
                  <Input
                    isError={false}
                    content={password}
                    onSetContent={setPassword}
                    type="text"
                    placeholder="请输入密码"
                  />
                  <div className="flex gap-[1rem]  w-full mt-[2rem]">
                    <Input
                      isError={false}
                      content={secondPassword}
                      onSetContent={setSecondPassword}
                      type="password"
                      placeholder="请再次输入密码"
                    />
                  </div>
                  <button className="w-full bg-black text-white text-center py-[0.8rem] mt-[2rem] rounded-full">
                    确认修改
                  </button>
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

export default User;