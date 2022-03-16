sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/format/DateFormat","sap/ui/model/json/JSONModel","../model/formatter"],function(e,s,t,o){"use strict";return e.extend("cloneTelegramApp.cloneTelegram.controller.UserChat",{formatter:o,onInit:async function(){let e=sap.ui.getCore().getEventBus();e.subscribe("messages","messageResponce",this.onMessageResponce,this);e.subscribe("newMessages","messageResponse",this.onNewMessage,this);let s=this.getOwnerComponent().getRouter();s.getRoute("UserChat").attachMatched(this._onObjectMatched,this)},onMessageResponce:function(e,s,t){console.dir(t)},onNewMessage:function(e,s,t){console.log(t);let o=this.getView().getModel("messageUsersModelius");let a=Object.assign({},o.getData()["message"]);let n=o.getData()["message"].messages.find(e=>e.peerId.channelId===t.msg.chatId);if(n){a.messages.push(t.msg.message);o.setProperty("/message",Object.assign({},a));console.log(o)}else{console.log("другой чат")}},_onObjectMatched:async function(e){this.getView().setBusy(true);let s,a;s=e.getParameter("arguments").UserChatId;console.log(e.getParameter("arguments"));let n=`http://127.0.0.1:5000/message/${s}`;let l={Accept:"application/json","Access-Control-Allow-Origin":"*","X-Requested-With":"XMLHttpRequest","Access-Control-Allow-Methods":"GET,POST,PUT,DELETE,OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"};let g=await fetch(n,{method:"GET",headers:l});let i=await g.json();let r=new t({message:i.messages,idChat:i.idChat,nameChat:i.messages.chats[0].title});this.getView().setModel(r,"messageUsersModelius");this.getView().setBusy(false);console.log(r);let c=this.getView().getModel("messageUsersModelius").getData().message.messages;o.getUser(c,r.getData().message.users);let h=c.findIndex(e=>e===c[c.length-1]);let d=this.byId("ListMessages");d.scrollToIndex(h)},onPost:async function(e){let s=this.getView().getModel("messageUsersModelius");let t=s.getData().idChat;let o=e.getParameter("value");let a="http://127.0.0.1:5000/sendMessage";let n={Accept:"application/json","Access-Control-Allow-Origin":"*","X-Requested-With":"XMLHttpRequest","Access-Control-Allow-Methods":"GET,POST,PUT,DELETE,OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"};let l=JSON.stringify({id:(new Date).getTime(),message:o,idChat:t});let g=Object.assign({},s.getData()["message"]);g.messages.push({date:Math.floor(Date.now()/1e3),message:o});s.setProperty("/message",Object.assign({},g));let i=this.getOwnerComponent().socket;i.send(l)}})});