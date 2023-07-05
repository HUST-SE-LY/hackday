import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import graphStore from "../../stores/graph";

type FloatingWindowProps = {
  top: number;
  left: number;
  canDelete: boolean;
  canThink: boolean;
  onDeleteNode: () => Promise<void>;
  onAddChild: () => Promise<void>;
  onAddNeighbor: () => Promise<void>;
  onThink: () => Promise<void>;
  onAddLink: (value:string) => Promise<void>;
};

const FloatingWindow = observer(
  ({
    top,
    left,
    canThink,
    canDelete,
    onThink: think,
    onAddChild: addChild,
    onAddNeighbor: addNeighbor,
    onDeleteNode: deleteNode,
    onAddLink: addLink,
  }: FloatingWindowProps) => {
    const container = useRef<HTMLDivElement>(null);
    const [link, setLink] = useState("");
    useEffect(() => {
      if (container.current) {
        container.current.style.top = `${top}px`;
        container.current.style.left = `${left}px`;
      }
    }, [left, top]);
    return (
      <div
        className="absolute z-[99999] animate-floatingWindowIn bg-white flex flex-col gap-[0.25rem] p-[0.75rem] shadow-xl rounded w-48"
        ref={container}
      >
        {canThink ? (
          <div onClick={() => think()} className="text-sm cursor-pointer transition-all rounded p-1 hover:bg-indigo-600 hover:text-white hover:font-[600]">
            <span>自动联想</span>
            <span className="font-mono text-sm text-zinc-300 float-right">
              Ctrl+L
            </span>
          </div>
        ) : (
          <>
            <div className="text-sm cursor-pointer transition-all rounded p-1 hover:bg-indigo-600 hover:text-white hover:font-[600]">
              <span>自动关联</span>
              <span className="font-mono text-sm text-zinc-300 float-right">
                Ctrl+L
              </span>
            </div>
            <div className="text-sm group relative cursor-pointer transition-all rounded p-1 hover:bg-indigo-600 hover:text-white hover:font-[600]">
              <span>手动关联</span>
              <span className="font-mono text-sm text-zinc-300 float-right">
                Ctrl+L
              </span>
              <div className="absolute invisible px-[1rem] group-hover:visible top-0 left-full">
                <div className="p-[1rem] rounded-lg bg-white shadow-lg border">
                  <textarea value={link} onChange={e => setLink(e.target.value)} placeholder="输入关联信息" onKeyUp={(e) => e.code === 'Enter' && (addLink(link).then(() => setLink("")))} className="bg-gray-100 placeholder:font-normal rounded-lg text-black p-[0.25rem] text-sm outline-none"></textarea>
                </div>
                
              </div>
            </div>
          </>
        )}
        <div
          onClick={() => addChild()}
          className="text-sm cursor-pointer transition-all rounded p-1 hover:bg-indigo-600 hover:text-white hover:font-[600]"
        >
          <span>添加自定义子元素</span>
          <span className="font-mono text-sm text-zinc-300 float-right">
            Tab
          </span>
        </div>
        {graphStore.currentId === "root" ? null : (
          <div
            onClick={() => addNeighbor()}
            className="text-sm cursor-pointer transition-all rounded p-1 hover:bg-indigo-600 hover:text-white hover:font-[600]"
          >
            <span>添加同级元素</span>
            <span className="font-mono text-sm text-zinc-300 float-right">
              Enter
            </span>
          </div>
        )}
        {canDelete ? (
          <div
            onClick={() => deleteNode()}
            className="text-sm rounded cursor-pointer transition-all p-1 hover:bg-indigo-600 hover:text-white hover:font-[600]"
          >
            <span>删除</span>
            <span className="font-mono text-sm text-zinc-300 float-right">
              退格
            </span>
          </div>
        ) : null}
      </div>
    );
  }
);

export default FloatingWindow;
