const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors');
const ejs = require("ejs");
const spawn = require("child_process").spawn;
const {
    data
} = require("jquery");
const fs = require('fs');
const { nextTick } = require("process");
const app = express();
// app.use(express.static("./my-app/dist/my-app"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
// app.use((req,res)=>{
//     res.header('Access-Control-Allow-Origin','*');
// });
app.post('/api',(req,res)=>{
    console.log("gg")
    console.log(req.body.input_params);
    const pythonProcess = spawn('python',["Api/gradient2.py", JSON.stringify(req.body)]);
    pythonProcess.on('close', (code,signal) => {
        console.log(`child process close all stdio with code ${signal}`);
        var data;
        try {
            data = fs.readFileSync('Intermediate/returns.txt', 'utf8')
            try {
                fs.unlinkSync('Intermediate/returns.txt')
                //file removed
              } catch(err) {
                console.error(err)
            }
          // console.log(JSON.parse(data))
            data=JSON.parse(data)
            fs.writeFile('Intermediate/temporary.txt', JSON.stringify(data), function (err) {
                if (err) throw err;
                console.log('Saved!');
            });
            // res.send({somedata:'json'});
            //console.log(JSON.parse(data));
            data={data};
            res.send(data)
        } catch (err) {
            console.error(err)
        }
    });
    pythonProcess.stderr.on('data', (data) => {
        console.error(`child stderr:\n${data}`);
      });
    // //parsing the response from std.out.flush()
    pythonProcess.stdout.on('data', (data) => {
       console.log(data.toString())
    });
    // res.send({some:'json'});
});
app.get("/",(req,res)=>{
    console.log("HI");
    res.send({data:"Working"});
});
app.post("/",(req,res)=>{
    console.log("POST");
    res.send({data:"Working"});
});

app.listen(process.env.PORT||3000, function () {
    console.log("Server started Succesfully.");
});