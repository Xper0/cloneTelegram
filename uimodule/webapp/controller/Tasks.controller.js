sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/core/Popup",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   * @param DateFormat
   * @param JSONModel
   */
  function (Controller, Fragment, Popup, JSONModel, formatter, coreLibrary ) {
    "use strict";
    return Controller.extend("cloneTelegramApp.cloneTelegram.controller.Tasks", {
      formatter: formatter,
      q: function ()  {
        debugger
      },
      onInit : async function () {

      },
      onAddTask: function () {
        let oRouter = this.getOwnerComponent().getRouter();
        console.log(oRouter)
        // oRouter.navTo("DetailTasks")
        oRouter.navTo("createTask")
        // load asynchronous XML fragment
        // Popup.setWithinArea(this.byId("withinArea"));
        // let  oButton = oEvent.getSource()
        // if (!this._pCategoryFilterDialog) {
        //   this._pCategoryFilterDialog = Fragment.load({
        //     id: this.getView().getId(),
        //     name: "cloneTelegramApp.cloneTelegram.view.addTask",
        //     controller: this
        //   }).then(function(oDialog){
        //     // connect dialog to the root view of this component (models, lifecycle)
        //
        //     this.getView().addDependent(oDialog);
        //     // oDialog.addStyleClass(this.getOwnerComponent().getContentDensityClass());
        //     return oDialog;
        //   }.bind(this));
        // }
        // this._pCategoryFilterDialog.then(function(oDialog) {
        //   oDialog.openBy(oButton);
        // });
      },
      onListItemPress1: function (oEvent) {
        let oItem = oEvent.getSource().getBindingContext("ListTasks");
        let sKey = oItem.getProperty("key");
        let oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("DetailTasks", {
          detailCategory: sKey
        });
      },
    });
  });
