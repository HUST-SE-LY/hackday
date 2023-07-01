import { makeAutoObservable } from "mobx";

class LoginStore {
  isLogin = false;
  constructor() {
    makeAutoObservable(this);
  }
  login() {
    this.isLogin = true;
  }
  logout() {
    this.isLogin = false;
  }
}

const loginStore = new LoginStore();
export default loginStore;
