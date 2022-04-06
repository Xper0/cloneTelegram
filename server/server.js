import express from "express";
import {Api} from "telegram";
// import {StringSession} from "telegram/sessions/index.js";
import WebSocket, { WebSocketServer } from 'ws';
import session from "express-session";
import  tasks from "./tasks.js"
import usersList from "./users.js";
import tasksList from "./taskList.js";
let router = express.Router();
import path from "path";
import * as fs from "fs";
import cors from "cors";
import messageList from "./messageList.js";
import mongoose from "mongoose";
import Task from "./models/listTask.js";
import tasksRouter from "./routes/taskRouters.js";
import client from "./clientTelegram.js";
import messangerRouters from "./routes/messangerRouters.js";


const pwDB ='PTm3PRLka3rIUAvh';
const blockDB = "nodeGram";
const db = `mongodb+srv://Xper:${pwDB}@cluster0.0ac6y.mongodb.net/${blockDB}?retryWrites=true&w=majority`;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((res) => console.log("Connect DB"))
  .catch((error) => console.log(error))
// const datas = await Task.find()
// console.log(datas)


const __dirname = path.dirname(process.argv[1])
let oConfig = JSON.parse(fs.readFileSync(path.join(__dirname, "./config.json"), "utf-8"));



const app = express();
const store = new session.MemoryStore();

const port = process.env.PORT || 5000;

const wss = new WebSocketServer({ port: 4000})

// wss.on('connection', function connection(ws) {
//   ws.on('message', function message(data) {
//     console.log('received: %s', data);
//   });
//
//   ws.send('something');
// });
//
//
// app.on("updateServer", async (req, res) => {
//   res.send("ответ")
//   // const result = await client.invoke(
//   //   new Api.messages.GetHistory({
//   //     peer: "1348764176",
//   //     offsetId: 0,
//   //     offsetDate: 0,
//   //     addOffset: 0,
//   //     limit: 100,
//   //     maxId: 0,
//   //     minId: 0,
//   //     hash: 0,
//   //   }));
//   // res.json({
//   //   status: "ok",
//   //   msg: result
//   // })
// })



//

// const stringSession = new StringSession(oConfig.stringSession); // fill this later with the value from session.save()
const LimitMessage = 15

function _saveConfig() {
  fs.writeFileSync("./config.json", JSON.stringify(oConfig), {encoding: "utf-8"});
}
function _saveList() {
  fs.writeFileSync("./tasks.js", JSON.stringify(tasks), {encoding: "utf-8"});
}

let has = "116c512c1bc4825cd9"
// const client = new TelegramClient(stringSession, apiId, apiHash, {
//   connectionRetries: 5,
// });

console.log(client)
const chatId = 1001505671579;

// const bodyParse = bodyParser.json()
const users = [
  {phone: 89060733437}
];
app.use(express.text());
// app.use(express.json())
app.use(
  cors({
    origin: ["http://127.0.0.1:8080","http://localhost/:8080", "https://xper0.github.io"],
    methods: ["GET", "POST"]
  })
);
app.use(
  session({
    secret: "you secret key",
    saveUninitialized: false,
    store: store
  })
);

let sessions;
wss.on("connection" , async (ws) => {
  await  client.connect()
  if (oConfig.phoneCodeHash && oConfig.phoneNumber) {

    ws.on("message", async (body) => {
      console.log(`this is message: ${body}`)
      let {message, idChat, id} = JSON.parse(body)
      if (message.length > 0 && idChat) {
        const result = await client.invoke(
          new Api.messages.SendMessage({
            peer: idChat,
            message: message,
            noWebpage: true,
            scheduleDate: 43,
          })
        );
        return ws.send(JSON.stringify({
          type: "messages",
          responseId: id,
          status: "ok",
          msg: `Сообщение отправлено: ${result}`
        }))
      } else {
        return ws.send(JSON.stringify({
          type: "messages",
          responseId: id,
          status: "ok",
          msg: `Сообщение ne отправлено`
        }))
      }
    })
    // client.addEventHandler((update) => {
    //   const message = update.message;
    //   console.log(update)
    //   if (update.className === "UpdateNewChannelMessage" || update.className === "UpdateNewMessage") {
    //     let fromID = message._chatPeer.channelId;
    //     let chatID = message.senderId;
    //     // console.log(fromID);
    //     // console.log(chatID);
    //     return ws.send(JSON.stringify({
    //       type: "newMessages",
    //       responseId: message.senderId,
    //       status: "ok",
    //       msg: {
    //         chatId: fromID,
    //         user: chatID,
    //         message: update.message
    //       }
    //     }));
    //   }
    // })
  }
})

const start =  () => {
  try {
      app.use(messangerRouters)
      app.use(tasksRouter)

      app.post("/session", (req, res) => {
        let {phone} = JSON.parse(req.body);
        if (phone) {
          let user = users.find(user => Number(user.phone) === Number(phone));
          if (user) {
            req.session.userId = user.phone;
            console.log(req.session);
            return res.status(201).json({msg: "Авторизирован"});
          } else {
            // users.push( {phone: phone})
            console.log(users);
            return res.status(401).json({msg: "Invalid phone"});
          }
        } else {
          return res.status(401).json({msg: "Invalid phone"});
        }
        // let { phone } = JSON.parse(req.body)
        // sessions = phone
        // if (phone) {
        //   if (req.session.autorization){
        //     res.json(req.session)
        //   }else{
        //     if( phone === Number("89060733437")){
        //       console.log('da')
        //       req.session.autorization = true
        //     }
        //   }
        // }
        // console.log(sessions)
        // console.log(store)
      });
      app.post("/reg", async (req, res) => {
        let {phone, password, name, phoneCode, phoneCodeHash} = JSON.parse(req.body);

        console.log(phone, password, name, phoneCode, phoneCodeHash);
        if (!phone || password) {
          return res.status(422).json({error: "The fields are filled in incorrectly"});
        }
        if (Number(phone) === 89060733437 && !phoneCode) {
            // await client.connect(); // This assumes you have already authenticated with .start()
            const result = await client.invoke(
              new Api.auth.SendCode({
                phoneNumber: phone,
                apiId: apiId,
                apiHash: apiHash,
                settings: new Api.CodeSettings({
                  allowFlashcall: true,
                  currentNumber: true,
                  allowAppHash: true,
                }),
              })
            );
            req.session.phoneCodeHash = result.phoneCodeHash;
            oConfig.phoneCodeHash = result.phoneCodeHash;
            oConfig.phoneNumber = phone;
            _saveConfig()
            console.log(result.phoneCodeHash);
            return res.status(201).json(
              {
                message: "Registration successfully",
                phoneCode: result.phoneCodeHash
              });
          // return res.status(201).json(
          //   {
          //     message: "Registration successfully",
          //     phoneCode: result.phoneCodeHash
          //   })
          // return res.status(201).json(
          //   {
          //     message: "Registration successfully",
          //     phoneCode: "testhash",
          //     status: 201
          //   })
        }
        if (phone && phoneCode) {
          await (async function run() {
            await client.connect();
            const result = await client.invoke(
              new Api.auth.SignIn({
                phoneNumber: phone,
                phoneCodeHash: phoneCodeHash,
                phoneCode: phoneCode,
              })
            );
          })();

          users.push({phone: phone});
          client.session.save();
          stringSession.save();
          oConfig.clientSession = client.session.save();
          oConfig.stringSession = stringSession.save();
          _saveConfig();
          return res.status(201).json({message: "Code valid"});
        } else {
          return res.status(404).json({message: "Registration faild"});
          // (async () => {
          //   console.log("Loading interactive example...");
          //   const client = new TelegramClient(stringSession, apiId, apiHash, {
          //     connectionRetries: 5,
          //   });
          //   await client.start({
          //     phoneNumber: async () => await req.body,
          //     password: async () => await input.text("Please enter your password: "),
          //     phoneCode: async () =>
          //       await input.text("Please enter the code you received: "),
          //     onError: (err) => console.log(err),
          //   });
          //   console.log("You should now be connected.");
          //   console.log(client.session.save()); // Save this string to avoid logging in again
          //   await client.sendMessage("me", {message: "Hello!"});
          // })();
        }

      });

      // (async () => {
      //   console.log("Loading interactive example...");
      //   const client = new TelegramClient(stringSession, apiId, apiHash, {
      //     connectionRetries: 5,
      //   });
      //   await client.start({
      //     phoneNumber: async () => await req.body,
      //     password: async () => await input.text("Please enter your password: "),
      //     phoneCode: async () =>
      //       await input.text("Please enter the code you received: "),
      //     onError: (err) => console.log(err),
      //   });
      //   console.log("You should now be connected.");
      //   console.log(client.session.save()); // Save this string to avoid logging in again
      //   await client.sendMessage("me", {message: "Hello!"});
      // })();
    // })
    app.listen(port, () => console.log(`server  is started on port: ${port}`));

  } catch (e) {
    console.log(e);
  }
};

start();
