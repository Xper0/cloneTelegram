sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    'sap/ui/core/library',
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/core/routing/History",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, Fragment, JSONModel, coreLibrary, MessageBox, MessageToast, History) {
    "use strict";
    let ValueState = coreLibrary.ValueState;
    return Controller.extend("cloneTelegramApp.cloneTelegram.controller.CreateTask", {
      onInit :  async  function () {
        var oModel = new JSONModel({});
        this._formFragments = {};
        this.byId('edit').setEnabled(true);
        this._showFormFragment("addTask");
        this.oTaskModel = this.getOwnerComponent().getModel("ListTasks");
        const url = "http://127.0.0.1:5000/usersList"
        let data = await fetch(url);
        let users = await data.json();
        this.oTaskModel.setProperty("/users", Object.assign({}, users.result));
        console.log(this.oTaskModel)
      },
      handleEditPress : function () {
        //Clone the data
        this._toggleButtonsAndView(false);
      },
      handleSavePress : function () {
        this._toggleButtonsAndView(true);
      },
      handleCancelPress : function () {
        this._toggleButtonsAndView(true);

      },

      _toggleButtonsAndView : function (bEdit) {
        var oView = this.getView();
        // Show the appropriate action buttons
        oView.byId("edit").setVisible(bEdit);
        oView.byId("save").setVisible(!bEdit);
        oView.byId("cancel").setVisible(!bEdit);
        // Set the right form type
        this._showFormFragment(bEdit ? "addTask" : "PreviewTask");
      },
      _getFormFragment: function (sFragmentName) {
        let pFormFragment = this._formFragments[sFragmentName],
          oView = this.getView();

        if (!pFormFragment) {
          pFormFragment = Fragment.load({
            id: oView.getId(),
            name: `cloneTelegramApp.cloneTelegram.view.${sFragmentName}`,
            controller: this
          });
          this._formFragments[sFragmentName] = pFormFragment;
        }

        return pFormFragment;
      },


      _showFormFragment : function (sFragmentName) {
        let oPage = this.byId("addTask");
        oPage.removeAllContent();
        this._getFormFragment(sFragmentName).then(function(oVBox){
          oPage.insertContent(oVBox);
        });
      },
      handleChange: function (oEvent) {
        // console.log(oEvent.getSource)
        let oValidatedComboBox = oEvent.getSource(),
          sSelectedKey = oValidatedComboBox.getSelectedKey(),
          sValue = oValidatedComboBox.getValue();
          console.log(sSelectedKey)
        if (!sSelectedKey && sValue) {
          oValidatedComboBox.setValueState(ValueState.Error);
          oValidatedComboBox.setValueStateText("Please enter a valid contact!");
        } else {
          oValidatedComboBox.setValueState(ValueState.None);
        }
      },

      onNameChange: function(oEvent) {
        let oInput = oEvent.getSource();

        this._validateInput(oInput);
      },

      _validateInput: function (oInput) {
        let sValueState = "None";
        let bValidationError = false;
        // console.log(oInput.getValue())
        let oBinding = oInput.getBindingInfo("value").type;
        console.log(oBinding.type)
        try {
          oBinding.validateValue(oInput.getValue());
        } catch (oException) {
          sValueState = "Error";
          bValidationError = true;
        }
        oInput.setValueState(sValueState);
        return bValidationError;
      },
      onAddListTask: async function () {
        let input = this.byId("form");
        let formData = {};
        let form = this.byId("editFormTask");
        let elements = form.getFormContainers()[0].getFormElements();

        let oView = this.getView(),
          aInputs = [
            oView.byId("titleTask")
          ],
          bValidationError = false;

        // Check that inputs are not empty.
        // Validation does not happen during data binding as this is only triggered by user actions.
        aInputs.forEach(function (oInput) {
          bValidationError = this._validateInput(oInput) || bValidationError;
        }, this);

        if (!bValidationError) {
          let oRouter =  this.getOwnerComponent().getRouter();
          let chatid = ["1513492075", "730832139"]
          const url = " http://127.0.0.1:5000/sendMessage";
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
              formData.importance = item.getFields()[0].getProperty("value");
            }
            if (item.getLabel() === "Постановщик") {
              formData.supervisor = item.getFields()[0].getProperty("value");
            }
            if (item.getLabel() === "Ответсвенный") {
              formData.responsible = item.getFields()[0].getProperty("value");
            }
          });

          let datas = await fetch( url, {
            method: "POST",
            headers: sHeaders,
            body: JSON.stringify({
              message: formData,
              idChat: chatid[0]
            })
          });
          let result = await datas.json()
          console.log(result)
          oRouter.navTo("Tasks")
          // MessageToast.show("The input is validated. Your form has been submitted.");
        } else {
          MessageBox.alert("A validation error has occurred. Complete your input first.");
        }


       //  elements.forEach(item => {
       //    if (item.getLabel() === "Название задачи") {
       //      formData.title = item.getFields()[0].getProperty("value");
       //    }
       //    if (item.getLabel() === "Описание задачи") {
       //      formData.description = item.getFields()[0].getProperty("value");
       //    }
       //    if (item.getLabel() === "Крайний срок") {
       //      formData.date = item.getFields()[0].getProperty("value");
       //    }
       //    if (item.getLabel() === "Важность") {
       //      formData.status = item.getFields()[0].getProperty("value");
       //    }
       //    if (item.getLabel() === "Постановщик") {
       //      formData.supervisor = item.getFields()[0].getProperty("value");
       //    }
       //    if (item.getLabel() === "Ответсвенный") {
       //      formData.responsible = item.getFields()[0].getProperty("value");
       //    }
       //  });
       //  console.log(formData)
       // // debugger
       //  console.log(input)

        // const url = " http://127.0.0.1:5000/sendMessage";
        // let sHeaders = {
        //   "Accept": "application/json",
        //   "Access-Control-Allow-Origin": "*",
        //   "X-Requested-With": "XMLHttpRequest",
        //   "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
        //   "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
        // };
        // let chatid = ["1513492075", "730832139"]
        // let datas = await fetch( url, {
        //   method: "POST",
        //   headers: sHeaders,
        //   body: JSON.stringify({
        //     message: formData,
        //     idChat: chatid[0]
        //   })
        // });
        // let result = await datas.json()
        // console.log(result)
        console.log("add task")
      },
      onNavBack: function ( ) {
        let oRouter = this.getOwnerComponent().getRouter();
        let sPreviousHash = History.getInstance().getPreviousHash();
        if (sPreviousHash !== undefined) {
          window.history.back();
        } else {
          oRouter.navTo("Init", {}, true /*no history*/);
        }
      },
      select: function (oValue) {
        console.log(oValue)
      }

    });
  });
