sap.ui.define(["sap/ui/core/format/NumberFormat","sap/ui/core/BusyIndicator","sap/ui/core/format/DateFormat"],function(e,t,r){"use strict";return{getDataUser:function(e){console.log(e);return e},getData:function(e){console.log(e);var t=r.getDateTimeInstance({style:"medium"});var n=new Date(e*1e3);var o=t.format(n);return o},getUser:function(e,t){if(e&&e.userId&&t&&t.length>0){let r=t.find(t=>t.id==e.userId);if(r){let e="";if(r.fistName){e=r.fistName}if(r.lastName){e+=" "+r.lastName}if(!e&&r.username){e=r.username}if(!e){e=r.id}return e}return"аноним"}},getTask:function(){},getCountTask:function(e,t){console.log(e);console.log(t);let r="Александр Павлов";let n={All:t,toMe:[],onMe:[],CloseTask:[]};t.forEach(e=>{if(e.supervisor===r){return n.toMe.push(e)}if(e.status==="Закрыт"){return n.CloseTask.push(e)}else{return n.onMe.push(e)}});let o=0;e.forEach(t=>{let r=e.find(e=>e.key==t.key);if(r.key==="All"){o=n.All.length}if(r.key==="toMe"){o=n.toMe.length}});return`(${o})`},getTitle:function(e){return`Чат № ${e.idChat}`},getStatus:function(e){if(e==="Выполняется"){return"Success"}if(e==="Закрыт"){return"None"}},getImportance:function(e){console.log(e);if(e==="Низкий"){return"Success"}if(e==="Средний"){return"Warning"}if(e==="Критичный"){return"Error"}},getState:function(e){console.log(e)},getSubTaskState:function(e){if(!e){return"Error"}else{return"Success"}}}});