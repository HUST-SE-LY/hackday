declare type loginOrRegisterParams ={
  phoneNumber: string;
  verifyCode: string;
}
declare type loginByPasswordParams ={
  phoneNumber: string;
  password: string;
}
declare type changePasswordParams ={
  password: string;
}
declare type thinkInHomeParams ={
  keyword: string
}
declare type changeNodeLabelParams ={
  id: string
  label: string
}
declare type addNodeChildParams ={
  id: string,
}
declare type thinkParams ={
  id: string,
  info: string,
  label: string,
}
declare type autoLinkParams ={
  id: string,
  info: string
}
declare type createLinkParams ={
  id: string,
  info: string,
}
declare type deleteNodeParams ={
  id: string,
}
declare type sendVerifyCodeParams = {
  phoneNumber: string
}
