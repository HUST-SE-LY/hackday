import { observer } from "mobx-react-lite";
import { useState } from "react";
import Search from './Operator/Search'
import History from './Operator/History'
import Folder from './Operator/Folder'
import unfoldMoreSvg from "/src/assets/unfoldMore.svg"
import historySvg from "/src/assets/history.svg"
import historyWhiteSvg from "/src/assets/historyWhite.svg"
import searchGreyWhiteSvg from "/src/assets/searchGreyWhite.svg"
import searchWhiteSvg from "/src/assets/searchWhite.svg"
import folderSvg from "/src/assets/folder.svg"
import folderWhiteSvg from "/src/assets/folderWhite.svg"

export type operatorProps = {
    data: {
        id: string;
        label: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        children?: any
    }
}

const Operator = observer(({ data }: operatorProps) => {
    const [isOperatorShow, setIsOperatorShow] = useState(true);
    const [currentOperatorMode, setCurrentOperatorMode] = useState('search');
    const getOperatorComponent = () => {
        if (currentOperatorMode === 'history') { return <History></History> }
        else if (currentOperatorMode === 'search') { return <Search data={data}></Search> }
        else { return <Folder></Folder> }
    }
    return (
        <div className={`w-[20rem] h-screen bg-zinc-800 flex transition-transform duration-1000 ${isOperatorShow ? "" : " translate-x-[-18rem]"}`}>
            {/* 面板主体 */}
            <div className="ml-[1.5rem] basis-[16.5rem] flex flex-col">
                {/* 三个面板选项 */}
                <div className="mt-[4rem] mb-[1rem]">
                    <div className="flex items-center gap-[1rem]">
                        <div
                            className="group hover:bg-indigo-600 w-[2.5rem] h-[2.5rem] rounded-full"
                            onClick={() => { setCurrentOperatorMode('history') }}
                        >
                            <img src={historySvg} alt="" className="translate-y-[0.4rem] translate-x-[0.4rem] group-hover:hidden" />
                            <img src={historyWhiteSvg} alt="" className="translate-y-[0.4rem] translate-x-[0.4rem] hidden group-hover:block" />
                        </div>
                        <div
                            className="group hover:bg-indigo-600 w-[2.5rem] h-[2.5rem] rounded-full"
                            onClick={() => { setCurrentOperatorMode('search') }}
                        >
                            <img src={searchGreyWhiteSvg} alt="" className="translate-y-[0.6rem] translate-x-[0.6rem] group-hover:hidden" />
                            <img src={searchWhiteSvg} alt="" className="translate-y-[0.6rem] translate-x-[0.6rem] hidden group-hover:block" />
                        </div>
                        <div
                            className="group hover:bg-indigo-600 w-[2.5rem] h-[2.5rem] rounded-full"
                            onClick={() => { setCurrentOperatorMode('folder') }}
                        >
                            <img src={folderSvg} alt="" className="translate-y-[0.6rem] translate-x-[0.6rem] group-hover:hidden" />
                            <img src={folderWhiteSvg} alt="" className="translate-y-[0.6rem] translate-x-[0.6rem] hidden group-hover:block" />
                        </div>
                    </div>
                </div>
                {/* 三个面板组件 */}
                {getOperatorComponent()}
            </div>
            {/* 收起/打开按钮 */}
            <div
                className="basis-[2rem] relative cursor-pointer"
                onClick={() => { setIsOperatorShow(!isOperatorShow) }}
            >
                <img
                    src={unfoldMoreSvg}
                    alt=""
                    className={`absolute top-1/2 mt-[-21px] ${isOperatorShow ? "" : " rotate-180"}`}
                />
            </div>
        </div>
    );
});

export default Operator;
