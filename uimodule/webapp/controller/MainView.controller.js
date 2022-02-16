sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("cloneTelegramApp.cloneTelegram.controller.MainView", {
            onInit: function () {
              let oRouter =  this.getOwnerComponent().getRouter();
              oRouter.getRoute("MainView").attachMatched(this._onObjectMatched, this);
              oRouter.getRoute("Authorization").attachMatched(this._onObjectMatched, this);
              oRouter.getRoute("Contacts").attachMatched(this._onObjectMatched, this);
              oRouter.getRoute("UserChat").attachMatched(this._onObjectMatched, this);
            },
          _onObjectMatched: function (oEvent) {
              let oContainer = this.byId("appContainer")
             let global = this.getOwnerComponent()
              // oContainer.mAggregations._navMaster.setVisible(false)
            // debugger
            // oContainer.destroyMasterPages()
           // debugger
            if (oEvent.getParameter("name") === "Contacts" || oEvent.getParameter("name") === "UserChat"){
              oContainer.mAggregations._navMaster.setVisible(true) //переделать !
              // oContainer.hi
            }
           //  if (oEvent.getParameter("name") === "MainView" || oEvent.getParameter("name") === "UserChat"){
           //    oContainer.mAggregations._navMaster.setVisible(false)
           //  }
            else {
              oContainer.mAggregations._navMaster.setVisible(false)
            }
            // oContainer.mAggregations._navMaster.setVisible(false)
            //   console.log(oEvent)
          }
        });
    });
