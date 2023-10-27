const express = require('express')
const cors = require('cors');
const parser = require('body-parser')
const path = require('path');
const { error } = require('console');
const app = express()
app.use(express.json());
app.use(express.static(__dirname));
app.use(parser.urlencoded({ extended: true }));
// Middleware for CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
const saveToFile = (data, filename) => {
    try {
        fs.writeFileSync(filename, data);
        console.log(`Content saved to ${filename}`);
    } catch (error) {
        console.error('Failed to save content to file:', error);
    }
};
app.get(`/`, (req, res) => {
    res.sendFile(__dirname + '/html/index.html')
});
// app.get(`/download`,(req,res)=>{
//     const current_url = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
//     const search_params = current_url.searchParams;
//     const data = search_params.get('data')
//     saveToFile(data, "transcript");
//     // res.send(search_params.get('data'))
// })
app.listen(80, () => {
    console.log(`Server Started at port : http://127.0.0.1`);
});
