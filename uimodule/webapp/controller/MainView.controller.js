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
              oRouter.getRoute("Init").attachMatched(this._onObjectMatched, this);
              oRouter.getRoute("Tasks").attachMatched(this._onObjectMatched, this);
              oRouter.getRoute("DetailTasks").attachMatched(this._onObjectMatched, this);
              oRouter.getRoute("AboutTask").attachMatched(this._onObjectMatched, this);
            },
          _onObjectMatched: function (oEvent) {
              let oContainer = this.byId("splitContainer")
             let global = this.getOwnerComponent()
              // oContainer.mAggregations._navMaster.setVisible(false)
            // debugger
            // oContainer.destroyMasterPages()
           // debugger
            if (oEvent.getParameter("name") === "Contacts" ||
              oEvent.getParameter("name") === "UserChat" ||
              oEvent.getParameter("name") === "Tasks" ||
              oEvent.getParameter("name") === "DetailTasks" ||
              oEvent.getParameter("name") === "AboutTask"
            ){
             // debugger
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
          },
          onItemSelect: function (oEvent) {
            let oRouter = this.getOwnerComponent().getRouter();
            let oItem = oEvent.getParameter("item");
            // debugger
            let oItemSelect = oItem.getProperty("text");
            switch (oItemSelect) {
              case "Сообщения":
                oRouter.navTo("Init");
                break;
              case "Задачи":
                oRouter.navTo("DetailTasks", {
                  detailCategory: "All"
                });
                break;
              default:
                sap.m.MessageToast.show("категория не обнаружена")
            }
            //
            // debugger
            // let categoryData = oItem.getBindingContext("category").getObject()
            // console.log(oItem)
            // let sCategory = categoryData.CategoryName;
            // let oRouter = this.getOwnerComponent().getRouter();
            // if (sCategory) {
            //   oRouter.navTo("Category", {category: sCategory});
            // } else {
            //   sap.m.MessageToast.show("категория не обнаружена")
            // }
          }
        });
    });
