import { makeAutoObservable } from "mobx";

class GraphStore {
  currentId="root"; 
  constructor() {
    makeAutoObservable(this);
  }
  changeId(id: string) {
    this.currentId = id;
  }
}

const graphStore = new GraphStore();

export default graphStore