/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Matter from "matter-js";
import { Ref, forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import keywordsAssociation from "../../../assets/keywordsAssociation.svg"
import keywordsAssociationZh from "../../../assets/keywordsAssociationZh.svg"

const PhysicsCanvas = forwardRef((_props,ref:Ref<{addBox:(keyword:string) => void}>) => {
  const ground = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const leftBorder = useRef<HTMLDivElement>(null);
  const rightBorder = useRef<HTMLDivElement>(null);
  const engine = useMemo(() => Matter.Engine.create(),[]);
  const [frictionAir, setFrictionAir] = useState(0);
  useImperativeHandle(ref, () => ({
    addBox(keyword: string) {
      const boxContainer  =document.createElement("div");
      boxContainer.className = "absolute w-[200px] text-center text-[24px] h-[70px] rounded-[10px] text-center leading-[70px] border-[1px] border-black";
      boxContainer.style.width = `${24*keyword.length+48}px`
      boxContainer.innerText = keyword;
      container.current!.appendChild(boxContainer)
      setFrictionAir(frictionAir+0.01);
      const box = {
        w: 24*keyword.length+48,
        h: 70,
        body: Matter.Bodies.rectangle(
          900*Math.random(), 0, 24*keyword.length+48, 70,{
            chamfer: { radius: 10 },
            frictionAir: frictionAir
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
       requestAnimationFrame(rerender);
      })()
      
    
    }
  }))
  
  useEffect(() => {

    const left = {
      w: 1,
      h: 1900,
      body: Matter.Bodies.rectangle(
        0, 700, 1, 1900, {isStatic: true}
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
      h: 1900,
      body: Matter.Bodies.rectangle(
        900, 700, 1, 1900, {isStatic: true}
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
      engine.world, [left.body, right.body]
    );

    (function rerender() {
      left.render();
      right.render();
      Matter.Engine.update(engine);
      requestAnimationFrame(rerender);
    })();
    
  },[engine])

  useEffect(() => {
    if(container.current&&container.current.clientHeight) {
      const groundRec = {
        w: 900,
        h: 20,
        body: Matter.Bodies.rectangle(
          450, container.current.clientHeight, 900, 20, {isStatic: true}
        ),
        elem: ground.current!,
        render() {
          const {x, y} = this.body.position;
          this.elem.style.top = `${y - this.h / 2}px`;
          this.elem.style.left = `${x - this.w / 2}px`;
          this.elem.style.transform = `rotate(${this.body.angle}rad)`;
        },
      };
      Matter.Composite.add(
        engine.world, [groundRec.body]
      );
      (function rerender() {
        groundRec.render();
        Matter.Engine.update(engine);
        requestAnimationFrame(rerender);
      })();
    }
  },[engine])
  return <div className="w-full h-full" ref={container}>
    <div className="absolute top-[50px] left-[40px]">
      <img src={keywordsAssociation} alt="" />
      <img src={keywordsAssociationZh} className="mt-[20px]" alt="" />
    </div>
    
    <div ref={rightBorder} className="h-[900px] w-[1px] absolute"></div>
    <div ref={leftBorder} className="h-[900px] w-[1px] absolute "></div>
    <div ref={ground} className="bg-black absolute w-[100vw] h-[20px]"></div>
  </div>;
});

export default PhysicsCanvas ;
