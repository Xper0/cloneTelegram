sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel"],function(e,t){"use strict";return e.extend("cloneTelegramApp.cloneTelegram.controller.Authorization",{onInit:function(){let e=this.getOwnerComponent().getRouter()},Request:async function(e){let t="http://127.0.0.1:5000/reg";let o={Accept:"application/json","Access-Control-Allow-Origin":"*","X-Requested-With":"XMLHttpRequest","Access-Control-Allow-Methods":"GET,POST,PUT,DELETE,OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"};let n=await fetch(t,{method:"POST",headers:o,body:JSON.stringify(e)});return n},checkFieldPhone:function(e){let t=e.getParameters("value").value;let o=this.byId("buttonNext");if(t.length===11){o.setVisible(true)}else{o.setVisible(false)}},Submit:async function(){let e=this.byId("maskInputPhone").getProperty("value");let o="http://127.0.0.1:5000/reg";let n={Accept:"application/json","Access-Control-Allow-Origin":"*","X-Requested-With":"XMLHttpRequest","Access-Control-Allow-Methods":"GET,POST,PUT,DELETE,OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"};let s=this.getView().byId("ShoppingCartWizard");let l={phone:e.split(" ").join(""),password:"",name:"Alex"};const i=this.Request(l);const a=async()=>await this.Request(l);let r=(await i).json();let c=await r;if((await i).status===201){let o=new t({phone:e.split(" ").join(""),phoneCodeHash:c.phoneCode});this.getView().setModel(o,"myUserModel");console.log("Double render");window.alert("registr Ok");s.nextStep()}else{window.alert("Phone number invalid or not found")}},checkField:async function(e){let t=e.getParameters("value").value;let o=this.getOwnerComponent().getRouter();let n=this.getView().getModel("myUserModel").getData();if(t.length===5){let e={phoneCode:t,phone:n.phone,phoneCodeHash:n.phoneCodeHash};const s=async()=>await this.Request(e);let l=(await this.Request(e).then(e=>e)).status;if(l===201){o.navTo("MainView")}else if(l!==201){return window.alert("phone code invalid")}}else{return}}})});