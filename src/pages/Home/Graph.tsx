import G6, { TreeGraph } from "@antv/g6";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import FloatingWindow from "../../components/Graph/FloatingWindow";
import { observer } from "mobx-react-lite";
import graphStore from "../../stores/graph";

const Graph = observer( () => {
  const graphContainer = useRef<HTMLDivElement>(null);
  const graph = useRef<TreeGraph>();
  const [title, setTitle] = useState("");
  const [showFloatingWindow, setShowFloatingWindow] = useState(false);
  const [currentPos, setCurrentPos] = useState({
    top: 0,
    left: 0,
  });
  const data = useMemo(
    () => ({
      id: "root",
      label: "root",
      children: [
        {
          id: "child1",
          label: "child1",
        },
        {
          id: "child2",
          label: "child2",
        },
      ],
    }),
    []
  );

  function addTitle() {
    graph.current &&
      graph.current.addChild(
        {
          id: title,
          label: title,
        },
        graphStore.currentId,
      );
  }

  useEffect(() => {
    graph.current = new G6.TreeGraph({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      container: graphContainer.current!, // 指定挂载容器
      width: 800, // 图的宽度
      height: 500, // 图的高度
      defaultNode: {
        type: "rect",
        style: {
          radius: 10,
        },
        anchorPoints: [
          [0, 0.5],
          [1, 0.5],
        ],
      },
      nodeStateStyles: {
        hover: {
          fill: "rgb(233, 213, 255)",
        },
        focus: {
          stroke: "#ec4899",
          lineWidth: 2,
        },
      },
      defaultEdge: {
        type: "cubic-horizontal",
      },
      layout: {
        type: "mindmap",
        getHGap: () => {
          return 50;
        },
      },
    });
    graph.current.data(data);
    graph.current.render();
    graph.current.fitCenter();
    graph.current.on("node:mouseenter", (evt) => {
      const { item } = evt;
      graph.current && item && graph.current.setItemState(item, "hover", true);
    });

    graph.current.on("node:mouseleave", (evt) => {
      const { item } = evt;
      graph.current && item && graph.current.setItemState(item, "hover", false);
    });
    graph.current.on("click", (evt) => {
      const { item } = evt;
      if (item && item._cfg && graph.current) {
        graph.current.setItemState(graphStore.currentId, "focus", false);
        graphStore.changeId(item._cfg.id as string)
        graph.current.setItemState(item, "focus", true);
        setCurrentPos({
          top: evt.clientY,
          left: evt.clientX,
        });
        setShowFloatingWindow(true);
      } else {
        graph.current?.setItemState(graphStore.currentId, "focus", false);
        setShowFloatingWindow(false);
      }
    });
  }, [data]);

  return (
    <div className="flex flex-col relative justify-center items-center gap-[1rem]">
      <div ref={graphContainer}></div>
      {showFloatingWindow ? <FloatingWindow {...currentPos} /> : null}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        className="border-purple-200 outline-none transition-all focus:border-[2px] focus:border-purple-500 focus:shadow-purple-200 hover:shadow rounded-full px-[1rem] border-[1px]"
      />
      <button
        onClick={addTitle}
        className="w-fit bg-gradient-to-br from-purple-500 to-pink-500 px-[2rem] py-[0.5rem] text-white rounded-full"
      >
        添加节点
      </button>
    </div>
  );
});

export default Graph;
