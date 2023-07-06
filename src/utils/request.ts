import getAiAxios from "./getAiAxios";
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

export async function homeThink(key: string) {
  const axios = getAiAxios();
  const res = await axios.post("",{
    "model": "gpt-3.5-turbo",
    "messages": [{"role": "system", "content": `现在你是我的关键词联想助手，你的回复必须只能由关键词组成，关键词只能由空格分割，不能有任何其他的内容。我会给出一个关键词，你根据这个关键词的含义进行联想，得到三个关键词。例如，我给出关键词肯德基，你的回答内容和格式应该是：炸鸡 汉堡 可乐。现在，我的关键词是：${key}`}]
  })
  return (res.data.choices[0].message.content as string).split(" ");
}

export async function thinkInfo(label:string, info: string) {
  const axios = getAiAxios();
  const res = await axios.post("", {
    "model": "gpt-3.5-turbo",
    "messages": [{"role": "system", "content": `你是我的关键词总结助手，你的回答必须是总结出的一段话和一个关键词，它们之间用空格符隔开，注意必须使用空格符，并保证其余地方没有空格符，不能有任何多余内容，一段话不要超过50字。现在我会给出一个或一组关键词（用逗号隔开）和这些关键词所对应的内容，你需要根据关键词和它的内容联想出一个另一个关联词，并解释它和已有内容的关系，注意你得出的关键词不能和我给出的关键词的任何一个相同。例如我的给出已有内容是：肯德基，你应该回答内容和格式应该是：炸鸡 肯德基里有炸鸡套餐。现在我给出的关键词是：${label}，它的内容是${info}`}],
    "max_tokens": 200
  })
  const newInfo = res.data.choices[0].message.content.split(" ")[1];
  const newLabel = res.data.choices[0].message.content.split(" ")[0];
  return [newInfo, newLabel]
}

export async function autoCreateLink(oldLabel:string,newLabel: string, info: string) {
  const axios = getAiAxios();
  const res = await axios.post("", {
    "model": "gpt-3.5-turbo",
    "messages": [{"role": "system", "content": `你是我的关键词总结助手，你的回答必须是总结出的一段话,不能有任何多余内容，一段话不要超过50字。现在我会给出一个或一组关键词（用逗号隔开）作为原有词组和原有词组所对应的内容，我还会给出一个现有关键词作为现有关键词，你需要根据原有词组和原有词组内容解释它和现有关键词的关系，。例如我的给出原有词组是：肯德基，炸鸡，原有词组的内容肯德基提供炸鸡套餐，现有关键词是汉堡，你应该回答内容和格式应该是：肯德基里不仅有炸鸡套餐，还有汉堡套餐。现在我给出的已有词组是：${oldLabel}，已有内容是${info}，现有关键词是${newLabel}`}],
    "max_tokens": 200
  })
  return res.data.choices[0].message.content as string;

}

export async function createInfoFromRoot(label: string) {
  const axios = getAiAxios();
  const res = await axios.post("", {
    "model": "gpt-3.5-turbo",
    "messages": [{"role": "system", "content": `你是我的关键词总结助手，你的回答必须是总结出的一段话和一个关键词，它们之间用空格符隔开，注意必须使用空格符，并保证其余地方没有空格符，不能有任何多余内容，一段话不要超过50字。现在我会给出一个关键词，你需要根据关键词联想出一个另一个关联词，并解释它和已有内容的关系。例如我的给出已有内容是：肯德基，你回答的内容和格式应该是：炸鸡 肯德基里有炸鸡套餐。现在我给出的关键词是${label}`}],
    "max_tokens": 200
  })
  const newInfo = res.data.choices[0].message.content.split(" ")[1];
  const newLabel = res.data.choices[0].message.content.split(" ")[0];
  return [newInfo, newLabel]
}

export async function createLinkFromRoot(newLabel: string, oldLabel: string) {
  const axios = getAiAxios();
  const res = await axios.post("", {
    "model": "gpt-3.5-turbo",
    "messages": [{"role": "system", "content": `你是我的关键词总结助手，你的回答必须是总结出的一段话,不能有任何多余内容，一段话不要超过50字。现在我会给出一个关键词作为原有词，我还会给出一个现有关键词作为现有词，你需要根据原有词和现有词解释它们之间的关系。例如我的给出原有词是：肯德基，现有词是：炸鸡，你应该回答内容和格式应该是：肯德基有炸鸡套餐。现在我给出的已有词是：${oldLabel}，现有词是${newLabel}`}],
    "max_tokens": 200
  })
  return res.data.choices[0].message.content as string;
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





