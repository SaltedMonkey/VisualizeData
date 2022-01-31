
const{readFile} = require("fs");
const express = require("express");
const mqtt = require("mqtt");
const ObjectsToCsv = require("objects-to-csv");

const host = "192.168.5.102";
port = "1883";

const connectUrl = host +":"+port;


 
const client = mqtt.connect(connectUrl, {
    clean:true,
    username: process.argv[2] || "",
    password: process.argv[3] || ""
});



var topic = "connectivity/device/SvenTestClient/opcuaclient/record/testset";
client.on('connect', () => {
    console.log('Connected')
    client.subscribe([topic], () => {
      console.log(`Subscribe to topic '${topic}'`)
    })
  })

client.on("message", (topic, message) => {
    JsonData = JSON.parse(message.toString());
    console.log("Received message: " + JsonData);
    csv = new ObjectsToCsv(JsonData.data);
    csv.toDisk("./public/list.csv");

})


const app = express();

app.use(express.static("public"));

app.get("/", (request, response) =>{
    readFile("/index.html", "utf-8", (err, html)=>{

        if(err){
            response.status(500).send("sorry, out of order");
        }

        response.send(html);
    })
});



if(process.env.PORT !== undefined){
    port = process.env.PORT;
    console.log(port);
    
}
app.listen(3000, "192.168.5.20", () => console.log("App available on http://localhost:" + 3000));