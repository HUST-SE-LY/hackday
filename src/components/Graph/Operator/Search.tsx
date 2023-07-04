import { observer } from "mobx-react-lite";
import { useState } from 'react'
import searchGreyBlackSvg from "/src/assets/searchGreyBlack.svg"
import searchBlackSvg from "/src/assets/searchBlack.svg"
import searchWhiteSvg from "/src/assets/searchWhite.svg"
import locationPinSvg from "/src/assets/locationPin.svg"


let key = 0

const Search = observer(() => {
  const [searchResults, setSearchResults] = useState(['test1', 'test2', 'test3', 'test4']);
  const [currentResultsLocation, setCurrentResultsLocation] = useState('test2');
  const [searchHistory, setSearchHistory] = useState(['test1', 'test2', 'test3', 'test4']);
  const searchResultsHTML = searchResults.map((result) => 
    <li 
    key={key++}
    className={`bg-white hover:bg-zinc-300 h-14 pl-8 leading-[3.5rem] font-[500] relative text-zinc-500 ${result === currentResultsLocation 
      ? " text-black"
      : ""}`}
    onClick={() => {setCurrentResultsLocation(result)}}
    >
      {result}
      <img 
      src={locationPinSvg} 
      alt="" 
      className={`float-right absolute top-3 right-3 ${result === currentResultsLocation 
        ? "" 
        : " hidden"
      }`}/>
    </li>
  );
  const searchHistoryHTML = searchHistory.map((history) => 
    <li
    key={key++}
    className="hover:bg-zinc-700 h-14 rounded-lg pl-8 leading-[3.5rem] font-[500] relative text-zinc-400 hover:text-white group"
    >
      {history}
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
        onKeyDown={(e) => {
          if (e.key === 'Enter'){
            if (!e.currentTarget.value) return;
            setSearchHistory([...searchHistory, e.currentTarget.value]);
            e.currentTarget.value = '';
          }
        }}
        ></input>
        <img src={searchGreyBlackSvg} alt="" className="absolute top-4 left-3 group-hover:hidden"/>
        <img src={searchBlackSvg} alt="" className="absolute top-4 left-3 hidden group-hover:block"/>
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




