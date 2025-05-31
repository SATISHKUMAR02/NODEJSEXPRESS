//const fs = require('fs')
const fsPromises = require('fs').promises;

const path = require('path');

const fileOps = async () => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname,'files','starter.txt'),'utf8');
        console.log(data);
        await fsPromises.appendFile(path.join(__dirname,'files','starter.txt'),'\n\n written something from fileOps');
        await fsPromises.writeFile(path.join(__dirname,'files','starter.txt'),data);
        await fsPromises.rename(path.join(__dirname,'files','starter.txt'),path.join(__dirname,'files','Newstarter.txt'));
       // await fsPromises.unlink(path.join(__dirname,'files','lorem.txt')); => is used to delete the file ,unlike operation
    } catch (err) {
        console.log(err);
    }
}
fileOps()

// for reading files make it utf


/*
     process is the global object in node js where it gives control of the current node.js process
     when there is an uncaughtException , clg the error
     and exit

     NODE JS IS ASYNC BY DEFAULT SO MOST OF THE OPERATIONS AREA ASYN LIKE FILE ACCESS


*/
// ============================================================GO THROUGH THIS CODE ONCE , MAKES  THE BASICS CLEAR
// for writing files don;t make it utf8 , it is utf8 by default
// fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'this is the text that will be added', (err) => {
//     // it will create a file reply.text
//     if (err) throw err;
//     console.log('write complete')
//     fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\nthis is the text that will be added after ', (err) => {
//         // it will create a file reply.text
//         if (err) throw err;
//         console.log('append  complete')
//         fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'Newreply.txt'), (err) => {
//             // it will create a file reply.text
//             if (err) throw err;
//             console.log('rename complete')
//         })
//     })
// })

// this is for updating the file  and also append file will also create a new file it does not exist
// fs.appendFile(path.join(__dirname,'files','reply.txt'),'\nthis is the text that will be added after ',(err)=>{
//     // it will create a file reply.text
//     if(err) throw err;
//     console.log('append  complete')
// })
process.on('uncaughtException', err => {
    console.log(`there was an uncaught error=>${err}`);
    process.exit(1);
})