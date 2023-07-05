import { observer } from "mobx-react-lite";
import { useState, useRef } from 'react'
import { operatorProps } from "../Operator"
import searchGreyBlackSvg from "/src/assets/searchGreyBlack.svg"
import searchBlackSvg from "/src/assets/searchBlack.svg"
import searchWhiteSvg from "/src/assets/searchWhite.svg"
import locationPinSvg from "/src/assets/locationPin.svg"


let key = 0;

type typeFlattenData = {
  id: string,
  label: string,
}[]

const flattenData = ({ data }: operatorProps): typeFlattenData => {
  const children:typeFlattenData = []
  if (data.children){
    data.children.forEach((child:typeFlattenData[number]) => {
      children.push(...flattenData({'data':child}))
    })
  }
  return [
    { id: data.id, label: data.label },
    ...children
  ]
}

const Search = observer(({ data }: operatorProps) => {
  const flatData = flattenData({data});
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [searchResults, setSearchResults] = useState<typeFlattenData>([]);
  const [currentResultsLocation, setCurrentResultsLocation] = useState('');
  const [searchHistory, setSearchHistory] = useState<typeFlattenData>([]);
  const onChange = (inputValue:string) => {
      setSearchResults([]);
      if (!inputValue) return;
      const filterResults:any[] = [];
      flatData.forEach((node) => {
        if (node.label.includes(inputValue)){
          filterResults.push(node)
        }
      })
      setSearchResults(filterResults)
  }


  const searchResultsHTML = searchResults.map((result) =>
    <li
      key={key++}
      className={`bg-white hover:bg-zinc-300 h-14 pl-8 leading-[3.5rem] font-[500] relative cursor-pointer${result.id === currentResultsLocation
        ? " text-black"
        : " text-zinc-500"}`}
      onClick={() => {
        setCurrentResultsLocation(result.id);
        let flag = 0;
        searchHistory.forEach((history) => {
          if (history.id === result.id){
            flag = 1;
          };
        })
        if (flag) return;
        setSearchHistory([...searchHistory, result]);
        // 在这里定位到id为result.id的结点
      }}
    >
      {result.label}
      <img
        src={locationPinSvg}
        alt=""
        className={`float-right absolute top-3 right-3 ${result.id === currentResultsLocation
          ? ""
          : " hidden"
          }`} />
    </li>
  );
  const searchHistoryHTML = searchHistory.map((history) =>
    <li
      key={key++}
      className="hover:bg-zinc-700 h-14 rounded-lg pl-8 leading-[3.5rem] font-[500] relative text-zinc-400 hover:text-white group cursor-pointer"
      onClick={() => {
        if (searchInputRef.current){
          searchInputRef.current.value = history.label;
          onChange(history.label);
        }
      }}
    >
      {history.label}
      <img
        src={searchWhiteSvg}
        alt=""
        className="float-right absolute top-4 right-3 hidden group-hover:block"
      />
    </li>
  )
  return (
    <div className="flex-auto">
      <div className="relative group z-10">
        <input
          className="w-full h-14 bg-white rounded-lg pl-10 text-black/[.40] font-[500] group-hover:text-black outline-0"
          onChange={(e) => {onChange(e.currentTarget.value)}}
          ref = {searchInputRef}
          spellCheck="false"
        ></input>
        <img src={searchGreyBlackSvg} alt="" className="absolute top-4 left-3 group-hover:hidden" />
        <img src={searchBlackSvg} alt="" className="absolute top-4 left-3 hidden group-hover:block" />
        <ul className="absolute w-full top-[3rem] hidden group-hover:block max-h-[20rem] overflow-y-auto hide-scrollbar z-10 rounded-b-lg">
          {searchResultsHTML}
        </ul>
      </div>
      <p className="text-white mt-3 mb-1">搜索历史</p>
      <ul className="w-full max-h-[calc(100vh_-_15rem)] overflow-y-auto hide-scrollbar">
        {searchHistoryHTML}
      </ul>
    </div>
  );
});

export default Search;




