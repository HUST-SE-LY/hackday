import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";

type FloatingWindowProps = {
  top: number,
  left: number,
}

const FloatingWindow = observer(({top, left}: FloatingWindowProps) => {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if(container.current) {
      container.current.style.top = `${top}px`;
      container.current.style.left = `${left}px`;
    }
  },[left, top])
  return <div className="absolute z-[99999] bg-white flex flex-col gap-[0.25rem] p-[0.75rem] shadow-xl rounded w-48" ref={container}>
    <div className="text-sm rounded p-1 hover:bg-indigo-600 hover:text-white hover:font-[600]">
      <span>自动联想</span>
      <span className="font-[600] text-zinc-400 float-right">Ctrl+L</span>
    </div>
    <div className="text-sm rounded p-1 hover:bg-indigo-600 hover:text-white hover:font-[600]">
      <span>自定义子元素</span>
      <span className="font-[600] text-zinc-400 float-right">Tab</span> 
    </div>
    <div className="text-sm rounded p-1 hover:bg-indigo-600 hover:text-white hover:font-[600]">
      <span>自定义同级元素</span>
      <span className="font-[600] text-zinc-400 float-right">Enter</span> 
    </div>
    <div className="text-sm rounded p-1 hover:bg-indigo-600 hover:text-white hover:font-[600]">
      <span>删除</span>
      <span className="font-[600] text-zinc-400 float-right">退格</span> 
    </div>
    <div className="text-sm rounded p-1 hover:bg-indigo-600 hover:text-white hover:font-[600]">
      <span>撤销</span>
      <span className="font-[600] text-zinc-400 float-right">Ctrl+Z</span> 
    </div>
    <div className="text-sm rounded p-1 hover:bg-indigo-600 hover:text-white hover:font-[600]">
      <span>下一步</span>
      <span className="font-[600] text-zinc-400 float-right">Ctrl+Shift+Z</span> 
    </div>
  </div>
})

export default FloatingWindow;