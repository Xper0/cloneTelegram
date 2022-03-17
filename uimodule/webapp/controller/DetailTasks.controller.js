sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment"
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, formatter, Filter, FilterOperator, Fragment) {
    "use strict";

    return Controller.extend("cloneTelegramApp.cloneTelegram.controller.DetailTasks", {
      formatter: formatter,
      onInit :  function () {
        let categoryTasksModel = new JSONModel({});
        this.getView().setModel(categoryTasksModel, "categoryTasksModel")
        let oRouter =  this.getOwnerComponent().getRouter();
        oRouter.getRoute("DetailTasks").attachMatched(this._onObjectMatched, this);
      },
      _onObjectMatched: async function (oEvent) {
        let oContainer = this.byId("DetailTaskTAble");
        let oBinding = oContainer.getBinding("items");
        let sKey = oEvent.getParameter("arguments").detailCategory; // Получение detailCategory
        let aTasksCategory = this.getOwnerComponent().getModel("ListTasks").getData().tasksGroups;
        let nTaskIndex = aTasksCategory.findIndex(taskCategory => taskCategory.key == sKey);
        let sPath = `/tasksGroups/${nTaskIndex}`;
        this.getView().bindElement({
          path: sPath,
          model: "ListTasks"
        });


        let aFilters = [];
        let eq = sap.ui.model.FilterOperator.EQ;
        let sUser = "Александр Павлов";
        let filter = (path, eq , value ) => {
          let oFilters = new sap.ui.model.Filter(`${path}`, eq, value);
          aFilters.push(oFilters)
        };
        switch (sKey){
          case "All":
            break;
          case "toMe":
            filter("supervisor", eq, sUser);
            break;
          case  "onMe":
            filter("responsible", eq, sUser);
            break
          case "CloseTask":
            let status = "Закрыт"
            filter("status", eq, status);
        }
        //
        // this.oTaskModel = this.getOwnerComponent().getModel("ListTasks").getData().tasksList;
        // // console.log(oBinding.oList[oItem])
        // // let data = Object.keys(oBinding.oList).find( item => oBinding.oList[item] === oBinding.oList[oItem])
        // // console.log(data)
        //   // oBinding.filter(sCategory[oItem])
        // // //debugger
        // const url = `http://127.0.0.1:5000/tasks?category=${oItem}`;
        // let data = await fetch(url);
        // let tasks = await data.json();
        // let oModel = this.getView().getModel("categoryTasksModel");
        // oModel.setProperty("/categoryTask", Object.assign({}, {tasks: tasks.result}));
        // //
        // console.log(oModel)

        oBinding.filter(aFilters);

        //
        // console.log(oBinding.oList[oItem])
        // let newdata = oBinding.oList[oItem].filter( item => this.oTaskModel[oItem].find( items => items == item));
        // debugger
        // oBinding.setProperty("/", Object.assign({}, newdata))

        // let oFilter = new sap.ui.model.Filter(`${oItem}` ,sap.ui.model.FilterOperator.EQ,  1);
        // console.log(oFilter)
        // oBinding.filter([oFilter])



        // console.log(newdata)
        // return newdata
        // oBinding.filter([oItem])
        // console.log(sCategory[oItem])
        // sCategory[oItem].filter([sCategory[oItem]]);
        // let oModel =  this.getView().getModel("ListTasks");
        // console.log(oModel)
        // oModel.setProperty(`/tasksList`, Object.assign({}, oBinding.oList[oItem]))
        // console.log(oModel)
        // console.log(oBinding)


        // let oModel =
        //   this.getView().bindElement({
        //     path: "/" + "myTask" + oItem,
        //     model: "taskModel"
        //   });
        // console.log(oItem)
      },
      onListItemPress: function (oEvent) {
        // debugger
        let oItem = oEvent.getSource().getBindingContext("ListTasks").getObject();
        console.log(oItem)
        let oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("AboutTask", {
          AboutTaskId: oItem.id
        })
      },
      handleFilterButtonPressed: function () {
        if (!this._pCategoryFilterDialog) {
          this._pCategoryFilterDialog = Fragment.load({
            id: this.getView().getId(),
            name: "cloneTelegramApp.cloneTelegram.view.TaskFilter",
            controller: this
          }).then(function(oDialog){
            // connect dialog to the root view of this component (models, lifecycle)
            this.getView().addDependent(oDialog);
            return oDialog;
          }.bind(this));
        }
        this._pCategoryFilterDialog.then(function(oDialog) {
          oDialog.open();
        });
      },
      handleConfirm: function (oEvent) {
        this._applyFilter(oEvent);
      },
      _applyFilter: function (oEvent) {
        let oList = this.byId("DetailTaskTAble"),
          oBinding = oList.getBinding("items"),
          aSelectedFilterItems = oEvent.getParameter("filterItems"),
          oCustomFilter =  this.byId("categoryFilterDialog").getFilterItems()[1], //
          oFilter,
          oCustomKeys = {},
          aFilters = [],
          aSupervisorFilters = [],
          aPriceFilters = [],
          aSupplierFilters = [];
          console.log(oBinding)
        aSelectedFilterItems.forEach( oItem =>  {
          let sFilterKey = oItem.getProperty("key")
          console.log(sFilterKey)
          oFilter = new Filter("idSupervisor", FilterOperator.EQ, sFilterKey);
          aSupervisorFilters.push(oFilter);
          // switch (sFilterKey) {
          //   case "Available":
          //     oFilter = new Filter("lastName", FilterOperator.EQ, "A");
          //     aAvailableFilters.push(oFilter);
          //     break;
          //
          //   case "OutOfStock":
          //     oFilter = new Filter("Status", FilterOperator.EQ, "O");
          //     aAvailableFilters.push(oFilter);
          //     break;
          //
          //   case "Discontinued":
          //     oFilter = new Filter("Status", FilterOperator.EQ, "D");
          //     aAvailableFilters.push(oFilter);
          //     break;
          //   default:
          //     oFilter = new Filter("SupplierName", FilterOperator.EQ, sFilterKey);
          //     aSupplierFilters.push(oFilter);
          //
          // }
        });

        oFilter = new Filter({filters: aSupervisorFilters, and: true});
        oBinding.filter(oFilter);

      }
    });
  });