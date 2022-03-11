sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/f/library',
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",

  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   * @param fioriLibrary
   */
  function (Controller, fioriLibrary, JSONModel, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("cloneTelegramApp.cloneTelegram.controller.Contacts", {
      onInit: async function () {
        this.oView = this.getView();
        this.getView().setBusy(true)
        let urlChat = "http://127.0.0.1:5000/chatList";
        let sHeaders = {
          "Accept": "application/json",
          "Access-Control-Allow-Origin": "*",
          "X-Requested-With": "XMLHttpRequest",
          "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
        };
        let data = await fetch(urlChat)
        let res = await data.json()
        console.log(res)
        let asseptChat = [436411050, 730832139, 787817835, 1513492075]
        let filterChat = res.result.chats.filter( chat => asseptChat.find( id => id == chat.id))
        let UsersModel = new JSONModel({
          chats: filterChat
        });
        // UsersModel.loadData(url1, null, true, "GET", null, false);
        // console.log(UsersModel.result)
        this.getView().setModel(UsersModel, "UsersModel")
        this.getView().setBusy(false)
        //let dataChats = UsersModel.getData()
        // console.log(UsersModel)
        // let keys = Object.keys(dataChats)
        // console.log(keys)
        // this.getView().setModel(UsersModel, "UsersModel")

        // console.log(res.users)
        // let oRouter =  this.getOwnerComponent().getRouter();
        // oRouter.getRoute("Contacts").attachMatched(this._onObjectMatched, this);
      },
      onListItemPress: function (oEvent) {
        let oItem = oEvent.getSource().getBindingContext("UsersModel").getObject();

        let getMessageChats = "http://127.0.0.1:5000/chats"
        // let oItem = oEvent.getSource().getBindingContext("Contacts").getObject()
        let oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("UserChat", {
          UserChatId: oItem.id
        });

      },
      onSearch: function (oEvent) {
        let aFilters = [];
        let sQuery = oEvent.getSource().getValue();
        if (sQuery && sQuery.length > 0) {
          let filter = new Filter("title", FilterOperator.Contains, sQuery);
          aFilters.push(filter);
        }
        // update list binding
        let oList = this.byId("ContactsTable");
        let oBinding = oList.getBinding("items");
        oBinding.filter(aFilters);
      },
      _onObjectMatched: function (oEvent) {
        let oContainer = this.byId("initPage");
        console.log(oEvent)
        debugger
        // console.log(oContainer)
        // oContainer.mAggregations._navMaster.setVisible(true)
        // // debugger
        // console.log(oEvent)
      }
    });
  });
