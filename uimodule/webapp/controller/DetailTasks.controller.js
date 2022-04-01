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
        let oRouter =  this.getOwnerComponent().getRouter();
        oRouter.getRoute("DetailTasks").attachMatched(this._onObjectMatched, this);
      },
      _onObjectMatched:  function (oEvent) {

        let oContainer = this.byId("DetailTaskTAble");
        let oBinding = oContainer.getBinding("items");
        let sKey = oEvent.getParameter("arguments").detailCategory; // Получение detailCategory
        this.getOwnerComponent().loadTasks().then(() => {
          let aTasksCategory = this.getOwnerComponent().getModel("ListTasks");
          let tasksGroups = aTasksCategory.getData().tasksGroups;
          let nTaskIndex = tasksGroups.findIndex(taskCategory => taskCategory.key === sKey);
          let sPath = `/tasksGroups/${nTaskIndex}`;
          this.getView().bindElement({
            path: sPath,
            model: "ListTasks"
          });
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
            break;
          case "CloseTask":
            let status = "Закрыт"
            filter("status", eq, status);
        }

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
          aFilterImportance = [],
          aSupplierFilters = [];
        aSelectedFilterItems.forEach( oItem =>  {
          let sFilterKey = oItem.getProperty("key")
          // oFilter = new Filter("idSupervisor", FilterOperator.EQ, sFilterKey);
          // aSupervisorFilters.push(oFilter);
          if (sFilterKey === "Низкий" || sFilterKey === "Средний" || sFilterKey === "Критичный" ) {
            oFilter = new Filter("importance", FilterOperator.EQ, sFilterKey);
            aFilterImportance.push(oFilter);
          } else {
            oFilter = new Filter("idSupervisor", FilterOperator.EQ, sFilterKey);
            aSupervisorFilters.push(oFilter);
          }
          // switch (sFilterKey) {
          //   case "Низкий" || "Средний" || "Критичный":
          //     oFilter = new Filter("importance", FilterOperator.EQ, sFilterKey);
          //     aFilterImportance.push(oFilter);
          //     break;
          //   //
          //   // case "OutOfStock":
          //   //   oFilter = new Filter("Status", FilterOperator.EQ, "O");
          //   //   aAvailableFilters.push(oFilter);
          //   //   break;
          //   //
          //   // case "Discontinued":
          //   //   oFilter = new Filter("Status", FilterOperator.EQ, "D");
          //   //   aAvailableFilters.push(oFilter);
          //   //   break;
          //   default:
          //     oFilter = new Filter("idSupervisor", FilterOperator.EQ, sFilterKey);
          //     aSupervisorFilters.push(oFilter);
          //
          // }
        });
        if (aFilterImportance.length > 0) {
          aFilters.push(new Filter({filters: aFilterImportance}));
        }
        if (aSupervisorFilters.length > 0) {
          aFilters.push(new Filter({filters: aSupervisorFilters}));
        }
        oFilter = new Filter({filters: aFilters, and: true});

        if (aFilters.length > 0) {
          oBinding.filter(oFilter);
        }
        else {
          oBinding.filter(null);
        }
      }
    });
  });
