import { makeAutoObservable } from "mobx";

class KeywordsStore {
  currentKeyWord=""; 
  constructor() {
    makeAutoObservable(this);
  }
  changeKeyword(keyWord: string) {
    this.currentKeyWord = keyWord;
  }
}

const keywordStore = new KeywordsStore();

export default keywordStore