/* eslint-disable @typescript-eslint/no-non-null-assertion */
import G6, { NodeConfig, TreeGraph } from "@antv/g6";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import FloatingWindow from "../components/Graph/FloatingWindow";
import Navigator from "../components/Graph/Navigator";
import { observer } from "mobx-react-lite";
import graphStore from "../stores/graph";
import getColor from "../utils/getColor";
import Info from "../components/Graph/Info";

const Graph = observer(() => {
  const graphContainer = useRef<HTMLDivElement>(null);
  const graph = useRef<TreeGraph>();
  const input = useRef<HTMLInputElement>(null);
  const [showFloatingWindow, setShowFloatingWindow] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [currentInfo, setCurrentInfo] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [currentPos, setCurrentPos] = useState({
    top: 0,
    left: 0,
  });
  const [InfoPos, setInfoPos] = useState({
    top: 0,
    left: 0,
  });
  const [inputPos, setInputPos] = useState({
    top: 0,
    left: 0,
  });
  const [canThink, setCanThink] = useState(true);
  const [canDelete, setCanDelete] = useState(true);
  const data = useMemo(
    () => ({
      id: "root",
      // type: "circle",
      // size: 128,
      label: "疯狂星期四",
      // style: {
      //   fill: "black",
      //   stroke: "transparent",
      //   cursor: "pointer",
      // },
      // labelCfg: {
      //   style: {
      //     fill: "white",
      //     fontSize: 16,
      //   },
      // },
      children: [
        {
          id: "1",
          label: "kfc",
          info: "疯狂星期四是kfc旗下的活动",
        },
        {
          id: "2",
          label: "网络",
          info: "疯狂星期四是一个网络热梗",
          children: [
            {
              id: "4",
              label: "年轻文化",
              info: "疯狂星期四是一个网络热梗,代表了年轻文化",
            },
          ],
        },
        {
          id: "3",
          label: "折扣",
          info: "疯狂星期四是肯德基的折扣活动",
        },
      ],
    }),
    []
  );

  const changeMod = useCallback(() => {
    if (graph.current) {
      graphStore.changeMode();
      // G6.Util.traverseTree(data, (subtree: NodeConfig) => {
      //   console.log(subtree.id);
      //   graph.current?.updateItem(subtree.id, {
      //     type: "circle",
      //   });
      // });
      // graph.current.updateLayout({
      //   type: "dendrogram",
      //   direction: "LR",
      //   radial: true,
      //   nodeSep: 100,
      //   rankSep: 100,
      // });
      // console.log(data);
      // graph.current.fitCenter();
      // graph.current.paint();
    }
  }, []);

  async function addChild() {
    if (graph.current) {
      graph.current.addChild(
        {
          id: "111",
          size: 128,
          label: "双击编辑文字",
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
        },
        graphStore.currentId
      );
      graph.current.fitCenter;
    }
    setShowFloatingWindow(false);
  }

  async function deleteNode() {
    if (graph.current) {
      const currentNode = graph.current.findById(graphStore.currentId);
      if (!currentNode._cfg!.children && currentNode._cfg!.id !== "root") {
        graph.current.removeChild(graphStore.currentId);
      }
    }
    setShowFloatingWindow(false);
  }

  async function addNeighbor() {
    if (graph.current) {
      const currentNode = graph.current.findById(graphStore.currentId);
      if (currentNode._cfg && currentNode._cfg.parent) {
        const parentNode = currentNode._cfg.parent;
        graph.current.addChild(
          {
            id: "l",
            size: 128,
            label: "双击编辑文字",
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
          },
          parentNode
        );
        graph.current.fitCenter;
      }
    }
    setShowFloatingWindow(false);
  }

  async function changeLabel(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.code === "Enter") {
      if (graph.current) {
        graph.current.updateItem(graphStore.currentId, {
          label: inputValue,
          size: inputValue.length * 16 + 32,
        });
        setInputValue("");
        setShowInput(false);
      }
    }
  }

  async function think() {
    //todo
  }

  const exportImage = useCallback(() => {
    if(graph.current) {
      graph.current.downloadFullImage('mindMap-Aidea', 'image/png', {
        padding: [30, 15, 15, 15],
      });
    }
  },[])

  useEffect(() => {
    const map = new Map<string, string>();
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
          stroke: "#4318FF",
          lineWidth: 2,
        },
      },
      defaultEdge: {
        style: {
          endArrow: {
            path: G6.Arrow.circle(5, 5),
            fill: "black",
            stroke: "transparent",
            d: 10,
          },
        },
      },
      layout: {
        type: "dendrogram",
        direction: "LR",
        radial: true,
        nodeSep: 100,
        rankSep: 120,
      },
    });
    G6.Util.traverseTree(data, (subTree: NodeConfig & { info: string }) => {
      console.log(subTree);
      subTree.size = (subTree.label as string)!.length * 16 + 32;
      subTree.labelCfg = {
        style: {
          fill: "white",
          fontSize: 16,
        },
      };
      if (subTree.id === "root") {
        subTree.style = {
          fill: "black",
          stroke: "transparent",
          cursor: "pointer",
        };
      } else {
        map.set(subTree.id, subTree.info);
        subTree.style = {
          fill: getColor(),
          stroke: "transparent",
          cursor: "pointer",
        };
      }
    });
    graph.current.data(data);
    graph.current.render();
    graph.current.fitCenter();
    graph.current.on("node:mouseenter", (evt) => {
      let { item } = evt;
      if (graph.current && item) {
        graphStore.hover(item._cfg!.id!);
        setShowInfo(true);
        setCurrentInfo(map.get(item._cfg!.id!) || "没有关联到该点的逻辑");
        setInfoPos({
          top: evt.clientY + 20,
          left: evt.clientX + 20,
        });
        while (item) {
          graph.current.setItemState(item, "hover", true);
          item = item._cfg!.parent;
        }
      }
    });

    graph.current.on("node:mouseleave", (evt) => {
      let { item } = evt;
      if (graph.current && item) {
        setShowInfo(false);
        while (item) {
          graph.current.setItemState(item, "hover", false);
          item = item._cfg!.parent;
        }
      }
    });
    graph.current.on("click", (evt) => {
      const { item } = evt;
      if (item && item._cfg && graph.current) {
        map.get(item._cfg!.id!) ? setCanThink(true) : setCanThink(false);
        if (item._cfg!.id === "root") {
          setCanDelete(false);
          setCanThink(true);
        }
        graph.current.setItemState(graphStore.currentId, "focus", false);
        graphStore.changeId(item._cfg.id as string);
        graph.current.setItemState(item, "focus", true);
        setCurrentPos({
          top: evt.clientY + 20,
          left: evt.clientX + 20,
        });
        setShowFloatingWindow(true);
        setShowInfo(false);
      } else {
        graph.current?.setItemState(graphStore.currentId, "focus", false);
        setShowFloatingWindow(false);
      }
    });
    graph.current.on("dblclick", (evt) => {
      const { item } = evt;
      if (item && item._cfg && graph.current) {
        setShowFloatingWindow(false);
        console.log(item);
        const { x, y } = item.getModel(); // 获得该节点的位置，对应 pointX/pointY 坐标
        const clientXY = graph.current.getClientByPoint(x!, y!);
        setInputPos({
          top: clientXY.y - 16,
          left: clientXY.x - 32,
        });
        graph.current.updateItem(item, {
          label: "",
        });

        setShowInput(true);
      }
    });
  }, [data]);



  return (
    <div className="flex flex-col relative justify-center items-center gap-[1rem]">
      <Navigator onExport={exportImage}  changeMode={changeMod}></Navigator>
      <div ref={graphContainer}></div>
      {showInput ? (
        <input
          style={{
            top: `${inputPos.top}px`,
            left: `${inputPos.left}px`,
          }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={(e) => changeLabel(e)}
          ref={input}
          className="fixed w-[64px] h-[32px] outline-none bg-transparent text-white text-center border-b-white border-b-[1px]"
        />
      ) : null}
      {showFloatingWindow ? (
        <FloatingWindow
          canThink={canThink}
          canDelete={canDelete}
          onThink={think}
          onDeleteNode={deleteNode}
          onAddChild={addChild}
          onAddNeighbor={addNeighbor}
          {...currentPos}
        />
      ) : null}
      {showInfo ? <Info {...InfoPos} currentInfo={currentInfo} /> : null}
    </div>
  );
});

export default Graph;
