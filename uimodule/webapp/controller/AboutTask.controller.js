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
        let oEventBus = sap.ui.getCore().getEventBus();
        oEventBus.subscribe("messages", "messageResponce", this.onMessageResponce, this);
        oEventBus.subscribe("newMessages", "messageResponse", this.onNewMessage, this );
        // let processFlow = this.byId("processflow");
        // let btnEndTask = this.byId("btn-endTask");
        // let btnBeginTask = this.byId("btn-beginTask");
        // let lanes = processFlow.getAggregation("lanes");
        //
        // let processFlow1 = this.byId("progress");
        // debugger
        // let state = [
        //   {
        //     state: "Negative",
        //     value: 100
        //   }
        // ];
        //
        // lanes.forEach( lanesItem => {
        //   let textLanes = lanesItem.getProperty("text");
        //   let stateLanes = lanesItem.getProperty("state");
        //   if (textLanes === "Взят в работу" && stateLanes[0].state !== "Positive") {
        //     btnEndTask.setVisible(false);
        //     btnBeginTask.setVisible(true);
        //   }
        //   else {
        //     btnEndTask.setVisible(true);
        //     btnBeginTask.setVisible(false);
        //   }
        // });
        let btnEndTask = this.byId("btn-endTask");
        let btnBeginTask = this.byId("btn-beginTask");
        // btnEndTask.setVisible(false);
        // btnBeginTask.setVisible(false);
        let oRouter =  this.getOwnerComponent().getRouter();
        oRouter.getRoute("AboutTask").attachMatched(this._onObjectMatched, this);
      },
      onMessageResponce: function (sChanel, sEvent, oData ) {
        console.dir(oData);
      },
      onNewMessage: function (sChanel, sEvent, oData) {
        console.log(oData)
        // let oModel = this.getView().getModel("CommentsTask").getData();
        // let chatId = oModel.comments.chats[0].id;
        let oModel =  this.getView().getModel("CommentsTask");
        console.log(oModel)
        let oCollectionMessage = Object.assign({}, oModel.getData().comments["message"]);
        console.log(oCollectionMessage)
        console.log(oModel.getData().comments["message"])
        let findChat = oModel.getData().comments["message"].messages.find( chat => chat.peerId.channelId === oData.msg.chatId)
        // debugger
        console.log(findChat)
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
        let processFlow = this.byId("processflow");
        let btnEndTask = this.byId("btn-endTask");
        let btnBeginTask = this.byId("btn-beginTask");
        btnEndTask.setVisible(false);
        btnBeginTask.setVisible(false);
        // debugger
        // let line = processFlow.getLanes()
        let sTaskId = oEvent.getParameter("arguments").AboutTaskId;
        // let aTasks = this.getOwnerComponent().getModel("ListTasks").getData().tasksList;
        // let nTaskIndex = aTasks.findIndex(taskId => taskId.id == sTaskId)
        this.getOwnerComponent().loadTasks().then(() => {
          let aTasks = this.getOwnerComponent().getModel("ListTasks").getData().tasksList;
          let nTaskIndex = aTasks.findIndex(taskId => taskId.id == sTaskId)
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

          let lanes = processFlow.getAggregation("lanes");
          lanes.forEach( lanesItem => {
            let textLanes = lanesItem.getProperty("text");
            let stateLanes = lanesItem.getProperty("state");
            if (textLanes === "Взят в работу" && stateLanes[0].state !== "Positive") {
              btnEndTask.setVisible(false);
              btnBeginTask.setVisible(true);
            }
            if (textLanes === "Взят в работу" && stateLanes[0].state === "Positive") {
              btnEndTask.setVisible(true);
              btnBeginTask.setVisible(false);
            }
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
        let btnEndTask = this.byId("btn-endTask");
        let btnBeginTask = this.byId("btn-beginTask");
        let lanes = processFlow.getAggregation("lanes");
        let state = [
          {
            "state": "Positive",
            "value": 100
          }
        ];
        lanes[2].setProperty("state", state);
        btnEndTask.setVisible(true);
        btnBeginTask.setVisible(false);

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
      },
      onPost: function (oEvent) {
        let oModel = this.getView().getModel("CommentsTask").getData();
        let chatId = oModel.comments.chats[0].id;
        let oValue = oEvent.getParameter("value");
        console.log(oModel)
        console.log(chatId)
        console.log(oValue)

        // let oCollectionMessage = Object.assign({}, oModel.getData()["message"]);
        // oCollectionMessage.messages.push({
        //   date: Math.floor(Date.now() / 1000),
        //   message: oValue
        // });
        // oModel.setProperty("/message", Object.assign({}, oCollectionMessage));
        let body = JSON.stringify({
          id: new Date().getTime(),
          message: oValue,
          idChat: chatId
        });
        let socket = this.getOwnerComponent().socket;
        socket.send(body);

      }
    });
  });
