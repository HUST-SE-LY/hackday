import G6, { NodeConfig, TreeGraph } from "@antv/g6";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import FloatingWindow from "../components/Graph/FloatingWindow";
import Navigator from '../components/Graph/Navigator'
import { observer } from "mobx-react-lite";
import graphStore from "../stores/graph";

const Graph = observer(() => {
  const graphContainer = useRef<HTMLDivElement>(null);
  const graph = useRef<TreeGraph>();
  const [title, setTitle] = useState("");
  const [showFloatingWindow, setShowFloatingWindow] = useState(false);
  const [currentPos, setCurrentPos] = useState({
    top: 0,
    left: 0,
  });
  const changeMod = useCallback(() => {
    if(graph.current) {
      graphStore.changeMode();
      G6.Util.traverseTree(data, (subtree:NodeConfig) => {
        console.log(subtree.id)
        graph.current?.updateItem(subtree.id, {
          type: 'circle',
        })
      })
      graph.current.updateLayout({
        type: "dendrogram",
        direction: "LR",
        radial: true,
        nodeSep: 100,
        rankSep: 100,
      })
      console.log(data)
      graph.current.fitView()
      graph.current.paint()

    }

  },[])
  const data = useMemo(
    () => ({
      id: "root",
      label: "root",
      type: 'circle',
      children: [
        {
          type: 'rect',
          id: "child1",
          label: "child1",
        },
        {
          type: 'rect',
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
          type: graphStore.currentMode === 'mindmap' ? 'rect' : 'circle'
        },
        graphStore.currentId
      );
    graph.current?.fitView()
  }

  useEffect(() => {
    graph.current = new G6.TreeGraph({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      container: graphContainer.current!, // 指定挂载容器
      width: 800, // 图的宽度
      height: 500, // 图的高度
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
        
      },
      layout: {
        type: "mindmap",
        direction: "H",
        getHGap: () => {
          return 50;
        },
        getVGap:() => {
          return 50
        }
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
        console.log(item)
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
    </div>
  );
});

export default Graph;
