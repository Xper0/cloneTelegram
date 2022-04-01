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
        let formData = {};
        let oModel = this.getView().getModel("CommentsTask").getData();
        let oItem = this.getView().getBindingContext("ListTasks").getObject();
        // console.log(oItem.chatId)
        let chatId = undefined
        if (oModel.hasOwnProperty("comments")) {
          chatId = oModel.comments.chats[0].id;
          // formData.chatId =  oItem.chatId;
        }
        let pathId = this.getOwnerComponent().getRouter().oHashChanger.hash.substr(9);
        let valueNameTask = this.byId("NameTask").getValue(),
         valueDescription = this.byId("Description").getValue(),
         valueSupervisor = this.byId("Supervisor").getValue(),
         valueResponsible = this.byId("Responsible").getValue(),
         valueDate = this.byId("Date").getValue(),
         valueImportance = this.byId("Importance").getValue(),
         listSubtasks = this.byId("listSubtasks"),
         subtasks = [],
         itemAgregation = listSubtasks.getAggregation("items");

        itemAgregation.forEach( agregation => {
          let itemElement = agregation.getAggregation("content");
          // itemElement[0].getProperty("selected");
          // itemElement[1].getProperty("value");
          subtasks.push({
            title:  itemElement[0].getProperty("value"),
            state: false
            // state:   itemElement[0].getProperty("selected")
          });
        });
        // formData.subtasks = subtasks
        let convertTime = Math.floor(new Date(valueDate).getTime() / 1000);
        formData = {
          id: pathId,
          chatId,
          title: valueNameTask,
          description: valueDescription,
          date: convertTime,
          importance: valueImportance,
          supervisor: valueSupervisor,
          responsible: valueResponsible,
          subtasks: subtasks,
          status: oItem.status,
          progress: oItem.progress
        };


        // let form = this.byId("editTask");
        // let elements = form.getFormContainers()[0].getFormElements();

        let oRouter =  this.getOwnerComponent().getRouter();
        const url = " http://127.0.0.1:5000/tasksList";
        let sHeaders = {
          "Accept": "application/json",
          "Access-Control-Allow-Origin": "*",
          "X-Requested-With": "XMLHttpRequest",
          "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
        };
        // debugger
        //  elements.forEach(item => {
        //   if (item.getLabel() === "Название задачи") {
        //     formData.title = item.getFields()[0].getProperty("value");
        //   }
        //   if (item.getLabel() === "Описание задачи") {
        //     formData.description = item.getFields()[0].getProperty("value");
        //   }
        //   if (item.getLabel() === "Дедлайн") {
        //     let convertTime = Math.floor(new Date(item.getFields()[0].getProperty("value")).getTime() / 1000)
        //     formData.date = convertTime;
        //   }
        //   if (item.getLabel() === "Важность") {
        //     formData.importance = item.getFields()[0].getProperty("value");
        //   }
        //   if (item.getLabel() === "Постановщик") {
        //     formData.supervisor = item.getFields()[0].getProperty("value");
        //   }
        //   if (item.getLabel() === "Ответсвенный") {
        //     formData.responsible = item.getFields()[0].getProperty("value");
        //   }
        //   formData.id = pathId
        //  });
        //   formData.subtasks = subtasks
        // console.log(formData)
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

      },
      onAddCheckList: function () {
        let tableContainer = this.byId("listSubtasks");
        let inputList = new sap.m.CustomListItem({
          type: sap.m.ListType.Detail
        });
        let inputField = new sap.m.Input({
          value: "",
          width: "50%",
        });
        inputList.addContent(inputField);
        inputList.addStyleClass("inputList")

        tableContainer.addItem(inputList)
      },
    });
  });
