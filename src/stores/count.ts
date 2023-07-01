import { makeAutoObservable } from "mobx";

class CountStore {
  count = 0;
  constructor() {
    makeAutoObservable(this);
  }
  add() {
    this.count++;
  }
  minus() {
    this.count--;
  }
}

const countStore = new CountStore();
export default countStore;
