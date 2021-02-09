import * as uuid from 'uuid';
import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

export async function main(event, context){
    // Request body in JSON encoded string as 'event.body'

    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.tableName,
        Item:{
            // attributes of the item to be created
            userId : "123",
            noteId : uuid.v1(), // unique uuid
            content: data.content, // parsed from requset
            attachment: data.attachment, // parsed from requeset
            createdAt: Date.now(), // current unix timestamp
        },
    };

    try{
        await dynamodb.put(params).promise();

        return {
            statusCode : 200,
            body: JSON.stringify(params.Item),
        };
    } catch(e) {
        return {
            statusCode: 500,
            body: JSON.stringify({error: e.message}),
        };
    }
}