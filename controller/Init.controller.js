sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/BusyIndicator"],function(e,t){"use strict";return e.extend("cloneTelegramApp.cloneTelegram.controller.Init",{onInit:async function(){let e=this.byId("User-panel");e.setVisible(false);let s=this.getOwnerComponent().getRouter();let n="http://127.0.0.1:5000/session";let o={Accept:"application/json","Access-Control-Allow-Origin":"*","X-Requested-With":"XMLHttpRequest","Access-Control-Allow-Methods":"GET,POST,PUT,DELETE,OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"};let i=89060733437;let l=async()=>{try{t.show();let e=await fetch(n,{method:"POST",headers:o,body:JSON.stringify({phone:i})});return e}catch(e){console.log("ошибка запроса")}};let r=await l();if(r){t.hide();switch(r.status){case 201:e.setVisible(true);break;case 401:s.navTo("Authorization")}}else{t.show(3e3);window.alert("refresh page");t.hide()}},onSignIn:function(){let e=89060733437;let t=this.getOwnerComponent().getRouter();t.navTo("Contacts",{UserContacts:e});let s="http://127.0.0.1:5000";fetch(s)},_onObjectMatched:function(e){let t,s;t=e.getParameter("arguments").UserChatId;let n=this.getView().getModel("MessageUsers").getData();let o=n.findIndex(e=>e.id===Number(t));s=this.getView();s.bindElement({path:"/"+o,model:"MessageUsers"})}})});