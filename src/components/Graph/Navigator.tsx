import graphStore from "../../stores/graph";
import logoInGraph from "/src/assets/logoInGraph.svg";
import uploadSvg from "/src/assets/upload.svg";
import uploadBlackSvg from "/src/assets/uploadBlack.svg";
import linkBlackSvg from "/src/assets/linkBlack.svg";
import linkSvg from "/src/assets/link.svg";
import { observer } from "mobx-react-lite";
import avatar from "/src/assets/avatar.svg";
import mindMapSvg from '/src/assets/modeMindmap.svg'
import dendrogramSvg from '/src/assets/modeDendrogram.svg'
type navigatorProps = {
  changeMode: () => void;
};

const Navigator = observer(({ changeMode }: navigatorProps) => {
  return (
    <div className="bg-black w-full basis-[3rem] flex items-center gap-[1rem]">
      <img src={logoInGraph} alt="" className="h-[2rem] ml-[50px]" />
      <div className="flex-auto text-center text-lg text-neutral-300">
        画布名
      </div>
      <div className="rounded-lg flex justify-center items-center relative w-[2rem] h-[2rem] transition-all bg-white group hover:bg-indigo-600 cursor-pointer">
        <img
          src={uploadBlackSvg}
          className="w-[1.5rem] group-hover:hidden"
          alt=""
        />
        <img src={uploadSvg} className="w-[1.5rem] hidden group-hover:block" />
        <div className={"absolute right-0 top-[100%] w-36 h-2"}></div>
        <div
          className={
            "absolute top-[calc(100%_+_8px)]  right-0 w-36 bg-white rounded shadow-md flex flex-col gap-[0.5rem] items-center py-2 invisible group-hover:visible"
          }
        >
          <div className="flex-auto text-center px-4 py-1 rounded hover:bg-gray-200">
            导出为PNG
          </div>
          <img src="/src/assets/divideLine.svg" alt="" />
          <div className="flex-auto text-center px-4 py-1 rounded hover:bg-gray-200">
            导出为PDF
          </div>
        </div>
      </div>
      <div className="rounded-lg w-[2rem] group h-[2rem] flex justify-center items-center bg-white hover:bg-indigo-600 cursor-pointer">
        <img
          src={linkBlackSvg}
          className="w-[1.5rem] group-hover:hidden"
          alt=""
        />
        <img src={linkSvg} className="w-[1.5rem] hidden group-hover:block" />
      </div>
      <div
        className="rounded-full bg-zinc-500 w-[4rem] h-[2rem] relative cursor-pointer"
        onClick={() => {
          changeMode();
        }}
      >
        <div
          className={`flex justify-center items-center rounded-full bg-white w-[1.5rem] h-[1.5rem] absolute left-1.5 top-[4px] transition-transform duration-700 ease-out ${
            graphStore.currentMode === "mindmap"
              ? ""
              : "  translate-x-[1.75rem]"
          }`}
        >
          <img
            src={mindMapSvg}
            alt=""
            className={
              "w-[1.5rem] h-[1.5rem] translate-y-[2px]" +
              (graphStore.currentMode === "mindmap" ? "" : " hidden")
            }
          />
          <img
            src={dendrogramSvg}
            alt=""
            className={
              "w-[1.5rem] h-[1.5rem] translate-y-[2px]" +
              (graphStore.currentMode === "mindmap" ? " hidden" : "")
            }
          />
        </div>
      </div>
      <div className="rounded-full w-[2rem] h-[2rem] cursor-pointer">
        <img src={avatar} alt="" />
      </div>
      <div className="w-[2rem]"></div>
    </div>
  );
});

export default Navigator;
