const express = require("express")
const ejs = require("ejs")
const sqlite3 = require("sqlite3")
const sqlite = require("sqlite")
const app = express()
const fs = require("fs").promises
const upload = require('multer')

app.set('views', __dirname+'/views')
app.set('view engine', 'ejs' )
app.engine('html', ejs.renderFile)

async function getDBconnection() {
    const db = await sqlite.open({
        filename:'product.db',
        driver:sqlite3.Database
    });
    return db;
}

app.use(express.static("public"))

app.get("/", async function(req, res) {
    let db = await getDBconnection();
    let rows = await db.all('select * from product');
    await db.close();
    res.render('index', {data: rows})
});

app.get("/login", function(req, res) {
    res.sendFile(__dirname+"/public/login.html")
});
app.get("/signup", function(req, res) {
    res.sendFile(__dirname+"/public/signup.html")
});







app.get("/product/:product_id", async function(req, res) {
    let db = await getDBconnection();
    let rows = await db.all('select * from product');
    await db.close();
    rows = rows[req.params.product_id-1]

    let comment = await fs.readFile('comment.json', 'utf8');
    data = JSON.parse(comment);

    let comments = data.filter(objs => objs.product_id == req.params.product_id)
    var textresult=""
    for(let text in comments){
        textresult += "<li>"+comments[text].comment+"</li>";
    }
    res.render('infotemplate', {data: rows, comment:textresult })
});
//recieve comment
app.post("/product/:product_id", upload().none(), async function(req, res) {
    // let db = await getDBconnection();
    // let rows = await db.all('select * from product');
    // await db.close();

    console.log(req.body)

    let comment = await fs.readFile('comment.json', 'utf8');
    data = JSON.parse(comment);
    commentobjtoadd = {product_id:req.params.product_id, comment: req.body.comment}
    data.push(commentobjtoadd)
    await fs.writeFile('comment.json', JSON.stringify(data));


    // console.log(data)

    // let comments = data.filter(objs => objs.product_id == req.params.product_id)
    // var textresult=""
    // for(let text in comments){
    //     textresult += "<li>"+comments[text].comment+"</li>";
    // }
        
    res.redirect("back")
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> { 
    console.log(`서버주소: http://localhost:${PORT}`)
})