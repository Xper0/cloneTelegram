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
        // console.log(oEvent)
        // let oItem = oEvent.getSource().getBindingContext("taskModel").getObject();
        // console.log(oItem)
        // debugger
        console.log(oEvent)
        let oItem = oEvent.getSource().getBindingContext("ListTasks");
        let sKey = oItem.getProperty("key");

        // let oItems = oEvent.getSource().getBindingContext("ListTasks").getPath()
        // console.log(oItems.substr(7))
       //debugger
        // let oItem = oEvent.getSource().getBindingContext("Contacts").getObject()
        let oRouter = this.getOwnerComponent().getRouter();
        console.log(oRouter)
        // oRouter.navTo("DetailTasks")
        oRouter.navTo("DetailTasks", {
          detailCategory: sKey
        })

      },

      onAddListTask: async function () {
        let newTask = {
          id: 9,
          title: "Тест задачи",
          description: "Добвление новых задач",
          date: 1629795050,
          status: "Выплняется",
          importance: "Средняя",
          supervisor: "Александр",
          responsible: "Александр"
        }
        const url = " http://127.0.0.1:5000/tasks";
        let sHeaders = {
          "Accept": "application/json",
          "Access-Control-Allow-Origin": "*",
          "X-Requested-With": "XMLHttpRequest",
          "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
        };
        let data = await fetch(url, {
          method: "POST",
          headers: sHeaders,
          body: JSON.stringify({
            task: newTask
          })
        });

       console.log("задача добавлена")
      }


    });
  });
