import { useCallback, useState } from "react";

enum BookPage {
  first = 0,
  second,
  third,
}



const Book = () => {
  const [page, setPage] = useState(BookPage.first);
  const getStyle = useCallback((page: BookPage) => {
    switch(page) {
      case BookPage.first :
        return "translate-x-[0]";
      case BookPage.second :
        return "translate-x-[-100%]";
      case BookPage.third :
        return "translate-x-[-200%]";
    }
  },[])
  return <div className="flex animate-floatIn opacity-0 w-full relative overflow-hidden flex-nowrap">
    <div className={`w-[300%] transition-all flex ${getStyle(page)}`}>
      <div className="bg-blue-200 w-full flex-shrink-0 rounded-[20px]"></div>
      <div className="bg-green-200 w-full flex-shrink-0 rounded-[20px]"></div>
      <div className="bg-red-200 w-full flex-shrink-0 rounded-[20px]"></div>
    </div>
    <button onClick={() => page!==BookPage.first&&setPage(page - 1)} className="absolute z-1 left-0 bottom-[50%]">last</button>   
    <button onClick={() => page!==BookPage.third&&setPage(page + 1)} className="absolute right-0 bottom-[50%]" >next</button>
  </div>
}

export default Book;