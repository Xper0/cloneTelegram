sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "cloneTelegramApp/cloneTelegram/model/models",
    "./model/formatter",
    ],
    function (UIComponent, Device, models, formatter) {
        "use strict";

        return UIComponent.extend("cloneTelegramApp.cloneTelegram.Component", {
          formatter: formatter,
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);
                // formatter.ioSocket()
                this.oTaskModel = this.getModel("ListTasks");

                this.socket = new WebSocket("ws://127.0.0.1:4000");
                let oEventBus = sap.ui.getCore().getEventBus()
              this.socket.onopen = (msg) => {
                console.log("server ON")
                // socket.a("sendMessage", () => {
                //   socket.send(oValue)
                // }
              }
              console.log(this.socket)
                this.socket.onmessage = (msg) => {
                  console.log(msg)
                  console.log("connect msg")
                  try {
                    let oMessage = JSON.parse(msg.data)
                    if (oMessage.type == "message") {
                      console.log("dsds")
                      if (oMessage.responseId) {
                        oEventBus.publish("messages", "messageResponce", oMessage)
                      }
                    }
                    if (oMessage.type == "newMessages") {
                      oEventBus.publish("newMessages", "messageResponse", oMessage)
                    }
                  } catch (err) {
                    console.dir(err)
                  }

                  // oModel.getProperty( oModel.getData()["message"].messages, Object.assign({}, oModel.getData()["message"].messages.push(oValue)));
                  // oModel.getData()["message"].messages
                }

              //   socket.addEventListener("message", function (event) {
              //     socket.send("hello server")
              //   })
              // socket.addEventListener("updateServer", function (event) {
              //   socket.send("update serv")
              //   console.log(event)
              // })
                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
              this.loadTasks()
            },
          loadTasks:  function () {
            return new Promise( async (res, rej) => {
              let userAuthorization = "Александр Павлов"
              const urls = " http://127.0.0.1:5000/tasksList";
              this.oTaskModel = this.getModel("ListTasks");
              let datas = await fetch(urls);
              let tasksList = await datas.json();
              let taskGroups = [
                {
                  title: "Все",
                  key: "All"
                },
                {
                  title: "Назначенные мне",
                  key: "toMe"
                },
                {
                  title: "Назначенные мной",
                  key: "onMe"
                },
                {
                  title: "Закрытые",
                  key: "CloseTask"
                },
              ];
              this.oTaskModel.setProperty("/tasksList", tasksList.result);
              this.oTaskModel.setProperty("/tasksGroups", taskGroups)
              console.log( this.oTaskModel)

              // let oEventBus = sap.ui.getCore().getEventBus();
              // oEventBus.publish("tasks", "tasksLoaded" );
              res()
            })

          }
        });
    }
);