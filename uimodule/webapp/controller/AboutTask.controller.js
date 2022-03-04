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
      onInit :  function () {
        let oRouter =  this.getOwnerComponent().getRouter();
        oRouter.getRoute("AboutTask").attachMatched(this._onObjectMatched, this);
      },
      _onObjectMatched: async function (oEvent) {
        let sTaskId = oEvent.getParameter("arguments").AboutTaskId;
        this.getOwnerComponent().loadTasks().then(() => {
          let aTasks = this.getOwnerComponent().getModel("ListTasks").getData().tasksList;
          let nTaskIndex = aTasks.findIndex(taskId => taskId.id == sTaskId)
          let sPath = `/tasksList/${nTaskIndex}`
          // UsersModel.loadData(url1, null, true, "GET", null, false);
          // console.log(UsersModel.result)
          // this.getView().setModel(aboutModel, "aboutModel");
          this.getView().bindElement({
            path: sPath,
            model: "ListTasks"
          });
        });
        this.oCommentsTask = this.getOwnerComponent().getModel("CommentsTask");
        let chatId = 7730
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
        })
      }

    });
  });
