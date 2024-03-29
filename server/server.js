import express from "express";
import {Api, TelegramClient} from "telegram";
import {StringSession} from "telegram/sessions/index.js";
import WebSocket, { WebSocketServer } from 'ws';
import session from "express-session";
let router = express.Router();
import path from "path";
import * as fs from "fs";
import cors from "cors";



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




const stringSession = new StringSession(oConfig.stringSession); // fill this later with the value from session.save()
const LimitMessage = 15

function _saveConfig() {
  fs.writeFileSync("./config.json", JSON.stringify(oConfig), {encoding: "utf-8"});
}

const client = new TelegramClient(stringSession, apiId, apiHash, {
  connectionRetries: 5,
});

const chatId = 1001505671579;

// const bodyParse = bodyParser.json()
const users = [
  {phone: 89060733437}
];
app.use(express.text());
// app.use(express.json())
app.use(
  cors({
    origin: ["http://127.0.0.1:8080","http://http://localhost/:8080"],
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
    client.addEventHandler((update) => {
      const message = update.message;
      console.log(update)
      if (update.className === "UpdateNewChannelMessage" || update.className === "UpdateNewMessage") {
        console.log("канал");
        let fromID = message._chatPeer.channelId;
        let chatID = message.senderId;
        // console.log(fromID);
        // console.log(chatID);
        return ws.send(JSON.stringify({
          type: "newMessages",
          responseId: message.senderId,
          status: "ok",
          msg: {
            chatId: fromID,
            user: chatID,
            message: update.message
          }
        }));
      }
    })
  }
})

const start =  () => {
  try {
    wss.on('connection',     (ws) => {
      app.get("/logIn", async (req, res) => {
        // console.log(req.session.userId)
        if (req.session.userId && req.session.phoneCodeHash) {
          return res.json({
            status: "ok",
            redirect: "chatList"
          });
        }
        if (oConfig.phoneCodeHash && oConfig.phoneNumber) {
          req.session.userId = oConfig.phoneNumber;
          req.session.phoneCodeHash = oConfig.phoneCodeHash;
          // (async function run() {
         await client.connect();

          // await client.addEventHandler((update) => {
          //   const message = update.message;
          //   console.log("Received new Update");
          //   console.log(update);
          //   ws.send("hi update")
          //   if (update.className === "UpdateShortChatMessage") {
          //     // console.log(message.senderId);
          //     // console.log(message._chatPeer.channelId)
          //     console.log("группа");
          //     let fromID = update.fromId.value;
          //     let chatID = update.chatId.value;
          //     // const sender = message.getSender();
          //     return  ws.send(JSON.stringify({
          //       type: "messages",
          //       responseId: message.senderId,
          //       status: "ok",
          //       msg: {
          //         chatId: fromID,
          //         user: chatID,
          //         message: update.message
          //       }
          //     }));
          //     // console.log(sender)
          //   }
          //   if (update.className === "UpdateNewChannelMessage" || update.className === "UpdateNewMessage") {
          //     console.log("канал");
          //     let fromID = message._chatPeer.channelId;
          //     let chatID = message.senderId;
          //     console.log(fromID);
          //     console.log(chatID);
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
          //
          //     // ws.send(JSON.stringify({
          //     //   type: "newMessages",
          //     //   responseId: message.senderId,
          //     //   status: "ok",
          //     //   msg: {
          //     //     chatId: fromID,
          //     //     user: chatID,
          //     //     message: update.message
          //     //   }
          //     // }));
          //   }
          //
          // });
//           async function eventPrint(event) {
//             const message = event.message;
//
//             // Checks if it's a private message (from user or bot)
//             if (event.isPrivate){
//               // prints sender id
//               console.log(message.senderId);
//               // read message
//               if (message.text == "hello"){
//                 const sender = await message.getSender();
//                 console.log("sender is",sender);
//                 await client.sendMessage(sender,{
//                   message:`hi your id is ${message.senderId}`
//                 });
//               }
//             }
//           }
// // adds an event handler for new messages
//           client.addEventHandler(eventPrint, new NewMessage({}));


          //Первое обновление состояния
          // const initUpdate = await client.invoke(new Api.updates.GetState({}));
          // console.log(initUpdate)
          // const result = await client.invoke(new Api.account.GetAuthorizations({}));
          // const result = await client.invoke(
          //   new Api.contacts.GetContacts({
          //     hash: 0,
          //   })
          // );
          // const allChats = await client.invoke(
          //   new Api.messages.GetAllChats({
          //     exceptIds: [43],
          //   })
          // );
          // const allMessages = await client.invoke(
          //   new Api.messages.GetHistory({
          //     peer: "pirat911",
          //     offsetId: 0,
          //     offsetDate: 0,
          //     addOffset: 0,
          //     limit: 100,
          //     maxId: 0,
          //     minId: 0,
          //     hash: 0,
          //   })
          // );
          // const GetMessages = await client.invoke(
          //   new Api.channels.GetMessages({
          //     channel: "262144",
          //     id: [43],
          //   })
          // );
          // const allMessageses = await client.invoke(
          //   new Api.messages.GetMessages({
          //     id: [43],
          //   })
          // );
          // oConfig.userList = result;
          // oConfig.userChats = allChats;
          // oConfig.initUpdate = initUpdate
          // oConfig.userMessages = allMessageses;
          // _saveConfig();
          // })();
          return res.status(201).json({
            status: "ok",
            redirect: "chatList"
          });
        } else {
          return res.status(201).json({
            status: "ok",
            redirect: "Auth",
            path: "lo"
          });
        }
      });
      app.get("/chatList", async (req, res) => {
        if (oConfig.phoneCodeHash) {
          //List
          const allChats = await client.invoke(
            new Api.messages.GetAllChats({
              exceptIds: [43],
            })
          );
          return res.json({
            status: "ok",
            result: allChats
          });
        } else {
          return res.json({
            status: "ok",
            redirect: "Auth"
          });
        }
      })
      app.get("/users", (req, res) => {
        res.send(oConfig.userList);
      });
      app.get("/chats", (req, res) => {
        res.send(oConfig.userChats);
      });
      app.get("/messages", (req, res) => {
        res.send(oConfig.userMessages);
      });
      app.get("/session", (req, res) => {
        console.log(req.session);
        return res.status(201).json({msg: "это" + " " + req.session.userId});
        // let user = users.find( user => Number(user.phone) === Number(sessions))
        //
        // sessions = req.session.user = "89060733437"
        // console.log(sessions)
        // if (sessions){
        //     res.status(201).json({msg: "Добро пожаловать"})
        // }else {
        //   res.status(401).json({msg: "Авторизуйтесь"})
        // }
      });
      app.get("/message/:sId", async (req, res) => {
        let idChat = req.params.sId;
        console.dir(req.params)
        console.log(oConfig.initUpdate)
        if (idChat) {
          console.log(idChat);
          //история сообщений

          const result = await client.invoke(
            new Api.messages.GetHistory({
              peer: idChat,
              offsetId: 0,
              offsetDate: 0,
              addOffset: 0,
              limit: LimitMessage,
              maxId: 0,
              minId: 0,
              hash: 0,
            }));

          // const resultPhoto = await client.invoke(
          //   new Api.photos.GetUserPhotos({
          //     userId: "1136552348",
          //     offset: 0,
          //     maxId: 0,
          //     limit: 100,
          //   })
          // );

          // const resultPhoto = await client.invoke(
          //   new Api.photos.getUserProfilePhotos({
          //     userId: "1136552348",
          //     offset: 0,
          //     limit: 100,
          //   })
          // );

          //  console.log(resultPhoto)
          //
          // let buffer = resultPhoto.photos[0].fileReference
          // let decode = new Buffer.from(buffer)
          // console.log(decode)
          // let string = buffer.toString("utf-8", 0, 21)
          // console.log(typeof buffer.data)
          // function bufferFromBufferString(bufferStr) {
          //  console.log(typeof bufferStr)
          //   return Buffer.from(
          //     bufferStr
          //       .split(' ') // create an array splitting it by space
          //       .slice(1) // remove Buffer word from an array
          //       .reduce((acc, val) =>
          //         acc.concat(parseInt(val, 16)), [])  // convert all strings of numbers to hex numbers
          //   )
          // }
          // let deCode = bufferFromBufferString(buffer)
          // let string = buffer.toString("utf-8")
          // console.log(string)
          // let byte = string.length
          // console.log(string.length )
          // console.log(deCode)
          // console.log(buffer.toString("utf-16"))
          // let decode = new Buffer.from(buffer)
          // console.log(decode)
          // let path = decode.toString("utf-8")
          // console.log(path)
          // console.log(new Buffer.from(buffer).toString("utf-8"));
          //  // let bufferOriginal = Buffer.from(JSON.parse(buffer).data);
          //  console.log(buffer)
          //  let bufferOriginal = Buffer.from(JSON.parse(buffer).data);
          // console.log(bufferOriginal)

          // const resultPh = await client.invoke(
          //   new Api.upload.GetFile({
          //     location: new Api.InputPhotoFileLocation({
          //       fileReference: Buffer.from(buffer),
          //     }),
          //     // file_reference: resultPhoto.photos[0].fileReference,
          //     id: resultPhoto.photos[0].id,
          //     access_hash: resultPhoto.photos[0].accessHash,
          //     thumbSize: "a"
          //   })
          // );
          // console.log(resultPh)
          return res.json(
            {
              messages: result,
              idChat: idChat,
            }
          );
        } else {
          return res.json({
            msg: "чат не найден"
          });
        }
      });
      // app.post("/sendMessage" , async (req, res) => {
      //   let { message, idChat } = JSON.parse(req.body)
      //   wss.on('connection',   (ws) => {
      ws.send('Welcome to the chat, enjoy :)');
      ws.on("update", async (chatId) => {
        let {chatid} = JSON.parse(chatId)
        if (chatid) {
          const result = await client.invoke(
            new Api.messages.GetHistory({
              peer: chatid,
              offsetId: 0,
              offsetDate: 0,
              addOffset: 0,
              limit: 100,
              maxId: 0,
              minId: 0,
              hash: 0,
            }));
        }
      })
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
          const chatPts = await client.invoke(
            new Api.messages.GetHistory({
              peer: idChat,
              offsetId: 0,
              offsetDate: 0,
              addOffset: 0,
              limit: 100,
              maxId: 0,
              minId: 0,
              hash: 0,
            }));
          // console.log(chatPts.pts)
          // console.log(Update)
          const updateMessage = await client.invoke(
            new Api.updates.GetChannelDifference({
              channel: idChat,
              filter: new Api.ChannelMessagesFilterEmpty({}),
              pts: chatPts.pts,
              limit: 10,
              force: true,
            })
          );
          console.dir(updateMessage)


        } else {
          return ws.send(JSON.stringify({
            type: "messages",
            responseId: id,
            status: "ok",
            msg: `Сообщение ne отправлено`
          }))
        }
      })
      // })
      // const result =  client.invoke(
      //   new Api.messages.SendMessage({
      //     peer: idChat,
      //     message: message,
      //     noWebpage: true,
      //     scheduleDate: 43,
      //   })
      // );
      // ws.send(result + "this bot message")

      // });
      // console.log(oConfig.initUpdate)
      // if (message.length > 0 && idChat) {
      //   const result = await client.invoke(
      //     new Api.messages.SendMessage({
      //       peer: idChat,
      //       message: message,
      //       noWebpage: true,
      //       scheduleDate: 43,
      //     })
      //   );

      // const Update = await client.invoke(new Api.updates.GetState({}));
      //

      // console.log(updateMessage)
      // const updateMessage = await client.invoke(
      //   new Api.updates.GetDifference({
      //     pts: Update.pts,
      //     date: Date.now() - Update.date,
      //     qts: Update.qts,
      //   })
      // );
      // console.log(updateMessage)

      //     return res.json({
      //       status: "ok",
      //       msg: `Сообщение отправлено: ${result}`
      //     })
      //   }else {
      //     res.json({
      //       status: "ok",
      //       msg: "Пустое сообщение"
      //     })
      //   }
      //
      // })

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
          await (async function run() {
            await client.connect(); // This assumes you have already authenticated with .start()
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
            _saveConfig();
            console.log(result.phoneCodeHash);
            return res.status(201).json(
              {
                message: "Registration successfully",
                phoneCode: result.phoneCodeHash
              });
          })();
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
    })
    app.listen(port, () => console.log(`server  is started on port: ${port}`));

  } catch (e) {
    console.log(e);
  }
};

start();
