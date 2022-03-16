
sap.ui.define([
  "sap/ui/core/format/NumberFormat",
  "sap/ui/core/BusyIndicator",
  "sap/ui/core/format/DateFormat",
], function (NumberFormat, BusyIndicator, DateFormat) {
  "use strict";
  return {
    getDataUser: function (user) {
      console.log(user)
      return user
    },
    getData: function (data) {
      console.log(data)
      var oFormat = DateFormat.getDateTimeInstance({ style: "medium" });
      var oDate = new Date(data * 1000);
      var sDate = oFormat.format(oDate);
      return sDate
    },
    getUser: function (oSenderUser, aUsers) {

      if (oSenderUser && oSenderUser.userId && aUsers && aUsers.length > 0) {
        let user1 = aUsers.find( user => user.id == oSenderUser.userId)

        if (user1) {
          let sName = ""
          if (user1.fistName){
            sName = user1.fistName
          }
          if (user1.lastName) {
            sName += " " + user1.lastName
          }
          if (!sName && user1.username) {
            sName = user1.username
          }
          if (!sName) {
            sName = user1.id
          }
          return sName
        }
        return  "аноним"
      }
      // console.log(users , data)
      // let usersMessage = users.map( user => user.fromId.userId)
      // console.log(usersMessage)
      // let fil = data.find( item =>usersMessage.map( id => id === item.id))
      // console.log(fil)
     // let User = users.users
     //  let userId = User.map( item => item.id)
     //  console.log(User)
     //
     //  users.messages.forEach( message => {
     //    if (message.fromId.userId === User.forEach( user => user.id)){
     //      console.log("есть такие")
     //    }
     //    else {
     //      console.log("нет")
     //    }
     //  })

       // let idUser = users.messages.find( id => id.fromId.userId == User)

      // let idUser = users.messages.find( id => id.fromId.userId === "70069832" )
      // let userId = users.messages;
      // let usersInfo = users.users;
      // // userId.forEach( id => console.log(id.fromId.userId))
      // let test = usersInfo.forEach( user => {
      //
      // })
      //
      // console.log(userId)
      // console.log(usersInfo)
      // console.log(idUser)
      // return `${User[1].firstName} ${User[1].lastName}`
    },
    getTask: function () {
    },
    getCountTask: function (listTasks, valuesTask) {
      console.log(listTasks)
      console.log(valuesTask)
      let user = "Александр Павлов";
      let data =  {
        All: valuesTask,
        toMe: [],
        onMe: [],
        CloseTask: [],
      };
      valuesTask.forEach(task => {
            if (task.supervisor === user) {
              return  data.toMe.push(task)
            }
            if (task.status === "Закрыт") {
              return data.CloseTask.push(task)
            }
            else {
              return data.onMe.push(task)
            }
      });
       let  countTask = 0
      listTasks.forEach(item => {
        let category = listTasks.find( cat => cat.key == item.key)
          if (category.key === "All"){
           countTask = data.All.length;
          }
          if (category.key === "toMe") {
            countTask = data.toMe.length;
          }
      })

      // listTasks.forEach(category => {
      //   if (category.key === "All"){
      //     listTasks.forEach(item => {
      //       countTask = valuesTasks.All;
      //     })
      //   }
      //   if (category.key === "toMe"){
      //     listTasks.forEach(item => {
      //       countTask = valuesTasks.toMe;
      //     })
      //   }
      // })


      // if (countCategory) {
      //   if (countCategory.key === "All"){
      //     countTask = valuesTasks.All;
      //   }
      //   if (countCategory.key === "toMe") {
      //     countTask = valuesTasks.toMe;
      //   }
      // }
      // listTasks.forEach( category => {
      //     if (category.key === "All"){
      //       countTask = valuesTasks.All;
      //     }
      //     if (category.key === "toMe"){
      //       countTask = valuesTasks.toMe;
      //     }
      //     if (category.key === "onMe"){
      //       countTask = valuesTasks.onMe;
      //     }
      //     if (category.key === "CloseTask"){
      //       countTask = valuesTasks.CloseTask;
      //     }
      // });
      return `(${countTask})`;
      // let categoryTask =  listTasks.find(task => ))
      // console.log(categoryTask)
      // if (categoryTask) {
      //   let countTask = 0
      //   if (categoryTask === "allTask") {
      //     countTask = data.All.length
      //   }
      //   if (categoryTask === "myTask" ){
      //     countTask = data.toMe.length
      //   }
      //   if (categoryTask === "forMeTask" ){
      //     countTask = data.onMe.length
      //   }
      //   if (categoryTask === "closeTask" ){
      //     countTask = data.CloseTask.length
      //   }
      //   return `(${countTask})`
      // }
      // return `(${countTask})`
    },
    getTitle: function (title) {
      return `Чат № ${title.idChat}`
    },
    getStatus: function (oStatus) {
      if (oStatus === "Выполняется") {
        return "Success";
      }
      if (oStatus === "Закрыт") {
        return "None";
      }
    },
    getImportance:  function (oImportance) {
      console .log(oImportance)
      if (oImportance === "Низкий") {
        return "Success";
      }
      if (oImportance === "Средний") {
        return "Warning";
      }
      if (oImportance === "Критичный") {
        return "Error";
      }
    },
    getState: function (oList) {
      console.log(oList)
    },
    getSubTaskState: function (oState){
      if (!oState) {
        return "Error";
      }
      else {
         return "Success";
      }
    }

    // ioSocket: function () {
    //   let socket = new WebSocket("ws://127.0.0.1:4000")
    //   socket.onopen = () => {
    //     console.log("ello server")
    //   // }
    //   socket.addEventListener("message", function (event) {
    //     socket.send("hello server")
    //   })
    //   socket.addEventListener("updateServer", function (event) {
    //     socket.send("update serv")
    //     console.log(event)
    //   })
    // }
    // }
  };
});