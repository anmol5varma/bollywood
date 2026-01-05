import { IF_CASTED_GROUP_ID } from "./constant.js";
import { sendMessage, sendMessageWithFile } from "./sendMessage.js";
import fs from "fs";
import path from "path";
import captions from "./caption.js"; // Assuming captions.js exports an object with filenames as keys

async function main() {
    const postsDir = "final posts";
    const eventLogPath = "event.log";
    
    // Read processed files from event.log
    let processedFiles = new Set();
    if (fs.existsSync(eventLogPath)) {
        const logContent = fs.readFileSync(eventLogPath, 'utf8');
        const lines = logContent.trim().split('\n');
        for (const line of lines) {
            const [filename] = line.split(' '); // Assuming format: filename timestamp
            processedFiles.add(filename);
        }
    }
    
    // Get files from postsDir
    const files = fs.readdirSync(postsDir).sort();
    
    // Find a file that hasn't been processed
    let selectedFile = null;
    for (const filename of files) {
        if (!processedFiles.has(filename) && captions[filename.split('.')[0]]) {
            selectedFile = filename;
            break;
        }
    }
    console.log("File selection done", selectedFile)
    
    if (selectedFile) {
        const filepath = path.join(postsDir, selectedFile);
        const caption = captions[selectedFile.split('.')[0]];
        
        // Call the function
        // await sendMessageWithFile(caption, IF_CASTED_GROUP_ID, filepath);
        console.log(selectedFile, " is sent.")
        
        // Log the event
        const timestamp = new Date().toISOString();
        const logEntry = `${selectedFile} ${timestamp}\n`;
        fs.appendFileSync(eventLogPath, logEntry);
    } else {
        await sendMessage("No new files to process.", IF_CASTED_GROUP_ID)
        console.log("No new files to process.");
    }
}

main();