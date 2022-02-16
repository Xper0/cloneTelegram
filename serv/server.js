// import http from "http";

const http = require('http');
const { Client } = require('tdl')
const { TDLib } = require('tdl-tdlib-addon')
const phoneNumber = '+89060733437'
// const apiId =  11602427 // specify your API ID
// const apiHash = '51feba2b614e15b5f63d97c75f6f5a49'

//
//
//
// console.log(client)
const requestListener = async function (req, res) {
  const client = new Client(new TDLib(), {
    apiId: 11602427, // Your api_id
    apiHash: '51feba2b614e15b5f63d97c75f6f5a49', // Your api_hash
  })
  try {
    res.writeHead(200);
    res.end('Hello, Worldsss!');
    console.log(client)
    await client.connect()
    await client.login()
  }
  catch (err) {
    console.log(err)
  }
}


const server = http.createServer(requestListener);
server.listen(8080);