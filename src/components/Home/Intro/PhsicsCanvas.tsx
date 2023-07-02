/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Matter from "matter-js";
import { Ref, forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from "react";

const PhysicsCanvas = forwardRef((_props,ref:Ref<{addBox:(keyword:string) => void}>) => {
  const ground = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const leftBorder = useRef<HTMLDivElement>(null);
  const rightBorder = useRef<HTMLDivElement>(null);
  const engine = useMemo(() => Matter.Engine.create(),[]);
  useImperativeHandle(ref, () => ({
    addBox(keyword: string) {
      const boxContainer  =document.createElement("div");
      boxContainer.className = "absolute w-[100px] h-[30px] rounded-full text-center leading-[30px] border-[1px] border-blue-200";
      boxContainer.innerText = keyword;
      container.current!.appendChild(boxContainer)
      const box = {
        w: 100,
        h: 30,
        body: Matter.Bodies.rectangle(
          Math.pow(-1, Math.floor(Math.random()*2))*200*Math.random(), 0, 100, 30,{
            chamfer: { radius: 15 }
          }
        ),
        elem: boxContainer,
        render() {
          const {x, y} = this.body.position;
          this.elem.style.top = `${y - this.h / 2}px`;
          this.elem.style.left = `${x - this.w / 2}px`;
          this.elem.style.transform = `rotate(${this.body.angle}rad)`;
        },
      }
      Matter.Composite.add(
        engine.world, [box.body]
      );
      (function rerender() {
        box.render();
        Matter.Engine.update(engine);
        requestAnimationFrame(rerender)
      })()
      
    
    }
  }))
  
  useEffect(() => {
    const groundRec = {
      w: 500,
      h: 20,
      body: Matter.Bodies.rectangle(
        0, 500, 500, 20, {isStatic: true}
      ),
      elem: ground.current!,
      render() {
        const {x, y} = this.body.position;
        this.elem.style.top = `${y - this.h / 2}px`;
        this.elem.style.left = `${x - this.w / 2}px`;
        this.elem.style.transform = `rotate(${this.body.angle}rad)`;
      },
    };

    const left = {
      w: 1,
      h: 500,
      body: Matter.Bodies.rectangle(
        -250, 250, 1, 500, {isStatic: true}
      ),
      elem: leftBorder.current!,
      render() {
        const {x, y} = this.body.position;
        this.elem.style.top = `${y - this.h / 2}px`;
        this.elem.style.left = `${x - this.w / 2}px`;
        this.elem.style.transform = `rotate(${this.body.angle}rad)`;
      },
      
    };

    const right = {
      w: 1,
      h: 500,
      body: Matter.Bodies.rectangle(
        250, 250, 1, 500, {isStatic: true}
      ),
      elem: rightBorder.current!,
      render() {
        const {x, y} = this.body.position;
        this.elem.style.top = `${y - this.h / 2}px`;
        this.elem.style.left = `${x - this.w / 2}px`;
        this.elem.style.transform = `rotate(${this.body.angle}rad)`;
      },
      
    };

    Matter.Composite.add(
      engine.world, [groundRec.body,left.body, right.body]
    );

    (function rerender() {
      groundRec.render();
      left.render();
      right.render();
      Matter.Engine.update(engine);
      requestAnimationFrame(rerender);
    })();
  },[engine])
  return <div ref={container}>
    <div ref={rightBorder} className="h-[500px] w-[1px] absolute bg-blue-200"></div>
    <div ref={leftBorder} className="h-[500px] w-[1px] absolute bg-blue-200"></div>
    <div ref={ground} className="bg-blue-300 absolute w-[500px] h-[20px]"></div>
  </div>;
});

export default PhysicsCanvas ;
