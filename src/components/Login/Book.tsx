import { useCallback, useState } from "react";
import tip1 from "/src/assets/tip1.svg";
import tip2 from "/src/assets/tip2.svg";
import tip3 from "/src/assets/tip3.svg";
import arrow from "../../assets/titleArrow.svg";

enum BookPage {
  first = 0,
  second,
  third,
}

const Book = () => {
  const [page, setPage] = useState(BookPage.first);
  const getStyle = useCallback((page: BookPage) => {
    switch (page) {
      case BookPage.first:
        return "translate-x-[0]";
      case BookPage.second:
        return "translate-x-[-100%]";
      case BookPage.third:
        return "translate-x-[-200%]";
    }
  }, []);
  return (
    <div className="flex animate-floatIn opacity-0 w-full relative overflow-hidden flex-nowrap">
      <div className={`w-[300%] transition-all flex ${getStyle(page)}`}>
        <div className="w-full flex-shrink-0">
          <div className="h-[10rem]">
            <img src={tip1} className="object-cover" />
          </div>
          <video
            src="/T1.mp4"
            muted
            loop
            autoPlay
            className="w-full object-cover flex-shrink-0 rounded-[20px]"
          ></video>
        </div>
        <div className="w-full flex-shrink-0">
          <div className="h-[10rem]">
            <img src={tip2} className="object-cover" />
          </div>
          <video
            src="/T2.mp4"
            muted
            loop
            autoPlay
            className="w-full object-cover flex-shrink-0 rounded-[20px]"
          ></video>
        </div>
        <div className="w-full flex-shrink-0">
          <div className="h-[10rem]">
            <img src={tip3} className="object-cover" />
          </div>
          <video
            src="/T3.mp4"
            muted
            loop
            autoPlay
            className="w-full object-cover flex-shrink-0 rounded-[20px]"
          ></video>
        </div>
      </div>
      <button
        onClick={() => page !== BookPage.first && setPage(page - 1)}
        className="absolute z-1 left-0 bottom-[50%]"
      >
        <div className="rounded-full w-[3rem] flex items-center justify-center h-[3rem] hover:animate-ping ">
          <img src={arrow} className="w-[1rem] rotate-180" alt="" />
        </div>
      </button>
      <button
        onClick={() => page !== BookPage.third && setPage(page + 1)}
        className="absolute right-0 bottom-[50%]"
      >
        <div className="rounded-full w-[3rem] flex items-center justify-center h-[3rem] hover:animate-ping ">
          <img src={arrow} className="w-[1rem]" alt="" />
        </div>
      </button>
    </div>
  );
};

export default Book;
