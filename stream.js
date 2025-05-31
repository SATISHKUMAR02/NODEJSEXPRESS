const fs = require('fs');
const path = require('path');

const rs = fs.createReadStream(path.join(__dirname,'files','lorem.txt'),{encoding:'utf8'});
const ws = fs.createWriteStream(path.join(__dirname,'files','new-lorem.txt'))

//rs.pipe(ws);
rs.on('data',(dataChunk)=>{
    ws.write(dataChunk);
})
// this will create a new directory if it does not exist
if(!fs.existsSync('./new')){
    fs.mkdir('./new',(err)=>{
        if(err) throw err;
        console.log("directory created");
    })
}

