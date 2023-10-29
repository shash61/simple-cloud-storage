const { Kafka, logLevel } = require('kafkajs')
const { KAFKA_UPLOAD_FILE_TOPIC } = require('../../constants')
const fs = require('fs')
const path = require('path')

const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID,
    brokers: ['localhost:9092'],
    retry:{
        initialRetryTime: 2000,
        retries: 4
    },
    logLevel: logLevel.INFO
})

// console.log(path,'pathh')
const producer = kafka.producer()
const consumer = kafka.consumer({groupId: process.env.KAFKA_GROUP_ID})

const connectProducer = async()=>{
    try{
        await producer.connect()
        console.log('successfully connected to broker')
    }
    catch(err){
        console.log("Error connecting to the broker",err)
    }
}
connectProducer()

async function connectConusmer(){
    try{
        await consumer.connect();
        await consumer.subscribe({topics: [KAFKA_UPLOAD_FILE_TOPIC]})
        console.log('------------------consumer connected successfully-----------------');
        consumeMessages()
    }
    catch(err){
        console.error("error in connecting consumer", err)
    }
}
connectConusmer()

// producer send message fn
async function sendMessageToKafka(topicName, message) {
    try{
        console.log("sending msg to topic ", message, topicName);
        let result= await producer.send({
            topic: topicName,
            messages: [{key: message.partitionKey, value:JSON.stringify(message.data)}]
        })
    }
    catch(err){
        console.log(`error sending message to ${topicName} with ${message}`,err)
    }
}

async function consumeMessages(){
    try{
        await consumer.run({
            // parttionsConsumedConcurrently: 3,
            eachMessage : async ({topic, partition, message}) => {
                console.log(message.key.toString(), 'key')
                console.log(message.value.toString(), 'value')
                if(topic===KAFKA_UPLOAD_FILE_TOPIC){
                    const messageData = JSON.parse(message.value.toString())
                    let sourcePath = messageData.fileDetails.path
                    let uploadPath = path.join('newuploads1/usr/1')
                    // let userUploadPath;
                    // console.log(data)
                    // const sourcePath = data.file.path
                    // const userId = data.path.split('/')[2]
                    // const parentFolderPath = data.folderId
                    //   if (parentFolderPath) {
                    //     // const parentFolderPath =
                    //     userUploadPath = path.join("newuploads", `${parentFolderPath}`);
                    //   } else {
                    //     userUploadPath = path.join("newuploads", `/usr/${userId}`);
                    //     // req.storedPath = userUploadPath;
                    //   }
                
                      // Create the destination directory if it doesn't exist
                    fs.mkdirSync(storagePath, { recursive: true });
                    const readStream = fs.createReadStream(sourcePath,'utf-8')
                    console.log(readStream,'----------------fileData----------------')
                    const writeStream = fs.createWriteStream(`${uploadPath}/${messageData.fileDetails.originalname}`,'utf-8')
                    console.log(writeStream,'-------------write-------------')
                    readStream.pipe(writeStream)
                    
                    readStream.on('error', (err) => {
                        console.error('Error reading the uploaded file:', err);
                        // res.status(500).send('File upload failed.');
                      });
                    
                      writeStream.on('error', (err) => {
                        console.error('Error writing the file to the destination:', err);
                        // res.status(500).send('File upload failed.');
                      });
                    
                      writeStream.on('finish', () => {
                        console.log('File uploaded successfully')
                      })
                    }
            }
        })
    }
    catch(err){
        console.error("err in consuming", message)
    }
}




module.exports = sendMessageToKafka