sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/format/DateFormat",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   * @param DateFormat
   * @param JSONModel
   */
  function (Controller, DateFormat, JSONModel, formatter,) {
    "use strict";

    return Controller.extend("cloneTelegramApp.cloneTelegram.controller.UserChat", {
      formatter: formatter,
      onInit: async function () {
        let oEventBus = sap.ui.getCore().getEventBus();
        oEventBus.subscribe("messages", "messageResponce", this.onMessageResponce, this)
        oEventBus.subscribe("newMessages", "messageResponse", this.onNewMessage, this )
        // var oModel = new JSONModel({EntryCollection: []});
        // this.getView().setModel(oModel);
        // let url = "http://127.0.0.1:5000/messages"
        // let urlMess = "http://127.0.0.1:5000/api/messages/436411050"
        // let res = await fetch(urlMess)
        // let data = await res.json()
        // // console.log(data.result.messages)
        // // console.log(data.result)
        // let messageUsersModel = new JSONModel({
        //   message: data.result.messages
        // });
        // // messageUsersModel.loadData(urlMess, null, true, "GET", null, false);
        // this.getView().setModel(messageUsersModel, "messageUsersModel")
        // console.log(messageUsersModel)
        let oRouter =  this.getOwnerComponent().getRouter();
        oRouter.getRoute("UserChat").attachMatched(this._onObjectMatched, this);
      },
      onMessageResponce: function (sChanel, sEvent, oData ) {
        console.dir(oData);
      },
      onNewMessage: function (sChanel, sEvent, oData) {
        console.log(oData)
        let oModel =  this.getView().getModel("messageUsersModelius");
        let oCollectionMessage = Object.assign({}, oModel.getData()["message"]);
        let findChat = oModel.getData()["message"].messages.find( chat => chat.peerId.channelId === oData.msg.chatId)
      // debugger
        if (findChat) {
          oCollectionMessage.messages.push(oData.msg.message);
          oModel.setProperty("/message", Object.assign({}, oCollectionMessage));
          console.log(oModel)
        }
        else {
          console.log("другой чат")
        }
      },
      _onObjectMatched: async function (oEvent) {
        // debugger
        this.getView().setBusy(true)
        let oItem, oView;
        oItem = oEvent.getParameter("arguments").UserChatId; // Получение detailId
        console.log(oEvent.getParameter("arguments"))
        // this.getView().bindElement({
        //   path: "/" + oItem,
        //   model: "messageUsersModelius"
        // });



        let urlId = `http://127.0.0.1:5000/message/${oItem}`
        let sHeaders = {
          "Accept": "application/json",
          "Access-Control-Allow-Origin": "*",
          "X-Requested-With": "XMLHttpRequest",
          "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
        };
        // let datas = await fetch( urlId, {
        //   method: "POST",
        //   headers: sHeaders,
        //   body: JSON.stringify({
        //     idChat: oItem
        //   })
        // });
        let datas = await fetch( urlId, {
          method: "GET",
          headers: sHeaders,
        });
        let result = await datas.json();

        let messageUsersModelius = new JSONModel({
          message: result.messages,
          idChat: result.idChat,
          nameChat: result.messages.chats[0].title
        });
        this.getView().setModel(messageUsersModelius, "messageUsersModelius");
        this.getView().setBusy(false);
        console.log(messageUsersModelius)
        let messageArray = this.getView().getModel("messageUsersModelius").getData().message.messages;
        // let buf = result.messages.users[0].photo.strippedThumb
        // debugger
        formatter.getUser(messageArray, messageUsersModelius.getData().message.users)
        let lastIndexArray = messageArray.findIndex(indexArr => indexArr === messageArray[messageArray.length - 1]);
        let oChatContainer = this.byId("ListMessages");
        oChatContainer.scrollToIndex(lastIndexArray);

      },
      onPost: async function(oEvent) {
        let oModel =  this.getView().getModel("messageUsersModelius");
        let chatId = oModel.getData().idChat


        let oValue = oEvent.getParameter("value");
        let url = "http://127.0.0.1:5000/sendMessage"
        let sHeaders = {
          "Accept": "application/json",
          "Access-Control-Allow-Origin": "*",
          "X-Requested-With": "XMLHttpRequest",
          "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
        };
        let body = JSON.stringify({
          id: new Date().getTime(),
          message: oValue,
          idChat: chatId
        });
        let oCollectionMessage = Object.assign({}, oModel.getData()["message"]);
        oCollectionMessage.messages.push({
          date: Math.floor(Date.now() / 1000),
          message: oValue
        });
        oModel.setProperty("/message", Object.assign({}, oCollectionMessage));
        // debugger
        let socket = this.getOwnerComponent().socket;
        socket.send(body);

        // let datas = await fetch( url, {
        //   method: "POST",
        //   headers: sHeaders,
        //   body: JSON.stringify({
        //     message: oValue,
        //     idChat: chatId
        //   })
        // });
        // let result = await datas.json()
        // console.log(result)
        //   let socket = new WebSocket("ws://127.0.0.1:4000")
        // socket.onopen = () => {
        //     console.log("server ON")
        //   // socket.a("sendMessage", () => {
        //   //   socket.send(oValue)
        //   // }
        // }
        // socket.onmessage = () => {
        //   let body =  JSON.stringify({
        //     id: new Date().getTime(),
        //     message: oValue,
        //     idChat: chatId
        //   });
        //   socket.send(body)
        //   // oModel.getProperty( oModel.getData()["message"].messages, Object.assign({}, oModel.getData()["message"].messages.push(oValue)));
        //   // oModel.getData()["message"].messages
        // }
          // socket.onmessage("sendMessage", function message(event) {
          //   socket.send(oValue)
          // })

        // formatter.ioSocket()
        // var oEntry = {
        //   Author: "Alexandrina Victoria",
        //   AuthorPicUrl: "http://upload.wikimedia.org/wikipedia/commons/a/aa/Dronning_victoria.jpg",
        //   Type: "Reply",
        //   Date: "" + sDate,
        //   Text: sValue
        // };
        // update model
        // aEntries.push(oEntry);
        // oModel.setData({
        //   EntryCollection: aEntries
        // });
      },
    });
  });
