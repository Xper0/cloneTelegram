sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../model/formatter",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/routing/History",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   * @param DateFormat
   * @param JSONModel
   */
  function (Controller, formatter, JSONModel, History ) {
    "use strict";
    return Controller.extend("cloneTelegramApp.cloneTelegram.controller.EditTask", {
      formatter: formatter,
      onInit :  function () {
        let oRouter =  this.getOwnerComponent().getRouter();
        oRouter.getRoute("EditTask").attachMatched(this._onObjectMatched, this);
      },
      _onObjectMatched: function (oEvent) {
        let sTaskId = oEvent.getParameter("arguments").editTaskId;
        this.getOwnerComponent().loadTasks().then(() => {
          let aTasks = this.getOwnerComponent().getModel("ListTasks").getData().tasksList;
          let nTaskIndex = aTasks.findIndex(taskId => taskId.id == sTaskId)
          console.log(nTaskIndex)
          let sPath = `/tasksList/${nTaskIndex}`
          // UsersModel.loadData(url1, null, true, "GET", null, false);
          // console.log(UsersModel.result)
          // this.getView().setModel(aboutModel, "aboutModel");
          this.getView().bindElement({
            path: sPath,
            model: "ListTasks"
          });
        });
        // let oEventBus = sap.ui.getCore().getEventBus();
        // oEventBus.subscribe("tasks", "tasksLoaded",
        // })

        // console.log(element)
        // let dat = this.getView().getModel("aboutModel")
        // console.log(dat)
        // let oModel =
        //   this.getView().bindElement({
        //     path: "/" + oItem,
        //     model: "ListTasks"
        //   });
        // console.log(oModel)
      },
      onSaveTask: async function () {
        let pathId = this.getOwnerComponent().getRouter().oHashChanger.hash.substr(9);
        let form = this.byId("editTask");
        let elements = form.getFormContainers()[0].getFormElements();
        let formData = {};
        let oRouter =  this.getOwnerComponent().getRouter();
        const url = " http://127.0.0.1:5000/tasksList";
        let sHeaders = {
          "Accept": "application/json",
          "Access-Control-Allow-Origin": "*",
          "X-Requested-With": "XMLHttpRequest",
          "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
        };
         elements.forEach(item => {
          if (item.getLabel() === "Название задачи") {
            formData.title = item.getFields()[0].getProperty("value");
          }
          if (item.getLabel() === "Описание задачи") {
            formData.description = item.getFields()[0].getProperty("value");
          }
          if (item.getLabel() === "Крайний срок") {
            formData.date = item.getFields()[0].getProperty("value");
          }
          if (item.getLabel() === "Важность") {
            formData.status = item.getFields()[0].getProperty("value");
          }
          if (item.getLabel() === "Постановщик") {
            formData.supervisor = item.getFields()[0].getProperty("value");
          }
          if (item.getLabel() === "Ответсвенный") {
            formData.responsible = item.getFields()[0].getProperty("value");
          }
          formData.id = pathId
         });

        let datas = await fetch( url, {
            method: "POST",
            headers: sHeaders,
            body: JSON.stringify({
              task: formData,
            })
          });
          let result = await datas.json()
          console.log(result)
          oRouter.navTo("Tasks")
      },
      onCancel: function () {

      }
    });
  });