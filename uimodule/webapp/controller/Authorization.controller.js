sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",

  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   * @param fioriLibrary
   */
  function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("cloneTelegramApp.cloneTelegram.controller.Authorization", {
      onInit: function () {
        let oRouter =  this.getOwnerComponent().getRouter();
        // oRouter.getRoute("Authorization").attachMatched(this._onObjectMatched, this);
      },
      // _onObjectMatched: function (oEvent) {
      //   let view = this.getOwnerComponent()
      // },
      Request: async function ( request ) {
        let url = "http://127.0.0.1:5000/reg"
        let sHeaders = {
          "Accept": "application/json",
          "Access-Control-Allow-Origin": "*",
          "X-Requested-With": "XMLHttpRequest",
          "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
        };
        let res = await fetch( url, {
          method: "POST",
          headers: sHeaders,
          body: JSON.stringify(request)
        });
        // const data = await res.json();
        //console.log(data)
        return res;
      },
      checkFieldPhone: function (oEvent) {
        let oValue = oEvent.getParameters("value").value;
        let oButton = this.byId("buttonNext");
        if (oValue.length === 11) {
         oButton.setVisible(true)
        }else {
          oButton.setVisible(false)
        }
       },

       Submit: async  function () {
        // let oInput = this.byId("maskInput");
        // let oBinding = oInput.getProperty("value");
        let oValue = this.byId("maskInputPhone").getProperty("value")

        let url = "http://127.0.0.1:5000/reg"
         let sHeaders = {
           "Accept": "application/json",
           "Access-Control-Allow-Origin": "*",
           "X-Requested-With": "XMLHttpRequest",
           "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
           "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
         };
         // let oWizardStep = this.byId("ShoppingCartWizard");
        let  oWizardStepContainer = this.getView().byId('ShoppingCartWizard')
       // let res = await fetch( url, {
       //    method: "POST",
       //    headers: sHeaders,
       //    body: JSON.stringify({
       //      phone: oBinding.split(" ").join(""),
       //      password: "",
       //      name: "Alex"
       //    })
       //  })
       //    const data = await res.json();
       //    console.log(data)
         let dataPhone = {
           phone: oValue.split(" ").join(""),
           password: "",
           name: "Alex"
         };
        const getDataStatus =  this.Request(dataPhone)
         // getDataStatus.then( res => res.json())
          const getStatus = async () => {
            return await this.Request(dataPhone);
         }
         let dataProm = (await getDataStatus).json()
         let datatest = await dataProm
           if ((await getDataStatus).status === 201) {
             let UserModel = new JSONModel(
               {
                 phone: oValue.split(" ").join(""),
                 phoneCodeHash: datatest.phoneCode
               })
             this.getView().setModel(UserModel, "myUserModel")
             // console.log("Double render")
             // window.alert("registr Ok")
             oWizardStepContainer.nextStep();
           }
           else {
             window.alert("Phone number invalid or not found")
           }
         // let  Promise  = this.Request(dataPhone)
         // let status = await Promise.then(res => res)
         // if (status === 201) {
         //   window.alert("registr Ok")
         //   oWizardStepContainer.nextStep();
         // }8 906 073 34 37
         // console.log(data)
         // if (res.status === 402) {
         //   window.alert("Invalid register")
         // }else{
         //   oWizardStepContainer.nextStep();
         // }

        // let data = await fetch("http://127.0.0.1:5000/")
        //  console.log(data)

      },
      checkField: async function(oEvent) {
        let oValue = oEvent.getParameters("value").value;
        let oRouter = this.getOwnerComponent().getRouter();
        let oData = this.getView().getModel("myUserModel").getData()
        if (oValue.length === 5) {
          let phoneCode = {
            phoneCode: oValue,
            phone: oData.phone,
            phoneCodeHash: oData.phoneCodeHash
          };

          // const getStatus = this.Request(phoneCode);
          const getStatus = async () => {
            return await this.Request(phoneCode)
          }
          // let status = await getStatus();
          let status = (await this.Request(phoneCode).then(res => res)).status;
          if (status === 201) {
            // window.alert("go page user")
            oRouter.navTo("Init");
          }
          else if (status !== 201) {
            return window.alert("phone code invalid")
          }
        }
        else {
          return
        }
      }

    });
  });
