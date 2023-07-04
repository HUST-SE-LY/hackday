import graphStore from "../../stores/graph";
import {useState, useEffect} from "react"


const Navigator = ({changeMode}) => {
  const [currentMode, setCurrentMode] = useState(graphStore.currentMode);
  const [isExportBtnHover, setIsExortBtnHover] = useState(false);
  const btnClassName = "rounded-full bg-white w-10 h-10 absolute left-1.5 top-1 transition-transform duration-700 ease-out" + 
  (currentMode === 'mindmap' ? '' : '  translate-x-[2.75rem]');
  return (
    <div className="bg-zinc-800 w-full basis-20 flex items-center gap-[1rem]">
      <img src='/src/assets/logoInGraph.svg' alt="" className="h-[50px] ml-[50px]" />
      <div className="flex-auto text-center text-white text-lg text-neutral-300">画布名</div>
      <div 
      className="rounded-lg w-12 h-12 bg-white hover:bg-indigo-600 cursor-pointer" 
      onMouseEnter={()=>{
        setIsExortBtnHover(!isExportBtnHover)
      }}
      onMouseLeave={()=>{
        setIsExortBtnHover(!isExportBtnHover)
      }}
      >
        <svg width="42" height="42" viewBox="-6 -6 42 42" xmlns="http://www.w3.org/2000/svg" className={"w-12 h-12" + (isExportBtnHover ? " fill-white" : " fill-black")}>
          <g clip-path="url(#clip0_35_119)">
            <path d="M18.4615 7.62654L16.8777 9.21037L15.1043 7.43693V19.8957H12.8958V7.43693L11.1224 9.21037L9.53857 7.62654L14 3.16504L18.4615 7.62654ZM24.835 13.2034V22.6044C24.835 23.8314 23.8312 24.8352 22.6043 24.8352H5.39577C4.15772 24.8352 3.16504 23.8314 3.16504 22.6044V13.2034C3.16504 11.9654 4.15772 10.9727 5.39577 10.9727H10.6539V13.2034H5.39577V22.6044H22.6043V13.2034H17.3461V10.9727H22.6043C23.8312 10.9727 24.835 11.9654 24.835 13.2034Z" />
          </g>
          <defs>
            <clipPath id="clip0_35_119">
              <rect width="28" height="28" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <div className={"relative right-24 w-36 h-2" + (isExportBtnHover ? "" : " invisible")}></div>
        <div className={"relative right-24 w-36 bg-white rounded shadow-md flex flex-col gap-[0.5rem] items-center py-2" + (isExportBtnHover ? "" : " invisible")}>
          <div className="flex-auto text-center px-4 py-1 rounded hover:bg-gray-200">导出为PNG</div>
          <img src="/src/assets/divideLine.svg" alt="" />
          <div className="flex-auto text-center px-4 py-1 rounded hover:bg-gray-200">导出为PDF</div>
        </div>
      </div>
      <div className="rounded-lg w-12 h-12 bg-white hover:bg-indigo-600 cursor-pointer">
        <svg width="42" height="42" viewBox="-6 -6 42 42" xmlns="http://www.w3.org/2000/svg" className="fill-black hover:fill-white w-12 h-12">
          <g clip-path="url(#clip0_35_122)">
            <path d="M7.31819 20.6821C5.90751 19.2714 5.90751 16.9781 7.31819 15.5674L10.618 12.2676L9.0506 10.7001L5.75077 14C3.47388 16.2769 3.47388 19.9727 5.75077 22.2495C8.02765 24.5264 11.7235 24.5264 14.0003 22.2495L17.3002 18.9497L15.7328 17.3823L12.4329 20.6821C11.0222 22.0928 8.72886 22.0928 7.31819 20.6821ZM11.5255 18.1248L18.1251 11.5251L16.4752 9.87518L9.87556 16.4748L11.5255 18.1248ZM14.0003 5.75039L10.7005 9.05022L12.2679 10.6176L15.5678 7.31781C16.9784 5.90713 19.2718 5.90713 20.6825 7.31781C22.0932 8.72848 22.0932 11.0219 20.6825 12.4325L17.3827 15.7324L18.9501 17.2998L22.2499 14C24.5268 11.7231 24.5268 8.02727 22.2499 5.75039C19.973 3.4735 16.2772 3.4735 14.0003 5.75039Z" />
          </g>
          <defs>
            <clipPath id="clip0_35_122">
              <rect width="28" height="28" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div 
      className="rounded-full bg-zinc-500 w-24 h-12 relative cursor-pointer" 
      onClick={()=>{
        changeMode();
        setCurrentMode(graphStore.currentMode)
      }}
      >
        <div className={btnClassName}>
          <img src="/src/assets/modeMindmap.svg" alt="" className={"w-12 h-12 absolute" + (currentMode === 'mindmap' ? '' : ' invisible')}/>
          <img src="/src/assets/modeDendrogram.svg" alt="" className={"w-12 h-12 absolute" + (currentMode === 'mindmap' ? ' invisible' : '')} />
        </div>
      </div>
      <div className="rounded-full w-12 h-12 cursor-pointer">
        <img src="/src/assets/avatar.svg" alt="" />
      </div>
      <div className="w-12"></div>
    </div>
  )
}

export default Navigator;