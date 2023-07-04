/* eslint-disable @typescript-eslint/no-non-null-assertion */
import G6, { TreeGraph } from "@antv/g6";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import FloatingWindow from "../components/Graph/FloatingWindow";
import Navigator from "../components/Graph/Navigator";
import { observer } from "mobx-react-lite";
import graphStore from "../stores/graph";
import getColor from "../utils/getColor";

const Graph = observer(() => {
  const graphContainer = useRef<HTMLDivElement>(null);
  const graph = useRef<TreeGraph>();
  const input = useRef<HTMLInputElement>(null);
  const [showFloatingWindow, setShowFloatingWindow] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [currentPos, setCurrentPos] = useState({
    top: 0,
    left: 0,
  });
  const [inputPos, setInputPos] = useState({
    top: 0,
    left: 0,
  });

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
    setShowFloatingWindow(false)
  }

  async function deleteNode() {
    if(graph.current) {
      const currentNode = graph.current.findById(graphStore.currentId);
      if(!currentNode._cfg!.children&&currentNode._cfg!.id!=="root") {
        graph.current.removeChild(graphStore.currentId);
      }
    }
    setShowFloatingWindow(false)
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
    setShowFloatingWindow(false)
  }

  async function changeLabel(e: React.KeyboardEvent<HTMLInputElement>) {
    if(e.code === 'Enter') {
      if(graph.current) {
        graph.current.updateItem(graphStore.currentId, {
          label: inputValue,
          size: inputValue.length * 16 + 32
        })
        setInputValue("");
        setShowInput(false)
      }
    }
  }

  async function think() {
    //todo
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
        rankSep: 200,
      },
    });
    graph.current.data(data);
    graph.current.render();
    graph.current.fitCenter();
    graph.current.on("node:mouseenter", (evt) => {
      let { item } = evt;
      if (graph.current && item) {
        while (item) {
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
        graph.current.setItemState(graphStore.currentId, "focus", false);
        graphStore.changeId(item._cfg.id as string);
        graph.current.setItemState(item, "focus", true);
        setCurrentPos({
          top: evt.clientY + 20,
          left: evt.clientX + 20,
        });
        setShowFloatingWindow(true);
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
        })
        graph.current.updateItem(item, {
          label: "",
        })

        setShowInput(true);

      }
    });
  }, [data]);

  return (
    <div className="flex flex-col relative justify-center items-center gap-[1rem]">
      <Navigator changeMode={changeMod}></Navigator>
      <div ref={graphContainer}></div>
      {showInput ? (
        <input
          style={{
            top: `${inputPos.top}px`,
            left: `${inputPos.left}px`,
          }}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyUp={(e) => changeLabel(e)}
          ref={input}
          className="fixed w-[64px] h-[32px] outline-none bg-transparent text-white text-center border-b-white border-b-[1px]"
        />
      ) : null}
      {showFloatingWindow ? (
        <FloatingWindow
          onThink={think}
          onDeleteNode={deleteNode}
          onAddChild={addChild}
          onAddNeighbor={addNeighbor}
          {...currentPos}
        />
      ) : null}
    </div>
  );
});

export default Graph;
