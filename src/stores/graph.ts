import { makeAutoObservable } from "mobx";

class GraphStore {
  currentId = "root";
  currentMode = "mindmap";
  constructor() {
    makeAutoObservable(this);
  }
  changeId(id: string) {
    this.currentId = id;
  }
  changeMode() {
    this.currentMode === 'mindmap' ? this.currentMode = 'dendrogram' : this.currentMode = 'mindmap';
  }
}

const graphStore = new GraphStore();

export default graphStore;
