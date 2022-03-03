sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/BusyIndicator"
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   * @param DateFormat
   * @param JSONModel
   */
  function (Controller, BusyIndicator) {
    "use strict";

    return Controller.extend("cloneTelegramApp.cloneTelegram.controller.Init", {
      onInit: async function () {
        let oUserContainer = this.byId("User-panel");
        oUserContainer.setVisible(false);
        let oRouter =  this.getOwnerComponent().getRouter();
        let url = "http://127.0.0.1:5000/session"
        let sHeaders = {
          "Accept": "application/json",
          "Access-Control-Allow-Origin": "*",
          "X-Requested-With": "XMLHttpRequest",
          "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
        };
        // let busy = new sap.m.BusyIndicator( "busy",  {
        //   customIcon: "sap-icon://busy"
        //   }
        // )
        let userPhone = 89060733437;

        let getData =  async () => {
          try {
            BusyIndicator.show()
           let data = await fetch(url, {
              method: "POST",
              headers: sHeaders,
              body: JSON.stringify({
                phone: userPhone
              })
            });
            return data
          } catch (err) {
            console.log("ошибка запроса");
          }
        };

        let res = await getData();
        if (res) {
          BusyIndicator.hide();
          switch (res.status) {
            case 201:
              oUserContainer.setVisible(true)
              // oRouter.getRoute("Contacts").attachMatched(this._onObjectMatched, this);
              // oRouter.navTo("Contacts", {
              //   UserContacts: userPhone
              // });
              break;
            case 401:
              oRouter.navTo("Authorization")
          }

        }
        else{
          BusyIndicator.show(3000);
          window.alert("refresh page")
          BusyIndicator.hide()
        }
        // let res = await fetch( url, {
        //   method: "POST",
        //   headers: sHeaders,
        //   body: JSON.stringify({
        //     phone: 89060733438
        //   })
        // });

        // console.log(res)

        // let data = await res.json()
        // if (res.status === 401 ){
        //   oRouter.navTo("Authorization")
        //   // BusyIndicator.hide()
        // }
        // else {
        //   // BusyIndicator.hide()
        //   oUserContainer.setVisible(true)
        // }
        // console.log(data)
      },
      onSignIn: function () {
        let userPhone = 89060733437;
        let oRouter =  this.getOwnerComponent().getRouter();
        oRouter.navTo("Contacts", {
          UserContacts: userPhone
        })
        let url = "http://127.0.0.1:5000";
        fetch(url)
      },
      _onObjectMatched: function (oEvent) {
        let oItem, oView;
        oItem = oEvent.getParameter("arguments").UserChatId; // Получение detailId
        let oModel = this.getView().getModel("MessageUsers").getData();
        let indexModelChat = oModel.findIndex(item => item.id === Number(oItem))
        oView = this.getView();
        oView.bindElement({
          path: "/" + indexModelChat,
          model: "MessageUsers",
        })
      },
      // show: function () {
      //   let oUserContainer = this.byId("User-panel")
      //   console.log(oUserContainer)
      //   oUserContainer.setVisible(true)
      // }

    });
  });
