const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const { error } = require("console");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// app.use((req, res, next)=>{
//     console.log("This is the middleware...");
//     next();
// })

app.get('/', (req, res)=>{
    fs.readdir("./files", (err, files)=>{
        // console.log(files)
        res.render("index", {files: files});
    })
})

app.get('/files/:fileName', (req, res)=>{
    fs.readFile(`./files/${req.params.fileName}`, 'utf-8', (err, filedata)=>{
        // console.log(req.params.fileName);
        res.render('showData', {fileName: req.params.fileName, filedata: filedata});
    })
})

app.get('/edit/:fileName', (req, res)=>{
    res.render('edit', {fileName:req.params.fileName});
})

app.post('/create', (req, res)=>{
    const data=req.body.description;
    fs.writeFile(`./files/${req.body.title.split(' ').join('_')}.txt`, data, (err)=>{
        res.redirect('/')
    });
})

app.post('/edit', (req, res)=>{
    fs.rename(`./files/${req.body.previoustitle}`, `./files/${req.body.newtitle}`, (err)=>{
        res.redirect("/");
    })
})

  

app.listen(3000);