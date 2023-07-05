import { makeAutoObservable } from "mobx";

class GraphStore {
  id = 0
  currentId = "root";
  currentMode = "dendrogram";
  currentHover = "";
  infoMap = new Map<string,string>();
  constructor() {
    makeAutoObservable(this);
  }
  changeId(id: string) {
    this.currentId = id;
  }
  changeMode() {
    this.currentMode === 'mindmap' ? this.currentMode = 'dendrogram' : this.currentMode = 'mindmap';
  }
  hover(id: string) {
    this.currentHover = id;
  }
  setInfo(id: string, info:string) {
    this.infoMap.set(id, info);
  }
  addId() {
    this.id++;
  }
}

const graphStore = new GraphStore();

export default graphStore;
