import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";

type FloatingWindowProps = {
  top: number;
  left: number;
  canDelete: boolean;
  canThink: boolean;
  onDeleteNode: () => Promise<void>;
  onAddChild: () => Promise<void>;
  onAddNeighbor: () => Promise<void>;
  onThink: () => Promise<void>;
};

const FloatingWindow = observer(
  ({
    top,
    left,
    canThink,
    canDelete,
    onAddChild: addChild,
    onAddNeighbor: addNeighbor,
    onDeleteNode: deleteNode,
  }: FloatingWindowProps) => {
    const container = useRef<HTMLDivElement>(null);
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
          <div className="text-sm cursor-pointer transition-all rounded p-1 hover:bg-indigo-600 hover:text-white hover:font-[600]">
            <span>自动联想</span>
            <span className="font-mono text-sm text-zinc-300 float-right">
              Ctrl+L
            </span>
          </div>
        ) : <>
          <div className="text-sm cursor-pointer transition-all rounded p-1 hover:bg-indigo-600 hover:text-white hover:font-[600]">
            <span>自动关联</span>
            <span className="font-mono text-sm text-zinc-300 float-right">
              Ctrl+L
            </span>
          </div>
          <div className="text-sm cursor-pointer transition-all rounded p-1 hover:bg-indigo-600 hover:text-white hover:font-[600]">
            <span>手动关联</span>
            <span className="font-mono text-sm text-zinc-300 float-right">
              Ctrl+L
            </span>
          </div>
        </>}
        <div
          onClick={() => addChild()}
          className="text-sm cursor-pointer transition-all rounded p-1 hover:bg-indigo-600 hover:text-white hover:font-[600]"
        >
          <span>添加自定义子元素</span>
          <span className="font-mono text-sm text-zinc-300 float-right">
            Tab
          </span>
        </div>
        <div
          onClick={() => addNeighbor()}
          className="text-sm cursor-pointer transition-all rounded p-1 hover:bg-indigo-600 hover:text-white hover:font-[600]"
        >
          <span>添加同级元素</span>
          <span className="font-mono text-sm text-zinc-300 float-right">
            Enter
          </span>
        </div>
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
        <div className="text-sm rounded p-1 cursor-pointer transition-all hover:bg-indigo-600 hover:text-white hover:font-[600]">
          <span>撤销</span>
          <span className="font-mono text-sm text-zinc-300 float-right">
            Ctrl+Z
          </span>
        </div>
        <div className="text-sm rounded cursor-pointer p-1 transition-all hover:bg-indigo-600 hover:text-white hover:font-[600]">
          <span>下一步</span>
          <span className="font-mono text-sm text-zinc-300 float-right">
            Ctrl+Shift+Z
          </span>
        </div>
      </div>
    );
  }
);

export default FloatingWindow;
