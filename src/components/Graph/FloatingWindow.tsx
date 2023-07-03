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
  return <div className="absolute z-[99999] bg-white flex flex-col gap-[1rem] p-[1rem] shadow-lg" ref={container}>
    <div className="text-sm">自动联想</div>
    <div className="text-sm">添加子元素</div>
  </div>
})

export default FloatingWindow;