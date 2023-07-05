declare type loginOrRegisterParams ={
  phone: string;
  code: string;
}
declare type loginByPasswordParams ={
  phone: string;
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
  phone: string
}
