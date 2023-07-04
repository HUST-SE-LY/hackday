/* eslint-disable @typescript-eslint/no-non-null-assertion */
import G6, { NodeConfig, TreeGraph } from "@antv/g6";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import FloatingWindow from "../components/Graph/FloatingWindow";
import Navigator from '../components/Graph/Navigator'
import { observer } from "mobx-react-lite";
import graphStore from "../stores/graph";
import getColor from "../utils/getColor";

const Graph = observer(() => {
  const graphContainer = useRef<HTMLDivElement>(null);
  const graph = useRef<TreeGraph>();
  const [title, setTitle] = useState("");
  const [showFloatingWindow, setShowFloatingWindow] = useState(false);
  const [currentPos, setCurrentPos] = useState({
    top: 0,
    left: 0,
  });

  const changeTitle = useCallback(() => {
    if(graph.current) {
      graph.current.updateItem(graphStore.currentId, {
        label: title,
        size: title.length*16+32
      })
      graph.current.fitCenter();
    }
  },[title])
  const data = useMemo(
    () => ({
      id: "root",
      type: "circle",
      size: 128,
      label: "请创建关键词",
      style: {
        fill: "black",
        stroke: "transparent",
        cursor: "pointer",
      },
      labelCfg: {
        style: {
          fill: "white",
          fontSize: 16,
        },
      },
    }),
    []
  );

  const changeMod = useCallback(() => {
    if (graph.current) {
      graphStore.changeMode();
      G6.Util.traverseTree(data, (subtree: NodeConfig) => {
        console.log(subtree.id);
        graph.current?.updateItem(subtree.id, {
          type: "circle",
        });
      });
      graph.current.updateLayout({
        type: "dendrogram",
        direction: "LR",
        radial: true,
        nodeSep: 100,
        rankSep: 100,
      });
      console.log(data);
      graph.current.fitView();
      graph.current.paint();
    }
  }, [data]);

  function addTitle() {
    if(graph.current) {
      graph.current.addChild({
        id: title,
        size: title.length*16+32,
        label: title,
        style: {
          fill: getColor(),
          stroke: "transparent",
          cursor: "pointer",
        },
        labelCfg: {
          style: {
            fill: "white",
            fontSize: 16,
          },
        },
        type: "circle",
      },graphStore.currentId)
      graph.current.fitCenter;
    }

  }

  useEffect(() => {
    graph.current = new G6.TreeGraph({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      container: graphContainer.current!, // 指定挂载容器
      width: 800, // 图的宽度
      height: 500, // 图的高度
      modes: {
        default: ["drag-canvas", "zoom-canvas", "drag-node"], // 允许拖拽画布、放缩画布、拖拽节点
      },
      nodeStateStyles: {
        hover: {
          opacity: 0.75,
        },
        focus: {
          stroke: "#ec4899",
          lineWidth: 2,
        },
      },
      defaultEdge: {
        style: {
          endArrow: {
            path: G6.Arrow.circle(5, 10),
            fill: 'black',
            stroke: "transparent",
            d: 10,
          },
        },
      },
      layout: {
        type: "mindmap",
        direction: "H",
        getHGap: () => {
          return 50;
        },
        getVGap: () => {
          return 50;
        },
      },
    });
    graph.current.data(data);
    graph.current.render();
    graph.current.fitCenter();
    graph.current.on("node:mouseenter", (evt) => {
      let { item } = evt;
      console.log(item);
      if (graph.current && item) {
        while (item) {
          console.log(item);
          graph.current.setItemState(item, "hover", true);
          item = item._cfg!.parent;
        }
      }
    });

    graph.current.on("node:mouseleave", (evt) => {
      let { item } = evt;
      if (graph.current && item) {
        while (item) {
          graph.current.setItemState(item, "hover", false);
          item = item._cfg!.parent;
        }
      }
    });
    graph.current.on("click", (evt) => {
      const { item } = evt;
      if (item && item._cfg && graph.current) {
        console.log(item);
        graph.current.setItemState(graphStore.currentId, "focus", false);
        graphStore.changeId(item._cfg.id as string);
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
      <Navigator changeMode={changeMod} currentPos={currentPos}></Navigator>
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
      <button
        onClick={changeMod}
        className="w-fit bg-gradient-to-br from-purple-500 to-pink-500 px-[2rem] py-[0.5rem] text-white rounded-full"
      >
        切换状态
      </button>
      <button
        onClick={changeTitle}
        className="w-fit bg-gradient-to-br from-purple-500 to-pink-500 px-[2rem] py-[0.5rem] text-white rounded-full"
      >
        更改描述
      </button>
    </div>
  );
});

export default Graph;
