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
    return Controller.extend("cloneTelegramApp.cloneTelegram.controller.Tasks", {
      formatter: formatter,
      onInit:  function () {
        let processFlow = this.byId("processflow");
        let lanes = processFlow.getAggregation("lanes");
        let state = [
          {
            "state": "Positive",
            "value": 100
          }
        ];
        lanes[0].setProperty("state", state)
        lanes[1].setProperty("state", state)
        // console.log(processFlow)
        let oRouter =  this.getOwnerComponent().getRouter();
        oRouter.getRoute("AboutTask").attachMatched(this._onObjectMatched, this);
      },
      _onObjectMatched: async function (oEvent) {
        let processFlow = this.byId("processflow");
        let sTaskId = oEvent.getParameter("arguments").AboutTaskId;
        let aTasks = this.getOwnerComponent().getModel("ListTasks").getData().tasksList;
        console.log(aTasks)
        let nTaskIndex = aTasks.findIndex(taskId => taskId.id == sTaskId)
        console.log(aTasks[nTaskIndex].chatId)
        this.getOwnerComponent().loadTasks().then(() => {
          // let aTasks = this.getOwnerComponent().getModel("ListTasks").getData().tasksList;
          // console.log(aTasks)
          // let nTaskIndex = aTasks.findIndex(taskId => taskId.id == sTaskId)
          // console.log(aTasks[nTaskIndex].chatId)
          let sPath = `/tasksList/${nTaskIndex}`
          // UsersModel.loadData(url1, null, true, "GET", null, false);
          // console.log(UsersModel.result)
          // this.getView().setModel(aboutModel, "aboutModel");
          let processFlowLaneHeader = this.byId("LaneHeader");
          console.log(processFlowLaneHeader)
          this.getView().bindElement({
            path: sPath,
            model: "ListTasks"
          });
        });
        this.oCommentsTask = this.getOwnerComponent().getModel("CommentsTask");
        let urlId = `http://127.0.0.1:5000/getCommentTask?commentTaskId=${sTaskId}`;
        let data = await fetch(urlId)
        let result = await data.json();
        console.log(result)
        this.oCommentsTask.setProperty("/comments", result.message)
        console.log(this.oCommentsTask)
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
      onNavBack: function ( ) {
        let oRouter = this.getOwnerComponent().getRouter();
        let sPreviousHash = History.getInstance().getPreviousHash();
        console.log(sPreviousHash)
        if (sPreviousHash !== undefined) {
          window.history.back();
        } else {
          oRouter.navTo("Tasks", {}, true /*no history*/);
        }
      },
      onEditTask: function (oEventTask) {
        let oRouter = this.getOwnerComponent().getRouter();
        const oItem = oEventTask.getSource().getBindingContext("ListTasks").getObject();
        oRouter.navTo("EditTask", {
          editTaskId: oItem.id
        });
      },
      onBeginTask: function () {
        let processFlow = this.byId("processflow");
        let lanes = processFlow.getAggregation("lanes");
        let state = [
          {
            "state": "Positive",
            "value": 100
          }
        ];
        lanes[2].setProperty("state", state)
      },
      onEdit: function (oEvent) {
        let tableContainer = this.byId("ProductList");
        let itemsTable = tableContainer.getAggregation("items");

        let bindLabel = oEvent.getSource().getProperty("label")

        let inputList = new sap.m.InputListItem({
          label: "Подзадача6",
          type: sap.m.ListType.Detail,
          highlight: "Error",
          press: this.onEdit
        });
        let inputField = new sap.m.Input({
            value: bindLabel
          });
        inputList.addContent(new sap.m.Switch({
          type: sap.m.SwitchType.AcceptReject,
          state: false
        }));
        inputList.addContent(inputField)
        tableContainer.insertItem(inputList)
        // tableContainer.addContent(inputList)

        console.log(inputList)
        // tableContainer.bindItems({
        //   template: inputList
        // })
        // this.oTable.bindItems({
        //   path: "/ProductCollection",
        //   template: oTemplate,
        //   templateShareable: true,
        //   key: "ProductId"
        // }).setKeyboardMode(sKeyboardMode);
        // console.log(oEvent)
        // console.log(inputList)
        // console.log(itemsTable)

        // let value = new sap.m.Input();
        // oEvent.getSource().setProperty("label", value);
        // oEvent.getSource().setProperty("highlight", "Error");
      },
      onAddCheckList: function () {
        let tableContainer = this.byId("ProductList");
        let inputList = new sap.m.InputListItem({
          label: "",
          type: sap.m.ListType.Detail,
          highlight: "Error",
          press: this.onEdit
        });
        let inputField = new sap.m.Input({
          value: "",
          width: "30%"
        });
        inputList.addContent(inputField);
        inputList.addContent(new sap.m.Switch({
          type: sap.m.SwitchType.AcceptReject,
          state: false
        }));

        tableContainer.addItem(inputList)
      }
    });
  });
