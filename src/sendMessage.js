import axios from "axios";
import { readFile } from "fs/promises";
import 'dotenv/config'

export const sendMessageWithFile = async (message, id, filepath) => {

    const buffer = await readFile(filepath);
    const blob = new Blob([buffer], { type: 'image/png' });
    const formData = new FormData();
    formData.append('chatId', id);
    formData.append('caption', message);
    formData.append('fileName', filepath.split('/').pop()); // Extract filename from filepath
    formData.append('file', blob); // Assuming image/png, adjust as needed

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://${process.env.INSTANCE_ID.slice(0, 4)}.media.greenapi.com/waInstance${process.env.INSTANCE_ID}/sendFileByUpload/${process.env.API_TOKEN}`,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: formData
    };

    try {
        const res = await axios.request(config);
        console.log('idMessage: ', res.data?.idMessage);
    } catch (err) {
        console.log(err);
    }
}

export const sendMessage = async (message, id) => {
    let data = JSON.stringify({
        "chatId": id,
        "message": message,
        "linkPreview": false
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://${process.env.INSTANCE_ID.slice(0, 4)}.api.green-api.com/waInstance${process.env.INSTANCE_ID}/sendMessage/${process.env.API_TOKEN}`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    try {
        const res = await axios.request(config)
        console.log('idMessage: ', res.data?.idMessage);
    } catch (err) {
        console.log(err);
    }
}
