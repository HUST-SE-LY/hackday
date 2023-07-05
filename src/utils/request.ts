import getAxios from "./getAxios";

const axios = getAxios();

interface Routers {
  loginOrRegister: routerType,
  loginByPassword: routerType,
  changePassword: routerType,
  getGraph: routerType
  checkLogin: routerType,
  thinkInHome: routerType,
  changeNodeLabel: routerType,
  addNodeChild: routerType,
  think: routerType,
  autoLink: routerType,
  createLink: routerType,
  deleteNode: routerType,
  sendVerifyCode: routerType
}

const routers:Routers = {
  sendVerifyCode: {
    method: "post",
    path: "/user/getCode"
  },
  loginOrRegister: {
    method: "post",
    path: "/user/loginWithCode"
  },
  loginByPassword: {
    method: "post",
    path: "/user/loginWithPwd"
  },
  changePassword: {
    method: "post",
    path: "/user/updatePwd"
  },
  getGraph: {
    method: "get",
    path: ""
  },
  checkLogin: {
    method: "get",
    path: "user/userInfo"
  },
  thinkInHome: {
    method: "post",
    path: ""
  },
  changeNodeLabel: {
    method: "post",
    path: ""
  },
  addNodeChild: {
    method: "post",
    path: ""
  },
  think: {
    method: "post",
    path: ""
  },
  autoLink: {
    method: "post",
    path: ""
  },
  createLink: {
    method: "post",
    path: ""
  },
  deleteNode: {
    method: "delete",
    path: ""
  }
}


async function basicRequest<T>(
  path: string,
  method: "post" | "get" | "put" | "delete",
  params?: T
) {
  switch(method) {
    case "post": return await axios.post(path, params);
    case "get": return await axios.get(path, {
      params,
    });
    case "put": return await axios.put(path, params);
    case "delete": return await axios.delete(path, {
      params
    });
  }
}

export async function loginOrRegister(params: loginOrRegisterParams) {
  return basicRequest(routers.loginOrRegister.path, routers.loginOrRegister.method, params);
}

export async function loginByPassword(params: loginByPasswordParams) {
  return basicRequest(routers.loginByPassword.path, routers.loginByPassword.method, params);
}

export async function changePassword(params: changePasswordParams) {
  return basicRequest(routers.changePassword.path, routers.changePassword.method, params);
}

export async function checkLogin() {
  return basicRequest(routers.checkLogin.path, routers.checkLogin.method)
}

export async function getGraph() {
  return basicRequest(routers.getGraph.path, routers.getGraph.method)
}

export async function thinkInHome(params: thinkInHomeParams) {
  return basicRequest(routers.thinkInHome.path, routers.thinkInHome.method, params);
}

export async function changeNodeLabel(params: changeNodeLabelParams) {
  return basicRequest(routers.changeNodeLabel.path, routers.changeNodeLabel.method, params);
}

export async function addNodeChild(params: addNodeChildParams) {
  return basicRequest(routers.addNodeChild.path, routers.addNodeChild.method, params);
}

export async function think(params: thinkParams) {
  return basicRequest(routers.think.path, routers.think.method, params);
}

export async function autoLink(params: autoLinkParams) {
  return basicRequest(routers.autoLink.path, routers.autoLink.method, params);
}

export async function createLink(params: createLinkParams) {
  return basicRequest(routers.createLink.path, routers.createLink.method, params);
}

export async function deleteNode(params: deleteNodeParams) {
  return basicRequest(routers.createLink.path, routers.createLink.method, params);
}

export async function sendVerifyCode(params: sendVerifyCodeParams) {
  return basicRequest(routers.sendVerifyCode.path, routers.sendVerifyCode.method, params);
}





